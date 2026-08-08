const formatDueDate = (dueDate) => {
  if (!dueDate) {
    return 'No due date';
  }

  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return dueDate;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

function KanbanCard({ task, onOpen, onDragStart, onContextMenu }) {
  const priorityKey = task.priority?.toLowerCase() ?? 'medium';
  const priorityClass = `kanban-card__badge kanban-card__badge--${priorityKey}`;

  return (
    <article
      className="kanban-card"
      draggable
      onClick={() => onOpen?.(task)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen?.(task);
        }
      }}
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', task.id);
        onDragStart?.(event, task);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        onContextMenu?.(event, task);
      }}
      aria-label={task.title}
      role="button"
      tabIndex={0}
    >
      <header className="kanban-card__header">
        <h3>{task.title}</h3>
        <span className={priorityClass}>
          {priorityKey}
        </span>
      </header>

      <p className="kanban-card__description">{task.description}</p>

      <dl className="kanban-card__meta">
        <div>
          <dt>Assignee</dt>
          <dd>{task.assignee || 'Unassigned'}</dd>
        </div>
        <div>
          <dt>Due date</dt>
          <dd>{formatDueDate(task.dueDate)}</dd>
        </div>
      </dl>
    </article>
  );
}

export default KanbanCard;
