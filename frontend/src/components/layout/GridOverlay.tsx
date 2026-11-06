/** Developer overlay of the 12-column grid. Toggled with the "G" key. */
export function GridOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] lg:pl-14" aria-hidden="true">
      <div className="wrap grid h-full grid-cols-12 gap-x-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-full bg-accent/10 outline outline-accent/25">
            <span className="label block pt-16 text-center text-accent">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
