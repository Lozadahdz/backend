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
  try {
    // Buscar el usuario por correo electrónico
    const user = await userRepository.findByEmail(email);
    
    // Verificar si el usuario no existe
    if (!user) {
      throw { status: 404, message: 'Usuario no encontrado' };
    }

    // Verificar que la contraseña coincida
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw { status: 401, message: 'Contraseña incorrecta' };
    }

    // Crear el payload con la información relevante
    const payload = {
      userId: user._id,
      email: user.email,  // Puedes agregar más datos aquí si lo necesitas
    };

    // Firmar el JWT con la clave secreta y el tiempo de expiración
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

    // Retornar el token al usuario
    return { token, user: {
      id: user._id,
      email: user.email,
      name: user.name, // Si tienes un campo de nombre
    },};
    
  } catch (error) {
    // En caso de error, manejarlo apropiadamente
    if (error.status) {
      throw error;  // Si es un error personalizado, se lanza tal cual
    }
    throw { status: 500, message: 'Error en el servidor', details: error.message };
  }
}

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
