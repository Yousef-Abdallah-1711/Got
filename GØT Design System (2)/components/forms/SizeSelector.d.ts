/** Radio-group size picker: mono labels, selected = solid inverse, unavailable = struck through. */
export interface SizeOption { label: string; available?: boolean; }
export interface SizeSelectorProps {
  sizes?: Array<string | SizeOption>;
  value?: string;
  onChange?: (size: string) => void;
  /** e.g. "Select a size to continue." */
  error?: string;
  label?: string;
  name?: string;
  /** right-aligned slot in the header row, e.g. a Size guide link */
  aside?: React.ReactNode;
}
export declare function SizeSelector(props: SizeSelectorProps): JSX.Element;
