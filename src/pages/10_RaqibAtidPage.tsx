import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Check, AlertTriangle, ArrowDown, ShieldAlert, Sparkles, Heart } from 'lucide-react';

const FLOW_STEPS = [
  {
    step: '01',
    title: 'PERBUATAN',
    desc: 'Setiap gerak langkah, ucapan lisan, niat batin, serta ketikan jemari kita di layar gawai.'
  },
  {
    step: '02',
    title: 'TERCATAT',
    desc: 'Malaikat Raqib dan Atid tak pernah luput mencatat sekecil apa pun perbuatan kita, tanpa ada yang terlewat.'
  },
  {
    step: '03',
    title: 'DISADARI',
    desc: 'Mawas diri menyadarkan kita bahwa kita senantiasa dalam pengawasan ilahi, baik di kala ramai maupun sepi.'
  },
  {
    step: '04',
    title: 'DIPERTANGGUNGJAWABKAN',
    desc: 'Setiap catatan amal akan dibuka kembali di hari akhir sebagai bukti yang adil dan nyata di hadapan Allah Swt.'
  }
];

const REFLECTIVE_EXAMPLES = [
  {
    title: 'Jujur ketika Ujian',
    situation: 'Ujian Matematika di kelas ketika guru sedang memeriksa presensi di ruang lain.',
    raqibNote: 'Malaikat Raqib mencatat kegigihanmu menahan diri dari menyontek sebagai amal kejujuran berbobot tinggi.',
    atidNote: 'Jika menyontek atau membuka kunci jawaban, Malaikat Atid mencatatnya sebagai ketidakjujuran dan pengkhianatan amanah.'
  },
  {
    title: 'Menjaga Ucapan',
    situation: 'Sedang berkumpul dengan teman yang mulai membicarakan kekurangan kawan lain (ghibah).',
    raqibNote: 'Malaikat Raqib mencatat keberanianmu mengingatkan teman dengan santun atau memilih diam dari keburukan.',
    atidNote: 'Jika ikut menimpali ejekan atau menyebarkan aib teman, Malaikat Atid mencatatnya sebagai dosa lisan.'
  },
  {
    title: 'Tidak Mengambil Hak Orang Lain',
    situation: 'Menemukan uang jatuh atau pulpen bagus tergeletak tanpa pemilik di lantai kelas.',
    raqibNote: 'Malaikat Raqib mencatat usahamu mengumumkan dan menyerahkan barang temuan tersebut kepada guru piket.',
    atidNote: 'Jika diam-diam memasukkannya ke dalam saku sendiri, Malaikat Atid mencatat perbuatan mengambil hak orang lain.'
  },
  {
    title: 'Berhati-hati di Media Sosial',
    situation: 'Melihat postingan yang memancing emosi atau kolom komentar yang dipenuhi hujatan.',
    raqibNote: 'Malaikat Raqib mencatat kebijaksanaanmu menahan jari dari mengetik komentar jahat atau meneruskan hoaks.',
    atidNote: 'Jika ikut melontarkan kata-kata kotor atau mencaci maki di dunia maya, Malaikat Atid mencatat setiap abjadnya.'
  }
];

