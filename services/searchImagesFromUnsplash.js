const { axiosInstance } = require("../lib/axios.lib");
require("dotenv").config();

const searchImagesFromUnsplash = async (query) => {
  try {
    const access_key = process.env.UNSPLASH_ACCESS_KEY;
    if (!access_key) {
      throw new Error("Unable to fetch the access key from .env");
    }
    const response = await axiosInstance.get(`/search/photos`, {
      params: { query, per_page: 10 },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Unsplash API returned status: ${response.status}`);
    }

    const photos = [];
    const results = response.data.results;
    for (let i = 0; i < results.length; i++) {
      const photo = results[i];
      photos.push({
        imageUrl: photo.urls.small,
        description: photo.description || "No description available",
        altDescription:
          photo.alt_description || "No alternative description available",
      });
    }
    return photos;
  } catch (error) {
    const errorMessage =
      error?.message || "Failed to fetch images from Unsplash.";
    throw new Error(errorMessage);
  }
};

module.exports = { searchImagesFromUnsplash };
