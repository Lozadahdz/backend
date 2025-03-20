const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: {
      values: ['pendiente', 'completada'],
      message: 'El estado debe ser "pendiente" o "completada"', // Mensaje de error personalizado
    },
    default: 'pendiente',
  },  
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'task', required: [true, 'Debes tener una tarea asociada']},
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Aquí registras el modelo Subtask
module.exports = mongoose.model('subTask', subtaskSchema);
