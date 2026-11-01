export interface WordSearchItem {
  id: string;
  name: string;
  duty: string;
  cells: [number, number][]; // [row, col]
  color: string;
  direction?: string;
}

export interface BoardConfig {
  id: string;
  size: number;
  grid: string[][];
  words: WordSearchItem[];
}

export interface AngelTemplate {
  id: string;
  name: string;
  duty: string;
  color: string;
}

export const ANGELS_TEMPLATES: AngelTemplate[] = [
  {
    id: 'israfil',
    name: 'ISRAFIL',
    duty: 'Meniup sangkakala kiamat & kebangkitan',
    color: '#8B5CF6' // Soft Purple
  },
  {
    id: 'jibril',
    name: 'JIBRIL',
    duty: 'Menyampaikan wahyu Allah Swt.',
    color: '#0284C7' // Sky Blue
  },
  {
    id: 'mikail',
    name: 'MIKAIL',
    duty: 'Membagikan rezeki dan menurunkan hujan',
    color: '#D97706' // Warm Amber
  },
  {
    id: 'izrail',
    name: 'IZRAIL',
    duty: 'Mencabut nyawa makhluk bernyawa',
    color: '#E11D48' // Rose Red
  },
  {
    id: 'munkar',
    name: 'MUNKAR',
    duty: 'Menanyai manusia di alam kubur',
    color: '#0D9488' // Slate Teal
  },
  {
    id: 'ridwan',
    name: 'RIDWAN',
    duty: 'Menjaga pintu surga penuh keramahan',
    color: '#6366F1' // Indigo
  },
  {
    id: 'nakir',
    name: 'NAKIR',
    duty: 'Menanyai manusia di alam kubur',
    color: '#2563EB' // Deep Blue
  },
  {
    id: 'raqib',
    name: 'RAQIB',
    duty: 'Mencatat seluruh amal kebaikan manusia',
    color: '#059669' // Emerald
  },
  {
    id: 'malik',
    name: 'MALIK',
    duty: 'Menjaga pintu neraka dengan ketegasan',
    color: '#EA580C' // Rust Orange
  },
  {
    id: 'atid',
    name: 'ATID',
    duty: 'Mencatat seluruh amal buruk manusia',
    color: '#D946EF' // Orchid Fuchsia
  }
];

// Only 2 simple directions for elementary school / junior high students:
// 1. Mendatar (Kiri ke Kanan)
// 2. Menurun (Atas ke Bawah)
// No diagonal, no reverse - very easy and accessible for children
const DIRECTIONS: { dr: number; dc: number; label: string }[] = [
  { dr: 0, dc: 1, label: 'Mendatar' },
  { dr: 1, dc: 0, label: 'Menurun' }
];

// Rich Islamic & educational letter pool for filler letters
const FILLER_POOL = 'AAAAAAIIIUUUEEEOOOBBBCDDDFFFGGHHHJJJKKKLLLMMMNNNPPPQRRRSSSTTTWWWYYZZ';

/**
 * Attempts to generate a single randomized board with all 10 angels placed.
 * STRICT REQUIREMENT: Exactly 5 words Mendatar (horizontal left-to-right)
 * and exactly 5 words Menurun (vertical top-to-bottom).
 */
