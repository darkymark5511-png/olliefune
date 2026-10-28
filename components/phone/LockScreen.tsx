"use client";

import { useState } from "react";
import StatusBar from "./StatusBar";

export default function LockScreen({
  wallpaper,
  carrier,
  hint,
  onUnlock,
}: {
  wallpaper: string;
  carrier: string;
  hint: string;
  onUnlock: () => void;
}) {
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  function press(d: string) {
    if (d === "") return;
    if (d === "⌫") {
      setCode((c) => c.slice(0, -1));
      return;
    }
    const next = (code + d).slice(0, 6);
    setCode(next);
    if (next.length >= 4) {
      setTimeout(() => onUnlock(), 180);
    }
  }

  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col"
      style={{ background: wallpaper }}
    >
      <StatusBar carrier={carrier} />
      <div className="mt-10 flex flex-1 flex-col items-center px-6">
        <p className="text-6xl font-thin tracking-tight text-white drop-shadow">
          {time}
        </p>
        <p className="mt-1 text-sm text-white/80">{date}</p>
        <p className="mt-8 text-[11px] text-white/50">{hint}</p>
        <div
          className={`mt-4 flex gap-3 ${shake ? "animate-lock-shake" : ""}`}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full border border-white/60 ${
                code.length > i ? "bg-white" : ""
              }`}
            />
          ))}
        </div>
        <div className="mt-auto mb-10 grid w-full max-w-[280px] grid-cols-3 gap-4">
          {digits.map((d, i) => (
            <button
              key={i}
              type="button"
              disabled={d === ""}
              onClick={() => press(d)}
              className={`flex h-16 items-center justify-center rounded-full text-2xl font-light text-white ${
                d === ""
                  ? "invisible"
                  : "bg-white/15 active:bg-white/30"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
