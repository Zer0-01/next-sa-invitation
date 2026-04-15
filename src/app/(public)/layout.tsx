import BackgroundMusic from "@/components/BackgroundMusic";
import InvitationOpening from "@/components/InvitationOpening";

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
