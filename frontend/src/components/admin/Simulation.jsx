import { useState, useMemo } from "react";
import { BackBtn } from "./AdminApp";
import { AIBadge } from "../SparkleBadge";
import { Plus, Minus } from "lucide-react";

export default function Simulation({ onBack }) {
  const [extraHk, setExtraHk] = useState(1);
  const [extraRs, setExtraRs] = useState(0);

  const result = useMemo(() => {
    const slaImprove = extraHk * 11 + extraRs * 6;
    const overtimeDrop = extraHk * 18 + extraRs * 9;
    const cost = extraHk * 240 + extraRs * 200;
    return {
      sla: Math.min(99, 94 + Math.round(slaImprove * 0.1)),
      slaDelta: slaImprove,
      otDrop: overtimeDrop,
      cost,
    };
  }, [extraHk, extraRs]);

  return (
    <div>
      <BackBtn onBack={onBack} label="Back to Dashboard" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">What-If Simulation</div>
          <h1 className="font-display font-bold text-3xl text-[#1F1B2E] mt-1">Tune staffing &amp; preview impact</h1>
          <div className="text-sm text-[#6B6478] mt-1">Try changes risk-free. AI projects SLA, overtime, and cost in real time.</div>
        </div>
        <AIBadge label="Live projection" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#A78BD9]/15 shadow-brand">
          <div className="font-display font-semibold mb-5">Adjustments</div>
          <SliderRow
            label="Add Housekeeping staff (10 AM – 2 PM)"
            value={extraHk}
            onDec={() => setExtraHk((v) => Math.max(0, v - 1))}
            onInc={() => setExtraHk((v) => Math.min(5, v + 1))}
            max={5}
            testId="sim-hk"
          />
          <SliderRow
            label="Add Room Service runner (8 PM – 11 PM)"
            value={extraRs}
            onDec={() => setExtraRs((v) => Math.max(0, v - 1))}
            onInc={() => setExtraRs((v) => Math.min(3, v + 1))}
            max={3}
            testId="sim-rs"
          />
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#5B2C91] to-[#1F1B2E] text-white p-6 shadow-brand">
          <div className="text-[10px] uppercase tracking-widest text-white/70 font-semibold">Projection</div>
          <div className="font-display font-bold text-4xl mt-2">{result.sla}%</div>
          <div className="text-sm text-white/85">Average SLA <span className="text-[#F47B20] font-semibold">+{result.slaDelta}%</span></div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-[10px] uppercase text-white/70">Overtime drop</div>
              <div className="text-xl font-display font-bold mt-1">{result.otDrop}%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-[10px] uppercase text-white/70">Daily cost</div>
              <div className="text-xl font-display font-bold mt-1">+${result.cost}</div>
            </div>
          </div>

          <button data-testid="sim-apply" className="mt-6 w-full bg-[#F47B20] hover:bg-[#d66718] text-white font-semibold py-3 rounded-full text-sm">
            Apply to tomorrow's schedule
          </button>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <SummaryStat label="Predicted complaint drop" value={`-${Math.round(result.slaDelta * 0.8)}%`} positive />
        <SummaryStat label="Forecast CSAT shift" value={`+${(result.slaDelta * 0.02).toFixed(1)}`} positive />
        <SummaryStat label="Payback period" value="≈ 14 days" positive />
      </div>
    </div>
  );
}

function SliderRow({ label, value, onDec, onInc, max, testId }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-[#1F1B2E] font-medium">{label}</div>
        <div className="text-sm font-display font-bold text-[#5B2C91]">+{value}</div>
      </div>
      <div className="flex items-center gap-3">
        <button data-testid={`${testId}-dec`} onClick={onDec} className="w-9 h-9 rounded-full bg-[#F8F6FC] grid place-items-center text-[#5B2C91] border border-[#A78BD9]/30 hover:bg-[#5B2C91] hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
        <div className="flex-1 h-2 rounded-full bg-[#F8F6FC] relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#5B2C91] to-[#F47B20] transition-all" style={{ width: `${(value / max) * 100}%` }} />
        </div>
        <button data-testid={`${testId}-inc`} onClick={onInc} className="w-9 h-9 rounded-full bg-[#F47B20] text-white grid place-items-center hover:bg-[#d66718] transition-colors"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function SummaryStat({ label, value, positive }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#A78BD9]/15">
      <div className="text-[10px] uppercase tracking-widest text-[#6B6478] font-semibold">{label}</div>
      <div className={`font-display text-2xl font-bold mt-1 ${positive ? "text-[#22C55E]" : "text-[#EF4444]"}`}>{value}</div>
    </div>
  );
}
