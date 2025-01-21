const { user: userModel } = require("../models");

async function doesUserExist(email) {
  console.log(userModel); // This should log the model object
  const user = await userModel.findOne({ where: { email: email } });
  return !!user; // Returns true if user exists, false otherwise
}

module.exports = {
  doesUserExist,
};
