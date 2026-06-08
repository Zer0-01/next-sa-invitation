"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DiApple } from "react-icons/di";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

const downloadICS = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:The Wedding of Adam & Hawa
DESCRIPTION:Join us in celebrating the wedding of Adam & Hawa.
LOCATION:Riq Grand Ballroom, Ampang, Selangor
DTSTART:20261220T030000Z
DTEND:20261220T083000Z
END:VEVENT
END:VCALENDAR
`;

    const blob = new Blob([icsContent.trim()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding-invitation.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const addToGoogleCalendar = () => {
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: "The Wedding of Adam & Hawa",
        dates: "20261220T030000Z/20261220T083000Z",
        details: "Join us in celebrating the wedding of Adam & Hawa.",
        location: "Riq Grand Ballroom, Ampang, Selangor",
    });

    window.open(`https://www.google.com/calendar/render?${params.toString()}`, "_blank");
};

const DateSection = () => {
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

    const countdownItems = [
        { label: "Hari", value: timeLeft.days },
        { label: "Jam", value: timeLeft.hours },
        { label: "Minit", value: timeLeft.minutes },
        { label: "Saat", value: timeLeft.seconds }
    ];

    return (
        <section className="relative overflow-hidden px-6 py-24 text-foreground">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 sm:gap-14"
            >
                <motion.p
                    variants={itemVariants}
                    className="text-center font-serif text-[2.3rem] leading-none text-primary sm:text-[3rem]"
                >
                    20.12.2026
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-secondary px-3 py-4 text-secondary-foreground shadow-[0_18px_30px_rgba(88,80,72,0.22)] sm:px-5 sm:py-5"
                >
                    <div className="grid grid-cols-4 gap-2 sm:gap-4">
                        {countdownItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex min-w-0 flex-col items-center justify-center rounded-[1.35rem] border border-white/8 bg-white/4 px-2 py-4 sm:py-5"
                            >
                                <span className="font-sans text-[1.65rem] font-semibold leading-none tracking-[0.12em] text-secondary-foreground sm:text-[2.5rem]">
                                    {String(item.value).padStart(2, "0")}
                                </span>
                                <span className="mt-2 text-[9px] font-medium uppercase tracking-[0.24em] text-secondary-foreground/72 sm:mt-3 sm:text-[11px] sm:tracking-[0.32em]">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button
                                className="h-auto rounded-full px-10 py-3 font-serif text-[1.45rem] leading-none font-normal tracking-[0.01em] shadow-[0_14px_26px_rgba(49,67,8,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/95 hover:shadow-[0_16px_30px_rgba(49,67,8,0.18)] active:scale-95 sm:px-12 sm:text-[1.7rem]"
                            >
                                Tarikh Jemputan
                            </Button>
                        </DrawerTrigger>

                        <DrawerContent className="border-t border-primary/10 bg-background pb-10">
                            <DrawerHeader className="text-center">
                                <DrawerTitle className="font-serif text-xl font-semibold text-foreground">
                                    Ahad, 20 Disember 2026
                                </DrawerTitle>
                                <DrawerDescription className="mt-2 text-sm font-light tracking-wide text-muted-foreground">
                                    11:00 AM - 4:30 PM
                                </DrawerDescription>
                            </DrawerHeader>

                            <DrawerFooter className="mx-auto flex w-full max-w-md flex-col gap-4 px-6">
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-center gap-3 rounded-md border-primary/10 py-6 text-foreground transition-colors hover:bg-sage/10"
                                    onClick={downloadICS}
                                >
                                    <DiApple className="text-2xl" />
                                    <span className="text-xs font-medium uppercase tracking-widest">
                                        Add to Apple Calendar
                                    </span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-center gap-3 rounded-md border-primary/10 py-6 text-foreground transition-colors hover:bg-sage/10"
                                    onClick={addToGoogleCalendar}
                                >
                                    <FaGoogle className="text-xl" />
                                    <span className="text-xs font-medium uppercase tracking-widest">
                                        Add to Google Calendar
                                    </span>
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default DateSection;
