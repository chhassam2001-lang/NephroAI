"use client";

const layers = [
  { name: "Input Layer", neurons: 5, color: "#00E5FF" },
  { name: "Conv2D ×3", neurons: 8, color: "#00C8E5" },
  { name: "MaxPool", neurons: 6, color: "#00B4A6" },
  { name: "Dense 128", neurons: 7, color: "#00A88F" },
  { name: "Dense 64", neurons: 5, color: "#00E676" },
  { name: "Output", neurons: 2, color: "#FF6B6B" },
];

export default function Act5Layers() {
  return (
    <section className="act-section py-32">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(0,180,166,0.1) 0%, transparent 50%)" }} />
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
          Every Layer.{" "}
          <span style={{ color: "var(--secondary)" }}>Precise.</span>
        </h2>
        <p className="text-lg text-white/40 max-w-lg mx-auto">Data flows through carefully tuned neural network layers for maximum accuracy.</p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl mx-auto px-4">
        {layers.map((layer, i) => (
          <div key={layer.name} className="w-full">
            {/* Connection line */}
            {i > 0 && (
              <div className="flex justify-center mb-4">
                <div className="w-[1px] h-6" style={{ background: `linear-gradient(to bottom, ${layers[i - 1].color}40, ${layer.color}40)` }} />
              </div>
            )}
            <div className="glass-panel px-6 py-4 flex items-center justify-between transition-all duration-300 hover:scale-[1.01]"
              style={{ borderColor: `${layer.color}20` }}>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full" style={{ background: layer.color, boxShadow: `0 0 12px ${layer.color}60` }} />
                <div>
                  <span className="font-semibold text-sm text-white/90">{layer.name}</span>
                  <span className="text-xs text-white/30 ml-3 font-mono">{layer.neurons} units</span>
                </div>
              </div>
              {/* Neuron dots */}
              <div className="flex gap-1.5">
                {Array.from({ length: layer.neurons }).map((_, j) => (
                  <div key={j} className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ background: `${layer.color}${j < layer.neurons - 1 ? "60" : "FF"}`, animationDelay: `${j * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
