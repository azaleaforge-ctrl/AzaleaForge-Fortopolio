import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { SfxProvider } from "@/lib/sfx";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AzaleaForge — Bengkel Digital dari Bandung",
  description:
    "AzaleaForge: bengkel solo-dev yang menempa web app berkualitas. Lihat produk kami, atau pesan jasa pembuatan web app sesuai kebutuhan Anda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${sora.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-full bg-ink text-text">
        <SfxProvider>{children}</SfxProvider>
      </body>
    </html>
  );
}
