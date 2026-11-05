"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Check, Share2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInvitationScrollContainer } from "@/hooks/use-invitation-scroll-container";
import { invitationContent } from "@/lib/invitation-content";

// How long "Pautan disalin" stays after the link is copied.
const COPIED_FEEDBACK_MS = 2500;

export function FooterActions() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollContainer } = useInvitationScrollContainer();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timer = window.setTimeout(() => setIsCopied(false), COPIED_FEEDBACK_MS);

    return () => window.clearTimeout(timer);
  }, [isCopied]);

  async function shareInvitation() {
    const { groom, bride } = invitationContent.couple;
    const shareData = {
      title: `${invitationContent.event.label} ${groom.shortName} & ${bride.shortName}`,
      text: `Jemputan ke majlis perkahwinan ${groom.shortName} & ${bride.shortName} pada ${invitationContent.event.date}.`,
      url: window.location.origin,
    };

    // Phones: the native share sheet (WhatsApp, Telegram, ...).
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        // The guest closed the share sheet: nothing to do.
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    // Desktop or unsupported browsers: copy the link instead.
    try {
      await navigator.clipboard.writeText(shareData.url);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  }

  function backToTop() {
    const behavior = shouldReduceMotion ? "auto" : "smooth";

    // Inside the desktop phone frame the frame scrolls, not the window.
    (scrollContainer ?? window).scrollTo({ top: 0, behavior });
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => void shareInvitation()}
        className="h-auto rounded-full border-primary/15 bg-white/70 px-5 py-2.5 font-spartan text-[0.8rem] uppercase tracking-[0.14em] text-primary shadow-none transition-transform duration-200 hover:bg-white active:scale-[0.97]"
      >
        {isCopied ? <Check /> : <Share2 />}
        {isCopied ? "Pautan disalin" : "Kongsi jemputan"}
      </Button>
      <p aria-live="polite" className="sr-only">
        {isCopied ? "Pautan jemputan telah disalin." : ""}
      </p>

      <button
        type="button"
        onClick={backToTop}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-spartan text-[0.78rem] tracking-[0.08em] text-primary/55 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <ArrowUp className="size-3.5" aria-hidden="true" />
        Kembali ke atas
      </button>
    </div>
  );
}
