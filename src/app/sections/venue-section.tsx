"use client";

import { motion } from "framer-motion";
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
import { DiApple } from "react-icons/di";
import { FaGoogle } from "react-icons/fa";

/**
 * Generate .ics calendar file for Apple Calendar & others.
 */
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

/**
 * Generate Google Calendar event URL.
 */
const addToGoogleCalendar = () => {
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: "The Wedding of Adam & Hawa",
        dates: "20261220T030000Z/20261220T083000Z", // UTC format YYYYMMDDTHHmmss (11am-4:30pm MYT)
        details: "Join us in celebrating the wedding of Adam & Hawa.",
        location: "Riq Grand Ballroom, Ampang, Selangor",
    });
    window.open(`https://www.google.com/calendar/render?${params.toString()}`, "_blank");
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8 }
    }
};

const VenueSection = () => {
    return (
        <section className="flex flex-col items-center px-6 py-28 bg-background text-foreground border-y border-primary/10">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid w-full max-w-6xl grid-cols-1 gap-12"
            >
                {/* VENUE */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                    <div className="h-px w-10 bg-primary/20" />
                    <h3 className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">Venue</h3>
                    <a
                        href="https://maps.app.goo.gl/B2xvTxge5uCbN6in6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center text-xl font-serif font-semibold text-foreground transition-colors hover:text-primary"
                    >
                        Riq Grand Ballroom
                    </a>
                    <p className="max-w-[240px] text-center text-xs leading-relaxed font-light text-muted-foreground">
                        Ampang, Selangor
                    </p>
                </motion.div>

                {/* DATE */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                    <div className="h-px w-10 bg-primary/20" />
                    <h3 className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">Date</h3>
                    <p className="text-center text-xl font-serif font-semibold text-foreground">
                        Sunday, 20th Dec 2026
                    </p>
                    <p className="text-xs font-light italic text-muted-foreground">11 Rejab 1448H</p>
                </motion.div>

                {/* TIME */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                    <div className="h-px w-10 bg-primary/20" />
                    <h3 className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">Time</h3>
                    <p className="text-center text-xl font-serif font-semibold text-foreground">
                        11:00 AM – 4:30 PM
                    </p>
                    <p className="text-center text-xs font-light italic text-muted-foreground">Ketibaan Pengantin: 12.30 PM</p>
                </motion.div>
            </motion.div>

            {/* DRAWER */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button className="mt-20 rounded-md px-10 py-6 text-xs font-medium tracking-widest uppercase shadow-sm">
                            Save The Date
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="pb-10 bg-background border-t border-primary/10">
                        <DrawerHeader className="text-center">
                            <DrawerTitle className="text-xl font-serif font-semibold text-foreground">
                                Sunday, 20th December 2026
                            </DrawerTitle>
                            <DrawerDescription className="text-sm text-muted-foreground font-light tracking-wide mt-2">
                                11:00 AM – 4:30 PM
                            </DrawerDescription>
                        </DrawerHeader>

                        <DrawerFooter className="flex flex-col gap-4 max-w-md mx-auto w-full px-6">
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-3 py-6 text-foreground border-primary/10 hover:bg-sage/10 rounded-md transition-colors"
                                onClick={downloadICS}
                            >
                                <DiApple className="text-2xl" />
                                <span className="text-xs tracking-widest uppercase font-medium">Add to Apple Calendar</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center justify-center gap-3 py-6 text-foreground border-primary/10 hover:bg-sage/10 rounded-md transition-colors"
                                onClick={addToGoogleCalendar}
                            >
                                <FaGoogle className="text-xl" />
                                <span className="text-xs tracking-widest uppercase font-medium">Add to Google Calendar</span>
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </motion.div>
        </section>
    );
};

export default VenueSection;
