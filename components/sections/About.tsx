import Image from "next/image";
import { CheckCircle2, Award, Clock, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteSettingsData } from "@/sanity/queries";

interface AboutProps {
  siteSettings: SiteSettingsData;
}

export function About({ siteSettings }: AboutProps) {
  const highlights = siteSettings.aboutHighlights || [
    "Mesin Cetak Offset & Digital Berteknologi Tinggi",
    "Pilihan Bahan Komplit & Hasil Warna Presisi",
    "Layanan Konsultasi & Estimasi Cepat",
    "Pengerjaan Tepat Waktu dengan Harga Terjangkau",
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                {/* Background Offset Decor */}
                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-brand-50 border border-brand-200 -z-10" />

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line shadow-xl bg-surface-2">
                  <Image
                    src="/assets/teams.jpg"
                    alt="Tim Daycomp Percetakan"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Badge Overlay */}
                <div className="absolute -bottom-6 left-6 bg-surface p-4 rounded-xl shadow-lg border border-line flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase">Pengalaman</p>
                    <p className="text-sm font-bold text-ink">Sejak {siteSettings.foundedYear || 2017}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Text Content Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <SectionHeading
              badge="Tentang Kami"
              title={siteSettings.aboutTitle || "Mitra Percetakan Terpercaya untuk Bisnis Anda"}
              align="left"
            />

            <Reveal delayMs={100}>
              <p className="text-base text-body leading-relaxed -mt-6">
                {siteSettings.aboutBody}
              </p>
            </Reveal>

            {/* Highlights List */}
            <Reveal delayMs={200}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-surface-2 border border-line/60">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}
