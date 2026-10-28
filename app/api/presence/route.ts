import { NextRequest, NextResponse } from "next/server";
import {
  PRESENCE_COOKIE,
  count,
  heartbeat,
  leave,
  newSessionId,
  MAX_CONCURRENT,
} from "@/lib/presence";

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 6,
  secure: process.env.NODE_ENV === "production",
};

export async function GET() {
  return NextResponse.json({ count: count(), max: MAX_CONCURRENT });
}

export async function POST(req: NextRequest) {
  let sid = req.cookies.get(PRESENCE_COOKIE)?.value;
  if (!sid) sid = newSessionId();
  const result = heartbeat(sid);
  if (!result.ok) {
    return NextResponse.json(
      {
        error: "full",
        message: "Fune is full (100 concurrent). Try again later.",
        count: result.count,
        max: MAX_CONCURRENT,
      },
      { status: 503 }
    );
  }
  const res = NextResponse.json({
    ok: true,
    count: result.count,
    max: MAX_CONCURRENT,
  });
  res.cookies.set(PRESENCE_COOKIE, sid, cookieOpts);
  return res;
}

export async function DELETE(req: NextRequest) {
  const sid = req.cookies.get(PRESENCE_COOKIE)?.value;
  if (sid) leave(sid);
  const res = NextResponse.json({ ok: true, count: count(), max: MAX_CONCURRENT });
  res.cookies.set(PRESENCE_COOKIE, "", { ...cookieOpts, maxAge: 0 });
  return res;
}
