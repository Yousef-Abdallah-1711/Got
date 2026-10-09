import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../core/IconButton.jsx';
const ICON = { info: 'info', success: 'circle-check', error: 'circle-alert', warning: 'circle-alert' };
export function Notice({ tone = 'info', title, children, onDismiss, toast, action, className = '' }) {
  return (
    <div className={'got-notice got-notice--' + tone + (toast ? ' got-notice--toast' : '') + ' ' + className} role={tone === 'error' ? 'alert' : 'status'} aria-live={tone === 'error' ? 'assertive' : 'polite'}>
      <span className="got-notice__icon"><Icon name={ICON[tone]} size={18} /></span>
      <div className="got-notice__body">
        {title && <p className="got-notice__title">{title}</p>}
        {children && <div style={{ color: title ? 'var(--got-text-muted)' : undefined }}>{children}</div>}
        {action && <div style={{ marginTop: 8 }}>{action}</div>}
      </div>
      {onDismiss && <IconButton className="got-notice__close" icon="x" size={16} label="Dismiss" onClick={onDismiss} />}
    </div>
  );
}
