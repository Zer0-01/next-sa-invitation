import type { Metadata } from "next";
import InvitationOpening from "@/components/InvitationOpening";
import { invitationContent } from "@/lib/invitation-content";

export const metadata: Metadata = {
  title: `${invitationContent.couple.groom.shortName} & ${invitationContent.couple.bride.shortName} | Undangan Perkahwinan`,
  description: `Majlis perkahwinan ${invitationContent.couple.groom.shortName} dan ${invitationContent.couple.bride.shortName} pada ${invitationContent.event.date} di ${invitationContent.event.venueName}, Bandar Baru Bangi.`,
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f9f4ed_0%,#f4efe7_100%)] md:h-screen md:overflow-hidden md:bg-[url('/images/bg-7.png')] md:bg-cover md:bg-center md:bg-no-repeat">
      <div className="min-h-screen w-full md:mx-auto md:grid md:h-screen md:overflow-hidden md:place-items-center md:px-6 md:py-8">
        <InvitationOpening>{children}</InvitationOpening>
      </div>
    </div>
  );
}
