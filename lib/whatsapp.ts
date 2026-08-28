export const WHATSAPP_NUMBER = "628386806386"; // 0838-680-6386 -> intl format

export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Consultation CTA — professional yet casual. */
export const WA_CONSULT_MSG =
  "Halo AzaleaForge! Saya tertarik untuk konsultasi gratis mengenai ide web app saya. Boleh kita diskusikan kebutuhannya supaya solusinya tepat sasaran? Terima kasih.";

/** Package-specific CTA — names the chosen package + price, opens discussion. */
export function waPackageMsg(p: { name: string; price: string; note?: string }): string {
  const priceLabel = p.note ? `${p.price} (${p.note})` : p.price;
  return `Halo AzaleaForge! Saya tertarik dengan paket ${p.name} (${priceLabel}). Boleh saya minta penjelasan lebih lanjut dan kita diskusikan kebutuhan saya? Terima kasih.`;
}
