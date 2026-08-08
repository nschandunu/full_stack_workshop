export const KANBAN_STATUSES = ['todo', 'doing', 'done'];

const sampleBoard = {
  id: 'board-1',
  name: 'CollabBoard',
  ownerId: 'owner-1',
  createdAt: new Date().toISOString(),
};

const sampleTasks = [
  {
    id: 'task-1',
    title: 'Define project scope',
    description: 'Confirm the first workshop milestone and deliverables.',
    status: 'todo',
    boardId: 'board-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Build board shell',
    description: 'Lay out the Kanban board and core components.',
    status: 'doing',
    boardId: 'board-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getBoards() {
  return [sampleBoard];
}

export async function getBoardTasks(boardId) {
  return sampleTasks.filter((task) => task.boardId === boardId);
}

export async function createTask(taskInput) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...taskInput,
  };
}

export async function updateTask(taskId, changes) {
  return {
    id: taskId,
    updatedAt: new Date().toISOString(),
    ...changes,
  };
}

export async function deleteTask(taskId) {
  return { id: taskId, deleted: true };
}
