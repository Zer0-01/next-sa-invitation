import { ExternalLink } from "lucide-react";
import SectionSeparator from "@/components/section-separator";
import { invitationContent } from "@/lib/invitation-content";

export function CreatedByScene() {
  return (
    <footer
      aria-label="Penutup undangan dan kredit laman web"
      className="bg-[#edf1e7] px-5 pb-10 pt-7 text-center sm:px-7 sm:pb-12 sm:pt-8 lg:px-10"
    >
      <SectionSeparator className="px-0 py-0" />

      <div className="mx-auto mt-7 max-w-sm">
        <p className="font-cinzel-decorative text-[1.35rem] leading-tight tracking-[0.04em] text-primary sm:text-[1.5rem]">
          Danial & Ain
        </p>
        <p className="mt-3 font-spartan text-[0.88rem] tracking-[0.08em] text-primary/72">
          {invitationContent.weddingHashtag}
        </p>
        <p className="mt-3 font-spartan text-[0.98rem] leading-7 text-primary/66">
          Terima kasih kerana meraikan hari bahagia ini bersama kami.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-sm flex-col items-center">
        <p className="font-spartan text-[0.68rem] uppercase tracking-[0.2em] text-primary/44">
          Direka dengan penuh kasih oleh
        </p>
        <a
          href="https://lakarsoft.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lawati laman web LakarSoft, dibuka dalam tab baharu"
          className="mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 font-spartan text-[0.8rem] uppercase tracking-[0.18em] text-primary/68 transition-colors hover:bg-white/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          LakarSoft
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
