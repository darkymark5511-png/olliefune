"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppId, FuneSettings, PhonePhase } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/types";
import BootScreen from "./BootScreen";
import LockScreen from "./LockScreen";
import HomeScreen from "./HomeScreen";
import Calculator from "./apps/Calculator";
import ClimbGame from "./apps/ClimbGame";
import Messages from "./apps/Messages";
import CCTV from "./apps/CCTV";
import Notes from "./apps/Notes";
import NestedPhone from "./apps/NestedPhone";
import AdminSettings from "./apps/AdminSettings";

export default function PhoneShell() {
  const [phase, setPhase] = useState<PhonePhase>("boot");
  const [app, setApp] = useState<AppId | null>(null);
  const [settings, setSettings] = useState<FuneSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) setSettings(await res.json());
      } catch {
        /* defaults */
      }
    })();
  }, []);

  const finishBoot = useCallback(() => setPhase("lock"), []);
  const unlock = useCallback(() => setPhase("home"), []);

  function openApp(id: AppId) {
    setApp(id);
    setPhase("app");
  }

  function closeApp() {
    setApp(null);
    setPhase("home");
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-3">
      <p className="text-[11px] tracking-[0.2em] text-white/30">OLLIEFUNE</p>
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          {phase === "boot" && <BootScreen onDone={finishBoot} />}
          {phase === "lock" && (
            <LockScreen
              wallpaper={settings.lockWallpaper}
              carrier={settings.carrier}
              hint={settings.passcodeHint}
              onUnlock={unlock}
            />
          )}
          {(phase === "home" || phase === "app") && (
            <HomeScreen
              wallpaper={settings.homeWallpaper}
              carrier={settings.carrier}
              onOpen={openApp}
            />
          )}
          {phase === "app" && app === "calculator" && (
            <Calculator onClose={closeApp} />
          )}
          {phase === "app" && app === "game" && (
            <ClimbGame onClose={closeApp} />
          )}
          {phase === "app" && app === "messages" && (
            <Messages onClose={closeApp} />
          )}
          {phase === "app" && app === "cctv" && <CCTV onClose={closeApp} />}
          {phase === "app" && app === "notes" && <Notes onClose={closeApp} />}
          {phase === "app" && app === "phone-in-phone" && (
            <NestedPhone onClose={closeApp} />
          )}
          {phase === "app" && app === "settings" && (
            <AdminSettings
              onClose={closeApp}
              onSettings={(s) => setSettings(s)}
            />
          )}
        </div>
      </div>
      <p className="max-w-xs text-center text-[10px] text-white/25">
        Fake phone · fun + dread · {settings.deviceName}
      </p>
    </div>
  );
}
