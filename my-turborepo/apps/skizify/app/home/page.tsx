import BentoGridLandingDemo from "../components/Landing/BentoGridLandingPage";
import NavbarLanding from "../components/Landing/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <div className="mx-auto">
        <NavbarLanding />
      </div>
      <div className="mx-auto max-w-[80%]">
        <div className="mt-20">
          <BentoGridLandingDemo />
        </div>
      </div>
    </main>
  );
}
