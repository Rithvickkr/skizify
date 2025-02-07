import BentoGridLandingDemo from "../components/Landing/Bento/BentoGridLandingPage";
import DisplayCardBento from "../components/Landing/DisplayCardBento";
import Frontpage from "../components/Landing/FrontPage";
import WorldMapDemo from "../components/Landing/IndivisualSections/WorldMap";
import MacOSWindow from "../components/Landing/MacOsWindow";
import NavbarLanding from "../components/Landing/Navbar";

export default function Home() {
  return (
    <main className="relative font-mono min-h-screen w-screen overflow-x-hidden bg-black">
      <NavbarLanding />
      <Frontpage />
      <MacOSWindow />
      <div className="mx-auto max-w-[80%]">
        <div className="mt-20">
          {/* <BentoLanding /> */}
          <BentoGridLandingDemo />
        </div>
        <DisplayCardBento />
      </div>
      <WorldMapDemo />
      {/* <Robot /> */}
    </main>
  );
}
