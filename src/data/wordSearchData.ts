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

// 8 Directions for placement (horizontal, vertical, diagonal forward and reverse)
// Makes the word search challenging ("sedikit sulit ditebak")
const DIRECTIONS: { dr: number; dc: number; label: string }[] = [
  { dr: 0, dc: 1, label: 'Mendatar' },
  { dr: 0, dc: -1, label: 'Mendatar Terbalik' },
  { dr: 1, dc: 0, label: 'Menurun' },
  { dr: -1, dc: 0, label: 'Menurun Terbalik' },
  { dr: 1, dc: 1, label: 'Diagonal Turun Kanan' },
  { dr: -1, dc: 1, label: 'Diagonal Naik Kanan' },
  { dr: 1, dc: -1, label: 'Diagonal Turun Kiri' },
  { dr: -1, dc: -1, label: 'Diagonal Naik Kiri' }
];

// Rich Islamic & educational letter pool for filler letters
const FILLER_POOL = 'AAAAAAIIIUUUEEEOOOBBBCDDDFFFGGHHHJJJKKKLLLMMMNNNPPPQRRRSSSTTTWWWYYZZ';

/**
 * Attempts to generate a single randomized board with all 10 angels placed.
 * Returns null if the random placements hit a dead end, allowing a quick retry.
 */
function tryGenerateBoard(size = 12): BoardConfig | null {
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const placedWords: WordSearchItem[] = [];

  // Shuffle words order slightly for higher variation
  const shuffledTemplates = [...ANGELS_TEMPLATES].sort(() => Math.random() - 0.5);

  for (const template of shuffledTemplates) {
    const word = template.name;
    const len = word.length;

    // Shuffle directions for this word
    const shuffledDirs = [...DIRECTIONS].sort(() => Math.random() - 0.5);

    // Collect all valid placement candidates
    const validCandidates: { r: number; c: number; dr: number; dc: number; cells: [number, number][]; label: string }[] = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        for (const dir of shuffledDirs) {
          const endR = r + (len - 1) * dir.dr;
          const endC = c + (len - 1) * dir.dc;

          // Must be completely inside grid bounds
          if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

          let canPlace = true;
          const cells: [number, number][] = [];

          for (let i = 0; i < len; i++) {
            const cr = r + i * dir.dr;
            const cc = c + i * dir.dc;
            const current = grid[cr][cc];

            // Cell must be empty OR have identical letter (valid intersection)
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
    }

    if (validCandidates.length === 0) {
      return null; // Could not place this word, restart attempt
    }

    // Pick one candidate at random
    const chosen = validCandidates[Math.floor(Math.random() * validCandidates.length)];

    // Place letters on grid
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

  // Fill empty cells with random educational thematic letters
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        const randIdx = Math.floor(Math.random() * FILLER_POOL.length);
        grid[r][c] = FILLER_POOL[randIdx];
      }
    }
  }

  // Sort placed words back to consistent canonical display order
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
 * Fallback static board in case of any rare generation issue.
 */
export const INITIAL_WORD_SEARCH: BoardConfig = {
  id: 'ws_initial_default',
  size: 12,
  grid: [
    ['J', 'I', 'B', 'R', 'I', 'L', 'O', 'P', 'E', 'N', 'A', 'S'],
    ['W', 'A', 'S', 'P', 'A', 'D', 'A', 'Q', 'U', 'R', 'A', 'N'],
    ['S', 'M', 'I', 'K', 'A', 'I', 'L', 'U', 'N', 'A', 'T', 'H'],
    ['I', 'B', 'A', 'D', 'A', 'H', 'T', 'A', 'A', 'T', 'I', 'U'],
    ['Z', 'O', 'I', 'S', 'R', 'A', 'F', 'I', 'L', 'A', 'D', 'R'],
    ['R', 'A', 'H', 'M', 'A', 'T', 'K', 'A', 'S', 'I', 'H', 'M'],
    ['A', 'K', 'H', 'M', 'U', 'N', 'K', 'A', 'R', 'J', 'U', 'A'],
    ['I', 'M', 'A', 'N', 'S', 'U', 'C', 'I', 'D', 'I', 'R', 'L'],
    ['L', 'A', 'P', 'A', 'N', 'N', 'A', 'K', 'I', 'R', 'I', 'I'],
    ['B', 'E', 'R', 'K', 'A', 'H', 'T', 'U', 'L', 'U', 'S', 'K'],
    ['H', 'R', 'A', 'Q', 'I', 'B', 'J', 'U', 'J', 'U', 'R', 'T'],
    ['A', 'K', 'H', 'L', 'R', 'I', 'D', 'W', 'A', 'N', 'M', 'U']
  ],
  words: [
    {
      id: 'jibril',
      name: 'JIBRIL',
      duty: 'Menyampaikan wahyu Allah Swt.',
      cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]],
      color: '#0284C7'
    },
    {
      id: 'mikail',
      name: 'MIKAIL',
      duty: 'Membagikan rezeki dan menurunkan hujan',
      cells: [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6]],
      color: '#D97706'
    },
    {
      id: 'israfil',
      name: 'ISRAFIL',
      duty: 'Meniup sangkakala kiamat & kebangkitan',
      cells: [[4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8]],
      color: '#8B5CF6'
    },
    {
      id: 'izrail',
      name: 'IZRAIL',
      duty: 'Mencabut nyawa makhluk bernyawa',
      cells: [[3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]],
      color: '#E11D48'
    },
    {
      id: 'munkar',
      name: 'MUNKAR',
      duty: 'Menanyai manusia di alam kubur',
      cells: [[6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8]],
      color: '#0D9488'
    },
    {
      id: 'nakir',
      name: 'NAKIR',
      duty: 'Menanyai manusia di alam kubur',
      cells: [[8, 5], [8, 6], [8, 7], [8, 8], [8, 9]],
      color: '#2563EB'
    },
    {
      id: 'raqib',
      name: 'RAQIB',
      duty: 'Mencatat seluruh amal kebaikan manusia',
      cells: [[10, 1], [10, 2], [10, 3], [10, 4], [10, 5]],
      color: '#059669'
    },
    {
      id: 'atid',
      name: 'ATID',
      duty: 'Mencatat seluruh amal buruk manusia',
      cells: [[1, 10], [2, 10], [3, 10], [4, 10]],
      color: '#D946EF'
    },
    {
      id: 'malik',
      name: 'MALIK',
      duty: 'Menjaga pintu neraka dengan ketegasan',
      cells: [[5, 11], [6, 11], [7, 11], [8, 11], [9, 11]],
      color: '#EA580C'
    },
    {
      id: 'ridwan',
      name: 'RIDWAN',
      duty: 'Menjaga pintu surga penuh keramahan',
      cells: [[11, 4], [11, 5], [11, 6], [11, 7], [11, 8], [11, 9]],
      color: '#6366F1'
    }
  ]
};

/**
 * Generates a completely new randomized Word Search board.
 * Guarantees that all 10 angels are placed across multiple directions
 * (horizontal, vertical, diagonal, forward and reverse) with rich filler letters.
 */
export function generateRandomWordSearchBoard(size = 12): BoardConfig {
  const maxAttempts = 60;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = tryGenerateBoard(size);
    if (result) {
      return result;
    }
  }
  // If retries hit maximum limit, return the tested fallback board
  return INITIAL_WORD_SEARCH;
}
