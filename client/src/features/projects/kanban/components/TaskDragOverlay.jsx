import KanbanCard from './KanbanCard.jsx';

function TaskDragOverlay({ task }) {
  if (!task) {
    return null;
  }

  return (
    <div
      className="kanban-drag-overlay"
      aria-live="polite"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 'auto auto 2rem 2rem',
        zIndex: 50,
        pointerEvents: 'none',
        transform: 'rotate(-2deg) scale(0.98)',
        filter: 'drop-shadow(0 18px 28px rgba(15, 23, 42, 0.2))',
        opacity: 0.95,
      }}
    >
      <KanbanCard task={task} onOpen={() => {}} onDragStart={() => {}} />
    </div>
  );
}

export default TaskDragOverlay;
