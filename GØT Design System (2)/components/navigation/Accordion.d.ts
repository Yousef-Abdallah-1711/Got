/** Rule-separated disclosure list (PDP details/care/shipping, FAQ). Plus rotates to × when open. */
export interface AccordionItem { title: string; content: React.ReactNode; }
export interface AccordionProps {
  items?: AccordionItem[];
  /** index open on mount */
  defaultOpen?: number;
  multiple?: boolean;
}
export declare function Accordion(props: AccordionProps): JSX.Element;
