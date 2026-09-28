"use client";

import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { invitationContent } from "@/lib/invitation-content";

function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, "");
}

export function ContactScene() {
  const shouldReduceMotion = useReducedMotion();
  const { contactScene, contacts } = invitationContent;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative bg-[#edf1e7] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 sm:gap-12"
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
            Ada pertanyaan?
          </p>
          <h2
            id="contact-title"
            className="mt-3 font-spartan text-[1.7rem] leading-[0.98] text-primary sm:text-[2rem]"
          >
            {contactScene.title}
          </h2>
          <p className="mt-4 font-spartan text-[1rem] leading-7 text-primary/68 sm:text-[1.05rem]">
            Hubungi wakil keluarga kami jika anda memerlukan bantuan atau maklumat lanjut.
          </p>
        </div>

        <div className="w-full">
          <ul
            aria-label="Senarai wakil keluarga untuk dihubungi"
            className="grid grid-cols-1 gap-6"
          >
            {contacts.map((contact, index) => {
              const normalizedPhoneNumber = normalizePhoneNumber(contact.phoneNumber);
              const callHref = `tel:+${normalizedPhoneNumber}`;
              const whatsappMessage = `Assalamualaikum ${contact.name}, saya ingin bertanya mengenai majlis Danial & Ain.`;
              const whatsappHref = `https://wa.me/${normalizedPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

              return (
                <motion.li
                  key={contact.phoneNumber}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    ease: "easeOut",
                  }}
                  className="relative min-h-[15rem] rounded-[1.8rem] border border-primary/10 bg-[#fbf5eb] p-6 pb-10 text-center shadow-[0_18px_42px_rgba(74,58,44,0.07)]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-[url('/images/bg-17.png')] bg-cover bg-center bg-no-repeat opacity-25"
                  />

                  <div className="relative z-10 flex h-full flex-col items-center">
                    <h3 className="font-spartan text-[1.35rem] leading-tight text-primary sm:text-[1.45rem]">
                      {contact.name}
                    </h3>
                    <p className="mt-2 font-spartan text-[0.82rem] uppercase tracking-[0.16em] text-primary/50">
                      {contact.role}
                    </p>
                    <a
                      href={callHref}
                      className="mt-4 font-spartan text-[1rem] tabular-nums tracking-[0.06em] text-primary/72 underline-offset-4 hover:underline"
                    >
                      {contact.phoneNumber}
                    </a>

                    <div className="mt-auto grid w-full grid-cols-2 gap-2 pt-6">
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 rounded-full border-primary/14 bg-white/72 px-3 font-spartan text-[0.86rem] text-primary hover:bg-white"
                      >
                        <a href={callHref} aria-label={`Panggil ${contact.name}`}>
                          <Phone aria-hidden="true" />
                          Panggil
                        </a>
                      </Button>

                      <Button
                        asChild
                        className="h-11 rounded-full px-3 font-spartan text-[0.86rem]"
                      >
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${contact.name}`}
                        >
                          <MessageCircle aria-hidden="true" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-5 z-20 flex justify-center opacity-70"
                  >
                    <div className="relative h-10 w-20 sm:h-11 sm:w-24">
                      <Image
                        src="/images/ribbon-image.png"
                        alt=""
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
