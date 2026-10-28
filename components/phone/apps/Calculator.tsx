"use client";

import { useState } from "react";

const KEYS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export default function Calculator({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  function apply(opKey: string, a: number, b: number) {
    switch (opKey) {
      case "+":
        return a + b;
      case "−":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  }

  function tap(k: string) {
    if (k === "C") {
      setDisplay("0");
      setAcc(null);
      setOp(null);
      setFresh(true);
      return;
    }
    if (k === "±") {
      setDisplay(String(-Number(display)));
      return;
    }
    if (k === "%") {
      setDisplay(String(Number(display) / 100));
      return;
    }
    if (["+", "−", "×", "÷"].includes(k)) {
      const n = Number(display);
      if (acc != null && op && !fresh) {
        const r = apply(op, acc, n);
        setAcc(r);
        setDisplay(String(r));
      } else {
        setAcc(n);
      }
      setOp(k);
      setFresh(true);
      return;
    }
    if (k === "=") {
      if (acc == null || !op) return;
      const r = apply(op, acc, Number(display));
      setDisplay(String(r));
      setAcc(null);
      setOp(null);
      setFresh(true);
      return;
    }
    if (k === ".") {
      if (fresh) {
        setDisplay("0.");
        setFresh(false);
        return;
      }
      if (!display.includes(".")) setDisplay(display + ".");
      return;
    }
    if (fresh || display === "0") {
      setDisplay(k);
      setFresh(false);
    } else {
      setDisplay((display + k).slice(0, 12));
    }
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-black pt-12">
      <button
        type="button"
        onClick={onClose}
        className="absolute left-4 top-12 z-10 text-sm text-orange-400"
      >
        Home
      </button>
      <div className="flex flex-1 items-end justify-end px-5 pb-4">
        <p className="truncate text-5xl font-thin text-white">{display}</p>
      </div>
      <div className="grid grid-cols-4 gap-3 px-3 pb-8">
        {KEYS.flat().map((k, i) => {
          const opStyle = ["÷", "×", "−", "+", "="].includes(k);
          const wide = k === "0";
          return (
            <button
              key={i}
              type="button"
              onClick={() => tap(k)}
              className={`flex h-16 items-center justify-center rounded-full text-xl font-medium ${
                wide ? "col-span-2" : ""
              } ${
                opStyle
                  ? "bg-orange-500 text-white"
                  : ["C", "±", "%"].includes(k)
                    ? "bg-neutral-400 text-black"
                    : "bg-neutral-800 text-white"
              }`}
            >
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
