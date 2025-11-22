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
  
  // GANTI DARI 'playSong' JADI 'setTrack'
  const { setTrack } = useAudio(); 

  const data = regionsData.find((item) => item.id === slug);

  // Pas Halaman Detail Muncul -> GANTI KASET JADI LAGU DAERAH
  useEffect(() => {
    if (data && data.audio) {
        setTrack(data.audio);
    }
  }, [data, setTrack]);

  const handleBack = () => {
    setIsExiting(true); 
  };

  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#d6cbb8] relative overflow-x-hidden font-serif text-[#292524]">
      
      {!isExiting && (
        <IntroClouds 
            mode="enter" 
            title={data.name} 
            subtitle="Exploring Culture..." 
        />
      )}

      {isExiting && (
        <IntroClouds 
            mode="exit" 
            onComplete={() => router.push('/')} 
        />
      )}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#a89f91_100%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-paper-texture opacity-40 mix-blend-multiply pointer-events-none"></div>

      <button 
        onClick={handleBack}
        className="fixed top-6 left-6 z-40 group flex items-center gap-2 px-5 py-2 border-2 border-[#292524] rounded-full bg-[#e5e0d1] hover:bg-[#292524] hover:text-[#e5e0d1] transition-all shadow-lg active:scale-95"
      >
        <span className="text-xl font-bold">←</span>
        <span className="text-sm font-bold uppercase tracking-widest">Map</span>
      </button>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-10 min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* KIRI: FOTO */}
        <div className="w-full lg:w-5/12 flex justify-center perspective-1000">
            <div className="relative w-full max-w-[400px] aspect-3/4 bg-[#e5e0d1] p-3 shadow-[10px_10px_20px_rgba(0,0,0,0.4)] rotate--3deg hover:rotate-0 transition-transform duration-500 ease-out">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e5e5e5]/60 rotate-2 shadow-sm backdrop-blur-sm border-l border-r border-white/50"></div>
                <div className="w-full h-full border-2 border-[#292524] p-1">
                    <div className="relative w-full h-full grayscale-[0.3] sepia-[0.4] contrast-125 overflow-hidden bg-[#44403c]">
                        {data.image ? (
                             <Image 
                                src={data.image}
                                alt={data.culture}
                                fill
                                className="object-cover"
                             />
                        ) : (
                            <div className="flex items-center justify-center h-full text-[#d6cbb8] font-bold tracking-widest text-center p-4 border-4 border-double border-[#d6cbb8]/20">
                                NO IMAGE<br/>AVAILABLE
                            </div>
                        )}
                    </div>
                </div>
                <p className="mt-4 text-center font-handwriting text-[#292524] text-lg rotate-1" style={{ fontFamily: 'Courier Prime, monospace' }}>
                    Fig 1. {data.culture} Attire
                </p>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-[#b91c1c] rounded-full flex items-center justify-center opacity-70 rotate-[-15deg] mix-blend-multiply pointer-events-none">
                    <div className="text-[#b91c1c] font-black text-xs uppercase text-center leading-tight">
                        OFFICIAL<br/>RECORD<br/>2024
                    </div>
                </div>
            </div>
        </div>

        {/* KANAN: TEXT */}
        <div className="w-full lg:w-7/12 space-y-8 text-[#292524]">
            <div className="border-b-4 border-[#292524] pb-4">
                <h3 className="text-[#b45309] font-bold uppercase tracking-[0.3em] text-sm mb-2">
                    Cultural Archive • {data.id.toUpperCase()}
                </h3>
                <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter drop-shadow-sm mix-blend-multiply">
                    {data.name}
                </h1>
            </div>
            <div className="relative pl-8 border-l-2 border-[#292524]">
                <p className="text-lg md:text-xl leading-loose font-medium opacity-90 text-justify" style={{ fontFamily: 'Courier Prime, monospace' }}>
                    <span className="text-4xl float-left mr-2 mt-10px font-serif font-black">"</span>
                    {data.description}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-[#e5e0d1] p-6 border-2 border-[#292524] shadow-[4px_4px_0px_#292524] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">🍽️</div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#b45309] mb-2 border-b border-[#b45309]/30 pb-1 inline-block">Signature Dish</h3>
                    <p className="text-2xl font-serif font-bold">{data.food}</p>
                 </div>
                 <div className="bg-[#e5e0d1] p-6 border-2 border-[#292524] shadow-[4px_4px_0px_#292524] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">👕</div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#b45309] mb-2 border-b border-[#b45309]/30 pb-1 inline-block">Traditional Wear</h3>
                    <p className="text-2xl font-serif font-bold">{data.clothing}</p>
                 </div>
            </div>
        </div>

      </div>
    </main>
  );
}