import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { getAllTasks, getColumns, updateTask } from '../../lib/dataStore';
import { usePermission } from '../../hooks/usePermission';
import './tasks-page.css';

export default function TasksPage() {
  const { canEdit } = usePermission();
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

  return (
    <main className="tasks-page">
      <header className="tasks-page__header">
        <div>
          <p className="tasks-page__eyebrow">Workspace</p>
          <h1>Tasks</h1>
          <p className="tasks-page__intro">Open a task card to inspect its details and ownership.</p>
        </div>
        <strong className="tasks-page__count">{tasks.length} tasks</strong>
      </header>

      {error ? <p role="alert" className="tasks-page__error">{error}</p> : null}

      <div className="tasks-board">
        {columns.map((column) => {
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
                  columnTasks.map((task) => <TaskCard key={task.id} task={task} onOpen={openTask} />)
                ) : (
                  <p className="tasks-column__empty">No tasks here</p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} isReadOnly={!canEdit} />
    </main>
  );
}
