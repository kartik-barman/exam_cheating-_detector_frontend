# 🎓 AI-Powered Exam Integrity Monitor (Frontend)

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A premium, state-of-the-art monitoring dashboard designed to ensure academic integrity using advanced computer vision and real-time behavioral analytics. This frontend application provides proctors with a centralized interface to monitor exams, analyze risk levels, and manage captured evidence.

---

## ✨ Key Features

- 📺 **Live Monitoring Control**: Real-time video feed integration with computer vision overlays (Head-pose/Yaw estimation).
- 📊 **Risk Analytics Dashboard**: Dynamic visualization of integrity scores, alert density, and behavioral vectors.
- 🕒 **Real-Time Evidence Gallery**: Instant access to high-resolution captures of suspicious activities with time-stamped logs.
- ⚡ **Persistent Polling**: Seamless data synchronization with the backend every 2 seconds for zero-reload updates.
- 📱 **Premium UI/UX**: Professional dark-themed interface built with Framer Motion for smooth micro-animations and micro-interactions.
- 🖥️ **Full-Screen Mode**: Immersive monitoring view for dedicated supervision.

---

## 🛠️ Tech Stack

- **Core**: React 19 (TypeScript)
- **Tooling**: Vite (HMR enabled)
- **Styling**: Tailwind CSS 4.x (Vite Plugin)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks (Custom `useMonitoring` for real-time sync)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- NPM or PNPM

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Exam_Cheating_Detector_Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API Endpoint**
   Update the `API_BASE_URL` in `src/api/monitoring.ts`:

   ```typescript
   // Default is pointed to the production server
   const API_BASE_URL =
     "https://examcheating-detector-backend.onrender.com/api/v1/monitoring";
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── api/             # API service definitions (Axios)
├── components/      # Reusable UI components (Live Monitor, Stats, Analytics)
├── hooks/           # Custom React hooks (useMonitoring sync logic)
├── layout/          # Global layout components (Navbar)
├── shared/          # Generic UI primitives (StatCards, Buttons)
├── types/           # TypeScript interfaces and signatures
└── App.tsx          # Main application orchestration
```

---

## 👮 Security & Performance

- **Optimized Polling**: Implements efficient background synchronization to maintain state without heavy CPU overhead.
- **Environment Agnostic**: Type-safe implementations that work across browser and cross-platform environments.
- **Responsive Design**: Fully optimized for various monitor resolutions and supervising environments.

---

## 🤝 Backend Integration

This frontend is designed to work in tandem with the [Exam Cheating Detector Backend](https://github.com/kartik-barman/Exam_Cheating_Detector_Backend), which handles:

- OpenCV-based head pose estimation.
- Event ID and log generation.
- Dynamic MJPEG video streaming.

---

## 📄 License

Project managed and maintained by **Kartik Barman**. Built as part of the Major Project for academic integrity research.
