import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ANGELS } from '../data/angels';
import { AngelFlipCard } from '../components/FlipCard/AngelFlipCard';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Filter } from 'lucide-react';

export const AngelTasksPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua 10 Malaikat' },
    { id: 'Wahyu & Petunjuk', label: 'Wahyu & Petunjuk' },
    { id: 'Rezeki & Kesejahteraan', label: 'Rezeki' },
    { id: 'Catatan Amal', label: 'Catatan Amal' },
    { id: 'Hari Akhir', label: 'Hari Akhir & Barzakh' },
    { id: 'Penjaga Akhirat', label: 'Penjaga Surga & Neraka' }
  ];

  const filteredAngels = ANGELS.filter((angel) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'Hari Akhir') {
      return (
        angel.category === 'Hari Akhir' ||
        angel.category === 'Ajal & Ketetapan' ||
        angel.category === 'Alam Barzakh'
      );
    }
    return angel.category === filterCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Header with Title and Nara */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <EightPointStar size={16} color="#AFC4D5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
              Tugas & Amanah Ilahi
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
            10 NAMA & TUGAS MALAIKAT
          </h1>
          <p className="text-xs sm:text-sm text-[#3F4147]/80 leading-relaxed max-w-xl">
            Klik pada masing-masing kartu untuk membalik dan membaca penjelasan tugas serta hikmah perenungan perilakunya.
          </p>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end">
          <NaraCharacter
            pose="pointing"
            bubbleText="Klik kartu malaikat untuk melihat tugas dan hikmahnya ya!"
            size="sm"
            showNameTag={false}
          />
        </div>
      </div>

      {/* Filter Tabs (Functional segmented controls allowed) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 bg-[#AFC4D5]/15 rounded-xl border border-[#AFC4D5]/30">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                filterCategory === cat.id
                  ? 'bg-white text-[#3F4147] shadow-sm font-semibold'
                  : 'text-[#3F4147]/70 hover:text-[#3F4147]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 10 Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredAngels.map((angel) => (
          <AngelFlipCard key={angel.id} angel={angel} />
        ))}
      </div>

      {/* Subtle Learning Note */}
      <div className="text-center pt-4 border-t border-[#AFC4D5]/20 text-xs text-[#3F4147]/70">
        <p>
          Jumlah malaikat yang sebenarnya sangat banyak dan hanya diketahui oleh Allah Swt., namun terdapat <strong>10 malaikat</strong> yang wajib kita ketahui nama dan tugasnya.
        </p>
      </div>
    </div>
  );
};
