/** Low-contrast stable-geometry loading placeholder; shimmer disabled under reduced motion. */
export interface SkeletonProps {
  /** block: one bar · text: N lines · card: 4:5 product card */
  variant?: 'block' | 'text' | 'card';
  width?: number | string;
  height?: number | string;
  lines?: number;
  style?: React.CSSProperties;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
