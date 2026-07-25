import Image from "next/image";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialData } from "@/sanity/queries";

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimoni"
          title="Apa Kata Pelanggan Kami?"
          subtitle="Kepercayaan pelanggan adalah kebanggaan kami. Berbagai bisnis dan panitia acara telah membuktikan kualitas cetak Daycomp."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <Reveal key={item._id} delayMs={idx * 100}>
              <Card className="h-full flex flex-col justify-between">
                <div>
                  {/* Rating Stars using text-star token */}
                  <div className="flex items-center gap-1 mb-4 text-star">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating ? "fill-star text-star" : "text-zinc-200 fill-zinc-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-body leading-relaxed italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-line">
                  <div className="relative w-10 h-10 rounded-full bg-brand-50 border border-brand-200 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.avatar || `/assets/avatar-${(idx % 3) + 1}.jpg`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">{item.name}</h4>
                    {item.role && (
                      <p className="text-xs text-muted">{item.role}</p>
                    )}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
