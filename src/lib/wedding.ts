// Public wedding details shown on every invitation.
// TODO: Replace the placeholder date and venues with the real ones.

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
  /** ISO date of the wedding day (used for countdown/calendar). */
  date: "2026-06-14",
  dateLabel: "Minggu, 14 Juni 2026",
  rsvpDeadline: "31 Mei 2026",
  akad: {
    title: "Akad Nikah",
    time: "08.00 WIB",
    venue: "Nama Tempat Akad",
    address: ["Jl. Contoh No. 1", "Kota, Provinsi"],
    mapsUrl: "https://maps.google.com",
  },
  resepsi: {
    title: "Resepsi",
    time: "11.00 – 14.00 WIB",
    venue: "Nama Gedung Resepsi",
    address: ["Jl. Contoh No. 2", "Kota, Provinsi"],
    mapsUrl: "https://maps.google.com",
  },
} as const
