"use client";

import React, { useState, useEffect } from 'react';
import IsometricMap from "./components/IsometricMap";
import IntroClouds from "./components/IntroClouds";
import AboutUsButton from "./components/AboutUsButton";
import CulturalQuiz from "./components/CulturalQuiz";
import CulturalChatbot from "./components/CulturalChatbot";
import { useAudio } from '../context/AudioContext'; 

export default function Home() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  
  const { setTrack } = useAudio(); 

  // Pas Halaman Peta Muncul -> PASANG LAGU TEMA PETA
  useEffect(() => {
    // Pastikan kau punya file ini, atau ganti pakai lagu daerah sembarang dulu buat tes
    setTrack('/assets/audio/bgm-main.mp3'); 
  }, [setTrack]); 

  return (
    <main className="flex min-h-screen flex-col items-center justify-start md:justify-center bg-[#dec29d] overflow-hidden relative">
      
      {/* About Us Button - Hanya di halaman peta */}
      <AboutUsButton />

      {/* Quiz & Chatbot Buttons - Fixed position top right (avoid overlap with music player) */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-40 flex gap-2">
        {/* Quiz Button */}
        <button
          onClick={() => setShowQuiz(true)}
          className="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-[#e5e0d1] border-2 border-[#292524] shadow-[4px_4px_0px_#292524] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#292524] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          aria-label="Take Cultural Quiz"
          title="Take Cultural Quiz"
        >
          <span className="text-xl md:text-2xl">📜</span>
          <div className="hidden lg:block text-left">
            <p className="text-[8px] font-bold uppercase tracking-widest text-[#b45309]">Challenge</p>
            <p className="text-[10px] font-black font-serif text-[#292524] uppercase">Quiz</p>
          </div>
        </button>

        {/* Chatbot Button */}
        <button
          onClick={() => setShowChatbot(true)}
          className="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-[#292524] text-[#e5e0d1] border-2 border-[#292524] shadow-[4px_4px_0px_#b45309] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#b45309] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          aria-label="Chat with AI Guide"
          title="Chat with Cultural Sage"
        >
          <span className="text-xl md:text-2xl">🧙</span>
          <div className="hidden lg:block text-left">
            <p className="text-[8px] font-bold uppercase tracking-widest text-[#d6cbb8]">AI Guide</p>
            <p className="text-[10px] font-black font-serif text-[#e5e0d1] uppercase">Chat</p>
          </div>
        </button>
      </div>
      
      {/* Quiz Modal */}
      {showQuiz && <CulturalQuiz onClose={() => setShowQuiz(false)} />}
      
      {/* Chatbot Modal */}
      {showChatbot && <CulturalChatbot onClose={() => setShowChatbot(false)} />}
      
      <IntroClouds 
         title="Welcome to our Project" 
         subtitle="Loading Culture..." 
      /> 

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#a89f91_100%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-paper-texture opacity-40 mix-blend-multiply pointer-events-none"></div>

      <div className={`absolute top-12 md:top-8 z-20 text-center px-4 w-full pointer-events-none transition-opacity duration-500 ${isNavigating ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-[#292524] tracking-[0.05em] md:tracking-[0.1em] drop-shadow-sm uppercase leading-tight">
          SEAWAY
        </h1>
        <div className="h-[2px] w-16 md:w-32 bg-[#292524] mx-auto my-2 md:my-3"></div>
        <p className="text-[#44403c] text-[8px] md:text-xs font-bold font-serif tracking-[0.15em] md:tracking-[0.25em] uppercase leading-relaxed">
          Sumatra Exploration & Arts Website for All Youth
        </p>
        <p className="text-[#78716c] text-[7px] md:text-[10px] font-serif tracking-[0.2em] uppercase mt-1 md:mt-2">
          Est. 2025
        </p>
      </div>

      <div className="z-10 relative w-full flex justify-center">
         <IsometricMap onNavigate={() => setIsNavigating(true)} />
      </div>
      
    </main>
  );
}