# Implementation Plan — Daycomp Percetakan

Migrasi dari static HTML → Next.js + TypeScript + Tailwind + Sanity CMS, tanpa database.

---

## 1. Kondisi Sekarang

| Item | Detail |
|---|---|
| Struktur | 3 file: `index.html` (627 baris), `script.js`, `style.css` + `assets/` (11 MB) |
| Styling | Tailwind lewat CDN (`cdn.tailwindcss.com`) + CSS custom |
| Icon | Font Awesome CDN 6.4.0 |
| Font | Poppins via Google Fonts CDN |
| Konten | Hardcoded semua: 6 layanan, 6 portfolio, 3 testimoni, 4 stat |
| Form | Submit → `wa.me` deeplink, **tanpa backend** |
| Deploy | GitHub Pages (`CNAME` sempat ada lalu dihapus di commit `d48b7bc`) |

### Bug & masalah yang ditemukan (harus ikut dibereskan saat migrasi)

**Fungsional**
1. `script.js:6-29` dan `script.js:54-71` — **dua counter animation yang saling tabrakan**. Yang pertama jalan langsung saat DOMContentLoaded (jadi animasi sudah selesai sebelum user scroll), yang kedua dipanggil lagi oleh IntersectionObserver. Yang kedua juga bug: `+counter.querySelector('div').innerText` pada counter `98%` menghasilkan `NaN` karena suffix `%` ikut ke-parse.
2. `style.css:16-26` + `script.js:78-98` — kelas `.fade-in` / `.slide-up` / `.scale-in` animasinya jalan **saat page load**, bukan saat masuk viewport. IntersectionObserver-nya cuma menambah `opacity-100` yang tidak melakukan apa-apa. Efek reveal-on-scroll praktis tidak berfungsi.
3. `index.html:148` — typo class: `hover:border-red-400border` (kelas tidak valid, hover border card layanan #2 mati).
4. `style.css:73-86` — `.nav-link::after` warnanya `white` padahal navbar ber-background putih → underline hover tidak kelihatan.
5. Form tidak punya atribut `name`, tidak ada `required`, tidak ada validasi selain `alert()`.
6. Nomor WhatsApp di `script.js:108` (`6285700498174`) **beda** dengan nomor HP di halaman kontak (`085974559988` = `6285974559988`). Perlu dikonfirmasi mana yang benar.

**Konten / konsistensi**
7. About bilang berdiri **2017** (`index.html:217`), footer bilang **since 2008** (`index.html:574`).
8. Copyright masih **2023**.
9. Hero pakai bahasa Inggris, sisanya Indonesia. Beberapa deskripsi layanan juga masih Inggris (Packaging, Signage, Book Printing, Promotional Items).
10. Footer "Services" semua `href="#"` (link mati).

**Warna — ini inti dari permintaan "warna solid sampai komponen kecil"**
11. Icon bulat di About & Kontak pakai `bg-blue-100` dengan `text-red-400` — sisa template lama, tabrakan sama brand merah.
12. Ada **4 merah berbeda** dipakai acak: `red-400` (dominan), `red-600`, `red-700` (hover), plus `--primary: #eb2525` / `--secondary: #af1e47` / `--accent: #f63b44` di CSS yang **tidak pernah dipakai sama sekali**.
13. `red-400` (#f87171) sebagai warna teks di atas putih → **contrast ratio ~2.9:1, gagal WCAG AA** (butuh ≥4.5:1).
14. Hero gradient `rgba(204,13,13)` → `rgba(255,198,198)` dengan teks putih: sisi kanan gradient hampir putih, teks putih di atasnya tidak terbaca.

**Aset & performa**
15. 6 gambar di-hotlink dari domain luar (`down-id.img.susercontent.com`, `cloudprint.uk`, `maestroprinting.com`, `lh3.googleusercontent.com`) — bisa mati kapan saja, tidak terkontrol, dan lambat.
16. `assets/` 11 MB, tidak ada gambar yang dioptimasi (`dayHero.jpg`, `teams.jpg` full-size).
17. Tailwind CDN = ~300 KB JS di production + FOUC.
18. Font Awesome full CSS (~75 KB) untuk ~15 icon.

**SEO & aksesibilitas**
19. Tidak ada `<meta name="description">`, tidak ada Open Graph, tidak ada JSON-LD. Untuk bisnis lokal (percetakan di Kudus) ini kerugian besar.
20. `lang="en"` padahal konten Indonesia.
21. Tombol mobile menu tidak ada `aria-label` / `aria-expanded`, menu tidak bisa ditutup dengan Escape.
22. Tidak ada focus-visible style di mana pun → navigasi keyboard tidak kelihatan.
23. Tidak ada `prefers-reduced-motion`.

---

## 2. Target Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript** | Server Components → konten Sanity di-render di server, JS ke browser minimal |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, tanpa `tailwind.config.js`) | Satu file token warna, tidak ada config JS terpisah |
| CMS | **Sanity** (embedded Studio di `/studio`) | Hosted content lake = *tanpa DB sendiri*, sesuai permintaan |
| Gambar | `next/image` + Sanity CDN | Auto AVIF/WebP, responsive srcset, lazy |
| Icon | **lucide-react** | Tree-shakeable, ganti Font Awesome CDN, ~1 KB per icon |
| Font | `next/font/local` atau `next/font/google` | Self-hosted, zero layout shift, tanpa request ke Google |
| Form | Tetap **WhatsApp deeplink** | Nol backend, nol DB, nol biaya — sudah benar dari awal |
| Animasi | **CSS + satu hook `useInView` (~12 baris)** | Lihat catatan di bawah |
| Deploy | **Vercel** | Lihat catatan di bawah |

### Catatan animasi — kenapa tidak Framer Motion

Reveal-on-scroll, stagger, hover, counter, marquee, parallax ringan — semuanya bisa dengan CSS transition + satu IntersectionObserver hook. Framer Motion menambah ~35 KB gzip untuk hal yang sudah bisa dilakukan platform. **Rencana: mulai tanpa library animasi.** Kalau nanti perlu choreography kompleks (shared layout transition, drag, exit animation), baru tambah `motion` — bukan sebelumnya.

### Catatan deploy — ini keputusan yang perlu diambil

Project sekarang di GitHub Pages. **Next.js + Sanity tidak jalan di GitHub Pages** dalam mode normal. Dua opsi:

- **A. Vercel (rekomendasi).** Free tier cukup. Dapat ISR — edit di Sanity Studio → website update otomatis tanpa rebuild manual. Domain custom tinggal pasang.
- **B. Tetap static export (`output: 'export'`) ke GitHub Pages.** Konten Sanity ditarik saat build. Konsekuensi: setiap edit konten harus trigger GitHub Action rebuild (bisa via Sanity webhook), `next/image` harus pakai custom loader ke Sanity CDN, dan `/studio` tidak bisa di-embed (harus deploy terpisah ke `sanity deploy`).

Plan ini ditulis untuk **opsi A**. Kalau mau opsi B, bilang — ada beberapa langkah yang berubah.

---

## 3. Design System — Warna Solid

Satu sumber kebenaran di `app/globals.css`. Tidak ada warna hardcoded di komponen mana pun; semua lewat token.

```css
@import "tailwindcss";

@theme {
  /* Brand — satu skala merah, bukan 4 merah acak */
  --color-brand-50:  #fef2f2;
  --color-brand-100: #fee2e2;
  --color-brand-200: #fecaca;
  --color-brand-500: #ef4444;
  --color-brand-600: #dc2626;  /* default: teks & fill, kontras 4.8:1 di putih ✓ AA */
  --color-brand-700: #b91c1c;  /* hover */
  --color-brand-800: #991b1b;  /* active */
  --color-brand-950: #450a0a;  /* dark surface */

  /* Netral — dipakai untuk semua teks & permukaan */
  --color-ink:      #0b0b0f;   /* heading */
  --color-body:     #3f3f46;   /* paragraf */
  --color-muted:    #71717a;   /* caption, meta */
  --color-line:     #e4e4e7;   /* border, divider */
  --color-surface:  #ffffff;
  --color-surface-2:#fafafa;   /* section selang-seling */

  /* Aksen tunggal — HANYA untuk rating bintang */
  --color-star:     #f59e0b;

  --font-sans: var(--font-poppins), ui-sans-serif, system-ui, sans-serif;
  --radius-card: 1rem;
}
```

**Aturan pemakaian (ditulis ke `CLAUDE.md` supaya konsisten seterusnya):**

| Elemen | Token |
|---|---|
| Tombol primary | `bg-brand-600` → hover `bg-brand-700` → active `bg-brand-800` |
| Tombol secondary | `border-brand-600 text-brand-600` → hover `bg-brand-50` |
| Heading | `text-ink` |
| Body text | `text-body` |
| Caption / label | `text-muted` |
| Border & divider | `border-line` |
| Icon chip bulat | `bg-brand-50 text-brand-600` (**ganti semua `bg-blue-100`**) |
| Focus ring | `ring-2 ring-brand-600 ring-offset-2` — di **semua** elemen interaktif |
| Bintang rating | `text-star` |

Turunannya: sudut membulat cuma 2 nilai (`rounded-lg` untuk kontrol, `rounded-card` untuk kartu), shadow cuma 2 tingkat, spacing section seragam (`py-20 md:py-28`). Konsistensi "sampai komponen kecil" datang dari batasan pilihan, bukan dari nambah utility.

Dark mode: **skip dulu.** Company profile, mayoritas traffic mobile siang hari. Tambahkan kalau memang diminta — token di atas sudah siap tinggal ditambah blok `@media (prefers-color-scheme: dark)`.

---

## 4. Struktur Project Target

```
.
├── app/
│   ├── layout.tsx              # font, metadata dasar, JSON-LD LocalBusiness
│   ├── page.tsx                # homepage — fetch semua konten Sanity, render section
│   ├── globals.css             # @theme token + keyframes + reduced-motion
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   ├── api/revalidate/route.ts # webhook Sanity → revalidateTag
│   └── studio/[[...tool]]/page.tsx
├── components/
│   ├── site/                   # Navbar, Footer, WhatsAppFab
│   ├── sections/               # Hero, Stats, Services, About, Portfolio, Testimonials, CTA, Contact
│   └── ui/                     # Button, Card, SectionHeading, Reveal, Counter, Lightbox
├── sanity/
│   ├── client.ts               # createClient + helper fetch ber-tag
│   ├── image.ts                # urlFor()
│   ├── queries.ts              # GROQ, semua di satu tempat
│   ├── types.ts                # tipe hasil query (generate via `sanity typegen`)
│   ├── env.ts
│   └── schemas/                # siteSettings, service, portfolio, testimonial, stat
├── lib/
│   ├── useInView.ts
│   └── whatsapp.ts             # bangun URL wa.me
├── public/                     # aset yang tetap statis (logo, favicon, og fallback)
├── sanity.config.ts
├── next.config.ts
└── .env.local
```

Homepage tetap **satu halaman scroll** seperti sekarang. Tidak dipecah jadi multi-route — belum ada kebutuhannya.

---

## 5. Content Model Sanity

Lima document type. Tidak pakai page-builder / block content builder — over-engineering untuk company profile satu halaman.

**`siteSettings`** (singleton)
`companyName`, `logo`, `tagline`, `heroTitle`, `heroSubtitle`, `heroImage`, `aboutTitle`, `aboutBody[]` (portable text), `aboutImage`, `aboutHighlights[]` (string), `foundedYear`, `phone`, `whatsappNumber`, `email`, `address`, `mapEmbedUrl`, `businessHours`, `socials[]` ({platform, url}), `seo` ({title, description, ogImage})

**`service`** — `title`, `slug`, `description`, `icon` (dropdown nama lucide, bukan free text), `order`
**`portfolioItem`** — `title`, `image`, `category` (ref/enum), `description`, `order`
**`testimonial`** — `name`, `avatar`, `quote`, `rating` (1–5), `source`, `order`
**`stat`** — `label`, `value` (number), `suffix`, `order`

Semua konten hardcoded di HTML sekarang dimigrasikan ke sini, termasuk 6 gambar hotlink yang harus **diunduh dan di-upload ke Sanity** (sekalian menghilangkan ketergantungan ke domain orang lain).

Fetch pakai `next.tags` + `revalidateTag` dari webhook Sanity → edit di Studio langsung live tanpa rebuild.

**Yang di-skip:** live preview / visual editing, draft mode, i18n plugin, custom desk structure di luar singleton. Tambahkan kalau editornya nanti minta.

---

## 6. Redesign per Section

Semua section: reveal on scroll (fade + translate 16px, stagger 60 ms), respect `prefers-reduced-motion`, breakpoint diuji di 360 / 768 / 1280 / 1920.

| Section | Perubahan |
|---|---|
| **Navbar** | Transparan di atas hero → solid + shadow + blur setelah scroll 80px. Active-section highlight via IntersectionObserver. Mobile: full-screen sheet dengan stagger item, close via Escape + klik overlay, focus trap, `aria-expanded`. |
| **Hero** | Ganti gradient rusak → brand-950 solid dengan noise/pattern halus. Judul **satu bahasa (Indonesia)**, animasi per-baris. Gambar dengan hover tilt ringan. Ganti `animate-bounce` (mengganggu) dengan float ~6px 6s. Dua CTA: "Konsultasi via WhatsApp" (primary) + "Lihat Layanan". |
| **Stats** | Counter yang **benar**: satu implementasi, `requestAnimationFrame` dengan easing, trigger sekali saat masuk viewport, suffix ditangani terpisah dari angka, `prefers-reduced-motion` → langsung tampil nilai akhir. |
| **Services** | Grid dari Sanity. Card: border `line` → hover `brand-600`, lift 6px, icon chip `bg-brand-50` (bukan biru). Hapus typo class. |
| **About** | Layout 2 kolom, gambar dengan frame offset. Highlight list pakai ikon check `brand-600` di chip `brand-50`. Perbaiki konflik tahun berdiri. |
| **Portfolio** | Filter kategori (client-side, tanpa reload). Grid masonry-ish, hover overlay judul + kategori, klik → lightbox (`<dialog>` native, bukan library). |
| **Testimonials** | Carousel scroll-snap CSS di mobile, grid 3 kolom di desktop. Bintang `text-star`, half-star ditangani benar. |
| **CTA** | Band `bg-brand-600` full-width, satu tombol putih. |
| **Kontak** | Form dengan `name` attribute, `required`, validasi inline (bukan `alert`), state loading, lalu buka `wa.me`. Info kontak dari `siteSettings`. Tambah embed Google Maps lazy (load saat di-klik, bukan saat page load). |
| **Global** | FAB WhatsApp melayang (muncul setelah scroll melewati hero), scroll-to-top, `scroll-behavior: smooth` via CSS. |

---

## 7. Tahapan Eksekusi

**Fase 0 — Persiapan** (~30 mnt)
- Backup: branch `legacy-static` dari `main`.
- Buat project Sanity (`sanity.io/manage`), catat `projectId` + `dataset`, buat token editor.
- Konfirmasi 4 hal: nomor WhatsApp yang benar, tahun berdiri (2017 vs 2008), pilihan hosting (Vercel vs GitHub Pages), dan apakah teks hero mau Indonesia semua.

**Fase 1 — Scaffold** (~1 jam)
- `npx create-next-app@latest --ts --tailwind --app --eslint`
- Setup token `@theme`, font Poppins via `next/font`, install `lucide-react`.
- Pindahkan `assets/` → `public/`, kompres gambar besar.
- ✅ Cek: `npm run dev` jalan, halaman kosong dengan token warna terpakai.

**Fase 2 — Sanity** (~2 jam)
- Install `next-sanity` + `@sanity/image-url` + `@sanity/vision`.
- Tulis 5 schema, embed Studio di `/studio`.
- Isi semua konten (termasuk unduh + upload 6 gambar hotlink).
- Generate tipe: `sanity schema extract && sanity typegen generate`.
- ✅ Cek: Studio bisa dibuka, semua konten tersimpan, query GROQ mengembalikan data lengkap.

**Fase 3 — Komponen UI dasar** (~2 jam)
- `Button`, `Card`, `SectionHeading`, `Reveal`, `Counter`, `Container`.
- Hook `useInView`, keyframes global, blok `prefers-reduced-motion`.
- ✅ Cek: `Counter` benar untuk nilai `1590` dan `98%`; `Reveal` hanya jalan saat masuk viewport.

**Fase 4 — Section** (~4–6 jam)
- Bangun urut: Navbar → Hero → Stats → Services → About → Portfolio → Testimonials → CTA → Kontak → Footer.
- Semua data dari Sanity, tanpa hardcode.
- ✅ Cek per section: 360px tidak overflow horizontal, keyboard-navigable, tidak ada warna di luar token.

**Fase 5 — SEO, a11y, performa** (~2 jam)
- `metadata` + `opengraph-image`, `sitemap.ts`, `robots.ts`, JSON-LD `LocalBusiness` (alamat Kudus, jam buka, telepon).
- `lang="id"`, hierarki heading benar, alt text dari Sanity, focus-visible di semua kontrol.
- Webhook Sanity → `/api/revalidate`.
- ✅ Cek: Lighthouse mobile ≥ 95 di keempat kategori; axe DevTools nol violation kritis.

**Fase 6 — Deploy** (~1 jam)
- Push ke GitHub, import ke Vercel, set env var, pasang domain (`CNAME` lama), verifikasi webhook.
- ✅ Cek: edit teks di Studio → live di production < 10 detik tanpa rebuild manual.

**Total estimasi: ~13–16 jam kerja.**

---

## 8. Yang Sengaja TIDAK Dikerjakan

| Skip | Tambahkan kalau |
|---|---|
| Framer Motion / GSAP | Butuh choreography yang CSS tidak bisa (drag, exit animation, shared layout) |
| Dark mode | Diminta — token sudah siap |
| Multi-halaman (`/layanan/[slug]`, blog) | Butuh SEO per-layanan atau mau nulis artikel |
| Backend form + database | Mau simpan riwayat lead — sekarang WhatsApp sudah jadi inbox-nya |
| i18n (ID/EN) | Ada target pasar asing nyata |
| Live preview / visual editing Sanity | Editor mengeluh harus bolak-balik tab |
| Unit test / Playwright | Ada logika yang lebih rumit dari counter |
| Analytics | Butuh data — kalau iya, Vercel Analytics satu baris |

---

## 9. Risiko

| Risiko | Mitigasi |
|---|---|
| GitHub Pages tidak bisa host Next.js + Sanity | Putuskan hosting di Fase 0, sebelum menulis kode |
| Sanity free tier: 2 user, 10k dokumen, 5 GB bandwidth | Lebih dari cukup untuk company profile — pantau kalau traffic naik |
| Gambar hotlink hilang sebelum sempat diunduh | Unduh **sekarang**, di Fase 0, jangan tunggu Fase 2 |
| Domain sempat down saat pindah hosting | Deploy dulu ke `*.vercel.app`, verifikasi, baru pindahkan DNS |
| SEO turun setelah redesign | URL tetap satu halaman + anchor yang sama; tambah JSON-LD = kemungkinan besar justru naik |
