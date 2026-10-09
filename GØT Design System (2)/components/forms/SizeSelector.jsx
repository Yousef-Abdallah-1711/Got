import React from 'react';
export function SizeSelector({ sizes = [], value, onChange, error, label = 'Size', name, aside }) {
  const auto = React.useId();
  const n = name || 'size-' + auto;
  return (
    <fieldset className={'got-opts' + (error ? ' got-opts--error' : '')} aria-describedby={error ? n + '-err' : undefined}>
      <div className="got-opts__head">
        <legend className="got-opts__legend">{label}{value && <span className="got-opts__value"> — {value}</span>}</legend>
        {aside}
      </div>
      <div className="got-opts__row">
        {sizes.map(s => {
          const o = typeof s === 'string' ? { label: s, available: true } : s;
          return (
            <label key={o.label} className="got-size">
              <input type="radio" name={n} value={o.label} checked={value === o.label} disabled={o.available === false} onChange={() => onChange && onChange(o.label)} aria-label={o.available === false ? o.label + ', sold out' : o.label} />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p id={n + '-err'} className="got-field__msg got-field__msg--error" style={{ margin: 0 }}>{error}</p>}
    </fieldset>
  );
}
