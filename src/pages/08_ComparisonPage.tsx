import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Sparkles, User, Shield, Check, Info } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    aspect: 'Hakikat Penciptaan',
    angel: 'Makhluk gaib, diciptakan dari cahaya (nur). Tidak kasat mata bagi pandangan manusia biasa.',
    human: 'Makhluk yang dapat diamati secara fisik, diciptakan dari tanah (unsur bumi) dan memiliki raga biologis.'
  },
  {
    aspect: 'Ketaatan & Kehendak',
    angel: 'Selalu taat secara mutlak kepada Allah Swt. Tanpa hawa nafsu dan tidak pernah mendurhakai perintah-Nya.',
    human: 'Dikaruniai akal sekaligus hawa nafsu. Memiliki kehendak bebas (ikhtiar) untuk memilih taat atau berbuat maksiat.'
  },
  {
    aspect: 'Kebutuhan Hidup',
    angel: 'Tidak membutuhkan makan, minum, istirahat, tidur, dan tidak berpasang-pasangan / berkeluarga.',
    human: 'Memiliki kebutuhan biologis: makan, minum, beristirahat, tidur, dan memiliki naluri berketurunan.'
  },
  {
    aspect: 'Tugas & Amanah',
    angel: 'Menjalankan tugas khusus yang tetap dan teratur sesuai ketetapan Allah Swt. tanpa mengeluh.',
    human: 'Mengemban amanah sebagai khalifah di bumi untuk beribadah dan memakmurkan kehidupan dengan kebajikan.'
  }
];

export const ComparisonPage: React.FC = () => {
  const [activeAspect, setActiveAspect] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Analisis Komparatif
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          MALAIKAT VS MANUSIA
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80">
          Memahami perbedaan karakteristik untuk menghargai amanah kehendak bebas yang Allah titipkan kepada manusia.
        </p>
      </div>

      {/* Split Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: MALAIKAT */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-[#AFC4D5]/40 bg-white p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#AFC4D5]/20 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#AFC4D5]/20 flex items-center justify-center text-[#AFC4D5]">
                  <Shield size={18} />
                </div>
                <h3 className="font-serif-display text-2xl text-[#3F4147]">
                  MALAIKAT
                </h3>
              </div>
              <span className="text-xs text-[#B8AAA0] font-mono">Diciptakan dari Cahaya</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#3F4147]/90">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#AFC4D5]/20 flex items-center justify-center text-[#AFC4D5] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Makhluk gaib:</strong> Tidak dapat ditangkap oleh indera penglihatan manusia biasa.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#AFC4D5]/20 flex items-center justify-center text-[#AFC4D5] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Selalu taat kepada Allah Swt.:</strong> Tanpa hawa nafsu dan mustahil bermaksiat.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#AFC4D5]/20 flex items-center justify-center text-[#AFC4D5] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Bebas kebutuhan fisik:</strong> Tidak membutuhkan makan, minum, maupun tidur seperti manusia.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#AFC4D5]/20 flex items-center justify-center text-[#AFC4D5] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Menjalankan tugas:</strong> Selaras dan tunduk pada seluruh ketetapan Allah Swt.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#AFC4D5]/20 text-[11px] text-[#B8AAA0] italic">
            Ketaatan malaikat merupakan kodrat suci yang tetap.
          </div>
        </motion.div>

        {/* Right Column: MANUSIA */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-[#D9B8B8]/40 bg-[#FAF7F4] p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#D9B8B8]/20 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#D9B8B8]/25 flex items-center justify-center text-[#D9B8B8]">
                  <User size={18} />
                </div>
                <h3 className="font-serif-display text-2xl text-[#3F4147]">
                  MANUSIA
                </h3>
              </div>
              <span className="text-xs text-[#B8AAA0] font-mono">Diciptakan dari Tanah</span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#3F4147]/90">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D9B8B8]/25 flex items-center justify-center text-[#D9B8B8] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Makhluk kasat mata:</strong> Dapat diamati secara fisik dan memiliki raga di dunia nyata.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D9B8B8]/25 flex items-center justify-center text-[#D9B8B8] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Diberi pilihan (ikhtiar):</strong> Memiliki akal dan nafsu untuk taat atau melanggar aturan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D9B8B8]/25 flex items-center justify-center text-[#D9B8B8] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Memiliki kebutuhan biologis:</strong> Memerlukan asupan makanan, minuman, dan istirahat.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D9B8B8]/25 flex items-center justify-center text-[#D9B8B8] shrink-0 mt-0.5">
                  <Check size={12} />
                </div>
                <span><strong>Mengemban amanah khalifah:</strong> Bertanggung jawab atas setiap tindakan yang dipilihnya.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D9B8B8]/20 text-[11px] text-[#B8AAA0] italic">
            Ketaatan manusia dinilai berharga karena melibatkan perjuangan melawan nafsu.
          </div>
        </motion.div>
      </div>

      {/* Bottom Statement & Nara */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border border-[#AFC4D5]/30 bg-white/70 p-6">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#3F4147]">
            <EightPointStar size={14} color="#AFC4D5" />
            <span>Kesimpulan Perbandingan</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-[#3F4147] leading-relaxed">
            “Malaikat dan manusia sama-sama makhluk Allah Swt., tetapi memiliki karakteristik yang berbeda.”
          </p>
          <p className="text-xs text-[#3F4147]/75 leading-relaxed">
            Karena manusia memiliki pilihan, maka setiap keputusan yang kita ambil memiliki nilai pahala atau dosa. Inilah alasan mengapa kita perlu senantiasa mawas diri dan berintrospeksi.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end">
          <NaraCharacter
            pose="thinking"
            bubbleText="Karena kita punya pilihan, mari kita selalu memilih berbuat baik!"
            size="sm"
            showNameTag={false}
          />
        </div>
      </div>
    </div>
  );
};
