import { motion } from "framer-motion";
import { AlertTriangle, Zap, ArrowRight } from "lucide-react";
import { AIBadge, SparkleDot } from "../SparkleBadge";
import { ANOMALIES } from "../../data/mockData";

export default function Insights({ onDrill }) {
  const sevTone = {
    high: { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", border: "border-[#EF4444]/30" },
    med: { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", border: "border-[#F59E0B]/30" },
    low: { bg: "bg-[#22C55E]/10", text: "text-[#22C55E]", border: "border-[#22C55E]/30" },
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">AI Insights</div>
          <h1 className="font-display font-bold text-3xl text-[#1F1B2E] mt-1">Anomaly Detection</h1>
          <div className="text-sm text-[#6B6478] mt-1">Patterns surfaced by iNPLASS AI across requests, complaints, and ops signals.</div>
        </div>
        <AIBadge label="Updated 2 min ago" testId="insights-updated" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {ANOMALIES.map((a, i) => {
          const tone = sevTone[a.severity];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-2xl p-5 border ${tone.border} shadow-brand`}
            >
              <div className={`inline-flex items-center gap-1.5 ${tone.bg} ${tone.text} text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full`}>
                <AlertTriangle className="w-3 h-3" /> {a.severity.toUpperCase()}
              </div>
              <div className="font-display font-semibold text-[#1F1B2E] mt-3">{a.title}</div>
              <div className="text-xs text-[#6B6478] mt-1.5 leading-relaxed">{a.detail}</div>
              <div className="mt-4 flex items-center gap-2">
                <button data-testid={`anomaly-action-${a.id}`} className="text-[11px] font-semibold bg-[#F47B20] text-white px-3.5 py-2 rounded-full hover:bg-[#d66718] transition-colors">
                  {a.action}
                </button>
                <button onClick={() => onDrill && onDrill("rootcause")} className="text-[11px] font-semibold text-[#5B2C91] hover:underline">Trace cause</button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-[#5B2C91] to-[#1F1B2E] p-7 text-white">
        <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-[#F47B20]" /><AIBadge label="Recommended Actions" className="!bg-white/10 !border-white/25 !text-white" /></div>
        <div className="font-display font-semibold text-xl">3 one-click moves to recover SLA this evening</div>
        <ul className="mt-4 space-y-2 text-sm text-white/85">
          <li className="flex items-center justify-between gap-3 border-b border-white/10 pb-2"><span>Pull Robert K. from Floor 2 → HVAC swing</span><button className="text-[11px] font-semibold bg-[#F47B20] px-3 py-1.5 rounded-full">Apply</button></li>
          <li className="flex items-center justify-between gap-3 border-b border-white/10 pb-2"><span>Add 1 RS runner 9–10 PM</span><button className="text-[11px] font-semibold bg-[#F47B20] px-3 py-1.5 rounded-full">Apply</button></li>
          <li className="flex items-center justify-between gap-3"><span>Schedule Floor 4 AC preventive (off-peak 11 AM tomorrow)</span><button className="text-[11px] font-semibold bg-[#F47B20] px-3 py-1.5 rounded-full">Schedule</button></li>
        </ul>
      </div>
    </div>
  );
}
