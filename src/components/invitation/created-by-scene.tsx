export function CreatedByScene() {
  return (
    <footer
      aria-label="Website credit"
      className="border-t border-primary/8 bg-[#edf1e7] px-5 py-7 text-center sm:px-7 sm:py-8 lg:px-10"
    >
      <p className="font-spartan text-[0.72rem] uppercase tracking-[0.2em] text-primary/48">
        Crafted by{" "}
        <a
          href="https://lakarsoft.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/72 underline decoration-primary/20 underline-offset-4 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          LakarSoft
        </a>
      </p>
    </footer>
  );
}
