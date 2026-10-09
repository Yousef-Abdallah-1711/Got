/** Square checkbox for consent and filters. */
export interface CheckboxProps {
  label: React.ReactNode;
  error?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (e: any) => void;
  className?: string;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
