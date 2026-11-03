import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  EyeOff,
  AlertCircle,
  Sparkles,
  Smartphone,
  ExternalLink,
  QrCode,
  MonitorPlay
} from 'lucide-react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';

interface PemantikPageProps {
  onContinue: () => void;
}

const SCENES = [
  {
    step: 1,
    tag: 'Situasi 1',
    text: 'Kamu sedang sendirian di dalam kelas saat jam istirahat.'
  },
  {
    step: 2,
    tag: 'Situasi 2',
    text: 'Di atas meja temanmu, terdapat barang berharga atau uang yang tertinggal.'
  },
  {
    step: 3,
    tag: 'Situasi 3',
    text: 'Tidak ada bapak atau ibu guru yang berjaga di sekitar lorong.'
  },
  {
    step: 4,
    tag: 'Situasi 4',
    text: 'Tidak ada teman-teman yang sedang lewat di dekat pintu.'
  },
  {
    step: 5,
    tag: 'Situasi 5',
    text: 'Benar-benar tidak ada seorang pun manusia yang melihatmu.'
  }
];

export const PemantikPage: React.FC<PemantikPageProps> = ({ onContinue }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showQr, setShowQr] = useState<boolean>(false);
  const [showEmbed, setShowEmbed] = useState<boolean>(false);

  const handleNextStep = () => {
    if (currentStep < SCENES.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const isAllRevealed = currentStep >= SCENES.length;

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 max-w-5xl mx-auto">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Scenario Deck */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#AFC4D5]">
              Pemantik Pemikiran
            </span>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-[#3F4147]">
              SEANDAINYA...
            </h1>
            <p className="text-xs sm:text-sm text-[#3F4147]/70">
              Bayangkan skenario berikut terjadi padamu hari ini di sekolah:
            </p>
          </div>

          {/* Progressive Reveal Cards */}
          <div className="space-y-2.5">
            {SCENES.slice(0, currentStep).map((scene, index) => {
              const isLatest = index === currentStep - 1;
              return (
                <motion.div
                  key={scene.step}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                    isLatest
                      ? 'border-[#AFC4D5] bg-white shadow-sm'
                      : 'border-[#AFC4D5]/20 bg-white/60 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#AFC4D5]/20 text-[#3F4147] text-xs font-mono font-semibold">
                      {scene.step}
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-semibold text-[#B8AAA0] uppercase tracking-wider block mb-0.5">
                        {scene.tag}
                      </span>
                      <p className="text-sm sm:text-base font-medium text-[#3F4147]">
                        {scene.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Control button to reveal next scene or final trigger */}
          {!isAllRevealed ? (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleNextStep}
                className="flex items-center gap-2 rounded-xl bg-[#3F4147] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2B2D31] transition-all active:scale-95"
              >
                <span>Buka Keadaan Berikutnya</span>
                <span className="text-white/60">({currentStep}/{SCENES.length})</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setCurrentStep(SCENES.length)}
                className="text-xs text-[#3F4147]/70 hover:text-[#3F4147] font-medium underline underline-offset-4 transition-colors"
              >
                Lewati ke Kalimat Pemantik & Pertanyaan
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 pt-2"
            >
              {/* Kalimat Pemantik / Pertanyaan Perenungan */}
              <div className="rounded-2xl border-2 border-[#D9B8B8] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[#D9B8B8] mb-1.5">
                  <AlertCircle size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Pertanyaan Perenungan (Pemantik)
                  </span>
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl text-[#3F4147] leading-snug">
                  “Apakah itu berarti kita bebas melakukan apa saja?”
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#3F4147]/80 leading-relaxed">
                  Ketika tiada sepasang mata manusia pun mengawasi, apakah perbuatan kita benar-benar luput tanpa ada catatan?
                </p>
              </div>

              {/* Mentimeter Live Response Section */}
              <div className="rounded-2xl border-2 border-emerald-400/80 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 p-5 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Jajak Pendapat Kelas (Mentimeter)
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700/80 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    📱 Jawab Langsung dari HP
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3F4147] leading-relaxed mb-4">
                  Bagikan pendapatmu mengenai situasi di atas! Klik tombol di bawah untuk membuka halaman tanya-jawab, atau scan QR Code dengan kamera HP agar jawabanmu langsung terkirim dan muncul di layar kelas.
                </p>

                {/* Main AYO JAWAB Button */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.mentimeter.com/app/presentation/alofxz6wubzrs78en8r5h8oaeskk6h73/present-preview?question=zp1y7tafujyk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-700 hover:to-teal-700 transition-all active:scale-95 group tracking-wide animate-pulse hover:animate-none"
                  >
                    <Smartphone size={18} className="transition-transform group-hover:scale-110" />
                    <span>AYO JAWAB</span>
                    <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* QR Code Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowQr((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-4 py-3 text-xs font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50/70 transition-all active:scale-95"
                  >
                    <QrCode size={16} />
                    <span>{showQr ? 'Tutup QR Code' : 'Scan via QR Code HP'}</span>
                  </button>

                  {/* Embedded View Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowEmbed((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                  >
                    <MonitorPlay size={16} />
                    <span>{showEmbed ? 'Tutup Tampilan di Sini' : 'Tampilkan di Web Ini'}</span>
                  </button>
                </div>

                {/* QR Code Popup / Section */}
                <AnimatePresence>
                  {showQr && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4"
                    >
                      <div className="rounded-xl border border-emerald-200 bg-white p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm shrink-0">
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fwww.mentimeter.com%2Fapp%2Fpresentation%2Falofxz6wubzrs78en8r5h8oaeskk6h73%2Fpresent-preview%3Fquestion%3Dzp1y7tafujyk"
                            alt="QR Code AYO JAWAB Mentimeter"
                            className="w-36 h-36 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-bold text-slate-800">
                            📱 Scan Kamera HP Siswa
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Buka kamera HP atau aplikasi scanner lalu arahkan ke QR Code di samping untuk langsung membuka pertanyaan dan mengirimkan tanggapan tanpa mengetik alamat link.
                          </p>
                          <p className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                            Kode Link: mentimeter.com/app/presentation/...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Embedded Mentimeter View */}
                <AnimatePresence>
                  {showEmbed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pt-4 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                        <span className="font-semibold text-slate-700">Layar Mentimeter Tersemat:</span>
                        <a
                          href="https://www.mentimeter.com/app/presentation/alofxz6wubzrs78en8r5h8oaeskk6h73/present-preview?question=zp1y7tafujyk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline flex items-center gap-1 font-medium"
                        >
                          Buka di Tab Penuh <ExternalLink size={12} />
                        </a>
                      </div>
                      <div className="relative w-full h-[380px] sm:h-[450px] rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-100">
                        <iframe
                          src="https://www.mentimeter.com/app/presentation/alofxz6wubzrs78en8r5h8oaeskk6h73/present-preview?question=zp1y7tafujyk"
                          title="Mentimeter Pertanyaan Pemantik"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 italic">
                        *Catatan: Jika browser sekolah membatasi tampilan iframe, klik tombol hijau <strong>"AYO JAWAB"</strong> di atas untuk membuka tampilan penuh.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Continue button */}
              <div className="pt-2">
                <button
                  onClick={onContinue}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto min-h-[46px] rounded-xl bg-[#3F4147] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2B2D31] active:scale-95 group"
                >
                  <span>CARI TAHU JAWABANNYA & LANJUT KE AGENDA</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Character Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-[#AFC4D5]/30 bg-white/50 p-6 flex flex-col items-center text-center">
            <NaraCharacter
              pose={isAllRevealed ? 'curious' : 'thinking'}
              bubbleText={
                isAllRevealed
                  ? 'Kalau tidak ada yang melihat, apakah kita tetap harus berbuat jujur?'
                  : 'Coba bayangkan kalau kamu berada di ruangan kelas itu sendirian...'
              }
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
