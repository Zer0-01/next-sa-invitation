"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { OpeningProvider, useOpening } from "./OpeningContext";

const InvitationOpeningContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useOpening();
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);

    document.body.style.overflow = isOpen ? "unset" : "hidden";

    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOpenInvitation = () => {
    if (isClosing) return;

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, 950);
  };

  if (!isMounted) return null;

  return (
    <div className="invitation-surface relative min-h-screen">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            className="invitation-surface absolute inset-0 z-[100] min-h-dvh overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_48%,rgba(139,152,112,0.12),transparent_42%)]" />

            <div className="absolute top-[10%] right-[-8%] z-[1] h-[80dvh] w-[68%] opacity-28">
              <Image
                src="/images/background-image.png"
                alt=""
                fill
                priority
                aria-hidden="true"
                className="object-contain"
                sizes="72vw"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -24, y: 18, scale: 0.94 }}
              animate={
                isClosing
                  ? {
                      opacity: 0,
                      x: -36,
                      y: 28,
                      scale: 0.9,
                      rotate: -4,
                    }
                  : {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                    }
              }
              transition={
                isClosing
                  ? { duration: 0.8, ease: "easeInOut" }
                  : { delay: 0.2, duration: 1.05, ease: "easeOut" }
              }
              className="absolute bottom-[7rem] left-[-31%] z-[2] h-[62dvh] w-[92%] min-w-[19rem]"
            >
              <Image
                src="/images/opening-image.png"
                alt="Ilustrasi bunga untuk pembukaan undangan"
                fill
                priority
                className="object-contain object-bottom-left"
                sizes="92vw"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.975, opacity: 0 }}
              animate={
                isClosing
                  ? { scale: 0.985, opacity: 0, y: 10 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={
                isClosing
                  ? { duration: 0.8, ease: "easeInOut" }
                  : { duration: 0.95, ease: "easeOut" }
              }
              className="relative z-10 flex min-h-dvh w-full flex-col px-7 pt-9 pb-7"
            >
              <div className="flex min-h-0 flex-1 items-center">
                <div className="ml-auto grid h-full w-[68%] max-w-[15.5rem] grid-rows-[1fr_auto_1fr] pr-2 text-right">
                  <div className="flex items-end justify-end pb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.9 }}
                      className="mr-3"
                    >
                      <p className="font-serif text-[5.55rem] leading-[0.88] text-primary drop-shadow-[0_3px_8px_rgba(49,67,8,0.14)] sm:text-[6.15rem]">
                        AD
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.9 }}
                    className="self-center"
                  >
                    <div className="space-y-0.5">
                      <h1 className="font-sans text-[2.55rem] leading-[0.96] font-bold tracking-[0.06em] text-primary">
                        DANIAL
                      </h1>
                      <div className="flex items-end justify-end gap-0.5">
                        <span className="translate-y-2 font-serif text-[5.4rem] leading-[0.65] text-primary">
                          &
                        </span>
                        <h1 className="font-sans text-[2.55rem] leading-[0.96] font-bold tracking-[0.06em] text-primary">
                          AIN
                        </h1>
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex justify-end pt-12">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85, duration: 0.9 }}
                      className="w-[92%] text-primary"
                    >
                      <div className="space-y-5">
                        <div>
                          <p className="font-serif text-[1.95rem] leading-none text-primary/80">
                            hari & tarikh
                          </p>
                          <p className="mt-1.5 font-sans text-[0.95rem] tracking-[0.04em] text-primary/90">
                            Ahad, 20 Disember 2026
                          </p>
                        </div>
                        <div>
                          <p className="font-serif text-[1.95rem] leading-none text-primary/80">
                            tempat
                          </p>
                          <div className="mt-1.5 space-y-0.5 font-sans text-[0.95rem] leading-tight font-medium uppercase tracking-[0.12em] text-primary/90">
                            <p>RIQ GLASS HALL,</p>
                            <p>AMPANG</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={
                  isClosing
                    ? { opacity: 0, y: 12, scale: 0.98 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={
                  isClosing
                    ? { duration: 0.72, ease: "easeInOut" }
                    : { delay: 1.05, duration: 0.9 }
                }
                className="mt-auto flex w-full justify-center pb-2 pt-8"
              >
                <Button
                  onClick={handleOpenInvitation}
                  disabled={isClosing}
                  className="h-auto rounded-full bg-primary px-10 py-3.5 font-serif text-[1.45rem] font-normal tracking-normal text-primary-foreground shadow-[0_10px_22px_rgba(49,67,8,0.14)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/95 hover:shadow-[0_12px_24px_rgba(49,67,8,0.18)] active:scale-95"
                >
                  Anda Dijemput!
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className={`relative z-0 ${!isOpen ? "h-screen overflow-hidden" : ""}`}>
        {children}
      </main>
    </div>
  );
};

const InvitationOpening = ({ children }: { children: React.ReactNode }) => {
  return (
    <OpeningProvider>
      <InvitationOpeningContent>{children}</InvitationOpeningContent>
    </OpeningProvider>
  );
};

export default InvitationOpening;
