import { useState, useCallback } from 'react';
import {
  BoardConfig,
  generateRandomWordSearchBoard,
  partialShuffleWordSearchBoard
} from '../data/wordSearchData';

export function useWordSearchProgress() {
  // Every page refresh generates a brand new randomized board layout (horizontal & vertical only)
  const [board, setBoard] = useState<BoardConfig>(() => generateRandomWordSearchBoard());
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [lastFoundMessage, setLastFoundMessage] = useState<string | null>(null);

  // Full reset: re-generate a completely brand new layout (when explicitly restarting)
  const shuffleBoard = useCallback(() => {
    const newBoard = generateRandomWordSearchBoard();
    setBoard(newBoard);
    setFoundWords([]);
    setLastFoundMessage('Tata letak kata baru berhasil diacak! Silakan cari kembali 10 nama malaikat.');
  }, []);

  // Partial reshuffle: ONLY reshuffles unfound words and filler letters; found words remain strictly locked!
  const partialShuffle = useCallback(() => {
    setBoard((currentBoard) => {
      return partialShuffleWordSearchBoard(currentBoard, foundWords);
    });
  }, [foundWords]);

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
    setLastFoundMessage(`Benar! Kata Malaikat ${wordName} berhasil ditemukan!`);
  }, []);

  return {
    board,
    foundWords,
    lastFoundMessage,
    setLastFoundMessage,
    shuffleBoard,
    partialShuffle,
    resetCurrentBoard,
    addFoundWord,
    isCompleted: foundWords.length === board.words.length && board.words.length > 0
  };
}
