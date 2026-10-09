import React from 'react';
import { Icon } from './Icon.jsx';
export function IconButton({ icon, label, count, variant = 'plain', size = 20, className = '', ...rest }) {
  return (
    <button type="button" className={'got-iconbtn ' + (variant === 'outline' ? 'got-iconbtn--outline ' : '') + className} aria-label={count ? label + ', ' + count + ' items' : label} {...rest}>
      <Icon name={icon} size={size} />
      {count > 0 && <span className="got-iconbtn__count" aria-hidden="true">{count}</span>}
    </button>
  );
}
