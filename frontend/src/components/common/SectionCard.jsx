import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';
import { cn } from '@/utils/cn';

/**
 * Standard "titled panel" wrapper used across dashboards (Upcoming Appointments,
 * Health Timeline, Recent Records, etc): title + optional "View All" link + body.
 * @param {{ title: string, viewAllHref?: string, viewAllLabel?: string, actions?: React.ReactNode }} props
 */
export default function SectionCard({ title, viewAllHref, viewAllLabel = 'View All', actions, children, className, bodyClassName }) {
  return (
    <Card padding="none" className={cn('overflow-hidden', className)}>
      <div className="flex items-center justify-between gap-3 px-6 pt-6">
        <h3 className="text-lg font-bold text-ink-900">{title}</h3>
        <div className="flex items-center gap-3">
          {actions}
          {viewAllHref && (
            <Link to={viewAllHref} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              {viewAllLabel}
            </Link>
          )}
        </div>
      </div>
      <div className={cn('px-6 pb-6 pt-4', bodyClassName)}>{children}</div>
    </Card>
  );
}