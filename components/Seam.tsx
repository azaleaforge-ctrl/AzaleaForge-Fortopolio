/** Molten seam divider with a glowing ember node. */
export function Seam({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-px w-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-azalea/70 to-ember/70" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_14px_3px_rgba(255,138,61,0.7)]" />
    </div>
  );
}
