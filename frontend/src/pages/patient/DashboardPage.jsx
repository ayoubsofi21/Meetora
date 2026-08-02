import { CalendarPlus, FolderHeart, ClipboardList, FlaskConical } from 'lucide-react';
import StatActionCard from '@/components/common/StatActionCard';
import HealthTipBanner from '@/components/patient/dashboard/HealthTipBanner';
import UpcomingAppointments from '@/components/patient/dashboard/UpcomingAppointments';
import HealthTimeline from '@/components/patient/dashboard/HealthTimeline';
import RecommendedSpecialists from '@/components/patient/dashboard/RecommendedSpecialists';
import WellnessSnapshot from '@/components/patient/dashboard/WellnessSnapshot';
import NeedHelpCard from '@/components/patient/dashboard/NeedHelpCard';
import { Skeleton } from '@/components/ui';
import { usePatientDashboard } from '@/hooks/usePatientDashboard';
import { useAuthStore } from '@/store/useAuthStore';
import { firstNameOf } from '@/utils/formatters';
import { ROUTES } from '@/config/constants';

const QUICK_ACTIONS = [
  {
    key: 'book',
    icon: CalendarPlus,
    title: 'Book New Appointment',
    subtitle: 'Find doctors near you',
    to: ROUTES.PATIENT_SEARCH_DOCTORS,
    color: 'primary',
  },
  {
    key: 'records',
    icon: FolderHeart,
    title: 'My Medical Records',
    subtitle: 'Access your full history',
    to: ROUTES.PATIENT_MEDICAL_RECORDS,
    color: 'teal',
  },
  {
    key: 'prescriptions',
    icon: ClipboardList,
    title: 'Prescriptions',
    subtitle: 'Refill and tracking',
    to: ROUTES.PATIENT_PRESCRIPTIONS,
    color: 'success',
  },
  {
    key: 'labs',
    icon: FlaskConical,
    title: 'Lab Results',
    subtitle: 'View latest findings',
    to: ROUTES.PATIENT_MEDICAL_RECORDS,
    color: 'danger',
  },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = usePatientDashboard();

  const upcomingCount = data?.upcomingAppointments?.length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Hello, {firstNameOf(user?.firstName) || 'there'}</h1>
          <p className="mt-1 text-sm text-ink-500">
            {isLoading ? (
              <Skeleton variant="text" width="16rem" />
            ) : (
              <>
                Welcome back. You have {upcomingCount} upcoming appointment{upcomingCount === 1 ? '' : 's'} this week.
              </>
            )}
          </p>
        </div>
        {!isLoading && data?.healthTip && (
          <div className="lg:max-w-sm">
            <HealthTipBanner tip={data.healthTip} />
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <StatActionCard key={action.key} {...action} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <UpcomingAppointments appointments={data?.upcomingAppointments} isLoading={isLoading} />
          <HealthTimeline events={data?.healthTimeline} isLoading={isLoading} />
        </div>

        <div className="space-y-6">
          <RecommendedSpecialists specialists={data?.recommendedSpecialists} isLoading={isLoading} />
          {!isLoading && <WellnessSnapshot wellness={data?.wellness} />}
          <NeedHelpCard />
        </div>
      </div>
    </div>
  );
}