import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Users,
  Trophy,
  BookOpen,
  Music,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  CheckCircle2,
  Shuffle,
  RotateCcw,
  Check,
  Disc,
  Play,
  Save,
  UserPlus,
  Edit3,
  X
} from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import {
  GroupItem,
  STORAGE_KEY_SCOREBOARD,
  INITIAL_GROUPS,
  DEFAULT_STUDENTS_LIST
} from './GroupScoreboardPage';

interface PembagianKelompokPageProps {
  onContinueToMateri: () => void;
  onGoToScoreboard: () => void;
  onGoToLagu: () => void;
  onGoToWordSearch: () => void;
  onBackToAgenda: () => void;
}

const GROUPS_THEME_DATA = [
  {
    id: 1,
    name: 'Kelompok 1',
    colorName: 'Biru Langit',
    accentColor: '#0284C7',
    badgeClass: 'bg-sky-100 text-sky-900 border-sky-300',
    cardBorder: 'border-sky-300',
    headerBg: 'bg-sky-600'
  },
  {
    id: 2,
    name: 'Kelompok 2',
    colorName: 'Mawar Pastel',
    accentColor: '#E11D48',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
    cardBorder: 'border-rose-300',
    headerBg: 'bg-rose-600'
  },
  {
    id: 3,
    name: 'Kelompok 3',
    colorName: 'Zamrud',
    accentColor: '#059669',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    cardBorder: 'border-emerald-300',
    headerBg: 'bg-emerald-600'
  }
];

