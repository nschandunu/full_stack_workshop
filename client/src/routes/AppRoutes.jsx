import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import AdminProfile from '../features/admin/AdminProfile';
import PMProfile from '../features/project-manager-profile/PMProfile';
import UserProfile from '../features/users/UserProfile';
import KanbanPage from '../features/projects/kanban/pages/KanbanPage';
import OverviewPage from '../features/projects/pages/OverviewPage';
import SettingsPage from '../features/projects/pages/SettingsPage';
import FilesPage from '../features/projects/pages/FilesPage';
import ChatPage from '../features/projects/pages/ChatPage';
import TasksPage from '../features/tasks/TasksPage';
import Sidebar from '../components/layout/Sidebar';
import '../App.css';

function WorkspaceLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar activeRoute={window.location.pathname} />
      <div className="app-shell__content">{children}</div>
    </div>
  );
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<AuthLayout><Login /></AuthLayout>}
        />
        <Route
          path="/register"
          element={<AuthLayout><Register /></AuthLayout>}
        />
        <Route path="/dashboard" element={<WorkspaceLayout><DashboardPage /></WorkspaceLayout>} />
        <Route path="/tasks" element={<WorkspaceLayout><TasksPage /></WorkspaceLayout>} />
        <Route path="/features/projects/overview" element={<WorkspaceLayout><OverviewPage /></WorkspaceLayout>} />
        <Route path="/features/projects/kanban" element={<WorkspaceLayout><KanbanPage /></WorkspaceLayout>} />
        <Route path="/features/projects/settings" element={<WorkspaceLayout><SettingsPage /></WorkspaceLayout>} />
        <Route path="/features/projects/files" element={<WorkspaceLayout><FilesPage /></WorkspaceLayout>} />
        <Route path="/features/projects/chat" element={<WorkspaceLayout><ChatPage /></WorkspaceLayout>} />
        <Route path="/profiles/admin" element={<WorkspaceLayout><AdminProfile /></WorkspaceLayout>} />
        <Route path="/profiles/project-manager" element={<WorkspaceLayout><PMProfile /></WorkspaceLayout>} />
        <Route path="/profiles/user" element={<WorkspaceLayout><UserProfile /></WorkspaceLayout>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
