import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Accordion({ items = [], defaultOpen = -1, multiple }) {
  const [open, setOpen] = React.useState(defaultOpen >= 0 ? [defaultOpen] : []);
  const auto = React.useId();
  const toggle = i => setOpen(o => o.includes(i) ? o.filter(x => x !== i) : multiple ? [...o, i] : [i]);
  return (
    <div className="got-acc">
      {items.map((it, i) => {
        const on = open.includes(i);
        return (
          <div className="got-acc__item" key={it.title}>
            <h3 style={{ margin: 0 }}><button type="button" className="got-acc__btn" aria-expanded={on} aria-controls={auto + i} onClick={() => toggle(i)}>{it.title}<Icon name="plus" size={18} /></button></h3>
            <div id={auto + i} className="got-acc__panel" hidden={!on}>{it.content}</div>
          </div>
        );
      })}
    </div>
  );
}
