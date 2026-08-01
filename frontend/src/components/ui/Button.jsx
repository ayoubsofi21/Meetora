import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import Spinner from './Spinner';

const VARIANTS = {
  primary:
    'bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-primary-glow active:bg-primary-800 disabled:hover:bg-primary-600',
  secondary:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 disabled:hover:bg-primary-50',
  outline:
    'border border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50 active:bg-ink-100 disabled:hover:bg-white',
  ghost: 'text-ink-600 hover:bg-ink-100 active:bg-ink-200 disabled:hover:bg-transparent',
  danger:
    'bg-danger-500 text-white shadow-soft hover:bg-danger-600 active:bg-danger-700 disabled:hover:bg-danger-500',
  success:
    'bg-success-500 text-white shadow-soft hover:bg-success-600 active:bg-success-700 disabled:hover:bg-success-500',
  dark: 'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950 disabled:hover:bg-ink-900',
};

const SIZES = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-[15px] gap-2 rounded-xl',
  icon: 'h-10 w-10 rounded-xl',
};

/**
 * Primary interactive button used across the app.
 * @param {{
 *  variant?: keyof typeof VARIANTS,
 *  size?: keyof typeof SIZES,
 *  isLoading?: boolean,
 *  leftIcon?: React.ReactNode,
 *  rightIcon?: React.ReactNode,
 *  fullWidth?: boolean,
 * }} props
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex select-none items-center justify-center whitespace-nowrap font-medium',
          'transition-all duration-150 ease-out',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          VARIANTS[variant],
          SIZES[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner
            size={size === 'sm' ? 'xs' : 'sm'}
            color={variant === 'outline' || variant === 'ghost' ? 'ink' : 'white'}
          />
        ) : (
          leftIcon && <span className="inline-flex shrink-0 [&>svg]:h-4 [&>svg]:w-4">{leftIcon}</span>
        )}
        {children && <span className={isLoading ? 'opacity-80' : undefined}>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 [&>svg]:h-4 [&>svg]:w-4">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;