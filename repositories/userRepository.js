const User = require('../models/userModel');

const findByEmail = (email) => {
  return User.findOne({ email });
};

const findById = (id) => {
  return User.findById(id);
};

const createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

module.exports = {
  findByEmail,
  findById,
  createUser,
};
