"use client";

import React from 'react';
import { useAudio } from '../../context/AudioContext';

const GlobalAudio = () => {
  const { isPlaying, toggleMute, audioRef } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {/* Elemen Audio Disimpan di sini, dikontrol lewat Context */}
      <audio ref={audioRef} loop />

      <button 
        onClick={toggleMute}
        className="group flex items-center gap-3 px-4 py-2 border-2 border-[#292524] bg-[#e5e0d1] shadow-[4px_4px_0px_#292524] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#292524] transition-all duration-200 cursor-pointer"
      >
        {/* LOGIKA IKON: */}
        {/* Kalau Playing = Tampilkan Gelombang Suara */}
        {/* Kalau Paused  = Tampilkan Speaker Silang */}
        <div className={`w-6 h-6 text-[#292524] ${isPlaying ? 'animate-pulse' : ''}`}>
          {isPlaying ? (
            // IKON SOUND ON (Gelombang)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318 0-2.402.932l-.141 10.341c-.091 1.212.863 2.227 2.16 2.227h1.918l4.415 4.415c.944.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-1.72 1.72-1.72-1.72z" />
            </svg>
          ) : (
            // IKON SOUND OFF (Silang)
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318 0-2.402.932l-.141 10.341c-.091 1.212.863 2.227 2.16 2.227h1.918l4.415 4.415c.944.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 010 5.56.75.75 0 01-1.06-1.06 4 4 0 000-3.44.75.75 0 011.06-1.06zM19.48 6.65a.75.75 0 010 10.7 4.5 4.5 0 01-1.06-1.06 7.5 7.5 0 000-8.58.75.75 0 011.06-1.06z" />
            </svg>
          )}
        </div>

        <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#b45309]">Ambience</p>
            <p className="text-xs font-black font-serif text-[#292524] uppercase tracking-wide min-w-[60px]">
                {isPlaying ? "PLAYING" : "PAUSED"}
            </p>
        </div>
      </button>
    </div>
  );
};

export default GlobalAudio;