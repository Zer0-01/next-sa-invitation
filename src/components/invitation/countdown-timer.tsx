"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { invitationContent } from "@/lib/invitation-content";

interface CountdownTimerProps {
  className?: string;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isMounted: boolean;
}

const initialState: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: false,
  isMounted: false,
};

function getTimeLeft(targetDate: number): CountdownState {
  const distance = targetDate - Date.now();

  if (distance <= 0) {
    return {
      ...initialState,
      isExpired: true,
      isMounted: true,
    };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isExpired: false,
    isMounted: true,
  };
}

export function CountdownTimer({ className }: CountdownTimerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState<CountdownState>(initialState);
  const targetDate = useMemo(
    () => new Date(invitationContent.event.countdownTarget).getTime(),
    []
  );

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Minit", value: timeLeft.minutes },
    { label: "Saat", value: timeLeft.seconds },
  ];

  if (timeLeft.isMounted && timeLeft.isExpired) {
    return (
      <div className={className}>
        <p className="text-center font-spartan text-[1.35rem] leading-tight text-white sm:text-[1.55rem]">
          {invitationContent.invitationScenes.countdown.expiredMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-4 gap-3 sm:gap-5">
        {countdownItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
            className="text-center"
          >
            <p className="font-spartan text-[1.45rem] leading-none text-white sm:text-[2rem]">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="mt-2 font-spartan text-[0.7rem] uppercase tracking-[0.16em] text-white/68 sm:text-[0.76rem]">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
