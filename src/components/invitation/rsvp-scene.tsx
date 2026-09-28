"use client";

import { useMemo, useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaintedDecoration } from "@/components/invitation/painted-decoration";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { attendanceCollection, messageCollection } from "@/lib/firebase";
import { invitationContent } from "@/lib/invitation-content";

type AttendanceOption = "hadir" | "tidak-hadir";

interface FormErrors {
  name?: string;
  attendance?: string;
  pax?: string;
}

export function RSVPScene() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceOption | "">("");
  const [pax, setPax] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paxCount = useMemo(() => Number(pax), [pax]);

  function validate() {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Nama diperlukan.";
    }

    if (!attendance) {
      nextErrors.attendance = "Sila pilih status kehadiran anda.";
    }

    if (attendance === "hadir" && (!Number.isInteger(paxCount) || paxCount < 1)) {
      nextErrors.pax = "Bilangan pax tidak sah.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const trimmedName = name.trim();
      const trimmedMessage = message.trim();

      await addDoc(attendanceCollection, {
        name: trimmedName,
        isAttend: attendance === "hadir",
        pax: attendance === "hadir" ? paxCount : 0,
        createdAt: serverTimestamp(),
      });

      if (trimmedMessage) {
        await addDoc(messageCollection, {
          name: trimmedName,
          message: trimmedMessage,
          createdAt: serverTimestamp(),
        });
      }

      window.dispatchEvent(new Event("invitation:messages-updated"));

      toast.success("RSVP berjaya dihantar.");
      setName("");
      setAttendance("");
      setPax("1");
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("RSVP tidak dapat dihantar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative overflow-hidden bg-[#f7f0e7] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-edge.png"
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 240px"
        parallaxDistance={42}
        className="-left-16 top-12 z-0 aspect-[2/3] w-60 sm:-left-24 sm:top-14 sm:w-[21rem] lg:-left-28 lg:top-16 lg:w-[26rem]"
        imageClassName="scale-x-[-1] opacity-65"
      />
      <PaintedDecoration
        src="/images/decorations/painted-wildflower-edge.png"
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 240px"
        parallaxDistance={42}
        className="-right-16 bottom-8 z-0 aspect-[2/3] w-60 sm:-right-24 sm:bottom-10 sm:w-[21rem] lg:-right-28 lg:bottom-12 lg:w-[26rem]"
        imageClassName="opacity-65"
      />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-xl"
      >
        <div className="mx-auto max-w-lg text-center">
          <p className="font-spartan text-[0.72rem] uppercase tracking-[0.28em] text-primary/55">
            Sahkan kehadiran
          </p>
          <h2
            id="rsvp-title"
            className="mt-3 font-spartan text-[1.7rem] leading-[0.98] text-primary sm:text-[2rem]"
          >
            RSVP
          </h2>
          <p className="mt-4 font-spartan text-[1rem] leading-7 text-primary/68 sm:text-[1.05rem]">
            Mohon sahkan kehadiran anda sebelum {invitationContent.event.rsvpDeadline}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5 sm:mt-12">
          <div className="space-y-2">
            <label className="font-spartan text-[0.88rem] uppercase tracking-[0.16em] text-primary/58">
              Nama
            </label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nama penuh anda"
              className="h-12 rounded-[1.2rem] border-primary/12 bg-white/88 font-spartan text-[1rem] text-primary placeholder:text-primary/35"
              aria-invalid={errors.name ? true : undefined}
            />
            {errors.name ? (
              <p className="font-spartan text-[0.96rem] text-destructive">{errors.name}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <p
              id="attendance-label"
              className="font-spartan text-[0.88rem] uppercase tracking-[0.16em] text-primary/58"
            >
              Kehadiran
            </p>
            <RadioGroup
              value={attendance}
              onValueChange={(value) => {
                setAttendance(value as AttendanceOption);
                setErrors((currentErrors) => ({ ...currentErrors, attendance: undefined }));
              }}
              aria-labelledby="attendance-label"
              aria-invalid={errors.attendance ? true : undefined}
              aria-describedby={errors.attendance ? "attendance-error" : undefined}
              className="grid gap-3 sm:grid-cols-2"
            >
              <label
                htmlFor="attendance-present"
                className="flex min-h-16 cursor-pointer items-center gap-3 rounded-[1.2rem] border border-primary/12 bg-white/88 px-4 py-3 font-spartan text-[1rem] text-primary/78 transition-colors hover:border-primary/25 has-[[data-state=checked]]:border-primary/45 has-[[data-state=checked]]:bg-primary/8"
              >
                <RadioGroupItem id="attendance-present" value="hadir" />
                <span>Insya-Allah, saya hadir</span>
              </label>
              <label
                htmlFor="attendance-absent"
                className="flex min-h-16 cursor-pointer items-center gap-3 rounded-[1.2rem] border border-primary/12 bg-white/88 px-4 py-3 font-spartan text-[1rem] text-primary/78 transition-colors hover:border-primary/25 has-[[data-state=checked]]:border-primary/45 has-[[data-state=checked]]:bg-primary/8"
              >
                <RadioGroupItem id="attendance-absent" value="tidak-hadir" />
                <span>Maaf, tidak dapat hadir</span>
              </label>
            </RadioGroup>
            {errors.attendance ? (
              <p id="attendance-error" className="font-spartan text-[0.96rem] text-destructive">
                {errors.attendance}
              </p>
            ) : null}
          </div>

          {attendance === "hadir" ? (
            <div className="space-y-2">
              <label className="font-spartan text-[0.88rem] uppercase tracking-[0.16em] text-primary/58">
                Bilangan pax
              </label>
              <Select value={pax} onValueChange={setPax}>
                <SelectTrigger
                  className="h-12 w-full rounded-[1.2rem] border-primary/12 bg-white/88 font-spartan text-[1rem]"
                  aria-invalid={errors.pax ? true : undefined}
                >
                  <SelectValue placeholder="Pilih pax" />
                </SelectTrigger>
                <SelectContent className="font-spartan">
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                    <SelectItem className="py-2 text-[1rem]" key={value} value={String(value)}>
                      {value === 1 ? "1 orang — saya sahaja" : `${value} orang`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pax ? (
                <p className="font-spartan text-[0.96rem] text-destructive">{errors.pax}</p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="font-spartan text-[0.88rem] uppercase tracking-[0.16em] text-primary/58">
              Ucapan & doa
            </label>
            <Textarea
              id="rsvp-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Semoga majlis ini dipermudahkan dan diberkati."
              rows={5}
              className="rounded-[1.3rem] border-primary/12 bg-white/88 px-4 py-3 font-spartan text-[1rem] text-primary placeholder:text-primary/35"
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-auto rounded-full px-6 py-3 font-spartan text-[0.88rem] uppercase tracking-[0.14em]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Menghantar
                </>
              ) : (
                "Hantar RSVP"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
