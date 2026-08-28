export const WHATSAPP_NUMBER = "628386806386"; // 0838-680-6386 -> intl format

export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_MSG =
  "Halo AzaleaForge! Saya tertarik konsultasi tentang pembuatan web app. Boleh diskusi lebih lanjut?";
