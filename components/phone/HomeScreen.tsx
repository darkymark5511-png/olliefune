"use client";

import StatusBar from "./StatusBar";
import type { AppId } from "@/lib/types";

const APPS: { id: AppId; label: string; emoji: string; gradient: string }[] = [
  { id: "messages", label: "Messages", emoji: "💬", gradient: "linear-gradient(145deg,#34d399,#059669)" },
  { id: "cctv", label: "CCTV", emoji: "📹", gradient: "linear-gradient(145deg,#4ade80,#166534)" },
  { id: "notes", label: "Notes", emoji: "📝", gradient: "linear-gradient(145deg,#fde047,#ca8a04)" },
  { id: "calculator", label: "Calc", emoji: "＋", gradient: "linear-gradient(145deg,#a1a1aa,#3f3f46)" },
  { id: "game", label: "Climb", emoji: "🚗", gradient: "linear-gradient(145deg,#38bdf8,#0369a1)" },
  { id: "phone-in-phone", label: "Phone", emoji: "📱", gradient: "linear-gradient(145deg,#f87171,#7f1d1d)" },
  { id: "settings", label: "Settings", emoji: "⚙️", gradient: "linear-gradient(145deg,#94a3b8,#475569)" },
];

const DOCK: AppId[] = ["messages", "phone-in-phone", "notes", "settings"];

export default function HomeScreen({
  wallpaper,
  carrier,
  onOpen,
}: {
  wallpaper: string;
  carrier: string;
  onOpen: (id: AppId) => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col overflow-hidden">
      <div className="absolute inset-0" style={{ background: wallpaper }} />
      <div className="wallpaper-depth"><span /><span /><span /></div>
      <div className="relative z-10 flex flex-1 flex-col">
        <StatusBar carrier={carrier} />
        <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-6 px-5">
          {APPS.map((a) => (
            <button key={a.id} type="button" onClick={() => onOpen(a.id)} className="flex flex-col items-center">
              <div className="app-icon" style={{ background: a.gradient }}>{a.emoji}</div>
              <span className="app-icon-label">{a.label}</span>
            </button>
          ))}
        </div>
        <div className="dock">
          {DOCK.map((id) => {
            const a = APPS.find((x) => x.id === id)!;
            return (
              <button key={id} type="button" onClick={() => onOpen(id)} aria-label={a.label}>
                <div className="app-icon" style={{ background: a.gradient }}>{a.emoji}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="home-bar opacity-40" />
    </div>
  );
}
