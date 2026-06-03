"use client";

import { motion } from "framer-motion";

const FooterComponent = () => {
    return (
        <footer className="py-20 bg-background border-t border-primary/10 overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center space-y-4"
            >
                <div className="w-8 h-px bg-primary/20" />
                <div className="flex flex-col items-center space-y-1">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-medium">Created with love by</p>
                    <a href="https://lakarsoft.com/" target="_blank" rel="noopener noreferrer" className="text-xl font-serif font-bold tracking-tight text-foreground italic transition-colors hover:text-primary">LakarSoft</a>
                </div>
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase font-light mt-8">
                    © 2026 Adam & Hawa • Invitation
                </p>
            </motion.div>
        </footer>
    );
};

export default FooterComponent;
