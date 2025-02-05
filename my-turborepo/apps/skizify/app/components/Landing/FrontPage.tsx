"use client";

import { Button } from "../ui/button";
import { Spotlight } from "../../../components/ui/spotlight";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* /* Spotlight effect */}
        <Spotlight
          className="-top-40 right-0 md:right-60 md:-bottom-20"
          fill="#878787"
        />


        {/* Navbar */}
      <nav className="absolute left-0 right-0 top-0 mx-auto flex max-w-7xl items-center justify-between p-6">
        <span className="text-xl font-semibold">liveblocks</span>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white">
            Product
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Resources
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Docs
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Pricing
          </a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-gray-300">
            Book a demo
          </Button>
          <Button className="rounded-md bg-white px-6 py-2 text-black">
            Sign in
          </Button>
        </div>
      </nav>

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
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-700">
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
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          Ready-made <br className="hidden md:block" /> collaborative features
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          Liveblocks provides customizable pre-built features that boost user
          engagement by adding collaboration to your product. All without
          derailing your roadmap.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 md:flex-row">
          <Button className="rounded-md bg-white px-6 py-3 text-lg text-black">
            Start today for free
          </Button>
          <Button variant="ghost" className="text-lg text-white">
            Book a demo →
          </Button>
        </div>
      </div>
    </div>
  );
}
