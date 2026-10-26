import { desc, eq, isNotNull } from "drizzle-orm"
import { db } from "./db"
import { invitation, type Attendance } from "./db/schema"

const ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
const CODE_LENGTH = 10
export const CODE_PATTERN = /^[a-zA-Z0-9]{10}$/

/** Cryptographically random, unguessable invitation code (~57 bits of entropy). */
function generateCode(): string {
  // Rejection sampling avoids modulo bias.
  const max = 256 - (256 % ALPHABET.length)
  let code = ""
  while (code.length < CODE_LENGTH) {
    for (const byte of crypto.getRandomValues(new Uint8Array(CODE_LENGTH * 2))) {
      if (byte < max && code.length < CODE_LENGTH) code += ALPHABET[byte % ALPHABET.length]
    }
  }
  return code
}

export async function createInvitation(guestName: string, showGifts: boolean) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const [row] = await db
      .insert(invitation)
      .values({ code: generateCode(), guestName, showGifts })
      .onConflictDoNothing({ target: invitation.code })
      .returning()
    if (row) return row
  }
  throw new Error("Failed to generate a unique invitation code")
}

export async function findInvitationByCode(code: string) {
  if (!CODE_PATTERN.test(code)) return undefined
  return db.query.invitation.findFirst({ where: eq(invitation.code, code) })
}

export async function respondToInvitation(id: string, attendance: Attendance, message: string) {
  await db
    .update(invitation)
    .set({ attendance, message: message || null, respondedAt: new Date() })
    .where(eq(invitation.id, id))
}

/** Public wishes wall: only name, message, and attendance — never codes. */
export async function listWishes() {
  return db
    .select({
      guestName: invitation.guestName,
      message: invitation.message,
      attendance: invitation.attendance,
      respondedAt: invitation.respondedAt,
    })
    .from(invitation)
    .where(isNotNull(invitation.respondedAt))
    .orderBy(desc(invitation.respondedAt))
    .limit(200)
}

export async function listInvitations() {
  return db.select().from(invitation).orderBy(desc(invitation.createdAt))
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function setShowGifts(id: string, showGifts: boolean) {
  if (!UUID_PATTERN.test(id)) return
  await db.update(invitation).set({ showGifts }).where(eq(invitation.id, id))
}

export async function deleteInvitation(id: string) {
  if (!UUID_PATTERN.test(id)) return
  await db.delete(invitation).where(eq(invitation.id, id))
}
