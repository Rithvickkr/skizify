"use client";

import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "../../../utils/cn";
import { useState } from "react";
import { HoverCard } from "./HoverCard";

// ... (keep the interfaces and data the same)

interface Update {
  status: "off-track" | "at-risk" | "on-track";
  message: string;
  date: string;
}

const updates: Update[] = [
  {
    status: "on-track",
    message: "Launch is confirmed for next Thursday",
    date: "Sep 8",
  },
  {
    status: "at-risk",
    message: "Project timeline needs adjustment",
    date: "Oct 10",
  },
  {
    status: "off-track",
    message: "Unexpected roadblocks encountered",
    date: "Oct 12",
  },
];

const statusConfig = {
  "off-track": {
    icon: XCircle,
    label: "Off track",
    className: "text-red-600",
  },
  "at-risk": {
    icon: AlertTriangle,
    label: "At risk",
    className: "text-yellow-400",
  },
  "on-track": {
    icon: CheckCircle,
    label: "On track",
    className: "text-green-500",
  },
};



export default function ProjectUpdates() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTranslate = (index: number) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const w = window.innerWidth;
    const baseX = w < 640 ? 30 : w < 1024 ? 40 : 60;
    const baseY = w < 640 ? 20 : w < 1024 ? 30 : 35;
    return {
      x: (2 - index) * baseX,
      y: (2 - index) * baseY,
    };
  };

  return (
    <HoverCard classname="h-full w-full bg-black/90 p-4 sm:p-8 rounded-2xl">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="mb-3 text-2xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Project Updates
        </h1>
        <p className="mb-6 text-base text-gray-400 sm:mb-12 sm:text-base">
          Communicate progress with dynamic glass-style cards.
        </p>
        <div className="relative -top-5 h-[250px] [perspective:3000px] [transform-style:preserve-3d] sm:h-[200px] md:h-[180px]">
          {updates.map((update, index) => {
            const status = statusConfig[update.status];
            const Icon = status.icon;
            const isHovered = hoveredIndex === index;
            const { x, y } = getTranslate(index);

            return (
              <div
                key={index}
                className={cn(
                  "absolute flex h-28 w-56 items-center rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 bg-clip-padding shadow-lg backdrop-blur-md backdrop-filter transition-all duration-500 hover:z-10 sm:h-28 sm:w-64 md:h-32 md:w-72",
                  isHovered && "scale-105"
                )}
                style={{
                  transform: `rotateY(35deg) rotateX(-10deg) rotateZ(-7deg)
                    translateX(${(2 - index) * 60}px)
                    translateY(${(2 - index) * 35}px)
                    ${isHovered ? "translateY(-25px)" : ""}`,
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.1),
                    ${
                      isHovered
                        ? "0 30px 60px -20px rgba(0,0,0,0.9)"
                        : "0 15px 30px -10px rgba(0,0,0,0.7)"
                    },
                    inset 0 1px 0 0 rgba(255,255,255,0.1)
                  `,
                  zIndex: 2 - index,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="p-4 sm:p-5 w-full">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-5 w-5", status.className, "filter drop-shadow-glow")} />
                    <span
                      className={cn(
                        "text-base font-semibold",
                        status.className,
                        "filter drop-shadow-glow"
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-light text-white/90 leading-relaxed">
                    {update.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-300/80">{update.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </HoverCard>
  );
}
