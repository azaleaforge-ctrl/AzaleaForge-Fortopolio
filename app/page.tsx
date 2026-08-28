import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Tentang } from "@/components/Tentang";
import { Produk } from "@/components/Produk";
import { Jasa } from "@/components/Jasa";
import { Kontak } from "@/components/Kontak";
import { Footer } from "@/components/Footer";
import { Seam } from "@/components/Seam";

export default function Home() {
  return (
    <main id="top" className="relative pb-24 md:pb-0">
      <Header />
      <Hero />
      <div className="container-x">
        <Seam />
      </div>
      <Tentang />
      <div className="container-x">
        <Seam />
      </div>
      <Produk />
      <div className="container-x">
        <Seam />
      </div>
      <Jasa />
      <Kontak />
      <Footer />
    </main>
  );
}
