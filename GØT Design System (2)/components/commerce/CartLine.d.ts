/** Cart row: 88px 4:5 thumb, name, variation, line total, stepper, remove, optional stock/price warning. */
export interface CartLineProps {
  name: string;
  /** e.g. "Black / M" */
  variant?: string;
  /** unit price EGP */
  price: number;
  qty?: number;
  /** min(10, stock) */
  max?: number;
  image?: string;
  /** server-side price/stock change message */
  warning?: string;
  onQty?: (q: number) => void;
  onRemove?: () => void;
}
export declare function CartLine(props: CartLineProps): JSX.Element;
