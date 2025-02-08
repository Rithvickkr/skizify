"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export const NavbarLanding = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed z-20 left-0 right-0 top-6 mx-auto max-w-5xl items-center justify-between px-6 py-4 rounded-xl transition-all duration-500 border border-transparent ${hasScrolled ? 'backdrop-blur-xl bg-black/10  border-white/10' : ''}`}>
      <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link
        href="/explore"
        aria-label="Explore Skizify"
        className="font-serif text-2xl font-bold tracking-tighter hover:text-gray-200 transition-all duration-300 ease-in-out"
        >
        Skizify
        </Link>
      </div>
      
      <div className="hidden md:flex space-x-10">
        <a href="#" className="text-sm font-medium text-gray-300/90 hover:text-white transition-all duration-300">Product</a>
        <a href="#" className="text-sm font-medium text-gray-300/90 hover:text-white transition-all duration-300">Resources</a>
        <a href="#" className="text-sm font-medium text-gray-300/90 hover:text-white transition-all duration-300">Docs</a>
        <a href="#" className="text-sm font-medium text-gray-300/90 hover:text-white transition-all duration-300">Pricing</a>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-sm font-medium text-gray-200 hover:text-white transition-all duration-300">
        Book a demo
        </button>
        <Link
        href="/signin"
        className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg"
        >
        Sign in
        </Link>
      </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
