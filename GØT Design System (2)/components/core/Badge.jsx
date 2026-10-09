import React from 'react';
import { Icon } from './Icon.jsx';
export function Badge({ tone = 'outline', pill, icon, children, className = '' }) {
  return <span className={'got-badge got-badge--' + tone + (pill ? ' got-badge--pill' : '') + ' ' + className}>{icon && <Icon name={icon} size={12} />}{children}</span>;
}
