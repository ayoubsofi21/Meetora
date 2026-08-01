import { useRef, useState, cloneElement, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const PLACEMENTS = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Hover/focus tooltip. Wraps a single child element (must accept a ref).
 * @param {{ content: React.ReactNode, placement?: keyof typeof PLACEMENTS, children: React.ReactElement }} props
 */
export default function Tooltip({ content, placement = 'top', children, delay = 200 }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const tooltipId = useId();

  const show = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {cloneElement(children, { 'aria-describedby': open ? tooltipId : undefined })}
      <AnimatePresence>
        {open && content && (
          <motion.span
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className={cn(
              'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-elevated',
              PLACEMENTS[placement],
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}