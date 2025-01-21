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

const { searchImagesFromUnsplash } = require("./userController");
const { doesUserExist } = require("../services/userService");

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
    return res.status(400).json({ error: error.message });
  }
};

const searchImages = async (req, res) => {
  const query = req.query.query;
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
      message: "--Failed to fetch image details--",
    });
  }
};

const saveNewPhotos = async (req, res) => {
  try {
    const { imageUrl, description, altDescription, tags, userId } = req.body;
    const errors = validatePhotos(req.body);

    if (errors.length > 0) return res.status(400).json({ errors });
    const newPhoto = await photoModel.create({
      imageUrl,
      description,
      altDescription,
      tags,
      userId,
    });
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

const addTags = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { tags } = req.body;
    console.log(tags);

    // Validate the tags in the request body
    const errors = validateTags(req.body);
    if (errors && errors.length > 0) return res.status(400).json({ errors });

    // Find the existing photo by its ID along with its tags
    const existingPhoto = await photoModel.findByPk(photoId);

    if (!existingPhoto) {
      return res.status(404).json({ message: "Photo not found with this ID." });
    }

    const updatedTags = [...new Set([...existingPhoto.tags, ...tags])];
    const newTags = tags.filter(
      (tag) => !existingPhoto.tags.some((existingTag) => existingTag === tag)
    );
    if (updatedTags.length > 5) {
      return res
        .status(400)
        .json({ message: "A photo can have a maximum of (5) tags." });
    }

    // Update the photo's tags array
    existingPhoto.tags = updatedTags;

    // Save the updated photo
    await existingPhoto.save();

    // Add the new tags to the tag model and associate them with the photo
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

const searchByTag = async (req, res) => {
  try {
    const { tags, sort = "ASC", userId } = req.query;

    const errors = validateSearchTagQuery(tags, sort);
    if (errors.length > 0) return res.status(400).json({ errors });

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
    const existingTags = await tagModel.findAll({ where: { name: tags } });
    const photoIds = existingTags.map((tag) => tag.photoId);
    if (photoIds.length === 0) {
      return res.status(400).json({ message: "No tag found with this query" });
    }
    console.log(photoIds);
    const existingPhotos = await photoModel.findAll({
      where: { id: { [Op.in]: photoIds } },
      order: [["dateSaved", sort.toUpperCase()]],
    });
    if (existingPhotos.length === 0)
      return res
        .status(400)
        .json({ message: "No photos found with this PhotoId" });
    return res.status(200).json({ photos: existingPhotos });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch the photos" });
  }
};

const searchHistoryByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId)
      return res.status(404).json({ message: "User Id is required" });
    const existingUser = await userModel.findByPk(userId);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: `User not found with ID:${userId} in the DB` });
    }
    const latesthistory = await searchHistoryModel.findAll({
      where: { userId: userId },
      attributes: ["query", "timestamp"],
      order: [["timestamp", "DESC"]],
    });
    const extractedData = latesthistory.map((record) => ({
      query: record.dataValues.query,
      timestamp: record.dataValues.timestamp,
    }));
    console.log(extractedData);
    return res.status(201).json({ searchHistory: extractedData });
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
