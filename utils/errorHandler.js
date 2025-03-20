const handleError = (res, error, mensajeGenerico = 'Ocurrió un error inesperado') => {
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: `Error de validación: ${mensajes.join(', ')}`
      });
    }
  
    // Otros errores
    return res.status(500).json({ error: mensajeGenerico });
  };
  
  module.exports = handleError;
  