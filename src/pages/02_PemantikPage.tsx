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
  MonitorPlay,
  Save,
  CheckCircle2,
  Download,
  Printer,
  RefreshCw,
  Copy,
  Check,
  FileText,
  Layers,
  BarChart3
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
  const [showQr, setShowQr] = useState<boolean>(true);
  const [showEmbed, setShowEmbed] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [embedKey, setEmbedKey] = useState<number>(0);

  // Local state for saving student answer
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('pemantik_student_name') || '';
  });
  const [studentAnswer, setStudentAnswer] = useState<string>(() => {
    return localStorage.getItem('pemantik_student_saved_answer') || '';
  });
  const [savedTime, setSavedTime] = useState<string | null>(() => {
    return localStorage.getItem('pemantik_student_saved_time');
  });
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleSaveAnswer = () => {
    if (!studentAnswer.trim()) {
      setSaveToast('⚠️ Mohon tulis jawaban terlebih dahulu sebelum menyimpan.');
      setTimeout(() => setSaveToast(null), 3000);
      return;
    }
    const now =
      new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
      ' WIB, ' +
      new Date().toLocaleDateString('id-ID');
    localStorage.setItem('pemantik_student_name', studentName);
    localStorage.setItem('pemantik_student_saved_answer', studentAnswer);
    localStorage.setItem('pemantik_student_saved_time', now);
    setSavedTime(now);
    setSaveToast('✅ Jawaban pemantik berhasil disimpan ke memori browser!');
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleDownloadNote = () => {
    const textContent = `CATATAN PERTANYAAN PEMANTIK
Materi: Mawas Diri Melalui Iman kepada Malaikat Allah SWT
Waktu Simpan: ${savedTime || new Date().toLocaleString('id-ID')}
Nama / Kelompok: ${studentName || 'Peserta Didik'}

Pertanyaan Pemantik:
"Apakah itu berarti kita bebas melakukan apa saja ketika tiada sepasang mata manusia pun mengawasi?"

Jawaban:
${studentAnswer || '(Belum ada catatan jawaban)'}
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Catatan_Pemantik_${studentName ? studentName.replace(/\s+/g, '_') : 'Siswa'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('59802498');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

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

              {/* Save Notification Toast */}
              <AnimatePresence>
                {saveToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl text-center shadow-sm"
                  >
                    {saveToast}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mentimeter Live Response Section */}
              <div className="rounded-2xl border-2 border-emerald-400/80 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 p-5 shadow-md space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Jajak Pendapat Kelas (Mentimeter Live)
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Kode: 5980 2498
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {/* Left Column: Student Access & Official Barcode */}
                  <div className="md:col-span-5 bg-white/90 rounded-xl p-4 border border-emerald-200 shadow-xs flex flex-col items-center text-center space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                        1. Akses Siswa Menjawab
                      </span>
                      <h4 className="text-sm font-bold text-slate-800">
                        Scan Barcode / Buka Link
                      </h4>
                    </div>

                    {/* Official Mentimeter Barcode Image */}
                    <div className="p-2 bg-white rounded-xl border-2 border-emerald-300 shadow-sm max-w-[200px]">
                      <img
                        src="/assets/aistudio/Cuplikan_layar_2026-11-04_064940_45cf83bd.png"
                        alt="Barcode Mentimeter 5980 2498"
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-slate-600">
                        Buka <strong className="text-emerald-700 font-mono">menti.com</strong> di browser HP
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono text-base font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 tracking-wider">
                          5980 2498
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Salin Kode Mentimeter"
                        >
                          {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                          <span>{copiedCode ? 'Disalin!' : 'Salin'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Main AYO JAWAB Button for Mobile/Tablet */}
                    <div className="w-full pt-1">
                      <a
                        href="https://www.menti.com/59802498"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/25 hover:from-emerald-700 hover:to-teal-700 transition-all active:scale-95 group tracking-wide animate-pulse hover:animate-none"
                      >
                        <Smartphone size={16} className="transition-transform group-hover:scale-110" />
                        <span>AYO JAWAB</span>
                        <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        *Klik tombol ini jika menggunakan HP / tab terpisah
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Live Presentation Results (Kumpulan Jawaban Masuk) */}
                  <div className="md:col-span-7 flex flex-col space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full inline-block">
                          2. Kumpulan Jawaban Kelas
                        </span>
                        <h4 className="text-sm font-bold text-slate-800">
                          Hasil Masuk Otomatis Real-Time
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEmbedKey((prev) => prev + 1)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                          title="Muat Ulang Layar Hasil"
                        >
                          <RefreshCw size={12} />
                          <span>Segarkan</span>
                        </button>
                        <a
                          href="https://www.mentimeter.com/app/presentation/alofxz6wubzrs78en8r5h8oaeskk6h73/present-preview?question=zp1y7tafujyk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <span>Buka Layar Penuh</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Setiap jawaban yang dikirim siswa melalui barcode di samping akan <strong>otomatis langsung masuk dan tersimpan</strong> ke dalam kumpulan jawaban pada layar presentasi berikut:
                    </p>

                    {/* Embedded Presentation View */}
                    <div className="relative w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden border-2 border-emerald-200/80 shadow-inner bg-slate-50">
                      <iframe
                        key={embedKey}
                        src="https://www.mentimeter.com/app/presentation/alofxz6wubzrs78en8r5h8oaeskk6h73/present-preview?question=zp1y7tafujyk"
                        title="Kumpulan Jawaban Mentimeter Masuk"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                    </div>
                  </div>
                </div>

                {/* Local Answer Save Section - "Dan juga harus bisa di simpan ya" */}
                <div className="mt-4 pt-4 border-t border-emerald-100 rounded-xl bg-white/80 p-4 border border-emerald-200/60 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-emerald-700" />
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        Simpan Catatan Jawaban Pemantik Saya (Di Web Ini)
                      </h4>
                    </div>
                    {savedTime && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-emerald-600" />
                        Tersimpan: {savedTime}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Selain otomatis tersimpan di cloud Mentimeter, kamu juga dapat menyimpan catatan jawaban pribadimu di web ini agar bisa ditinjau kembali atau diunduh:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-1">
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Nama / Kelompokmu..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <textarea
                        rows={2}
                        value={studentAnswer}
                        onChange={(e) => setStudentAnswer(e.target.value)}
                        placeholder="Tuliskan jawaban perenunganmu di sini (misal: Kita tidak bebas berbuat semaunya karena ada malaikat Raqib dan Atid yang selalu mencatat)..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveAnswer}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                      >
                        <Save size={13} />
                        <span>Simpan ke Web Ini</span>
                      </button>

                      {studentAnswer.trim() && (
                        <button
                          type="button"
                          onClick={handleDownloadNote}
                          className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download size={13} />
                          <span>Unduh Catatan (.txt)</span>
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400 italic">
                      *Tersimpan otomatis di memori browser perangkat ini
                    </span>
                  </div>
                </div>
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
