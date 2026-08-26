import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminProfile from '../../features/admin/AdminProfile';
import PMProfile from '../../features/project-manager-profile/PMProfile';
import UserProfile from '../../features/users/UserProfile';

const ROLE_COMPONENTS = {
  admin:   AdminProfile,
  manager: PMProfile,
  member:  UserProfile,
};

/**
 * Reads user.role from AuthContext and renders the matching profile.
 * Zero styling — purely a routing decision.
 */
export default function RoleBasedProfile() {
  const { user } = useAuth();
  const ProfileComponent = ROLE_COMPONENTS[user?.role] ?? UserProfile;
  return <ProfileComponent />;
}

/**
 * RoleRoute — wraps a route that is only accessible to specific roles.
 * Redirects to /profile (which re-routes correctly) if the role doesn't match.
 */
export function RoleRoute({ allowed, children }) {
  const { user } = useAuth();
  if (!allowed.includes(user?.role)) {
    return <Navigate to="/profile" replace />;
  }
  return children;
}
