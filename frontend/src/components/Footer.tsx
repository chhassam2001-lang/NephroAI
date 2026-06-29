"use client";

export default function Footer() {
  return (
    <footer className="w-full py-12 relative z-10 border-t border-white/5 bg-[var(--bg)]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Project Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-lg font-bold tracking-widest text-white">
              NEPHRO<span style={{ color: "var(--accent)" }}>AI</span>
            </span>
          </div>
          <p className="text-sm text-white/40">AI-Powered Kidney Stone Detection</p>
        </div>

        {/* Team Members */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Developed By</p>
          <div className="flex items-center gap-4 text-sm font-medium text-white/80">
            <span className="hover:text-[var(--accent)] transition-colors">Hassam</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:text-[var(--accent)] transition-colors">Khizar</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="hover:text-[var(--accent)] transition-colors">Osama</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
