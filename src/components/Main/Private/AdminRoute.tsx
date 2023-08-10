import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import NotFound from "../../../pages/404";

const AdminRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signIn" />;
  } else if (user?.role !== "admin") {
    return <NotFound />;
  }

  return children;
};

export default AdminRoute;
