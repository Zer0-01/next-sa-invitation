"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CountdownComponent = () => {
    const targetDate = new Date("2026-12-20T11:00:00+08:00").getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-24 bg-primary text-primary-foreground px-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center gap-12"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary-foreground/60 font-medium">Count the Days</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground tracking-tight">The Celebration Begins In</h2>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                    {[
                        { label: "Hari", value: timeLeft.days },
                        { label: "Jam", value: timeLeft.hours },
                        { label: "Minit", value: timeLeft.minutes },
                        { label: "Saat", value: timeLeft.seconds }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex flex-col items-center min-w-[80px] md:min-w-[120px] gap-2 p-4 md:p-8 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl shadow-lg"
                        >
                            <span className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground leading-none">
                                {String(item.value).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] md:text-xs tracking-widest uppercase text-primary-foreground/70 font-light">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default CountdownComponent;

