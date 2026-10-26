// Public wedding details shown on every invitation.

export const couple = {
  groom: {
    fullName: "Achmad Chun Chun, S.Kom.",
    nickname: "Achun",
    childOrder: "Putra pertama dari",
    parents: "Bapak Edi Harjito & Ibu Priyani",
    instagram: "anonychun",
  },
  bride: {
    fullName: "Dhona Siwi Kafnaeni, S.E.",
    nickname: "Dhona",
    childOrder: "Putri kedua dari",
    parents: "Bapak Sri Wiyono & Ibu Rosmayenti",
    instagram: "dhonasiwi",
  },
} as const

export const wedding = {
  /** ISO date of the wedding day. */
  date: "2026-11-01",
  dateLabel: "Minggu, 1 November 2026",
  akad: {
    title: "Akad Nikah",
    time: "08.00 - 11.00 WIB",
    venue: "Jl. Ir Juanda",
    address: ["Kecamatan Way Jepara", "Lampung Timur"],
    mapsUrl: "https://maps.app.goo.gl/fufHi34Px9vY75fKA",
  },
  resepsi: {
    title: "Resepsi",
    time: "11.00 WIB - Selesai",
    venue: "Jl. Simpang Sadar",
    address: ["Kecamatan Mataram Baru", "Lampung Timur"],
    mapsUrl: "https://maps.app.goo.gl/dRU35Y5uwtnX54tT7",
  },
} as const

export const shareBlurb = `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu. ${wedding.dateLabel}.`

// Backsound played on the invitation pages.
export const song = {
  url: "/backsound.mp3",
  volume: 0.6,
} as const
