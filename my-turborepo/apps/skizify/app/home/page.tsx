import { Text } from "lucide-react";
import BentoGridLandingDemo from "../components/Landing/BentoGridLandingPage";
import NavbarLanding from "../components/Landing/Navbar";
import { TextRevealDemo } from "../components/Landing/TextReveal";
import { Robot } from "../components/Landing/Robot";
import Earth from "../components/Landing/Earth";
import Frontpage from "../components/Landing/FrontPage";
import MacOSWindow from "../components/Landing/MacOsWindow";
import Spline from "@splinetool/react-spline";
import { BentoLanding } from "../components/Landing/BentoLanding";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black w-screen overflow-x-hidden">
        <NavbarLanding />
      <Frontpage />
      <MacOSWindow />
      <div className="mx-auto max-w-[80%]">
        <div className="mt-20">
          {/* <BentoLanding /> */}
          <BentoGridLandingDemo />
        </div>
      </div>
        {/* <Robot /> */}

  
    </main>
  );
}
