const express = require('express');
const subtaskController = require('../controllers/subTaskController');

const router = express.Router();
router.get('/:taskId', subtaskController.getSubTaskByTaskId);
router.post('/', subtaskController.createSubtask);
router.put('/:subtaskId', subtaskController.updateSubtask);
router.delete('/:subtaskId', subtaskController.deleteSubtask);
//router.get('/deleted/subtasks', subtaskController.getDeletedSubtasks); // Historial de subtareas eliminadas
router.patch('/restore/:subtaskId', subtaskController.restoreSubtask); // Restaurar subtarea eliminada

module.exports = router;