const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const DEFAULT_BOARD_ID = 'board-1';

export const KANBAN_STATUSES = ['todo', 'doing', 'done'];

/**
 * Frontend uses status: 'todo' | 'doing' | 'done'
 * Backend uses columnId: 'col-todo' | 'col-inprogress' | 'col-done'
 */
const STATUS_TO_COL = {
  todo:  'col-todo',
  doing: 'col-inprogress',
  done:  'col-done',
};

const COL_TO_STATUS = {
  'col-todo':       'todo',
  'col-inprogress': 'doing',
  'col-done':       'done',
};

/** Backend task shape → kanban frontend shape */
function toKanban(task) {
  return {
    ...task,
    status:  COL_TO_STATUS[task.columnId] ?? 'todo',
    boardId: task.boardId ?? DEFAULT_BOARD_ID,
  };
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function getBoards() {
  // Board selection not in UI yet — return the default seeded board
  return [{ id: DEFAULT_BOARD_ID, name: 'CollabBoard', ownerId: 'system', createdAt: new Date().toISOString() }];
}

export async function getTasks() {
  const tasks = await apiFetch(`/tasks?boardId=${DEFAULT_BOARD_ID}`);
  return tasks.map(toKanban);
}

export async function getBoardTasks(boardId) {
  const tasks = await apiFetch(`/tasks?boardId=${boardId}`);
  return tasks.map(toKanban);
}

export async function createTask(taskInput) {
  const { status, ...rest } = taskInput;
  const task = await apiFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      ...rest,
      columnId: STATUS_TO_COL[status] ?? 'col-todo',
      boardId:  rest.boardId ?? DEFAULT_BOARD_ID,
    }),
  });
  return toKanban(task);
}

export async function updateTask(taskId, changes) {
  const { status, ...rest } = changes;
  const payload = { ...rest };
  if (status) payload.columnId = STATUS_TO_COL[status] ?? 'col-todo';

  const task = await apiFetch(`/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return toKanban(task);
}

export async function moveTask(taskId, newStatus) {
  if (!KANBAN_STATUSES.includes(newStatus)) return null;
  const task = await apiFetch(`/tasks/${taskId}/move`, {
    method: 'PUT',
    body: JSON.stringify({ targetColumnId: STATUS_TO_COL[newStatus] }),
  });
  return toKanban(task);
}

export async function deleteTask(taskId) {
  return apiFetch(`/tasks/${taskId}`, { method: 'DELETE' });
}
