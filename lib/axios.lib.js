const axios = require("axios");
require("dotenv").config();
const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = { axiosInstance };
