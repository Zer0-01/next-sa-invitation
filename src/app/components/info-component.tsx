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
LOCATION:Glass House Glenmarie, Lot 16859, 3 Stone Park, Jalan Penyair U1/44, Hicom-Glenmarie Industrial Park, Shah Alam, Selangor
DTSTART:20261213T110000
DTEND:20261213T170000
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
        dates: "20261213T110000/20261213T170000", // UTC format YYYYMMDDTHHmmss
        details: "Join us in celebrating the wedding of Adam & Hawa.",
        location:
            "Glass House Glenmarie, Lot 16859, 3 Stone Park, Jalan Penyair U1/44, Hicom-Glenmarie Industrial Park, Shah Alam, Selangor",
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

const InfoComponent = () => {
    return (
        <section className="flex flex-col items-center px-6 py-28 bg-background text-foreground border-y border-primary/10">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full max-w-6xl"
            >
                {/* VENUE */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-[1px] bg-primary/20 md:hidden" />
                    <h3 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">Venue</h3>
                    <p className="text-xl md:text-2xl font-serif font-semibold text-foreground">
                        Glass House Glenmarie
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[240px] text-center font-light">
                        Lot 16859, 3 Stone Park, Jalan Penyair U1/44, Hicom-Glenmarie Industrial Park,
                        40150 Shah Alam, Selangor
                    </p>
                </motion.div>

                {/* DATE */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-[1px] bg-primary/20 md:hidden" />
                    <h3 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">Date</h3>
                    <p className="text-xl md:text-2xl font-serif font-semibold text-foreground">
                        Saturday, 13th Dec 2026
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground font-light italic">16 Rejab 1440H</p>
                </motion.div>

                {/* TIME */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-[1px] bg-primary/20 md:hidden" />
                    <h3 className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground font-medium">Time</h3>
                    <p className="text-xl md:text-2xl font-serif font-semibold text-foreground">
                        11:00 AM – 5:00 PM
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground font-light italic">Reception starts at 12:30 PM</p>
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
                        <Button className="mt-20 text-xs md:text-sm tracking-widest uppercase font-medium px-10 py-6 rounded-md shadow-sm">
                            Save The Date
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="pb-10 bg-background border-t border-primary/10">
                        <DrawerHeader className="text-center">
                            <DrawerTitle className="text-xl font-serif font-semibold text-foreground">
                                Saturday, 13th December 2026
                            </DrawerTitle>
                            <DrawerDescription className="text-sm text-muted-foreground font-light tracking-wide mt-2">
                                11:00 AM – 5:00 PM
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

export default InfoComponent;

