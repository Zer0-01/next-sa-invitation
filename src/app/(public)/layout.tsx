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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f9f4ed_0%,#f4efe7_100%)] md:h-screen md:overflow-hidden md:bg-[url('/images/bg-7.png')] md:bg-cover md:bg-center md:bg-no-repeat">
      <div className="min-h-screen w-full md:mx-auto md:grid md:h-screen md:overflow-hidden md:place-items-center md:px-6 md:py-8">
        <InvitationOpening>{children}</InvitationOpening>
      </div>
    </div>
  );
}
