import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();

  // Écran de chargement pendant la vérification du token
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          <p className="text-sm text-[#475569] font-medium">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si des rôles spécifiques sont requis et que le rôle de l'utilisateur n'y figure pas
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role?.toLowerCase())) {
    // Redirection automatique vers son propre dashboard
    const userRole = user?.role?.toLowerCase();
    const fallbackPath = userRole === 'admin' ? '/admin' : userRole === 'doctor' ? '/doctor' : '/patient';
    return <Navigate to={fallbackPath} replace />;
  }

  // Si tout est valide, afficher la route enfant
  return <Outlet />;
}