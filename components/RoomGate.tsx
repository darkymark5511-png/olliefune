"use client";

import { useEffect, useState } from "react";

export default function RoomGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"loading" | "ok" | "full">("loading");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setInterval>;

    async function beat() {
      try {
        const res = await fetch("/api/presence", { method: "POST" });
        const data = await res.json();
        if (!alive) return;
        if (!res.ok || data.error === "full") {
          setState("full");
          setCount(data.count ?? 100);
          return;
        }
        setCount(data.count ?? 0);
        setState("ok");
      } catch {
        if (alive) setState("ok");
      }
    }

    void beat();
    timer = setInterval(() => void beat(), 25_000);

    const onLeave = () => {
      void fetch("/api/presence", { method: "DELETE", keepalive: true });
    };
    window.addEventListener("pagehide", onLeave);

    return () => {
      alive = false;
      clearInterval(timer);
      window.removeEventListener("pagehide", onLeave);
      onLeave();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#020617] text-white/50 text-sm">
        Connecting to Fune…
      </div>
    );
  }

  if (state === "full") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-[#020617] px-6 text-center text-white">
        <p className="text-lg font-bold">Room full</p>
        <p className="text-sm text-white/50">
          Max 100 concurrent users ({count}/100). Refresh in a minute.
        </p>
        <button
          type="button"
          className="mt-4 rounded-full bg-sky-600 px-5 py-2 text-sm font-bold"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
