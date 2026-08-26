const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.query;
    const tasks = Task.findAll({ boardId, columnId });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
};
