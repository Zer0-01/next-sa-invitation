"use client";

import { motion, type MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { invitationContent } from "@/lib/invitation-content";

interface DateVenueSceneProps {
  opacity: MotionValue<number>;
  contentY: MotionValue<number>;
}

export function DateVenueScene({ opacity, contentY }: DateVenueSceneProps) {
  const { title, schedule, venueLines } = invitationContent.invitationScenes.dateVenue;

  return (
    <motion.div
      style={{ opacity, y: contentY }}
      className="absolute inset-0 flex items-center justify-center px-5 py-7 sm:px-7 sm:py-9"
    >
      <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
        <h2 className="font-serif text-[1.35rem] leading-none whitespace-nowrap text-white sm:text-[1.55rem]">
          {title}
        </h2>

        <div className="mt-6 space-y-4">
          {schedule.map((item) => (
            <div key={`${item.title}-${item.time}`} className="flex flex-col items-center text-center">
              <p className="font-serif text-[0.95rem] leading-tight text-white sm:text-[1.05rem]">
                {item.title}
              </p>
              {item.note ? (
                <p className="mt-1 text-[0.72rem] leading-5 text-white/76">{item.note}</p>
              ) : null}
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-white/68">
                {item.time}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-center text-center">
          <p className="font-serif text-[1rem] leading-tight text-white sm:text-[1.1rem]">
            {invitationContent.event.venueName}
          </p>
          <p className="mt-2 text-[0.72rem] leading-5 text-white/78">
            {venueLines.join(" ")}
          </p>
          <Button
            asChild
            className="mt-4 h-auto rounded-full border border-white/28 bg-white/14 px-6 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-white shadow-none hover:bg-white/20"
          >
            <a
              href="https://maps.app.goo.gl/frYmShGxKaU9TR5V6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka lokasi
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
