// MISSION 001 / JEZERO EXPEDITION INTELLIGENCE
// Master Scientific Research Dossier: 7 Regional Targets (T1-T7), Web Mercator Tile Engine,
// Full Basin Transect & Hydrological Loop Expeditions, & Exact Scientific Epistemology.
// NASA Space Apps Challenge 2026 - Challenge 11: Interplanetary Survival Guide

export const MARS_CONSTANTS = {
  MEAN_RADIUS_METERS: 3389500, // Mars volumetric mean radius
  GRAVITY_MS2: 3.72076,
  ATMOSPHERIC_PRESSURE_PA: 725,
  GCR_BASELINE_MSV_DAY: 0.64,
  SOLAR_EVENT_MSV_HOUR: 48.5,
  CRS_GUARDRAIL_NOTE: "CRS: Mars 2000 Planetocentric (18.4446°N vs 18.3462°N Planetodetic = 5.8 km offset; USGS SIM 3464 carries 100–200 m offset)"
};

export const MISSION_HEADER = {
  title: "MISSION 001 / JEZERO EXPEDITION INTELLIGENCE",
  subtitle: "Planetary Surface & Astronaut Traverse Planning Platform // Greater Jezero Basin",
  challenge: "NASA Space Apps Challenge 2026 // Challenge 11: Interplanetary Survival Guide: Martian Map",
  region: "Greater Jezero Crater & Nili Planum Margin (18.45°N, 77.40°E)",
  defaultCenter: [18.45, 77.40], // Regional Jezero Basin Center
  defaultZoom: 11
};

