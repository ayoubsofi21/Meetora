export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Meetora';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  SECRETARY: 'secretary',
  ADMIN: 'admin',
};

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  UPCOMING: 'upcoming',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  POSTPONED: 'postponed',
};

export const STATUS_STYLES = {
  pending: { bg: 'bg-warning-100', text: 'text-warning-700', dot: 'bg-warning-500' },
  confirmed: { bg: 'bg-success-100', text: 'text-success-700', dot: 'bg-success-500' },
  upcoming: { bg: 'bg-info-100', text: 'text-info-600', dot: 'bg-info-500' },
  in_progress: { bg: 'bg-primary-100', text: 'text-primary-700', dot: 'bg-primary-600' },
  completed: { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
  cancelled: { bg: 'bg-danger-100', text: 'text-danger-700', dot: 'bg-danger-500' },
  postponed: { bg: 'bg-ink-100', text: 'text-ink-600', dot: 'bg-ink-400' },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',

  PATIENT_DASHBOARD: '/patient/dashboard',
  PATIENT_APPOINTMENTS: '/patient/appointments',
  PATIENT_MEDICAL_RECORDS: '/patient/medical-records',
  PATIENT_PRESCRIPTIONS: '/patient/prescriptions',
  PATIENT_SEARCH_DOCTORS: '/patient/doctors',
  PATIENT_MESSAGES: '/patient/messages',
  PATIENT_SETTINGS: '/patient/settings',

  DOCTOR_DASHBOARD: '/doctor/dashboard',
  DOCTOR_SCHEDULE: '/doctor/schedule',
  DOCTOR_PATIENTS: '/doctor/patients',
  DOCTOR_CONSULTATIONS: '/doctor/consultations',
  DOCTOR_ANALYTICS: '/doctor/analytics',
  DOCTOR_MESSAGES: '/doctor/messages',
  DOCTOR_SETTINGS: '/doctor/settings',

  SECRETARY_DASHBOARD: '/secretary/dashboard',
  SECRETARY_APPOINTMENTS: '/secretary/appointments',
  SECRETARY_WAITING_ROOM: '/secretary/waiting-room',
  SECRETARY_BILLING: '/secretary/billing',
  SECRETARY_SETTINGS: '/secretary/settings',

  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_DOCTORS: '/admin/doctors',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_ACTIVITY_LOG: '/admin/activity-log',
  ADMIN_SETTINGS: '/admin/settings',

  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
};

export const DASHBOARD_ROUTE_BY_ROLE = {
  [ROLES.PATIENT]: ROUTES.PATIENT_DASHBOARD,
  [ROLES.DOCTOR]: ROUTES.DOCTOR_DASHBOARD,
  [ROLES.SECRETARY]: ROUTES.SECRETARY_DASHBOARD,
  [ROLES.ADMIN]: ROUTES.ADMIN_DASHBOARD,
};

export const ROLE_LABELS = {
  [ROLES.PATIENT]: 'Patient',
  [ROLES.DOCTOR]: 'Practitioner',
  [ROLES.SECRETARY]: 'Secretary',
  [ROLES.ADMIN]: 'System Admin',
};

export const ROLE_PORTAL_LABELS = {
  [ROLES.PATIENT]: 'Patient Portal',
  [ROLES.DOCTOR]: 'Practitioner Portal',
  [ROLES.SECRETARY]: 'Practitioner Portal',
  [ROLES.ADMIN]: 'Practitioner Portal',
};