import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function QuantityStepper({ value = 1, min = 1, max = 10, onChange, size = 'md', label = 'Quantity' }) {
  const set = v => onChange && onChange(Math.max(min, Math.min(max, v)));
  return (
    <div className={'got-qty' + (size === 'sm' ? ' got-qty--sm' : '')} role="group" aria-label={label}>
      <button type="button" onClick={() => set(value - 1)} disabled={value <= min} aria-label="Decrease quantity"><Icon name="minus" size={16} /></button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max} aria-label="Increase quantity"><Icon name="plus" size={16} /></button>
    </div>
  );
}
