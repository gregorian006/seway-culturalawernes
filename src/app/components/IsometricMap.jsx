"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { regionsData } from '../data/regionsData'; 

const IsometricMap = () => {
  const mapRef = useRef(null);
  const audioRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [isMuted, setIsMuted] = useState(false); 

  // --- ANIMASI PETA MELAYANG ---
  useEffect(() => {
    if (mapRef.current) {
      gsap.to(mapRef.current, {
        y: -15, 
        duration: 3, 
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  // --- LOGIKA MUSIK ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (activeRegion && activeRegion.audio) {
      const newAudio = new Audio(activeRegion.audio);
      newAudio.volume = 0.5;
      newAudio.loop = true;
      audioRef.current = newAudio;
      if (!isMuted) newAudio.play().catch(()=>{});
    }
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, [activeRegion]); 

  useEffect(() => {
    if (audioRef.current) isMuted ? audioRef.current.pause() : (activeRegion && audioRef.current.play().catch(()=>{}));
  }, [isMuted, activeRegion]);

  return (
    // WADAH UTAMA:
    // md:items-end -> Di desktop kita taruh agak ke bawah biar gak nabrak judul
    // md:pb-10 -> Kasih jarak dari bawah
    <div className="relative w-full h-[85vh] md:h-screen flex items-center md:items-center justify-center perspective-1000 overflow-hidden">
      
       {/* --- DEFINISI FILTER SVG (INI JANGAN DISINGKAT LEK, WAJIB ADA BIAR AIRNYA GERAK) --- */}
       <svg className="absolute invisible w-0 h-0">
        <defs>
          <filter id="water-ripple-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feImage href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImciIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSIgZng9IjUwJSIgZnk9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZiIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+" result="rippleImage" />
            <feDisplacementMap in="SourceGraphic" in2="rippleImage" scale="50" xChannelSelector="R" yChannelSelector="G" />
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" seed="1">
                 <animate attributeName="baseFrequency" dur="30s" values="0.015;0.025;0.015" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
          </filter>
        </defs>
      </svg>

      {/* TOMBOL MUTE */}
      <div className="absolute top-4 right-4 md:top-24 md:right-10 z-50">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-10 h-10 rounded-full border-2 border-[#292524] flex items-center justify-center transition-all ${isMuted ? 'bg-transparent opacity-50' : 'bg-[#292524] text-[#d6cbb8]'}`}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* --- WADAH PETA (CONTAINER) --- */}
      {/* FIX POSISI:
          mt-20 (HP) -> Biar gak nabrak judul di HP.
          md:mt-32 (Desktop) -> TURUN KE BAWAH LAGI biar gak nabrak judul besar.
      */}
      <div ref={mapRef} className="relative w-[95%] md:w-full max-w-md md:max-w-5xl aspect-square md:aspect-video transition-all duration-500 mt-48 md:mt-50">
        
        {/* --- EFEK AIR BIRU --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[120%] md:w-[120%] md:h-[105%] z-[-1] pointer-events-none">
            {/* Layer 1: Dasar Biru Laut */}
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-[50px] md:blur-[110px]" 
                 style={{ filter: 'url(#water-ripple-filter)' }}></div>
            
            {/* Layer 2: Pantulan Cyan */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-[40px] md:blur-[90px] animate-pulse" 
                 style={{ filter: 'url(#water-ripple-filter)' }}></div>
        </div>
        
        {/* GAMBAR PETA */}
        <Image 
          src="/assets/petasumatera.png"
          alt="Peta Sumatera"
          fill
          className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]" 
          priority
          unoptimized
        />

        {/* --- LOOPING TITIK LOKASI --- */}
        {regionsData.map((region) => (
          <button
            key={region.id}
            className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ top: region.top, left: region.left }}
            onClick={() => setActiveRegion(region)}
          >
            {/* Radar */}
            <span className="absolute h-6 w-6 md:h-10 md:w-10 rounded-full bg-red-600/40 animate-ping"></span>
            
            {/* Pin Utama */}
            <div className="relative w-4 h-4 md:w-6 md:h-6 bg-red-600 rounded-full border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-125 flex items-center justify-center text-white">
               <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"></div>
            </div>

            {/* Label Nama */}
            <div className="hidden md:block absolute top-full mt-2 bg-[#e7e5e4] text-[#292524] border border-[#78350f] text-sm font-serif font-bold px-4 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest uppercase shadow-lg">
              {region.name}
            </div>
          </button>
        ))}
      </div>

      {/* --- MODAL POP-UP (JURNAL) --- */}
      {activeRegion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
             onClick={() => setActiveRegion(null)}>
          <div className="absolute inset-0 bg-[#292524]/60 backdrop-blur-sm"></div>   

          <div className="bg-[#e5e0d1] text-[#292524] p-6 md:p-12 w-[90%] md:max-w-2xl shadow-2xl rotate-1 transform transition-all duration-300 relative max-h-[85vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}
               style={{ backgroundImage: 'linear-gradient(#d6cbb8 1px, transparent 1px)', backgroundSize: '100% 2rem' }}> 
            
             <div className="relative z-10 font-serif">
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest border-b-4 border-[#292524] pb-2 mb-4">
                    {activeRegion.culture}
                </h2>
                <div className="flex justify-between items-center mb-6">
                    <span className="font-bold italic text-[#57534e]">Region: {activeRegion.name}</span>
                </div>

                <p className="text-sm md:text-lg leading-relaxed mb-8 font-medium opacity-90" style={{ fontFamily: 'Courier Prime, monospace' }}>
                    {activeRegion.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border-2 border-[#292524] p-3 bg-[#d6cbb8]/50">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1 text-[#b45309]">Makanan Khas</p>
                        <p className="font-bold">{activeRegion.food}</p>
                    </div>
                    <div className="border-2 border-[#292524] p-3 bg-[#d6cbb8]/50">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1 text-[#b45309]">Pakaian Adat</p>
                        <p className="font-bold">{activeRegion.clothing}</p>
                    </div>
                </div>

                <button 
                  className="w-full py-3 bg-[#292524] text-[#e5e0d1] font-bold uppercase tracking-[0.2em] hover:bg-[#8a1c1c] transition-colors shadow-lg"
                  onClick={() => setActiveRegion(null)}
                >
                  Close Journal
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsometricMap;