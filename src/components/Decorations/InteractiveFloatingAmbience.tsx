import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  BookOpen,
  Feather,
  X,
  Heart,
  Star,
  CheckCircle2,
  CheckSquare,
  Square,
  HelpCircle,
  Award,
  Smile,
  FileText
} from 'lucide-react';

const HIKMAH_QUOTES = [
  '“Malaikat Raqib senantiasa siap mencatat setiap niat tulus dan senyum sedekahmu.”',
  '“Mawas diri adalah lentera di kala sepi, menjaga kejujuran walau tiada manusia melihat.”',
  '“Setiap detik waktu adalah kesempatan untuk menorehkan kebaikan baru.”',
  '“Iman kepada malaikat menumbuhkan rasa aman, tenang, dan terlindungi.”',
  '“Introspeksi hari ini adalah jalan menuju pribadi yang lebih mulia esok hari.”',
  '“Belajar dengan sungguh-sungguh adalah bentuk ibadah dan amanah yang mulia.”'
];

interface Riddle {
  id: number;
  clue: string;
  options: string[];
  correctIdx: number;
  reaction: string;
}

const CUTE_RIDDLES: Riddle[] = [
  {
    id: 1,
    clue: '✨ Aku diciptakan Allah dari cahaya (nur), tidak pernah lelah, dan selalu patuh tanpa pernah membantah. Siapakah aku?',
    options: ['Malaikat Allah', 'Manusia', 'Burung Merpati'],
    correctIdx: 0,
    reaction: 'Benar sekali! Hebat, malaikat diciptakan dari cahaya dan selalu taat! 🌟'
  },
  {
    id: 2,
    clue: '📝 Aku selalu berada di sebelah kananmu, tersenyum mencatat setiap kata baik dan amal salihmu. Siapakah namaku?',
    options: ['Malaikat Atid', 'Malaikat Raqib', 'Malaikat Malik'],
    correctIdx: 1,
    reaction: 'Mumtaz! Malaikat Raqib pencatat kebaikanmu yang setia! 💖'
  },
  {
    id: 3,
    clue: '🌧️ Atas izin Allah, aku mengantarkan tetesan hujan yang menyuburkan bumi dan membagikan rezeki. Siapakah aku?',
    options: ['Malaikat Jibril', 'Malaikat Israfil', 'Malaikat Mikail'],
    correctIdx: 2,
    reaction: 'MasyaAllah tepat! Malaikat Mikail pembawa berkah rezeki dan hujan! 🌿'
  },
  {
    id: 4,
    clue: '🎺 Aku senantiasa menanti titah Allah sambil memegang sangkakala untuk ditiup saat hari akhir tiba. Siapakah aku?',
    options: ['Malaikat Israfil', 'Malaikat Izrail', 'Malaikat Ridwan'],
    correctIdx: 0,
    reaction: 'Tepat sekali! Malaikat Israfil peniup sangkakala kiamat dan kebangkitan! 🎺'
  }
];

interface MissionItem {
  id: number;
  text: string;
  category: string;
}

const DAILY_MISSIONS: MissionItem[] = [
  { id: 1, text: 'Mengawali belajar dengan membaca Basmalah & doa tulus', category: 'Niat' },
  { id: 2, text: 'Jujur saat mengerjakan latihan/kuis tanpa menyontek', category: 'Mawas Diri' },
  { id: 3, text: 'Menahan diri dari ucapan kasar di kelas maupun di media sosial', category: 'Lisan' },
  { id: 4, text: 'Membantu teman atau guru dengan wajah ceria dan ikhlas', category: 'Amal Baik' },
  { id: 5, text: 'Mengakui kekhilafan, beristighfar, dan meminta maaf jika keliru', category: 'Introspeksi' }
];

