import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  FileText,
  CheckCircle2,
  Save,
  Printer,
  Eye,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  BookOpen,
  ClipboardList,
  Scale,
  Target,
  RefreshCw,
  Users,
  Download,
  AlertCircle
} from 'lucide-react';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import { STORAGE_KEY_SCOREBOARD, INITIAL_GROUPS, GroupItem } from './GroupScoreboardPage';

interface LKPDPageProps {
  onBackToWordSearch: () => void;
  onGoToQuiz: () => void;
  onBackToHome: () => void;
}

const STORAGE_KEY_LKPD = 'mawas_diri_lkpd_submission';

interface LKPDData {
  groupName: string;
  studentNames: string;
  // Bagian 1
  pengertianIman: string;
  dalilIman: string;
  sifatMalaikat1: string;
  sifatMalaikat2: string;
  sifatMalaikat3: string;
  sifatMalaikat4: string;
  // Bagian 2
  angelDuties: { [angelName: string]: string };
  sikapPenerapanTugas: string;
  // Bagian 3
  kasusApaDilakukan: string;
  kasusHubunganIman: string;
  kasusSikapMawasDiri: string;
}

const ANGELS_LIST = [
  { name: 'Jibril', hint: 'Menyampaikan wahyu Allah SWT' },
  { name: 'Mikail', hint: 'Membagi rezeki dan menurunkan hujan' },
  { name: 'Israfil', hint: 'Meniup sangkakala hari kiamat' },
  { name: 'Izrail', hint: 'Mencabut nyawa makhluk' },
  { name: 'Munkar', hint: 'Menanyai manusia di alam kubur' },
  { name: 'Nakir', hint: 'Menanyai manusia di alam kubur bersama Munkar' },
  { name: 'Raqib', hint: 'Mencatat seluruh amal perbuatan baik' },
  { name: 'Atid', hint: 'Mencatat seluruh amal perbuatan buruk' },
  { name: 'Malik', hint: 'Menjaga pintu neraka' },
  { name: 'Ridwan', hint: 'Menjaga pintu surga' }
];

