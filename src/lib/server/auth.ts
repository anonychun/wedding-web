import { createHmac, timingSafeEqual } from "node:crypto"
import { error, type Cookies } from "@sveltejs/kit"
import { ADMIN_PASSWORD } from "$app/env/private"

const COOKIE = "admin_session"
const MAX_AGE = 60 * 60 * 24 * 7

// The session token is derived from the admin password, so rotating
// ADMIN_PASSWORD invalidates every existing session.
function sessionToken(): string {
  return createHmac("sha256", ADMIN_PASSWORD).update("wedding-admin-session").digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export function checkPassword(password: string): boolean {
  const hash = (s: string) => createHmac("sha256", "pw").update(s).digest("hex")
  return safeEqual(hash(password), hash(ADMIN_PASSWORD))
}

export function isAdmin(cookies: Cookies): boolean {
  const token = cookies.get(COOKIE)
  return !!token && safeEqual(token, sessionToken())
}

/** Call at the top of every admin load/action — layout loads do not protect actions. */
export function requireAdmin(cookies: Cookies): void {
  if (!isAdmin(cookies)) error(401, "Unauthorized")
}

export function login(cookies: Cookies): void {
  cookies.set(COOKIE, sessionToken(), {
    path: "/admin",
    httpOnly: true,
    sameSite: "strict",
    maxAge: MAX_AGE,
  })
}

export function logout(cookies: Cookies): void {
  cookies.delete(COOKIE, { path: "/admin" })
}
