import KanbanBoard from '../components/KanbanBoard.jsx';
import { useKanban } from '../hooks/useKanban.js';

function KanbanPage() {
  const { tasks, loading, error } = useKanban();

  if (loading) {
    return (
      <main>
        <p>Loading kanban board...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p role="alert">{error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <KanbanBoard tasks={tasks} onOpenTask={() => {}} />
    </main>
  );
}

export default KanbanPage;
