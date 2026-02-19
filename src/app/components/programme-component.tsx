"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    }
};

const ProgrammeComponent = () => {
    return (
        <section className="py-24 bg-sage/5 px-6 border-y border-primary/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto w-full max-w-4xl"
            >
                <Card className="border-none shadow-none bg-transparent">
                    <CardHeader className="p-0 mb-16">
                        <CardTitle className="text-center text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground">
                            Programme
                        </CardTitle>
                        <div className="w-16 h-[1px] bg-primary/20 mx-auto mt-6" />
                    </CardHeader>

                    <CardContent className="p-0">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
                        >
                            {[
                                { title: "Lunch", time: "11:00 AM – 5:00 PM" },
                                { title: "Arrival of Bride & Groom", time: "12:30 PM" },
                                { title: "Ceremony", time: "1:00 PM – 3:00 PM" },
                                { title: "Reception", time: "3:30 PM – 5:00 PM" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center justify-between border-b border-primary/5 pb-6 group"
                                >
                                    <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                                        {item.title}
                                    </span>
                                    <span className="font-serif text-lg md:text-xl text-foreground">
                                        {item.time}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    )
}

export default ProgrammeComponent

