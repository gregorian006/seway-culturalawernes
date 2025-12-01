"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { regionsData } from '../../data/regionsData'; 
import IntroClouds from '../../components/IntroClouds'; 
import { useAudio } from '../../../context/AudioContext'; 

export default function CulturalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  
  const [isExiting, setIsExiting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const { setTrack } = useAudio(); 

  const data = regionsData.find((item) => item.id === slug);

  useEffect(() => {
    if (data && data.audio) {
        setTrack(data.audio);
    }
  }, [data, setTrack]);

  const handleBack = () => {
    setIsExiting(true); 
  };

  // Handle keyboard navigation untuk back button
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (selectedImage !== null) {
        setSelectedImage(null);
      } else {
        handleBack();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#d6cbb8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-[#292524] mb-4">Region Not Found</h1>
          <p className="text-[#78716c] mb-6">The cultural archive you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#292524] text-white font-bold uppercase tracking-widest hover:bg-[#44403c] transition-colors"
          >
            Return to Map
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#d6cbb8] relative overflow-x-hidden font-serif text-[#292524]">
      
      {/* --- TRANSISI AWAN --- */}
      {!isExiting && <IntroClouds mode="enter" title={data.name} subtitle="Opening Journal..." />}
      {isExiting && <IntroClouds mode="exit" onComplete={() => router.push('/')} />}

      {/* --- BACKGROUND TEXTURE --- */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#a89f91_100%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-paper-texture opacity-30 mix-blend-multiply pointer-events-none"></div>

      {/* --- TOMBOL KEMBALI (Gaya Stempel) --- */}
      <button 
        onClick={handleBack}
        className="fixed top-6 left-6 z-40 group flex items-center gap-2 px-5 py-2 border-2 border-[#292524] bg-[#e5e0d1] hover:bg-[#292524] hover:text-[#e5e0d1] transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
      >
        <span className="text-xl font-bold">←</span>
        <span className="text-sm font-black uppercase tracking-widest">Map Index</span>
      </button>

      {/* --- KONTEN UTAMA (LAYOUT BUKU TERBUKA) --- */}
      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-12 min-h-screen flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-16">
        
        {/* === HALAMAN KIRI: FOTO GALLERY (di mobile tampil setelah judul) === */}
        <div className="w-full lg:w-5/12 flex flex-wrap justify-center content-start gap-3 order-2 lg:order-1 mt-0 lg:mt-10">
            
            {(() => {
                const photoList = data.images || (data.image ? [data.image] : []);
                if (photoList.length === 0) photoList.push(null); 

                return photoList.map((imgSrc, index) => (
                    <button
                        key={index}
                        onClick={() => imgSrc && setSelectedImage(index)}
                        aria-label={imgSrc ? `Lihat foto ${data.culture} ${index + 1}` : 'Foto tidak tersedia'}
                        className={`relative w-36 md:w-44 bg-[#f2f0e9] p-2 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] border border-[#d6cbb8] transition-all duration-500 ease-out hover:rotate-0 hover:scale-110 hover:z-50 hover:shadow-[15px_15px_30px_rgba(0,0,0,0.5)] cursor-pointer shrink-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b45309] ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}`}
                    >
                        {/* Selotip */}
                        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 shadow-sm backdrop-blur-xs border-l border-r border-white/20 z-20 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`} aria-hidden="true" />

                        {/* Bingkai Foto */}
                        <div className="w-full aspect-3/4 border border-[#292524]/20 p-1 bg-[#292524]">
                            <div className="relative w-full h-full grayscale-[0.2] sepia-[0.3] contrast-110 bg-[#1c1917] overflow-hidden">
                                {imgSrc ? (
                                    <Image 
                                        src={imgSrc}
                                        alt={`${data.culture} - Foto ${index + 1}`}
                                        fill
                                        className="object-cover opacity-90 hover:scale-110 transition-transform duration-1000"
                                        sizes="(max-width: 768px) 144px, 176px"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-[#78716c] border-2 border-dashed border-[#78716c]/30 m-1">
                                        <span className="text-xl mb-1" aria-hidden="true">📷</span>
                                        <span className="font-mono text-[6px] tracking-widest uppercase">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-paper-texture opacity-20 mix-blend-overlay pointer-events-none" aria-hidden="true" />
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="mt-2 pb-1 text-center">
                            <p className="text-[#292524] text-[10px] leading-tight font-mono">
                                Fig {index + 1}.
                            </p>
                            <p className="text-[6px] uppercase tracking-widest text-[#78716c] mt-1 truncate">
                                #{data.id.toUpperCase()}-{index + 1}
                            </p>
                        </div>
                    </button>
                ));
            })()}
        </div>

        {/* === LIGHTBOX UNTUK FOTO === */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-9998 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Lightbox foto"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white text-4xl hover:scale-110 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
              aria-label="Tutup lightbox"
            >
              ✕
            </button>
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
              <Image
                src={data.images[selectedImage]}
                alt={`${data.culture} - Foto ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {/* Navigation arrows */}
            {data.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(prev => prev === 0 ? data.images.length - 1 : prev - 1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 hover:scale-125 transition-transform focus:outline-none"
                  aria-label="Foto sebelumnya"
                >
                  ◀
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(prev => prev === data.images.length - 1 ? 0 : prev + 1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 hover:scale-125 transition-transform focus:outline-none"
                  aria-label="Foto berikutnya"
                >
                  ▶
                </button>
              </>
            )}
          </div>
        )}

        {/* === HALAMAN KANAN: TEXT & DATA (di mobile tampil duluan) === */}
        <div className="w-full lg:w-6/12 space-y-6 lg:space-y-8 relative order-1 lg:order-2">
            
            {/* Header */}
            <header className="border-b-[3px] border-double border-[#292524] pb-4 lg:pb-6 text-center lg:text-left">
                <p className="text-[#b45309] font-bold uppercase tracking-[0.4em] text-[10px] lg:text-xs mb-2 lg:mb-3">
                    Cultural Archive No. {data.id.length}04
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-[#292524] drop-shadow-sm scale-y-110">
                    {data.name}
                </h1>
            </header>
            
            {/* Deskripsi */}
            <article className="relative p-6 bg-[#e5e0d1] shadow-[5px_5px_0px_rgba(0,0,0,0.1)] border border-[#d6cbb8]">
                <div className="absolute -top-3 -left-3 w-4 h-4 rounded-full bg-[#44403c] shadow-md border border-gray-600" aria-hidden="true" />
                
                <p className="text-lg leading-relaxed font-medium text-justify opacity-90 font-mono">
                    <span className="text-5xl float-left mr-3 -mt-4 font-serif font-black text-[#b45309]" aria-hidden="true">"</span>
                    {data.description}
                </p>
            </article>

            {/* Suku/Ethnic Groups */}
            {data.subTribes && (
              <section className="relative bg-[#f5f5f0] p-6 border-2 border-dashed border-[#78716c] rotate-1 mx-2 shadow-sm group hover:rotate-0 transition-transform duration-300">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 w-20 h-6 bg-[#d6cbb8]/80 -rotate-2" aria-hidden="true" />
                 
                 <h2 className="text-center text-sm font-black uppercase tracking-widest mb-6 text-[#44403c] border-b border-[#78716c]/30 pb-2">
                    — Ethnic Groups Checklist —
                 </h2>
                 
                 <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-mono">
                    {data.subTribes.map((suku, index) => (
                      <li key={index} className="flex items-start gap-3 group-hover:text-[#b45309] transition-colors">
                        <span className="w-4 h-4 border-2 border-[#292524] shrink-0 mt-0.5 relative" aria-hidden="true">
                            <span className="absolute inset-0 bg-[#292524] opacity-20 scale-50" />
                        </span>
                        <span className="font-bold uppercase tracking-tight">{suku}</span>
                      </li>
                    ))}
                 </ul>
              </section>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                 {/* Makanan */}
                 <article className="bg-[#292524] text-[#e5e0d1] p-5 shadow-[8px_8px_0px_#b45309] relative overflow-hidden group hover-lift">
                    <span className="absolute right-2 top-2 text-4xl opacity-10 group-hover:scale-110 transition-transform" aria-hidden="true">🍽️</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1 text-[#d6cbb8]">Signature Dish</h3>
                    <div className="w-10 h-0.5 bg-[#b45309] mb-3" aria-hidden="true" />
                    <p className="text-xl font-serif font-bold leading-tight">{data.food}</p>
                 </article>

                 {/* Pakaian */}
                 <article className="bg-[#292524] text-[#e5e0d1] p-5 shadow-[8px_8px_0px_#b45309] relative overflow-hidden group hover-lift">
                    <span className="absolute right-2 top-2 text-4xl opacity-10 group-hover:scale-110 transition-transform" aria-hidden="true">👕</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1 text-[#d6cbb8]">Traditional Wear</h3>
                    <div className="w-10 h-0.5 bg-[#b45309] mb-3" aria-hidden="true" />
                    <p className="text-xl font-serif font-bold leading-tight">{data.clothing}</p>
                 </article>
            </div>

            {/* Fun Fact */}
            {data.funFact && (
               <aside className="mt-6 flex gap-4 items-start border-t-2 border-[#292524]/20 pt-6">
                  <span className="text-4xl grayscale contrast-150" aria-hidden="true">💡</span>
                  <div>
                     <h3 className="text-xs font-black uppercase tracking-widest text-[#b45309]">Explorer's Note:</h3>
                     <p className="text-sm italic font-serif mt-1 text-[#44403c]">"{data.funFact}"</p>
                  </div>
               </aside>
            )}

        </div>
      </div>
    </main>
  );
}