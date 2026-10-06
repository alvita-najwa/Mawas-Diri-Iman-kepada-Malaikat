import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';

interface PemantikPageProps {
  onContinue: () => void;
}

const SCENES = [
  {
    step: 1,
    tag: 'Situasi 1',
    text: 'Kamu sedang sendirian di dalam kelas saat jam istirahat.'
  },
  {
    step: 2,
    tag: 'Situasi 2',
    text: 'Di atas meja temanmu, terdapat barang berharga atau uang yang tertinggal.'
  },
  {
    step: 3,
    tag: 'Situasi 3',
    text: 'Tidak ada bapak atau ibu guru yang berjaga di sekitar lorong.'
  },
  {
    step: 4,
    tag: 'Situasi 4',
    text: 'Tidak ada teman-teman yang sedang lewat di dekat pintu.'
  },
  {
    step: 5,
    tag: 'Situasi 5',
    text: 'Benar-benar tidak ada seorang pun manusia yang melihatmu.'
  }
];

export const PemantikPage: React.FC<PemantikPageProps> = ({ onContinue }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    if (currentStep < SCENES.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const isAllRevealed = currentStep >= SCENES.length;

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 max-w-5xl mx-auto">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Scenario Deck */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D5]">
              Pemantik Pemikiran
            </span>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
              SEANDAINYA...
            </h1>
            <p className="text-xs sm:text-sm text-[#3F4147]/70">
              Bayangkan skenario berikut terjadi padamu hari ini di sekolah:
            </p>
          </div>

          {/* Progressive Reveal Cards */}
          <div className="space-y-2.5">
            {SCENES.slice(0, currentStep).map((scene, index) => {
              const isLatest = index === currentStep - 1;
              return (
                <motion.div
                  key={scene.step}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                    isLatest
                      ? 'border-[#AFC4D5] bg-white shadow-sm'
                      : 'border-[#AFC4D5]/20 bg-white/60 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#AFC4D5]/20 text-[#3F4147] text-xs font-mono font-semibold">
                      {scene.step}
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-semibold text-[#B8AAA0] uppercase tracking-wider block mb-0.5">
                        {scene.tag}
                      </span>
                      <p className="text-sm sm:text-base font-medium text-[#3F4147]">
                        {scene.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Control button to reveal next scene or final trigger */}
          {!isAllRevealed ? (
            <div>
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 rounded-xl bg-[#3F4147] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2B2D31] transition-all active:scale-95"
              >
                <span>Buka Keadaan Berikutnya</span>
                <span className="text-white/60">({currentStep}/{SCENES.length})</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 pt-2"
            >
              <div className="rounded-2xl border-2 border-[#D9B8B8] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#D9B8B8] mb-1.5">
                  <AlertCircle size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Pertanyaan Perenungan
                  </span>
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl text-[#3F4147] leading-snug">
                  “Apakah itu berarti kita bebas melakukan apa saja?”
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#3F4147]/80 leading-relaxed">
                  Ketika tiada sepasang mata manusia pun mengawasi, apakah perbuatan kita benar-benar luput tanpa ada catatan?
                </p>
              </div>

              <button
                onClick={onContinue}
                className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[46px] rounded-xl bg-[#3F4147] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2B2D31] active:scale-95 group"
              >
                <span>CARI TAHU JAWABANNYA</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Character Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-[#AFC4D5]/30 bg-white/50 p-6 flex flex-col items-center text-center">
            <NaraCharacter
              pose={isAllRevealed ? 'curious' : 'thinking'}
              bubbleText={
                isAllRevealed
                  ? 'Kalau tidak ada yang melihat, apakah kita tetap harus berbuat jujur?'
                  : 'Coba bayangkan kalau kamu berada di ruangan kelas itu sendirian...'
              }
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
