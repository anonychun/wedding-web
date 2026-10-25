import { listWishes } from "#lib/server/invitations.ts"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  return { wishes: await listWishes() }
}
