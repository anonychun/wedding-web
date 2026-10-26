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

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

export const wedding = {
  /** ISO date of the wedding day. */
  date: "2026-11-01",
  dateLabel: "Minggu, 1 November 2026",
  akad: {
    title: "Akad Nikah",
    time: "08.00 – 11.00 WIB",
    venue: "Jl. Ir Juanda",
    address: ["Kecamatan Way Jepara", "Lampung Timur"],
    mapsUrl: mapsSearch("Jl. Ir Juanda, Way Jepara, Lampung Timur"),
  },
  resepsi: {
    title: "Resepsi",
    time: "11.00 WIB – Selesai",
    venue: "Jl. Simpang Sadar",
    address: ["Kecamatan Mataram Baru", "Lampung Timur"],
    mapsUrl: mapsSearch("Jl. Simpang Sadar, Mataram Baru, Lampung Timur"),
  },
} as const

// Backsound played on the invitation pages. Drop an MP3 file at
// `static/backsound.mp3` for this to work.
export const song = {
  title: "Jatuh Suka — Tulus",
  url: "/backsound.mp3",
  volume: 0.6,
} as const
