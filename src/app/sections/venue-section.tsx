"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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

const venueAddress = "Pandan Kapital, Ground Floor, Jalan Pandan Utama, Pandan Indah, 55100, Kuala Lumpur, Wilayah Persekutuan, Pandan Indah, 68000 Selangor";
const venueMapUrl = "https://maps.app.goo.gl/oKhhmjWQJPmHLbu86";

const VenueSection = () => {
    return (
        <section className="px-6 py-28 text-foreground">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12"
            >
                <motion.div variants={itemVariants} className="flex max-w-2xl flex-col items-center gap-4 text-center">
                    <h2 className="font-serif text-[2.3rem] leading-none text-primary sm:text-[3rem]">
                        Lokasi Majlis
                    </h2>
                </motion.div>

                <motion.div variants={itemVariants} className="flex w-full max-w-3xl flex-col items-center gap-6 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <p className="font-serif text-[2rem] leading-[0.95] text-foreground sm:text-[2.5rem]">
                            Riq Glass Hall
                        </p>
                        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
                            {venueAddress}
                        </p>
                    </div>

                    <Button
                        asChild
                        className="h-auto rounded-full bg-primary px-10 py-3 font-serif text-[1.45rem] leading-none font-normal text-primary-foreground shadow-[0_14px_26px_rgba(49,67,8,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/95 hover:shadow-[0_16px_30px_rgba(49,67,8,0.18)] active:scale-95 sm:px-12 sm:text-[1.7rem]"
                    >
                        <a href={venueMapUrl} target="_blank" rel="noopener noreferrer">
                            Lokasi Majlis
                        </a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default VenueSection;
