"use client";

import { useEffect } from "react";

export default function BootScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
      <div className="boot-logo flex flex-col items-center gap-5">
        <div
          className="flex h-[72px] w-[72px] items-center justify-center rounded-[22%] text-3xl font-black text-white shadow-2xl"
          style={{
            background:
              "linear-gradient(145deg, #7dd3fc 0%, #6366f1 45%, #a855f7 100%)",
            boxShadow:
              "0 12px 40px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          F
        </div>
        <p className="text-[13px] font-semibold tracking-[0.35em] text-white/70">
          FUNE
        </p>
        <div className="mt-6 h-[3px] w-28 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white/70"
            style={{
              width: "60%",
              animation: "bootGlow 1.6s ease infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
}