export const PembagianKelompokPage: React.FC<PembagianKelompokPageProps> = ({
  onContinueToMateri,
  onGoToScoreboard,
  onGoToLagu,
  onGoToWordSearch,
  onBackToAgenda
}) => {
  // Master list of 23 students from teacher's request
  const [studentNames, setStudentNames] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mawas_diri_master_students');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_STUDENTS_LIST;
  });

  // Current groups state with members
  const [groups, setGroups] = useState<GroupItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCOREBOARD);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          return parsed.map((item, idx) => ({
            ...INITIAL_GROUPS[idx],
            name: typeof item.name === 'string' && item.name.trim() !== '' ? item.name : INITIAL_GROUPS[idx].name,
            score: typeof item.score === 'number' && !isNaN(item.score) ? Math.max(0, Math.floor(item.score)) : 0,
            members: Array.isArray(item.members) && item.members.length > 0 ? item.members : INITIAL_GROUPS[idx].members
          }));
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_GROUPS;
  });

  // Spin & Randomize State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinningName, setSpinningName] = useState<string>('');
  const [spinRotation, setSpinRotation] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showStudentsModal, setShowStudentsModal] = useState<boolean>(false);
  const [editableNamesText, setEditableNamesText] = useState<string>(studentNames.join(', '));

  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to shuffle students into 3 groups
  const partitionInto3Groups = (names: string[]): [string[], string[], string[]] => {
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const g1: string[] = [];
    const g2: string[] = [];
    const g3: string[] = [];

    shuffled.forEach((name, idx) => {
      if (idx % 3 === 0) g1.push(name);
      else if (idx % 3 === 1) g2.push(name);
      else g3.push(name);
    });

    return [g1, g2, g3];
  };

  // Save groups to localStorage (shared with Scoreboard)
  const saveGroupsToStorage = (updatedGroups: GroupItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_SCOREBOARD, JSON.stringify(updatedGroups));
    } catch {
      // ignore
    }
  };

  // Quick Randomize with rolling animation
  const handleQuickShuffle = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setToastMessage('🎲 Mengacak nama-nama anggota kelompok...');

    let count = 0;
    const shuffleInterval = setInterval(() => {
      count++;
      // Actively shuffle displayed group members so names roll inside cards
      const [rollingG1, rollingG2, rollingG3] = partitionInto3Groups(studentNames);
      setGroups((prev) => [
        { ...prev[0], members: rollingG1 },
        { ...prev[1], members: rollingG2 },
        { ...prev[2], members: rollingG3 }
      ]);
      const randName = studentNames[Math.floor(Math.random() * studentNames.length)];
      setSpinningName(randName);

      if (count >= 8) {
        clearInterval(shuffleInterval);
        const [finalG1, finalG2, finalG3] = partitionInto3Groups(studentNames);
        const updated: GroupItem[] = [
          { ...groups[0], members: finalG1 },
          { ...groups[1], members: finalG2 },
          { ...groups[2], members: finalG3 }
        ];

        setGroups(updated);
        saveGroupsToStorage(updated);
        setIsSpinning(false);
        setSpinningName('');

        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });

        setToastMessage('✨ 23 Siswa berhasil diacak dan disimpan ke Papan Skor!');
        setTimeout(() => setToastMessage(null), 4000);
      }
    }, 80);
  };

  // Animated Spin Wheel Randomizer with real-time rolling names inside group cards
  const handleStartSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setToastMessage('🎰 Sedang memutar roda spin acak siswa...');

    // Spin degree increment
    setSpinRotation((prev) => prev + 1800 + Math.floor(Math.random() * 360));

    // Cycle through names rapidly during spin and actively shuffle names inside the 3 group cards
    spinIntervalRef.current = setInterval(() => {
      const [rollingG1, rollingG2, rollingG3] = partitionInto3Groups(studentNames);
      setGroups((prev) => [
        { ...prev[0], members: rollingG1 },
        { ...prev[1], members: rollingG2 },
        { ...prev[2], members: rollingG3 }
      ]);
      const randName = studentNames[Math.floor(Math.random() * studentNames.length)];
      setSpinningName(randName);
    }, 85);

    // Stop spin after 2.8 seconds and lock in the final result
    setTimeout(() => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);

      const [finalG1, finalG2, finalG3] = partitionInto3Groups(studentNames);
      const updated: GroupItem[] = [
        { ...groups[0], members: finalG1 },
        { ...groups[1], members: finalG2 },
        { ...groups[2], members: finalG3 }
      ];

      setGroups(updated);
      saveGroupsToStorage(updated);
      setIsSpinning(false);
      setSpinningName('');

      // Celebration confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 }
      });

      setToastMessage('🎉 Spin Selesai! Anggota 3 kelompok telah tersimpan otomatis di Papan Skor.');
      setTimeout(() => setToastMessage(null), 5000);
    }, 2800);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  // Save edited student list
  const handleSaveStudentList = () => {
    const rawNames = editableNamesText
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (rawNames.length >= 3) {
      setStudentNames(rawNames);
      try {
        localStorage.setItem('mawas_diri_master_students', JSON.stringify(rawNames));
      } catch {
        // ignore
      }
      setShowStudentsModal(false);
      setToastMessage(`Daftar siswa diperbarui (${rawNames.length} siswa). Silakan putar spin untuk mengacak.`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-3 sm:px-6 py-6 md:py-10 max-w-6xl mx-auto">
      <div className="w-full space-y-6">
        {/* Header Bar */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <EightPointStar size={16} color="#88AB8E" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#B8AAA0]">
              Langkah 1: Pembentukan Tim Diskusi · Sistem Spin & Acak
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#3F4147] tracking-tight">
            PEMBAGIAN KELOMPOK SISWA
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#3F4147]/80 max-w-2xl mx-auto leading-relaxed">
            Sebanyak <strong>{studentNames.length} Siswa</strong> dibagi secara acak/spin ke dalam <strong>3 Kelompok</strong>. Nama anggota otomatis tersimpan ke <strong>Papan Skor</strong> kelas.
          </p>
        </div>

        {/* Spin / Randomizer Control Panel Banner */}
        <div className="rounded-3xl border-2 border-[#AFC4D5]/40 bg-gradient-to-r from-white via-[#FAF7F4] to-[#F5EFE6] p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Spin Animation Widget */}
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: isSpinning ? spinRotation : 0 }}
                  transition={{
                    duration: isSpinning ? 2.8 : 0.5,
                    ease: isSpinning ? [0.25, 0.1, 0.25, 1] : 'easeOut'
                  }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-dashed border-[#AFC4D5] flex items-center justify-center shadow-md ${
                    isSpinning ? 'bg-amber-100 border-amber-400' : 'bg-white'
                  }`}
                >
                  <Disc
                    size={32}
                    className={`transition-colors ${
                      isSpinning ? 'text-amber-600 animate-spin' : 'text-[#88AB8E]'
                    }`}
                  />
                </motion.div>
                {isSpinning && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 animate-ping" />
                )}
              </div>

              <div className="space-y-0.5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3F4147]">
                    Roda Putar Kelompok
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {studentNames.length} Siswa Terdaftar
                  </span>
                </div>
                <p className="text-xs text-[#3F4147]/75">
                  {isSpinning ? (
                    <span className="font-bold text-amber-700 animate-pulse">
                      Mengacak siswa: {spinningName || 'Memutar...'}
                    </span>
                  ) : (
                    'Klik "Putar Roda Spin" untuk membagi kelas secara adil & menyenangkan!'
                  )}
                </p>
              </div>
            </div>

            {/* Right: Actions: Spin, Quick Randomize, Edit Names */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
              <button
                onClick={handleStartSpin}
                disabled={isSpinning}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer group"
              >
                <Disc size={16} className="text-amber-400 group-hover:rotate-180 transition-transform" />
                <span>{isSpinning ? 'Sedang Memutar...' : '🎰 Putar Roda Spin'}</span>
                <Sparkles size={14} className="text-amber-400" />
              </button>

              <button
                onClick={handleQuickShuffle}
                disabled={isSpinning}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-2xs disabled:opacity-50 cursor-pointer"
                title="Langsung acak tanpa animasi putaran"
              >
                <Shuffle size={14} className="text-indigo-600" />
                <span>⚡ Acak Cepat</span>
              </button>

              <button
                onClick={() => {
                  setEditableNamesText(studentNames.join(', '));
                  setShowStudentsModal(true);
                }}
                disabled={isSpinning}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#AFC4D5]/40 bg-white hover:bg-[#FAF7F4] text-xs font-medium text-[#3F4147] transition-all shadow-2xs cursor-pointer"
                title="Lihat / Sesuaikan nama siswa"
              >
                <Edit3 size={13} className="text-[#B8AAA0]" />
                <span className="hidden sm:inline">Daftar Nama</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>{toastMessage}</span>
                </div>
                <button
                  onClick={() => setToastMessage(null)}
                  className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-0.5 rounded cursor-pointer"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =====================================================================
            3 GROUP CARDS: KELOMPOK 1, 2, 3 DENGAN DAFTAR NAMA ANGGOTA LENGKAP
        ===================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {groups.map((group, index) => {
            const theme = GROUPS_THEME_DATA[index] || GROUPS_THEME_DATA[0];
            const members = group.members || [];

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-3xl border-2 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                style={{ borderColor: `${theme.accentColor}50` }}
              >
                <div className="space-y-4">
                  {/* Card Header: Big Group Name Badge & Member Count */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#AFC4D5]/20">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-2xs shrink-0"
                        style={{ backgroundColor: theme.accentColor }}
                      />
                      <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3F4147]">
                        {group.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#3F4147] bg-[#FAF7F4] px-3 py-1 rounded-xl border border-[#AFC4D5]/30 shadow-2xs">
                      {members.length} Siswa
                    </span>
                  </div>

                  {/* Member Students Section Header */}
                  <div className="flex items-center justify-between text-xs font-bold text-[#3F4147]">
                    <span className="flex items-center gap-1.5">
                      <Users size={14} style={{ color: theme.accentColor }} />
                      <span className="uppercase tracking-wider text-[11px] text-[#B8AAA0]">
                        Daftar Anggota Kelompok
                      </span>
                    </span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-md font-mono transition-colors ${
                        isSpinning
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse font-bold'
                          : members.length > 0
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-slate-500 bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {isSpinning ? '🎲 Mengacak Nama...' : members.length > 0 ? 'Siap Belajar' : 'Menunggu Spin'}
                    </span>
                  </div>

                  {/* Student Members List: Clean, Large, Numbered Badges with Live Shuffle Effect */}
                  <div
                    className={`min-h-[220px] p-3 rounded-2xl transition-all duration-150 border ${
                      isSpinning
                        ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-200/60'
                        : 'bg-[#FAF7F4]/90 border-[#AFC4D5]/25'
                    }`}
                  >
                    {members.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {members.map((name, mIdx) => (
                          <div
                            key={mIdx}
                            className={`flex items-center gap-2 p-2 rounded-xl border shadow-2xs transition-all duration-75 ${
                              isSpinning
                                ? 'bg-white/95 border-amber-300 shadow-xs'
                                : 'bg-white border-[#AFC4D5]/35 hover:border-[#3F4147]/40'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white shrink-0 transition-transform ${
                                isSpinning ? 'scale-105' : ''
                              }`}
                              style={{ backgroundColor: theme.accentColor }}
                            >
                              {mIdx + 1}
                            </span>
                            <span
                              className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                                isSpinning ? 'text-amber-900 font-extrabold' : 'text-[#3F4147]'
                              }`}
                            >
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-44 text-center p-4 text-[#3F4147]/60">
                        <Users size={28} className="text-[#AFC4D5] mb-2" />
                        <p className="text-xs font-semibold">Belum ada anggota.</p>
                        <p className="text-[11px] text-[#B8AAA0] mt-0.5">Tekan tombol "Putar Roda Kelompok" atau "Acak Cepat" di atas.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Synchronized with Scoreboard */}
                <div className="mt-4 pt-3 border-t border-[#AFC4D5]/20 text-[11px] text-[#3F4147]/70 flex items-center justify-between">
                  <span className="flex items-center gap-1 font-medium">
                    <Save size={12} className="text-emerald-600" />
                    <span>Tersimpan di Papan Skor ({group.score} Poin)</span>
                  </span>
                  <Sparkles size={13} style={{ color: theme.accentColor }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Bar for Classroom Teacher & Students */}
        <div className="rounded-3xl border border-[#AFC4D5]/40 bg-white/95 p-5 sm:p-7 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <NaraCharacter
              pose="explaining"
              bubbleText="Nama siswa sudah tersimpan di Papan Skor! Guru bisa langsung memberi nilai untuk kelompok yang aktif!"
              size="md"
              showNameTag={false}
            />
            <div className="hidden lg:block">
              <h4 className="font-serif-display text-base text-[#3F4147] font-bold">
                Semua Anggota Sudah Siap?
              </h4>
              <p className="text-xs text-[#3F4147]/75 max-w-md mt-0.5">
                Buka Papan Skor untuk melihat nama anggota di kartu nilai, atau langsung melangkah ke modul materi pembelajaran.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
            <button
              onClick={onBackToAgenda}
              className="px-4 py-2.5 rounded-xl border border-[#AFC4D5]/40 bg-white hover:bg-slate-50 text-xs font-semibold text-[#3F4147] transition-all cursor-pointer"
            >
              <ArrowLeft size={14} className="inline mr-1.5" />
              <span>Agenda</span>
            </button>

            <button
              onClick={onGoToScoreboard}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs sm:text-sm font-bold text-[#92400E] shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <Trophy size={16} className="text-amber-500" />
              <span>Lihat di Papan Skor</span>
            </button>

            <button
              onClick={onGoToLagu}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs sm:text-sm font-bold text-indigo-900 shadow-2xs transition-all cursor-pointer"
            >
              <Music size={16} className="text-indigo-600" />
              <span>Lagu 10 Malaikat</span>
            </button>

            <button
              onClick={onContinueToMateri}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group cursor-pointer"
            >
              <span>Eksplorasi Materi</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL: KELOLA NAMA SISWA KELAS
      ===================================================================== */}
      <AnimatePresence>
        {showStudentsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4147]/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl border border-[#AFC4D5]/40 bg-white p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#AFC4D5]/25">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#88AB8E]" />
                  <h3 className="font-serif-display text-lg text-[#3F4147]">
                    Daftar Nama Siswa ({studentNames.length} Siswa)
                  </h3>
                </div>
                <button
                  onClick={() => setShowStudentsModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-[#3F4147]/70 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-[#3F4147]/75">
                Pisahkan setiap nama dengan tanda koma (<strong>,</strong>). Setelah disimpan, Anda dapat mengacak kembali 3 kelompok dengan tombol Spin.
              </p>

              <textarea
                value={editableNamesText}
                onChange={(e) => setEditableNamesText(e.target.value)}
                rows={5}
                className="w-full p-3 rounded-2xl border-2 border-[#AFC4D5]/40 bg-[#FAF7F4] text-xs font-mono text-[#3F4147] outline-none focus:border-[#88AB8E] focus:ring-2 focus:ring-[#88AB8E]/20"
                placeholder="Contoh: Silvi, Zahrul, Nikken P, Adit, Faul..."
              />

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    setEditableNamesText(DEFAULT_STUDENTS_LIST.join(', '));
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Kembalikan ke 23 Nama Awal
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowStudentsModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#AFC4D5]/40 text-xs font-semibold text-[#3F4147] hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveStudentList}
                    className="px-5 py-2 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Simpan Daftar Nama
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
