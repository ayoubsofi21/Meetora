import { Bell } from 'lucide-react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownLabel, IconButton, EmptyState } from '@/components/ui';
import { cn } from '@/utils/cn';

/**
 * Notification bell with dropdown list. Pass `notifications` (array) to populate;
 * defaults to an empty state until wired to the API.
 * @param {{ notifications?: Array<{id:string|number, title:string, description?:string, time:string, unread?:boolean}> }} props
 */
export default function NotificationsMenu({ notifications = [] }) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Dropdown align="right">
      <DropdownTrigger asChild>
        {(triggerProps) => (
          <IconButton aria-label="Notifications" {...triggerProps} className="relative">
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-danger-500" />
              </span>
            )}
          </IconButton>
        )}
      </DropdownTrigger>
      <DropdownMenu width="w-80" className="p-2">
        <DropdownLabel>Notifications</DropdownLabel>
        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="Tout est à jour"
            description="Vous n'avez aucune nouvelle notification."
            className="py-6"
          />
        ) : (
          <div className="max-h-80 space-y-0.5 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  'rounded-xl px-3 py-2.5 transition-colors hover:bg-ink-50',
                  n.unread && 'bg-primary-50/60',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-ink-800">{n.title}</p>
                  {n.unread && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />}
                </div>
                {n.description && <p className="mt-0.5 text-xs text-ink-400">{n.description}</p>}
                <p className="mt-1 text-[11px] text-ink-300">{n.time}</p>
              </div>
            ))}
          </div>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}