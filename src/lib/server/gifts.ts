// Bank accounts for wedding gifts.
// Kept server-side on purpose: they are only sent to the browser for
// invitations where `showGifts` is enabled, so they never leak via page source.
// TODO: Replace with the real bank accounts.

export type GiftAccount = {
  bank: string
  number: string
  holder: string
}

export const giftAccounts: GiftAccount[] = [
  { bank: "BRI", number: "0378 0105 0650 507", holder: "Achmad Chun Chun" },
  { bank: "JAGO", number: "5034 7183 4874", holder: "Dhona Siwi Kafnaeni" },
]
