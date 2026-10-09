import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function TextField({ label, hideLabel, hint, error, success, optional, multiline, id, className = '', ...rest }) {
  const auto = React.useId();
  const fid = id || auto;
  const msgId = fid + '-msg';
  const msg = error || success || hint;
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className={'got-field ' + className}>
      {label && <label className={hideLabel ? 'got-sr' : 'got-field__label'} htmlFor={fid}>{label}{optional && <span className="got-field__opt"> (optional)</span>}</label>}
      <div className="got-field__control">
        <Tag id={fid} className={'got-input' + (success ? ' got-input--success got-input--icon' : '') + (error ? ' got-input--icon' : '')} aria-invalid={error ? true : undefined} aria-describedby={msg ? msgId : undefined} {...rest} />
        {error && <span className="got-field__adorn" style={{ color: 'var(--color-error)' }}><Icon name="circle-alert" size={18} /></span>}
        {success && !error && <span className="got-field__adorn" style={{ color: 'var(--color-success)' }}><Icon name="check" size={18} /></span>}
      </div>
      {msg && <p id={msgId} className={'got-field__msg' + (error ? ' got-field__msg--error' : success ? ' got-field__msg--success' : '')} style={{ margin: 0 }}>{msg}</p>}
    </div>
  );
}
