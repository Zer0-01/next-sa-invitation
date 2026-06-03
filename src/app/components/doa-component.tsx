"use client";

import { motion } from "framer-motion";

const DoaComponent = () => {
    return (
        <section className="py-24 bg-background px-6 text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-3xl mx-auto space-y-10"
            >
                <div className="space-y-4">
                    <p className="text-xl font-serif font-medium leading-relaxed text-foreground">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </p>
                    <p className="text-sm font-light tracking-widest text-muted-foreground uppercase">
                        In the Name of Allah, Most Gracious, Most Merciful
                    </p>
                </div>

                <div className="space-y-6">
                    <p className="px-4 text-lg font-serif leading-relaxed italic text-foreground/80">
                        &quot;Ya Allah, berkatilah majlis perkahwinan ini, limpahkanlah kasih sayang di antara mereka,
                        dan jadikanlah mereka pasangan yang sakinah, mawaddah, wa rahmah.&quot;
                    </p>
                    <div className="w-12 h-[1px] bg-primary/20 mx-auto" />
                    <p className="text-xs font-light tracking-widest text-muted-foreground uppercase">
                        Amin Ya Rabbal Alamin
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default DoaComponent;
