/** Mono EGP price, optional struck compare-at. Currency always EGP. */
export interface PriceProps {
  amount: number;
  compareAt?: number;
  className?: string;
}
export declare function Price(props: PriceProps): JSX.Element;
export declare function formatEGP(n: number): string;
