import { Routes, Route, Navigate } from 'react-router';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboards
import AdminDashboard from '../pages/admin/AdminDashboard';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import PatientDashboard from '../pages/patient/PatientDashboard';
import MedicalRecords from '../pages/patient/MedicalRecords';
import Prescriptions from '../pages/patient/Prescriptions';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes Publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Shell Général Protégé */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/login" replace />} />

          {/* Espace Admin */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          {/* Espace Doctor */}
          <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
            <Route path="doctor" element={<DoctorDashboard />} />
          </Route>

          {/* Espace Patient */}
          <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
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