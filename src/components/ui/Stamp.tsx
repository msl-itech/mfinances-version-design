import React from "react";
import { cn } from "@/lib/utils";

interface StampProps {
  className?: string;
  text?: string;
}

export default function Stamp({ className, text = "MFINANCES • PILOTAGE EXPERT •" }: StampProps) {
  // SVG Text Path for circular text
  return (
    <div className={cn("relative flex items-center justify-center w-32 h-32 select-none pointer-events-none", className)}>
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-accent overflow-visible">
          <path
            id="textPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="transparent"
          />
          <text className="text-[12px] font-display font-bold uppercase tracking-[0.2em]">
            <textPath href="#textPath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
      <div className="w-2.5 h-2.5 rounded-full bg-accent relative z-10" />
    </div>
  );
}
