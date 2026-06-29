"use client";

import { useCallback, useRef, useState } from "react";
import { predictImage, ImagePredictionResponse } from "../../lib/api";
import ConfidenceRing from "./ConfidenceRing";

export default function ImageUploadTab() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ImagePredictionResponse | null>(null);
  const [imageError, setImageError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, DICOM).");
      return;
    }
    setFile(f);
    setError(null);
    setResult(null);
    setImageError(false);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleSubmit = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setImageError(false);
    try {
      const res = await predictImage(file);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "API request failed. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setImageError(false);
  };

  return (
    <div className="space-y-6">
      {!result ? (
        <>
          {/* Dropzone */}
          <div
            className={`dropzone ${isDragOver ? "drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

            {preview ? (
              <div className="space-y-4">
                {/* Fallback to standard img tag for user local preview */}
                <img src={preview} alt="CT Scan preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                <p className="text-sm text-white/50">{file?.name}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,229,255,0.08)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="text-sm text-white/60">Drag & drop a CT scan image</p>
                <p className="text-xs text-white/30">or click to browse</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={!file || isLoading}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--secondary))", color: "var(--bg)" }}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : "Analyze Scan"}
          </button>

          {/* Error */}
          {error && (
            <div className="glass-panel p-4 text-sm" style={{ borderColor: "rgba(255,107,107,0.3)", color: "var(--alert)" }}>
              ⚠️ {error}
            </div>
          )}
        </>
      ) : (
        /* Result Display */
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Analysis Result</h3>
            <button onClick={resetForm} className="text-xs px-3 py-1.5 rounded-full cursor-pointer" style={{ background: "rgba(255,255,255,0.06)", color: "var(--accent)" }}>
              New Scan
            </button>
          </div>

          {/* Class badge */}
          <div className="flex justify-center">
            <div className="px-6 py-3 rounded-full text-lg font-bold" style={{
              background: result.predicted_class === "Stone" ? "rgba(255,107,107,0.15)" : "rgba(0,230,118,0.15)",
              border: `1px solid ${result.predicted_class === "Stone" ? "rgba(255,107,107,0.4)" : "rgba(0,230,118,0.4)"}`,
              color: result.predicted_class === "Stone" ? "var(--alert)" : "#00E676",
            }}>
              {result.predicted_class === "Stone" ? "🔴 Stone Detected" : "🟢 Normal (No Stone)"}
            </div>
          </div>

          {/* Metrics */}
          <div className="flex justify-center gap-8">
            <ConfidenceRing value={result.confidence * 100} label="Confidence" />
            <ConfidenceRing value={result.stone_probability * 100} label="Stone Prob." />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-4 text-center">
              <p className="text-xs text-white/40 mb-1">YOLO Triggered</p>
              <p className="font-mono font-bold" style={{ color: result.yolo_triggered ? "var(--accent)" : "var(--alert)" }}>
                {result.yolo_triggered ? "Yes" : "No"}
              </p>
            </div>
            <div className="glass-panel p-4 text-center">
              <p className="text-xs text-white/40 mb-1">Detections</p>
              <p className="font-mono font-bold text-white">{result.detections_count}</p>
            </div>
          </div>

          {/* Annotated Image */}
          {result.annotated_image && (
            <div className="space-y-2">
              <p className="text-xs text-white/40 uppercase tracking-wider">Annotated Image</p>
              <div className="glass-panel p-2 rounded-xl overflow-hidden relative min-h-[200px] flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={result.annotated_image}
                    alt="Annotated CT scan with detection boxes"
                    className="w-full h-auto rounded-lg object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <p className="text-sm text-white/40">Annotated image unavailable.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
