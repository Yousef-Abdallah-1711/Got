import React from 'react';
export function Skeleton({ variant = 'block', width, height, lines = 3, style }) {
  if (variant === 'text') return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: 8, width: width || '100%', ...style }} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => <span key={i} className="got-skel" style={{ height: 12, width: i === lines - 1 ? '60%' : '100%' }}></span>)}
    </span>
  );
  if (variant === 'card') return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: 12, width: width || '100%', ...style }} aria-hidden="true">
      <span className="got-skel" style={{ aspectRatio: '4/5' }}></span>
      <span style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span className="got-skel" style={{ height: 12, width: '55%' }}></span><span className="got-skel" style={{ height: 12, width: '22%' }}></span></span>
      <span className="got-skel" style={{ height: 12, width: '35%' }}></span>
    </span>
  );
  return <span className="got-skel" style={{ width: width || '100%', height: height || 16, ...style }} aria-hidden="true"></span>;
}
