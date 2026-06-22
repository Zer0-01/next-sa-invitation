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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f9f4ed_0%,#f4efe7_100%)] lg:h-screen lg:overflow-hidden lg:bg-[url('/images/bg-7.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <div className="min-h-screen w-full lg:overflow-hidden lg:mx-auto lg:grid lg:h-screen lg:place-items-center lg:px-6 lg:py-8">
        <InvitationOpening>{children}</InvitationOpening>
      </div>
    </div>
  );
}
