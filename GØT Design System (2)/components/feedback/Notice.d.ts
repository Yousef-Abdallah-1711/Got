/** Quiet high-contrast inline notice or toast (aria-live). Never the sole order confirmation. */
export interface NoticeProps {
  tone?: 'info' | 'success' | 'error' | 'warning';
  title?: string;
  children?: React.ReactNode;
  /** shows a close button */
  onDismiss?: () => void;
  /** floating variant with panel shadow + enter motion */
  toast?: boolean;
  /** e.g. a link Button: View cart */
  action?: React.ReactNode;
  className?: string;
}
export declare function Notice(props: NoticeProps): JSX.Element;
