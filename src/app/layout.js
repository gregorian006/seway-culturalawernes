import { Cinzel, Inter } from "next/font/google"; 
import "./globals.css";
import GlobalAudio from "./components/GlobalAudio"; 
import { AudioProvider } from "../context/AudioContext";
import AuthProvider from "./components/AuthProvider";

// Font Configuration
const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

// Metadata untuk SEO
export const metadata = {
  title: "S.E.A.W.A.Y - Sumatra Exploration & Arts Website for All Youth",
  description: "Jelajahi kekayaan budaya pulau Sumatera melalui peta interaktif. Temukan tradisi, makanan, dan pakaian adat dari berbagai suku.",
  keywords: "budaya sumatera, batak, minangkabau, aceh, tradisi indonesia, seaway, youth culture",
  authors: [{ name: "Cultural Awareness Project" }],
  openGraph: {
    title: "S.E.A.W.A.Y - Sumatra Exploration & Arts Website for All Youth",
    description: "Explore the rich cultural heritage of Sumatra Island through interactive map",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#d6cbb8] text-[#292524] selection:bg-[#b45309] selection:text-white">
        
        {/* Skip to content link untuk accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-99999 focus:px-4 focus:py-2 focus:bg-[#292524] focus:text-white focus:font-bold"
        >
          Skip to main content
        </a>

        <AuthProvider>
          <AudioProvider>
              <GlobalAudio /> 
              <main id="main-content">
                {children}
              </main>
          </AudioProvider>
        </AuthProvider>

      </body>
    </html>
  );
}