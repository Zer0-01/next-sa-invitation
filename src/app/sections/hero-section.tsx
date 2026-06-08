"use client";

import { motion } from "framer-motion";
import { useOpening } from "@/components/OpeningContext";

const HeroSection = () => {
    const { isDismissed } = useOpening();

    return (
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 py-10 text-center text-foreground">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(214,201,153,0.34),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.35)_0%,rgba(231,236,226,0.45)_42%,rgba(245,241,228,0.88)_100%)]" />
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute bottom-12 left-[-4.5rem] h-40 w-40 rounded-full bg-sage/35 blur-3xl" />
            <div className="absolute right-[-3rem] top-1/3 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-x-10 bottom-12 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isDismissed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-[2rem] border border-white/50 bg-background/55 px-8 py-14 shadow-[0_20px_60px_rgba(71,83,67,0.12)] backdrop-blur-[2px]"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isDismissed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-[10px] font-medium uppercase tracking-[0.55em] text-muted-foreground"
                >
                    Walimatulurus
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0.7 }}
                    animate={isDismissed ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.7 }}
                    transition={{ delay: 0.35, duration: 0.7 }}
                    className="mt-4 flex items-center gap-3 text-gold/70"
                >
                    <span className="h-px w-10 bg-current" />
                    <span className="text-xs tracking-[0.35em]">✦</span>
                    <span className="h-px w-10 bg-current" />
                </motion.div>

                <div className="mt-6 flex flex-col items-center space-y-3">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={isDismissed ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.45, duration: 0.8 }}
                        className="text-6xl font-serif font-bold leading-none tracking-tight text-primary drop-shadow-[0_8px_24px_rgba(71,83,67,0.10)] sm:text-7xl"
                    >
                        Danial
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isDismissed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.62, duration: 0.8 }}
                        className="text-3xl font-serif font-light text-gold/80"
                    >
                        &
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, x: 20 }}
                        animate={isDismissed ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ delay: 0.78, duration: 0.8 }}
                        className="text-6xl font-serif font-bold leading-none tracking-tight text-primary drop-shadow-[0_8px_24px_rgba(71,83,67,0.10)] sm:text-7xl"
                    >
                        Ain
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isDismissed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.02, duration: 0.8 }}
                    className="mt-10 text-xs font-medium tracking-[0.32em] text-muted-foreground uppercase"
                >
                    Ahad • 20.12.26
                </motion.p>
            </motion.div>
        </section>
    );
};

export default HeroSection;
