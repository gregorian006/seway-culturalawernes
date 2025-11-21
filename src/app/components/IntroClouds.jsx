"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const IntroClouds = () => {
  const containerRef = useRef(null);
  const leftCloudRef = useRef(null);
  const rightCloudRef = useRef(null);
  const contentRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  
  // STATE BARU: Buat nampung data bola-bola (biar sinkron)
  const [bubbles, setBubbles] = useState([]);

  // 1. Generate Angka Acak HANYA SETELAH halamannya nampil (Client Side Only)
  useEffect(() => {
    // Kita buat datanya di sini, bukan pas render langsung
    const generatedBubbles = [...Array(25)].map((_, i) => ({
      id: i,
      // Gunakan Viewport Width (vw) atau range lebih kecil
      // Tapi karena Math.random jalan di JS, kita kecilkan range dasarnya
      size: Math.random() * 80 + 50, // Kecilin sikit range-nya (50px - 130px)
      top: Math.random() * 100,
      offset: Math.random() * 30 - 15,
      zIndex: Math.floor(Math.random() * 10)
    }));
    setBubbles(generatedBubbles);
  }, []);

  // 2. Animasi GSAP (Tetap sama)
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsHidden(true) 
    });

    tl.to(contentRef.current, { 
        duration: 1.5, 
        opacity: 1 
    })
    .to(contentRef.current, {
        opacity: 0,
        duration: 0.5,
        scale: 0.8,
        ease: "back.in(1.7)"
    })
    .to(leftCloudRef.current, {
        xPercent: -120, 
        duration: 2.5,
        ease: "power4.inOut" 
    }, "open") 
    .to(rightCloudRef.current, {
        xPercent: 120, 
        duration: 2.5,
        ease: "power4.inOut"
    }, "open");

  }, []);

  if (isHidden) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-9999 pointer-events-none overflow-hidden">
      
      {/* --- GUMPALAN KIRI --- */}
      <div ref={leftCloudRef} className="absolute top-0 left-0 w-[55%] h-full bg-white flex items-center z-20">
         <div className="absolute right-0 top-0 bottom-0 w-20 h-full">
            {/* Render Bubble dari STATE, bukan langsung function */}
            {bubbles.map((b) => (
              <div 
                key={b.id}
                className="absolute bg-white rounded-full shadow-sm"
                style={{
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  top: `${b.top}%`,
                  right: `${-b.size / 2 + b.offset}px`, // Kiri pakai 'right'
                  zIndex: b.zIndex,
                  filter: 'blur(1px)',
                }}
              />
            ))}
         </div>
      </div>

      {/* --- GUMPALAN KANAN --- */}
      <div ref={rightCloudRef} className="absolute top-0 right-0 w-[55%] h-full bg-white flex items-center z-20">
         <div className="absolute left-0 top-0 bottom-0 w-20 h-full">
            {bubbles.map((b) => (
              <div 
                key={b.id}
                className="absolute bg-white rounded-full shadow-sm"
                style={{
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  top: `${b.top}%`,
                  left: `${-b.size / 2 + b.offset}px`, // Kanan pakai 'left'
                  zIndex: b.zIndex,
                  filter: 'blur(1px)',
                }}
              />
            ))}
         </div>
      </div>

      {/* --- TEXT LOADING --- */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center z-50 opacity-0">
         <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#292524] tracking-widest uppercase drop-shadow-md">
            Welcome to Sumatra Island
         </h1>
         <div className="flex gap-2 mt-4">
            <span className="w-3 h-3 bg-[#292524] rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-[#292524] rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-3 h-3 bg-[#292524] rounded-full animate-bounce [animation-delay:0.4s]"></span>
         </div>
      </div>

    </div>
  );
};

export default IntroClouds;