"use client";

import { motion } from "framer-motion";

const InviteComponent = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center px-6 py-24 bg-white text-gray-900 overflow-hidden"
        >
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500 mb-12"
            >
                With Joy and Gratitude to Allah SWT
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col items-center mb-12 space-y-2"
            >
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-800">Ahmad bin Abdullah</h2>
                <p className="text-xl font-serif font-light text-gray-400">&</p>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-800">Fatimah binti Abu</h2>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col items-center mb-12 space-y-3"
            >
                <p className="text-sm md:text-base text-gray-400 tracking-wide font-light italic">cordially invite</p>
                <p className="text-sm md:text-lg font-medium text-gray-700 tracking-widest uppercase">
                    Dato&apos; | Datin | Mr. | Mrs. | Ms.
                </p>
            </motion.div>

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-col items-center space-y-4"
            >
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-widest text-gray-900">
                    NORADAM BIN AHMAD
                </h2>
                <p className="text-2xl md:text-3xl font-serif font-light text-gray-400">&</p>
                <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-widest text-gray-900">
                    NUR HAWA BINTI ALI
                </h2>
            </motion.div>
        </motion.section>
    );
};

export default InviteComponent;

