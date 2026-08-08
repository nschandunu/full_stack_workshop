import KanbanPage from './features/projects/kanban/pages/KanbanPage.jsx';
import OverviewPage from './features/projects/pages/OverviewPage.jsx';
import SettingsPage from './features/projects/pages/SettingsPage.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import './App.css';

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const isKanbanRoute = pathname === '/' || pathname === '/features/projects/kanban';
  const isOverviewRoute = pathname === '/features/projects/overview';
  const isSettingsRoute = pathname === '/features/projects/settings';

  let pageContent = (
    <main className="app-shell__empty" style={{ padding: '2rem' }}>
      <h1>Page not found</h1>
      <p>
        Open <a href="/features/projects/kanban">/features/projects/kanban</a> to view the kanban board.
      </p>
      <p>
        Open <a href="/features/projects/overview">/features/projects/overview</a> to view the project overview.
      </p>
      <p>
        Open <a href="/features/projects/settings">/features/projects/settings</a> to view settings.
      </p>
    </main>
  );

  if (isKanbanRoute) {
    pageContent = <KanbanPage />;
  }

  if (isOverviewRoute) {
    pageContent = <OverviewPage />;
  }

  if (isSettingsRoute) {
    pageContent = <SettingsPage />;
  }

  return (
    <div className="app-shell">
      <Sidebar activeRoute={pathname} />
      <div className="app-shell__content">{pageContent}</div>
    </div>
  );
}

export default App;
