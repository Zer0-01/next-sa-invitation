import { ContactScene } from "@/components/invitation/contact-scene";
import { GiftScene } from "@/components/invitation/gift-scene";
import { InvitationHero } from "@/components/invitation/invitation-hero";
import { InvitationScenes } from "@/components/invitation/invitation-scenes";
import { MessagesScene } from "@/components/invitation/messages-scene";
import { RSVPScene } from "@/components/invitation/rsvp-scene";

export function WeddingInvitationPage() {
  return (
    <div className="overflow-x-clip text-[12px] text-foreground">
      <InvitationHero />
      <InvitationScenes />
      <RSVPScene />
      <MessagesScene />
      <GiftScene />
      <ContactScene />
    </div>
  );
}
