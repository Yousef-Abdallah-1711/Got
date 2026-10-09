import React from 'react';
export function ColorSelector({ colors = [], value, onChange, label = 'Color', name }) {
  const auto = React.useId();
  const n = name || 'color-' + auto;
  return (
    <fieldset className="got-opts">
      <legend className="got-opts__legend">{label}{value && <span className="got-opts__value"> — {value}</span>}</legend>
      <div className="got-swatches">
        {colors.map(c => (
          <label key={c.name} className="got-swatch">
            <input type="radio" name={n} value={c.name} checked={value === c.name} disabled={c.available === false} onChange={() => onChange && onChange(c.name)} />
            <span className="got-swatch__chip" style={{ background: c.hex }} aria-hidden="true"></span>
            <span>{c.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
