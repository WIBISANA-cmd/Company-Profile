"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { PortfolioData } from "@/sanity/queries";

interface LightboxProps {
  item: PortfolioData | null;
  onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (item) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="backdrop:bg-ink/80 backdrop:backdrop-blur-sm bg-transparent p-0 rounded-2xl max-w-3xl w-[90vw] overflow-hidden focus:outline-none shadow-2xl"
    >
      <div className="bg-surface relative border border-line rounded-2xl overflow-hidden">
        <button
          onClick={onClose}
          aria-label="Tutup pratinjau"
          className="absolute top-4 right-4 z-10 p-2 text-ink bg-surface/80 backdrop-blur rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-80 sm:h-96 bg-ink/5">
          <Image
            src={item.imageUrl || "/assets/banner.jpeg"}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="p-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-600 bg-brand-50 rounded-full mb-2">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-ink">{item.title}</h3>
          {item.description && (
            <p className="mt-2 text-sm text-body leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
