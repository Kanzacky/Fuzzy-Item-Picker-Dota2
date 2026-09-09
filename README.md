# ⚡ Dota 2 Item Analyzer - Fuzzy Recommendation

Sistem pakar berbasis web untuk memberikan rekomendasi build item hero **Dota 2** secara dinamis menggunakan **Logika Fuzzy**.

## 🚀 Fitur Utama
- **Dynamic Hero Selection**: Mendukung 40+ hero dengan analyzer yang disesuaikan secara dinamis.
- **Fuzzy Scoring Engine**: Menghitung bobot item berdasarkan 10 parameter kebutuhan (Burst, Defense, CC, dll).
- **Automated Registry**: Metadata hero, deskripsi, dan kemampuan dikelola melalui registry terpusat.
- **CSV Driven**: Data item diambil langsung dari `items_c45_ready.csv`.
- **Modern UI**: Dibangun dengan Next.js 15, Tailwind CSS v4, dan aset resmi Dota 2.

## 🛠️ Teknologi
- **Framework**: Next.js 15 (Turbopack)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Data**: CSV Parser via Fetch API

## 🏃 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
