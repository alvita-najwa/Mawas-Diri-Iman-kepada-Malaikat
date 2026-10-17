import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearningProgress } from './hooks/useLearningProgress';
import { useQuizProgress } from './hooks/useQuizProgress';
import { useWordSearchProgress } from './hooks/useWordSearchProgress';
import { Navbar, AppTab } from './components/Navigation/Navbar';
import { BottomNav } from './components/Navigation/BottomNav';
import { CelestialBackgroundPattern } from './components/Decorations/IslamicGeometry';

// Learning Module Pages
import { LandingPage } from './pages/01_LandingPage';
import { PemantikPage } from './pages/02_PemantikPage';
import { AgendaKegiatanPage } from './pages/02b_AgendaKegiatanPage';
import { PembagianKelompokPage } from './pages/02c_PembagianKelompokPage';
import { MainMenuPage } from './pages/03_MainMenuPage';
import { DefinitionPage } from './pages/04_DefinitionPage';
import { RukunImanPage } from './pages/05_RukunImanPage';
import { DalilPage } from './pages/06_DalilPage';
import { AngelTraitsPage } from './pages/07_AngelTraitsPage';
import { ComparisonPage } from './pages/08_ComparisonPage';
import { AngelTasksPage } from './pages/09_AngelTasksPage';
import { RaqibAtidPage } from './pages/10_RaqibAtidPage';
import { WisdomPage } from './pages/11_WisdomPage';
import { MawasDiriPage } from './pages/12_MawasDiriPage';
import { MawasDiriIntrospeksiPage } from './pages/14_MawasDiriIntrospeksiPage';
import { DailyLifePage } from './pages/15_DailyLifePage';
import { ReflectionPage } from './pages/16_ReflectionPage';
import { ConclusionPage } from './pages/17_ConclusionPage';
import { VideoLaguPage } from './pages/VideoLaguPage';
import { GroupScoreboardPage } from './pages/GroupScoreboardPage';

// Interactive Activities
import { InteractiveQuiz } from './components/Quiz/InteractiveQuiz';
import { WordSearchGame } from './components/WordSearch/WordSearchGame';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('beranda');
  const quizProgress = useQuizProgress();
  const wordSearchProgress = useWordSearchProgress();

  const {
    currentPage,
    totalPages,
    visitedPages,
    reflection,
    progressPercentage,
    goToPage,
    nextPage,
    prevPage,
    saveReflection,
    resetProgress
  } = useLearningProgress();

  const handleStartMateri = () => {
    setActiveTab('materi');
    goToPage(2);
  };

  const handleGoToQuiz = () => {
    quizProgress.autoAdvanceToNextUnanswered();
    setActiveTab('kuis');
  };

  const handleSelectTab = (tab: AppTab) => {
    if (tab === 'kuis') {
      quizProgress.autoAdvanceToNextUnanswered();
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    // Top-Level Interactive Activity: Papan Skor Kelompok
    if (activeTab === 'papan-skor') {
      return (
        <GroupScoreboardPage
          onBackToHome={() => setActiveTab('beranda')}
          onGoToMateri={() => {
            setActiveTab('materi');
            goToPage(3);
          }}
          onGoToQuiz={handleGoToQuiz}
          onGoToWordSearch={() => setActiveTab('cari-kata')}
          currentQuizNumber={quizProgress.nextUnansweredNumber}
          totalQuizQuestions={quizProgress.totalQuestions}
        />
      );
    }

    // Top-Level Interactive Activity: Video & Lagu 10 Malaikat
    if (activeTab === 'video-lagu') {
      return (
        <VideoLaguPage
          onBackToHome={() => setActiveTab('beranda')}
          onGoToQuiz={handleGoToQuiz}
          onGoToWordSearch={() => setActiveTab('cari-kata')}
        />
      );
    }

    // Top-Level Interactive Activity: Kuis
    if (activeTab === 'kuis') {
      return (
        <InteractiveQuiz
          onBackToHome={() => setActiveTab('beranda')}
          onGoToMateri={() => {
            setActiveTab('materi');
            goToPage(3);
          }}
          onGoToScoreboard={() => setActiveTab('papan-skor')}
          quizProgress={quizProgress}
        />
      );
    }

    // Top-Level Interactive Activity: Game Cari Kata
    if (activeTab === 'cari-kata') {
      return (
        <WordSearchGame
          onBackToHome={() => setActiveTab('beranda')}
          onGoToQuiz={handleGoToQuiz}
          onGoToScoreboard={() => setActiveTab('papan-skor')}
          wordSearchProgress={wordSearchProgress}
        />
      );
    }

    // Landing / Beranda with navigation portal choices
    if (activeTab === 'beranda' || (activeTab === 'materi' && currentPage === 1)) {
      return (
        <LandingPage
          onStartMateri={handleStartMateri}
          onGoToVideoLagu={() => setActiveTab('video-lagu')}
          onGoToQuiz={handleGoToQuiz}
          onGoToWordSearch={() => setActiveTab('cari-kata')}
          onGoToScoreboard={() => setActiveTab('papan-skor')}
        />
      );
    }

    // Guided Learning Modules (Materi)
    switch (currentPage) {
      case 2:
        return <PemantikPage onContinue={() => goToPage(3)} />;
      case 3:
        return (
          <MainMenuPage
            onSelectPage={goToPage}
            visitedPages={visitedPages}
            progressPercentage={progressPercentage}
          />
        );
      case 4:
        return <DefinitionPage />;
      case 5:
        return <RukunImanPage />;
      case 6:
        return <DalilPage />;
      case 7:
        return <AngelTraitsPage />;
      case 8:
        return <ComparisonPage />;
      case 9:
        return <AngelTasksPage />;
      case 10:
        return <RaqibAtidPage />;
      case 11:
        return <WisdomPage />;
      case 12:
        return <MawasDiriPage />;
      case 13:
        return <MawasDiriIntrospeksiPage />;
      case 14:
        return <DailyLifePage />;
      case 15:
        return (
          <ReflectionPage
            initialReflection={reflection}
            onSaveReflection={saveReflection}
            onNext={() => goToPage(16)}
          />
        );
      case 16:
        return (
          <ConclusionPage
            onRestart={() => {
              goToPage(1);
            }}
            onGoToMenu={() => goToPage(3)}
            reflection={reflection}
          />
        );
      default:
        return (
          <LandingPage
            onStartMateri={handleStartMateri}
            onGoToVideoLagu={() => setActiveTab('video-lagu')}
            onGoToQuiz={handleGoToQuiz}
            onGoToWordSearch={() => setActiveTab('cari-kata')}
            onGoToScoreboard={() => setActiveTab('papan-skor')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#3F4147] flex flex-col justify-between relative selection:bg-[#AFC4D5]/30 selection:text-[#3F4147]">
      {/* Abstract Celestial Background */}
      <CelestialBackgroundPattern />

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        totalPages={totalPages}
        progressPercentage={progressPercentage}
        visitedPages={visitedPages}
        goToPage={goToPage}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Content Viewport with Framer Motion Transition */}
      <main className="flex-1 w-full pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab === 'materi' ? `materi-${currentPage}` : activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav Controls (displayed only when reading guided learning modules) */}
      {activeTab === 'materi' && currentPage > 1 && (
        <BottomNav
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
          hideHome={currentPage === 3}
          nextLabel={currentPage === 15 ? 'SELESAI' : 'NEXT'}
          prevLabel="BACK"
        />
      )}
    </div>
  );
}
