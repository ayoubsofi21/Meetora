import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "../components/layout/AppShell";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSpecialties from "../pages/admin/AdminSpecialties";
import AdminDoctors from "../pages/admin/AdminDoctors";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";

import PatientDashboard from "../pages/patient/PatientDashboard";
import MedicalRecords from "../pages/patient/MedicalRecords";
import Prescriptions from "../pages/patient/Prescriptions";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* ================= PROTECTED ================= */}

      <Route element={<ProtectedRoute />}>

        <Route path="/" element={<AppShell />}>
          {/* ================= ADMIN ================= */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/specialties" element={<AdminSpecialties />} />
            <Route path="admin/doctors" element={<AdminDoctors />} />
          </Route>
          {/* ================= DOCTOR ================= */}

          <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>

            <Route
              path="doctor"
              element={<DoctorDashboard />}
            />

          </Route>


          {/* ================= PATIENT ================= */}

          <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>

            <Route
              path="patient"
              element={<PatientDashboard />}
            />

            <Route
              path="patient/records"
              element={<MedicalRecords />}
            />

            <Route
              path="patient/prescriptions"
              element={<Prescriptions />}
            />

          </Route>

        </Route>

      </Route>


      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}