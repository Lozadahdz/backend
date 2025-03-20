const taskService = require('../services/taskService');
const handleError = require('../utils/errorHandler');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    handleError(res, error, 'Ocurrió un error al crear la tarea');
  }
};


// Obtener una tarea por su ID
exports.getTask = async (req, res) => {
  try {
    const task = await taskService.getTask(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    handleError(res, error, 'Ocurrió un error al consultar la tarea.');
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.taskId, req.body);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
     // Verificar si el error tiene el mensaje específico
     if (error.message === 'No puedes cambiar el estado de la tarea a completada hasta que todas las subtareas estén completas') {
      return res.status(400).json({ error: error.message });
    }

    // Si el error no es el esperado, manejamos el error de forma genérica
    return res.status(500).json({ error: 'Ocurrió un error al editar la tarea', details: error.message });
  }
};

// Eliminar una tarea (borrado lógico)
exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea marcada como eliminada', task });
  } catch (error) {
    handleError(res, error, 'Ocurrió un error al borrar la tarea');

  }
};

// Obtener todas las tareas de un usuario
exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUser(req.params.userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    handleError(res, error, 'Ocurrió un error al obtener las tareas');
  }
};

// Obtener el historial de tareas eliminadas
exports.getDeletedTasks = async (req, res) => {
  try {
    const deletedTasks = await taskService.getDeletedTasks();
    res.status(200).json(deletedTasks);
  } catch (error) {
    console.log(error);
    handleError(res, error, 'Ocurrió un error al obtener las tareas eliminadas');
  }
};

// Restaurar una tarea eliminada
/* exports.restoreTask = async (req, res) => {
  try {
    const task = await taskService.restoreTask(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada o no eliminada' });
    }
    res.status(200).json({ message: 'Tarea restaurada', task });
  } catch (error) {
    handleError(res, error, 'Ocurrió un error al restaurar la tarea');
  }
};
 */
