"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { RsvpRecord } from "@/hooks/use-rsvp-record";
import { openInvitationGoogleCalendar } from "@/lib/calendar";
import { invitationContent } from "@/lib/invitation-content";
import { openInvitationMap } from "@/lib/venue";

interface RsvpThankYouProps {
  record: RsvpRecord;
  onSendAgain: () => void;
}

const outlineButtonClassName =
  "h-auto rounded-full border-primary/18 bg-white/70 px-5 py-2.5 font-spartan text-[0.8rem] uppercase tracking-[0.14em] text-primary shadow-none hover:bg-white";

export function RsvpThankYou({ record, onSendAgain }: RsvpThankYouProps) {
  const shouldReduceMotion = useReducedMotion();
  const firstName = record.name.split(/\s+/)[0];

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="flex flex-col items-center py-4 text-center"
      role="status"
    >
      <span className="flex size-14 items-center justify-center rounded-full border border-gold/60 bg-gold/10 text-gold">
        <Check className="size-6" strokeWidth={1.75} />
      </span>

      <p className="mt-5 font-spartan text-[1.45rem] leading-tight text-primary">
        Terima kasih, {firstName}
      </p>

      {record.isAttend ? (
        <>
          <p className="mt-3 max-w-xs font-spartan text-[1rem] leading-7 text-primary/68">
            Kehadiran anda untuk {record.pax} orang telah disahkan. Jumpa anda pada{" "}
            {invitationContent.event.date}.
          </p>
          <div className="mt-6 grid w-full max-w-60 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={openInvitationGoogleCalendar}
              className={outlineButtonClassName}
            >
              Simpan kalendar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={openInvitationMap}
              className={outlineButtonClassName}
            >
              Buka lokasi
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-3 max-w-xs font-spartan text-[1rem] leading-7 text-primary/68">
          Kami amat menghargai doa dan ucapan anda. Semoga kita dipertemukan dalam
          majlis yang lain.
        </p>
      )}

      <button
        type="button"
        onClick={onSendAgain}
        className="mt-7 font-spartan text-[0.82rem] tracking-[0.06em] text-primary/50 underline decoration-primary/20 underline-offset-4 transition-colors hover:text-primary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-sm"
      >
        Hantar semula
      </button>
    </motion.div>
  );
}
