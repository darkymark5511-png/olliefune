"use client";

import { useEffect } from "react";

export default function BootScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
      <div className="animate-boot-fade flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-[22%] bg-gradient-to-br from-sky-400 to-indigo-600 text-3xl font-black shadow-lg shadow-sky-500/30">
          F
        </div>
        <p className="text-sm font-semibold tracking-widest text-white/70">
          FUNE
        </p>
        <div className="mt-8 h-1 w-24 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse-soft rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}
