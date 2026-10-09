function Wishlist({ ids, products, wish, go, openProduct, addToCart, clear, remove }) {
  const { ProductCard, Button, Icon, Modal, Notice } = window.GTDesignSystem_f9e073;
  const [confirm, setConfirm] = React.useState(false);
  const [busy, setBusy] = React.useState(null);
  const items = ids.map(id => ({ id, p: products.find(x => x.id === id) }));
  const add = p => {
    const commerce = p.commerce && p.commerce.source === 'woocommerce' ? p.commerce : null;
    const single = p.sizes.length === 1 && p.sizes[0].available !== false && p.colors.length === 1;
    if (commerce && !['in-stock', 'low-stock'].includes(commerce.availability)) return;
    if (!single) { openProduct(p); return; }
    setBusy(p.id);
    setTimeout(() => {
      setBusy(null);
      const currentPrice = commerce && Number.isFinite(commerce.price) ? commerce.price : p.price;
      const max = commerce && Number.isInteger(commerce.quantity) ? Math.max(1, Math.min(10, commerce.quantity)) : 10;
      addToCart({ id: p.id + p.colors[0].name + p.sizes[0].label, image: p.image, name: p.name, variant: p.colors[0].name + ' / ' + p.sizes[0].label, price: currentPrice, qty: 1, max });
    }, 180);
  };
  const availability = p => {
    const commerce = p && p.commerce && p.commerce.source === 'woocommerce' ? p.commerce : null;
    if (!commerce) return 'Availability not connected in this preview';
    if (commerce.availability === 'in-stock') return 'In stock';
    if (commerce.availability === 'low-stock') return commerce.stockLabel || 'Low stock';
    if (commerce.availability === 'sold-out') return 'Sold out';
    return 'Currently unavailable';
  };
  return (
    <main style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '64px var(--gutter) 96px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
        <div><span className="got-eyebrow" style={{ color: 'var(--accent-ink)' }}>{ids.length} {ids.length === 1 ? 'saved piece' : 'saved pieces'}</span><h1 className="got-h1" style={{ margin: '12px 0 8px' }}>YOUR WISHLIST</h1><p className="got-body" style={{ margin: 0, color: 'var(--got-text-muted)' }}>THE PIECES YOU SAVED</p></div>
        {ids.length > 0 && <Button variant="ghost" size="sm" iconLeft="trash-2" onClick={() => setConfirm(true)}>Clear wishlist</Button>}
      </div>
      {ids.length === 0 ? (
        <div style={{ borderBlock: '1px solid var(--got-border)', padding: '96px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <Icon name="heart" size={56} strokeWidth={1} aria-hidden="true" />
          <h2 className="got-h2" style={{ textTransform: 'uppercase', margin: 0 }}>NOTHING SAVED YET</h2>
          <p className="got-body" style={{ margin: 0, color: 'var(--got-text-muted)' }}>Find the pieces that speak to you</p>
          <Button size="lg" arrow onClick={() => go('shop')}>EXPLORE THE DROP</Button>
        </div>
      ) : (
        <div className="got-wishlist-grid">
          {items.map(({ id, p }) => p ? (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ProductCard {...p} {...wish(p)} price={p.commerce && p.commerce.source === 'woocommerce' && Number.isFinite(p.commerce.price) ? p.commerce.price : p.price} onClick={() => openProduct(p)} />
              <p className="got-small got-wishlist-availability"><span className="got-sr">Availability: </span>{availability(p)}</p>
              <div style={{ display: 'grid', gap: 8 }}>
                <Button size="sm" fullWidth variant={p.commerce && p.commerce.source === 'woocommerce' && !['in-stock', 'low-stock'].includes(p.commerce.availability) ? 'secondary' : 'primary'} disabled={!!(p.commerce && p.commerce.source === 'woocommerce' && !['in-stock', 'low-stock'].includes(p.commerce.availability))} loading={busy === p.id} onClick={() => add(p)}>{p.commerce && p.commerce.source === 'woocommerce' && p.commerce.availability === 'sold-out' ? 'Sold out' : p.sizes.length === 1 && p.colors.length === 1 ? 'Add to cart' : 'Select options'}</Button>
                <div className="got-wishlist-actions" style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><Button variant="link" size="sm" onClick={() => openProduct(p)}>View product</Button><Button variant="link" size="sm" onClick={() => remove(id)}>Remove from wishlist</Button></div>
              </div>
            </div>
          ) : (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Notice tone="warning" title="No longer available">This product was removed from the store.</Notice>
              <Button variant="link" size="sm" onClick={() => remove(id)}>Remove from wishlist</Button>
            </div>
          ))}
        </div>
      )}
      <Modal open={confirm} title="Clear wishlist?" onClose={() => setConfirm(false)} footer={<><Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>Cancel</Button><Button size="sm" onClick={() => { if (clear()) setConfirm(false); }}>Clear all</Button></>}>
        <p className="got-small" style={{ margin: 0 }}>All {ids.length} saved {ids.length === 1 ? 'product' : 'products'} will be removed.</p>
      </Modal>
    </main>
  );
}
window.Wishlist = Wishlist;
