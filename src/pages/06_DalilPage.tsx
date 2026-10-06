import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, FileText, Info, Check, Sparkles } from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';

export const DalilPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'ayat' | 'arti'>('both');

  const arabicText = `اٰمَنَ الرَّسُوْلُ بِمَآ اُنْزِلَ اِلَيْهِ مِنْ رَّبِّهٖ وَالْمُؤْمِنُوْنَ ۗ كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلٰۤىِٕكَتِهٖ وَكُتُبِهٖ وَرُسُلِهٖ ۗ لَا نُفَرِّقُ بَيْنَ اَحَدٍ مِّنْ رُّسُلِهٖ ۗ وَقَالُوْا سَمِعْنَا وَاَطَعْنَا غُفْرَانَكَ رَبَّنَا وَاِلَيْكَ الْمَصِيْرُ ٢٨٥`;

  const translationText = `“Rasul (Muhammad) beriman pada apa (Al-Qur’an) yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang mukmin. Masing-masing beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, dan rasul-rasul-Nya. (Mereka berkata,) ‘Kami tidak membeda-bedakan seorang pun dari rasul-rasul-Nya.’ Mereka juga berkata, ‘Kami dengar dan kami taat. Ampunilah kami, wahai Tuhan kami. Hanya kepada-Mu tempat (kami) kembali.’”`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-6">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Landasan Normatif
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          DALIL IMAN KEPADA MALAIKAT
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80 font-medium">
          Surat Al-Baqarah Ayat 285 (Q.S. al-Baqarah/2:285)
        </p>
      </div>

      {/* Tab Switcher Controls (Segmented Control - Allowed by frontend-design skill) */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 p-1 bg-[#AFC4D5]/20 rounded-xl border border-[#AFC4D5]/30">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'both'
                ? 'bg-white text-[#3F4147] shadow-sm'
                : 'text-[#3F4147]/70 hover:text-[#3F4147]'
            }`}
          >
            Tampilan Berdampingan
          </button>
          <button
            onClick={() => setActiveTab('ayat')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'ayat'
                ? 'bg-white text-[#3F4147] shadow-sm'
                : 'text-[#3F4147]/70 hover:text-[#3F4147]'
            }`}
          >
            Teks Ayat (Arab)
          </button>
          <button
            onClick={() => setActiveTab('arti')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'arti'
                ? 'bg-white text-[#3F4147] shadow-sm'
                : 'text-[#3F4147]/70 hover:text-[#3F4147]'
            }`}
          >
            Arti (Terjemah)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence mode="wait">
            {/* Ayat Display */}
            {(activeTab === 'both' || activeTab === 'ayat') && (
              <motion.div
                key="tab-ayat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#AFC4D5]/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0] flex items-center gap-1.5">
                    <BookOpen size={14} className="text-[#AFC4D5]" /> Teks Al-Qur'an
                  </span>
                  <span className="text-xs font-mono text-[#3F4147]/70">Q.S. 2:285</span>
                </div>

                <p className="font-arabic-text text-2xl sm:text-3xl lg:text-3xl leading-[2.2] text-[#3F4147] text-right font-normal">
                  {arabicText}
                </p>

                {/* Specific Highlight Indicator */}
                <div className="mt-4 pt-4 border-t border-[#AFC4D5]/15 flex items-center gap-2 text-xs text-[#3F4147]/80">
                  <EightPointStar size={12} color="#D9B8B8" />
                  <span>
                    Perhatikan lafaz: <strong className="font-arabic-text text-base text-[#3F4147]">وَمَلٰۤىِٕكَتِهٖ</strong> (dan malaikat-malaikat-Nya) yang menegaskan kewajiban beriman kepada malaikat.
                  </span>
                </div>
              </motion.div>
            )}

            {/* Arti Display */}
            {(activeTab === 'both' || activeTab === 'arti') && (
              <motion.div
                key="tab-arti"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#D9B8B8]/35 bg-[#FAF7F4] p-6 sm:p-7 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9B8B8]/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0] flex items-center gap-1.5">
                    <FileText size={14} className="text-[#D9B8B8]" /> Terjemahan Bahasa Indonesia
                  </span>
                  <span className="text-[11px] text-[#3F4147]/60">Kemenag RI</span>
                </div>

                <p className="text-sm sm:text-base text-[#3F4147] leading-relaxed font-normal">
                  {translationText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Academic Source Note */}
          <div className="rounded-xl border border-[#B8AAA0]/30 bg-white/70 p-3.5 flex items-start gap-2.5 text-xs text-[#3F4147]/75">
            <Info size={15} className="text-[#B8AAA0] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Catatan Guru:</strong> Teks ayat dan terjemahan final sebaiknya disesuaikan dengan sumber Al-Qur'an resmi yang digunakan di sekolah atau madrasah masing-masing.
            </p>
          </div>
        </div>

        {/* Nara Column */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="rounded-2xl border border-[#AFC4D5]/30 bg-white/60 p-5 flex flex-col items-center text-center w-full max-w-xs">
            <NaraCharacter
              pose="explaining"
              bubbleText="Ayat ini menjelaskan bahwa orang-orang beriman meyakini Allah, para malaikat-Nya, kitab-kitab-Nya, dan rasul-rasul-Nya!"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
