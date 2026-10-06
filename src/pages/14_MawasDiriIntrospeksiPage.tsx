import React from 'react';
import { motion } from 'motion/react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { ArrowDown, ArrowRight, ShieldCheck, RefreshCw, Sparkles, Check } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    phase: 'SEBELUM / SAAT BERTINDAK',
    title: 'MAWAS DIRI',
    action: 'BERPIKIR DAHULU',
    desc: 'Menimbang manfaat dan mudarat sebelum lisan berucap atau tangan melangkah.',
    color: '#AFC4D5',
    icon: 'ShieldCheck'
  },
  {
    phase: 'TITIK TINDAKAN',
    title: 'BERTINDAK DENGAN SADAR',
    action: 'MENJALANKAN KEBAIKAN',
    desc: 'Melakukan perbuatan dengan niat ikhlas, dilandasi rasa pengawasan ilahi.',
    color: '#C8BDD8',
    icon: 'Sparkles'
  },
  {
    phase: 'SETELAH BERTINDAK',
    title: 'INTROSPEKSI',
    action: 'MENGEVALUASI DIRI',
    desc: 'Melihat kembali apa yang telah terjadi: menyadari kekurangan dan bersyukur atas ketaatan.',
    color: '#D9B8B8',
    icon: 'RefreshCw'
  },
  {
    phase: 'HASIL BERKELANJUTAN',
    title: 'MEMPERBAIKI DIRI',
    action: 'TUMBUH MENJADI LEBIH BAIK',
    desc: 'Memperbaiki akhlak hari demi hari hingga terbentuk pribadi yang berintegritas.',
    color: '#B8AAA0',
    icon: 'Check'
  }
];

export const MawasDiriIntrospeksiPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#AFC4D5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Sinergi Dua Sayap Jiwa
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          MAWAS DIRI & INTROSPEKSI
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80">
          Dua pilar utama untuk menjaga kejujuran dan membangun kepribadian muslim yang berakhlak mulia.
        </p>
      </div>

      {/* Two Pillars Contrast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border-2 border-[#AFC4D5]/60 bg-white p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#AFC4D5]/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D5]">
                Pencegahan (Preventif)
              </span>
              <span className="text-xs text-[#B8AAA0]">Sebelum / Saat</span>
            </div>
            <h3 className="font-serif-display text-2xl text-[#3F4147]">
              MAWAS DIRI
            </h3>
            <div className="p-3 rounded-xl bg-[#F8F5F0] border border-[#AFC4D5]/30">
              <p className="font-caveat-accent text-xl text-[#3F4147]">
                “Berpikir sebelum bertindak.”
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#3F4147]/85 leading-relaxed">
              Menjaga kendali diri agar tidak terpeleset melakukan hal yang dilarang Allah Swt. dan merugikan sesama.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#AFC4D5]/20 text-[11px] font-semibold text-[#AFC4D5]">
            Fungsi: Menjaga kehati-hatian
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="rounded-2xl border-2 border-[#D9B8B8]/60 bg-[#FAF7F4] p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#D9B8B8]/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#D9B8B8]">
                Perbaikan (Korektif)
              </span>
              <span className="text-xs text-[#B8AAA0]">Sesudah Bertindak</span>
            </div>
            <h3 className="font-serif-display text-2xl text-[#3F4147]">
              INTROSPEKSI
            </h3>
            <div className="p-3 rounded-xl bg-white border border-[#D9B8B8]/30">
              <p className="font-caveat-accent text-xl text-[#3F4147]">
                “Mengevaluasi dan memperbaiki diri.”
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#3F4147]/85 leading-relaxed">
              Melihat kembali jejak langkah yang telah dilakukan, mengakui kekeliruan dengan lapang dada, dan memperbaikinya.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D9B8B8]/20 text-[11px] font-semibold text-[#D9B8B8]">
            Fungsi: Membantu perbaikan diri
          </div>
        </motion.div>
      </div>

      {/* Visual Journey Flow Steps */}
      <div className="rounded-2xl border border-[#AFC4D5]/35 bg-white/70 p-6 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#3F4147] block text-center">
          Alur Perjalanan Karakter Remaja Muslim
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {JOURNEY_STEPS.map((st, idx) => (
            <div
              key={st.title}
              className="rounded-xl border border-[#AFC4D5]/25 bg-white p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-[#B8AAA0] uppercase tracking-wider block mb-1">
                  {st.phase}
                </span>
                <h4 className="font-serif-display text-base text-[#3F4147] mb-1">
                  {st.title}
                </h4>
                <div
                  className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold mb-2"
                  style={{ backgroundColor: `${st.color}25`, color: '#3F4147' }}
                >
                  {st.action}
                </div>
                <p className="text-xs text-[#3F4147]/80 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Conclusion Statement & Nara */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border-2 border-[#AFC4D5]/40 bg-white p-6 shadow-sm">
        <div className="md:col-span-8 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D5]">
            Kesimpulan Inti Pembelajaran
          </span>
          <h3 className="font-serif-display text-xl sm:text-2xl text-[#3F4147] leading-snug">
            “Mawas diri membantu kita berhati-hati, sedangkan introspeksi membantu kita memperbaiki diri.”
          </h3>
          <p className="text-xs text-[#3F4147]/80 leading-relaxed">
            Keduanya bagaikan dua rem dan kemudi dalam kehidupan kita, menjaga agar perjalanan hidup kita senantiasa lurus di jalan yang diridhai Allah Swt.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end">
          <NaraCharacter
            pose="explaining"
            bubbleText="Keren kan? Dengan dua hal ini, kita tumbuh menjadi pribadi yang jujur dan bertanggung jawab!"
            size="sm"
            showNameTag={false}
          />
        </div>
      </div>
    </div>
  );
};
