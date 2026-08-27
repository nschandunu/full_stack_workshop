import { useAuth } from '../context/AuthContext';

/**
 * RBAC permission hook.
 *
 * Role matrix:
 *   admin   → full access (view, create, edit, delete, user management)
 *   manager → can view, create, and edit projects/tasks — cannot delete
 *   member  → view-only
 */
export function usePermission() {
  const { user } = useAuth();
  const role = user?.role ?? 'member';

  return {
    role,
    isAdmin:   role === 'admin',
    isManager: role === 'manager',
    isMember:  role === 'member',
    canCreate: role === 'admin' || role === 'manager',
    canEdit:   role === 'admin' || role === 'manager',
    canDelete: role === 'admin',
  };
}
