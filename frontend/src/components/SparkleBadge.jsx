import { Sparkles } from "lucide-react";

export function AIBadge({ label = "AI", className = "", testId }) {
  return (
    <span
      data-testid={testId}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-gradient-to-r from-[#5B2C91]/10 to-[#F47B20]/10 border border-[#F47B20]/30 text-[#5B2C91] ${className}`}
    >
      <Sparkles className="w-3 h-3 text-[#F47B20] ai-pulse" strokeWidth={2.5} />
      {label}
    </span>
  );
}

export function SparkleDot({ className = "" }) {
  return (
    <Sparkles
      className={`w-4 h-4 text-[#F47B20] ai-pulse drop-shadow-[0_0_8px_rgba(244,123,32,0.55)] ${className}`}
      strokeWidth={2.5}
    />
  );
}
