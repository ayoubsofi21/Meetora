import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/config/constants';
export default function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <div className="flex min-h-screen items-center justify-center bg-surface-page">
            <div className="animate-fade-in text-center">
              <h1 className="text-2xl font-bold text-ink-900">Meetora</h1>
              <p className="mt-2 text-ink-500">Healthcare made simple.</p>
              <p className="mt-1 text-sm text-ink-400">
                Frontend foundation ready — Step 2 will add the UI kit.
              </p>
            </div>
          </div>
        }
      />
      <Route path={ROUTES.NOT_FOUND} element={<div className="p-8">404</div>} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
}