"use client";

import { motion } from "framer-motion";

const programmeItems = [
  {
    time: "9.00 pagi",
    event: "Akad Nikah",
    note: "Keluarga terdekat",
  },
  {
    time: "11.00 pagi - 4.00 petang",
    event: "Majlis Persandingan & Jamuan Makan",
  },
  {
    time: "12.30 tengah hari",
    event: "Ketibaan pengantin",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const ProgrammeSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden px-6 py-24 text-foreground"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-[2.3rem] leading-none text-primary sm:text-[3rem]">
            Aturcara Majlis
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.12, duration: 0.85 }}
          className="relative mx-auto mt-14 max-w-4xl rounded-[2rem] border border-primary/10 bg-background/45 px-5 py-6 shadow-[0_18px_40px_rgba(33,31,24,0.07)] backdrop-blur-[1px] sm:px-8 sm:py-8"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/18 to-transparent" />
          <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent" />

          <div className="space-y-4">
            {programmeItems.map((item, index) => (
              <motion.div
                key={`${item.time}-${item.event}`}
                {...fadeUp}
                transition={{ delay: 0.14 + index * 0.1, duration: 0.7 }}
                className="flex items-start justify-between gap-5 border-b border-primary/8 pb-4 last:border-b-0 last:pb-0 sm:gap-8"
              >
                <div className="w-[42%] shrink-0">
                  <p className="font-serif text-[1.05rem] leading-tight text-foreground sm:text-[1.2rem]">
                    {item.time}
                  </p>
                </div>

                <div className="w-full text-right">
                  <h3 className="font-serif text-[1.25rem] leading-tight text-primary sm:text-[1.55rem]">
                    {item.event}
                  </h3>
                  {item.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/72">
                      ({item.note})
                    </p>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProgrammeSection;
