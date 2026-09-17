# G.A.I.A. (Global Anomaly Investigation Agency) - Superhero Portal

## Overview
The **G.A.I.A. Superhero Portal** is an interactive, high-tech web application designed as a classified portfolio and incident reporting system. Originally experimenting with a S.H.I.E.L.D./Avengers theme, it has been fully reverted to its original G.A.I.A. lore while retaining a **Premium Superhero Glassmorphism UI**.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Library:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS (featuring extensive use of `backdrop-blur`, custom shadows, and translucent borders)
- **Animations:** Framer Motion (for page transitions, hover effects, and parallax)
- **3D Graphics:** `@react-three/fiber` and `three`
- **Email Service:** EmailJS (`@emailjs/browser`) for secure transmission of data.

## Project Structure

### 1. `src/app/page.tsx`
- The main landing page.
- Features a premium high-tech UI (cyan on dark background with glassmorphism).
- Displays the **CLASSIFIED PORTFOLIO // ID: GAIA-001**.
- Contains the core origin lore: *G.A.I.A. descends from the first generation of superhumans who received powers from the primordial guardian "GAIA" after its sacrifice to save the Earth.*

### 2. `src/components/TopNavigation.tsx`
- A fixed, glassmorphism header (`bg-[#050b14]/70 backdrop-blur-md border-b border-[#00e5ff]/20`).
- Displays the **G.A.I.A.** branding and logo.
- Contains navigation links and a "TRANSMIT DISTRESS" button.

### 3. `src/components/GaiaAnimation.tsx`
- Renders an interactive 3D Earth using `@react-three/fiber`.
- Has an animated overlay: `[ SYSTEM: INITIATING GUARDIAN PROTOCOL ]`.
- Serves as the high-tech, futuristic background for the main portal.

### 4. `src/components/HeroesGrid.tsx`
- Displays the Hero Roster of **G.A.I.A. Operatives** (e.g., Iron Man, Captain America, Thor).
- Features premium UI cards with cyan borders, glassmorphic backgrounds (`bg-[#050b14]/40 backdrop-blur-md`), and glowing hover effects.
- Includes an **expandable Dossier (Theatre Mode)** that takes up the full width, showing detailed stories, missions, and goals for each operative when clicked.

### 5. `src/components/Chatbot.tsx`
- A floating, interactive **G.A.I.A AI** chatbot interface.
- UI features a sleek glassmorphic window and cyan accents.
- **Workflow:**
  1. Requests the user's name.
  2. Requests the user's age.
  3. Automatically fetches the user's coordinates using the browser's Geolocation API.
  4. Requests an email address.
  5. Asks the user to describe their emergency or grievance.
- **EmailJS Integration:** Submits the gathered data (name, age, location, email, grievance) to the admin email (`aravindofficial.acc@gmail.com`) via `src/lib/emailService.ts`.

### 6. `src/components/CustomCursor.tsx`
- A custom, cyan-colored cursor that follows the user's mouse and expands when hovering over interactive elements.
- Enhances the premium, video-game-like feel of the portal.

### 7. `src/lib/emailService.ts`
- Handles the configuration and transmission of grievance reports via EmailJS.

## Recent Updates
- **Premium UI Revamp:** Successfully applied a unified aesthetic across all components. Characteristics include `#050b14` dark backgrounds with high opacity, `backdrop-blur-xl`, cyan (`#00e5ff`) borders and text with drop-shadow glows.
- **Lore Reversion:** Kept the premium UI but reverted all text, chatbot dialogue, and naming conventions from Marvel/S.H.I.E.L.D. back to the original G.A.I.A. identity.
- **Geolocation:** The chatbot now automatically captures user coordinates.
- **Dossier Expansion:** Replaced small modal boxes with full-width theatre-mode portfolio expansions for operatives.

## Current State
The project is currently running locally on port `3001` with no major errors. All UI features and functional requirements (chatbot, geolocation, 3D animation, styling) are fully implemented.
