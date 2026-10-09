/**
 * Catalog card: 4:5 image, quiet info row with name + mono price, NEW / SOLD OUT badge. Optional wishlist heart (always visible, never hover-only).
 * @startingPoint section="Commerce" subtitle="4:5 product card with new, sale and sold-out states" viewport="700x420"
 */
export interface ProductCardProps {
  name: string;
  /** EGP */
  price: number;
  compareAt?: number;
  /** real merchandise photo URL; omitted renders a hatched 4:5 placeholder */
  image?: string;
  /** shown on hover only if supplied */
  altImage?: string;
  /** e.g. "Black · 2 colours" */
  meta?: string;
  /** "New" renders solid; anything else outline */
  badge?: string;
  soldOut?: boolean;
  onClick?: () => void;
  href?: string;
  /** Shared wishlist state — heart renders when a guest or authenticated wishlist handler is supplied. */
  /** colour options; swatches render when more than one */
  colors?: Array<{ name: string; hex: string }>;
  /** prioritised promotion badges [{tone,label,icon?}] from the promotion layer; max two render */
  badges?: Array<{ tone: string; label: string; icon?: string }>;
  wishlisted?: boolean;
  onWishlist?: () => void;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;
