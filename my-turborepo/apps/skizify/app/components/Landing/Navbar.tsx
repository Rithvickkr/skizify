"use client";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <nav
      className={`fixed z-50 mt-1 w-full bg-black/60 text-white shadow-sm backdrop-blur-md transition-all duration-300 dark:text-white`}
    >
      <div
        className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${
          hasScrolled ? "rounded-lg border border-white/10" : "border-black"
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="mr-2 grayscale filter"
              src="https://yt3.googleusercontent.com/GNt5K7oUcfQu19zcnlknUlpfFDJF1bLWhp_gFkBqkYZfXBO0pEd4L5gPeOWawOSc3UOUOHEHLw=s160-c-k-c0x00ffffff-no-rj"
              alt=""
              width={40}
              height={40}
            />
            <Link
              href="/explore"
              aria-label="Explore Skizify"
              className="font-serif text-2xl font-normal transition-opacity hover:opacity-90 focus:opacity-90"
            >
              Skizify
            </Link>
          </div>

          <div>
            <Link
              href="/signin"
              className="ml-2 rounded-md bg-white px-4 py-2 text-sm text-black opacity-85 hover:opacity-100"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
