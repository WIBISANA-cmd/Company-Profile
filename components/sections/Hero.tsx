import Image from "next/image";
import { MessageSquare, ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SiteSettingsData } from "@/sanity/queries";

interface HeroProps {
  siteSettings: SiteSettingsData;
}

export function Hero({ siteSettings }: HeroProps) {
  const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent("Halo Daycomp Percetakan, saya berminat konsultasi cetak.")}`;

  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-ink text-white overflow-hidden">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-950/60 via-ink to-ink pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs sm:text-sm font-semibold tracking-wide">
                <SparkleIcon />
                <span>Percetakan Cepat & Terpercaya Kudus</span>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                {siteSettings.heroTitle}
              </h1>
            </Reveal>

            <Reveal delayMs={200}>
              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {siteSettings.heroSubtitle}
              </p>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Konsultasi via WhatsApp</span>
                </Button>
                <Button
                  href="#services"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto !text-white !border-zinc-700 hover:!border-brand-500 hover:!bg-brand-600/10"
                >
                  <span>Lihat Layanan Cetak</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Reveal>

            {/* Feature Badges */}
            <Reveal delayMs={400}>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">Garansi Warna</h4>
                    <p className="text-[11px] text-zinc-400 hidden sm:block">Hasil cetak presisi</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">Proses Cepat</h4>
                    <p className="text-[11px] text-zinc-400 hidden sm:block">Bisa cetak kilat</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">Bahan Premium</h4>
                    <p className="text-[11px] text-zinc-400 hidden sm:block">Standar industri</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delayMs={250} className="w-full max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 p-3 backdrop-blur-md shadow-2xl animate-subtle-float">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src="/assets/dayHero.jpg"
                    alt="Daycomp Percetakan Workshop"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-ink/70 backdrop-blur-md border border-white/10">
                    <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Workshop Utama</p>
                    <p className="text-sm font-bold text-white mt-0.5">Kudus, Jawa Tengah</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

function SparkleIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}
