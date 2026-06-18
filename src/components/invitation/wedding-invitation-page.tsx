import type { ReactNode } from "react";
import Image from "next/image";
import { Clock3, Flower2, Gift, HeartHandshake, MapPinned, Sparkles } from "lucide-react";
import { ParallaxHero } from "@/components/invitation/parallax-hero";
import { CountdownSection } from "@/components/invitation/countdown-section";
import { FloatingImage } from "@/components/invitation/floating-image";
import { ParallaxSection } from "@/components/invitation/parallax-section";
import { RSVPForm } from "@/components/invitation/rsvp-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { invitationContent } from "@/lib/invitation-content";

function InfoCard({
  icon,
  label,
  value,
  note,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card className="h-full border-white/35 bg-white/44 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl">
      <CardContent className="space-y-4 px-6 py-6">
        <div className="inline-flex rounded-full bg-primary/8 p-3 text-primary">{icon}</div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-primary/56">{label}</p>
          <p className="mt-3 font-serif text-[1.9rem] leading-tight text-primary">{value}</p>
          <p className="mt-2 text-sm leading-7 text-primary/72">{note}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function WeddingInvitationPage() {
  return (
    <div className="overflow-x-clip text-foreground">
      <ParallaxHero />

      <section id="details" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] opacity-22">
          <Image
            src="/images/bg-2.png"
            alt="Soft painted landscape"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <FloatingImage
          src="/images/fg-2.png"
          alt=""
          className="-left-18 top-10 hidden h-[24rem] w-[18rem] opacity-25 lg:block"
          scrollRange={[-10, 18]}
        />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-xl">
              <Badge
                variant="outline"
                className="rounded-full border-primary/15 bg-white/65 px-4 py-1.5 tracking-[0.26em] text-[0.68rem] uppercase text-primary"
              >
                Bismillah
              </Badge>
              <h2 className="mt-6 font-serif text-[3rem] leading-[0.95] text-primary sm:text-[4rem]">
                Sebuah undangan yang penuh doa, lembut, dan berkesan.
              </h2>
              <p className="mt-6 text-base leading-8 text-primary/72">
                {invitationContent.intro}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-primary/10 bg-white/55 p-5">
                  <p className="text-[0.66rem] uppercase tracking-[0.28em] text-primary/54">
                    Pasangan
                  </p>
                  <p className="mt-3 font-serif text-3xl text-primary">
                    {invitationContent.couple.groom.shortName} & {invitationContent.couple.bride.shortName}
                  </p>
                </div>
                <div className="rounded-[1.75rem] border border-primary/10 bg-white/55 p-5">
                  <p className="text-[0.66rem] uppercase tracking-[0.28em] text-primary/54">
                    Dress code
                  </p>
                  <p className="mt-3 text-sm leading-7 text-primary/72">
                    {invitationContent.dressCode}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InfoCard
                icon={<Clock3 className="h-5 w-5" />}
                label="Masa"
                value={invitationContent.event.time}
                note="Sila hadir mengikut keselesaan anda sepanjang majlis berlangsung."
              />
              <InfoCard
                icon={<MapPinned className="h-5 w-5" />}
                label="Lokasi"
                value={invitationContent.event.venueName}
                note={invitationContent.event.venueAddress}
              />
              <InfoCard
                icon={<HeartHandshake className="h-5 w-5" />}
                label="Suasana"
                value="Garden Romance"
                note="Reka suasana tenang, elegan, dan santai untuk diraikan bersama."
              />
              <InfoCard
                icon={<Sparkles className="h-5 w-5" />}
                label="Catatan"
                value="Restu anda"
                note="Kehadiran dan doa anda adalah hadiah paling bermakna buat kami."
              />
            </div>
          </div>
        </div>
      </section>

      <ParallaxSection
        backgroundSrc="/images/bg-1.png"
        backgroundAlt="Floral garden artwork"
        className="px-4 py-24 sm:px-6 lg:px-10"
        overlayClassName="bg-[linear-gradient(180deg,rgba(247,241,232,0.75)_0%,rgba(247,241,232,0.84)_45%,rgba(247,241,232,0.9)_100%)]"
      >
        <FloatingImage
          src="/images/fg-1.png"
          alt=""
          className="-left-14 top-0 hidden h-[24rem] w-[18rem] opacity-45 md:block"
        />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-primary/52">
              The Couple
            </p>
            <h2 className="mt-5 font-serif text-[3rem] leading-[0.95] text-primary sm:text-[4.2rem]">
              Dua jiwa, satu niat yang dipelihara dengan kasih.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <Card className="border-white/35 bg-white/50 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl">
              <CardContent className="px-6 py-8 sm:px-8">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-primary/54">Pengantin lelaki</p>
                <h3 className="mt-4 font-serif text-[2.35rem] leading-tight text-primary sm:text-[2.8rem]">
                  {invitationContent.couple.groom.fullName}
                </h3>
                <div className="mt-5 space-y-2 text-sm leading-7 text-primary/72">
                  {invitationContent.couple.groom.parents.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-primary/12 bg-white/55 shadow-[0_18px_42px_rgba(58,44,27,0.1)]">
              <span className="font-serif text-5xl text-gold/90">&</span>
            </div>

            <Card className="border-white/35 bg-white/50 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl">
              <CardContent className="px-6 py-8 sm:px-8">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-primary/54">Pengantin perempuan</p>
                <h3 className="mt-4 font-serif text-[2.35rem] leading-tight text-primary sm:text-[2.8rem]">
                  {invitationContent.couple.bride.fullName}
                </h3>
                <div className="mt-5 space-y-2 text-sm leading-7 text-primary/72">
                  {invitationContent.couple.bride.parents.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        backgroundSrc="/images/bg-5.png"
        backgroundAlt="Soft floral painting"
        className="px-4 py-24 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-primary/52">
              Countdown
            </p>
            <h2 className="mt-5 font-serif text-[3rem] leading-[0.95] text-primary sm:text-[4.1rem]">
              Mengira hari menuju detik bahagia.
            </h2>
          </div>
          <div className="mt-12">
            <CountdownSection />
          </div>
        </div>
      </ParallaxSection>

      <section className="relative px-4 py-24 sm:px-6 lg:px-10">
        <FloatingImage
          src="/images/fg-1.png"
          alt=""
          className="right-0 top-0 hidden h-[22rem] w-[14rem] opacity-20 lg:block"
          scrollRange={[-12, 22]}
        />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-primary/52">
                Event Details
              </p>
              <h2 className="mt-5 font-serif text-[3rem] leading-[0.95] text-primary sm:text-[4.1rem]">
                Butiran majlis yang ringkas dan mudah diikuti.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-primary/72">
                Setiap ruang disusun agar kunjungan anda terasa lancar, selesa,
                dan penuh kenangan manis dari mula sehingga akhir majlis.
              </p>
              <div className="mt-8 rounded-[1.9rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.56)_0%,rgba(244,238,229,0.9)_100%)] p-6 shadow-[0_20px_52px_rgba(58,44,27,0.08)]">
                <p className="font-serif text-2xl text-primary">Dress code</p>
                <p className="mt-3 text-sm leading-7 text-primary/72">
                  {invitationContent.dressCode}
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-primary/10 bg-white/58 p-6 shadow-[0_24px_70px_rgba(58,44,27,0.12)] backdrop-blur-xl sm:p-8">
              <div className="space-y-6">
                {invitationContent.programme.map((item, index) => (
                  <div key={`${item.time}-${item.event}`}>
                    <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr]">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-primary/48">
                          {item.time}
                        </p>
                      </div>
                      <div>
                        <p className="font-serif text-[1.7rem] leading-tight text-primary">
                          {item.event}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-primary/72">
                          {item.note}
                        </p>
                      </div>
                    </div>
                    {index < invitationContent.programme.length - 1 ? (
                      <Separator className="mt-6 bg-primary/10" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ParallaxSection
        backgroundSrc="/images/bg-8.png"
        backgroundAlt="Dreamy coastal artwork"
        className="px-4 py-24 sm:px-6 lg:px-10"
        overlayClassName="bg-[linear-gradient(180deg,rgba(245,242,236,0.78)_0%,rgba(245,242,236,0.86)_100%)]"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="max-w-xl">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-primary/52">
                Love Story
              </p>
              <h2 className="mt-5 font-serif text-[3rem] leading-[0.95] text-primary sm:text-[4.1rem]">
                Tiga bab yang membawa kami ke hari ini.
              </h2>
            </div>
            <div className="space-y-5">
              {invitationContent.story.map((item, index) => (
                <Card
                  key={item.title}
                  className="border-white/35 bg-white/48 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.14)] backdrop-blur-xl"
                >
                  <CardContent className="flex gap-5 px-6 py-6 sm:px-8">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="font-serif text-2xl text-primary">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-primary/72">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      <section className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-primary/52">
              Gallery
            </p>
            <h2 className="mt-5 font-serif text-[3rem] leading-[0.95] text-primary sm:text-[4.1rem]">
              Nuansa visual yang membentuk suasana majlis.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {invitationContent.galleryImages.map((image) => (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/55 p-3 shadow-[0_20px_52px_rgba(58,44,27,0.08)] ${image.className}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(18,16,13,0.18)_100%)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ParallaxSection
        id="rsvp"
        backgroundSrc="/images/bg-10.png"
        backgroundAlt="Soft garden painting"
        className="px-4 py-24 sm:px-6 lg:px-10"
      >
        <FloatingImage
          src="/images/fg-2.png"
          alt=""
          className="-left-16 bottom-0 hidden h-[24rem] w-[18rem] opacity-30 lg:block"
          scrollRange={[-8, 20]}
        />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-primary/52">
              RSVP & Guestbook
            </p>
            <h2 className="mt-5 font-serif text-[3rem] leading-[0.95] text-primary sm:text-[4.1rem]">
              Balas undangan anda dengan satu pengalaman yang lembut dan mudah.
            </h2>
          </div>
          <RSVPForm />
        </div>
      </ParallaxSection>

      <section className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-white/35 bg-white/52 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.12)] backdrop-blur-xl">
              <CardContent className="space-y-5 px-6 py-7 sm:px-8">
                <div className="inline-flex rounded-full bg-primary/8 p-3 text-primary">
                  <MapPinned className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-primary/52">
                    Location
                  </p>
                  <h2 className="mt-4 font-serif text-[2.7rem] leading-[0.98] text-primary sm:text-[3.5rem]">
                    {invitationContent.event.venueName}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-primary/72">
                    {invitationContent.event.venueAddress}
                  </p>
                </div>
                <Button
                  asChild
                  className="h-auto rounded-full px-7 py-3 text-sm uppercase tracking-[0.18em]"
                >
                  <a href={invitationContent.event.mapUrl} target="_blank" rel="noopener noreferrer">
                    Buka lokasi di peta
                  </a>
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-white/35 bg-white/48 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.12)] backdrop-blur-xl">
                <CardContent className="space-y-4 px-6 py-7">
                  <div className="inline-flex rounded-full bg-primary/8 p-3 text-primary">
                    <Gift className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-3xl text-primary">Hadiah</h3>
                  <p className="text-sm leading-7 text-primary/72">
                    Kehadiran anda adalah hadiah terindah. Jika ingin menitipkan tanda kasih, maklumat akaun tersedia di bawah.
                  </p>
                  <div className="space-y-4">
                    {invitationContent.gifts.map((gift) => (
                      <div
                        key={gift.account}
                        className="grid gap-4 rounded-[1.5rem] border border-primary/10 bg-white/65 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <div>
                          <p className="font-serif text-2xl text-primary">{gift.name}</p>
                          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.26em] text-primary/52">
                            {gift.bank}
                          </p>
                          <p className="mt-3 font-mono text-sm tracking-[0.22em] text-primary/72">
                            {gift.account}
                          </p>
                        </div>
                        <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded-2xl border border-primary/10 bg-white sm:mx-0">
                          <Image
                            src={gift.qr}
                            alt={`Kod QR ${gift.name}`}
                            fill
                            sizes="96px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/35 bg-white/48 py-0 shadow-[0_24px_70px_rgba(58,44,27,0.12)] backdrop-blur-xl">
                <CardContent className="flex h-full flex-col px-6 py-7">
                  <div className="inline-flex rounded-full bg-primary/8 p-3 text-primary">
                    <Flower2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-3xl text-primary">Terima kasih</h3>
                  <p className="mt-4 text-sm leading-7 text-primary/72">
                    Kehadiran, doa, dan restu anda akan melengkapkan momen istimewa ini buat kami sekeluarga.
                  </p>
                  <div className="relative mt-6 min-h-[16rem] flex-1 overflow-hidden rounded-[1.8rem] border border-primary/10">
                    <Image
                      src="/images/bg-7.png"
                      alt="Romantic floral arrangement"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(25,21,18,0.26)_100%)]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ParallaxSection
        backgroundSrc="/images/bg-6.png"
        backgroundAlt="Dreamy sky artwork"
        className="px-4 pb-24 pt-20 sm:px-6 lg:px-10"
        overlayClassName="bg-[linear-gradient(180deg,rgba(247,241,232,0.72)_0%,rgba(247,241,232,0.9)_100%)]"
      >
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="outline"
            className="rounded-full border-primary/15 bg-white/60 px-4 py-1.5 tracking-[0.26em] text-[0.68rem] uppercase text-primary"
          >
            With Love
          </Badge>
          <h2 className="mt-6 font-serif text-[3rem] leading-[0.94] text-primary sm:text-[4.6rem]">
            Semoga setiap langkah menuju majlis ini dipenuhi rahmat dan kegembiraan.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-primary/72">
            Kami menantikan kehadiran anda untuk meraikan permulaan baru kami dengan penuh syukur.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="font-serif text-[2.2rem] text-primary">
              {invitationContent.couple.groom.shortName} & {invitationContent.couple.bride.shortName}
            </p>
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-primary/54">
              {invitationContent.event.compactDate}
            </p>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}
