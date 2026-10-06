import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLearningProgress } from './hooks/useLearningProgress';
import { Navbar } from './components/Navigation/Navbar';
import { BottomNav } from './components/Navigation/BottomNav';
import { CelestialBackgroundPattern } from './components/Decorations/IslamicGeometry';

// Pages
import { LandingPage } from './pages/01_LandingPage';
import { PemantikPage } from './pages/02_PemantikPage';
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

export default function App() {
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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <LandingPage
            onStart={() => goToPage(2)}
            onExploreMenu={() => goToPage(3)}
          />
        );
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
            onStart={() => goToPage(2)}
            onExploreMenu={() => goToPage(3)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#3F4147] flex flex-col justify-between relative selection:bg-[#AFC4D5]/30 selection:text-[#3F4147]">
      {/* Abstract Celestial Background */}
      <CelestialBackgroundPattern />

      {/* Persistent Global Navbar */}
      <Navbar
        currentPage={currentPage}
        totalPages={totalPages}
        progressPercentage={progressPercentage}
        visitedPages={visitedPages}
        goToPage={goToPage}
      />

      {/* Main Content Viewport with Framer Motion Page Transition */}
      <main className="flex-1 w-full pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Global Bottom Controls */}
      <BottomNav
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
        hideHome={currentPage === 1 || currentPage === 3}
        nextLabel={currentPage === 1 ? 'START' : currentPage === 15 ? 'SELESAI' : 'NEXT'}
        prevLabel="BACK"
      />
    </div>
  );
}
