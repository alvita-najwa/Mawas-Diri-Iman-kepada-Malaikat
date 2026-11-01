# Rencana Implementasi: Game Cari Kata 10 Malaikat Ramah Anak SD & Integrasi Papan Skor

Berdasarkan preferensi yang telah dikonfirmasi dan kebutuhan pembelajaran interaktif di kelas (khususnya untuk siswa kelas VII / ramah anak SD dengan proyektor kelas), berikut adalah rencana implementasi pembaruan menyeluruh.

---

## 1. Ringkasan Desain & Fitur Utama

1. **Susunan Kata Sangat Mudah (Child-Friendly)**:
   - 10 Nama Malaikat: JIBRIL, MIKAIL, ISRAFIL, IZRAIL, MUNKAR, NAKIR, RAQIB, ATID, MALIK, RIDWAN.
   - Arah susunan kata **hanya 2 arah**: **Mendatar (Kiri ke Kanan)** dan **Menurun (Atas ke Bawah)**.
   - TIDAK ADA kata terbalik (kanan-ke-kiri / bawah-ke-atas) dan TIDAK ADA kata miring/diagonal.
   - Grid berukuran optimal (11×11 atau 12×12) dengan huruf besar, kontras jelas, dan kotak yang nyaman ditekan pada layar sentuh/mouse proyektor.

2. **Timer 15 Detik & Pengacakan Otomatis Non-Destruktif**:
   - Hitungan mundur 15 detik aktif dengan animasi bar/lingkaran indikator waktu yang mudah dilihat seisi kelas.
   - Setiap kali 1 kata ditemukan, timer berhenti dan diatur ulang kembali ke 15 detik setelah skor dicatat.
   - Jika waktu 15 detik habis:
     - Huruf pengisi dan kata-kata yang **belum ditemukan** diacak ulang tata letaknya.
     - **WAJIB:** Semua kata yang sudah ditemukan tetap berada di koordinat aslinya, huruf tetap sama, warna sorotan tetap terkunci, dan tidak boleh terhapus/bergeser.
     - Tampilkan notifikasi: *"Waktu habis! Huruf diacak kembali. Kata yang sudah ditemukan tetap tersimpan."*
     - Timer langsung memulai kembali hitungan 15 detik.

3. **Modal Pop-Up Skor Kelompok Otomatis (+10 Benar / -5 Salah)**:
   - Begitu 1 nama malaikat ditemukan, timer **otomatis dijeda (paused)** dan muncul **Modal Pop-up Skor Kelompok** di atas arena papan kata.
   - Guru dapat langsung memilih kelompok siswa yang berhasil menjawab (Kelompok 1 s.d. 5) dan menambahkan poin (+10) atau mengurangi poin (-5) jika ada kekeliruan.
   - Skor ini terhubung langsung ke penyimpanan terpadu (`localStorage: mawas_diri_papan_skor`) yang sama dengan kuis, sehingga akumulasi skor kuis dan cari kata menjadi satu kesatuan.
   - Terdapat tombol besar yang jelas: **“Simpan Skor & Lanjutkan”**.
   - Setelah ditekan, modal tertutup, pesan apresiasi tampil, dan timer 15 detik mulai berjalan untuk pencarian kata berikutnya.
   - Untuk kata ke-10 (terakhir), modal skor tetap dibuka dahulu, lalu setelah disimpan akan muncul pop-up selebrasi kemenangan dan rekap peringkat akhir.

4. **Integrasi Slide Alur Kegiatan & Pembagian Kelompok**:
   - Menghubungkan Halaman 3 (`AgendaKegiatanPage`) dan Halaman 4 (`PembagianKelompokPage`) pada switch-case router di `App.tsx` serta sinkronisasi tombol navigasi slide.

---

## 2. File & Modul yang Akan Dimodifikasi

1. **`src/data/wordSearchData.ts`**:
   - Membatasi `DIRECTIONS` hanya:
     - `{ dr: 0, dc: 1, label: 'Mendatar (Kiri ke Kanan)' }`
     - `{ dr: 1, dc: 0, label: 'Menurun (Atas ke Bawah)' }`
   - Membuat fungsi `partialShuffleWordSearchBoard(currentBoard, foundWordIds)`:
     - Mengidentifikasi sel-sel yang terkunci dari `foundWordIds`.
     - Mengosongkan sel selain yang terkunci.
     - Menempatkan ulang hanya kata-kata yang belum ditemukan pada ruang yang tersedia (memvalidasi tidak menimpa sel terkunci kecuali hurufnya identik).
     - Mengisi sel kosong dengan huruf acak.
     - Mengembalikan konfigurasi papan baru dengan koordinat kata belum ditemukan yang baru dan kata terkunci yang utuh.

2. **`src/components/WordSearch/WordSearchGame.tsx`**:
   - Menambahkan state timer 15 detik (`timeLeft`, `isTimerRunning`, `isPaused`).
   - Logika timeout 15 detik: memanggil `partialShuffleWordSearchBoard` saat waktu habis, mereset waktu ke 15 detik, dan menampilkan umpan balik yang ramah.
   - Ketika kata baru terdeteksi:
     - Mengunci kata & warna sorotan.
     - Menghentikan timer (`setIsPaused(true)`).
     - Membuka `ScoreModal` pop-up.
   - Komponen `ScoreModal`:
     - Menampilkan nama kata malaikat yang baru ditemukan.
     - Pilihan 5 kelompok dengan kontrol skor (+10, +5, -5) dan total skor langsung.
     - Tombol **“Simpan Skor & Lanjutkan”** yang menyimpan ke `localStorage`, menutup modal, dan memulai kembali countdown 15 detik.
   - Memastikan seleksi kata hanya mendukung arah mendatar dan menurun (tidak diagonal/terbalik).

3. **`src/App.tsx`**:
   - Menyambungkan routing `currentPage` di dalam switch-case:
     - `case 2`: `PemantikPage` (lanjut ke page 3)
     - `case 3`: `AgendaKegiatanPage` (lanjut ke page 4 "Ayo Berkelompok", mundur ke page 2)
     - `case 4`: `PembagianKelompokPage` (lanjut ke page 5 "Menu Materi", mundur ke page 3, pintas ke video lagu/kuis/cari kata/skor)
     - `case 5`: `MainMenuPage` (navigasi modul 6 - 18)
     - `case 6` s.d. `18`: Modul materi urut sesuai data `MENU_MODULES`.

---

## 3. Langkah Verifikasi
- Pengujian kompilasi dengan `compile_applet` dan `lint_applet` bebas dari error.
- Memastikan susunan kata hanya dari kiri ke kanan dan atas ke bawah.
- Memastikan kata yang sudah ditemukan tidak hilang atau bergeser ketika timer 15 detik habis dan huruf diacak kembali.
- Memastikan modal pop-up skor muncul segera setelah kata ditemukan, timer berhenti selama modal aktif, dan berlanjut kembali setelah "Simpan Skor & Lanjutkan" diklik.
- Memastikan skor tersimpan rapi dan menyatu dengan skor kuis kelompok.
