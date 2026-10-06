import { LearningModule } from '../types';

export const APP_METADATA = {
  mainTitle: 'MAWAS DIRI DAN INTROSPEKSI DALAM MENJALANI KEHIDUPAN',
  subtitle: 'Iman kepada Malaikat Allah SWT.',
  tagline: 'KENALI IMAN, KENALI DIRI',
  concept: 'THE INNER JOURNEY',
  subject: 'Pendidikan Agama Islam dan Budi Pekerti',
  element: 'Akidah',
  phase: 'Fase D',
  grade: 'Kelas VII',
  semester: 'Genap',
  topic: 'Iman kepada Malaikat Allah SWT.',
  compiler: 'Shabrina Tsabita Asmi'
};

export const MENU_MODULES: LearningModule[] = [
  {
    id: 1,
    slug: 'pengertian-iman',
    title: 'Pengertian Iman',
    subtitle: 'Meyakini, memahami, dan menghayati keberadaan malaikat',
    pageNumber: 4,
    category: 'Dasar',
    icon: 'Sparkles'
  },
  {
    id: 2,
    slug: 'enam-rukun-iman',
    title: 'Enam Rukun Iman',
    subtitle: 'Kedudukan iman kepada malaikat dalam poros keimanan',
    pageNumber: 5,
    category: 'Dasar',
    icon: 'CircleDot'
  },
  {
    id: 3,
    slug: 'dalil',
    title: 'Dalil Al-Qur\'an',
    subtitle: 'Q.S. al-Baqarah/2:285 dan terjemahnya',
    pageNumber: 6,
    category: 'Dasar',
    icon: 'BookOpen'
  },
  {
    id: 4,
    slug: 'sifat-malaikat',
    title: 'Sifat Malaikat',
    subtitle: 'Karakteristik ketaatan dan kesucian malaikat',
    pageNumber: 7,
    category: 'Karakteristik',
    icon: 'ShieldCheck'
  },
  {
    id: 5,
    slug: 'malaikat-vs-manusia',
    title: 'Malaikat vs Manusia',
    subtitle: 'Perbandingan karakteristik dan amanah penciptaan',
    pageNumber: 8,
    category: 'Karakteristik',
    icon: 'Columns'
  },
  {
    id: 6,
    slug: 'nama-tugas-malaikat',
    title: 'Nama & Tugas',
    subtitle: '10 malaikat Allah beserta amanah mulianya',
    pageNumber: 9,
    category: 'Tugas & Catatan',
    icon: 'Layers'
  },
  {
    id: 7,
    slug: 'hikmah',
    title: 'Hikmah Beriman',
    subtitle: 'Dampak keimanan terhadap ketenteraman dan ketaatan',
    pageNumber: 11,
    category: 'Penerapan Diri',
    icon: 'Compass'
  },
  {
    id: 8,
    slug: 'mawas-diri',
    title: 'Mawas Diri',
    subtitle: 'Berpikir cermat sebelum dan saat bertindak',
    pageNumber: 12,
    category: 'Penerapan Diri',
    icon: 'Eye'
  },
  {
    id: 9,
    slug: 'kehidupan-sehari-hari',
    title: 'Kehidupan Sehari-hari',
    subtitle: 'Penerapan di sekolah, rumah, pertemanan, dan dunia digital',
    pageNumber: 14,
    category: 'Penerapan Diri',
    icon: 'MapPin'
  },
  {
    id: 10,
    slug: 'refleksi',
    title: 'Refleksi Diri',
    subtitle: 'Ruang hening merenungkan sikap dan niat baikmu',
    pageNumber: 15,
    category: 'Penerapan Diri',
    icon: 'HeartHandshake'
  }
];

export const RUKUN_IMAN_ITEMS = [
  {
    number: 1,
    title: 'Iman kepada Allah Swt.',
    desc: 'Meyakini dengan sepenuh hati bahwa Allah Maha Esa, tiada sekutu bagi-Nya, Pencipta dan Pemelihara seluruh alam semesta.',
    isTarget: false
  },
  {
    number: 2,
    title: 'Iman kepada Malaikat Allah',
    desc: 'Meyakini keberadaan makhluk gaib yang senantiasa taat menjalankan titah Allah Swt. tanpa pernah bermaksiat.',
    isTarget: true
  },
  {
    number: 3,
    title: 'Iman kepada Kitab Allah',
    desc: 'Meyakini kitab-kitab suci yang diturunkan kepada para rasul sebagai petunjuk hidup bagi umat manusia.',
    isTarget: false
  },
  {
    number: 4,
    title: 'Iman kepada Rasul Allah',
    desc: 'Meyakini para utusan Allah yang menyampaikan syariat dan menjadi teladan budi pekerti luhur bagi manusia.',
    isTarget: false
  },
  {
    number: 5,
    title: 'Iman kepada Hari Akhir',
    desc: 'Meyakini adanya hari pembalasan dan kebangkitan setelah kehidupan dunia berakhir secara adil dan nyata.',
    isTarget: false
  },
  {
    number: 6,
    title: 'Iman kepada Qada dan Qadar',
    desc: 'Meyakini takdir, ketetapan, dan kehendak bijaksana Allah Swt. dalam seluruh peristiwa hidup manusia.',
    isTarget: false
  }
];

