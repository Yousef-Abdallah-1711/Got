import type { IconName } from './Icon';
/** 44×44 icon-only control with required accessible label and optional count bubble. */
export interface IconButtonProps {
  icon: IconName;
  /** required accessible name */
  label: string;
  /** e.g. cart quantity; announced in the label */
  count?: number;
  variant?: 'plain' | 'outline';
  size?: number;
  disabled?: boolean;
  onClick?: (e: any) => void;
  className?: string;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
