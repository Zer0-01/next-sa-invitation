import DateSection from "../sections/date-section";
import FooterSection from "../sections/footer-section";
import GallerySection from "../sections/gallery-section";
import GiftSection from "../sections/gift-section";
import GreetingSection from "../sections/greeting-section";
import HeroSection from "../sections/hero-section";
import ProgrammeSection from "../sections/programme-section";
import RSVPSection from "../sections/rsvp-section";
import VenueSection from "../sections/venue-section";
import SectionSeparator from "@/components/section-separator";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SectionSeparator />
      <DateSection />
      <SectionSeparator />
      <GreetingSection />
      <SectionSeparator />
      <VenueSection />
      <SectionSeparator />
      <ProgrammeSection />
      <SectionSeparator />
      <GallerySection />
      <SectionSeparator />
      <RSVPSection />
      <SectionSeparator />
      <GiftSection />
      <SectionSeparator />
      <FooterSection />
    </div>
  );
}
