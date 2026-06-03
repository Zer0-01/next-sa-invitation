'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const GiftComponent = () => {
    const [copied1, setCopied1] = useState(false);
    const [copied2, setCopied2] = useState(false);

    const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const gifts = [
        {
            name: "Person 1",
            bank: "CIMB",
            account: "7633771742",
            qr: "/qr-image.jpeg",
            copied: copied1,
            setCopied: setCopied1
        },
        {
            name: "Person 2",
            bank: "CIMB",
            account: "7627870603",
            qr: "/qr-image-danial.jpeg",
            copied: copied2,
            setCopied: setCopied2
        }
    ];

    return (
        <section id="gift" className="flex flex-col items-center py-24 bg-background text-foreground">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4 mb-16 px-6 text-center"
            >
                <span className="text-[10px] font-medium tracking-[0.4em] text-muted-foreground uppercase">Digital Gift</span>
                <h2 className="text-3xl font-serif font-bold tracking-tight">Gift Corner</h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed font-light text-muted-foreground">
                    Your presence is the greatest gift. But if you wish to bless us with a token of love, you may do so here.
                </p>
            </motion.div>

            <div className="grid w-full max-w-4xl grid-cols-1 gap-12 px-6">
                {gifts.map((person, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="relative group p-4 bg-white rounded-2xl shadow-sm border border-primary/5 transition-all duration-300 hover:shadow-md">
                            <div className="relative h-48 w-48">
                                <Image
                                    src={person.qr}
                                    alt={`${person.name} QR Code`}
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-lg font-serif font-semibold">{person.name}</h3>
                            <div className="flex flex-col items-center bg-sage/5 px-6 py-3 rounded-xl border border-primary/10">
                                <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium mb-1">{person.bank}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-mono font-medium tracking-wider">{person.account}</span>
                                    <button
                                        onClick={() => copyToClipboard(person.account, person.setCopied)}
                                        className="text-primary hover:text-primary/70 transition-colors p-1"
                                        title="Copy number"
                                    >
                                        {person.copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default GiftComponent;
