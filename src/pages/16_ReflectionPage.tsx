import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReflectionData } from '../types';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { Heart, Save, CheckCircle2, Sparkles, Edit3 } from 'lucide-react';

interface ReflectionPageProps {
  initialReflection: ReflectionData;
  onSaveReflection: (data: Partial<ReflectionData>) => void;
  onNext: () => void;
}

export const ReflectionPage: React.FC<ReflectionPageProps> = ({
  initialReflection,
  onSaveReflection,
  onNext
}) => {
  const [formData, setFormData] = useState<ReflectionData>(initialReflection);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<number>(1);

  useEffect(() => {
    setFormData(initialReflection);
  }, [initialReflection]);

  const handleInputChange = (field: keyof ReflectionData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveReflection(formData);
    setIsSaved(true);
  };

  const questions = [
    {
      id: 1,
      field: 'cautiousSpeech' as keyof ReflectionData,
      title: 'Kehati-hatian Berkata & Berkomentar',
      prompt: 'Apakah aku sudah berhati-hati dalam berkata kepada orang tua, guru, dan teman-teman, serta saat berkomentar di media sosial?',
      placeholder: 'Tuliskan refleksimu di sini... (misal: "Kemarin aku sempat berkata ketus saat kesal, ke depan aku ingin belajar menahan amarah...")'
    },
    {
      id: 2,
      field: 'unseenHonesty' as keyof ReflectionData,
      title: 'Kejujuran di Ruang Sunyi',
      prompt: 'Apakah aku tetap berusaha jujur ketika tidak ada seorang pun manusia yang melihat perbuatanku?',
      placeholder: 'Tuliskan refleksimu di sini... (misal: "Saat ujian atau sendirian di kamar, aku menyadari Malaikat Raqib dan Atid tetap mencatat...")'
    },
    {
      id: 3,
      field: 'mistakesToFix' as keyof ReflectionData,
      title: 'Kesalahan yang Ingin Diperbaiki',
      prompt: 'Apakah ada kesalahan, kekhilafan, atau kebiasaan buruk yang perlu aku evaluasi dan perbaiki mulai hari ini?',
      placeholder: 'Tuliskan refleksimu di sini... (misal: "Aku ingin mengurangi kebiasaan menunda salat dan bergunjing...")'
    },
    {
      id: 4,
      field: 'goodDeedGoal' as keyof ReflectionData,
      title: 'Satu Kebaikan Nyata',
      prompt: 'Apa satu kebaikan konkret yang ingin aku lakukan setelah belajar tentang iman kepada malaikat hari ini?',
      placeholder: 'Tuliskan satu tekad kebaikanmu... (misal: "Hari ini aku ingin meminta maaf kepada teman yang pernah kusakiti dan membantu ibu tanpa disuruh...")'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2">
          <EightPointStar size={16} color="#D9B8B8" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Ruang Hening Pribadi
          </span>
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
          SEBELUM KITA SELESAI...
        </h1>
        <p className="text-xs sm:text-sm text-[#3F4147]/80 leading-relaxed">
          Ambillah waktu sejenak untuk merenung dengan jujur. Ini bukan tes atau ujian bernilai angka, melainkan percakapan tulus antara hatimu dan nuranimu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Reflection Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q) => {
              const value = (formData[q.field] as string) || '';
              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-[#AFC4D5]/35 bg-white p-5 sm:p-6 shadow-sm space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-[#AFC4D5]/20 flex items-center justify-center text-xs font-mono font-bold text-[#3F4147] shrink-0 mt-0.5">
                      0{q.id}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-[#B8AAA0] uppercase tracking-wider block">
                        {q.title}
                      </span>
                      <h3 className="font-serif-display text-base sm:text-lg text-[#3F4147] mt-0.5">
                        {q.prompt}
                      </h3>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={value}
                    onChange={(e) => handleInputChange(q.field, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full rounded-xl border border-[#AFC4D5]/35 bg-[#FAF7F4] p-3.5 text-xs sm:text-sm text-[#3F4147] placeholder:text-[#3F4147]/40 focus:border-[#3F4147] focus:bg-white focus:outline-none transition-all leading-relaxed"
                  />
                </div>
              );
            })}

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-[#3F4147] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2B2D31] active:scale-95 transition-all"
              >
                <Save size={16} />
                <span>SIMPAN REFLEKSI</span>
              </button>

              <AnimatePresence>
                {isSaved && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-xs font-medium text-[#3F4147] bg-[#AFC4D5]/20 px-3.5 py-2 rounded-xl border border-[#AFC4D5]/40"
                  >
                    <CheckCircle2 size={16} className="text-[#3F4147]" />
                    <span>“Refleksimu sudah tersimpan di perangkat ini.”</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>

          {/* Privacy Note */}
          <div className="mt-4 pt-4 border-t border-[#AFC4D5]/20 text-[11px] text-[#B8AAA0] text-center">
            Refleksi disimpan secara aman hanya di memori peramban (browser) kamu tanpa perlu login atau pengumpulan data pribadi.
          </div>
        </div>

        {/* Nara Reflecting Column */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="rounded-2xl border border-[#AFC4D5]/30 bg-white/60 p-5 flex flex-col items-center text-center w-full max-w-xs">
            <NaraCharacter
              pose="reflecting"
              bubbleText="Tuliskan isi hatimu dengan tenang. Kejujuran pada diri sendiri adalah awal kemuliaan akhlak."
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
