"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { regionsData } from '../data/regionsData'; 
import IntroClouds from './IntroClouds'; 

// 1. TERIMA PROPS 'onNavigate' DARI PAGE.JS
const IsometricMap = ({ onNavigate }) => {
  const mapRef = useRef(null);
  const audioRef = useRef(null);
  const router = useRouter(); 
  
  const [activeRegion, setActiveRegion] = useState(null);
  const [isMuted, setIsMuted] = useState(false); 
  const [isNavigating, setIsNavigating] = useState(false); 

  // --- ANIMASI PETA MELAYANG (SAMA) ---
  useEffect(() => {
    if (mapRef.current) {
      gsap.to(mapRef.current, {
        y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }
  }, []);

  // --- FUNGSI KLIK DAERAH (YANG KITA UBAH) ---
  const handleRegionClick = (region) => {
    setActiveRegion(region); 
    setIsNavigating(true);   // Trigger awan lokal
    
    // 2. LAPOR KE INDUK (Page.js) BIAR JUDUL HILANG
    if (onNavigate) {
        onNavigate();
    }
  };

  // --- LOGIKA MUSIK (SAMA) ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (activeRegion && activeRegion.audio && !isNavigating) {
      const newAudio = new Audio(activeRegion.audio);
      newAudio.volume = 0.5;
      newAudio.loop = true;
      audioRef.current = newAudio;
      if (!isMuted) newAudio.play().catch(()=>{});
    }
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, [activeRegion, isNavigating]); 

  useEffect(() => {
    if (audioRef.current) isMuted ? audioRef.current.pause() : (activeRegion && !isNavigating && audioRef.current.play().catch(()=>{}));
  }, [isMuted, activeRegion, isNavigating]);

  return (
    <div className="relative w-full h-[85vh] md:h-screen flex items-center md:items-center justify-center perspective-1000 overflow-hidden">
      
       {/* SVG FILTER (SAMA) */}
       <svg className="absolute invisible w-0 h-0"><defs><filter id="water-ripple-filter" x="-50%" y="-50%" width="200%" height="200%"><feImage href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImciIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSIgZng9IjUwJSIgZnk9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZiIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+" result="rippleImage" /><feDisplacementMap in="SourceGraphic" in2="rippleImage" scale="50" xChannelSelector="R" yChannelSelector="G" /><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" seed="1"><animate attributeName="baseFrequency" dur="30s" values="0.015;0.025;0.015" repeatCount="indefinite" /></feTurbulence><feDisplacementMap in="SourceGraphic" in2="noise" scale="30" /></filter></defs></svg>

      {/* TOMBOL MUTE (SAMA) */}
      <div className="absolute top-6 right-4 md:top-10 md:right-10 z-50">
        <button onClick={() => setIsMuted(!isMuted)} className={`w-10 h-10 rounded-full border-2 border-[#292524] flex items-center justify-center transition-all ${isMuted ? 'bg-transparent opacity-50' : 'bg-[#292524] text-[#d6cbb8]'}`}>
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* WADAH PETA (SAMA) */}
      <div ref={mapRef} className="relative w-[95%] md:w-full max-w-md md:max-w-4xl aspect-square md:aspect-video transition-all duration-500 mt-20 md:mt-32">
        
        {/* EFEK AIR (SAMA) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] md:w-[100%] md:h-[120%] z-[-1] pointer-events-none">
            <div className="absolute inset-0 bg-[#3b82f6] rounded-full blur-[80px] opacity-30 mix-blend-multiply animate-water-flow" style={{ filter: 'url(#water-ripple-filter)' }}></div>
            <div className="absolute inset-0 bg-[#22d3ee] rounded-full blur-[60px] opacity-40 mix-blend-soft-light animate-water-flow-reverse" style={{ filter: 'url(#water-ripple-filter)' }}></div>
             <div className="absolute inset-0 rounded-full blur-[40px] border-[20px] border-transparent shadow-[inset_0_0_100px_rgba(214,203,184,0.8)]"></div>
        </div>
        
        {/* GAMBAR PETA (SAMA) */}
        <Image src="/assets/petasumatera.png" alt="Peta Sumatera" fill className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]" priority unoptimized />

        {/* TITIK LOKASI (SAMA) */}
        {regionsData.map((region) => (
          <button key={region.id} className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ top: region.top, left: region.left }} onClick={() => handleRegionClick(region)}>
            <span className="absolute h-6 w-6 md:h-10 md:w-10 rounded-full bg-red-600/40 animate-ping"></span>
            <div className="relative w-4 h-4 md:w-6 md:h-6 bg-red-600 rounded-full border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-125 flex items-center justify-center text-white">
               <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"></div>
            </div>
            <div className="hidden md:block absolute top-full mt-2 bg-[#e7e5e4] text-[#292524] border border-[#78350f] text-sm font-serif font-bold px-4 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest uppercase shadow-lg">
              {region.name}
            </div>
          </button>
        ))}
      </div>

      {/* AWAN TRANSISI (SAMA) */}
      {isNavigating && activeRegion && (
         <IntroClouds mode="exit" onComplete={() => { router.push(`/budaya/${activeRegion.id}`); }} />
      )}

    </div>
  );
};

export default IsometricMap;