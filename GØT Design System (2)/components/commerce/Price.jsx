import React from 'react';
export const formatEGP = n => 'EGP ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
export function Price({ amount, compareAt, className = '' }) {
  return (
    <span className={'got-price ' + className}>
      {compareAt > amount && <s><span className="got-sr">Was </span>{formatEGP(compareAt)}</s>}
      {compareAt > amount && <span className="got-sr">Now </span>}
      {formatEGP(amount)}
    </span>
  );
}
