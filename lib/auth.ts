import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "fune_admin";
export const BAN_COOKIE = "fune_ban";
const DAY = 60 * 60 * 24;

function hash(s: string) {
  return createHash("sha256").update(s).digest("hex");
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function passwordOk(input: string) {
  const expected = getAdminPassword();
  if (!expected) return false;
  const a = Buffer.from(hash(input));
  const b = Buffer.from(hash(expected));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminSession() {
  const jar = await cookies();
  const v = jar.get(ADMIN_COOKIE)?.value;
  if (!v) return false;
  const expected = hash(`ok:${getAdminPassword()}`);
  try {
    return timingSafeEqual(Buffer.from(v), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function adminCookieValue() {
  return hash(`ok:${getAdminPassword()}`);
}

export async function isBanned() {
  const jar = await cookies();
  const until = jar.get(BAN_COOKIE)?.value;
  if (!until) return false;
  const t = Number(until);
  if (!Number.isFinite(t)) return false;
  return Date.now() < t;
}

export function banCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: DAY,
  };
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: DAY * 7,
  };
}
