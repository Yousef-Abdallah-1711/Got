function OfferBlock({ offer, state, onAddOffer }) {
  const { Badge, Button, Icon } = window.GTDesignSystem_f9e073;
  const verified = offer && offer.source === 'woocommerce' && offer.active === true &&
    state && state.source === 'woocommerce' && state.eligible === true && state.offerId === offer.id;
  if (!verified) return null;

  const savings = Number.isFinite(state.savings) ? state.savings : null;
  const required = Number.isInteger(state.requiredQuantity) ? state.requiredQuantity : null;
  const money = value => 'EGP ' + value.toLocaleString();
  return (
    <section className="got-offer" aria-label={offer.label || 'Special offer'}>
      <div className="got-offer__head"><Badge tone="offer">{offer.label || 'Special offer'}</Badge></div>
      <h3 className="got-h2 got-offer__title">{offer.benefit}</h3>
      <p className="got-small" style={{ margin: 0 }}>{offer.eligibility}</p>
      {required && <p className="got-small" style={{ margin: 0 }}>Required quantity: {required}</p>}
      {state.applied ? (
        <p className="got-small got-offer__status" role="status"><Icon name="circle-check" size={16} />Offer applied{savings == null ? '.' : ' — you save ' + money(savings) + '.'}</p>
      ) : onAddOffer ? (
        <Button variant="secondary" size="sm" onClick={onAddOffer}>Add offer to order</Button>
      ) : null}
      {(offer.endsAt || offer.terms) && <p className="got-small got-offer__terms">{offer.endsAt ? 'Ends ' + offer.endsAt + '. ' : ''}{offer.terms || ''}</p>}
    </section>
  );
}

function ShippingIncentive({ state }) {
  const { Icon } = window.GTDesignSystem_f9e073;
  if (!state || state.source !== 'woocommerce' || state.active !== true || state.eligible !== true) return null;

  const remaining = Number.isFinite(state.remaining) ? state.remaining : null;
  const percent = Number.isFinite(state.progressPercent) ? Math.max(0, Math.min(100, state.progressPercent)) : null;
  const message = state.status === 'unlocked'
    ? 'Free shipping unlocked'
    : remaining != null
      ? 'Add ' + 'EGP ' + remaining.toLocaleString() + ' more for free shipping'
      : 'Free shipping available';

  return (
    <div className="got-shipping-incentive" role="status">
      <p><Icon name="truck" size={16} />{message}</p>
      {percent != null && <div className="got-shipping-incentive__track" aria-hidden="true"><span style={{ width: percent + '%' }} /></div>}
      {state.eligibilityText && <p className="got-shipping-incentive__terms">{state.eligibilityText}</p>}
    </div>
  );
}

Object.assign(window, { OfferBlock, ShippingIncentive });
