import KanbanBoard from '../components/KanbanBoard.jsx';
import { useKanban } from '../hooks/useKanban.js';
import '../kanban.css';

function KanbanPage() {
  const { tasks, loading, error } = useKanban();

  if (loading) {
    return (
      <main className="kanban-page kanban-page--state">
        <p>Loading kanban board...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="kanban-page kanban-page--state">
        <p role="alert">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="kanban-page">
      <header className="kanban-page__header">
        <div>
          <p className="kanban-page__eyebrow">Projects</p>
          <h1>Kanban Board</h1>
        </div>
        <p className="kanban-page__summary">
          Track work across To Do, Doing, and Done in one place.
        </p>
      </header>
      <KanbanBoard tasks={tasks} onOpenTask={() => {}} />
    </main>
  );
}

export default KanbanPage;
