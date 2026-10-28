/** Soft concurrent cap. In-memory per server instance (resets on cold start). */
export const MAX_CONCURRENT = 100;
export const SESSION_TTL_MS = 60_000;
export const PRESENCE_COOKIE = "fune_sid";

type Entry = { lastSeen: number };

const g = globalThis as unknown as { __funePresence?: Map<string, Entry> };

function store() {
  if (!g.__funePresence) g.__funePresence = new Map();
  return g.__funePresence;
}

function prune(now = Date.now()) {
  const m = store();
  for (const [id, e] of m) {
    if (now - e.lastSeen > SESSION_TTL_MS) m.delete(id);
  }
}

export function heartbeat(sessionId: string): { ok: true; count: number } | { ok: false; count: number } {
  const now = Date.now();
  prune(now);
  const m = store();
  const existing = m.has(sessionId);
  if (!existing && m.size >= MAX_CONCURRENT) {
    return { ok: false, count: m.size };
  }
  m.set(sessionId, { lastSeen: now });
  return { ok: true, count: m.size };
}

export function leave(sessionId: string) {
  store().delete(sessionId);
  prune();
  return store().size;
}

export function count() {
  prune();
  return store().size;
}

export function newSessionId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
