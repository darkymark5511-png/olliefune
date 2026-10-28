import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieOptions,
  adminCookieValue,
  banCookieOptions,
  getAdminPassword,
  isBanned,
  passwordOk,
  ADMIN_COOKIE,
  BAN_COOKIE,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (await isBanned()) {
    return NextResponse.json(
      { error: "Banned 24h. Try later." },
      { status: 403 }
    );
  }

  if (!getAdminPassword()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not set on server" },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const password = body.password || "";
  if (!passwordOk(password)) {
    const res = NextResponse.json({ error: "Wrong password" }, { status: 401 });
    res.cookies.set(BAN_COOKIE, String(Date.now() + 86_400_000), banCookieOptions());
    return res;
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminCookieValue(), adminCookieOptions());
  res.cookies.set(BAN_COOKIE, "", { ...banCookieOptions(), maxAge: 0 });
  return res;
}
