"use client";

import { useState } from "react";
import type { MessageThread } from "@/lib/types";

const THREADS: MessageThread[] = [
  {
    id: "1",
    name: "Unknown",
    preview: "You shouldn't have turned this on.",
    unread: 2,
    messages: [
      { from: "them", text: "Did you hear the static last night?", time: "23:11" },
      { from: "them", text: "You shouldn't have turned this on.", time: "23:14" },
      { from: "me", text: "Who is this?", time: "23:15" },
      { from: "them", text: "Open CCTV. Cam 3.", time: "23:16" },
    ],
  },
  {
    id: "2",
    name: "Building Mgmt",
    preview: "Maintenance on floor B2 cancelled.",
    unread: 0,
    messages: [
      { from: "them", text: "Maintenance on floor B2 cancelled. Do not enter.", time: "18:02" },
      { from: "them", text: "If you already entered: leave the phone on the table and walk away.", time: "18:03" },
    ],
  },
  {
    id: "3",
    name: "Mom",
    preview: "Call me when you're home.",
    unread: 0,
    messages: [
      { from: "them", text: "Call me when you're home.", time: "12:40" },
      { from: "me", text: "ok", time: "12:41" },
      { from: "them", text: "That wasn't me. I don't text like that.", time: "12:55" },
    ],
  },
];

export default function Messages({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState<MessageThread | null>(null);

  if (active) {
    return (
      <div className="absolute inset-0 z-30 flex flex-col bg-[#000] pt-12">
        <div className="flex items-center gap-3 border-b border-white/10 px-3 pb-3">
          <button type="button" className="text-sky-400" onClick={() => setActive(null)}>‹</button>
          <p className="font-semibold">{active.name}</p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
          {active.messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                m.from === "me" ? "bg-sky-600 text-white" : "bg-neutral-800 text-white"
              }`}>
                <p>{m.text}</p>
                <p className="mt-1 text-[10px] opacity-50">{m.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-black pt-12">
      <div className="flex items-center justify-between px-4 pb-3">
        <button type="button" onClick={onClose} className="text-sky-400">Home</button>
        <p className="font-bold">Messages</p>
        <span className="w-10" />
      </div>
      <div className="flex-1 overflow-y-auto">
        {THREADS.map((t) => (
          <button key={t.id} type="button" onClick={() => setActive(t)}
            className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left active:bg-white/5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-700 text-sm font-bold">{t.name[0]}</div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between">
                <p className="font-semibold">{t.name}</p>
                {t.unread > 0 && (
                  <span className="rounded-full bg-sky-500 px-1.5 text-[10px] font-bold">{t.unread}</span>
                )}
              </div>
              <p className="truncate text-xs text-white/50">{t.preview}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
