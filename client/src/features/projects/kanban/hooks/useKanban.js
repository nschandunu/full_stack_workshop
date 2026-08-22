import { useEffect, useMemo, useState } from 'react';
import { KANBAN_STATUSES, createTask as createTaskRequest, deleteTask as deleteTaskRequest, getBoards, getTasks, moveTask as moveTaskRequest, updateTask as updateTaskRequest } from '../services/kanbanApi.js';

export function useKanban() {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadKanbanData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [boardList, taskList] = await Promise.all([getBoards(), getTasks()]);

        if (!isMounted) {
          return;
        }

        setBoards(boardList);
        setActiveBoardId(boardList[0]?.id ?? null);
        setTasks(taskList);
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError : new Error('Failed to load kanban data.'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadKanbanData();

    return () => {
      isMounted = false;
    };
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

  const syncTaskInState = (taskId, updater) => {
    setTasks((currentTasks) => currentTasks.map((task) => (task.id === taskId ? updater(task) : task)));
  };

  const addTask = async (taskInput) => {
    try {
      const createdTask = await createTaskRequest({
        ...taskInput,
        boardId: taskInput.boardId ?? board.id,
      });

      setTasks((currentTasks) => [...currentTasks, createdTask]);
      return createdTask;
    } catch (addError) {
      setError(addError instanceof Error ? addError : new Error('Failed to add task.'));
      throw addError;
    }
  };

  const editTask = async (taskId, changes) => {
    try {
      const updatedTask = await updateTaskRequest(taskId, changes);

      if (!updatedTask) {
        throw new Error('Task not found.');
      }

      syncTaskInState(taskId, () => updatedTask);
      return updatedTask;
    } catch (editError) {
      setError(editError instanceof Error ? editError : new Error('Failed to edit task.'));
      throw editError;
    }
  };

  const moveTaskToColumn = async (taskId, newStatus) => {
    if (!KANBAN_STATUSES.includes(newStatus)) {
      throw new Error('Invalid task status.');
    }

    try {
      const updatedTask = await moveTaskRequest(taskId, newStatus);

      if (!updatedTask) {
        throw new Error('Task not found.');
      }

      syncTaskInState(taskId, () => updatedTask);
      return updatedTask;
    } catch (moveError) {
      setError(moveError instanceof Error ? moveError : new Error('Failed to move task.'));
      throw moveError;
    }
  };

  const removeTask = async (taskOrId) => {
    const taskId = typeof taskOrId === 'string' ? taskOrId : taskOrId?.id;

    if (!taskId) {
      throw new Error('Task id is required.');
    }

    try {
      const deletedTask = await deleteTaskRequest(taskId);

      if (!deletedTask) {
        throw new Error('Task not found.');
      }

      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
      return deletedTask;
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError : new Error('Failed to remove task.'));
      throw removeError;
    }
  };

  const moveTask = async (task, nextStatus) => {
    if (!task || task.status === nextStatus || !KANBAN_STATUSES.includes(nextStatus)) {
      return;
    }

    await moveTaskToColumn(task.id, nextStatus);
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
    await addTask(taskInput);
  };

  const columns = [
    { id: 'todo', label: 'To Do' },
    { id: 'doing', label: 'Doing' },
    { id: 'done', label: 'Done' },
  ];

  return {
    board,
    boards,
    columns,
    tasks,
    tasksByColumn,
    activeTask,
    activeBoardId,
    setActiveBoardId,
    loading,
    error,
    addTask,
    editTask,
    moveTaskToColumn,
    removeTask,
    moveTask,
    handleDragStart,
    handleDragEnd,
    handleDropTask,
    handleAddTask,
  };
}
