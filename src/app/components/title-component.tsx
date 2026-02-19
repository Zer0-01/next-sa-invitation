"use client";

import { motion } from "framer-motion";

const TitleComponent = () => {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] md:min-h-screen text-center text-black bg-white px-6 py-10 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center space-y-4 md:space-y-6"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500"
                >
                    The Wedding Of
                </motion.p>

                <div className="flex flex-col items-center space-y-2 md:space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-serif font-bold tracking-tight"
                    >
                        Adam
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-4xl md:text-6xl font-serif font-light text-gray-400"
                    >
                        &
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-serif font-bold tracking-tight"
                    >
                        Hawa
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-sm md:text-lg mt-8 md:mt-12 tracking-[0.2em] text-gray-400 font-light"
                >
                    Saturday • 13.12.26
                </motion.p>
            </motion.div>
        </section>
    );
};

export default TitleComponent;

