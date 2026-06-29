"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarField from "../components/StarField";
import Act1Hero from "../components/Act1Hero";
import Act2Scan from "../components/Act2Scan";
import Act3Detection from "../components/Act3Detection";
import Act4Models from "../components/Act4Models";
import Act5Layers from "../components/Act5Layers";
import Act6CTA from "../components/Act6CTA";
import DemoModal from "../components/DemoModal";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = scrollSectionRef.current;
    if (!section) return;

    // Use a context to easily revert all GSAP animations when unmounting
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%", // Slightly shorter to feel faster/smoother
          pin: true,
          scrub: 0.5, // Tighter scrub for less lag
        },
      });

      // ============ ACT 1: NephroAI Hero ============
      tl.to(act1Ref.current, { opacity: 1, duration: 0.5 }, 0)
        .fromTo(
          act1Ref.current?.querySelector("h1") ?? act1Ref.current,
          { y: 60, scale: 0.9 },
          { y: 0, scale: 1, duration: 0.5 },
          0
        )
        .fromTo(
          act1Ref.current?.querySelector("p") ?? act1Ref.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.15
        )
        .to({}, { duration: 0.6 })
        .to(act1Ref.current, { opacity: 0, y: -40, duration: 0.4 });

      // ============ ACT 2: Scan. Detect. Know. ============
      tl.to(act2Ref.current, { opacity: 1, duration: 0.4 })
        .fromTo(
          act2Ref.current?.querySelectorAll("span") ?? [],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.3 },
          "<"
        )
        .to({}, { duration: 0.6 })
        .to(act2Ref.current, { opacity: 0, y: -40, duration: 0.4 });

      // ============ ACT 3: Stone Located ============
      tl.to(act3Ref.current, { opacity: 1, duration: 0.5 })
        .to({}, { duration: 1.0 })
        .to(act3Ref.current, { opacity: 0, duration: 0.5 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full overflow-hidden">
      {/* Navigation */}
      <Header />
      
      {/* Background Starfield */}
      <StarField />

      {/* ============================
          SCROLL SECTION (Acts 1-3)
          ============================ */}
      <div id="home" ref={scrollSectionRef} className="relative w-full h-screen overflow-hidden">
        {/* Radial glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(10, 61, 74, 0.15) 0%, transparent 60%)",
          }}
        />

        {/* Act Overlays */}
        <Act1Hero ref={act1Ref} />
        <Act2Scan ref={act2Ref} />
        <Act3Detection ref={act3Ref} />
      </div>

      {/* ============================
          CONTENT SECTIONS (Acts 4-6)
          ============================ */}
      <div className="relative z-10 flex flex-col gap-12 md:gap-24 mt-20">
        {/* ABOUT US SECTION */}
        <div className="flex flex-col gap-16 border-t border-white/5 bg-[var(--bg-light)]/30 backdrop-blur-sm pt-20">
          <Act4Models />
          <Act5Layers />
        </div>

        {/* CONTACT US / CTA SECTION */}
        <div className="border-t border-white/5 pt-20">
          <Act6CTA />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Interactive Modal */}
      <DemoModal />
    </main>
  );
}
