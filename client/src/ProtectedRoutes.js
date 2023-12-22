import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated, loading);
  if (loading) return <h1>LOADING</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
