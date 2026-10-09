import React from 'react';
import { formatEGP } from './Price.jsx';
export function OrderSummary({ subtotal = 0, shipping, discount, total, note }) {
  return (
    <dl className="got-summary" style={{ margin: 0 }}>
      <div className="got-summary__row"><dt>Subtotal</dt><dd>{formatEGP(subtotal)}</dd></div>
      {discount > 0 && <div className="got-summary__row"><dt>Discount</dt><dd>−{formatEGP(discount)}</dd></div>}
      <div className="got-summary__row"><dt>Shipping</dt><dd>{shipping == null ? 'Calculated at checkout' : shipping === 0 ? 'Free' : formatEGP(shipping)}</dd></div>
      <div className="got-summary__row got-summary__total"><dt>Total</dt><dd>{total == null ? 'Calculated at checkout' : formatEGP(total)}</dd></div>
      {note && <p className="got-small" style={{ margin: 0 }}>{note}</p>}
    </dl>
  );
}
