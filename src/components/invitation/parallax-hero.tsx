"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { useRef } from "react";
import { invitationContent } from "@/lib/invitation-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FloatingImage } from "./floating-image";

export function ParallaxHero() {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 160]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 70]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    shouldReduceMotion ? [1, 1] : [1, 0.25]
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden px-4 pb-14 pt-8 sm:px-6 lg:px-10"
    >
      <motion.div style={shouldReduceMotion ? undefined : { y: backgroundY }} className="absolute inset-0">
        <Image
          src="/images/bg-3.png"
          alt="Romantic floral backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,26,20,0.22)_0%,rgba(247,241,232,0.62)_28%,rgba(247,241,232,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_38%),radial-gradient(circle_at_80%_25%,rgba(205,182,136,0.16),transparent_24%)]" />

      <FloatingImage
        src="/images/fg-1.png"
        alt=""
        priority
        className="-left-12 top-18 h-[22rem] w-[16rem] opacity-70 sm:left-0 sm:top-10 sm:h-[28rem] sm:w-[20rem] lg:left-6 lg:h-[34rem] lg:w-[24rem]"
        scrollRange={[-16, 26]}
      />
      <FloatingImage
        src="/images/fg-2.png"
        alt=""
        priority
        className="-right-10 bottom-16 h-[24rem] w-[16rem] opacity-65 sm:right-2 sm:bottom-6 sm:h-[30rem] sm:w-[20rem] lg:right-10 lg:h-[38rem] lg:w-[25rem]"
        scrollRange={[-22, 32]}
        floatRange={[-10, 12, -10]}
      />

      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-7xl items-end"
      >
        <div className="grid w-full gap-10 pb-6 pt-28 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-12">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="rounded-full border-white/45 bg-white/32 px-4 py-1.5 tracking-[0.26em] text-[0.68rem] uppercase text-primary backdrop-blur-md"
            >
              {invitationContent.event.label}
            </Badge>
            <div className="mt-6 space-y-5">
              <p className="text-sm uppercase tracking-[0.42em] text-primary/70">
                The Wedding of
              </p>
              <h1 className="font-serif text-[4rem] leading-[0.9] text-primary drop-shadow-[0_10px_30px_rgba(68,54,33,0.14)] sm:text-[5.75rem] lg:text-[7rem]">
                {invitationContent.couple.groom.shortName}
                <span className="mx-3 inline-block text-gold/90">&</span>
                {invitationContent.couple.bride.shortName}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-primary/80 sm:text-lg">
                {invitationContent.heroText}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-auto rounded-full bg-primary px-7 py-3 text-sm tracking-[0.18em] uppercase shadow-[0_16px_36px_rgba(57,66,34,0.22)]"
              >
                <a href="#rsvp">Sahkan Kehadiran</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-full border-primary/20 bg-white/50 px-7 py-3 text-sm tracking-[0.18em] uppercase text-primary backdrop-blur-md"
              >
                <a href="#details">Lihat Butiran</a>
              </Button>
            </div>
          </div>

          <div className="justify-self-end">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-[2rem] border border-white/45 bg-white/48 p-6 shadow-[0_24px_70px_rgba(58,44,27,0.18)] backdrop-blur-xl sm:p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/8 p-3 text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-primary/60">Tarikh</p>
                    <p className="mt-2 font-serif text-2xl text-primary">
                      {invitationContent.event.shortDate}
                    </p>
                    <p className="mt-1 text-sm text-primary/72">{invitationContent.event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/8 p-3 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-primary/60">Lokasi</p>
                    <p className="mt-2 font-serif text-2xl text-primary">
                      {invitationContent.event.venueName}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-primary/72">
                      Pandan Indah, Kuala Lumpur
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
