"use client";

interface ModelInfo {
  name: string;
  label: string;
  description: string;
  color: string;
  accuracy: string;
}

const models: ModelInfo[] = [
  {
    name: "CNN",
    label: "Convolutional Neural Network",
    description: "Classifies CT scan images to detect kidney stones with pixel-level analysis.",
    color: "#00E5FF",
    accuracy: "96.8%",
  },
  {
    name: "YOLOv8",
    label: "Real-time Object Detection",
    description: "Localizes and draws bounding boxes around detected kidney stones in milliseconds.",
    color: "#FF6B6B",
    accuracy: "94.2%",
  },
  {
    name: "Random Forest",
    label: "Lab Data Classifier",
    description: "Analyzes patient lab values for clinical risk assessment.",
    color: "#00B4A6",
    accuracy: "91.5%",
  },
];

export default function Act4Models() {
  return (
    <section id="about" className="act-section py-32">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(10,61,74,0.3) 0%, transparent 60%)" }} />
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
          Three AI{" "}
          <span style={{ background: "linear-gradient(135deg, var(--accent), var(--secondary))", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Minds.</span>
        </h2>
        <p className="text-lg text-white/40 max-w-md mx-auto">Working together to deliver precise diagnostics.</p>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {models.map((model) => (
          <div key={model.name}
            className="glass-panel-strong p-8 flex flex-col gap-5 transition-all duration-500 hover:scale-[1.02] cursor-default"
            style={{ borderColor: `${model.color}20` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${model.color}50`; e.currentTarget.style.boxShadow = `0 0 40px ${model.color}15`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${model.color}20`; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${model.color}15`, color: model.color }}>
              <span className="text-2xl font-bold">{model.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: model.color }}>{model.name}</h3>
              <p className="text-sm text-white/50">{model.label}</p>
            </div>
            <p className="text-sm text-white/40 leading-relaxed flex-1">{model.description}</p>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/30 uppercase tracking-wider">Accuracy</span>
                <span className="text-sm font-mono font-bold" style={{ color: model.color }}>{model.accuracy}</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: model.accuracy, background: `linear-gradient(90deg, ${model.color}80, ${model.color})` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
