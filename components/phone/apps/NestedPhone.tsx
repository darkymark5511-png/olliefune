"use client";

import { useEffect, useState } from "react";

export default function NestedPhone({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"boot" | "lock" | "home" | "msg">("boot");

  useEffect(() => {
    if (step !== "boot") return;
    const t = setTimeout(() => setStep("lock"), 1500);
    return () => clearTimeout(t);
  }, [step]);

  if (step === "boot") {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
        <p className="animate-pulse font-mono text-xs text-red-500">SECOND LAYER…</p>
      </div>
    );
  }

  if (step === "lock") {
    return (
      <div className="absolute inset-0 z-40 flex flex-col bg-gradient-to-b from-red-950 to-black pt-16">
        <p className="text-center text-4xl font-thin text-red-200/80">3:33</p>
        <p className="mt-2 text-center text-xs text-red-300/50">passcode disabled</p>
        <button type="button" className="mx-auto mt-12 rounded-full border border-red-500/40 px-6 py-2 text-sm text-red-200" onClick={() => setStep("home")}>
          Slide to compromise
        </button>
        <button type="button" className="mt-auto mb-8 text-xs text-white/40" onClick={onClose}>Force quit nested</button>
      </div>
    );
  }

  if (step === "msg") {
    return (
      <div className="absolute inset-0 z-40 flex flex-col bg-black px-4 pt-14">
        <button type="button" className="mb-4 self-start text-red-400" onClick={() => setStep("home")}>‹</button>
        <p className="text-sm font-bold text-red-300">from: outer_you</p>
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          Stop opening this. Every time you unlock the nested phone, something on Cam 3 gets clearer. It already knows the domain{" "}
          <span className="text-red-400">olliefune.vercel.app</span>.
        </p>
        <p className="mt-6 font-mono text-[11px] text-red-500/80">[delivery failed — recipient is you]</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-40 bg-[#120808] pt-14">
      <div className="flex justify-between px-4">
        <button type="button" onClick={onClose} className="text-xs text-red-400">Eject</button>
        <p className="text-xs text-red-300/70">corrupted home</p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4 px-6">
        <button type="button" onClick={() => setStep("msg")} className="flex flex-col items-center gap-1">
          <div className="app-icon bg-green-700">💬</div>
          <span className="text-[10px] text-red-100/70">msgs</span>
        </button>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="app-icon bg-neutral-800">?</div>
          <span className="text-[10px]">???</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="app-icon bg-neutral-800">📷</div>
          <span className="text-[10px]">cam</span>
        </div>
      </div>
      <p className="mt-16 px-6 text-center font-mono text-[10px] text-red-500/60">layer depth: 2 / ?</p>
    </div>
  );
}
