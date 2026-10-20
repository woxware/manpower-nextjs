/** Static brand assets under `public/images/branding/`. */
const appIcon = "/images/branding/icon.png";

export const branding = {
  /** App icon — favicon, Apple touch, OG / Twitter card fallback. */
  appIcon,
  /** Sidebar / auth mark — same asset as favicon for one consistent icon. */
  mark: appIcon,
  /**
   * The wordmark is type, not an image: see `Wordmark` in
   * `components/shared/brand-lockup.tsx` ("ManpowerHub" in the display face,
   * coloured by `var(--fg)` so one node serves both themes).
   */
} as const;
