import { BackBtn } from "./AdminApp";
import { AIBadge } from "../SparkleBadge";
import { motion } from "framer-motion";

const CHAIN = [
  { label: "Linen shortage", time: "14:02", weight: 38, color: "#EF4444" },
  { label: "6 HK tasks delayed", time: "14:24", weight: 26, color: "#F47B20" },
  { label: "3 SLA breaches", time: "15:10", weight: 22, color: "#F59E0B" },
  { label: "Guest complaints +12%", time: "16:00", weight: 14, color: "#7B3FBF" },
];

export default function RootCause({ onBack }) {
  return (
    <div>
      <BackBtn onBack={onBack} label="Back to Dashboard" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">Root Cause</div>
          <h1 className="font-display font-bold text-3xl text-[#1F1B2E] mt-1">Why did SLA dip yesterday?</h1>
          <div className="text-sm text-[#6B6478] mt-1">AI-traced contribution chain from upstream cause to downstream impact.</div>
        </div>
        <AIBadge label="Confidence 92%" testId="rca-confidence" />
      </div>

      <div className="grid lg:grid-cols-5 gap-4 items-stretch">
        {CHAIN.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
            className="bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand relative"
          >
            <div className="text-[10px] uppercase tracking-widest text-[#6B6478] font-semibold">Step {i + 1} · {c.time}</div>
            <div className="font-display font-semibold text-[#1F1B2E] mt-2">{c.label}</div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-[#6B6478]">Contribution</span>
                <span className="font-semibold" style={{ color: c.color }}>{c.weight}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#F8F6FC] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${c.weight * 2}%`, background: c.color }} />
              </div>
            </div>
            {i < CHAIN.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#F8F6FC] border border-[#A78BD9]/30 grid place-items-center text-[#5B2C91] font-bold">→</div>
            )}
          </motion.div>
        ))}
        <div className="bg-gradient-to-br from-[#5B2C91] to-[#7B3FBF] rounded-2xl p-5 text-white shadow-brand">
          <div className="text-[10px] uppercase tracking-widest text-white/70 font-semibold">Outcome</div>
          <div className="font-display font-semibold mt-2">SLA dipped 11 pts</div>
          <div className="text-xs text-white/80 mt-1">94% → 83% between 14:00–17:00</div>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#A78BD9]/15 shadow-brand">
          <div className="font-display font-semibold mb-2">Plain-language explanation</div>
          <p className="text-sm text-[#6B6478] leading-relaxed">
            A delayed linen delivery at 14:02 left housekeeping short-stocked for 22 minutes. Six rooms had their cleaning slot pushed past their SLA, and three of those triggered guest-visible breaches. Sentiment on responses dropped 14 pts. The chain ended with a 12% rise in complaints during the afternoon window.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#F47B20]/15 to-[#5B2C91]/15 rounded-2xl p-5 border border-[#F47B20]/25">
          <AIBadge label="Prevent recurrence" />
          <div className="font-display font-semibold mt-3 text-[#1F1B2E]">Add 2 backup linen carts to Floor 4 par stock.</div>
          <div className="text-xs text-[#6B6478] mt-1">Projected SLA risk ↓ 9%, cost +$60/mo.</div>
          <button data-testid="rca-apply" className="mt-4 bg-[#F47B20] hover:bg-[#d66718] text-white text-sm font-semibold px-4 py-2 rounded-full">Apply to ops plan</button>
        </div>
      </div>
    </div>
  );
}
