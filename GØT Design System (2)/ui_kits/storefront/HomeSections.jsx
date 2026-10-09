const HS = () => window.GTDesignSystem_f9e073;

function CmsSlot({ show, name, needs }) {
  if (!show) return null;
  const { Icon } = HS();
  return (
    <div className="hm-cms" role="note">
      <span className="hm-cms__tag">Hidden in production · awaiting content</span>
      <p className="got-label" style={{ margin: 0 }}>{name}</p>
      <p className="got-small" style={{ margin: 0, display: 'flex', gap: 8 }}><Icon name="info" size={16} />{needs}</p>
    </div>
  );
}

function Mark({ id, className }) {
  return <div className={'hm-slot ' + (className || '')} style={{ background: 'transparent' }}><image-slot id={id} shape="rect" fit="contain" placeholder="Sword monogram"></image-slot></div>;
}

function HmHero({ c, go }) {
  const { Button } = HS();
  return (
    <section className="hm-hero" aria-labelledby="hm-hero-t">
      <div className="hm-hero__img hm-slot"><image-slot id="home-hero" shape="rect" placeholder="Drop 01 hero — real campaign photo (16:9 desktop / 4:5 mobile)" {...window.GOT_SLOT('hero', 1920, 1200)}></image-slot></div>
      <Mark id="home-hero-mark" className="hm-hero__mark" />
      <div className="hm-hero__in">
        <span className="hm-chip">{c.eyebrow} — {window.GOT_HOME.drop.status}</span>
        <h1 id="hm-hero-t" className="hm-hero__title">{c.title.map(t => <span key={t}>{t}</span>)}</h1>
        <div className="hm-hero__meta" data-theme="dark">
          <span className="hm-hero__idx">EST. 2026 / Alexandria, Egypt</span>
          <Button size="lg" arrow onClick={() => go('shop')}>{c.cta}</Button>
        </div>
      </div>
    </section>
  );
}

function HmDrop({ products, open, wish }) {
  const { ProductCard, Button } = HS();
  const d = window.GOT_HOME.drop;
  if (!products.length) return null;
  return (
    <section className="hm-sec hm-wrap" aria-labelledby="hm-drop-t">
      <div className="hm-drop">
        <div className="hm-drop__media hm-slot"><image-slot id="home-drop-editorial" shape="rect" placeholder="Drop 01 editorial — model / garment" {...window.GOT_SLOT('drop-ed', 1000, 1400)}></image-slot></div>
        <div className="hm-drop__side">
          <p className="hm-drop__num" aria-hidden="true">01</p>
          <div>
            <span className="got-eyebrow">{d.id}</span>
            <h2 id="hm-drop-t" className="got-h1" style={{ marginTop: 12 }}>{d.title}</h2>
          </div>
          <div className="hm-drop__grid">{products.slice(0, 2).map(p => <ProductCard key={p.id} {...p} {...wish(p)} onClick={() => open(p)} />)}</div>
          <div><Button variant="secondary" arrow onClick={() => open(null)}>View the full drop</Button></div>
        </div>
      </div>
    </section>
  );
}

