"use client";

import { invitationContent } from "@/lib/invitation-content";

export function openInvitationMap() {
  const query = encodeURIComponent(
    `${invitationContent.event.venueName}, ${invitationContent.event.venueAddress}`,
  );

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${query}`,
    "_blank",
    "noopener,noreferrer",
  );
}
