import { Printer, Layout, Package, Flag, BookOpen, Tag, Sparkles, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceData } from "@/sanity/queries";

interface ServicesProps {
  services: ServiceData[];
  whatsappNumber?: string;
}

const iconMap: Record<string, any> = {
  Printer,
  Layout,
  Package,
  Flag,
  BookOpen,
  Tag,
  Sparkles,
  Image: ImageIcon,
};

export function Services({ services, whatsappNumber = "6285700498174" }: ServicesProps) {
  return (
    <section id="services" className="py-20 sm:py-28 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Layanan Percetakan"
          title="Solusi Cetak Lengkap untuk Segala Kebutuhan"
          subtitle="Dari kebutuhan promosi harian hingga packaging eksklusif, kami siap memproduksi cetakan berkualitas tinggi dengan mesin presisi."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Printer;
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Halo Daycomp Percetakan, saya mau tanya estimasi harga untuk layanan: ${service.title}`)}`;

            return (
              <Reveal key={service._id} delayMs={idx * 80}>
                <Card className="h-full flex flex-col justify-between group">
                  <div>
                    {/* Icon Chip in Brand Colors (bg-brand-50 text-brand-600) */}
                    <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-brand-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-body leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md"
                  >
                    <span>Konsultasi Layanan Ini</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
