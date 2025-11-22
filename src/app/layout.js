import { Cinzel, Inter } from "next/font/google"; 
import "./globals.css";
import GlobalAudio from "./components/GlobalAudio"; 
import { AudioProvider } from "../context/AudioContext"; // 1. Import Provider

// ... (font settings & metadata sama) ...

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`...`}>
        
        {/* 2. BUNGKUS SEMUANYA PAKAI PROVIDER */}
        <AudioProvider>
            <GlobalAudio /> 
            {children}
        </AudioProvider>

      </body>
    </html>
  );
}