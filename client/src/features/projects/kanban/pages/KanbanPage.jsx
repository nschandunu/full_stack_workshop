import { useState } from 'react';
import KanbanBoard from '../components/KanbanBoard.jsx';
import TaskContextMenu from '../components/TaskContextMenu.jsx';
import { useKanban } from '../hooks/useKanban.js';
import { usePermission } from '../../../../hooks/usePermission.js';
import '../kanban.css';

function KanbanPage() {
  const { tasks, columns, loading, error, editTask, moveTaskToColumn, removeTask, addTask } = useKanban();
  const { canEdit, canDelete } = usePermission();
  const [contextMenu, setContextMenu] = useState(null);

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const openContextMenu = (event, task) => {
    setContextMenu({
      task,
      position: { x: event.clientX, y: event.clientY },
    });
  };

  const handleEditTask = async (task) => {
    const nextTitle = window.prompt('Task title', task.title);

    if (nextTitle === null) {
      return;
    }

    const trimmedTitle = nextTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    const nextDescription = window.prompt('Task description', task.description ?? '') ?? task.description ?? '';

    await editTask(task.id, {
      title: trimmedTitle,
      description: nextDescription,
    });
  };

  const handleChangePriority = async (task, priority) => {
    await editTask(task.id, { priority });
  };

  const handleDuplicateTask = async (task) => {
    await addTask({
      title: `Copy of ${task.title}`,
      description: task.description,
      assignee: task.assignee,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status,
      boardId: task.boardId,
    });
  };

  const handleDeleteTask = async (task) => {
    await removeTask(task.id);
  };

  const moveOptions = ['todo', 'doing', 'done']
    .filter((status) => status !== contextMenu?.task.status)
    .map((status) => ({ status, label: columns.find((column) => column.id === status)?.label ?? status }));

  if (loading) {
    return (
      <main className="kanban-page kanban-page--state">
        <p>Loading kanban board...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="kanban-page kanban-page--state">
        <p role="alert">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="kanban-page">
      <header className="kanban-page__header">
        <div>
          <p className="kanban-page__eyebrow">Projects</p>
          <h1>Kanban Board</h1>
        </div>
        <p className="kanban-page__summary">
          Track work across To Do, Doing, and Done in one place.
        </p>
      </header>
      <KanbanBoard tasks={tasks} onOpenTask={() => {}} onCardContextMenu={canEdit ? openContextMenu : null} />
      {canEdit && contextMenu ? (
        <TaskContextMenu
          task={contextMenu.task}
          position={contextMenu.position}
          moveOptions={moveOptions}
          onClose={closeContextMenu}
          onEdit={handleEditTask}
          onMove={async (task, status) => moveTaskToColumn(task.id, status)}
          onChangePriority={handleChangePriority}
          onDuplicate={canEdit ? handleDuplicateTask : null}
          onDelete={canDelete ? handleDeleteTask : null}
        />
      ) : null}
    </main>
  );
}

export default KanbanPage;
