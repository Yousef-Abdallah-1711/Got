function ThankYou({ order, go }) {
  const { Button, Icon, Notice } = window.GTDesignSystem_f9e073;
  const confirmed = !!(order && order.confirmed === true && order.number);
  const items = confirmed && Array.isArray(order.items) ? order.items : [];
  return (
    <main className="got-confirmation">
      <section className="got-confirmation__hero">
        <span className="got-confirmation__mark"><Icon name={confirmed ? 'check' : 'info'} size={28} strokeWidth={2} /></span>
        <span className="got-eyebrow">{confirmed ? 'Order confirmed' : 'Confirmation preview'}</span>
        <h1 className="got-display">{confirmed ? 'Thank you' : 'Order confirmation'}</h1>
        <p className="got-body">{confirmed ? 'Your order was confirmed by WooCommerce.' : 'This screen appears after WooCommerce confirms an order. The local design preview has not placed one.'}</p>
        {confirmed && <p className="got-confirmation__number">{order.number}</p>}
        <div className="got-confirmation__actions">
          <Button size="lg" arrow onClick={() => go('shop')}>Continue shopping</Button>
          {confirmed && <Button size="lg" variant="secondary" onClick={() => go('confirm')}>Track order</Button>}
        </div>
      </section>
      <section className="got-confirmation__details">
        <div>
          <h2 className="got-label">What happens next</h2>
          <p className="got-small">Order status, payment instructions and delivery updates are displayed here from the confirmed WooCommerce order.</p>
        </div>
        <aside className="got-confirmation__summary" aria-label="Order summary">
          <h2 className="got-label">Your order</h2>
          {items.length ? items.map(item => <div key={item.id} className="got-confirmation__item"><span>{item.name} · {item.variant} · Qty {item.qty}</span><strong>EGP {(item.price * item.qty).toLocaleString()}</strong></div>) : <Notice tone="info">Order details and totals appear after a confirmed WooCommerce response.</Notice>}
        </aside>
      </section>
    </main>
  );
}
window.ThankYou = ThankYou;
