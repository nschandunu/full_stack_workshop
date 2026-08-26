const Board = require('../models/Board');

// GET /api/boards
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id });
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch boards', error: err.message });
  }
};

// POST /api/boards
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const board = await Board.create({
      title,
      owner: req.user.id,
      columns: [
        { name: 'To Do', order: 0 },
        { name: 'Doing', order: 1 },
        { name: 'Done', order: 2 }
      ]
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create board', error: err.message });
  }
};
// PUT /api/boards/:id
exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { title: req.body.title },
      { new: true, runValidators: true }
    );
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update board', error: err.message });
  }
};

// DELETE /api/boards/:id
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!board) return res.status(404).json({ message: 'Board not found' });
    // TODO: coordinate with Member 4 to also delete tasks tied to this board's columns
    res.status(200).json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete board', error: err.message });
  }
};