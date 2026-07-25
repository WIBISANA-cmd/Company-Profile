import Image from "next/image";
import { Printer, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteSettingsData } from "@/sanity/queries";

interface FooterProps {
  siteSettings?: SiteSettingsData;
}

export function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const founded = siteSettings?.foundedYear || 2017;
  const companyName = siteSettings?.companyName || "Daycomp Percetakan";

  return (
    <footer className="bg-ink text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white p-1 rounded-xl">
                <Image
                  src="/assets/logo-daycomp.png"
                  alt={`${companyName} Logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Daycomp <span className="text-brand-500">Percetakan</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Penyedia jasa cetak offset, digital printing, packaging, dan signage berkualitas tinggi di Kudus. Cepat, presisi, dan terpercaya sejak {founded}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Navigasi Utama</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="#home" className="hover:text-brand-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-400 transition-colors">
                  Layanan Percetakan
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-brand-400 transition-colors">
                  Portfolio Karya
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-brand-400 transition-colors">
                  Testimoni Pelanggan
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-400 transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Layanan Populer</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="#services" className="hover:text-brand-400 transition-colors">
                  Digital & Offset Printing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-400 transition-colors">
                  Cetak Kemasan (Packaging)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-400 transition-colors">
                  Spanduk, Banner & Signage
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-400 transition-colors">
                  Stiker Vinyl & Label Produk
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-400 transition-colors">
                  Cetak Buku, Catalog & Agenda
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Kontak & Workshop</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <span>{siteSettings?.address || "Jl. Muria No. 12, Kudus, Jawa Tengah"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span>{siteSettings?.phone || "0857-0049-8174"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span>{siteSettings?.email || "info@daycomppercetakan.com"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span>{siteSettings?.businessHours || "Senin - Sabtu: 08:00 - 17:00 WIB"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {currentYear} {companyName}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p>Dibuat dengan Next.js & Sanity CMS</p>
        </div>
      </div>
    </footer>
  );
}
