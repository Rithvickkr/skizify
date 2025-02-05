"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

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

  const changeSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-black p-8 flex flex-col items-center justify-center">
      {/* Main window container */}
      <div className="w-full max-w-4xl bg-zinc-900/90 rounded-xl shadow-2xl backdrop-blur-md border border-zinc-800 overflow-hidden">
        {/* Window chrome */}
        <div className="h-12 px-4 flex items-center border-b border-zinc-800">
          {/* Traffic lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          
          {/* Menu items */}
          <div className="ml-6 flex gap-6">
            {['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((item) => (
              <span
                key={item}
                className="text-zinc-400 text-sm hover:text-white cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Right side status icons */}
          <div className="ml-auto flex items-center gap-4 text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hover:text-white transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01M12 20v.01"
                />
              </svg>
              49
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Lunch • 37m left
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hover:text-white transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 hover:text-white transition-colors cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>
        </div>

        {/* Main content area */}
        <div className="h-96 relative overflow-hidden">
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
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10 flex items-center justify-center p-4"
            >
              {slides[activeIndex]?.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom toolbar with refined carousel buttons */}
        <div className="p-4 flex justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => changeSlide(index)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 
                ${
                  activeIndex === index
                    ? 'border-white shadow-lg'
                    : 'border-transparent bg-zinc-800 hover:bg-zinc-700'
                }`}
            >
              <span
                className={`font-medium text-sm ${
                  activeIndex === index ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom text that updates with each slide */}
      <div className="mt-6 text-center">
        <motion.h2
          key={slides[activeIndex]?.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-2xl font-semibold text-white"
        >
          {slides[activeIndex]?.title}
        </motion.h2>
        <motion.p
          key={slides[activeIndex]?.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="text-base text-zinc-400 mt-1"
        >
          {slides[activeIndex]?.description}
        </motion.p>
      </div>
    </div>
  );
};

export default MacOSWindow;
