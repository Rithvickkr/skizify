"use client";
import React from "react";
import { SiGooglecalendar, SiZoom } from "react-icons/si";
import { BsCalendarDate } from "react-icons/bs";
import { motion } from "framer-motion";
import { Icons } from "../../footer/Footer";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { when: "beforeChildren", duration: 0.8, ease: "backOut", staggerChildren: 0.2 },
  },
};

const ringItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SocialRings = () => {
  return (
    <motion.div
      className="relative rounded-2xl flex items-center h-full justify-center shadow-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background image with darker overlay */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          backgroundImage: "url('/retrofuture2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          filter: "grayscale(50%)",
        }}
      />
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_85px_rgba(0,0,0,0.7)]" />
      <div className="absolute inset-0 bg-neutral-700 opacity-20 blur-2xl"></div>
      <div className="absolute inset-0 opacity-60 mix-blend-overlay">
        <div
          className="animate-grain absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=')",
          }}
        ></div>
      </div>

      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-transparent">
        {/* Background layers */}
        <div className="relative aspect-square w-full"></div>

        {/* Middle ring with a steel border and deeper shadow */}
        <div
          className="absolute animate-[spin_10s_linear_infinite] rounded-full border-2 border-gray-400/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          style={{
            top: "15%",
            left: "15%",
            right: "15%",
            bottom: "15%",
          }}
        >
          {["top", "bottom", "left", "right"].map((position) => {
            const positionStyles = {
              top: position === "top" ? "-20px" : "auto",
              bottom: position === "bottom" ? "-20px" : "auto",
              left: position === "left" ? "-20px" : "auto",
              right: position === "right" ? "-20px" : "auto",
              [position === "left" || position === "right" ? "top" : "left"]: "45%",
              transform: "rotate(var(--rotation))",
              "--rotation":
                position === "top"
                  ? "0deg"
                  : position === "right"
                  ? "90deg"
                  : position === "bottom"
                  ? "180deg"
                  : position === "left"
                  ? "270deg"
                  : "0deg",
            };

            return (
              <motion.div
                key={position}
                className="absolute"
                style={positionStyles}
                variants={ringItemVariants}
              >
                <div className="rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-3 shadow-2xl">
                  {position === "top" && (
                    <div className="rounded-md text-white/80 backdrop-blur-sm transition-all hover:text-white">
                      <Icons.x className="size-5 text-neutral-100" />
                    </div>
                  )}
                  {position === "bottom" && (
                    <div className="rounded-md text-white/80 backdrop-blur-sm transition-all hover:text-white">
                      <SiGooglecalendar className="h-6 w-6 text-neutral-100" />
                    </div>
                  )}
                  {position === "left" && (
                    <div className="rounded-md text-white/80 backdrop-blur-sm transition-all hover:text-white">
                      <SiZoom className="h-6 w-6 text-neutral-100" />
                    </div>
                  )}
                  {position === "right" && (
                    <div className="rounded-md text-white/80 backdrop-blur-sm transition-all hover:text-white">
                      <BsCalendarDate className="h-6 w-6 text-neutral-100" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Smallest ring */}
        <motion.div
          className="absolute animate-[spin_15s_linear_infinite] rounded-full border-2 border-neutral-500/30 shadow-[0_0_15px_rgba(75,85,99,0.5)]"
          style={{
            top: "30%",
            left: "30%",
            right: "30%",
            bottom: "30%",
          }}
          variants={ringItemVariants}
        >
          <div
            className="absolute left-[-20px] top-[45%]"
            style={{ transform: "rotate(-90deg)" }}
          >
            <div className="rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-3 shadow-2xl">
              <div className="rounded-md text-white/80 backdrop-blur-sm transition-all hover:text-white">
                <SiGooglecalendar className="h-6 w-6 text-neutral-100" />
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-[20%] right-[-20px]"
            style={{ transform: "rotate(110deg)" }}
          >
            <div className="rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-3 shadow-2xl">
              <div className="rounded-md text-white/80 backdrop-blur-sm transition-all hover:text-white">
                <SiZoom className="h-6 w-6 text-neutral-100" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom text */}
        <div className="absolute bottom-8 left-8 z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-neutral-400"
          >
            Connect with your favorite platforms
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs text-neutral-500"
          >
            Integrate calendars, meetings, and social media in one place
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialRings;
