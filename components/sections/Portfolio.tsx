"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { PortfolioData } from "@/sanity/queries";

interface PortfolioProps {
  portfolio: PortfolioData[];
}

export function Portfolio({ portfolio }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<PortfolioData | null>(null);

  const categories = [
    "Semua",
    "Signage & Banner",
    "Digital Printing",
    "Offset",
    "Packaging",
    "Merchandise",
  ];

  const filteredItems =
    activeCategory === "Semua"
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hasil Karya"
          title="Portfolio Hasil Cetakan Terbaru"
          subtitle="Beberapa contoh hasil cetak terbaik kami untuk berbagai kebutuhan bisnis, promosi, dan kemasan UMKM."
        />

        {/* Category Filters */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                    isActive
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                      : "bg-surface text-body hover:bg-brand-50 hover:text-brand-600 border border-line"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <Reveal key={item._id} delayMs={idx * 60}>
              <div
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer bg-surface rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                  <Image
                    src={item.imageUrl || "/assets/banner.jpeg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-surface text-brand-600 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold bg-surface/90 backdrop-blur text-brand-600 rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-ink group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 text-xs text-muted line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </section>
  );
}
