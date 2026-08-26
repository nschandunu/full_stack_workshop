import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import RoleBasedProfile, { RoleRoute } from '../components/routing/RoleBasedProfile';
import AuthLayout from '../components/layout/AuthLayout';
import Sidebar from '../components/layout/Sidebar';
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
import AnalyticsPage from '../features/projects/pages/AnalyticsPage';
import TasksPage from '../features/tasks/TasksPage';
import '../App.css';

function WorkspaceLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar activeRoute={window.location.pathname} />
      <div className="app-shell__content">{children}</div>
    </div>
  );
}

/** Redirects unauthenticated users to /login */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

/** Redirects already-logged-in users away from auth pages */
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth pages — inaccessible once logged in */}
      <Route
        path="/login"
        element={<GuestRoute><AuthLayout><Login /></AuthLayout></GuestRoute>}
      />
      <Route
        path="/register"
        element={<GuestRoute><AuthLayout><Register /></AuthLayout></GuestRoute>}
      />

      {/* Protected workspace pages */}
      <Route path="/dashboard" element={<ProtectedRoute><WorkspaceLayout><DashboardPage /></WorkspaceLayout></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><WorkspaceLayout><TasksPage /></WorkspaceLayout></ProtectedRoute>} />
      <Route path="/features/projects/overview" element={<ProtectedRoute><WorkspaceLayout><OverviewPage /></WorkspaceLayout></ProtectedRoute>} />
      <Route path="/features/projects/kanban" element={<ProtectedRoute><WorkspaceLayout><KanbanPage /></WorkspaceLayout></ProtectedRoute>} />
      <Route path="/features/projects/settings" element={<ProtectedRoute><WorkspaceLayout><SettingsPage /></WorkspaceLayout></ProtectedRoute>} />
      <Route path="/features/projects/files" element={<ProtectedRoute><WorkspaceLayout><FilesPage /></WorkspaceLayout></ProtectedRoute>} />
      <Route path="/features/projects/chat" element={<ProtectedRoute><WorkspaceLayout><ChatPage /></WorkspaceLayout></ProtectedRoute>} />
      <Route path="/features/projects/analytics" element={<ProtectedRoute><WorkspaceLayout><AnalyticsPage /></WorkspaceLayout></ProtectedRoute>} />
      {/* Single role-aware profile entry point */}
      <Route path="/profile" element={<ProtectedRoute><WorkspaceLayout><RoleBasedProfile /></WorkspaceLayout></ProtectedRoute>} />

      {/* Direct profile routes — guarded: wrong-role users bounce to /profile */}
      <Route path="/profiles/admin"           element={<ProtectedRoute><RoleRoute allowed={['admin']}                   ><WorkspaceLayout><AdminProfile /></WorkspaceLayout></RoleRoute></ProtectedRoute>} />
      <Route path="/profiles/project-manager" element={<ProtectedRoute><RoleRoute allowed={['admin', 'manager']}         ><WorkspaceLayout><PMProfile    /></WorkspaceLayout></RoleRoute></ProtectedRoute>} />
      <Route path="/profiles/user"            element={<ProtectedRoute><RoleRoute allowed={['admin', 'manager', 'member']}><WorkspaceLayout><UserProfile  /></WorkspaceLayout></RoleRoute></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function AppRoutesWithProvider() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