export const InteractiveFloatingAmbience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Bird & Pencil state
  const [birdCycle, setBirdCycle] = useState<number>(0);
  const [birdMessage, setBirdMessage] = useState<string | null>(null);
  const [pencilCycle, setPencilCycle] = useState<number>(0);
  const [pencilMessage, setPencilMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'modul' | 'tebak' | 'misi' | 'hikmah'>('modul');

  // Hikmah state
  const [hikmahIndex, setHikmahIndex] = useState<number>(0);

  // Riddle state
  const [currentRiddleIdx, setCurrentRiddleIdx] = useState<number>(0);
  const [selectedRiddleOpt, setSelectedRiddleOpt] = useState<number | null>(null);
  const [riddleFeedback, setRiddleFeedback] = useState<string | null>(null);

  // Mission Checklist state
  const [checkedMissions, setCheckedMissions] = useState<number[]>([1]);

  // Audio chime generator using Web Audio API
  const playSoundChime = (isSuccess = true) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const freqs = isSuccess ? [523.25, 659.25, 783.99, 1046.5] : [440, 392];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {}
  };

  // Flying bird interval (every 22 seconds)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const birdInterval = setInterval(() => {
      setBirdCycle((prev) => prev + 1);
    }, 22000);
    return () => clearInterval(birdInterval);
  }, [shouldReduceMotion]);

  // Walking pencil interval (every 26 seconds)
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

  // Bird click interaction
  const handleBirdClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    });
    playSoundChime(true);
    setBirdMessage('🕊️ "Semangat Belajar, Teman-teman!"');
    setTimeout(() => setBirdMessage(null), 3500);
  };

  // Pencil click interaction
  const handlePencilClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    });
    playSoundChime(true);
    setPencilMessage('✏️ "Catat amalan baikmu hari ini!"');
    setTimeout(() => setPencilMessage(null), 3500);
  };

  const handleNextHikmah = () => {
    setHikmahIndex((prev) => (prev + 1) % HIKMAH_QUOTES.length);
    playSoundChime(true);
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x: 0.9, y: 0.85 }
    });
  };

  // Riddle answer interaction
  const handleAnswerRiddle = (optIdx: number) => {
    setSelectedRiddleOpt(optIdx);
    const riddle = CUTE_RIDDLES[currentRiddleIdx];
    if (optIdx === riddle.correctIdx) {
      playSoundChime(true);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });
      setRiddleFeedback(riddle.reaction);
    } else {
      playSoundChime(false);
      setRiddleFeedback('Hampir benar! Coba ingat-ingat lagi sifat atau tugasnya ya! 😊');
    }
  };

  const handleNextRiddle = () => {
    setSelectedRiddleOpt(null);
    setRiddleFeedback(null);
    setCurrentRiddleIdx((prev) => (prev + 1) % CUTE_RIDDLES.length);
  };

  // Mission checkbox toggle
  const toggleMission = (id: number) => {
    setCheckedMissions((prev) => {
      const isAlreadyChecked = prev.includes(id);
      const next = isAlreadyChecked ? prev.filter((item) => item !== id) : [...prev, id];
      if (!isAlreadyChecked) {
        playSoundChime(true);
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.7 }
        });
      }
      return next;
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
              <svg width="44" height="32" viewBox="0 0 60 45" fill="none" className="filter drop-shadow-sm">
                <ellipse cx="28" cy="24" rx="14" ry="9" fill="#FFFFFF" stroke="#AFC4D5" strokeWidth="1.5" />
                <circle cx="42" cy="19" r="6" fill="#FFFFFF" stroke="#AFC4D5" strokeWidth="1.5" />
                <polygon points="48,18 55,20 48,22" fill="#F59E0B" />
                <circle cx="43" cy="18" r="1.2" fill="#3F4147" />
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
                <path d="M 14 24 L 4 20 L 7 26 L 3 28 L 14 26 Z" fill="#F1F5F9" stroke="#AFC4D5" strokeWidth="1" />
                <path d="M 50 20 Q 56 16 58 14 Q 54 18 51 21" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
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

      {/* Bird Pop-up Speech Toast */}
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
          2. PENSIL CERIA BERJALAN MELINTAS DI BAWAH (WALKING PENCIL)
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
              <svg width="48" height="32" viewBox="0 0 65 36" fill="none" className="filter drop-shadow-sm">
                <rect x="4" y="10" width="10" height="16" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="1.2" />
                <rect x="14" y="10" width="6" height="16" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.2" />
                <rect x="20" y="10" width="28" height="16" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
                <line x1="20" y1="18" x2="48" y2="18" stroke="#F59E0B" strokeWidth="1.5" />
                <circle cx="31" cy="15" r="1.2" fill="#3F4147" />
                <circle cx="38" cy="15" r="1.2" fill="#3F4147" />
                <path d="M 33 19 Q 34.5 22 36 19" stroke="#3F4147" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <polygon points="48,10 60,18 48,26" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
                <polygon points="56,15 62,18 56,21" fill="#334155" />
                <ellipse cx="26" cy="28" rx="3.5" ry="2" fill="#3F4147" />
                <ellipse cx="42" cy="28" rx="3.5" ry="2" fill="#3F4147" />
              </svg>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs whitespace-nowrap hidden sm:inline">
                Rajin Belajar! ✏️
              </span>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Pencil Pop-up Toast */}
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
          3. FLOATING BUTTON: POP-UP MODUL & LEMBAR KERJA SISWA (LKPD) INTERAKTIF
      ========================================================================= */}
      <div className="fixed bottom-16 right-4 sm:right-6 z-30">
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            setIsModalOpen(true);
            playSoundChime(true);
          }}
          className="relative flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer group border-2 border-emerald-200"
          title="Buka Modul Siswa & LKPD Interaktif"
          aria-label="Buka Modul Siswa & LKPD Interaktif"
        >
          <div className="absolute -inset-1 rounded-2xl bg-emerald-400/30 blur-sm -z-10 group-hover:bg-emerald-400/50 transition-all" />

          <motion.div
            animate={{
              rotate: [0, -6, 6, 0],
              y: [0, -2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative"
          >
            <BookOpen size={18} className="text-emerald-100 fill-emerald-200/40" />
            <motion.span
              animate={{ opacity: [0, 1, 0], scale: [0.7, 1.2, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-1 -right-1 text-yellow-300 font-bold"
            >
              ✦
            </motion.span>
          </motion.div>

          <span className="text-xs font-bold tracking-wide text-white flex items-center gap-1.5">
            <span>Modul & LKPD</span>
            <span className="hidden md:inline px-1.5 py-0.2 rounded-full bg-white/25 text-[10px] font-mono">
              Fase D
            </span>
          </span>
        </motion.button>
      </div>

      {/* =========================================================================
          4. POP-UP MODAL: MODUL LENGKAP, LKPD, TEBAK-TEBAKAN & MISI MAWAS DIRI
      ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#3F4147]/70 backdrop-blur-xs overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Modul & Lembar Kerja Siswa Interaktif"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              className="relative w-full max-w-2xl my-auto max-h-[92vh] flex flex-col rounded-3xl border-2 border-emerald-300 bg-white shadow-2xl overflow-hidden"
            >
              {/* Header Bar */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-b border-[#AFC4D5]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                      Pendidikan Agama Islam · Kelas VII
                    </span>
                    <h3 className="font-serif-display text-lg sm:text-xl text-[#3F4147] font-bold mt-0.5">
                      Modul Belajar & Lembar Kerja Siswa (LKPD)
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-[#3F4147]/60 hover:text-[#3F4147] hover:bg-black/5 transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Tabs inside Popup */}
              <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-[#AFC4D5]/20 overflow-x-auto bg-[#FAF7F4] shrink-0">
                <button
                  onClick={() => setActiveTab('modul')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'modul'
                      ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                      : 'text-[#3F4147]/70 hover:text-[#3F4147]'
                  }`}
                >
                  <FileText size={13} />
                  <span>5 Materi Inti (Tujuan Pembelajaran)</span>
                </button>

                <button
                  onClick={() => setActiveTab('misi')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'misi'
                      ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                      : 'text-[#3F4147]/70 hover:text-[#3F4147]'
                  }`}
                >
                  <CheckSquare size={13} />
                  <span>Misi Mawas Diri ({checkedMissions.length}/5)</span>
                </button>

                <button
                  onClick={() => setActiveTab('tebak')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'tebak'
                      ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                      : 'text-[#3F4147]/70 hover:text-[#3F4147]'
                  }`}
                >
                  <HelpCircle size={13} />
                  <span>Teka-Teki Cilik</span>
                </button>

                <button
                  onClick={() => setActiveTab('hikmah')}
                  className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'hikmah'
                      ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                      : 'text-[#3F4147]/70 hover:text-[#3F4147]'
                  }`}
                >
                  <Heart size={13} />
                  <span>Mutiara Hikmah</span>
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
                {/* TAB 1: 5 MATERI POKOK LKPD / MODUL BELAJAR */}
                {activeTab === 'modul' && (
                  <div className="space-y-4 text-left">
                    {/* Tujuan Pembelajaran Banner */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                        <Award size={15} />
                        <span>Tujuan Pembelajaran (Fase D · Kelas VII):</span>
                      </div>
                      <p className="leading-relaxed">
                        “Peserta didik mampu memahami iman kepada malaikat Allah Swt. melalui pengertian iman kepada malaikat, dalil yang berkaitan, sifat-sifat malaikat, nama dan tugas malaikat, serta hikmah beriman kepada malaikat sebagai dasar sikap mawas diri dan muhasabah.”
                      </p>
                    </div>

                    {/* 1. Pengertian Iman */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F4] border border-[#AFC4D5]/30 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                        <h4 className="font-bold text-sm text-[#3F4147]">Pengertian Iman kepada Malaikat</h4>
                      </div>
                      <p className="text-xs text-[#3F4147]/85 leading-relaxed pl-7">
                        Meyakini dengan sepenuh hati bahwa malaikat adalah makhluk gaib ciptaan Allah Swt. dari cahaya (nur) yang senantiasa tunduk dan patuh menjalankan amanah-Nya tanpa pernah durhaka atau letih.
                      </p>
                    </div>

                    {/* 2. Dalil Naqli */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F4] border border-[#AFC4D5]/30 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                        <h4 className="font-bold text-sm text-[#3F4147]">Dalil Naqli (Al-Qur'an & Hadis)</h4>
                      </div>
                      <div className="pl-7 space-y-1.5 text-xs text-[#3F4147]/85">
                        <p className="italic bg-white p-2.5 rounded-xl border border-emerald-100">
                          “...Semuanya beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya dan rasul-rasul-Nya...” (Q.S. al-Baqarah/2:285)
                        </p>
                        <p className="leading-relaxed">
                          Hadis riwayat Muslim menegaskan bahwa malaikat diciptakan dari cahaya (nur), jin dari api yang menyala, dan manusia dari tanah.
                        </p>
                      </div>
                    </div>

                    {/* 3. Sifat-sifat Utama Malaikat */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F4] border border-[#AFC4D5]/30 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                        <h4 className="font-bold text-sm text-[#3F4147]">Sifat Malaikat vs Manusia & Jin</h4>
                      </div>
                      <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-white border border-[#AFC4D5]/25">
                          <strong className="text-emerald-800 block mb-0.5">Sifat Malaikat:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-[#3F4147]/80">
                            <li>Diciptakan dari cahaya (nur)</li>
                            <li>Tidak berhawa nafsu, tidak makan/minum</li>
                            <li>Ketaatan mutlak kepada Allah Swt.</li>
                            <li>Makhluk gaib & dapat menjelma atas izin-Nya</li>
                          </ul>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-[#AFC4D5]/25">
                          <strong className="text-amber-800 block mb-0.5">Sifat Manusia & Jin:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-[#3F4147]/80">
                            <li>Manusia dari tanah, jin dari api</li>
                            <li>Diberi akal dan hawa nafsu</li>
                            <li>Bisa taat atau bisa ingkar/bermaksiat</li>
                            <li>Membutuhkan makan, minum, dan istirahat</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* 4. 10 Nama Malaikat & Tugas Pokok */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F4] border border-[#AFC4D5]/30 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">4</span>
                        <h4 className="font-bold text-sm text-[#3F4147]">10 Nama Malaikat & Tugas Pokok</h4>
                      </div>
                      <div className="pl-7 grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-[11px]">
                        {[
                          { name: 'Jibril', duty: 'Wahyu' },
                          { name: 'Mikail', duty: 'Rezeki & Hujan' },
                          { name: 'Israfil', duty: 'Sangkakala' },
                          { name: 'Izrail', duty: 'Mencabut Nyawa' },
                          { name: 'Munkar', duty: 'Tanya Kubur' },
                          { name: 'Nakir', duty: 'Tanya Kubur' },
                          { name: 'Raqib', duty: 'Amal Kebaikan' },
                          { name: 'Atid', duty: 'Amal Keburukan' },
                          { name: 'Malik', duty: 'Pintu Neraka' },
                          { name: 'Ridwan', duty: 'Pintu Surga' }
                        ].map((m, idx) => (
                          <div key={idx} className="p-2 rounded-xl bg-white border border-[#AFC4D5]/25 text-center">
                            <span className="font-bold text-[#3F4147] block">{m.name}</span>
                            <span className="text-[10px] text-[#88AB8E]">{m.duty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. Hikmah & Sikap Mawas Diri */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F4] border border-[#AFC4D5]/30 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">5</span>
                        <h4 className="font-bold text-sm text-[#3F4147]">Hikmah, Mawas Diri & Introspeksi</h4>
                      </div>
                      <p className="text-xs text-[#3F4147]/85 leading-relaxed pl-7">
                        Keimanan kepada malaikat bukan sekadar hafalan, melainkan membentuk <strong>sikap mawas diri</strong> (berhati-hati sebelum bertindak karena sadar diawasi) serta <strong>introspeksi diri (muhasabah)</strong> untuk berani mengakui kesalahan dan terus memperbaiki akhlak.
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: MISI MAWAS DIRI (CHECKLIST HARIAN) */}
                {activeTab === 'misi' && (
                  <div className="space-y-3 text-left">
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smile size={16} className="text-amber-600 shrink-0" />
                        <span>Tandai misi kebaikan yang sudah atau siap kamu lakukan hari ini!</span>
                      </div>
                      <span className="font-mono font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md text-[11px]">
                        {checkedMissions.length} / {DAILY_MISSIONS.length}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {DAILY_MISSIONS.map((mission) => {
                        const isChecked = checkedMissions.includes(mission.id);
                        return (
                          <div
                            key={mission.id}
                            onClick={() => toggleMission(mission.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-300 shadow-2xs'
                                : 'bg-white border-[#AFC4D5]/30 hover:bg-[#FAF7F4]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isChecked ? (
                                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                              ) : (
                                <Square size={18} className="text-[#AFC4D5] shrink-0" />
                              )}
                              <span className={`text-xs sm:text-sm ${isChecked ? 'line-through text-emerald-950/70 font-medium' : 'text-[#3F4147] font-semibold'}`}>
                                {mission.text}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#AFC4D5]/25 text-[#3F4147]/70 shrink-0">
                              {mission.category}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 3: TEKA-TEKI CILIK LUCU */}
                {activeTab === 'tebak' && (
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                      <Sparkles size={24} />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Teka-Teki {currentRiddleIdx + 1} dari {CUTE_RIDDLES.length}
                      </span>
                      <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147] font-bold mt-2 max-w-lg mx-auto leading-snug">
                        {CUTE_RIDDLES[currentRiddleIdx].clue}
                      </h4>
                    </div>

                    {/* Option Choices */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 max-w-lg mx-auto">
                      {CUTE_RIDDLES[currentRiddleIdx].options.map((opt, oIdx) => {
                        const isSelected = selectedRiddleOpt === oIdx;
                        const isCorrect = oIdx === CUTE_RIDDLES[currentRiddleIdx].correctIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleAnswerRiddle(oIdx)}
                            className={`p-3 rounded-2xl border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                              isSelected
                                ? isCorrect
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                                  : 'bg-rose-500 text-white border-rose-600'
                                : 'bg-white border-[#AFC4D5]/40 hover:bg-[#FAF7F4] text-[#3F4147]'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback message */}
                    {riddleFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-2xl text-xs font-semibold max-w-lg mx-auto ${
                          selectedRiddleOpt === CUTE_RIDDLES[currentRiddleIdx].correctIdx
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                            : 'bg-rose-50 text-rose-900 border border-rose-200'
                        }`}
                      >
                        {riddleFeedback}
                      </motion.div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={handleNextRiddle}
                        className="px-5 py-2.5 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>Teka-Teki Berikutnya</span>
                        <Sparkles size={13} className="text-amber-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 4: MUTIARA HIKMAH */}
                {activeTab === 'hikmah' && (
                  <div className="space-y-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                      <Heart size={24} />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                        Renungan Mawas Diri
                      </span>
                      <h4 className="font-serif-display text-lg text-[#3F4147] font-bold mt-0.5">
                        Mutiara Kalbu & Kebaikan
                      </h4>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-[#FAF7F4] border border-amber-200 shadow-2xs max-w-md mx-auto text-left relative">
                      <span className="text-3xl text-amber-300 font-serif absolute top-2 right-3">“</span>
                      <p className="font-serif-display text-base sm:text-lg text-[#3F4147] italic leading-relaxed relative z-10">
                        {HIKMAH_QUOTES[hikmahIndex]}
                      </p>
                      <div className="mt-4 pt-2.5 border-t border-[#AFC4D5]/20 flex items-center justify-between text-[11px] text-[#3F4147]/70">
                        <span className="flex items-center gap-1">
                          <Star size={12} className="text-amber-500 fill-amber-400" />
                          <span>Hikmah {hikmahIndex + 1} dari {HIKMAH_QUOTES.length}</span>
                        </span>
                        <span className="font-semibold text-emerald-700">PAI Fase D</span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={handleNextHikmah}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Sparkles size={13} />
                        <span>Buka Mutiara Hikmah Lain</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3.5 sm:p-4 bg-[#FAF7F4] border-t border-[#AFC4D5]/25 flex items-center justify-between text-xs text-[#3F4147]/75">
                <span className="flex items-center gap-1.5 font-medium">
                  <Award size={14} className="text-emerald-600" />
                  <span>Media Belajar Berkelanjutan PAI & Budi Pekerti</span>
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white font-semibold text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Tutup Modul
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
