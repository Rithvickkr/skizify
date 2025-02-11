"use client";

import * as React from "react";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../@/components/ui/tooltip";
import {
  Facebook,
  Instagram,
  Linkedin,
  Moon,
  Send,
  Sun,
  Twitter,
  Boxes,
  Terminal,
  Cpu,
  BrainCircuit as Circuit,
  Power,
  Hexagon,
  Sparkles,
  Zap,
  Orbit,
} from "lucide-react";
import { motion } from "framer-motion";
import { Icons, renderDropdown } from "./Footer";

function Footerdemo() {
  const [hoverEffect, setHoverEffect] = React.useState({ x: 0, y: 0 });
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Submitted email:", email);
  };

  // Always add dark mode class once on mount
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverEffect({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer className="relative w-full border-t border-gray-600/10 bg-transparent text-foreground">
      <div
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        onMouseMove={handleMouseMove}
      >
        {/* Logo Section */}
        <div className="mb-16 flex flex-col items-center justify-center">
          <div className="group relative">
            <div className="flex items-center space-x-3">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                <Hexagon className="h-12 w-12 text-gray-200 opacity-50 transition-all duration-700 group-hover:rotate-180 group-hover:opacity-100" />
                <Circuit className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-gray-200 transition-all duration-700 group-hover:rotate-90" />
                <Orbit className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200/20 transition-all duration-1000 group-hover:rotate-180 group-hover:scale-105" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
                <span className="bg-gradient-to-r from-gray-200 to-gray-200/60 bg-clip-text text-transparent">
                  SKiz
                </span>
                <span className="text-gray-200/60">ify</span>
                <Sparkles className="absolute -right-8 -top-4 h-6 w-6 text-gray-200/40 transition-all duration-500 group-hover:text-gray-200/80" />
              </h1>
            </div>
            <div className="absolute -inset-x-4 -inset-y-2 rounded-xl border border-gray-600/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />
          </div>
        </div>

        <div className="grid gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="group relative">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
                <div className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-gray-400 transition-all duration-500 group-hover:rotate-12 group-hover:text-gray-200" />
                  <span className="bg-gradient-to-r from-gray-200 via-gray-200/80 to-gray-200/60 bg-clip-text text-transparent">
                    Join the Future
                  </span>
                </div>
              </h2>
              <p className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-200/80">
                Subscribe to unlock next-generation innovations.
              </p>

              <form className="relative mt-6" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full border-gray-600/10 bg-white/30 px-4 pr-12 backdrop-blur-md transition-all duration-300 placeholder:text-gray-400 hover:border-gray-600/30 focus:border-gray-200"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 rounded-md border border-gray-600/10 bg-background text-gray-200 transition-all duration-500 hover:scale-105 hover:border-gray-600/30 hover:bg-gray-200 hover:text-background"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="flex items-center space-x-2 text-xl font-semibold tracking-tight">
              <Terminal className="h-5 w-5 text-gray-400" />
              <span>Navigation</span>
            </h3>
            <nav className="space-y-1">
              {[
                {
                  text: "Quantum Solutions",
                  icon: <Cpu className="h-4 w-4" />,
                },
                {
                  text: "Neural Networks",
                  icon: <Circuit className="h-4 w-4" />,
                },
                { text: "AI Systems", icon: <Boxes className="h-4 w-4" /> },
                { text: "Cyber Security", icon: <Power className="h-4 w-4" /> },
                { text: "Research Lab", icon: <Orbit className="h-4 w-4" /> },
              ].map((link) => (
                <a
                  key={link.text}
                  href="#"
                  className="group flex items-center space-x-2 rounded-md border border-transparent p-2 transition-all duration-300 hover:border-gray-600/10 hover:bg-gray-200/5"
                >
                  <span className="text-gray-400 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:text-gray-200">
                    {link.icon}
                  </span>
                  <span className="text-sm transition-colors duration-300 group-hover:text-gray-200">
                    {link.text}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="flex items-center space-x-2 text-xl font-semibold tracking-tight">
              <Circuit className="h-5 w-5 text-gray-400" />
              <span>Quantum Hub</span>
            </h3>
            <address className="space-y-4 not-italic text-sm">
              <div className="space-y-2 text-gray-400">
                {[
                  "SKizify Innovation Complex",
                  "Quantum Valley, Neo District",
                  "connect@skizify.quantum",
                ].map((line) => (
                  <p
                    key={line}
                    className="group flex items-center space-x-2 transition-colors duration-300 hover:text-gray-200"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      {line}
                    </span>
                  </p>
                ))}
              </div>
            </address>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="flex items-center space-x-2 text-xl font-semibold tracking-tight">
              <Sparkles className="h-5 w-5 text-gray-400" />
              <span>Connect</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {renderDropdown("github", Icons.github)}
              {renderDropdown("linkedin", Icons.linkedin)}
              {renderDropdown("x", Icons.x)}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-gray-600/10 pt-8 text-center md:flex-row md:justify-between">
          <p className="text-sm text-gray-400">
            © 2024 SKizify. Pioneering the quantum frontier.
          </p>
          <nav className="flex gap-6 text-sm">
            {["Terms", "Privacy", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                className="group relative text-gray-400 transition-colors duration-300 hover:text-gray-200"
              >
                <span className="relative">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gray-200 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footerdemo;
