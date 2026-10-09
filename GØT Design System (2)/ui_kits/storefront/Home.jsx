function Home({ go, openProduct, addToCart, wish, showSlots }) {
  const P = window.GOT_PRODUCTS.filter(p => !p.hidden);
  const c = window.GOT_HOME;
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);
  const open = p => p ? openProduct(p) : go('shop');
  const spot = P.find(p => p.id === c.spotlightProductId && !p.soldOut);
  const wrap = n => <div className="hm-wrap" style={{ paddingBlock: 32 }}>{n}</div>;
  return (
    <main>
      <HmHero c={c.hero} go={go} />
      <HmDrop products={P.filter(p => !p.soldOut)} open={open} wish={wish} />
      <HmCategories products={P} go={go} />
      <HmArrivals products={P} open={open} wish={wish} go={go} loading={loading} />
      <HmManifesto />
      <HmSpotlight product={spot} addToCart={addToCart} open={open} wish={wish} />
      <HmPackaging />
      {c.craftsmanship ? null : showSlots && wrap(<CmsSlot show name="10 · Product details & craftsmanship" needs="Approved fabric, weight and construction details. No material claims until confirmed by the brand." />)}
      {c.bestSellers ? null : showSlots && wrap(<CmsSlot show name="11 · Best sellers" needs="Renders from real WooCommerce sales data only (total_sales). Hidden before launch." />)}
      <HmStory />
      <HmSocial />
      <HmEarly />
      <HmFaq showSlots={showSlots} />
    </main>
  );
}

function MobileMenu({ open, onClose, go, nav }) {
  const { IconButton, Wordmark, Icon } = window.GTDesignSystem_f9e073;
  React.useEffect(() => {
    if (!open) return;
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  if (!open) return null;
  return (
    <div className="hm-menu">
      <div className="got-scrim" style={{ position: 'absolute' }} onClick={onClose}></div>
      <div className="hm-menu__panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="hm-menu__head"><Wordmark size={24} /><IconButton icon="x" label="Close menu" onClick={onClose} /></div>
        <nav className="hm-menu__nav" aria-label="Mobile">
          {nav.map(n => <button key={n.label} onClick={() => { onClose(); go(n.key, n.cat); }}>{n.label}<Icon name="arrow-right" size={20} /></button>)}
        </nav>
        <div className="hm-menu__foot">
          <button className="got-header__link" style={{ padding: 0 }} onClick={() => { onClose(); go('account'); }}>Account</button>
          <a className="got-header__link" style={{ padding: 0 }} href="https://www.instagram.com/got.official1/">Instagram — @got.official1</a>
          <a className="got-header__link" style={{ padding: 0 }} href="https://www.tiktok.com/@got.offical">TikTok — @got.offical</a>
        </div>
      </div>
    </div>
  );
}

function SearchOverlay({ open, onClose, openProduct, wish }) {
  const { IconButton, Icon, ProductCard, Button } = window.GTDesignSystem_f9e073;
  const [q, setQ] = React.useState('');
  const ref = React.useRef();
  React.useEffect(() => {
    if (!open) return;
    setTimeout(() => ref.current && ref.current.focus(), 30);
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  if (!open) return null;
  const t = q.trim().toLowerCase();
  const res = t ? window.GOT_PRODUCTS.filter(p => (p.name + ' ' + p.meta + ' ' + p.cat).toLowerCase().includes(t)) : [];
  return (
    <div className="hm-search">
      <div className="got-scrim" style={{ position: 'absolute' }} onClick={onClose}></div>
      <div className="hm-search__panel" role="dialog" aria-modal="true" aria-label="Search">
        <div className="hm-wrap">
          <form role="search" className="hm-search__bar" onSubmit={e => e.preventDefault()}>
            <Icon name="search" size={24} />
            <label htmlFor="hm-q" className="got-sr">Search products</label>
            <input id="hm-q" ref={ref} value={q} onChange={e => setQ(e.target.value)} placeholder="Search" autoComplete="off" />
            {q && <Button variant="link" size="sm" onClick={() => setQ('')}>Clear</Button>}
            <IconButton icon="x" label="Close search" onClick={onClose} />
          </form>
          <p className="got-eyebrow" aria-live="polite" style={{ margin: '16px 0 0' }}>{t ? res.length + (res.length === 1 ? ' result' : ' results') + ' for “' + q + '”' : 'Try “hoodie” or “keychain”'}</p>
          {t && !res.length ? (
            <div style={{ padding: '48px 0 64px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <p className="got-h3" style={{ textTransform: 'uppercase' }}>No products match</p>
              <p className="got-small" style={{ margin: 0 }}>Check the spelling or browse the full drop.</p>
            </div>
          ) : <div className="hm-search__res">{res.map(p => <ProductCard key={p.id} {...p} {...wish(p)} onClick={() => { onClose(); openProduct(p); }} />)}</div>}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { Home, MobileMenu, SearchOverlay });
