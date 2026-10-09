function Shop({ openProduct, initialTab = 'All', wish = () => ({}) }) {
  const { FilterBar, ProductCard, Skeleton, Button, Modal, Checkbox } = window.GTDesignSystem_f9e073;
  const [tab, setTab] = React.useState(initialTab);
  const [sort, setSort] = React.useState('Newest');
  const [loading, setLoading] = React.useState(false);
  const [inStock, setInStock] = React.useState(false);
  const [panel, setPanel] = React.useState(false);
  const pick = t => { setTab(t); setLoading(true); setTimeout(() => setLoading(false), 450); };
  let list = window.GOT_PRODUCTS.filter(p => (tab === 'All' || p.cat === tab) && (!inStock || !p.soldOut));
  if (sort === 'Price: low to high') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'Price: high to low') list = [...list].sort((a, b) => b.price - a.price);
  const few = list.length <= 2;
  const gridStyle = few ? { gridTemplateColumns: 'repeat(2,minmax(0,1fr))', maxWidth: 820 } : { gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%/2 - 8px,240px),1fr))' };
  const scoped = tab !== 'All' || inStock;
  return (
    <main style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '64px var(--gutter) 96px' }}>
      <span className="got-eyebrow" style={{ color: 'var(--accent-ink)' }}>Collection 01</span>
      <h1 className="got-h1" style={{ margin: '12px 0 40px' }}>Drop 01</h1>
      <FilterBar tabs={['All', 'Hoodies', 'Accessories']} active={tab} onTab={pick} count={list.length} sort={sort} onSort={setSort} filterCount={inStock ? 1 : 0} onFilters={() => setPanel(true)} />
      {list.length === 0 && !loading ? (
        <div style={{ padding: '96px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <p className="got-h3" style={{ textTransform: 'uppercase' }}>{inStock ? 'No products match these filters' : 'No products in this collection yet'}</p>
          <p className="got-small" style={{ margin: 0 }}>{inStock ? 'Try removing a filter.' : 'Check the full drop instead.'}</p>
          <Button variant="secondary" onClick={() => { setInStock(false); pick('All'); }}>{inStock ? 'Clear all filters' : 'View all products'}</Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '48px 16px', marginTop: 32, ...gridStyle }}>
          {loading ? [0, 1, 2, 3].map(i => <Skeleton key={i} variant="card" />) : list.map(p => <ProductCard key={p.id} {...p} {...wish(p)} onClick={() => openProduct(p)} />)}
        </div>
      )}
      <Modal open={panel} title="Filter" onClose={() => setPanel(false)} footer={<><Button variant="ghost" size="sm" onClick={() => setInStock(false)}>Clear all</Button><Button size="sm" onClick={() => setPanel(false)}>Show {list.length} {list.length === 1 ? 'product' : 'products'}</Button></>}>
        <Checkbox label="In stock only" checked={inStock} onChange={e => setInStock(e.target.checked)} />
      </Modal>
    </main>
  );
}
window.Shop = Shop;
