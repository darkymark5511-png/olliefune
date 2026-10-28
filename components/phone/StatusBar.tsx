"use client";

export default function StatusBar({
  carrier = "OllieNet",
}: {
  carrier?: string;
  light?: boolean;
}) {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="status-bar">
      <span className="min-w-[52px]">{time}</span>
      <span className="text-[10px] font-semibold tracking-wide opacity-90">
        {carrier}
      </span>
      <span className="flex min-w-[72px] items-center justify-end gap-1.5 text-[10px]">
        <svg width="14" height="10" viewBox="0 0 14 10" className="opacity-90">
          <rect x="0" y="6" width="2.2" height="4" rx="0.5" fill="currentColor" />
          <rect x="3.2" y="4" width="2.2" height="6" rx="0.5" fill="currentColor" />
          <rect x="6.4" y="2" width="2.2" height="8" rx="0.5" fill="currentColor" />
          <rect x="9.6" y="0" width="2.2" height="10" rx="0.5" fill="currentColor" opacity="0.35" />
        </svg>
        <span className="font-semibold">5G</span>
        <span className="flex items-center gap-0.5 rounded-[4px] border border-white/80 px-1 py-[1px] text-[9px] font-bold leading-none">
          86
          <span className="ml-0.5 inline-block h-2 w-1 rounded-[1px] bg-white/80" />
        </span>
      </span>
    </div>
  );
}
