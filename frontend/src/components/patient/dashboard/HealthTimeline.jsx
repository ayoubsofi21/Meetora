import { Link } from 'react-router-dom';
import { FlaskConical, MessageCircle, Receipt, Activity } from 'lucide-react';
import SectionCard from '@/components/common/SectionCard';
import { EmptyState, SkeletonText } from '@/components/ui';
import { formatTimeAgo } from '@/utils/formatters';
import { cn } from '@/utils/cn';

const ICON_MAP = {
  lab_result: { icon: FlaskConical, color: 'bg-success-500' },
  message: { icon: MessageCircle, color: 'bg-primary-600' },
  payment: { icon: Receipt, color: 'bg-ink-500' },
  default: { icon: Activity, color: 'bg-teal-500' },
};

/**
 * Vertical activity timeline (lab results, messages, payments, etc).
 * @param {{ events: object[], isLoading: boolean }} props
 */
export default function HealthTimeline({ events = [], isLoading }) {
  return (
    <SectionCard title="Health Timeline">
      {isLoading ? (
        <SkeletonText lines={4} />
      ) : events.length === 0 ? (
        <EmptyState icon={Activity} title="Nothing to show yet" description="Your recent activity will appear here." />
      ) : (
        <ol className="relative space-y-6 before:absolute before:bottom-1 before:left-[0.6875rem] before:top-1 before:w-px before:bg-ink-200">
          {events.map((event) => {
            const { icon: Icon, color } = ICON_MAP[event.type] || ICON_MAP.default;
            return (
              <li key={event.id} className="relative flex gap-4 pl-9">
                <span
                  className={cn(
                    'absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full text-white ring-4 ring-white',
                    color,
                  )}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-ink-400">{formatTimeAgo(event.time)}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink-900">{event.title}</p>
                  <p className="mt-0.5 text-sm text-ink-500">{event.description}</p>
                  {event.actionLabel && event.actionHref && (
                    <Link
                      to={event.actionHref}
                      className="mt-1.5 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700"
                    >
                      {event.actionLabel}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </SectionCard>
  );
}