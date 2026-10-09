/** Sun/moon toggle with dynamic accessible name. Persist to localStorage "got-theme" and set html[data-theme]. */
export interface ThemeToggleProps {
  theme?: 'dark' | 'light';
  /** receives the next theme */
  onToggle?: (next: 'dark' | 'light') => void;
  showLabel?: boolean;
}
export declare function ThemeToggle(props: ThemeToggleProps): JSX.Element;
