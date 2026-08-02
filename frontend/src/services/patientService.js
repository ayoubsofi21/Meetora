import api from '@/lib/axios';

/**
 * Patient dashboard data access.
 *
 * NOTE: `USE_MOCKS = true` returns realistic in-memory data so the UI is fully
 * buildable/demoable before the Laravel endpoints exist. Flip to `false` once
 * `/patient/dashboard` etc. are live on the API — the return shape below is the
 * contract the backend should match.
 */
const USE_MOCKS = true;

const mockDelay = (data, ms = 500) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

const MOCK_DASHBOARD = {
  healthTip: 'Stay hydrated to maintain focus and support your recovery.',
  stats: {
    upcomingAppointments: 2,
  },
  upcomingAppointments: [
    {
      id: 'apt-1',
      doctor: { name: 'Dr. Aris Varma', specialty: 'Cardiology', avatarUrl: null },
      reason: 'General Checkup',
      startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      location: 'City Heart Clinic, Block B',
      status: 'confirmed',
      isCheckInAvailable: true,
      isOnline: false,
    },
    {
      id: 'apt-2',
      doctor: { name: 'Dr. Sarah Chen', specialty: 'Dermatology', avatarUrl: null },
      reason: 'Routine Screening',
      startsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
      location: 'Online Consultation',
      status: 'pending',
      isCheckInAvailable: false,
      isOnline: true,
    },
  ],
  healthTimeline: [
    {
      id: 'evt-1',
      type: 'lab_result',
      title: 'Lab results available',
      description: 'Your Blood Chemistry Panel (BCP) results are ready to view.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      actionLabel: 'View Results',
      actionHref: '/patient/medical-records',
    },
    {
      id: 'evt-2',
      type: 'message',
      title: 'Message from Dr. Aris',
      description: '"Please remember to bring your previous scans for our appointment."',
      time: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      actionLabel: 'Reply',
      actionHref: '/patient/messages',
    },
    {
      id: 'evt-3',
      type: 'payment',
      title: 'Payment successful',
      description: 'Invoice #MH-99234 for consultation with Dr. Chen.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
      actionLabel: null,
      actionHref: null,
    },
  ],
  recommendedSpecialists: [
    { id: 'doc-1', name: 'Dr. James Wilson', specialty: 'Physical Therapy', avatarUrl: null },
    { id: 'doc-2', name: 'Dr. Elena Ross', specialty: 'Ophthalmology', avatarUrl: null },
  ],
  wellness: {
    stepsToday: 8432,
    stepsGoal: 10000,
    sleepHours: 7,
    sleepMinutes: 20,
    sleepGoalLabel: '8h 00m',
  },
};

export const patientService = {
  async getDashboard() {
    if (USE_MOCKS) return mockDelay(MOCK_DASHBOARD);
    const { data } = await api.get('/patient/dashboard');
    return data;
  },
};

export default patientService;