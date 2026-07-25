"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  phone?: string;
  whatsappNumber?: string;
}

export function Navbar({ phone = "0857-0049-8174", whatsappNumber = "6285700498174" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Beranda", href: "#home", id: "home" },
    { name: "Layanan", href: "#services", id: "services" },
    { name: "Tentang", href: "#about", id: "about" },
    { name: "Portfolio", href: "#portfolio", id: "portfolio" },
    { name: "Testimoni", href: "#testimonials", id: "testimonials" },
    { name: "Kontak", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section highlight observer
      const sections = navLinks.map((link) => document.querySelector(link.href));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section, idx) => {
        if (section) {
          const top = (section as HTMLElement).offsetTop;
          const height = (section as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navLinks[idx].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/90 backdrop-blur-md shadow-sm border-b border-line py-3"
          : "bg-surface/70 backdrop-blur-sm py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/assets/logo-daycomp.png"
                alt="Daycomp Percetakan Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-ink tracking-tight flex items-center gap-1">
                Daycomp <span className="text-brand-600 font-extrabold">Percetakan</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
                Kudus, Jawa Tengah
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive ? "text-brand-600 font-semibold" : "text-body hover:text-brand-600"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-brand-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 text-body hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-surface border-b border-line shadow-xl p-6 transition-all duration-300 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                  activeSection === link.id
                    ? "bg-brand-50 text-brand-600 font-semibold"
                    : "text-body hover:bg-surface-2 hover:text-brand-600"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-line">
              <Button
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasi WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
