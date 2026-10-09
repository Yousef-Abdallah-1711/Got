/** Totals list: subtotal, discount, shipping, total in mono EGP. */
export interface OrderSummaryProps {
  subtotal?: number;
  /** undefined = "Calculated at checkout"; 0 = Free */
  shipping?: number;
  discount?: number;
  /** override computed total */
  total?: number;
  /** e.g. "Pay cash on delivery." */
  note?: string;
}
export declare function OrderSummary(props: OrderSummaryProps): JSX.Element;
