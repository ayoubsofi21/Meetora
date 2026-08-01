import {
  LayoutGrid,
  Calendar,
  Users,
  FileText,
  ClipboardList,
  Settings,
  Search,
  BarChart3,
  MessageSquare,
  Receipt,
  Armchair,
  UserCog,
  Stethoscope,
  ScrollText,
  Activity,
} from 'lucide-react';
import { ROLES, ROUTES } from './constants';

/**
 * Sidebar nav items per role. `icon` is a lucide-react component reference.
 */
export const SIDEBAR_NAV = {
  [ROLES.PATIENT]: [
    { label: 'Dashboard', to: ROUTES.PATIENT_DASHBOARD, icon: LayoutGrid },
    { label: 'Schedule', to: ROUTES.PATIENT_APPOINTMENTS, icon: Calendar },
    { label: 'Find Doctors', to: ROUTES.PATIENT_SEARCH_DOCTORS, icon: Search },
    { label: 'Medical Records', to: ROUTES.PATIENT_MEDICAL_RECORDS, icon: FileText },
    { label: 'Prescriptions', to: ROUTES.PATIENT_PRESCRIPTIONS, icon: ClipboardList },
    { label: 'Messages', to: ROUTES.PATIENT_MESSAGES, icon: MessageSquare },
    { label: 'Settings', to: ROUTES.PATIENT_SETTINGS, icon: Settings },
  ],
  [ROLES.DOCTOR]: [
    { label: 'Dashboard', to: ROUTES.DOCTOR_DASHBOARD, icon: LayoutGrid },
    { label: 'Schedule', to: ROUTES.DOCTOR_SCHEDULE, icon: Calendar },
    { label: 'Patients', to: ROUTES.DOCTOR_PATIENTS, icon: Users },
    { label: 'Records', to: ROUTES.DOCTOR_CONSULTATIONS, icon: FileText },
    { label: 'Analytics', to: ROUTES.DOCTOR_ANALYTICS, icon: BarChart3 },
    { label: 'Settings', to: ROUTES.DOCTOR_SETTINGS, icon: Settings },
  ],
  [ROLES.SECRETARY]: [
    { label: 'Dashboard', to: ROUTES.SECRETARY_DASHBOARD, icon: LayoutGrid },
    { label: 'Appointments', to: ROUTES.SECRETARY_APPOINTMENTS, icon: Calendar },
    { label: 'Waiting Room', to: ROUTES.SECRETARY_WAITING_ROOM, icon: Armchair },
    { label: 'Billing', to: ROUTES.SECRETARY_BILLING, icon: Receipt },
    { label: 'Settings', to: ROUTES.SECRETARY_SETTINGS, icon: Settings },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', to: ROUTES.ADMIN_DASHBOARD, icon: LayoutGrid },
    { label: 'Schedule', to: ROUTES.ADMIN_DOCTORS, icon: Calendar },
    { label: 'Patients', to: ROUTES.ADMIN_USERS, icon: Users },
    { label: 'Records', to: ROUTES.ADMIN_REPORTS, icon: FileText },
    { label: 'Analytics', to: ROUTES.ADMIN_ANALYTICS, icon: BarChart3 },
    { label: 'Activity Log', to: ROUTES.ADMIN_ACTIVITY_LOG, icon: Activity },
    { label: 'Settings', to: ROUTES.ADMIN_SETTINGS, icon: UserCog },
  ],
};

/** Bottom tab bar (mobile only) — mirrors the 5-tab pattern from your mobile mockups. */
export const MOBILE_NAV = {
  [ROLES.PATIENT]: [
    { label: 'Home', to: ROUTES.PATIENT_DASHBOARD, icon: LayoutGrid },
    { label: 'Schedule', to: ROUTES.PATIENT_APPOINTMENTS, icon: Calendar },
    { label: 'Records', to: ROUTES.PATIENT_MEDICAL_RECORDS, icon: FileText },
    { label: 'Chat', to: ROUTES.PATIENT_MESSAGES, icon: MessageSquare },
    { label: 'Profile', to: ROUTES.PATIENT_SETTINGS, icon: Settings },
  ],
  [ROLES.DOCTOR]: [
    { label: 'Home', to: ROUTES.DOCTOR_DASHBOARD, icon: LayoutGrid },
    { label: 'Schedule', to: ROUTES.DOCTOR_SCHEDULE, icon: Calendar },
    { label: 'Records', to: ROUTES.DOCTOR_CONSULTATIONS, icon: FileText },
    { label: 'Chat', to: ROUTES.DOCTOR_MESSAGES, icon: MessageSquare },
    { label: 'Profile', to: ROUTES.DOCTOR_SETTINGS, icon: Settings },
  ],
  [ROLES.SECRETARY]: [
    { label: 'Home', to: ROUTES.SECRETARY_DASHBOARD, icon: LayoutGrid },
    { label: 'Schedule', to: ROUTES.SECRETARY_APPOINTMENTS, icon: Calendar },
    { label: 'Waiting', to: ROUTES.SECRETARY_WAITING_ROOM, icon: Armchair },
    { label: 'Billing', to: ROUTES.SECRETARY_BILLING, icon: Receipt },
    { label: 'Profile', to: ROUTES.SECRETARY_SETTINGS, icon: Settings },
  ],
  [ROLES.ADMIN]: [
    { label: 'Home', to: ROUTES.ADMIN_DASHBOARD, icon: LayoutGrid },
    { label: 'Schedule', to: ROUTES.ADMIN_DOCTORS, icon: Calendar },
    { label: 'Records', to: ROUTES.ADMIN_REPORTS, icon: FileText },
    { label: 'Log', to: ROUTES.ADMIN_ACTIVITY_LOG, icon: ScrollText },
    { label: 'Profile', to: ROUTES.ADMIN_SETTINGS, icon: Settings },
  ],
};

/** Quick links shown inline in the topbar on large screens (staff roles only). */
export const TOPBAR_QUICK_LINKS = {
  [ROLES.PATIENT]: [],
  [ROLES.DOCTOR]: [
    { label: 'Patients', to: ROUTES.DOCTOR_PATIENTS },
    { label: 'Schedule', to: ROUTES.DOCTOR_SCHEDULE },
  ],
  [ROLES.SECRETARY]: [
    { label: 'Appointments', to: ROUTES.SECRETARY_APPOINTMENTS },
    { label: 'Waiting Room', to: ROUTES.SECRETARY_WAITING_ROOM },
  ],
  [ROLES.ADMIN]: [
    { label: 'Patients', to: ROUTES.ADMIN_USERS },
    { label: 'Schedule', to: ROUTES.ADMIN_DOCTORS },
  ],
};

export const ROLE_ICON = {
  [ROLES.PATIENT]: LayoutGrid,
  [ROLES.DOCTOR]: Stethoscope,
  [ROLES.SECRETARY]: Users,
  [ROLES.ADMIN]: UserCog,
};