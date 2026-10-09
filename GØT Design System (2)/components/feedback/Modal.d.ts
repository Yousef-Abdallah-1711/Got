/** Minimal dialog: strong uppercase title, close affordance, Escape + scrim click to close. */
export interface ModalProps {
  open?: boolean;
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** position within nearest positioned ancestor instead of viewport (docs/previews) */
  contained?: boolean;
}
export declare function Modal(props: ModalProps): JSX.Element | null;
