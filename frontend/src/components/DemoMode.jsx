import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Pause, ChevronLeft, Sparkles } from "lucide-react";
import { ScaledPhone } from "./PhoneFrame";
import { LOGO_URL } from "../data/mockData";
import { useDemo } from "../context/DemoContext";
import GuestApp from "./guest/GuestApp";
import StaffApp from "./staff/StaffApp";
import AdminApp from "./admin/AdminApp";

const STORYLINE = [
  { phase: 0, title: "Press Play to start", subtitle: "AI in action across Guest, Staff, and GM — in one storyline." },
  { phase: 1, title: "1. John speaks", subtitle: "Guest types a multi-part request in the Concierge." },
  { phase: 2, title: "2. AI splits & dispatches", subtitle: "iNPLASS auto-creates 3 routed tickets in seconds." },
  { phase: 3, title: "3. Linda gets her next move", subtitle: "Staff app surfaces the towel task as Next-Best-Action." },
  { phase: 4, title: "4. GM sees it live", subtitle: "Admin dashboard shows the request + detected pattern." },
  { phase: 5, title: "5. Task completed", subtitle: "Linda marks complete, photo QA captured." },
  { phase: 6, title: "6. Guest updated in real time", subtitle: "John's tracker flips to ‘Delivered'." },
  { phase: 7, title: "7. Insight surfaces to GM", subtitle: "AI flags Floor 4 AC pattern — preventive scheduled." },
  { phase: 8, title: "Demo complete", subtitle: "One AI brain, three coordinated experiences." },
];

export default function DemoMode() {
  const navigate = useNavigate();
  const { phase, focus, running, start, stop } = useDemo();
  const current = STORYLINE[phase] || STORYLINE[0];

  // Start on first mount unless user opts out
  useEffect(() => {
    const t = setTimeout(() => start(), 700);
    return () => { clearTimeout(t); stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0a14] text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#5B2C91]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#F47B20]/15 blur-3xl pointer-events-none" />

      <header className="relative z-10 max-w-[1480px] mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button data-testid="demo-back" onClick={() => navigate("/")} className="text-white/70 hover:text-white inline-flex items-center gap-1.5 text-sm">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <img src={LOGO_URL} alt="iNPLASS" className="h-8" />
        </div>
        <div className="flex items-center gap-2">
          <button
            data-testid="demo-restart"
            onClick={() => { stop(); setTimeout(start, 300); }}
            className="text-white/80 hover:text-white border border-white/15 px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart
          </button>
          {running ? (
            <button data-testid="demo-stop" onClick={stop} className="bg-white/10 border border-white/15 px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2">
              <Pause className="w-3.5 h-3.5" /> Pause
            </button>
          ) : (
            <button data-testid="demo-play" onClick={start} className="bg-[#F47B20] hover:bg-[#d66718] px-5 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2">
              <Play className="w-3.5 h-3.5" /> Play
            </button>
          )}
        </div>
      </header>

      <div className="relative z-10 max-w-[1480px] mx-auto px-8 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.phase}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F47B20] font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Demo · Step {phase}/8
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl mt-2 tracking-tight">{current.title}</h1>
            <p className="text-white/70 mt-1 max-w-2xl">{current.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Guest phone */}
          <div className="lg:col-span-3 flex flex-col items-center">
            <SpotlightWrap focused={focus === "guest"}>
              <ScaledPhone scale={0.66} label="Guest · John" testId="demo-guest-frame">
                <GuestApp embedded />
              </ScaledPhone>
            </SpotlightWrap>
          </div>

          {/* Staff phone */}
          <div className="lg:col-span-3 flex flex-col items-center">
            <SpotlightWrap focused={focus === "staff"}>
              <ScaledPhone scale={0.66} label="Staff · Linda" testId="demo-staff-frame">
                <StaffApp embedded />
              </ScaledPhone>
            </SpotlightWrap>
          </div>

          {/* Admin laptop */}
          <div className="lg:col-span-6">
            <SpotlightWrap focused={focus === "admin"}>
              <LaptopFrame testId="demo-admin-frame">
                <div className="w-[1400px] h-[820px]" style={{ transform: "scale(0.52)", transformOrigin: "top left" }}>
                  <AdminApp embedded />
                </div>
              </LaptopFrame>
            </SpotlightWrap>
          </div>
        </div>

        <ProgressDots phase={phase} />
      </div>
    </div>
  );
}

function SpotlightWrap({ focused, children }) {
  return (
    <motion.div
      animate={{ scale: focused ? 1.02 : 0.97, opacity: focused ? 1 : 0.55 }}
      transition={{ type: "spring", damping: 20 }}
      className="relative"
    >
      {focused && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute -inset-3 rounded-[40px] bg-gradient-to-br from-[#F47B20]/40 to-[#5B2C91]/40 blur-2xl -z-10"
        />
      )}
      {children}
    </motion.div>
  );
}

function LaptopFrame({ children, testId }) {
  return (
    <div data-testid={testId} className="relative mx-auto" style={{ width: 728 }}>
      <div className="rounded-2xl border-[10px] border-[#0c0a14] bg-black shadow-2xl overflow-hidden" style={{ width: 728, height: 426 }}>
        <div className="w-full h-full overflow-hidden bg-[#F8F6FC]">
          {children}
        </div>
      </div>
      <div className="h-2.5 rounded-b-2xl bg-[#0c0a14]" />
      <div className="h-1.5 mx-auto rounded-b-2xl bg-[#1F1B2E]" style={{ width: 180 }} />
      <div className="text-center text-[11px] font-semibold text-[#6B6478] tracking-[0.25em] uppercase mt-3">Admin · GM</div>
    </div>
  );
}

function ProgressDots({ phase }) {
  return (
    <div className="mt-10 flex justify-center gap-2">
      {STORYLINE.slice(1).map((s, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${phase === s.phase ? "bg-[#F47B20] w-10" : phase > s.phase ? "bg-white/40 w-6" : "bg-white/15 w-6"}`}
        />
      ))}
    </div>
  );
}
