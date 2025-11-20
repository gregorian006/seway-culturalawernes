"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { regionsData } from '../data/regionsData'; 

const IsometricMap = () => {
  // --- STATE & REF ---
  const mapRef = useRef(null);
  const audioRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);
  
  // State Baru: Default false (artinya suara HIDUP). Ubah jadi true kalau mau default MATI.
  const [isMuted, setIsMuted] = useState(false); 

  // --- 1. ANIMASI PETA MELAYANG (GSAP) ---
  useEffect(() => {
    if (mapRef.current) {
      gsap.to(mapRef.current, {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  // --- 2. LOGIKA MUSIK (Auto Play & Mute Handling) ---
  
  // Effect A: Ganti Lagu saat Daerah Dipilih
  useEffect(() => {
    // Stop lagu lama
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Setup lagu baru
    if (activeRegion && activeRegion.audio) {
      const newAudio = new Audio(activeRegion.audio);
      newAudio.volume = 0.5;
      newAudio.loop = true;
      
      // Simpan ke ref
      audioRef.current = newAudio;

      // Cek status Mute sebelum play
      if (!isMuted) {
        newAudio.play().catch((err) => console.log("Autoplay blocked:", err));
      }
    }

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [activeRegion]); 

  // Effect B: Pantau Tombol Mute/Unmute
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause(); // Kalau dimute, pause
      } else {
        // Kalau di-unmute DAN lagi ada daerah aktif, play lagi
        if (activeRegion) {
            audioRef.current.play().catch((err) => console.log("Resume blocked:", err));
        }
      }
    }
  }, [isMuted, activeRegion]);


  return (
    <div className="relative w-full h-[85vh] flex items-center justify-center perspective-1000">
      
      {/* --- TOMBOL MUTE / UNMUTE --- */}
      {/* Posisinya Absolute di pojok kanan atas wadah peta */}
      <div className="absolute top-4 right-4 md:top-10 md:right-10 z-40">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`
            flex items-center justify-center w-12 h-12 rounded-full border-2 backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]
            ${isMuted 
              ? 'bg-slate-800/80 border-gray-500 text-gray-400 hover:bg-slate-700' 
              : 'bg-slate-900/80 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]'
            }
          `}
          title={isMuted ? "Hidupkan Musik" : "Matikan Musik"}
        >
          {isMuted ? (
            // ICON SPEAKER SILANG (MUTE)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318 0-2.402.932l-.141 10.341c-.091 1.212.863 2.227 2.16 2.227h1.918l4.415 4.415c.944.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" />
            </svg>
          ) : (
            // ICON SPEAKER GELOMBANG (UNMUTE)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-pulse">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318 0-2.402.932l-.141 10.341c-.091 1.212.863 2.227 2.16 2.227h1.918l4.415 4.415c.944.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 010 5.56.75.75 0 01-1.06-1.06 4 4 0 000-3.44.75.75 0 011.06-1.06zM19.48 6.65a.75.75 0 010 10.7 4.5 4.5 0 01-1.06-1.06 7.5 7.5 0 000-8.58.75.75 0 011.06-1.06z" />
            </svg>
          )}
        </button>
      </div>

      {/* --- WADAH PETA UTAMA --- */}
      <div ref={mapRef} className="relative w-full max-w-5xl aspect-3/4 md:aspect-video transition-all duration-500 mt-38">
        
        <Image 
          src="/assets/Peta-sumatera-v3.png"
          alt="Peta Sumatera Isometric"
          fill
          className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
          priority
          unoptimized
        />

        {/* --- LOOPING TITIK LOKASI (MAPPING DATA) --- */}
        {regionsData.map((region) => (
          <button
            key={region.id}
            // PERBAIKAN DI SINI LEK:
            // 1. '-translate-x-1/2 -translate-y-1/2': Biar koordinat 'top/left' itu dihitung dari TENGAH titik, bukan pojok kiri.
            // 2. 'flex items-center justify-center': Biar radar dan titik utama pas di tengah-tengah tombol.
            className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ top: region.top, left: region.left }}
            onClick={() => setActiveRegion(region)}
          >
            {/* Efek Radar (Ping) */}
            {/* Kita kasih ukuran fix yang sama kayak titiknya biar ga melebar kemana-mana */}
            <span className="absolute h-6 w-6 md:h-8 md:w-8 rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
            
            {/* Titik Inti */}
            <div className="relative h-6 w-6 md:h-8 md:w-8 bg-linear-to-br from-yellow-400 to-orange-600 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,165,0,0.8)] transition-transform duration-300 group-hover:scale-125 flex items-center justify-center z-10">
                {/* Titik putih kecil di tengah */}
                <div className="h-2 w-2 bg-white rounded-full shadow-sm"></div>
            </div>

            {/* Label Nama Daerah */}
            <div className="absolute top-full mt-2 bg-black/80 backdrop-blur-sm text-yellow-400 text-xs md:text-sm font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap border border-yellow-500/30 pointer-events-none">
              {region.name}
            </div>
          </button>
        ))}
      </div>

      {/* --- MODAL POP-UP INFORMASI --- */}
      {activeRegion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-opacity duration-300 animate-in fade-in"
             onClick={() => setActiveRegion(null)}>
             
          <div className="bg-slate-900/90 border border-yellow-600/50 text-white p-6 md:p-8 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(234,179,8,0.2)] transform scale-100 animate-in zoom-in duration-300 relative overflow-hidden"
               onClick={(e) => e.stopPropagation()}>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-500 mb-1">
                    {activeRegion.culture}
                </h2>
                <h3 className="text-lg text-slate-400 mb-6 flex items-center gap-2">
                    📍 {activeRegion.name}
                </h3>

                <p className="text-slate-200 leading-relaxed text-sm md:text-base mb-6 border-l-4 border-yellow-600 pl-4 italic">
                    "{activeRegion.description}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                        <span className="block text-xs text-yellow-500 uppercase tracking-wider font-bold mb-1">Kuliner Khas</span>
                        <span className="text-white font-medium">{activeRegion.food}</span>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                        <span className="block text-xs text-yellow-500 uppercase tracking-wider font-bold mb-1">Pakaian Adat</span>
                        <span className="text-white font-medium">{activeRegion.clothing}</span>
                    </div>
                </div>

                <button 
                  className="w-full py-3 bg-linear-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-yellow-500/20 active:scale-95"
                  onClick={() => setActiveRegion(null)}
                >
                  Tutup Penjelasan
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsometricMap;