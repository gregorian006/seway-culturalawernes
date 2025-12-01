"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { regionsData } from '../data/regionsData'; 
import IntroClouds from './IntroClouds'; 
import OceanAnimations from './OceanAnimations'; 

const IsometricMap = ({ onNavigate }) => {
  const mapRef = useRef(null);
  const router = useRouter(); 
  
  const [activeRegion, setActiveRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- DETEKSI MOBILE & REDUCED MOTION ---
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- ANIMASI PETA MELAYANG (Dimatikan di mobile) ---
  useEffect(() => {
    if (mapRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Skip animasi floating di mobile untuk performa
      if (!prefersReducedMotion && !isMobile) {
        gsap.to(mapRef.current, {
          y: -15, 
          duration: 3, 
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }
  }, [isMobile]);

  // --- FUNGSI KLIK DAERAH ---
  const handleRegionClick = useCallback((region) => {
    setActiveRegion(region); 
    setIsNavigating(true);   
    
    if (onNavigate) {
        onNavigate();
    }
  }, [onNavigate]);

  // --- KEYBOARD NAVIGATION ---
  const handleKeyDown = useCallback((e, region) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRegionClick(region);
    }
  }, [handleRegionClick]);

  return (
    <div className="relative w-full h-[85vh] md:h-screen flex items-center md:items-center justify-center perspective-1000 overflow-hidden">

      {/* WADAH PETA */}
      <div ref={mapRef} className="relative w-[95%] md:w-full max-w-md md:max-w-4xl aspect-square md:aspect-video transition-all duration-500 mt-20 md:mt-32">
        
        {/* EFEK AIR LAUT - Dioptimasi untuk Mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[100%] md:w-[90%] md:h-[100%] z-[-1] pointer-events-none">
            {/* Base Ocean - Blur dikurangi di mobile */}
            <div 
              className="absolute inset-0 rounded-[50%] opacity-80"
              style={{
                background: 'radial-gradient(ellipse at center, #7dd3fc 0%, #38bdf8 30%, #0ea5e9 60%, #0284c7 100%)',
                filter: isMobile ? 'blur(15px)' : 'blur(40px)',
              }}
            />
            
            {/* Ocean Shimmer - Dimatikan di mobile */}
            {!isMobile && (
              <div 
                className="absolute inset-[10%] rounded-[50%] opacity-40 animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 40%)',
                  filter: 'blur(20px)',
                  animationDuration: '4s',
                }}
              />
            )}
            
            {/* Soft edge glow - Transisi ke background */}
            <div 
              className="absolute inset-[-5%] rounded-[50%] opacity-60"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(214,203,184,0.8) 75%, #d6cbb8 100%)',
              }}
            />
            
            {/* Animasi Ikan & Kapal - Hanya di Desktop */}
            {!isMobile && <OceanAnimations />}
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

        {/* --- EFEK KABUT (Hanya Desktop untuk performa) --- */}
        {!isMobile && (
          <div 
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ 
                  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' 
              }}
          >
              {/* Lapis 1: Kabut Tebal (Gerak Lambat) */}
              <div className="absolute top-0 left-0 w-[200%] h-full flex animate-fog-slow opacity-60 mix-blend-overlay">
                   <div className="w-full h-full bg-fog-texture blur-[8px]"></div>
                   <div className="w-full h-full bg-fog-texture blur-[8px]"></div>
              </div>

              {/* Lapis 2: Kabut Detail (Gerak Cepat) */}
              <div className="absolute top-0 left-0 w-[200%] h-full flex animate-fog-fast opacity-40">
                   <div className="w-full h-full bg-fog-texture blur-[20px] scale-150"></div>
                   <div className="w-full h-full bg-fog-texture blur-[20px] scale-150"></div>
              </div>
          </div>
        )}

        {/* LOOPING TITIK LOKASI */}
        {regionsData.map((region) => (
          <button
            key={region.id}
            aria-label={`Jelajahi budaya ${region.name}`}
            title={region.name}
            style={{ 
                '--m-top': region.mobileTop,
                '--m-left': region.mobileLeft, 
                '--d-top': region.top,
                '--d-left': region.left 
            }}
            className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center top-[var(--m-top)] left-[var(--m-left)] md:top-[var(--d-top)] md:left-[var(--d-left)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#b45309] focus-visible:ring-offset-2 rounded-full"
            onClick={() => handleRegionClick(region)}
            onKeyDown={(e) => handleKeyDown(e, region)}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onFocus={() => setHoveredRegion(region.id)}
            onBlur={() => setHoveredRegion(null)}
          >
            {/* Ping Animation - lebih smooth */}
            <span 
              className={`absolute h-6 w-6 md:h-10 md:w-10 rounded-full bg-red-600/40 transition-opacity duration-300 ${
                hoveredRegion === region.id ? 'animate-ping' : 'animate-pulse opacity-50'
              }`}
              aria-hidden="true"
            />
            
            {/* Pin utama */}
            <div 
              className={`relative w-4 h-4 md:w-6 md:h-6 bg-red-600 rounded-full border-2 border-white shadow-lg transition-all duration-300 flex items-center justify-center text-white ${
                hoveredRegion === region.id ? 'scale-125 bg-red-500' : ''
              }`}
            >
               <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full" aria-hidden="true" />
            </div>
            
            {/* Label Nama - tampil saat hover/focus */}
            <div 
              className={`absolute top-full mt-2 bg-[#e7e5e4] text-[#292524] border border-[#78350f] text-sm font-serif font-bold px-4 py-1 rounded-sm transition-all duration-300 whitespace-nowrap tracking-widest uppercase shadow-lg pointer-events-none ${
                hoveredRegion === region.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-2 md:opacity-0'
              }`}
              role="tooltip"
            >
              {region.name}
            </div>
          </button>
        ))}
      </div>

      {/* AWAN TRANSISI */}
      {isNavigating && activeRegion && (
         <IntroClouds 
            mode="exit" 
            onComplete={() => {
               router.push(`/budaya/${activeRegion.id}`); 
            }} 
         />
      )}

    </div>
  );
};

export default IsometricMap;