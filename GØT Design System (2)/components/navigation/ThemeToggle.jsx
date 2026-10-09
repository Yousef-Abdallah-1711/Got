import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function ThemeToggle({ theme = 'dark', onToggle, showLabel }) {
  const next = theme === 'dark' ? 'light' : 'dark';
  const btn = <IconButton key={theme} className="got-theme-anim" icon={theme === 'dark' ? 'sun' : 'moon'} label={'Switch to ' + next + ' mode'} aria-pressed={theme === 'light'} onClick={() => onToggle && onToggle(next)} />;
  if (!showLabel) return btn;
  return <span className="got-toggle">{btn}<span className="got-toggle__label" aria-hidden="true">{theme}</span></span>;
}
