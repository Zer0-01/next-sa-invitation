type SectionSeparatorProps = {
  className?: string;
};

export default function SectionSeparator({
  className = "",
}: Readonly<SectionSeparatorProps>) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex items-center justify-center px-6 py-3 ${className}`.trim()}
    >
      <div className="flex w-full max-w-[18rem] items-center justify-center gap-3 text-primary/40">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/18 to-primary/35" />
        <span className="relative flex h-6 w-12 items-center justify-center">
          <span className="absolute h-2.5 w-2.5 rotate-45 rounded-[0.2rem] border border-primary/30 bg-background/70 shadow-[0_2px_8px_rgba(50,61,0,0.05)]" />
          <span className="absolute -left-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-primary/18 bg-gold/45" />
          <span className="absolute -right-0.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-primary/18 bg-gold/45" />
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/18 to-primary/35" />
      </div>
    </div>
  );
}
