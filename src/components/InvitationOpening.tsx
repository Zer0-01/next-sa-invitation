"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { OpeningProvider, useOpening } from "./OpeningContext";

const InvitationOpeningContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useOpening();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Prevent scrolling when overlay is open (isOpen is false initially)
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-background via-sage/10 to-gold/10" />
            <div className="absolute inset-y-0 left-[-18%] w-[72%] sm:left-0 sm:w-[56%] md:w-[40%]">
              <Image
                src="/images/opening-image.png"
                alt="Ilustrasi bunga untuk pembukaan undangan"
                fill
                priority
                className="scale-145 object-contain object-left-center opacity-95 sm:scale-120 md:scale-100"
                sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 40vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-background/5 via-background/10 to-background/75" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background via-background/35 to-transparent md:h-36" />
            </div>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex min-h-screen w-full flex-col px-5 pt-12 pb-8 sm:px-6 md:px-16 md:pt-16 md:pb-10 lg:px-24"
            >
              <div className="flex flex-1 items-center">
                <div className="ml-auto w-[50%] pt-4 text-right sm:w-[44%] md:flex md:w-full md:items-center md:justify-end md:pt-0">
                  <div className="space-y-7 md:max-w-md md:space-y-8 md:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="space-y-2"
                    >
                      <p className="font-serif text-5xl leading-none tracking-[0.08em] text-primary sm:text-5xl md:text-6xl">
                        AD
                      </p>
                      <div className="space-y-1">
                        <h2 className="font-sans text-4xl font-semibold uppercase tracking-[0.14em] text-foreground sm:text-4xl md:text-5xl">
                          DANIAL
                        </h2>
                        <div className="flex items-baseline justify-end gap-2 md:justify-start">
                          <p className="font-serif text-4xl leading-none text-primary/70 sm:text-4xl md:text-5xl">
                            &
                          </p>
                          <h2 className="font-sans text-4xl font-medium tracking-[0.08em] text-foreground sm:text-4xl md:text-5xl">
                            Ain
                          </h2>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="ml-auto h-px w-20 bg-gold/50 md:ml-0 md:w-16"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 1 }}
                      className="space-y-1 text-base font-light text-muted-foreground sm:text-base md:space-y-2 md:text-base"
                    >
                      <p>Ahad, 20 Disember 2026</p>
                      <p>RIQ Glass Hall, Ampang</p>
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 1 }}
                className="flex w-full justify-center pb-2"
              >
                <button
                  onClick={() => setIsOpen(true)}
                  className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/20 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                    Buka Undangan
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className={!isOpen ? "h-screen overflow-hidden" : ""}>{children}</main>
    </>
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
