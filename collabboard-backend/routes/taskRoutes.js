const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateCreateTask, validateMoveTask } = require('../middleware/taskValidator');

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validateCreateTask, taskController.createTask);
router.put('/:id/move', validateMoveTask, taskController.moveTask);

module.exports = router;