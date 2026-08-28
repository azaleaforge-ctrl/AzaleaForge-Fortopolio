"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SfxButton } from "@/lib/anim";
import { waLink, WA_DEFAULT_MSG } from "@/lib/whatsapp";
import { ForgeMark } from "./ForgeMark";
import { EmberField } from "./EmberField";
import { ForgeCore } from "./ForgeCore";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ============ MOBILE: centered, stacked, thumb-first ============ */}
      <section className="relative block min-h-[100svh] overflow-hidden md:hidden">
        <img
          src="/bg-forge.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        {/* Lighter ember field for mobile performance */}
        <EmberField count={6} />

        <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
          {/* Simplified ambient forge core (no heavy animation) */}
          <div className="relative mb-7 grid h-40 w-40 place-items-center">
            <div className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,93,143,0.4),rgba(255,138,61,0.15)_55%,transparent_72%)] blur-xl" />
            <div className="absolute h-32 w-32 rounded-full border border-line" />
            <ForgeMark className="relative h-12 w-12 text-azalea" />
          </div>

          <div className="flex items-center gap-3">
            <ForgeMark className="h-5 w-5 text-azalea" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
              Bengkel Digital · Bandung
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[0.95] tracking-tight text-text sm:text-5xl">
            <span className="shimmer-text">AzaleaForge</span>
          </h1>

          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
            Bukan perusahaan besar. Kami bengkel solo-dev yang lahir dari tempaan
            penuh perjuangan, di mana kegagalan adalah guru, dan hasil yang matang
            adalah tempaan yang sempurna.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3">
            <SfxButton
              href="#produk"
              variant="primary"
              className="w-full py-4 text-base"
            >
              Lihat Produk
            </SfxButton>
            <SfxButton
              href={waLink(WA_DEFAULT_MSG)}
              variant="ghost"
              className="w-full py-4 text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              Konsultasi Gratis
            </SfxButton>
          </div>
        </div>
      </section>

      {/* ============ DESKTOP: asymmetric forge composition ============ */}
      <section className="relative hidden min-h-screen overflow-hidden md:block">
        <img
          src="/bg-forge.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />

        <EmberField />

        <div className="container-x relative grid min-h-screen grid-cols-1 items-center gap-12 pb-24 pt-28 md:grid-cols-[1.1fr_0.9fr]">
          <Reveal y={36} className="max-w-2xl">
            <div className="flex items-center gap-3">
              <ForgeMark className="h-5 w-5 text-azalea" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                Bengkel Digital · Bandung, Jawa Barat
              </span>
            </div>

            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight text-text md:text-8xl">
              <span className="shimmer-text">AzaleaForge</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Bukan perusahaan besar. Kami bengkel solo-dev yang lahir dari tempaan
              penuh perjuangan, di mana kegagalan adalah guru, dan hasil yang matang
              adalah tempaan yang sempurna.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <SfxButton href="#produk" variant="primary">
                Lihat Produk
              </SfxButton>
              <SfxButton
                href={waLink(WA_DEFAULT_MSG)}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konsultasi Gratis
              </SfxButton>
            </div>
          </Reveal>

          <div className="relative hidden justify-center md:flex">
            <ForgeCore />
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted">
          <span className="text-[10px] uppercase tracking-[0.3em]">Gulir</span>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-gradient-to-b from-azalea to-ember"
              animate={reduce ? undefined : { y: [-12, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </section>
    </>
  );
}
