import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, BookOpen, Feather, X, Heart, Star } from 'lucide-react';

const HIKMAH_QUOTES = [
  '“Malaikat Raqib senantiasa siap mencatat setiap niat tulus dan senyum sedekahmu.”',
  '“Mawas diri adalah lentera di kala sepi, menjaga kejujuran walau tiada manusia melihat.”',
  '“Setiap detik waktu adalah kesempatan untuk menorehkan kebaikan baru.”',
  '“Iman kepada malaikat menumbuhkan rasa aman, tenang, dan terlindungi.”',
  '“Introspeksi hari ini adalah jalan menuju pribadi yang lebih mulia esok hari.”',
  '“Belajar dengan sungguh-sungguh adalah bentuk ibadah dan amanah yang mulia.”'
];

export const InteractiveFloatingAmbience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Bird state
  const [birdCycle, setBirdCycle] = useState<number>(0);
  const [birdMessage, setBirdMessage] = useState<string | null>(null);

  // Walking Pencil state
  const [pencilCycle, setPencilCycle] = useState<number>(0);
  const [pencilMessage, setPencilMessage] = useState<string | null>(null);

  // Floating Open Book Pop-up state
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
  const [hikmahIndex, setHikmahIndex] = useState<number>(0);

  // Trigger bird flight every 20 seconds
  useEffect(() => {
    if (shouldReduceMotion) return;
    const birdInterval = setInterval(() => {
      setBirdCycle((prev) => prev + 1);
    }, 22000);

    return () => clearInterval(birdInterval);
  }, [shouldReduceMotion]);

  // Trigger walking pencil every 26 seconds (offset from bird)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const pencilTimer = setTimeout(() => {
      setPencilCycle(1);
      const pencilInterval = setInterval(() => {
        setPencilCycle((prev) => prev + 1);
      }, 26000);
      return () => clearInterval(pencilInterval);
    }, 9000);

    return () => clearTimeout(pencilTimer);
  }, [shouldReduceMotion]);

  // Handle clicking the flying bird
  const handleBirdClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    });
    setBirdMessage('🕊️ "Semangat Belajar, Teman-teman!"');
    setTimeout(() => setBirdMessage(null), 3500);
  };

  // Handle clicking the walking pencil
  const handlePencilClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    });
    setPencilMessage('✏️ "Catat amalan baikmu hari ini!"');
    setTimeout(() => setPencilMessage(null), 3500);
  };

  const handleNextHikmah = () => {
    setHikmahIndex((prev) => (prev + 1) % HIKMAH_QUOTES.length);
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x: 0.9, y: 0.85 }
    });
  };

  return (
    <>
      {/* =========================================================================
          1. BURUNG MERPATI PUTIH TERBANG MELINTAS SECARA BERKALA (FLYING DOVE)
      ========================================================================= */}
      {!shouldReduceMotion && birdCycle > 0 && (
        <div className="fixed top-12 left-0 w-full pointer-events-none z-30 overflow-hidden h-28">
          <motion.div
            key={`bird-${birdCycle}`}
            initial={{ x: '-10vw', y: 15, opacity: 0 }}
            animate={{
              x: '110vw',
              y: [15, 35, 10, 30, 15],
              opacity: [0, 1, 1, 1, 0]
            }}
            transition={{
              duration: 14,
              ease: 'linear'
            }}
            className="absolute top-2 pointer-events-auto cursor-pointer group"
            onClick={handleBirdClick}
            title="Klik burung pembawa kabar baik!"
          >
            <div className="relative flex items-center gap-1.5">
              {/* White Bird SVG with flapping wings */}
              <svg width="46" height="34" viewBox="0 0 60 45" fill="none" className="filter drop-shadow-sm">
                {/* Bird Body */}
                <ellipse cx="28" cy="24" rx="14" ry="9" fill="#FFFFFF" stroke="#AFC4D5" strokeWidth="1.5" />
                {/* Bird Head */}
                <circle cx="42" cy="19" r="6" fill="#FFFFFF" stroke="#AFC4D5" strokeWidth="1.5" />
                {/* Beak (Yellow golden) */}
                <polygon points="48,18 55,20 48,22" fill="#F59E0B" />
                {/* Cute Eye */}
                <circle cx="43" cy="18" r="1.2" fill="#3F4147" />
                {/* Wing with flapping animation */}
                <motion.g
                  animate={{
                    rotate: [-20, 25, -20],
                    originX: '24px',
                    originY: '20px'
                  }}
                  transition={{
                    duration: 0.35,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <path
                    d="M 22 22 C 18 10, 32 4, 38 10 C 35 16, 28 20, 22 22 Z"
                    fill="#F8FAFC"
                    stroke="#AFC4D5"
                    strokeWidth="1.2"
                  />
                </motion.g>
                {/* Tail feathers */}
                <path d="M 14 24 L 4 20 L 7 26 L 3 28 L 14 26 Z" fill="#F1F5F9" stroke="#AFC4D5" strokeWidth="1" />
                {/* Olive branch / leaf in beak */}
                <path d="M 50 20 Q 56 16 58 14 Q 54 18 51 21" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Sparkle Trail */}
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="text-amber-400"
              >
                <Sparkles size={13} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bird Pop-up Speech Toast when clicked */}
      <AnimatePresence>
        {birdMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-white/95 border-2 border-emerald-300 text-emerald-950 px-4 py-2 rounded-2xl shadow-lg text-xs font-bold flex items-center gap-2 pointer-events-none"
          >
            <Feather size={14} className="text-emerald-600" />
            <span>{birdMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          2. PENSIL CERIA BERJALAN MELINTAS DI BAWAH (WALKING/GLIDING PENCIL)
      ========================================================================= */}
      {!shouldReduceMotion && pencilCycle > 0 && (
        <div className="fixed bottom-14 left-0 w-full pointer-events-none z-30 overflow-hidden h-20">
          <motion.div
            key={`pencil-${pencilCycle}`}
            initial={{ x: '-15vw', opacity: 0 }}
            animate={{
              x: '115vw',
              opacity: [0, 1, 1, 1, 0]
            }}
            transition={{
              duration: 16,
              ease: 'linear'
            }}
            className="absolute bottom-2 pointer-events-auto cursor-pointer group"
            onClick={handlePencilClick}
            title="Klik pensil rajin mencatat!"
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [4, -4, 4]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="flex items-center gap-1.5"
            >
              {/* Cute Smiling Pencil SVG */}
              <svg width="48" height="32" viewBox="0 0 65 36" fill="none" className="filter drop-shadow-sm">
                {/* Pencil Pink Eraser */}
                <rect x="4" y="10" width="10" height="16" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1.2" />
                {/* Metal Ferrule */}
                <rect x="14" y="10" width="6" height="16" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.2" />
                {/* Pencil Body Yellow */}
                <rect x="20" y="10" width="28" height="16" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
                {/* Stripe on body */}
                <line x1="20" y1="18" x2="48" y2="18" stroke="#F59E0B" strokeWidth="1.5" />
                {/* Cute Smiling Face on Pencil */}
                <circle cx="31" cy="15" r="1.2" fill="#3F4147" />
                <circle cx="38" cy="15" r="1.2" fill="#3F4147" />
                <path d="M 33 19 Q 34.5 22 36 19" stroke="#3F4147" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                {/* Wood Tip */}
                <polygon points="48,10 60,18 48,26" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
                {/* Graphite Lead Tip */}
                <polygon points="56,15 62,18 56,21" fill="#334155" />
                {/* Little cartoon walking feet */}
                <ellipse cx="26" cy="28" rx="3.5" ry="2" fill="#3F4147" />
                <ellipse cx="42" cy="28" rx="3.5" ry="2" fill="#3F4147" />
              </svg>

              {/* Sparkling Golden Note */}
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs whitespace-nowrap hidden sm:inline">
                Rajin Belajar! ✏️
              </span>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Pencil Pop-up Toast when clicked */}
      <AnimatePresence>
        {pencilMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-white/95 border-2 border-amber-300 text-amber-950 px-4 py-2 rounded-2xl shadow-lg text-xs font-bold flex items-center gap-2 pointer-events-none"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span>{pencilMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          3. BUKU TERBUKA INTERAKTIF POP-UP / FLOATING WIDGET
          - Pojok kanan bawah di atas bottom navigation
          - Memiliki animasi helai halaman berkedip lembut
          - Ketika diklik membuka "Mutiara Hikmah & Catatan Kebaikan"
      ========================================================================= */}
      <div className="fixed bottom-16 right-4 sm:right-6 z-30">
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsBookOpen(true)}
          className="relative flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer group border-2 border-amber-200"
          title="Buka Mutiara Hikmah Malaikat"
          aria-label="Buku Mutiara Hikmah"
        >
          {/* Animated Glowing Aura */}
          <div className="absolute -inset-1 rounded-2xl bg-amber-400/30 blur-sm -z-10 group-hover:bg-amber-400/50 transition-all" />

          {/* Book Icon with fluttering page animation */}
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
              y: [0, -2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative"
          >
            <BookOpen size={18} className="text-amber-100 fill-amber-200/40" />
            <motion.span
              animate={{ opacity: [0, 1, 0], scale: [0.7, 1.2, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-1 -right-1 text-yellow-200"
            >
              ✦
            </motion.span>
          </motion.div>

          <span className="text-xs font-bold hidden sm:inline tracking-wide text-white">
            Mutiara Hikmah
          </span>
        </motion.button>
      </div>

      {/* Modal / Dialog: Mutiara Hikmah & Pengingat Mawas Diri */}
      <AnimatePresence>
        {isBookOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4147]/60 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              className="relative w-full max-w-md rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-white via-[#FAF7F4] to-[#F5EFE6] p-6 shadow-2xl text-center space-y-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsBookOpen(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-[#3F4147]/60 hover:text-[#3F4147] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>

              {/* Book Header Illustration */}
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                <BookOpen size={28} />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                  Buku Catatan Hikmah
                </span>
                <h3 className="font-serif-display text-xl sm:text-2xl text-[#3F4147] mt-0.5 font-bold">
                  Renungan Mawas Diri
                </h3>
              </div>

              {/* Hikmah Quote Card */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs text-left relative overflow-hidden">
                <div className="absolute top-2 right-2 text-amber-200/60 font-serif text-4xl select-none leading-none">
                  “
                </div>
                <p className="font-serif-display text-base sm:text-lg text-[#3F4147] italic leading-relaxed relative z-10">
                  {HIKMAH_QUOTES[hikmahIndex]}
                </p>
                <div className="mt-3 pt-2 border-t border-[#AFC4D5]/20 flex items-center justify-between text-[11px] text-[#3F4147]/70">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500 fill-amber-400" />
                    <span>Hikmah ke-{hikmahIndex + 1} dari {HIKMAH_QUOTES.length}</span>
                  </span>
                  <span className="font-medium text-[#88AB8E]">PAI Kelas VII</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-1">
                <button
                  onClick={handleNextHikmah}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Buka Hikmah Lain</span>
                </button>

                <button
                  onClick={() => setIsBookOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#AFC4D5]/40 text-[#3F4147] font-semibold text-xs hover:bg-[#FAF7F4] active:scale-95 transition-all cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
