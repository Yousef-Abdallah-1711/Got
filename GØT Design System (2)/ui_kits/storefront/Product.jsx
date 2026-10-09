function Product({ product: p, addToCart, go, openProduct, wish = () => ({}) }) {
  const { Badge, Price, ColorSelector, SizeSelector, QuantityStepper, Button, IconButton, Accordion, Icon, Modal, ProductCard } = window.GTDesignSystem_f9e073;
  const H = window.GOT_HOME;
  const [color, setColor] = React.useState(p.colors[0].name);
  const [size, setSize] = React.useState(p.sizes.length === 1 && p.sizes[0].available !== false ? p.sizes[0].label : null);
  const [qty, setQty] = React.useState(1);
  const [err, setErr] = React.useState(null);
  const [img, setImg] = React.useState(0);
  const [guide, setGuide] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [coVisible, setCoVisible] = React.useState(false);
  const [heroCta, setHeroCta] = React.useState(true);
  const coRef = React.useRef(); const sizeRef = React.useRef(); const ctaRef = React.useRef(); const trackRef = React.useRef();
  const w = wish(p);
  const commerce = p.commerce && p.commerce.source === 'woocommerce' ? p.commerce : null;
  const currentPrice = commerce && Number.isFinite(commerce.price) ? commerce.price : p.price;
  const sizes = commerce && Array.isArray(commerce.sizes) ? commerce.sizes : p.sizes.map(s => ({ label: s.label }));
  const soldOut = !!(commerce && commerce.availability === 'sold-out');
  const unavailable = !!(commerce && !['in-stock', 'low-stock'].includes(commerce.availability));
  const max = commerce && Number.isInteger(commerce.quantity) ? Math.max(1, Math.min(10, commerce.quantity)) : 10;
  const imgs = [0, 1, 2, 3].map(i => window.GOT_IMG(p.id + color + i, 1000, 1250));
  const low = !!(commerce && commerce.availability === 'low-stock');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  React.useEffect(() => {
    const a = new IntersectionObserver(([e]) => setCoVisible(e.isIntersecting), { threshold: 0.05 });
    const b = new IntersectionObserver(([e]) => setHeroCta(e.isIntersecting), { threshold: 0 });
    coRef.current && a.observe(coRef.current); ctaRef.current && b.observe(ctaRef.current);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);
  const pick = i => { setImg(i); const t = trackRef.current; if (t) t.scrollTo({ left: t.clientWidth * i, behavior: reduce ? 'auto' : 'smooth' }); };
  const onScroll = e => { const t = e.currentTarget; const i = Math.round(t.scrollLeft / t.clientWidth); if (i !== img) setImg(i); };
  const orderNow = () => {
    if (!size) { setErr('Select a size to continue.'); const el = sizeRef.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: reduce ? 'auto' : 'smooth' }); return; }
    const el = coRef.current; if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(() => { const f = el.querySelector('input'); f && f.focus({ preventScroll: true }); }, reduce ? 0 : 500);
  };
  const add = () => {
    if (!size) { setErr('Select a size to continue.'); return; }
    setBusy(true);
    setTimeout(() => { setBusy(false); addToCart({ id: p.id + color + size, image: imgs[0], name: p.name, variant: color + ' / ' + size, price: currentPrice, qty, max }); }, 500);
  };
  const related = window.GOT_PRODUCTS.filter(x => x.id !== p.id && !x.hidden).slice(0, 4);
  const faq = [
    { title: 'How do I choose the correct size?', content: 'Open the size guide next to the size selector.' },
    { title: 'Is Cash on Delivery available?', content: 'Available payment methods are confirmed by the store at checkout.' },
    { title: 'Which governorates are supported?', content: 'Delivery availability is confirmed for the selected address at checkout.' },
    { title: 'How much does shipping cost?', content: 'The delivery fee is confirmed after you enter your address, before you submit an order.' },
    { title: 'How can I contact GØT?', content: <>Email <a href="mailto:gotoffical1@gmail.com">gotoffical1@gmail.com</a> or message <a href="https://www.instagram.com/got.official1/">@got.official1</a> on Instagram.</> },
  ];

  return (
    <main className="pd">
      <nav aria-label="Breadcrumb" className="got-eyebrow pd-crumb">
        <a href="#" onClick={e => { e.preventDefault(); go('shop'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Drop 01</a><Icon name="chevron-right" size={12} /><span style={{ color: 'var(--got-text)' }}>{p.name}</span>
      </nav>

      <section className="pd-hero" aria-label="Product">
        <div className="pd-gal">
          <div className="pd-gal__thumbs" role="group" aria-label="Product images">
            {imgs.map((s, i) => <button key={i} className="pd-thumb" aria-current={img === i} aria-label={'Show image ' + (i + 1)} onClick={() => pick(i)}><img src={s} alt="" loading="lazy" /></button>)}
          </div>
          <div className="pd-gal__main">
            <div className="pd-gal__track" ref={trackRef} onScroll={onScroll} tabIndex={0} aria-label="Product gallery, swipe for more">
              {imgs.map((s, i) => <div key={i}><img src={s} alt={p.name + ', ' + color + ', view ' + (i + 1)} loading={i ? 'lazy' : 'eager'} fetchpriority={i ? undefined : 'high'} width="1000" height="1250" /></div>)}
            </div>
            <span className="pd-gal__count" aria-hidden="true">{img + 1} / {imgs.length}</span>
            <IconButton className="pd-gal__zoom" icon="zoom-in" label="Zoom image" variant="outline" onClick={() => window.open(imgs[img], '_blank')} />
          </div>
        </div>

        <div className="pd-info">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{(p.badges || []).slice(0, 2).map(b => <Badge key={b.label} tone={b.tone} icon={b.icon}>{b.label}</Badge>)}<Badge tone="drop">Drop 01</Badge></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
              <h1 className="got-h1" style={{ fontSize: 'clamp(2rem,6vw,3.5rem)' }}>{p.name}</h1>
              <IconButton className="got-iconbtn--wish" icon="heart" variant="outline" label={w.wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={!!w.wishlisted} onClick={w.onWishlist} style={w.wishlisted ? { background: 'var(--got-cta-bg)', color: 'var(--got-cta-text)' } : undefined} />
            </div>
            <Price amount={currentPrice} className="" />
            <OfferBlock offer={commerce && commerce.promotion} state={commerce && commerce.promotionState} onAddOffer={() => {
              const needed = commerce && commerce.promotionState && commerce.promotionState.requiredQuantity;
              if (Number.isInteger(needed)) setQty(Math.min(max, Math.max(qty, needed)));
            }} />
          </div>
          <ColorSelector colors={p.colors} value={color} onChange={c => { setColor(c); setImg(0); trackRef.current && (trackRef.current.scrollLeft = 0); }} />
          <div ref={sizeRef}><SizeSelector sizes={sizes} value={size} onChange={s => { setSize(s); setErr(null); }} error={err} aside={<Button variant="link" size="sm" iconLeft="ruler" onClick={() => setGuide(true)}>Size guide</Button>} /></div>
          <div className="pd-qtyrow">
            <QuantityStepper value={qty} max={max} onChange={setQty} />
            <span className="pd-stock" style={{ marginLeft: 'auto' }} aria-live="polite">{soldOut ? 'Sold out' : unavailable ? 'Currently unavailable' : commerce ? <><i className={low ? 'pd-stock--low' : ''}></i>{low ? commerce.stockLabel || 'Low stock' : commerce.stockLabel || 'In stock'}</> : 'Availability not connected in this preview'}</span>
          </div>
          <div className="pd-actions" ref={ctaRef}>
            <Button size="lg" fullWidth disabled={unavailable} onClick={orderNow} arrow>Order now</Button>
            <Button size="lg" variant="secondary" fullWidth disabled={unavailable} loading={busy} onClick={add}>Add to cart</Button>
          </div>
          <ShippingIncentive state={commerce && commerce.shippingIncentive} />
          <div className="pd-mini">
            <span><Icon name="package" size={18} />Payment options confirmed at checkout</span>
            <span><Icon name="truck" size={18} />Delivery area and fee confirmed at checkout</span>
          </div>
        </div>
      </section>

      <section className="pd-sec" aria-labelledby="pd-trust-t">
        <h2 id="pd-trust-t" className="got-sr">Shopping information</h2>
        <div className="pd-trust">
          {[['package', 'Payment options', 'Available methods are confirmed at checkout.'], ['truck', 'Shipping', 'Available areas and fees are confirmed at checkout.'], ['lock', 'Order verification', 'The store verifies price, shipping and stock before accepting an order.'], ['mail', 'Support', 'gotoffical1@gmail.com or Instagram @got.official1.']].map(([ic, t, d]) => <div key={t}><Icon name={ic} size={24} /><h3 className="got-label" style={{ margin: 0 }}>{t}</h3><p className="got-small" style={{ margin: 0 }}>{d}</p></div>)}
        </div>
      </section>

      {p.specs && <section className="pd-sec" aria-labelledby="pd-spec-t">
        <h2 id="pd-spec-t" className="got-h2" style={{ textTransform: 'uppercase', marginBottom: 32 }}>Details</h2>
        <dl className="pd-spec" style={{ margin: 0 }}>{Object.entries(p.specs).map(([k, v]) => <div key={k}><dt className="got-eyebrow">{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>}

      <section className="pd-sec" aria-label="Story">
        <div className="pd-story">
          <h2 className="pd-story__big"><span>Forged</span><span>to be</span><span>different</span></h2>
          <div className="pd-story__imgs"><div><img src={imgs[1]} alt="" loading="lazy" /></div><div><img src={imgs[2]} alt="" loading="lazy" /></div></div>
        </div>
      </section>

      <section className="pd-sec" aria-labelledby="pd-pack-t">
        <div className="pd-pack">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="got-eyebrow">Packaging</span>
            <h2 id="pd-pack-t" className="got-h1">More than<br />just a hoodie</h2>
            <p className="got-small" style={{ margin: 0 }}>Brand packaging imagery. Photographed items are shown for presentation; the contents of your order are listed in the order summary.</p>
          </div>
          <div className="pd-pack__imgs">{['pk-box', 'pk-tag', 'pk-qr'].map(k => <div key={k}><img src={window.GOT_IMG(k, 600, 750)} alt="" loading="lazy" /></div>)}</div>
        </div>
      </section>

      <section className="pd-sec" aria-labelledby="pd-ship-t">
        <div className="pd-ship">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <span className="got-eyebrow">Shipping &amp; returns</span>
            <h2 id="pd-ship-t" className="got-h2" style={{ textTransform: 'uppercase' }}>Delivery details</h2>
            <p className="got-small" style={{ margin: 0 }}>Available delivery areas and fees are confirmed before you place an order. Returns and exchange details will be added when the policy is approved.</p>
          </div>
          <div className="pd-ship__note"><Icon name="truck" size={20} /><p className="got-small" style={{ margin: 0 }}>Delivery fee is calculated for the selected address during checkout.</p></div>
        </div>
      </section>

      <section className="pd-sec" id="checkout" aria-labelledby="pd-co-t">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}><span className="got-eyebrow">Order preview</span><h2 id="pd-co-t" className="got-h1">Order this piece</h2></div>
        <DirectCheckout product={p} color={color} size={size} qty={qty} image={imgs[0]} unitPrice={currentPrice} formRef={coRef} soldOut={unavailable} />
      </section>

      <section className="pd-sec" aria-labelledby="pd-faq-t">
        <div className="pd-ship">
          <h2 id="pd-faq-t" className="got-h2" style={{ textTransform: 'uppercase' }}>Questions</h2>
          <Accordion items={faq} defaultOpen={0} />
        </div>
      </section>

      {related.length > 0 && <section className="pd-sec" aria-labelledby="pd-rel-t">
        <h2 id="pd-rel-t" className="got-h2" style={{ textTransform: 'uppercase', marginBottom: 32 }}>More from Drop 01</h2>
        <div className="pd-rel">{related.map(r => <ProductCard key={r.id} {...r} {...wish(r)} onClick={() => openProduct(r)} />)}</div>
      </section>}

      <section className="pd-sec pd-final" aria-label="Order">
        <span className="got-eyebrow">Drop 01</span>
        <h2 className="got-display">Ready for<br />Drop 01?</h2>
        <Button size="lg" arrow onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}>Choose your size</Button>
      </section>

      <div className="pd-sticky" data-hidden={heroCta || coVisible || unavailable} aria-hidden={heroCta || coVisible || unavailable}>
        <div><span className="got-eyebrow" style={{ display: 'block' }}>{p.name}</span><Price amount={currentPrice * qty} /></div>
        <Button disabled={unavailable} onClick={orderNow} tabIndex={heroCta || coVisible ? -1 : 0}>Order now</Button>
      </div>

      <Modal open={guide} title="Size guide" onClose={() => setGuide(false)} footer={<Button onClick={() => setGuide(false)}>Done</Button>}>
        <p className="got-small" style={{ margin: '0 0 16px' }}>Measurements in centimetres will appear here once the approved Drop 01 size chart is supplied.</p>
        <div className="pd-size-wrap"><table className="pd-size"><thead><tr><th scope="col">Size</th><th scope="col">Chest</th><th scope="col">Length</th><th scope="col">Sleeve</th></tr></thead>
          <tbody>{p.sizes.map(s => <tr key={s.label}><th scope="row">{s.label}</th><td>—</td><td>—</td><td>—</td></tr>)}</tbody></table></div>
      </Modal>
    </main>
  );
}
window.Product = Product;
