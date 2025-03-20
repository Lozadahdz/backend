const Task = require('../models/taskModel');
const Subtask = require('../models/subTaskModel');  // Importa el modelo de Subtask

class TaskRepository {
  async createTask(taskData) {
    console.log('repo');
    const task = new Task(taskData);
    return await task.save();
  }

  async getTaskById(taskId) {
    console.log('repo');
    return await Task.findOne({ _id: taskId, isDeleted: false });
  }

  async updateTask(taskId, updateData) {
    return await Task.findOneAndUpdate(
      { _id: taskId, isDeleted: false },
      updateData,
      { new: true, runValidators: true } 
    );
  }

  async deleteTask(taskId) {
    return await Task.findOneAndUpdate(
      { _id: taskId, isDeleted: false },
      { isDeleted: true, deletedAt: Date.now() }, 
      { new: true }
    );
  }

  async getTasksByUser(userId) {
    return await Task.find({ user: userId, isDeleted: false });
  }
}

module.exports = new TaskRepository();