import React from 'react';
// Typeset placeholder. The real GØT sword monogram must come from the owner-approved vector master — never redraw it.
export function Wordmark({ size = 24, href, className = '', style }) {
  const s = { fontSize: size, ...style };
  const txt = <><span aria-hidden="true">GØT</span><span className="got-sr">GOT</span></>;
  return href ? <a href={href} className={'got-wordmark ' + className} style={s}>{txt}</a> : <span className={'got-wordmark ' + className} style={s}>{txt}</span>;
}
