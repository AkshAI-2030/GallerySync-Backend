const { user: userModel } = require("../models");

async function doesUserExist(email) {
  const existingUser = await userModel.findOne({ where: { email } });
  return !!existingUser; // Returns true if user exists, false for null value.
}

module.exports = {
  doesUserExist,
};