function tryGenerateBoard(size = 10): BoardConfig | null {
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const placedWords: WordSearchItem[] = [];

  // Shuffle templates order slightly for variety
  const shuffledTemplates = [...ANGELS_TEMPLATES].sort(() => Math.random() - 0.5);

  // Exactly 5 words assigned to Mendatar and 5 words assigned to Menurun
  const assignedWords: {
    template: AngelTemplate;
    dir: { dr: number; dc: number; label: string };
  }[] = [
    ...shuffledTemplates.slice(0, 5).map((t) => ({
      template: t,
      dir: { dr: 0, dc: 1, label: 'Mendatar' }
    })),
    ...shuffledTemplates.slice(5, 10).map((t) => ({
      template: t,
      dir: { dr: 1, dc: 0, label: 'Menurun' }
    }))
  ];

  // Shuffle placement execution order
  assignedWords.sort(() => Math.random() - 0.5);

  for (const item of assignedWords) {
    const template = item.template;
    const dir = item.dir;
    const word = template.name;
    const len = word.length;

    const validCandidates: { r: number; c: number; dr: number; dc: number; cells: [number, number][]; label: string }[] = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const endR = r + (len - 1) * dir.dr;
        const endC = c + (len - 1) * dir.dc;

        if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

        let canPlace = true;
        const cells: [number, number][] = [];

        for (let i = 0; i < len; i++) {
          const cr = r + i * dir.dr;
          const cc = c + i * dir.dc;
          const current = grid[cr][cc];

          // Cell must be empty OR matching identical letter
          if (current !== '' && current !== word[i]) {
            canPlace = false;
            break;
          }
          cells.push([cr, cc]);
        }

        if (canPlace) {
          validCandidates.push({
            r,
            c,
            dr: dir.dr,
            dc: dir.dc,
            cells,
            label: dir.label
          });
        }
      }
    }

    if (validCandidates.length === 0) {
      return null; // Could not place this word, restart attempt
    }

    const chosen = validCandidates[Math.floor(Math.random() * validCandidates.length)];

    chosen.cells.forEach(([cr, cc], idx) => {
      grid[cr][cc] = word[idx];
    });

    placedWords.push({
      id: template.id,
      name: template.name,
      duty: template.duty,
      color: template.color,
      cells: chosen.cells,
      direction: chosen.label
    });
  }

  // Fill empty cells with random clean filler letters
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        const randIdx = Math.floor(Math.random() * FILLER_POOL.length);
        grid[r][c] = FILLER_POOL[randIdx];
      }
    }
  }

  const displayOrderMap = new Map(ANGELS_TEMPLATES.map((t, idx) => [t.id, idx]));
  placedWords.sort((a, b) => (displayOrderMap.get(a.id) ?? 0) - (displayOrderMap.get(b.id) ?? 0));

  const sessionId = `ws_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id: sessionId,
    size,
    grid,
    words: placedWords
  };
}

/**
 * Attempts a single partial reshuffle of unfound words while strictly preserving
 * found words, their coordinates, letters, and color highlights.
 * Preserves the ratio of exactly 5 Mendatar and 5 Menurun across the board.
 */
function tryPartialShuffle(
  currentBoard: BoardConfig,
  foundWordIds: string[]
): BoardConfig | null {
  const size = currentBoard.size;
  const newGrid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));

  // 1. Lock already found words exactly at their original cells
  const keptFoundWords: WordSearchItem[] = [];
  const lockedCells = new Set<string>();
  let foundMendatar = 0;
  let foundMenurun = 0;

  for (const item of currentBoard.words) {
    if (foundWordIds.includes(item.id)) {
      keptFoundWords.push({ ...item });
      item.cells.forEach(([r, c], idx) => {
        newGrid[r][c] = item.name[idx];
        lockedCells.add(`${r},${c}`);
      });
      const isMendatar = item.cells[0][0] === item.cells[1]?.[0] || item.direction === 'Mendatar';
      if (isMendatar) {
        foundMendatar++;
      } else {
        foundMenurun++;
      }
    }
  }

  // 2. Identify remaining unfound words to be repositioned
  const unfoundTemplates = ANGELS_TEMPLATES.filter((t) => !foundWordIds.includes(t.id));
  if (unfoundTemplates.length === 0) {
    return currentBoard;
  }

  // Exactly fill remaining slots to reach 5 Mendatar and 5 Menurun
  const neededMendatar = Math.max(0, 5 - foundMendatar);
  const shuffledUnfound = [...unfoundTemplates].sort(() => Math.random() - 0.5);

  const assignedUnfound = shuffledUnfound.map((template, idx) => ({
    template,
    dir: idx < neededMendatar
      ? { dr: 0, dc: 1, label: 'Mendatar' }
      : { dr: 1, dc: 0, label: 'Menurun' }
  }));

  const newPlacedWords: WordSearchItem[] = [];

  for (const item of assignedUnfound) {
    const template = item.template;
    const dir = item.dir;
    const word = template.name;
    const len = word.length;

    const validCandidates: { r: number; c: number; dr: number; dc: number; cells: [number, number][]; label: string }[] = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const endR = r + (len - 1) * dir.dr;
        const endC = c + (len - 1) * dir.dc;

        if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

        let canPlace = true;
        const cells: [number, number][] = [];

        for (let i = 0; i < len; i++) {
          const cr = r + i * dir.dr;
          const cc = c + i * dir.dc;
          const current = newGrid[cr][cc];

          if (current !== '' && current !== word[i]) {
            canPlace = false;
            break;
          }
          cells.push([cr, cc]);
        }

        if (canPlace) {
          validCandidates.push({
            r,
            c,
            dr: dir.dr,
            dc: dir.dc,
            cells,
            label: dir.label
          });
        }
      }
    }

    if (validCandidates.length === 0) {
      return null;
    }

    const chosen = validCandidates[Math.floor(Math.random() * validCandidates.length)];

    chosen.cells.forEach(([cr, cc], idx) => {
      newGrid[cr][cc] = word[idx];
    });

    newPlacedWords.push({
      id: template.id,
      name: template.name,
      duty: template.duty,
      color: template.color,
      cells: chosen.cells,
      direction: chosen.label
    });
  }

  // 3. Fill remaining unoccupied cells
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (newGrid[r][c] === '') {
        const randIdx = Math.floor(Math.random() * FILLER_POOL.length);
        newGrid[r][c] = FILLER_POOL[randIdx];
      }
    }
  }

  const allWords = [...keptFoundWords, ...newPlacedWords];
  const displayOrderMap = new Map(ANGELS_TEMPLATES.map((t, idx) => [t.id, idx]));
  allWords.sort((a, b) => (displayOrderMap.get(a.id) ?? 0) - (displayOrderMap.get(b.id) ?? 0));

  return {
    id: `ws_partial_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    size,
    grid: newGrid,
    words: allWords
  };
}