export const LKPDPage: React.FC<LKPDPageProps> = ({
  onBackToWordSearch,
  onGoToQuiz,
  onBackToHome
}) => {
  // Load saved group names from Scoreboard
  const [availableGroups, setAvailableGroups] = useState<GroupItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCOREBOARD);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed.slice(0, 3);
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_GROUPS;
  });

  // LKPD Form State
  const [formData, setFormData] = useState<LKPDData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LKPD);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      groupName: 'Kelompok 1',
      studentNames: '',
      pengertianIman: '',
      dalilIman: '',
      sifatMalaikat1: '',
      sifatMalaikat2: '',
      sifatMalaikat3: '',
      sifatMalaikat4: '',
      angelDuties: {},
      sikapPenerapanTugas: '',
      kasusApaDilakukan: '',
      kasusHubunganIman: '',
      kasusSikapMawasDiri: ''
    };
  });

  const [activeTab, setActiveTab] = useState<'form' | 'image'>('form');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<{ [key: string]: boolean }>({});

  const toggleHint = (key: string) => {
    setShowHints((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTextChange = (field: keyof LKPDData, val: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const handleAngelDutyChange = (angelName: string, duty: string) => {
    setFormData((prev) => ({
      ...prev,
      angelDuties: {
        ...prev.angelDuties,
        [angelName]: duty
      }
    }));
  };

  // Auto-fill member names when group is changed
  const handleGroupSelect = (groupName: string) => {
    const foundGroup = availableGroups.find((g) => g.name === groupName);
    setFormData((prev) => ({
      ...prev,
      groupName,
      studentNames: foundGroup && Array.isArray(foundGroup.members) ? foundGroup.members.join(', ') : prev.studentNames
    }));
  };

  const handleSave = (silent: boolean = false) => {
    try {
      localStorage.setItem(STORAGE_KEY_LKPD, JSON.stringify(formData));
      if (!silent) {
        setSaveStatus('✅ Jawaban LKPD berhasil disimpan!');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch {
      if (!silent) {
        setSaveStatus('⚠️ Gagal menyimpan ke memori browser.');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    }
  };

  const handlePrint = () => {
    handleSave(true);
    window.print();
  };

  const handleProceedToQuiz = () => {
    handleSave(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      onGoToQuiz();
    }, 450);
  };

  const filledCount = [
    formData.groupName,
    formData.studentNames,
    formData.pengertianIman,
    formData.dalilIman,
    formData.sifatMalaikat1,
    formData.sifatMalaikat2,
    formData.sikapPenerapanTugas,
    formData.kasusApaDilakukan,
    formData.kasusHubunganIman,
    formData.kasusSikapMawasDiri
  ].filter((item) => typeof item === 'string' && item.trim().length > 0).length;

  return (
    <div className="relative min-h-[calc(100vh-8rem)] py-6 px-4 max-w-5xl mx-auto">
      {/* Top Banner Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToWordSearch}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#AFC4D5]/40 bg-white text-xs font-semibold text-[#3F4147] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Cari Kata</span>
          </button>
          <span className="text-xs text-[#3F4147]/50 hidden sm:inline">/</span>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
            <ClipboardList size={13} />
            LKPD Siswa
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Save size={14} />
            <span>Simpan</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95 cursor-pointer print:hidden"
            title="Cetak atau Simpan ke PDF"
          >
            <Printer size={14} />
            <span>Cetak / PDF</span>
          </button>

          <button
            onClick={handleProceedToQuiz}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#3F4147] text-white text-xs font-bold hover:bg-[#2B2D31] transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Lanjut ke Kuis</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Save Notification Toast */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-xl text-center shadow-sm"
          >
            {saveStatus}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'form'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText size={15} />
            <span>Isi LKPD Digital</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'image'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eye size={15} />
            <span>Lihat Lembar Asli LKPD</span>
          </button>
        </div>

        <div className="text-[11px] font-medium text-slate-500 hidden sm:block">
          Kelengkapan Isian: <span className="font-bold text-sky-700">{filledCount}/10</span> bagian terisi
        </div>
      </div>

      {/* TAB 1: DIGITAL LKPD FORM */}
      {activeTab === 'form' && (
        <div className="space-y-6">
          {/* LKPD Header Card */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-sky-400/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
              <EightPointStar size={160} color="#0284C7" />
            </div>

            <div className="text-center space-y-1.5 pb-6 border-b border-slate-200 relative">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                LKPD | PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI
              </span>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-sky-900 tracking-wide font-extrabold">
                ✨ LKPD ✨
              </h1>
              <div className="inline-block px-4 py-1 rounded-full bg-sky-100/80 border border-sky-300 text-sky-900 font-bold text-sm sm:text-base">
                Iman kepada Malaikat Allah Swt.
              </div>
              <p className="text-xs sm:text-sm text-amber-800 font-serif italic pt-1">
                Tema: Mawas Diri dan Introspeksi dalam Menjalani Kehidupan
              </p>
              <div className="pt-1">
                <span className="inline-block px-3 py-0.5 rounded-full bg-sky-900 text-white text-xs font-semibold">
                  Kelas VII
                </span>
              </div>
            </div>

            {/* Identitas Peserta Didik / Kelompok */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Users size={14} className="text-sky-600" />
                  <span>Pilih Kelompok:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableGroups.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleGroupSelect(g.name)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        formData.groupName === g.name
                          ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Nama Anggota / Peserta Didik:</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Pisahkan dengan koma)</span>
                </label>
                <input
                  type="text"
                  value={formData.studentNames}
                  onChange={(e) => handleTextChange('studentNames', e.target.value)}
                  placeholder="Contoh: Silvi, Zahrul, Faul, Salma, Adit..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* BAGIAN 1: KONSEP DASAR */}
          <div className="rounded-2xl border-2 border-sky-300 bg-white p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-600 text-white font-bold text-sm">
                  1
                </div>
                <h2 className="font-serif-display text-lg sm:text-xl font-bold text-slate-800">
                  Konsep Dasar
                </h2>
              </div>
              <BookOpen size={20} className="text-sky-500" />
            </div>

            {/* Soal 1.1 */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500 inline-block"></span>
                  <span>Jelaskan pengertian iman kepada malaikat:</span>
                </label>
                <button
                  type="button"
                  onClick={() => toggleHint('pengertian')}
                  className="text-[11px] text-sky-600 hover:text-sky-800 font-medium inline-flex items-center gap-0.5 cursor-pointer"
                >
                  <HelpCircle size={12} />
                  <span>{showHints['pengertian'] ? 'Tutup Petunjuk' : 'Petunjuk'}</span>
                </button>
              </div>
              {showHints['pengertian'] && (
                <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-[11px] text-sky-900 leading-relaxed">
                  💡 <strong>Petunjuk:</strong> Jelaskan secara bahasa (*malak* = utusan) dan istilah (meyakini sepenuh hati bahwa malaikat adalah makhluk Allah SWT ciptaan dari cahaya yang taat).
                </div>
              )}
              <textarea
                rows={3}
                value={formData.pengertianIman}
                onChange={(e) => handleTextChange('pengertianIman', e.target.value)}
                placeholder="Tuliskan penjelasan pengertian iman kepada malaikat di sini..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50"
              />
            </div>

            {/* Soal 1.2 */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500 inline-block"></span>
                  <span>Tuliskan dalil tentang iman kepada malaikat (Al-Qur'an / Hadis):</span>
                </label>
                <button
                  type="button"
                  onClick={() => toggleHint('dalil')}
                  className="text-[11px] text-sky-600 hover:text-sky-800 font-medium inline-flex items-center gap-0.5 cursor-pointer"
                >
                  <HelpCircle size={12} />
                  <span>{showHints['dalil'] ? 'Tutup Petunjuk' : 'Petunjuk'}</span>
                </button>
              </div>
              {showHints['dalil'] && (
                <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-[11px] text-sky-900 leading-relaxed">
                  💡 <strong>Petunjuk Dalil:</strong> Bisa menyebutkan intisari QS. Al-Baqarah ayat 285 (*"...kullun aamana billahi wa malaa'ikatihii..."*) atau Hadis HR. Muslim bahwa malaikat diciptakan dari cahaya (*nur*).
                </div>
              )}
              <textarea
                rows={3}
                value={formData.dalilIman}
                onChange={(e) => handleTextChange('dalilIman', e.target.value)}
                placeholder="Tuliskan dalil Al-Qur'an (nama surat/ayat) atau Hadis beserta intisari artinya..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50"
              />
            </div>

            {/* Soal 1.3 */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 inline-block"></span>
                <span>Sebutkan 4 sifat malaikat:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 rounded-md w-6 h-6 flex items-center justify-center shrink-0">
                    1
                  </span>
                  <input
                    type="text"
                    value={formData.sifatMalaikat1}
                    onChange={(e) => handleTextChange('sifatMalaikat1', e.target.value)}
                    placeholder="Sifat ke-1 (misal: Ciptaan dari cahaya)"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 bg-slate-50/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 rounded-md w-6 h-6 flex items-center justify-center shrink-0">
                    2
                  </span>
                  <input
                    type="text"
                    value={formData.sifatMalaikat2}
                    onChange={(e) => handleTextChange('sifatMalaikat2', e.target.value)}
                    placeholder="Sifat ke-2 (misal: Selalu taat & patuh)"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 bg-slate-50/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 rounded-md w-6 h-6 flex items-center justify-center shrink-0">
                    3
                  </span>
                  <input
                    type="text"
                    value={formData.sifatMalaikat3}
                    onChange={(e) => handleTextChange('sifatMalaikat3', e.target.value)}
                    placeholder="Sifat ke-3 (misal: Tidak memiliki hawa nafsu)"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 bg-slate-50/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 rounded-md w-6 h-6 flex items-center justify-center shrink-0">
                    4
                  </span>
                  <input
                    type="text"
                    value={formData.sifatMalaikat4}
                    onChange={(e) => handleTextChange('sifatMalaikat4', e.target.value)}
                    placeholder="Sifat ke-4 (misal: Tidak berjenis kelamin)"
                    className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BAGIAN 2: NAMA DAN TUGAS MALAIKAT */}
          <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600 text-white font-bold text-sm">
                  2
                </div>
                <h2 className="font-serif-display text-lg sm:text-xl font-bold text-slate-800">
                  Nama dan Tugas Malaikat
                </h2>
              </div>
              <ClipboardList size={20} className="text-amber-500" />
            </div>

            <p className="text-xs text-slate-600">
              Isilah tugas pokok dari masing-masing malaikat berikut:
            </p>

            {/* List 10 Malaikat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ANGELS_LIST.map((angel, idx) => (
                <div
                  key={angel.name}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-amber-50/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">
                        {idx + 1}
                      </span>
                      Malaikat {angel.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleHint(`angel_${angel.name}`)}
                      className="text-[10px] text-amber-700 hover:underline cursor-pointer"
                    >
                      {showHints[`angel_${angel.name}`] ? 'Tutup Hint' : 'Bantuan'}
                    </button>
                  </div>
                  {showHints[`angel_${angel.name}`] && (
                    <div className="mb-2 p-1.5 rounded bg-amber-100/70 text-[10px] text-amber-900">
                      💡 {angel.hint}
                    </div>
                  )}
                  <input
                    type="text"
                    value={formData.angelDuties[angel.name] || ''}
                    onChange={(e) => handleAngelDutyChange(angel.name, e.target.value)}
                    placeholder={`Tulis tugas Malaikat ${angel.name}...`}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
              ))}
            </div>

            {/* Pertanyaan Penerapan Sikap */}
            <div className="pt-2 space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block"></span>
                <span>Tuliskan satu sikap yang dapat diterapkan dari memahami tugas malaikat tersebut:</span>
              </label>
              <textarea
                rows={2}
                value={formData.sikapPenerapanTugas}
                onChange={(e) => handleTextChange('sikapPenerapanTugas', e.target.value)}
                placeholder="Contoh: Mengingat tugas Malaikat Raqib dan Atid, saya selalu berhati-hati saat berbicara dan tidak berbohong..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* BAGIAN 3: MAWAS DIRI DAN INTROSPEKSI */}
          <div className="rounded-2xl border-2 border-indigo-300 bg-white p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
                  3
                </div>
                <h2 className="font-serif-display text-lg sm:text-xl font-bold text-slate-800">
                  Mawas Diri dan Introspeksi (Studi Kasus)
                </h2>
              </div>
              <Scale size={20} className="text-indigo-500" />
            </div>

            {/* Kotak Kasus Kuning / Emas persis seperti gambar */}
            <div className="rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50/90 to-amber-100/60 p-4 sm:p-5 flex items-start gap-3">
              <div className="p-2 bg-amber-200/80 rounded-lg text-amber-900 shrink-0">
                <BookOpen size={20} />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Studi Kasus Kelas:
                </span>
                <p className="text-xs sm:text-sm font-medium text-amber-950 leading-relaxed">
                  “Seorang siswa menemukan uang di kelas saat tidak ada orang yang melihat.”
                </p>
              </div>
            </div>

            {/* 3 Pertanyaan Kasus */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block"></span>
                  <span>1. Apa yang sebaiknya dilakukan siswa tersebut?</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.kasusApaDilakukan}
                  onChange={(e) => handleTextChange('kasusApaDilakukan', e.target.value)}
                  placeholder="Jelaskan tindakan yang tepat dan amanah..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block"></span>
                  <span>2. Apa hubungannya dengan iman kepada malaikat?</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.kasusHubunganIman}
                  onChange={(e) => handleTextChange('kasusHubunganIman', e.target.value)}
                  placeholder="Kaitkan dengan malaikat pencatat amal atau pengawasan Allah..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 inline-block"></span>
                  <span>3. Sikap mawas diri apa yang dapat diterapkan?</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.kasusSikapMawasDiri}
                  onChange={(e) => handleTextChange('kasusSikapMawasDiri', e.target.value)}
                  placeholder="Contoh: Kejujuran batin, selalu introspeksi diri (muhasabah), rasa malu berbuat dosa..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* BAGIAN TUJUAN (FOOTER LKPD) */}
          <div className="rounded-2xl border-2 border-emerald-400/80 bg-emerald-50/60 p-5 flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
              <Target size={24} />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Tujuan Pembelajaran LKPD
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                “Memahami konsep iman kepada malaikat, mengenal nama dan tugas malaikat, serta membiasakan sikap mawas diri dan introspeksi dalam kehidupan sehari-hari.”
              </p>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm print:hidden">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSave(false)}
                className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save size={15} />
                <span>Simpan Lembar Kerja</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer size={15} />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleProceedToQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#3F4147] to-[#2B2D31] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>SELESAI LKPD & LANJUT KE KUIS</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ORIGINAL IMAGE VIEWER */}
      {activeTab === 'image' && (
        <div className="rounded-2xl border-2 border-sky-300 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Lembar Kerja Asli (LKPD PAI Kelas VII)
              </h3>
              <p className="text-xs text-slate-500">
                Format visual asli sesuai dokumen ajar untuk referensi cetak guru atau siswa.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/assets/aistudio/LKPD_Iman_kepada_Malaikat_Allah_Swt_85ac2582.png"
                download="LKPD_Iman_kepada_Malaikat_Allah_Swt.png"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <Download size={13} />
                <span>Unduh Gambar</span>
              </a>
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 flex items-center gap-1 cursor-pointer"
              >
                <Eye size={13} />
                <span>Perbesar Layar Penuh</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center bg-slate-50 rounded-xl p-4 border border-slate-200 overflow-hidden">
            <img
              src="/assets/aistudio/LKPD_Iman_kepada_Malaikat_Allah_Swt_85ac2582.png"
              alt="LKPD Iman kepada Malaikat Allah Swt Kelas VII"
              className="max-h-[750px] w-auto object-contain rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setShowImageModal(true)}
            />
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab('form')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-all cursor-pointer shadow-sm"
            >
              <FileText size={14} />
              <span>Kembali Mengisi Jawaban di Form Digital</span>
            </button>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE MODAL */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
              >
                Tutup ✕
              </button>
              <div className="max-h-[85vh] overflow-y-auto">
                <img
                  src="/assets/aistudio/LKPD_Iman_kepada_Malaikat_Allah_Swt_85ac2582.png"
                  alt="LKPD Iman kepada Malaikat Allah Swt Kelas VII Fullscreen"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
