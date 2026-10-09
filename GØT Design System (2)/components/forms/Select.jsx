import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Select({ label, options = [], error, hint, id, hideLabel, className = '', ...rest }) {
  const auto = React.useId();
  const fid = id || auto;
  const msg = error || hint;
  return (
    <div className={'got-field ' + className}>
      {label && <label className={hideLabel ? 'got-sr' : 'got-field__label'} htmlFor={fid}>{label}</label>}
      <div className="got-field__control">
        <select id={fid} className="got-input got-select" aria-invalid={error ? true : undefined} aria-describedby={msg ? fid + '-msg' : undefined} {...rest}>
          {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
        </select>
        <span className="got-field__adorn"><Icon name="chevron-down" size={18} /></span>
      </div>
      {msg && <p id={fid + '-msg'} className={'got-field__msg' + (error ? ' got-field__msg--error' : '')} style={{ margin: 0 }}>{msg}</p>}
    </div>
  );
}
