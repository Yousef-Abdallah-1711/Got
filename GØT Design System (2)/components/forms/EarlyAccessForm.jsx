import React from 'react';
import { TextField } from './TextField.jsx';
import { Checkbox } from './Checkbox.jsx';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
export function EarlyAccessForm({ state: forced, onSubmit, cta = 'Get early access' }) {
  const [email, setEmail] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [st, setSt] = React.useState('idle');
  const [err, setErr] = React.useState({});
  const state = forced || st;
  const submit = async e => {
    e.preventDefault();
    const er = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) er.email = 'Enter a valid email address, e.g. name@example.com.';
    if (!consent) er.consent = 'Tick the box so we can email you.';
    setErr(er);
    if (Object.keys(er).length) return;
    setSt('loading');
    try {
      if (!onSubmit) {
        setSt('preview');
        return;
      }
      await onSubmit(email);
      setSt('success');
    } catch (error) {
      setSt('error');
    }
  };
  if (state === 'success') return (
    <div className="got-ea__done" role="status">
      <Icon name="mail" size={24} />
      <p className="got-label" style={{ margin: 0 }}>Check your email</p>
      <p className="got-small" style={{ margin: 0 }}>We sent a confirmation link{email ? ' to ' + email : ''}. Confirm it to join the Drop 01 list.</p>
    </div>
  );
  if (state === 'preview') return (
    <div className="got-ea__done" role="status">
      <Icon name="info" size={24} />
      <p className="got-label" style={{ margin: 0 }}>Signup preview</p>
      <p className="got-small" style={{ margin: 0 }}>No email was saved or sent. Connect the mailing list service to enable Drop 01 updates.</p>
    </div>
  );
  return (
    <form className="got-ea" onSubmit={submit} noValidate>
      <div className="got-ea__row">
        <TextField label="Email" hideLabel type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} error={state === 'error' ? 'Something went wrong. Try again in a moment.' : err.email} />
        <div style={{ flex: 'none' }}><Button type="submit" loading={state === 'loading'} size="lg" fullWidth>{cta}</Button></div>
      </div>
      <Checkbox label="I agree to receive Drop 01 updates by email." checked={consent} onChange={e => setConsent(e.target.checked)} error={err.consent} />
    </form>
  );
}
