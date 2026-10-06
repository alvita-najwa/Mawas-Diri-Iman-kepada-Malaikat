import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RUKUN_IMAN_ITEMS } from '../data/learningContent';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Sparkles, Info } from 'lucide-react';

export const RukunImanPage: React.FC = () => {
  // Default selected is 2 (Iman kepada Malaikat)
  const [selectedRukun, setSelectedRukun] = useState<number>(2);

  const currentItem = RUKUN_IMAN_ITEMS.find((r) => r.number === selectedRukun) || RUKUN_IMAN_ITEMS[1];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Poros Keimanan
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          ENAM RUKUN IMAN
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/75">
          Klik lingkaran untuk menelusuri setiap rukun iman dan kedudukan iman kepada malaikat.
        </p>
      </div>

      {/* Orbit Visualization & Details Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Celestial Orbit Visual */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
            {/* Subtle orbital path rings */}
            <div className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] rounded-full border border-[#AFC4D5]/35 border-dashed pointer-events-none" />
            <div className="absolute w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] rounded-full border border-[#C8BDD8]/25 pointer-events-none" />

            {/* Central Core: RUKUN IMAN */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="z-10 flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-[#AFC4D5] shadow-md text-center p-2 cursor-pointer"
            >
              <EightPointStar size={20} color="#D9B8B8" />
              <span className="font-serif-display text-xs sm:text-sm font-bold text-[#3F4147] mt-1">
                RUKUN IMAN
              </span>
              <span className="text-[9px] text-[#B8AAA0] uppercase tracking-wider">
                6 Landasan
              </span>
            </motion.div>

            {/* Orbiting Satellite Nodes */}
            {RUKUN_IMAN_ITEMS.map((item, index) => {
              // 6 nodes evenly placed around 360 deg
              const angle = (index * (360 / 6) - 90) * (Math.PI / 180);
              const radius = 125; // adjusted for responsive container
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));

              const isSelected = selectedRukun === item.number;
              const isMalaikat = item.isTarget;

              return (
                <motion.button
                  key={item.number}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  onClick={() => setSelectedRukun(item.number)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute z-20 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border transition-all text-center p-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3F4147] border-[#3F4147] text-white shadow-lg ring-4 ring-[#AFC4D5]/40'
                      : isMalaikat
                      ? 'bg-white border-[#D9B8B8] text-[#3F4147] shadow-md ring-2 ring-[#D9B8B8]/30 font-bold'
                      : 'bg-white/90 border-[#AFC4D5]/40 text-[#3F4147] shadow-sm hover:bg-white'
                  }`}
                  aria-label={`Rukun Iman ke-${item.number}: ${item.title}`}
                >
                  <span className="text-[10px] font-mono font-bold block">
                    0{item.number}
                  </span>
                  <span className="text-[9px] line-clamp-1 leading-tight font-medium px-1">
                    {item.number === 1
                      ? 'Allah'
                      : item.number === 2
                      ? 'Malaikat'
                      : item.number === 3
                      ? 'Kitab'
                      : item.number === 4
                      ? 'Rasul'
                      : item.number === 5
                      ? 'Hari Akhir'
                      : 'Qada Qadar'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Rukun Detail Card */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <motion.div
            key={currentItem.number}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl border p-5 sm:p-6 transition-all ${
              currentItem.isTarget
                ? 'border-[#D9B8B8] bg-white shadow-md'
                : 'border-[#AFC4D5]/35 bg-white/80 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#AFC4D5] uppercase tracking-wider">
                Rukun Iman Ke-0{currentItem.number}
              </span>
              {currentItem.isTarget && (
                <span className="text-[11px] font-semibold text-[#D9B8B8] flex items-center gap-1">
                  <Sparkles size={13} /> Fokus Pembelajaran
                </span>
              )}
            </div>

            <h3 className="font-serif-display text-xl sm:text-2xl text-[#3F4147] mb-2">
              {currentItem.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#3F4147]/85 leading-relaxed mb-4">
              {currentItem.desc}
            </p>

            {currentItem.isTarget && (
              <div className="rounded-xl bg-[#F8F5F0] border border-[#AFC4D5]/30 p-3.5 mt-2">
                <p className="text-xs text-[#3F4147] font-semibold leading-relaxed">
                  “Beriman kepada malaikat merupakan bagian dari keimanan seorang muslim. Tidak sempurna iman seseorang tanpa meyakini keberadaan malaikat Allah Swt.”
                </p>
              </div>
            )}
          </motion.div>

          {/* Nara Explaining Rukun Iman */}
          <div className="rounded-2xl border border-[#AFC4D5]/25 bg-white/60 p-4 flex items-center gap-4">
            <NaraCharacter
              pose={currentItem.isTarget ? 'happy' : 'pointing'}
              size="sm"
              showNameTag={false}
            />
            <div className="text-xs text-[#3F4147]/85 leading-relaxed">
              <p className="font-caveat-accent text-base text-[#3F4147] mb-0.5">
                {currentItem.isTarget
                  ? '“Iman kepada malaikat adalah rukun kedua. Fondasi penting bagi hati kita!”'
                  : '“Semua rukun iman saling terhubung dan menguatkan hati kita.”'}
              </p>
              <span className="text-[11px] text-[#B8AAA0]">
                Klik malaikat di diagram untuk kembali ke fokus kita.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
