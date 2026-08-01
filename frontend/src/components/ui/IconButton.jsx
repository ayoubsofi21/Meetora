import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Spinner from './Spinner';

const VARIANTS = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-primary-50 text-primary-700 hover:bg-primary-100',
  outline: 'border border-ink-200 bg-white text-ink-600 hover:bg-ink-50',
  ghost: 'text-ink-500 hover:bg-ink-100 hover:text-ink-700',
  danger: 'bg-danger-50 text-danger-600 hover:bg-danger-100',
};

const SIZES = {
  sm: 'h-8 w-8 rounded-lg [&>svg]:h-4 [&>svg]:w-4',
  md: 'h-10 w-10 rounded-xl [&>svg]:h-[18px] [&>svg]:w-[18px]',
  lg: 'h-12 w-12 rounded-xl [&>svg]:h-5 [&>svg]:w-5',
};

/**
 * Square/circular button for a single icon (topbar actions, card menus, etc).
 * @param {{ variant?: keyof typeof VARIANTS, size?: keyof typeof SIZES, isLoading?: boolean, 'aria-label': string }} props
 */
const IconButton = forwardRef(
  (
    { children, variant = 'ghost', size = 'md', isLoading, disabled, className, type = 'button', ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex shrink-0 items-center justify-center transition-colors duration-150',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          VARIANTS[variant],
          SIZES[size],
          className,
        )}
        {...props}
      >
        {isLoading ? <Spinner size="sm" color="current" /> : children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
export default IconButton;