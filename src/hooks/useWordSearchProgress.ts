import { useState, useCallback } from 'react';
import { BoardConfig, generateRandomWordSearchBoard } from '../data/wordSearchData';

export function useWordSearchProgress() {
  // Every page refresh generates a brand new randomized board layout
  const [board, setBoard] = useState<BoardConfig>(() => generateRandomWordSearchBoard());
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [lastFoundMessage, setLastFoundMessage] = useState<string | null>(null);

  // Re-generate a brand new layout anytime (explicit shuffle)
  const shuffleBoard = useCallback(() => {
    const newBoard = generateRandomWordSearchBoard();
    setBoard(newBoard);
    setFoundWords([]);
    setLastFoundMessage('Tata letak kata baru berhasil diacak! Silakan cari kembali 10 nama malaikat.');
  }, []);

  // Clear found words on current board without changing layout
  const resetCurrentBoard = useCallback(() => {
    setFoundWords([]);
    setLastFoundMessage('Pencarian pada tata letak ini diulangi dari awal.');
  }, []);

  const addFoundWord = useCallback((wordId: string, wordName: string, duty: string) => {
    setFoundWords((prev) => {
      if (prev.includes(wordId)) return prev;
      return [...prev, wordId];
    });
    setLastFoundMessage(`Malaikat ${wordName} berhasil ditemukan! (${duty})`);
  }, []);

  return {
    board,
    foundWords,
    lastFoundMessage,
    setLastFoundMessage,
    shuffleBoard,
    resetCurrentBoard,
    addFoundWord,
    isCompleted: foundWords.length === board.words.length && board.words.length > 0
  };
}
