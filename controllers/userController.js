const userService = require('../services/userService');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userData = await userService.registerUser(name, email, password);
    res.status(201).json({
      message: 'Usuario registrado',
      user: userData,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    const status = err.message === 'Usuario no encontrado' || err.message === 'Contraseña incorrecta' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const profile = await userService.getUserProfile(req.userId);
    res.status(200).json(profile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
