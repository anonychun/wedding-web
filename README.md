# Undangan Pernikahan — Achun & Dhona

SvelteKit 3 + PostgreSQL (Drizzle ORM).

## Setup

```sh
cp .env.example .env   # isi DATABASE_URL & ADMIN_PASSWORD
bun install
bun run db:push        # buat tabel `invitation`
bun run dev
```

## Cara pakai

1. Buka `/admin`, masuk dengan `ADMIN_PASSWORD`.
2. Isi nama tamu, centang **Tampilkan rekening** jika undangan tersebut perlu menampilkan rekening hadiah, lalu **Buat undangan**.
3. Bagikan link `/<kode>` ke tamu. Kode dibuat acak (10 karakter, kriptografis) dan tidak berhubungan dengan nama tamu — nama hanya diambil dari database, jadi mengubah URL tidak bisa mengubah nama.
4. Tamu mengisi RSVP (hadir / tidak hadir + ucapan). Semua ucapan tampil di bagian **Ucapan & Doa**, dan rekapnya ada di `/admin`.

## Konfigurasi konten

- `src/lib/wedding.ts` — tanggal, lokasi akad & resepsi, susunan acara, busana.
- `src/lib/server/gifts.ts` — daftar rekening (hanya dikirim ke browser bila `showGifts` aktif).
- `src/lib/assets/` — foto `hero.jpeg`, `right.jpg` (Detail Acara), `left.jpg` (Tanda Kasih).
