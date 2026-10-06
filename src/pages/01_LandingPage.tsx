import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { APP_METADATA } from '../data/learningContent';

interface LandingPageProps {
  onStart: () => void;
  onExploreMenu: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onExploreMenu }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 md:py-12 overflow-hidden">
      <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Educational Editorial Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Metadata Kicker without pill styling */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-[#3F4147]/70 font-medium">
            <span className="text-[#3F4147] font-semibold">{APP_METADATA.subject}</span>
            <span aria-hidden="true">·</span>
            <span>{APP_METADATA.phase}</span>
            <span aria-hidden="true">·</span>
            <span>{APP_METADATA.grade}</span>
            <span aria-hidden="true">·</span>
            <span>{APP_METADATA.semester}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#3F4147] tracking-tight leading-[1.1] text-balance"
            >
              MAWAS DIRI
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#B8AAA0] italic font-normal mt-1">
                dan Introspeksi dalam Menjalani Kehidupan
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pt-2 flex items-center justify-center lg:justify-start gap-2"
            >
              <EightPointStar size={16} color="#D9B8B8" />
              <h2 className="text-base sm:text-lg font-semibold tracking-wide text-[#3F4147]">
                {APP_METADATA.subtitle}
              </h2>
            </motion.div>
          </div>

          {/* Core concept quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="border-l-2 border-[#AFC4D5] pl-4 py-1 max-w-xl text-left bg-white/40 rounded-r-xl"
          >
            <p className="font-caveat-accent text-xl text-[#3F4147]">
              “Kenali iman, kenali diri. Memahami malaikat bukan sekadar menghafal nama, melainkan membangun kesadaran dan kejujuran hati.”
            </p>
          </motion.div>

          {/* Compiler Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xs text-[#3F4147]/60"
          >
            Disusun oleh: <span className="font-semibold text-[#3F4147]">{APP_METADATA.compiler}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto"
          >
            <button
              onClick={onStart}
              className="w-full sm:w-auto flex items-center justify-center gap-3 min-h-[48px] rounded-xl bg-[#3F4147] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#2B2D31] hover:shadow-lg active:scale-95 group"
            >
              <span>MULAI</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[48px] rounded-xl border border-[#AFC4D5]/60 bg-white/80 px-5 py-3 text-sm font-semibold text-[#3F4147] shadow-sm transition-all hover:bg-white hover:border-[#AFC4D5] active:scale-95"
            >
              <BookOpen size={16} className="text-[#AFC4D5]" />
              <span>Lihat Daftar Topik</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Nara Greeting with Aesthetic Celestial Arch */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Soft arch frame background */}
          <div className="relative w-full max-w-[340px] md:max-w-[380px] p-6 rounded-t-[140px] border border-[#AFC4D5]/35 bg-white/60 backdrop-blur-sm shadow-sm flex flex-col items-center">
            {/* Top decorative star */}
            <div className="absolute top-4 flex items-center gap-1.5 opacity-70">
              <EightPointStar size={16} color="#AFC4D5" />
            </div>

            <div className="mt-6 mb-2">
              <NaraCharacter
                pose="greeting"
                bubbleText="Assalamu'alaikum! Yuk bersama Nara memulai perjalanan memahami iman dan mengenal diri kita lebih dalam."
                bubblePosition="top"
                size="lg"
              />
            </div>

            <div className="text-center pt-2 border-t border-[#AFC4D5]/20 w-full">
              <span className="text-[11px] font-medium text-[#3F4147]/70">
                Fase D · Akidah Islam · Kelas VII
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
