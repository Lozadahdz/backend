const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware'); 


router.use(protect); 

router.post('/', taskController.createTask);
router.get('/:taskId', taskController.getTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);
router.get('/user/:userId', taskController.getTasksByUser);
router.get('/deleted/tasks', taskController.getDeletedTasks); 
//router.patch('/restore/:taskId', taskController.restoreTask); 

module.exports = router;
