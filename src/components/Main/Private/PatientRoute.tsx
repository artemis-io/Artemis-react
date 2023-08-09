import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import NotFound from "../../../pages/404";

const PatientRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signIn" />;
  } else if (user.role !== "patient") {
    return <NotFound />;
  }

  return children;
};

export default PatientRoute;
