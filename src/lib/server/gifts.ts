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
  { bank: "BCA", number: "0000000000", holder: "Achmad Chun Chun" },
  { bank: "Mandiri", number: "0000000000000", holder: "Dhona Siwi Kafnaeni" },
]
