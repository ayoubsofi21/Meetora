import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/config/constants';

/**
 * Restricts a route subtree to specific roles. Use nested under ProtectedRoute.
 * @param {{ allowedRoles: string[] }} props
 */
export default function RoleGuard({ allowedRoles = [] }) {
  const hasAnyRole = useAuthStore((s) => s.hasAnyRole);

  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  return <Outlet />;
}