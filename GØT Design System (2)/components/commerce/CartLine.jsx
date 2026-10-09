import React from 'react';
import { QuantityStepper } from '../forms/QuantityStepper.jsx';
import { Button } from '../core/Button.jsx';
import { Price } from './Price.jsx';
import { Notice } from '../feedback/Notice.jsx';
export function CartLine({ name, variant, price, qty = 1, max = 10, image, warning, onQty, onRemove }) {
  return (
    <div className="got-line">
      <div className="got-line__media">{image ? <img src={image} alt="" /> : <span className="got-ph" style={{ fontSize: 9 }}>4:5</span>}</div>
      <div style={{ minWidth: 0 }}>
        <div className="got-line__top"><p className="got-line__name">{name}</p><Price amount={price * qty} /></div>
        <p className="got-line__var">{variant}</p>
        <div className="got-line__ctrl">
          <QuantityStepper size="sm" value={qty} max={max} onChange={onQty} label={'Quantity for ' + name} />
          <Button variant="link" size="sm" onClick={onRemove} aria-label={'Remove ' + name}>Remove</Button>
        </div>
      </div>
      {warning && <div className="got-line__warn"><Notice tone="warning">{warning}</Notice></div>}
    </div>
  );
}
