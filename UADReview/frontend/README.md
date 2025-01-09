# Dokumentasi Proyek UADReview

## 1. Deskripsi Proyek

UADReview adalah sebuah aplikasi berbasis web yang memungkinkan mahasiswa untuk:

- Melihat berbagai kegiatan kampus.
- Memberikan ulasan untuk kegiatan yang telah diikuti.
- Mengelola data pengguna, seperti profil dan daftar ulasan.

Proyek ini dibuat menggunakan teknologi modern seperti **React.js** untuk front-end dan **Express.js** untuk back-end. Data disimpan di file JSON (`db.json`), yang digunakan sebagai mock database.

---

## 2. Teknologi yang Digunakan

### Front-End

- **React.js**: Framework untuk membangun antarmuka pengguna.
- **Tailwind CSS**: Library CSS untuk desain responsif.
- **React Router**: Untuk navigasi antar halaman.

### Back-End

- **Express.js**: Framework Node.js untuk membuat REST API.
- **JWT (JSON Web Token)**: Untuk autentikasi pengguna.
- **JSON Server**: Mock database untuk menyimpan data.

---

## 3. Fitur Utama

1. **Login dan Registrasi**
   - Pengguna dapat mendaftar sebagai user atau admin.
   - Login menggunakan username dan password.
2. **Beranda**
   - Menampilkan daftar kegiatan kampus yang dapat diulas.
3. **Ulasan**
   - Pengguna dapat memberikan ulasan dan mengedit ulasan dalam waktu 24 jam.
4. **Akun**
   - Melihat informasi profil dan daftar kegiatan yang diulas.
5. **Pengaturan**
   - Mengaktifkan mode gelap atau terang.
6. **Admin Panel**
   - Menambahkan, mengedit, atau menghapus kegiatan kampus.

---

## 4. Langkah Instalasi dan Menjalankan Aplikasi

### Prasyarat

- Pastikan komputer Anda sudah terinstall:
  - **Node.js** (versi terbaru).
  - **npm** atau **yarn**.

### Langkah Instalasi

1. Clone repositori proyek:
   ```bash
   git clone https://github.com/username/uadreview.git
   ```
2. Masuk ke folder proyek:
   ```bash
   cd uadreview
   ```
3. Instal dependensi untuk back-end:
   ```bash
   cd backend
   npm install
   ```
4. Instal dependensi untuk front-end:
   ```bash
   cd ../frontend
   npm install
   ```

### Menjalankan Aplikasi

1. Jalankan server back-end:
   ```bash
   cd backend
   node server.js
   ```
2. Jalankan aplikasi front-end:
   ```bash
   cd ../frontend
   npm run dev
   ```
3. Buka aplikasi di browser pada [http://localhost:5173](http://localhost:5173).

---

## 5. Cara Menggunakan Aplikasi

1. **Registrasi**:
   - Klik tombol "Masuk/Daftar" di halaman utama.
   - Isi form registrasi dengan username, password, dan pilih role.
   - Jika mendaftar sebagai admin, masukkan kode akses admin.
2. **Login**:
   - Masukkan username dan password yang telah didaftarkan.
3. **Menambahkan Ulasan**:
   - Pilih kegiatan dari halaman beranda.
   - Klik tombol "Ulas" dan isi form ulasan.
4. **Mengelola Ulasan**:
   - Ulasan dapat diedit dalam waktu 24 jam setelah dibuat.
5. **Admin Panel**:
   - Tambahkan, edit, atau hapus kegiatan di halaman admin.

---

## 6. Struktur Proyek

### Backend

- **server.js**: Server utama untuk API.
- **db.json**: Mock database untuk menyimpan data.

### Frontend

- **src/components**: Folder untuk komponen reusable seperti Header, Footer, dan Form.
- **src/pages**: Folder untuk halaman utama seperti Home, Account, dan Reviews.
- **src/assets**: Folder untuk menyimpan aset seperti logo.

---

## 7. Tips dan Trik

- **Mode Gelap**: Aktifkan di halaman Pengaturan untuk tampilan yang lebih nyaman.
- **Debugging**: Gunakan konsol browser untuk melihat error jika terjadi masalah.
- **Tambahkan Data**: Anda dapat menambahkan data ke `db.json` secara manual untuk testing.

---

## 8. Pengembang

Dikembangkan oleh tim mahasiswa untuk memenuhi tugas proyek mata kuliah. Jika ada pertanyaan atau saran, hubungi kami melalui email atau media sosial.

---

## 9. Lisensi

Proyek ini menggunakan lisensi MIT.



Note : proyek ini belum selesai, belum bisa diaplikasikan karna masih banyak yang perlu dikembangkan

