import IsometricMap from "./components/IsometricMap";
import IntroClouds from "./components/IntroClouds";

export default function Home() {
  return (
    // Layout Utama:
    // justify-start (HP): Biar konten mulai dari atas (Title dulu, baru map).
    // md:justify-center (Desktop): Biar semua konten pas di tengah-tengah layar.
    <main className="flex min-h-screen flex-col items-center justify-start md:justify-center bg-[#d6cbb8] overflow-hidden relative">
      
      <IntroClouds /> 

      {/* Background decorations (Tetap) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#a89f91_100%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-paper-texture opacity-40 mix-blend-multiply pointer-events-none"></div>

      {/* JUDUL */}
      {/* HP: top-12 (Turun dikit). Desktop: top-8 (Mepet atas biar peta lega) */}
      <div className="absolute top-12 md:top-8 z-20 text-center px-4 w-full pointer-events-none">
        <h1 className="text-3xl md:text-7xl font-serif font-bold text-[#292524] tracking-[0.1em] md:tracking-[0.2em] drop-shadow-sm uppercase leading-tight">
          Sumatera
        </h1>
        <div className="h-[2px] w-16 md:w-32 bg-[#292524] mx-auto my-2 md:my-4"></div>
        <p className="text-[#44403c] text-[10px] md:text-sm font-bold font-serif tracking-[0.2em] md:tracking-[0.4em] uppercase">
          Culture Fest • Est. 2024
        </p>
      </div>

      {/* WADAH KOMPONEN PETA */}
      {/* HP: mt-0 (Karena di IsometricMap udah ada mt-24). Desktop: mt-0 (Tengah). */}
      <div className="z-10 relative w-full flex justify-center">
         <IsometricMap />
      </div>
      
    </main>
  );
}