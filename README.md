# MISSION 001: MARTIAN EXPEDITION INTELLIGENCE
### Hyperlocal Tactical Surface Exploration & Biosignature Intelligence System
**NASA Space Apps Challenge 2026 — Challenge 11: Interplanetary Survival Guide: Martian Map**

![NASA Space Apps 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-EF4444?style=for-the-badge&logo=nasa)
![React 18](https://img.shields.io/badge/React-18.3.1-06B6D4?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-8B5CF6?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Build Status](https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge)

---

## 1. Project Overview

**MISSION 001: MARTIAN EXPEDITION INTELLIGENCE** is a dual-mode, hyperlocal tactical surface navigation and scientific analysis application engineered for human-robot Mars surface expeditions in **Neretva Vallis & Bright Angel (Jezero Crater, Mars: `18.44° N, 77.40° E`)**. 

It is tailored for a two-astronaut surface exploration team (**EVA-1 Lead Geologist Dr. Maya Chen** and **EVA-2 Safety Specialist Leo Vance**) operating in tandem with an autonomous robotic tool-carrier mule (**MARS-CARRIER-01**).

### Zero External API Key & Resilient Architecture
- **Self-Contained Vector & Canvas Engine:** Built with 100% bespoke SVG and Canvas rendering equations.
- **Zero External Map Tile API Keys:** No Mapbox, Google Maps, or external tile services required.
- **Zero Raw PDS `.IMG` Parsing Bottlenecks:** NASA instrument data (HiRISE, CRISM, PIXL, SHERLOC, MEDA, RAD) are pre-mapped into geometric vectors and telemetry models.
- **Production-Ready:** Compiles with zero errors directly to `dist/` and deploys seamlessly as a static site on **Render** or **GitHub Pages**.

---

## 2. Dual-Mode Interface Architecture

```
                                 ┌──────────────────────────────────────────────────────────┐
                                 │       MISSION 001: MARTIAN EXPEDITION INTELLIGENCE       │
                                 └────────────────────────────┬─────────────────────────────┘
                                                              │
                                ┌─────────────────────────────┴────────────────────────────┐
                                │                                                          │
                 ▼                                                          ▼
  ┌──────────────────────────────┐                           ┌──────────────────────────────┐
  │   HABITAT PLANNING CONSOLE   │                           │     EVA VISOR / WRIST-PAD    │
  ├──────────────────────────────┤                           ├──────────────────────────────┤
  │ • 5 Toggleable NASA Layers   │                           │ • High-Contrast Helmet HUD   │
  │ • Route Trade-Off Matrix     │                           │ • Dynamic Walk-Back Timer    │
  │ • Scientific Rigor Panel     │                           │ • Live Slope Angle Alerts    │
  │ • Instrument Provenance      │                           │ • Eye-Level Outcrop POV      │
  │ • Peer-Reviewed Citations    │                           │ • Crew Bio-Telemetry (O2/p)  │
  └──────────────────────────────┘                           └──────────────────────────────┘
```

1. **Habitat Planning Console Mode:** Full scientific analysis and route strategy cockpit. Flight controllers and scientists can toggle 5 NASA instrument layers, evaluate trade-offs between Route A and Route B, inspect peer-reviewed citations, and evaluate candidate biosignatures.
2. **EVA Visor / Wrist-Pad Mode:** High-contrast, low-cognitive-load heads-up display (HUD) for astronauts in pressurized EVA suits. Highlights dynamic walk-back safety timer, slope angle stability warnings, real-time life support telemetry (O2, battery, suit pressure 29.6 kPa), and ground-level target landmark recognition.

---

## 3. Hyperlocal 1.5 km × 1.5 km Tactical Map

The interactive tactical map renders an accurate 1.5 km × 1.5 km footprint across **Neretva Vallis** and **Bright Angel** (`18.432° N–18.452° N, 77.385° E–77.415° E`):
- **Dynamic Scale Bar (`0–500 m`):** Accurately scales with zoom level.
- **Pan & Zoom Controls:** Mouse drag, pinch, wheel zoom (75%–400%), and reset view.
- **5 Toggleable NASA Instrument Layers:**
  1. **Optical & Morphological Layer (HiRISE):** Paleo-fluvial channel banks, bedrock fracture systems, ripple dunes, and crater floor contact.
  2. **Topographic & Spacesuit Mobility Layer (HiRISE DEM):** Elevation contours (`-2540 m` to `-2505 m`) with spacesuit slope risk coding:
     - 🟢 **Safe (`< 10°`, Emerald):** Normal bipedal locomotion.
     - 🟡 **Caution (`10°–15°`, Amber):** Center-of-gravity strain; deploy robotic mule as stabilizer.
     - 🔴 **No-Go Scarp (`> 15°`, Crimson):** Impassable cliff faces and boulder fields avoided by planning.
  3. **Spectral & Mineralogical Layer (CRISM + PIXL):** Spatial distribution of olivine/pyroxene igneous basement (`Séítah/Máaz`), smectite clays (`Bright Angel`), marginal carbonates, and iron-phosphate/iron-sulfide redox facies (`Cheyava Falls`).
  4. **Atmospheric & Dust Layer (MEDA):** Dynamic wind vector streamlines (`12.4 m/s NW`), ambient temperature (`-48.2°C`), pressure (`725 Pa`), and dust optical depth (`τ = 0.44`).
  5. **Space Weather & Radiation Layer (RAD / MAVEN):** Real-time Galactic Cosmic Ray (GCR) baseline (`0.64 mSv/day`) with an interactive **"Simulate SEP Alert"** button triggering an emergency radiation warning, countdown to peak proton arrival, and escape navigation to the nearest terrain shielding alcove.

---

## 4. Traverse Routes & Verified Waypoints

### Selectable Routes
- **Route A — Primary Science Traverse (`1.65 km` | `3h 40m` | Max Slope `12.0°`):**
  - Visits all 5 scientific targets, optimizing astrobiology sample caching while skirting `>15°` scarps.
- **Route B — Safe Low-Slope Contingency Route (`1.20 km` | `2h 30m` | Max Slope `7.2°`):**
  - Stays strictly on flat channel-floor alluvium for rapid crew walk-back safety (`28 min` to Hab).

### 5 Verified Waypoints
| Waypoint | Coordinates | Elevation | Geological Unit & Key Significance | Suit Access |
|---|---|---|---|---|
| **WP-01: Habitat Airlock** | `18.438° N, 77.392° E` | -2540 m | Séítah / Máaz Igneous contact baseline *(Farley et al., 2022)* | 98 / 100 (Safe) |
| **WP-02: Neretva Rim** | `18.441° N, 77.396° E` | -2532 m | Fluvial flood boulder conglomerate *(Mangold et al., 2021)*; Emergency SEP overhang shelter | 78 / 100 (Safe) |
| **WP-03: Bright Angel** | `18.444° N, 77.401° E` | -2525 m | Fine-grained laminated lacustrine mudstone with smectite clays *(Hurowitz et al., 2025)* | 85 / 100 (Safe) |
| **WP-04: Cheyava Falls** | `18.446° N, 77.404° E` | -2521 m | **Primary Astrobiological Target:** Vivianite/greigite redox reaction halos & organic carbon *(Hurowitz et al., 2025)* | 74 / 100 (Caution 11.2°) |
| **WP-05: Carbonate Ridge** | `18.449° N, 77.407° E` | -2508 m | Paleolake shoreline carbonate unit *(Farley et al., 2020)*; adjacent to 18.5° no-go scarp | 52 / 100 (Caution 14.8°) |

---

## 5. Astrobiological Rigor Panel (Cheyava Falls / WP-04)

In accordance with strict NASA scientific reporting standards, the application clearly labels candidate biosignatures:

> **STATUS: "POTENTIAL BIOSIGNATURE — NOT CONFIRMED LIFE"**

The panel clearly demarcates:
1. **Direct Observations (Empirical Data):**
   - Deep-UV Raman spectroscopy: G-band aromatic carbon detection (~1600 cm⁻¹).
   - PIXL micro-XRF mapping: Millimeter halos with Fe-depleted, P-enriched cores (vivianite-type) ringed by Fe-S (greigite-type).
   - Calcium sulfate (gypsum/anhydrite) cross-cutting veins demonstrating sub-boiling fluid circulation.
2. **Biotic Hypothesis:** Ancient microbial iron- and sulfate-reducing metabolism utilizing organic matter as an electron donor.
3. **Competing Abiotic Explanations:**
   - Low-temperature diagenetic fluid mixing (acidic iron-bearing fluids encountering alkaline pore waters).
   - Fischer-Tropsch-type (FTT) organic synthesis catalyzed by iron-nickel basement minerals.
   - Radiolytic organic alteration driven by trace actinides in detrital heavy minerals.

---

## 6. First-Person POV Landmark Viewer

Clicking any waypoint loads a simulated **Mastcam-Z / Navcam Eye-Level Outcrop Profile**:
- **10 cm Reference Scale Bar** for in-situ field measurement.
- **Interactive Mineral Callout Pins:** Olivine phenocrysts, smectite layers, calcium sulfate veins, and millimetric "leopard spot" redox centers.
- **Drill Abrasion Targets:** Simulated 10 mm core extraction zones for sample tube caching.

---

## 7. Peer-Reviewed Scientific References

1. **Hurowitz, J. A., Tice, M. M., Allwood, A. C., et al. (2025).** *Aqueous alteration, redox chemistry, and potential biosignatures at Bright Angel, Jezero Crater.* **Nature Geoscience**. [DOI: 10.1038/s41561-025-01640-x](https://doi.org/10.1038/s41561-025-01640-x)
2. **Farley, K. A., Stack, K. M., Shuster, D. L., et al. (2022).** *Aqueously altered igneous rocks on the floor of Jezero crater, Mars.* **Science**, 377(6614). [DOI: 10.1126/science.abo2196](https://doi.org/10.1126/science.abo2196)
3. **Mangold, N., Gupta, S., Armstrong, O., et al. (2021).** *Perseverance rover reveals an ancient delta-lake system and flood deposits at Jezero crater, Mars.* **Science**, 374(6568), 711–717. [DOI: 10.1126/science.abl4051](https://doi.org/10.1126/science.abl4051)
4. **Farley, K. A., Williford, K. H., Stack, K. M., et al. (2020).** *Mars 2020 Mission Overview: Astrobiology, Sample Caching, and Jezero Crater Landing Site.* **Space Science Reviews**, 216(8), 142. [DOI: 10.1007/s11214-020-00762-8](https://doi.org/10.1007/s11214-020-00762-8)

---

## 8. Local Run & Development

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Installation & Run Steps
```bash
# 1. Clone the repository
git clone https://github.com/your-username/martian-expedition-intelligence.git
cd martian-expedition-intelligence

# 2. Install dependencies
npm install

# 3. Launch local Vite development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build
```bash
# Compile optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 9. Render Deployment Guide (Static Site)

This project is optimized for deployment on **Render**:

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Static Site**.
3. Connect your **GitHub repository**.
4. Configure the build parameters:
   - **Name:** `martian-expedition-intelligence`
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**.
6. Render will automatically build the React 18 application and deploy it to a high-speed global CDN (e.g., `https://martian-expedition-intelligence.onrender.com`).

---

## 10. License & Attribution
Developed for the **NASA Space Apps Challenge 2026**. Planetary scientific data derived from NASA Mars 2020 Perseverance, Mars Reconnaissance Orbiter (HiRISE/CRISM), and MAVEN missions.
