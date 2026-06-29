"use client";

import { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import { checkApiHealth } from "../../lib/api";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const setDemoModalOpen = useStore((s) => s.setDemoModalOpen);
  const serverStatus = useStore((s) => s.serverStatus);
  const setServerStatus = useStore((s) => s.setServerStatus);

  // Health check on mount
  useEffect(() => {
    let mounted = true;
    const pingServer = async () => {
      try {
        await checkApiHealth();
        if (mounted) setServerStatus('online');
      } catch {
        if (mounted) setServerStatus('offline');
      }
    };
    pingServer();
    return () => { mounted = false; };
  }, [setServerStatus]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 ${
        isScrolled ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-20px)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--secondary))",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#030A0F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-widest text-white">
            NEPHRO<span style={{ color: "var(--accent)" }}>AI</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("home")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollTo("about")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">About Us</button>
          <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Contact Us</button>
          
          {/* Server Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border" style={{
            background: serverStatus === 'online' ? 'rgba(0, 230, 118, 0.1)' : serverStatus === 'offline' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: serverStatus === 'online' ? 'rgba(0, 230, 118, 0.3)' : serverStatus === 'offline' ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          }}>
            <span className="relative flex h-2 w-2">
              {serverStatus === 'online' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${serverStatus === 'online' ? 'bg-[#00E676]' : serverStatus === 'offline' ? 'bg-[#FF6B6B]' : 'bg-gray-400'}`}></span>
            </span>
            <span className="text-xs font-mono" style={{ color: serverStatus === 'online' ? '#00E676' : serverStatus === 'offline' ? '#FF6B6B' : '#9CA3AF' }}>
              {serverStatus === 'online' ? 'API Online' : serverStatus === 'offline' ? 'API Offline' : 'Checking...'}
            </span>
          </div>
        </nav>

        {/* CTA */}
        <button
          onClick={() => setDemoModalOpen(true)}
          className="text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer glow-button"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--secondary))",
            color: "var(--bg)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Try Demo
        </button>
      </div>
    </header>
  );
}
