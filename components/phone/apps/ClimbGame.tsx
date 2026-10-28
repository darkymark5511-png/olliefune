"use client";

import { useEffect, useRef, useState } from "react";

export default function ClimbGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [alive, setAlive] = useState(true);
  const state = useRef({
    x: 80,
    y: 200,
    vy: 0,
    hills: [] as { x: number; y: number; w: number }[],
    score: 0,
    speed: 2.2,
  });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const W = c.width;
    const H = c.height;
    const s = state.current;
    s.hills = Array.from({ length: 8 }, (_, i) => ({
      x: i * 90,
      y: 180 + Math.random() * 80,
      w: 70 + Math.random() * 40,
    }));

    let raf = 0;
    let running = true;

    function frame() {
      if (!running || !ctx) return;
      const g = ctx.createLinearGradient(0, H * 0.4, 0, H);
      g.addColorStop(0, "#38bdf8");
      g.addColorStop(1, "#0369a1");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      s.speed += 0.0008;
      for (const h of s.hills) {
        h.x -= s.speed;
        if (h.x + h.w < 0) {
          h.x = W + Math.random() * 40;
          h.y = 160 + Math.random() * 90;
          h.w = 60 + Math.random() * 50;
          s.score += 1;
          setScore(s.score);
        }
        ctx.fillStyle = "#14532d";
        ctx.beginPath();
        ctx.moveTo(h.x, H);
        ctx.lineTo(h.x + h.w * 0.3, h.y);
        ctx.lineTo(h.x + h.w, H);
        ctx.closePath();
        ctx.fill();
      }

      s.vy += 0.35;
      s.y += s.vy;
      if (s.y > H - 40) {
        s.y = H - 40;
        s.vy = 0;
      }
      for (const h of s.hills) {
        if (s.x > h.x && s.x < h.x + h.w) {
          const peak = h.y;
          if (s.y + 14 > peak + 20 && s.y < peak + 60) {
            if (s.y > peak + 10) {
              s.y = peak + 10;
              s.vy *= 0.3;
            }
          }
        }
      }
      if (s.y >= H - 40 && s.speed > 4 && Math.random() < 0.002) {
        running = false;
        setAlive(false);
      }

      ctx.fillStyle = "#f97316";
      ctx.fillRect(s.x - 16, s.y - 10, 32, 18);
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(s.x - 10, s.y + 10, 6, 0, Math.PI * 2);
      ctx.arc(s.x + 10, s.y + 10, 6, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function boost() {
      if (!running) return;
      s.vy = -7;
    }
    c.addEventListener("pointerdown", boost);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      c.removeEventListener("pointerdown", boost);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-sky-950 pt-12">
      <div className="flex items-center justify-between px-4">
        <button type="button" onClick={onClose} className="text-sm text-sky-300">Home</button>
        <p className="text-sm font-bold">Climb · {score}</p>
        <span className="w-10" />
      </div>
      <p className="px-4 text-[11px] text-sky-200/70">Tap to jump / boost</p>
      <canvas ref={canvasRef} width={360} height={520} className="mx-auto mt-2 max-h-[70%] w-[92%] rounded-2xl" />
      {!alive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <p className="text-lg font-bold">Crashed</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-3 rounded-full bg-sky-500 px-5 py-2 text-sm font-bold">Reload</button>
        </div>
      )}
    </div>
  );
}
