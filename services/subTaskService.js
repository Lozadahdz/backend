const subtaskRepository = require('../repositories/subTaskRepository');
const taskService = require('./taskService');

class SubtaskService {

  async getSubTaskByTaskId(taskId) {
    const subtask = await subtaskRepository.getSubTaskByTaskId(taskId);
    //await taskService.updateTaskStatus(subtask.task); // Actualizar estado de la tarea padre
    return subtask;
  }
  async createSubtask(subtaskData) {
    console.log('service');
    const subtask = await subtaskRepository.createSubtask(subtaskData);
    console.log(subtask.task);
    await taskService.updateTaskStatus(subtask.task); // Actualizar estado de la tarea padre
    return subtask;
  }

  async updateSubtask(subtaskId, updateData) {
    const subtask = await subtaskRepository.updateSubtask(subtaskId, updateData);
    await taskService.updateTaskStatus(subtask.task); // Actualizar estado de la tarea padre
    return subtask;
  }

  async deleteSubtask(subtaskId) {
    const subtask = await subtaskRepository.deleteSubtask(subtaskId);
    await taskService.updateTaskStatus(subtask.task); // Actualizar estado de la tarea padre
    return subtask;
  }

}

module.exports = new SubtaskService();