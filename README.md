# TECHASCENT Machine Test Submission: G.A.I.A. Superhero Portal

![G.A.I.A. Portal UI](https://img.shields.io/badge/Status-Active-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-E50914)

**Developer:** [Your Name]
**Date:** September 2026
**Live Demo:** [Insert Public URL Here]

## 📌 Executive Summary

The **G.A.I.A. (Global Anomaly Investigation Agency) Superhero Portal** is an interactive, high-tech web application designed to fulfill the requirements of the TECHASCENT Machine Test. 

It serves as the digital front for an **original superhero entity**, allowing citizens (specifically targeted towards students of Jyothi College of Engineering, as per the brief) to request help and report anomalies globally. The project focuses heavily on an immersive user experience, responsive design, and seamless functional integration.

---

## 🎯 Fulfillment of Core Requirements

This project was meticulously designed to meet and exceed the evaluation criteria provided in the assignment brief:

### 1. An Attractive Superhero Website (Original IP)
- **Originality:** G.A.I.A. is a completely original superhero concept. The lore establishes Earth as a corporate asset in a galactic economy, defended by elite "Operatives."
- **Design Quality:** The portal utilizes a **Premium Dark/Cyberpunk UI** with `#E50914` (GAIA Red) accents, `backdrop-blur` glassmorphism effects, a Star Wars-style boot sequence, and a fully 3D Cyberpunk Cityscape background to create a cinematic, video-game-like experience.
- **Content:** The site includes a dedicated `/about` page detailing deep lore, a main dashboard with an expandable roster of operatives (dossiers), and clear Calls-to-Action (CTAs) for communication and distress transmission.

### 2. Superhero Chatbot (A.U.T.O.)
- **Interactive Interface:** A dedicated COMM-LINK interface located at `/contact` introduces users to A.U.T.O., an AI assistant accompanied by a live 3D robot model embed.
- **Data Collection & NLP:** The chatbot engages users in a simulated conversation to collect their Name, Age, Email, and Grievance. For non-emergency queries, it integrates with a backend route (`/api/chat`) powered by the **Gemini API** for dynamic, natural responses.
- **Text-to-Speech (TTS):** The chatbot features browser-native Speech Synthesis, speaking its responses in a robotic female voice to enhance immersion.

### 3. Geolocation & Interactive Map (Innovation)
- **Automatic Geolocation:** During the distress protocol in the chatbot, the system automatically fetches the user's geographic coordinates using the browser's native Geolocation API to authenticate the distress signal's origin.
- **Satellite Uplink Map:** A dedicated `/transmit-distress` page offers an interactive `react-leaflet` map where users can visually drop a beacon to set their coordinates and fill out a distress form.

### 4. Automatic Email Notification
- **Seamless Delivery:** Upon completing either the chatbot sequence or the distress form, the system automatically packages the user's data (Name, Age, Location, Email, and Grievance).
- **EmailJS Integration:** The portal uses `@emailjs/browser` to instantly and automatically send a formatted notification email directly to the developer, requiring no backend mail server setup.

### 5. Creativity & Innovation
- **3D Graphics:** Integrated `@react-three/fiber` and `three.js` to render an endless, neon-lit 3D Cyberpunk Cityscape background on the main dashboard.
- **Global Audio:** Implemented immersive, persistent background music (Imperial March) and UI sound effects (typing sounds, hover clicks) that can be globally muted via the navigation bar.
- **Custom Animations:** Utilized `framer-motion` for a cinematic boot sequence, smooth page transitions, stagger effects, and interactive UI states.

---

## 🛠️ Technical Architecture

- **Framework:** [Next.js (App Router)](https://nextjs.org/) for robust routing and server-side API routes.
- **Library:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety and code maintainability.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first styling and complex UI effects.
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/)
- **Mapping:** [React Leaflet](https://react-leaflet.js.org/) (dynamically imported for SSR compatibility)
- **Email Service:** [EmailJS](https://www.emailjs.com/)
- **AI Integration:** Google Gemini API (via Next.js Route Handlers)

---

## 🚀 Local Evaluation Setup

If the evaluation team wishes to run the project locally, follow these instructions:

### Prerequisites
- Node.js (v18.17.0 or higher recommended)
- npm, yarn, pnpm, or bun

### 1. Installation
```bash
git clone <your-repo-url>
cd superhero-portal
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory and configure the EmailJS and Gemini credentials (a template is provided in `.env.local.example`):
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure Highlights

- `src/app/page.tsx` - The main dashboard with the cinematic boot sequence, 3D cityscape, and hero roster.
- `src/app/contact/page.tsx` - The A.U.T.O. Chatbot interface with 3D model and TTS.
- `src/app/transmit-distress/page.tsx` - The interactive leaflet map for distress beacon placement.
- `src/app/about/page.tsx` - Comprehensive lore and corporate background of G.A.I.A.
- `src/components/`
  - `CyberpunkCityscape.tsx` - Endless 3D city rendering logic using react-three-fiber.
  - `BootSequence.tsx` & `StarWarsCrawl.tsx` - Cinematic intro animations.
  - `HeroesGrid.tsx` - The operative roster and expandable dossiers.
  - `MapComponent.tsx` & `DistressForm.tsx` - Leaflet map and submission form.
  - `TopNavigation.tsx` - Global navigation with audio controls.
- `src/lib/emailService.ts` - EmailJS transmission configuration.
- `src/app/api/chat/route.ts` - Backend route handler for Gemini AI integration.

---

*Thank you for reviewing my submission for the Techascent Machine Test.*
