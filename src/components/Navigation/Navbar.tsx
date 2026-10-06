import React, { useState } from 'react';
import { Menu, X, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { MENU_MODULES, APP_METADATA } from '../../data/learningContent';
import { EightPointStar } from '../Decorations/IslamicGeometry';

interface NavbarProps {
  currentPage: number;
  totalPages: number;
  progressPercentage: number;
  visitedPages: number[];
  goToPage: (page: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  totalPages,
  progressPercentage,
  visitedPages,
  goToPage
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Determine current section title
  const getSectionTitle = () => {
    switch (currentPage) {
      case 1:
        return '01 / PENDAHULUAN';
      case 2:
        return '02 / PEMANTIK';
      case 3:
        return '03 / MENU UTAMA';
      case 4:
        return '04 / PENGERTIAN IMAN';
      case 5:
        return '05 / RUKUN IMAN';
      case 6:
        return '06 / DALIL AL-QUR\'AN';
      case 7:
        return '07 / SIFAT MALAIKAT';
      case 8:
        return '08 / MALAIKAT VS MANUSIA';
      case 9:
        return '09 / NAMA & TUGAS';
      case 10:
        return '10 / RAQIB & ATID';
      case 11:
        return '11 / HIKMAH BERIMAN';
      case 12:
        return '12 / MAWAS DIRI';
      case 13:
        return '13 / HARMONI DIRI';
      case 14:
        return '14 / KEHIDUPAN SEHARI-HARI';
      case 15:
        return '15 / REFLEKSI PRIBADI';
      case 16:
        return '16 / KESIMPULAN';
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
              onClick={() => goToPage(3)}
              className="flex items-center gap-2 text-left group"
              title="Ke Menu Utama"
            >
              <EightPointStar size={18} color="#D9B8B8" className="transition-transform group-hover:rotate-45" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#3F4147] uppercase truncate max-w-[180px] sm:max-w-xs">
                {getSectionTitle()}
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation links / Quick access */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#3F4147]/80">
            <button
              onClick={() => goToPage(1)}
              className="hover:text-[#3F4147] transition-colors"
            >
              Halaman Awal
            </button>
            <span className="text-[#B8AAA0]">•</span>
            <button
              onClick={() => goToPage(3)}
              className="hover:text-[#3F4147] transition-colors font-semibold text-[#3F4147]"
            >
              Menu Materi
            </button>
            <span className="text-[#B8AAA0]">•</span>
            <button
              onClick={() => goToPage(15)}
              className="hover:text-[#3F4147] transition-colors"
            >
              Ruang Refleksi
            </button>
          </nav>

          {/* Zone 3: Progress & Menu Drawer Toggle */}
          <div className="flex items-center gap-3">
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

            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#AFC4D5]/40 bg-white/80 px-2.5 py-1.5 text-xs font-medium text-[#3F4147] hover:bg-white transition-colors"
              aria-label="Buka Daftar Topik Pembelajaran"
            >
              <Menu size={16} />
              <span className="hidden sm:inline">Daftar Materi</span>
            </button>
          </div>
        </div>

        {/* Global Thin Progress Bar on Very Top */}
        <div className="h-[2px] w-full bg-[#AFC4D5]/15">
          <div
            className="h-full bg-[#D9B8B8] transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, (currentPage / totalPages) * 100))}%` }}
          />
        </div>
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#3F4147]/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm h-full bg-[#F8F5F0] shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#AFC4D5]/30">
              <div className="flex items-center gap-2">
                <Compass size={20} className="text-[#AFC4D5]" />
                <h3 className="font-serif-display text-lg text-[#3F4147]">Peta Pembelajaran</h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-lg text-[#3F4147]/70 hover:bg-[#AFC4D5]/20"
                aria-label="Tutup Menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 border-b border-[#AFC4D5]/20">
              <p className="text-xs text-[#3F4147]/70 leading-relaxed">
                {APP_METADATA.subject} · {APP_METADATA.grade}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[#3F4147]">
                <span>Capaian Belajar</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-[#AFC4D5]/20 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-[#AFC4D5] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Quick Access List */}
            <div className="mt-4 flex-1 space-y-1.5">
              <button
                onClick={() => {
                  goToPage(1);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  currentPage === 1 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>01. Halaman Awal</span>
                {visitedPages.includes(1) && <CheckCircle2 size={14} className="text-[#AFC4D5]" />}
              </button>

              <button
                onClick={() => {
                  goToPage(2);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  currentPage === 2 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>02. Pemantik (Seandainya...)</span>
                {visitedPages.includes(2) && <CheckCircle2 size={14} className="text-[#AFC4D5]" />}
              </button>

              <button
                onClick={() => {
                  goToPage(3);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  currentPage === 3 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>03. Menu Materi Pembelajaran</span>
                {visitedPages.includes(3) && <CheckCircle2 size={14} className="text-[#AFC4D5]" />}
              </button>

              <div className="pt-2 pb-1 text-[11px] font-semibold text-[#B8AAA0] uppercase tracking-wider">
                Topik Inti
              </div>

              {MENU_MODULES.map((mod) => {
                const isVisited = visitedPages.includes(mod.pageNumber);
                const isCurrent = currentPage === mod.pageNumber;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      goToPage(mod.pageNumber);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                      isCurrent
                        ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]'
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
                  goToPage(16);
                  setDrawerOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  currentPage === 16 ? 'bg-white shadow-sm text-[#3F4147] border border-[#AFC4D5]/40' : 'hover:bg-white/60 text-[#3F4147]/80'
                }`}
              >
                <span>16. Kesimpulan & Penutup</span>
                {visitedPages.includes(16) && <CheckCircle2 size={14} className="text-[#AFC4D5]" />}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-[#AFC4D5]/20 text-[11px] text-[#3F4147]/60 text-center">
              Penyusun: {APP_METADATA.compiler}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
