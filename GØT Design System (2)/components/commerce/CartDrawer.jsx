import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
import { Button } from '../core/Button.jsx';
import { CartLine } from './CartLine.jsx';
import { OrderSummary } from './OrderSummary.jsx';
export function CartDrawer({ open, items = [], onClose, onQty, onRemove, onCheckout, onViewCart, onShop, contained }) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => e.key === 'Escape' && onClose && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  const pos = contained ? 'absolute' : 'fixed';
  const count = items.reduce((a, i) => a + i.qty, 0);
  const sub = items.reduce((a, i) => a + i.qty * i.price, 0);
  return (
    <div style={{ position: pos, inset: 0, zIndex: 'var(--z-drawer)' }}>
      <div className="got-scrim" style={{ position: 'absolute' }} onClick={onClose}></div>
      <aside className="got-drawer" role="dialog" aria-modal="true" aria-label="Cart">
        <div className="got-drawer__head"><span className="got-label">Cart <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--got-text-muted)' }}>({count})</span></span><IconButton icon="x" label="Close cart" onClick={onClose} /></div>
        {items.length === 0 ? (
          <div className="got-drawer__body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, textAlign: 'center', alignItems: 'center' }}>
            <p className="got-h3" style={{ textTransform: 'uppercase' }}>Your cart is empty</p>
            <p className="got-small" style={{ margin: 0 }}>Nothing here yet.</p>
            <Button variant="secondary" arrow onClick={onShop}>Shop Drop 01</Button>
          </div>
        ) : (
          <>
            <div className="got-drawer__body">{items.map(i => <CartLine key={i.id} {...i} onQty={q => onQty && onQty(i.id, q)} onRemove={() => onRemove && onRemove(i.id)} />)}</div>
            <div className="got-drawer__foot">
              <OrderSummary subtotal={sub} note="Delivery and payment details are confirmed at checkout." />
              <Button size="lg" fullWidth onClick={onCheckout}>Checkout</Button>
              <Button variant="link" size="sm" onClick={onViewCart}>View cart</Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