export const SIFAT_MALAIKAT_ITEMS = [
  {
    id: 'taat',
    title: 'Taat',
    short: 'Senantiasa taat kepada Allah Swt.',
    desc: 'Malaikat tidak pernah menunda atau menolak apa pun yang diperintahkan oleh Allah Swt. Ketaatannya mutlak dan penuh kesungguhan.',
    detail: 'Tidak memiliki hawa nafsu yang mengajak kepada kemalasan atau keengganan beribadah.'
  },
  {
    id: 'tidak-durhaka',
    title: 'Tidak Durhaka',
    short: 'Tidak mendurhakai perintah Allah Swt.',
    desc: 'Malaikat bersih dari kecenderungan berbuat maksiat. Seluruh perilakunya selaras dengan aturan dan kesucian ilahi.',
    detail: 'Firman Allah menegaskan bahwa malaikat tidak pernah mendurhakai apa yang diperintahkan-Nya (Q.S. at-Tahrim/66:6).'
  },
  {
    id: 'beribadah',
    title: 'Beribadah',
    short: 'Senantiasa beribadah dan bertasbih.',
    desc: 'Malaikat tiada henti bertasbih memuji keagungan Allah Swt. siang dan malam tanpa merasa letih atau bosan.',
    detail: 'Ibadah malaikat adalah wujud pengagungan yang suci dan murni tanpa pamrih keduniaan.'
  },
  {
    id: 'makhluk-gaib',
    title: 'Makhluk Gaib',
    short: 'Diciptakan dari cahaya (nur) dan gaib.',
    desc: 'Malaikat adalah makhluk gaib yang tidak kasat mata bagi manusia biasa, diciptakan oleh Allah Swt. dari cahaya (nur).',
    detail: 'Keberadaannya diyakini melalui kebenaran wahyu Al-Qur\'an dan hadis Nabi Muhammad saw.'
  },
  {
    id: 'tidak-makan-minum',
    title: 'Tidak Makan & Minum',
    short: 'Bebas dari kebutuhan biologis fisik.',
    desc: 'Malaikat tidak makan, tidak minum, tidak tidur, dan tidak berjenis kelamin laki-laki ataupun perempuan.',
    detail: 'Berbeda dengan makhluk biologis, eksistensi malaikat terpelihara murni dengan ketaatan kepada Allah.'
  },
  {
    id: 'menjalankan-tugas',
    title: 'Menjalankan Tugas',
    short: 'Tunduk pada ketetapan Allah Swt.',
    desc: 'Setiap malaikat memiliki tugas tertentu yang telah ditetapkan Allah Swt. dan menjalankannya dengan disiplin tinggi.',
    detail: 'Tidak ada kekacauan atau perebutan tugas di antara para malaikat; semuanya bekerja dalam keteraturan sempurna.'
  }
];

