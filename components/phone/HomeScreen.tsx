"use client";

import StatusBar from "./StatusBar";
import type { AppId } from "@/lib/types";

const APPS: {
  id: AppId;
  label: string;
  emoji: string;
  color: string;
}[] = [
  { id: "messages", label: "Messages", emoji: "💬", color: "bg-green-500" },
  { id: "cctv", label: "CCTV", emoji: "📹", color: "bg-emerald-800" },
  { id: "notes", label: "Notes", emoji: "📝", color: "bg-yellow-500" },
  { id: "calculator", label: "Calculator", emoji: "🧮", color: "bg-neutral-700" },
  { id: "game", label: "Climb", emoji: "🚗", color: "bg-sky-500" },
  {
    id: "phone-in-phone",
    label: "Phone",
    emoji: "📱",
    color: "bg-red-900",
  },
  { id: "settings", label: "Settings", emoji: "⚙️", color: "bg-neutral-600" },
];

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
    <div
      className="absolute inset-0 z-10 flex flex-col"
      style={{ background: wallpaper }}
    >
      <StatusBar carrier={carrier} />
      <div className="mt-6 grid grid-cols-4 gap-x-3 gap-y-5 px-5">
        {APPS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onOpen(a.id)}
            className="flex flex-col items-center gap-1"
          >
            <div className={`app-icon ${a.color}`}>{a.emoji}</div>
            <span className="text-[10px] text-white/90 drop-shadow">
              {a.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-auto mb-6 flex justify-center gap-6 px-8">
        {(["messages", "phone-in-phone", "notes", "settings"] as AppId[]).map(
          (id) => {
            const a = APPS.find((x) => x.id === id)!;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onOpen(id)}
                className={`app-icon ${a.color} shadow-lg`}
              >
                {a.emoji}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}
