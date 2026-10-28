import { NextRequest, NextResponse } from "next/server";
import { isAdminSession, isBanned } from "@/lib/auth";
import { DEFAULT_SETTINGS, type FuneSettings } from "@/lib/types";

let runtimeSettings: FuneSettings = { ...DEFAULT_SETTINGS };

export async function GET() {
  return NextResponse.json(runtimeSettings);
}

export async function POST(req: NextRequest) {
  if (await isBanned()) {
    return NextResponse.json({ error: "Banned" }, { status: 403 });
  }
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<FuneSettings>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  runtimeSettings = {
    ...runtimeSettings,
    ...Object.fromEntries(
      Object.entries(body).filter(
        ([, v]) => typeof v === "string" && v.length < 2000
      )
    ),
  };
  return NextResponse.json(runtimeSettings);
}
