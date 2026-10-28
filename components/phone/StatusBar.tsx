"use client";

export default function StatusBar({
  carrier = "OllieNet",
  light = false,
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
  const c = light ? "text-black" : "text-white";

  return (
    <div className={`status-bar ${c}`}>
      <span>{time}</span>
      <span className="text-[10px] opacity-80">{carrier}</span>
      <span className="flex items-center gap-1 text-[10px]">
        <span>●●●○</span>
        <span>5G</span>
        <span className="rounded-sm border border-current px-0.5 text-[9px]">
          86
        </span>
      </span>
    </div>
  );
}
