export function captureError(
  error: Error,
  context?: Record<string, unknown>,
): void {
  // TODO: replace with Sentry.captureException when @sentry/nextjs is configured
  console.error("[ManpowerHub error]", error, context ?? {});
}
