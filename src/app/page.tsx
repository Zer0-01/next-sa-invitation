import BismillahComponent from "@/components/custom/bismillah-component";
import MenjemputComponent from "@/components/custom/menjemput-component";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
      {/* Left spacer (hidden on small screens) */}
      <div className="hidden md:block" />
      {/* Center content */}
      <div >
        <BismillahComponent />
        <MenjemputComponent />
      </div>

      {/* Right spacer (hidden on small screens) */}
      <div className="hidden md:block" />
    </main>

  );
}
