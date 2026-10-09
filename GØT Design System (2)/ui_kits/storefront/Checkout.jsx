function Checkout({ cart = [] }) {
  const { TextField, Select, Button, CartLine, Notice } = window.GTDesignSystem_f9e073;
  const [busy, setBusy] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [err, setErr] = React.useState(null);
  const [preview, setPreview] = React.useState(false);
  const sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const submit = e => {
    e.preventDefault();
    if (!cart.length) { setErr('Add an item to your cart before checkout.'); return; }
    if (!/^(\+?20)?0?1[0125]\d{8}$/.test(phone.replace(/[\s-]/g, ''))) { setErr('Enter an Egyptian mobile number, e.g. 010 1234 5678.'); return; }
    setErr(null); setBusy(true);
    setTimeout(() => { setBusy(false); setPreview(true); }, 450);
  };
  const H = ({ n, t }) => <h2 className="got-label" style={{ margin: '0 0 16px', display: 'flex', gap: 12 }}><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--got-text-muted)' }}>{n}</span>{t}</h2>;
  return (
    <main className="co-page">
      <div className="co-layout">
        <form className="co-form" onSubmit={submit} noValidate>
          <h1 className="got-h2" style={{ textTransform: 'uppercase' }}>Checkout</h1>
          <Notice tone="info" title="Design preview">Sample catalog data only. This checkout does not send an order; WooCommerce must verify stock, delivery and the final total.</Notice>
          {preview && <Notice tone="info" role="status" title="Preview only">No order was submitted. Connect the WooCommerce checkout endpoint to place real orders.</Notice>}
          {err && <Notice tone="error" role="alert">{err}</Notice>}
          <section><H n="01" t="Contact" />
            <div className="co-fields">
              <TextField label="Full name" autoComplete="name" />
              <TextField label="Email" type="email" autoComplete="email" />
              <TextField label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" placeholder="010 1234 5678" value={phone} onChange={e => { setPhone(e.target.value); setErr(null); }} error={err && err.includes('mobile') ? err : null} />
            </div>
          </section>
          <section><H n="02" t="Delivery" />
            <div className="co-fields">
              <Select label="Governorate" options={['Select governorate', 'Alexandria', 'Cairo', 'Giza', 'Other governorates']} />
              <TextField label="City / area" autoComplete="address-level2" />
              <TextField label="Street address" autoComplete="street-address" />
              <TextField label="Building number" />
              <TextField label="Floor / apartment" optional />
              <TextField label="Delivery notes" optional multiline />
            </div>
          </section>
          <section><H n="03" t="Payment" />
            <Notice tone="info" title="Payment options">Available methods will appear after the store payment settings are connected.</Notice>
          </section>
          <Button type="submit" size="lg" fullWidth loading={busy} disabled={!cart.length}>{busy ? 'Checking preview' : 'Place order'}</Button>
        </form>
        <aside className="co-summary" aria-label="Order summary">
          <h2 className="got-label" style={{ margin: 0 }}>Order summary</h2>
          {cart.length === 0 ? <div style={{ marginTop: 16 }}><Notice tone="info">Your cart is empty — add a product to continue.</Notice></div> : <div style={{ marginBottom: 24 }}>{cart.map(i => <CartLine key={i.id} {...i} />)}</div>}
          <dl className="got-summary" style={{ margin: 0 }}>
            <div className="got-summary__row"><dt>Sample subtotal</dt><dd>EGP {sub.toLocaleString()}</dd></div>
            <div className="got-summary__row"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
            <div className="got-summary__row got-summary__total"><dt>Total</dt><dd>Confirmed by WooCommerce</dd></div>
          </dl>
          <p className="got-small" style={{ margin: '16px 0 0' }}>Final prices, discounts, shipping and inventory must be returned by the store before an order is accepted.</p>
        </aside>
      </div>
    </main>
  );
}
window.Checkout = Checkout;
