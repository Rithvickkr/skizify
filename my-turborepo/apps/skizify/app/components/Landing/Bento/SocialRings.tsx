"use client";
import React from "react";
import { Twitter, Linkedin, Facebook, Youtube, Twitch } from "lucide-react";
import { Icons } from "../../footer/Footer";
import { SiGooglecalendar, SiZoom } from "react-icons/si";
import { BsCalendarDate } from "react-icons/bs";
import { motion } from "framer-motion";

const SocialRings = () => {
  return (
    <div className="relative flex items-center rounded-2xl justify-center overflow-hidden bg-gradient-to-br from-neutral-950 to-black">
      {/* Background remains the same */}
      <div className="absolute inset-0 opacity-50 mix-blend-overlay">
        <div className="animate-grain absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCI+PC9mZVR1cmJ1bGVuY2U+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=')]"></div>
      </div>
      <div className="absolute inset-0  " />
      <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/retrofuture2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
              }}
            />

            <div className="absolute inset-0 shadow-[inset_0_0_55px_rgba(75,85,99,0.5)]" />

      {/* <div className="absolute inset-0 bg-neutral-600/70" /> */}

      <div className="relative aspect-square w-full"></div>
      <div className="absolute inset-0 rounded-full bg-neutral-600 opacity-20 blur-2xl"></div>

      {/* Middle ring */}
      <div
        className="absolute animate-[spin_10s_linear_infinite] rounded-full border-2 border-neutral-500/30 shadow-[0_2px_85px_rgba(75,85,99,0.5)]"
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
            [position === "left" || position === "right" ? "top" : "left"]:
              "45%",
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
            <div key={position} className="absolute" style={positionStyles}>
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
            </div>
          );
        })}
      </div>

      {/* Smallest ring */}
      <div
        className="absolute animate-[spin_15s_linear_infinite] rounded-full border-2 border-neutral-500/30 shadow-[0_0_15px_rgba(75,85,99,0.5)]"
        style={{
          top: "30%",
          left: "30%",
          right: "30%",
          bottom: "30%",
        }}
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
      </div>
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
  );
};

export default SocialRings;
