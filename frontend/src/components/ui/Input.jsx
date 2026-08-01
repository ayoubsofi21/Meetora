import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Text input with label, hint, error, and optional left/right icon slots.
 * @param {{
 *  label?: string, hint?: string, error?: string, required?: boolean,
 *  leftIcon?: React.ReactNode, rightIcon?: React.ReactNode, containerClassName?: string
 * }} props
 */
const Input = forwardRef(
  (
    {
      label,
      hint,
      error,
      required,
      leftIcon,
      rightIcon,
      id,
      className,
      containerClassName,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id || autoId;

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-700">
            {label}
            {required && <span className="ml-0.5 text-danger-500">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 [&>svg]:h-[18px] [&>svg]:w-[18px]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'h-11 w-full rounded-xl border bg-white px-4 text-sm text-ink-800 placeholder:text-ink-400',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary-100',
              error
                ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                : 'border-ink-200 focus:border-primary-500',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              'disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 [&>svg]:h-[18px] [&>svg]:w-[18px]">
              {rightIcon}
            </span>
          )}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-danger-600">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ink-400">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;