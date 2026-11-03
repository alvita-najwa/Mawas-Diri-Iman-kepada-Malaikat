import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, HelpCircle, Search, Sparkles, Music, Trophy, Users, ClipboardList } from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { APP_METADATA } from '../data/learningContent';

interface LandingPageProps {
  onStartMateri: () => void;
  onGoToVideoLagu: () => void;
  onGoToQuiz: () => void;
  onGoToWordSearch: () => void;
  onGoToLkpd?: () => void;
  onGoToScoreboard?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartMateri,
  onGoToVideoLagu,
  onGoToQuiz,
  onGoToWordSearch,
  onGoToLkpd,
  onGoToScoreboard
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 py-8 md:py-12 overflow-hidden max-w-6xl mx-auto space-y-10">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Educational Editorial Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5"
        >
          {/* Metadata Kicker without pill styling */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-[#3F4147]/70 font-medium">
            <span className="text-[#3F4147] font-semibold">{APP_METADATA.subject}</span>
            <span aria-hidden="true">·</span>
            <span>{APP_METADATA.phase}</span>
            <span aria-hidden="true">·</span>
            <span>{APP_METADATA.grade} SMP/MTs</span>
            <span aria-hidden="true">·</span>
            <span>{APP_METADATA.semester}</span>
          </div>

          {/* Main Title - Updated as requested */}
          <div className="space-y-1.5">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#3F4147] tracking-tight leading-[1.15] text-balance"
            >
              MAWAS DIRI
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#88AB8E] font-medium tracking-normal mt-1.5">
                melalui Iman kepada Malaikat Allah SWT.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pt-2 flex items-center justify-center lg:justify-start gap-2"
            >
              <EightPointStar size={16} color="#88AB8E" />
              <h2 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#B8AAA0]">
                Pendidikan Agama Islam & Budi Pekerti · Kelas VII
              </h2>
            </motion.div>
          </div>

          {/* Core concept quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="border-l-2 border-[#AFC4D5] pl-4 py-1.5 max-w-xl text-left bg-white/40 rounded-r-xl"
          >
            <p className="font-caveat-accent text-xl text-[#3F4147]">
              “Kenali iman, kenali diri. Memahami malaikat bukan sekadar menghafal nama, melainkan membangun kesadaran, kejujuran, dan perbaikan akhlak.”
            </p>
          </motion.div>

          {/* Compiler Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xs text-[#3F4147]/60"
          >
            Penyusun: <span className="font-semibold text-[#3F4147]">{APP_METADATA.compiler}</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Nara Greeting with Aesthetic Celestial Arch */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Soft arch frame background - compact & unobtrusive */}
          <div className="relative w-full max-w-[280px] md:max-w-[320px] p-4 sm:p-5 rounded-t-[120px] border border-[#AFC4D5]/35 bg-white/60 backdrop-blur-sm shadow-sm flex flex-col items-center">
            {/* Top decorative star */}
            <div className="absolute top-3.5 flex items-center gap-1.5 opacity-70">
              <EightPointStar size={14} color="#AFC4D5" />
            </div>

            <div className="mt-4 mb-1">
              <NaraCharacter
                pose="greeting"
                bubbleText="Assalamu'alaikum teman-teman kelas 7! Pilih menu di bawah untuk belajar materi, menyanyi lagu 10 malaikat, kuis, atau bermain cari kata ya!"
                bubblePosition="top"
                size="md"
              />
            </div>

            <div className="text-center pt-2 border-t border-[#AFC4D5]/20 w-full">
              <span className="text-[11px] font-medium text-[#3F4147]/70">
                Media Interaktif PAI & Budi Pekerti · Kelas VII
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4 Main Navigation Cards: Materi, Video Lagu, Kuis Interaktif, Game Cari Kata */}
      <div className="space-y-4 pt-4 border-t border-[#AFC4D5]/20">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B8AAA0]">
            Menu Pembelajaran Utama
          </span>
          <h3 className="font-serif-display text-2xl text-[#3F4147]">
            Pilih Aktivitas Belajarmu
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* Menu 1: Materi Pembelajaran */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartMateri}
            className="group cursor-pointer rounded-2xl border-2 border-[#AFC4D5]/50 bg-white p-4 sm:p-5 shadow-sm hover:border-[#AFC4D5] hover:shadow-md transition-all flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onStartMateri();
              }
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#AFC4D5]/20 flex items-center justify-center text-[#3F4147] mb-3 group-hover:bg-[#AFC4D5] group-hover:text-white transition-colors">
                <BookOpen size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                Modul Interaktif
              </span>
              <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147] mt-0.5 mb-1">
                Materi Pembelajaran
              </h4>
              <p className="text-[11px] sm:text-xs text-[#3F4147]/80 leading-relaxed">
                Pelajari pengertian & dalil iman malaikat, 10 nama & tugasnya, serta muhasabah diri.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#AFC4D5]/15 flex items-center justify-between text-xs font-semibold text-[#3F4147] group-hover:text-[#AFC4D5]">
              <span>Mulai Belajar</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>

          {/* Menu 2: Video & Lagu 10 Malaikat */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoToVideoLagu}
            className="group cursor-pointer rounded-2xl border-2 border-[#D9B8B8]/50 bg-white p-4 sm:p-5 shadow-sm hover:border-[#D9B8B8] hover:shadow-md transition-all flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onGoToVideoLagu();
              }
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D9B8B8]/25 flex items-center justify-center text-[#3F4147] mb-3 group-hover:bg-[#D9B8B8] group-hover:text-white transition-colors">
                <Music size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                Lagu & Hafalan
              </span>
              <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147] mt-0.5 mb-1">
                Lagu 10 Malaikat
              </h4>
              <p className="text-[11px] sm:text-xs text-[#3F4147]/80 leading-relaxed">
                Tonton video lagu 10 malaikat bernyanyi bersama panduan lirik interaktif di kelas.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#D9B8B8]/20 flex items-center justify-between text-xs font-semibold text-[#3F4147] group-hover:text-[#D9B8B8]">
              <span>▶ Buka Lagu</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>

          {/* Menu 3: Game Cari Kata */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoToWordSearch}
            className="group cursor-pointer rounded-2xl border-2 border-[#C8BDD8]/50 bg-white p-4 sm:p-5 shadow-sm hover:border-[#C8BDD8] hover:shadow-md transition-all flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onGoToWordSearch();
              }
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C8BDD8]/25 flex items-center justify-center text-[#3F4147] mb-3 group-hover:bg-[#C8BDD8] group-hover:text-white transition-colors">
                <Search size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                Teka-Teki Huruf
              </span>
              <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147] mt-0.5 mb-1">
                Game Cari Kata
              </h4>
              <p className="text-[11px] sm:text-xs text-[#3F4147]/80 leading-relaxed">
                Asah ketelitianmu mencari 10 nama malaikat Allah Swt. yang tersembunyi di papan huruf.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#C8BDD8]/20 flex items-center justify-between text-xs font-semibold text-[#3F4147] group-hover:text-[#C8BDD8]">
              <span>Mainkan Game</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>

          {/* Menu 4: LKPD Siswa (Fase D) - Persis Setelah Cari Kata */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoToLkpd}
            className="group cursor-pointer rounded-2xl border-2 border-sky-300 bg-white p-4 sm:p-5 shadow-sm hover:border-sky-500 hover:shadow-md transition-all flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onGoToLkpd) onGoToLkpd();
              }
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-800 mb-3 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <ClipboardList size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-600">
                Lembar Kerja
              </span>
              <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147] mt-0.5 mb-1">
                LKPD Siswa
              </h4>
              <p className="text-[11px] sm:text-xs text-[#3F4147]/80 leading-relaxed">
                Kerjakan LKPD 3 bagian: konsep dasar, nama/tugas, dan studi kasus sebelum kuis.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-sky-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-900">
              <span>Isi Lembar Kerja</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>

          {/* Menu 5: Kuis Interaktif */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoToQuiz}
            className="group cursor-pointer rounded-2xl border-2 border-[#B8AAA0]/50 bg-white p-4 sm:p-5 shadow-sm hover:border-[#B8AAA0] hover:shadow-md transition-all flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onGoToQuiz();
              }
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#B8AAA0]/25 flex items-center justify-center text-[#3F4147] mb-3 group-hover:bg-[#B8AAA0] group-hover:text-white transition-colors">
                <HelpCircle size={20} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                Uji Pemahaman
              </span>
              <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147] mt-0.5 mb-1">
                Kuis Interaktif
              </h4>
              <p className="text-[11px] sm:text-xs text-[#3F4147]/80 leading-relaxed">
                Uji pemahamanmu lewat 5 soal pilihan ganda dengan umpan balik langsung & rekap skor.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#B8AAA0]/20 flex items-center justify-between text-xs font-semibold text-[#3F4147] group-hover:text-[#B8AAA0]">
              <span>Mulai Kuis</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        </div>

        {/* Classroom Scoreboard Quick Access Banner */}
        {onGoToScoreboard && (
          <motion.div
            whileHover={{ y: -2 }}
            onClick={onGoToScoreboard}
            className="cursor-pointer rounded-2xl border border-[#AFC4D5]/35 bg-gradient-to-r from-white via-[#FAF7F4] to-[#F5EFE6] p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onGoToScoreboard();
              }
            }}
          >
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-[#D97706] shrink-0">
                <Trophy size={22} className="fill-[#F59E0B]/20" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                    Fitur Khusus Guru / Smartboard
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    3 Kelompok
                  </span>
                </div>
                <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147] font-bold mt-0.5">
                  Papan Skor Kelompok Interaktif
                </h4>
                <p className="text-xs text-[#3F4147]/75">
                  Catat dan umumkan perolehan poin siswa saat kuis, permainan kata, dan tanya jawab di kelas secara real-time.
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onGoToScoreboard();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-xs font-semibold shadow-xs transition-all shrink-0 active:scale-95"
            >
              <Trophy size={14} className="text-[#FBBF24]" />
              <span>Buka Papan Skor</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
