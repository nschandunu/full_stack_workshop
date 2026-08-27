import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { getAllTasks, getColumns, updateTask } from '../../lib/dataStore';
import './tasks-page.css';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState('');
  const [activeDropColId, setActiveDropColId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getAllTasks(), getColumns()])
      .then(([nextTasks, nextColumns]) => {
        if (!isMounted) return;
        setTasks(nextTasks);
        setColumns(nextColumns);
      })
      .catch(() => {
        if (isMounted) setError('Tasks could not be loaded.');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openTask = (taskId) => {
    setSelectedTask(tasks.find((task) => task.id === taskId) ?? null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (activeDropColId !== columnId) {
      setActiveDropColId(columnId);
    }
  };

  const handleDragLeave = (e, columnId) => {
    if (activeDropColId === columnId) {
      setActiveDropColId(null);
    }
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    setActiveDropColId(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.columnId === targetColumnId) return;

    try {
      const updated = await updateTask(taskId, { columnId: targetColumnId });
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
      if (selectedTask?.id === taskId) {
        setSelectedTask(updated);
      }
    } catch {
      setError('Could not move task.');
    }
  };

  const handleStatusChange = async (taskId, newColumnId) => {
    try {
      const updated = await updateTask(taskId, { columnId: newColumnId });
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
      setSelectedTask(updated);
    } catch {
      setError('Could not update task status.');
    }
  };

  const handleMoveDirection = async (taskId, direction) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const currentColIndex = columns.findIndex((c) => c.id === task.columnId);
    const targetColIndex = currentColIndex + direction;
    if (targetColIndex < 0 || targetColIndex >= columns.length) return;

    const targetColumnId = columns[targetColIndex].id;
    await handleStatusChange(taskId, targetColumnId);
  };

  return (
    <main className="tasks-page">
      <header className="tasks-page__header">
        <div>
          <p className="tasks-page__eyebrow">Workspace</p>
          <h1>Tasks</h1>
          <p className="tasks-page__intro">Drag cards between columns or use the move buttons and modal to update progress.</p>
        </div>
        <strong className="tasks-page__count">{tasks.length} tasks</strong>
      </header>

      {error ? <p role="alert" className="tasks-page__error">{error}</p> : null}

      <div className="tasks-board">
        {columns.map((column, colIdx) => {
          const columnTasks = tasks.filter((task) => task.columnId === column.id);
          const isDropActive = activeDropColId === column.id;

          return (
            <section
              className={`tasks-column ${isDropActive ? 'tasks-column--drop-active' : ''}`}
              key={column.id}
              aria-labelledby={`${column.id}-title`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={(e) => handleDragLeave(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="tasks-column__header">
                <h2 id={`${column.id}-title`}>{column.title}</h2>
                <span>{columnTasks.length}</span>
              </div>
              <div className="tasks-column__cards">
                {columnTasks.length ? (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onOpen={openTask}
                      onMove={handleMoveDirection}
                      canMoveLeft={colIdx > 0}
                      canMoveRight={colIdx < columns.length - 1}
                    />
                  ))
                ) : (
                  <p className="tasks-column__empty">Drop tasks here</p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <TaskModal
        task={selectedTask}
        columns={columns}
        onStatusChange={handleStatusChange}
        onClose={() => setSelectedTask(null)}
      />
    </main>
  );
}
