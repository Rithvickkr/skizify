"use client";

import { Button } from "../ui/button";
import { Spotlight } from "../../../components/ui/spotlight";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent text-white">
      <Spotlight
        className="-top-40 right-0 md:right-60 md:-bottom-20"
        fill="#878787"
      />

{/* <Spline
        className="absolute inset-0 object-cover " // Added scale-125 to make it 25% larger
        scene="https://prod.spline.design/gVruKhRHEFS5vuGw/scene.splinecode" 
      />
 */}


      

      {/* Hero Section */}
      <div className=" px-6 relative text-center">
        <div className="flex justify-center mb-7">
          <a
            href="#"
            className="group flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-1 py-1.5 backdrop-blur-sm relative transition-all duration-300 hover:border-white/20 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-neutral-700 shadow-md shadow-white/50">
              New
            </span>
            <span className="text-sm text-neutral-300">
              AI Copilots ready to drop into your app
            </span>
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20">
              <ArrowRight
          className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-300 left-1`}
              />
            </div>
          </a>
        </div>
        <h1 className="text-5xl font-bold font-inter leading-tight md:text-7xl bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent">
          Ready-made <br className="hidden md:block" /> collaborative features
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          Liveblocks provides customizable pre-built features that boost user
          engagement by adding collaboration to your product. All without
          derailing your roadmap.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 md:flex-row">
          <Button  variant="gooeyLeft" className="rounded-md bg-white px-6 py-3 text-lg text-black">
            Start today for free
          </Button>
            <Button 
            variant="gooeyRight" 
            className="text-lg text- bg-black relative group overflow-hidden transition-all duration-300 bg-gradient-to-r from-white/5 to-white/10 "
            >
            <span className="relative z-10 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
              Book a demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-white/5 to-white/10 transition-transform duration-500" />
            </Button>
        </div>
      </div>
    </div>
  );
}
