const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
require("dotenv").config();
const {
  createNewUser,
  searchImages,
  saveNewPhotos,
  addTags,
  searchByTag,
  searchHistoryByUserId,
} = require("./controllers/dataController");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/users", createNewUser);
app.get("/search/photos", searchImages);
app.post("/photos", saveNewPhotos);
app.post("/api/photos/:photoId/tags", addTags);
app.get("/api/photos/tag/search", searchByTag);
app.get("/api/search-history", searchHistoryByUserId);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("unable to connect to database", error);
  });

app.listen(3002, () => {
  console.log(`server started at port${3002}`);
});
module.exports = { app };
