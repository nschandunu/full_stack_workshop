import KanbanBoard from '../components/KanbanBoard.jsx';
import { useKanban } from '../hooks/useKanban.js';

function KanbanPage() {
  const kanban = useKanban();

  return (
    <main>
      <KanbanBoard
        tasks={kanban.tasks}
        onOpenTask={(task) => {
          void task;
        }}
      />
    </main>
  );
}

export default KanbanPage;
