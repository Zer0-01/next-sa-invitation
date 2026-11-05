import type { Metadata } from "next";
import InvitationOpening from "@/components/InvitationOpening";
import { invitationContent } from "@/lib/invitation-content";

const { groom, bride } = invitationContent.couple;
const { event } = invitationContent;

const shareTitle = `${event.label} ${groom.shortName} & ${bride.shortName} · ${event.shortDate}`;
const shareDescription = `Dengan penuh kesyukuran, kami menjemput anda ke majlis perkahwinan ${groom.shortName} & ${bride.shortName} pada ${event.date} di ${event.venueName}, ${event.venueArea}.`;

/**
 * Absolute base URL for share previews (WhatsApp needs a full image URL).
 * Set NEXT_PUBLIC_SITE_URL to the live domain; Vercel's production URL is
 * used as a fallback when deployed there.
 */
function getSiteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);

  return configured ? new URL(configured) : undefined;
}

// The preview image itself comes from opengraph-image.jpg next to this file.
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: `${groom.shortName} & ${bride.shortName} | Undangan Perkahwinan`,
  description: shareDescription,
  openGraph: {
    type: "website",
    locale: "ms_MY",
    title: shareTitle,
    description: shareDescription,
    siteName: `${groom.shortName} & ${bride.shortName}`,
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
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
