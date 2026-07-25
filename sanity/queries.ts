import { client } from "./client";

export interface SiteSettingsData {
  companyName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutBody: string;
  aboutHighlights: string[];
  foundedYear: number;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  businessHours: string;
  seoDescription: string;
  logo?: any;
  heroImage?: any;
  aboutImage?: any;
}

export interface ServiceData {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface PortfolioData {
  _id: string;
  title: string;
  category: string;
  description?: string;
  image?: any;
  imageUrl?: string;
}

export interface TestimonialData {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  rating: number;
  avatar?: any;
}

export interface StatData {
  _id: string;
  label: string;
  value: number;
  suffix?: string;
  order?: number;
}

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc)`;
export const PORTFOLIO_QUERY = `*[_type == "portfolioItem"] | order(order asc)`;
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc)`;
export const STATS_QUERY = `*[_type == "stat"] | order(order asc)`;

// Default fallback data extracted & cleaned from legacy index.html
export const defaultSiteSettings: SiteSettingsData = {
  companyName: "Daycomp Percetakan",
  tagline: "Solusi Cetak Cepat, Berkualitas & Terpercaya di Kudus",
  heroTitle: "Solusi Cetak Cepat & Berkualitas untuk Bisnis Anda",
  heroSubtitle:
    "Kami menyediakan layanan percetakan profesional mulai dari banner, brosur, stiker, hingga packaging dengan hasil warna tajam dan pengerjaan tepat waktu.",
  aboutTitle: "Tentang Daycomp Percetakan",
  aboutBody:
    "Berdiri sejak tahun 2017 di Kudus, Daycomp Percetakan berdedikasi memberikan hasil cetak kualitas prima untuk kebutuhan promosi, bisnis, hingga branding personal. Didukung peralatan digital printing dan offset modern serta tenaga ahli berpengalaman, kami siap membantu wujudkan desain terbaik Anda.",
  aboutHighlights: [
    "Mesin Cetak Offset & Digital Berteknologi Tinggi",
    "Pilihan Bahan Komplit & Hasil Warna Presisi",
    "Layanan Konsultasi & Estimasi Cepat",
    "Pengerjaan Tepat Waktu dengan Harga Terjangkau",
  ],
  foundedYear: 2017,
  phone: "0857-0049-8174",
  whatsappNumber: "6285700498174",
  email: "info@daycomppercetakan.com",
  address: "Jl. Muria No. 12, Kudus, Jawa Tengah",
  businessHours: "Senin - Sabtu: 08:00 - 17:00 WIB",
  seoDescription:
    "Percetakan terpercaya di Kudus melayani cetak banner, brosur, kartu nama, packaging, stiker, dan buku berkualitas tinggi dengan harga terjangkau.",
};

export const defaultServices: ServiceData[] = [
  {
    _id: "s1",
    title: "Cetak Digital & Offset",
    description:
      "Layanan cetak dokumen, brosur, flyer, poster, dan katalog dengan resolusi tinggi dan warna yang tajam.",
    icon: "Printer",
    order: 1,
  },
  {
    _id: "s2",
    title: "Desain Grafis Profesional",
    description:
      "Bantuan penataan layout, branding, dan desain kreatif dari desainer berpengalaman sebelum proses cetak.",
    icon: "Layout",
    order: 2,
  },
  {
    _id: "s3",
    title: "Cetak Kemasan (Packaging)",
    description:
      "Pembuatan box produk, standing pouch, sleeve, dan kemasan kustom untuk meningkatkan daya saing brand UMKM.",
    icon: "Package",
    order: 3,
  },
  {
    _id: "s4",
    title: "Spanduk & Signage (Large Format)",
    description:
      "Banner outdoor, X-banner, Roll-up banner, baliho, dan neon box dengan bahan tahan cuaca.",
    icon: "Flag",
    order: 4,
  },
  {
    _id: "s5",
    title: "Cetak Buku & Majalah",
    description:
      "Penjilidan softcover, hardcover, spiral, cetak majalah, buku tahunan, hingga agenda kustom.",
    icon: "BookOpen",
    order: 5,
  },
  {
    _id: "s6",
    title: "Merchandise & Barang Promosi",
    description:
      "Stiker label vinyl, mug, gelang, pin, totebag, dan souvenir promosi perusahaan.",
    icon: "Tag",
    order: 6,
  },
];

export const defaultStats: StatData[] = [
  { _id: "st1", label: "Project Selesai", value: 1590, suffix: "+", order: 1 },
  { _id: "st2", label: "Klien Puas", value: 98, suffix: "%", order: 2 },
  { _id: "st3", label: "Pengalaman Kerja", value: 7, suffix: " Tahun", order: 3 },
  { _id: "st4", label: "Dukungan Mesin Modern", value: 12, suffix: "+", order: 4 },
];

export const defaultPortfolio: PortfolioData[] = [
  {
    _id: "p1",
    title: "Banner & Spanduk Outdoor",
    category: "Signage & Banner",
    description: "Cetak Flexi 340gr warna tajam untuk promosi acara di Kudus.",
    imageUrl: "/assets/banner.jpeg",
  },
  {
    _id: "p2",
    title: "Kartu Nama Matte Lamination",
    category: "Digital Printing",
    description: "Kartu nama eksklusif dengan pilihan finishing laminasi doff.",
    imageUrl: "/assets/kartu-nama.png",
  },
  {
    _id: "p3",
    title: "Brochure & Leaflet Promosi",
    category: "Offset",
    description: "Brosur lipat 3 bahan Art Paper 150gr untuk katalog produk.",
    imageUrl: "/assets/brochure.jpg",
  },
  {
    _id: "p4",
    title: "Packaging Box Makanan UMKM",
    category: "Packaging",
    description: "Kotak kemasan Ivory dengan food-grade coating.",
    imageUrl: "/assets/packaging.jpg",
  },
  {
    _id: "p5",
    title: "Stiker Label Produk Roll",
    category: "Merchandise",
    description: "Stiker Vinyl tahan air dengan potong lis Kiss-Cut.",
    imageUrl: "/assets/stiker.jpg",
  },
  {
    _id: "p6",
    title: "Buku Panduan & Agenda Kustom",
    category: "Offset",
    description: "Penjilidan hardcover eksklusif dengan pita pembatas.",
    imageUrl: "/assets/buku.jpg",
  },
];

export const defaultTestimonials: TestimonialData[] = [
  {
    _id: "t1",
    name: "Budi Santoso",
    role: "Pemilik UMKM Kuliner Kudus",
    quote:
      "Hasil cetak kemasan makanan di Daycomp sangat memuaskan. Warnanya persis seperti file desain dan prosesnya tepat waktu!",
    rating: 5,
    avatar: "/assets/avatar-1.jpg",
  },
  {
    _id: "t2",
    name: "Siti Rahmawati",
    role: "Panitia Event Organizer",
    quote:
      "Order banner 50 meter cetak kilat selesai dalam beberapa jam saja. Kualitas bahan tebal dan tidak berbau menyengat.",
    rating: 5,
    avatar: "/assets/avatar-2.jpg",
  },
  {
    _id: "t3",
    name: "Hendra Wijaya",
    role: "Marketing Manager",
    quote:
      "Sangat terbantu dengan layanan konsultasi desainnya. Tim Daycomp ramah dan fleksibel menyesuaikan budget promosi kantor.",
    rating: 5,
    avatar: "/assets/avatar-3.jpg",
  },
];
