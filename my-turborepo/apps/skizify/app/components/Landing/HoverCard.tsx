import { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function HoverCard ({children , classname} : {children : ReactNode; classname?: string}) {
  return (
  <div
    className={cn(
      "group relative h-full w-full bg-black overflow-hidden transition-all duration-300 flex items-center justify-center",
      classname
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
    {children}
  </div>
);
};
