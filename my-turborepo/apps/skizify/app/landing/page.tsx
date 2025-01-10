'use client'
// import Footer from "@/components/Footer2";
import Landing from "../components/Landing/LandingFor_Footer";
import { useEffect } from "react";
import Lenis from 'lenis';
import Footer1 from "../components/footer/Footer1";

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
      <Landing />
      <Footer1 />
    </main>
  );
}