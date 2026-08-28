"use client";

import { Reveal } from "@/lib/anim";
import { useSfx } from "@/lib/sfx";
import { SectionHeading } from "./SectionHeading";
import { ForgeMark } from "./ForgeMark";

const MILESTONES = [
  {
    n: "01",
    t: "Coretan Pertama",
    d: "Semua bermula dari satu ide dan layar kosong.",
  },
  {
    n: "02",
    t: "Kegagalan yang Mengajar",
    d: "Banyak yang gagal. Kami jadikan pelajaran, bukan akhir.",
  },
  {
    n: "03",
    t: "Produk yang Tempa",
    d: "SiapinAja & Kasir Offline lahir dari proses panjang.",
  },
  {
    n: "04",
    t: "Terus Menempa",
    d: "Hingga kini kami masih berjuang, menghasilkan karya bermakna.",
  },
];

export function Tentang() {
  const sfx = useSfx();
  return (
    <section id="tentang" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Cerita Kami"
          title="Dari bengkel kecil di perumahan, menjadi gedung penuh tempaan."
          intro="AzaleaForge dirintis oleh seorang mahasiswa solo-dev. Masih tahap berjuang di pasar — hanya bengkel kecil di perumahan yang lambat laun menempa diri jadi gedung kokoh. Setiap pukulan palu penuh perjuangan dan kegagalan, itulah yang membentuk kami."
        />

        {/* Desktop: vertical molten timeline */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute bottom-2 left-7 top-2 w-px bg-gradient-to-b from-azalea via-ember to-transparent" />
          <ul className="space-y-6">
            {MILESTONES.map((m, i) => (
              <Reveal as="li" key={m.n} delay={i * 0.12} className="relative pl-20">
                <span className="absolute left-0 top-1 grid h-14 w-14 place-items-center rounded-full border border-line bg-surface">
                  <ForgeMark className="h-5 w-5 text-azalea" />
                </span>
                <div
                  onMouseEnter={() => sfx.play("hover")}
                  className="group rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-azalea/40 hover:bg-surface-2"
                >
                  <div className="font-display text-sm font-bold tracking-widest text-gradient">
                    {m.n}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-text">
                    {m.t}
                  </h3>
                  <p className="mt-2 text-muted">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Mobile: horizontal swipe / scroll-snap milestone cards */}
        <div className="block md:hidden">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
            {MILESTONES.map((m, i) => (
              <Reveal
                as="div"
                key={m.n}
                delay={i * 0.05}
                className="min-w-[78%] snap-center"
              >
                <div
                  onMouseEnter={() => sfx.play("hover")}
                  className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface">
                    <ForgeMark className="h-5 w-5 text-azalea" />
                  </span>
                  <div className="mt-4 font-display text-sm font-bold tracking-widest text-gradient">
                    {m.n}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold text-text">
                    {m.t}
                  </h3>
                  <p className="mt-2 text-muted">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-3 px-1 text-xs text-muted">
            Geser ke samping untuk milestone lainnya →
          </p>
        </div>
      </div>
    </section>
  );
}
