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
    question: 'Manakah pernyataan yang paling tepat mengenai sifat dan karakter malaikat?',
    options: [
      'Memiliki nafsu seperti manusia namun mampu mengendalikannya',
      'Membutuhkan makan, minum, dan waktu tidur pada malam hari',
      'Senantiasa patuh menjalankan perintah Allah Swt. dan mustahil durhaka',
      'Dapat memilih secara bebas antara berbuat taat atau berbuat maksiat'
    ],
    correctIndex: 2,
    explanation: 'Malaikat diciptakan tanpa hawa nafsu dan selalu taat menjalankan segala yang diperintahkan Allah Swt. tanpa pernah bermaksiat (Q.S. at-Tahrim/66:6).',
    category: 'Hakikat Iman'
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    question: 'Seorang siswa sedang mengikuti ujian di kelas. Pengawas ujian keluar ruangan untuk beberapa saat. Siswa tersebut tidak menyontek karena yakin ada malaikat yang mencatat. Sikap ini merupakan cerminan dari...',
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
    id: 6,
    question: 'Apa perbedaan mendasar antara "Mawas Diri" dan "Introspeksi (Muhasabah)"?',
    options: [
      'Mawas diri dilakukan setelah berbuat dosa, sedangkan introspeksi sebelum bertindak',
      'Mawas diri adalah berhati-hati sebelum/saat bertindak, sedangkan introspeksi adalah mengevaluasi diri setelah bertindak',
      'Mawas diri hanya untuk guru, sedangkan introspeksi khusus untuk siswa',
      'Keduanya sama persis dan tidak memiliki perbedaan waktu penerapan'
    ],
    correctIndex: 1,
    explanation: 'Mawas diri bersifat preventif (menimbang dan berpikir sebelum bertindak), sedangkan introspeksi bersifat evaluatif (melihat ke dalam diri setelah bertindak untuk memperbaiki kesalahan).',
    category: 'Introspeksi'
  },
  {
    id: 7,
    question: 'Di media sosial, seorang remaja melihat ujaran kebencian. Sebelum mengetik komentar, ia berhenti sejenak dan berpikir apakah tulisannya akan menyakiti orang lain. Tindakan tersebut merupakan penerapan...',
    options: [
      'Mawas diri dalam beretika di dunia digital',
      'Sikap acuh tak acuh terhadap perkembangan zaman',
      'Rasa minder dalam berpendapat',
      'Menghindari penggunaan telepon pintar'
    ],
    correctIndex: 0,
    explanation: 'Berpikir sebelum mengunggah atau berkomentar di dunia digital merupakan bentuk nyata mawas diri agar jari jemari kita tidak menulis hal-hal yang dicatat buruk oleh Malaikat Atid.',
    category: 'Mawas Diri'
  },
  {
    id: 8,
    question: 'Riko menyadari bahwa kemarin ia sempat berbicara dengan nada tinggi kepada ibunya. Di malam hari ia merasa bersalah, beristighfar kepada Allah Swt., lalu meminta maaf dengan tulus kepada ibunya. Sikap Riko menunjukkan...',
    options: [
      'Kelemahan mental seorang remaja',
      'Introspeksi diri (muhasabah) yang berujung pada perbaikan akhlak',
      'Sikap ragu-ragu dalam mengambil keputusan',
      'Rasa takut tidak diberi uang jajan'
    ],
    correctIndex: 1,
    explanation: 'Introspeksi yang benar bukan sekadar menyesal, melainkan berani mengakui kekeliruan, memohon ampun, dan meminta maaf kepada orang yang disakiti.',
    category: 'Introspeksi'
  },
  {
    id: 9,
    question: 'Malaikat yang bertugas meniup sangkakala saat hari kiamat tiba atas perintah Allah Swt. adalah...',
    options: [
      'Malaikat Izrail',
      'Malaikat Israfil',
      'Malaikat Malik',
      'Malaikat Munkar'
    ],
    correctIndex: 1,
    explanation: 'Malaikat Israfil memegang sangkakala dan senantiasa bersiap menanti titah Allah Swt. untuk meniupnya pada hari kiamat dan hari kebangkitan.',
    category: 'Tugas Malaikat'
  },
  {
    id: 10,
    question: 'Puncak hikmah dari beriman kepada malaikat Allah Swt. bagi seorang muslim adalah...',
    options: [
      'Hafal nama dan tugas sepuluh malaikat tanpa perlu mengamalkannya',
      'Merasa diri lebih suci daripada orang lain',
      'Tumbuhnya kepribadian yang taat, jujur, mawas diri, dan rajin berintrospeksi',
      'Mengharapkan malaikat menampakkan wujud aslinya setiap hari'
    ],
    correctIndex: 2,
    explanation: 'Iman yang sejati tidak hanya berhenti pada hafalan, melainkan mengakar dalam kalbu dan mewujud dalam perilaku sehari-hari: berhati-hati dalam bersikap dan senantiasa memperbaiki diri.',
    category: 'Hakikat Iman'
  }
];
