import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home, ListChecks, Map, FileText, User, ChevronLeft, ChevronRight, Bell,
  CheckCircle2, Circle, Camera, Clock, MapPin, Zap, ArrowRight, X, MessageSquare, Send,
} from "lucide-react";
import { PhoneFrame } from "../PhoneFrame";
import { AIBadge, SparkleDot } from "../SparkleBadge";
import { STAFF, STAFF_TASKS, AC_CHECKLIST, HANDOVER_BULLETS } from "../../data/mockData";
import { useDemo } from "../../context/DemoContext";

const TABS = [
  { key: "dashboard", label: "Tasks", icon: Home },
  { key: "list", label: "Queue", icon: ListChecks },
  { key: "map", label: "Route", icon: Map },
  { key: "handover", label: "Handover", icon: FileText },
];

export default function StaffApp({ embedded = false, scale = 1 }) {
  const [tab, setTab] = useState("dashboard");
  const [detailTask, setDetailTask] = useState(null);
  const navigate = useNavigate();
  const { phase, running } = useDemo();

  useEffect(() => {
    if (!running) return;
    if (phase === 3) setTab("dashboard");
    if (phase === 5) setTab("list");
  }, [phase, running]);

  const content = (
    <div className="relative h-full flex flex-col">
      {!embedded && (
        <div className="absolute top-2 left-3 z-40">
          <button data-testid="staff-back-btn" onClick={() => navigate("/")} className="bg-black/40 backdrop-blur-md text-white p-2 rounded-full">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {tab === "dashboard" && <StaffDashboard onOpenTask={(t) => setDetailTask(t)} />}
        {tab === "list" && <StaffTaskList onOpenTask={(t) => setDetailTask(t)} />}
        {tab === "map" && <StaffMap />}
        {tab === "handover" && <StaffHandover />}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#A78BD9]/20 px-3 pt-2 pb-5">
        <div className="grid grid-cols-4 gap-1">
          {TABS.map((t) => {
            const Icon = t.icon; const active = tab === t.key;
            return (
              <button
                key={t.key}
                data-testid={`staff-tab-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`flex flex-col items-center gap-1 py-2 rounded-xl ${active ? "text-[#5B2C91]" : "text-[#6B6478]"}`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
                <span className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {detailTask && <TaskDetailModal task={detailTask} onClose={() => setDetailTask(null)} />}
      </AnimatePresence>
    </div>
  );

  if (embedded) return content;
  return <PhoneFrame testId="staff-app-frame" scale={scale}>{content}</PhoneFrame>;
}

/* --------------------- DASHBOARD --------------------- */
function StaffDashboard({ onOpenTask }) {
  const { phase, running } = useDemo();
  const tasks = STAFF_TASKS;
  const nextBest = tasks[0]; // T-401 — Room 412 towels
  const newTaskHighlight = running && phase === 3;
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 pt-2">
        <img src={STAFF.avatar} alt={STAFF.firstName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-brand" />
        <div className="flex-1">
          <div className="text-xs text-[#6B6478]">{STAFF.role}</div>
          <div className="font-display font-semibold text-lg text-[#1F1B2E] leading-tight">{STAFF.firstName} {STAFF.lastName}</div>
          <div className="text-[11px] text-[#22C55E] font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> {STAFF.shift}</div>
        </div>
        <button data-testid="staff-bell" className="relative w-9 h-9 rounded-full bg-[#F8F6FC] grid place-items-center">
          <Bell className="w-4 h-4 text-[#5B2C91]" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#F47B20] text-white text-[9px] font-bold grid place-items-center">3</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <KPIBox label="Open Tasks" value="12" tone="brand" />
        <KPIBox label="SLA Risk" value="2" tone="warn" />
        <KPIBox label="Done Today" value="18" tone="good" />
      </div>

      <motion.button
        layout
        animate={newTaskHighlight ? { scale: [1, 1.03, 1], boxShadow: ["0 8px 30px rgba(91,44,145,0.10)", "0 20px 60px rgba(244,123,32,0.45)", "0 8px 30px rgba(91,44,145,0.10)"] } : {}}
        transition={{ duration: 1.2, repeat: newTaskHighlight ? Infinity : 0 }}
        onClick={() => onOpenTask(nextBest)}
        data-testid="staff-next-best-action"
        className="relative w-full text-left bg-brand-gradient text-white rounded-3xl p-5 overflow-hidden"
      >
        <div className="absolute inset-0 ai-shimmer opacity-60" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <AIBadge label="Next Best Action" className="!bg-white/10 !border-white/25 !text-white" />
            <span className="text-[10px] uppercase tracking-widest text-white/70">{newTaskHighlight ? "Just in" : "Now"}</span>
          </div>
          <div className="mt-3 font-display text-lg font-semibold leading-snug">🎯 Room {nextBest.room} — {nextBest.type}</div>
          <div className="text-xs text-white/80 mt-1">{nextBest.guest} {nextBest.vip && "· VIP"} · {nextBest.distance} · SLA {nextBest.slaMin}m</div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[11px] text-white/70">AI Priority <span className="text-white font-semibold">{nextBest.priority}</span></div>
            <span className="inline-flex items-center gap-1.5 bg-[#F47B20] text-white text-xs font-semibold px-4 py-2 rounded-full">
              Start Task <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </motion.button>

      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="font-display font-semibold text-sm text-[#1F1B2E]">AI-Ranked Queue</div>
          <span className="text-[10px] text-[#6B6478]">SLA · proximity · impact</span>
        </div>
        <div className="space-y-2">
          {tasks.slice(0, 3).map((t) => <TaskCard key={t.id} t={t} onOpen={() => onOpenTask(t)} />)}
        </div>
      </div>
    </div>
  );
}

function KPIBox({ label, value, tone }) {
  const tones = {
    brand: "bg-[#F8F6FC] text-[#5B2C91]",
    warn: "bg-[#FFF4E5] text-[#F47B20]",
    good: "bg-[#E8FBF1] text-[#22C55E]",
  };
  return (
    <div className={`rounded-2xl p-3 ${tones[tone]}`}>
      <div className="text-[10px] uppercase tracking-wide font-semibold opacity-80">{label}</div>
      <div className="text-xl font-display font-bold mt-1">{value}</div>
    </div>
  );
}

function TaskCard({ t, onOpen }) {
  const colorMap = {
    high: "bg-[#EF4444] text-white",
    med: "bg-[#F59E0B] text-white",
    low: "bg-[#A78BD9] text-white",
  };
  return (
    <button
      data-testid={`staff-task-${t.id}`}
      onClick={onOpen}
      className="w-full text-left bg-white rounded-2xl p-3 border border-[#A78BD9]/15 shadow-brand hover:-translate-y-0.5 transition-transform flex items-center gap-3"
    >
      <div className={`w-11 h-11 rounded-xl grid place-items-center text-[11px] font-bold ${colorMap[t.priorityLevel]}`}>
        {t.priority}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-[#1F1B2E] text-sm leading-tight truncate">Room {t.room} · {t.type}</div>
          {t.vip && <span className="text-[9px] font-bold text-[#F47B20] bg-[#F47B20]/10 px-1.5 py-0.5 rounded">VIP</span>}
        </div>
        <div className="text-[11px] text-[#6B6478] mt-0.5 flex items-center gap-2">
          <Clock className="w-3 h-3" /> SLA {t.slaMin}m · ETA {t.etaMin}m
          <MapPin className="w-3 h-3 ml-1" /> {t.distance}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-[#6B6478]" />
    </button>
  );
}

/* --------------------- TASK LIST --------------------- */
function StaffTaskList({ onOpenTask }) {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "Housekeeping", "Maintenance", "Room Service"];
  const filtered = STAFF_TASKS.filter((t) => filter === "all" || t.dept === filter);
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display font-semibold text-lg text-[#1F1B2E]">Task Queue</div>
          <div className="text-[11px] text-[#6B6478] flex items-center gap-1"><SparkleDot className="w-3 h-3" /> AI-ranked by SLA, distance, impact</div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
        {filters.map((f) => (
          <button
            key={f}
            data-testid={`staff-filter-${f}`}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${filter === f ? "bg-[#5B2C91] text-white" : "bg-white text-[#5B2C91] border border-[#A78BD9]/30"}`}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((t) => <TaskCard key={t.id} t={t} onOpen={() => onOpenTask(t)} />)}
      </div>
    </div>
  );
}

/* --------------------- TASK DETAIL + COPILOT --------------------- */
function TaskDetailModal({ task, onClose }) {
  const [checklist, setChecklist] = useState(AC_CHECKLIST);
  const [copilot, setCopilot] = useState(false);
  const toggle = (id) => setChecklist((cl) => cl.map((i) => i.id === id ? { ...i, done: !i.done } : i));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 z-50">
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30 }}
        className="absolute bottom-0 left-0 right-0 max-h-[90%] bg-[#F8F6FC] rounded-t-3xl flex flex-col"
      >
        <div className="px-5 py-4 bg-brand-gradient text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/70">Task · {task.id}</div>
              <div className="font-display font-semibold text-lg mt-1">Room {task.room} — {task.type}</div>
              <div className="text-xs text-white/80 mt-0.5">{task.guest} · {task.distance}</div>
            </div>
            <button data-testid="task-close" onClick={onClose} className="text-white/80"><X className="w-5 h-5" /></button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="bg-white/15 px-2 py-1 rounded-full">SLA {task.slaMin}m</span>
            <span className="bg-white/15 px-2 py-1 rounded-full">ETA {task.etaMin}m</span>
            <span className="bg-[#F47B20] px-2 py-1 rounded-full font-semibold">Priority {task.priority}</span>
          </div>
        </div>
        <div className="overflow-y-auto hide-scrollbar p-5 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-display font-semibold text-sm text-[#1F1B2E]">AI Diagnostic Checklist</div>
              <AIBadge label="Auto-generated" />
            </div>
            <div className="bg-white rounded-2xl border border-[#A78BD9]/15 divide-y divide-[#A78BD9]/15">
              {checklist.map((c) => (
                <button
                  key={c.id}
                  data-testid={`checklist-${c.id}`}
                  onClick={() => toggle(c.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  {c.done ? <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" /> : <Circle className="w-5 h-5 text-[#A78BD9] shrink-0" />}
                  <span className={`text-sm ${c.done ? "line-through text-[#6B6478]" : "text-[#1F1B2E]"}`}>{c.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button data-testid="copilot-btn" onClick={() => setCopilot(true)} className="bg-white rounded-2xl p-4 border border-[#A78BD9]/15 text-left">
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#5B2C91]" /><span className="text-xs font-semibold text-[#5B2C91]">Ask AI Copilot</span></div>
              <div className="text-[11px] text-[#6B6478] mt-1">SOPs, manuals, escalation paths</div>
            </button>
            <button className="bg-white rounded-2xl p-4 border border-[#A78BD9]/15 text-left">
              <div className="flex items-center gap-2"><Camera className="w-4 h-4 text-[#F47B20]" /><span className="text-xs font-semibold text-[#5B2C91]">Photo QA</span></div>
              <div className="text-[11px] text-[#6B6478] mt-1">Verify completion</div>
            </button>
          </div>

          <button data-testid="task-complete-btn" onClick={onClose} className="w-full bg-[#F47B20] hover:bg-[#d66718] text-white font-semibold py-3.5 rounded-full text-sm">
            Mark Complete · Notify Guest
          </button>
        </div>
        <AnimatePresence>{copilot && <CopilotChat onClose={() => setCopilot(false)} />}</AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function CopilotChat({ onClose }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "ai", text: "Hi Linda — I'm your AI Copilot. Ask anything about SOPs, manuals, or escalation." },
    { from: "user", text: "How do I reset this AC model?" },
    { from: "ai", text: "Hold the MODE + TEMP↑ for 5s until the panel beeps twice. If noise persists, mark sub-task 4 and escalate to HVAC ext. 412." },
  ]);
  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "ai", text: "Got it — pulling SOP §3.2. Filter cleaning interval is every 30 days; last logged 41 days ago. I recommend swapping the filter as well." }]), 700);
  };
  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30 }} className="absolute inset-0 bg-[#F8F6FC] flex flex-col">
      <div className="bg-brand-gradient text-white px-5 py-4 flex items-center gap-3">
        <SparkleDot className="w-5 h-5" />
        <div className="flex-1">
          <div className="font-semibold text-sm">AI Copilot</div>
          <div className="text-[10px] text-white/70">Trained on your hotel's SOPs</div>
        </div>
        <button data-testid="copilot-close" onClick={onClose}><X className="w-5 h-5" /></button>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${m.from === "user" ? "bg-[#5B2C91] text-white" : "bg-white text-[#1F1B2E] border border-[#A78BD9]/20"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-white border-t border-[#A78BD9]/15 flex items-center gap-2">
        <input
          data-testid="copilot-input"
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask the Copilot…"
          className="flex-1 bg-[#F8F6FC] outline-none px-4 py-2.5 rounded-full text-sm border border-[#A78BD9]/30"
        />
        <button data-testid="copilot-send" onClick={send} className="w-10 h-10 rounded-full bg-[#5B2C91] grid place-items-center text-white"><Send className="w-4 h-4" /></button>
      </div>
    </motion.div>
  );
}

/* --------------------- ROUTE MAP --------------------- */
function StaffMap() {
  const pins = [
    { room: "412", x: 30, y: 38, hot: true },
    { room: "415", x: 58, y: 38, hot: false },
    { room: "421", x: 78, y: 42, hot: false },
    { room: "404", x: 18, y: 52, hot: false },
  ];
  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="font-display font-semibold text-lg text-[#1F1B2E]">Floor 4 — Route</div>
        <div className="text-[11px] text-[#6B6478] flex items-center gap-1"><SparkleDot className="w-3 h-3" /> AI-optimized for SLA + walking distance</div>
      </div>
      <div className="relative h-72 rounded-2xl bg-gradient-to-br from-[#F8F6FC] to-white border border-[#A78BD9]/20 overflow-hidden">
        {/* corridor */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-12 bg-[#A78BD9]/15 rounded-md border-y border-[#A78BD9]/30" />
        {/* room blocks */}
        <div className="absolute left-[10%] right-[10%] top-[8%] h-1/3 grid grid-cols-5 gap-1">
          {[401, 403, 405, 407, 409].map((r) => <div key={r} className="bg-white border border-[#A78BD9]/30 rounded grid place-items-center text-[9px] text-[#6B6478]">{r}</div>)}
        </div>
        <div className="absolute left-[10%] right-[10%] bottom-[8%] h-1/3 grid grid-cols-5 gap-1">
          {[412, 414, 416, 418, 420].map((r) => <div key={r} className={`border rounded grid place-items-center text-[9px] ${r === 412 ? "bg-[#F47B20]/15 border-[#F47B20] text-[#F47B20] font-bold" : "bg-white border-[#A78BD9]/30 text-[#6B6478]"}`}>{r}</div>)}
        </div>
        {/* optimized path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 12 80 Q 30 60 30 50 T 60 50 T 85 50" fill="none" stroke="#F47B20" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
        {pins.map((p) => (
          <div key={p.room} style={{ left: `${p.x}%`, top: `${p.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
            <div className={`relative w-7 h-7 rounded-full grid place-items-center text-[10px] font-bold text-white shadow-brand ${p.hot ? "bg-[#F47B20]" : "bg-[#5B2C91]"}`}>
              {p.room.slice(-2)}
              {p.hot && <span className="absolute inset-0 rounded-full ring-2 ring-[#F47B20]/40 animate-ping" />}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-[#5B2C91]/10 to-[#F47B20]/10 border border-[#F47B20]/25 p-4">
        <div className="flex items-center gap-2 mb-1"><Zap className="w-4 h-4 text-[#F47B20]" /><AIBadge label="Insight" /></div>
        <div className="text-sm font-semibold text-[#1F1B2E]">Bundle 4 tasks on Floor 4 — saves 12 min</div>
        <div className="text-xs text-[#6B6478] mt-1">412 towels → 412 AC → 415 turndown → 420 amenity. Total walk 380m.</div>
        <button className="mt-3 bg-[#F47B20] text-white text-xs font-semibold px-4 py-2 rounded-full">Accept bundle</button>
      </div>
    </div>
  );
}

/* --------------------- HANDOVER --------------------- */
function StaffHandover() {
  const tagColor = {
    Open: "bg-[#F47B20]/15 text-[#F47B20] border-[#F47B20]/30",
    VIP: "bg-[#5B2C91]/15 text-[#5B2C91] border-[#5B2C91]/30",
    Blocker: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30",
    Tip: "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30",
  };
  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#7B3FBF] font-semibold">End of Shift</div>
        <div className="font-display font-semibold text-lg text-[#1F1B2E] mt-1">Handover Summary</div>
        <div className="text-[11px] text-[#6B6478] flex items-center gap-1 mt-1"><SparkleDot className="w-3 h-3" /> Auto-generated by iNPLASS AI</div>
      </div>

      <div className="rounded-2xl bg-white border border-[#A78BD9]/15 shadow-brand p-4">
        <div className="text-xs text-[#6B6478]">Shift summary · {STAFF.firstName} {STAFF.lastName} · 14:00 – 22:00</div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="text-center"><div className="text-lg font-display font-bold text-[#1F1B2E]">18</div><div className="text-[10px] uppercase text-[#6B6478]">Completed</div></div>
          <div className="text-center"><div className="text-lg font-display font-bold text-[#1F1B2E]">94%</div><div className="text-[10px] uppercase text-[#6B6478]">SLA</div></div>
          <div className="text-center"><div className="text-lg font-display font-bold text-[#1F1B2E]">4.8★</div><div className="text-[10px] uppercase text-[#6B6478]">CSAT</div></div>
        </div>
      </div>

      <div className="space-y-2">
        {HANDOVER_BULLETS.map((b, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#A78BD9]/15 p-3 flex gap-3">
            <span className={`text-[10px] font-bold uppercase border rounded-full px-2 py-0.5 h-fit ${tagColor[b.tag]}`}>{b.tag}</span>
            <div className="text-sm text-[#1F1B2E] leading-relaxed">{b.text}</div>
          </div>
        ))}
      </div>

      <button data-testid="handover-share" className="w-full bg-[#F47B20] text-white font-semibold py-3.5 rounded-full text-sm">
        Share with next supervisor
      </button>
    </div>
  );
}
