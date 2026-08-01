import { cn } from '@/utils/cn';

/**
 * Horizontal or vertical divider, optionally with a centered label.
 * @param {{ orientation?: 'horizontal'|'vertical', label?: string }} props
 */
export default function Divider({ orientation = 'horizontal', label, className }) {
  if (orientation === 'vertical') {
    return <span className={cn('inline-block h-full w-px bg-ink-200', className)} />;
  }

  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <span className="h-px flex-1 bg-ink-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</span>
        <span className="h-px flex-1 bg-ink-200" />
      </div>
    );
  }

  return <hr className={cn('border-t border-ink-200', className)} />;
}