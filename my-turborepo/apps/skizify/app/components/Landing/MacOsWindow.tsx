"use client"
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Battery, Bell, Github, Wifi } from "lucide-react";
import React, { useEffect, useState } from 'react';


interface Slide {
  id: number;
  title: string;
  description: string;
  content: JSX.Element;
}

const slides: Slide[] = [
  {
    id: 0,
    title: 'Tidy Up',
    description: 'Resize and reorganize your focused window',
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 1 Content</p>
      </div>
    ),
  },
  {
    id: 1,
    title: 'Focus Mode',
    description: 'Keep distractions at bay',
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 2 Content</p>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Work Smart',
    description: 'Automate your tasks with ease',
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 3 Content</p>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Stay Organized',
    description: 'Manage your workflow efficiently',
    content: (
      <div className="text-center">
        <p className="text-xl text-white">Slide 4 Content</p>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Boost Productivity',
    description: 'Optimize your system for speed',
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
    new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  const changeSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-transparent p-8 flex flex-col items-center justify-center">
      {/* Main window container */}

      <div className="w-full max-w-5xl bg-zinc-900/80 rounded-2xl shadow-[0_0_80px_rgba(255,255,255,0.1)] backdrop-blur-xl border border-zinc-800/50 overflow-hidden">
      <div>
        
      </div>
      {/* Window chrome - reduced height */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-zinc-800/50 bg-zinc-900/90">
      <div className="flex items-center">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 hover:bg-green-500 transition-colors" />
        </div>
        
        {/* Simplified menu items */}
        <div className="ml-6 flex gap-6">
        {['Finder', 'File', 'Edit', 'View'].map((item) => (
          <span
          key={item}
          className="text-zinc-400 text-xs font-medium hover:text-white transition-colors cursor-pointer"
          >
          {item}
          </span>
        ))}
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-6">
        {/* GitHub Icon & Count */}
        <div className="flex items-center gap-1">
          <Github className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium text-zinc-400">49</span>
        </div>

        {/* Notification Icon */}
        <div className="flex items-center gap-1">
          <Bell className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium text-zinc-400">1</span>
        </div>

        {/* Lunch Timer */}
        <span className="text-xs font-medium text-zinc-400">Lunch • 37m left</span>

        {/* Wi-Fi & Battery Icons */}
        <Wifi className="w-4 h-4 text-zinc-400" />
        <Battery className="w-4 h-4 text-zinc-400" />

        {/* Date & Time */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-400">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-xs font-medium text-zinc-300">
            {time}
          </span>
        </div>
      </div>
      </div>

      {/* Main content area */}
      <div className="h-[550px] relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-black/70" />

      {/* Carousel Content */}
      <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={activeIndex}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="absolute inset-0 z-10 flex items-center justify-center p-8"
      >
        {slides[activeIndex]?.content}
      </motion.div>
      </AnimatePresence>
        {/* Buttons moved inside the window, positioned at bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((slide, index) => (
          <button
          key={slide.id}
          onClick={() => changeSlide(index)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
          ${
            activeIndex === index
            ? 'bg-white shadow-lg shadow-white/20 scale-110'
            : 'bg-zinc-800/50 hover:bg-zinc-700 hover:scale-105'
          }`}
          >
          <span
            className={`font-medium text-xs ${
            activeIndex === index ? 'text-black' : 'text-zinc-400'
            }`}
          >
            {index + 1}
          </span>
          </button>
        ))}
        </div>
      </div>
      </div>

      {/* Bottom text that updates with each slide */}
      <div className="mt-8 text-center">
      <motion.h2
        key={slides[activeIndex]?.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-bold text-white tracking-tight"
      >
        {slides[activeIndex]?.title}
      </motion.h2>
      <motion.p
        key={slides[activeIndex]?.description}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-lg text-zinc-400 mt-2 font-medium"
      >
        {slides[activeIndex]?.description}
      </motion.p>
      </div>
    </div>
  );
};

export default MacOSWindow;
