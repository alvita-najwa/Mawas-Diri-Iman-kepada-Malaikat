import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Eye, Check, Lightbulb, MessageSquare } from 'lucide-react';

const MAWAS_DIRI_EXAMPLES = [
  {
    icon: 'MessageSquare',
    title: 'Mempertimbangkan Ucapan Sebelum Berbicara',
    desc: 'Memikirkan apakah perkataan yang akan keluar dari lisan kita bermanfaat atau justru menyakiti hati kawan.',
    tip: 'Jika ragu ucapan itu baik atau buruk, lebih bijak memilih diam.'
  },
  {
    icon: 'Lightbulb',
    title: 'Memikirkan Dampak Sebelum Mengunggah Sesuatu',
    desc: 'Menahan jemari sebelum mengirim pesan di grup obrolan atau membagikan postingan di media sosial.',
    tip: 'Tanyakan pada diri: "Apakah postingan ini mendatangkan kebaikan atau memicu fitnah?"'
  },
  {
    icon: 'Eye',
    title: 'Tidak Mengambil Sesuatu yang Bukan Milik Sendiri',
    desc: 'Menghargai kepemilikan orang lain walaupun barang tersebut tergeletak tanpa ada orang yang memperhatikan.',
    tip: 'Kejujuran kita diuji justru saat tidak ada yang tahu siapa yang mengambil.'
  },
  {
    icon: 'Check',
    title: 'Berhati-hati dalam Bersikap & Memilih Tindakan',
    desc: 'Menyadari bahwa setiap keputusan memiliki akibat, baik bagi diri sendiri, keluarga, maupun orang lain.',
    tip: 'Menolak ajakan membolos atau berbuat iseng yang merugikan orang lain.'
  }
];

export const MawasDiriPage: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<number>(0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title & Core Definition */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Pengendalian Diri Preventif
          </span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          APA ITU MAWAS DIRI?
        </h1>

        <div className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-6 shadow-sm">
          <p className="text-base sm:text-lg text-[#3F4147] font-medium leading-relaxed">
            “Mawas diri adalah kesadaran untuk menjaga dan mengendalikan sikap, ucapan, serta perbuatan sebelum atau ketika melakukan sesuatu.”
          </p>
        </div>
      </div>

      {/* Large Statement Callout */}
      <div className="rounded-2xl border-2 border-[#AFC4D5] bg-[#F8F5F0] p-6 text-center shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#B8AAA0] block mb-1">
          Kaidah Emas Mawas Diri
        </span>
        <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-[#3F4147] tracking-tight">
          “Berpikir sebelum bertindak.”
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#3F4147]/80 max-w-xl mx-auto">
          Mawas diri bekerja di awal: sebelum lisan berucap, sebelum tangan bertindak, dan sebelum keputusan diambil.
        </p>
      </div>

      {/* Interactive Examples Grid & Nara */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3F4147]/80">
              Penerapan Konkret Mawas Diri
            </span>
            <span className="text-xs text-[#B8AAA0]">Pilih untuk Membuka</span>
          </div>

          <div className="space-y-3">
            {MAWAS_DIRI_EXAMPLES.map((ex, idx) => {
              const isSelected = selectedExample === idx;
              return (
                <div
                  key={ex.title}
                  onClick={() => setSelectedExample(idx)}
                  className={`rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#AFC4D5] bg-white shadow-md'
                      : 'border-[#AFC4D5]/25 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#AFC4D5]/20 flex items-center justify-center text-[#AFC4D5] shrink-0 mt-0.5 font-mono text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-serif-display text-base sm:text-lg text-[#3F4147]">
                        {ex.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3F4147]/85 leading-relaxed">
                        {ex.desc}
                      </p>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-2 mt-2 border-t border-[#AFC4D5]/20 text-xs font-medium text-[#3F4147] flex items-start gap-2"
                        >
                          <Lightbulb size={15} className="text-[#D9B8B8] shrink-0 mt-0.5" />
                          <span>{ex.tip}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nara Column in Thinking Pose */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="rounded-2xl border border-[#AFC4D5]/30 bg-white/60 p-5 flex flex-col items-center text-center w-full max-w-xs">
            <NaraCharacter
              pose="thinking"
              bubbleText="Coba pikirkan dulu akibatnya sebelum kita berbicara atau bertindak ya..."
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
