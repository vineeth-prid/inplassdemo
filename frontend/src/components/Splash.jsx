import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Monitor, Sparkles, PlayCircle } from "lucide-react";
import { LOGO_URL } from "../data/mockData";

const APPS = [
  {
    key: "guest",
    title: "Guest App",
    persona: "John Kelly · Room 412",
    icon: Smartphone,
    desc: "Conversational AI Concierge, multilingual, proactive nudges.",
    accent: "from-[#5B2C91] to-[#7B3FBF]",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDB8fHx8MTc3OTg1Mjg0NHww&ixlib=rb-4.1.0&q=85",
  },
  {
    key: "staff",
    title: "Staff App",
    persona: "Linda Martinez · Housekeeping",
    icon: Smartphone,
    desc: "AI task orchestrator, copilot, route optimization, shift handover.",
    accent: "from-[#7B3FBF] to-[#A78BD9]",
    image:
      "https://images.unsplash.com/photo-1677129666186-d29eba893fe3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBob3RlbCUyMGNvbmNpZXJnZXxlbnwwfHx8fDE3Nzk4NTI4NDh8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    key: "admin",
    title: "Admin / HOP Dashboard",
    persona: "Hotel GM · Web",
    icon: Monitor,
    desc: "Daily GM digest, anomaly detection, what-if simulations, forecasts.",
    accent: "from-[#1F1B2E] to-[#5B2C91]",
    image:
      "https://images.unsplash.com/photo-1585418694458-dc80a5c20294?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yfGVufDB8fHx8MTc3OTg1Mjg0NHww&ixlib=rb-4.1.0&q=85",
  },
];

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0c0a14] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#5B2C91]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full bg-[#F47B20]/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <header className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="iNPLASS" className="h-10 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
          <Sparkles className="w-3.5 h-3.5 text-[#F47B20]" />
          Investor Prototype · v1.0
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-12 gap-10 items-end pt-10 pb-16"
        >
          <div className="lg:col-span-8">
            <div className="text-[11px] uppercase tracking-[0.4em] text-[#F47B20] font-semibold mb-5">
              The NextGen Hotel Management Solution
            </div>
            <h1 className="font-display font-bold leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              AI orchestrates <br /> every guest moment.<br />
              <span className="bg-gradient-to-r from-[#A78BD9] via-white to-[#F47B20] bg-clip-text text-transparent">Let's Hotel.</span>
            </h1>
            <p className="mt-7 text-white/70 max-w-xl text-lg leading-relaxed">
              One AI brain across three surfaces — Guest, Staff, and Management — turning every request into intelligent action in real time.
            </p>
          </div>
          <div className="lg:col-span-4">
            <button
              data-testid="start-investor-demo-btn"
              onClick={() => navigate("/demo")}
              className="group w-full inline-flex items-center justify-between gap-3 bg-[#F47B20] hover:bg-[#d66718] transition-colors text-white font-semibold text-base px-7 py-5 rounded-full shadow-[0_20px_60px_rgba(244,123,32,0.35)]"
            >
              <span className="flex items-center gap-3">
                <PlayCircle className="w-6 h-6" />
                Play Investor Demo
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              data-testid="explore-admin-btn"
              onClick={() => navigate("/admin")}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 text-white/90 font-medium text-sm px-7 py-4 rounded-full transition-colors"
            >
              Skip to Admin Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mt-4">
          {APPS.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.button
                key={app.key}
                data-testid={`splash-card-${app.key}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                onClick={() => navigate(`/${app.key}`)}
                className="group relative text-left rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-[#F47B20]/50 transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                  <img src={app.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${app.accent} opacity-70 mix-blend-multiply`} />
                <div className="relative p-7 h-72 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <Icon className="w-6 h-6 text-white/90" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Open</span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/70 mb-2">{app.persona}</div>
                    <div className="font-display text-2xl font-semibold mb-2">{app.title}</div>
                    <div className="text-sm text-white/80 leading-relaxed">{app.desc}</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6 text-sm text-white/60">
          {[
            ["Conversational AI", "Auto-splits requests, multilingual, voice-first."],
            ["Operational AI", "Next-best-action, route bundling, SLA prediction."],
            ["Decisional AI", "Anomaly detection, root cause, what-if simulations."],
          ].map(([t, d]) => (
            <div key={t} className="border-l-2 border-[#F47B20] pl-4">
              <div className="text-white font-semibold mb-1">{t}</div>
              <div className="leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
