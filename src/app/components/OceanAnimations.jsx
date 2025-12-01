"use client";

import React, { useEffect, useState } from 'react';

// Komponen Ikan Kecil (SVG sederhana)
const Fish = ({ style, direction }) => (
  <svg 
    width="16" 
    height="10" 
    viewBox="0 0 20 12" 
    fill="currentColor"
    className="text-[#0c4a6e]/50"
    style={{ 
      ...style, 
      transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
    }}
  >
    <ellipse cx="10" cy="6" rx="8" ry="4" />
    <polygon points="18,6 22,2 22,10" />
    <circle cx="5" cy="5" r="1" fill="#1e3a5f" />
  </svg>
);

// Komponen Kapal Kecil (SVG sederhana)
const Boat = ({ style, direction }) => (
  <svg 
    width="20" 
    height="14" 
    viewBox="0 0 24 16" 
    fill="currentColor"
    style={{ 
      ...style, 
      transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
    }}
  >
    {/* Badan kapal */}
    <path d="M2 12 L4 16 L20 16 L22 12 Z" fill="#7c5e48" />
    {/* Tiang */}
    <rect x="11" y="4" width="2" height="8" fill="#5D3A1A" />
    {/* Layar */}
    <path d="M13 4 L13 10 L20 10 Z" fill="#e8e4d9" />
  </svg>
);

// Data posisi animasi - SEMUA jalur berada DI DALAM area oval biru
const animationPaths = [
  // Ikan di area kiri atas (dalam oval)
  { type: 'fish', startX: 5, startY: 25, endX: 30, endY: 30, duration: 20, delay: 0 },
  // Ikan di area kanan atas (dalam oval)
  { type: 'fish', startX: 95, startY: 30, endX: 70, endY: 25, duration: 22, delay: 4 },
  // Kapal di area atas tengah (dalam oval)
  { type: 'boat', startX: 15, startY: 15, endX: 40, endY: 18, duration: 30, delay: 2 },
  // Ikan di area kiri tengah (dalam oval)
  { type: 'fish', startX: 8, startY: 50, endX: 25, endY: 55, duration: 18, delay: 8 },
  // Ikan di area kanan bawah (dalam oval)
  { type: 'fish', startX: 92, startY: 65, endX: 70, endY: 70, duration: 24, delay: 6 },
  // Kapal di area bawah (dalam oval)
  { type: 'boat', startX: 85, startY: 80, endX: 60, endY: 82, duration: 28, delay: 12 },
  // Ikan di area bawah kiri (dalam oval)
  { type: 'fish', startX: 12, startY: 75, endX: 35, endY: 78, duration: 19, delay: 10 },
];

const OceanAnimations = () => {
  const [items, setItems] = useState([]);

  // Generate items hanya di client side untuk menghindari hydration error
  useEffect(() => {
    setItems(animationPaths.map((path, index) => ({
      ...path,
      id: index,
      direction: path.startX < path.endX ? 'right' : 'left'
    })));
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1] rounded-[50%]">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute animate-swim"
          style={{
            '--start-x': `${item.startX}%`,
            '--start-y': `${item.startY}%`,
            '--end-x': `${item.endX}%`,
            '--end-y': `${item.endY}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {item.type === 'fish' ? (
            <Fish direction={item.direction} />
          ) : (
            <Boat direction={item.direction} />
          )}
        </div>
      ))}
    </div>
  );
};

export default OceanAnimations;
