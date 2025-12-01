"use client";

import React, { useState, useEffect } from 'react';

const AboutUsModal = ({ isOpen, onClose }) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const teamMembers = [
    { name: 'Gregorian Goclio Sinaga', nim: '241401087' },
    { name: 'Tommy Christianlie', nim: '240502023' },
    { name: 'Eka Nandiyar Prastio', nim: '220802082' },
    { name: 'Zarkasyi Dzihni Sanjaya', nim: '240701031' },
  ];

  return (
    <div 
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-us-title"
    >
      {/* Backdrop gelap tembus pandang */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative z-10 w-full max-w-lg bg-[#e5e0d1] border-4 border-[#292524] shadow-[8px_8px_0px_#292524] p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header dengan gaya stempel/koran lama */}
        <div className="bg-[#292524] text-[#e5e0d1] px-6 py-4 text-center relative">
          <h2 
            id="about-us-title" 
            className="text-2xl md:text-3xl font-serif font-black uppercase tracking-[0.2em]"
          >
            About Us
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px w-8 bg-[#b45309]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d6cbb8]">
              Development Team
            </span>
            <div className="h-px w-8 bg-[#b45309]" />
          </div>
          
          {/* Tombol Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-[#e5e0d1] hover:text-[#b45309] transition-colors text-2xl font-bold"
            aria-label="Tutup modal"
          >
            ×
          </button>
        </div>
        
        {/* Body */}
        <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
          {/* Deskripsi Project */}
          <div className="mb-4 pb-4 border-b-2 border-dashed border-[#292524]/30">
            <p className="text-xs md:text-sm text-[#44403c] font-serif italic text-center leading-relaxed">
              "Website edukasi budaya Pulau Sumatera yang dibuat sebagai proyek 
              <span className="font-bold text-[#b45309]"> Cultural Awareness</span>. 
              Menampilkan kekayaan tradisi, makanan, dan pakaian adat dari berbagai provinsi."
            </p>
          </div>
          
          {/* Team Members */}
          <div className="space-y-2">
            <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#78716c] mb-3">
              — Team Members —
            </h3>
            
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-[#f5f5f0] border-2 border-[#292524] shadow-[2px_2px_0px_#292524] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#292524] transition-all"
              >
                {/* Avatar placeholder */}
                <div className="w-9 h-9 bg-[#292524] rounded-full flex items-center justify-center text-[#e5e0d1] font-serif font-bold text-sm flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-[#292524] text-xs md:text-sm truncate">
                    {member.name}
                  </p>
                  <p className="text-[10px] text-[#78716c] font-mono tracking-wider">
                    NIM: {member.nim}
                  </p>
                </div>
                
                {/* Badge */}
                <div className="flex-shrink-0">
                  <span className="text-[7px] font-bold uppercase tracking-widest text-[#b45309] bg-[#b45309]/10 px-2 py-0.5 border border-[#b45309]">
                    Developer
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-[#292524]/20 text-center">
            <p className="text-[10px] text-[#78716c] uppercase tracking-[0.2em] font-bold">
              Universitas Sumatera Utara • 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Tombol About Us - Fixed di pojok kiri atas */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-2 px-4 py-2 bg-[#e5e0d1] border-2 border-[#292524] shadow-[4px_4px_0px_#292524] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#292524] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-200 group"
        aria-label="Tentang Kami"
      >
        {/* Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-4 h-4 text-[#292524] group-hover:text-[#b45309] transition-colors"
        >
          <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
          <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
        </svg>
        
        {/* Text */}
        <span className="text-xs font-black uppercase tracking-widest text-[#292524] group-hover:text-[#b45309] transition-colors hidden md:inline">
          About Us
        </span>
      </button>

      {/* Modal */}
      <AboutUsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default AboutUsButton;
