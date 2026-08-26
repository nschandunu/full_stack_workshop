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

router.get('/', getBoards);
router.post('/', createBoard);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);
router.post('/:id/columns', addColumn);

module.exports = router;