import { useState, useEffect, useCallback } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';

const STORAGE_KEYS = {
  ANSWERS: 'mawas_diri_quiz_answers',
  CURRENT_INDEX: 'mawas_diri_quiz_current_index',
  COMPLETED: 'mawas_diri_quiz_completed'
};

export function useQuizProgress() {
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Initialize selectedAnswers from localStorage
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return {};
  });

  // Initialize isCompleted from localStorage
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      if (saved) {
        return JSON.parse(saved) === true;
      }
    } catch {
      // fallback
    }
    return false;
  });

  // Initialize currentIndex from localStorage, but with smart auto-advance
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const savedAnswersRaw = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      const answers: Record<number, number> = savedAnswersRaw ? JSON.parse(savedAnswersRaw) : {};
      const savedIndexRaw = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
      let idx = savedIndexRaw ? parseInt(savedIndexRaw, 10) : 0;

      if (isNaN(idx) || idx < 0 || idx >= totalQuestions) {
        idx = 0;
      }

      // If the saved question at this index was ALREADY answered,
      // auto-advance to the next question so user doesn't repeat!
      if (answers[idx] !== undefined) {
        // Look for next unanswered question starting from idx + 1
        let nextUnanswered = -1;
        for (let i = idx + 1; i < totalQuestions; i++) {
          if (answers[i] === undefined) {
            nextUnanswered = i;
            break;
          }
        }

        // If not found ahead, check from beginning
        if (nextUnanswered === -1) {
          for (let i = 0; i < totalQuestions; i++) {
            if (answers[i] === undefined) {
              nextUnanswered = i;
              break;
            }
          }
        }

        if (nextUnanswered !== -1) {
          return nextUnanswered;
        } else {
          // All questions answered
          return Math.max(0, totalQuestions - 1);
        }
      }

      return idx;
    } catch {
      return 0;
    }
  });

  // Auto-advance check helper to be invoked when entering quiz or switching tabs
  const autoAdvanceToNextUnanswered = useCallback(() => {
    setSelectedAnswers((currentAnswers) => {
      // Check if all questions are answered
      const answeredKeys = Object.keys(currentAnswers).map(Number);
      if (answeredKeys.length >= totalQuestions && totalQuestions > 0) {
        setIsCompleted(true);
        localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(true));
        return currentAnswers;
      }

      setCurrentIndex((currentIdx) => {
        // If the question currently in view has already been answered,
        // automatically advance to the next unanswered question!
        if (currentAnswers[currentIdx] !== undefined) {
          // Look forward first
          for (let i = currentIdx + 1; i < totalQuestions; i++) {
            if (currentAnswers[i] === undefined) {
              localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, i.toString());
              return i;
            }
          }
          // Wrap around if needed
          for (let i = 0; i < totalQuestions; i++) {
            if (currentAnswers[i] === undefined) {
              localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, i.toString());
              return i;
            }
          }
        }
        return currentIdx;
      });

      return currentAnswers;
    });
  }, [totalQuestions]);

  // Persist selectedAnswers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(selectedAnswers));
    } catch {
      // ignore
    }
  }, [selectedAnswers]);

  // Persist currentIndex to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex.toString());
    } catch {
      // ignore
    }
  }, [currentIndex]);

  // Persist isCompleted to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(isCompleted));
    } catch {
      // ignore
    }
  }, [isCompleted]);

  // Answer a question
  const selectOption = useCallback(
    (questionIdx: number, optionIdx: number) => {
      setSelectedAnswers((prev) => {
        const next = { ...prev, [questionIdx]: optionIdx };
        try {
          localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  // Manual next question
  const goToNextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, totalQuestions]);

  // Manual previous question
  const goToPrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Direct jump to a question
  const jumpToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
        setIsCompleted(false);
      }
    },
    [totalQuestions]
  );

  // Reset entire quiz with clean state
  const resetQuiz = useCallback(() => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_INDEX);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED);
    } catch {
      // ignore
    }
  }, []);

  // Next unanswered question index (0-indexed) or null
  const nextUnansweredIndex = (() => {
    for (let i = 0; i < totalQuestions; i++) {
      if (selectedAnswers[i] === undefined) {
        return i;
      }
    }
    return null;
  })();

  // Calculations
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIndex, optIndex]) => QUIZ_QUESTIONS[Number(qIndex)]?.correctIndex === optIndex
  ).length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    currentIndex,
    selectedAnswers,
    isCompleted,
    totalQuestions,
    answeredCount,
    correctCount,
    score,
    nextUnansweredIndex,
    nextUnansweredNumber: nextUnansweredIndex !== null ? nextUnansweredIndex + 1 : null,
    selectOption,
    goToNextQuestion,
    goToPrevQuestion,
    jumpToQuestion,
    resetQuiz,
    autoAdvanceToNextUnanswered,
    setIsCompleted
  };
}
