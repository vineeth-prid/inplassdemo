import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { AIBadge } from "../SparkleBadge";
import { LIVE_OPS } from "../../data/mockData";
import { useDemo } from "../../context/DemoContext";

const statusTone = {
  "In Progress": "bg-[#F47B20]/15 text-[#F47B20]",
  "Assigned": "bg-[#7B3FBF]/15 text-[#7B3FBF]",
  "Queued": "bg-[#A78BD9]/20 text-[#5B2C91]",
  "Completed": "bg-[#22C55E]/15 text-[#22C55E]",
  "At Risk": "bg-[#EF4444]/15 text-[#EF4444]",
};

function rowTone(sla) {
  if (sla === "—") return "";
  const m = parseInt(sla, 10);
  if (Number.isNaN(m)) return "";
  if (m <= 5) return "bg-[#EF4444]/5";
  if (m <= 15) return "bg-[#F59E0B]/5";
  return "";
}

export default function LiveOps() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const { phase, running } = useDemo();
  const data = LIVE_OPS;
  const newRowFlash = running && phase === 4;

  const filtered = data.filter((r) => {
    if (dept !== "all" && r.dept !== dept) return false;
    if (!q) return true;
    return [r.room, r.guest, r.req, r.assignee].join(" ").toLowerCase().includes(q.toLowerCase());
  });

  const departments = ["all", "Housekeeping", "Maintenance", "Room Service", "Concierge"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">Live Operations</div>
          <h1 className="font-display font-bold text-3xl text-[#1F1B2E] mt-1">All active requests</h1>
          <div className="text-sm text-[#6B6478] mt-1">Real-time view across departments. AI priority and SLA colored.</div>
        </div>
        <AIBadge label="Auto-prioritized" />
      </div>

      <div className="bg-white rounded-2xl border border-[#A78BD9]/15 shadow-brand overflow-hidden">
        <div className="p-4 flex items-center gap-3 border-b border-[#A78BD9]/15 flex-wrap">
          <div className="flex items-center gap-2 bg-[#F8F6FC] rounded-full px-3 py-2 flex-1 min-w-[220px] border border-[#A78BD9]/25">
            <Search className="w-4 h-4 text-[#6B6478]" />
            <input
              data-testid="liveops-search"
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search room, guest, assignee…"
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-[#6B6478]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#6B6478]" />
            {departments.map((d) => (
              <button
                key={d}
                data-testid={`liveops-dept-${d}`}
                onClick={() => setDept(d)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${dept === d ? "bg-[#5B2C91] text-white" : "bg-[#F8F6FC] text-[#5B2C91] border border-[#A78BD9]/30"}`}
              >
                {d === "all" ? "All" : d}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F6FC] text-[10px] uppercase tracking-wider text-[#6B6478]">
              <tr>
                {["Room", "Guest", "Request", "Department", "Assignee", "SLA", "Status", "Priority"].map((h) => (
                  <th key={h} className="text-left font-semibold px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const isNew = newRowFlash && r.room === "412" && r.req === "Towel Request";
                return (
                  <motion.tr
                    key={`${r.room}-${i}`}
                    initial={isNew ? { background: "rgba(244,123,32,0.20)" } : {}}
                    animate={isNew ? { background: ["rgba(244,123,32,0.30)", "rgba(244,123,32,0)", "rgba(244,123,32,0.30)"] } : {}}
                    transition={isNew ? { duration: 1.6, repeat: Infinity } : {}}
                    className={`border-t border-[#A78BD9]/15 ${rowTone(r.sla)}`}
                  >
                    <td className="px-4 py-3 font-semibold text-[#1F1B2E]">{r.room}</td>
                    <td className="px-4 py-3 text-[#1F1B2E]">{r.guest}</td>
                    <td className="px-4 py-3 text-[#1F1B2E]">{r.req}</td>
                    <td className="px-4 py-3 text-[#6B6478]">{r.dept}</td>
                    <td className="px-4 py-3 text-[#6B6478]">{r.assignee}</td>
                    <td className={`px-4 py-3 font-semibold ${r.sla === "2m" ? "text-[#EF4444]" : r.sla === "—" ? "text-[#22C55E]" : "text-[#1F1B2E]"}`}>{r.sla}</td>
                    <td className="px-4 py-3"><span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${statusTone[r.status]}`}>{r.status}</span></td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center w-9 h-7 rounded-md text-[11px] font-bold text-white" style={{ background: r.priority >= 90 ? "#EF4444" : r.priority >= 70 ? "#F47B20" : "#A78BD9" }}>{r.priority}</span>
                    </td>
                  </motion.tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-[#6B6478] text-sm">No matching requests.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
