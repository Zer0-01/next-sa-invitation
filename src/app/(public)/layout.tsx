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
      <InvitationOpening>{children}</InvitationOpening>
      <BackgroundMusic />
    </>
  );
}
