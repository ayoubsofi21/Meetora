import { format, isToday, isTomorrow, isYesterday, formatDistanceToNow, parseISO } from 'date-fns';

/** Formats an ISO date string as "Today", "Tomorrow", or "MMM d" (e.g. "Oct 15"). */
export function formatRelativeDate(isoDate) {
  const date = typeof isoDate === 'string' ? parseISO(isoDate) : isoDate;
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'EEEE, MMM d');
}

/** Formats an ISO date string as "09:30 AM". */
export function formatTime(isoDate) {
  const date = typeof isoDate === 'string' ? parseISO(isoDate) : isoDate;
  return format(date, 'hh:mm a');
}

/** Formats an ISO date string as "how long ago" (e.g. "2 hours ago"). */
export function formatTimeAgo(isoDate) {
  const date = typeof isoDate === 'string' ? parseISO(isoDate) : isoDate;
  return formatDistanceToNow(date, { addSuffix: true });
}

/** Formats a number as compact currency, e.g. 842500 -> "$842,500". */
export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

/** Formats a number with thousands separators, e.g. 2840 -> "2,840". */
export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

/** Returns initials-based first name only, capitalized (for greetings). */
export function firstNameOf(fullNameOrFirst) {
  return fullNameOrFirst?.split(' ')[0] ?? '';
}