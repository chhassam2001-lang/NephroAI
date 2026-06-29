"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../../store/useStore";
import ImageUploadTab from "./ImageUploadTab";
import LabDataTab from "./LabDataTab";

type Tab = "scan" | "lab";

export default function DemoModal() {
  const [activeTab, setActiveTab] = useState<Tab>("scan");
  const isOpen = useStore((s) => s.isDemoModalOpen);
  const setOpen = useStore((s) => s.setDemoModalOpen);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, setOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4 md:p-6">
            <motion.div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
            <div className="glass-panel-strong p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  AI <span style={{ color: "var(--accent)" }}>Demo</span>
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 p-1 rounded-full" style={{ background: "rgba(255,255,255,0.03)" }}>
                <button
                  className={`tab-button flex-1 ${activeTab === "scan" ? "active" : ""}`}
                  onClick={() => setActiveTab("scan")}
                >
                  Upload Scan
                </button>
                <button
                  className={`tab-button flex-1 ${activeTab === "lab" ? "active" : ""}`}
                  onClick={() => setActiveTab("lab")}
                >
                  Lab Data
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === "scan" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === "scan" ? 10 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "scan" ? <ImageUploadTab /> : <LabDataTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
