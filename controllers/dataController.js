const {
  user: userModel,
  photo: photoModel,
  tag: tagModel,
  searchHistory: searchHistoryModel,
} = require("../models");
const { Op } = require("sequelize");
const {
  validateRequestBody,
  validateSearchImageQuery,
  validatePhotos,
  validateTags,
  validateSearchTagQuery,
} = require("../validations/index");

const {
  searchImagesFromUnsplash,
} = require("../services/searchImagesFromUnsplash");
const { doesUserExist } = require("../services/userService");

//MS1_Assignment_1.2: Making API Calls to create Users
const createNewUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const errors = validateRequestBody(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });
    const userExist = await doesUserExist(email);
    if (userExist) {
      return res.status(400).json({ error: "Email already exists." });
    }
    const newUser = await userModel.create({ username, email });
    return res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    return res.status(400).json({
      message: "Error occured while creating user",
      error: error.message,
    });
  }
};

//MS1_Assignment_1.3: Making API Calls to Unsplash
const searchImages = async (req, res) => {
  const { query } = req.query;
  const errors = validateSearchImageQuery(query);
  if (errors.length > 0) return res.status(400).json({ errors });
  try {
    const photos = await searchImagesFromUnsplash(query);
    if (photos && photos.length === 0) {
      return res
        .status(404)
        .json({ message: "No images found for the given query." });
    }
    return res.status(200).json({ photos });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch image details",
    });
  }
};

//MS1_Assignment_1.4: Saving Photos into Collections
const saveNewPhotos = async (req, res) => {
  const { imageUrl, description, altDescription, tags, userId } = req.body;
  const errors = validatePhotos(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const newPhoto = await photoModel.create({
      imageUrl,
      description,
      altDescription,
      tags,
      userId,
    });
    //Now its associations will add those tags into Tags Model.
    if (tags && tags.length > 0) {
      const tagObjects = tags.map((tag) => ({
        name: tag,
        photoId: newPhoto.id,
      }));
      await tagModel.bulkCreate(tagObjects);
    }
    return res.status(201).json({ message: "Photo saved successfully." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//MS1_Assignment_1.5: Adding Tags for Photos
const addTags = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { tags } = req.body;

    // Validate the tags in the request body
    const errors = validateTags(req.body);
    if (errors && errors.length > 0) return res.status(400).json({ errors });

    // Find the existing photo by its ID along with its tags
    const existingPhoto = await photoModel.findByPk(photoId);

    if (!existingPhoto) {
      return res.status(404).json({ message: "Photo not found with this ID." });
    }

    const updatedTags = [...new Set([...existingPhoto.tags, ...tags])];
    //...new Set([]) converts back into array.

    if (updatedTags.length > 5) {
      return res
        .status(400)
        .json({ message: "A photo can have a maximum of (5) tags." });
    }

    //Tags which are new to the DB.
    const newTags = tags.filter(
      (tag) => !existingPhoto.tags.some((existingTag) => existingTag === tag)
    );

    // Update the photo's tags array
    existingPhoto.tags = updatedTags;

    // Save the updated photo
    await existingPhoto.save();

    // Add the new tags to the tag model and associate them with the photo
    if (newTags.length === 0) {
      return res.status(400).json({ message: "This Tags are already existed" });
    }

    if (newTags.length > 0) {
      const tagObjects = newTags.map((tagName) => ({
        name: tagName.trim(),
        photoId: photoId,
      }));
      await tagModel.bulkCreate(tagObjects);
    }
    return res.status(200).json({ message: "Tags added successfully." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//MS1_Assignment_1.6: Searching Photos by Tags and Sorting by Date Saved
const searchByTag = async (req, res) => {
  const { tags, sort = "ASC", userId } = req.query;
  //default sort = ASC
  const errors = validateSearchTagQuery(tags, sort);
  if (errors.length > 0) return res.status(400).json({ errors });
  try {
    if (userId) {
      const existingUser = await userModel.findByPk(userId);
      if (!existingUser) {
        return res
          .status(400)
          .json({ message: `User not found with ID:${userId} in the DB` });
      }
      await searchHistoryModel.create({
        userId, // Store the user ID
        query: tags, // Store the search query
      });
    }

    //checking existing tags from DB
    const existingTags = await tagModel.findAll({ where: { name: tags } });

    if (!existingTags) {
      return res.status(404).json({ message: "Tag not found." });
    }

    //extracting photoIds from the exisitingTags.(map returns an array.)
    const photoIds = existingTags.map((tag) => tag.photoId);

    if (photoIds && photoIds.length === 0) {
      return res
        .status(400)
        .json({ message: "No tag found with this PhotoId" });
    }

    console.log(photoIds);
    const existingPhotos = await photoModel.findAll({
      where: { id: { [Op.in]: photoIds } },
      order: [["dateSaved", sort.toUpperCase()]],
      include: [
        {
          model: tagModel,
          as: "photoTags",
          attributes: ["name"],
        },
      ],
    });
    if (existingPhotos.length === 0)
      return res
        .status(400)
        .json({ message: "No photos found with this PhotoId" });
    const response = existingPhotos.map((photo) => ({
      imageUrl: photo.imageUrl,
      description: photo.description,
      dateSaved: photo.dateSaved,
      tags: photo.photoTags.map((item) => item.name),
    }));
    return res.status(200).json({ photos: response });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch the photos" });
  }
};

const searchHistoryByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId)
      return res.status(404).json({ message: "User Id is required" });
    const existingUser = await userModel.findByPk(userId);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: `User not found with ID:${userId} in the DB` });
    }
    const latesthistory = await searchHistoryModel.findAll({
      where: { userId },
      attributes: ["query", "timestamp"],
      order: [["timestamp", "DESC"]],
    });
    return res.status(200).json({ searchHistory: latesthistory });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createNewUser,
  searchImages,
  saveNewPhotos,
  addTags,
  searchByTag,
  searchHistoryByUserId,
};
