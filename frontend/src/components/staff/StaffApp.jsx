import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home, ListChecks, Map, FileText, ChevronLeft, ChevronRight, Bell,
  CheckCircle2, Circle, Camera, Clock, MapPin, Zap, ArrowRight, X, MessageSquare, Send,
  Plus, ClipboardEdit, Package, Utensils, Wrench, BedDouble,
} from "lucide-react";
import { PhoneFrame } from "../PhoneFrame";
import { AIBadge, SparkleDot } from "../SparkleBadge";
import {
  STAFF, STAFF_TASKS, AC_CHECKLIST, HANDOVER_BULLETS,
  DELIVERY_STEPS, FOOD_STEPS, CHECKOUT_CHECKLIST, WIFI_STEPS,
  RAISE_REQUEST_TYPES, ROOMS_FOR_RAISE,
} from "../../data/mockData";
import { useDemo } from "../../context/DemoContext";

const TABS = [
  { key: "dashboard", label: "Tasks", icon: Home },
  { key: "list", label: "Queue", icon: ListChecks },
  { key: "map", label: "Route", icon: Map },
  { key: "handover", label: "Handover", icon: FileText },
];

const DEPT_COLOR = {
  Housekeeping: "bg-[#5B2C91]/12 text-[#5B2C91] border-[#5B2C91]/25",
  Maintenance: "bg-[#F47B20]/12 text-[#F47B20] border-[#F47B20]/30",
  "Room Service": "bg-[#7B3FBF]/12 text-[#7B3FBF] border-[#7B3FBF]/25",
  "Front Desk": "bg-[#A78BD9]/15 text-[#5B2C91] border-[#A78BD9]/35",
  Concierge: "bg-[#22C55E]/12 text-[#22C55E] border-[#22C55E]/25",
};

const KIND_ICON = {
  delivery: Package,
  food: Utensils,
  diagnostic: Wrench,
  diagnostic_short: Wrench,
  checkout: BedDouble,
};

