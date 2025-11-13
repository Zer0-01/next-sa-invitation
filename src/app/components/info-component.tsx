"use client";

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

const InfoComponent = () => {
    return (
        <section className="flex flex-col items-center text-center px-8 py-20 bg-white text-gray-900 space-y-12">
            {/* VENUE */}
            <div className="flex flex-col items-center space-y-3">
                <h3 className="text-xs tracking-[0.25em] uppercase text-gray-500">Venue</h3>
                <p className="text-2xl font-serif font-semibold text-gray-900">
                    Glass House Glenmarie
                </p>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Lot 16859, 3 Stone Park, Jalan Penyair U1/44, Hicom-Glenmarie Industrial Park,
                    40150 Shah Alam, Selangor
                </p>
            </div>

            {/* DATE */}
            <div className="flex flex-col items-center space-y-3">
                <h3 className="text-xs tracking-[0.25em] uppercase text-gray-500">Date</h3>
                <p className="text-2xl font-serif font-semibold text-gray-900">
                    Saturday, 13th December 2026
                </p>
                <p className="text-sm text-gray-600 font-light">16 Rejab 1440H</p>
            </div>

            {/* TIME */}
            <div className="flex flex-col items-center space-y-3">
                <h3 className="text-xs tracking-[0.25em] uppercase text-gray-500">Time</h3>
                <p className="text-2xl font-serif font-semibold text-gray-900">
                    11:00 AM – 5:00 PM
                </p>
            </div>

            {/* DRAWER */}
            <Drawer>
                <DrawerTrigger asChild>
                    <Button className="mt-8 bg-black text-white text-base font-medium px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                        Save The Date
                    </Button>
                </DrawerTrigger>

                <DrawerContent className="pb-10">
                    <DrawerHeader>
                        <DrawerTitle className="text-lg font-serif font-semibold">
                            Saturday, 13th December 2026
                        </DrawerTitle>
                        <DrawerDescription className="text-sm text-gray-600">
                            11:00 AM – 5:00 PM
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter className="flex flex-col gap-4">
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 py-6 text-gray-900 border-gray-300 hover:bg-gray-50"
                            onClick={downloadICS}
                        >
                            <DiApple className="text-2xl" />
                            <span className="font-medium">Add to Apple Calendar</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 py-6 text-gray-900 border-gray-300 hover:bg-gray-50"
                            onClick={addToGoogleCalendar}
                        >
                            <FaGoogle className="text-xl" />
                            <span className="font-medium">Add to Google Calendar</span>
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </section>
    );
};

export default InfoComponent;
