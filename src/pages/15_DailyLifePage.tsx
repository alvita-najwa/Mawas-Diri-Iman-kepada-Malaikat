import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DAILY_LIFE_SCENARIOS } from '../data/learningContent';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { GraduationCap, Home, Users, Smartphone, Check, Sparkles } from 'lucide-react';

export const DailyLifePage: React.FC = () => {
  const [selectedEnvId, setSelectedEnvId] = useState<string>(DAILY_LIFE_SCENARIOS[0].id);

  const selectedEnv =
    DAILY_LIFE_SCENARIOS.find((e) => e.id === selectedEnvId) || DAILY_LIFE_SCENARIOS[0];

  const getEnvIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={size} />;
      case 'Home':
        return <Home size={size} />;
      case 'Users':
        return <Users size={size} />;
      case 'Smartphone':
      default:
        return <Smartphone size={size} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Implementasi Nyata
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          KEHIDUPAN SEHARI-HARI
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80">
          Pilih salah satu lingkungan interaktif untuk melihat wujud nyata iman kepada malaikat dalam keseharianmu.
        </p>
      </div>

      {/* 4 Environment Interactive Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DAILY_LIFE_SCENARIOS.map((env) => {
          const isSelected = selectedEnvId === env.id;
          return (
            <button
              key={env.id}
              onClick={() => setSelectedEnvId(env.id)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#3F4147] text-[#3F4147] shadow-md ring-2 ring-[#AFC4D5]/40'
                  : 'bg-white/70 border-[#AFC4D5]/30 text-[#3F4147]/70 hover:bg-white hover:text-[#3F4147]'
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: isSelected ? '#3F4147' : `${env.color}30`,
                  color: isSelected ? '#FFFFFF' : '#3F4147'
                }}
              >
                {getEnvIcon(env.icon, 20)}
              </div>
              <span className="text-xs sm:text-sm font-serif-display font-semibold tracking-wide">
                {env.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Environment Content Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Actions List (Left) */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedEnv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-[#AFC4D5]/40 bg-white p-6 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#AFC4D5]/20">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedEnv.color}30`, color: '#3F4147' }}
                  >
                    {getEnvIcon(selectedEnv.icon, 18)}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl text-[#3F4147]">
                      {selectedEnv.title}
                    </h3>
                    <span className="text-xs text-[#B8AAA0] font-medium">
                      Tema: {selectedEnv.theme}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#AFC4D5]">
                  4 Panduan Sikap
                </span>
              </div>

              {/* 4 Action Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedEnv.actions.map((act, index) => (
                  <div
                    key={act.head}
                    className="p-3.5 rounded-xl border border-[#AFC4D5]/25 bg-[#F8F5F0]/70 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#AFC4D5]/25 flex items-center justify-center text-[#3F4147] text-[10px] font-bold">
                          {index + 1}
                        </div>
                        <h4 className="font-semibold text-xs sm:text-sm text-[#3F4147]">
                          {act.head}
                        </h4>
                      </div>
                      <p className="text-xs text-[#3F4147]/80 leading-relaxed">
                        {act.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nara Column */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="rounded-2xl border border-[#AFC4D5]/30 bg-white/60 p-5 flex flex-col items-center text-center w-full max-w-xs">
            <NaraCharacter
              pose="pointing"
              bubbleText="Di mana pun kita berada—di kelas, di rumah, bersama teman, atau di HP—malaikat selalu ada mencatat amal kita!"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
