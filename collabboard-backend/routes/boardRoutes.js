const express = require('express');
const router = express.Router();

const {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumn
} = require('../controllers/boardController');

const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Kanban board management
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards owned by the authenticated user
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 64abc123def456
 *                   title:
 *                     type: string
 *                     example: Sprint Board
 *                   owner:
 *                     type: string
 *                     example: 64abc000aaa111
 *                   columns:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: To Do
 *                         order:
 *                           type: integer
 *                           example: 0
 *       401:
 *         description: Missing or invalid token
 *       500:
 *         description: Server error
 */
router.get('/', getBoards);

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Project Board
 *     responses:
 *       201:
 *         description: Board created with default columns (To Do, Doing, Done)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 owner:
 *                   type: string
 *                 columns:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Title is required
 *       401:
 *         description: Missing or invalid token
 *       500:
 *         description: Server error
 */
router.post('/', createBoard);

/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Update a board's title
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *         example: 64abc123def456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Board Name
 *     responses:
 *       200:
 *         description: Board updated successfully
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Board not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateBoard);

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete a board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *         example: 64abc123def456
 *     responses:
 *       200:
 *         description: Board deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board deleted
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Board not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteBoard);

/**
 * @swagger
 * /boards/{id}/columns:
 *   post:
 *     summary: Add a new column to a board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Board ID
 *         example: 64abc123def456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: In Review
 *     responses:
 *       201:
 *         description: Column added — returns updated board
 *       400:
 *         description: Column name is required
 *       401:
 *         description: Missing or invalid token
 *       404:
 *         description: Board not found
 *       500:
 *         description: Server error
 */
router.post('/:id/columns', addColumn);

module.exports = router;
