/** Segmented proficiency meter (10 cells). Exposes the value to assistive tech. */
export function Meter({ value, label, active = false }: { value: number; label: string; active?: boolean }) {
  const filled = Math.round(value / 10);
  return (
    <span
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={`${label} proficiency`}
      className="flex items-center gap-[3px]"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className={`h-2.5 w-[5px] rounded-[1.5px] transition-colors duration-500 ${
            i < filled ? (active ? 'bg-accent' : 'bg-ink/75') : 'bg-line-strong'
          }`}
          style={{ transitionDelay: `${i * 25}ms` }}
        />
      ))}
    </span>
  );
}
