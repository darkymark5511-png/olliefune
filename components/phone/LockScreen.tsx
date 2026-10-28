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
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  function press(d: string) {
    if (d === "") return;
    if (d === "⌫") {
      setCode((c) => c.slice(0, -1));
      return;
    }
    const next = (code + d).slice(0, 6);
    setCode(next);
    if (next.length >= 4) setTimeout(() => onUnlock(), 200);
  }

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="absolute inset-0 z-20 flex flex-col overflow-hidden">
      <div className="absolute inset-0" style={{ background: wallpaper }} />
      <div className="wallpaper-depth"><span /><span /><span /></div>
      <div className="relative z-10 flex flex-1 flex-col">
        <StatusBar carrier={carrier} />
        <div className="mt-8 flex flex-col items-center px-6">
          <p className="text-[72px] font-thin leading-none tracking-tight text-white" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}>{time}</p>
          <p className="mt-2 text-[15px] font-medium text-white/85">{date}</p>
          <p className="mt-10 text-[11px] tracking-wide text-white/45">{hint}</p>
          <div className="mt-4 flex gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`pin-dot ${code.length > i ? "filled" : ""}`} />
            ))}
          </div>
        </div>
        <div className="mt-auto mb-14 grid w-full max-w-[300px] grid-cols-3 gap-4 self-center px-2">
          {digits.map((d, i) => (
            <button key={i} type="button" disabled={d === ""} onClick={() => press(d)} className={`keypad-key ${d === "" ? "invisible" : ""}`}>{d}</button>
          ))}
        </div>
      </div>
      <div className="home-bar" />
    </div>
  );
}
