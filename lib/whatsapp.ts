export interface WhatsAppMessageParams {
  name: string;
  phone?: string;
  service?: string;
  message: string;
  targetNumber?: string;
}

export function buildWhatsAppUrl({
  name,
  phone,
  service,
  message,
  targetNumber = "6285700498174",
}: WhatsAppMessageParams): string {
  const cleanNumber = targetNumber.replace(/[^0-9]/g, "");

  let text = `Halo *Daycomp Percetakan*,\n\nSaya ingin berkonsultasi mengenai cetak:\n`;
  text += `- *Nama*: ${name}\n`;
  if (phone) text += `- *No HP/WA*: ${phone}\n`;
  if (service) text += `- *Layanan*: ${service}\n`;
  text += `- *Pesan*: ${message}\n\n`;
  text += `Mohon info harga dan estimasi waktu pengerjaannya. Terima kasih!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}