export const DAILY_LIFE_SCENARIOS = [
  {
    id: 'sekolah',
    title: 'Lingkungan Sekolah',
    theme: 'Kejujuran & Tanggung Jawab Akademik',
    icon: 'GraduationCap',
    color: '#AFC4D5',
    actions: [
      {
        head: 'Jujur saat Ujian',
        body: 'Tidak melirik contekan atau bertanya pada teman meskipun pengawas sedang lengah, karena sadar catatan amal terus berjalan.'
      },
      {
        head: 'Mengerjakan Tugas Sungguh-sungguh',
        body: 'Mengumpulkan karya hasil pemikiran sendiri tepat waktu sebagai bentuk amanah menuntut ilmu.'
      },
      {
        head: 'Menjaga Perkataan',
        body: 'Tidak memanggil teman dengan panggilan ejekan atau bergunjing (ghibah) di sudut kelas maupun kantin.'
      },
      {
        head: 'Mematuhi Tata Tertib',
        body: 'Menghargai guru, menjaga kebersihan ruang kelas, dan tidak merusak fasilitas madrasah/sekolah.'
      }
    ]
  },
  {
    id: 'rumah',
    title: 'Kehidupan di Rumah',
    theme: 'Bakti & Ketaatan Personal',
    icon: 'Home',
    color: '#D9B8B8',
    actions: [
      {
        head: 'Jujur kepada Orang Tua',
        body: 'Menceritakan keadaan yang sebenarnya mengenai uang saku, kegiatan di luar, maupun nilai ulangan tanpa ada kebohongan.'
      },
      {
        head: 'Melaksanakan Kewajiban Ibadah',
        body: 'Menunaikan salat lima waktu tepat waktu dengan kesadaran sendiri tanpa harus berulang kali ditegur orang tua.'
      },
      {
        head: 'Membantu Keluarga Tanpa Mengeluh',
        body: 'Ringan tangan membersihkan rumah, menjaga adik, atau membantu pekerjaan orang tua dengan tulus ikhlas.'
      },
      {
        head: 'Berbuat Baik Tanpa Menunggu Pujian',
        body: 'Merapikan tempat tidur dan barang pribadi bukan demi imbalan materi, melainkan pembiasaan disiplin diri.'
      }
    ]
  },
  {
    id: 'teman',
    title: 'Bersama Teman Sebaya',
    theme: 'Adab Bergaul & Kepercayaan',
    icon: 'Users',
    color: '#C8BDD8',
    actions: [
      {
        head: 'Menghargai Perbedaan',
        body: 'Menghormati teman yang berbeda suku, pendapat, atau kemampuan tanpa merasa diri lebih hebat.'
      },
      {
        head: 'Tidak Mengejek (Bullying)',
        body: 'Menjaga lisan dan perbuatan agar tidak melukai perasaan kawan, baik secara langsung maupun gurauan berlebihan.'
      },
      {
        head: 'Menjaga Rahasia & Aib',
        body: 'Tidak menceritakan kekurangan atau masalah pribadi teman kepada orang lain demi menjaga kehormatannya.'
      },
      {
        head: 'Saling Mengingatkan Kebaikan',
        body: 'Mengajak salat berjamaah, belajar bersama, dan menasehati dengan lembut bila ada teman yang berbuat keliru.'
      }
    ]
  },
  {
    id: 'digital',
    title: 'Dunia Digital & Media Sosial',
    theme: 'Etika Siber & Jejak Virtual',
    icon: 'Smartphone',
    color: '#B8AAA0',
    actions: [
      {
        head: 'Berpikir Sebelum Mengunggah',
        body: 'Memastikan pesan, foto, atau video yang dibagikan bermanfaat, santun, dan tidak memicu fitnah atau kebencian.'
      },
      {
        head: 'Menjaga Komentar Online',
        body: 'Menahan jari dari menulis komentar sarkastik, kasar, atau merendahkan karya dan pribadi orang lain di internet.'
      },
      {
        head: 'Tidak Menyebarkan Keburukan (Hoaks)',
        body: 'Menyaring setiap informasi sebelum membagikannya (sharing) agar tidak menjadi perantara fitnah dan kabar bohong.'
      },
      {
        head: 'Bijak Mengatur Waktu Layar',
        body: 'Tidak larut dalam game online atau konten hiburan hingga melalaikan salat, waktu belajar, dan istirahat.'
      }
    ]
  }
];

export const HIKMAH_ITEMS = [
  {
    step: '01',
    title: 'Meningkatkan Ketaatan',
    desc: 'Menumbuhkan semangat menaati perintah Allah Swt.',
    detail: 'Mencontoh keteladanan malaikat yang tak henti patuh beribadah membuat kita malu untuk bermalas-malasan dalam menunaikan perintah Allah Swt.'
  },
  {
    step: '02',
    title: 'Mawas Diri',
    desc: 'Membiasakan diri berhati-hati dalam ucapan dan perbuatan.',
    detail: 'Mengingat adanya malaikat pengawas membuat kita senantiasa waspada dan menyaring perkataan serta tingkah laku kita setiap detik.'
  },
  {
    step: '03',
    title: 'Amal Kebaikan',
    desc: 'Menumbuhkan motivasi memperbanyak amal saleh.',
    detail: 'Meyakini Malaikat Raqib setia mencatat setiap butir kebaikan menumbuhkan semangat berbuat kebajikan di mana pun berada.'
  },
  {
    step: '04',
    title: 'Menjauhi Perbuatan Buruk',
    desc: 'Membantu mempertimbangkan akibat sebelum bertindak.',
    detail: 'Kesadaran bahwa Malaikat Atid mencatat amal buruk menjadi rem pengingat ketika bisikan hawa nafsu mengajak pada kesalahan.'
  },
  {
    step: '05',
    title: 'Tanggung Jawab',
    desc: 'Menyadarkan bahwa setiap perbuatan memiliki konsekuensi.',
    detail: 'Melahirkan pribadi remaja yang berani memikul konsekuensi, tidak melemparkan kesalahan kepada orang lain, dan berjiwa ksatria.'
  }
];
