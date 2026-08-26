// routes/boards.js
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/', boardController.getAllBoards);
router.post('/', boardController.createBoard);
router.get('/:id', boardController.getBoardById);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

// Column-specific endpoints
router.post('/:id/columns', boardController.addColumn);
router.delete('/:id/columns/:columnId', boardController.deleteColumn);

module.exports = router;