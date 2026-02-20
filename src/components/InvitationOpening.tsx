"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
                            transition: { duration: 1, ease: "easeInOut" }
                        }}
                        className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden"
                    >
                        {/* Background Layer with soft gradient */}
                        <div className="absolute inset-0 bg-linear-to-br from-background via-sage/5 to-gold/5" />

                        {/* Semi-transparent Overlay Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-[90%] max-w-lg aspect-3/4 md:aspect-square flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/60"
                        >
                            {/* SVG Decorative Corner - Top Left */}
                            <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-40 text-sage rotate-0">
                                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <path d="M40 20C40 20 45 40 20 60M20 40C20 40 35 45 40 70M60 20C60 20 55 45 80 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M30 30C30 30 10 70 50 90M50 30C50 30 90 10 110 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                                </svg>
                            </div>

                            {/* SVG Decorative Corner - Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-40 text-gold rotate-180">
                                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <path d="M40 20C40 20 45 40 20 60M20 40C20 40 35 45 40 70M60 20C60 20 55 45 80 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M30 30C30 30 10 70 50 90M50 30C50 30 90 10 110 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="space-y-2"
                                >
                                    <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground">
                                        The Wedding Of
                                    </p>
                                    <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-foreground">
                                        Adam & Hawa
                                    </h2>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="w-12 h-px bg-gold/50"
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 1 }}
                                    className="space-y-4"
                                >
                                    <p className="text-sm md:text-base text-muted-foreground font-light max-w-[250px]">
                                        We invite you to celebrate our special day
                                    </p>

                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="group relative px-8 py-3 bg-primary text-primary-foreground rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/20"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-xs font-semibold">
                                            Buka Undangan
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6" /></svg>
                                        </span>
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </motion.div>
                            </div>

                            {/* Inner border frame */}
                            <div className="absolute inset-4 md:inset-6 border border-gold/10 rounded-xl pointer-events-none" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <main className={`${!isOpen ? "h-screen overflow-hidden" : ""}`}>
                {children}
            </main>
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
