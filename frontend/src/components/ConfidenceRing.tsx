"use client";

import { useEffect, useRef } from "react";

interface ConfidenceRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ConfidenceRing({ value, size = 120, strokeWidth = 6, label = "Confidence" }: ConfidenceRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (v: number): string => {
    if (v >= 80) return "#00E676";
    if (v >= 50) return "#FFD600";
    return "#FF6B6B";
  };

  const color = getColor(value);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    circle.style.strokeDashoffset = String(circumference);
    requestAnimationFrame(() => {
      circle.style.transition = "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      circle.style.strokeDashoffset = String(offset);
    });
  }, [value, circumference, offset]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
          <circle ref={circleRef} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={circumference}
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono" style={{ color }}>{value.toFixed(1)}%</span>
        </div>
      </div>
      <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
    </div>
  );
}
