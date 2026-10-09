/**
 * Labelled text input — label above, 52px field, message below wired via aria-describedby.
 * @startingPoint section="Forms" subtitle="Inputs with default, focus, invalid, success, disabled" viewport="700x420"
 */
export interface TextFieldProps {
  label?: string;
  /** visually hide the label (still announced) */
  hideLabel?: boolean;
  /** helper text below the field */
  hint?: string;
  /** error message; sets aria-invalid and red border + icon */
  error?: string;
  /** success message; green border + check */
  success?: string;
  optional?: boolean;
  /** renders a textarea */
  multiline?: boolean;
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
