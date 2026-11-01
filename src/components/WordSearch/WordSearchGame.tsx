import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { NaraCharacter } from '../Character/NaraCharacter';
import { EightPointStar } from '../Decorations/IslamicGeometry';
import { useWordSearchProgress } from '../../hooks/useWordSearchProgress';
import { WordSearchItem } from '../../data/wordSearchData';
import {
  GroupItem,
  STORAGE_KEY_SCOREBOARD,
  INITIAL_GROUPS
} from '../../pages/GroupScoreboardPage';
import {
  CheckCircle2,
  RotateCcw,
  Home,
  Sparkles,
  Lightbulb,
  Trophy,
  ArrowRight,
  Shuffle,
  Clock,
  Play,
  Pause,
  Plus,
  Minus,
  Check,
  Award,
  Crown,
  Info,
  Flame,
  Volume2
} from 'lucide-react';

interface WordSearchGameProps {
  onBackToHome: () => void;
  onGoToQuiz: () => void;
  onGoToScoreboard?: () => void;
  wordSearchProgress?: ReturnType<typeof useWordSearchProgress>;
}

export const WordSearchGame: React.FC<WordSearchGameProps> = ({
  onBackToHome,
  onGoToQuiz,
  onGoToScoreboard,
  wordSearchProgress: externalProgress
}) => {
  // Use external hook from App.tsx or fallback to internal hook
  const internalProgress = useWordSearchProgress();
  const game = externalProgress || internalProgress;

  const {
    board,
    foundWords,
    lastFoundMessage,
    setLastFoundMessage,
    shuffleBoard,
    partialShuffle,
    resetCurrentBoard,
    addFoundWord,
    isCompleted
  } = game;

  // Selection states
  const [selectedStart, setSelectedStart] = useState<[number, number] | null>(null);
  const [hoveredEnd, setHoveredEnd] = useState<[number, number] | null>(null);
  const [hintWordId, setHintWordId] = useState<string | null>(null);
  const [showShuffleConfirm, setShowShuffleConfirm] = useState(false);

  // 15-Second Timer State
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [timerAlert, setTimerAlert] = useState<boolean>(false);

  // Score Modal Pop-up State (opened immediately when 1 word is found)
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const [recentlyFoundAngel, setRecentlyFoundAngel] = useState<WordSearchItem | null>(null);
  const [isFinalAngelFound, setIsFinalAngelFound] = useState<boolean>(false);

  // Group scores state synchronized with unified localStorage (3 groups)
  const [groups, setGroups] = useState<GroupItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCOREBOARD);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 3) {
          return parsed.map((item, idx) => ({
            ...INITIAL_GROUPS[idx],
            ...item,
            name: typeof item.name === 'string' && item.name.trim() !== '' ? item.name : INITIAL_GROUPS[idx].name,
            score: typeof item.score === 'number' && !isNaN(item.score) ? Math.max(0, Math.floor(item.score)) : 0,
            members: Array.isArray(item.members) ? item.members : INITIAL_GROUPS[idx].members
          }));
        } else if (Array.isArray(parsed) && parsed.length > 3) {
          return INITIAL_GROUPS.map((initialG, idx) => ({
            ...initialG,
            name: typeof parsed[idx]?.name === 'string' && parsed[idx].name.trim() !== '' ? parsed[idx].name : initialG.name,
            score: typeof parsed[idx]?.score === 'number' && !isNaN(parsed[idx].score) ? Math.max(0, Math.floor(parsed[idx].score)) : 0,
            members: Array.isArray(parsed[idx]?.members) ? parsed[idx].members : initialG.members
          }));
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_GROUPS;
  });

  // Track which group was awarded points in current modal session
  const [awardedGroupId, setAwardedGroupId] = useState<number | null>(null);

  // Save groups whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCOREBOARD, JSON.stringify(groups));
    } catch {
      // ignore
    }
  }, [groups]);

  // Sync groups from localStorage when Score Modal opens
  useEffect(() => {
    if (showScoreModal) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_SCOREBOARD);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 3) {
            setGroups(parsed);
          } else if (Array.isArray(parsed) && parsed.length > 3) {
            setGroups(
              INITIAL_GROUPS.map((g, idx) => ({
                ...g,
                name: parsed[idx]?.name || g.name,
                score: parsed[idx]?.score || 0
              }))
            );
          }
        }
      } catch {
        // ignore
      }
    }
  }, [showScoreModal]);

  // Adjust score for a specific group (+10 or -5 or +5)
  const handleAdjustScore = (groupId: number, delta: number) => {
    setAwardedGroupId(groupId);
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

  // Close Score Modal, save, and resume game with fresh 15 seconds
  const handleSaveScoreAndContinue = () => {
    try {
      localStorage.setItem(STORAGE_KEY_SCOREBOARD, JSON.stringify(groups));
    } catch {
      // ignore
    }
    setShowScoreModal(false);
    setAwardedGroupId(null);

    // If all 10 angels have been found, victory is confirmed
    if (foundWords.length >= board.words.length || isFinalAngelFound) {
      setIsTimerPaused(true);
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      return;
    }

    // Otherwise, resume countdown from 15 seconds for the next angel
    setTimeLeft(15);
    setIsTimerPaused(false);
    setHasStarted(true);
  };

  // =========================================================================
  // 15-SECOND COUNTDOWN TIMER EFFECT
  // =========================================================================
  useEffect(() => {
    // Only tick if started, not paused, and game not completed
    if (!hasStarted || isTimerPaused || isCompleted || showScoreModal) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // TIME EXPIRED!
          // 1. Partial reshuffle of UNFOUND words & filler letters ONLY!
          // Found words remain strictly locked in their cells.
          partialShuffle();

          // 2. Clear active manual drag/selection
          setSelectedStart(null);
          setHoveredEnd(null);
          setHintWordId(null);

          // 3. User feedback notification
          setLastFoundMessage(
            'Waktu habis! Huruf diacak kembali. Kata yang sudah ditemukan tetap tersimpan.'
          );

          // 4. Reset timer back to 15s automatically without needing button press
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, isTimerPaused, isCompleted, showScoreModal, partialShuffle, setLastFoundMessage]);

  // Visual warning pulse when timeLeft <= 4
  useEffect(() => {
    setTimerAlert(hasStarted && !isTimerPaused && !isCompleted && timeLeft <= 4);
  }, [hasStarted, isTimerPaused, isCompleted, timeLeft]);

  // =========================================================================
  // STRICT FORWARD SELECTION (Horizontal L-to-R or Vertical Top-to-Bottom only)
  // No backwards (e.g. LIRBIJ is forbidden), No diagonals
  // =========================================================================
  const getLineCells = (
    start: [number, number],
    end: [number, number]
  ): [number, number][] => {
    const [r1, c1] = start;
    const [r2, c2] = end;
    const dr = r2 - r1;
    const dc = c2 - c1;

    // 1. Mendatar (Kiri ke Kanan ONLY): dr === 0 and dc >= 0
    const isMendatarKanan = dr === 0 && dc >= 0;

    // 2. Menurun (Atas ke Bawah ONLY): dr >= 0 and dc === 0
    const isMenurunBawah = dr >= 0 && dc === 0;

    // If backwards (dc < 0 or dr < 0) or diagonal: NOT ALLOWED, clamp to start
    if (!isMendatarKanan && !isMenurunBawah) {
      return [start];
    }

    const steps = Math.max(dr, dc);
    const stepR = dr === 0 ? 0 : 1;
    const stepC = dc === 0 ? 0 : 1;

    const cells: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      cells.push([r1 + i * stepR, c1 + i * stepC]);
    }
    return cells;
  };

  // Currently active selected cells
  const currentSelectionCells = useMemo(() => {
    if (!selectedStart) return [];
    if (!hoveredEnd) return [selectedStart];
    return getLineCells(selectedStart, hoveredEnd);
  }, [selectedStart, hoveredEnd]);

  // Map of cells already found -> color highlight
  const foundCellColorMap = useMemo(() => {
    const map = new Map<string, string>();
    foundWords.forEach((wordId) => {
      const item = board.words.find((w) => w.id === wordId);
      if (item) {
        item.cells.forEach(([r, c]) => {
          map.set(`${r},${c}`, item.color);
        });
      }
    });
    return map;
  }, [foundWords, board]);

  // Check if selection matches any angel name
  const checkSelection = (start: [number, number], end: [number, number]) => {
    const [r1, c1] = start;
    const [r2, c2] = end;
    const dr = r2 - r1;
    const dc = c2 - c1;

    // Must be valid forward direction (mendatar kanan atau menurun bawah)
    const isMendatarKanan = dr === 0 && dc >= 0;
    const isMenurunBawah = dr >= 0 && dc === 0;
    if (!isMendatarKanan && !isMenurunBawah) {
      return false;
    }

    const cells = getLineCells(start, end);
    // Strictly read forward letters (never reversed)
    const selectedLetters = cells.map(([r, c]) => board.grid[r][c]).join('');

    for (const item of board.words) {
      if (foundWords.includes(item.id)) continue;

      if (item.name === selectedLetters) {
        // MATCH FOUND!
        // 1. Lock and highlight the word
        addFoundWord(item.id, item.name, item.duty);
        setRecentlyFoundAngel(item);
        setHintWordId(null);

        // Check if this is the 10th (last) angel
        const isLastOne = foundWords.length + 1 >= board.words.length;
        setIsFinalAngelFound(isLastOne);

        // 2. PAUSE TIMER IMMEDIATELY
        setIsTimerPaused(true);

        // 3. SHOW SCORE MODAL DIRECTLY
        setShowScoreModal(true);
        setLastFoundMessage(`Benar! Kata Malaikat ${item.name} berhasil ditemukan!`);

        return true;
      }
    }
    return false;
  };

  const handleCellClick = (r: number, c: number) => {
    // If game has not started, auto-start timer on first click
    if (!hasStarted) {
      setHasStarted(true);
      setIsTimerPaused(false);
    }

    if (!selectedStart) {
      // First click: select start cell
      setSelectedStart([r, c]);
      setHoveredEnd([r, c]);
    } else {
      // Second click: finalize selection and check word
      checkSelection(selectedStart, [r, c]);
      setSelectedStart(null);
      setHoveredEnd(null);
    }
  };

  const handleCellMouseEnter = (r: number, c: number) => {
    if (selectedStart) {
      setHoveredEnd([r, c]);
    }
  };

  // Start game explicitly
  const handleStartGame = () => {
    setHasStarted(true);
    setIsTimerPaused(false);
    setTimeLeft(15);
  };

  // Toggle pause
  const handleTogglePause = () => {
    if (!hasStarted) {
      handleStartGame();
      return;
    }
    setIsTimerPaused((prev) => !prev);
  };

  const handleManualShuffle = () => {
    shuffleBoard();
    setSelectedStart(null);
    setHoveredEnd(null);
    setHintWordId(null);
    setShowShuffleConfirm(false);
    setTimeLeft(15);
    setHasStarted(true);
    setIsTimerPaused(false);
  };

  const handleResetCurrent = () => {
    resetCurrentBoard();
    setSelectedStart(null);
    setHoveredEnd(null);
    setHintWordId(null);
    setTimeLeft(15);
    setHasStarted(true);
    setIsTimerPaused(false);
  };

  const handleShowHint = () => {
    const unfound = board.words.filter((w) => !foundWords.includes(w.id));
    if (unfound.length > 0) {
      setHintWordId(unfound[0].id);
      setLastFoundMessage(
        `Petunjuk: Perhatikan huruf pertama Malaikat ${unfound[0].name} (baris ${unfound[0].cells[0][0] + 1}, kolom ${unfound[0].cells[0][1] + 1})!`
      );
    }
  };

  const currentHintItem = hintWordId ? board.words.find((w) => w.id === hintWordId) : null;
  const hintFirstCell = currentHintItem?.cells[0];

  // Highest score calculation
  const maxScore = Math.max(...groups.map((g) => g.score));

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-5">
      {/* =====================================================================
          TOP HEADER BAR WITH TIMER DISPLAY & QUICK CONTROLS
      ===================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#AFC4D5]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <EightPointStar size={16} color="#D9B8B8" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
              Game Cari Kata · Ramah Anak SD & Kelas VII
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl text-[#3F4147] mt-0.5">
            10 NAMA MALAIKAT ALLAH SWT.
          </h1>
          <p className="text-xs text-[#3F4147]/75">
            Tepat <strong>5 kata mendatar (kiri ke kanan ➔)</strong> dan <strong>5 kata menurun (atas ke bawah ⬇)</strong>. Waktu 15 detik!
          </p>
        </div>

        {/* Action Controls & Top Navigation */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Scoreboard Link */}
          {onGoToScoreboard && (
            <button
              onClick={onGoToScoreboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-[#92400E] transition-all shadow-2xs cursor-pointer"
              title="Buka Papan Skor Kelompok Utama"
            >
              <Trophy size={14} className="text-amber-500" />
              <span className="hidden sm:inline">Papan Skor</span>
            </button>
          )}

          {/* Reset All / Shuffle Board Button */}
          <button
            onClick={() => setShowShuffleConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-semibold text-indigo-800 transition-all shadow-2xs cursor-pointer"
            title="Acak tata letak baru dari awal"
          >
            <Shuffle size={14} className="text-indigo-600" />
            <span className="hidden sm:inline">Acak Baru</span>
          </button>

          {/* Reset Current Board */}
          <button
            onClick={handleResetCurrent}
            className="p-2 rounded-xl border border-[#AFC4D5]/30 bg-white/80 hover:bg-white text-xs font-medium text-[#3F4147] transition-colors cursor-pointer"
            title="Ulangi pencarian pada papan ini"
          >
            <RotateCcw size={15} />
          </button>

          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl border border-[#AFC4D5]/30 bg-white/80 hover:bg-white text-xs font-medium text-[#3F4147] transition-colors cursor-pointer"
            title="Kembali ke Beranda"
          >
            <Home size={15} />
          </button>
        </div>
      </div>

      {/* =====================================================================
          TIMER STRIP & INSTRUCTION DASHBOARD
          - Visual 15-second countdown bar
          - "Mulai" button if not yet running
          - Auto-re-randomizes unfound words at 0s, preserving found words
      ===================================================================== */}
      <div className="rounded-2xl bg-white border border-[#AFC4D5]/35 p-3.5 sm:p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* 15s Timer Widget */}
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-xl transition-all shadow-xs ${
                !hasStarted
                  ? 'bg-slate-100 text-slate-500'
                  : isTimerPaused
                  ? 'bg-amber-100 text-amber-700'
                  : timerAlert
                  ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                  : timeLeft <= 7
                  ? 'bg-amber-500 text-white'
                  : 'bg-[#88AB8E] text-white'
              }`}
            >
              {timeLeft}s
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3F4147]">
                  Hitungan Waktu 15 Detik
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    !hasStarted
                      ? 'bg-slate-100 text-slate-600'
                      : isTimerPaused
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {!hasStarted ? 'Siap Mulai' : isTimerPaused ? 'Dijeda' : 'Berjalan'}
                </span>
              </div>
              <p className="text-[11px] text-[#3F4147]/70">
                {isCompleted
                  ? 'Semua kata telah ditemukan!'
                  : isTimerPaused
                  ? 'Waktu dihentikan sementara (pencatatan skor kelompok).'
                  : timerAlert
                  ? 'Perhatian: Waktu segera habis! Kata belum ditemukan akan diacak ulang.'
                  : 'Jika waktu 15 detik habis, huruf diacak kembali tanpa mengubah kata yang sudah ditemukan.'}
              </p>
            </div>
          </div>

          {/* Action Buttons: Mulai / Jeda & Petunjuk */}
          <div className="flex items-center gap-2 shrink-0">
            {!hasStarted ? (
              <button
                onClick={handleStartGame}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#88AB8E] hover:bg-[#729478] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Play size={14} className="fill-white" />
                <span>Mulai Pencarian</span>
              </button>
            ) : (
              <button
                onClick={handleTogglePause}
                disabled={isCompleted}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#AFC4D5]/50 bg-[#FAF7F4] hover:bg-white text-xs font-semibold text-[#3F4147] transition-all disabled:opacity-40 cursor-pointer"
              >
                {isTimerPaused ? <Play size={13} /> : <Pause size={13} />}
                <span>{isTimerPaused ? 'Lanjutkan' : 'Jeda Waktu'}</span>
              </button>
            )}

            <button
              onClick={handleShowHint}
              disabled={isCompleted}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold transition-colors disabled:opacity-40 cursor-pointer text-xs"
            >
              <Lightbulb size={13} className="text-amber-500" />
              <span>Petunjuk</span>
            </button>
          </div>
        </div>

        {/* 15-Second Animated Progress Bar */}
        <div className="w-full h-2 bg-[#AFC4D5]/20 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              timerAlert
                ? 'bg-red-500'
                : timeLeft <= 7
                ? 'bg-amber-500'
                : 'bg-[#88AB8E]'
            }`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>

        {/* Easy Rules Helper Badge */}
        <div className="pt-1 border-t border-[#AFC4D5]/15 flex items-center justify-between text-[11px] text-[#3F4147]/75 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              <strong>Aturan 5 & 5:</strong> Tepat <strong>5 kata mendatar (➔)</strong> dan <strong>5 kata menurun (⬇)</strong>. Tidak terbalik atau miring!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              Benar: +10 Poin · Salah: -5 Poin
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Notification Banner */}
      {lastFoundMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-emerald-300 bg-emerald-50/95 p-3 text-xs text-emerald-950 font-medium flex items-center justify-between shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{lastFoundMessage}</span>
          </div>
          <button
            onClick={() => setLastFoundMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs px-2 py-0.5 rounded cursor-pointer font-bold"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* =====================================================================
          MAIN GAME ARENA: GRID & WORD CHECKLIST
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left: Large Interactive Grid (Projector-friendly) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-[540px] p-2.5 sm:p-4 rounded-3xl border-2 border-[#AFC4D5]/50 bg-white shadow-md overflow-x-auto">
            {/* Grid size 11x11 or 12x12 */}
            <div
              className="grid gap-1 sm:gap-1.5 select-none touch-manipulation"
              style={{
                gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))`
              }}
            >
              {board.grid.map((row, r) =>
                row.map((letter, c) => {
                  const cellKey = `${r},${c}`;
                  const isFoundColor = foundCellColorMap.get(cellKey);
                  const isSelected = currentSelectionCells.some(([sr, sc]) => sr === r && sc === c);
                  const isStart = selectedStart && selectedStart[0] === r && selectedStart[1] === c;
                  const isHinted = hintFirstCell && hintFirstCell[0] === r && hintFirstCell[1] === c;

                  let cellBg = 'bg-[#FAF7F4] hover:bg-[#AFC4D5]/20 text-[#3F4147]';
                  let borderStyle = 'border-transparent';

                  if (isFoundColor) {
                    cellBg = 'text-white font-bold shadow-xs';
                  } else if (isSelected) {
                    cellBg = 'bg-[#3F4147] text-white font-bold ring-2 ring-[#88AB8E]';
                  } else if (isHinted) {
                    cellBg = 'bg-amber-100 text-amber-950 font-bold animate-pulse ring-2 ring-amber-400';
                  } else if (isStart) {
                    cellBg = 'bg-[#88AB8E] text-white font-bold ring-2 ring-[#88AB8E]';
                  }

                  return (
                    <button
                      key={cellKey}
                      onClick={() => handleCellClick(r, c)}
                      onMouseEnter={() => handleCellMouseEnter(r, c)}
                      style={{
                        backgroundColor: isFoundColor ? isFoundColor : undefined
                      }}
                      className={`w-full aspect-square flex items-center justify-center rounded-xl text-base sm:text-lg font-mono font-black transition-all border ${borderStyle} ${cellBg} cursor-pointer active:scale-95`}
                      aria-label={`Baris ${r + 1}, Kolom ${c + 1}: Huruf ${letter}`}
                    >
                      {letter}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Interactive Step Guide for Students */}
          <div className="mt-3 text-xs text-[#3F4147]/80 text-center flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#88AB8E] animate-ping" />
            <span>
              {selectedStart
                ? 'Langkah 2: Klik huruf terakhir nama malaikat (hanya ke kanan atau ke bawah).'
                : 'Langkah 1: Klik huruf awal nama malaikat untuk mulai memilih.'}
            </span>
          </div>
        </div>

        {/* Right: Word Checklist, Progress & Nara Companion */}
        <div className="lg:col-span-4 space-y-4">
          {/* Checklist Card */}
          <div className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#AFC4D5]/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3F4147]">
                Daftar 10 Malaikat
              </span>
              <span className="text-xs font-mono font-bold text-[#88AB8E] bg-[#88AB8E]/10 px-2 py-0.5 rounded-md">
                {foundWords.length} / {board.words.length}
              </span>
            </div>

            <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              {board.words.map((item) => {
                const isFound = foundWords.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-2 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${
                      isFound
                        ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 opacity-90 shadow-2xs'
                        : 'border-[#AFC4D5]/25 bg-[#F8F5F0]/60 text-[#3F4147] hover:border-[#AFC4D5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold flex-wrap">
                        <span className={isFound ? 'line-through text-emerald-800' : ''}>
                          {item.name}
                        </span>
                        {isFound ? (
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        ) : (
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                            item.direction === 'Mendatar'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {item.direction === 'Mendatar' ? 'Mendatar ➔' : 'Menurun ⬇'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#3F4147]/70 leading-snug">
                        {item.duty}
                      </p>
                    </div>

                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-1 shadow-2xs"
                      style={{ backgroundColor: item.color }}
                      title={`Tanda warna: ${item.name}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Group Score Recap Strip */}
          <div className="rounded-2xl border border-[#AFC4D5]/25 bg-white p-3.5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#3F4147] uppercase tracking-wider flex items-center gap-1">
                <Trophy size={13} className="text-amber-500" />
                <span>Skor Kelompok Terkini</span>
              </span>
              <span className="text-[10px] text-[#B8AAA0] font-mono">
                +10 benar / -5 salah
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {groups.map((g) => (
                <div
                  key={g.id}
                  className="p-2 rounded-xl border border-[#AFC4D5]/35 bg-[#FAF7F4] flex flex-col items-center"
                >
                  <span className="text-[10px] font-bold text-[#3F4147] truncate w-full">
                    {g.name}
                  </span>
                  <span className="font-mono font-black text-base text-[#3F4147]">
                    {g.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Nara Companion */}
          <div className="rounded-2xl border border-[#AFC4D5]/25 bg-white/70 p-3.5 flex flex-col items-center text-center">
            <NaraCharacter
              pose={isCompleted ? 'celebrating' : foundWords.length > 5 ? 'happy' : 'curious'}
              bubbleText={
                isCompleted
                  ? 'Alhamdulillah! Seluruh 10 Malaikat Allah berhasil ditemukan!'
                  : foundWords.length > 0
                  ? `Hebat! Sudah ${foundWords.length} malaikat ditemukan. Terus cari yang mendatar atau menurun ya!`
                  : 'Klik "Mulai Pencarian", temukan nama malaikat, lalu catat skor kelompokmu!'
              }
              size="sm"
              showNameTag={false}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL: POP-UP SKOR KELOMPOK (MUNCUL OTOMATIS SAAT 1 KATA DITEMUKAN)
          - Timer berhenti sementara (paused)
          - Guru dapat memilih kelompok & menambah poin (+10 / -5)
          - Tombol "Simpan Skor & Lanjutkan" menyimpan data ke localStorage
            dan melanjutkan timer dari 15 detik
      ===================================================================== */}
      <AnimatePresence>
        {showScoreModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#3F4147]/75 backdrop-blur-xs overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Catat Skor Kelompok"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              className="relative w-full max-w-lg my-auto rounded-3xl border-2 border-emerald-400 bg-white p-5 sm:p-6 shadow-2xl space-y-4"
            >
              {/* Header: Angel Found Badge */}
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Kata Berhasil Ditemukan!</span>
                </div>

                {recentlyFoundAngel && (
                  <div className="pt-1">
                    <h3 className="font-serif-display text-2xl sm:text-3xl text-[#3F4147] tracking-tight">
                      Malaikat {recentlyFoundAngel.name}
                    </h3>
                    <p className="text-xs text-[#3F4147]/80">
                      Tugas: <strong>{recentlyFoundAngel.duty}</strong>
                    </p>
                  </div>
                )}

                <p className="text-xs text-[#3F4147]/70 pt-1">
                  Pilih kelompok yang berhasil menemukan kata untuk memberikan nilai:
                </p>
              </div>

              {/* Five Groups Score Cards Strip inside Modal */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {groups.map((group) => {
                  const isAwarded = awardedGroupId === group.id;
                  return (
                    <div
                      key={group.id}
                      className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                        isAwarded
                          ? 'border-emerald-500 bg-emerald-50/70 shadow-xs'
                          : `${group.borderColor} bg-white hover:bg-[#FAF7F4]`
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                          style={{ backgroundColor: group.themeColor }}
                        />
                        <div className="truncate">
                          <h4 className="font-bold text-xs sm:text-sm text-[#3F4147] truncate">
                            {group.name}
                          </h4>
                          <span className="text-[10px] text-[#B8AAA0] uppercase tracking-wider font-mono">
                            Total: {group.score} Poin
                          </span>
                          {group.members && group.members.length > 0 && (
                            <p className="text-[10px] text-slate-500 truncate max-w-[190px] sm:max-w-[240px]" title={group.members.join(', ')}>
                              Anggota: {group.members.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quick Scoring Buttons: +10 (Benar), +5, -5 (Salah) */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleAdjustScore(group.id, 10)}
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs transition-all shadow-2xs active:scale-95 flex items-center gap-1 cursor-pointer"
                          title="Tambah 10 poin (Jawaban Benar)"
                        >
                          <Plus size={11} />
                          <span>10</span>
                        </button>

                        <button
                          onClick={() => handleAdjustScore(group.id, 5)}
                          className="px-2 py-1.5 rounded-xl bg-white border border-[#AFC4D5]/60 hover:bg-[#FAF7F4] text-[#3F4147] font-mono font-bold text-xs transition-all active:scale-95 cursor-pointer"
                          title="Tambah 5 poin"
                        >
                          <Plus size={11} className="text-emerald-600" />
                          <span>5</span>
                        </button>

                        <button
                          onClick={() => handleAdjustScore(group.id, -5)}
                          disabled={group.score === 0}
                          className="px-2 py-1.5 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-700 font-mono font-semibold text-xs transition-all active:scale-95 disabled:opacity-30 cursor-pointer"
                          title="Kurang 5 poin (Jawaban Salah)"
                        >
                          <Minus size={11} />
                          <span>5</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative Note & Save & Continue Button */}
              <div className="space-y-2 pt-2 border-t border-[#AFC4D5]/20">
                <div className="flex items-center justify-between text-[11px] text-[#3F4147]/70">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-emerald-600" />
                    Waktu berikutnya diatur kembali ke <strong>15 detik</strong>.
                  </span>
                  <span className="font-mono text-emerald-800 font-semibold">
                    {foundWords.length} / 10 Kata Ditemukan
                  </span>
                </div>

                <button
                  onClick={handleSaveScoreAndContinue}
                  className="w-full py-3 px-4 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white font-bold text-sm tracking-wide shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check size={16} className="text-emerald-400" />
                  <span>Simpan Skor & Lanjutkan (15 Detik)</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          CONFIRM SHUFFLE MODAL
      ===================================================================== */}
      <AnimatePresence>
        {showShuffleConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4147]/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-[#AFC4D5]/40 p-6 max-w-sm w-full shadow-2xl text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center">
                <Shuffle size={24} />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif-display text-lg text-[#3F4147]">
                  Acak Tata Letak Baru?
                </h3>
                <p className="text-xs text-[#3F4147]/75 leading-relaxed">
                  Papan baru akan dibuat dengan arah yang tetap mudah (mendatar dan menurun). Progres pencarian akan diulang dari awal.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowShuffleConfirm(false)}
                  className="flex-1 py-2 rounded-xl border border-[#AFC4D5]/40 text-xs font-semibold text-[#3F4147] hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleManualShuffle}
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Ya, Acak Baru
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          VICTORY MODAL / GAME COMPLETED
      ===================================================================== */}
      <AnimatePresence>
        {isCompleted && !showScoreModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4147]/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center shadow-xs">
                <Trophy size={36} />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
                  Permainan Selesai
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#3F4147]">
                  Mumtaz! Luar Biasa!
                </h3>
                <p className="text-xs sm:text-sm text-[#3F4147]/80 leading-relaxed">
                  Seluruh <strong>10 Nama Malaikat Allah Swt.</strong> berhasil ditemukan! Skor semua kelompok telah tersimpan.
                </p>
              </div>

              {/* Group Rankings Mini Recap */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F4] border border-[#AFC4D5]/30 text-xs space-y-2">
                <div className="text-[11px] font-bold text-[#3F4147] uppercase tracking-wider">
                  Rekap Skor Kelompok
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {groups.map((g) => (
                    <div
                      key={g.id}
                      className={`p-2 rounded-xl border text-center ${
                        maxScore > 0 && g.score === maxScore
                          ? 'border-amber-400 bg-amber-50 font-bold shadow-xs'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <span className="text-[10px] text-[#3F4147] truncate block font-semibold">
                        {g.name}
                      </span>
                      <span className="font-mono text-base font-black text-[#3F4147]">
                        {g.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleManualShuffle}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Shuffle size={14} className="text-indigo-600" />
                    <span>Main Lagi / Acak</span>
                  </button>

                  {onGoToScoreboard && (
                    <button
                      onClick={onGoToScoreboard}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Trophy size={14} className="text-amber-600" />
                      <span>Papan Skor</span>
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onGoToQuiz}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#3F4147] text-white text-xs font-semibold hover:bg-[#2B2D31] transition-all cursor-pointer"
                  >
                    <span>Lanjut ke Kuis</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={onBackToHome}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#AFC4D5]/50 bg-white text-[#3F4147] text-xs font-semibold hover:bg-[#F8F5F0] transition-all cursor-pointer"
                  >
                    <Home size={14} />
                    <span>Beranda</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
