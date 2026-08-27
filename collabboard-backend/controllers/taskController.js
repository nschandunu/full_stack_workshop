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

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: { message: `Task with id '${id}' not found.` } });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, columnId, boardId, priority, assignee, dueDate } = req.body;
    const newTask = Task.create({
      title: title.trim(),
      description,
      columnId,
      boardId,
      priority,
      assignee,
      dueDate,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
};
