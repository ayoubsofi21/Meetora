import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />

          <p className="text-sm text-[#475569] font-medium">
            Vérification de la session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role?.toLowerCase())
  ) {
    const userRole = user?.role?.toLowerCase();

    const fallbackPath =
      userRole === "admin"
        ? "/admin"
        : userRole === "doctor"
        ? "/doctor"
        : "/patient";

    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
}