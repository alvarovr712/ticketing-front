
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles = [], redirectTo = "/" }) {
  const { user, token, loading } = useAuth();

  if (loading) {
  
    return <div>Cargando sesión...</div>;
  }

  const isAuthenticated = Boolean(token) && Boolean(user);
  const hasRole = roles.length === 0 || (user && roles.includes(user.role));

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!hasRole) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return <Outlet />;
}
