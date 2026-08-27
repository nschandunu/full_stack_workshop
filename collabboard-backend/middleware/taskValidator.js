const VALID_PRIORITIES = ["low", "medium", "high"];

const validateCreateTask = (req, res, next) => {
  const { title, columnId, priority } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: { message: "Field 'title' is required and cannot be empty." } });
  }

  if (!columnId || typeof columnId !== "string" || columnId.trim() === "") {
    return res.status(400).json({ error: { message: "Field 'columnId' is required." } });
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: { message: `Priority must be one of: ${VALID_PRIORITIES.join(", ")}` } });
  }

  next();
};

const validateMoveTask = (req, res, next) => {
  const { targetColumnId } = req.body;

  if (!targetColumnId || typeof targetColumnId !== "string" || targetColumnId.trim() === "") {
    return res.status(400).json({ error: { message: "Field 'targetColumnId' is required to move a task." } });
  }

  next();
};

module.exports = {
  validateCreateTask,
  validateMoveTask,
};
