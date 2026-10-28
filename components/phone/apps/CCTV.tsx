"use client";

import { useState } from "react";
import type { CctvCam } from "@/lib/types";

const CAMS: CctvCam[] = [
  { id: "1", label: "Lobby", status: "online", note: "Empty. Door keeps swinging." },
  { id: "2", label: "Hall B2", status: "glitch", note: "Signal drops every 13 seconds." },
  { id: "3", label: "Cam 3 — ???", status: "online", note: "Someone is holding a phone. Your model." },
  { id: "4", label: "Roof", status: "offline", note: "No feed since 03:03." },
];

export default function CCTV({ onClose }: { onClose: () => void }) {
  const [cam, setCam] = useState<CctvCam | null>(null);

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-black pt-12">
      <div className="flex items-center justify-between px-4 pb-2">
        <button type="button" onClick={onClose} className="text-emerald-400">Home</button>
        <p className="font-mono text-sm font-bold text-emerald-400">SEC-VIEW</p>
        <span className="w-10" />
      </div>
      {!cam ? (
        <div className="grid grid-cols-2 gap-2 p-3">
          {CAMS.map((c) => (
            <button key={c.id} type="button" onClick={() => setCam(c)}
              className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-left">
              <p className="font-mono text-xs text-emerald-300">{c.label}</p>
              <p className={`mt-2 text-[10px] uppercase ${
                c.status === "online" ? "text-emerald-400" : c.status === "glitch" ? "text-yellow-400" : "text-red-400"
              }`}>● {c.status}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col p-3">
          <button type="button" className="mb-2 self-start text-xs text-emerald-400" onClick={() => setCam(null)}>‹ cams</button>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-emerald-500/40 bg-black">
            <div className="cctv-scan absolute inset-0" />
            {cam.status === "offline" ? (
              <p className="font-mono text-red-500">NO SIGNAL</p>
            ) : (
              <div className="z-10 p-4 text-center">
                <p className="font-mono text-emerald-400/80 text-xs">REC ● {cam.label}</p>
                <p className="mt-8 text-sm text-emerald-100/90">{cam.note}</p>
                {cam.id === "3" && (
                  <p className="mt-6 animate-pulse-soft font-mono text-[11px] text-red-400">THEY CAN SEE THE OUTER PHONE</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
