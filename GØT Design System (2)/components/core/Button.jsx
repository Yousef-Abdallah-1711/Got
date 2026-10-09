import React from 'react';
import { Icon } from './Icon.jsx';
export function Button({ variant = 'primary', size = 'md', fullWidth, loading, disabled, iconLeft, iconRight, arrow, href, children, className = '', ...rest }) {
  const cls = ['got-btn', 'got-btn--' + variant, size !== 'md' && 'got-btn--' + size, fullWidth && 'got-btn--full', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {loading ? <Icon name="loader-circle" size={16} className="got-spin" /> : iconLeft && <Icon name={iconLeft} size={16} />}
      <span>{children}</span>
      {!loading && iconRight && <Icon name={iconRight} size={16} />}
      {!loading && arrow && <Icon name="arrow-right" size={16} className="got-btn__arrow" />}
    </>
  );
  if (href && !disabled) return <a className={cls} href={href} {...rest}>{inner}</a>;
  return <button type="button" className={cls} disabled={disabled} aria-busy={loading || undefined} {...rest} onClick={loading ? undefined : rest.onClick}>{inner}</button>;
}
