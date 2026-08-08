import KanbanBoard from '../components/KanbanBoard.jsx';
import { useKanban } from '../hooks/useKanban.js';

function KanbanPage() {
  const kanban = useKanban();

  return (
    <main>
      <KanbanBoard
        board={kanban.board}
        columns={kanban.columns}
        tasksByColumn={kanban.tasksByColumn}
        activeTask={kanban.activeTask}
        onMoveTask={kanban.moveTask}
        onDeleteTask={kanban.removeTask}
        onDragStart={kanban.handleDragStart}
        onDragEnd={kanban.handleDragEnd}
        onDropTask={kanban.handleDropTask}
      />
    </main>
  );
}

export default KanbanPage;
