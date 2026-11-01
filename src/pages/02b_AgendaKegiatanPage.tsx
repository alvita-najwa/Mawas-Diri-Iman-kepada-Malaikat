import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Music,
  BookOpen,
  Award,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Search,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';

interface AgendaKegiatanPageProps {
  onAyoBerkelompok: () => void;
  onBackToPemantik?: () => void;
}

const ACTIVITIES = [
  {
    step: 1,
    title: 'Berkelompok',
    desc: 'Membentuk tiga kelompok, masing-masing mendalami tugas sepuluh malaikat.',
    icon: Users,
    colorName: 'Biru Lembut',
    accentColor: '#0284C7',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    cardBg: 'from-sky-50/80 to-white'
  },
  {
    step: 2,
    title: 'Menyimak dan Bermain',
    desc: 'Menyimak lagu sepuluh malaikat dan menemukan nama-namanya dalam permainan kata tersembunyi.',
    icon: Music,
    colorName: 'Kuning Amber',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    cardBg: 'from-amber-50/80 to-white'
  },
  {
    step: 3,
    title: 'Mencari dan Berdiskusi',
    desc: 'Menelusuri materi web dan bahan ajar untuk menemukan tugas malaikat serta hubungannya dengan kehidupan sehari-hari, lalu mengerjakan LKPD.',
    icon: BookOpen,
    colorName: 'Lavender Ungu',
    accentColor: '#7C3AED',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    cardBg: 'from-purple-50/80 to-white'
  },
  {
    step: 4,
    title: 'Berbagi dan Menguji Temuan',
    desc: 'Menyampaikan hasil diskusi dan menjawab tantangan benar–salah beserta alasannya.',
    icon: Award,
    colorName: 'Hijau Zamrud',
    accentColor: '#059669',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    cardBg: 'from-emerald-50/80 to-white'
  },
  {
    step: 5,
    title: 'Menyimpulkan dan Berefleksi',
    desc: 'Menyimpulkan pelajaran dan menentukan sikap baik yang akan diterapkan.',
    icon: HeartHandshake,
    colorName: 'Mawar Elegan',
    accentColor: '#E11D48',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    cardBg: 'from-rose-50/80 to-white'
  }
];

export const AgendaKegiatanPage: React.FC<AgendaKegiatanPageProps> = ({
  onAyoBerkelompok,
  onBackToPemantik
}) => {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 md:py-12 max-w-6xl mx-auto">
      <div className="w-full space-y-8">
        {/* Top Header & Opening Callout */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <EightPointStar size={16} color="#AFC4D5" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#B8AAA0]">
              Rangkaian Pembelajaran Aktif Kelas VII
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#3F4147] tracking-tight leading-tight">
            HARI INI KITA AKAN MELAKUKAN APA?
          </h1>

          {/* Kalimat Pembuka Khusus Sesuai Arahan */}
          <div className="rounded-2xl border-2 border-[#88AB8E]/50 bg-gradient-to-r from-emerald-50/90 via-white to-amber-50/80 p-4 sm:p-5 shadow-sm">
            <p className="font-serif-display text-base sm:text-xl md:text-2xl text-[#3F4147] font-semibold leading-snug">
              “Untuk menjawab pertanyaan tadi, ayo mencari tahu bersama melalui kegiatan berikut!”
            </p>
          </div>
        </div>

        {/* 5 Activities Grid (Optimized for classroom projector) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {ACTIVITIES.map((act, index) => {
            const IconComponent = act.icon;
            return (
              <motion.div
                key={act.step}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className={`rounded-2xl border border-[#AFC4D5]/35 bg-gradient-to-b ${act.cardBg} p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group`}
              >
                <div>
                  {/* Step Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3F4147] text-white text-base font-mono font-bold shadow-xs">
                      {act.step}
                    </span>
                    <div
                      className="p-2 rounded-xl bg-white border border-[#AFC4D5]/25 shadow-2xs group-hover:scale-110 transition-transform"
                      style={{ color: act.accentColor }}
                    >
                      <IconComponent size={22} />
                    </div>
                  </div>

                  {/* Title in large text for projector */}
                  <h2 className="font-serif-display text-lg sm:text-xl text-[#3F4147] font-bold leading-snug mb-2">
                    {act.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#3F4147]/85 leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-4 pt-3 border-t border-[#AFC4D5]/20 flex items-center justify-between text-[11px] font-semibold text-[#B8AAA0]">
                  <span>Langkah {act.step}</span>
                  <CheckCircle2 size={13} className="text-[#88AB8E]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Companion Encouragement & Call to Action */}
        <div className="rounded-3xl border border-[#AFC4D5]/35 bg-white/80 p-5 sm:p-7 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <NaraCharacter
              pose="happy"
              bubbleText="Setiap kegiatan dirancang seru agar kita saling bekerjasama dan saling melengkapi!"
              size="md"
              showNameTag={false}
            />
            <div className="hidden md:block">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8AAA0] block">
                Petunjuk Guru & Siswa
              </span>
              <p className="text-sm text-[#3F4147]/80 max-w-md mt-0.5">
                Klik tombol untuk acak kelompok.
              </p>
            </div>
          </div>

          {/* Action Buttons: "Ayo Berkelompok!" */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-col sm:flex-row">
            {onBackToPemantik && (
              <button
                onClick={onBackToPemantik}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-[#AFC4D5]/40 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-[#3F4147] transition-all shadow-2xs w-full sm:w-auto"
              >
                <ArrowLeft size={16} />
                <span>Pertanyaan Pemantik</span>
              </button>
            )}

            <button
              onClick={onAyoBerkelompok}
              className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 group w-full sm:w-auto cursor-pointer"
            >
              <Users size={20} className="text-amber-400" />
              <span>Ayo Berkelompok!</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
