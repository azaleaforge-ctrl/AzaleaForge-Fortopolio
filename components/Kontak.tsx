"use client";

import { Reveal, SfxButton } from "@/lib/anim";
import { waLink, WA_DEFAULT_MSG } from "@/lib/whatsapp";
import { ForgeMark } from "./ForgeMark";

export function Kontak() {
  return (
    <section id="kontak" className="scroll-mt-24">
      {/* Desktop: contained rounded CTA panel */}
      <div className="hidden py-24 md:block md:py-32">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/50 px-12 py-24 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,93,143,0.18),transparent_70%)]" />
            <div className="relative">
              <div className="mx-auto flex w-fit items-center gap-3">
                <ForgeMark className="h-6 w-6 text-azalea" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                  Kontak
                </span>
              </div>
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-6xl font-bold leading-tight tracking-tight text-text">
                Tertarik? Konsultasikan{" "}
                <span className="text-gradient">web impianmu</span> pada kami.
              </h2>
              <p className="mx-auto mt-5 flex items-center justify-center gap-2 text-muted">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Bandung, Jawa Barat, Indonesia.
              </p>
              <div className="mt-9 flex justify-center">
                <SfxButton
                  href={waLink(WA_DEFAULT_MSG)}
                  variant="primary"
                  className="px-8 py-4 text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mulai Konsultasi
                </SfxButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Mobile: full-bleed, edge-to-edge, larger button */}
      <div className="block py-16 md:hidden">
        <Reveal className="relative overflow-hidden border-y border-line bg-surface/50 px-6 py-14 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(255,93,143,0.2),transparent_70%)]" />
          <div className="relative">
            <div className="mx-auto flex w-fit items-center gap-3">
              <ForgeMark className="h-6 w-6 text-azalea" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                Kontak
              </span>
            </div>
            <h2 className="mx-auto mt-5 max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-text">
              Tertarik? Konsultasikan{" "}
              <span className="text-gradient">web impianmu</span> pada kami.
            </h2>
            <p className="mx-auto mt-4 flex items-center justify-center gap-2 text-sm text-muted">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Bandung, Jawa Barat, Indonesia.
            </p>
            <div className="mt-7">
              <SfxButton
                href={waLink(WA_DEFAULT_MSG)}
                variant="primary"
                className="w-full py-4 text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mulai Konsultasi
              </SfxButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
