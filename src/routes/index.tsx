import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "../components/Main/Private/PrivateRoute";
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
import DoctorRoute from "../components/Main/Private/DoctorRoutes";
import PatientRoute from "../components/Main/Private/PatientRoute";
import AdminRoute from "../components/Main/Private/AdminRoute";
import VideoChat from "../pages/Video";
import HomepageAdmin from "../pages/Admin/homepage";
import FormAppointment from "../pages/Patient/appointment";
import ChoicePage from "../pages/Payment/choice";
import CreditCard from '../pages/Payment/creditcard'
import BilletPage from "../pages/Payment/billet";

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state || {};
  const selectedAppointment = state.selectedAppointment || null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/register/:category" element={<Register />} />
      <Route path="/forgot-Password" element={<ForgotPassword />} />
      <Route path="/reset-Password/:token" element={<ResetPasswordPage />} />
      <Route path="patient/appointment" element={<FormAppointment />} />
      <Route path="/video/:roomName" element={<VideoChat />} />
      <Route path="/payment/choice" element={<ChoicePage  selectedAppointment={selectedAppointment}/>} />
   {/*    <Route path="/payment/creditcard" element={<CreditCard />} /> */}
      <Route path="/payment/billet" element={<BilletPage/>} />


      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/doctor/homepage"
        element={
          <DoctorRoute>
            <HomepageDoctor />
          </DoctorRoute>
        }
      />

      <Route
        path="/admin/homepage"
        element={
          <AdminRoute>
            <HomepageAdmin />
          </AdminRoute>
        }
      />

      <Route
        path="/patient/homepage"
        element={
          <PatientRoute>
            <HomepagePatient />
          </PatientRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
