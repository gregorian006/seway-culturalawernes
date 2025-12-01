"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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
  const [isMobile, setIsMobile] = useState(false);
  
  // Deteksi mobile untuk optimasi
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);
  
  // Generate bubbles - lebih sedikit di mobile
  useEffect(() => {
    const bubbleCount = isMobile ? 10 : 30; // Kurangi bubble di mobile
    const generatedBubbles = [...Array(bubbleCount)].map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 60,
      top: Math.random() * 100,
      offset: Math.random() * 40 - 20,
      zIndex: Math.floor(Math.random() * 10)
    }));
    setBubbles(generatedBubbles);
  }, [isMobile]);

  // LOGIKA ANIMASI dengan dukungan reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Durasi lebih cepat untuk mobile atau reduced motion
    const duration = (prefersReducedMotion || isMobile) ? 0.8 : 2;
    const shortDuration = (prefersReducedMotion || isMobile) ? 0.3 : 1;

    if (mode === 'enter') {
      gsap.set(leftCloudRef.current, { xPercent: 0 });
      gsap.set(rightCloudRef.current, { xPercent: 0 });
      gsap.set(contentRef.current, { opacity: 0, scale: 0.9 });

      tl.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: shortDuration,
        ease: "power2.out"
      })
      .to({}, { duration: (prefersReducedMotion || isMobile) ? 0.2 : 0.5 }) 
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: shortDuration * 0.5,
        ease: "power2.in"
      })
      .to(leftCloudRef.current, {
          xPercent: -150,
          duration: duration,
          ease: (prefersReducedMotion || isMobile) ? "power2.out" : "power4.inOut"
      }, "open")
      .to(rightCloudRef.current, {
          xPercent: 150,
          duration: duration,
          ease: (prefersReducedMotion || isMobile) ? "power2.out" : "power4.inOut"
      }, "open");

    } else {
      gsap.set(leftCloudRef.current, { xPercent: -150 });
      gsap.set(rightCloudRef.current, { xPercent: 150 });

      tl.to(leftCloudRef.current, {
          xPercent: 0,
          duration: shortDuration * 1.2,
          ease: (prefersReducedMotion || isMobile) ? "power2.out" : "power4.inOut"
      }, "close")
      .to(rightCloudRef.current, {
          xPercent: 0,
          duration: shortDuration * 1.2,
          ease: (prefersReducedMotion || isMobile) ? "power2.out" : "power4.inOut"
      }, "close");
    }

    return () => {
      tl.kill();
    };
  }, [mode, onComplete, isMobile]);

  return (
    <div 
      className="fixed inset-0 z-9999 pointer-events-none overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      
      {/* AWAN KIRI - Tanpa blur di mobile */}
      <div ref={leftCloudRef} className="absolute top-0 left-0 w-[55%] h-full bg-[#e5e0d1] flex items-center z-20 border-r-4 border-[#d6cbb8]">
         <div className="absolute right-0 top-0 bottom-0 w-20 h-full">
            {bubbles.map((b) => (
              <div key={b.id} className={`absolute bg-[#e5e0d1] rounded-full ${isMobile ? '' : 'blur-sm'}`}
                style={{ width: `${b.size}px`, height: `${b.size}px`, top: `${b.top}%`, right: `${-b.size / 2 + b.offset}px`, zIndex: b.zIndex }} />
            ))}
         </div>
      </div>

      {/* AWAN KANAN - Tanpa blur di mobile */}
      <div ref={rightCloudRef} className="absolute top-0 right-0 w-[55%] h-full bg-[#e5e0d1] flex items-center z-20 border-l-4 border-[#d6cbb8]">
         <div className="absolute left-0 top-0 bottom-0 w-20 h-full">
            {bubbles.map((b) => (
              <div key={b.id} className={`absolute bg-[#e5e0d1] rounded-full ${isMobile ? '' : 'blur-sm'}`}
                style={{ width: `${b.size}px`, height: `${b.size}px`, top: `${b.top}%`, left: `${-b.size / 2 + b.offset}px`, zIndex: b.zIndex }} />
            ))}
         </div>
      </div>

      {/* TEKS LOADING */}
      {mode === 'enter' && (
        <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center z-50 opacity-0 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-serif font-black text-[#292524] tracking-widest uppercase drop-shadow-sm mb-4">
                {title}
            </h1>
            
            <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-[#292524]" />
                <p className="text-[#57534e] text-xs md:text-sm font-serif tracking-[0.3em] uppercase font-bold">
                    {subtitle}
                </p>
                <div className="h-px w-8 bg-[#292524]" />
            </div>
            
            {/* Loading Dots */}
            <div className="flex gap-2 mt-6 justify-center" aria-label="Loading">
                <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-[#b45309] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
        </div>
      )}

    </div>
  );
};

export default IntroClouds;