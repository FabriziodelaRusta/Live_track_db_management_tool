# Live_track Database Calendar Manager

A visual calendar and GPS track inspection manager for **Firebase Realtime Database** (`tracking/YYYYMMDD/[tracker]/...`).

![Version](https://img.shields.io/badge/version-v1.15-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38b2ac.svg)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900.svg)

---

## 🚀 Two Ways to Use

This project gives you two fully functional implementations:

### Option 1: Standalone Single HTML File (Zero Dependencies)
You do **not** need Node.js, npm, or any server.
- Simply open [`public/Live_track_db_manager.html`](./public/Live_track_db_manager.html) directly in any modern web browser (even via `file://`).
- Includes Tailwind CSS CDN, FontAwesome, Leaflet maps, and complete Firebase RTDB communication in one single file.
- Portable: copy it to a USB stick, email it, or host it on any static web host.

### Option 2: Full Modern React 19 + TypeScript SPA
A modular, high-performance web application built with React 19, TypeScript, Vite, Tailwind CSS, and Lucide icons.
- **Port:** `3000` (default)
- **Local Dev:** `npm run dev`
- **Build Output:** `npm run build` (outputs to `./dist`)

---

## ✨ Features

- **80% Width Calendar Grid**: Responsive calendar interface displaying days with recorded GPS tracking data.
- **Full Month Navigation**: Seamlessly navigate between months using:
  - Previous / Next buttons
  - "Today" quick button
  - Month and Year dropdown selectors
  - **Recorded Months Quick Jump** chips showing exactly which months have stored data.
- **GPS Track Inspector**:
  - Embedded interactive **Leaflet** map with start and finish markers and polyline track.
  - Direct links to view the track in **Google Maps** or **OpenStreetMap**.
  - **Standard GPX Export**: Download `.gpx` files ready for Garmin, Strava, or Google Earth.
  - Chronological point-by-point table with latitude, longitude, timestamp, fix count (FC), and map pins.
  - Raw JSON inspection and one-click copy.
- **Protected Deletion & Admin Security Window**:
  - Delete operations are protected by an authentication drawer.
  - An **Auth** button is located to the right of the **Config** button in the header.
  - A slide-out **Security** window with a clickable handle is anchored to the right edge of the screen.
  - Default admin password is `admin`, and you can change it at any time in the panel.
  - Single-date deletion and batch whole-month deletion with safety confirmation prompts.
- **Dual Export & Backup**:
  - Export single-day JSON backups.
  - Export whole-month combined JSON backups.

---

## 🛠️ Getting Started in a New GitHub Repo

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later (v20+ recommended)
- `npm` (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available NPM Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server on port `3000` |
| `npm run build` | Builds the React app and bundles `Live_track_db_manager.html` into `./dist` |
| `npm run preview` | Previews the production build locally on port `3000` |
| `npm run lint` | Runs the TypeScript compiler (`tsc --noEmit`) to verify types |
| `npm run validate:html` | Validates syntax and UI integrity of `Live_track_db_manager.html` |
| `npm run verify` | Runs lint + HTML validation + production build in one command |
| `npm run clean` | Removes `./dist` and temporary build artifacts |

---

## 🤖 GitHub Actions Workflows

This repository includes pre-configured GitHub Actions workflows in `.github/workflows/`:

### 1. Continuous Integration (`.github/workflows/ci.yml`)
Runs automatically on every `push` and `pull_request` to any branch:
- Installs dependencies with npm caching.
- Runs TypeScript strict type-checking (`npm run lint`).
- Runs the standalone HTML validation suite (`npm run validate:html`).
- Builds the production distribution (`npm run build`).
- Verifies that both `index.html` and `Live_track_db_manager.html` are present in `dist/`.

### 2. GitHub Pages Deployment (`.github/workflows/deploy-pages.yml`)
Deploys the application directly to **GitHub Pages** whenever changes are pushed to `main` or `master`:
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push to `main` or trigger the workflow manually under the **Actions** tab.
5. Your application will be live at:
   - React Application: `https://<username>.github.io/<repo>/`
   - Standalone HTML: `https://<username>.github.io/<repo>/Live_track_db_manager.html`

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Continuous Integration workflow
│       └── deploy-pages.yml       # Automated GitHub Pages deployment
├── public/
│   └── Live_track_db_manager.html # Standalone zero-dependency single-file application
├── scripts/
│   └── validate-html.cjs          # Validation script for HTML & embedded JS integrity
├── src/
│   ├── components/
│   │   ├── AdminAuthDrawer.tsx    # Slide-out admin security window & password management
│   │   ├── CalendarDayCell.tsx    # Day cell rendering with entry counts & delete triggers
│   │   ├── CalendarGrid.tsx       # 7-day responsive grid (Monday-first)
│   │   ├── CalendarHeader.tsx     # Navigation, month delete, config, and auth button
│   │   ├── DateDetailsModal.tsx   # GPS track modal, Leaflet map, chronology table, GPX export
│   │   ├── DeleteConfirmModal.tsx # Safe confirmation modal for single date & month deletion
│   │   ├── SettingsModal.tsx      # Firebase RTDB URL and root path configuration
│   │   └── Toast.tsx              # Toast notification system
│   ├── services/
│   │   ├── adminAuth.ts           # Admin authentication state & password persistence
│   │   └── firebaseRtdb.ts        # Firebase Realtime Database REST API client
│   ├── types/
│   │   └── tracking.ts            # TypeScript data models and interfaces
│   ├── utils/
│   │   ├── dateUtils.ts           # Date formatting, calendar grid generation, and math
│   │   └── trackUtils.ts          # GPX generation, distance calculation, point extraction
│   ├── App.tsx                    # Top-level React application container
│   ├── index.css                  # Global styles and Tailwind imports
│   └── main.tsx                   # React DOM entry point
├── .gitattributes                 # Cross-platform line ending normalization (LF)
├── .gitignore                     # Git ignore rules for node_modules, dist, logs
├── index.html                     # Vite entry HTML point
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # TypeScript compiler options
└── vite.config.ts                 # Vite bundler configuration (with base: './')
```

---

## ⚙️ Configuration

### Firebase Realtime Database
By default, the application connects to:
- **Base URL:** `https://live-track-799f8-default-rtdb.europe-west1.firebasedatabase.app`
- **Root Path:** `tracking`
- **Data Structure:**
  ```json
  {
    "tracking": {
      "YYYYMMDD": {
        "[TrackerName]": {
          "current": { "lat": 0.0, "lon": 0.0, "time": "YYYY-MM-DD HH:mm:ss", "FC": 1 },
          "history": [ ... ]
        }
      }
    }
  }
  ```

To change the database endpoint:
- Click the **Config** button in the header bar.
- Enter your custom Firebase RTDB URL and save. It will be stored in your browser's `localStorage`.

---

## 👤 Author & Version

- **Version:** `v1.15`
- **Footer:** `v1.15 — Fabrizio de la Rusta`
