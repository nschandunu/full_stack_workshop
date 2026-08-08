import KanbanPage from './features/projects/kanban/pages/KanbanPage.jsx';
import './App.css';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const isKanbanRoute = pathname === '/' || pathname === '/features/projects/kanban';

  if (isKanbanRoute) {
    return <KanbanPage />;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Page not found</h1>
      <p>
        Open <a href="/features/projects/kanban">/features/projects/kanban</a> to view the kanban board.
      </p>
    </main>
  );
}

export default App;
