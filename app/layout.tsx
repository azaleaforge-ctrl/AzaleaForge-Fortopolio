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

const SITE_URL = "https://azaleaforge-fortopolio.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AzaleaForge: Bengkel Digital dari Bandung",
    template: "%s · AzaleaForge",
  },
  description:
    "AzaleaForge: bengkel solo-dev yang menempa web app berkualitas. Lihat produk kami, atau pesan jasa pembuatan web app sesuai kebutuhan Anda.",
  applicationName: "AzaleaForge",
  authors: [{ name: "AzaleaForge" }],
  creator: "AzaleaForge",
  publisher: "AzaleaForge",
  keywords: [
    "web app",
    "bengkel digital",
    "Bandung",
    "jasa pembuatan web app",
    "solo developer",
    "AzaleaForge",
    "produk digital",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AzaleaForge",
    title: "AzaleaForge: Bengkel Digital dari Bandung",
    description:
      "Bengkel solo-dev dari Bandung yang menempa web app berkualitas, produk digital, & jasa pembuatan web app.",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AzaleaForge — Bengkel Digital dari Bandung",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AzaleaForge: Bengkel Digital dari Bandung",
    description:
      "Bengkel solo-dev dari Bandung yang menempa web app berkualitas, produk digital, & jasa pembuatan web app.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  verification: {
    google: "cGAZlTIU_lB5IIM5O9S4fVTuruVz5FkPH5_9t0VJZmc",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AzaleaForge",
  url: SITE_URL,
  description:
    "Bengkel solo-dev dari Bandung yang menempa web app berkualitas, produk digital, & jasa pembuatan web app.",
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressCountry: "ID",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SfxProvider>{children}</SfxProvider>
      </body>
    </html>
  );
}
