import BismillahComponent from "@/components/custom/bismillah-component";
import CountdownComponent from "@/components/custom/countdown-component";
import DateComponent from "@/components/custom/date-component";
import DoaComponent from "@/components/custom/doa-component";
import MenjemputComponent from "@/components/custom/menjemput-component";
import TimeComponent from "@/components/custom/time-component";
import VenueComponent from "@/components/custom/venue-component";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
      {/* Left spacer (hidden on small screens) */}
      <div className="hidden md:block" />
      {/* Center content */}
      <div >
        <BismillahComponent />
        <MenjemputComponent />
        <DateComponent />
        <TimeComponent />
        <VenueComponent />
        <CountdownComponent />
        <DoaComponent />
      </div>

      {/* Right spacer (hidden on small screens) */}
      <div className="hidden md:block" />
    </main>

  );
}
