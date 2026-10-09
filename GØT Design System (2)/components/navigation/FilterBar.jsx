import React from 'react';
import { Select } from '../forms/Select.jsx';
import { Button } from '../core/Button.jsx';
export function FilterBar({ tabs = [], active, onTab, count, sort = 'Newest', sortOptions = ['Newest', 'Price: low to high', 'Price: high to low'], onSort, filterCount = 0, onFilters }) {
  return (
    <div className="got-fbar">
      <div className="got-tabs" role="tablist" aria-label="Categories">
        {tabs.map(t => <button key={t} role="tab" className="got-tab" aria-selected={t === active} onClick={() => onTab && onTab(t)}>{t}</button>)}
      </div>
      <div className="got-fbar__right">
        {count != null && <span className="got-fbar__count">{count} {count === 1 ? 'product' : 'products'}</span>}
        <Button variant="ghost" size="sm" iconLeft="sliders-horizontal" onClick={onFilters}>{'Filter' + (filterCount ? ' (' + filterCount + ')' : '')}</Button>
        <Select label="Sort by" hideLabel options={sortOptions} value={sort} onChange={e => onSort && onSort(e.target.value)} style={{ minHeight: 44, fontSize: 14, width: 'auto' }} />
      </div>
    </div>
  );
}
