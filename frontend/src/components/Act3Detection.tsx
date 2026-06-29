"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

const Act3Detection = forwardRef<HTMLDivElement>(function Act3Detection(_, ref) {
  const [confidence, setConfidence] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Observe visibility to trigger count-up animation
    const el = (ref as React.RefObject<HTMLDivElement>)?.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      const opacity = parseFloat(window.getComputedStyle(el).opacity);
      if (opacity > 0.5 && !isAnimating) {
        setIsAnimating(true);
        let current = 0;
        const target = 98.6;
        const step = target / 60;
        intervalRef.current = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
          setConfidence(current);
        }, 16);
      } else if (opacity <= 0.5) {
        setIsAnimating(false);
        setConfidence(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    });

    observer.observe(el, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [ref, isAnimating]);

  return (
    <div ref={ref} className="act-overlay" style={{ opacity: 0 }}>
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Title */}
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Stone <span style={{ color: "var(--alert)" }}>Located.</span>
        </h2>

        {/* Detection visualization */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Scan area background */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "rgba(0, 229, 255, 0.03)",
              border: "1px solid rgba(0, 229, 255, 0.15)",
            }}
          />

          {/* Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-[1px] h-full"
              style={{ background: "rgba(0, 229, 255, 0.15)" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-[1px] w-full"
              style={{ background: "rgba(0, 229, 255, 0.15)" }}
            />
          </div>

          {/* Bounding box */}
          <svg
            className="absolute"
            style={{ top: "25%", left: "30%", width: "40%", height: "45%" }}
            viewBox="0 0 100 100"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="4"
              stroke="var(--alert)"
              strokeWidth="2"
              strokeDasharray="400"
              style={{
                animation: isAnimating
                  ? "bounding-box-draw 1.5s ease-out forwards"
                  : "none",
                strokeDashoffset: isAnimating ? 0 : 400,
              }}
            />
            {/* Corner markers */}
            <line x1="0" y1="10" x2="0" y2="0" stroke="var(--alert)" strokeWidth="3" />
            <line x1="0" y1="0" x2="10" y2="0" stroke="var(--alert)" strokeWidth="3" />
            <line x1="90" y1="0" x2="100" y2="0" stroke="var(--alert)" strokeWidth="3" />
            <line x1="100" y1="0" x2="100" y2="10" stroke="var(--alert)" strokeWidth="3" />
            <line x1="100" y1="90" x2="100" y2="100" stroke="var(--alert)" strokeWidth="3" />
            <line x1="100" y1="100" x2="90" y2="100" stroke="var(--alert)" strokeWidth="3" />
            <line x1="10" y1="100" x2="0" y2="100" stroke="var(--alert)" strokeWidth="3" />
            <line x1="0" y1="100" x2="0" y2="90" stroke="var(--alert)" strokeWidth="3" />
          </svg>

          {/* Detection label */}
          <div
            className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
            style={{
              top: "20%",
              left: "30%",
              transform: "translateY(-100%)",
              background: "rgba(255, 107, 107, 0.15)",
              border: "1px solid rgba(255, 107, 107, 0.4)",
              color: "var(--alert)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--alert)] animate-pulse" />
            kidney_stone
          </div>

          {/* Pulsing detection point */}
          <div
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: "45%",
              left: "48%",
              background: "var(--alert)",
              boxShadow: "0 0 20px rgba(255, 107, 107, 0.6)",
              animation: "pulse-glow 1.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Confidence badge */}
        <div className="flex items-center gap-6">
          <div
            className="glass-panel px-6 py-3 flex flex-col items-center"
            style={{ borderColor: "rgba(0, 229, 255, 0.2)" }}
          >
            <span className="text-xs text-white/40 uppercase tracking-widest mb-1">
              Confidence
            </span>
            <span
              className="text-3xl font-bold font-mono glow-text"
              style={{ color: "var(--accent)" }}
            >
              {confidence.toFixed(1)}%
            </span>
          </div>
          <div
            className="glass-panel px-6 py-3 flex flex-col items-center"
            style={{ borderColor: "rgba(255, 107, 107, 0.2)" }}
          >
            <span className="text-xs text-white/40 uppercase tracking-widest mb-1">
              Detections
            </span>
            <span
              className="text-3xl font-bold font-mono"
              style={{ color: "var(--alert)" }}
            >
              {isAnimating ? "1" : "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Act3Detection;
