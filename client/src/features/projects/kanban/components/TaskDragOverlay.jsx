function TaskDragOverlay({ task }) {
  if (!task) {
    return null;
  }

  return (
    <div className="kanban-drag-overlay" aria-live="polite">
      <span>Moving task</span>
      <strong>{task.title}</strong>
    </div>
  );
}

export default TaskDragOverlay;
