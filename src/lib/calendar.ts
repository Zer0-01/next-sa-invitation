"use client";

import { invitationContent } from "@/lib/invitation-content";

export function downloadInvitationCalendarEvent() {
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:The Wedding of ${invitationContent.couple.groom.shortName} & ${invitationContent.couple.bride.shortName}
DESCRIPTION:Join us in celebrating the wedding of ${invitationContent.couple.groom.shortName} & ${invitationContent.couple.bride.shortName}.
LOCATION:${invitationContent.event.venueName}, ${invitationContent.event.venueAddress}
DTSTART:${invitationContent.event.icsStart}
DTEND:${invitationContent.event.icsEnd}
END:VEVENT
END:VCALENDAR
`;

  const blob = new Blob([icsContent.trim()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-invitation.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function openInvitationGoogleCalendar() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `The Wedding of ${invitationContent.couple.groom.shortName} & ${invitationContent.couple.bride.shortName}`,
    dates: invitationContent.event.googleCalendarDates,
    details: invitationContent.intro,
    location: `${invitationContent.event.venueName}, ${invitationContent.event.venueAddress}`,
  });

  window.open(`https://www.google.com/calendar/render?${params.toString()}`, "_blank", "noopener,noreferrer");
}
