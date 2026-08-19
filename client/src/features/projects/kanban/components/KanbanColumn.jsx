import KanbanCard from './KanbanCard.jsx';

function KanbanColumn({ title, status, tasks, onOpenTask, onDragStart, onDrop, onCardContextMenu }) {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <section
      className="kanban-column"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      aria-label={title}
    >
      <div className="kanban-column__header">
        <h2>{title}</h2>
        <span>{filteredTasks.length}</span>
      </div>

      <div className="kanban-column__body">
        {filteredTasks.length === 0 ? <p className="kanban-column__empty">No tasks yet.</p> : null}
        {filteredTasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onOpen={onOpenTask}
            onDragStart={(event) => onDragStart?.(event, task)}
            onContextMenu={onCardContextMenu}
          />
        ))}
      </div>
    </section>
  );
}

export default KanbanColumn;
