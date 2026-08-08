const moveButtonStyle = {
  border: '1px solid #cbd5e1',
  background: '#fff',
  borderRadius: '999px',
  padding: '0.35rem 0.7rem',
  cursor: 'pointer',
};

function KanbanCard({ task, onMoveLeft, onMoveRight, onDelete, onDragStart, onDragEnd }) {
  return (
    <article
      className="kanban-card"
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', task.id);
        onDragStart?.(event);
      }}
      onDragEnd={onDragEnd}
      aria-label={task.title}
    >
      <header>
        <h3>{task.title}</h3>
      </header>
      <p>{task.description}</p>
      <div className="kanban-card__actions">
        <button type="button" style={moveButtonStyle} onClick={onMoveLeft}>
          Move left
        </button>
        <button type="button" style={moveButtonStyle} onClick={onMoveRight}>
          Move right
        </button>
        <button type="button" style={moveButtonStyle} onClick={onDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default KanbanCard;
