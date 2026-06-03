"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="relative min-h-screen">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            className="absolute inset-0 z-100 flex min-h-screen items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-background via-sage/10 to-gold/10" />
            <div className="absolute inset-y-0 left-[-18%] w-[72%]">
              <Image
                src="/images/opening-image.png"
                alt="Ilustrasi bunga untuk pembukaan undangan"
                fill
                priority
                className="scale-145 object-contain object-left-center opacity-95"
                sizes="72vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-background/5 via-background/10 to-background/75" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background via-background/35 to-transparent" />
            </div>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex min-h-screen w-full flex-col px-5 pt-12 pb-8"
            >
              <div className="flex flex-1 items-center">
                <div className="ml-auto w-[50%] pt-1 text-right">
                  <div className="flex min-h-[28rem] flex-col">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="-mt-12 space-y-2"
                    >
                      <p className="font-serif text-6xl leading-none font-bold tracking-[0.08em] text-primary">
                        AD
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 1 }}
                      className="my-auto space-y-1 self-end"
                    >
                      <h2 className="font-sans text-4xl font-bold uppercase tracking-[0.14em] text-foreground">
                        DANIAL
                      </h2>
                      <div className="flex items-baseline justify-end gap-2">
                        <p className="font-serif text-4xl leading-none font-bold text-primary/70">
                          &
                        </p>
                        <h2 className="font-sans text-4xl font-bold tracking-[0.08em] text-foreground">
                          AIN
                        </h2>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="ml-auto h-px w-20 self-end bg-gold/50"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 1 }}
                      className="space-y-4 pt-7 text-muted-foreground"
                    >
                      <div className="space-y-1">
                        <p className="font-serif text-base font-normal lowercase">
                          hari & tarikh
                        </p>
                        <p className="font-sans text-base font-normal">
                          Ahad, 20 Disember 2026
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-serif text-base font-normal lowercase">
                          tempat
                        </p>
                        <p className="font-sans text-base font-normal uppercase">
                          RIQ GLASS HALL
                        </p>
                        <p className="font-sans text-base font-normal uppercase">
                          AMPANG
                        </p>
                      </div>
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
                <Button
                  onClick={() => setIsOpen(true)}
                  className="rounded-full px-8 py-6 font-serif text-xs  tracking-widest shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/20 active:scale-95"
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
