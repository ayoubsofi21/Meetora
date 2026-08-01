import { createContext, useContext, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const DropdownContext = createContext(null);

const ALIGN = {
  left: 'left-0',
  right: 'right-0',
};

/**
 * Compound dropdown menu: <Dropdown><DropdownTrigger/><DropdownMenu><DropdownItem/></DropdownMenu></Dropdown>
 * @param {{ align?: keyof typeof ALIGN }} props
 */
export function Dropdown({ children, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const menuId = useId();

  useOnClickOutside(containerRef, () => setOpen(false), open);

  return (
    <DropdownContext.Provider value={{ open, setOpen, align, menuId }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, asChild = false }) {
  const { open, setOpen, menuId } = useContext(DropdownContext);

  const triggerProps = {
    onClick: () => setOpen((o) => !o),
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': menuId,
  };

  if (asChild) {
    return children({ ...triggerProps });
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

export function DropdownMenu({ children, className, width = 'w-56' }) {
  const { open, align, menuId } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={menuId}
          role="menu"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            'absolute z-40 mt-2 origin-top-right overflow-hidden rounded-2xl border border-ink-100 bg-white p-1.5 shadow-elevated',
            ALIGN[align],
            width,
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * @param {{ icon?: React.ElementType, danger?: boolean, onClick?: () => void }} props
 */
export function DropdownItem({ children, icon: Icon, danger = false, onClick, className, ...props }) {
  const { setOpen } = useContext(DropdownContext);

  return (
    <button
      type="button"
      role="menuitem"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
        danger ? 'text-danger-600 hover:bg-danger-50' : 'text-ink-700 hover:bg-ink-100',
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="my-1.5 h-px bg-ink-100" />;
}

export function DropdownLabel({ children }) {
  return <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">{children}</div>;
}

export default Dropdown;