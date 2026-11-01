import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
  Crown,
  Plus,
  Minus,
  Edit2,
  Check,
  X,
  Home,
  BookOpen,
  HelpCircle,
  Search,
  Users,
  Info,
  ArrowRight
} from 'lucide-react';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { NaraCharacter } from '../components/Character/NaraCharacter';

export interface GroupItem {
  id: number;
  name: string;
  score: number;
  colorName: string;
  themeColor: string;
  lightBg: string;
  borderColor: string;
  members: string[];
}

export const STORAGE_KEY_SCOREBOARD = 'mawas_diri_papan_skor';

export const DEFAULT_STUDENTS_LIST: string[] = [
  'Silvi',
  'Zahrul',
  'Nikken P',
  'Adit',
  'Faul',
  'Tamam',
  'Kafi',
  'Aida',
  'Salma',
  'Eva',
  'Hima',
  'Niken A',
  'Fara',
  'Alim',
  'Alif',
  'Stephani',
  'Eli',
  'Amri',
  'Adkha',
  'Hafid',
  'Ihsan',
  'Habibah',
  'Alifia'
];

export const INITIAL_GROUPS: GroupItem[] = [
  {
    id: 1,
    name: 'Kelompok 1',
    score: 0,
    colorName: 'Biru Langit',
    themeColor: '#0284C7',
    lightBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    members: ['Silvi', 'Zahrul', 'Nikken P', 'Adit', 'Faul', 'Tamam', 'Kafi', 'Aida']
  },
  {
    id: 2,
    name: 'Kelompok 2',
    score: 0,
    colorName: 'Mawar Pastel',
    themeColor: '#E11D48',
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    members: ['Salma', 'Eva', 'Hima', 'Niken A', 'Fara', 'Alim', 'Alif', 'Stephani']
  },
  {
    id: 3,
    name: 'Kelompok 3',
    score: 0,
    colorName: 'Zamrud',
    themeColor: '#059669',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    members: ['Eli', 'Amri', 'Adkha', 'Hafid', 'Ihsan', 'Habibah', 'Alifia']
  }
];

interface GroupScoreboardPageProps {
  onBackToHome: () => void;
  onGoToMateri: () => void;
  onGoToQuiz: () => void;
  onGoToWordSearch: () => void;
  currentQuizNumber?: number | null;
  totalQuizQuestions?: number;
}

