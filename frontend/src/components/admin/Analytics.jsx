import { motion } from "framer-motion";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line, ComposedChart, BarChart, Bar, LineChart,
} from "recharts";
import { TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { AIBadge, SparkleDot } from "../SparkleBadge";
import { REVENUE_BY_DAY, SENTIMENT_TREND, FUNNEL, ANALYTICS_NARRATIVES } from "../../data/mockData";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">Analytics</div>
          <h1 className="font-display font-bold text-3xl text-[#1F1B2E] mt-1">AI Narrative Insights</h1>
          <div className="text-sm text-[#6B6478] mt-1">Trends, revenue impact, sentiment, and conversion — each with a plain-language "why".</div>
        </div>
        <AIBadge label="Auto-generated · last 7 days" testId="analytics-badge" />
      </div>

      {/* AI Narrative cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {ANALYTICS_NARRATIVES.map((n, i) => (
          <motion.div
            key={n.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand"
          >
            <div className="flex items-center gap-2 mb-2">
              <SparkleDot />
              <span className="text-[10px] uppercase tracking-widest text-[#7B3FBF] font-semibold">Narrative</span>
              <span className="ml-auto text-[10px] text-[#6B6478]">Confidence <span className="font-semibold text-[#1F1B2E]">{n.confidence}%</span></span>
            </div>
            <div className="font-display font-semibold text-[#1F1B2E]">{n.title}</div>
            <div className="text-xs text-[#6B6478] mt-2 leading-relaxed">{n.body}</div>
            <button data-testid={`narrative-${i}`} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F47B20] hover:underline">
              Explore <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Revenue + CSAT composed chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-display font-semibold">Revenue × CSAT</div>
              <div className="text-xs text-[#6B6478]">Daily ancillary revenue overlaid with guest satisfaction.</div>
            </div>
            <AIBadge label="Causal link · 0.87" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={REVENUE_BY_DAY}>
              <defs>
                <linearGradient id="grad-rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B2C91" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#5B2C91" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E9E4F3" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" domain={[4, 5]} axisLine={false} tickLine={false} stroke="#F47B20" fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #A78BD9", fontSize: 12 }} />
              <Area yAxisId="left" type="monotone" dataKey="rev" stroke="#5B2C91" strokeWidth={2.5} fill="url(#grad-rev)" name="Revenue ($)" />
              <Line yAxisId="right" type="monotone" dataKey="csat" stroke="#F47B20" strokeWidth={2.5} dot={{ fill: "#F47B20", r: 3 }} name="CSAT" />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-2 text-xs text-[#6B6478] flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F47B20] mt-0.5 shrink-0" />
            <span><span className="font-semibold text-[#1F1B2E]">Insight:</span> Weekend revenue is +38% vs weekday baseline. CSAT leads revenue by 1 day — guest experience on Friday predicts Saturday spend.</span>
          </div>
        </div>

        {/* Funnel */}
        <div className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
          <div className="flex items-center justify-between mb-3">
            <div className="font-display font-semibold">Guest journey funnel</div>
            <AIBadge label="AI scored" />
          </div>
          <div className="space-y-2">
            {FUNNEL.map((f, i) => {
              const pct = (f.value / FUNNEL[0].value) * 100;
              const colors = ["#5B2C91", "#7B3FBF", "#A78BD9", "#F47B20", "#22C55E"];
              return (
                <div key={f.stage}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#6B6478]">{f.stage}</span>
                    <span className="font-semibold text-[#1F1B2E]">{f.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#F8F6FC] overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ background: colors[i] }} className="h-full rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-[11px] text-[#6B6478] leading-relaxed">
            <span className="font-semibold text-[#1F1B2E]">Bottleneck:</span> Repeat-intent → Loyalty signups drops 57%. AI suggests in-room QR with one-tap signup.
          </div>
        </div>
      </div>

      {/* Sentiment trend */}
      <div className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-display font-semibold">Guest sentiment trend</div>
            <div className="text-xs text-[#6B6478]">Distribution by week. Powered by AI sentiment classifier.</div>
          </div>
          <AIBadge label="Trending up" />
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={SENTIMENT_TREND} stackOffset="expand">
            <CartesianGrid stroke="#E9E4F3" strokeDasharray="2 4" vertical={false} />
            <XAxis dataKey="week" axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} />
            <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} axisLine={false} tickLine={false} stroke="#6B6478" fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #A78BD9", fontSize: 12 }} />
            <Bar dataKey="positive" stackId="a" fill="#22C55E" radius={[6, 6, 0, 0]} />
            <Bar dataKey="neutral" stackId="a" fill="#A78BD9" />
            <Bar dataKey="negative" stackId="a" fill="#EF4444" radius={[0, 0, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-2 text-[11px] text-[#6B6478] flex items-center gap-3">
          <Legend color="#22C55E" label="Positive" />
          <Legend color="#A78BD9" label="Neutral" />
          <Legend color="#EF4444" label="Negative" />
          <span className="ml-auto"><span className="font-semibold text-[#1F1B2E]">Net positive shift:</span> +12 pts in 4 weeks.</span>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded" style={{ background: color }} /> {label}</span>
  );
}
