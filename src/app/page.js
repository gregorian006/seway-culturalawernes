"use client";

import React, { useState, useEffect } from 'react';
import IsometricMap from "./components/IsometricMap";
import IntroClouds from "./components/IntroClouds";
import { useAudio } from '../context/AudioContext'; 

export default function Home() {
  const [isNavigating, setIsNavigating] = useState(false);
  
  // GANTI DARI 'stopAudio' JADI 'setTrack'
  const { setTrack } = useAudio(); 

  // Pas Halaman Peta Muncul -> PASANG LAGU TEMA PETA
  useEffect(() => {
    // Pastikan kau punya file ini, atau ganti pakai lagu daerah sembarang dulu buat tes
    setTrack('/assets/audio/bgm-main.mp3'); 
  }, [setTrack]); 

  return (
    <main className="flex min-h-screen flex-col items-center justify-start md:justify-center bg-[#dec29d] overflow-hidden relative">
      
      <IntroClouds 
         title="Welcome to our Project" 
         subtitle="Loading Culture..." 
      /> 

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#a89f91_100%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-paper-texture opacity-40 mix-blend-multiply pointer-events-none"></div>

      <div className={`absolute top-12 md:top-8 z-20 text-center px-4 w-full pointer-events-none transition-opacity duration-500 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-3xl md:text-7xl font-serif font-bold text-[#292524] tracking-[0.1em] md:tracking-[0.2em] drop-shadow-sm uppercase leading-tight">
          Sumatera
        </h1>
        <div className="h-[2px] w-16 md:w-32 bg-[#292524] mx-auto my-2 md:my-4"></div>
        <p className="text-[#44403c] text-[10px] md:text-sm font-bold font-serif tracking-[0.2em] md:tracking-[0.4em] uppercase">
          Culture Fest • Est. 2024
        </p>
      </div>

      <div className="z-10 relative w-full flex justify-center">
         <IsometricMap onNavigate={() => setIsNavigating(true)} />
      </div>
      
    </main>
  );
}