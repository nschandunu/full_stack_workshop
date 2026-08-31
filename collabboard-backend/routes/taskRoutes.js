const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { validateCreateTask, validateMoveTask } = require('../middleware/taskValidator');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks (optionally filtered by board or column)
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: boardId
 *         schema:
 *           type: string
 *         description: Filter tasks by board ID
 *         example: board-1
 *       - in: query
 *         name: columnId
 *         schema:
 *           type: string
 *         description: Filter tasks by column ID
 *         example: col-todo
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: task-1
 *                   title:
 *                     type: string
 *                     example: Build login page
 *                   description:
 *                     type: string
 *                     example: Implement the login form with validation
 *                   columnId:
 *                     type: string
 *                     example: col-todo
 *                   boardId:
 *                     type: string
 *                     example: board-1
 *                   priority:
 *                     type: string
 *                     enum: [low, medium, high]
 *                     example: high
 *                   assignee:
 *                     type: string
 *                     example: Senuka
 *                   dueDate:
 *                     type: string
 *                     format: date
 *                     example: 2026-09-15
 *       500:
 *         description: Server error
 */
router.get('/', taskController.getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: task-1
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 columnId:
 *                   type: string
 *                 boardId:
 *                   type: string
 *                 priority:
 *                   type: string
 *                 assignee:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, columnId, boardId]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design landing page
 *               description:
 *                 type: string
 *                 example: Create wireframes and final mockup
 *               columnId:
 *                 type: string
 *                 example: col-todo
 *               boardId:
 *                 type: string
 *                 example: board-1
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               assignee:
 *                 type: string
 *                 example: Kasun
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-20
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation failed — title, columnId, or boardId missing
 *       500:
 *         description: Server error
 */
router.post('/', validateCreateTask, taskController.createTask);

/**
 * @swagger
 * /tasks/{id}/move:
 *   put:
 *     summary: Move a task to a different column
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: task-1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [targetColumnId]
 *             properties:
 *               targetColumnId:
 *                 type: string
 *                 example: col-doing
 *     responses:
 *       200:
 *         description: Task moved successfully
 *       400:
 *         description: Validation failed — targetColumnId missing
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put('/:id/move', validateMoveTask, taskController.moveTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task (full or partial)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: task-1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task title
 *               description:
 *                 type: string
 *               columnId:
 *                 type: string
 *               boardId:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               assignee:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Partially update a task (same as PUT)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: task-1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               assignee:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put('/:id', taskController.updateTask);
router.patch('/:id', taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *         example: task-1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task 'task-1' deleted successfully.
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;
