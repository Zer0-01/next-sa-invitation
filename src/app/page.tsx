import InfoComponent from "./components/info-component";
import InviteComponent from "./components/invite-component";
import TitleComponent from "./components/title-component";

export default function Home() {
  return (
    <div>
      <TitleComponent />
      <InviteComponent />
      <InfoComponent />
    </div>

  );
}
