import type { Metadata } from "next";
import BackgroundMusic from "@/components/BackgroundMusic";
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
    <>
      <div className="min-h-screen bg-background md:flex md:justify-center md:bg-[#f7efc2] md:px-6">
        <div className="min-h-screen w-full bg-background md:max-w-[430px] md:overflow-hidden md:border-x md:border-primary/10 md:shadow-[0_0_40px_rgba(71,83,67,0.12)]">
          <InvitationOpening>{children}</InvitationOpening>
        </div>
      </div>
      <BackgroundMusic />
    </>
  );
}
