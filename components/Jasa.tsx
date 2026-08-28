"use client";

import { Reveal, SfxButton } from "@/lib/anim";
import { useSfx } from "@/lib/sfx";
import { waLink, waPackageMsg, WA_CONSULT_MSG } from "@/lib/whatsapp";
import { SectionHeading } from "./SectionHeading";

const PACKAGES = [
  {
    name: "Landing Page Only",
    price: "Rp 250.000",
    note: "",
    desc: "Satu halaman rapi untuk portfolio diri atau kepercayaan klien. Cocok untuk freelancer.",
    extra: "Bisa pakai Database / LocalStorage / IndexedDB sesuai kebutuhan.",
    featured: false,
  },
  {
    name: "Landing Page + Fitur",
    price: "Rp 450.000",
    note: "harga menyesuaikan",
    desc: "Landing page + 1–5 halaman/fitur utama sesuai kebutuhan. Cocok untuk UMKM, freelancer, creator, e-commerce.",
    extra: "Fitur >5 dikenakan tambahan Rp10.000/fitur.",
    featured: true,
  },
  {
    name: "Upgrade Server / Web App",
    price: "Rp 1.000.000",
    note: "",
    desc: "Database lebih luas, hosting lebih tenang. Cocok untuk trafik besar agar web bebas eror/bug.",
    extra: "",
    featured: false,
  },
];

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
        <div className="mt-14 hidden grid-cols-1 gap-6 md:grid-cols-3">
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
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {p.desc}
                </p>
                {p.extra && (
                  <p className="mt-3 rounded-xl border border-line bg-ink/40 px-3 py-2 text-xs text-muted">
                    {p.extra}
                  </p>
                )}
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
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.desc}
                </p>
                {p.extra && (
                  <p className="mt-3 rounded-xl border border-line bg-ink/40 px-3 py-2 text-xs text-muted">
                    {p.extra}
                  </p>
                )}
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
