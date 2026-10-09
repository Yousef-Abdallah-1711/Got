// Product-page checkout preview only. No order request is sent from this file.
// Production needs a server endpoint that validates stock, shipping, COD, totals and idempotency.
const GOV = [
  { v: '', l: 'Select governorate' },
  { v: 'Alexandria', l: 'Alexandria' },
  { v: 'Cairo / Giza', l: 'Cairo / Giza' },
  { v: 'Other', l: 'Other governorates' },
]; // Available zones and fees must come from WooCommerce in production.

function DirectCheckout({ product: p, color, size, qty, image, unitPrice, formRef, soldOut = false }) {
  const { TextField, Select, Checkbox, Button, Notice, Icon, Price } = window.GTDesignSystem_f9e073;
  const [f, setF] = React.useState({ name: '', phone: '', email: '', gov: '', city: '', street: '', bldg: '', floor: '', notes: '' });
  const [terms, setTerms] = React.useState(false);
  const [err, setErr] = React.useState({});
  const [st, setSt] = React.useState('idle'); // idle | submitting | preview
  const lock = React.useRef(false);
  const set = k => e => { setF(s => ({ ...s, [k]: e.target.value })); setErr(x => ({ ...x, [k]: undefined })); };
  const sub = unitPrice * qty;
  const ship = null;
  const total = null;

  const validate = () => {
    const e = {};
    if (!size) e.size = 'Select a size above before ordering.';
    if (f.name.trim().split(/\s+/).length < 2) e.name = 'Enter your first and last name.';
    if (!/^(\+?20)?0?1[0125]\d{8}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid Egyptian mobile number (e.g. 01X XXXX XXXX).';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = 'Enter a valid email address, e.g. name@example.com.';
    if (!f.gov) e.gov = 'Select your governorate to check delivery availability.';
    if (!f.city.trim()) e.city = 'Enter your city or area.';
    if (!f.street.trim()) e.street = 'Enter your street address.';
    if (!f.bldg.trim()) e.bldg = 'Enter your building number.';
    if (!terms) e.terms = 'Accept the Terms and Privacy Policy to place your order.';
    return e;
  };
  const submit = ev => {
    ev.preventDefault();
    if (lock.current || st === 'submitting' || st === 'preview') return;
    const e = validate(); setErr(e);
    if (Object.keys(e).length) { const first = document.querySelector('.pd-co [aria-invalid="true"]'); first && first.focus(); return; }
    lock.current = true; setSt('submitting');
    setTimeout(() => { lock.current = false; setSt('preview'); }, 450);
  };

  if (st === 'preview') return (
    <div className="pd-done" role="status" ref={formRef} tabIndex={-1}>
      <Icon name="info" size={32} />
      <span className="got-eyebrow">Preview only</span>
      <h3 className="got-h2" style={{ textTransform: 'uppercase' }}>WooCommerce connection required</h3>
      <p className="got-body" style={{ color: 'var(--got-text-muted)', margin: 0 }}>No order was sent and no email or stock update was created. Connect the WooCommerce order endpoint to enable real checkout.</p>
      <div><Button variant="secondary" size="sm" onClick={() => setSt('idle')}>Review details</Button></div>
    </div>
  );

  return (
    <div className="pd-co" ref={formRef} tabIndex={-1} style={{ outline: 'none' }}>
      <form className="pd-co__form" onSubmit={submit} noValidate aria-busy={st === 'submitting'}>
        {err.size && <Notice tone="error">{err.size}</Notice>}
        <Notice tone="info" title="Design preview">Sample product data only. This form does not send an order; WooCommerce must verify stock, delivery and the final total.</Notice>
        <fieldset className="pd-fs"><legend className="got-label"><b>01</b>Contact</legend>
          <TextField label="Full name" autoComplete="name" value={f.name} onChange={set('name')} error={err.name} />
          <div className="pd-grid2">
            <TextField label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" placeholder="010 1234 5678" value={f.phone} onChange={set('phone')} error={err.phone} />
            <TextField label="Email" type="email" autoComplete="email" value={f.email} onChange={set('email')} error={err.email} />
          </div>
        </fieldset>
        <fieldset className="pd-fs"><legend className="got-label"><b>02</b>Delivery</legend>
          <div className="pd-grid2">
            <Select label="Governorate" options={GOV.map(g => ({ value: g.v, label: g.l }))} value={f.gov} onChange={set('gov')} error={err.gov} autoComplete="address-level1" />
            <TextField label="City / area" autoComplete="address-level2" value={f.city} onChange={set('city')} error={err.city} />
          </div>
          <TextField label="Street address" autoComplete="street-address" value={f.street} onChange={set('street')} error={err.street} />
          <div className="pd-grid2">
            <TextField label="Building number" value={f.bldg} onChange={set('bldg')} error={err.bldg} />
            <TextField label="Floor / apartment" optional value={f.floor} onChange={set('floor')} />
          </div>
          <TextField label="Delivery instructions" optional multiline value={f.notes} onChange={set('notes')} />
        </fieldset>
        <fieldset className="pd-fs"><legend className="got-label"><b>03</b>Payment</legend>
          <Notice tone="info" title="Payment options">Available methods will appear after the store payment settings are connected.</Notice>
          <Checkbox label={<>I accept the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.</>} checked={terms} onChange={e => { setTerms(e.target.checked); setErr(x => ({ ...x, terms: undefined })); }} error={err.terms} />
        </fieldset>
      </form>
      <aside className="pd-sum" aria-label="Order summary">
        <h3 className="got-label" style={{ margin: 0 }}>Your order</h3>
        <div className="pd-sum__item">
          <div className="m"><img src={image} alt="" /></div>
          <div><p className="got-line__name">{p.name}</p><p className="got-small" style={{ margin: '4px 0 0' }}>{color} / {size || 'Select size'} · Qty {qty}</p></div>
          <Price amount={sub} />
        </div>
        <dl className="got-summary" style={{ margin: 0 }}>
          <div className="got-summary__row"><dt>Sample unit price</dt><dd>EGP {unitPrice.toLocaleString()}</dd></div>
          <div className="got-summary__row"><dt>Sample subtotal</dt><dd>EGP {sub.toLocaleString()}</dd></div>
          <div className="got-summary__row"><dt>Shipping</dt><dd aria-live="polite">{ship == null ? 'Calculated at checkout' : ship === 0 ? 'Free' : 'EGP ' + ship}</dd></div>
          <div className="got-summary__row got-summary__total"><dt>Total</dt><dd>{total == null ? 'Confirmed at checkout' : 'EGP ' + total.toLocaleString()}</dd></div>
        </dl>
        <p className="got-small" style={{ margin: 0 }}>Shipping and total are shown after the address is checked by WooCommerce.</p>
        <Button size="lg" fullWidth loading={st === 'submitting'} disabled={soldOut} onClick={submit} data-confirm>{st === 'submitting' ? 'Checking preview' : total != null ? 'Confirm order — EGP ' + total.toLocaleString() : 'Confirm order'}</Button>
        <p className="got-small" style={{ margin: 0, display: 'flex', gap: 8 }}><Icon name="lock" size={16} />No information leaves this local preview.</p>
      </aside>
    </div>
  );
}
window.DirectCheckout = DirectCheckout;
