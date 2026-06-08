"use client";

import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.12
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 }
    }
};

const placeholderCards = [
    "aspect-[4/5] sm:translate-y-10",
    "aspect-[4/3]",
    "aspect-[4/5] sm:-translate-y-6",
    "aspect-[5/4] sm:-translate-y-4",
];

const GallerySection = () => {
    return (
        <section className="relative overflow-hidden px-6 py-24 text-foreground">
            <div className="absolute inset-x-0 top-10 h-40 bg-[radial-gradient(circle_at_center,rgba(197,173,125,0.12),transparent_68%)]" />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 sm:gap-14"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                    <h2 className="font-serif text-[2.4rem] leading-none text-primary sm:text-[3.1rem]">
                        Galeri
                    </h2>
                </motion.div>

                <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                    {placeholderCards.map((cardClassName, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-background/50 p-3 shadow-[0_18px_40px_rgba(33,31,24,0.08)] backdrop-blur-[1px] ${cardClassName}`}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_42%),linear-gradient(180deg,rgba(221,226,207,0.14)_0%,rgba(241,238,233,0.06)_100%)]" />
                            <div className="relative flex h-full w-full items-center justify-center rounded-[1.55rem] border border-dashed border-primary/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(207,214,189,0.18)_100%)]">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-14 w-14 rounded-full border border-primary/12 bg-background/70 shadow-[0_10px_18px_rgba(50,61,0,0.06)]" />
                                    <div className="flex items-center gap-2">
                                        <span className="h-px w-8 bg-primary/18" />
                                        <span className="h-2 w-2 rounded-full bg-gold/70" />
                                        <span className="h-px w-8 bg-primary/18" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default GallerySection;
