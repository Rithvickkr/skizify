import { ReactNode } from "react";
import { cn } from "../../utils/cn";

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
        "group relative flex h-full border border-neutral-600/40 rounded-lg w-full items-center justify-center overflow-hidden bg-black/60 backdrop-blur-sm transition-all duration-500 hover:border-neutral-500/40",
        classname
      )}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.background = `
          radial-gradient(
            800px circle at ${x}px ${y}px,
            rgba(255, 255, 255, 0.06),
            transparent 40%
          ),
          radial-gradient(
            600px circle at ${x}px ${y}px,
            rgba(255, 255, 255, 0.04),
            transparent 40%
          ),
          rgba(0, 0, 0, 0.6)
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
      }}
    >
      {children}
    </div>
  );
}