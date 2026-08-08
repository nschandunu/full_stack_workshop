import KanbanPage from './features/projects/kanban/pages/KanbanPage.jsx';
import OverviewPage from './features/projects/pages/OverviewPage.jsx';
import './App.css';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const isKanbanRoute = pathname === '/' || pathname === '/features/projects/kanban';
  const isOverviewRoute = pathname === '/features/projects/overview';

  if (isKanbanRoute) {
    return <KanbanPage />;
  }

  if (isOverviewRoute) {
    return <OverviewPage />;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Page not found</h1>
      <p>
        Open <a href="/features/projects/kanban">/features/projects/kanban</a> to view the kanban board.
      </p>
      <p>
        Open <a href="/features/projects/overview">/features/projects/overview</a> to view the project overview.
      </p>
    </main>
  );
}

export default App;
