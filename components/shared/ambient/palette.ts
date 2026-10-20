/** Module palette shared by the onboarding-complete loader, auth, and onboarding. */
export const AMBIENT_COLORS = {
  blue: "#10B981", // ManpowerHub brand emerald
  violet: "#6366F1", // indigo — matches the marketing site
  teal: "#0EA5E9", // sky — finance / invoicing
  amber: "#F59E0B", // amber — dashboard / tasks
  rose: "#EF4444", // red — celebrate
} as const;

export const AMBIENT_PALETTE: readonly string[] = [
  AMBIENT_COLORS.blue,
  AMBIENT_COLORS.violet,
  AMBIENT_COLORS.teal,
  AMBIENT_COLORS.amber,
  AMBIENT_COLORS.rose,
];

export const GRADIENT_STOPS: readonly [string, string, string] = [
  AMBIENT_COLORS.blue,
  AMBIENT_COLORS.violet,
  AMBIENT_COLORS.teal,
];
