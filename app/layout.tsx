import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daycomp Percetakan Kudus | Solusi Cetak Cepat & Berkualitas",
  description:
    "Percetakan terpercaya di Kudus melayani cetak banner, brosur, packaging, stiker, kartu nama, dan buku dengan hasil presisi dan harga terjangkau.",
  keywords: [
    "percetakan kudus",
    "cetak banner kudus",
    "digital printing kudus",
    "cetak kemasan kudus",
    "daycomp percetakan",
    "cetak brosur kudus",
    "stiker vinyl kudus",
  ],
  authors: [{ name: "Daycomp Percetakan" }],
  openGraph: {
    title: "Daycomp Percetakan Kudus | Solusi Cetak Cepat & Berkualitas",
    description:
      "Percetakan terpercaya di Kudus melayani cetak banner, brosur, packaging, stiker, kartu nama, dan buku.",
    url: "https://daycomppercetakan.com",
    siteName: "Daycomp Percetakan",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Daycomp Percetakan",
    image: "https://daycomppercetakan.com/assets/logo-daycomp.png",
    "@id": "https://daycomppercetakan.com",
    url: "https://daycomppercetakan.com",
    telephone: "0857-0049-8174",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Muria No. 12",
      addressLocality: "Kudus",
      addressRegion: "Jawa Tengah",
      postalCode: "59312",
      addressCountry: "ID",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} antialiased bg-surface text-body font-sans`}>
        {children}
      </body>
    </html>
  );
}
