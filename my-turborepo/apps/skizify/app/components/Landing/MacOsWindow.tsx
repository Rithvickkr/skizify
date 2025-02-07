"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Battery, Bell, Wifi } from "lucide-react";
import { Icons } from "../footer/Footer";

interface Slide {
  id: number;
  title: string;
  description: string;
  content: JSX.Element;
}

const slides: Slide[] = [
  {
    id: 0,
    title: "Tidy Up",
    description: "Resize and reorganize your focused window",
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 1 Content</p>
      </div>
    ),
  },
  {
    id: 1,
    title: "Focus Mode",
    description: "Keep distractions at bay",
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 2 Content</p>
      </div>
    ),
  },
  {
    id: 2,
    title: "Work Smart",
    description: "Automate your tasks with ease",
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 3 Content</p>
      </div>
    ),
  },
  {
    id: 3,
    title: "Stay Organized",
    description: "Manage your workflow efficiently",
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 4 Content</p>
      </div>
    ),
  },
  {
    id: 4,
    title: "Boost Productivity",
    description: "Optimize your system for speed",
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 5 Content</p>
      </div>
    ),
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const MacOSWindow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent p-4 sm:p-8">
      {/* Main window container */}
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/80 shadow-[0_0_80px_rgba(255,255,255,0.1)] backdrop-blur-xl">
        {/* Window chrome */}
        <div className="rounded-2xl p-2 sm:p-1">
          <div className="flex h-10 items-center justify-between rounded-t-xl border-b border-zinc-800/50 bg-zinc-900/90 px-2 sm:px-4">
            <div className="flex items-center">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 transition-colors hover:bg-red-600" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400 transition-colors hover:bg-amber-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 transition-colors hover:bg-green-500" />
              </div>
              {/* Simplified menu items */}
              <div className="ml-4 sm:ml-6 flex gap-4 sm:gap-6">
                {["Finder", "File", "Edit", "View"].map((item) => (
                  <span
                    key={item}
                    className="cursor-pointer text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {/* Right side items */}
            <div className="flex items-center gap-2 sm:gap-6">
              {/* GitHub Icon & Count */}
              <div className="flex items-center gap-1">
                <Icons.github className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-medium text-zinc-400">49</span>
              </div>
              {/* Notification Icon */}
              <div className="flex items-center gap-1">
                <Bell className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-medium text-zinc-400">1</span>
              </div>
              {/* Lunch Timer */}
              <span className="hidden sm:inline text-xs font-medium text-zinc-400">
                Lunch • 37m left
              </span>
              {/* Wi-Fi & Battery Icons */}
              <Wifi className="h-4 w-4 text-zinc-400" />
              <Battery className="h-4 w-4 text-zinc-400" />
              {/* Date & Time */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs font-medium text-zinc-400">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-xs font-medium text-zinc-300">{time}</span>
              </div>
            </div>
          </div>
          {/* Main content area */}
          <div
            className="relative overflow-hidden rounded-b-xl bg-gradient-to-br from-zinc-900 to-black h-[400px] sm:h-[650px]"
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-800/10 to-black/40 backdrop-blur-sm" />
            {/* Carousel Content */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/retrofuture.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
              }}
            />
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-8"
              >
                {slides[activeIndex]?.content}
              </motion.div>
            </AnimatePresence>
            {/* Navigation Buttons */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:gap-3">
              <div className="border flex gap-1 sm:gap-2 border-neutral-600/40 p-1 sm:p-2 rounded-xl md:rounded-3xl">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => changeSlide(index)}
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg md:rounded-2xl backdrop-blur-lg transition-all duration-500 ${
                      activeIndex === index
                        ? "scale-110 border border-white/20 bg-gradient-to-br from-white/70 to-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "border border-zinc-700/20 bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 hover:scale-105 hover:from-zinc-700/30 hover:to-zinc-800/30"
                    }`}
                  >
                    <span
                      className={`transform text-xs sm:text-sm font-semibold transition-all duration-500 ${
                        activeIndex === index
                          ? "scale-110 text-black"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom text that updates with each slide */}
      <div className="mt-4 sm:mt-8 text-center px-2">
        <motion.h2
          key={slides[activeIndex]?.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
        >
          {slides[activeIndex]?.title}
        </motion.h2>
        <motion.p
          key={slides[activeIndex]?.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-1 sm:mt-2 text-base sm:text-lg font-medium text-zinc-400"
        >
          {slides[activeIndex]?.description}
        </motion.p>
      </div>
    </div>
  );
};

export default MacOSWindow;
