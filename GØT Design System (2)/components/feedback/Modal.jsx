import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function Modal({ open, title, onClose, children, footer, contained }) {
  const dialogRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const focusable = () => dialog ? Array.from(dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')) : [];
    const first = focusable()[0];
    if (first) first.focus();
    const keydown = e => {
      if (e.key === 'Escape') { onClose && onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) { e.preventDefault(); return; }
      if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === items[items.length - 1]) { e.preventDefault(); items[0].focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); if (previous && typeof previous.focus === 'function') previous.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  const pos = contained ? 'absolute' : 'fixed';
  return (
    <div style={{ position: pos, inset: 0, zIndex: 'var(--z-modal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="got-scrim" style={{ position: pos }} onClick={onClose}></div>
      <div ref={dialogRef} className="got-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="got-modal__head"><h2 className="got-modal__title">{title}</h2><IconButton icon="x" label="Close" onClick={onClose} /></div>
        <div className="got-modal__body">{children}</div>
        {footer && <div className="got-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}
