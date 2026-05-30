import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, Heart, Battery, MessageSquare } from "lucide-react";
import { AIBadge, SparkleDot } from "../SparkleBadge";
import { STAFF_PERF } from "../../data/mockData";

const sentimentTone = {
  warm: { dot: "bg-[#22C55E]", label: "Warm" },
  neutral: { dot: "bg-[#A78BD9]", label: "Neutral" },
  tired: { dot: "bg-[#F59E0B]", label: "Tired" },
  stressed: { dot: "bg-[#EF4444]", label: "Stressed" },
};

function burnoutTone(v) {
  if (v >= 60) return { color: "#EF4444", label: "High" };
  if (v >= 35) return { color: "#F59E0B", label: "Watch" };
  return { color: "#22C55E", label: "Healthy" };
}

export default function StaffView() {
  const [dept, setDept] = useState("all");
  const depts = ["all", ...new Set(STAFF_PERF.map((s) => s.dept))];
  const data = STAFF_PERF.filter((s) => dept === "all" || s.dept === dept);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">Staff</div>
          <h1 className="font-display font-bold text-3xl text-[#1F1B2E] mt-1">AI Performance Pulse</h1>
          <div className="text-sm text-[#6B6478] mt-1">SLA, sentiment, and burnout — surfaced per team member with AI coaching suggestions.</div>
        </div>
        <AIBadge label="Live · refreshes every 5 min" testId="staff-pulse-badge" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Team SLA" value="93%" delta="+1.4" tone="good" />
        <Stat label="Avg CSAT" value="4.7★" delta="+0.2" tone="good" />
        <Stat label="At-risk burnout" value="2" delta="+1" tone="warn" />
        <Stat label="Coaching suggested" value="3" tone="brand" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {depts.map((d) => (
          <button
            key={d}
            data-testid={`staff-dept-${d}`}
            onClick={() => setDept(d)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${dept === d ? "bg-[#5B2C91] text-white" : "bg-white text-[#5B2C91] border border-[#A78BD9]/30"}`}
          >
            {d === "all" ? "All Departments" : d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((s, i) => {
          const sent = sentimentTone[s.sentiment];
          const bo = burnoutTone(s.burnout);
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand"
            >
              <div className="flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-brand" />
                <div className="min-w-0">
                  <div className="font-display font-semibold text-[#1F1B2E] truncate">{s.name}</div>
                  <div className="text-[11px] text-[#6B6478] truncate">{s.role} · {s.dept}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <Cell label="Done" value={s.completed} />
                <Cell label="SLA" value={`${s.sla}%`} accent={s.sla < 90} />
                <Cell label="CSAT" value={`${s.csat}★`} />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-[#6B6478] inline-flex items-center gap-1"><Battery className="w-3 h-3" /> Burnout risk</span>
                  <span className="font-semibold" style={{ color: bo.color }}>{bo.label}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#F8F6FC] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.burnout}%`, background: bo.color }} />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px]">
                <Heart className="w-3 h-3 text-[#5B2C91]" />
                <span className="text-[#6B6478]">Sentiment</span>
                <span className="inline-flex items-center gap-1 ml-auto font-semibold text-[#1F1B2E]">
                  <span className={`w-1.5 h-1.5 rounded-full ${sent.dot}`} /> {sent.label}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-gradient-to-br from-[#5B2C91]/10 to-[#F47B20]/10 border border-[#F47B20]/20 p-3 flex items-start gap-2">
                <SparkleDot className="w-3.5 h-3.5 mt-0.5" />
                <div className="text-[11px] text-[#1F1B2E] leading-relaxed">{s.aiNote}</div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button data-testid={`coach-${s.name.split(" ")[0]}`} className="flex-1 text-[11px] font-semibold bg-[#F47B20] hover:bg-[#d66718] text-white px-3 py-2 rounded-full transition-colors">
                  Coach
                </button>
                <button className="flex-1 text-[11px] font-semibold text-[#5B2C91] bg-[#F8F6FC] border border-[#A78BD9]/30 px-3 py-2 rounded-full inline-flex items-center justify-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Note
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, delta, tone }) {
  const tones = {
    good: "text-[#22C55E]",
    warn: "text-[#F47B20]",
    brand: "text-[#5B2C91]",
  };
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
      <div className="text-[11px] uppercase tracking-widest text-[#6B6478] font-semibold">{label}</div>
      <div className="font-display font-bold text-2xl text-[#1F1B2E] mt-2">{value}</div>
      {delta && <div className={`mt-1 text-xs font-semibold inline-flex items-center gap-1 ${tones[tone]}`}><TrendingUp className="w-3 h-3" /> {delta}</div>}
    </div>
  );
}

function Cell({ label, value, accent }) {
  return (
    <div className="bg-[#F8F6FC] rounded-lg p-2 text-center">
      <div className="text-[10px] uppercase text-[#6B6478]">{label}</div>
      <div className={`font-display font-bold ${accent ? "text-[#EF4444]" : "text-[#1F1B2E]"}`}>{value}</div>
    </div>
  );
}
