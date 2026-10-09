/**
 * Minimal store header: nav left, typeset wordmark centred, utility icons right, 1px baseline rule.
 * @startingPoint section="Navigation" subtitle="Store, minimal (Coming Soon) and checkout headers" viewport="1200x320"
 */
export interface NavItem { label: string; href?: string; current?: boolean; }
export interface HeaderProps {
  nav?: NavItem[];
  cartCount?: number;
  theme?: 'dark' | 'light';
  onToggleTheme?: (next: 'dark' | 'light') => void;
  onCart?: () => void;
  onSearch?: () => void;
  onAccount?: () => void;
  onMenu?: () => void;
  onLogo?: () => void;
  onNav?: (item: NavItem) => void;
  /** store: full · minimal: Coming Soon (logo + toggle + optional left slot) · checkout: secure-order context, no nav */
  mode?: 'store' | 'minimal' | 'checkout';
  /** auto uses the 1024px breakpoint; force mobile/desktop in fixed-width mocks */
  layout?: 'auto' | 'mobile' | 'desktop';
  sticky?: boolean;
  /** unique saved products; badge hidden at 0 */
  wishCount?: number;
  onWishlist?: () => void;
  /** reduced height (56px) after scroll; footprint is preserved so content never jumps */
  compact?: boolean;
  /** left slot for minimal mode (e.g. social links) */
  right?: React.ReactNode;
}
export declare function Header(props: HeaderProps): JSX.Element;
