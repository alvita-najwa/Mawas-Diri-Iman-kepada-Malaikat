import React from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

interface BottomNavProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  nextLabel?: string;
  prevLabel?: string;
  hideHome?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
  nextLabel = 'NEXT',
  prevLabel = 'BACK',
  hideHome = false
}) => {
  return (
    <footer className="sticky bottom-0 z-30 w-full border-t border-[#AFC4D5]/20 bg-[#F8F5F0]/95 backdrop-blur-md py-3 px-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
        {/* BACK button */}
        {currentPage > 1 ? (
          <button
            onClick={prevPage}
            className="flex min-h-[44px] items-center gap-2 rounded-xl border border-[#AFC4D5]/40 bg-white px-4 py-2 text-xs font-semibold text-[#3F4147] shadow-sm transition-all hover:bg-[#AFC4D5]/15 hover:border-[#AFC4D5] active:scale-95"
            aria-label="Kembali ke halaman sebelumnya"
          >
            <ArrowLeft size={16} />
            <span className="tracking-wider">{prevLabel}</span>
          </button>
        ) : (
          <div className="w-[88px]" />
        )}

        {/* Center: HOME & Current Page Indicator */}
        <div className="flex items-center gap-3">
          {!hideHome && (
            <button
              onClick={() => goToPage(5)}
              className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[#AFC4D5]/30 bg-white/70 px-3 py-2 text-xs font-semibold text-[#3F4147] transition-all hover:bg-white active:scale-95"
              title="Kembali ke Menu Utama"
              aria-label="Kembali ke Menu Utama"
            >
              <Home size={15} />
              <span className="hidden sm:inline tracking-wider">HOME</span>
            </button>
          )}

          <div className="flex items-center gap-1 px-2 text-xs font-mono font-medium text-[#3F4147]/80">
            <span className="text-[#3F4147] font-semibold">
              {currentPage < 10 ? `0${currentPage}` : currentPage}
            </span>
            <span className="text-[#B8AAA0]">/</span>
            <span>{totalPages < 10 ? `0${totalPages}` : totalPages}</span>
          </div>
        </div>

        {/* NEXT button */}
        {currentPage < totalPages ? (
          <button
            onClick={nextPage}
            className="flex min-h-[44px] items-center gap-2 rounded-xl bg-[#3F4147] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#2B2D31] active:scale-95"
            aria-label="Lanjut ke halaman berikutnya"
          >
            <span className="tracking-wider">{nextLabel}</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => goToPage(1)}
            className="flex min-h-[44px] items-center gap-2 rounded-xl bg-[#3F4147] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#2B2D31] active:scale-95"
          >
            <span className="tracking-wider">MULAI LAGI</span>
          </button>
        )}
      </div>
    </footer>
  );
};
