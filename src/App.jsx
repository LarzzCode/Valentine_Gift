import React, { useState, useEffect } from 'react';

export default function App() {
  const [stage, setStage] = useState('chaos'); 
  const [bloomed, setBloomed] = useState(false);
  const [clickCount, setClickCount] = useState(0); 
  const [showLetter, setShowLetter] = useState(false);
  
  const [envelopes, setEnvelopes] = useState(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90,
      top: Math.random() * 90,
      rotate: Math.random() * 360,
      speed: Math.random() * 5 + 2,
    }))
  );

  const [goldPos, setGoldPos] = useState({ left: 50, top: 50 });

  useEffect(() => {
    if (stage === 'bloom') {
      const bloomTimer = setTimeout(() => {
        setBloomed(true);
      }, 100);

      const letterTimer = setTimeout(() => {
        setShowLetter(true);
      }, 5500); // Muncul setelah batang & bunga selesai animasi

      return () => {
        clearTimeout(bloomTimer);
        clearTimeout(letterTimer);
      };
    }
  }, [stage]);

  const handleGoldClick = (e) => {
    e.stopPropagation();
    if (clickCount < 4) {
      const newSpams = Array.from({ length: 5 }).map((_, i) => ({
        id: `extra-${clickCount}-${i}`,
        left: Math.random() * 90,
        top: Math.random() * 90,
        rotate: Math.random() * 360,
        speed: Math.random() * 3 + 1,
      }));
      setEnvelopes(prev => [...prev, ...newSpams]);
      setGoldPos({ left: Math.random() * 80 + 10, top: Math.random() * 80 + 10 });
      setClickCount(prev => prev + 1);
    } else {
      setStage('bloom');
    }
  };

  const NeonRose = ({ x, y, scale, rotation, delay }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      <g 
        className="origin-center transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1)" 
        style={{ 
          transitionDelay: `${2.2 + delay}s`, 
          transform: bloomed ? 'scale(1)' : 'scale(0)',
          opacity: bloomed ? 1 : 0
        }}
      >
         <path d="M-10 10 Q 0 25 10 10 L 0 5 Z" fill="#0f766e" />
         <g className="animate-pulse-slow">
            <ellipse cx="0" cy="-5" rx="45" ry="40" fill="url(#roseGradNight)" transform="rotate(-10)" opacity="0.9"/>
            <ellipse cx="0" cy="-5" rx="45" ry="40" fill="url(#roseGradNight)" transform="rotate(10)" opacity="0.9"/>
            <path d="M0 10 Q -50 -30 0 -60 Q 50 -30 0 10" fill="url(#roseGradNight)"/>
            <g transform="translate(0, -20)">
               <circle cx="0" cy="0" r="20" fill="url(#roseGradNight)" />
               <path d="M-10 5 Q 0 15 10 5 Q 15 -5 5 -10 Q -5 -15 -15 -5 Q -20 5 -10 15" 
                     fill="none" stroke="#fbcfe8" strokeWidth="2" opacity="0.9" filter="url(#glow)" />
            </g>
         </g>
      </g>
    </g>
  );

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-black overflow-hidden flex flex-col items-center select-none touch-manipulation">
      
      {/* FASE 1: CHAOS */}
      {stage === 'chaos' && (
        <div className="absolute inset-0 z-[100] bg-[#0a0a0a]">
          {envelopes.map((env) => (
            <div key={env.id} className="absolute pointer-events-none opacity-40" style={{ left: `${env.left}%`, top: `${env.top}%`, transform: `rotate(${env.rotate}deg)`, animation: `shake ${env.speed}s infinite ease-in-out` }}>
              <div className="w-16 h-10 bg-gray-600 rounded border border-gray-400 flex items-center justify-center">
                <span className="text-[8px] text-gray-300 font-mono">SPAM</span>
              </div>
            </div>
          ))}
          <div onClick={handleGoldClick} className="absolute z-[110] cursor-pointer transition-all duration-300 active:scale-75" style={{ left: `${goldPos.left}%`, top: `${goldPos.top}%`, animation: 'bounce 1s infinite' }}>
            <div className="relative w-20 h-14 bg-gradient-to-br from-yellow-400 to-amber-700 rounded shadow-[0_0_25px_rgba(251,191,36,0.9)] border-2 border-yellow-200 flex items-center justify-center">
               <span className="text-xl">🌟</span>
            </div>
          </div>
        </div>
      )}

      {/* FASE 2: BLOOM & SURAT */}
      <div className={`w-full h-full transition-opacity duration-1000 ${stage === 'bloom' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1b0524_0%,_#000000_100%)]"></div>
        
        {/* Love Particles - WARNA PINK FIXED */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(25)].map((_, i) => (
            <div key={'h'+i} className="absolute text-pink-400 animate-float-hearts shadow-pink-glow" style={{ left: `${Math.random()*100}%`, bottom: '-10%', fontSize: `${Math.random() * 1.5 + 0.8}rem`, animationDelay: `${Math.random()*5}s`, animationDuration: `${Math.random()*5 + 5}s` }}>❤</div>
          ))}
          {[...Array(15)].map((_, i) => (
            <div key={'f'+i} className="absolute rounded-full bg-yellow-200 animate-firefly" style={{ width: '3px', height: '3px', left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}/>
          ))}
        </div>

        {/* SURAT RAHASIA */}
        <div className={`fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md transition-all duration-1000 ${showLetter ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
           <div className="bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-left relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
              <h2 className="text-2xl font-bold text-pink-300 mb-5 italic">Dear Herrr</h2>
              <div className="text-pink-100/90 leading-relaxed font-light italic text-sm space-y-4">
                <p>Hai, sengaja banget aku bikin ribet di awal pakai amplop-amplop tadi, soalnya aku ingin pas bunganya mekar, kamu benar-benar bisa ngerasain bedanya. Makasih banyak ya sudah sabar melewati kekacauan itu, dan makasih juga karena kamu sudah selalu ada buat aku.</p>
                <p>Aku cuma mau bilang kalau aku akan selalu ada di sini. Kapan pun kamu punya cerita, keluh kesah, atau apa pun itu, aku bakal senang banget untuk dengerin semuanya. Semoga kamu selalu jadi orang favorit di hidupku, dan sebaliknya pun begitu.</p>
                <p>Jujur aku nggak sejago itu menyusun kata-kata manis, tapi yang jelas, semangat terus ya buat hari-hari kamu! Aku berharap banget kita bisa segera ketemu lagi.</p>
                <p className="text-xs opacity-50 pt-2 border-t border-white/10">kfksjlajfsjfasjfasfadj... puyeng + ngantuk banget. Baiii! </p>
              </div>
              <button onClick={() => setShowLetter(false)} className="mt-8 w-full py-3 bg-pink-600/40 hover:bg-pink-500/60 text-white rounded-2xl text-xs transition-all border border-pink-400/30 font-bold tracking-widest uppercase">Baiii Baiii</button>
           </div>
        </div>

        <div className={`absolute top-[12%] z-20 w-full text-center px-4 transition-all duration-[1500ms] ${bloomed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-300 to-rose-600 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] italic">Haiiiiiii,,, Thiss Flower Forr Herrr</h1> <br />

          <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-300 to-rose-600 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] italic">Tunggu, jangan di close dulu</h1>
        </div>

        {/* BUKET RESPONSIVE */}
        <div className="absolute bottom-0 w-full h-[75dvh] flex items-end justify-center">
          <svg viewBox="0 0 400 650" preserveAspectRatio="xMidYMax meet" className="w-full h-full overflow-visible z-20">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <linearGradient id="stemGradNeon" x1="0%" y1="100%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#0f766e" /><stop offset="100%" stopColor="#2dd4bf" /></linearGradient>
              <radialGradient id="roseGradNight" cx="50%" cy="40%" r="80%"><stop offset="0%" stopColor="#fce7f3" /><stop offset="100%" stopColor="#be123c" /></radialGradient>
            </defs>
            <g filter="url(#glow)" className={`origin-bottom transition-all duration-[2000ms] ${bloomed ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
              <path d="M200 650 Q 180 500 120 350" fill="none" stroke="url(#stemGradNeon)" strokeWidth="5" strokeLinecap="round" />
              <path d="M200 650 Q 220 500 280 350" fill="none" stroke="url(#stemGradNeon)" strokeWidth="5" strokeLinecap="round" />
              <path d="M200 650 Q 190 450 200 250" fill="none" stroke="url(#stemGradNeon)" strokeWidth="6" strokeLinecap="round" />
            </g>
            <NeonRose x={120} y={350} scale={0.75} rotation={-25} delay={0.2} />
            <NeonRose x={280} y={350} scale={0.75} rotation={25} delay={0.4} />
            <NeonRose x={200} y={250} scale={1} rotation={0} delay={0.8} />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes shake { 0% { transform: translate(1px, 1px); } 50% { transform: translate(-2px, 2px); } 100% { transform: translate(1px, -1px); } }
        @keyframes float-hearts { 0% { transform: translateY(0) rotate(0); opacity: 0; } 20% { opacity: 0.8; } 100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; } }
        @keyframes firefly { 0%, 100% { transform: translate(0, 0); opacity: 0.5; } 50% { transform: translate(30px, -30px); opacity: 1; } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-float-hearts { animation: float-hearts linear infinite; }
        .animate-firefly { animation: firefly ease-in-out infinite alternate; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .shadow-pink-glow { text-shadow: 0 0 12px rgba(244, 114, 182, 0.9); }
      `}</style>
    </div>
  );
}