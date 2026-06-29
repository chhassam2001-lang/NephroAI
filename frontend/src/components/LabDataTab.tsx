"use client";

import { useState } from "react";
import { predictLabData, LabDataInput, LabPredictionResponse } from "../../lib/api";
import ConfidenceRing from "./ConfidenceRing";

interface FieldConfig {
  key: keyof LabDataInput;
  label: string;
  placeholder: string;
  unit: string;
  min: number;
  max: number;
}

const fields: FieldConfig[] = [
  { key: "Age", label: "Age", placeholder: "e.g. 45", unit: "years", min: 1, max: 120 },
  { key: "Creatinine", label: "Creatinine", placeholder: "e.g. 1.2", unit: "mg/dL", min: 0.1, max: 20 },
  { key: "Calcium", label: "Calcium", placeholder: "e.g. 9.5", unit: "mg/dL", min: 1, max: 20 },
  { key: "Uric_Acid", label: "Uric Acid", placeholder: "e.g. 6.8", unit: "mg/dL", min: 0.5, max: 20 },
  { key: "pH", label: "pH", placeholder: "e.g. 5.5", unit: "pH", min: 1, max: 14 },
];

export default function LabDataTab() {
  const [formData, setFormData] = useState<Partial<LabDataInput>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LabPredictionResponse | null>(null);

  const updateField = (key: keyof LabDataInput, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value === "" ? undefined : parseFloat(value) }));
  };

  const isValid = fields.every((f) => {
    const v = formData[f.key];
    return v !== undefined && !isNaN(v) && v >= f.min && v <= f.max;
  });

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await predictLabData(formData as LabDataInput);
      setResult(res);
    } catch (err) {
      const message = err instanceof Error ? err.message : "API request failed. Is the backend running?";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({});
    setResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.key === "pH" ? "sm:col-span-2 sm:max-w-[calc(50%-0.5rem)]" : ""}>
                <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-wider">
                  {field.label} <span className="text-white/20">({field.unit})</span>
                </label>
                <input
                  type="number"
                  className="nephro-input"
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  step="any"
                  value={formData[field.key] ?? ""}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={!isValid || isLoading}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--secondary))", color: "var(--bg)" }}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : "Analyze Lab Data"}
          </button>

          {error && (
            <div className="glass-panel p-4 text-sm" style={{ borderColor: "rgba(255,107,107,0.3)", color: "var(--alert)" }}>
              ⚠️ {error}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Lab Analysis Result</h3>
            <button onClick={resetForm} className="text-xs px-3 py-1.5 rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.06)", color: "var(--accent)" }}>
              New Analysis
            </button>
          </div>

          {/* Class badge */}
          <div className="flex justify-center">
            <div className="px-6 py-3 rounded-full text-lg font-bold" style={{
              background: result.predicted_class === "Stone" ? "rgba(255,107,107,0.15)" : "rgba(0,230,118,0.15)",
              border: `1px solid ${result.predicted_class === "Stone" ? "rgba(255,107,107,0.4)" : "rgba(0,230,118,0.4)"}`,
              color: result.predicted_class === "Stone" ? "var(--alert)" : "#00E676",
            }}>
              {result.predicted_class === "Stone" ? "🔴 Stone Risk Detected" : "🟢 Normal (Low Risk)"}
            </div>
          </div>

          <div className="flex justify-center gap-8">
            <ConfidenceRing value={result.confidence * 100} label="Confidence" />
            <ConfidenceRing value={result.stone_probability * 100} label="Stone Risk" />
          </div>

          {/* Input summary */}
          <div className="glass-panel p-4">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Input Values</p>
            <div className="grid grid-cols-5 gap-2 text-center">
              {fields.map((f) => (
                <div key={f.key}>
                  <p className="text-xs text-white/30">{f.label}</p>
                  <p className="text-sm font-mono text-white/80">{formData[f.key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
