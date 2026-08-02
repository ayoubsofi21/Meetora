import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLES, ROUTES } from '@/config/constants';
import { SIDEBAR_NAV } from '@/config/navigation';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import RoleGuard from './RoleGuard';

import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage';

import PatientDashboardPage from '@/pages/patient/DashboardPage';

/** Temporary placeholder so every not-yet-built route renders something meaningful. */
function PagePlaceholder({ title }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-white/60 text-center">
      <h2 className="text-lg font-semibold text-ink-700">{title}</h2>
      <p className="mt-1 text-sm text-ink-400">This page will be built in an upcoming step.</p>
    </div>
  );
}

/** Maps a sidebar route path to its real page component, when one exists yet. */
const PATIENT_PAGE_OVERRIDES = {
  [ROUTES.PATIENT_DASHBOARD]: PatientDashboardPage,
};

export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />

      {/* Guest-only auth routes */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
      </Route>

      {/* Authenticated app */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<RoleGuard allowedRoles={[ROLES.PATIENT]} />}>
            {SIDEBAR_NAV[ROLES.PATIENT].map((item) => {
              const Page = PATIENT_PAGE_OVERRIDES[item.to] || (() => <PagePlaceholder title={item.label} />);
              return <Route key={item.to} path={item.to} element={<Page />} />;
            })}
          </Route>

          <Route element={<RoleGuard allowedRoles={[ROLES.DOCTOR]} />}>
            {SIDEBAR_NAV[ROLES.DOCTOR].map((item) => (
              <Route key={item.to} path={item.to} element={<PagePlaceholder title={item.label} />} />
            ))}
          </Route>

          <Route element={<RoleGuard allowedRoles={[ROLES.SECRETARY]} />}>
            {SIDEBAR_NAV[ROLES.SECRETARY].map((item) => (
              <Route key={item.to} path={item.to} element={<PagePlaceholder title={item.label} />} />
            ))}
          </Route>

          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN]} />}>
            {SIDEBAR_NAV[ROLES.ADMIN].map((item) => (
              <Route key={item.to} path={item.to} element={<PagePlaceholder title={item.label} />} />
            ))}
          </Route>
        </Route>
      </Route>

      <Route path={ROUTES.FORBIDDEN} element={<div className="p-8">403 — Access denied</div>} />
      <Route path={ROUTES.NOT_FOUND} element={<div className="p-8">404 — Page not found</div>} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
}