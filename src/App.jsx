import React, { useState, useEffect } from 'react';

// --- BAGIAN 1: CSS & ANIMASI TAMBAHAN ---
// Kita injek style manual untuk animasi yang smooth di HP kentang
const customStyles = `
  @keyframes growUp {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
  @keyframes bloom {
    0% { transform: scale(0); opacity: 0; }
    80% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }
  .animate-grow-stem { animation: growUp 1s ease-out forwards; transform-origin: bottom; }
  .animate-bloom-1 { animation: bloom 0.8s ease-out 0.5s forwards; opacity: 0; }
  .animate-bloom-2 { animation: bloom 0.8s ease-out 0.7s forwards; opacity: 0; }
  .animate-bloom-3 { animation: bloom 1s ease-out 1s forwards; opacity: 0; }
  .animate-float { animation: float 3s ease-in-out infinite; }
`;

// --- BAGIAN 2: KOMPONEN HALAMAN BUNGA (THE MASTERPIECE) ---
const FlowerPage = ({ onReplay }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-pink-100 via-purple-50 to-white flex flex-col items-center justify-center text-center p-4 animate-fade-in">
      <style>{customStyles}</style>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] text-2xl animate-pulse">✨</div>
        <div className="absolute top-[20%] right-[20%] text-xl animate-pulse delay-700">✨</div>
        <div className="absolute bottom-[30%] left-[20%] text-3xl animate-pulse delay-300">💖</div>
      </div>

      {/* --- THE ULTIMATE FLOWER SVG --- */}
      <div className="relative w-72 h-80 mb-8 animate-float">
        <svg viewBox="0 0 300 400" className="w-full h-full overflow-visible drop-shadow-2xl">
          <defs>
            <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff9a9e" />
              <stop offset="100%" stopColor="#fecfef" />
            </linearGradient>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a8e063" />
              <stop offset="100%" stopColor="#56ab2f" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Kertas Buket (Wrapping) */}
          <path d="M150 400 L50 250 L250 250 Z" fill="#fff0f5" stroke="#fbcfe8" strokeWidth="2" />
          <path d="M50 250 Q 150 300 250 250" fill="#fce7f3" />

          {/* Batang & Daun (Group) */}
          <g className="animate-grow-stem">
            <path d="M150 350 L100 150" stroke="#56ab2f" strokeWidth="4" strokeLinecap="round" />
            <path d="M150 350 L200 150" stroke="#56ab2f" strokeWidth="4" strokeLinecap="round" />
            <path d="M150 350 L150 120" stroke="#56ab2f" strokeWidth="4" strokeLinecap="round" />
            
            {/* Daun-daun */}
            <path d="M150 250 Q 100 250 80 200 Q 120 220 150 250" fill="url(#leafGradient)" />
            <path d="M150 250 Q 200 250 220 200 Q 180 220 150 250" fill="url(#leafGradient)" />
          </g>

          {/* Bunga Kiri (Tulip) */}
          <g className="animate-bloom-1" transform="translate(100, 150) rotate(-15)">
            <path d="M0 0 Q -15 -20 0 -40 Q 15 -20 0 0" fill="#ff9a9e" />
            <path d="M-10 -10 Q 0 -30 10 -10" fill="#ffc3a0" opacity="0.8" />
          </g>

          {/* Bunga Kanan (Tulip) */}
          <g className="animate-bloom-2" transform="translate(200, 150) rotate(15)">
            <path d="M0 0 Q -15 -20 0 -40 Q 15 -20 0 0" fill="#ff9a9e" />
            <path d="M-10 -10 Q 0 -30 10 -10" fill="#ffc3a0" opacity="0.8" />
          </g>

          {/* Bunga Tengah (Mawar Besar) */}
          <g className="animate-bloom-3" transform="translate(150, 120)">
            {/* Kelopak Luar */}
            <circle cx="0" cy="0" r="40" fill="url(#roseGradient)" filter="url(#glow)" />
            <circle cx="-15" cy="-10" r="30" fill="#ffdde1" opacity="0.8" />
            <circle cx="15" cy="-10" r="30" fill="#ffdde1" opacity="0.8" />
            <circle cx="0" cy="15" r="30" fill="#ffdde1" opacity="0.8" />
            {/* Spiral Tengah */}
            <path d="M-10 -5 Q 0 -20 10 -5 Q 0 10 -10 -5" fill="none" stroke="#e11d48" strokeWidth="2" />
          </g>

          {/* Pita Pemanis */}
          <g transform="translate(150, 280)" className="animate-bloom-3">
             <path d="M0 0 Q 20 -20 40 0 L 30 20 Z" fill="#f43f5e" />
             <path d="M0 0 Q -20 -20 -40 0 L -30 20 Z" fill="#f43f5e" />
             <circle cx="0" cy="0" r="8" fill="#fb7185" />
          </g>
        </svg>
      </div>

      {/* Kartu Ucapan Glassmorphism */}
      <div className="bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-xl max-w-xs animate-bloom-3 delay-1000">
        <h1 className="font-serif text-2xl font-bold text-pink-600 mb-2">Happy Valentine!</h1>
        <p className="text-gray-700 text-sm leading-relaxed font-sans">
          Bunga ini spesial buat teman terbaikku. Semoga harimu seindah warna bunga ini ya!
          <br/>
          <span className="text-xs text-gray-500 mt-2 block"> (Stay awesome!) </span>
        </p>
      </div>

      {/* Tombol Back */}
      <button 
        onClick={onReplay}
        className="mt-8 px-6 py-2 rounded-full bg-white text-pink-500 text-sm font-bold shadow-md hover:bg-pink-50 transition-all animate-bloom-3 delay-[1500ms]"
      >
        Ulangi Lagi ↺
      </button>
    </div>
  );
};

