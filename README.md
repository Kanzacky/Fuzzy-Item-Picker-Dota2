# ⚡ Lina Itemizer - Fuzzy Recommendation

Sistem pakar berbasis web untuk memberikan rekomendasi build item hero **Lina (Dota 2)** secara dinamis menggunakan **Logika Fuzzy**.

## 🚀 Fitur Utama
- **Fuzzy Scoring**: Menghitung bobot item berdasarkan 10 parameter kebutuhan (Burst, Defense, CC, dll).
- **CSV Driven**: Data item diambil langsung dari `items_c45_ready.csv`.
- **Top 6 Picks**: Menampilkan 6 item terbaik dengan skor tertinggi.

## 🧠 Cara Kerja Logika Fuzzy
Sistem menggunakan fungsi keanggotaan untuk menentukan nilai input user:
- **Low**: Nilai $\le 5$ (Skor 0)
- **High**: Nilai $\ge 8$ (Skor 1)
- **Transition**: Di antara 5-8 (Interpolasi linear $\frac{x-5}{3}$)

## 🛠️ Teknologi
- **Core**: Vanilla JavaScript (ES6+)
- **Data**: CSV Parser via Fetch API
- **Styling**: CSS Dark Mode (Dota 2 Theme)
