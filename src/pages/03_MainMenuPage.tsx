import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  CircleDot,
  BookOpen,
  ShieldCheck,
  Columns,
  Layers,
  Compass,
  Eye,
  Search,
  MapPin,
  HeartHandshake,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { MENU_MODULES, APP_METADATA } from '../data/learningContent';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';

interface MainMenuPageProps {
  onSelectPage: (page: number) => void;
  visitedPages: number[];
  progressPercentage: number;
}

export const MainMenuPage: React.FC<MainMenuPageProps> = ({
  onSelectPage,
  visitedPages,
  progressPercentage
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles size={20} className="text-[#AFC4D5]" />;
      case 'CircleDot':
        return <CircleDot size={20} className="text-[#D9B8B8]" />;
      case 'BookOpen':
        return <BookOpen size={20} className="text-[#C8BDD8]" />;
      case 'ShieldCheck':
        return <ShieldCheck size={20} className="text-[#AFC4D5]" />;
      case 'Columns':
        return <Columns size={20} className="text-[#B8AAA0]" />;
      case 'Layers':
        return <Layers size={20} className="text-[#D9B8B8]" />;
      case 'Compass':
        return <Compass size={20} className="text-[#C8BDD8]" />;
      case 'Eye':
        return <Eye size={20} className="text-[#AFC4D5]" />;
      case 'Search':
        return <Search size={20} className="text-[#B8AAA0]" />;
      case 'MapPin':
        return <MapPin size={20} className="text-[#D9B8B8]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake size={20} className="text-[#C8BDD8]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Header section with Nara greeting */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-[#AFC4D5]/25 pb-8">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <EightPointStar size={16} color="#AFC4D5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
              Peta Pembelajaran Interaktif
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
            MARI BELAJAR
          </h1>

          <div className="pt-2 flex items-center gap-3">
            <div className="text-xs font-semibold text-[#3F4147]">
              Progres Belajar: <span className="font-mono">{progressPercentage}%</span>
            </div>
            <div className="w-36 h-2 bg-[#AFC4D5]/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#AFC4D5] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end">
          <NaraCharacter
            pose="explaining"
            bubbleText="Pilih perjalananmu! Setiap langkah akan membuka pemahaman baru."
            size="sm"
            showNameTag={false}
          />
        </div>
      </div>

      {/* Grid of 11 Learning Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MENU_MODULES.map((mod, index) => {
          const isVisited = visitedPages.includes(mod.pageNumber);
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPage(mod.pageNumber)}
              className="group relative cursor-pointer rounded-2xl border border-[#AFC4D5]/35 bg-white p-5 shadow-sm transition-all hover:border-[#AFC4D5] hover:shadow-md flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPage(mod.pageNumber);
                }
              }}
            >
              <div>
                {/* Header row with card index & status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#B8AAA0]">
                      {mod.id < 10 ? `0${mod.id}` : mod.id}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#3F4147]/60">
                      {mod.category}
                    </span>
                  </div>

                  {isVisited ? (
                    <div className="flex items-center gap-1 text-[11px] text-[#AFC4D5] font-medium">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px]">Telah dibuka</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[#B8AAA0]">Belum</span>
                  )}
                </div>

                {/* Card Title & Icon */}
                <div className="flex items-start gap-3 my-2">
                  <div className="p-2.5 rounded-xl bg-[#F8F5F0] border border-[#AFC4D5]/20 group-hover:bg-[#AFC4D5]/15 transition-colors shrink-0">
                    {getIcon(mod.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-lg text-[#3F4147] group-hover:text-[#2B2D31] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#3F4147]/75 line-clamp-2 leading-relaxed">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom interactive action */}
              <div className="pt-3 mt-3 border-t border-[#AFC4D5]/15 flex items-center justify-between text-xs font-semibold text-[#3F4147] group-hover:text-[#AFC4D5] transition-colors">
                <span className="text-[11px]">Buka Topik</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
