// controllers/boardController.js
const Board = require('../models/Board');

exports.getAllBoards = async (req, res, next) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (err) {
    next(err); // let Member 1's global error handler catch it
  }
};

exports.createBoard = async (req, res, next) => {
  try {
    const { title, columns } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Board title is required' });
    }
    const board = await Board.create({
      title,
      columns: columns || [{ name: 'To Do' }, { name: 'Doing' }, { name: 'Done' }]
    });
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
};