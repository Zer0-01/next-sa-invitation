import type { Metadata } from "next";
import InvitationOpening from "@/components/InvitationOpening";

export const metadata: Metadata = {
  title: "Danial & Ain | Undangan Perkahwinan",
  description:
    "Majlis perkahwinan Danial dan Ain pada Ahad, 20 Disember 2026 di RIQ Glass Hall, Ampang.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white min-[431px]:flex min-[431px]:justify-center">
      <div className="invitation-surface min-h-screen w-full min-[431px]:max-w-[430px] min-[431px]:overflow-hidden min-[431px]:shadow-[-18px_0_28px_rgba(23,22,18,0.08),18px_0_28px_rgba(23,22,18,0.08)]">
        <InvitationOpening>{children}</InvitationOpening>
      </div>
    </div>
  );
}
