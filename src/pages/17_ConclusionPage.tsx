import React from 'react';
import { motion } from 'motion/react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { RotateCcw, Home, Sparkles, Heart, ArrowDown, Award } from 'lucide-react';
import { APP_METADATA } from '../data/learningContent';
import { ReflectionData } from '../types';

interface ConclusionPageProps {
  onRestart: () => void;
  onGoToMenu: () => void;
  reflection: ReflectionData;
}

const CONCLUSION_FLOW = [
  { step: 1, title: 'TAAT', desc: 'Meneladani ketaatan mutlak para malaikat kepada perintah Allah Swt.' },
  { step: 2, title: 'BERBUAT BAIK', desc: 'Memperbanyak amal saleh karena meyakini catatan mulia Malaikat Raqib.' },
  { step: 3, title: 'MAWAS DIRI', desc: 'Berpikir cermat sebelum bertindak dan berhati-hati dalam berucap.' },
  { step: 4, title: 'BERTANGGUNG JAWAB', desc: 'Menyadari bahwa setiap keputusan hidup kita kelak dipertanggungjawabkan.' },
  { step: 5, title: 'MEMPERBAIKI DIRI', desc: 'Senantiasa berintrospeksi (muhasabah) agar hari ini lebih baik dari kemarin.' }
];

export const ConclusionPage: React.FC<ConclusionPageProps> = ({
  onRestart,
  onGoToMenu,
  reflection
}) => {
  const hasReflections = Boolean(
    reflection.cautiousSpeech ||
    reflection.unseenHonesty ||
    reflection.mistakesToFix ||
    reflection.goodDeedGoal
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
      {/* SECTION 1: CONCLUSION ESSENCE */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#D9B8B8" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Puncak Pembelajaran
          </span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#3F4147]">
          KENALI IMAN, KENALI DIRI
        </h1>

        <div className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-6 shadow-sm">
          <p className="text-base sm:text-lg text-[#3F4147] font-medium leading-relaxed">
            “Beriman kepada malaikat berarti meyakini keberadaan malaikat sebagai makhluk Allah Swt. yang senantiasa taat dan melaksanakan tugas yang telah ditetapkan oleh-Nya.”
          </p>
        </div>
      </div>

      {/* Animated Flow: TAAT -> BERBUAT BAIK -> MAWAS DIRI -> BERTANGGUNG JAWAB -> MEMPERBAIKI DIRI */}
      <div className="rounded-2xl border border-[#AFC4D5]/30 bg-white/70 p-6 md:p-8 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3F4147] block text-center">
          Peta Transformasi Diri Siswa Muslim
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CONCLUSION_FLOW.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.35 }}
              className="rounded-xl border border-[#AFC4D5]/25 bg-white p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#AFC4D5]">
                    0{item.step}
                  </span>
                  <EightPointStar size={12} color="#D9B8B8" />
                </div>
                <h4 className="font-serif-display text-base text-[#3F4147] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#3F4147]/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Emotional Banner */}
      <div className="relative rounded-3xl border-2 border-[#D9B8B8]/40 bg-gradient-to-b from-white to-[#FAF7F4] p-8 md:p-12 shadow-sm text-center space-y-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#AFC4D5]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B8AAA0]">
            Pesan Penutup & Doa
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
            PERJALANANMU BELUM BERAKHIR
          </h2>
        </div>

        {/* Nara Celebrating / Smiling in Center */}
        <div className="flex justify-center my-4">
          <NaraCharacter
            pose="celebrating"
            bubbleText="Alhamdulillah! Semoga ilmu ini menjadi cahaya yang senantiasa menuntun langkah dan ucapan kita setiap hari."
            size="lg"
            showNameTag={false}
          />
        </div>

        {/* Closing Golden Quote */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-[#AFC4D5]/35 bg-white p-6 shadow-sm">
          <p className="font-caveat-accent text-2xl sm:text-3xl text-[#3F4147] leading-snug">
            “Iman yang benar tidak hanya tersimpan dalam pengetahuan, tetapi tercermin dalam sikap dan perbuatan.”
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[46px] rounded-xl border border-[#AFC4D5]/60 bg-white px-6 py-2.5 text-xs font-semibold text-[#3F4147] shadow-sm hover:bg-[#F8F5F0] active:scale-95 transition-all"
          >
            <RotateCcw size={15} />
            <span>ULANGI MATERI</span>
          </button>

          <button
            onClick={onGoToMenu}
            className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-[#3F4147] px-7 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2B2D31] active:scale-95 transition-all"
          >
            <Home size={15} />
            <span>KEMBALI KE MENU</span>
          </button>
        </div>

        {/* Compiler & Curricular Credits */}
        <div className="pt-6 border-t border-[#AFC4D5]/20 text-xs text-[#3F4147]/65 space-y-1">
          <p className="font-medium text-[#3F4147]">
            {APP_METADATA.subject} · {APP_METADATA.phase} · {APP_METADATA.grade}
          </p>
          <p>Disusun oleh: {APP_METADATA.compiler}</p>
          <p className="text-[11px] text-[#B8AAA0]">
            Kenali Iman, Kenali Diri — Mawas Diri dan Introspeksi dalam Menjalani Kehidupan
          </p>
        </div>
      </div>
    </div>
  );
};
