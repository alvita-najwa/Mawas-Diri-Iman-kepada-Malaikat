import { useState, useEffect, useCallback } from 'react';
import { ReflectionData } from '../types';

const TOTAL_PAGES = 18;
const STORAGE_KEYS = {
  CURRENT_PAGE: 'mawas_diri_current_page',
  VISITED_PAGES: 'mawas_diri_visited_pages',
  REFLECTION: 'mawas_diri_reflection'
};

const INITIAL_REFLECTION: ReflectionData = {
  cautiousSpeech: '',
  unseenHonesty: '',
  mistakesToFix: '',
  goodDeedGoal: ''
};

export function useLearningProgress() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visitedPages, setVisitedPages] = useState<number[]>([1]);
  const [reflection, setReflection] = useState<ReflectionData>(INITIAL_REFLECTION);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedPage = localStorage.getItem(STORAGE_KEYS.CURRENT_PAGE);
      if (savedPage) {
        const pageNum = parseInt(savedPage, 10);
        if (pageNum >= 1 && pageNum <= TOTAL_PAGES) {
          setCurrentPage(pageNum);
        }
      }

      const savedVisited = localStorage.getItem(STORAGE_KEYS.VISITED_PAGES);
      if (savedVisited) {
        const parsed = JSON.parse(savedVisited);
        if (Array.isArray(parsed)) {
          const sanitized = Array.from(
            new Set(parsed.filter((p): p is number => typeof p === 'number' && p >= 1 && p <= TOTAL_PAGES))
          );
          setVisitedPages(sanitized.length > 0 ? sanitized : [1]);
        }
      }

      const savedReflection = localStorage.getItem(STORAGE_KEYS.REFLECTION);
      if (savedReflection) {
        const parsed = JSON.parse(savedReflection);
        if (parsed) {
          setReflection(parsed);
        }
      }
    } catch {
      // LocalStorage fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save current page & visited pages whenever currentPage changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PAGE, currentPage.toString());
      setVisitedPages((prev) => {
        if (!prev.includes(currentPage) && currentPage <= TOTAL_PAGES) {
          const updated = Array.from(new Set([...prev, currentPage].filter(p => p >= 1 && p <= TOTAL_PAGES)));
          localStorage.setItem(STORAGE_KEYS.VISITED_PAGES, JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    } catch {
      // ignore
    }
  }, [currentPage, isLoaded]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const next = Math.min(prev + 1, TOTAL_PAGES);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => {
      const prevP = Math.max(prev - 1, 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return prevP;
    });
  }, []);

  const saveReflection = useCallback((data: Partial<ReflectionData>) => {
    setReflection((prev) => {
      const updated: ReflectionData = {
        ...prev,
        ...data,
        savedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem(STORAGE_KEYS.REFLECTION, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_PAGE);
      localStorage.removeItem(STORAGE_KEYS.VISITED_PAGES);
    } catch {
      // ignore
    }
    setVisitedPages([1]);
    setCurrentPage(1);
  }, []);

  const uniqueValidPages = Array.from(new Set(visitedPages.filter(p => p >= 1 && p <= TOTAL_PAGES)));
  const progressPercentage = Math.min(100, Math.max(0, Math.round((uniqueValidPages.length / TOTAL_PAGES) * 100)));

  return {
    currentPage,
    totalPages: TOTAL_PAGES,
    visitedPages,
    reflection,
    isLoaded,
    progressPercentage,
    goToPage,
    nextPage,
    prevPage,
    saveReflection,
    resetProgress
  };
}
