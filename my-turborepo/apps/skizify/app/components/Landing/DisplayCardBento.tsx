"use client";

import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "../../utils/cn";
import { useState } from "react";

interface Update {
  status: "off-track" | "at-risk" | "on-track";
  message: string;
  date: string;
}

const updates: Update[] = [
  {
    status: "on-track",
    message: "We are ready to launch next Thursday",
    date: "Sep 8",
  },
  {
    status: "at-risk",
    message: "Project timeline needs adjustment",
    date: "Oct 10",
  },
  {
    status: "off-track",
    message: "Unexpected roadblocks forced us to take a different...",
    date: "Oct 12",
  },
];

const statusConfig = {
  "off-track": {
    icon: XCircle,
    label: "Off track",
    className: "text-red-500 transition-colors",
  },
  "at-risk": {
    icon: AlertTriangle,
    label: "At risk",
    className: "text-yellow-500 transition-colors",
  },
  "on-track": {
    icon: CheckCircle,
    label: "On track",
    className: "text-green-500 transition-colors",
  },
};

export default function ProjectUpdates() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-black p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-3 text-4xl font-semibold text-white">
          Project updates
        </h1>
        <p className="mb-12 text-xl text-gray-400">
          Communicate progress and project health with built-in project updates.
        </p>
        <div className="relative h-[100px] [perspective:3000px] [transform-style:preserve-3d]">
          <div className="absolute top-[10%] [transform-style:preserve-3d]">
            {updates.map((update, index) => {
              const status = statusConfig[update.status];
              const Icon = status.icon;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  className={cn(
                    "absolute flex h-[150px] w-[350px] cursor-pointer items-center rounded-xl border border-white/10 bg-gradient-to-r from-black/30 from-40% via-white/5 via-100% to-black p-8 backdrop-blur-md",
                    "transition-all duration-1000 ease-in-out [transform-style:preserve-3d] hover:z-10",
                  )}
                  style={{
                    transform: `
                                        rotateY(35deg)
                                        rotateX(-10deg)
                                        rotateZ(-7deg)
                                        translateX(${(2 - index) * 60}px)
                                        translateY(${(2 - index) * 35}px)
                                        ${isHovered ? "translateY(-60px)" : "translateY(0px)"}
                                    `,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: `
                                        0 0 0 1px rgba(255,255,255,0.05),
                                        ${
                                          isHovered
                                            ? "0 35px 70px -15px rgba(0,0,0,0.7)"
                                            : "0 20px 40px -10px rgba(0,0,0,0.5)"
                                        },
                                        inset 0 1px 0 0 rgba(255,255,255,0.05)
                                    `,
                    zIndex: 2 - index,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="relative grayscale [transform-style:preserve-3d] first:grayscale-0 hover:grayscale-0"
                    style={{
                      transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-5 w-5", status.className)} />
                      <span className={cn("font-medium", status.className)}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text- mt-2 text-white">{update.message}</p>
                    <p className="mt-1 text-sm text-zinc-400">{update.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
