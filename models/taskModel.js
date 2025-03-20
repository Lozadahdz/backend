const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'El título es obligatorio'] },
  description: { type: String },
  status: {
    type: String,
    enum: {
      values: ['pendiente', 'completada'],
      message: 'El estado debe ser "pendiente" o "completada"', // Mensaje de error personalizado
    },
    default: 'pendiente',
  },
  //subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subTask' }], // Referencia a SubTask
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('task', taskSchema); // Asegúrate de usar "Task" con mayúscula
module.exports = Task;