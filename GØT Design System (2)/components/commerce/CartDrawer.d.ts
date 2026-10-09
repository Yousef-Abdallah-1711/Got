/**
 * Right-edge mini-cart panel: lines, subtotal, Checkout; empty state with return-to-shop.
 * @startingPoint section="Commerce" subtitle="Mini cart drawer with items, totals and empty state" viewport="700x560"
 */
export interface CartItem { id: string; name: string; variant?: string; price: number; qty: number; max?: number; image?: string; warning?: string; }
export interface CartDrawerProps {
  open?: boolean;
  items?: CartItem[];
  onClose?: () => void;
  onQty?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
  onViewCart?: () => void;
  /** empty-state CTA */
  onShop?: () => void;
  /** position inside nearest positioned ancestor (previews) */
  contained?: boolean;
}
export declare function CartDrawer(props: CartDrawerProps): JSX.Element | null;
