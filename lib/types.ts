export type PhonePhase = "boot" | "lock" | "home" | "app";

export type AppId =
  | "messages"
  | "cctv"
  | "notes"
  | "calculator"
  | "game"
  | "settings"
  | "phone-in-phone";

export interface FuneSettings {
  lockWallpaper: string;
  homeWallpaper: string;
  deviceName: string;
  carrier: string;
  passcodeHint: string;
  loreTitle: string;
}

export const DEFAULT_SETTINGS: FuneSettings = {
  lockWallpaper:
    "linear-gradient(160deg,#0f172a 0%,#1e3a5f 40%,#0c4a6e 70%,#020617 100%)",
  homeWallpaper:
    "linear-gradient(165deg,#0b1220 0%,#172554 45%,#0f172a 100%)",
  deviceName: "Fune",
  carrier: "OllieNet",
  passcodeHint: "any 4+ digits",
  loreTitle: "Don't open the nested phone",
};

export interface MessageThread {
  id: string;
  name: string;
  preview: string;
  unread: number;
  messages: { from: "them" | "me"; text: string; time: string }[];
}

export interface CctvCam {
  id: string;
  label: string;
  status: "online" | "offline" | "glitch";
  note: string;
}
