"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// KITA TAMBAH PROPS: title (judul) & subtitle (bawahnya)
// Kalau gak diisi, default-nya: "Sumatra Island"
const IntroClouds = ({ 
  mode = 'enter', 
  onComplete, 
  title = "Sumatra Island", 
  subtitle = "Loading Culture..." 
}) => {
  
  const leftCloudRef = useRef(null);
  const rightCloudRef = useRef(null);
  const contentRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);

  // 1. GENERATE BUBBLES
  useEffect(() => {
    const generatedBubbles = [...Array(30)].map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 60,
      top: Math.random() * 100,
      offset: Math.random() * 40 - 20,
      zIndex: Math.floor(Math.random() * 10)
    }));
    setBubbles(generatedBubbles);
  }, []);

  // 2. LOGIKA ANIMASI
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    if (mode === 'enter') {
      // --- MODE ENTER ---
      gsap.set(leftCloudRef.current, { xPercent: 0 });
      gsap.set(rightCloudRef.current, { xPercent: 0 });
      gsap.set(contentRef.current, { opacity: 0, scale: 0.9 });

      tl.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      })
      .to({}, { duration: 0.5 }) 
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.in"
      })
      .to(leftCloudRef.current, {
          xPercent: -120,
          duration: 2,
          ease: "power4.inOut"
      }, "open")
      .to(rightCloudRef.current, {
          xPercent: 120,
          duration: 2,
          ease: "power4.inOut"
      }, "open");

    } else {
      // --- MODE EXIT ---
      gsap.set(leftCloudRef.current, { xPercent: -120 });
      gsap.set(rightCloudRef.current, { xPercent: 120 });

      tl.to(leftCloudRef.current, {
          xPercent: 0,
          duration: 1.2,
          ease: "power4.inOut"
      }, "close")
      .to(rightCloudRef.current, {
          xPercent: 0,
          duration: 1.2,
          ease: "power4.inOut"
      }, "close");
    }

  }, [mode, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      
      {/* AWAN KIRI */}
      <div ref={leftCloudRef} className="absolute top-0 left-0 w-[55%] h-full bg-[#e5e0d1] flex items-center z-20 border-r-4 border-[#d6cbb8]">
         <div className="absolute right-0 top-0 bottom-0 w-20 h-full">
            {bubbles.map((b) => (
              <div key={b.id} className="absolute bg-[#e5e0d1] rounded-full blur-[2px]"
                style={{ width: `${b.size}px`, height: `${b.size}px`, top: `${b.top}%`, right: `${-b.size / 2 + b.offset}px`, zIndex: b.zIndex }} />
            ))}
         </div>
      </div>

      {/* AWAN KANAN */}
      <div ref={rightCloudRef} className="absolute top-0 right-0 w-[55%] h-full bg-[#e5e0d1] flex items-center z-20 border-l-4 border-[#d6cbb8]">
         <div className="absolute left-0 top-0 bottom-0 w-20 h-full">
            {bubbles.map((b) => (
              <div key={b.id} className="absolute bg-[#e5e0d1] rounded-full blur-[2px]"
                style={{ width: `${b.size}px`, height: `${b.size}px`, top: `${b.top}%`, left: `${-b.size / 2 + b.offset}px`, zIndex: b.zIndex }} />
            ))}
         </div>
      </div>

      {/* --- TEKS LOADING DINAMIS --- */}
      {mode === 'enter' && (
        <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center z-50 opacity-0 text-center px-4">
            {/* INI YANG KITA UBAH JADI VARIABEL {title} */}
            <h1 className="text-3xl md:text-5xl font-serif font-black text-[#292524] tracking-[0.2em] uppercase drop-shadow-sm mb-4">
                {title}
            </h1>
            
            <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] w-8 bg-[#292524]"></div>
                {/* INI JUGA JADI VARIABEL {subtitle} */}
                <p className="text-[#57534e] text-xs md:text-sm font-serif tracking-[0.3em] uppercase font-bold">
                    {subtitle}
                </p>
                <div className="h-[1px] w-8 bg-[#292524]"></div>
            </div>
            
            {/* Dots Animation */}
            <div className="flex gap-2 mt-6 justify-center">
                <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
        </div>
      )}

    </div>
  );
};

export default IntroClouds;