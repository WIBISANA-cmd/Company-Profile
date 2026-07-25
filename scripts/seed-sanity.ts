import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nox9jrn3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01";
const token = process.env.SANITY_API_WRITE_TOKEN || "skULQ4z8TkCp9BpukOPCTiaZ5rlaVnq04fwRxgSfhLu8yCGAAxhndr4PbOcrv5MGq03gtTrahspDpWefSic4vj9Y8d7EAoZ8fways8rVDAXfzoESAT7hYQEqYqTiDvk0Kscwms1bZbiAdS7psB6rwu8Qc2C3FNQGiazEdTtpKJKHq2VguXSM";

console.log(`Connecting to Sanity project: ${projectId}, dataset: ${dataset}...`);

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Daycomp Percetakan",
    tagline: "Solusi Cetak Cepat, Berkualitas & Terpercaya di Kudus",
    heroTitle: "Solusi Percetakan Profesional & Terlengkap",
    heroSubtitle:
      "Melayani berbagai kebutuhan cetak banner, brosur, kemasan, hingga stiker berkualitas tinggi dengan hasil tajam dan ketepatan waktu terbaik.",
    aboutTitle: "Mitra Percetakan Terpercaya untuk Bisnis Anda",
    aboutBody:
      "Daycomp Percetakan hadir sejak tahun 2017 memberikan layanan cetak offset dan digital printing terbaik di Kudus. Didukung mesin modern dan tim berpengalaman, kami berkomitmen memberikan cetakan presisi, warna akurat, dan pelayanan tepat waktu.",
    aboutHighlights: [
      "Mesin Cetak Digital & Offset Modern",
      "Bahan Berkualitas & Pilihan Komplit",
      "Proses Cepat & Tepat Waktu",
      "Harga Bersaing dengan Hasil Maksimal",
    ],
    foundedYear: 2017,
    phone: "0857-0049-8174",
    whatsappNumber: "6285700498174",
    email: "info@daycomppercetakan.com",
    address: "Jl. Muria No. 12, Kudus, Jawa Tengah",
    businessHours: "Senin - Sabtu: 08:00 - 17:00 WIB",
    seoDescription:
      "Percetakan terpercaya di Kudus melayani cetak banner, brosur, kartu nama, packaging, stiker, dan buku berkualitas tinggi dengan harga terjangkau.",
  },
  {
    _id: "service-1",
    _type: "service",
    title: "Cetak Digital & Offset",
    description:
      "Layanan cetak dokumen, brosur, flyer, poster, dan katalog dengan resolusi tinggi dan warna yang tajam.",
    icon: "Printer",
    order: 1,
  },
  {
    _id: "service-2",
    _type: "service",
    title: "Desain Grafis Profesional",
    description:
      "Bantuan penataan layout, branding, dan desain kreatif dari desainer berpengalaman sebelum proses cetak.",
    icon: "Layout",
    order: 2,
  },
  {
    _id: "service-3",
    _type: "service",
    title: "Cetak Kemasan (Packaging)",
    description:
      "Pembuatan box produk, standing pouch, sleeve, dan kemasan kustom untuk meningkatkan daya saing brand UMKM.",
    icon: "Package",
    order: 3,
  },
  {
    _id: "service-4",
    _type: "service",
    title: "Spanduk & Signage (Large Format)",
    description:
      "Banner outdoor, X-banner, Roll-up banner, baliho, dan neon box dengan bahan tahan cuaca.",
    icon: "Flag",
    order: 4,
  },
  {
    _id: "service-5",
    _type: "service",
    title: "Cetak Buku & Majalah",
    description:
      "Penjilidan softcover, hardcover, spiral, cetak majalah, buku tahunan, hingga agenda kustom.",
    icon: "BookOpen",
    order: 5,
  },
  {
    _id: "service-6",
    _type: "service",
    title: "Merchandise & Barang Promosi",
    description:
      "Stiker label vinyl, mug, gelang, pin, totebag, dan souvenir promosi perusahaan.",
    icon: "Tag",
    order: 6,
  },
  {
    _id: "stat-1",
    _type: "stat",
    label: "Project Selesai",
    value: 1590,
    suffix: "+",
    order: 1,
  },
  {
    _id: "stat-2",
    _type: "stat",
    label: "Klien Puas",
    value: 98,
    suffix: "%",
    order: 2,
  },
  {
    _id: "stat-3",
    _type: "stat",
    label: "Pengalaman Kerja",
    value: 7,
    suffix: " Tahun",
    order: 3,
  },
  {
    _id: "stat-4",
    _type: "stat",
    label: "Dukungan Mesin Modern",
    value: 12,
    suffix: "+",
    order: 4,
  },
  {
    _id: "portfolio-1",
    _type: "portfolioItem",
    title: "Banner & Spanduk Outdoor",
    category: "Signage & Banner",
    description: "Cetak Flexi 340gr warna tajam untuk promosi acara di Kudus.",
    order: 1,
  },
  {
    _id: "portfolio-2",
    _type: "portfolioItem",
    title: "Kartu Nama Matte Lamination",
    category: "Digital Printing",
    description: "Kartu nama eksklusif dengan pilihan finishing laminasi doff.",
    order: 2,
  },
  {
    _id: "portfolio-3",
    _type: "portfolioItem",
    title: "Brochure & Leaflet Promosi",
    category: "Offset",
    description: "Brosur lipat 3 bahan Art Paper 150gr untuk katalog produk.",
    order: 3,
  },
  {
    _id: "portfolio-4",
    _type: "portfolioItem",
    title: "Packaging Box Makanan UMKM",
    category: "Packaging",
    description: "Kotak kemasan Ivory dengan food-grade coating.",
    order: 4,
  },
  {
    _id: "portfolio-5",
    _type: "portfolioItem",
    title: "Stiker Label Produk Roll",
    category: "Merchandise",
    description: "Stiker Vinyl tahan air dengan potong lis Kiss-Cut.",
    order: 5,
  },
  {
    _id: "portfolio-6",
    _type: "portfolioItem",
    title: "Buku Panduan & Agenda Kustom",
    category: "Offset",
    description: "Penjilidan hardcover eksklusif dengan pita pembatas.",
    order: 6,
  },
  {
    _id: "testimonial-1",
    _type: "testimonial",
    name: "Budi Santoso",
    role: "Pemilik UMKM Kuliner Kudus",
    quote:
      "Hasil cetak kemasan makanan di Daycomp sangat memuaskan. Warnanya persis seperti file desain dan prosesnya tepat waktu!",
    rating: 5,
    order: 1,
  },
  {
    _id: "testimonial-2",
    _type: "testimonial",
    name: "Siti Rahmawati",
    role: "Panitia Event Organizer",
    quote:
      "Order banner 50 meter cetak kilat selesai dalam beberapa jam saja. Kualitas bahan tebal dan tidak berbau menyengat.",
    rating: 5,
    order: 2,
  },
  {
    _id: "testimonial-3",
    _type: "testimonial",
    name: "Hendra Wijaya",
    role: "Marketing Manager",
    quote:
      "Sangat terbantu dengan layanan konsultasi desainnya. Tim Daycomp ramah dan fleksibel menyesuaikan budget promosi kantor.",
    rating: 5,
    order: 3,
  },
];

async function seed() {
  console.log("Starting Sanity dataset import/seed...");
  const transaction = client.transaction();
  for (const doc of documents) {
    transaction.createOrReplace(doc as any);
  }
  await transaction.commit();
  console.log("Successfully seeded Sanity dataset with company profile content!");
}

seed().catch((err) => {
  console.error("Error seeding Sanity dataset:", err);
});
