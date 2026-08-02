import { CalendarX2 } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionCard from '@/components/common/SectionCard';
import { EmptyState, SkeletonRow } from '@/components/ui';
import AppointmentListItem from './AppointmentListItem';
import { ROUTES } from '@/config/constants';

/**
 * @param {{ appointments: object[], isLoading: boolean }} props
 */
export default function UpcomingAppointments({ appointments = [], isLoading }) {
  const handleCheckIn = (id) => toast.success('Checked in! See you soon.');
  const handleManage = (id) => toast('Appointment management coming soon.', { icon: '🗓️' });

  return (
    <SectionCard title="Upcoming Appointments" viewAllHref={ROUTES.PATIENT_APPOINTMENTS}>
      {isLoading ? (
        <div className="space-y-3">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : appointments.length === 0 ? (
        <EmptyState
          icon={CalendarX2}
          title="No upcoming appointments"
          description="Book a visit with one of our specialists to get started."
        />
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <AppointmentListItem
              key={appointment.id}
              appointment={appointment}
              onCheckIn={handleCheckIn}
              onManage={handleManage}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}