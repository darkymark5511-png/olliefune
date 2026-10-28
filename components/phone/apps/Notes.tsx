"use client";

const LORE = [
  {
    title: "Rule 1",
    body: "If the nested phone rings, do not answer with your real name.",
  },
  {
    title: "Rule 2",
    body: "Cam 3 is never empty. If it looks empty, look away.",
  },
  {
    title: "Found in B2",
    body: "A charger still warm. Model number matches this device. Serial scratched off.",
  },
  {
    title: "Draft (unsent)",
    body: "I think the outer screen is also being watched. If you're reading this on Fune — close the tab.",
  },
];

export default function Notes({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[#1c1c1e] pt-12">
      <div className="flex items-center justify-between px-4 pb-3">
        <button type="button" onClick={onClose} className="text-yellow-400">
          Home
        </button>
        <p className="font-bold">Notes</p>
        <span className="w-10" />
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto px-3 pb-6">
        {LORE.map((n) => (
          <div
            key={n.title}
            className="rounded-2xl bg-[#2c2c2e] px-4 py-3"
          >
            <p className="text-sm font-semibold text-yellow-100">{n.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              {n.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
