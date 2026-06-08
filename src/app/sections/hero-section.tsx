"use client";

import { motion } from "framer-motion";
import { useOpening } from "@/components/OpeningContext";

const HeroSection = () => {
    const { isDismissed } = useOpening();

    return (
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-10 text-center text-foreground">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,173,125,0.14),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_100%)]" />
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/12 blur-3xl" />
            <div className="absolute bottom-12 left-[-4.5rem] h-40 w-40 rounded-full bg-sage/18 blur-3xl" />
            <div className="absolute right-[-3rem] top-1/3 h-44 w-44 rounded-full bg-primary/7 blur-3xl" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isDismissed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-[2rem] border border-primary/10 bg-background/38 px-8 py-14 shadow-[0_18px_50px_rgba(33,31,24,0.08)] backdrop-blur-[1px]"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isDismissed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-[10px] font-medium uppercase tracking-[0.55em] text-muted-foreground"
                >
                    Walimatulurus
                </motion.p>

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
