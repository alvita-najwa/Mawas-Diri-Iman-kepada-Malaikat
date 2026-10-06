import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Compass, Sparkles, Check, ChevronDown } from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';

const PILLARS = [
  {
    id: 'meyakini',
    tag: 'Tingkat 1',
    title: 'MEYAKINI',
    summary: 'Meyakini keberadaan malaikat sebagai makhluk Allah Swt.',
    desc: 'Keyakinan teguh di dalam hati bahwa malaikat itu nyata diciptakan Allah dari cahaya (nur), walaupun mata jasmani kita di dunia tidak dapat melihatnya secara langsung.',
    actionExample: 'Contoh: Meyakini bahwa kita tidak pernah benar-benar sendirian dalam berbuat ketaatan.',
    color: '#AFC4D5'
  },
  {
    id: 'memahami',
    tag: 'Tingkat 2',
    title: 'MEMAHAMI',
    summary: 'Memahami sifat dan tugas malaikat berdasarkan ajaran Islam.',
    desc: 'Mempelajari nama-nama, sifat suci, dan amanah yang diemban masing-masing malaikat sebagaimana yang diterangkan dalam Al-Qur\'an dan sunnah Rasulullah saw.',
    actionExample: 'Contoh: Tahu bahwa Raqib dan Atid bertugas mencatat amal baik dan buruk kita.',
    color: '#D9B8B8'
  },
  {
    id: 'menghayati',
    tag: 'Tingkat 3',
    title: 'MENGHAYATI',
    summary: 'Menjadikan keimanan kepada malaikat sebagai dorongan memperbaiki perilaku.',
    desc: 'Membawa keyakinan tersebut ke dalam tindakan konkret: senantiasa mawas diri, menjaga lisan, jujur saat ujian, dan terdorong memperbanyak perbuatan baik.',
    actionExample: 'Contoh: Mengurungkan niat berkata kotor atau berbuat curang karena sadar diawasi.',
    color: '#C8BDD8'
  }
];

export const DefinitionPage: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>('meyakini');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title & Core Definition */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Konsep Dasar Akidah
          </span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          APA ITU IMAN KEPADA MALAIKAT?
        </h1>

        <div className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-6 shadow-sm">
          <p className="text-base sm:text-lg text-[#3F4147] font-medium leading-relaxed">
            “Iman kepada malaikat adalah meyakini dengan sepenuh hati bahwa malaikat merupakan makhluk Allah Swt. yang diciptakan untuk melaksanakan tugas-tugas yang telah ditetapkan oleh-Nya dan senantiasa taat kepada Allah Swt.”
          </p>
        </div>
      </div>

      {/* Interactive 3 Pillars Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3F4147]/70">
              Tiga Dimensi Keimanan (Klik untuk Membuka)
            </span>
            <span className="text-[11px] text-[#B8AAA0]">Interaktif</span>
          </div>

          <div className="space-y-3">
            {PILLARS.map((pillar) => {
              const isActive = activePillar === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                    isActive
                      ? 'border-[#AFC4D5] bg-white shadow-md'
                      : 'border-[#AFC4D5]/25 bg-white/70 hover:bg-white'
                  }`}
                  onClick={() => setActivePillar(pillar.id)}
                >
                  <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                        style={{ backgroundColor: `${pillar.color}25`, color: '#3F4147' }}
                      >
                        {pillar.tag.slice(-1)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif-display text-lg text-[#3F4147]">
                            {pillar.title}
                          </h3>
                          <span className="text-[11px] font-semibold text-[#B8AAA0]">
                            · {pillar.tag}
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-[#3F4147]/85 font-medium">
                          {pillar.summary}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`text-[#B8AAA0] transition-transform duration-300 mt-1 shrink-0 ${
                        isActive ? 'rotate-180 text-[#3F4147]' : ''
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#AFC4D5]/20 bg-[#F8F5F0]/60 p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-[#3F4147]/90 leading-relaxed"
                      >
                        <p>{pillar.desc}</p>
                        <div className="rounded-xl border border-[#AFC4D5]/30 bg-white p-3 font-medium text-[#3F4147] flex items-start gap-2">
                          <Check size={16} className="text-[#AFC4D5] shrink-0 mt-0.5" />
                          <span>{pillar.actionExample}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="pt-2">
            <div className="rounded-xl bg-[#FAF7F4] border border-[#B8AAA0]/30 p-3.5 flex items-center gap-3">
              <Compass size={18} className="text-[#B8AAA0] shrink-0" />
              <p className="text-xs text-[#3F4147]/85 font-medium">
                Iman kepada malaikat merupakan bagian tak terpisahkan dari <strong className="text-[#3F4147]">enam rukun iman</strong> yang wajib diyakini setiap muslim.
              </p>
            </div>
          </div>
        </div>

        {/* Nara Column */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="rounded-2xl border border-[#AFC4D5]/30 bg-white/60 p-5 flex flex-col items-center text-center w-full max-w-xs">
            <NaraCharacter
              pose="explaining"
              bubbleText="Ingat ya, beriman itu bukan hanya tahu namanya, tapi juga menghayati kehadirannya dalam menjaga akhlak kita!"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
