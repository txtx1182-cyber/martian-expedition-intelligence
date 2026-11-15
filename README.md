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

**MISSION 001 / JEZERO EXPEDITION INTELLIGENCE** is an editorial-grade, light-mode planetary science and astronaut EVA traverse planning platform built for **NASA Space Apps Challenge 2026 (Challenge 11)**.

Adhering strictly to Swiss cartographic design, USGS Planetary Geologic Maps, and NASA JPL Eyes design systems, the interface rejects dark neon aesthetics in favor of a clean, high-craft scientific workspace:
- **Canvas:** Warm alabaster (`#F8F9FA`), pure white inspector surfaces (`#FFFFFF`), 1px crisp borders (`#CBD5E1`), and deep slate ink (`#0F172A`).
- **Accents:** Mars Terracotta (`#C2410C`), Scientific Cobalt (`#1D4ED8`), and Safe Emerald (`#047857`).
- **Typography:** Google Fonts **`Space Grotesk`** (headings), **`Plus Jakarta Sans`** (scientific body text), and **`JetBrains Mono`** (strictly for coordinates, elevations, PDS product IDs, and DOIs).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      MISSION 001 / JEZERO EXPEDITION INTELLIGENCE                      │
├─────────────────────────┬──────────────────────────────────┬───────────────────────────┤
│ TRAVERSE PLANNER DRAWER │ MAX-RES MARS TREK LEAFLET MAP    │ TARGET EVIDENCE CARD      │
│ (320px Floating Left)   │ (Center Full Viewport Canvas)    │ (420px Slide-Over Right)  │
│ • Preset Sorties 1 & 2  │ • HiRISE 0.25m/px Mosaic (Zoom19)│ • 8-Part Evidence Chain   │
│ • Custom EVA Builder    │ • Viking Global Color Mosaic     │ • Qualitative Assessments │
│ • HiRISE / MOLA / THEMIS│ • MOLA Topographic Hillshade     │ • Exact PDS Product IDs   │
│   Layer Opacity Sliders │ • THEMIS-IR Day Global Mosaic    │ • Astrobiology Rigor      │
│ • Elevation Profile SVG │ • 9 Verified Targets (T1–T9)     │ • Published DOIs          │
│ • RAD / MEDA Audit      │ • CRS Guardrail Footer Badge     │ • Falsification Criteria  │
└─────────────────────────┴──────────────────────────────────┴───────────────────────────┘
```

---

## 2. Max-Resolution NASA Mars Trek Satellite Engine (Zoom 14–19)

The map engine renders live WMTS XYZ satellite tiles directly from **NASA JPL Mars Trek** supporting zoom levels 12 to 20 with `maxNativeZoom: 19`, allowing users to zoom down to **meter-scale rocks and individual outcrop fractures**:

1. **MAX-RES Optical Layer (MRO HiRISE + CTX + HRSC Jezero Mosaic, ~0.25–1 m/px native):**
   `https://trek.nasa.gov/tiles/Mars/EQ/NES_JEZ_MID_Visible_Mosaic_HiRISE_CTX_HRSC_GCS_MARS_07-10-2018/1.0.0/default/default028mm/{z}/{y}/{x}.png`
2. **Global Optical Fallback (Viking MDIM 2.1 Color Mosaic, 232 m/px):**
   `https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg`
3. **Topographic Elevation Layer (MGS MOLA + HRSC Colorized Hillshade, 463 m/px):**
   `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg`
4. **Thermal Infrared Layer (MO THEMIS-IR Day Global Mosaic, 100 m/px):**
   `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MO_THEMIS-IR-Day_mosaic_global_100m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg`

### Resolution & Coverage Audit Guardrails
Each layer features an individual opacity slider (0%–100%) and a dedicated **Native Resolution & Coverage Audit Badge**, explicitly warning users not to infer boulder-scale mobility safety from coarse CTX (~6 m/px), THEMIS (~100 m/px), or MOLA (~463 m/px) layers.

### Coordinate Reference System (CRS) Guardrail
Displayed in the persistent map footer:
> **"CRS: Mars 2000 Planetocentric (18.4446°N vs 18.3462°N Planetodetic = 5.8 km offset; USGS SIM 3464 carries 100–200 m offset)"**

---

## 3. The 9 Verified Targets (T1–T9)

All targets are populated using exact planetocentric coordinates, elevations, and peer-reviewed literature from the research brief:

| ID | Name | Coordinates | Elev. | Context & Primary Literature | Assessments (Hab / Bio / Sci / Acc / Conf) |
|---|---|---|---|---|---|
| **T1** | **Landing Site** | `18.4446°N, 77.4509°E` | -2569.9 m | Crater floor baseline; access to floor & delta (*Farley et al. 2020*) | Low–Mod / None / Mod / Easy / High |
| **T2** | **Séítah** | `18.4325°N, 77.4407°E` | -2571.8 m | Olivine cumulate; Mg–Fe carbonates; void sulfates (*Farley et al. 2022*) | Mod / Weak–None / High / Easy / Mod |
| **T3** | **Máaz** | `18.4619°N, 77.4361°E` | -2555.2 m | Overlying basaltic lava flows / sills (*Farley et al. 2022*) | Low–Mod / None / Mod / Easy / Mod |
| **T4** | **Delta Front** | `18.4827°N, 77.3686°E` | -2421.1 m | Shenandoah Fm laminated mudstone / conglomerate (*Mangold et al. 2021*) | High / Potential / High / Mod / Mod |
| **T5** | **Upper Delta** | `18.4954°N, 77.3466°E` | -2398.5 m | Topset beds, boulder conglomerate, flood scarp (*Mangold et al. 2021*) | High / Potential / High / Difficult / Mod |
| **T6** | **Neretva** | `18.4961°N, 77.3038°E` | -2362.8 m | Valley-floor fluvial outcrops; approach to Bright Angel (~170 m from T7) | High / Potential / High / Mod / Mod |
| **T7** | **Bright Angel** | `18.4974°N, 77.3051°E` | -2354.5 m | Organic-carbon mudstone; vivianite/greigite redox reaction fronts (*Hurowitz et al. 2025*) | High / Potential (Highest, not confirmed) / High / Mod / Mod–Low |
| **T8** | **Margin Unit** *(Ext)* | `18.4606°N, 77.2647°E` | -1820.0 m | Inner rim carbonate unit; possible lacustrine carbonates (*Horgan et al. 2020*) | Mod–High / Potential / High / Difficult / Low–Mod |
| **T9** | **West Rim** *(Ext)* | `18.4220°N, 77.2207°E` | -1973.6 m | Uplifted Noachian basement megabreccia block | Unknown / Unknown / High / Difficult / Low |

---

## 4. Interactive Meter-Scale EVA Route Planner

- **Real Mars Spherical Calculation Engine:** Uses Mars's volumetric mean radius ($R = 3,389,500\text{ m}$) to compute exact segment distances in meters, elevation deltas ($\Delta z$), and grade percentages.
- **Preset Local EVA Sorties:**
  - **Sortie 1: Neretva → Bright Angel Micro-EVA (`~170 m` straight-line / `~240 m` traverse | `+8.3 m` elevation gain | `~3.5%` mean grade):** Zooms tightly into T6 and T7 at zoom 18 on the HiRISE mosaic.
  - **Sortie 2: Crater Floor Igneous Transect (`T1 → T2`, `~930 m` | `-1.9 m` elevation change):** Flat baseline floor traverse.
  - **Full Research Corridor Context (`T1 → T7`, `~37.2 km`):** Dashed reference transect with mandatory notice: *"SCIENTIFIC RESEARCH TRANSECT — NOT A CERTIFIED SINGLE HUMAN MARSWALK ROUTE"*.
- **Custom Waypoint-to-Waypoint EVA Builder:** Allows users to tap directly on the meter-scale HiRISE satellite tiles to plot custom EVA traverses with real-time cumulative distance, walk time, and elevation profile chart.

---

## 5. 8-Part Scientific Evidence Chain & Environmental Honesty

When clicking any target, the right drawer opens with an 8-part scientific inquiry card:
1. **What is here?** (Geological description)
2. **What was observed?** (PDS Product IDs: HiRISE `ESP_036618_1985`, `ESP_055211_1985`, `ESP_058930_1985`, `ESP_088272_1985`; HiRISE DTMs `DTEEC_045994_1985_046060_1985_U01`, `DTEEC_002387_1985_003798_1985_A01`; CRISM `ato00053d60_01_if125s_trr3`, `msv0005055b_01_if150s_trr3`, `msv0005079b_01_if150s_trr3`; CTX `P04_002743_1987_XI_18N282W`, `G13_023102_1986_XN_18N282W`)
3. **What is interpreted?** (Published deductions with direct clickable DOIs)
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