/**
 * 10x10 default board:
 * EXACTLY 5 Mendatar (horizontal) and 5 Menurun (vertical).
 * 
 * 5 Mendatar:
 * 1. JIBRIL (Row 0, Col 0..5)
 * 2. MIKAIL (Row 2, Col 0..5)
 * 3. ISRAFIL (Row 4, Col 0..6)
 * 4. MUNKAR (Row 6, Col 0..5)
 * 5. RIDWAN (Row 8, Col 0..5)
 * 
 * 5 Menurun:
 * 6. IZRAIL (Row 0..5, Col 7)
 * 7. MALIK (Row 0..4, Col 8)
 * 8. RAQIB (Row 0..4, Col 9)
 * 9. NAKIR (Row 5..9, Col 8)
 * 10. ATID (Row 5..8, Col 9)
 */
export const INITIAL_WORD_SEARCH: BoardConfig = {
  id: 'ws_initial_5mendatar_5menurun',
  size: 10,
  grid: [
    ['J', 'I', 'B', 'R', 'I', 'L', 'S', 'I', 'M', 'R'],
    ['A', 'M', 'A', 'N', 'A', 'H', 'B', 'Z', 'A', 'A'],
    ['M', 'I', 'K', 'A', 'I', 'L', 'D', 'R', 'L', 'Q'],
    ['T', 'A', 'A', 'T', 'O', 'K', 'I', 'A', 'I', 'I'],
    ['I', 'S', 'R', 'A', 'F', 'I', 'L', 'I', 'K', 'B'],
    ['B', 'A', 'I', 'K', 'D', 'O', 'A', 'L', 'N', 'A'],
    ['M', 'U', 'N', 'K', 'A', 'R', 'H', 'U', 'A', 'T'],
    ['S', 'O', 'P', 'A', 'N', 'B', 'U', 'D', 'K', 'I'],
    ['R', 'I', 'D', 'W', 'A', 'N', 'A', 'I', 'I', 'D'],
    ['I', 'K', 'H', 'L', 'A', 'S', 'P', 'A', 'R', 'H']
  ],
  words: [
    // 5 Mendatar:
    {
      id: 'jibril',
      name: 'JIBRIL',
      duty: 'Menyampaikan wahyu Allah Swt.',
      cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]],
      color: '#0284C7',
      direction: 'Mendatar'
    },
    {
      id: 'mikail',
      name: 'MIKAIL',
      duty: 'Membagikan rezeki dan menurunkan hujan',
      cells: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]],
      color: '#D97706',
      direction: 'Mendatar'
    },
    {
      id: 'israfil',
      name: 'ISRAFIL',
      duty: 'Meniup sangkakala kiamat & kebangkitan',
      cells: [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6]],
      color: '#8B5CF6',
      direction: 'Mendatar'
    },
    {
      id: 'munkar',
      name: 'MUNKAR',
      duty: 'Menanyai manusia di alam kubur',
      cells: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5]],
      color: '#0D9488',
      direction: 'Mendatar'
    },
    {
      id: 'ridwan',
      name: 'RIDWAN',
      duty: 'Menjaga pintu surga penuh keramahan',
      cells: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5]],
      color: '#6366F1',
      direction: 'Mendatar'
    },
    // 5 Menurun:
    {
      id: 'izrail',
      name: 'IZRAIL',
      duty: 'Mencabut nyawa makhluk bernyawa',
      cells: [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]],
      color: '#E11D48',
      direction: 'Menurun'
    },
    {
      id: 'malik',
      name: 'MALIK',
      duty: 'Menjaga pintu neraka dengan ketegasan',
      cells: [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8]],
      color: '#EA580C',
      direction: 'Menurun'
    },
    {
      id: 'raqib',
      name: 'RAQIB',
      duty: 'Mencatat seluruh amal kebaikan manusia',
      cells: [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9]],
      color: '#059669',
      direction: 'Menurun'
    },
    {
      id: 'nakir',
      name: 'NAKIR',
      duty: 'Menanyai manusia di alam kubur',
      cells: [[5, 8], [6, 8], [7, 8], [8, 8], [9, 8]],
      color: '#2563EB',
      direction: 'Menurun'
    },
    {
      id: 'atid',
      name: 'ATID',
      duty: 'Mencatat seluruh amal buruk manusia',
      cells: [[5, 9], [6, 9], [7, 9], [8, 9]],
      color: '#D946EF',
      direction: 'Menurun'
    }
  ]
};

/**
 * Generates a randomized Word Search board (size 10x10).
 * Guarantees exactly 5 Mendatar and 5 Menurun words.
 */
export function generateRandomWordSearchBoard(size = 10): BoardConfig {
  const maxAttempts = 80;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = tryGenerateBoard(size);
    if (result) {
      return result;
    }
  }
  return INITIAL_WORD_SEARCH;
}

/**
 * Reshuffles only the unfound words and empty filler letters,
 * while strictly locking and keeping found words at their exact coordinates and colors.
 * Keeps exactly 5 Mendatar and 5 Menurun on the board.
 */
export function partialShuffleWordSearchBoard(
  currentBoard: BoardConfig,
  foundWordIds: string[]
): BoardConfig {
  if (foundWordIds.length === currentBoard.words.length) {
    return currentBoard; // All words already found
  }
  const maxAttempts = 80;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = tryPartialShuffle(currentBoard, foundWordIds);
    if (result) {
      return result;
    }
  }
  return currentBoard;
}
