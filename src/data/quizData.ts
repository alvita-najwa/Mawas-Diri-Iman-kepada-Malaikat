export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Hakikat Iman' | 'Tugas Malaikat' | 'Mawas Diri' | 'Introspeksi';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Berdasarkan ajaran Islam, malaikat diciptakan oleh Allah Swt. dari...',
    options: [
      'Tanah liat yang kering',
      'Cahaya (nur)',
      'Api yang menyala-nyala (nar)',
      'Hawa dan angin kencang'
    ],
    correctIndex: 1,
    explanation: 'Rasulullah saw. bersabda dalam hadis riwayat Muslim bahwa malaikat diciptakan dari cahaya (nur), jin diciptakan dari nyala api, dan manusia dari apa yang telah diterangkan kepada kalian (tanah).',
    category: 'Hakikat Iman'
  },
  {
    id: 2,
    question: 'Malaikat yang bertugas membagikan rezeki, menurunkan air hujan, dan mengatur kesuburan tumbuhan atas kehendak Allah Swt. adalah...',
    options: [
      'Malaikat Jibril',
      'Malaikat Israfil',
      'Malaikat Mikail',
      'Malaikat Ridwan'
    ],
    correctIndex: 2,
    explanation: 'Malaikat Mikail mengemban tugas mengurus rezeki seluruh makhluk di alam semesta, termasuk mengatur angin dan menurunkan air hujan.',
    category: 'Tugas Malaikat'
  },
  {
    id: 3,
    question: 'Dua malaikat yang senantiasa mendampingi manusia untuk mencatat segala amal perbuatan baik dan amal buruk adalah...',
    options: [
      'Munkar dan Nakir',
      'Raqib dan Atid',
      'Malik dan Ridwan',
      'Jibril dan Mikail'
    ],
    correctIndex: 1,
    explanation: 'Malaikat Raqib mencatat setiap kebaikan dan niat tulus, sedangkan Malaikat Atid mencatat setiap kekhilafan, keburukan, dan pelanggaran manusia.',
    category: 'Tugas Malaikat'
  },
  {
    id: 4,
    question: 'Seorang siswa sedang mengikuti ujian di kelas. Pengawas ujian keluar ruangan untuk beberapa saat. Siswa tersebut tidak menyontek karena yakin ada malaikat yang mencatat perbuatannya. Sikap ini merupakan cerminan dari...',
    options: [
      'Rasa takut dijauhi teman sekelas',
      'Kemawas dirian (mawas diri) yang lahir dari iman kepada malaikat',
      'Ketidakmampuan membaca materi ujian',
      'Sikap pasrah tanpa berusaha'
    ],
    correctIndex: 1,
    explanation: 'Mawas diri adalah kesadaran menjaga sikap dan kejujuran karena meyakini pengawasan Allah Swt. dan catatan Malaikat Raqib serta Atid, meski tiada manusia yang melihat.',
    category: 'Mawas Diri'
  },
  {
    id: 5,
    question: 'Riko menyadari bahwa kemarin ia sempat berbicara dengan nada tinggi kepada orang tuanya. Di malam hari ia merasa bersalah, beristighfar kepada Allah Swt., lalu meminta maaf dengan tulus. Sikap Riko menunjukkan...',
    options: [
      'Kelemahan mental seorang remaja',
      'Introspeksi diri (muhasabah) yang berujung pada perbaikan akhlak',
      'Sikap ragu-ragu dalam mengambil keputusan',
      'Rasa takut tidak diberi uang jajan'
    ],
    correctIndex: 1,
    explanation: 'Introspeksi yang benar bukan sekadar menyesal, melainkan berani mengakui kekeliruan, memohon ampun, dan meminta maaf kepada orang yang disakiti.',
    category: 'Introspeksi'
  }
];
