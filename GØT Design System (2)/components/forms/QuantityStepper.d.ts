/** −/+ stepper with numeric readout; clamps to min..max (max = min(10, stock)). */
export interface QuantityStepperProps {
  value?: number;
  min?: number;
  /** pass Math.min(10, stock) */
  max?: number;
  onChange?: (v: number) => void;
  size?: 'sm' | 'md';
  label?: string;
}
export declare function QuantityStepper(props: QuantityStepperProps): JSX.Element;