// --- BAGIAN 3: APP UTAMA (GRID KADO) ---
export default function App() {
  const [winningId, setWinningId] = useState(null);
  const [isWinner, setIsWinner] = useState(false); // State untuk pindah halaman
  const [shakingBox, setShakingBox] = useState(null);

  useEffect(() => {
    // Randomize winner 1-4
    setWinningId(Math.floor(Math.random() * 4) + 1);
  }, [isWinner]); // Reset winner setiap kali main ulang

  const handleBoxClick = (id) => {
    if (id === winningId) {
      // Logic MENANG: Delay dikit biar ada efek klik, lalu pindah halaman
      setTimeout(() => setIsWinner(true), 300);
    } else {
      // Logic KALAH: Getarkan box
      setShakingBox(id);
      setTimeout(() => setShakingBox(null), 500);
    }
  };

  const handleReplay = () => {
    setIsWinner(false);
    setWinningId(Math.floor(Math.random() * 4) + 1);
  };

  // Kalau menang, tampilkan Halaman Bunga (Full Screen Overlay)
  if (isWinner) {
    return <FlowerPage onReplay={handleReplay} />;
  }

  // Halaman Kado (Default)
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-pink-600 mb-2">Pilih Kado Valentine 🎁</h2>
        <p className="text-gray-500 text-xs">Cari satu kotak yang berisi bunga!</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            onClick={() => handleBoxClick(id)}
            className={`
              w-36 h-36 bg-white rounded-2xl shadow-[0_10px_20px_rgba(255,182,193,0.4)]
              flex items-center justify-center text-5xl cursor-pointer
              transition-all duration-300 border-b-4 border-pink-200
              hover:-translate-y-2 hover:shadow-xl active:scale-95 active:border-b-0
              ${shakingBox === id ? 'animate-wiggle bg-red-50' : ''}
            `}
          >
            {shakingBox === id ? '💨' : '🎁'}
          </div>
        ))}
      </div>

      {/* Style CSS Lokal untuk wiggle effect */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          75% { transform: translateX(5px) rotate(5deg); }
        }
        .animate-wiggle { animation: wiggle 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}