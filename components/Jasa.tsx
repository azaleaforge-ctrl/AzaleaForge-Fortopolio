"use client";

import { Reveal, SfxButton } from "@/lib/anim";
import { useSfx } from "@/lib/sfx";
import { waLink, waPackageMsg, WA_CONSULT_MSG } from "@/lib/whatsapp";
import { SectionHeading } from "./SectionHeading";

type Package = {
  name: string;
  price: string;
  note: string;
  benefits: string[];
  desc?: string;
  featured: boolean;
};

const PACKAGES: Package[] = [
  {
    name: "Starter",
    price: "Rp 250.000",
    note: "",
    benefits: [
      "Landing Page 1 Halaman",
      "Revisi 2x",
      "Desain Responsive HP",
      "Tombol Whatsapp langsung",
      "Cocok untuk Portfolio dan bangun usaha",
    ],
    featured: false,
  },
  {
    name: "Bisnis",
    price: "Rp 1.700.000",
    note: "",
    benefits: [
      "Website 5 Halaman (Lebih akan dikenakan biaya 10rb per fitur)",
      "CMS mudah di edit sendiri",
      "SEO dasar/basic",
      "Desain Premium",
      "Support 1 Bulan",
      "Gratis SSL",
    ],
    featured: true,
  },
  {
    name: "Katalog Pro",
    price: "Rp 3.400.000",
    note: "",
    benefits: [
      "Katalog Produk Unlimited",
      "Order Langsung Ke Whatsapp",
      "Tanpa Payment Gateway",
      "Tanpa simpan Uang di web jadi aman",
      "Link Checkout WA otomatis",
      "QR katalog",
      "Cocok untuk jualan aman",
    ],
    featured: false,
  },
];

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-azalea/15 ring-1 ring-azalea/20">
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6L4.8 8.3L9.5 3.5"
          stroke="#ff5d8f"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function BenefitsList({ benefits }: { benefits: string[] }) {
  return (
    <ul className="flex flex-1 flex-col gap-2.5">
      {benefits.map((b) => (
        <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
          <CheckIcon />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Jasa() {
  const sfx = useSfx();
  return (
    <section id="jasa" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Jasa & Paket"
          title="Punya impian web app yang lancar di HP & laptop? Serahkan pada kami."
          intro="Pilih paket, atau konsultasikan kebutuhanmu."
        />

        {/* Desktop: 3 pricing plates with a featured card */}
        <div className="mt-14 hidden md:grid md:grid-cols-3 gap-6">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} y={44} className="h-full">
              <div
                onMouseEnter={() => sfx.play("hover")}
                className={`relative flex h-full flex-col rounded-3xl border bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-2 ${
                  p.featured
                    ? "border-azalea/50 shadow-[0_30px_70px_-30px_rgba(255,93,143,0.6)]"
                    : "border-line hover:border-azalea/40"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-azalea to-ember px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    Terpopuler
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-text">
                  {p.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient">
                    {p.price}
                  </span>
                  {p.note && (
                    <span className="text-xs text-muted">({p.note})</span>
                  )}
                </div>
                <div className="mt-6 flex flex-1 flex-col">
                  <BenefitsList benefits={p.benefits} />
                </div>
                <div className="mt-auto pt-7">
                  <SfxButton
                    href={waLink(waPackageMsg(p))}
                    variant={p.featured ? "primary" : "ghost"}
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pesan via WhatsApp
                  </SfxButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: stacked cards, price-forward hierarchy, full-width buttons */}
        <div className="mt-12 block space-y-6 md:hidden">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05} y={30} className="h-full">
              <div
                onMouseEnter={() => sfx.play("hover")}
                className={`relative flex flex-col rounded-3xl border p-6 transition-colors active:border-azalea/40 ${
                  p.featured
                    ? "border-azalea/50 bg-surface/60 shadow-[0_30px_70px_-30px_rgba(255,93,143,0.6)]"
                    : "border-line bg-surface/60"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-azalea to-ember px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                    Terpopuler
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-text">
                  {p.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-gradient">
                    {p.price}
                  </span>
                  {p.note && (
                    <span className="text-xs text-muted">({p.note})</span>
                  )}
                </div>
                <div className="mt-5 flex flex-1 flex-col">
                  <BenefitsList benefits={p.benefits} />
                </div>
                <div className="mt-6">
                  <SfxButton
                    href={waLink(waPackageMsg(p))}
                    variant={p.featured ? "primary" : "ghost"}
                    className="w-full py-4 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pesan via WhatsApp
                  </SfxButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-line bg-surface/40 px-6 py-10 text-center">
            <p className="max-w-xl text-lg text-muted">
              Tertarik? Konsultasi gratis, kami bantu rancang web impianmu.
            </p>
            <SfxButton
              href={waLink(WA_CONSULT_MSG)}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi Gratis
            </SfxButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
