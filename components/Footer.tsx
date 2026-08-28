import Image from "next/image";
import { waLink, WA_DEFAULT_MSG } from "@/lib/whatsapp";
import { ForgeMark } from "./ForgeMark";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      {/* Desktop: row layout */}
      <div className="container-x hidden items-center justify-between md:flex">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="AzaleaForge" width={36} height={36} className="h-9 w-9 rounded-md" />
          <div>
            <div className="font-display text-lg font-bold text-text">
              Azalea<span className="text-gradient">Forge</span>
            </div>
            <div className="text-xs text-muted">ditempa dengan sepenuh hati.</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-sm text-muted">
          <span>Bandung, Jawa Barat, Indonesia</span>
          <a
            href={waLink(WA_DEFAULT_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-azalea transition-colors hover:text-ember"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile: stacked, centered */}
      <div className="container-x flex flex-col items-center gap-6 text-center md:hidden">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo.png" alt="AzaleaForge" width={40} height={40} className="h-10 w-10 rounded-md" />
          <div>
            <div className="font-display text-lg font-bold text-text">
              Azalea<span className="text-gradient">Forge</span>
            </div>
            <div className="text-xs text-muted">ditempa dengan sepenuh hati.</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-sm text-muted">
          <span>Bandung, Jawa Barat, Indonesia</span>
          <a
            href={waLink(WA_DEFAULT_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-azalea transition-colors hover:text-ember"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      <div className="container-x mt-8 text-center text-xs text-muted">
        © 2026 AzaleaForge
      </div>
    </footer>
  );
}
