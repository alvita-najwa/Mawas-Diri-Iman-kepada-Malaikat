import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NaraCharacter } from '../components/Character/NaraCharacter';
import { EightPointStar } from '../components/Decorations/IslamicGeometry';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  ArrowRight,
  Home,
  Sparkles,
  HelpCircle,
  Search,
  Settings,
  X,
  Check,
  RefreshCw
} from 'lucide-react';

interface VideoLaguPageProps {
  onBackToHome: () => void;
  onGoToQuiz: () => void;
  onGoToWordSearch: () => void;
}

interface LyricLine {
  id: number;
  time: number;
  angel: string;
  arabicName: string;
  lyric: string;
  duty: string;
  color: string;
}

const DEFAULT_VIDEO_URL = 'https://drive.google.com/file/d/1YBbyhNRLZRahxBe78rTTODu8tmVohmKu/view?usp=drivesdk';
const STORAGE_KEY_VIDEO_URL = 'mawas_diri_video_url';

const LYRIC_LINES: LyricLine[] = [
  {
    id: 0,
    time: 0,
    angel: 'PENGANTAR',
    arabicName: 'عَشَرَةُ مَلَائِكَةٍ',
    lyric: 'Sepuluh malaikat Allah, yang wajib kita ketahui...',
    duty: 'Rukun Iman yang kedua',
    color: '#AFC4D5'
  },
  {
    id: 1,
    time: 4,
    angel: 'JIBRIL',
    arabicName: 'جِبْرِيلُ',
    lyric: 'Jibril menyampaikan wahyu...',
    duty: 'Menyampaikan kalam ilahi kepada para Nabi dan Rasul',
    color: '#AFC4D5'
  },
  {
    id: 2,
    time: 8,
    angel: 'MIKAIL',
    arabicName: 'مِيكَائِيلُ',
    lyric: 'Mikail membagi rezeki...',
    duty: 'Mengatur pembagian rezeki, hujan, dan kesuburan alam',
    color: '#D9B8B8'
  },
  {
    id: 3,
    time: 12,
    angel: 'ISRAFIL',
    arabicName: 'إِسْرَافِيلُ',
    lyric: 'Israfil meniup sangkakala...',
    duty: 'Meniup terompet sangkakala di hari kiamat dan kebangkitan',
    color: '#C8BDD8'
  },
  {
    id: 4,
    time: 16,
    angel: 'IZRAIL',
    arabicName: 'عِزْرَائِيلُ',
    lyric: 'Izrail mencabut nyawa...',
    duty: 'Memisahkan ruh dari raga makhluk hidup sesuai ajalnya',
    color: '#B8AAA0'
  },
  {
    id: 5,
    time: 20,
    angel: 'MUNKAR & NAKIR',
    arabicName: 'مُنْكَرٌ وَنَكِيرٌ',
    lyric: 'Munkar dan Nakir bertanya di kubur...',
    duty: 'Menanyai manusia mengenai tuhan, agama, dan nabinya di alam barzakh',
    color: '#9BBEC8'
  },
  {
    id: 6,
    time: 25,
    angel: 'RAQIB',
    arabicName: 'رَقِيبٌ',
    lyric: 'Raqib mencatat amal yang baik...',
    duty: 'Mencatat segala kebaikan, kejujuran, dan niat tulus manusia',
    color: '#88A9C3'
  },
  {
    id: 7,
    time: 29,
    angel: 'ATID',
    arabicName: 'عَتِيدٌ',
    lyric: 'Atid mencatat amal yang buruk...',
    duty: 'Mencatat segala keburukan, dusta, dan kekhilafan manusia',
    color: '#CE9A9A'
  },
  {
    id: 8,
    time: 33,
    angel: 'MALIK',
    arabicName: 'مَالِكٌ',
    lyric: 'Malik menjaga pintu neraka...',
    duty: 'Menjaga neraka dengan ketegasan dan ketaatan kepada Allah Swt.',
    color: '#A89F91'
  },
  {
    id: 9,
    time: 37,
    angel: 'RIDWAN',
    arabicName: 'رِضْوَانُ',
    lyric: 'Ridwan menjaga pintu surga...',
    duty: 'Menyambut orang-orang beriman masuk ke surga yang penuh kenikmatan',
    color: '#B5A0C8'
  },
  {
    id: 10,
    time: 41,
    angel: 'PENUTUP',
    arabicName: 'الْحَمْدُ لِلَّهِ',
    lyric: 'Mari kita ingat selalu, berbuat baik setiap waktu!',
    duty: 'Mawas diri dan introspeksi sepanjang kehidupan',
    color: '#D9B8B8'
  }
];