export default function StaffApp({ embedded = false, scale = 1 }) {
  const [tab, setTab] = useState("dashboard");
  const [detailTask, setDetailTask] = useState(null);
  const [showRaise, setShowRaise] = useState(false);
  const [tasks, setTasks] = useState(STAFF_TASKS);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { phase, running } = useDemo();

  useEffect(() => {
    if (!running) return;
    if (phase === 3) setTab("dashboard");
    if (phase === 5) setTab("list");
  }, [phase, running]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    setToast(`Ticket raised · Room ${newTask.room}`);
  };

  const content = (
    <div className="relative h-full flex flex-col">
      {!embedded && (
        <div className="absolute top-2 left-3 z-40">
          <button data-testid="staff-back-btn" onClick={() => navigate("/")} className="bg-black/40 backdrop-blur-md text-white p-2 rounded-full">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-28">
        {tab === "dashboard" && <StaffDashboard tasks={tasks} onOpenTask={setDetailTask} onRaise={() => setShowRaise(true)} />}
        {tab === "list" && <StaffTaskList tasks={tasks} onOpenTask={setDetailTask} onRaise={() => setShowRaise(true)} />}
        {tab === "map" && <StaffMap />}
        {tab === "handover" && <StaffHandover />}
      </div>

      {/* Floating Raise button on Dashboard + Queue */}
      {(tab === "dashboard" || tab === "list") && (
        <button
          data-testid="staff-raise-fab"
          onClick={() => setShowRaise(true)}
          className="absolute bottom-24 right-4 z-30 inline-flex items-center gap-2 bg-[#F47B20] hover:bg-[#d66718] text-white text-xs font-semibold px-4 py-3 rounded-full shadow-[0_12px_30px_rgba(244,123,32,0.45)]"
        >
          <Plus className="w-4 h-4" /> Raise for Guest
        </button>
      )}

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
        {showRaise && <RaiseRequestSheet onClose={() => setShowRaise(false)} onSubmit={(t) => { addTask(t); setShowRaise(false); }} />}
        {toast && (
          <motion.div
            key={toast}
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            data-testid="staff-toast"
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#22C55E] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-brand"
          >
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (embedded) return content;
  return <PhoneFrame testId="staff-app-frame" scale={scale}>{content}</PhoneFrame>;
}

/* --------------------- DASHBOARD --------------------- */
function StaffDashboard({ tasks, onOpenTask, onRaise }) {
  const { phase, running } = useDemo();
  const nextBest = tasks[0];
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
        <KPIBox label="Open Tasks" value={String(tasks.length + 6)} tone="brand" />
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
          <div className="mt-2"><DeptBadge dept={nextBest.dept} dark /></div>
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
          {tasks.slice(0, 4).map((t) => <TaskCard key={t.id} t={t} onOpen={() => onOpenTask(t)} />)}
        </div>
      </div>
    </div>
  );
}

function DeptBadge({ dept, dark = false }) {
  const tone = dark
    ? "bg-white/15 text-white border-white/25"
    : DEPT_COLOR[dept] || "bg-[#F8F6FC] text-[#5B2C91] border-[#A78BD9]/30";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wide border ${tone}`}>
      {dept}
    </span>
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
        <div className="flex items-center gap-2 flex-wrap">
          <div className="font-semibold text-[#1F1B2E] text-sm leading-tight">Room {t.room} · {t.type}</div>
          {t.vip && <span className="text-[9px] font-bold text-[#F47B20] bg-[#F47B20]/10 px-1.5 py-0.5 rounded">VIP</span>}
        </div>
        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
          <DeptBadge dept={t.dept} />
          <span className="text-[10px] text-[#6B6478]">· {t.guest}</span>
        </div>
        <div className="text-[11px] text-[#6B6478] mt-1 flex items-center gap-2">
          <Clock className="w-3 h-3" /> SLA {t.slaMin}m · ETA {t.etaMin}m
          <MapPin className="w-3 h-3 ml-1" /> {t.distance}
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-[#6B6478]" />
    </button>
  );
}

/* --------------------- TASK LIST --------------------- */
function StaffTaskList({ tasks, onOpenTask }) {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "Housekeeping", "Maintenance", "Room Service", "Front Desk"];
  const filtered = tasks.filter((t) => filter === "all" || t.dept === filter);
  return (
    <div className="p-4 space-y-3">
      <div>
        <div className="font-display font-semibold text-lg text-[#1F1B2E]">Task Queue</div>
        <div className="text-[11px] text-[#6B6478] flex items-center gap-1"><SparkleDot className="w-3 h-3" /> AI-ranked by SLA, distance, impact</div>
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

/* --------------------- TASK DETAIL · POLYMORPHIC --------------------- */
function TaskDetailModal({ task, onClose }) {
  const [copilot, setCopilot] = useState(false);
  const Icon = KIND_ICON[task.kind] || Package;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 z-50">
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30 }}
        className="absolute bottom-0 left-0 right-0 max-h-[90%] bg-[#F8F6FC] rounded-t-3xl flex flex-col"
      >
        <div className="px-5 py-4 bg-brand-gradient text-white rounded-t-3xl">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-white/70">Task · {task.id}</div>
              <div className="font-display font-semibold text-lg mt-1 leading-tight truncate">Room {task.room} — {task.type}</div>
              <div className="text-xs text-white/80 mt-0.5 truncate">{task.guest} · {task.distance}</div>
              <div className="mt-2"><DeptBadge dept={task.dept} dark /></div>
            </div>
            <button data-testid="task-close" onClick={onClose} className="text-white/80 shrink-0"><X className="w-5 h-5" /></button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
            <span className="bg-white/15 px-2 py-1 rounded-full">SLA {task.slaMin}m</span>
            <span className="bg-white/15 px-2 py-1 rounded-full">ETA {task.etaMin}m</span>
            <span className="bg-[#F47B20] px-2 py-1 rounded-full font-semibold">Priority {task.priority}</span>
          </div>
        </div>

        <div className="overflow-y-auto hide-scrollbar p-5 space-y-4">
          {task.kind === "delivery" && <DeliveryPanel task={task} />}
          {task.kind === "food" && <FoodPanel task={task} />}
          {task.kind === "checkout" && <ChecklistPanel title="Checkout Checklist" items={CHECKOUT_CHECKLIST} aiLabel="SOP-bound" />}
          {task.kind === "diagnostic" && <ChecklistPanel title="AI Diagnostic Checklist" items={AC_CHECKLIST} aiLabel="Auto-generated" />}
          {task.kind === "diagnostic_short" && <ChecklistPanel title="Quick Fix Steps" items={WIFI_STEPS} aiLabel="Auto-generated" />}

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

function DeliveryPanel({ task }) {
  const d = task.details || {};
  const [steps, setSteps] = useState(DELIVERY_STEPS.map((s, i) => ({ ...s, done: i === 0 })));
  const Icon = KIND_ICON[task.kind] || Package;
  return (
    <>
      <div className="bg-white rounded-2xl border border-[#A78BD9]/15 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#5B2C91]" />
            <span className="text-sm font-semibold text-[#1F1B2E]">Items to deliver</span>
          </div>
          <AIBadge label="Auto-packed" />
        </div>
        <ul className="space-y-2">
          {(d.items || []).map((it) => (
            <li key={it.name} className="flex items-center justify-between text-sm">
              <span className="text-[#1F1B2E]">{it.name}</span>
              <span className="text-[#5B2C91] font-semibold">×{it.qty}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t border-[#A78BD9]/15 text-xs text-[#6B6478]">
          <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Pickup: <span className="font-semibold text-[#1F1B2E]">{d.pickup}</span></div>
          {d.note && <div className="mt-1.5 flex items-start gap-1.5"><SparkleDot className="w-3 h-3 mt-0.5" /> <span className="italic">{d.note}</span></div>}
        </div>
      </div>
      <StepFlow steps={steps} setSteps={setSteps} title="Delivery flow" />
    </>
  );
}

function FoodPanel({ task }) {
  const d = task.details || {};
  const [steps, setSteps] = useState(FOOD_STEPS.map((s, i) => ({ ...s, done: i === 0 })));
  return (
    <>
      <div className="bg-white rounded-2xl border border-[#A78BD9]/15 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2"><Utensils className="w-4 h-4 text-[#7B3FBF]" /><span className="text-sm font-semibold text-[#1F1B2E]">Order details</span></div>
          <AIBadge label="From PMS" />
        </div>
        <div className="text-sm text-[#1F1B2E] font-semibold leading-snug">{d.order}</div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-[#6B6478]">
          <div>Ticket <div className="font-semibold text-[#1F1B2E]">{d.ticket}</div></div>
          <div>Setup <div className="font-semibold text-[#1F1B2E]">{d.table}</div></div>
          <div>Pickup <div className="font-semibold text-[#1F1B2E]">{d.pickup}</div></div>
          <div>Dietary <div className="font-semibold text-[#F47B20]">{d.diet}</div></div>
        </div>
      </div>
      <StepFlow steps={steps} setSteps={setSteps} title="Service flow" />
    </>
  );
}

function StepFlow({ steps, setSteps, title }) {
  const toggle = (id) => setSteps((s) => s.map((x) => x.id === id ? { ...x, done: !x.done } : x));
  return (
    <div className="bg-white rounded-2xl border border-[#A78BD9]/15 overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between border-b border-[#A78BD9]/15">
        <span className="text-sm font-semibold text-[#1F1B2E]">{title}</span>
        <AIBadge label="Live tracked" />
      </div>
      <div className="divide-y divide-[#A78BD9]/15">
        {steps.map((c) => (
          <button
            key={c.id}
            data-testid={`flow-step-${c.id}`}
            onClick={() => toggle(c.id)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left"
          >
            {c.done ? <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" /> : <Circle className="w-5 h-5 text-[#A78BD9] shrink-0" />}
            <span className={`text-sm ${c.done ? "line-through text-[#6B6478]" : "text-[#1F1B2E]"}`}>{c.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChecklistPanel({ title, items, aiLabel }) {
  const [list, setList] = useState(items);
  const toggle = (id) => setList((cl) => cl.map((i) => i.id === id ? { ...i, done: !i.done } : i));
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="font-display font-semibold text-sm text-[#1F1B2E]">{title}</div>
        <AIBadge label={aiLabel} />
      </div>
      <div className="bg-white rounded-2xl border border-[#A78BD9]/15 divide-y divide-[#A78BD9]/15">
        {list.map((c) => (
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
  );
}

/* --------------------- RAISE REQUEST --------------------- */
function RaiseRequestSheet({ onClose, onSubmit }) {
  const [room, setRoom] = useState(ROOMS_FOR_RAISE[0].room);
  const [typeKey, setTypeKey] = useState("towel");
  const [note, setNote] = useState("");

  const submit = () => {
    const reqType = RAISE_REQUEST_TYPES.find((r) => r.key === typeKey);
    const guest = ROOMS_FOR_RAISE.find((r) => r.room === room)?.guest || "Guest";
    const newTask = {
      id: `T-${Math.floor(Math.random() * 900 + 100)}`,
      room,
      guest,
      type: reqType.label,
      dept: reqType.dept,
      priority: 70 + Math.floor(Math.random() * 15),
      priorityLevel: "med",
      slaMin: 20,
      etaMin: 9,
      distance: `Floor ${room.charAt(0)}`,
      vip: false,
      kind: reqType.kind,
      details:
        reqType.kind === "delivery"
          ? { items: [{ name: reqType.label, qty: 1 }], pickup: "Auto-routed", note: note || "Raised by staff" }
          : reqType.kind === "food"
          ? { order: note || "Custom order", table: "Tray service", ticket: `RS-#${Math.floor(Math.random() * 9000)}`, diet: "—", pickup: "Kitchen pass" }
          : undefined,
    };
    onSubmit(newTask);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 z-50">
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30 }}
        className="absolute bottom-0 left-0 right-0 max-h-[88%] bg-[#F8F6FC] rounded-t-3xl flex flex-col"
      >
        <div className="px-5 py-4 bg-brand-gradient text-white rounded-t-3xl flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2"><ClipboardEdit className="w-4 h-4" /><AIBadge label="On behalf of Guest" className="!bg-white/10 !border-white/25 !text-white" /></div>
            <div className="font-display font-semibold text-lg mt-1">Raise a Request</div>
            <div className="text-xs text-white/80">AI will auto-classify, route, and notify the guest.</div>
          </div>
          <button data-testid="raise-close" onClick={onClose} className="text-white/80"><X className="w-5 h-5" /></button>
        </div>

        <div className="overflow-y-auto hide-scrollbar p-5 space-y-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#7B3FBF] font-semibold mb-2">Select room</div>
            <div className="grid grid-cols-3 gap-2">
              {ROOMS_FOR_RAISE.map((r) => (
                <button
                  key={r.room}
                  data-testid={`raise-room-${r.room}`}
                  onClick={() => setRoom(r.room)}
                  className={`rounded-xl p-2.5 text-left border transition-colors ${room === r.room ? "bg-[#5B2C91] text-white border-[#5B2C91]" : "bg-white text-[#1F1B2E] border-[#A78BD9]/25"}`}
                >
                  <div className="text-sm font-bold">{r.room}</div>
                  <div className={`text-[10px] truncate ${room === r.room ? "text-white/80" : "text-[#6B6478]"}`}>{r.guest}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#7B3FBF] font-semibold mb-2">Request type</div>
            <div className="flex flex-wrap gap-2">
              {RAISE_REQUEST_TYPES.map((r) => (
                <button
                  key={r.key}
                  data-testid={`raise-type-${r.key}`}
                  onClick={() => setTypeKey(r.key)}
                  className={`px-3 py-2 rounded-full text-xs font-semibold transition-colors border ${typeKey === r.key ? "bg-[#F47B20] text-white border-[#F47B20]" : "bg-white text-[#5B2C91] border-[#A78BD9]/30"}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#7B3FBF] font-semibold mb-2">Note (optional)</div>
            <textarea
              data-testid="raise-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="e.g. Extra pillow + 1 bottle of still water"
              className="w-full bg-white rounded-2xl border border-[#A78BD9]/25 px-4 py-3 text-sm outline-none focus:border-[#5B2C91]/60"
            />
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#5B2C91]/10 to-[#F47B20]/10 border border-[#F47B20]/20 p-3 flex items-start gap-2">
            <SparkleDot className="w-4 h-4 mt-0.5" />
            <div className="text-[11px] text-[#6B6478] leading-relaxed">
              AI will classify, set priority and route this to the right runner. Guest will receive a confirmation with live ETA.
            </div>
          </div>

          <button data-testid="raise-submit" onClick={submit} className="w-full bg-[#F47B20] hover:bg-[#d66718] text-white font-semibold py-3.5 rounded-full text-sm">
            Raise & Dispatch
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --------------------- COPILOT --------------------- */
function CopilotChat({ onClose }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "ai", text: "Hi Linda — I'm your AI Copilot. Ask anything about SOPs, manuals, or escalation." },
    { from: "user", text: "How do I handle this request?" },
    { from: "ai", text: "Follow the steps in the panel above. If the guest is VIP, add a courtesy item and offer a thank-you note." },
  ]);
  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { from: "ai", text: "Got it — pulling the relevant SOP and routing context. I'll log this to your shift summary too." }]), 700);
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
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-12 bg-[#A78BD9]/15 rounded-md border-y border-[#A78BD9]/30" />
        <div className="absolute left-[10%] right-[10%] top-[8%] h-1/3 grid grid-cols-5 gap-1">
          {[401, 403, 405, 407, 409].map((r) => <div key={r} className="bg-white border border-[#A78BD9]/30 rounded grid place-items-center text-[9px] text-[#6B6478]">{r}</div>)}
        </div>
        <div className="absolute left-[10%] right-[10%] bottom-[8%] h-1/3 grid grid-cols-5 gap-1">
          {[412, 414, 416, 418, 420].map((r) => <div key={r} className={`border rounded grid place-items-center text-[9px] ${r === 412 ? "bg-[#F47B20]/15 border-[#F47B20] text-[#F47B20] font-bold" : "bg-white border-[#A78BD9]/30 text-[#6B6478]"}`}>{r}</div>)}
        </div>
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
