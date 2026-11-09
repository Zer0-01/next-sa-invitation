"use client";

import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GoldDiamond } from "@/components/invitation/gold-diamond";
import { invitationContent, type ContactPerson } from "@/lib/invitation-content";

const contacts: readonly ContactPerson[] = invitationContent.contacts;

const actionButtonClassName =
  "h-11 rounded-full border-primary/14 bg-white/75 font-spartan text-[0.86rem] text-primary shadow-none hover:bg-white";

/** "+60 12-237 1756" → "60122371756", the form tel: and wa.me links need. */
function toDialDigits(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, "");
}

function buildWhatsAppHref(contact: ContactPerson) {
  const { groom, bride } = invitationContent.couple;
  const message = `Assalamualaikum ${contact.salutation}, saya ingin bertanya mengenai majlis ${groom.shortName} & ${bride.shortName}.`;

  return `https://wa.me/${toDialDigits(contact.phoneNumber)}?text=${encodeURIComponent(message)}`;
}

export function ContactScene() {
  const shouldReduceMotion = useReducedMotion();
  const { contactScene } = invitationContent;

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
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 sm:gap-12"
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="flex items-center justify-center gap-2 font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
            <GoldDiamond />
            <span className="mr-[-0.28em]">Ada pertanyaan?</span>
            <GoldDiamond />
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

        {/* Container query: side by side only when the section itself is wide,
            so the cards stay stacked inside the desktop phone frame. */}
        <div className="@container w-full">
          <ul
            aria-label="Senarai wakil keluarga untuk dihubungi"
            className="grid grid-cols-1 gap-5 @xl:grid-cols-2"
          >
            {contacts.map((contact, index) => (
              <motion.li
                key={contact.phoneNumber}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                className="relative isolate rounded-[1.75rem] border border-white/80 bg-[#fbf7f0]/92 px-5 pb-8 pt-5 shadow-[0_18px_42px_rgba(74,58,44,0.08)]"
              >
                <div
                  aria-hidden="true"
                  className="paper-grain pointer-events-none absolute inset-0 -z-10 rounded-[1.75rem] opacity-40 mix-blend-multiply"
                />

                <div className="flex items-center gap-4 text-left">
                  <span
                    aria-hidden="true"
                    className="flex size-13 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/8 font-cinzel-decorative text-[1.35rem] text-primary/80"
                  >
                    {contact.name.charAt(0)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-spartan text-[1.3rem] leading-tight text-primary">
                      {contact.name}
                    </h3>
                    <p className="mt-1 font-spartan text-[0.76rem] uppercase tracking-[0.16em] text-primary/52">
                      {contact.role}
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-spartan text-[1.02rem] tabular-nums tracking-[0.06em] text-primary/75">
                  {contact.phoneNumber}
                </p>

                <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                  <Button asChild variant="outline" className={`${actionButtonClassName} px-4`}>
                    <a href={`tel:+${toDialDigits(contact.phoneNumber)}`} aria-label={`Panggil ${contact.name}`}>
                      <Phone aria-hidden="true" />
                      Panggil
                    </a>
                  </Button>
                  <Button asChild variant="outline" className={`${actionButtonClassName} w-11 px-0`}>
                    <a
                      href={buildWhatsAppHref(contact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${contact.name}`}
                      title="WhatsApp"
                    >
                      <MessageCircle aria-hidden="true" />
                    </a>
                  </Button>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -bottom-5 z-20 flex justify-center opacity-70"
                >
                  <div className="relative h-10 w-20">
                    <Image
                      src="/images/ribbon-image.png"
                      alt=""
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
