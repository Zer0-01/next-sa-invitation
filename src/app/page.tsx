import CarouselComponent from "./components/carousel-component";
import CountdownComponent from "./components/countdown-component";
import DoaComponent from "./components/doa-component";
import InfoComponent from "./components/info-component";
import InviteComponent from "./components/invite-component";
import MessageComponent from "./components/message-component";
import ProgrammeComponent from "./components/programme-component";
import TitleComponent from "./components/title-component";

export default function Home() {
  return (
    <div>
      <TitleComponent />
      <InviteComponent />
      <InfoComponent />
      <ProgrammeComponent />
      <DoaComponent />
      <CountdownComponent />
      <CarouselComponent />
      <MessageComponent />
    </div>

  );
}
