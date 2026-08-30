"use client";

import { useEffect, useMemo, useState } from "react";
import { DiApple } from "react-icons/di";
import { FaGoogle } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  downloadInvitationCalendarEvent,
  openInvitationGoogleCalendar,
} from "@/lib/calendar";
import { invitationContent } from "@/lib/invitation-content";

const targetDate = new Date("2026-12-20T11:00:00+08:00").getTime();

export function CountdownSection() {
  const shouldReduceMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        window.clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdownItems = useMemo(
    () => [
      { label: "Hari", value: timeLeft.days },
      { label: "Jam", value: timeLeft.hours },
      { label: "Minit", value: timeLeft.minutes },
      { label: "Saat", value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <Card className="border-white/35 bg-white/42 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl">
        <CardContent className="px-4 py-5 sm:px-6 sm:py-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.52)_0%,rgba(249,243,236,0.88)_100%)] px-3 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                <p className="font-serif text-4xl text-primary sm:text-5xl">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.3em] text-primary/58">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/35 bg-white/48 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl">
        <CardContent className="space-y-4 px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/56">Simpan tarikh</p>
            <p className="mt-3 font-serif text-3xl text-primary">
              {invitationContent.event.date}
            </p>
            <p className="mt-2 text-sm leading-7 text-primary/72">
              {invitationContent.event.time}
            </p>
          </div>
          <div className="grid gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={downloadInvitationCalendarEvent}
              className="justify-start rounded-full border-primary/15 bg-white/65 px-5 py-6 text-left text-primary"
            >
              <DiApple className="mr-3 h-5 w-5 shrink-0" />
              Add to Apple Calendar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={openInvitationGoogleCalendar}
              className="justify-start rounded-full border-primary/15 bg-white/65 px-5 py-6 text-left text-primary"
            >
              <FaGoogle className="mr-3 h-4 w-4 shrink-0" />
              Add to Google Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
