const subTaskModel = require('../models/subTaskModel');
const taskRepository = require('../repositories/taskRepository');

class TaskService {
  async createTask(taskData) {
    return await taskRepository.createTask(taskData);
  }

  async getTask(taskId) {
    console.log('service');
    return await taskRepository.getTaskById(taskId);
  }

// En el servicio (taskService.js)
async updateTask(taskId, updateData) {
  const task = await taskRepository.getTaskById(taskId);
  if (!task) {
    throw new Error('Tarea no encontrada');
  }

  const subtasks = await subTaskModel.find({ task: taskId, isDeleted: false });

  // Verificar si se intenta cambiar el estado a completada sin todas las subtareas completas
  if (updateData.status === 'completada') {
    const allSubtasksCompleted = subtasks.every(subtask => subtask.status === 'completada');
    if (!allSubtasksCompleted) {
      throw new Error('No puedes cambiar el estado de la tarea a completada hasta que todas las subtareas estén completas');
    }
  }
  console.log('aun asi cambia el valor?');
  console.log(updateData);
  // Actualizar la tarea
  Object.assign(task, updateData);

  return await task.save();
}




  async deleteTask(taskId) {
    return await taskRepository.deleteTask(taskId);
  }

  async getTasksByUser(userId) {
    return await taskRepository.getTasksByUser(userId);
  }

  async updateTaskStatus(taskId) {
    // Obtener la tarea
    const task = await taskRepository.getTaskById(taskId);
    console.log('gola');
    console.log(task);
    if (!task) {
      throw new Error('Tarea no encontrada');
    }

    // Obtener las subtareas asociadas a la tarea
    const subtasks = await subTaskModel.find({ task: taskId, isDeleted: false });

    // Verificar si no hay subtareas o si todas las subtareas están completadas
    const allSubtasksCompleted = subtasks.length > 0 && subtasks.every(subtask => subtask.status === 'completada');

    // Actualizar el estado de la tarea principal
    if (subtasks.length === 0 || !allSubtasksCompleted) {
      task.status = 'pendiente'; // Marcar la tarea como 'pendiente' si no hay subtareas o alguna no está completada
    } else {
      task.status = 'completada'; // Marcar la tarea como 'completada' si todas las subtareas están completadas
    }


    // Guardar la tarea actualizada
    return await task.save();

  }
}

module.exports = new TaskService();