import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Price } from './Price.jsx';
export function ProductCard({ name, price, compareAt, image, altImage, meta, badge, soldOut, onClick, href = '#', wishlisted, onWishlist, colors, badges }) {
  return (
    <div className={'got-pcard' + (soldOut ? ' got-pcard--soldout' : '')}>
      <a href={href} className="got-pcard__link" onClick={e => { if (onClick) { e.preventDefault(); onClick(); } }}>
        <div className="got-pcard__media">
          {image ? <img src={image} alt={name} loading="lazy" /> : <span className="got-ph">Product image · 4:5</span>}
          {image && altImage && <img className="got-pcard__alt" src={altImage} alt="" loading="lazy" />}
          <div className="got-pcard__badges">
            {badges && badges.length ? badges.slice(0, 2).map(b => <Badge key={b.label} tone={b.tone} icon={b.icon}>{b.label}</Badge>) : soldOut ? <Badge tone="soldout">Sold out</Badge> : badge && <Badge tone={badge === 'New' ? 'new' : 'outline'}>{badge}</Badge>}
          </div>
        </div>
        <div className="got-pcard__info">
          <div style={{ minWidth: 0 }}>
            <p className="got-pcard__name">{name}</p>
            {meta && <p className="got-pcard__meta">{meta}</p>}
            {colors && colors.length > 1 && <div className="got-pcard__sw" aria-label={colors.length + ' colours'} role="img">{colors.map(c => <i key={c.name} style={{ background: c.hex }} title={c.name}></i>)}</div>}
          </div>
          <Price amount={price} compareAt={compareAt} />
        </div>
      </a>
      {onWishlist && <IconButton className={'got-pcard__wish' + (wishlisted ? ' is-on' : '')} icon="heart" size={18} label={(wishlisted ? 'Remove ' : 'Add ') + name + (wishlisted ? ' from wishlist' : ' to wishlist')} aria-pressed={!!wishlisted} onClick={onWishlist} />}
    </div>
  );
}
