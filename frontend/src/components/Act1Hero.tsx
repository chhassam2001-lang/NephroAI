"use client";

import { forwardRef } from "react";

const Act1Hero = forwardRef<HTMLDivElement>(function Act1Hero(_, ref) {
  return (
    <div ref={ref} className="act-overlay" style={{ opacity: 0 }}>
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Main Title */}
        <h1
          className="text-7xl md:text-9xl font-bold tracking-tight glow-text"
          style={{
            background: "linear-gradient(135deg, #fff 0%, var(--accent) 50%, var(--secondary) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          NephroAI.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl font-light tracking-wide text-white/60 max-w-md text-center">
          See what X-rays can&apos;t tell you.
        </p>

        {/* Scroll indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      {/* Background glow */}
      <div
        className="absolute animate-pulse-glow"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />
    </div>
  );
});

export default Act1Hero;
