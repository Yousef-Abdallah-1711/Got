/** Brand manifesto + link columns + policies; cookie settings always reachable. */
export interface FooterLink { label: string; href?: string; }
export interface FooterColumn { h: string; items: Array<string | FooterLink>; }
export interface FooterProps {
  columns?: FooterColumn[];
  /** approved line only — default "Forged to be different." */
  manifesto?: string;
  onCookieSettings?: () => void;
  onLink?: (label: string) => void;
}
export declare function Footer(props: FooterProps): JSX.Element;
