# Dota 2 Item Analyzer — Fuzzy Recommendation System

A web-based expert system that provides dynamic **Dota 2 hero item build recommendations** using **Fuzzy Logic**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fuzzy--item--picker--dota2.vercel.app-blue?style=for-the-badge&logo=vercel)](https://fuzzy-item-picker-dota2.vercel.app)

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Dynamic Hero Selection** | Supports 40+ heroes with dynamically tailored analyzers |
| **Fuzzy Scoring Engine** | Computes item weights across 10 need parameters (Burst, Defense, CC, etc.) |
| **Automated Registry** | Centralized management of hero metadata, descriptions, and abilities |
| **CSV-Driven Data** | Item data sourced directly from `items_c45_ready.csv` |
| **Modern UI** | Built with Next.js 15, Tailwind CSS v4, and official Dota 2 assets |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (Turbopack) |
| **Styling** | Tailwind CSS v4 |
| **Language** | TypeScript |
| **Data Parsing** | CSV Parser via Fetch API |

---

## 🌐 Live Demo

Try the live demo here:

[![Open Live Demo](https://img.shields.io/badge/Open_fuzzy--item--picker--dota2.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://fuzzy-item-picker-dota2.vercel.app)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Fuzzy-Item-Picker-Dota2.git
cd Fuzzy-Item-Picker-Dota2

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
Fuzzy-Item-Picker-Dota2/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Core logic (fuzzy engine, registry, CSV parser)
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets (images, CSV data)
└── package.json
```

---

## How It Works

1. **Select a Hero** — Choose from 40+ supported heroes
2. **Fuzzy Evaluation** — The engine scores each item against 10 situational parameters
3. **Dynamic Recommendations** — Top-ranked items presented as optimal build paths
4. **Real-time Updates** — Recommendations adapt as game context changes

---

## Selected Works

Here are some of my other projects:

### 1. [kanzacky-link](https://github.com/Kanzacky/kanzacky-link)
Personal digital business card and Linktree alternative. Built with Next.js and Tailwind CSS with a Bento Grid layout and micro-interactions.

| Technology | |
|---|---|
| Next.js | Tailwind CSS | TypeScript |

### 2. [Campus-Connect](https://github.com/Kanzacky/Campus-Connect)
Centralized campus organization and event management platform for UNIPMA with role-based access control. Headless architecture using Laravel REST API and Next.js.

| Technology | |
|---|---|
| Laravel | Next.js | TypeScript | Tailwind CSS |

### 3. [ML-Prediksi-Penyakit-Jantung](https://github.com/Kanzacky/ML-Prediksi-Penyakit-Jantung)
Fullstack Machine Learning application for predicting heart disease risk. Classification model built with Scikit-Learn, served via FastAPI REST API with React frontend.

| Technology | |
|---|---|
| Python | FastAPI | React | Scikit-learn |

---

## Contributing

Contributions are welcome! Please open an issue or submit a PR.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Contact

For questions or feedback, feel free to reach out via GitHub Issues.