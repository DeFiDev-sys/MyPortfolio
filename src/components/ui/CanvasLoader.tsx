/** A pulsing skeleton/spinner shown while lazy 3D canvases load. */
function CanvasLoader({ label = 'Loading 3D scene' }: { label?: string }): React.JSX.Element {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full w-full flex-col items-center justify-center gap-4"
    >
      <div className="relative h-16 w-16">
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-primary/40" />
        <span className="absolute inset-0 animate-pulse-glow rounded-full border-2 border-primary shadow-glow-primary" />
        <span className="absolute inset-3 rounded-full bg-gradient-to-br from-primary to-secondary blur-[2px]" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default CanvasLoader;
