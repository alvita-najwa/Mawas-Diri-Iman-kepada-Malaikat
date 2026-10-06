import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AngelData } from '../../types';
import { EightPointStar } from '../Decorations/IslamicGeometry';
import { Sparkles, RotateCw, Heart } from 'lucide-react';

interface AngelFlipCardProps {
  angel: AngelData;
}

export const AngelFlipCard: React.FC<AngelFlipCardProps> = ({ angel }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Abstract celestial symbols for angels
  const renderCelestialSymbol = (id: string) => {
    switch (id) {
      case 'jibril':
        // Light ray / kalam / scroll geometry
        return (
          <svg className="w-12 h-12 text-[#AFC4D5]" viewBox="0 0 100 100" fill="none">
            <path d="M 50 15 L 75 50 L 50 85 L 25 50 Z" stroke="currentColor" strokeWidth="3" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="10" fill="#AFC4D5" opacity="0.3" />
          </svg>
        );
      case 'mikail':
        // Drops / nourishment celestial circle
        return (
          <svg className="w-12 h-12 text-[#D9B8B8]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2.5" />
            <path d="M 50 25 C 40 40 40 55 50 65 C 60 55 60 40 50 25 Z" fill="currentColor" opacity="0.4" />
          </svg>
        );
      case 'israfil':
        // Sangkakala geometric trumpet/spiral silhouette
        return (
          <svg className="w-12 h-12 text-[#C8BDD8]" viewBox="0 0 100 100" fill="none">
            <path d="M 25 55 L 75 25 L 75 75 Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
            <ellipse cx="75" cy="50" rx="8" ry="25" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case 'izrail':
        // Hourglass / balance / boundary gate
        return (
          <svg className="w-12 h-12 text-[#B8AAA0]" viewBox="0 0 100 100" fill="none">
            <polygon points="30,20 70,20 30,80 70,80" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        );
      case 'munkar':
      case 'nakir':
        // Portal / questions gate
        return (
          <svg className="w-12 h-12 text-[#AFC4D5]" viewBox="0 0 100 100" fill="none">
            <rect x="25" y="25" width="50" height="50" rx="10" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        );
      case 'raqib':
        // Luminous scroll / right scale of goodness
        return (
          <svg className="w-12 h-12 text-[#AFC4D5]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="2" />
            <path d="M 38 50 L 46 58 L 64 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'atid':
        // Careful shield of accountability
        return (
          <svg className="w-12 h-12 text-[#D9B8B8]" viewBox="0 0 100 100" fill="none">
            <path d="M 50 20 L 75 32 V 55 C 75 70 50 82 50 82 C 50 82 25 70 25 55 V 32 Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
          </svg>
        );
      case 'malik':
        // Fortress boundary / firm threshold
        return (
          <svg className="w-12 h-12 text-[#B8AAA0]" viewBox="0 0 100 100" fill="none">
            <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="2.5" />
            <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="1.5" />
            <line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'ridwan':
      default:
        // Radiant paradise garden gate
        return (
          <svg className="w-12 h-12 text-[#C8BDD8]" viewBox="0 0 100 100" fill="none">
            <path d="M 30 80 V 45 C 30 30 70 30 70 45 V 80" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="50" cy="35" r="4" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <div
      className="group relative h-[310px] w-full cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      aria-label={`Kartu Malaikat ${angel.name}. Klik untuk membalik.`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative h-full w-full rounded-2xl [transform-style:preserve-3d] shadow-sm hover:shadow-md transition-shadow"
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-[#AFC4D5]/35 bg-white p-5 [backface-visibility:hidden]">
          {/* Top category label & flip prompt */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-[#B8AAA0] uppercase">
              {angel.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#AFC4D5] group-hover:text-[#3F4147] transition-colors">
              <RotateCw size={12} />
              <span className="text-[10px]">Balik</span>
            </div>
          </div>

          {/* Center Graphic & Names */}
          <div className="flex flex-col items-center text-center my-auto">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F5F0] border border-[#AFC4D5]/25">
              {renderCelestialSymbol(angel.id)}
            </div>

            <div className="font-arabic-text text-xl text-[#3F4147] mb-1 font-bold">
              {angel.arabicName}
            </div>

            <h3 className="font-serif-display text-xl text-[#3F4147] tracking-tight">
              Malaikat {angel.name}
            </h3>

            <div className="mt-2 w-8 h-[1px] bg-[#AFC4D5]" />

            <p className="mt-2.5 text-xs text-[#3F4147]/85 font-medium line-clamp-3 leading-relaxed">
              {angel.duty}
            </p>
          </div>

          {/* Bottom subtle note */}
          <div className="text-center pt-2 border-t border-[#AFC4D5]/15 text-[10px] text-[#B8AAA0]">
            Klik kartu untuk melihat hikmah
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-[#D9B8B8]/40 bg-[#FAF7F4] p-5 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex items-center justify-between border-b border-[#D9B8B8]/20 pb-2">
            <div className="flex items-center gap-1.5">
              <EightPointStar size={14} color="#D9B8B8" />
              <span className="text-xs font-serif-display font-semibold text-[#3F4147]">
                Hikmah Malaikat {angel.name}
              </span>
            </div>
            <span className="text-[10px] text-[#B8AAA0]">Tutup</span>
          </div>

          <div className="flex-1 my-2 flex flex-col justify-center space-y-3 overflow-y-auto pr-1">
            <div>
              <span className="text-[10px] font-semibold text-[#B8AAA0] uppercase tracking-wider block mb-0.5">
                Keterangan
              </span>
              <p className="text-xs text-[#3F4147]/90 leading-relaxed">
                {angel.description}
              </p>
            </div>

            <div className="bg-white/80 p-2.5 rounded-xl border border-[#AFC4D5]/25">
              <span className="text-[10px] font-semibold text-[#AFC4D5] uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                <Heart size={10} className="text-[#D9B8B8]" /> Refleksi Diri
              </span>
              <p className="text-xs text-[#3F4147] italic leading-relaxed">
                “{angel.reflection}”
              </p>
            </div>
          </div>

          <div className="text-center text-[10px] text-[#3F4147]/60 pt-2 border-t border-[#D9B8B8]/20">
            Pendidikan Agama Islam & Budi Pekerti
          </div>
        </div>
      </motion.div>
    </div>
  );
};
