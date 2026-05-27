import { useEffect, useState } from "react";

// Mobile device frame for guest/staff apps. Mimics an iPhone-style frame.
export function PhoneFrame({ children, scale = 1, label, testId }) {
  return (
    <div
      data-testid={testId}
      className="relative mx-auto"
      style={{ width: 390 * scale, height: 844 * scale }}
    >
      <div
        className="absolute inset-0 rounded-[48px] border-[10px] border-[#0c0a14] bg-black shadow-2xl overflow-hidden"
        style={{ transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: "top left", width: 390, height: 844 }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-32 h-7 bg-black rounded-full" />
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 z-20 px-7 pt-2.5 flex items-center justify-between text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span>●●●●</span>
            <span>5G</span>
            <span>100%</span>
          </span>
        </div>
        {/* Inner scroll area */}
        <div className="absolute inset-0 pt-10 bg-[#F8F6FC] overflow-y-auto hide-scrollbar">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full" />
      </div>
      {label && (
        <div className="absolute -bottom-8 left-0 right-0 text-center text-xs font-semibold text-[#6B6478] tracking-widest uppercase">
          {label}
        </div>
      )}
    </div>
  );
}

// Used inside the cross-app demo viewer where frames are scaled down.
export function ScaledPhone({ children, scale = 0.7, label, testId }) {
  return (
    <div
      data-testid={testId}
      className="relative"
      style={{ width: 390 * scale, height: 844 * scale }}
    >
      <div
        className="rounded-[48px] border-[10px] border-[#0c0a14] bg-black shadow-2xl overflow-hidden relative"
        style={{
          width: 390,
          height: 844,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-32 h-7 bg-black rounded-full" />
        <div className="absolute top-0 left-0 right-0 z-20 px-7 pt-2.5 flex items-center justify-between text-[11px] font-semibold text-white">
          <span>9:41</span>
          <span>● 5G · 100%</span>
        </div>
        <div className="absolute inset-0 pt-10 bg-[#F8F6FC] overflow-y-auto hide-scrollbar">
          {children}
        </div>
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full" />
      </div>
      {label && (
        <div className="text-center text-[11px] font-semibold text-[#6B6478] tracking-[0.25em] uppercase mt-3">
          {label}
        </div>
      )}
    </div>
  );
}

// Typewriter helper hook for scripted demo text
export function useTypewriter(text, speed = 35, run = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!run) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, run]);
  return out;
}
