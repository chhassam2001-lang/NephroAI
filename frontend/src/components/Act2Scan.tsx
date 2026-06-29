"use client";

import { forwardRef } from "react";

const Act2Scan = forwardRef<HTMLDivElement>(function Act2Scan(_, ref) {
  return (
    <div ref={ref} className="act-overlay" style={{ opacity: 0 }}>
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Three words in staggered layout */}
        <div className="flex flex-col items-center gap-4">
          <span
            className="text-5xl md:text-7xl font-bold tracking-tight"
            style={{ color: "var(--accent)" }}
          >
            Scan.
          </span>
          <span
            className="text-5xl md:text-7xl font-bold tracking-tight"
            style={{ color: "var(--secondary)" }}
          >
            Detect.
          </span>
          <span
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
          >
            Know.
          </span>
        </div>

        {/* Scan line effect */}
        <div
          className="relative w-48 h-[2px] overflow-hidden rounded-full"
          style={{ background: "rgba(0, 229, 255, 0.1)" }}
        >
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        <p className="text-base text-white/40 font-light max-w-sm text-center mt-4">
          Our CNN pipeline analyzes every pixel of your CT scan in real-time.
        </p>
      </div>
    </div>
  );
});

export default Act2Scan;
