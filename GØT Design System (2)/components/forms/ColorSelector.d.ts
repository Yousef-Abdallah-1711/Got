/** Swatch + visible colour name radio group. Never colour-only. */
export interface ColorOption { name: string; hex: string; available?: boolean; }
export interface ColorSelectorProps {
  colors?: ColorOption[];
  value?: string;
  onChange?: (name: string) => void;
  label?: string;
  name?: string;
}
export declare function ColorSelector(props: ColorSelectorProps): JSX.Element;
