"use client";

import { useState, FormEvent } from "react";
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, Map } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SiteSettingsData, ServiceData } from "@/sanity/queries";

interface ContactProps {
  siteSettings: SiteSettingsData;
  services: ServiceData[];
}

export function Contact({ siteSettings, services }: ContactProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const waUrl = buildWhatsAppUrl({
      name,
      phone,
      service: selectedService,
      message,
      targetNumber: siteSettings.whatsappNumber || "6285700498174",
    });

    window.open(waUrl, "_blank");
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hubungi Kami"
          title="Konsultasi & Pemesanan Percetakan"
          subtitle="Isi formulir di bawah ini untuk terhubung langsung via WhatsApp atau kunjungi workshop percetakan kami di Kudus."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Contact Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <Card className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-ink border-b border-line pb-4">
                  Informasi Kontak
                </h3>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Alamat Workshop</h4>
                      <p className="text-sm font-medium text-ink mt-0.5">{siteSettings.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Telepon / WhatsApp</h4>
                      <p className="text-sm font-medium text-ink mt-0.5">{siteSettings.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Email</h4>
                      <p className="text-sm font-medium text-ink mt-0.5">{siteSettings.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Jam Operasional</h4>
                      <p className="text-sm font-medium text-ink mt-0.5">{siteSettings.businessHours}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            {/* Lazy Map Component */}
            <Reveal delayMs={100}>
              <Card className="overflow-hidden p-0">
                {!showMap ? (
                  <div className="p-8 text-center bg-brand-50/50 flex flex-col items-center gap-3">
                    <Map className="w-8 h-8 text-brand-600" />
                    <p className="text-sm font-semibold text-ink">Peta Lokasi Workshop Kudus</p>
                    <button
                      onClick={() => setShowMap(true)}
                      className="px-4 py-2 text-xs font-semibold text-brand-600 bg-surface border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                    >
                      Buka Peta Google Maps
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-64">
                    <iframe
                      title="Google Maps Daycomp Percetakan Kudus"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.706432109!2d110.840!3d-6.808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMjguOCJTIDExMMKwNTAnMjQuMCJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </Card>
            </Reveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delayMs={150}>
              <Card>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold text-ink border-b border-line pb-4">
                    Formulir Konsultasi Cetak
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="form-name" className="block text-xs font-semibold text-ink mb-1.5">
                        Nama Lengkap <span className="text-brand-600">*</span>
                      </label>
                      <input
                        id="form-name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-4 py-2.5 text-sm bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-semibold text-ink mb-1.5">
                        Nomor HP / WhatsApp
                      </label>
                      <input
                        id="form-phone"
                        name="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Contoh: 081234567890"
                        className="w-full px-4 py-2.5 text-sm bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-service" className="block text-xs font-semibold text-ink mb-1.5">
                      Pilihan Layanan Cetak
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all"
                    >
                      <option value="">-- Pilih Layanan Percetakan --</option>
                      {services.map((svc) => (
                        <option key={svc._id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form-message" className="block text-xs font-semibold text-ink mb-1.5">
                      Detail Pesan / Bahan & Ukuran <span className="text-brand-600">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Jelaskan kebutuhan cetak Anda, misalnya: Ukuran banner 3x1m bahan Flexi 340gr sejumlah 2 pcs..."
                      className="w-full px-4 py-2.5 text-sm bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all resize-y"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan via WhatsApp</span>
                  </Button>
                </form>
              </Card>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
