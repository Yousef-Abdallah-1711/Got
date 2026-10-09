import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
export function Header({ nav = [], cartCount = 0, theme = 'dark', onToggleTheme, onCart, onSearch, onAccount, onMenu, onLogo, onNav, mode = 'store', layout = 'auto', sticky, compact, right, wishCount = 0, onWishlist }) {
  const desk = layout !== 'mobile', mob = layout !== 'desktop';
  const dc = layout === 'auto' ? ' got-header__desk' : '', mc = layout === 'auto' ? ' got-header__mob' : '';
  const logo = <a href="#" onClick={e => { e.preventDefault(); onLogo && onLogo(); }} style={{ textDecoration: 'none' }} aria-label="GØT home"><Wordmark size={mode === 'checkout' ? 22 : 26} /></a>;
  if (mode === 'minimal' || mode === 'checkout') return (
    <header className={'got-header' + (sticky ? ' got-header--sticky' : '') + (compact ? ' got-header--compact' : '')}>
      <div className="got-header__in">
        <div className="got-header__nav">{mode === 'checkout' ? <span className="got-eyebrow" style={{ display: 'inline-flex', gap: 6, alignItems: 'center', paddingLeft: 12 }}>Secure checkout</span> : right}</div>
        {logo}
        <div className="got-header__utils"><ThemeToggle theme={theme} onToggle={onToggleTheme} /></div>
      </div>
    </header>
  );
  return (
    <header className={'got-header' + (sticky ? ' got-header--sticky' : '') + (compact ? ' got-header--compact' : '')}>
      <div className="got-header__in">
        <div className="got-header__nav">
          {mob && <span className={mc} style={{ display: layout === 'auto' ? undefined : 'flex' }}><IconButton icon="menu" label="Open menu" onClick={onMenu} /></span>}
          {desk && <nav className={dc} aria-label="Primary" style={{ display: layout === 'auto' ? undefined : 'flex', gap: 4 }}>
            {nav.map(n => <a key={n.label} href={n.href || '#'} className="got-header__link" aria-current={n.current ? 'page' : undefined} onClick={e => { if (onNav) { e.preventDefault(); onNav(n); } }}>{n.label}</a>)}
          </nav>}
        </div>
        {logo}
        <div className="got-header__utils">
          <IconButton icon="search" label="Search" onClick={onSearch} />
          <IconButton className={'got-iconbtn--wish' + (wishCount ? ' got-wish-on' : '')} icon="heart" label="Wishlist" count={wishCount} aria-label={wishCount ? 'Wishlist, ' + wishCount + ' saved ' + (wishCount === 1 ? 'product' : 'products') : 'Wishlist'} onClick={onWishlist} />
          {desk && <span className={dc} style={{ display: layout === 'auto' ? undefined : 'flex' }}><IconButton icon="user" label="Account" onClick={onAccount} /></span>}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <IconButton icon="shopping-bag" label="Cart" count={cartCount} onClick={onCart} />
        </div>
      </div>
    </header>
  );
}
