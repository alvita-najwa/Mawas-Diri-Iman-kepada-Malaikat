import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Trophy,
  BookOpen,
  Music,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';

interface PembagianKelompokPageProps {
  onContinueToMateri: () => void;
  onGoToScoreboard: () => void;
  onGoToLagu: () => void;
  onGoToWordSearch: () => void;
  onBackToAgenda: () => void;
}

const GROUPS_DATA = [
  {
    id: 1,
    name: 'Kelompok 1',
    theme: 'Wahyu & Rezeki',
    colorName: 'Biru Langit',
    accentColor: '#0284C7',
    badgeClass: 'bg-sky-100 text-sky-900 border-sky-300',
    angels: [
      { name: 'Malaikat Jibril', duty: 'Menyampaikan wahyu Allah Swt.' },
      { name: 'Malaikat Mikail', duty: 'Membagikan rezeki & menurunkan hujan' }
    ]
  },
  {
    id: 2,
    name: 'Kelompok 2',
    theme: 'Ajal & Hari Akhir',
    colorName: 'Mawar Pastel',
    accentColor: '#E11D48',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300',
    angels: [
      { name: 'Malaikat Israfil', duty: 'Meniup sangkakala kiamat & kebangkitan' },
      { name: 'Malaikat Izrail', duty: 'Mencabut nyawa makhluk bernyawa' }
    ]
  },
  {
    id: 3,
    name: 'Kelompok 3',
    theme: 'Alam Kubur & Pertanggungjawaban',
    colorName: 'Teal Zamrud',
    accentColor: '#0D9488',
    badgeClass: 'bg-teal-100 text-teal-900 border-teal-300',
    angels: [
      { name: 'Malaikat Munkar', duty: 'Menanyai manusia di alam kubur' },
      { name: 'Malaikat Nakir', duty: 'Menanyai manusia di alam kubur' }
    ]
  },
  {
    id: 4,
    name: 'Kelompok 4',
    theme: 'Catatan Amal Perbuatan',
    colorName: 'Ungu Lavender',
    accentColor: '#7C3AED',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
    angels: [
      { name: 'Malaikat Raqib', duty: 'Mencatat seluruh amal kebaikan manusia' },
      { name: 'Malaikat Atid', duty: 'Mencatat seluruh amal keburukan manusia' }
    ]
  },
  {
    id: 5,
    name: 'Kelompok 5',
    theme: 'Penjaga Surga & Neraka',
    colorName: 'Emas Karamel',
    accentColor: '#D97706',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    angels: [
      { name: 'Malaikat Malik', duty: 'Menjaga pintu neraka dengan ketegasan' },
      { name: 'Malaikat Ridwan', duty: 'Menjaga pintu surga penuh keramahan' }
    ]
  }
];

export const PembagianKelompokPage: React.FC<PembagianKelompokPageProps> = ({
  onContinueToMateri,
  onGoToScoreboard,
  onGoToLagu,
  onGoToWordSearch,
  onBackToAgenda
}) => {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 md:py-12 max-w-6xl mx-auto">
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <EightPointStar size={16} color="#88AB8E" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#B8AAA0]">
              Langkah 1: Pembentukan Tim Diskusi
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#3F4147] tracking-tight">
            PEMBAGIAN KELOMPOK BELAJAR
          </h1>

          <p className="text-sm sm:text-base text-[#3F4147]/80 max-w-2xl mx-auto leading-relaxed">
            Kelas dibagi menjadi <strong>5 Kelompok</strong>. Setiap kelompok bertugas mendalami <strong>2 malaikat</strong>, menelusuri dalil dan tugasnya, serta berkolaborasi mengumpulkan poin di Papan Skor!
          </p>
        </div>

        {/* 5 Group Cards for Projector Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {GROUPS_DATA.map((group, index) => {
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-3xl border-2 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                style={{ borderColor: `${group.accentColor}50` }}
              >
                <div>
                  {/* Group Header Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-xl text-xs font-mono font-bold tracking-wider text-white shadow-2xs"
                      style={{ backgroundColor: group.accentColor }}
                    >
                      {group.name}
                    </span>
                    <span className="text-[11px] font-semibold text-[#B8AAA0]">
                      Tim #{group.id}
                    </span>
                  </div>

                  {/* Group Focus Theme */}
                  <h3 className="font-serif-display text-base font-bold text-[#3F4147] mb-3 leading-snug">
                    Fokus: {group.theme}
                  </h3>

                  {/* 2 Angels for this group */}
                  <div className="space-y-2.5">
                    {group.angels.map((angel, aIdx) => (
                      <div
                        key={aIdx}
                        className="p-3 rounded-2xl bg-[#F8F5F0]/80 border border-[#AFC4D5]/30 text-left space-y-1"
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#3F4147]">
                          <CheckCircle2 size={13} style={{ color: group.accentColor }} />
                          <span>{angel.name}</span>
                        </div>
                        <p className="text-[11px] text-[#3F4147]/75 leading-tight">
                          {angel.duty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-[#AFC4D5]/20 text-[11px] text-[#3F4147]/70 flex items-center justify-between">
                  <span>Mendalami 2 Malaikat</span>
                  <Sparkles size={13} style={{ color: group.accentColor }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Bar for Classroom Teacher & Students */}
        <div className="rounded-3xl border border-[#AFC4D5]/40 bg-white/90 p-5 sm:p-7 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <NaraCharacter
              pose="explaining"
              bubbleText="Setiap anggota kelompok saling berdiskusi ya! Guru dapat mencatat skor aktif di Papan Skor!"
              size="md"
              showNameTag={false}
            />
            <div className="hidden lg:block">
              <h4 className="font-serif-display text-base text-[#3F4147] font-bold">
                Semua Kelompok Sudah Siap?
              </h4>
              <p className="text-xs text-[#3F4147]/75 max-w-md mt-0.5">
                Buka Papan Skor untuk mencatat nilai kelompok, dengarkan lagunya bersama, atau langsung masuk ke materi belajar.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
            <button
              onClick={onBackToAgenda}
              className="px-4 py-2.5 rounded-xl border border-[#AFC4D5]/40 bg-white hover:bg-slate-50 text-xs font-semibold text-[#3F4147] transition-all"
            >
              <ArrowLeft size={14} className="inline mr-1.5" />
              <span>Agenda</span>
            </button>

            <button
              onClick={onGoToScoreboard}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs sm:text-sm font-bold text-[#92400E] shadow-2xs transition-all cursor-pointer"
            >
              <Trophy size={16} className="text-amber-500" />
              <span>Papan Skor Kelompok</span>
            </button>

            <button
              onClick={onGoToLagu}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs sm:text-sm font-bold text-indigo-900 shadow-2xs transition-all cursor-pointer"
            >
              <Music size={16} className="text-indigo-600" />
              <span>Lagu 10 Malaikat</span>
            </button>

            <button
              onClick={onContinueToMateri}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 group cursor-pointer"
            >
              <span>Eksplorasi Materi</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
