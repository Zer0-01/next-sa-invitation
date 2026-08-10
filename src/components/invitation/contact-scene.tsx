"use client";

import Image from "next/image";
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
      className="relative bg-[#edf1e7] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 sm:gap-12"
      >
        <div className="w-full text-center">
          <div className="relative mx-auto aspect-square w-full max-w-[5.5rem] sm:max-w-[6rem]">
            <Image
              src={contactScene.imageSrc}
              alt="Telefon bunga vintaj untuk bahagian hubungan"
              fill
              sizes="96px"
              className="object-contain drop-shadow-[0_18px_34px_rgba(74,58,44,0.12)]"
            />
          </div>
          <h2 className="mt-4 font-spartan text-[1.65rem] leading-[0.98] text-primary sm:text-[1.95rem]">
            {contactScene.title}
          </h2>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 auto-rows-fr sm:mx-auto sm:max-w-[38rem]">
            {contacts.map((contact, index) => {
              const normalizedPhoneNumber = normalizePhoneNumber(contact.phoneNumber);
              const callHref = `tel:+${normalizedPhoneNumber}`;
              const whatsappHref = `https://wa.me/${normalizedPhoneNumber}`;
              const pyramidClassName = index === 0 ? "col-span-2 mx-auto w-[calc(50%_-_0.5rem)]" : "";

              return (
                <motion.article
                  key={contact.phoneNumber}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    ease: "easeOut",
                  }}
                  className={`relative flex h-full flex-col rounded-[1.8rem] border border-primary/10 bg-[#fbf5eb] bg-[url('/images/bg-17.png')] bg-cover bg-center bg-no-repeat p-5 pb-9 shadow-[0_22px_48px_rgba(74,58,44,0.08)] sm:p-6 sm:pb-10 ${pyramidClassName}`}
                >
                  <h3 className="font-spartan text-[1.35rem] leading-tight text-primary sm:text-[1.45rem]">
                    {contact.name}
                  </h3>
                  <p className="mt-2 font-spartan text-[0.86rem] uppercase tracking-[0.16em] text-primary/48">
                    {contact.role}
                  </p>

                  <div className="mt-auto flex items-center justify-center gap-2 pt-5">
                    <Button
                      asChild
                      size="icon-sm"
                      className="overflow-hidden rounded-full p-0"
                    >
                      <a
                        href={callHref}
                        aria-label={`Hubungi ${contact.name}`}
                        className="inline-flex items-center justify-center"
                      >
                        <Image
                          src="/images/call-image.png"
                          alt=""
                          width={32}
                          height={32}
                          className="block size-full object-cover"
                        />
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="icon-sm"
                      className="overflow-hidden rounded-full border-primary/14 bg-white/72 p-0 text-primary hover:bg-accent/70"
                    >
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${contact.name}`}
                        className="inline-flex items-center justify-center"
                      >
                        <Image
                          src="/images/whatsapp-image.png"
                          alt=""
                          width={32}
                          height={32}
                          className="block size-full object-cover"
                        />
                      </a>
                    </Button>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 -bottom-5 flex justify-center">
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
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
