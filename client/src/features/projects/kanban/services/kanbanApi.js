export const KANBAN_STATUSES = ['todo', 'doing', 'done'];

const sampleBoard = {
  id: 'board-1',
  name: 'CollabBoard',
  ownerId: 'owner-1',
  createdAt: '2026-08-08T09:00:00.000Z',
};

const sampleTasks = [
  {
    id: 'task-1',
    title: 'Define project scope',
    description: 'Confirm the first workshop milestone and deliverables.',
    assignee: 'Amina',
    priority: 'high',
    dueDate: '2026-08-10',
    status: 'todo',
    boardId: 'board-1',
    createdAt: '2026-08-08T09:10:00.000Z',
    updatedAt: '2026-08-08T09:10:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Build board shell',
    description: 'Lay out the Kanban board and core components.',
    assignee: 'Noah',
    priority: 'medium',
    dueDate: '2026-08-11',
    status: 'doing',
    boardId: 'board-1',
    createdAt: '2026-08-08T09:20:00.000Z',
    updatedAt: '2026-08-08T09:20:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Design task card',
    description: 'Show title, metadata, and move controls.',
    assignee: 'Lina',
    priority: 'medium',
    dueDate: '2026-08-12',
    status: 'todo',
    boardId: 'board-1',
    createdAt: '2026-08-08T09:30:00.000Z',
    updatedAt: '2026-08-08T09:30:00.000Z',
  },
  {
    id: 'task-4',
    title: 'Hook up drag and drop',
    description: 'Allow cards to move between workflow columns.',
    assignee: 'Kai',
    priority: 'high',
    dueDate: '2026-08-13',
    status: 'doing',
    boardId: 'board-1',
    createdAt: '2026-08-08T09:40:00.000Z',
    updatedAt: '2026-08-08T09:40:00.000Z',
  },
  {
    id: 'task-5',
    title: 'Prepare review notes',
    description: 'Capture open questions for the next workshop session.',
    assignee: 'Maya',
    priority: 'low',
    dueDate: '2026-08-14',
    status: 'done',
    boardId: 'board-1',
    createdAt: '2026-08-08T09:50:00.000Z',
    updatedAt: '2026-08-08T09:50:00.000Z',
  },
];

let tasksStore = [...sampleTasks];

const cloneTask = (task) => ({ ...task });

const normalizeTask = (task) => ({
  assignee: '',
  priority: 'medium',
  dueDate: '',
  description: '',
  boardId: sampleBoard.id,
  status: 'todo',
  ...task,
});

export async function getBoards() {
  return [sampleBoard];
}

export async function getTasks() {
  return tasksStore.map(cloneTask);
}

export async function getBoardTasks(boardId) {
  return tasksStore.filter((task) => task.boardId === boardId).map(cloneTask);
}

export async function createTask(taskInput) {
  const now = new Date().toISOString();
  const task = normalizeTask(taskInput);
  const createdTask = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  tasksStore = [...tasksStore, createdTask];
  return cloneTask(createdTask);
}

export async function updateTask(taskId, changes) {
  let updatedTask = null;

  tasksStore = tasksStore.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    updatedTask = {
      ...task,
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    return updatedTask;
  });

  return updatedTask ? cloneTask(updatedTask) : null;
}

export async function moveTask(taskId, newStatus) {
  if (!KANBAN_STATUSES.includes(newStatus)) {
    return null;
  }

  return updateTask(taskId, { status: newStatus });
}

export async function deleteTask(taskId) {
  const task = tasksStore.find((entry) => entry.id === taskId) ?? null;
  tasksStore = tasksStore.filter((entry) => entry.id !== taskId);
  return task ? cloneTask(task) : null;
}
