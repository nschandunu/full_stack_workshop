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

module.exports = {
  validateCreateTask,
};
