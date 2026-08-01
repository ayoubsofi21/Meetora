import { cn } from '@/utils/cn';

const SIZES = {
  xs: 'h-3.5 w-3.5 border-[1.5px]',
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-7 w-7 border-[3px]',
  xl: 'h-10 w-10 border-[3px]',
};

const COLORS = {
  primary: 'border-primary-600 border-t-transparent',
  white: 'border-white border-t-transparent',
  ink: 'border-ink-400 border-t-transparent',
  current: 'border-current border-t-transparent',
};

/**
 * Circular loading spinner.
 * @param {{ size?: keyof typeof SIZES, color?: keyof typeof COLORS, className?: string }} props
 */
export default function Spinner({ size = 'md', color = 'primary', className, ...props }) {
  return (
    <span
      role="status"
      aria-label="Chargement"
      className={cn('inline-block animate-spin rounded-full', SIZES[size], COLORS[color], className)}
      {...props}
    />
  );
}