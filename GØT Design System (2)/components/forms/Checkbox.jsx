import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Checkbox({ label, error, disabled, className = '', ...rest }) {
  return (
    <label className={'got-check' + (disabled ? ' got-check--disabled' : '') + ' ' + className}>
      <input type="checkbox" disabled={disabled} aria-invalid={error ? true : undefined} {...rest} />
      <span className="got-check__box"><Icon name="check" size={14} strokeWidth={2} /></span>
      <span>{label}{error && <span style={{ display: 'block', color: 'var(--color-error)', marginTop: 4 }}>{error}</span>}</span>
    </label>
  );
}
