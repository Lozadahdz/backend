const subtaskService = require('../services/subTaskService');
const handleError = require('../utils/errorHandler');

// Crear una nueva subtarea
exports.getSubTaskByTaskId = async (req, res) => {
  try {

    const subtask = await subtaskService.getSubTaskByTaskId(req.params.taskId);

    res.status(201).json(subtask);
  } catch (error) {
    console.log(error);
        handleError(res, error, 'Ocurrió un error al obtener las sub-tareas');
  }
};

exports.createSubtask = async (req, res) => {
  try {
    console.log('estoy en subtask');
    const subtask = await subtaskService.createSubtask(req.body);
    console.log(subtask);

    res.status(201).json(subtask);
  } catch (error) {
    console.log(error);
        handleError(res, error, 'Ocurrió un error al crear la sub-tarea');
  }
};

// Actualizar una subtarea
exports.updateSubtask = async (req, res) => {
  try {
    const subtask = await subtaskService.updateSubtask(req.params.subtaskId, req.body);
    if (!subtask) {
      return res.status(404).json({ error: 'Subtarea no encontrada' });
    }
    res.status(200).json(subtask);
  } catch (error) {
        handleError(res, error, 'Ocurrió un error al editar sub-tarea');
  }
};

// Eliminar una subtarea (borrado lógico)
exports.deleteSubtask = async (req, res) => {
  try {
    const subtask = await subtaskService.deleteSubtask(req.params.subtaskId);
    if (!subtask) {
      return res.status(404).json({ error: 'Subtarea no encontrada' });
    }
    res.status(200).json({ message: 'Subtarea marcada como eliminada', subtask });
  } catch (error) {
        handleError(res, error, 'Ocurrió un error al borrar sub-tarea');
  }
};

// Obtener el historial de subtareas eliminadas
exports.getDeletedSubtasks = async (req, res) => {
  try {
    const deletedSubtasks = await subtaskService.getDeletedSubtasks();
    res.status(200).json(deletedSubtasks);
  } catch (error) {
        handleError(res, error, 'Ocurrió un error al obtener sub-tareas borradas');
  }
};

// Restaurar una subtarea eliminada
exports.restoreSubtask = async (req, res) => {
  try {
    const subtask = await subtaskService.restoreSubtask(req.params.subtaskId);
    if (!subtask) {
      return res.status(404).json({ error: 'Subtarea no encontrada o no eliminada' });
    }
    res.status(200).json({ message: 'Subtarea restaurada', subtask });
  } catch (error) {
        handleError(res, error, 'Ocurrió un error al crear sub-tarea');
  }
};