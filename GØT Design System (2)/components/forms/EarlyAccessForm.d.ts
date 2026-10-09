/**
 * Coming Soon email capture: email + consent + one CTA, with loading and check-email success state.
 * @startingPoint section="Forms" subtitle="Drop 01 early-access signup with validation + success" viewport="700x260"
 */
export interface EarlyAccessFormProps {
  /** force a visual state (for docs); otherwise internal */
  state?: 'idle' | 'loading' | 'success' | 'error';
  onSubmit?: (email: string) => void;
  /** default "Get early access" */
  cta?: string;
}
export declare function EarlyAccessForm(props: EarlyAccessFormProps): JSX.Element;
