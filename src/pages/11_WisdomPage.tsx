import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HIKMAH_ITEMS } from '../data/learningContent';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const WisdomPage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string>('01');

  const currentHikmah = HIKMAH_ITEMS.find((h) => h.step === selectedStep) || HIKMAH_ITEMS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Buah Manis Keimanan
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          HIKMAH BERIMAN KEPADA MALAIKAT
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80">
          Klik pada setiap sektor hikmah untuk memahami dampak nyata keimanan dalam kehidupanmu.
        </p>
      </div>

      {/* Interactive Dial & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 5-Step Interactive Dial */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-[300px] h-[300px] sm:w-[370px] sm:h-[370px] flex items-center justify-center">
            {/* Outer dotted wheel */}
            <div className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border border-[#AFC4D5]/35 border-dashed pointer-events-none" />

            {/* Central Core: IMAN KEPADA MALAIKAT */}
            <div className="z-10 flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white border-2 border-[#AFC4D5] shadow-md text-center p-2.5">
              <EightPointStar size={18} color="#D9B8B8" />
              <span className="font-serif-display text-xs sm:text-sm font-bold text-[#3F4147] mt-1 leading-tight">
                IMAN KEPADA MALAIKAT
              </span>
              <span className="text-[9px] text-[#B8AAA0] uppercase tracking-wider mt-0.5">
                5 Hikmah Utama
              </span>
            </div>

            {/* 5 Circular Nodes */}
            {HIKMAH_ITEMS.map((item, index) => {
              const angle = (index * (360 / 5) - 90) * (Math.PI / 180);
              const radius = 125;
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));

              const isSelected = selectedStep === item.step;

              return (
                <motion.button
                  key={item.step}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  onClick={() => setSelectedStep(item.step)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute z-20 flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border transition-all text-center p-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3F4147] border-[#3F4147] text-white shadow-lg ring-4 ring-[#AFC4D5]/40'
                      : 'bg-white border-[#AFC4D5]/40 text-[#3F4147] shadow-sm hover:bg-[#F8F5F0]'
                  }`}
                  aria-label={`Hikmah ${item.step}: ${item.title}`}
                >
                  <span className="text-[10px] font-mono font-bold block">
                    {item.step}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold line-clamp-2 leading-tight">
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Hikmah Detail */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHikmah.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-[#AFC4D5]/40 bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#AFC4D5]/20">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D5]">
                  Hikmah {currentHikmah.step} / 05
                </span>
                <span className="text-xs font-mono text-[#B8AAA0]">Pendidikan Akhlak</span>
              </div>

              <div>
                <h3 className="font-serif-display text-2xl text-[#3F4147]">
                  {currentHikmah.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#AFC4D5]">
                  {currentHikmah.desc}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#3F4147]/85 leading-relaxed">
                {currentHikmah.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Nara Explaining */}
          <div className="rounded-2xl border border-[#AFC4D5]/25 bg-white/60 p-4 flex items-center gap-4">
            <NaraCharacter
              pose="celebrating"
              size="sm"
              showNameTag={false}
            />
            <div className="text-xs text-[#3F4147]/85 leading-relaxed">
              <p className="font-caveat-accent text-base text-[#3F4147] mb-0.5">
                “Subhanallah! Keimanan ini menjadikan jiwa kita tenang dan penuh tanggung jawab.”
              </p>
              <span className="text-[11px] text-[#B8AAA0]">
                Klik lingkaran hikmah lainnya untuk menjelajah.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Statement Banner */}
      <div className="rounded-2xl border border-[#B8AAA0]/40 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#B8AAA0] mb-2">
          <EightPointStar size={14} color="#AFC4D5" />
          <span>Rangkuman Inti Hikmah</span>
        </div>
        <p className="text-sm sm:text-base text-[#3F4147] font-medium leading-relaxed">
          “Beriman kepada malaikat mendorong seseorang semakin taat kepada Allah Swt., mawas diri, bertanggung jawab, memperbanyak kebaikan, dan menjauhi perbuatan tercela.”
        </p>
      </div>
    </div>
  );
};
