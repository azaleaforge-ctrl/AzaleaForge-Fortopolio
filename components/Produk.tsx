"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Reveal, SfxButton, useReveal, EASE } from "@/lib/anim";
import { useSfx } from "@/lib/sfx";
import { SectionHeading } from "./SectionHeading";

const PRODUCTS = [
  {
    name: "SiapinAja",
    desc: "Dashboard all-in-one untuk mempersiapkan berbagai kebutuhan harian dengan cepat dan rapi.",
    img: "/product-1.png",
    href: "https://siapin-a-ja.vercel.app/dashboard",
    cta: "Buka SiapinAja",
  },
  {
    name: "Kasir Offline",
    desc: "Aplikasi kasir offline yang ringan, siap di warung, bazar, atau toko tanpa perlu internet.",
    img: "/product-2.png",
    href: "https://kasir-bazar-offline-pi.vercel.app/",
    cta: "Buka Kasir Offline",
  },
  {
    name: "GSG ID",
    desc: "Gudang Serba Guna satu domain, dua lorong: UMKM untuk yang jualan & Karir untuk yang melamar. 30+ tools offline di browser (HPP, invoice, QR, katalog, CV ATS, cek gaji) tanpa iklan mengganggu.",
    img: "/product-3.png",
    href: "https://gsgid.vercel.app/",
    cta: "Buka GSG ID",
  },
];

function DesktopProductCard({
  p,
  i,
}: {
  p: (typeof PRODUCTS)[number];
  i: number;
}) {
  const reduce = useReducedMotion();
  const sfx = useSfx();
  const img = useReveal<HTMLDivElement>();
  const reverse = i % 2 === 1;
  return (
    <Reveal key={p.name} y={40}>
      <article
        onMouseEnter={() => sfx.play("hover")}
        className="group grid grid-cols-1 items-center gap-8 rounded-3xl border border-line bg-surface/50 p-6 transition-all duration-300 hover:border-azalea/40 hover:shadow-[0_30px_60px_-30px_rgba(255,93,143,0.5)] md:grid-cols-2 md:gap-10 md:p-10"
      >
        <motion.div
          ref={img.setRef}
          initial={reduce ? false : { opacity: 0, x: reverse ? 48 : -48 }}
          animate={
            img.shown || reduce
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: reverse ? 48 : -48 }
          }
          transition={{ duration: 0.7, ease: EASE }}
          className={`relative aspect-[2.12/1] overflow-hidden rounded-2xl border border-line bg-ink/40 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <Image
            src={p.img}
            alt={`Tangkapan layar ${p.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </motion.div>

        <div className={reverse ? "md:order-1" : "md:order-2"}>
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-azalea">
            Produk {i + 1}
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-text md:text-4xl">
            {p.name}
          </h3>
          <p className="mt-4 max-w-md text-muted md:text-lg">{p.desc}</p>
          <div className="mt-7">
            <SfxButton
              href={p.href}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.cta}
            </SfxButton>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Produk() {
  const sfx = useSfx();
  return (
      <section id="produk" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Produk"
          title="Yang sudah ditempa dengan sepenuh hati."
        />

        {/* Desktop: alternating slide-in cards */}
        <div className="mt-14 hidden space-y-10 md:block">
          {PRODUCTS.map((p, i) => (
            <DesktopProductCard key={p.name} p={p} i={i} />
          ))}
        </div>

        {/* Mobile: full-width stacked cards, different aspect, bottom CTA, scroll-reveal */}
        <div className="mt-12 block space-y-6 md:hidden">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} y={30}>
              <article
                onMouseEnter={() => sfx.play("hover")}
                className="overflow-hidden rounded-3xl border border-line bg-surface/50 transition-colors active:border-azalea/40"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line bg-ink/40">
                  <Image
                    src={p.img}
                    alt={`Tangkapan layar ${p.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-azalea">
                    Produk {i + 1}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-text">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-muted">{p.desc}</p>
                  <div className="mt-6">
                    <SfxButton
                      href={p.href}
                      variant="primary"
                      className="w-full py-4 text-base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.cta}
                    </SfxButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
