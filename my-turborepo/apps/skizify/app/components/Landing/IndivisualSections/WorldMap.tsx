"use client";
import React from "react";
import WorldMap from "../../../../components/ui/world-map";
import { motion } from "motion/react";

const SkizifyGlobalMap = () => {
  return (
    <div className="mx-auto my-72 max-w-full rounded-[40px] border border-neutral-600/40 shadow-[0_0_80px_rgba(255,255,255,0.1)]">
      <div className="relative m-1 rounded-[40px] border border-neutral-600/40 py-20">
        {/* Background WorldMap */}
        <div className="absolute left-0 top-0 z-0 h-full w-full">
          <WorldMap
            dots={[
              {
                start: { lat: 64.2008, lng: -149.4937 },
                end: { lat: 34.0522, lng: -118.2437 },
              },
              {
                start: { lat: 64.2008, lng: -149.4937 },
                end: { lat: -15.7975, lng: -47.8919 },
              },
              {
                start: { lat: -15.7975, lng: -47.8919 },
                end: { lat: 38.7223, lng: -9.1393 },
              },
              {
                start: { lat: 51.5074, lng: -0.1278 },
                end: { lat: 28.6139, lng: 77.209 },
              },
              {
                start: { lat: 28.6139, lng: 77.209 },
                end: { lat: 43.1332, lng: 131.9113 },
              },
              {
                start: { lat: 28.6139, lng: 77.209 },
                end: { lat: -1.2921, lng: 36.8219 },
              },
            ]}
          />
        </div>

        {/* Black Overlay */}
        <div className="absolute left-0 top-0 z-10 h-full w-full rounded-[40px] bg-gradient-to-r from-black from-20% to-black/50"></div>

        {/* Main Content */}
        <div className="relative z-20 mx-auto max-w-7xl text-center">
          {/* Glassmorphic badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm text-white shadow-lg backdrop-blur-lg"
          >
            Global Scale
          </motion.div>

          {/* Main heading with animated text */}
          <h2 className="font-serif mb-4 text-3xl font-medium tracking-tight text-white md:text-6xl">
            Start connecting globally with{" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {"professionals".split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.03 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h2>

          {/* Description with refined styling */}
          <p className="mx-auto mb-8 max-w-2xl text-sm font-light text-gray-300 md:text-lg">
            Skizify connects you with expert professionals across 65+ countries.
            Experience seamless meetings with instant scheduling and premium
            consultation services worldwide.
          </p>

          {/* Feature badges with glass effect */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                text: "Instant Scheduling",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                ),
                text: "Global Network",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
                text: "Verified Professionals",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {feature.icon}
                </svg>
                <span className="text-sm font-light text-white">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkizifyGlobalMap;
