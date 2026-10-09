function Confirmation({ order, go }) {
  const { Button, Icon } = window.GTDesignSystem_f9e073;
  const confirmed = !!(order && order.confirmed === true && order.number);
  const updates = confirmed && Array.isArray(order.statusEvents) ? order.statusEvents : [];
  return (
    <main className="got-tracking">
      <div className="got-tracking__intro">
        <span className="got-eyebrow">Order tracking</span>
        <h1 className="got-h1">{confirmed ? 'Your order' : 'Tracking preview'}</h1>
        <p className="got-body">{confirmed ? 'Current status is supplied by WooCommerce.' : 'Tracking details appear after WooCommerce confirms an order. No order has been created in this preview.'}</p>
        {confirmed && <p className="got-tracking__number">{order.number}</p>}
      </div>
      {updates.length ? (
        <ol className="got-tracking__steps">
          {updates.map((step, i) => <li key={step.id || i} data-current={step.current ? 'true' : 'false'}><span className="got-tracking__icon">{step.complete ? <Icon name="check" size={14} /> : <span>{i + 1}</span>}</span><span className="got-label">{step.label}</span><time className="got-eyebrow">{step.date || 'Pending'}</time></li>)}
        </ol>
      ) : <div className="got-tracking__empty"><Icon name="package" size={24} /><p className="got-small">Order status updates will appear here once they are recorded.</p></div>}
      <Button variant="secondary" onClick={() => go('shop')}>Continue shopping</Button>
    </main>
  );
}
window.Confirmation = Confirmation;
