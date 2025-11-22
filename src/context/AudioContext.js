"use client";

import React, { createContext, useContext, useState, useRef } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Saklar Utama (ON/OFF)
  const [currentTrack, setCurrentTrack] = useState(null); // Judul Lagu yang aktif
  const audioRef = useRef(null); // Referensi ke elemen Audio HTML

  // Fungsi Ganti Lagu (Dipanggil tiap pindah halaman)
  const setTrack = (url) => {
    // Kalau lagunya sama, jangan di-restart (biar mulus)
    if (currentTrack === url) return;

    setCurrentTrack(url);
    
    // Kalau elemen audio sudah siap
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      
      // Kalau posisi saklar lagi ON, langsung mainkan lagu baru
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay error:", e));
      }
    }
  };

  // Fungsi Tekan Tombol (Toggle)
  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Kalau lagi nyala, matikan (Pause)
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Kalau lagi mati, hidupkan (Play)
      audioRef.current.play().catch(e => console.log("Play error:", e));
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, setTrack, toggleMute, audioRef }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);