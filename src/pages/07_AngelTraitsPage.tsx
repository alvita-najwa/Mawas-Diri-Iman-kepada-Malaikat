import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIFAT_MALAIKAT_ITEMS } from '../data/learningContent';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const AngelTraitsPage: React.FC = () => {
  const [selectedTraitId, setSelectedTraitId] = useState<string>(SIFAT_MALAIKAT_ITEMS[0].id);

  const selectedTrait =
    SIFAT_MALAIKAT_ITEMS.find((t) => t.id === selectedTraitId) || SIFAT_MALAIKAT_ITEMS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Karakteristik Mulia
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          MENGENAL SIFAT MALAIKAT
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80">
          Klik lingkaran sifat untuk memahami karakteristik ketaatan dan kesucian para malaikat Allah Swt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Radial / Hexagonal Layout */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
            {/* Soft geometric circular web */}
            <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-[#AFC4D5]/35 border-dashed pointer-events-none" />
            <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-[#D9B8B8]/25 pointer-events-none" />

            {/* Central Node: MALAIKAT */}
            <div className="z-10 flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-2 border-[#AFC4D5] shadow-md text-center p-2">
              <EightPointStar size={18} color="#AFC4D5" />
              <span className="font-serif-display text-xs sm:text-sm font-bold text-[#3F4147] mt-1">
                MALAIKAT
              </span>
              <span className="text-[9px] text-[#B8AAA0] uppercase tracking-wider">
                Makhluk Suci
              </span>
            </div>

            {/* 6 Radial Trait Buttons */}
            {SIFAT_MALAIKAT_ITEMS.map((trait, index) => {
              const angle = (index * (360 / 6) - 90) * (Math.PI / 180);
              const radius = 130;
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));

              const isSelected = selectedTraitId === trait.id;

              return (
                <motion.button
                  key={trait.id}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  onClick={() => setSelectedTraitId(trait.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute z-20 flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border transition-all text-center p-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3F4147] border-[#3F4147] text-white shadow-lg ring-4 ring-[#AFC4D5]/40'
                      : 'bg-white border-[#AFC4D5]/40 text-[#3F4147] shadow-sm hover:bg-[#F8F5F0]'
                  }`}
                  aria-label={`Sifat Malaikat: ${trait.title}`}
                >
                  <span className="text-[10px] sm:text-xs font-semibold line-clamp-2 leading-tight">
                    {trait.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Trait Detail Display */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTrait.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-[#AFC4D5]/40 bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#AFC4D5]/20">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D5] flex items-center gap-1.5">
                  <Sparkles size={14} /> Sifat Terpilih
                </span>
                <span className="text-xs font-mono text-[#B8AAA0]">
                  Karakter Malaikat
                </span>
              </div>

              <div>
                <h3 className="font-serif-display text-2xl text-[#3F4147]">
                  {selectedTrait.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#AFC4D5]">
                  {selectedTrait.short}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#3F4147]/85 leading-relaxed">
                {selectedTrait.desc}
              </p>

              <div className="rounded-xl bg-[#F8F5F0] border border-[#B8AAA0]/25 p-3.5 text-xs text-[#3F4147] leading-relaxed">
                <strong>Hikmah Pemahaman:</strong> {selectedTrait.detail}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nara Explaining Sifat */}
          <div className="rounded-2xl border border-[#AFC4D5]/25 bg-white/60 p-4 flex items-center gap-4">
            <NaraCharacter
              pose="explaining"
              size="sm"
              showNameTag={false}
            />
            <div className="text-xs text-[#3F4147]/85 leading-relaxed">
              <p className="font-caveat-accent text-base text-[#3F4147] mb-0.5">
                “Malaikat diciptakan tanpa hawa nafsu, ketaatannya selalu murni kepada Allah Swt.”
              </p>
              <span className="text-[11px] text-[#B8AAA0]">
                Klik lingkaran sifat lainnya untuk menelusuri.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
