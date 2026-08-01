import { createPortal } from 'react-dom';

/**
 * Renders children into document.body, used by Modal/Dropdown/Tooltip
 * so they escape parent overflow/z-index constraints.
 */
export default function Portal({ children }) {
  const portalRoot = document.body;
  return createPortal(children, portalRoot);
}