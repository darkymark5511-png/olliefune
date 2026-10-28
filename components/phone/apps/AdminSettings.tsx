"use client";

import { useEffect, useState } from "react";
import type { FuneSettings } from "@/lib/types";

export default function AdminSettings({
  onClose,
  onSettings,
}: {
  onClose: () => void;
  onSettings: (s: FuneSettings) => void;
}) {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState<FuneSettings | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setForm(data);
    })();
  }, []);

  async function login() {
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || "Failed");
      return;
    }
    setAuthed(true);
  }

  async function save() {
    if (!form) return;
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      setMsg(data.error || "Save failed");
      return;
    }
    const data = await res.json();
    onSettings(data);
    setMsg("Saved");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[#1c1c1e] pt-12">
      <div className="flex items-center justify-between px-4 pb-3">
        <button type="button" onClick={onClose} className="text-sky-400">Home</button>
        <p className="font-bold">Settings</p>
        <span className="w-10" />
      </div>

      {!authed ? (
        <div className="space-y-3 px-4 pt-6">
          <p className="text-xs text-white/50">Admin only. Wrong password = 24h ban.</p>
          <input
            type="password"
            className="w-full rounded-xl bg-black/40 px-4 py-3 text-sm outline-none ring-1 ring-white/10"
            placeholder="ADMIN_PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => void login()} className="w-full rounded-xl bg-sky-600 py-3 text-sm font-bold">
            Unlock admin
          </button>
          {err && <p className="text-xs text-red-400">{err}</p>}
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto px-4 pb-8">
          {form &&
            (
              [
                ["deviceName", "Device name"],
                ["carrier", "Carrier"],
                ["passcodeHint", "Lock hint"],
                ["loreTitle", "Lore title"],
                ["lockWallpaper", "Lock wallpaper (CSS)"],
                ["homeWallpaper", "Home wallpaper (CSS)"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block text-xs text-white/60">
                {label}
                <input
                  className="mt-1 w-full rounded-xl bg-black/40 px-3 py-2 text-sm text-white outline-none"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </label>
            ))}
          <button type="button" onClick={() => void save()} className="w-full rounded-xl bg-sky-600 py-3 text-sm font-bold">Save</button>
          <button type="button" onClick={() => void logout()} className="w-full rounded-xl bg-white/10 py-2 text-xs">Logout admin</button>
          {msg && <p className="text-xs text-emerald-400">{msg}</p>}
        </div>
      )}
    </div>
  );
}
