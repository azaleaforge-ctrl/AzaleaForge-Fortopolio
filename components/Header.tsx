"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SoundToggle, SfxButton } from "@/lib/anim";
import { waLink, WA_CONSULT_MSG } from "@/lib/whatsapp";
import { ForgeMark } from "./ForgeMark";

const NAV = [
  { label: "Tentang", href: "#tentang" },
  { label: "Produk", href: "#produk" },
  { label: "Jasa", href: "#jasa" },
  { label: "Kontak", href: "#kontak" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open (interaction-driven, not viewport).
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open
          ? "border-b border-line bg-ink/98 backdrop-blur-xl"
          : scrolled
          ? "border-b border-line bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
          <a href="#top" className="group flex flex-shrink-0 items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="AzaleaForge"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md transition-transform duration-300 group-hover:rotate-[-6deg]"
            />
          <span className="font-display text-lg font-bold tracking-tight text-text">
            Azalea<span className="text-gradient">Forge</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-sm font-medium text-muted transition-colors hover:text-text"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-azalea to-ember transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-2.5">
          <SoundToggle />
          <SfxButton
            href={waLink(WA_CONSULT_MSG)}
            className="hidden sm:inline-flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </SfxButton>
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-text transition-colors hover:text-azalea md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile: full-screen thumb-friendly overlay (distinct from desktop top nav) */}
      {open && (
        <motion.div
          className="fixed inset-0 top-16 z-40 flex flex-col bg-ink/98 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <nav className="flex flex-1 flex-col justify-center gap-3 px-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-line bg-surface/40 px-5 py-4 font-display text-xl font-semibold text-text transition-colors active:border-azalea/40 active:bg-surface-2"
              >
                {n.label}
                <ForgeMark className="h-5 w-5 text-azalea" />
              </a>
            ))}
          </nav>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </motion.div>
      )}
    </header>
  );
}
