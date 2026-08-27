// @ts-check
import {
  TaskSchema,
  ColumnSchema,
  BoardSchema,
  UserSchema,
} from "./types.jsx";
import {
  mockBoard,
  mockColumns,
  mockTasks,
  mockUsers,
} from "./mockData.jsx";

/**
 * @typedef {import("./types.jsx").Task}   Task
 * @typedef {import("./types.jsx").Column} Column
 * @typedef {import("./types.jsx").Board}  Board
 * @typedef {import("./types.jsx").User}   User
 */

/** @type {Board} */
let _board = JSON.parse(JSON.stringify(mockBoard));

/** @type {Column[]} */
let _columns = JSON.parse(JSON.stringify(mockColumns));

/** @type {Task[]} */
let _tasks = JSON.parse(JSON.stringify(mockTasks));

/** @type {User[]} */
let _users = JSON.parse(JSON.stringify(mockUsers));

/**
 * @returns {Promise<Board>}
 */
export async function getBoard() {
  return BoardSchema.parse(_board);
}

/**
 * @returns {Promise<Column[]>}
 */
export async function getColumns() {
  const sorted = [..._columns].sort((a, b) => a.order - b.order);
  return sorted.map((col) => ColumnSchema.parse(col));
}

/**
 * @param {Omit<Column, "taskIds"> & { taskIds?: string[] }} column
 * @returns {Promise<Column>}
 */
export async function addColumn(column) {
  const parsed = ColumnSchema.parse({ taskIds: [], ...column });
  _columns.push(parsed);
  _board.columnIds.push(parsed.id);
  return parsed;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

/**
 * @returns {Promise<Task[]>}
 */
export async function getAllTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    if (res.ok) {
      const serverTasks = await res.json();
      if (Array.isArray(serverTasks) && serverTasks.length > 0) {
        _tasks = serverTasks.map((t) => TaskSchema.parse(t));
        return _tasks;
      }
    }
  } catch {
    // fallback to local state
  }
  return _tasks.map((t) => TaskSchema.parse(t));
}

/**
 * @param {string} columnId
 * @returns {Promise<Task[]>}
 */
export async function getTasksByColumn(columnId) {
  const col = _columns.find((c) => c.id === columnId);
  if (!col) return [];
  const ordered = col.taskIds
    .map((id) => _tasks.find((t) => t.id === id))
    .filter(/** @param {Task | undefined} t @returns {t is Task} */ (t) => t !== undefined);
  return ordered.map((t) => TaskSchema.parse(t));
}

/**
 * @param {string} taskId
 * @returns {Promise<Task | null>}
 */
export async function getTask(taskId) {
  const task = _tasks.find((t) => t.id === taskId);
  return task ? TaskSchema.parse(task) : null;
}

/**
 * @param {Task} task
 * @returns {Promise<Task>}
 */
export async function saveTask(task) {
  const parsed = TaskSchema.parse(task);
  _tasks.push(parsed);
  const col = _columns.find((c) => c.id === parsed.columnId);
  if (col && !col.taskIds.includes(parsed.id)) {
    col.taskIds.push(parsed.id);
  }
  return parsed;
}

/**
 * @param {Omit<Task, "id" | "createdAt" | "updatedAt"> & { id?: string }} taskData
 * @returns {Promise<Task>}
 */
export async function createTask(taskData) {
  const now = new Date().toISOString();
  const newTask = {
    id: taskData.id || `task-${Date.now()}`,
    title: taskData.title,
    description: taskData.description || "",
    columnId: taskData.columnId || "col-todo",
    priority: taskData.priority || "medium",
    assignee: taskData.assignee || "user-1",
    dueDate: taskData.dueDate || now,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    if (res.ok) {
      const serverTask = await res.json();
      const parsed = TaskSchema.parse(serverTask);
      _tasks.push(parsed);
      const col = _columns.find((c) => c.id === parsed.columnId);
      if (col && !col.taskIds.includes(parsed.id)) {
        col.taskIds.push(parsed.id);
      }
      return parsed;
    }
  } catch {
    // fallback
  }

  return saveTask(newTask);
}

/**
 * @param {string} taskId
 * @param {Partial<Task>} updates
 * @returns {Promise<Task>}
 */
export async function updateTask(taskId, updates) {
  try {
    await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
  } catch {
    // fallback
  }

  const idx = _tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) throw new Error(`Task "${taskId}" not found.`);

  const original = _tasks[idx];

  if (updates.columnId && updates.columnId !== original.columnId) {
    const oldCol = _columns.find((c) => c.id === original.columnId);
    if (oldCol) oldCol.taskIds = oldCol.taskIds.filter((id) => id !== taskId);

    const newCol = _columns.find((c) => c.id === updates.columnId);
    if (newCol && !newCol.taskIds.includes(taskId)) newCol.taskIds.push(taskId);
  }

  const merged = TaskSchema.parse({
    ...original,
    ...updates,
    id: taskId,
    updatedAt: new Date().toISOString(),
  });
  _tasks[idx] = merged;
  return merged;
}

/**
 * @param {string} taskId
 * @returns {Promise<boolean>}
 */
export async function deleteTask(taskId) {
  try {
    await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: "DELETE",
    });
  } catch {
    // fallback
  }

  const idx = _tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) return false;

  const [removed] = _tasks.splice(idx, 1);
  const col = _columns.find((c) => c.id === removed.columnId);
  if (col) col.taskIds = col.taskIds.filter((id) => id !== taskId);

  return true;
}

/**
 * @returns {Promise<User[]>}
 */
export async function getUsers() {
  return _users.map((u) => UserSchema.parse(u));
}

/**
 * @param {string} userId
 * @returns {Promise<User | null>}
 */
export async function getUser(userId) {
  const user = _users.find((u) => u.id === userId);
  return user ? UserSchema.parse(user) : null;
}
