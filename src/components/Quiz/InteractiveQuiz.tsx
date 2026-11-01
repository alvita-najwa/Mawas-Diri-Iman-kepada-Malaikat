import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../data/quizData';
import { NaraCharacter } from '../Character/NaraCharacter';
import { EightPointStar } from '../Decorations/IslamicGeometry';
import { useQuizProgress } from '../../hooks/useQuizProgress';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Home,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle,
  Trophy,
  Check,
  X
} from 'lucide-react';

interface InteractiveQuizProps {
  onBackToHome: () => void;
  onGoToMateri: () => void;
  onGoToScoreboard?: () => void;
  quizProgress?: ReturnType<typeof useQuizProgress>;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  onBackToHome,
  onGoToMateri,
  onGoToScoreboard,
  quizProgress: externalQuizProgress
}) => {
  // Use external hook from App.tsx or fallback to internal hook
  const internalQuizProgress = useQuizProgress();
  const quiz = externalQuizProgress || internalQuizProgress;

  const {
    currentIndex,
    selectedAnswers,
    isCompleted,
    totalQuestions,
    answeredCount,
    correctCount,
    score,
    nextUnansweredIndex,
    nextUnansweredNumber,
    selectOption,
    goToNextQuestion,
    goToPrevQuestion,
    jumpToQuestion,
    resetQuiz,
    autoAdvanceToNextUnanswered,
    setIsCompleted
  } = quiz;

  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // When mounting or returning to Quiz, automatically advance if the current question is already answered!
  useEffect(() => {
    autoAdvanceToNextUnanswered();
  }, [autoAdvanceToNextUnanswered]);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex] || QUIZ_QUESTIONS[0];
  const selectedOpt = selectedAnswers[currentIndex];
  const isAnswered = selectedOpt !== undefined;
  const isCorrect = isAnswered && selectedOpt === currentQ.correctIndex;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    selectOption(currentIndex, optionIndex);
  };

  const handleConfirmReset = () => {
    resetQuiz();
    setShowResetModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-6">
      {/* KETERANGAN ATURAN PENILAIAN DI BAGIAN ATAS SENDIRI (BENAR +10, SALAH -5) */}
      <div className="rounded-2xl border-2 border-[#88AB8E]/50 bg-gradient-to-r from-emerald-50/90 via-white to-rose-50/80 p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#88AB8E]/20 text-[#658864] flex items-center justify-center shrink-0">
            <Award size={22} className="text-[#658864]" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-md">
                Ketentuan Penilaian Kuis
              </span>
              <span className="text-[11px] text-[#3F4147]/70 hidden sm:inline">
                Pedoman Skor untuk Guru & Kelompok Siswa
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#3F4147] mt-0.5">
              Jika kelompok menjawab <span className="text-emerald-700 font-bold underline decoration-emerald-400">BENAR: +10 Poin</span>, dan jika <span className="text-rose-700 font-bold underline decoration-rose-400">SALAH: −5 Poin</span>.
            </p>
          </div>
        </div>

        {/* Indikator Poin Visual */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs sm:text-sm shadow-xs">
            <Check size={15} className="stroke-[3]" />
            <span>Benar: +10</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white font-mono font-bold text-xs sm:text-sm shadow-xs">
            <X size={15} className="stroke-[3]" />
            <span>Salah: −5</span>
          </div>
        </div>
      </div>

      {/* Quiz Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#AFC4D5]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <EightPointStar size={16} color="#D9B8B8" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
              Evaluasi Pemahaman Siswa
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl text-[#3F4147] mt-1">
            KUIS INTERAKTIF
          </h1>
          <p className="text-xs text-[#3F4147]/70">
            Iman kepada Malaikat, Mawas Diri, dan Introspeksi · Kelas VII SMP/MTs
          </p>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <div className="text-right">
              <span className="text-xs font-semibold text-[#3F4147] block">
                Soal {currentIndex + 1} / {totalQuestions}
              </span>
              <div className="w-28 sm:w-32 h-2 bg-[#AFC4D5]/25 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-[#88AB8E] rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {onGoToScoreboard && (
              <button
                onClick={onGoToScoreboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#F59E0B]/50 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-[#92400E] transition-all shadow-2xs"
                title="Buka Papan Skor Kelompok"
              >
                <Trophy size={14} className="text-[#F59E0B]" />
                <span className="hidden sm:inline">Papan Skor</span>
              </button>
            )}

            <button
              onClick={() => setShowResetModal(true)}
              className="p-2 rounded-xl border border-[#AFC4D5]/30 bg-white/80 hover:bg-white text-xs font-medium text-[#3F4147] transition-colors"
              title="Ulangi Kuis dari Awal"
            >
              <RotateCcw size={15} />
            </button>

            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl border border-[#AFC4D5]/30 bg-white/80 hover:bg-white text-xs font-medium text-[#3F4147] transition-colors"
              title="Kembali ke Beranda"
            >
              <Home size={15} />
            </button>
          </div>
        )}
      </div>

      {!isCompleted ? (
        /* QUESTION VIEW */
        <div className="space-y-4">
          {/* Interactive Question Number Navigation Strip (Nomor 1 s.d. 5) */}
          <div className="p-3 rounded-2xl bg-white/80 border border-[#AFC4D5]/30 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8AAA0] flex items-center gap-1.5">
                <HelpCircle size={13} className="text-[#AFC4D5]" />
                Daftar Soal Kuis (Klik nomor untuk berpindah)
              </span>
              <span className="text-[11px] font-mono text-[#3F4147]/70">
                {answeredCount} dari {totalQuestions} terjawab
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const answered = selectedAnswers[idx] !== undefined;
                const isCurrent = currentIndex === idx;
                const userWasCorrect = answered && selectedAnswers[idx] === q.correctIndex;

                let pillStyle = 'bg-white border-[#AFC4D5]/40 text-[#3F4147] hover:border-[#3F4147]';
                if (isCurrent) {
                  pillStyle = 'bg-[#3F4147] text-white border-[#3F4147] shadow-xs font-bold ring-2 ring-[#3F4147]/20';
                } else if (answered) {
                  pillStyle = userWasCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border-rose-300 text-rose-800';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(idx)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${pillStyle}`}
                    title={`Soal ${idx + 1}: ${answered ? (userWasCorrect ? 'Benar' : 'Sudah dijawab') : 'Belum dijawab'}`}
                  >
                    <span>{idx + 1}</span>
                    {answered && (
                      userWasCorrect ? (
                        <Check size={12} className={isCurrent ? 'text-white' : 'text-emerald-600'} />
                      ) : (
                        <X size={12} className={isCurrent ? 'text-white' : 'text-rose-500'} />
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Question Column */}
            <div className="lg:col-span-8 space-y-4">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-5 sm:p-7 shadow-sm space-y-5"
              >
                {/* Question Category & Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-[#AFC4D5]/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D5] flex items-center gap-1.5">
                    <Sparkles size={14} /> {currentQ.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {isAnswered && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                        Sudah Dijawab
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-[#B8AAA0]">
                      NOMOR {currentIndex + 1} / {totalQuestions}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <h2 className="font-serif-display text-lg sm:text-xl text-[#3F4147] leading-relaxed">
                  {currentQ.question}
                </h2>

                {/* Options List */}
                <div className="space-y-2.5 pt-1">
                  {currentQ.options.map((opt, idx) => {
                    const isThisSelected = selectedOpt === idx;
                    const isThisCorrect = idx === currentQ.correctIndex;

                    let optionStyle =
                      'border-[#AFC4D5]/30 bg-[#F8F5F0]/60 hover:bg-white hover:border-[#AFC4D5] text-[#3F4147]';

                    if (isAnswered) {
                      if (isThisCorrect) {
                        optionStyle =
                          'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold ring-2 ring-emerald-300';
                      } else if (isThisSelected && !isCorrect) {
                        optionStyle = 'border-rose-400 bg-rose-50/80 text-rose-950 ring-2 ring-rose-200';
                      } else {
                        optionStyle = 'border-slate-200 bg-white/40 text-slate-400 opacity-60';
                      }
                    }

                    const alphabetLabels = ['A', 'B', 'C', 'D'];

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${optionStyle} ${
                          isAnswered ? 'cursor-default' : ''
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                            isAnswered && isThisCorrect
                              ? 'bg-emerald-600 text-white'
                              : isAnswered && isThisSelected && !isCorrect
                              ? 'bg-rose-500 text-white'
                              : 'bg-white border border-[#AFC4D5]/40 text-[#3F4147]'
                          }`}
                        >
                          {alphabetLabels[idx]}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">{opt}</span>
                        {isAnswered && isThisCorrect && (
                          <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {isAnswered && isThisSelected && !isCorrect && (
                          <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback & Educational Explanation Box */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`rounded-xl p-4 border text-xs sm:text-sm space-y-2 ${
                        isCorrect
                          ? 'border-emerald-300 bg-emerald-50/90 text-emerald-900'
                          : 'border-[#D9B8B8] bg-[#FAF7F4] text-[#3F4147]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 font-bold flex-wrap">
                        {isCorrect ? (
                          <>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                              <span>Jawaban Benar! Tepat Sekali.</span>
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold shadow-2xs">
                              +10 Poin Kelompok
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <XCircle size={18} className="text-rose-500 shrink-0" />
                              <span>Kurang Tepat. Simak Penjelasannya:</span>
                            </div>
                            <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-mono text-xs font-bold shadow-2xs">
                              −5 Poin Kelompok
                            </span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed text-xs sm:text-sm text-[#3F4147]/90 pt-1">
                        {currentQ.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Action Bar */}
                <div className="pt-3 border-t border-[#AFC4D5]/20 flex flex-wrap items-center justify-between gap-3">
                  {/* Previous Question Button */}
                  <button
                    onClick={goToPrevQuestion}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#AFC4D5]/40 text-xs font-semibold text-[#3F4147] hover:bg-[#FAF7F4] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Soal Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Shortcut to Scoreboard right after answering */}
                    {isAnswered && onGoToScoreboard && (
                      <button
                        onClick={onGoToScoreboard}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
                        title="Catat skor kelompok di papan skor"
                      >
                        <Trophy size={14} />
                        <span>Catat Skor Kelompok</span>
                      </button>
                    )}

                    {/* Next Question / Finish Button */}
                    {isAnswered ? (
                      <button
                        onClick={goToNextQuestion}
                        className="flex items-center gap-1.5 rounded-xl bg-[#3F4147] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#2B2D31] active:scale-95 transition-all group"
                      >
                        <span>
                          {currentIndex < totalQuestions - 1
                            ? `Soal Selanjutnya (Soal ${currentIndex + 2})`
                            : 'Lihat Hasil Akhir'}
                        </span>
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      currentIndex < totalQuestions - 1 && (
                        <button
                          onClick={goToNextQuestion}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#3F4147]/70 hover:text-[#3F4147] transition-colors"
                        >
                          <span>Lewati Dulu</span>
                          <ArrowRight size={13} />
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Helpful prompt when viewing an already answered question */}
                {isAnswered && nextUnansweredNumber !== null && nextUnansweredNumber !== currentIndex + 1 && (
                  <div className="mt-2 p-2.5 rounded-xl bg-[#88AB8E]/10 border border-[#88AB8E]/30 flex items-center justify-between text-xs text-[#3F4147]">
                    <span>Soal {currentIndex + 1} sudah terjawab. Siap lanjut ke soal berikutnya?</span>
                    <button
                      onClick={() => jumpToQuestion(nextUnansweredNumber - 1)}
                      className="px-3 py-1 rounded-lg bg-[#88AB8E] text-white font-bold text-xs hover:bg-[#729478] transition-colors"
                    >
                      Buka Soal {nextUnansweredNumber} →
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Companion Column */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-[#AFC4D5]/30 bg-white/70 p-5 flex flex-col items-center text-center space-y-4">
                <NaraCharacter
                  pose={!isAnswered ? 'curious' : isCorrect ? 'celebrating' : 'thinking'}
                  bubbleText={
                    !isAnswered
                      ? 'Baca pertanyaannya dengan teliti ya! Benar dapat +10 poin, salah −5 poin.'
                      : isCorrect
                      ? 'MasyaAllah, jawaban benar (+10 poin)! Buka papan skor untuk menambahkan skor kelompok ya!'
                      : 'Kurang tepat (−5 poin), tapi jangan berkecil hati. Simak penjelasannya agar semakin paham!'
                  }
                  size="md"
                />

                {/* Quick Scoreboard Action Box for Teacher */}
                {onGoToScoreboard && (
                  <div className="w-full pt-3 border-t border-[#AFC4D5]/20 text-left space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8AAA0] block">
                      Alur Pembelajaran Kelas:
                    </span>
                    <p className="text-xs text-[#3F4147]/80">
                      Setelah kelompok menjawab, guru mencatat nilai di <strong>Papan Skor</strong> (<strong>+10</strong> jika benar, <strong>−5</strong> jika salah). Saat kembali ke kuis, sistem otomatis melanjutkan ke soal berikutnya!
                    </p>
                    <button
                      onClick={onGoToScoreboard}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#F59E0B]/50 bg-white hover:bg-amber-50 text-xs font-bold text-[#92400E] transition-all shadow-2xs"
                    >
                      <Trophy size={14} className="text-[#F59E0B]" />
                      <span>Buka Papan Skor Kelompok</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ SCOREBOARD & REVIEW SCREEN */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="space-y-8"
        >
          {/* Hero Result Banner */}
          <div className="rounded-3xl border-2 border-[#AFC4D5]/50 bg-gradient-to-b from-white to-[#FAF7F4] p-6 sm:p-10 shadow-sm text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#AFC4D5]/20 flex items-center justify-center text-[#3F4147]">
                <Award size={36} />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B8AAA0]">
                Hasil Kuis Interaktif
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
                {score >= 80
                  ? 'Mumtaz! Luar Biasa!'
                  : score >= 60
                  ? 'Jayyid Jiddan! Bagus Sekali!'
                  : 'Tetap Semangat Belajar!'}
              </h2>
              <p className="text-xs sm:text-sm text-[#3F4147]/75 max-w-lg mx-auto">
                {score >= 80
                  ? 'Kamu telah memahami hakikat iman kepada malaikat, sikap mawas diri, dan introspeksi dengan sangat baik.'
                  : score >= 60
                  ? 'Pemahamanmu sudah baik. Silakan pelajari kembali beberapa materi untuk memperkuat pemahamanmu.'
                  : 'Jangan berkecil hati! Buka modul materi kembali dan coba kuis ini sekali lagi.'}
              </p>
            </div>

            {/* Score Display */}
            <div className="inline-flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-[#AFC4D5]/40 shadow-inner min-w-[200px]">
              <span className="font-serif-display text-5xl sm:text-6xl text-[#3F4147] font-bold">
                {score}
              </span>
              <span className="text-xs text-[#B8AAA0] uppercase font-semibold mt-1">
                Skor Akhir (Nilai 100)
              </span>
              <span className="text-xs font-medium text-[#3F4147] mt-1">
                {correctCount} dari {totalQuestions} Soal Benar
              </span>
            </div>

            {/* Nara Reaction */}
            <div className="flex justify-center">
              <NaraCharacter
                pose={score >= 70 ? 'celebrating' : 'happy'}
                bubbleText={
                  score >= 80
                    ? 'Alhamdulillah! Nilaimu sangat memuaskan, pertahankan semangat belajarmu!'
                    : 'Terima kasih sudah mencoba dengan jujur. Terus belajar dan mawas diri ya!'
                }
                size="sm"
                showNameTag={false}
              />
            </div>

            {/* Navigation Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#AFC4D5]/20">
              <button
                onClick={() => setShowResetModal(true)}
                className="flex items-center gap-2 min-h-[46px] rounded-xl border border-[#AFC4D5]/60 bg-white px-5 py-2.5 text-xs font-semibold text-[#3F4147] shadow-sm hover:bg-[#F8F5F0] active:scale-95 transition-all"
              >
                <RotateCcw size={15} />
                <span>Ulangi Kuis dari Awal</span>
              </button>

              {onGoToScoreboard && (
                <button
                  onClick={onGoToScoreboard}
                  className="flex items-center gap-2 min-h-[46px] rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 text-xs font-bold shadow-md active:scale-95 transition-all"
                >
                  <Trophy size={15} />
                  <span>Lihat Papan Skor Akhir</span>
                </button>
              )}

              <button
                onClick={onGoToMateri}
                className="flex items-center gap-2 min-h-[46px] rounded-xl border border-[#AFC4D5]/60 bg-white px-5 py-2.5 text-xs font-semibold text-[#3F4147] shadow-sm hover:bg-[#F8F5F0] active:scale-95 transition-all"
              >
                <BookOpen size={15} />
                <span>Pelajari Materi Kembali</span>
              </button>

              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 min-h-[46px] rounded-xl bg-[#3F4147] px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#2B2D31] active:scale-95 transition-all"
              >
                <Home size={15} />
                <span>Kembali ke Beranda</span>
              </button>
            </div>
          </div>

          {/* Question by Question Review */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-xl text-[#3F4147]">
                Ulasan Jawaban & Pembahasan
              </h3>
              <span className="text-xs text-[#B8AAA0]">
                {correctCount} Benar · {totalQuestions - correctCount} Salah
              </span>
            </div>

            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, qIdx) => {
                const userChoice = selectedAnswers[qIdx];
                const wasCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border p-4 sm:p-5 bg-white transition-all ${
                      wasCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                            wasCorrect ? 'bg-emerald-600' : 'bg-rose-500'
                          }`}
                        >
                          {qIdx + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
                          {q.category}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-semibold flex items-center gap-1 ${
                          wasCorrect ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {wasCorrect ? (
                          <>
                            <CheckCircle2 size={14} /> Benar
                          </>
                        ) : (
                          <>
                            <XCircle size={14} /> Salah
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-[#3F4147] mb-3">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      <div className="p-2.5 rounded-lg bg-[#F8F5F0] border border-[#AFC4D5]/20">
                        <span className="text-[#B8AAA0] block text-[10px] uppercase font-semibold">
                          Jawaban Kelompok / Siswa:
                        </span>
                        <span className={wasCorrect ? 'text-emerald-800 font-medium' : 'text-rose-700 font-medium'}>
                          {userChoice !== undefined ? q.options[userChoice] : '(Tidak dijawab)'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="text-emerald-700 block text-[10px] uppercase font-semibold">
                          Kunci Jawaban Benar:
                        </span>
                        <span className="text-emerald-950 font-medium">{q.options[q.correctIndex]}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#AFC4D5]/15 text-xs text-[#3F4147]/80 leading-relaxed">
                      <strong>Penjelasan:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* MODAL KONFIRMASI RESET KUIS */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#3F4147]/70 backdrop-blur-sm p-4 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md my-auto rounded-3xl border border-[#AFC4D5]/40 bg-white p-6 shadow-2xl space-y-5 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <RotateCcw size={22} />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif-display text-xl text-[#3F4147]">
                  Ulangi Kuis dari Awal?
                </h3>
                <p className="text-xs sm:text-sm text-[#3F4147]/75 leading-relaxed">
                  Semua jawaban yang telah dipilih pada soal sebelumnya akan dihapus dan kuis akan dimulai kembali dari <strong>Soal 1</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#AFC4D5]/40 text-xs sm:text-sm font-semibold text-[#3F4147] hover:bg-[#FAF7F4] transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="py-2.5 px-4 rounded-xl bg-[#3F4147] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  Ya, Mulai Ulang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
