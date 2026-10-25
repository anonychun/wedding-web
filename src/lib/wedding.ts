// Public wedding details shown on every invitation.
// TODO: Replace the placeholder date, venues, and schedule with the real ones.

export const couple = {
  groom: {
    fullName: "Achmad Chun Chun",
    nickname: "Achun",
  },
  bride: {
    fullName: "Dhona Siwi Kafnaeni",
    nickname: "Dhona",
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
  itinerary: [
    { time: "08.00", label: "Akad Nikah" },
    { time: "09.30", label: "Ramah Tamah Keluarga" },
    { time: "11.00", label: "Penyambutan Tamu" },
    { time: "11.30", label: "Resepsi" },
    { time: "12.30", label: "Hiburan & Makan Siang" },
    { time: "13.30", label: "Sesi Foto Bersama" },
    { time: "14.00", label: "Penutup" },
  ],
  attire: ["Pakaian batik atau formal.", "Nuansa warna netral dianjurkan."],
} as const
