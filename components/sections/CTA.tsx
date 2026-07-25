import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface CTAProps {
  whatsappNumber?: string;
}

export function CTA({ whatsappNumber = "6285700498174" }: CTAProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo Daycomp Percetakan, saya ingin minta penawaran cetak khusus.")}`;

  return (
    <section className="py-16 sm:py-20 bg-brand-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-500/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-100 bg-brand-700/60 rounded-full mb-4">
            Siap Mulai Cetak?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Dapatkan Penawaran Harga Percetakan Terbaik Hari Ini
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-100 max-w-xl mx-auto leading-relaxed">
            Konsultasikan kebutuhan cetak Anda secara gratis. Tim kami siap membantu dari persiapan desain hingga pengiriman.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="white"
              size="lg"
            >
              <MessageSquare className="w-5 h-5 fill-current text-brand-600" />
              <span>Hubungi WhatsApp Sekarang</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
