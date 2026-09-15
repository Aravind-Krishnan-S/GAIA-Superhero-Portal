# G.A.I.A. Portal - Animation Proposal

To elevate the corporate sci-fi / cyberpunk aesthetic of the G.A.I.A. portal, we should introduce animations that mimic a high-tech, tactical OS and a secure corporate mainframe. Below is a comprehensive list of proposed animations and exactly where they will be implemented across the site.

## 1. Character Grid (`HeroesGrid.tsx`)
**Concept: Target Acquisition & Decryption**
*   **Target Lock Hover:** When hovering over a character card, thin red brackets `[ ]` will animate in from the corners, simulating a tactical targeting system locking onto the Operative.
*   **Color Snap & Glitch:** The image transitions from the sepia/grayscale filter to full color instantly, accompanied by a subtle 0.2-second RGB split/glitch effect to simulate the decryption of a classified corporate file.

## 2. Character Modal / Dossier (`DossierTheatre.tsx`)
**Concept: Holographic Materialization**
*   **Glitch-In Transition:** Instead of a smooth fade-in, the modal will "glitch" into existence with horizontal scanlines and static, as if G.A.I.A.'s OS is rapidly compiling the data.
*   **Data Scramble Text Reveal:** The character's name, role, and stats won't just appear. They will scramble through random alphanumeric characters (e.g., `X9F-2$#` -> `SPECTRE`) before locking into the correct text.
*   **Parallax Image Depth:** The character image will slightly tilt based on mouse movement (using Framer Motion), giving the 2D image a 3D holographic feel.

## 3. Top Navigation (`TopNavigation.tsx`)
**Concept: Tactical HUD**
*   **Cybernetic Underglow:** A thin, neon red line that tracks the user's active section or hovers under the cursor with a slight pulse, mimicking a tactical interface tracking movement.
*   **Digital Scanline Sweep:** A subtle, semi-transparent scanline that occasionally sweeps from the top of the header to the bottom.

## 4. Lore & Timeline (`GaiaIntelligence.tsx`)
**Concept: Command-Line Interface**
*   **Terminal Typing Effect:** The "MISSION PARAMETERS" text will type out letter-by-letter as if being streamed directly from the G.A.I.A. mainframe in real-time.
*   **Radar Ping Nodes:** The dots on the timeline (showing the history of Earth's corporate integration) will emit a continuous "radar ping" (concentric red circles expanding and fading out), signifying active intelligence nodes.

## 5. Hero / Intro Section (`Hero3D.tsx` & `BootSequence.tsx`)
**Concept: Mainframe Boot Sequence**
*   **System Boot-Up:** Upon loading the site, the screen flashes terminal code: `ESTABLISHING SECURE CONNECTION... VERIFYING PLANETARY CHARTER...`. The screen then splits horizontally to reveal the 3D interactive Earth.
*   **Particle Orbit:** In the 3D scene, tiny red and white light particles (representing satellites and orbital defenses) will rapidly orbit the Earth model.

## 6. Global Incident Map (`GlobalIncidentMap.tsx`)
**Concept: Live Threat Monitoring**
*   **Aggressive Pulsing Markers:** Anomaly markers on the map will pulse. Higher threat levels (like alien corporate incursions) will pulse faster and brighter red.
*   **Radar Sweep:** A classic, translucent green/red radar sweep line constantly rotating over the entire map component to show active monitoring.

---
*Let me know which of these you love the most, and we can begin implementing them!*
