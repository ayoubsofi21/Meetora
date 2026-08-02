import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { Avatar, Badge, Button } from '@/components/ui';
import { formatRelativeDate, formatTime } from '@/utils/formatters';

/**
 * Single row in the Upcoming Appointments list.
 * @param {{ appointment: object, onCheckIn?: (id: string) => void, onManage?: (id: string) => void }} props
 */
export default function AppointmentListItem({ appointment, onCheckIn, onManage }) {
  const { id, doctor, reason, startsAt, location, status, isCheckInAvailable, isOnline } = appointment;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-ink-100 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3.5">
        <Avatar name={doctor.name} src={doctor.avatarUrl} size="lg" />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-ink-900">{doctor.name}</p>
            <Badge status={status} size="sm">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-ink-500">
            {doctor.specialty} <span className="text-ink-300">•</span> {reason}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatRelativeDate(startsAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {formatTime(startsAt)}
            </span>
            <span className="flex items-center gap-1.5">
              {isOnline ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
              {location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:ml-4">
        {isCheckInAvailable ? (
          <Button size="sm" onClick={() => onCheckIn?.(id)}>
            Check-in
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={() => onManage?.(id)}>
            Manage
          </Button>
        )}
      </div>
    </div>
  );
}