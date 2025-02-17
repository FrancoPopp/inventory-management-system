import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
