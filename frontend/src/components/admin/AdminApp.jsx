import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ListChecks, Users, BedDouble, LineChart, Brain, Settings,
  Bell, Search, ChevronLeft, Sparkles, Calendar, MoveLeft,
} from "lucide-react";
import { LOGO_URL } from "../../data/mockData";

import GMDigest from "./GMDigest";
import Insights from "./Insights";
import RootCause from "./RootCause";
import Simulation from "./Simulation";
import Forecast from "./Forecast";
import LiveOps from "./LiveOps";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "requests", label: "Requests", icon: ListChecks },
  { key: "staff", label: "Staff", icon: Users },
  { key: "rooms", label: "Rooms", icon: BedDouble },
  { key: "analytics", label: "Analytics", icon: LineChart },
  { key: "insights", label: "AI Insights", icon: Brain },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function AdminApp({ embedded = false }) {
  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");
  const [drill, setDrill] = useState(null); // 'rootcause' | 'simulation' | 'forecast'

  const renderView = () => {
    if (drill === "rootcause") return <RootCause onBack={() => setDrill(null)} />;
    if (drill === "simulation") return <Simulation onBack={() => setDrill(null)} />;
    if (drill === "forecast") return <Forecast onBack={() => setDrill(null)} />;
    if (view === "dashboard") return <GMDigest onDrill={setDrill} />;
    if (view === "insights") return <Insights onDrill={setDrill} />;
    if (view === "requests") return <LiveOps />;
    return <Placeholder label={view} />;
  };

  return (
    <div className={`${embedded ? "" : "min-h-screen"} flex bg-[#F8F6FC] text-[#1F1B2E]`}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#1F1B2E] text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <img src={LOGO_URL} alt="iNPLASS" className="h-9 w-auto" />
          <div className="text-[10px] tracking-[0.3em] uppercase text-white/60 mt-2">HOP Dashboard</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = view === n.key && !drill;
            return (
              <button
                key={n.key}
                data-testid={`admin-nav-${n.key}`}
                onClick={() => { setView(n.key); setDrill(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? "bg-gradient-to-r from-[#5B2C91] to-[#7B3FBF] text-white shadow-brand" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon className="w-4 h-4" />
                {n.label}
              </button>
            );
          })}
        </nav>
        {!embedded && (
          <button
            data-testid="admin-back-home"
            onClick={() => navigate("/")}
            className="mx-3 mb-4 inline-flex items-center justify-center gap-2 text-xs text-white/70 hover:text-white border border-white/10 rounded-full px-4 py-2"
          >
            <MoveLeft className="w-3.5 h-3.5" /> Back to Splash
          </button>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-[#A78BD9]/20 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <BedDouble className="w-4 h-4 text-[#5B2C91]" />
            <span className="font-display font-semibold">Our Hotel Resort &amp; Spa</span>
            <span className="text-xs text-[#6B6478] hidden md:inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Thu · Feb 12, 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-[#F8F6FC] rounded-full px-3 py-1.5 border border-[#A78BD9]/25">
              <Search className="w-3.5 h-3.5 text-[#6B6478]" />
              <input data-testid="admin-search" placeholder="Search rooms, guests, requests…" className="bg-transparent outline-none text-xs w-64 placeholder:text-[#6B6478]" />
            </div>
            <button className="relative w-9 h-9 rounded-full bg-[#F8F6FC] grid place-items-center">
              <Bell className="w-4 h-4 text-[#5B2C91]" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#F47B20] text-white text-[9px] font-bold grid place-items-center">5</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5B2C91] to-[#F47B20] text-white grid place-items-center text-xs font-bold">GM</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={drill || view}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="p-8"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div className="grid place-items-center h-[60vh] text-center">
      <div>
        <Sparkles className="w-8 h-8 text-[#F47B20] mx-auto mb-3" />
        <div className="font-display font-semibold text-2xl">{label.charAt(0).toUpperCase() + label.slice(1)} module</div>
        <div className="text-sm text-[#6B6478] mt-1">Coming soon — this prototype focuses on Dashboard, Requests & AI Insights.</div>
      </div>
    </div>
  );
}

export function BackBtn({ onBack, label = "Back" }) {
  return (
    <button data-testid="admin-drill-back" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B2C91] mb-4 hover:underline">
      <ChevronLeft className="w-4 h-4" /> {label}
    </button>
  );
}