export const GroupScoreboardPage: React.FC<GroupScoreboardPageProps> = ({
  onBackToHome,
  onGoToMateri,
  onGoToQuiz,
  onGoToWordSearch,
  currentQuizNumber,
  totalQuizQuestions
}) => {
  // Load groups from localStorage or fallback to initial (3 groups with members)
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
        } else if (Array.isArray(parsed) && parsed.length > 3) {
          // Migrate gracefully from 5 groups to 3 groups
          return INITIAL_GROUPS.map((initialG, idx) => ({
            ...initialG,
            name: typeof parsed[idx]?.name === 'string' && parsed[idx].name.trim() !== '' ? parsed[idx].name : initialG.name,
            score: typeof parsed[idx]?.score === 'number' && !isNaN(parsed[idx].score) ? Math.max(0, Math.floor(parsed[idx].score)) : 0,
            members: Array.isArray(parsed[idx]?.members) && parsed[idx].members.length > 0 ? parsed[idx].members : initialG.members
          }));
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_GROUPS;
  });

  // Track inline editing group name
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [editNameText, setEditNameText] = useState<string>('');

  // Track direct editing score
  const [editingScoreGroupId, setEditingScoreGroupId] = useState<number | null>(null);
  const [editScoreText, setEditScoreText] = useState<string>('');

  // Modals & Announcements
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [hasAnnouncedWinner, setHasAnnouncedWinner] = useState<boolean>(false);

  // Save to localStorage on any state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCOREBOARD, JSON.stringify(groups));
    } catch {
      // fallback
    }
  }, [groups]);

  // Ranking calculation (tied scores share the same rank)
  const uniqueScoresDesc = Array.from(new Set(groups.map((g) => g.score))).sort((a, b) => b - a);

  const getRank = (score: number) => {
    const idx = uniqueScoresDesc.indexOf(score);
    return idx >= 0 ? idx + 1 : groups.length;
  };

  const maxScore = Math.max(...groups.map((g) => g.score));
  const isHighestScore = (score: number) => maxScore > 0 && score === maxScore;
  const winners = maxScore > 0 ? groups.filter((g) => g.score === maxScore) : [];
  const isAllZero = groups.every((g) => g.score === 0);

  // Score adjustments
  const adjustScore = (groupId: number, delta: number) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const newScore = Math.max(0, g.score + delta);
          return { ...g, score: newScore };
        }
        return g;
      })
    );
  };

  // Group name editing handlers
  const startEditName = (group: GroupItem) => {
    setEditingGroupId(group.id);
    setEditNameText(group.name);
  };

  const saveGroupName = (groupId: number) => {
    const trimmed = editNameText.trim();
    if (trimmed) {
      setGroups((prev) =>
        prev.map((g) => (g.id === groupId ? { ...g, name: trimmed } : g))
      );
    }
    setEditingGroupId(null);
  };

  // Direct score editing handlers
  const startEditScore = (group: GroupItem) => {
    setEditingScoreGroupId(group.id);
    setEditScoreText(group.score.toString());
  };

  const saveGroupScore = (groupId: number) => {
    const val = parseInt(editScoreText, 10);
    const validScore = !isNaN(val) ? Math.max(0, val) : 0;
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, score: validScore } : g))
    );
    setEditingScoreGroupId(null);
  };

  // Announce winners & fire confetti
  const handleAnnounceWinners = () => {
    setShowWinnerModal(true);
    setHasAnnouncedWinner(true);
    if (!isAllZero && winners.length > 0) {
      // Short multi-burst confetti without audio
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }
  };

  // Reset scores to 0 (preserves group names)
  const handleConfirmReset = () => {
    setGroups((prev) => prev.map((g) => ({ ...g, score: 0 })));
    setShowResetConfirmModal(false);
    setHasAnnouncedWinner(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#AFC4D5]/25 pb-4">
        <div className="flex items-center gap-2">
          <EightPointStar size={16} color="#D9B8B8" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            PAPAN SKOR KELOMPOK · AKTIVITAS KELAS PAI
          </span>
        </div>

        {/* Quick jump navigation back to activities */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#AFC4D5]/30 bg-white/80 hover:bg-white text-xs font-semibold text-[#3F4147] transition-colors shadow-2xs"
            title="Panduan Skoring Kelas"
          >
            <Info size={14} className="text-[#AFC4D5]" />
            <span className="hidden sm:inline">Panduan Poin</span>
          </button>

          <button
            onClick={onGoToQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-[#92400E] transition-all shadow-2xs cursor-pointer"
            title="Lanjut ke Kuis Interaktif"
          >
            <HelpCircle size={14} className="text-[#F59E0B]" />
            <span>
              {currentQuizNumber ? `Lanjut Kuis (Soal ${currentQuizNumber})` : 'Kuis'}
            </span>
          </button>

          <button
            onClick={onGoToWordSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#C8BDD8]/30 bg-white/80 hover:bg-white text-xs font-semibold text-[#3F4147] transition-colors shadow-2xs"
          >
            <Search size={14} className="text-[#C8BDD8]" />
            <span className="hidden md:inline">Cari Kata</span>
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#AFC4D5]/40 bg-white hover:bg-[#FAF7F4] text-xs font-semibold text-[#3F4147] transition-colors shadow-2xs"
          >
            <Home size={14} />
            <span>Beranda</span>
          </button>
        </div>
      </div>

      {/* Hero Control Banner - Optimized for Laptop & Classroom Projector */}
      <div className="rounded-2xl border border-[#AFC4D5]/35 bg-gradient-to-r from-white via-[#FAF7F4] to-[#F5EFE6] p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AFC4D5]/20 text-[#3F4147] text-[11px] font-bold uppercase tracking-wider">
              <Users size={13} />
              <span>Papan Skor Interaktif Siswa</span>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl text-[#3F4147] tracking-tight">
              Papan Skor Kelompok
            </h1>
            <p className="text-xs sm:text-sm text-[#3F4147]/75 max-w-xl">
              Catat perolehan poin dari kuis malaikat, pencarian kata rahasia, dan diskusi mawas diri. Peringkat dan skor tersimpan otomatis.
            </p>
          </div>

          {/* Action Buttons: Umumkan Pemenang & Reset Skor */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowResetConfirmModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#D9B8B8]/60 bg-white hover:bg-[#D9B8B8]/15 text-xs sm:text-sm font-semibold text-[#3F4147] transition-all shadow-2xs active:scale-95"
              title="Reset skor semua kelompok menjadi 0"
            >
              <RotateCcw size={15} className="text-[#D9B8B8]" />
              <span>Reset Semua Skor</span>
            </button>

            <button
              onClick={handleAnnounceWinners}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all active:scale-95 group"
            >
              <Trophy size={16} className="text-[#FBBF24] transition-transform group-hover:scale-110" />
              <span>Umumkan Pemenang</span>
              <Sparkles size={14} className="text-[#FBBF24]" />
            </button>
          </div>
        </div>
      </div>

      {/* Banner Pintas Melanjutkan Kuis (Jika ada soal berikutnya) */}
      {currentQuizNumber && (
        <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/90 via-white to-emerald-50/60 p-3.5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#3F4147]">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>
              <strong>Kuis Kelas Sedang Berjalan:</strong> Nilai kelompok telah dicatat (+10 jika benar, −5 jika salah). Siap mengajukan <strong>Soal {currentQuizNumber}</strong>? Klik tombol di samping untuk langsung membuka soal berikutnya tanpa mengulang nomor yang sudah dijawab.
            </span>
          </div>
          <button
            onClick={onGoToQuiz}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span>Buka Soal {currentQuizNumber}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* Banner Notifikasi Setelah Pengumuman Pemenang */}
      {hasAnnouncedWinner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-[#F59E0B]/50 bg-gradient-to-r from-amber-50 via-white to-amber-50/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#F59E0B] shrink-0">
              <Trophy size={20} className="fill-[#F59E0B]" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-[#92400E] uppercase tracking-wider">
                <Sparkles size={14} className="text-[#F59E0B]" />
                <span>Pengumuman Pemenang Telah Selesai</span>
              </div>
              <p className="text-xs sm:text-sm text-[#3F4147]/85 mt-0.5">
                {winners.length > 0
                  ? `Selamat untuk ${winners.map((w) => w.name).join(' & ')} dengan skor tertinggi ${maxScore} poin! Anda dapat kembali ke menu utama kapan saja.`
                  : 'Sesi pengumuman skor telah dilihat. Silakan kembali ke menu utama jika aktivitas skoring telah usai.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleAnnounceWinners}
              className="px-4 py-2.5 rounded-xl border border-[#F59E0B]/60 bg-white hover:bg-amber-50 text-xs font-bold text-[#92400E] transition-all shadow-2xs active:scale-95 flex items-center gap-1.5"
            >
              <Trophy size={14} />
              <span>Buka Pengumuman Lagi</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 rounded-xl bg-[#88AB8E] hover:bg-[#729478] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Home size={16} />
              <span>Kembali ke Menu Utama</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          THREE GROUP CARDS GRID:
          - Displayed beautifully in 3 large columns for classroom projector
          - Large visible numerals
          - Inline name & score editing with keyboard propagation stopped
          - Quick action buttons: +10, +5, -5
          - "Skor Tertinggi" indicator on highest score groups (if > 0)
      ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {groups.map((group) => {
          const rank = getRank(group.score);
          const isWinner = isHighestScore(group.score);
          const isNameEditing = editingGroupId === group.id;
          const isScoreEditing = editingScoreGroupId === group.id;

          // Rank badge styling
          let rankBadgeBg = 'bg-[#FAF7F4] text-[#3F4147] border-[#AFC4D5]/30';
          let rankLabel = `#${rank}`;
          if (rank === 1 && !isAllZero) {
            rankBadgeBg = 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]/50 font-bold';
            rankLabel = 'Juara 1';
          } else if (rank === 2 && !isAllZero) {
            rankBadgeBg = 'bg-[#E2E8F0] text-[#334155] border-[#94A3B8]/50 font-bold';
            rankLabel = 'Juara 2';
          } else if (rank === 3 && !isAllZero) {
            rankBadgeBg = 'bg-[#FFEDD5] text-[#9A3412] border-[#FB923C]/50 font-bold';
            rankLabel = 'Juara 3';
          }

          return (
            <motion.div
              key={group.id}
              layout
              className={`relative rounded-2xl bg-white border-2 p-4 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md ${
                isWinner
                  ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/25 bg-gradient-to-b from-amber-50/40 via-white to-white'
                  : `${group.borderColor} hover:border-[#3F4147]/50`
              }`}
            >
              {/* "Skor Tertinggi" Floating Badge */}
              {isWinner && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#F59E0B] text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md whitespace-nowrap animate-pulse">
                  <Crown size={12} className="text-white fill-white" />
                  <span>Skor Tertinggi</span>
                </div>
              )}

              {/* Card Top: Rank indicator & Color dot */}
              <div className="flex items-center justify-between gap-1 mb-2 pt-1">
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border ${rankBadgeBg}`}
                >
                  {rankLabel}
                </span>

                <span
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: group.themeColor }}
                  title={`Tema: ${group.colorName}`}
                />
              </div>

              {/* Group Name (Editable directly) */}
              <div className="mb-3">
                {isNameEditing ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      autoFocus
                      value={editNameText}
                      onChange={(e) => setEditNameText(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          saveGroupName(group.id);
                        } else if (e.key === 'Escape') {
                          setEditingGroupId(null);
                        }
                      }}
                      onBlur={() => saveGroupName(group.id)}
                      className="w-full text-sm font-bold text-[#3F4147] bg-[#FAF7F4] border border-[#AFC4D5] rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-[#AFC4D5]"
                      maxLength={24}
                    />
                    <button
                      onClick={() => saveGroupName(group.id)}
                      className="p-1 rounded-md bg-[#3F4147] text-white hover:bg-black"
                      title="Simpan Nama"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => startEditName(group)}
                    className="group/name flex items-center justify-between gap-1 cursor-pointer py-0.5 px-1 rounded-md hover:bg-[#FAF7F4] transition-colors"
                    title="Klik untuk mengubah nama kelompok"
                  >
                    <h3 className="font-serif-display text-base sm:text-lg text-[#3F4147] font-bold truncate">
                      {group.name}
                    </h3>
                    <Edit2
                      size={13}
                      className="text-[#B8AAA0] opacity-40 group-hover/name:opacity-100 transition-opacity shrink-0"
                    />
                  </div>
                )}
              </div>

              {/* Member Students Tag Strip */}
              {group.members && group.members.length > 0 && (
                <div className="mb-2.5 p-2.5 rounded-xl bg-[#FAF7F4] border border-[#AFC4D5]/25 text-left">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#3F4147] mb-1.5">
                    <span className="flex items-center gap-1">
                      <Users size={12} style={{ color: group.themeColor }} />
                      <span>Anggota ({group.members.length} Siswa)</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-0.5">
                    {group.members.map((member, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-[#AFC4D5]/35 text-[#3F4147] shadow-2xs"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Score Display (Large Numbers, click-to-edit inline) */}
              <div className="my-2 py-3 px-2 rounded-xl bg-gradient-to-b from-[#FAF7F4] to-[#F5EFE6]/50 border border-[#AFC4D5]/25 text-center flex flex-col items-center justify-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#B8AAA0] mb-0.5">
                  TOTAL SKOR
                </span>

                {isScoreEditing ? (
                  <div className="flex items-center justify-center gap-1 my-1">
                    <input
                      type="number"
                      autoFocus
                      min={0}
                      max={9999}
                      value={editScoreText}
                      onChange={(e) => setEditScoreText(e.target.value)}
                      onKeyDown={(e) => {
                        // Prevent triggering arrow slide navigation
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          saveGroupScore(group.id);
                        } else if (e.key === 'Escape') {
                          setEditingScoreGroupId(null);
                        }
                      }}
                      onBlur={() => saveGroupScore(group.id)}
                      className="w-24 text-center font-mono font-black text-3xl text-[#3F4147] bg-white border-2 border-[#AFC4D5] rounded-xl py-0.5 outline-none focus:ring-2 focus:ring-[#AFC4D5]"
                    />
                    <button
                      onClick={() => saveGroupScore(group.id)}
                      className="p-1.5 rounded-lg bg-[#3F4147] text-white hover:bg-black"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => startEditScore(group)}
                    className="cursor-pointer group/score flex items-baseline justify-center gap-1 w-full py-1 hover:scale-105 transition-transform"
                    title="Klik angka untuk mengetik skor secara langsung"
                  >
                    <span className="font-mono font-black text-4xl sm:text-5xl text-[#3F4147] tracking-tight">
                      {group.score}
                    </span>
                    <span className="text-[10px] font-mono text-[#B8AAA0] opacity-60 group-hover/score:opacity-100">
                      pts
                    </span>
                  </div>
                )}

                <span className="text-[9px] text-[#3F4147]/50 mt-0.5">
                  Klik angka untuk mengetik langsung
                </span>
              </div>

              {/* Quick Action Buttons: +10, +5, -5 */}
              <div className="space-y-1.5 pt-2 border-t border-[#AFC4D5]/20">
                <div className="grid grid-cols-2 gap-1.5">
                  {/* +10 Button */}
                  <button
                    onClick={() => adjustScore(group.id, 10)}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white font-mono font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-2xs"
                    title="Tambah 10 poin"
                  >
                    <Plus size={13} />
                    <span>10</span>
                  </button>

                  {/* +5 Button */}
                  <button
                    onClick={() => adjustScore(group.id, 5)}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-white border border-[#AFC4D5]/60 hover:bg-[#FAF7F4] text-[#3F4147] font-mono font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-2xs"
                    title="Tambah 5 poin"
                  >
                    <Plus size={13} className="text-[#059669]" />
                    <span>5</span>
                  </button>
                </div>

                {/* -5 Button (score cannot drop below 0) */}
                <button
                  onClick={() => adjustScore(group.id, -5)}
                  disabled={group.score === 0}
                  className="w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-700 font-mono font-semibold text-xs transition-all active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white"
                  title="Kurang 5 poin (minimal 0)"
                >
                  <Minus size={12} />
                  <span>Kurang 5</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Classroom Helper Strip */}
      <div className="rounded-2xl border border-[#AFC4D5]/25 bg-white p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#3F4147]/80">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-[#F59E0B] shrink-0" />
          <span>
            <strong>Tips Pengajar:</strong> Skor disimpan otomatis di peramban (browser). Anda dapat bebas beralih ke materi atau kuis tanpa khawatir skor hilang.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[11px] text-[#B8AAA0]">
            Posisi kartu terkunci agar klik aman
          </span>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: PENGUMUMAN PEMENANG (CELEBRATION OVERLAY)
          - Tampilkan pemenang tunggal atau "Pemenang Bersama" jika seri
          - Konfeti singkat tanpa suara
          - Scrollable di device manapun agar konten dan tombol kembali selalu mudah diakses
          - Sticky bottom action bar dengan tombol "Kembali ke Menu Utama"
      ========================================================================= */}
      <AnimatePresence>
        {showWinnerModal && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-[#3F4147]/70 backdrop-blur-sm p-3 sm:p-4 md:p-6 flex items-start sm:items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Pengumuman Hasil Pemenang Skor"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              className="relative w-full max-w-xl my-auto max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-3xl border-2 border-[#AFC4D5]/40 bg-gradient-to-b from-white via-[#FAF7F4] to-[#F5EFE6] shadow-2xl overflow-hidden"
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setShowWinnerModal(false)}
                className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/80 sm:bg-transparent text-[#3F4147]/60 hover:text-[#3F4147] hover:bg-black/5 transition-colors shadow-2xs sm:shadow-none"
                aria-label="Tutup Pengumuman"
              >
                <X size={20} />
              </button>

              {/* Scrollable Modal Content (Universal scroll on any device) */}
              <div className="overflow-y-auto px-5 sm:px-8 pt-6 pb-4 space-y-5 text-center flex-1 overscroll-contain">
                {/* Decorative Stars */}
                <div className="flex items-center justify-center gap-2 text-[#F59E0B] pt-1">
                  <Sparkles size={20} />
                  <Trophy size={40} className="text-[#F59E0B]" />
                  <Sparkles size={20} />
                </div>

                {isAllZero ? (
                  <div className="space-y-3">
                    <h2 className="font-serif-display text-2xl sm:text-3xl text-[#3F4147]">
                      Belum Ada Skor Tercatat
                    </h2>
                    <p className="text-sm text-[#3F4147]/80 max-w-md mx-auto">
                      Semua kelompok masih memiliki skor 0. Mulailah kuis interaktif, tebak kata malaikat, atau sesi tanya jawab untuk memberikan poin kepada kelompok!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                        HASIL PERTANDINGAN KELAS
                      </span>
                      <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-[#3F4147] mt-1">
                        {winners.length > 1 ? 'Pemenang Bersama' : 'Selamat Kepada Pemenang!'}
                      </h2>
                    </div>

                    {/* Winners Display Cards (Scrollable if many winners) */}
                    <div
                      className={`grid gap-3 pt-1 ${
                        winners.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-sm mx-auto'
                      }`}
                    >
                      {winners.map((winner) => (
                        <div
                          key={winner.id}
                          className="rounded-2xl border-2 border-[#F59E0B] bg-white p-3.5 sm:p-4 shadow-md flex items-center justify-between gap-3 text-left"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#F59E0B] shrink-0">
                              <Crown size={22} className="fill-[#F59E0B]" />
                            </div>
                            <div className="truncate">
                              <h4 className="font-serif-display text-base sm:text-lg md:text-xl text-[#3F4147] font-bold truncate">
                                {winner.name}
                              </h4>
                              <span className="text-[11px] text-[#B8AAA0] uppercase tracking-wider font-semibold">
                                Juara 1
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono font-black text-2xl sm:text-3xl text-[#3F4147]">
                              {winner.score}
                            </span>
                            <span className="text-[10px] font-mono text-[#B8AAA0] block">
                              POIN
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cheerful Nara Message */}
                    <div className="pt-2">
                      <NaraCharacter
                        pose="celebrating"
                        bubbleText={
                          winners.length > 1
                            ? 'Alhamdulillah, persaingan sehat yang luar biasa! Teruslah kompak dan mawas diri dalam setiap amal perbuatan.'
                            : `Maa syaa Allah, selamat untuk ${winners[0]?.name}! Tetap rendah hati, saling menghargai, dan selalu introspeksi diri ya!`
                        }
                        bubblePosition="top"
                        size="sm"
                        showNameTag={false}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Sticky Bottom Bar so Kembali buttons are always accessible on ANY device */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-[#AFC4D5]/30 shrink-0 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setShowWinnerModal(false);
                    onBackToHome();
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#88AB8E] hover:bg-[#729478] text-white text-sm font-bold tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home size={18} />
                  <span>Kembali ke Menu Utama</span>
                </button>

                <button
                  onClick={() => setShowWinnerModal(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border-2 border-[#3F4147]/25 hover:bg-[#FAF7F4] text-[#3F4147] text-sm font-semibold transition-all shadow-xs active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Tetap di Papan Skor</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 2: KONFIRMASI RESET SEMUA SKOR
          - Mencegah klik tidak sengaja
          - Mengembalikan skor ke 0 dan mempertahankan nama kelompok
      ========================================================================= */}
      {/* =========================================================================
          MODAL 2: KONFIRMASI RESET SEMUA SKOR
          - Mencegah klik tidak sengaja
          - Mengembalikan skor ke 0 dan mempertahankan nama kelompok
      ========================================================================= */}
      <AnimatePresence>
        {showResetConfirmModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#3F4147]/70 backdrop-blur-sm p-4 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md my-auto max-h-[90vh] overflow-y-auto rounded-3xl border border-[#AFC4D5]/40 bg-white p-6 shadow-2xl space-y-5 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <RotateCcw size={22} />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif-display text-xl text-[#3F4147]">
                  Reset Semua Skor?
                </h3>
                <p className="text-xs sm:text-sm text-[#3F4147]/75 leading-relaxed">
                  Semua skor kelompok akan dikembalikan menjadi <strong>0</strong>. Nama kelompok yang sudah Anda sesuaikan akan tetap tersimpan.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirmModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#AFC4D5]/40 text-xs sm:text-sm font-semibold text-[#3F4147] hover:bg-[#FAF7F4] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  Ya, Reset Skor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 3: PANDUAN SKORING KELAS
      ========================================================================= */}
      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#3F4147]/70 backdrop-blur-sm p-4 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg my-auto max-h-[90vh] overflow-y-auto rounded-3xl border border-[#AFC4D5]/40 bg-white p-6 shadow-2xl space-y-4"
            >
              <button
                onClick={() => setShowGuideModal(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-[#3F4147]/60 hover:text-[#3F4147]"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2">
                <EightPointStar size={18} color="#AFC4D5" />
                <h3 className="font-serif-display text-lg text-[#3F4147]">
                  Panduan Poin Pembelajaran PAI
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-[#3F4147]/85">
                <div className="p-3 rounded-xl bg-[#FAF7F4] border border-[#AFC4D5]/20 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-sm text-[#059669] shrink-0">+10 Poin</span>
                  <p>Menjawab pertanyaan kuis malaikat dengan benar atau memberikan refleksi mawas diri yang mendalam.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F4] border border-[#AFC4D5]/20 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-sm text-[#3F4147] shrink-0">+5 Poin</span>
                  <p>Menemukan 1 kata nama malaikat pada papan game cari kata atau aktif berpartisipasi dalam diskusi kelompok.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F4] border border-red-100 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-sm text-red-600 shrink-0">-5 Poin</span>
                  <p>Kurang tertib saat pembelajaran berlangsung (skor tidak akan pernah kurang dari 0).</p>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#3F4147] text-white text-xs font-semibold hover:bg-black"
                >
                  Mengerti
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
