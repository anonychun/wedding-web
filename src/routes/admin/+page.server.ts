import { fail, redirect } from "@sveltejs/kit"
import { checkPassword, isAdmin, login, logout, requireAdmin } from "#lib/server/auth.ts"
import {
  createInvitation,
  deleteInvitation,
  listInvitations,
  setShowGifts,
} from "#lib/server/invitations.ts"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ cookies, setHeaders }) => {
  setHeaders({ "cache-control": "private, no-store" })
  if (!isAdmin(cookies)) return { authed: false as const }
  return { authed: true as const, invitations: await listInvitations() }
}

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData()
    if (!checkPassword(String(data.get("password") ?? ""))) {
      return fail(401, { loginError: "Password salah." })
    }
    login(cookies)
    redirect(303, "/admin")
  },

  logout: async ({ cookies }) => {
    logout(cookies)
    redirect(303, "/admin")
  },

  create: async ({ cookies, request }) => {
    requireAdmin(cookies)
    const data = await request.formData()
    const guestName = String(data.get("guestName") ?? "").trim()
    const showGifts = data.get("showGifts") === "on"
    if (!guestName) return fail(400, { createError: "Nama tamu wajib diisi." })
    if (guestName.length > 200) return fail(400, { createError: "Nama tamu terlalu panjang." })
    const invitation = await createInvitation(guestName, showGifts)
    return { created: invitation.code }
  },

  toggleGifts: async ({ cookies, request }) => {
    requireAdmin(cookies)
    const data = await request.formData()
    await setShowGifts(String(data.get("id")), data.get("showGifts") === "true")
  },

  delete: async ({ cookies, request }) => {
    requireAdmin(cookies)
    const data = await request.formData()
    await deleteInvitation(String(data.get("id")))
  },
}
