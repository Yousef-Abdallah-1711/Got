import type { IconName } from './Icon';
/**
 * Rectangular uppercase action. Primary = solid inverse; hover inverts to outline.
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost & link CTAs with all states" viewport="700x360"
 */
export interface ButtonProps {
  /** primary: solid inverse (one per view). secondary: 1px outline. ghost: no border. link: underlined text */
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  /** sm 44px · md 48px · lg 56px */
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  /** shows spinner, sets aria-busy, ignores clicks */
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** trailing arrow that nudges on hover — secondary/editorial CTAs */
  arrow?: boolean;
  /** renders an <a> */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  className?: string;
}
export declare function Button(props: ButtonProps): JSX.Element;
