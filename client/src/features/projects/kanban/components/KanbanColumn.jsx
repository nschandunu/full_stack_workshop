import KanbanCard from './KanbanCard.jsx';

function KanbanColumn({ column, tasks, onOpen, onDragStart, onDrop }) {
  return (
    <section
      className="kanban-column"
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      aria-label={column.label}
    >
      <div className="kanban-column__header">
        <h2>{column.label}</h2>
        <span>{tasks.length}</span>
      </div>

      <div className="kanban-column__body">
        {tasks.length === 0 ? <p className="kanban-column__empty">No tasks yet.</p> : null}
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onOpen={onOpen}
            onDragStart={(event) => onDragStart?.(event, task)}
          />
        ))}
      </div>
    </section>
  );
}

export default KanbanColumn;
