# MISSION 001: MARTIAN EXPEDITION INTELLIGENCE
### Editorial-Grade Planetary Science & Astronaut EVA Planning Platform
**NASA Space Apps Challenge 2026 — Challenge 11: Interplanetary Survival Guide: Martian Map**

![NASA Space Apps 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-C2410C?style=for-the-badge&logo=nasa)
![React 18](https://img.shields.io/badge/React-18.3.1-1D4ED8?style=for-the-badge&logo=react)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-047857?style=for-the-badge&logo=leaflet)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-0F172A?style=for-the-badge&logo=tailwindcss)
![Build Status](https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge)

---

## 1. Overview & Editorial Design Philosophy

**MISSION 001: MARTIAN EXPEDITION INTELLIGENCE** is an editorial-grade, light-mode planetary science and astronaut surface exploration platform developed for **NASA Space Apps Challenge 2026 (Challenge 11)**.

Rejecting generic "sci-fi neon AI slop", the application adheres to high-craft Swiss cartographic principles, USGS Geological Survey standards, and NASA JPL Eyes design systems:
- **Canvas:** Warm alabaster (`#F8F9FA`) with pure white inspector panels (`#FFFFFF`) and 1px crisp borders (`#CBD5E1`).
- **Typography:** Google Fonts **`Space Grotesk`** (editorial headings), **`Plus Jakarta Sans`** (clean scientific body text), and **`JetBrains Mono`** (strictly for coordinates, elevation heights, DOIs, and rover telemetry).
- **Cartographic Engine:** Real **Leaflet.js** engine streaming live **NASA JPL Mars Trek WMTS XYZ tiles** centered on **Jezero Crater, Mars (`18.444° N, 77.401° E`, zoom `13`)**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      MISSION 001: MARTIAN EXPEDITION INTELLIGENCE                       │
├─────────────────────────┬──────────────────────────────────┬───────────────────────────┤
│ LAYER & CORRIDOR DRAWER │ REAL NASA MARS TREK LEAFLET MAP  │ TARGET INTELLIGENCE       │
│ (320px)                 │ (Center Full Viewport)           │ (420px Slide-Over)        │
│ • 4 Live NASA WMTS      │ • Viking Color Mosaic (232m)     │ • 4 Separated Scores      │
│   Tile Opacity Sliders  │ • Jezero CTX / HiRISE (6m)       │ • Epistemological Badges  │
│ • Research Corridor     │ • THEMIS Day IR Thermal Inertia  │ • DOI Citations           │
│ • RAD / MEDA Telemetry  │ • MOLA Topographic DEM Shading   │ • Astrobiology Rigor      │
│ • Simulate SEP Storm    │ • 5 Dossier Target Pins + Path   │ • Astronaut EVA Consumable│
└─────────────────────────┴──────────────────────────────────┴───────────────────────────┘
```

---

## 2. Real NASA Mars Trek Satellite Tile Engine

The map streams real live WMTS XYZ satellite imagery directly from **NASA JPL Mars Trek** with dynamic opacity blending:

1. **Optical Layer (Viking Color Mosaic):**
   `https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg`
2. **High-Res Jezero Crater CTX Overlay (6m):**
   `https://trek.nasa.gov/tiles/Mars/EQ/Jezerocrater_CTX_Mosaic_6m/1.0.0//default/default028mm/{z}/{y}/{x}.png`
3. **Thermal Infrared Layer (THEMIS Day IR):**
   `https://trek.nasa.gov/tiles/Mars/EQ/Mars_THEMIS_IR_Day_Mosaic_global_100m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg`
4. **Topographic Elevation Layer (MOLA Colorized Hillshade):**
   `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_Shade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg`
5. **Radiation & Environmental Layer (RAD / MEDA):**
   GCR background (`0.64 mSv/day`), pressure (`725 Pa`), wind vector (`12 m/s NW`), dust opacity (`τ = 0.44`), and an interactive **"Simulate SEP Alert"** trigger highlighting terrain-shielded sites.

---

## 3. Master Scientific Research Dossier (5 Verified Targets)

| Target | Coordinates & Elevation | Geological Formation | Primary Literature Reference | 4 Separated Scores |
|---|---|---|---|---|
| **Target 01: Crater-Floor Igneous Formations** | `18.428° N, 77.451° E` (-2565 m) | Séítah & Máaz Igneous Basement | Farley et al. (2022), *Science* [DOI: 10.1126/science.abo2196](https://doi.org/10.1126/science.abo2196) | Hab: 48 \| Bio: 18 \| Sci: 82 \| Suit: 92 (Safe &lt;5°) |
| **Target 02: Western Delta & Delta-Front Deposits** | `18.452° N, 77.422° E` (-2528 m) | Kodiak-Equivalent Delta Megaclasts | Mangold et al. (2021), *Science* [DOI: 10.1126/science.abl4051](https://doi.org/10.1126/science.abl4051) | Hab: 76 \| Bio: 35 \| Sci: 88 \| Suit: 64 (Caution 13°) |
| **Target 03: Delta Fine-Grained Sedimentary Layers** | `18.458° N, 77.409° E` (-2510 m) | Lacustrine Mudstones (Smectite Clays) | Mangold et al. (2021) & Farley et al. (2020) [DOI: 10.1007/s11214-020-00762-y](https://doi.org/10.1007/s11214-020-00762-y) | Hab: 86 \| Bio: 58 \| Sci: 90 \| Suit: 76 (Safe 7°) |
| **Target 04: Neretva Vallis & Bright Angel (Cheyava Falls)** | `18.444° N, 77.401° E` (-2521 m) | Veined Mudstones, Vivianite Fe-PO₄ & Greigite Fe-S | Hurowitz et al. (2025), *Nature* Vol. 645 [DOI: 10.1038/s41586-025-09413-0](https://doi.org/10.1038/s41586-025-09413-0) | Hab: 92 \| Bio: 86 \| Sci: 98 \| Suit: 84 (Caution 11°) |
| **Target 05: Carbonate-Bearing Margin Unit** | `18.465° N, 77.388° E` (-2485 m) | Hydrated Shoreline Carbonates & Chert | Farley et al. (2020), *Space Sci. Rev.* [DOI: 10.1007/s11214-020-00762-y](https://doi.org/10.1007/s11214-020-00762-y) | Hab: 85 \| Bio: 54 \| Sci: 94 \| Suit: 51 (Warning 18°) |

---

## 4. Epistemological Traceability & Astrobiological Rigor

In strict compliance with NASA scientific integrity directives:

### Target 04 Official Classification
> **"POTENTIAL BIOSIGNATURE — NOT CONFIRMED EVIDENCE OF LIFE"**

Each target in the **Target Intelligence Drawer** decomposes evidence into 4 distinct epistemological categories:
1. `DIRECT OBSERVATION`: Empirical data from rover instruments (SHERLOC deep-UV Raman, PIXL micro-XRF, SuperCam RMI, Mastcam-Z).
2. `PUBLISHED INTERPRETATION`: Peer-reviewed deductions with clickable direct DOI hyperlinks.
3. `RESEARCH HYPOTHESIS`: Working models of ancient Jezero paleo-environments.
4. `COMPETING ABIOTIC EXPLANATION`: Rigorous non-biological alternatives (e.g. low-temperature diagenetic fluid mixing, Fischer-Tropsch-type synthesis, or radiolytic organic alteration).

---

## 5. Astronaut Marswalk (EVA) Operational Intelligence

Switch between **Habitat Science Mode** and **Astronaut EVA Wrist-Pad Mode**:
- Distance from **Habitat Alpha Station** (`18.435° N, 77.435° E`).
- Dynamic walk-back safety timer based on average suit speed.
- Consumable reserves burn projection (Spacesuit O₂ and battery capacity).
- Slope angle stability warnings with bipedal mobility thresholds:
  - 🟢 **Safe (`< 10°`):** Normal bipedal locomotion.
  - 🟡 **Caution (`10°–15°`):** Center-of-mass strain; tether robotic MULE rover.
  - 🔴 **Warning (`> 15°`):** Impassable crater rim scarp requiring switchbacks.
- Perseverance **Mastcam-Z & Navcam eye-level ground context** so astronauts recognize rock formations upon arrival.

---

## 6. Local Run & Deployment

### Quick Run
```bash
# Clone and install dependencies
git clone https://github.com/txtx1182-cyber/martian-expedition-intelligence.git
cd martian-expedition-intelligence
npm install

# Run Vite dev server
npm run dev
# Accessible at http://localhost:3000
```

### Static Site Deployment on Render
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
