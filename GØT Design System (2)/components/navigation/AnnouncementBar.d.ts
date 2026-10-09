/** Two-layer header, layer one: accessible rotating announcement bar (lime by default). Auto-advances every 4.5s; pauses on hover/focus, via Pause button, and under reduced motion. Never announces automatic changes to screen readers. */
export interface AnnouncementMessage { text: string; /** optional destination key/href */ key?: string; href?: string; }
export interface AnnouncementBarProps {
  /** editable messages; one message renders a static bar without controls */
  messages?: AnnouncementMessage[];
  /** single-message shorthand */
  children?: React.ReactNode;
  /** lime: accent surface · dark: obsidian with lime indicator · quiet: surface colour */
  variant?: 'lime' | 'dark' | 'quiet';
  /** legacy alias for variant="quiet" */
  quiet?: boolean;
  /** ms between slides, default 4500 */
  interval?: number;
  onSelect?: (m: AnnouncementMessage) => void;
}
export declare function AnnouncementBar(props: AnnouncementBarProps): JSX.Element;
