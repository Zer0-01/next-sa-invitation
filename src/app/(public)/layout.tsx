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
      <div className="min-h-screen bg-[#f7efc2] min-[431px]:flex min-[431px]:justify-center">
        <div className="min-h-screen w-full bg-background min-[431px]:max-w-[430px] min-[431px]:overflow-hidden min-[431px]:border-x min-[431px]:border-primary/10 min-[431px]:shadow-[0_0_40px_rgba(71,83,67,0.12)]">
          <InvitationOpening>{children}</InvitationOpening>
        </div>
      </div>
      <BackgroundMusic />
    </>
  );
}
