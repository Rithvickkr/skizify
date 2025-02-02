import { Text } from "lucide-react";
import BentoGridLandingDemo from "../components/Landing/BentoGridLandingPage";
import BlurBottomScreen from "../components/Landing/BlurBottomScreen";
import NavbarLanding from "../components/Landing/Navbar";
import { TextRevealDemo } from "../components/Landing/TextReveal";
import { Robot } from "../components/Landing/Robot";
import Earth from "../components/Landing/Earth";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavbarLanding />
        <BlurBottomScreen />
      <div className="mx-auto max-w-[80%]">
        <div className="mt-20">
          <BentoGridLandingDemo />
        </div>
      </div>
        <Robot />
      <div className="text-yellow-500">
          <TextRevealDemo />
      </div>

      <Earth/>
  
    </main>
  );
}
