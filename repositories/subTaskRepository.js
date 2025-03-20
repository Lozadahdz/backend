const Subtask = require('../models/subTaskModel');

class SubtaskRepository {
  async createSubtask(subtaskData) {

    const subtask = new Subtask(subtaskData);
    return await subtask.save();
  }

  async getSubTaskByTaskId(taskId) {
    try {
      console.log('reposity');
      console.log(taskId);
      // Buscar todas las subtareas que pertenecen a la tarea con el ID proporcionado
      const subtasks = await Subtask.find({ task: taskId, isDeleted: false });
  
      return subtasks; // Devuelve las subtareas encontradas
    } catch (error) {
      console.error('Error al obtener las subtareas:', error.message);
      throw error; // Lanza el error para manejarlo en un nivel superior
    }
  }

  async getSubtaskById(subtaskId) {
    return await Subtask.findOne({ _id: subtaskId, isDeleted: false });
  }

  async updateSubtask(subtaskId, updateData) {
    return await Subtask.findOneAndUpdate(
      { _id: subtaskId, isDeleted: false },
      updateData,
      { new: true }
    );
  }

  async deleteSubtask(subtaskId) {
    return await Subtask.findOneAndUpdate(
      { _id: subtaskId, isDeleted: false },
      { isDeleted: true, deletedAt: Date.now() }, // Establecer isDeleted y deletedAt
      { new: true }
    );
  }
}

module.exports = new SubtaskRepository();