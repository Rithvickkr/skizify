import { ReactNode } from "react";
import { cn } from "../../utils/cn";
// import { GlowingEffect } from "../../../components/ui/glowing-effect";

export function HoverCard({
  children,
  classname,
}: {
  children: ReactNode;
  classname?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full w-full items-center justify-center overflow-hidden bg-black transition-all duration-300",
        classname,
      )}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 90%)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "";
      }}
    >
      {/* <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      /> */}

      {children}
    </div>
  );
}
