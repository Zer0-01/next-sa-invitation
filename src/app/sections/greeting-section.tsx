"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const coupleProfiles = [
  {
    name: "Khairil Danial",
    parents: [
      "anakanda kepada Khairil Azreen Bin Jamian &",
      "Kartini Binti Yusof",
    ],
    placeholder: "Gambar pengantin lelaki",
  },
  {
    name: "Siti Nurdanyizatul Ain",
    parents: [
      "anakanda kepada Sahrizat Azam Bin Saidin &",
      "Hasniza Binti Ismail",
    ],
    placeholder: "Gambar pengantin perempuan",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const GreetingSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden px-6 py-24 text-foreground"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75 }}
          className="relative w-full max-w-md"
        >
          <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/16 to-transparent" />
          <div className="relative mx-auto rounded-[2rem] bg-background/44 px-5 py-4 backdrop-blur-[1px]">
            <Image
              src="/images/assalam.png"
              alt="Assalamualaikum calligraphy"
              width={1200}
              height={675}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.12, duration: 0.8 }}
          className="mt-10 max-w-xl text-center"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-muted-foreground">
            Dengan penuh kesyukuran ke hadrat Ilahi, kami menjemput
          </p>
          <p className="mt-5 font-serif text-[1.55rem] leading-[1.45] text-primary sm:text-[1.75rem]">
            Dato&apos; / Datin / Tuan / Puan / Encik / Cik seisi keluarga ke
            majlis perkahwinan kami
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.24, duration: 0.85 }}
          className="mt-14 flex w-full max-w-3xl flex-col items-center gap-10"
        >
          <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:gap-6">
            {coupleProfiles.map((profile, index) => (
              <div key={profile.name} className="flex flex-col gap-5">
                <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-background/42 shadow-[0_18px_38px_rgba(33,31,24,0.07)] backdrop-blur-[1px]">
                  <div className="absolute inset-x-4 top-4 h-px bg-gradient-to-r from-transparent via-primary/14 to-transparent" />
                  <div className="flex aspect-[4/5] items-center justify-center p-4 sm:p-5">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.35rem] border border-dashed border-primary/18 bg-background/28 px-4 text-center">
                      <span className="font-serif text-[1.55rem] leading-none text-primary/60 sm:text-[1.8rem]">
                        {index === 0 ? "D" : "A"}
                      </span>
                      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                        {profile.placeholder}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.36, duration: 0.8 }}
            className="flex max-w-xl flex-col items-center text-center"
          >
            <h2 className="font-serif text-[1.6rem] leading-tight text-primary sm:text-[1.85rem]">
              {coupleProfiles[0].name}
            </h2>
            <div className="mt-3 space-y-1">
              {coupleProfiles[0].parents.map((line) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed text-foreground/78 sm:text-[0.95rem]"
                >
                  {line}
                </p>
              ))}
            </div>

            <p className="my-5 font-serif text-2xl text-primary/42 sm:text-[2rem]">&</p>

            <h2 className="font-serif text-[1.6rem] leading-tight text-primary sm:text-[1.85rem]">
              {coupleProfiles[1].name}
            </h2>
            <div className="mt-3 space-y-1">
              {coupleProfiles[1].parents.map((line) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed text-foreground/78 sm:text-[0.95rem]"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GreetingSection;
