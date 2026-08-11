export function RouteFallback() {
  return (
    <main aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading portfolio scene</span>
    </main>
  );
}
