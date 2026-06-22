"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { invitationContent } from "@/lib/invitation-content";

interface GreetingSceneProps {
  opacity: MotionValue<number>;
  contentY: MotionValue<number>;
}

function CouplePortrait({
  src,
  alt,
  initial,
}: {
  src?: string;
  alt: string;
  initial: string;
}) {
  if (!src) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-[1.7rem] border border-dashed border-white/40 bg-white/12">
        <div className="text-center">
          <span className="font-serif text-[2rem] text-white/80">{initial}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 40vw, 160px"
        className="object-cover object-center"
      />
    </div>
  );
}

export function GreetingScene({ opacity, contentY }: GreetingSceneProps) {
  const { title, arabicFallback, bismillahSrc, coupleImages, separator } =
    invitationContent.invitationScenes.greeting;

  return (
    <motion.div
      style={{ opacity, y: contentY }}
      className="absolute inset-0 flex items-start justify-center px-5 pt-10 pb-7 sm:px-7 sm:pt-12 sm:pb-9"
    >
      <div className="flex w-full max-w-md flex-col text-center">
        <div className="mx-auto w-full max-w-[18rem] sm:max-w-[20rem]">
          {bismillahSrc ? (
            <div className="relative mx-auto aspect-[5/1.1] w-full">
              <Image
                src={bismillahSrc}
                alt="Bismillah"
                fill
                sizes="320px"
                className="object-contain"
              />
            </div>
          ) : (
            <p className="font-serif text-[1rem] leading-relaxed text-white/90">{arabicFallback}</p>
          )}
        </div>

        <div className="mt-4">
          <h2 className="mt-3 font-serif text-[1.4rem] leading-[1.02] text-white sm:text-[1.7rem]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[20rem] text-[0.72rem] leading-5 text-white/78 sm:text-[0.78rem] sm:leading-6">
            {invitationContent.greetingText}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <CouplePortrait
            src={coupleImages.bride}
            alt={invitationContent.couple.bride.fullName}
            initial="A"
          />
          <CouplePortrait
            src={coupleImages.groom}
            alt={invitationContent.couple.groom.fullName}
            initial="D"
          />
        </div>

        <div className="mt-5 space-y-4 text-center">
          <div>
            <h3 className="font-serif text-[1.1rem] leading-tight text-white sm:text-[1.25rem]">
              {invitationContent.couple.groom.fullName}
            </h3>
            <p className="mt-2 text-[0.72rem] leading-5 text-white/72">Anakanda kepada</p>
            <div className="mt-1 text-[0.72rem] leading-5 text-white/72">
              <p>{invitationContent.couple.groom.parents[0].replace("Anakanda kepada ", "")} &</p>
              <p>{invitationContent.couple.groom.parents[1].replace("dan ", "")}</p>
            </div>
          </div>

          <p className="font-serif text-[1.1rem] text-[#f1dec2]">{separator}</p>

          <div>
            <h3 className="font-serif text-[1.1rem] leading-tight text-white sm:text-[1.25rem]">
              {invitationContent.couple.bride.fullName}
            </h3>
            <p className="mt-2 text-[0.72rem] leading-5 text-white/72">Anakanda kepada</p>
            <div className="mt-1 text-[0.72rem] leading-5 text-white/72">
              <p>{invitationContent.couple.bride.parents[0].replace("Anakanda kepada ", "")} &</p>
              <p>{invitationContent.couple.bride.parents[1].replace("dan ", "")}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
