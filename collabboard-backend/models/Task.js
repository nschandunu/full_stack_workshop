let tasks = [
  {
    id: "task-1",
    title: "Set up project scaffolding",
    description: "Initialise Vite + React, configure ESLint and Prettier.",
    columnId: "col-done",
    boardId: "board-1",
    priority: "high",
    assignee: "user-1",
    dueDate: "2026-08-10T23:59:59.000Z",
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-02T10:30:00.000Z",
  },
  {
    id: "task-2",
    title: "Design board layout",
    description: "Wireframe the column and card components.",
    columnId: "col-inprogress",
    boardId: "board-1",
    priority: "medium",
    assignee: "user-2",
    dueDate: "2026-08-10T23:59:59.000Z",
    createdAt: "2026-08-03T09:00:00.000Z",
    updatedAt: "2026-08-08T08:15:00.000Z",
  },
  {
    id: "task-3",
    title: "Implement drag-and-drop",
    description: "Use @dnd-kit to enable card reordering between columns.",
    columnId: "col-inprogress",
    boardId: "board-1",
    priority: "high",
    assignee: "user-3",
    dueDate: "2026-08-15T23:59:59.000Z",
    createdAt: "2026-08-04T11:00:00.000Z",
    updatedAt: "2026-08-08T09:00:00.000Z",
  },
  {
    id: "task-4",
    title: "Write unit tests for schemas",
    description: "Cover all Zod schemas with Vitest test cases.",
    columnId: "col-todo",
    boardId: "board-1",
    priority: "low",
    assignee: "user-1",
    dueDate: "2026-08-20T23:59:59.000Z",
    createdAt: "2026-08-05T14:00:00.000Z",
    updatedAt: "2026-08-05T14:00:00.000Z",
  },
];

const Task = {
  tasks,
  findAll: ({ boardId, columnId } = {}) => {
    let result = [...tasks];
    if (boardId) {
      result = result.filter((t) => t.boardId === boardId);
    }
    if (columnId) {
      result = result.filter((t) => t.columnId === columnId);
    }
    return result;
  },
};

module.exports = Task;