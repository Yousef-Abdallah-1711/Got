export type IconName = 'shopping-bag' | 'search' | 'user' | 'sun' | 'moon' | 'menu' | 'x' | 'plus' | 'minus' | 'arrow-right' | 'arrow-left' | 'arrow-up-right' | 'chevron-down' | 'chevron-right' | 'chevron-left' | 'check' | 'heart' | 'instagram' | 'circle-alert' | 'circle-check' | 'truck' | 'lock' | 'trash-2' | 'loader-circle' | 'mail' | 'sliders-horizontal' | 'ruler' | 'info' | 'package' | 'phone' | 'map-pin' | 'zoom-in';
/** Stroke icon from the bundled Lucide subset. Decorative unless `label` is given. */
export interface IconProps {
  name: IconName;
  /** px, default 20 */
  size?: number;
  /** default 1.5 — GØT uses thin, square-capped strokes */
  strokeWidth?: number;
  /** accessible name; omit for decorative icons */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element | null;
