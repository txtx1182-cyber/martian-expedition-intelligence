# MISSION 001 / JEZERO EXPEDITION INTELLIGENCE
### Max-Resolution Planetary Surface & Astronaut Traverse Planning Platform
**NASA Space Apps Challenge 2026 — Challenge 11: Interplanetary Survival Guide: Martian Map**

![NASA Space Apps 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-C2410C?style=for-the-badge&logo=nasa)
![React 18](https://img.shields.io/badge/React-18.3.1-1D4ED8?style=for-the-badge&logo=react)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-047857?style=for-the-badge&logo=leaflet)
![OpenPlanetaryMap](https://img.shields.io/badge/Web%20Mercator-EPSG%3A3857-0F172A?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge)

---

## 1. Overview & Visual Aesthetic

**MISSION 001 / JEZERO EXPEDITION INTELLIGENCE** is an editorial-grade, light-mode planetary science and astronaut EVA traverse planning platform developed for **NASA Space Apps Challenge 2026 (Challenge 11)**.

Adhering strictly to Swiss cartographic design, USGS Planetary Geologic Maps, and NASA JPL Eyes design systems:
- **Canvas:** Warm alabaster (`#F8F9FA`), pure white inspector surfaces (`#FFFFFF`), 1px crisp borders (`#CBD5E1`), and deep slate ink (`#0F172A`).
- **Accents:** Mars Terracotta (`#C2410C`), Scientific Cobalt (`#1D4ED8`), and Safe Emerald (`#047857`).
- **Typography:** Google Fonts **`Space Grotesk`** (headings), **`Plus Jakarta Sans`** (scientific body text), and **`JetBrains Mono`** (planetocentric coordinates, elevations, PDS product IDs, and DOIs).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      MISSION 001 / JEZERO EXPEDITION INTELLIGENCE                      │
├─────────────────────────┬──────────────────────────────────┬───────────────────────────┤
│ TRAVERSE PLANNER DRAWER │ SATELLITE & TOPOGRAPHIC CANVAS   │ TARGET EVIDENCE CARD      │
│ (320px Floating Left)   │ (Center Full Viewport Canvas)    │ (420px Slide-Over Right)  │
│ • Preset Expeditions 1&2│ • Verified EPSG:3857 XYZ Tiles   │ • 8-Part Evidence Chain   │
│ • Custom Route Router   │   (OpenPlanetaryMap & MOLA S3)   │ • Qualitative Assessments │
│ • 4 Planetary Map Modes │ • 7 Regional Targets (T1–T7)     │ • Exact PDS Product IDs   │
│ • Layer Opacity Sliders │ • 45 km Greater Jezero Footprint │ • Astrobiology Rigor      │
│ • RAD / MEDA Audit      │ • CRISM & Hazard Vector Overlays │ • Published DOIs          │
├─────────────────────────┴──────────────────────────────────┴───────────────────────────┤
│ COLLAPSIBLE ALONG-TRACK ELEVATION PROFILE DRAWER (Figure 2: -2600m to -1750m vs. Dist) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Verified Planetary Tile Engine (Standard Web Mercator EPSG:3857)

To guarantee zero blank gray screens and zero projection warping, the map runs in standard Web Mercator (`EPSG:3857`) centered on **Greater Jezero Basin (`18.45°N, 77.40°E`)** at **Zoom 11** (regional scale: 4 to 14):

1. **Optical Satellite Layer (Mars Viking MDIM 2.1 Global Color Mosaic):**
   - URL: `https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png`
   - Hosted by OpenPlanetaryMap / CARTO, scaling smoothly up to zoom 14.
2. **Topographic Elevation Layer (MOLA Colorized Relief):**
   - URL: `https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png` (`tms: true`)
   - NASA Mars Global Surveyor MOLA laser altimetry color hypsometric tinting.
3. **Topographic Hillshade Layer (MOLA Grayscale Relief):**
   - URL: `https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-gray/{z}/{x}/{y}.png` (`tms: true`)
   - High-contrast shaded relief highlighting crater rims, scarps, and valleys.
4. **Celestia / Viking 16k Global True-Color Overlay:**
   - URL: `https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png` (`tms: true`)
5. **Scientific Vector Overlays:**
   - CRISM Spectral Mineralogy: Olivine (`#10B981` Emerald), Smectite Clays (`#0284C7` Cyan), Vivianite/Greigite Redox Front (`#D97706` Amber), Margin Carbonates (`#7C3AED` Violet).
   - Hazard Polygons: Western Rim Cliff Scarp (`>20°`), Delta Front Escarpment (`16°–22°`), and Neretva Alcove Terrain Shelter.

---

## 3. The 7 Regional Research Targets (T1–T7)

Spanning the ~45 km diameter of Greater Jezero Crater and Nili Planum:

| Target | Planetocentric Coords | Elevation | Stratigraphy & Key Literature | Assessments (Hab / Bio / Sci / Acc / Conf) |
|---|---|---|---|---|
| **T1: Eastern Basin Floor (LZ)** | `18.44°N, 77.58°E` | -2575 m | Crater floor basalt pavement baseline *(Farley et al. 2020)* | Low–Mod / Baseline / Mod / Optimal / High |
| **T2: South Séítah Ridge** | `18.31°N, 77.46°E` | -2568 m | Olivine cumulate; grain-boundary carbonates *(Farley et al. 2022)* | Mod / Weak / High / Mod / High |
| **T3: Western Delta Front** | `18.47°N, 77.38°E` | -2425 m | Gilbert delta bottomset/foreset mudstones *(Mangold 2021)* | High / Potential / Very High / Mod / High |
| **T4: Neretva & Bright Angel** | `18.53°N, 77.26°E` | -2350 m | Vivianite/greigite redox reaction halos ('leopard spots') *(Hurowitz 2025)* | Very High / Potential (Highest) / Crucial / Mod / Mod–Low |
| **T5: NW Margin Carbonates** | `18.63°N, 77.33°E` | -2180 m | Inner rim shoreline carbonates / bioherms *(Horgan et al. 2020)* | High / Potential / Very High / Mod–Diff / Mod |
| **T6: Western Rim Crest** | `18.38°N, 77.12°E` | -1790 m | Pre-Noachian uplifted crustal basement megabreccia | Low / Very Low / High / Extreme / High |
| **T7: Pliva Outlet Canyon** | `18.56°N, 77.74°E` | -2410 m | Catastrophic lake drainage breach canyon *(Fassett & Head 2005)* | Mod / Low–Mod / High / Mod / High |

---

## 4. Kilometer-Scale Expeditions & Elevation Profile

- **Expedition 1: Full Basin Rim-to-Floor Transect (`T1 → T2 → T3 → T4 → T5 → T6`, 55.6 km, +785 m climb):**
  Pressurized rover traverse from the floor landing zone (-2575m) through Séítah, Delta, Bright Angel, Margin Carbonates, up to the Western Rim Crest (-1790m).
- **Expedition 2: Paleolake Hydrological Loop (`T1 → T3 → T4 → T7`, 36.8 km, +225 m gain):**
  Complete hydrological cycle from floor, delta fan, Neretva inflow channel, to Pliva outflow breach canyon.
- **Interactive Along-Track Elevation Profile Drawer (Figure 2):**
  - Collapsible SVG profile (-2620m to -1750m over 0 to 55.6 km).
  - Hovering over points syncs a glowing animated cursor on the satellite map in real time.

---

## 5. 8-Part Scientific Evidence Chain & Environmental Disclosures

Selecting any target opens the 8-part inquiry template:
1. **What is here?** (Geological description)
2. **What was observed?** (Exact PDS Product IDs: HiRISE, DTMs, CRISM, CTX)
3. **What is interpreted?** (Published deductions with direct DOIs)
4. **How confident?** (Confidence rating + explicit reasoning)
5. **What else could explain it?** (Mandatory abiotic counter-hypotheses)
6. **What would change the assessment?** (Falsification & Mars Sample Return criteria)
7. **Can we get there?** (Astronaut suit accessibility & rover slope limits)
8. **Source & Data Availability Indicator** (Coverage confirmation)

### Mandatory Scientific Disclosures
- **Radiation:** No active surface RAD sensor on Perseverance at Jezero. Baseline values (~0.64 mSv/day) are Gale Crater Curiosity RAD analogues and MAVEN orbital models.
- **Cartography CRS:** Coordinates use Mars 2000 Planetocentric. Converting to planetodetic produces a ~5.8 km spatial shift.
- **Atmospheric Telemetry:** MEDA values represent localized point measurements, not a regional synoptic forecast.

---

## 6. Local Development & Render Deployment

### Local Development
```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

### Production Build
```bash
npm run build
# Compiles cleanly into dist/
```

### Render Deployment Instructions
1. Push this repository to GitHub.
2. In Render, select **New +** → **Static Site**.
3. Connect your GitHub repository: `martian-expedition-intelligence`.
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Click **Create Static Site**.
