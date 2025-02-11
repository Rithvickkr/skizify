import Footer1 from "../components/footer/Footer1";
import BentoGridLandingDemo from "../components/Landing/Bento/BentoGridLandingPage";
import BentoTry from "../components/Landing/Bento/BentoTry";
import DisplayCardBento from "../components/Landing/DisplayCardBento";
import Frontpage from "../components/Landing/FrontPage";
import FAQ from "../components/Landing/IndivisualSections/FaQ";
import WorldMapDemo from "../components/Landing/IndivisualSections/WorldMap";
import MacOSWindow from "../components/Landing/MacOsWindow";
import NavbarLanding from "../components/Landing/Navbar";

export default function Home() {
  return (
    <main className="relative font-inter min-h-screen w-screen overflow-x-hidden bg-black no-scrollbar scroll-smooth">
      <NavbarLanding />
      <Frontpage />
      {/* <MacOSWindow /> */}
      <div className="mx-auto max-w-5xl">
        <div className="mt-20">
          {/* <BentoLanding /> */}
          <BentoGridLandingDemo />
          <BentoTry />
          <FAQ />
        </div>
        {/* <DisplayCardBento /> */}
      </div>
      {/* <WorldMapDemo /> */}

      {/* <Robot /> */}
      <Footer1 />
    </main>
  );
}
