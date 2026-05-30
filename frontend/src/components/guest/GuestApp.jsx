import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home, ClipboardList, MessageCircle, User, Mic, Send, ChevronLeft,
  Star, MapPin, Car, Train, Bus, Bell, CheckCircle2, Clock, PlayCircle, ArrowRight, X, CloudRain, Ticket,
} from "lucide-react";
import { PhoneFrame, useTypewriter } from "../PhoneFrame";
import { AIBadge, SparkleDot } from "../SparkleBadge";
import {
  HOTEL, GUEST, QUICK_ACTIONS, FEATURED, ITINERARY, RESTAURANTS, COMMUTE,
  GUEST_REQUESTS, LANGUAGES, LOGO_URL,
} from "../../data/mockData";
import { useDemo } from "../../context/DemoContext";

const TABS = [
  { key: "home", label: "Home", icon: Home },
  { key: "requests", label: "Requests", icon: ClipboardList },
  { key: "chat", label: "Chat", icon: MessageCircle },
  { key: "profile", label: "Profile", icon: User },
];

export default function GuestApp({ embedded = false, scale = 1 }) {
  const [tab, setTab] = useState("home");
  const [showNudge, setShowNudge] = useState(false);
  const [showRecs, setShowRecs] = useState(false);
  const [ticketRaised, setTicketRaised] = useState(null);
  const navigate = useNavigate();
  const { phase, running } = useDemo();

  // Demo orchestration: switch to chat when demo enters guest typing phase
  useEffect(() => {
    if (!running) return;
    if (phase === 1 || phase === 2) setTab("chat");
    if (phase === 6) setTab("requests");
  }, [phase, running]);

  // Showcase the proactive nudge after 3s on first load
  useEffect(() => {
    if (embedded) return;
    const t = setTimeout(() => setShowNudge(true), 3500);
    return () => clearTimeout(t);
  }, [embedded]);

  // Handle the "ticket raised" interaction → popup + redirect to Requests
  const handleTicketRaised = (summary) => {
    setTicketRaised(summary);
    setTimeout(() => {
      setTicketRaised(null);
      setTab("requests");
    }, 2400);
  };

  const content = (
    <div className="relative h-full flex flex-col">
      {!embedded && (
        <div className="absolute top-2 left-3 z-40">
          <button
            data-testid="guest-back-btn"
            onClick={() => navigate("/")}
            className="bg-black/40 backdrop-blur-md text-white p-2 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {tab === "home" && <GuestHome onOpenChat={() => setTab("chat")} onShowRecs={() => setShowRecs(true)} />}
        {tab === "requests" && <GuestRequests />}
        {tab === "chat" && <GuestConcierge onTicketRaised={handleTicketRaised} />}
        {tab === "profile" && <GuestProfile />}
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#A78BD9]/20 px-3 pt-2 pb-5">
        <div className="grid grid-cols-4 gap-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                data-testid={`guest-tab-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${active ? "text-[#5B2C91]" : "text-[#6B6478]"}`}
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
                <span className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Proactive AI nudge popup */}
      <AnimatePresence>
        {showNudge && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end pb-24 px-4"
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              className="bg-white rounded-2xl p-5 shadow-brand-lg w-full relative"
            >
              <button
                data-testid="nudge-close-btn"
                onClick={() => setShowNudge(false)}
                className="absolute top-3 right-3 text-[#6B6478]"
              ><X className="w-4 h-4" /></button>
              <div className="flex items-center gap-2 mb-3">
                <CloudRain className="w-5 h-5 text-[#5B2C91]" />
                <AIBadge label="Proactive AI" testId="nudge-ai-badge" />
              </div>
              <div className="font-semibold text-[#1F1B2E] mb-1">It's raining outside.</div>
              <div className="text-sm text-[#6B6478] mb-4">Want us to arrange a cab for your 7 PM dinner at Azure Skyline?</div>
              <div className="flex gap-2">
                <button data-testid="nudge-yes-btn" onClick={() => setShowNudge(false)} className="flex-1 bg-[#F47B20] hover:bg-[#d66718] text-white font-semibold py-3 rounded-xl text-sm">Yes, book it</button>
                <button data-testid="nudge-no-btn" onClick={() => setShowNudge(false)} className="flex-1 bg-[#F8F6FC] text-[#5B2C91] border border-[#5B2C91]/20 font-semibold py-3 rounded-xl text-sm">No thanks</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendations modal */}
      <AnimatePresence>
        {showRecs && <GuestRecommendations onClose={() => setShowRecs(false)} />}
      </AnimatePresence>

      {/* Ticket Raised confirmation */}
      <AnimatePresence>
        {ticketRaised && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center px-6"
            data-testid="ticket-raised-overlay"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl p-6 shadow-brand-lg w-full max-w-[300px] text-center relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#5B2C91] via-[#F47B20] to-[#5B2C91] ai-shimmer" />
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.1 }}
                className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#22C55E] to-[#16a34a] grid place-items-center shadow-brand-lg"
              >
                <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.5} />
              </motion.div>
              <div className="font-display font-semibold text-lg text-[#1F1B2E] mt-4">Ticket Raised!</div>
              <div className="text-xs text-[#6B6478] mt-1.5 leading-relaxed">{ticketRaised}</div>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-[#F8F6FC] text-[#5B2C91] text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                <Ticket className="w-3 h-3" /> Redirecting to My Requests…
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (embedded) return content;
  return <PhoneFrame testId="guest-app-frame" scale={scale}>{content}</PhoneFrame>;
}

/* --------------------- HOME --------------------- */
function GuestHome({ onOpenChat, onShowRecs }) {
  return (
    <div>
      <div className="relative h-44">
        <img src={HOTEL.banner} alt="hotel" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B2E]/85 via-[#5B2C91]/40 to-transparent" />
        <div className="relative h-full p-5 flex flex-col justify-end text-white">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">Welcome to</div>
          <div className="font-display font-semibold text-lg leading-tight">OUR HOTEL RESORT &amp; SPA</div>
          <div className="text-xs text-white/80 mt-1">Room {GUEST.room} · {GUEST.tier} Member</div>
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-[#6B6478]">Good Evening</div>
            <div className="font-display font-semibold text-xl text-[#1F1B2E]">{GUEST.firstName} 👋</div>
          </div>
          <img src={GUEST.avatar} alt={GUEST.firstName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-brand" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.key}
              data-testid={`guest-quick-${a.key}`}
              onClick={onOpenChat}
              className="relative h-28 rounded-2xl overflow-hidden text-left group hover:-translate-y-0.5 transition-transform"
            >
              <img src={a.image} alt={a.label} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B2E]/85 to-transparent" />
              <div className="relative h-full p-3 flex flex-col justify-end text-white">
                <div className="text-sm font-semibold leading-tight">{a.label}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="font-display font-semibold text-base text-[#1F1B2E]">Featured for you</div>
          <button
            data-testid="guest-show-recs-btn"
            onClick={onShowRecs}
            className="text-xs font-semibold text-[#5B2C91] flex items-center gap-1"
          >
            <SparkleDot className="w-3 h-3" /> AI Curated
          </button>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-5 px-5">
          {FEATURED.map((f) => (
            <div key={f.title} className="min-w-[200px] rounded-2xl bg-white shadow-brand border border-[#A78BD9]/15 overflow-hidden">
              <img src={f.image} alt={f.title} className="w-full h-24 object-cover" />
              <div className="p-3">
                <div className="font-semibold text-sm text-[#1F1B2E] leading-tight">{f.title}</div>
                <div className="text-[11px] text-[#6B6478] mt-1">{f.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------- CONCIERGE (HERO) --------------------- */
const DEMO_PROMPT = "Need extra towels and please fix the AC, also can I get late checkout?";

function GuestConcierge({ onTicketRaised }) {
  const { phase, running } = useDemo();
  const [lang, setLang] = useState("EN");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi John 👋 I'm your iNPLASS concierge. How may I help you tonight?" },
  ]);
  const listRef = useRef(null);

  const typedDemo = useTypewriter(DEMO_PROMPT, 38, running && phase === 1);

  // Demo orchestration
  useEffect(() => {
    if (!running) return;
    if (phase === 1) {
      setInput(typedDemo);
    }
    if (phase === 2) {
      setInput("");
      setMessages((m) => {
        if (m.some((x) => x.demo === "user")) return m;
        return [...m, { from: "user", text: DEMO_PROMPT, demo: "user" }];
      });
      setTimeout(() => {
        setMessages((m) => {
          if (m.some((x) => x.demo === "ai-split")) return m;
          return [...m, {
            from: "ai", demo: "ai-split",
            text: "Got it, John! I've split this into 3 requests:",
            tickets: [
              { icon: "✅", label: "2 extra towels", eta: "ETA 15 min" },
              { icon: "🔧", label: "Maintenance — AC noise", eta: "ETA 20 min" },
              { icon: "🕑", label: "Late checkout till 2 PM", eta: "Confirmed" },
            ],
          }];
        });
      }, 600);
    }
  }, [phase, running, typedDemo]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, input]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "ai", text: `Got it! I'm dispatching that now. ✨ I'll keep you posted in My Requests.` }]);
      // Fire the ticket-raised popup → parent will redirect to Requests tab
      if (onTicketRaised) {
        const summary = userMsg.length > 60 ? userMsg.slice(0, 57) + "…" : userMsg;
        setTimeout(() => onTicketRaised(`"${summary}" — dispatched. Track live ETA in My Requests.`), 600);
      }
    }, 700);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-brand-gradient text-white px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full bg-white/15 grid place-items-center">
            <SparkleDot className="w-5 h-5" />
            <div className="absolute inset-0 rounded-full ai-shimmer" />
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold text-base leading-tight">iNPLASS Concierge</div>
            <div className="text-[11px] text-white/70 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Online · Multilingual</div>
          </div>
          <div className="relative">
            <select
              data-testid="guest-lang-toggle"
              value={lang} onChange={(e) => setLang(e.target.value)}
              className="bg-white/15 text-white text-xs font-semibold px-2 py-1.5 rounded-lg border border-white/20 outline-none"
            >
              {LANGUAGES.map((l) => <option key={l.code} value={l.code} className="text-[#1F1B2E]">{l.code}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto hide-scrollbar px-4 py-4 space-y-3 bg-[#F8F6FC]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-[#5B2C91] text-white rounded-br-md" : "bg-white text-[#1F1B2E] rounded-bl-md border border-[#A78BD9]/20"}`}>
              <div className={m.from === "ai" ? "leading-relaxed" : ""}>{m.text}</div>
              {m.tickets && (
                <div className="mt-3 space-y-2">
                  {m.tickets.map((t, ti) => (
                    <motion.div
                      key={ti}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 * ti }}
                      className="flex items-center gap-2 bg-[#F8F6FC] rounded-xl px-3 py-2 border border-[#A78BD9]/20"
                    >
                      <span className="text-base">{t.icon}</span>
                      <span className="text-[13px] font-semibold text-[#1F1B2E] flex-1">{t.label}</span>
                      <span className="text-[11px] text-[#5B2C91] font-semibold">{t.eta}</span>
                    </motion.div>
                  ))}
                  <div className="text-[11px] text-[#6B6478] pt-1">Anything else?</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pt-3 pb-3 bg-white border-t border-[#A78BD9]/15">
        <div className="flex items-center gap-2 bg-[#F8F6FC] rounded-full px-4 py-2.5 border border-[#A78BD9]/25">
          <input
            data-testid="guest-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything — towels, dining, cab…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#6B6478]"
          />
          <button
            data-testid="guest-mic-btn"
            className="w-9 h-9 rounded-full bg-[#F47B20] text-white grid place-items-center mic-pulse"
          ><Mic className="w-4 h-4" /></button>
          <button
            data-testid="guest-send-btn"
            onClick={send}
            className="w-9 h-9 rounded-full bg-[#5B2C91] text-white grid place-items-center"
          ><Send className="w-4 h-4" /></button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-[#6B6478]">
          <SparkleDot className="w-3 h-3" /> AI auto-splits, classifies & routes your requests
        </div>
      </div>
    </div>
  );
}

/* --------------------- REQUESTS TRACKER --------------------- */
function GuestRequests() {
  const { phase, running } = useDemo();
  const reqs = GUEST_REQUESTS.map((r) => {
    if (running && phase >= 6 && r.id === "R-4121") {
      return { ...r, status: "completed", progress: 100, eta: "Delivered" };
    }
    return r;
  });
  return (
    <div className="p-5">
      <div className="font-display font-semibold text-xl text-[#1F1B2E]">My Requests</div>
      <div className="text-xs text-[#6B6478] mb-5">Live status, ETA, and SLA tracking</div>
      <div className="space-y-3">
        {reqs.map((r) => <RequestCard key={r.id} r={r} />)}
      </div>
      <div className="mt-6 rounded-2xl border border-dashed border-[#A78BD9]/40 p-4 text-center text-xs text-[#6B6478]">
        Rate & tip your last delivery — Maria 👍
      </div>
    </div>
  );
}

function RequestCard({ r }) {
  const statusMap = {
    completed: { color: "bg-[#22C55E]", text: "Completed" },
    in_progress: { color: "bg-[#F47B20]", text: "In Progress" },
    assigned: { color: "bg-[#7B3FBF]", text: "Assigned" },
  };
  const s = statusMap[r.status];
  return (
    <div className="bg-white rounded-2xl border border-[#A78BD9]/15 shadow-brand p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] text-[#6B6478]">{r.id} · {r.dept}</div>
          <div className="font-semibold text-[#1F1B2E] mt-0.5">{r.title}</div>
          <div className="text-xs text-[#6B6478] mt-1">Assignee: {r.assignee}</div>
        </div>
        <span className={`text-[10px] font-semibold text-white px-2 py-1 rounded-full ${s.color}`}>{s.text}</span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <Clock className="w-3.5 h-3.5 text-[#5B2C91]" />
        <span className="font-semibold text-[#5B2C91]">{r.eta}</span>
        {r.sla > 0 && <span className="text-[#6B6478]">· SLA {r.sla}m</span>}
      </div>
      <div className="mt-3 h-1.5 bg-[#F8F6FC] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#5B2C91] to-[#F47B20]" style={{ width: `${r.progress}%` }} />
      </div>
    </div>
  );
}

/* --------------------- RECOMMENDATIONS --------------------- */
function GuestRecommendations({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/40 z-50"
    >
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28 }}
        className="absolute bottom-0 left-0 right-0 max-h-[85%] bg-[#F8F6FC] rounded-t-3xl overflow-hidden flex flex-col"
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#A78BD9]/20 bg-white">
          <div>
            <div className="font-display font-semibold text-lg text-[#1F1B2E]">Curated for your stay</div>
            <div className="text-[11px] text-[#6B6478] flex items-center gap-1"><SparkleDot className="w-3 h-3" /> AI-picked from 1,200+ local experiences</div>
          </div>
          <button data-testid="recs-close" onClick={onClose} className="text-[#6B6478]"><X className="w-5 h-5" /></button>
        </div>
        <div className="overflow-y-auto hide-scrollbar p-5 space-y-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7B3FBF] font-semibold mb-2">3-Day Business Plan</div>
            <div className="space-y-2">
              {ITINERARY.map((it) => (
                <div key={it.day} className="bg-white rounded-2xl p-4 border border-[#A78BD9]/15">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-[#1F1B2E] text-sm">{it.day}: {it.title}</div>
                    <AIBadge label="AI-picked" />
                  </div>
                  <div className="text-xs text-[#6B6478] mt-1">{it.spots.join(" · ")}</div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-[#5B2C91] font-semibold">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{it.distance}</span>
                    <span>·</span>
                    <span>{it.transport}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7B3FBF] font-semibold mb-2">Top Restaurants</div>
            <div className="grid grid-cols-1 gap-2">
              {RESTAURANTS.map((r) => (
                <div key={r.name} className="flex gap-3 bg-white rounded-2xl p-3 border border-[#A78BD9]/15">
                  <img src={r.image} alt={r.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-[#1F1B2E]">{r.name}</div>
                    <div className="text-[11px] text-[#6B6478]">{r.cuisine} · {r.distance}</div>
                    <div className="flex items-center gap-1 text-[11px] text-[#F47B20] mt-1"><Star className="w-3 h-3 fill-[#F47B20]" /> {r.rating}</div>
                  </div>
                  <button className="text-[11px] font-semibold text-[#5B2C91]">Book</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7B3FBF] font-semibold mb-2">Reliable Commute</div>
            <div className="grid grid-cols-3 gap-2">
              {COMMUTE.map((c) => {
                const Icon = c.icon === "car" ? Car : c.icon === "train" ? Train : Bus;
                return (
                  <button key={c.type} className="bg-white rounded-2xl p-3 border border-[#A78BD9]/15 text-left hover:border-[#F47B20]/50 transition-colors">
                    <Icon className="w-5 h-5 text-[#5B2C91]" />
                    <div className="font-semibold text-[12px] mt-1 text-[#1F1B2E]">{c.type}</div>
                    <div className="text-[10px] text-[#6B6478]">{c.eta} · {c.price}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --------------------- PROFILE --------------------- */
function GuestProfile() {
  return (
    <div className="p-5">
      <div className="bg-brand-gradient rounded-3xl p-5 text-white">
        <div className="flex items-center gap-3">
          <img src={GUEST.avatar} alt={GUEST.firstName} className="w-14 h-14 rounded-full object-cover border-2 border-white/40" />
          <div>
            <div className="font-display font-semibold text-lg">{GUEST.firstName} {GUEST.lastName}</div>
            <div className="text-xs text-white/80">{GUEST.tier} Member · Room {GUEST.room}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-xl py-2"><div className="text-lg font-semibold">12</div><div className="text-[10px] uppercase tracking-wide text-white/80">Stays</div></div>
          <div className="bg-white/10 rounded-xl py-2"><div className="text-lg font-semibold">2,480</div><div className="text-[10px] uppercase tracking-wide text-white/80">Points</div></div>
          <div className="bg-white/10 rounded-xl py-2"><div className="text-lg font-semibold">4.9★</div><div className="text-[10px] uppercase tracking-wide text-white/80">Guest Rating</div></div>
        </div>
      </div>
      <div className="mt-5 bg-white rounded-2xl border border-[#A78BD9]/15 divide-y divide-[#A78BD9]/15">
        {["Stay Preferences", "Payment Methods", "Past Stays", "Notification Settings"].map((x) => (
          <div key={x} className="px-4 py-3.5 flex items-center justify-between text-sm">
            <span className="text-[#1F1B2E] font-medium">{x}</span>
            <ArrowRight className="w-4 h-4 text-[#6B6478]" />
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#F47B20]/10 to-[#5B2C91]/10 p-4 border border-[#F47B20]/20">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5B2C91]"><SparkleDot className="w-4 h-4" /> Sentiment Care</div>
        <div className="text-xs text-[#6B6478] mt-1">Your last sentiment was warm. We'll keep the room cooled to 22°C and surprise you with a fresh fruit plate tonight.</div>
      </div>
    </div>
  );
}
