'use client'
// import Footer from "@/components/Footer2";

import { useEffect } from "react";
import Lenis from 'lenis';
import Footer1 from "../components/footer/Footer1";
import LandingPage from "../components/Landing/Earth";

export default function Home() {

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      <LandingPage />
      <Footer1 />
    </main>
  );
}