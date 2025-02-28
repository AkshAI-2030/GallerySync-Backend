const request = require("supertest");
const express = require("express");
const {
  createNewUser,
  searchImages,
  saveNewPhotos,
  addTags,
  searchByTag,
  searchHistoryByUserId,
} = require("../controllers/dataController");
const {
  user: userModel,
  photo: photoModel,
  tag: tagModel,
  searchHistory: searchHistoryModel,
} = require("../models");
const {
  searchImagesFromUnsplash,
} = require("../services/searchImagesFromUnsplash");
const { doesUserExist } = require("../services/userService");

jest.mock("../models");
jest.mock("../services/searchImagesFromUnsplash");
jest.mock("../services/userService");

const app = express();
app.use(express.json());
app.post("/user", createNewUser);
app.get("/search", searchImages);
app.post("/save-photo", saveNewPhotos);
app.post("/add-tags/:photoId", addTags);
app.get("/search-tag", searchByTag);
app.get("/search-history", searchHistoryByUserId);

describe("Data Controller API Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new user successfully", async () => {
    doesUserExist.mockResolvedValue(false);
    userModel.create.mockResolvedValue({
      id: 1,
      username: "testuser",
      email: "test@example.com",
    });

    const res = await request(app)
      .post("/user")
      .send({ username: "testuser", email: "test@example.com" });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User created successfully.");
  });

  test("should return error when email already exists", async () => {
    doesUserExist.mockResolvedValue(true);

    const res = await request(app)
      .post("/user")
      .send({ username: "testuser", email: "test@example.com" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already exists.");
  });

  test("should search images successfully", async () => {
    searchImagesFromUnsplash.mockResolvedValue([
      { imageUrl: "http://image.com" },
    ]);

    const res = await request(app).get("/search").query({ query: "nature" });
    expect(res.status).toBe(200);
    expect(res.body.photos).toHaveLength(1);
  });

  test("should return error for no images found", async () => {
    searchImagesFromUnsplash.mockResolvedValue([]);

    const res = await request(app).get("/search").query({ query: "unknown" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("No images found for the given query.");
  });

  test("should save new photo successfully", async () => {
    photoModel.create.mockResolvedValue({
      id: 1,
      imageUrl: "http://image.com",
      tags: ["tag1"],
    });
    tagModel.bulkCreate.mockResolvedValue(true);

    const res = await request(app)
      .post("/save-photo")
      .send({
        imageUrl: "https://images.unsplash.com/photo",
        description: "Beautiful landscape",
        altDescription: "Mountain view silicon valley.",
        tags: ["nature", "mountain", "greenery", "snow"],
        userId: 4,
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Photo saved successfully.");
  });

  test("should add tags to a photo successfully", async () => {
    photoModel.findByPk.mockResolvedValue({
      id: 1,
      tags: ["oldTag"],
      save: jest.fn(),
    });
    tagModel.bulkCreate.mockResolvedValue(true);

    const res = await request(app)
      .post("/add-tags/1")
      .send({ tags: ["newTag"] });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Tags added successfully.");
  });

  test("should return error if photo not found for adding tags", async () => {
    photoModel.findByPk.mockResolvedValue(null);

    const res = await request(app)
      .post("/add-tags/1")
      .send({ tags: ["newTag"] });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Photo not found with this ID.");
  });

  test("should fetch search history successfully", async () => {
    userModel.findByPk.mockResolvedValue(true);
    searchHistoryModel.findAll.mockResolvedValue([
      { query: "nature", timestamp: "2024-07-25T12:00:00Z" },
    ]);

    const res = await request(app).get("/search-history").query({ userId: 1 });
    expect(res.status).toBe(200);
    expect(res.body.searchHistory).toHaveLength(1);
  });

  test("should return error if user not found in search history", async () => {
    userModel.findByPk.mockResolvedValue(null);

    const res = await request(app).get("/search-history").query({ userId: 1 });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User not found with ID:1 in the DB");
  });
});
