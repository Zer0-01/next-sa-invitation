"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import GiftDialogComponent from "../components/gift-dialog-component";

const GiftSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="gift" className="overflow-hidden px-6 py-24 text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-[2.3rem] leading-none text-primary sm:text-[3rem]">
            Hadiah
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-[0.95rem]">
            Kehadiran anda merupakan hadiah yang paling bermakna buat kami.
            Namun, jika anda ingin menitipkan tanda kasih, anda boleh berbuat
            demikian di sini.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.85 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="mt-8 h-auto rounded-full bg-primary px-10 py-3 font-serif text-[1.45rem] leading-none font-normal text-primary-foreground shadow-[0_14px_26px_rgba(49,67,8,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/95 hover:shadow-[0_16px_30px_rgba(49,67,8,0.18)] active:scale-95 sm:px-12 sm:text-[1.7rem]"
          >
            Bagi Hadiah
          </Button>
        </motion.div>
      </div>

      <GiftDialogComponent
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
};

export default GiftSection;
