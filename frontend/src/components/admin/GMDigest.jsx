import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { AIBadge, SparkleDot } from "../SparkleBadge";
import { KPIS, REQUEST_VOLUME, DEPT_LOAD, COMPLAINTS } from "../../data/mockData";
import { useDemo } from "../../context/DemoContext";

export default function GMDigest({ onDrill }) {
  const { phase, running } = useDemo();
  const showPattern = !running || phase >= 4;
  const highlightInsight = running && phase === 7;

  return (
    <div className="space-y-6">
      {/* Hero digest */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1F1B2E] via-[#5B2C91] to-[#7B3FBF] p-8 text-white"
      >
        <div className="absolute inset-0 opacity-20 ai-shimmer" />
        <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[#F47B20]/30 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <AIBadge label="GM Daily Digest" className="!bg-white/10 !border-white/25 !text-white" testId="gm-digest-badge" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">8:14 AM · 30 sec read</span>
          </div>
          <h1 className="font-display font-bold text-3xl leading-tight tracking-tight">
            Good morning, GM. Here's your day in 30 seconds <Sparkles className="inline w-5 h-5 text-[#F47B20] ai-pulse" />
          </h1>
          <p className="mt-4 text-white/85 leading-relaxed text-[15px]">
            Occupancy at <span className="font-semibold text-white">87%</span>. 3 VIP arrivals today.
            Housekeeping is running <span className="font-semibold text-white">8% above SLA</span>.
            One recurring complaint about Wi-Fi on <span className="font-semibold text-white">Floor 6</span> — likely router issue.
            Recommend assigning maintenance before 11 AM.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button data-testid="gm-apply-action" className="bg-[#F47B20] hover:bg-[#d66718] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
              Dispatch Floor 6 maintenance
            </button>
            <button onClick={() => onDrill("rootcause")} data-testid="gm-rootcause-btn" className="bg-white/10 border border-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/15 transition-colors">
              See root cause
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            data-testid={`kpi-${k.label.replace(/\s/g, "-").toLowerCase()}`}
            className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand"
          >
            <div className="text-[11px] uppercase tracking-widest text-[#6B6478] font-semibold">{k.label}</div>
            <div className="font-display font-bold text-3xl text-[#1F1B2E] mt-2">{k.value}</div>
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${k.positive ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
              {k.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {k.delta}
              <span className="text-[#6B6478] font-normal ml-1">vs 7d</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-display font-semibold">Live request volume</div>
              <div className="text-xs text-[#6B6478]">Today vs typical Thursday</div>
            </div>
            <AIBadge label="Forecast +12% by 8PM" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REQUEST_VOLUME}>
              <defs>
                <linearGradient id="grad-vol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7B3FBF" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#7B3FBF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E9E4F3" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} />
              <YAxis axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #A78BD9", fontSize: 12 }} />
              <Area dataKey="v" stroke="#5B2C91" strokeWidth={2.5} fill="url(#grad-vol)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
          <div className="font-display font-semibold mb-1">Department load</div>
          <div className="text-xs text-[#6B6478] mb-2">Active task share</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={DEPT_LOAD} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={2} cornerRadius={4}>
                {DEPT_LOAD.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #A78BD9", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-1">
            {DEPT_LOAD.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-[11px] text-[#6B6478]">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
                {d.name} <span className="ml-auto font-semibold text-[#1F1B2E]">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complaints + pattern callout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-display font-semibold">Top complaint categories</div>
              <div className="text-xs text-[#6B6478]">Last 7 days</div>
            </div>
            <AIBadge label="Narrative insight" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={COMPLAINTS} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke="#E9E4F3" strokeDasharray="2 4" horizontal={false} />
              <XAxis type="number" axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} />
              <YAxis type="category" dataKey="category" axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} width={90} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #A78BD9", fontSize: 12 }} />
              <Bar dataKey="count" fill="#F47B20" radius={[0, 8, 8, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-xs text-[#6B6478] leading-relaxed">
            <span className="font-semibold text-[#1F1B2E]">Why:</span> Wi-Fi spikes correlate with router rebooting at 7 PM. AC complaints concentrate on Floors 4 & 6.
          </div>
        </div>

        <motion.div
          animate={highlightInsight ? { borderColor: ["rgba(244,123,32,0.25)", "rgba(244,123,32,1)", "rgba(244,123,32,0.25)"] } : {}}
          transition={{ duration: 1.5, repeat: highlightInsight ? Infinity : 0 }}
          className={`bg-gradient-to-br from-[#F47B20]/10 to-[#5B2C91]/10 rounded-2xl p-5 border-2 ${highlightInsight ? "border-[#F47B20]" : "border-[#F47B20]/25"}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-[#F47B20]" />
            <AIBadge label="Pattern Detected" />
          </div>
          <div className="font-display font-semibold text-[#1F1B2E]">Floor 4 AC pattern</div>
          <div className="text-xs text-[#6B6478] mt-1">{showPattern ? "4 AC complaints this week clustered in rooms 410–415." : "Awaiting today's data…"}</div>
          {showPattern && (
            <button onClick={() => onDrill("rootcause")} data-testid="pattern-investigate" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F47B20]">
              Investigate <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>
      </div>

      {/* Bottom drill ribbons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DrillCard
          title="Simulate staffing"
          desc="Slide a control, preview SLA & cost impact."
          onClick={() => onDrill("simulation")}
          testId="drill-simulation"
        />
        <DrillCard
          title="Forecast-driven schedule"
          desc="Hour-by-hour AI staffing recommendation."
          onClick={() => onDrill("forecast")}
          testId="drill-forecast"
        />
        <DrillCard
          title="Root cause"
          desc="Trace why SLA dipped yesterday."
          onClick={() => onDrill("rootcause")}
          testId="drill-rootcause"
        />
      </div>
    </div>
  );
}

function DrillCard({ title, desc, onClick, testId }) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className="text-left bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand hover:-translate-y-0.5 hover:border-[#F47B20]/40 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <SparkleDot />
        <ArrowRight className="w-4 h-4 text-[#6B6478]" />
      </div>
      <div className="font-display font-semibold text-[#1F1B2E]">{title}</div>
      <div className="text-xs text-[#6B6478] mt-1">{desc}</div>
    </button>
  );
}
