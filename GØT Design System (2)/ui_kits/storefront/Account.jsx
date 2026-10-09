function Account({ go, openProduct, wishlist = [], wish = () => ({}) }) {
  const { ProductCard } = window.GTDesignSystem_f9e073;
  const { TextField, Button, Checkbox, Notice, Badge, Price, Select, Icon } = window.GTDesignSystem_f9e073;
  const [authed, setAuthed] = React.useState(false);
  const [mode, setMode] = React.useState('signin');
  const [tab, setTab] = React.useState('orders');
  const [err, setErr] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const [previewMsg, setPreviewMsg] = React.useState('');

  const submit = e => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || pw.length < 8) { setErr(mode === 'signin' ? 'Email or password is incorrect. Check both and try again.' : 'Use a valid email and a password of at least 8 characters.'); return; }
    setErr(null);
    setPreviewMsg('Account service is not connected. No sign-in or registration request was sent.');
  };

  if (!authed) return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '96px var(--gutter)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 96, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 120 }}>
        <span className="got-eyebrow">Account</span>
        <h1 className="got-h1">{mode === 'signin' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Reset password'}</h1>
        <p className="got-body" style={{ color: 'var(--got-text-muted)', margin: 0 }}>Track orders, save addresses and check out faster. You can also check out as a guest.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Notice tone="info" title="Account preview">Sign-in, registration and password reset are not connected to an account service.</Notice>
        {previewMsg && <Notice tone="info" role="status">{previewMsg}</Notice>}
        {mode !== 'reset' && <div className="got-tabs" role="tablist" style={{ margin: 0, borderBottom: '1px solid var(--got-border)' }}>
          {[['signin', 'Sign in'], ['register', 'Register']].map(([k, l]) => <button key={k} role="tab" className="got-tab" aria-selected={mode === k} onClick={() => { setMode(k); setErr(null); }}>{l}</button>)}
        </div>}
        {err && <Notice tone="error">{err}</Notice>}
        {mode === 'reset' ? (
          <form onSubmit={e => { e.preventDefault(); setSaved(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {saved ? <Notice tone="info" title="Preview only">No reset email was sent. Connect the account service to enable password resets.</Notice> : <>
              <TextField label="Email" type="email" autoComplete="email" />
              <Button type="submit" size="lg" fullWidth>Preview reset request</Button>
            </>}
            <Button variant="link" onClick={() => { setMode('signin'); setSaved(false); }}>Back to sign in</Button>
          </form>
        ) : (
          <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {mode === 'register' && <TextField label="First name" autoComplete="given-name" />}
            <TextField label="Email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField label="Password" type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={pw} onChange={e => setPw(e.target.value)} hint={mode === 'register' ? 'At least 8 characters.' : undefined} />
            {mode === 'signin' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Checkbox label="Keep me signed in" />
                <Button variant="link" size="sm" onClick={() => setMode('reset')}>Forgot password?</Button>
              </div>
            ) : <Checkbox label="I agree to receive Drop 01 updates by email." />}
            <Button type="submit" size="lg" fullWidth>{mode === 'signin' ? 'Sign in' : 'Create account'}</Button>
          </form>
        )}
        <Button variant="secondary" onClick={() => setAuthed(true)}>Preview sample account dashboard</Button>
      </div>
    </main>
  );

  const P = window.GOT_PRODUCTS;
  const orders = [
    { no: '1001', date: '08 Oct 2026', status: 'Processing', items: [P[0]], total: 1510 },
    { no: '0994', date: '21 Sep 2026', status: 'Delivered', items: [P[2], P[1]], total: 1760 },
  ];
  const nav = [['orders', 'Orders', 'package'], ['addresses', 'Addresses', 'map-pin'], ['details', 'Account details', 'user'], ['wishlist', 'Wishlist', 'heart']];
  const H = ({ children }) => <h2 className="got-h2" style={{ textTransform: 'uppercase', marginBottom: 32 }}>{children}</h2>;

  let panel;
  if (tab === 'orders') panel = <>
    <H>Orders</H>
    <div style={{ borderTop: '1px solid var(--got-border)' }}>
      {orders.map(o => (
        <div key={o.no} style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr) auto auto', gap: 24, alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--got-border)' }}>
          <div style={{ display: 'flex', gap: 6 }}>{o.items.map((it, i) => <img key={i} src={it.image} alt="" style={{ width: 56, aspectRatio: '4/5', objectFit: 'cover', background: 'var(--got-surface-2)' }} />)}</div>
          <div>
            <p className="got-label" style={{ margin: 0 }}>Order #{o.no} <span className="got-sr">(sample)</span></p>
            <p className="got-small" style={{ margin: '4px 0 0' }}>{o.date} · {o.items.length} {o.items.length === 1 ? 'item' : 'items'} · Cash on delivery</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <Badge tone={o.status === 'Delivered' ? 'outline' : 'drop'}>{o.status}</Badge>
            <Price amount={o.total} />
          </div>
          <Button variant="secondary" size="sm" onClick={() => go('confirm')}>View</Button>
        </div>
      ))}
    </div>
  </>;
  else if (tab === 'addresses') panel = <>
    <H>Addresses</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {['Shipping', 'Billing'].map(t => (
        <div key={t} style={{ border: '1px solid var(--got-border)', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="got-eyebrow">{t} address</span>
          <p className="got-body" style={{ margin: 0 }}>Karim A.<br />Smouha<br />Alexandria, 21523<br />Egypt</p>
          <div><Button variant="link" size="sm">Edit</Button></div>
        </div>
      ))}
    </div>
  </>;
  else if (tab === 'details') panel = <>
    <H>Account details</H>
    <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 640 }}>
      <TextField label="First name" defaultValue="Karim" autoComplete="given-name" />
      <TextField label="Last name" autoComplete="family-name" />
      <div style={{ gridColumn: '1/-1' }}><TextField label="Email" type="email" defaultValue="karim@example.com" /></div>
      <div style={{ gridColumn: '1/-1' }}><TextField label="Mobile number" type="tel" inputMode="tel" defaultValue="010 1234 5678" /></div>
      <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {saved && <Notice tone="info">Preview only. Account details were not saved.</Notice>}
        <div><Button type="submit">Preview save</Button></div>
      </div>
    </form>
  </>;
  else panel = <>
    <H>Wishlist</H>
    {wishlist.length ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '32px 12px' }}>{wishlist.map(p => <ProductCard key={p.id} {...p} {...wish(p)} onClick={() => openProduct(p)} />)}</div> :
    <div style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', borderBlock: '1px solid var(--got-border)' }}>
      <Icon name="heart" size={28} />
      <p className="got-h3" style={{ textTransform: 'uppercase' }}>Nothing saved yet</p>
      <p className="got-small" style={{ margin: 0 }}>Save products to find them here later.</p>
      <Button variant="secondary" arrow onClick={() => go('shop')}>Shop Drop 01</Button>
    </div>}
  </>;

  return (
    <main style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '64px var(--gutter) 96px' }}>
      <Notice tone="info" title="Sample account preview">The profile and order history below are example data. This page does not read or change a real account. Wishlist saves remain on this device until an account service is connected.</Notice>
      <span className="got-eyebrow">My account</span>
      <h1 className="got-h1" style={{ margin: '12px 0 48px' }}>Hello, Karim</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0,1fr)', gap: 64, alignItems: 'start' }}>
        <nav aria-label="Account" style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--got-border)' }}>
          {nav.map(([k, l, ic]) => (
            <button key={k} onClick={() => { setTab(k); setSaved(false); }} aria-current={tab === k ? 'page' : undefined} className="got-label"
              style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, padding: '0 12px', background: tab === k ? 'var(--got-surface-2)' : 'none', border: 0, borderBottom: '1px solid var(--got-border)', color: tab === k ? 'var(--got-text)' : 'var(--got-text-muted)', cursor: 'pointer', textAlign: 'left' }}>
              <Icon name={ic} size={18} />{l}
            </button>
          ))}
          <button onClick={() => { setAuthed(false); setMode('signin'); setPw(''); }} className="got-label" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, padding: '0 12px', background: 'none', border: 0, color: 'var(--got-text-muted)', cursor: 'pointer' }}>
            <Icon name="arrow-left" size={18} />Sign out
          </button>
        </nav>
        <div>{panel}</div>
      </div>
    </main>
  );
}
window.Account = Account;
