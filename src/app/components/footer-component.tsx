"use client";

import { motion } from "framer-motion";

const FooterComponent = () => {
    return (
        <footer className="py-20 bg-[#fafafa] border-t border-gray-100 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center space-y-4"
            >
                <div className="w-8 h-[1px] bg-gray-200" />
                <div className="flex flex-col items-center space-y-1">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-medium">Created with love by</p>
                    <p className="text-xl md:text-2xl font-serif font-bold text-gray-900 tracking-tight italic">LakarSoft</p>
                </div>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase font-light mt-8">
                    © 2026 Adam & Hawa • Invitation
                </p>
            </motion.div>
        </footer>
    );
};

export default FooterComponent;