export const RaqibAtidPage: React.FC = () => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);

  const currentExample = REFLECTIVE_EXAMPLES[selectedExampleIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#D9B8B8" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Pengawasan & Catatan Amal
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          SETIAP PERBUATAN MEMILIKI CATATAN
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80">
          Malaikat Raqib dan Atid senantiasa mendampingi dan merekam seluruh jejak kehidupan kita.
        </p>
      </div>

      {/* Side-by-side Presence of Raqib & Atid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Raqib Box */}
        <div className="rounded-2xl border border-[#AFC4D5]/40 bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#AFC4D5]/20 flex items-center justify-center shrink-0">
            <EightPointStar size={24} color="#AFC4D5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-display text-xl text-[#3F4147]">Malaikat Raqib</h3>
              <span className="text-xs font-arabic-text text-[#3F4147]">رَقِيبٌ</span>
            </div>
            <p className="text-xs text-[#3F4147]/80 font-medium">
              Mencatat seluruh amal kebaikan, niat tulus, dan kesantunan manusia.
            </p>
          </div>
        </div>

        {/* Atid Box */}
        <div className="rounded-2xl border border-[#D9B8B8]/40 bg-[#FAF7F4] p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#D9B8B8]/25 flex items-center justify-center shrink-0">
            <EightPointStar size={24} color="#D9B8B8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-display text-xl text-[#3F4147]">Malaikat Atid</h3>
              <span className="text-xs font-arabic-text text-[#3F4147]">عَتِيدٌ</span>
            </div>
            <p className="text-xs text-[#3F4147]/80 font-medium">
              Mencatat seluruh perbuatan buruk, kebohongan, dan kelalaian manusia.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Flow of Consciousness */}
      <div className="rounded-2xl border border-[#AFC4D5]/30 bg-white/70 p-6 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0] block text-center">
          Alur Kesadaran Spiritual
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {FLOW_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="rounded-xl border border-[#AFC4D5]/20 bg-white p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#AFC4D5]">
                    {item.step}
                  </span>
                  <span className="text-[10px] text-[#B8AAA0]">TAHAP</span>
                </div>
                <h4 className="font-serif-display text-base text-[#3F4147] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#3F4147]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Concrete Teen Scenarios */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3F4147]">
            Contoh Kehidupan Nyata (Pilih Situasi)
          </span>
          <span className="text-xs text-[#B8AAA0]">Refleksi Lapangan</span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {REFLECTIVE_EXAMPLES.map((ex, idx) => (
            <button
              key={ex.title}
              onClick={() => setSelectedExampleIndex(idx)}
              className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                selectedExampleIndex === idx
                  ? 'bg-white border-[#AFC4D5] text-[#3F4147] shadow-sm'
                  : 'bg-white/60 border-[#AFC4D5]/20 text-[#3F4147]/70 hover:bg-white'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>

        {/* Selected Scenario Dynamic Card */}
        <motion.div
          key={currentExample.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-6 shadow-sm space-y-4"
        >
          <div>
            <span className="text-[11px] font-semibold text-[#B8AAA0] uppercase tracking-wider">
              Konteks Keseharian
            </span>
            <h4 className="font-serif-display text-lg sm:text-xl text-[#3F4147] mt-0.5">
              {currentExample.situation}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-3.5 rounded-xl bg-[#F8F5F0] border border-[#AFC4D5]/30">
              <span className="text-[11px] font-bold text-[#AFC4D5] flex items-center gap-1 mb-1">
                <Check size={14} /> Catatan Malaikat Raqib (Amal Baik)
              </span>
              <p className="text-xs text-[#3F4147]/90 leading-relaxed">
                {currentExample.raqibNote}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F4] border border-[#D9B8B8]/30">
              <span className="text-[11px] font-bold text-[#D9B8B8] flex items-center gap-1 mb-1">
                <AlertTriangle size={14} /> Catatan Malaikat Atid (Amal Buruk)
              </span>
              <p className="text-xs text-[#3F4147]/90 leading-relaxed">
                {currentExample.atidNote}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Emotional Reflection Banner & Nara */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl border-2 border-[#D9B8B8]/40 bg-white p-6 shadow-sm">
        <div className="md:col-span-8 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D9B8B8]">
            Pesan Inti Keimanan
          </span>
          <h3 className="font-serif-display text-xl sm:text-2xl text-[#3F4147] leading-snug">
            “Kejujuran sejati tidak bergantung pada apakah manusia sedang melihat kita.”
          </h3>
          <p className="text-xs text-[#3F4147]/80 leading-relaxed">
            Kebaikan yang dilakukan di ruang sunyi memiliki kemuliaan tinggi di sisi Allah Swt. karena lahir dari ketulusan iman, bukan kepalsuan pujian manusia.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end">
          <NaraCharacter
            pose="reflecting"
            bubbleText="Kalau begitu, kita tetap harus berbuat baik meskipun tidak ada orang yang melihat!"
            size="sm"
            showNameTag={false}
          />
        </div>
      </div>
    </div>
  );
};
