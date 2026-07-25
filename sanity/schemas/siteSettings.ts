import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs (Site Settings)",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Nama Perusahaan",
      type: "string",
      initialValue: "Daycomp Percetakan",
    }),
    defineField({
      name: "logo",
      title: "Logo Perusahaan",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Solusi Cetak Cepat, Berkualitas & Terpercaya di Kudus",
    }),
    defineField({
      name: "heroTitle",
      title: "Judul Hero",
      type: "string",
      initialValue: "Solusi Percetakan Profesional & Terlengkap",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sub-judul Hero",
      type: "text",
      rows: 3,
      initialValue:
        "Melayani berbagai kebutuhan cetak banner, brosur, kemasan, hingga stiker berkualitas tinggi dengan hasil tajam dan ketepatan waktu terbaik.",
    }),
    defineField({
      name: "heroImage",
      title: "Gambar Hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutTitle",
      title: "Judul Tentang Kami",
      type: "string",
      initialValue: "Mitra Percetakan Terpercaya untuk Bisnis Anda",
    }),
    defineField({
      name: "aboutBody",
      title: "Deskripsi Tentang Kami",
      type: "text",
      rows: 5,
      initialValue:
        "Daycomp Percetakan hadir sejak tahun 2017 memberikan layanan cetak offset dan digital printing terbaik di Kudus. Didukung mesin modern dan tim berpengalaman, kami berkomitmen memberikan cetakan presisi, warna akurat, dan pelayanan tepat waktu.",
    }),
    defineField({
      name: "aboutImage",
      title: "Gambar Tentang Kami",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutHighlights",
      title: "Keunggulan Utam a (Highlights)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Mesin Cetak Digital & Offset Modern",
        "Bahan Berkualitas & Pilihan Komplit",
        "Proses Cepat & Tepat Waktu",
        "Harga Bersaing dengan Hasil Maksimal",
      ],
    }),
    defineField({
      name: "foundedYear",
      title: "Tahun Berdiri",
      type: "number",
      initialValue: 2017,
    }),
    defineField({
      name: "phone",
      title: "Nomor Telepon/HP",
      type: "string",
      initialValue: "0857-0049-8174",
    }),
    defineField({
      name: "whatsappNumber",
      title: "Nomor WhatsApp (dengan kode negara)",
      type: "string",
      initialValue: "6285700498174",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      initialValue: "info@daycomppercetakan.com",
    }),
    defineField({
      name: "address",
      title: "Alamat Lengkap",
      type: "text",
      rows: 2,
      initialValue: "Jl. Muria No. 12, Kudus, Jawa Tengah",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps Embed Link",
      type: "string",
    }),
    defineField({
      name: "businessHours",
      title: "Jam Operasional",
      type: "string",
      initialValue: "Senin - Sabtu: 08:00 - 17:00 WIB",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description SEO",
      type: "text",
      rows: 3,
      initialValue: "Jasa percetakan murah, cepat dan berkualitas di Kudus. Melayani cetak banner, spanduk, brosur, kartu nama, packaging, stiker, dan buku.",
    }),
  ],
});
