import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { DASHBOARD_ROUTE_BY_ROLE, ROUTES } from '@/config/constants';

/** For auth pages (login/register): redirects already-authenticated users to their dashboard. */
export default function GuestRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.user?.role);

  if (isAuthenticated) {
    return <Navigate to={DASHBOARD_ROUTE_BY_ROLE[role] || ROUTES.HOME} replace />;
  }

  return <Outlet />;
}