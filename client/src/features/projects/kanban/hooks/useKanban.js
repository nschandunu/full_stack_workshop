import { useEffect, useMemo, useState } from 'react';
import { KANBAN_STATUSES, deleteTask as deleteTaskRequest, getBoardTasks, getBoards, updateTask as updateTaskRequest } from '../services/kanbanApi.js';

const defaultColumns = [
  { id: 'todo', label: 'To Do' },
  { id: 'doing', label: 'Doing' },
  { id: 'done', label: 'Done' },
];

export function useKanban() {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    void Promise.all([getBoards(), getBoardTasks('board-1')]).then(([boardList, taskList]) => {
      setBoards(boardList);
      setActiveBoardId(boardList[0]?.id ?? null);
      setTasks(taskList);
    });
  }, []);

  const board = boards.find((entry) => entry.id === activeBoardId) ?? boards[0] ?? { id: 'board-1', name: 'CollabBoard' };

  const tasksByColumn = useMemo(
    () =>
      tasks.reduce((accumulator, task) => {
        const status = KANBAN_STATUSES.includes(task.status) ? task.status : 'todo';
        accumulator[status] ??= [];
        accumulator[status].push(task);
        return accumulator;
      }, {}),
    [tasks],
  );

  const moveTask = async (task, nextStatus) => {
    if (!task || task.status === nextStatus || !KANBAN_STATUSES.includes(nextStatus)) {
      return;
    }

    setTasks((currentTasks) => currentTasks.map((item) => (item.id === task.id ? { ...item, status: nextStatus, updatedAt: new Date().toISOString() } : item)));
    await updateTaskRequest(task.id, { status: nextStatus, boardId: task.boardId });
  };

  const removeTask = async (task) => {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== task.id));
    await deleteTaskRequest(task.id);
  };

  const handleDragStart = (_event, task) => {
    setActiveTask(task);
  };

  const handleDragEnd = () => {
    setActiveTask(null);
  };

  const handleDropTask = (event, status) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const task = tasks.find((item) => item.id === taskId) ?? activeTask;

    if (task) {
      void moveTask(task, status);
    }

    setActiveTask(null);
  };

  const handleAddTask = async (taskInput) => {
    const now = new Date().toISOString();
    const createdTask = {
      id: crypto.randomUUID(),
      title: taskInput.title,
      description: taskInput.description ?? '',
      status: taskInput.status ?? 'todo',
      boardId: board.id,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((currentTasks) => [...currentTasks, createdTask]);
  };

  return {
    board,
    boards,
    columns: defaultColumns,
    tasks,
    tasksByColumn,
    activeTask,
    activeBoardId,
    setActiveBoardId,
    moveTask,
    removeTask,
    handleDragStart,
    handleDragEnd,
    handleDropTask,
    handleAddTask,
  };
}
