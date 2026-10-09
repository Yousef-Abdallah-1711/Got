import React from 'react';
import { Wordmark } from '../core/Wordmark.jsx';
const COLS = [
  { h: 'Shop', items: ['Drop 01', 'All products', 'Size guide'] },
  { h: 'Help', items: ['Shipping', 'Returns & exchange', 'FAQ', 'Contact'] },
  { h: 'Follow', items: [{ label: 'Instagram — @got.official1', href: 'https://www.instagram.com/got.official1/' }, { label: 'TikTok — @got.offical', href: 'https://www.tiktok.com/@got.offical' }, { label: 'gotoffical1@gmail.com', href: 'mailto:gotoffical1@gmail.com' }] },
];
export function Footer({ columns = COLS, manifesto = 'Forged to be different.', onCookieSettings, onLink }) {
  return (
    <footer className="got-footer">
      <div className="got-footer__in">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Wordmark size={40} />
          <p className="got-h2" style={{ textTransform: 'uppercase', maxWidth: '12ch' }}>{manifesto}</p>
        </div>
        {columns.map(c => (
          <div key={c.h}>
            <h2 className="got-footer__h">{c.h}</h2>
            <ul className="got-footer__list">
              {c.items.map(i => { const o = typeof i === 'string' ? { label: i } : i; return <li key={o.label}><a href={o.href || '#'} onClick={e => { if (!o.href && onLink) { e.preventDefault(); onLink(o.label); } }}>{o.label}</a></li>; })}
            </ul>
          </div>
        ))}
      </div>
      <div className="got-footer__base">
        <span>© 2026 GØT · Alexandria, Egypt</span>
        <span style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}><a href="#">Privacy</a><a href="#">Terms</a><a href="#" onClick={e => { e.preventDefault(); onCookieSettings && onCookieSettings(); }}>Cookie settings</a></span>
      </div>
    </footer>
  );
}
