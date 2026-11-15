# MISSION 001 / JEZERO EXPEDITION INTELLIGENCE
### Max-Resolution Planetary Surface & Astronaut Traverse Planning Platform
**NASA Space Apps Challenge 2026 — Challenge 11: Interplanetary Survival Guide: Martian Map**

![NASA Space Apps 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-C2410C?style=for-the-badge&logo=nasa)
![React 18](https://img.shields.io/badge/React-18.3.1-1D4ED8?style=for-the-badge&logo=react)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-047857?style=for-the-badge&logo=leaflet)
![HiRISE](https://img.shields.io/badge/HiRISE-0.25m%2Fpx-0F172A?style=for-the-badge)
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
│ • Preset Sorties 1 & 2  │ • Procedural Canvas Shader       │ • 8-Part Evidence Chain   │
│ • Custom EVA Builder    │   (Guaranteed Zero Blank Tiles)  │ • Qualitative Assessments │
│ • 5 Planetary Map Modes │ • HiRISE 0.25m/px Mosaic         │ • Exact PDS Product IDs   │
│ • Layer Opacity Sliders │ • 9 Verified Targets (T1–T9)     │ • Astrobiology Rigor      │
│ • RAD / MEDA Audit      │ • Continuous Elevation Path      │ • Published DOIs          │
├─────────────────────────┴──────────────────────────────────┴───────────────────────────┤
│ COLLAPSIBLE ALONG-TRACK ELEVATION PROFILE DRAWER (Figure 2: -2600m to -1800m vs. Dist) │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Guaranteed Hybrid Canvas Shader & NASA Mars Trek Engine

### Why Standard Web Maps Show Blank Tiles on Mars
NASA Mars Trek `/EQ/` WMTS tiles use **Equirectangular (`EPSG:4326`)** projections with a 2×1 root grid rather than standard Web Mercator (`EPSG:3857`), and tile servers frequently rate-limit or omit deep zoom levels, resulting in blank white or gray boxes.

### Our Hybrid Engine Solution (Option B)
We developed a custom Leaflet `L.GridLayer` that renders on an HTML5 Canvas tile-by-tile right underneath the orbital WMTS layers:
- **Zero Blank Screen Guarantee:** Even if offline or zooming up to meter-scale zoom level 20, the engine procedural shader renders rich Martian ochre/basalt relief, deltaic sediments, Neretva channel walls, and 20m elevation contours.
- **5 Vivid Planetary Map Modes:**
  1. **HiRISE / CTX Optical Satellite Mode (Default):** Ochre bedrock, dark basalt floor, and bright tan Neretva mudstones (`Bright Angel / Cheyava Falls`).
  2. **THEMIS Thermal Infrared Mode:** False-color thermal inertia heatmap (`cold fine dust = purple/blue`, `warm bedrock & boulder fields = yellow/white`).
  3. **MOLA Hypsometric Elevation Mode:** Colorized scientific elevation ramp matching Figure 1 of the brief (`Deep Cobalt Blue = -2586m Crater Floor` → `Teal/Green = -2421m Delta Front` → `Gold/Crimson = -1820m Margin Unit`).
  4. **CRISM Spectral Mineralogy Mode:** Translucent mineral polygons:
     - *Olivine & Mg-Fe Carbonates* (`#10B981` Emerald over T2 Séítah)
     - *Fe/Mg Smectite Clays* (`#0284C7` Cyan over T4 Delta Front & T5 Upper Delta)
     - *Vivianite & Greigite Redox Front* (`#D97706` Amber over T6 Neretva & T7 Bright Angel)
     - *Lacustrine Carbonates* (`#7C3AED` Violet over T8 Margin Unit)
  5. **Slope & Radiation Hazard Mode:** Highlights `>15°` cliff faces in hatched Crimson (`#EF4444`) and terrain-shielded low-dose alcoves in Emerald.

---

## 3. Continuous Traverse Track & Sortie 1 Micro-EVA

- **Continuous Full Traverse Track (`T1 → T9`):** Multi-point polyline colored continuously by elevation (`-2586m` blue to `-1820m` red) with labeled distance milestones (0 km, 12 km, 24 km, 33 km, 42 km, 48 km).
- **Sortie 1 Micro-EVA (`T6 Neretva → T7 Bright Angel`, ~170m straight-line / 242m traverse, +8.3m elevation gain):**
  - Zooms tightly to **zoom 17** centered between T6 and T7.
  - High-visibility glowing emerald/cyan path with 50m distance markers.
  - ~100m Sol 1196 rover localization offset boundary circle around Cheyava Falls.
- **Interactive Along-Track Elevation Profile Drawer (Figure 2):**
  - Collapsible bottom drawer showing elevation (-2600m to -1800m) vs distance (0 to 48.6 km).
  - Hovering along the profile chart moves a live cursor dot along the map route in real time.

---

## 4. The 9 Verified Targets (T1–T9)

| Target | Planetocentric Coords | Elevation | Stratigraphy & Key Literature | Assessments (Hab / Bio / Sci / Acc / Conf) |
|---|---|---|---|---|
| **T1: Landing** | `18.4446°N, 77.4509°E` | -2569.9 m | Crater floor igneous baseline *(Farley et al. 2020)* | Low–Mod / None / Mod / Easy / High |
| **T2: Séítah** | `18.4325°N, 77.4407°E` | -2571.8 m | Olivine cumulate; grain-boundary carbonates *(Farley et al. 2022)* | Mod / Weak–None / High / Easy / Mod |
| **T3: Máaz** | `18.4619°N, 77.4361°E` | -2555.2 m | Basaltic cap lava flows / sills *(Farley et al. 2022)* | Low–Mod / None / Mod / Easy / Mod |
| **T4: Delta Front** | `18.4827°N, 77.3686°E` | -2421.1 m | Shenandoah Fm laminated mudstones *(Mangold 2021, Stack 2024)* | High / Potential / High / Mod / Mod |
| **T5: Upper Delta** | `18.4954°N, 77.3466°E` | -2398.5 m | Topset boulder conglomerate & flood scarp *(Mangold 2021)* | High / Potential / High / Difficult / Mod |
| **T6: Neretva** | `18.4961°N, 77.3038°E` | -2362.8 m | Inflow channel floor; ~170 m staging approach to Bright Angel | High / Potential / High / Mod / Mod |
| **T7: Bright Angel** | `18.4974°N, 77.3051°E` | -2354.5 m | Veined mudstone; vivianite/greigite redox reaction halos *(Hurowitz 2025)* | High / Potential (Highest, not confirmed) / High / Mod / Mod–Low |
| **T8: Margin Unit** *(Ext)* | `18.4606°N, 77.2647°E` | -1820.0 m | Inner rim carbonate unit; possible lacustrine bioherms *(Horgan 2020)* | Mod–High / Potential / High / Difficult / Low–Mod |
| **T9: West Rim** *(Ext)* | `18.4220°N, 77.2207°E` | -1973.6 m | Pre-Noachian uplifted basement megabreccia block | Unknown / Unknown / High / Difficult / Low |

---

## 5. 8-Part Scientific Evidence Chain & Environmental Honesty

When clicking any target (`T1–T9`), the right drawer opens with the exact 8-part inquiry template:
1. **What is here?** (Geological description)
2. **What was observed?** (PDS Product IDs: HiRISE `ESP_036618_1985`, `ESP_055211_1985`, `ESP_058930_1985`, `ESP_088272_1985`; HiRISE DTMs `DTEEC_045994_1985_046060_1985_U01`, `DTEEC_002387_1985_003798_1985_A01`; CRISM `ato00053d60_01_if125s_trr3`, `msv0005055b_01_if150s_trr3`, `msv0005079b_01_if150s_trr3`; CTX `P04_002743_1987_XI_18N282W`, `G13_023102_1986_XN_18N282W`)
3. **What is interpreted?** (Published deductions with clickable direct DOIs)
4. **How confident?** (Confidence rating + explicit reasoning)
5. **What else could explain it?** (Mandatory abiotic counter-hypotheses)
6. **What would change the assessment?** (Falsification & Mars Sample Return criteria)
7. **Can we get there?** (Astronaut suit accessibility & terrain roughness)
8. **Source & Data Availability Indicator** (Coverage confirmation)

### Environmental Honesty Audit
- **Radiation:** Explicitly states: *"No surface RAD sensor at Jezero; values shown are Gale Crater MSL RAD analogues / model estimates"* with interactive Solar Energetic Particle (SEP) storm alert simulation.
- **Atmosphere (MEDA):** Jezero point measurements with uncertainty bands—never presented as a regional forecast.
- **Water Ice Resource:** Explicitly labeled *"HYPOTHESIS ONLY — No verified present-day shallow ice deposit at Jezero Crater"*.

---

## 6. Local Development & Deployment

```bash
# Clone and install dependencies
git clone https://github.com/txtx1182-cyber/martian-expedition-intelligence.git
cd martian-expedition-intelligence
npm install

# Run Vite dev server
npm run dev

# Build for production (compiles to dist/)
npm run build
```

### Static Site Deployment on Render
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
