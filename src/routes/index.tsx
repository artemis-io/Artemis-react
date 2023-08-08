import { Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import PrivateRoute from "../components/Main/PrivateRoute";

import Home from "../pages/Home";
import NotFound from "../pages/404";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Register from "../pages/Auth/SignUp/category";
import HomepageDoctor from "../pages/Doctor/homepage";
import ForgotPassword from "../pages/Auth/Forgot-Password";
import ResetPasswordPage from "../pages/Auth/Recover-Password";
import Profile from "../pages/Profile";
import HomepagePatient from "../pages/Patient/homepage";

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/register/:category" element={<Register />} />
      <Route path="/forgot-Password" element={<ForgotPassword />} />
      <Route path="/reset-Password/:token" element={<ResetPasswordPage />} />

      {isAuthenticated && (
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      )}

      {isAuthenticated && user?.role === "doctor" && (
        <Route
          path="/doctor/homepage"
          element={
            <PrivateRoute>
              <HomepageDoctor />
            </PrivateRoute>
          }
        />
      )}

      {isAuthenticated && user?.role === "admin" && (
        <Route
          path="/admin/homepage"
          element={
            <PrivateRoute>
              <HomepagePatient />
            </PrivateRoute>
          }
        />
      )}

      {isAuthenticated && user?.role === "patient" && (
        <Route
          path="/patient/homepage"
          element={
            <PrivateRoute>
              <HomepagePatient />
            </PrivateRoute>
          }
        />
      )}
    </Routes>
  );
};

export default AppRoutes;
