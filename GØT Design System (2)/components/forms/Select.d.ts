/** Native select styled as a GØT field (sort, governorate). */
export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectProps {
  label?: string;
  /** visually hide label (still read by AT) — for compact sort controls */
  hideLabel?: boolean;
  options?: Array<string | SelectOption>;
  error?: string;
  hint?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
