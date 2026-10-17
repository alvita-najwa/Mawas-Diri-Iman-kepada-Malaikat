import React, { useState } from 'react';
import { Menu, X, BookOpen, Compass, CheckCircle2, HelpCircle, Search, Home, Music, Trophy } from 'lucide-react';
import { MENU_MODULES, APP_METADATA } from '../../data/learningContent';
import { EightPointStar } from '../Decorations/IslamicGeometry';

export type AppTab = 'beranda' | 'materi' | 'video-lagu' | 'kuis' | 'cari-kata' | 'papan-skor';

interface NavbarProps {
  currentPage: number;
  totalPages: number;
  progressPercentage: number;
  visitedPages: number[];
  goToPage: (page: number) => void;
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  totalPages,
  progressPercentage,
  visitedPages,
  goToPage,
  activeTab,
  onSelectTab
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Determine current section title
  const getSectionTitle = () => {
    if (activeTab === 'papan-skor') {
      return 'PAPAN SKOR KELOMPOK';
    }
    if (activeTab === 'video-lagu') {
      return 'MARI MENGHAFAL 10 MALAIKAT';
    }
    if (activeTab === 'kuis') {
      return 'KUIS INTERAKTIF';
    }
    if (activeTab === 'cari-kata') {
      return 'GAME CARI KATA';
    }
    if (activeTab === 'beranda') {
      return 'BERANDA UTAMA';
    }

    switch (currentPage) {
      case 1:
        return '01 / PENDAHULUAN';
      case 2:
        return '02 / PEMANTIK';
      case 3:
        return '03 / HARI INI KITA AKAN MELAKUKAN APA?';
      case 4:
        return '04 / PEMBAGIAN KELOMPOK';
      case 5:
        return '05 / MENU MATERI';
      case 6:
        return '06 / PENGERTIAN IMAN';
      case 7:
        return '07 / RUKUN IMAN';
      case 8:
        return '08 / DALIL AL-QUR\'AN';
      case 9:
        return '09 / SIFAT MALAIKAT';
      case 10:
        return '10 / MALAIKAT VS MANUSIA';
      case 11:
        return '11 / NAMA & TUGAS';
      case 12:
        return '12 / RAQIB & ATID';
      case 13:
        return '13 / HIKMAH BERIMAN';
      case 14:
        return '14 / MAWAS DIRI';
      case 15:
        return '15 / HARMONI DIRI';
      case 16:
        return '16 / KEHIDUPAN SEHARI-HARI';
      case 17:
        return '17 / REFLEKSI PRIBADI';
      case 18:
        return '18 / KESIMPULAN';
      default:
        return 'BELAJAR';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#AFC4D5]/20 bg-[#F8F5F0]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Zone 1: Current Section Indicator */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (activeTab !== 'materi') {
                  onSelectTab('beranda');
                } else {
                  goToPage(5);
                }
              }}
              className="flex items-center gap-2 text-left group"
              title="Navigasi Cepat"
            >
              <EightPointStar size={18} color="#D9B8B8" className="transition-transform group-hover:rotate-45" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#3F4147] uppercase truncate max-w-[170px] sm:max-w-xs">
                {getSectionTitle()}
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation links / Quick access */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#3F4147]/80">
            <button
              onClick={() => onSelectTab('beranda')}
              className={`transition-colors flex items-center gap-1.5 ${
                activeTab === 'beranda' ? 'text-[#3F4147] font-bold border-b-2 border-[#3F4147] pb-0.5' : 'hover:text-[#3F4147]'
              }`}
            >
              <Home size={13} />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('materi');
                if (currentPage === 1) goToPage(3);
              }}
              className={`transition-colors flex items-center gap-1.5 ${
                activeTab === 'materi' ? 'text-[#3F4147] font-bold border-b-2 border-[#3F4147] pb-0.5' : 'hover:text-[#3F4147]'
              }`}
            >
              <BookOpen size={13} />
              <span>Materi</span>
            </button>

            <button
              onClick={() => onSelectTab('video-lagu')}
              className={`transition-colors flex items-center gap-1.5 ${
                activeTab === 'video-lagu' ? 'text-[#3F4147] font-bold border-b-2 border-[#3F4147] pb-0.5' : 'hover:text-[#3F4147]'
              }`}
            >
              <Music size={13} />
              <span>Lagu 10 Malaikat</span>
            </button>

            <button
              onClick={() => onSelectTab('kuis')}
              className={`transition-colors flex items-center gap-1.5 ${
                activeTab === 'kuis' ? 'text-[#3F4147] font-bold border-b-2 border-[#3F4147] pb-0.5' : 'hover:text-[#3F4147]'
              }`}
            >
              <HelpCircle size={13} />
              <span>Kuis</span>
            </button>

            <button
              onClick={() => onSelectTab('cari-kata')}
              className={`transition-colors flex items-center gap-1.5 ${
                activeTab === 'cari-kata' ? 'text-[#3F4147] font-bold border-b-2 border-[#3F4147] pb-0.5' : 'hover:text-[#3F4147]'
              }`}
            >
              <Search size={13} />
              <span>Cari Kata</span>
            </button>

            <button
              onClick={() => onSelectTab('papan-skor')}
              className={`transition-colors flex items-center gap-1.5 ${
                activeTab === 'papan-skor' ? 'text-[#3F4147] font-bold border-b-2 border-[#3F4147] pb-0.5' : 'hover:text-[#3F4147]'
              }`}
            >
              <Trophy size={13} className="text-[#F59E0B]" />
              <span>Papan Skor</span>
            </button>
          </nav>

          {/* Zone 3: Progress & Menu Drawer Toggle */}
          <div className="flex items-center gap-3">
            {activeTab === 'materi' && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#3F4147]/60">
                  PROGRESS {progressPercentage}%
                </span>
                <div className="w-24 h-1.5 bg-[#AFC4D5]/25 rounded-full overflow-hidden mt-0.5">
                  <div
                    className="h-full bg-[#AFC4D5] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#AFC4D5]/40 bg-white/80 px-2.5 py-1.5 text-xs font-medium text-[#3F4147] hover:bg-white transition-colors"
              aria-label="Buka Menu Pembelajaran"
            >
              <Menu size={16} />
              <span className="hidden sm:inline">Menu Utama</span>
            </button>
          </div>
        </div>

        {/* Global Thin Progress Bar on Very Top when in materi mode */}
        {activeTab === 'materi' && (
          <div className="h-[2px] w-full bg-[#AFC4D5]/15">
            <div
              className="h-full bg-[#D9B8B8] transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, (currentPage / totalPages) * 100))}%` }}
            />
          </div>
        )}
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#3F4147]/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm h-full bg-[#F8F5F0] shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#AFC4D5]/30">
              <div className="flex items-center gap-2">
                <Compass size={20} className="text-[#AFC4D5]" />
                <h3 className="font-serif-display text-lg text-[#3F4147]">Pusat Belajar</h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-lg text-[#3F4147]/70 hover:bg-[#AFC4D5]/20"
                aria-label="Tutup Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Section Navigation Portals */}
            <div className="py-4 border-b border-[#AFC4D5]/20 space-y-2">
              <span className="text-[11px] font-semibold text-[#B8AAA0] uppercase tracking-wider block">
                Navigasi Utama
              </span>

              <button
                onClick={() => {
                  onSelectTab('beranda');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  activeTab === 'beranda' ? 'bg-[#3F4147] text-white shadow-sm' : 'bg-white/80 text-[#3F4147] hover:bg-white'
                }`}
              >
                <Home size={15} />
                <span>Beranda Utama</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('materi');
                  goToPage(5);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  activeTab === 'materi' ? 'bg-[#3F4147] text-white shadow-sm' : 'bg-white/80 text-[#3F4147] hover:bg-white'
                }`}
              >
                <BookOpen size={15} />
                <span>Modul Materi Pembelajaran</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('video-lagu');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  activeTab === 'video-lagu' ? 'bg-[#3F4147] text-white shadow-sm' : 'bg-white/80 text-[#3F4147] hover:bg-white'
                }`}
              >
                <Music size={15} />
                <span>Video & Lagu 10 Malaikat</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('kuis');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  activeTab === 'kuis' ? 'bg-[#3F4147] text-white shadow-sm' : 'bg-white/80 text-[#3F4147] hover:bg-white'
                }`}
              >
                <HelpCircle size={15} />
                <span>Kuis Pilihan Ganda Interaktif</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('cari-kata');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  activeTab === 'cari-kata' ? 'bg-[#3F4147] text-white shadow-sm' : 'bg-white/80 text-[#3F4147] hover:bg-white'
                }`}
              >
                <Search size={15} />
                <span>Game Cari Kata (10 Malaikat)</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('papan-skor');
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs font-semibold transition-colors ${
                  activeTab === 'papan-skor' ? 'bg-[#3F4147] text-white shadow-sm' : 'bg-white/80 text-[#3F4147] hover:bg-white'
                }`}
              >
                <Trophy size={15} className="text-[#F59E0B]" />
                <span>Papan Skor Kelompok</span>
              </button>
            </div>

            {/* Quick Access List for Materi */}
            <div className="mt-4 flex-1 space-y-1.5">
              <span className="text-[11px] font-semibold text-[#B8AAA0] uppercase tracking-wider block mb-1">
                Alur Kegiatan & Bab Materi
              </span>

              <button
                onClick={() => {
                  onSelectTab('materi');
                  goToPage(2);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  activeTab === 'materi' && currentPage === 2 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40 font-bold' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>02 / Pertanyaan Pemantik</span>
                {visitedPages.includes(2) && <CheckCircle2 size={14} className="text-[#88AB8E]" />}
              </button>

              <button
                onClick={() => {
                  onSelectTab('materi');
                  goToPage(3);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  activeTab === 'materi' && currentPage === 3 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40 font-bold' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>03 / Hari Ini Kita Akan Melakukan Apa?</span>
                {visitedPages.includes(3) && <CheckCircle2 size={14} className="text-[#88AB8E]" />}
              </button>

              <button
                onClick={() => {
                  onSelectTab('materi');
                  goToPage(4);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  activeTab === 'materi' && currentPage === 4 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40 font-bold' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>04 / Pembagian Kelompok</span>
                {visitedPages.includes(4) && <CheckCircle2 size={14} className="text-[#88AB8E]" />}
              </button>

              <button
                onClick={() => {
                  onSelectTab('materi');
                  goToPage(5);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  activeTab === 'materi' && currentPage === 5 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40 font-bold' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>05 / Menu Topik Materi</span>
                {visitedPages.includes(5) && <CheckCircle2 size={14} className="text-[#88AB8E]" />}
              </button>

              {MENU_MODULES.map((mod) => {
                const isVisited = visitedPages.includes(mod.pageNumber);
                const isCurrent = activeTab === 'materi' && currentPage === mod.pageNumber;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      onSelectTab('materi');
                      goToPage(mod.pageNumber);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                      isCurrent
                        ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5] font-semibold'
                        : 'hover:bg-white/60 text-[#3F4147]/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-mono text-[#B8AAA0]">
                        {mod.pageNumber < 10 ? `0${mod.pageNumber}` : mod.pageNumber}
                      </span>
                      <span className="truncate">{mod.title}</span>
                    </div>
                    {isVisited && <CheckCircle2 size={14} className="text-[#AFC4D5] shrink-0" />}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  onSelectTab('materi');
                  goToPage(16);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  activeTab === 'materi' && currentPage === 16 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>16. Kesimpulan & Penutup</span>
                {visitedPages.includes(16) && <CheckCircle2 size={14} className="text-[#AFC4D5]" />}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-[#AFC4D5]/20 text-[11px] text-[#3F4147]/60 text-center">
              {APP_METADATA.subject} · {APP_METADATA.grade}
              <br />
              Penyusun: {APP_METADATA.compiler}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