function HmCategories({ products, go }) {
  const cats = [...new Set(products.map(p => p.cat))].map(cat => ({ cat, list: products.filter(p => p.cat === cat) })).filter(c => c.list.length);
  if (cats.length < 2) return null;
  return (
    <section className="hm-sec hm-wrap hm-rule" aria-labelledby="hm-cat-t">
      <div className="hm-head"><div><span className="got-eyebrow">Shop by category</span><h2 id="hm-cat-t" className="got-h2" style={{ textTransform: 'uppercase' }}>Choose your piece</h2></div></div>
      <div className="hm-cats">
        {cats.map((c, ci) => (
          <a key={c.cat} href="#" className="hm-cat" onClick={e => { e.preventDefault(); go('shop', c.cat); }}>
            <img src={c.list[0].image} alt="" loading="lazy" /><span className="hm-cat__no" aria-hidden="true">0{ci + 1}</span>
            <span className="hm-cat__lbl"><span className="hm-cat__name">{c.cat}</span><span className="hm-cat__count">Explore →</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function HmArrivals({ products, open, wish, go, loading }) {
  const { ProductCard, Button, Skeleton } = HS();
  if (!loading && !products.length) return null;
  return (
    <section className="hm-sec hm-wrap hm-rule" aria-labelledby="hm-new-t">
      <div className="hm-head">
        <div><span className="got-eyebrow">From the collection</span><h2 id="hm-new-t" className="got-h2" style={{ textTransform: 'uppercase' }}>More to discover</h2></div>
        <Button variant="link" onClick={() => go('shop')}>View all</Button>
      </div>
      <div className="hm-rail" role="list">
        {loading ? [0, 1, 2, 3].map(i => <div role="listitem" key={i}><Skeleton variant="card" /></div>) : products.map(p => <div role="listitem" key={p.id}><ProductCard {...p} {...wish(p)} onClick={() => open(p)} /></div>)}
      </div>
    </section>
  );
}

function HmManifesto() {
  const c = window.GOT_HOME;
  return (
    <section className="hm-sec hm-man hm-rule" aria-label="Manifesto">
      <div className="hm-wrap">
        <p className="hm-man__lines">{c.manifesto.map(l => <span key={l}>{l === 'different' ? <mark className="hm-mark">{l}</mark> : l}</span>)}</p>
        <div className="hm-man__foot">
          <Mark id="home-manifesto-mark" className="hm-man__mark" />
          <span className="got-eyebrow">GØT / Manifesto</span>
          <ul className="hm-man__list">{c.manifestoSupport.map((l, i) => <li key={l}><span>0{i + 1}</span><span>{l}</span></li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function HmSpotlight({ product: p, addToCart, open, wish }) {
  const { Badge, Price, ColorSelector, SizeSelector, Button, IconButton } = HS();
  const [color, setColor] = React.useState(p ? p.colors[0].name : null);
  const [size, setSize] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  if (!p) return null;
  const w = wish(p);
  const add = () => {
    if (!size) { setErr('Select a size to continue.'); return; }
    setBusy(true);
    setTimeout(() => { setBusy(false); addToCart({ id: p.id + color + size, image: p.image, name: p.name, variant: color + ' / ' + size, price: p.price, qty: 1, max: p.inventoryVerified ? Math.min(10, p.stock) : 10 }); }, 500);
  };
  return (
    <section className="hm-sec hm-wrap hm-rule" aria-labelledby="hm-spot-t">
      <div className="hm-spot">
        <div className="hm-spot__media">
          <div className="hm-slot"><img src={p.image} alt={p.name + ', ' + color} /></div>
          <div className="hm-slot"><img src={p.altImage} alt="" loading="lazy" /></div>
        </div>
        <div className="hm-spot__info">
          <span className="got-eyebrow">Spotlight</span>
          <div style={{ display: 'flex', gap: 8 }}>{p.badge && <Badge tone="new">{p.badge}</Badge>}<Badge tone="drop">Drop 01</Badge></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
            <h2 id="hm-spot-t" className="got-h2" style={{ textTransform: 'uppercase' }}>{p.name}</h2>
            <IconButton className="got-iconbtn--wish" icon="heart" variant="outline" label={w.wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={w.wishlisted} onClick={w.onWishlist} style={w.wishlisted ? { background: 'var(--got-cta-bg)', color: 'var(--got-cta-text)' } : undefined} />
          </div>
          <Price amount={p.price} />
          <ColorSelector colors={p.colors} value={color} onChange={setColor} />
          <SizeSelector sizes={p.sizes} value={size} onChange={s => { setSize(s); setErr(null); }} error={err} />
          <Button size="lg" fullWidth loading={busy} disabled={p.soldOut} onClick={add}>Add to cart</Button>
          <Button variant="link" onClick={() => open(p)}>View full details</Button>
        </div>
      </div>
    </section>
  );
}

function HmPackaging() {
  const items = window.GOT_HOME.packaging;
  if (!items || !items.length) return null;
  return (
    <section className="hm-sec hm-pack" aria-labelledby="hm-pack-t" data-theme="dark">
      <div className="hm-wrap">
        <div className="hm-head"><div><span className="got-eyebrow">The unboxing</span><h2 id="hm-pack-t" className="got-h1" style={{ color: 'var(--got-white)' }}>More than<br />just a hoodie</h2></div></div>
        <div className="hm-pack__grid">
          {items.map(i => (
            <figure key={i.id} className="hm-pack__item" style={{ margin: 0 }}>
              <div className="hm-slot"><image-slot id={'home-' + i.id} shape="rect" placeholder={'Packaging — ' + i.note.toLowerCase()} {...window.GOT_SLOT(i.id, 800, 1000)}></image-slot></div>
              <figcaption className="hm-pack__cap"><p>{i.caption}</p><span>{i.note}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function HmStory() {
  const s = window.GOT_HOME.story;
  return (
    <section className="hm-sec hm-wrap hm-rule" aria-labelledby="hm-story-t">
      <div className="hm-story">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div><span className="got-eyebrow">The brand</span><h2 id="hm-story-t" className="got-h1" style={{ marginTop: 12 }}>Born to be different</h2></div>
          <dl className="hm-story__facts" style={{ margin: 0 }}>{s.facts.map(([k, v]) => <div key={k}><dt className="got-eyebrow">{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
        <div className="hm-story__img hm-slot"><image-slot id="home-story" shape="rect" placeholder="Brand / Alexandria editorial photo" {...window.GOT_SLOT('story', 1200, 960)}></image-slot></div>
      </div>
    </section>
  );
}

function HmSocial() {
  const { Icon } = HS();
  const s = window.GOT_HOME.social;
  return (
    <section className="hm-sec hm-wrap hm-rule" aria-labelledby="hm-soc-t">
      <div className="hm-soc">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div><span className="got-eyebrow">Community</span><h2 id="hm-soc-t" className="got-h2" style={{ textTransform: 'uppercase', marginTop: 12 }}>Follow the drop</h2></div>
          <div className="hm-soc__links">{s.map(l => <a key={l.label} className="hm-soc__link" href={l.href} target="_blank" rel="noopener"><span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><strong>{l.label}</strong><span>{l.handle}</span></span><Icon name="arrow-up-right" size={24} /></a>)}</div>
        </div>
        <div className="hm-soc__grid" aria-label="Latest posts">{[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="hm-slot"><image-slot id={'home-post-' + n} shape="rect" placeholder={'Post ' + n} {...window.GOT_SLOT('post' + n, 500, 500)}></image-slot></div>)}</div>
      </div>
    </section>
  );
}

function HmEarly() {
  const { EarlyAccessForm } = HS();
  return (
    <section className="hm-sec hm-lime" data-theme="light" aria-labelledby="hm-ea-t">
      <div className="hm-wrap"><div className="hm-ea">
        <div><span className="got-eyebrow">Next drop</span><h2 id="hm-ea-t" className="got-display" style={{ marginTop: 12, fontSize: 'clamp(2.75rem,8vw,6.5rem)' }}>Hear about<br />it first</h2><p className="got-body" style={{ margin: '16px 0 0' }}>Get an email when Drop 01 updates are available.</p></div>
        <EarlyAccessForm cta="Get early access" />
      </div></div>
    </section>
  );
}

function HmFaq({ showSlots }) {
  const { Accordion, Button } = HS();
  const items = window.GOT_HOME.faq.filter(f => f.content || showSlots).map(f => ({ title: f.title, content: f.content || <span style={{ color: 'var(--color-warning)' }}>Hidden until the approved Return &amp; Exchange policy is published.</span> }));
  if (!items.length) return null;
  return (
    <section className="hm-sec hm-wrap hm-rule" aria-labelledby="hm-faq-t">
      <div className="hm-faq">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}><span className="got-eyebrow">Shopping info</span><h2 id="hm-faq-t" className="got-h2" style={{ textTransform: 'uppercase' }}>Before you order</h2><Button variant="link">All FAQs</Button></div>
        <Accordion items={items} defaultOpen={0} />
      </div>
    </section>
  );
}

Object.assign(window, { CmsSlot, HmHero, HmDrop, HmCategories, HmArrivals, HmManifesto, HmSpotlight, HmPackaging, HmStory, HmSocial, HmEarly, HmFaq });
