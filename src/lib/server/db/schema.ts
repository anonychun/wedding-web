import { boolean, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const attendanceEnum = pgEnum("attendance", ["attending", "not_attending"])

export const invitation = pgTable("invitation", {
  id: uuid("id").primaryKey().defaultRandom(),
  /** Random, unguessable slug used in the invitation URL. Never derived from the guest name. */
  code: text("code").notNull().unique(),
  guestName: text("guest_name").notNull(),
  showGifts: boolean("show_gifts").notNull().default(false),
  attendance: attendanceEnum("attendance"),
  message: text("message"),
  respondedAt: timestamp("responded_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Invitation = typeof invitation.$inferSelect
export type Attendance = (typeof attendanceEnum.enumValues)[number]
