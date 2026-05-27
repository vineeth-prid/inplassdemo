import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

// DemoContext orchestrates the cross-app investor demo.
// It drives:
//   - which app is "spotlighted" (guest | staff | admin)
//   - which step of the scripted scenario is active
//   - a global "phase" used by each app to react in sync
//
// Phases (cross-app storyline):
//   0  idle               – before demo starts
//   1  guest-typing       – John types his concierge message
//   2  ai-split           – AI replies and shows 3 tickets
//   3  staff-incoming     – Linda's app receives the towel task
//   4  admin-live         – Admin dashboard shows live row + pattern detected
//   5  staff-complete     – Linda completes the towel task
//   6  guest-update       – Guest tracker updates to "delivered"
//   7  admin-insight      – GM digest highlights "Floor 4 AC pattern"
//   8  done               – demo finished
const DemoCtx = createContext(null);

const TIMELINE = [
  { phase: 1, focus: "guest", durMs: 4200 },
  { phase: 2, focus: "guest", durMs: 4500 },
  { phase: 3, focus: "staff", durMs: 4200 },
  { phase: 4, focus: "admin", durMs: 4500 },
  { phase: 5, focus: "staff", durMs: 3500 },
  { phase: 6, focus: "guest", durMs: 3000 },
  { phase: 7, focus: "admin", durMs: 4500 },
  { phase: 8, focus: "admin", durMs: 2000 },
];

export function DemoProvider({ children }) {
  const [phase, setPhase] = useState(0);
  const [focus, setFocus] = useState("guest");
  const [running, setRunning] = useState(false);
  const stepRef = useRef(0);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const stop = useCallback(() => {
    clearTimer();
    setRunning(false);
    setPhase(0);
    setFocus("guest");
    stepRef.current = 0;
  }, []);

  const advance = useCallback(() => {
    if (stepRef.current >= TIMELINE.length) {
      setRunning(false);
      return;
    }
    const step = TIMELINE[stepRef.current];
    setPhase(step.phase);
    setFocus(step.focus);
    stepRef.current += 1;
    timerRef.current = setTimeout(advance, step.durMs);
  }, []);

  const start = useCallback(() => {
    clearTimer();
    stepRef.current = 0;
    setRunning(true);
    advance();
  }, [advance]);

  useEffect(() => () => clearTimer(), []);

  return (
    <DemoCtx.Provider value={{ phase, focus, running, start, stop }}>
      {children}
    </DemoCtx.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoCtx);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
