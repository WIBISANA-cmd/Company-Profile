"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

interface WhatsAppFabProps {
  whatsappNumber?: string;
}

export function WhatsAppFab({ whatsappNumber = "6285700498174" }: WhatsAppFabProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo Daycomp Percetakan, saya berminat untuk konsultasi cetak.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Sekarang"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-full shadow-2xl hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      <MessageSquare className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline">Tanya via WhatsApp</span>
    </a>
  );
}
