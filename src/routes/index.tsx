import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/404";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Register from "../pages/Auth/SignUp/category";
import HomepageDoctor from "../pages/Doctor/homepage";
import ForgotPassword from "../pages/Auth/Forgot-Password";
import ResetPasswordPage from "../pages/Auth/Recover-Password";
import HomepagePatient from "../pages/Patient/homepage";
import DoctorRoute from "../components/Main/Private/DoctorRoutes";
import PatientRoute from "../components/Main/Private/PatientRoute";
import AdminRoute from "../components/Main/Private/AdminRoute";
import VideoChat from "../pages/Video";
import HomepageAdmin from "../pages/Admin/homepage";
import FormAppointment from "../pages/Patient/appointment";
import ChoicePage from "../pages/Payment/choice";
import CreditCard from "../pages/Payment/creditcard";
import BilletPage from "../pages/Payment/billet";
import AlphabeticalListPage from "../pages/Doctor/patients";
import SettingsDoctor from "../pages/Doctor/profile";
import SettingsPatient from "../pages/Patient/profile";
import PrivateRoute from "../components/Main/Private/PrivateRoute";
import PatientInfo from "../pages/Doctor/patientinfo";
import MedicalRecordPage from "../pages/Doctor/record";
import MedicalRecord from "../pages/Doctor/medicalRecord";

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state || {};
  const selectedAppointment = state.selectedAppointment || null;

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<Home />} />

      <Route path="/signIn" element={<SignIn />} />

      <Route path="/signUp" element={<SignUp />} />

      <Route path="/signUp/:category" element={<Register />} />

      <Route path="/forgot-Password" element={<ForgotPassword />} />

      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route
        path="/doctor/medical-record/:id"
        element={
          <DoctorRoute>
            <MedicalRecord />
          </DoctorRoute>
        }
      />

      <Route
        path="/payment/billet"
        element={
          <PrivateRoute>
            <BilletPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/video/:roomName"
        element={
          <PrivateRoute>
            <VideoChat />
          </PrivateRoute>
        }
      />

      <Route
        path="/payment/creditcard"
        element={
          <PrivateRoute>
            <CreditCard />
          </PrivateRoute>
        }
      />

      <Route
        path="/doctor/profile"
        element={
          <DoctorRoute>
            <SettingsDoctor />
          </DoctorRoute>
        }
      />

      <Route
        path="/doctor/patientinfo"
        element={
          <DoctorRoute>
            <PatientInfo />
          </DoctorRoute>
        }
      />

      <Route
        path="/doctor/record"
        element={
          <DoctorRoute>
            <MedicalRecordPage />
          </DoctorRoute>
        }
      />

      <Route
        path="/patient/appointment"
        element={
          <PatientRoute>
            <FormAppointment />
          </PatientRoute>
        }
      />

      <Route
        path="/doctor/patients"
        element={
          <DoctorRoute>
            <AlphabeticalListPage />
          </DoctorRoute>
        }
      />

      <Route
        path="/payment/choice"
        element={
          <PatientRoute>
            <ChoicePage selectedAppointment={selectedAppointment} />
          </PatientRoute>
        }
      />

      <Route
        path="/patient/profile"
        element={
          <PatientRoute>
            <SettingsPatient />
          </PatientRoute>
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
