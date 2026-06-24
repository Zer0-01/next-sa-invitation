"use client";

import { useMemo, useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { attendanceCollection, messageCollection } from "@/lib/firebase";

type AttendanceOption = "hadir" | "tidak-hadir";

interface FormErrors {
  name?: string;
  pax?: string;
}

export function RSVPScene() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceOption>("hadir");
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
      setAttendance("hadir");
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
      className="relative bg-[#f7f0e7] px-5 py-18 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-xl"
      >
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-serif text-[1.35rem] leading-[0.98] text-primary sm:text-[1.55rem]">
            RSVP
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5 sm:mt-12">
          <div className="space-y-2">
            <label className="text-[0.58rem] uppercase tracking-[0.22em] text-primary/58">
              Nama
            </label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nama penuh anda"
              className="h-11 rounded-[1.2rem] border-primary/12 bg-white/88 text-[0.72rem]"
              aria-invalid={errors.name ? true : undefined}
            />
            {errors.name ? (
              <p className="text-[0.68rem] text-destructive">{errors.name}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-[0.58rem] uppercase tracking-[0.22em] text-primary/58">
              Kehadiran
            </label>
            <Select
              value={attendance}
              onValueChange={(value: AttendanceOption) => setAttendance(value)}
            >
              <SelectTrigger className="h-11 w-full rounded-[1.2rem] border-primary/12 bg-white/88 text-[0.68rem]">
                <SelectValue placeholder="Pilih kehadiran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hadir">Hadir</SelectItem>
                <SelectItem value="tidak-hadir">Tidak hadir</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {attendance === "hadir" ? (
            <div className="space-y-2">
              <label className="text-[0.58rem] uppercase tracking-[0.22em] text-primary/58">
                Bilangan pax
              </label>
              <Select value={pax} onValueChange={setPax}>
                <SelectTrigger
                  className="h-11 w-full rounded-[1.2rem] border-primary/12 bg-white/88 text-[0.68rem]"
                  aria-invalid={errors.pax ? true : undefined}
                >
                  <SelectValue placeholder="Pilih pax" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pax ? (
                <p className="text-[0.68rem] text-destructive">{errors.pax}</p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-[0.58rem] uppercase tracking-[0.22em] text-primary/58">
              Ucapan & doa
            </label>
            <Textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Semoga majlis ini dipermudahkan dan diberkati."
              rows={5}
              className="rounded-[1.3rem] border-primary/12 bg-white/88 px-4 py-3 text-[0.72rem]"
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-auto rounded-full px-6 py-3 text-[0.6rem] uppercase tracking-[0.18em]"
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
