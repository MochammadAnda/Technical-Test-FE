# Productly — Dashboard Katalog Produk

Productly adalah aplikasi dashboard katalog produk yang dibangun menggunakan React dan TypeScript. Proyek ini dibuat untuk menunjukkan kemampuan pengembangan frontend, mulai dari integrasi REST API, pengelolaan data, penggunaan komponen yang dapat digunakan kembali, hingga penanganan berbagai kondisi pada antarmuka pengguna.

Data produk diperoleh dari [DummyJSON API](https://dummyjson.com/), sehingga aplikasi dapat menampilkan data produk tanpa memerlukan backend khusus.

## Fitur Utama

- **Login Simulasi** — Halaman login sederhana untuk mengakses dashboard.
- **Dashboard** — Menampilkan ringkasan data produk, jumlah kategori, dan rata-rata rating produk.
- **Katalog Produk** — Menampilkan daftar produk yang diperoleh melalui REST API.
- **Pencarian Produk** — Memungkinkan pengguna mencari produk berdasarkan nama.
- **Filter Kategori** — Memfilter produk berdasarkan kategori yang tersedia.
- **Detail Produk** — Menampilkan informasi produk secara lebih lengkap melalui modal.
- **Pagination** — Membagi daftar produk menjadi beberapa halaman agar lebih mudah dijelajahi.
- **Loading State** — Menampilkan indikator ketika aplikasi sedang mengambil data.
- **Error Handling** — Menampilkan pesan kesalahan dan menyediakan tombol untuk mencoba kembali ketika permintaan API gagal.
- **Empty State** — Menampilkan informasi ketika tidak ada produk yang sesuai dengan pencarian atau filter.
- **Desain Responsif** — Menyesuaikan tampilan untuk berbagai ukuran layar, termasuk desktop dan perangkat seluler.
- **Reusable Components** — Menggunakan komponen yang dapat digunakan kembali untuk menjaga konsistensi dan kemudahan pemeliharaan kode.

## Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| React | Membangun antarmuka pengguna berbasis komponen |
| TypeScript | Menambahkan sistem tipe data untuk membantu mengurangi kesalahan kode |
| Vite | Menjalankan server pengembangan dan membangun aplikasi |
| Axios | Mengirim permintaan HTTP ke REST API |
| React Router | Mengatur navigasi antarhalaman |
| Lucide React | Menyediakan ikon untuk antarmuka pengguna |
| CSS | Mengatur tata letak, warna, dan desain responsif |
| DummyJSON API | Menyediakan data produk dan kategori |

## Persyaratan

Sebelum menjalankan proyek, pastikan perangkat telah memiliki:

- Node.js
- npm
- Git

## Cara Menjalankan Proyek

### 1. Clone Repository

Unduh repository dari GitHub dengan menjalankan perintah berikut:

```bash
git clone https://github.com/USERNAME/productly.git
```

Ganti `USERNAME` dengan username GitHub pemilik repository.

### 2. Masuk ke Direktori Proyek

```bash
cd productly
```

### 3. Instal Dependensi

```bash
npm install
```

Perintah ini digunakan untuk menginstal seluruh dependensi yang diperlukan oleh aplikasi.

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Setelah server pengembangan berjalan, buka alamat lokal yang ditampilkan di terminal, biasanya:

```text
http://localhost:5173
```

### 5. Build untuk Produksi

Untuk memeriksa dan membangun aplikasi dalam mode produksi, jalankan:

```bash
npm run build
```

Hasil build akan disimpan di direktori `dist/`.

## Akun Demo

Gunakan akun berikut untuk mencoba fitur login:

| Informasi | Nilai |
|---|---|
| Email | `admin@productly.demo` |
| Password | `Productly123!` |

**Catatan:** Login pada proyek ini merupakan simulasi autentikasi di sisi frontend. Aplikasi belum menggunakan autentikasi backend sehingga mekanisme login ini hanya ditujukan untuk demonstrasi dan pengujian fitur antarmuka.

## Integrasi REST API

Aplikasi menggunakan [DummyJSON API](https://dummyjson.com/) sebagai sumber data produk.

Endpoint yang digunakan:

| Endpoint | Kegunaan |
|---|---|
| `GET /products` | Mengambil daftar produk |
| `GET /products/categories` | Mengambil daftar kategori produk |

Basis URL API:

```text
https://dummyjson.com
```

Permintaan API dikelola melalui lapisan service agar proses pengambilan data terpisah dari komponen antarmuka.

Pencarian, filter kategori, dan pagination pada implementasi ini dilakukan di sisi frontend berdasarkan data yang telah diambil dari API.

## Struktur Proyek

Berikut struktur utama komponen dan modul aplikasi:

```text
src/
├── components/
│   ├── common/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   └── Loading.tsx
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductDetailModal.tsx
│       ├── ProductFilters.tsx
│       └── ProductGrid.tsx
├── pages/
│   ├── DashboardPage.tsx
│   └── ProductsPage.tsx
├── services/
│   └── productService.ts
├── types/
│   └── product.ts
├── App.tsx
└── index.css
```

Struktur di atas menggambarkan file utama aplikasi. File pendukung lain, seperti konfigurasi Vite, pengelolaan autentikasi, layout dashboard, dan routing, dapat berada di direktori yang sama sesuai implementasi proyek.

## Penerapan Pengembangan Frontend

Dalam pengembangan Productly, beberapa pendekatan yang diterapkan meliputi:

1. **Pemisahan tanggung jawab:** proses pengambilan data dipisahkan dari komponen antarmuka.
2. **Komponen reusable:** elemen seperti kartu produk, filter, indikator loading, dan tampilan error dibuat sebagai komponen terpisah.
3. **Penggunaan TypeScript:** tipe data digunakan untuk membantu menjaga konsistensi struktur data produk.
4. **Penanganan kondisi aplikasi:** aplikasi menyediakan tampilan untuk kondisi loading, error, dan data kosong.
5. **Pengolahan data:** pencarian dan filter dilakukan berdasarkan data yang diterima dari API.
6. **Desain responsif:** tata letak disesuaikan agar tetap nyaman digunakan pada berbagai ukuran layar.

## Tujuan Proyek

Proyek ini dibuat sebagai implementasi praktik pengembangan frontend menggunakan React dan TypeScript, khususnya dalam membangun dashboard, mengintegrasikan REST API, mengelola data, serta menerapkan komponen antarmuka yang terstruktur dan mudah dipelihara.

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan pelaksanaan tes teknis Front-End Engineer.
