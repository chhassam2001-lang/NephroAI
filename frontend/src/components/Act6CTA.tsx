"use client";

import { useStore } from "../../store/useStore";

export default function Act6CTA() {
  const setDemoModalOpen = useStore((s) => s.setDemoModalOpen);

  return (
    <section id="contact" className="act-section py-32 min-h-[80vh]">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 50%)",
      }} />

      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white">
          Diagnosis{" "}
          <span className="glow-text" style={{ color: "var(--accent)" }}>Delivered.</span>
        </h2>
        <p className="text-lg md:text-xl text-white/40 max-w-lg">
          Upload a CT scan or enter lab data. Get instant, AI-powered kidney stone analysis.
        </p>

        <button
          onClick={() => setDemoModalOpen(true)}
          className="mt-8 px-10 py-4 rounded-full text-lg font-semibold tracking-wide glow-button cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--secondary))",
            color: "var(--bg)",
            border: "none",
          }}
        >
          Try the Demo
        </button>

        {/* Decorative ring */}
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 animate-spin-slow pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} />
        </div>
      </div>
    </section>
  );
}
