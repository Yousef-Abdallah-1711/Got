function ComingSoon({ theme, setTheme, go }) {
  const { Header, EarlyAccessForm, Footer, Icon } = window.GTDesignSystem_f9e073;
  const social = <span style={{ display: 'flex', gap: 4 }}>
    <a className="got-header__link" href="https://www.instagram.com/got.official1/" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
    <a className="got-header__link" href="https://www.tiktok.com/@got.offical" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>TikTok</a>
  </span>;
  return (
    <div>
      <Header mode="minimal" theme={theme} onToggleTheme={setTheme} right={social} onLogo={() => go('home')} />
      <section style={{ minHeight: 'calc(100vh - 80px)', display: 'grid', placeItems: 'center', padding: '64px var(--gutter)', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, maxWidth: 1100 }}>
          <div style={{ width: 120, height: 160, position: 'relative', border: '1px dashed var(--got-border-strong)' }}><span className="got-ph" style={{ background: 'transparent', fontSize: 9, padding: 8 }}>Sword mark — vector master</span></div>
          <span className="got-eyebrow">EST. 2026 / Alexandria, Egypt</span>
          <h1 className="got-display">Forged to be different</h1>
          <p className="got-eyebrow" style={{ color: 'var(--got-text)', fontSize: 14, margin: 0 }}>Drop 01 — Coming soon</p>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: 'left' }}><EarlyAccessForm /></div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid var(--got-border)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', minHeight: 520 }}>
        <div style={{ position: 'relative', background: 'var(--got-surface-2)' }}><image-slot id="coming-pack" shape="rect" placeholder="Packaging detail" {...window.GOT_SLOT('pack', 1000, 1100)} style={{ position: 'absolute', inset: 0 }}></image-slot></div>
        <div style={{ padding: '96px var(--gutter)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
          <span className="got-eyebrow">Drop 01</span>
          <h2 className="got-h1">More than just a hoodie</h2>
          <p className="got-body" style={{ color: 'var(--got-text-muted)', margin: 0 }}>Get an email when Drop 01 updates are available.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
window.ComingSoon = ComingSoon;
