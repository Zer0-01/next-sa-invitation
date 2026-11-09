import type { CSSProperties } from "react";
import SectionSeparator from "@/components/section-separator";
import { AnMonogram } from "@/components/invitation/an-monogram";
import { FooterActions } from "@/components/invitation/footer-actions";
import { PaintedDecoration } from "@/components/invitation/painted-decoration";
import { invitationContent } from "@/lib/invitation-content";

const WEDDING_DOA_SRC = "/ustad/barakallah.png";

// The traditional doa for a newly married couple, as written in the calligraphy.
const WEDDING_DOA_ARABIC = "بَارَكَ اللهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ";
const WEDDING_DOA_MEANING =
  "Semoga Allah memberkati kamu berdua, melimpahkan keberkatan ke atas kamu berdua, dan menghimpunkan kamu berdua dalam kebaikan.";

/**
 * Uses the calligraphy PNG as a mask so it takes the ink token's colour, like
 * the monogram. `cover` trims the empty space around the artwork.
 */
const weddingDoaMaskStyle: CSSProperties = {
  maskImage: `url(${WEDDING_DOA_SRC})`,
  WebkitMaskImage: `url(${WEDDING_DOA_SRC})`,
  maskSize: "cover",
  WebkitMaskSize: "cover",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

const CREDIT = { name: "Keyplee", url: "https://keyplee.com" } as const;

export function CreatedByScene() {
  const { groom, bride } = invitationContent.couple;
  const { event } = invitationContent;

  return (
    <footer
      aria-label="Penutup undangan dan kredit laman web"
      className="relative isolate overflow-hidden bg-[#edf1e7] px-5 pb-28 pt-7 text-center sm:px-7 sm:pb-32 sm:pt-8 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-multiply"
      />
      {/* Painted wildflowers rising from the bottom corners, so the page ends gently */}
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-corner.png"
        sizes="(min-width: 768px) 240px, 56vw"
        parallaxDistance={18}
        className="-bottom-10 -left-12 -z-10 size-56 sm:size-64"
        imageClassName="-scale-y-100 opacity-70"
      />
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-corner.png"
        sizes="(min-width: 768px) 240px, 56vw"
        parallaxDistance={18}
        className="-bottom-10 -right-12 -z-10 size-56 sm:size-64"
        imageClassName="rotate-180 opacity-70"
      />

      <SectionSeparator className="px-0 py-0" />

      <figure className="mx-auto mt-8 max-w-sm">
        <blockquote>
          <div
            role="img"
            lang="ar"
            aria-label={WEDDING_DOA_ARABIC}
            className="aspect-[32/5] w-full bg-ink opacity-90"
            style={weddingDoaMaskStyle}
          />
        </blockquote>
        <figcaption className="mt-3 font-spartan text-[0.9rem] leading-6 italic text-primary/58">
          {WEDDING_DOA_MEANING}
        </figcaption>
      </figure>

      <div className="mx-auto mt-10 flex max-w-sm flex-col items-center">
        <AnMonogram
          label={`Monogram ${groom.shortName} dan ${bride.shortName}`}
          className="h-20 w-30 opacity-90"
        />
        <p className="mt-4 font-spartan text-[0.82rem] uppercase tracking-[0.22em] text-primary/62">
          {event.compactDate} · {event.venueName}, {event.venueArea}
        </p>
        <p className="mt-2 font-spartan text-[0.88rem] tracking-[0.08em] text-primary/72">
          {invitationContent.weddingHashtag}
        </p>
        <p className="mt-4 font-spartan text-[0.98rem] leading-7 text-primary/66">
          Terima kasih kerana meraikan hari bahagia ini bersama kami.
        </p>
      </div>

      <div className="mt-8">
        <FooterActions />
      </div>

      <p className="mt-8 font-spartan text-[0.72rem] tracking-[0.06em] text-primary/42">
        Direka oleh{" "}
        <a
          href={CREDIT.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Lawati laman web ${CREDIT.name}, dibuka dalam tab baharu`}
          className="rounded-sm text-primary/58 underline decoration-primary/20 underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          {CREDIT.name}
        </a>
      </p>
    </footer>
  );
}
