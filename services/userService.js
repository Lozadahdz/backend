const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

const registerUser = async (name, email, password) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  const newUser = await userRepository.createUser({ name, email, password });

  return {
    name: newUser.name,
    email: newUser.email,
  };
};

const loginUser = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

  return { token };
};

const getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return {
    name: user.name,
    email: user.email,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