// 7 Regional Research Targets spanning the ~45 km Greater Jezero Basin & Rim Margin
export const VERIFIED_TARGETS = [
  {
    id: "T1",
    num: "T1",
    name: "Eastern Jezero Basin Floor / Landing Zone",
    shortName: "T1: Basin Floor Landing",
    lat: 18.44,
    lng: 77.58,
    elevation: -2575,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Low–Moderate",
      biosignature: "Baseline Negative",
      science: "Moderate",
      accessibility: "Optimal (Flat Floor)",
      confidence: "High",
      scoreHab: 38,
      scoreBio: 8,
      scoreSci: 68,
      scoreAcc: 98
    },
    pdsProducts: {
      hirise: ["ESP_036618_1985", "ESP_058930_1985"],
      dtm: ["DTEEC_045994_1985_046060_1985_U01"],
      crism: ["ato00053d60_01_if125s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Smooth, basaltic crater-floor pavement serving as primary landing staging area and baseline igneous floor unit (Máaz/Séítah transition).",
      whatWasObserved: "Viking, CTX, and HiRISE mosaics resolve flat, low-relief basaltic bedrock pavement with eolian dust mantling and sparse regolith ripples; LIBS and SuperCam confirm pyroxene-plagioclase igneous chemistry.",
      whatIsInterpreted: "Crater-floor igneous foundation providing geomechanical stability for lander touchdown, habitat setup, and pressurized rover staging (Farley et al., 2020).",
      doi: "10.1007/s11214-020-00762-y",
      doiCitation: "Farley, K. A. et al. (2020), Space Sci. Rev.",
      howConfident: "High confidence from Perseverance landing telemetry and multi-instrument ground calibration.",
      whatElseCouldExplainIt: "Indurated eolian sand sheet cemented by transient atmospheric salts rather than solid basaltic basement.",
      whatWouldChangeAssessment: "Shallow core sampling showing unconsolidated friable sediment exceeding 3 m depth beneath the surface pavement.",
      canWeGetThere: "Optimal bipedal and rover traverse (< 2° mean slope); negligible boulder obstruction; prime habitat hub location.",
      dataCoverageStatus: "Full HiRISE, CTX, MOLA, and CRISM coverage complete."
    }
  },
  {
    id: "T2",
    num: "T2",
    name: "South Séítah Olivine Ridge",
    shortName: "T2: Séítah Olivine Ridge",
    lat: 18.31,
    lng: 77.46,
    elevation: -2568,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Moderate",
      biosignature: "Weak / Abiotic",
      science: "High (Cumulate Geology)",
      accessibility: "Moderate (Dune Fields)",
      confidence: "High",
      scoreHab: 52,
      scoreBio: 15,
      scoreSci: 88,
      scoreAcc: 82
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985", "ESP_036618_1985"],
      dtm: ["DTEEC_045994_1985_046060_1985_U01"],
      crism: ["msv0005055b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Olivine-rich cumulate bedrock ridge displaying grain-boundary carbonate alteration and dark basaltic eolian dunes (Farley et al., 2022).",
      whatWasObserved: "CRISM 1.0 µm and 2.3 µm absorption bands indicate coarse forsteritic olivine (Fo45-Fo65) intergrown with augite, altered by magnesite/siderite rinds; PIXL resolves secondary sulfate void fills.",
      whatIsInterpreted: "Thick ultramafic igneous cumulate body emplaced by a differentiated magma lake or thick sill, subsequently altered by ancient aqueous carbonated fluids prior to lacustrine flooding (Farley et al., 2022).",
      doi: "10.1126/science.abo2196",
      doiCitation: "Farley, K. A., Stack, K. M. et al. (2022), Science Vol. 377",
      howConfident: "High confidence: In-situ abrasion patches and cached rover cores confirm igneous cumulate texture and carbonate coatings.",
      whatElseCouldExplainIt: "Subaqueous pyroclastic ash falls hydrothermally altered in a dense CO2-rich sublacustrine spring system.",
      whatWouldChangeAssessment: "Radiometric Ar-Ar/Pb-Pb dating revealing ages discordant with co-magmatic crystallization of the Jezero floor.",
      canWeGetThere: "Traverse over rocky ridges is smooth (< 4° grade), but transverse aeolian ridges (TARs) in interdune swales require high wheel-slip bypass.",
      dataCoverageStatus: "CRISM multispectral targeted observation + HiRISE stereopair validated."
    }
  },
  {
    id: "T3",
    num: "T3",
    name: "Western Delta Front & Kodiak Butte",
    shortName: "T3: Delta Front & Kodiak",
    lat: 18.47,
    lng: 77.38,
    elevation: -2425,
    isPrimaryTarget: false,
    assessments: {
      habitability: "High (Paleolake Standing Water)",
      biosignature: "Potential (High Preservation)",
      science: "Very High",
      accessibility: "Moderate (Delta Scarp)",
      confidence: "High",
      scoreHab: 85,
      scoreBio: 70,
      scoreSci: 96,
      scoreAcc: 70
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985", "ESP_088272_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Classic Gilbert-type river delta scarp with exposed bottomset and dipping foreset sedimentary strata, flanked by the Kodiak erosional outlier butte.",
      whatWasObserved: "HiRISE (0.25 m/px) and Mastcam-Z resolve dipping cross-stratified sandstone foresets overlying horizontal silty bottomset beds; CRISM confirms strong Fe/Mg smectite clay signatures.",
      whatIsInterpreted: "Sustained fluvial delta progradation into an open standing crater paleolake with water depths of 20–50 m, representing prime benthic organic carbon preservation conditions (Mangold et al., 2021).",
      doi: "10.1126/science.abl4051",
      doiCitation: "Mangold, N. et al. (2021), Science Vol. 374",
      howConfident: "High confidence: Sedimentary dip angles and stratigraphic stacking demonstrate open-water Gilbert delta deposition.",
      whatElseCouldExplainIt: "Dry eolian dune slipface progradation into an ephemeral dry tectonic graben.",
      whatWouldChangeAssessment: "Total absence of clay mineral flocs and aqueous grain smoothing in returned sample microscopic transmission analysis.",
      canWeGetThere: "Base of delta front is traversable via gentle alluvial wash (< 6° slope); avoid climbing vertical scarp faces (> 18° slope).",
      dataCoverageStatus: "Complete stereo DTM, CRISM phyllosilicate map, and Perseverance close-up rasters available."
    }
  },
  {
    id: "T4",
    num: "T4",
    name: "Neretva Vallis & Bright Angel Channel",
    shortName: "T4: Neretva & Bright Angel",
    lat: 18.53,
    lng: 77.26,
    elevation: -2350,
    isPrimaryTarget: true, // Primary Potential Biosignature Focus
    assessments: {
      habitability: "Very High (interpreted)",
      biosignature: "Potential (Highest Documented on Mars)",
      science: "Crucial (Top Priority)",
      accessibility: "Moderate",
      confidence: "Moderate–Low (Astrobiology)",
      scoreHab: 95,
      scoreBio: 92,
      scoreSci: 99,
      scoreAcc: 78
    },
    pdsProducts: {
      hirise: ["ESP_088272_1985", "ESP_055211_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Light-toned mudstone and sandstone outcrop ('Cheyava Falls') laced with white calcium sulfate veins and millimeter-scale redox reaction halos ('leopard spots'). Position corresponds to Sol 1196 rover localization.",
      whatWasObserved: "SHERLOC deep-UV Raman detected aromatic organic carbon signatures; PIXL mapped vivianite (iron-phosphate) cores with greigite (iron-sulfide) halos; WATSON imaged millimeter-scale reaction rings.",
      whatIsInterpreted: "Ancient chemical redox front where iron and sulfate reduction occurred with organic matter serving as electron donor, analogous to terrestrial microbial reduction textures (Hurowitz et al., 2025).",
      doi: "10.1038/s41586-025-09413-0",
      doiCitation: "Hurowitz, J. A., Tice, M. M. et al. (2025), Nature Vol. 645, p. 332",
      howConfident: "Moderate–Low confidence for biosignature interpretation: Geochemical facts are indisputable, but definitive life confirmation requires Mars Sample Return isotope fractionation testing.",
      whatElseCouldExplainIt: "Abiotic hydrothermal fluid mixing where acidic iron-rich brine reacted with alkaline sulfur-bearing groundwater; abiotic Fischer-Tropsch synthesis.",
      whatWouldChangeAssessment: "Carbon-13 / Carbon-12 and Sulfur-34 isotopic ratios showing values identical to non-biological volcanic volatiles.",
      canWeGetThere: "Follow Neretva channel bedrock floor (5°–8° grade); rover wheel anchorage is robust; ~170 m foot EVA zone from channel staging point.",
      dataCoverageStatus: "Full multi-sensor analytical suite (PIXL, SHERLOC, WATSON, SuperCam, Mastcam-Z) archived."
    }
  },
  {
    id: "T5",
    num: "T5",
    name: "Northwestern Lacustrine Margin Carbonates",
    shortName: "T5: Margin Carbonates",
    lat: 18.63,
    lng: 77.33,
    elevation: -2180,
    isPrimaryTarget: false,
    assessments: {
      habitability: "High (Paleolake Shoreline)",
      biosignature: "Potential (Bioherm / Microfossils)",
      science: "Very High",
      accessibility: "Moderate–Difficult",
      confidence: "Moderate",
      scoreHab: 84,
      scoreBio: 65,
      scoreSci: 94,
      scoreAcc: 55
    },
    pdsProducts: {
      hirise: ["ESP_036618_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005055b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Distinctive carbonate-rich marginal unit rimming the northwestern inner crater wall, distinct from crater floor Fe-Mg carbonates (Horgan et al., 2020).",
      whatWasObserved: "CRISM orbital reflectance exhibits strong 2.3 µm and 2.5 µm absorption doublet matching magnesite and hydrated magnesium carbonates interbedded with silica/chert deposits.",
      whatIsInterpreted: "Paleolake shoreline bathtub-ring precipitate or wave-agitated stromatolitic bioherms capable of preserving microfossils and organic matter (Horgan et al., 2020).",
      doi: "10.1016/j.icarus.2019.113526",
      doiCitation: "Horgan, B. H. N. et al. (2020), Icarus Vol. 339",
      howConfident: "Moderate confidence: Strong orbital spectral signature, but surface-level micro-morphology remains under investigation by Perseverance Sol 1300+ ascents.",
      whatElseCouldExplainIt: "Sub-surface regional serpentinization and talc-carbonate alteration of ultramafic basement unrelated to the lacustrine lake.",
      whatWouldChangeAssessment: "Discovery of purely metamorphic mineral assemblages (chrysotile, tremolite) lacking sedimentary bedding laminations.",
      canWeGetThere: "Approaching from delta upper terrace requires climbing 12°–15° slopes; requires tracked or 6-wheel rocker-bogie rover path.",
      dataCoverageStatus: "CRISM multispectral targeted observation + HiRISE stereopair validated."
    }
  },
  {
    id: "T6",
    num: "T6",
    name: "Western Crater Rim Crest",
    shortName: "T6: West Rim Crest",
    lat: 18.38,
    lng: 77.12,
    elevation: -1790,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Low (Noachian Uplift)",
      biosignature: "Very Low",
      science: "High (Planetary Evolution)",
      accessibility: "Extreme (Steep Rim Cliff)",
      confidence: "High",
      scoreHab: 25,
      scoreBio: 10,
      scoreSci: 89,
      scoreAcc: 28
    },
    pdsProducts: {
      hirise: ["ESP_036618_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["ato00053d60_01_if125s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Pre-Noachian to Early Noachian crustal basement megabreccia uplifted by the Jezero impact event (~3.9 Ga).",
      whatWasObserved: "HiRISE imagery resolves massive fractured megabreccia blocks (> 10 m across), fault scarps, and deeply eroded impact uplift stratigraphy.",
      whatIsInterpreted: "Ancient planetary crust predating Jezero Crater, preserving evidence of early Mars magnetic dynamo history, impact shock metamorphism, and mantle differentiation (Farley et al., 2020).",
      doi: "10.1007/s11214-020-00762-y",
      doiCitation: "Farley, K. A. et al. (2020), Space Sci. Rev.",
      howConfident: "High confidence for structural geological interpretation; low habitability potential.",
      whatElseCouldExplainIt: "Post-impact ballistic ejecta blanket from nearby Isidis Basin obscuring true in-situ rim bedrock.",
      whatWouldChangeAssessment: "Deep core drilling showing unbrecciated plutonic granite/gabbro without impact shock lamellae.",
      canWeGetThere: "Extreme slopes (> 20°); climb through breach valleys only; mandatory pressurized rover winch tether.",
      dataCoverageStatus: "Orbital-only coverage (HiRISE, CTX, THEMIS, MOLA)."
    }
  },
  {
    id: "T7",
    num: "T7",
    name: "Pliva Vallis Eastern Outlet Canyon",
    shortName: "T7: Pliva Outlet Canyon",
    lat: 18.56,
    lng: 77.74,
    elevation: -2410,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Moderate (Catastrophic Breach Drain)",
      biosignature: "Low–Moderate",
      science: "High (Paleohydrology)",
      accessibility: "Moderate",
      confidence: "High",
      scoreHab: 58,
      scoreBio: 30,
      scoreSci: 91,
      scoreAcc: 75
    },
    pdsProducts: {
      hirise: ["ESP_058930_1985"],
      dtm: ["DTEEC_045994_1985_046060_1985_U01"],
      crism: ["ato00053d60_01_if125s_trr3"],
      ctx: ["G13_023102_1986_XN_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Deeply incised bedrock canyon breaching the eastern wall of Jezero Crater, serving as the paleolake's catastrophic outflow drain.",
      whatWasObserved: "MOLA, CTX, and HiRISE reveal streamlined terraces, plunge-pool plunge scars, and scour channels carved through the eastern crater rim.",
      whatIsInterpreted: "Catastrophic lake drainage breach channel marking the maximum water-stand elevation of Lake Jezero before ultimate desiccation (Fassett & Head, 2005; Goudge et al., 2015).",
      doi: "10.1029/2005GL023456",
      doiCitation: "Fassett, C. I. & Head, J. W. (2005), Geophys. Res. Lett.; Goudge et al. (2015)",
      howConfident: "High confidence: Inverted spillway threshold geometry is clearly resolved in MOLA topographic contours.",
      whatElseCouldExplainIt: "Tectonic graben collapse modified by dry eolian wind deflation rather than water flow.",
      whatWouldChangeAssessment: "Absence of water-scoured plunge pools or hydraulic gravel bars in canyon floor cross-sections.",
      canWeGetThere: "Follow eastern floor apron toward breach; canyon entrance is broad and navigable (< 5° slope).",
      dataCoverageStatus: "Full CTX, MOLA, and HiRISE stereo coverage."
    }
  }
];

// Presets Kilometer-Scale Expeditions (Pressurized Rover + Local Foot Sorties)
export const PRESET_SORTIES = [
  {
    id: "preset-1",
    name: "Expedition 1: Full Basin Rim-to-Floor Transect",
    badge: "REGIONAL TRANSECT (55.6 km)",
    targetIds: ["T1", "T2", "T3", "T4", "T5", "T6"],
    center: [18.45, 77.40],
    zoom: 11,
    straightLineDistanceM: 38200,
    traverseDistanceM: 55600,
    traverseDistanceKm: 55.6,
    elevationDeltaM: 785.0,
    elevationGainM: 785.0,
    meanGradePct: 4.8,
    maxSlopeDeg: 22.0,
    durationHours: 14.5,
    mode: "Pressurized Rover + Local Foot EVAs",
    description: "Complete stratigraphy transect across the Greater Jezero Crater floor, climbing from the Eastern Floor landing zone (-2575m) through the Séítah olivine ridge, Western Delta scarp, Bright Angel potential biosignature outcrop, Margin Carbonates, and terminating at the Western Rim Crest (-1790m)."
  },
  {
    id: "preset-2",
    name: "Expedition 2: Paleolake Hydrological Loop",
    badge: "HYDROLOGICAL LOOP (36.8 km)",
    targetIds: ["T1", "T3", "T4", "T7"],
    center: [18.50, 77.50],
    zoom: 11,
    straightLineDistanceM: 26500,
    traverseDistanceM: 36800,
    traverseDistanceKm: 36.8,
    elevationDeltaM: 225.0,
    elevationGainM: 225.0,
    meanGradePct: 2.4,
    maxSlopeDeg: 8.5,
    durationHours: 8.2,
    mode: "Pressurized Rover Science Loop",
    description: "Hydrological loop investigating Jezero's entire water cycle: starting at Eastern Basin Floor (T1), inspecting the Western Delta Front (T3), visiting Neretva Inflow Channel & Bright Angel (T4), and crossing to the Pliva Vallis Eastern Outlet Canyon (T7)."
  }
];

// Continuous Multi-Point Full Traverse Track for Along-Track Elevation Profile (0 km to 55.6 km)
// Covers T1 (-2575m) -> T2 (-2568m) -> T3 (-2425m) -> T4 (-2350m) -> T5 (-2180m) -> T6 (-1790m)
export const FULL_TRAVERSE_TRACK = [
  { id: "tp-1", name: "T1: Eastern Basin Floor (LZ)", targetId: "T1", lat: 18.44, lng: 77.58, elevation: -2575, distKm: 0.0, slopeDeg: 1.0, unit: "Floor Basalt / LZ" },
  { id: "tp-2", name: "Basin Inter-Ridge Waypoint", targetId: null, lat: 18.38, lng: 77.52, elevation: -2572, distKm: 5.5, slopeDeg: 1.5, unit: "Floor Basalt Pavement" },
  { id: "tp-3", name: "T2: South Séítah Olivine Ridge", targetId: "T2", lat: 18.31, lng: 77.46, elevation: -2568, distKm: 10.5, slopeDeg: 2.8, unit: "Séítah Olivine Cumulate" },
  { id: "tp-4", name: "Séítah-Delta Valley Passage", targetId: null, lat: 18.39, lng: 77.42, elevation: -2510, distKm: 16.0, slopeDeg: 3.5, unit: "Distal Silt Apron" },
  { id: "tp-5", name: "T3: Western Delta Front (Kodiak)", targetId: "T3", lat: 18.47, lng: 77.38, elevation: -2425, distKm: 21.1, slopeDeg: 7.8, unit: "Shenandoah Delta Mudstones" },
  { id: "tp-6", name: "Neretva Fluvial Spillway", targetId: null, lat: 18.50, lng: 77.32, elevation: -2385, distKm: 25.2, slopeDeg: 4.2, unit: "Inflow Channel Gravel" },
  { id: "tp-7", name: "T4: Bright Angel / Cheyava Falls", targetId: "T4", lat: 18.53, lng: 77.26, elevation: -2350, distKm: 29.0, slopeDeg: 5.4, unit: "Bright Angel Redox Mudstone" },
  { id: "tp-8", name: "Lacustrine Shoreline Bench", targetId: null, lat: 18.58, lng: 77.30, elevation: -2270, distKm: 32.8, slopeDeg: 6.5, unit: "Transitional Carbonates" },
  { id: "tp-9", name: "T5: NW Margin Carbonate Unit", targetId: "T5", lat: 18.63, lng: 77.33, elevation: -2180, distKm: 36.2, slopeDeg: 11.5, unit: "Marginal Carbonates / Bioherms" },
  { id: "tp-10", name: "Rim Ascent Switchback Corridor", targetId: null, lat: 18.50, lng: 77.20, elevation: -2010, distKm: 45.0, slopeDeg: 15.2, unit: "Talus & Megabreccia Flank" },
  { id: "tp-11", name: "T6: Western Crater Rim Crest", targetId: "T6", lat: 18.38, lng: 77.12, elevation: -1790, distKm: 55.6, slopeDeg: 21.5, unit: "Noachian Basement Uplift" }
];

// Verified Standard Web Mercator (EPSG:3857) Mars Satellite Tile Layers
// Hosted by OpenPlanetaryMap / CARTO and AWS S3 WhereOnMars
export const NASA_TILE_LAYERS = [
  {
    id: "mars_optical",
    name: "Mars Optical Satellite (Viking MDIM 2.1 Global)",
    shortName: "Optical Mosaic",
    description: "Standard Web Mercator colorized planetary mosaic hosted by OpenPlanetaryMap / CARTO. Verified 200 OK without 404s.",
    url: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png",
    attribution: "© OpenPlanetaryMap / NASA / JPL / USGS / CARTO",
    tms: false,
    maxNativeZoom: 8,
    maxZoom: 14,
    defaultOpacity: 1.0,
    isPrimary: true
  },
  {
    id: "mola_color",
    name: "Topographic Elevation (MOLA Colorized Relief)",
    shortName: "MOLA Topo Color",
    description: "NASA Mars Global Surveyor MOLA colorized shaded relief altimetry. Hypsometric tinting from deep crater basin to rim peaks.",
    url: "https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png",
    attribution: "NASA / GSFC / MOLA Team / WhereOnMars",
    tms: true,
    maxNativeZoom: 6,
    maxZoom: 14,
    defaultOpacity: 0.65
  },
  {
    id: "mola_gray",
    name: "Topographic Hillshade (MOLA Grayscale Relief)",
    shortName: "MOLA Topo Gray",
    description: "High-contrast shaded relief hillshade showing crater rims, delta scarps, and valley fault lines.",
    url: "https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-gray/{z}/{x}/{y}.png",
    attribution: "NASA / GSFC / MOLA Team / WhereOnMars",
    tms: true,
    maxNativeZoom: 6,
    maxZoom: 14,
    defaultOpacity: 0.50
  },
  {
    id: "celestia_shaded",
    name: "Celestia / Viking 16k Global True-Color",
    shortName: "Celestia Global",
    description: "16k global true-color Martian surface mosaic providing high-fidelity regional color balance across Nili Planum.",
    url: "https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png",
    attribution: "NASA / JPL / Celestia / WhereOnMars",
    tms: true,
    maxNativeZoom: 5,
    maxZoom: 14,
    defaultOpacity: 0.40
  }
];

// CRISM Spectral Mineralogy Vector Polygons across Greater Jezero Basin
export const CRISM_MINERAL_POLYGONS = [
  {
    id: "crism-olivine-seitah",
    name: "Olivine + Mg-Fe Carbonates (Séítah Cumulate)",
    mineral: "Olivine (Fo45-Fo65) & Grain-Boundary Carbonates",
    color: "#10B981", // Emerald
    fillColor: "#10B981",
    fillOpacity: 0.35,
    weight: 2,
    targetAnchor: "T2: South Séítah",
    coords: [
      [18.28, 77.42],
      [18.35, 77.44],
      [18.36, 77.50],
      [18.30, 77.52],
      [18.27, 77.46]
    ]
  },
  {
    id: "crism-smectites-delta",
    name: "Fe/Mg Phyllosilicates & Smectite Clays (Western Delta)",
    mineral: "Nontronite / Saponite Smectite Clays",
    color: "#0284C7", // Cyan
    fillColor: "#0284C7",
    fillOpacity: 0.35,
    weight: 2,
    targetAnchor: "T3: Western Delta",
    coords: [
      [18.44, 77.34],
      [18.49, 77.35],
      [18.51, 77.40],
      [18.46, 77.42],
      [18.43, 77.38]
    ]
  },
  {
    id: "crism-redox-brightangel",
    name: "Redox Front: Vivianite (Fe-PO4) & Greigite (Fe-S)",
    mineral: "Vivianite, Greigite, Gypsum & Organic Carbon",
    color: "#D97706", // Amber
    fillColor: "#D97706",
    fillOpacity: 0.45,
    weight: 2.5,
    targetAnchor: "T4: Bright Angel Channel",
    coords: [
      [18.51, 77.23],
      [18.55, 77.24],
      [18.56, 77.29],
      [18.52, 77.28]
    ]
  },
  {
    id: "crism-carbonates-margin",
    name: "Lacustrine Shoreline Carbonates (Margin Unit)",
    mineral: "Magnesite, Hydrated Carbonates & Siliceous Chert",
    color: "#7C3AED", // Violet
    fillColor: "#7C3AED",
    fillOpacity: 0.35,
    weight: 2,
    targetAnchor: "T5: NW Margin Carbonates",
    coords: [
      [18.59, 77.28],
      [18.66, 77.30],
      [18.67, 77.36],
      [18.61, 77.37]
    ]
  }
];

// Terrain Slope & Radiation Hazard Polygons
export const SLOPE_HAZARD_ZONES = [
  {
    id: "hazard-west-rim-cliff",
    name: "Western Crater Rim Fault Scarp (> 20° Slope)",
    type: "CLIFF_HAZARD",
    color: "#EF4444",
    fillColor: "#EF4444",
    fillOpacity: 0.40,
    coords: [
      [18.32, 77.08],
      [18.42, 77.10],
      [18.43, 77.16],
      [18.34, 77.15]
    ]
  },
  {
    id: "hazard-delta-front-scarp",
    name: "Delta Front Eroded Escarpment (16°–22° Slope)",
    type: "CLIFF_HAZARD",
    color: "#F97316",
    fillColor: "#F97316",
    fillOpacity: 0.35,
    coords: [
      [18.46, 77.37],
      [18.49, 77.37],
      [18.50, 77.39],
      [18.47, 77.39]
    ]
  },
  {
    id: "safe-alcove-neretva",
    name: "Neretva Fluvial Alcove (Terrain-Shielded Low-RAD Zone)",
    type: "RAD_SHELTER",
    color: "#059669",
    fillColor: "#059669",
    fillOpacity: 0.30,
    coords: [
      [18.51, 77.25],
      [18.54, 77.25],
      [18.54, 77.28],
      [18.51, 77.28]
    ]
  }
];

// Helper: Mars Spherical Great-Circle Distance (Meters)
export function calculateMarsDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = MARS_CONSTANTS.MEAN_RADIUS_METERS;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

// Helper: Mars Spherical Great-Circle Distance (Kilometers)
export function calculateMarsDistanceKm(lat1, lon1, lat2, lon2) {
  return calculateMarsDistanceMeters(lat1, lon1, lat2, lon2) / 1000;
}
