import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NaraCharacter } from '../Character/NaraCharacter';
import { EightPointStar } from '../Decorations/IslamicGeometry';
import { useWordSearchProgress } from '../../hooks/useWordSearchProgress';
import {
  CheckCircle2,
  RotateCcw,
  Home,
  Sparkles,
  Lightbulb,
  Trophy,
  ArrowRight,
  Shuffle,
  Compass
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
    resetCurrentBoard,
    addFoundWord,
    isCompleted
  } = game;

  const [selectedStart, setSelectedStart] = useState<[number, number] | null>(null);
  const [hoveredEnd, setHoveredEnd] = useState<[number, number] | null>(null);
  const [hintWordId, setHintWordId] = useState<string | null>(null);
  const [showShuffleConfirm, setShowShuffleConfirm] = useState(false);

  // Generate coordinates in a straight line between start and end
  const getLineCells = (start: [number, number], end: [number, number]): [number, number][] => {
    const [r1, c1] = start;
    const [r2, c2] = end;
    const dr = r2 - r1;
    const dc = c2 - c1;

    // Check if horizontal, vertical, or 45-deg diagonal
    const isHorizontal = dr === 0;
    const isVertical = dc === 0;
    const isDiagonal = Math.abs(dr) === Math.abs(dc);

    if (!isHorizontal && !isVertical && !isDiagonal) {
      return [start];
    }

    const steps = Math.max(Math.abs(dr), Math.abs(dc));
    const stepR = dr === 0 ? 0 : dr / steps;
    const stepC = dc === 0 ? 0 : dc / steps;

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

  // Map of cells already found -> color
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

  // Check if coordinates match any word
  const checkSelection = (start: [number, number], end: [number, number]) => {
    const cells = getLineCells(start, end);
    const selectedLetters = cells.map(([r, c]) => board.grid[r][c]).join('');
    const reversedLetters = selectedLetters.split('').reverse().join('');

    for (const item of board.words) {
      if (foundWords.includes(item.id)) continue;

      if (item.name === selectedLetters || item.name === reversedLetters) {
        // Match found!
        addFoundWord(item.id, item.name, item.duty);
        setHintWordId(null);
        return true;
      }
    }
    return false;
  };

  const handleCellClick = (r: number, c: number) => {
    if (!selectedStart) {
      // First click: select start
      setSelectedStart([r, c]);
      setHoveredEnd([r, c]);
    } else {
      // Second click: finalize line and check word
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

  const handleManualShuffle = () => {
    shuffleBoard();
    setSelectedStart(null);
    setHoveredEnd(null);
    setHintWordId(null);
    setShowShuffleConfirm(false);
  };

  const handleResetCurrent = () => {
    resetCurrentBoard();
    setSelectedStart(null);
    setHoveredEnd(null);
    setHintWordId(null);
  };

  const handleShowHint = () => {
    const unfound = board.words.filter((w) => !foundWords.includes(w.id));
    if (unfound.length > 0) {
      setHintWordId(unfound[0].id);
      setLastFoundMessage(`Petunjuk: Coba perhatikan huruf awal Malaikat ${unfound[0].name}!`);
    }
  };

  const currentHintItem = hintWordId ? board.words.find((w) => w.id === hintWordId) : null;
  const hintFirstCell = currentHintItem?.cells[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#AFC4D5]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <EightPointStar size={16} color="#D9B8B8" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
              Game Edukatif Islami · Acak Setiap Sesi
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl text-[#3F4147] mt-1">
            GAME CARI KATA MALAIKAT
          </h1>
          <p className="text-xs text-[#3F4147]/70">
            Temukan 10 Nama Malaikat Allah Swt. · Tata letak berganti otomatis setiap sesi refresh agar lebih menantang
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="text-right">
            <span className="text-xs font-semibold text-[#3F4147] block">
              Ditemukan: {foundWords.length} / {board.words.length}
            </span>
            <div className="w-28 sm:w-32 h-2 bg-[#AFC4D5]/25 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#88AB8E] rounded-full transition-all duration-300"
                style={{ width: `${(foundWords.length / board.words.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Quick Scoreboard Action for Teacher */}
          {onGoToScoreboard && (
            <button
              onClick={onGoToScoreboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-[#92400E] transition-all shadow-2xs cursor-pointer"
              title="Buka Papan Skor Kelompok untuk mencatat poin"
            >
              <Trophy size={14} className="text-amber-500" />
              <span className="hidden sm:inline">Papan Skor</span>
            </button>
          )}

          {/* Shuffle Board Layout Button */}
          <button
            onClick={() => setShowShuffleConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-semibold text-indigo-800 transition-all shadow-2xs cursor-pointer"
            title="Acak tata letak baru (ganti posisi kata)"
          >
            <Shuffle size={14} className="text-indigo-600" />
            <span className="hidden sm:inline">Acak Posisi Baru</span>
          </button>

          {/* Reset Current Layout Button */}
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

      {/* Instructions & Help Callout Banner */}
      <div className="rounded-2xl bg-white border border-[#AFC4D5]/35 p-4 shadow-2xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-2.5 text-[#3F4147]/85">
            <Compass size={18} className="text-[#88AB8E] shrink-0 mt-0.5 sm:mt-0" />
            <div className="leading-relaxed">
              <strong>Aturan & Arah Kata Acak:</strong> Kata disembunyikan secara bervariasi: bisa <strong>mendatar</strong> (kiri-kanan/terbalik), <strong>menurun</strong> (atas-bawah/terbalik), maupun <strong>diagonal miring</strong>! Klik huruf pertama, lalu klik huruf terakhir untuk memilih.
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={handleShowHint}
              disabled={isCompleted}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold transition-colors disabled:opacity-40 cursor-pointer text-xs"
            >
              <Lightbulb size={13} className="text-amber-500" />
              <span>Petunjuk Huruf</span>
            </button>
          </div>
        </div>

        {/* Dynamic Badge Reminder */}
        <div className="pt-2 border-t border-[#AFC4D5]/20 flex items-center justify-between text-[11px] text-[#3F4147]/70 flex-wrap gap-2">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-amber-500" />
            Setiap kali halaman direfresh, posisi dan arah 10 malaikat akan otomatis diacak ulang.
          </span>
          <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            Sesi Papan: #{board.id.slice(-6).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Dynamic Feedback Banner */}
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

      {/* Main Game Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive 12x12 Grid */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="w-full max-w-[530px] p-3 sm:p-4 rounded-3xl border border-[#AFC4D5]/40 bg-white shadow-sm overflow-x-auto">
            <div className="grid grid-cols-12 gap-1 sm:gap-1.5 select-none touch-manipulation">
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
                    cellBg = 'text-white font-bold shadow-2xs';
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
                      className={`w-full aspect-square flex items-center justify-center rounded-lg text-xs sm:text-sm font-mono font-bold transition-all border ${borderStyle} ${cellBg} cursor-pointer`}
                      aria-label={`Baris ${r + 1}, Kolom ${c + 1}: Huruf ${letter}`}
                    >
                      {letter}
                    </button>
                  );
                })
              )}
            </div>
          </div>
          <div className="mt-2.5 text-xs text-[#3F4147]/70 text-center flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#88AB8E] animate-ping" />
            <span>
              {selectedStart
                ? 'Huruf awal terpilih. Sekarang klik huruf terakhir nama malaikat...'
                : 'Langkah 1: Klik huruf pertama dari nama malaikat'}
            </span>
          </div>
        </div>

        {/* Right: Word Checklist & Companion */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#AFC4D5]/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#3F4147]">
                Daftar 10 Malaikat
              </span>
              <span className="text-xs font-mono font-bold text-[#88AB8E] bg-[#88AB8E]/10 px-2 py-0.5 rounded-md">
                {foundWords.length} / 10
              </span>
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {board.words.map((item) => {
                const isFound = foundWords.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${
                      isFound
                        ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 opacity-85 shadow-2xs'
                        : 'border-[#AFC4D5]/25 bg-[#F8F5F0]/60 text-[#3F4147] hover:border-[#AFC4D5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className={isFound ? 'line-through text-emerald-800' : ''}>
                          {item.name}
                        </span>
                        {isFound && <CheckCircle2 size={13} className="text-emerald-600" />}
                      </div>
                      <p className="text-[11px] text-[#3F4147]/70 mt-0.5 leading-snug">
                        {item.duty}
                      </p>
                    </div>

                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-1 shadow-2xs"
                      style={{ backgroundColor: item.color }}
                      title={`Warna tanda: ${item.name}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nara Companion in Word Search */}
          <div className="rounded-2xl border border-[#AFC4D5]/25 bg-white/70 p-4 flex flex-col items-center text-center space-y-3">
            <NaraCharacter
              pose={isCompleted ? 'celebrating' : foundWords.length > 5 ? 'happy' : 'curious'}
              bubbleText={
                isCompleted
                  ? 'Alhamdulillah, kamu berhasil menemukan kesepuluh malaikat Allah di papan acak ini!'
                  : foundWords.length > 0
                  ? `Keren! Sudah ${foundWords.length} malaikat ditemukan. Teliti juga kata yang miring atau terbalik ya!`
                  : 'Tata letak kata selalu berganti setiap refresh! Coba teliti huruf mendatar, menurun, atau miring ya.'
              }
              size="sm"
              showNameTag={false}
            />

            {/* Quick Scoreboard Action for Teacher */}
            {onGoToScoreboard && (
              <div className="w-full pt-2 border-t border-[#AFC4D5]/20 text-left">
                <p className="text-[11px] text-[#3F4147]/75 mb-2">
                  Kelompok berhasil menemukan kata? Catat skor mereka di Papan Skor Kelompok:
                </p>
                <button
                  onClick={onGoToScoreboard}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs font-bold text-[#92400E] transition-all shadow-2xs cursor-pointer"
                >
                  <Trophy size={14} className="text-amber-500" />
                  <span>Buka Papan Skor Kelompok</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONFIRM SHUFFLE MODAL */}
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
                  Semua 10 kata malaikat akan disembunyikan di posisi dan arah baru (mendatar, menurun, atau diagonal). Progres pencarian kata saat ini akan dimulai dari awal.
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

      {/* VICTORY MODAL / CELEBRATION */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3F4147]/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl border-2 border-[#AFC4D5] p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
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
                  Kamu berhasil menemukan seluruh <strong>10 Nama Malaikat Allah Swt.</strong> beserta tugas mulianya pada papan acak ini!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F5F0] border border-[#AFC4D5]/30 text-xs text-[#3F4147]">
                “Iman kepada malaikat membimbing kita senantiasa mawas diri dan berintrospeksi setiap waktu.”
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleManualShuffle}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition-all"
                  >
                    <Shuffle size={14} className="text-indigo-600" />
                    <span>Acak Papan Baru</span>
                  </button>

                  {onGoToScoreboard && (
                    <button
                      onClick={onGoToScoreboard}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all"
                    >
                      <Trophy size={14} className="text-amber-600" />
                      <span>Papan Skor</span>
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onGoToQuiz}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#3F4147] text-white text-xs font-semibold hover:bg-[#2B2D31] transition-all"
                  >
                    <span>Coba Kuis Interaktif</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={onBackToHome}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#AFC4D5]/50 bg-white text-[#3F4147] text-xs font-semibold hover:bg-[#F8F5F0] transition-all"
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
