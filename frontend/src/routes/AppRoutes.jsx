import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSpecialties from "../pages/admin/AdminSpecialties";
import AdminDoctors from "../pages/admin/AdminDoctors";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorSchedule from "../pages/doctor/DoctorSchedule";
import PatientDetail from "../pages/doctor/PatientDetail";
import PatientDashboard from "../pages/patient/PatientDashboard";
import MedicalRecords from "../pages/patient/MedicalRecords";
import Prescriptions from "../pages/patient/Prescriptions";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppShell />}>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/specialties" element={<AdminSpecialties />} />
            <Route path="admin/doctors" element={<AdminDoctors />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
            <Route path="doctor" element={<DoctorDashboard />} />
            <Route path="doctor/schedule" element={<DoctorSchedule />} />
            <Route path="doctor/patient/:id" element={<PatientDetail />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="patient" element={<PatientDashboard />} />
            <Route path="patient/records" element={<MedicalRecords />} />
            <Route path="patient/prescriptions" element={<Prescriptions />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
