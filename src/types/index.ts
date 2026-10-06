export type NaraPose =
  | 'greeting'
  | 'thinking'
  | 'explaining'
  | 'pointing'
  | 'curious'
  | 'happy'
  | 'reflecting'
  | 'celebrating';

export interface AngelData {
  id: string;
  name: string;
  arabicName: string;
  duty: string;
  category: string;
  symbol: string;
  description: string;
  reflection: string;
}

export interface ReflectionData {
  cautiousSpeech: string;
  unseenHonesty: string;
  mistakesToFix: string;
  goodDeedGoal: string;
  savedAt?: string;
}

export interface LearningModule {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  pageNumber: number;
  category: 'Dasar' | 'Karakteristik' | 'Tugas & Catatan' | 'Penerapan Diri';
  icon: string;
}
