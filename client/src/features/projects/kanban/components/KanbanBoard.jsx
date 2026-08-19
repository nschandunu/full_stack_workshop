import KanbanColumn from './KanbanColumn.jsx';

const columns = [
  { status: 'todo', title: 'To Do' },
  { status: 'doing', title: 'Doing' },
  { status: 'done', title: 'Done' },
];

function KanbanBoard({ tasks, onOpenTask, onCardContextMenu }) {
  return (
    <div className="kanban-board">
      <div className="kanban-board__columns">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks}
            onOpenTask={onOpenTask}
            onCardContextMenu={onCardContextMenu}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
