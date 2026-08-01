import { cn } from '@/utils/cn';

const SIZES = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl',
};

const STATUS_COLORS = {
  online: 'bg-success-500',
  away: 'bg-warning-500',
  offline: 'bg-ink-300',
  busy: 'bg-danger-500',
};

function getInitials(name = '') {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic soft background color from a name, for fallback avatars
const PALETTE = [
  'bg-primary-100 text-primary-700',
  'bg-teal-100 text-teal-700',
  'bg-warning-100 text-warning-700',
  'bg-danger-100 text-danger-700',
  'bg-info-100 text-info-600',
];
function paletteFor(name = '') {
  const sum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

/**
 * User avatar: shows image if `src` provided, else initials from `name`.
 * @param {{ src?: string, name?: string, size?: keyof typeof SIZES, status?: keyof typeof STATUS_COLORS, ring?: boolean }} props
 */
export default function Avatar({ src, name = '', size = 'md', status, ring = false, className, ...props }) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full object-cover',
            SIZES[size],
            ring && 'ring-2 ring-white shadow-soft',
          )}
        />
      ) : (
        <span
          className={cn(
            'flex items-center justify-center rounded-full font-semibold',
            SIZES[size],
            paletteFor(name),
            ring && 'ring-2 ring-white shadow-soft',
          )}
        >
          {getInitials(name)}
        </span>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
            STATUS_COLORS[status],
            size === 'xs' || size === 'sm' ? 'h-2 w-2' : 'h-3 w-3',
          )}
        />
      )}
    </span>
  );
}