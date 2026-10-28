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
    "linear-gradient(165deg, #0f172a 0%, #1e1b4b 35%, #4c1d95 65%, #0c4a6e 100%)",
  homeWallpaper:
    "linear-gradient(160deg, #020617 0%, #172554 40%, #312e81 75%, #0f172a 100%)",
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
