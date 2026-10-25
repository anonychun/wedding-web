import { error, fail } from "@sveltejs/kit"
import { giftAccounts } from "#lib/server/gifts.ts"
import { findInvitationByCode, listWishes, respondToInvitation } from "#lib/server/invitations.ts"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  const invitation = await findInvitationByCode(params.code)
  if (!invitation) error(404, "Undangan tidak ditemukan")

  // Personalised page — never cache it publicly or let search engines index it.
  setHeaders({ "cache-control": "private, no-store", "x-robots-tag": "noindex" })

  return {
    guest: {
      name: invitation.guestName,
      attendance: invitation.attendance,
      message: invitation.message,
      respondedAt: invitation.respondedAt,
    },
    // Bank accounts are only sent to the browser when enabled for this invitation.
    gifts: invitation.showGifts ? giftAccounts : null,
    wishes: await listWishes(),
  }
}

export const actions: Actions = {
  rsvp: async ({ params, request }) => {
    const invitation = await findInvitationByCode(params.code)
    if (!invitation) error(404, "Undangan tidak ditemukan")

    const data = await request.formData()
    const attendance = data.get("attendance")
    const message = String(data.get("message") ?? "").trim()

    if (attendance !== "attending" && attendance !== "not_attending") {
      return fail(400, { error: "Silakan pilih hadir atau tidak hadir." })
    }
    if (message.length > 1000) {
      return fail(400, { error: "Ucapan maksimal 1000 karakter." })
    }

    await respondToInvitation(invitation.id, attendance, message)
    return { success: true }
  },
}