export const VideoLaguPage: React.FC<VideoLaguPageProps> = ({
  onBackToHome,
  onGoToQuiz,
  onGoToWordSearch
}) => {
  // Store destination URL without ever rendering the raw address on the slide
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIDEO_URL);
      if (saved && (saved.includes('tiktok.com') || saved.trim() === '')) {
        localStorage.setItem(STORAGE_KEY_VIDEO_URL, DEFAULT_VIDEO_URL);
        return DEFAULT_VIDEO_URL;
      }
      return saved ? saved : DEFAULT_VIDEO_URL;
    } catch {
      return DEFAULT_VIDEO_URL;
    }
  });

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [tempUrlInput, setTempUrlInput] = useState(videoUrl);
  const [urlSavedFeedback, setUrlSavedFeedback] = useState(false);

  // Tab: 'lirik' (sing-along / text) or 'daftar' (angels list)
  const [activeTab, setActiveTab] = useState<'lirik' | 'daftar'>('lirik');
  const [isKaraokePlaying, setIsKaraokePlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Soft chime note for sing-along line transitions
  const playChime = (frequency: number) => {
    if (isSoundMuted) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio fallback
    }
  };

  // Karaoke line progression timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isKaraokePlaying) {
      const notes = [392, 440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
      playChime(notes[currentLineIndex % notes.length]);

      timer = setTimeout(() => {
        if (currentLineIndex < LYRIC_LINES.length - 1) {
          setCurrentLineIndex((prev) => prev + 1);
        } else {
          setIsKaraokePlaying(false);
          setCurrentLineIndex(0);
        }
      }, 3800);
    }

    return () => clearTimeout(timer);
  }, [isKaraokePlaying, currentLineIndex]);

  const handleStartKaraoke = () => {
    setIsKaraokePlaying(true);
  };

  const handlePauseKaraoke = () => {
    setIsKaraokePlaying(false);
  };

  const handleResetKaraoke = () => {
    setIsKaraokePlaying(false);
    setCurrentLineIndex(0);
  };

  // Direct trigger to open video link directly without any intermediate page or prompt
  const handleLaunchVideo = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = tempUrlInput.trim();
    if (cleanUrl) {
      setVideoUrl(cleanUrl);
      try {
        localStorage.setItem(STORAGE_KEY_VIDEO_URL, cleanUrl);
      } catch {
        // localStorage fallback
      }
      setUrlSavedFeedback(true);
      setTimeout(() => {
        setUrlSavedFeedback(false);
        setShowConfigModal(false);
      }, 900);
    }
  };

  const handleResetToDefaultUrl = () => {
    setTempUrlInput(DEFAULT_VIDEO_URL);
    setVideoUrl(DEFAULT_VIDEO_URL);
    try {
      localStorage.removeItem(STORAGE_KEY_VIDEO_URL);
    } catch {
      // localStorage fallback
    }
    setUrlSavedFeedback(true);
    setTimeout(() => {
      setUrlSavedFeedback(false);
      setShowConfigModal(false);
    }, 900);
  };

  const currentLine = LYRIC_LINES[currentLineIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#AFC4D5]/25 pb-4">
        <div className="flex items-center gap-2">
          <EightPointStar size={16} color="#D9B8B8" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8AAA0]">
            Media Pembelajaran Interaktif PAI · Kelas VII SMP
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Subtle Teacher Tool to change destination link without showing URL on slide */}
          <button
            onClick={() => {
              setTempUrlInput(videoUrl);
              setShowConfigModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#AFC4D5]/30 bg-white/80 hover:bg-white text-xs font-semibold text-[#3F4147]/80 hover:text-[#3F4147] transition-colors"
            title="Pengaturan Tautan Video (Khusus Guru / Smartboard)"
          >
            <Settings size={14} />
            <span className="hidden sm:inline">Pengaturan Video</span>
          </button>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#AFC4D5]/35 bg-white hover:bg-[#FAF7F4] text-xs font-semibold text-[#3F4147] transition-colors shadow-xs"
          >
            <Home size={15} />
            <span>Beranda</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          CENTERPIECE SMARTBOARD HERO SECTION:
          - Judul Besar di Tengah: "Mari Menghafal 10 Malaikat Allah dan Tugasnya"
          - Tombol Interaktif "▶ MULAI" berukuran besar, responsif Smartboard (layar sentuh)
          - Membuka tautan video asli secara langsung tanpa konfirmasi
          - TIDAK MENAMPILKAN URL/alamat link video di halaman slide
      ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#AFC4D5]/40 bg-gradient-to-b from-white via-[#FAF7F4] to-[#F5EFE6] p-6 sm:p-10 md:p-14 shadow-lg text-center flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        {/* Soft Decorative Ambient Stars & Islamic Arch Accent */}
        <div className="absolute top-4 left-6 opacity-30 pointer-events-none hidden sm:block">
          <EightPointStar size={42} color="#AFC4D5" />
        </div>
        <div className="absolute top-4 right-6 opacity-30 pointer-events-none hidden sm:block">
          <EightPointStar size={42} color="#D9B8B8" />
        </div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#AFC4D5]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Cheerful Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#AFC4D5]/40 shadow-xs">
          <Music size={15} className="text-[#D9B8B8]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#3F4147]">
            Lagu & Media Pembelajaran Interaktif
          </span>
          <Sparkles size={14} className="text-[#C8BDD8]" />
        </div>

        {/* Nara Companion in Cheerful Pose */}
        <div className="pt-1">
          <NaraCharacter
            pose="celebrating"
            bubbleText="Ayo teman-teman kelas 7, sentuh tombol MULAI untuk menyanyi dan menghafal 10 malaikat Allah bersama!"
            bubblePosition="top"
            size="md"
            showNameTag={false}
          />
        </div>

        {/* JUDUL BESAR DI TENGAH HALAMAN (Sesuai Permintaan) */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3F4147] tracking-tight leading-[1.15] text-balance">
            Mari Menghafal 10 Malaikat Allah dan Tugasnya
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#3F4147]/75 font-normal max-w-2xl mx-auto leading-relaxed">
            Kenali nama-nama malaikat Allah Swt. dan tugas mulianya melalui video lagu yang ceria, mudah dihafal, dan menginspirasi sikap mawas diri.
          </p>
        </div>

        {/* =========================================================================
            TOMBOL INTERAKTIF "▶ MULAI" (SMARTBOARD / TOUCHSCREEN FRIENDLY)
            - Berukuran besar, mudah ditekan di layar sentuh Smartboard
            - Efek interaktif ketika disentuh / ditekan
            - Langsung mengarahkan ke tautan video asli tanpa halaman perantara
        ========================================================================= */}
        <div className="pt-2 sm:pt-4 flex flex-col items-center space-y-3">
          <div className="relative group">
            {/* Glowing animated halo effect for Smartboard touch invitation */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#AFC4D5] via-[#D9B8B8] to-[#C8BDD8] opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

            <motion.a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // Ensure immediate direct launch across all browsers and smartboards
                e.preventDefault();
                handleLaunchVideo();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex items-center justify-center gap-4 px-10 sm:px-14 md:px-16 py-5 sm:py-6 min-h-[72px] sm:min-h-[82px] min-w-[260px] sm:min-w-[320px] rounded-2xl sm:rounded-3xl bg-[#3F4147] hover:bg-[#2B2D31] text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider shadow-2xl transition-all cursor-pointer select-none active:ring-4 active:ring-[#AFC4D5]/60"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLaunchVideo();
                }
              }}
              aria-label="Mulai memutar video lagu 10 malaikat Allah"
            >
              <span className="font-serif-display drop-shadow-sm flex items-center gap-2">
                ▶ MULAI
              </span>
            </motion.a>
          </div>

          <span className="text-[11px] sm:text-xs text-[#3F4147]/60 font-medium">
            Sentuh tombol di atas untuk membuka dan memutar video secara langsung
          </span>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE LEARNING COMPANION (KARAOKE & 10 ANGELS TEXT LIST)
          Designed cleanly for classroom revision & teacher presentation
      ========================================================================= */}
      <div className="rounded-3xl border border-[#AFC4D5]/35 bg-white p-5 sm:p-7 shadow-sm space-y-6">
        {/* Section Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#AFC4D5]/20 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#AFC4D5]/20 flex items-center justify-center text-[#3F4147]">
              <Music size={18} />
            </div>
            <div>
              <h2 className="font-serif-display text-lg sm:text-xl text-[#3F4147]">
                Panduan Hafalan & Lirik Lagu 10 Malaikat
              </h2>
              <p className="text-xs text-[#3F4147]/70">
                Gunakan panduan lirik ini untuk bernyanyi bersama siswa di kelas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#FAF7F4] border border-[#AFC4D5]/30 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('lirik')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'lirik'
                  ? 'bg-[#3F4147] text-white shadow-xs'
                  : 'text-[#3F4147]/80 hover:text-[#3F4147]'
              }`}
            >
              Irama Per Bait
            </button>
            <button
              onClick={() => setActiveTab('daftar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'daftar'
                  ? 'bg-[#3F4147] text-white shadow-xs'
                  : 'text-[#3F4147]/80 hover:text-[#3F4147]'
              }`}
            >
              Daftar Lengkap 10 Malaikat
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Sing-Along Teleprompter */}
        {activeTab === 'lirik' && (
          <div className="space-y-5">
            {/* Playback control strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#FAF7F4] border border-[#AFC4D5]/30">
              <span className="text-xs font-semibold text-[#3F4147]">
                Pemutar Teks Per Bait:
              </span>

              <div className="flex items-center gap-2">
                {!isKaraokePlaying ? (
                  <button
                    onClick={handleStartKaraoke}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3F4147] text-white text-xs font-semibold shadow-xs hover:bg-[#2B2D31] active:scale-95 transition-all"
                  >
                    <Play size={13} fill="currentColor" />
                    <span>Jalankan Lirik Otomatis</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePauseKaraoke}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#AFC4D5] text-white text-xs font-semibold shadow-xs hover:bg-[#9BBEC8] active:scale-95 transition-all"
                  >
                    <Pause size={13} fill="currentColor" />
                    <span>Jeda</span>
                  </button>
                )}

                <button
                  onClick={handleResetKaraoke}
                  className="p-2 rounded-xl border border-[#AFC4D5]/30 bg-white text-[#3F4147] hover:bg-[#F8F5F0] transition-colors"
                  title="Ulangi dari Bait Pertama"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  onClick={() => setIsSoundMuted(!isSoundMuted)}
                  className="p-2 rounded-xl border border-[#AFC4D5]/30 bg-white text-[#3F4147] hover:bg-[#F8F5F0] transition-colors"
                  title={isSoundMuted ? 'Nyalakan Nada Panduan' : 'Bisukan Nada Panduan'}
                >
                  {isSoundMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>

            {/* Current Active Lyric Display Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLine.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border-2 border-[#AFC4D5]/40 bg-[#FAF7F4] p-6 sm:p-8 text-center space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-white border border-[#AFC4D5]/30 text-[#3F4147]">
                    Bait {currentLineIndex + 1} / {LYRIC_LINES.length}
                  </span>
                  <span className="font-arabic-text text-base text-[#3F4147]/80">
                    {currentLine.arabicName}
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-[#3F4147] leading-snug">
                  “{currentLine.lyric}”
                </h3>

                <p className="text-xs sm:text-sm text-[#3F4147]/80 font-medium">
                  <strong>Tugas Mulia:</strong> {currentLine.duty}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#AFC4D5]/20 rounded-full overflow-hidden mt-4">
                  <div
                    className="h-full bg-[#D9B8B8] rounded-full transition-all duration-300"
                    style={{ width: `${((currentLineIndex + 1) / LYRIC_LINES.length) * 100}%` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick jump to specific angel bait */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8AAA0]">
                Pilih Cepat Bait Malaikat:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {LYRIC_LINES.slice(1, 11).map((l, idx) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setCurrentLineIndex(l.id);
                      playChime(440 + idx * 35);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center truncate ${
                      currentLineIndex === l.id
                        ? 'bg-[#3F4147] text-white border-[#3F4147] shadow-xs'
                        : 'bg-[#F8F5F0] border-[#AFC4D5]/30 text-[#3F4147] hover:bg-white'
                    }`}
                  >
                    {l.angel}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Complete List of 10 Angels and Duties */}
        {activeTab === 'daftar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {LYRIC_LINES.slice(1, 11).map((item, index) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-[#AFC4D5]/30 bg-[#FAF7F4] hover:bg-white transition-all flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-white border border-[#AFC4D5]/35 flex items-center justify-center text-xs font-bold font-mono text-[#3F4147] shrink-0">
                  {index + 1}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-display text-base text-[#3F4147] font-semibold">
                      {item.angel}
                    </span>
                    <span className="font-arabic-text text-sm text-[#3F4147]/70">
                      ({item.arabicName})
                    </span>
                  </div>
                  <p className="text-xs text-[#3F4147]/80 leading-relaxed">
                    <strong>Tugas:</strong> {item.duty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Quick Links to other PAI activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onGoToQuiz}
          className="group flex items-center justify-between p-4 rounded-2xl border-2 border-[#D9B8B8]/40 bg-white hover:border-[#D9B8B8] shadow-xs hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D9B8B8]/20 flex items-center justify-center text-[#3F4147] group-hover:bg-[#D9B8B8] group-hover:text-white transition-colors">
              <HelpCircle size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                Uji Pemahaman
              </span>
              <h4 className="font-serif-display text-base text-[#3F4147]">
                Kuis Interaktif PAI
              </h4>
            </div>
          </div>
          <ArrowRight size={18} className="text-[#3F4147] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onGoToWordSearch}
          className="group flex items-center justify-between p-4 rounded-2xl border-2 border-[#C8BDD8]/40 bg-white hover:border-[#C8BDD8] shadow-xs hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8BDD8]/20 flex items-center justify-center text-[#3F4147] group-hover:bg-[#C8BDD8] group-hover:text-white transition-colors">
              <Search size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8AAA0]">
                Teka-Teki Huruf
              </span>
              <h4 className="font-serif-display text-base text-[#3F4147]">
                Game Cari Kata 10 Malaikat
              </h4>
            </div>
          </div>
          <ArrowRight size={18} className="text-[#3F4147] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* =========================================================================
          DISCREET TEACHER CONFIGURATION MODAL:
          Allows the teacher to update the destination URL (e.g. to Google Drive or custom video)
          WITHOUT displaying the URL publicly on the slide/smartboard.
      ========================================================================= */}
      <AnimatePresence>
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#AFC4D5]/40 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#AFC4D5]/20">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-[#3F4147]" />
                  <h3 className="font-serif-display text-lg text-[#3F4147]">
                    Pengaturan Tautan Video
                  </h3>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="p-1 rounded-lg text-[#3F4147]/60 hover:text-[#3F4147] hover:bg-[#F8F5F0]"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-[#3F4147]/75 leading-relaxed">
                Pengaturan ini hanya untuk Guru/Pengajar. Masukkan tautan video Google Drive atau media pembelajaran sekolah. Tautan ini tidak akan ditampilkan pada slide Smartboard siswa.
              </p>

              <form onSubmit={handleSaveUrl} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3F4147]">
                    Tautan Video Tujuan Tombol MULAI:
                  </label>
                  <input
                    type="url"
                    required
                    value={tempUrlInput}
                    onChange={(e) => setTempUrlInput(e.target.value)}
                    placeholder="https://drive.google.com/... atau https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#AFC4D5]/50 text-xs text-[#3F4147] focus:outline-none focus:ring-2 focus:ring-[#AFC4D5]"
                  />
                </div>

                {urlSavedFeedback && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <Check size={14} />
                    <span>Tautan berhasil diperbarui!</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleResetToDefaultUrl}
                    className="text-xs text-[#B8AAA0] hover:text-[#3F4147] flex items-center gap-1 underline"
                  >
                    <RefreshCw size={13} />
                    <span>Kembalikan ke Default</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowConfigModal(false)}
                      className="px-3.5 py-2 rounded-xl border border-[#AFC4D5]/30 text-xs font-semibold text-[#3F4147] hover:bg-[#F8F5F0]"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#3F4147] text-white text-xs font-semibold shadow-xs hover:bg-[#2B2D31]"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
