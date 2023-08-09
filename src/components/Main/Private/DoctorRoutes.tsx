import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import NotFound from "../../../pages/404";

const DoctorRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signIn" />;
  } else if (user.role !== "doctor") {
    return <NotFound />;
  }

  return children;
};

export default DoctorRoute;
