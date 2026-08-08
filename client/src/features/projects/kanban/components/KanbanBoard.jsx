import KanbanColumn from './KanbanColumn.jsx';
import TaskDragOverlay from './TaskDragOverlay.jsx';

function KanbanBoard({ board, columns, tasksByColumn, activeTask, onMoveTask, onDeleteTask, onDragStart, onDragEnd, onDropTask }) {
  return (
    <div className="kanban-board">
      <header className="kanban-board__header">
        <div>
          <p className="kanban-board__eyebrow">CollabBoard</p>
          <h1>{board.name}</h1>
        </div>
      </header>

      <div className="kanban-board__columns">
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasksByColumn[column.id] ?? []}
            onMoveLeft={(task) => onMoveTask(task, columns[index - 1]?.id ?? column.id)}
            onMoveRight={(task) => onMoveTask(task, columns[index + 1]?.id ?? column.id)}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={(event) => onDropTask(event, column.id)}
          />
        ))}
      </div>

      <TaskDragOverlay task={activeTask} />
    </div>
  );
}

export default KanbanBoard;
