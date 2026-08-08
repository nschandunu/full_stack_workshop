const priorityStyles = {
  low: { backgroundColor: '#ecfdf5', color: '#047857' },
  medium: { backgroundColor: '#eff6ff', color: '#1d4ed8' },
  high: { backgroundColor: '#fef2f2', color: '#b91c1c' },
};

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

function KanbanCard({ task, onOpen, onDragStart }) {
  const priorityKey = task.priority?.toLowerCase() ?? 'medium';
  const priorityStyle = priorityStyles[priorityKey] ?? priorityStyles.medium;

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
      aria-label={task.title}
      role="button"
      tabIndex={0}
    >
      <header className="kanban-card__header">
        <h3>{task.title}</h3>
        <span className="kanban-card__badge" style={priorityStyle}>
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
