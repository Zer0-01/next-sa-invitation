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
                className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 sm:gap-14"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 text-center sm:gap-4">
                    <p className="font-serif text-[3.35rem] leading-[0.9] text-primary drop-shadow-[0_6px_18px_rgba(71,83,67,0.08)] sm:text-[4.35rem]">
                        Ahad
                    </p>
                    <p className="text-base font-medium uppercase tracking-[0.32em] text-primary/70 sm:text-lg sm:tracking-[0.42em]">
                        20 Dis 2026
                    </p>
                </motion.div>

                <div className="flex w-full max-w-4xl items-stretch justify-center gap-3 sm:gap-6">
                    {countdownItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="flex min-h-44 flex-1 flex-col items-center justify-center rounded-[2rem] bg-primary px-3 py-6 text-primary-foreground shadow-[0_18px_30px_rgba(49,67,8,0.15)] sm:px-4"
                        >
                            <span className="font-sans text-[2.1rem] font-semibold leading-none tracking-[0.12em] text-primary-foreground sm:text-[2.75rem]">
                                {String(item.value).padStart(2, "0")}
                            </span>
                            <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.26em] text-primary-foreground/72 sm:mt-4 sm:text-[11px] sm:tracking-[0.32em]">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <motion.div variants={itemVariants}>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="h-auto rounded-full bg-primary px-10 py-3 font-serif text-[1.55rem] leading-none font-normal tracking-[0.01em] text-primary-foreground shadow-[0_14px_26px_rgba(49,67,8,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/95 hover:shadow-[0_16px_30px_rgba(49,67,8,0.18)] active:scale-95 sm:px-12 sm:text-[1.8rem]">
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

                <motion.p
                    variants={itemVariants}
                    className="pt-1 font-serif text-[2.45rem] leading-[0.96] text-primary/88 drop-shadow-[0_3px_6px_rgba(49,67,8,0.1)] sm:text-[3.2rem]"
                >
                    #destineDcAlways
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="w-full overflow-hidden rounded-[2rem] border border-primary/10 bg-background/45 shadow-[0_18px_40px_rgba(33,31,24,0.08)] backdrop-blur-[1px]"
                >
                    <div className="flex aspect-[4/5] w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] p-8 sm:aspect-[16/9]">
                        <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-primary/20 bg-background/28 text-center">
                            <p className="font-serif text-[2.85rem] leading-[0.9] text-primary/75 sm:text-[4.1rem]">
                                Placeholder
                            </p>
                            <p className="mt-3 max-w-xs text-[10px] font-medium uppercase tracking-[0.28em] text-primary/55 sm:text-xs sm:tracking-[0.3em]">
                                Couple photo mock area
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default DateSection;
