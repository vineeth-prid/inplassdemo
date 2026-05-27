import { BackBtn } from "./AdminApp";
import { AIBadge } from "../SparkleBadge";
import { STAFFING_HEATMAP } from "../../data/mockData";

function cellTone(curr, rec) {
  if (rec > curr) return "bg-[#F47B20]/85 text-white"; // under-staffed
  if (rec < curr) return "bg-[#A78BD9]/40 text-[#1F1B2E]"; // over-staffed
  return "bg-[#5B2C91] text-white"; // matched
}

export default function Forecast({ onBack }) {
  return (
    <div>
      <BackBtn onBack={onBack} label="Back to Dashboard" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">Forecast-Driven Staffing</div>
          <h1 className="font-display font-bold text-3xl text-[#1F1B2E] mt-1">Tomorrow's recommended schedule</h1>
          <div className="text-sm text-[#6B6478] mt-1">AI maps predicted demand to optimal staffing across departments.</div>
        </div>
        <AIBadge label="Demand forecast · 96% acc" testId="forecast-acc" />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#A78BD9]/15 shadow-brand overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="font-display font-semibold text-[#1F1B2E] pb-3 pr-4 min-w-[150px]">Department</th>
              {STAFFING_HEATMAP.hours.map((h) => (
                <th key={h} className="text-[11px] font-semibold text-[#6B6478] pb-3 px-1 text-center">{h}</th>
              ))}
              <th className="text-[11px] font-semibold text-[#6B6478] pb-3 pl-2 text-center min-w-[60px]">Δ</th>
            </tr>
          </thead>
          <tbody>
            {STAFFING_HEATMAP.rows.map((row) => {
              const delta = row.rec.reduce((s, v, i) => s + (v - row.current[i]), 0);
              return (
                <tr key={row.dept} className="border-t border-[#A78BD9]/15">
                  <td className="py-3 pr-4 font-semibold text-[#1F1B2E]">{row.dept}</td>
                  {row.rec.map((rec, i) => {
                    const curr = row.current[i];
                    return (
                      <td key={i} className="px-1 py-2 text-center">
                        <div className={`mx-auto w-10 h-10 rounded-lg grid place-items-center text-xs font-bold ${cellTone(curr, rec)}`}>
                          {rec}
                        </div>
                        <div className="text-[9px] text-[#6B6478] mt-1">was {curr}</div>
                      </td>
                    );
                  })}
                  <td className="pl-2 text-center">
                    <span className={`text-xs font-bold ${delta > 0 ? "text-[#F47B20]" : delta < 0 ? "text-[#22C55E]" : "text-[#6B6478]"}`}>{delta > 0 ? `+${delta}` : delta}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-[#6B6478]">
          <Legend color="#5B2C91" label="Matched" />
          <Legend color="#F47B20" label="Increase recommended" />
          <Legend color="#A78BD9" label="Reduce / hold" />
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <Insight title="Forecast confidence" value="96%" desc="Based on 18 months of operational data + local event signals." />
        <Insight title="Net cost change" value="+$640" desc="Across all departments, vs reactive scheduling baseline." />
        <Insight title="Expected SLA gain" value="+7.4%" desc="Across day-shifts where coverage is currently bottlenecking." accent />
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: color }} /> {label}</span>
  );
}

function Insight({ title, value, desc, accent }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-gradient-to-br from-[#F47B20]/10 to-[#5B2C91]/10 border-[#F47B20]/25" : "bg-white border-[#A78BD9]/15"} shadow-brand`}>
      <div className="text-[10px] uppercase tracking-widest text-[#6B6478] font-semibold">{title}</div>
      <div className={`font-display text-2xl font-bold mt-2 ${accent ? "text-[#F47B20]" : "text-[#1F1B2E]"}`}>{value}</div>
      <div className="text-xs text-[#6B6478] mt-1 leading-relaxed">{desc}</div>
    </div>
  );
}
