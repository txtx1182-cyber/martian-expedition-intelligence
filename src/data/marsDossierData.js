// MISSION 001 / JEZERO EXPEDITION INTELLIGENCE
// Master Scientific Research Dossier: 9 Verified Jezero Targets (T1-T9),
// Mars Spherical Haversine Mobility Calculator (R = 3,389,500 m),
// Preset Sorties (Sortie 1, Sortie 2, Full Corridor) & 8-Part Scientific Epistemology.
// NASA Space Apps Challenge 2026 - Challenge 11: Interplanetary Survival Guide

export const MARS_CONSTANTS = {
  MEAN_RADIUS_METERS: 3389500, // Mars volumetric mean radius
  GRAVITY_MS2: 3.72076,
  ATMOSPHERIC_PRESSURE_PA: 725,
  GCR_BASELINE_MSV_DAY: 0.64,
  SOLAR_EVENT_MSV_HOUR: 48.5,
  CRS_GUARDRAIL_NOTE: "CRS: Mars 2000 Planetocentric (18.4446°N vs 18.3462°N Planetodetic = 5.8 km offset; USGS SIM 3464 carries 100–200 m offset)",
  EVA_DISCLAIMER: "Design assumption — not a NASA-certified safe route"
};

export const MISSION_HEADER = {
  title: "MISSION 001 / JEZERO EXPEDITION INTELLIGENCE",
  subtitle: "Planetary Surface & Astronaut Traverse Planning Platform // Greater Jezero Basin",
  challenge: "NASA Space Apps Challenge 2026 // Challenge 11: Interplanetary Survival Guide: Martian Map",
  region: "Greater Jezero Crater & Nili Planum Margin (18.45°N, 77.40°E)",
  defaultCenter: [18.45, 77.40],
  defaultZoom: 11
};

// All 9 Verified Research Targets from Research Brief
export const VERIFIED_TARGETS = [
  {
    id: "T1",
    num: "T1",
    name: "Octavia E. Butler Landing",
    shortName: "T1: Landing Site",
    lat: 18.4446,
    lng: 77.4509,
    elevation: -2569.9,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Low–Moderate",
      biosignature: "None Documented",
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
      whatIsHere: "Smooth, basaltic crater-floor pavement serving as landing zone and transition between floor igneous units and delta deposits.",
      whatWasObserved: "HiRISE (ESP_036618_1985, 0.25 m/px) resolves low-relief bedrock pavement with thin eolian dust veneers and shallow thermal contraction fissures; SuperCam LIBS confirms basaltic soil chemistry.",
      whatIsInterpreted: "Crater-floor igneous baseline providing undisturbed geomechanical foundation for vehicular staging and habitat placement (Farley et al., 2020).",
      doi: "10.1007/s11214-020-00762-y",
      doiCitation: "Farley, K. A. et al. (2020), Space Sci. Rev.",
      howConfident: "High confidence based on ground-truth Perseverance touchdown telemetry and sub-meter stereoscopic DTM validation.",
      whatElseCouldExplainIt: "Localized indurated eolian sand sheet cemented by transient atmospheric frost rather than continuous basaltic bedrock.",
      whatWouldChangeAssessment: "Trench excavation revealing thick unconsolidated regolith exceeding 2 meters depth beneath the pavement.",
      canWeGetThere: "Effortless bipedal traverse (< 3° slope); zero boulder obstacles exceeding 20 cm.",
      dataCoverageStatus: "Full HiRISE stereo DTM + 4-band color validation available."
    }
  },
  {
    id: "T2",
    num: "T2",
    name: "Séítah Formation",
    shortName: "T2: Séítah (Olivine Cumulate)",
    lat: 18.4325,
    lng: 77.4407,
    elevation: -2571.8,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Moderate",
      biosignature: "Weak / Abiotic",
      science: "High (Cumulate Petrology)",
      accessibility: "Moderate (Sand Dunes)",
      confidence: "High",
      scoreHab: 52,
      scoreBio: 14,
      scoreSci: 88,
      scoreAcc: 84
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985", "ESP_036618_1985"],
      dtm: ["DTEEC_045994_1985_046060_1985_U01"],
      crism: ["msv0005055b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Olivine-rich igneous cumulate bedrock exhibiting post-crystallization aqueous carbonate alteration (Farley et al., 2022).",
      whatWasObserved: "PIXL and SHERLOC micro-mapping resolve coarse olivine grains surrounded by pyroxene, with Mg–Fe carbonates along grain boundaries and secondary sulfate/perchlorate void fills.",
      whatIsInterpreted: "Thick igneous cumulate body emplaced by a differentiated magma lake or sill, modified by ancient carbonated brine infiltration before lake formation (Farley et al., 2022).",
      doi: "10.1126/science.abo2196",
      doiCitation: "Farley, K. A., Stack, K. M. et al. (2022), Science Vol. 377",
      howConfident: "High confidence: In-situ abrasion patches and cached rover cores confirm cumulate mineralogy.",
      whatElseCouldExplainIt: "Subaqueous pyroclastic fall deposits altered under late-stage hydrothermal steam rather than intrusive cumulate ponding.",
      whatWouldChangeAssessment: "Radiometric Pb-Pb or Ar-Ar isochron dating of returned core samples disproving co-magmatic crystallization.",
      canWeGetThere: "Level floor terrain; watch for sand ripples (TARs) between rocky outcrops that increase astronaut boot slip.",
      dataCoverageStatus: "Complete CRISM infrared spectral library and Perseverance rover core cache confirmation."
    }
  },
  {
    id: "T3",
    num: "T3",
    name: "Máaz Formation",
    shortName: "T3: Máaz (Basaltic Cap)",
    lat: 18.4619,
    lng: 77.4361,
    elevation: -2555.2,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Low–Moderate",
      biosignature: "None",
      science: "Moderate",
      accessibility: "Optimal",
      confidence: "High",
      scoreHab: 42,
      scoreBio: 6,
      scoreSci: 74,
      scoreAcc: 90
    },
    pdsProducts: {
      hirise: ["ESP_058930_1985"],
      dtm: ["DTEEC_045994_1985_046060_1985_U01"],
      crism: ["ato00053d60_01_if125s_trr3"],
      ctx: ["G13_023102_1986_XN_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Stratigraphically higher igneous member overlying Séítah, composed of basaltic lava flows or layered sills with vesicular horizons.",
      whatWasObserved: "SuperCam remote micro-imager shows plagioclase-pyroxene groundmass with iron-oxide phenocrysts and minor aqueous alteration rind coatings.",
      whatIsInterpreted: "Successive lava flow sheets that capped the Séítah cumulate unit, subsequently weathered during early wetter epochs (Farley et al., 2022).",
      doi: "10.1126/science.abo2196",
      doiCitation: "Farley, K. A. et al. (2022), Science Vol. 377",
      howConfident: "High confidence: Stratigraphic contact with Séítah observed in multiple abraded patches.",
      whatElseCouldExplainIt: "Impact melt sheet formed during a major post-Jezero impact basin event.",
      whatWouldChangeAssessment: "Discovery of shocked quartz or high-pressure zircon polymorphs in returned samples.",
      canWeGetThere: "Gentle slopes (< 4°); broad rocky benches ideal for rover support positioning.",
      dataCoverageStatus: "HiRISE stereo coverage complete; RIMFAX ground radar traverses mapped."
    }
  },
  {
    id: "T4",
    num: "T4",
    name: "Delta Front (Shenandoah Formation)",
    shortName: "T4: Delta Front Scarp",
    lat: 18.4827,
    lng: 77.3686,
    elevation: -2421.1,
    isPrimaryTarget: false,
    assessments: {
      habitability: "High (Paleolake Water)",
      biosignature: "Potential (Preservation)",
      science: "High (Sedimentology)",
      accessibility: "Moderate (Delta Scarp)",
      confidence: "High",
      scoreHab: 85,
      scoreBio: 68,
      scoreSci: 94,
      scoreAcc: 70
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985", "ESP_088272_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Exposed deltaic scarp exhibiting Gilbert-type bottomset to foreset cross-bedding (Shenandoah Formation) flanked by Kodiak butte.",
      whatWasObserved: "Fine laminated mudstones, siltstones, and sandstones interbedded with episodic granule conglomerates; CRISM detects strong Fe/Mg smectite signatures.",
      whatIsInterpreted: "Sustained fluvial delta progradation into an open standing paleolake with high organic matter preservation potential (Mangold et al., 2021; Stack et al., 2024).",
      doi: "10.1126/science.abl4051",
      doiCitation: "Mangold, N. et al. (2021), Science; Stack, K. M. et al. (2024)",
      howConfident: "High confidence: Sedimentary cross-bedding geometry is pristine; lake water depth modeled at 20–50 m.",
      whatElseCouldExplainIt: "Dry eolian sand dune progradation into an arid tectonic depression with intermittent playa muds.",
      whatWouldChangeAssessment: "Absence of subaqueous clay flocculation textures in transmission electron microscope analysis.",
      canWeGetThere: "Approaching from channel wash is safe (< 8°); avoid climbing vertical scarp faces (> 18° slope).",
      dataCoverageStatus: "Extensive HiRISE DTM coverage; multi-sol Mastcam-Z gigapixel mosaics available."
    }
  },
  {
    id: "T5",
    num: "T5",
    name: "Upper Delta Fan & Boulder Scarp",
    shortName: "T5: Upper Delta Fan",
    lat: 18.4954,
    lng: 77.3466,
    elevation: -2398.5,
    isPrimaryTarget: false,
    assessments: {
      habitability: "High (Fluvial Floods)",
      biosignature: "Potential",
      science: "High",
      accessibility: "Moderate–Difficult",
      confidence: "Moderate",
      scoreHab: 78,
      scoreBio: 54,
      scoreSci: 89,
      scoreAcc: 55
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["G13_023102_1986_XN_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Truncated upper delta topset beds capped by coarse conglomerate and flood megaclasts.",
      whatWasObserved: "Beds of imbricated cobbles and rounded boulders up to 1.5 m embedded in gravelly sandstone (Mangold et al., 2021).",
      whatIsInterpreted: "High-energy paleoflood discharge associated with late-stage breaching of the western Jezero rim (Mangold et al., 2021).",
      doi: "10.1126/science.abl4051",
      doiCitation: "Mangold, N., Gupta, S. et al. (2021), Science Vol. 374",
      howConfident: "Moderate confidence: Outcrop geometry clearly visible in orbital HiRISE, but surface roughness challenges vehicular navigation.",
      whatElseCouldExplainIt: "Periglacial mass wasting and rock glacier deposits during high-obliquity freeze-thaw cycles.",
      whatWouldChangeAssessment: "Discovery of glacial striations or tillite fabric instead of water-worn fluvial rounding.",
      canWeGetThere: "Moderate slopes (10°–14°); requires rover path navigation around boulder fields.",
      dataCoverageStatus: "High-resolution orbital stereo available; partial rover Mastcam-Z coverage."
    }
  },
  {
    id: "T6",
    num: "T6",
    name: "Neretva Vallis Inflow Channel Floor",
    shortName: "T6: Neretva Inflow Channel",
    lat: 18.4961,
    lng: 77.3038,
    elevation: -2362.8,
    isPrimaryTarget: false,
    assessments: {
      habitability: "High",
      biosignature: "Potential",
      science: "High (Catchment Feeder)",
      accessibility: "Moderate",
      confidence: "High",
      scoreHab: 88,
      scoreBio: 72,
      scoreSci: 93,
      scoreAcc: 82
    },
    pdsProducts: {
      hirise: ["ESP_088272_1985", "ESP_055211_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Incision channel bedrock floor at the mouth of Neretva Vallis, ~170 m west of Bright Angel outcrop.",
      whatWasObserved: "Fluvial terraces, point bar sands, and fine siltstones exposed along the valley floor; boulder terraces providing natural overhangs.",
      whatIsInterpreted: "Repeated fluvial transport corridor connecting highland catchment basins to the Jezero lake system; ideal low-slope staging ground for Bright Angel sorties.",
      doi: "10.1038/s41586-025-09413-0",
      doiCitation: "Hurowitz, J. A. et al. (2025), Nature Vol. 645",
      howConfident: "High confidence: Direct rover traverse on Sol 1190–1200 confirmed stable ground bearing capacity.",
      whatElseCouldExplainIt: "Ephemeral hyperconcentrated mudflows rather than sustained perennial streamflow.",
      whatWouldChangeAssessment: "Sedimentological proof that channels formed by sapping rather than surface runoff.",
      canWeGetThere: "Gentle valley floor (3°–5°); low boulder hazard. Provides ~170 m direct march to T7.",
      dataCoverageStatus: "HiRISE 0.25 m/px imagery validated; rover localization position verified."
    }
  },
  {
    id: "T7",
    num: "T7",
    name: "Bright Angel / Cheyava Falls",
    shortName: "T7: Bright Angel (Cheyava)",
    lat: 18.4974,
    lng: 77.3051,
    elevation: -2354.5,
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
      scoreAcc: 80
    },
    pdsProducts: {
      hirise: ["ESP_088272_1985", "ESP_055211_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Light-toned mudstone and sandstone outcrop laced with white calcium sulfate veins and millimeter-scale reaction halos ('leopard spots'). Position is Sol 1196 rover localization (~100 m from target rock).",
      whatWasObserved: "SHERLOC deep-UV Raman detected organic carbon signatures; PIXL mapped sub-mm iron-phosphate nodules (vivianite) and iron-sulfide halos (greigite); WATSON photographed cross-cutting gypsum veins.",
      whatIsInterpreted: "Low-temperature redox reactions where ancient microbial communities may have reduced iron and sulfate using organic matter as an electron donor (Hurowitz et al., 2025).",
      doi: "10.1038/s41586-025-09413-0",
      doiCitation: "Hurowitz, J. A., Tice, M. M. et al. (2025), Nature Vol. 645, p. 332",
      howConfident: "Moderate–Low confidence for biosignature interpretation; empirical geochemical data is rock-solid, but abiotic mechanisms cannot be ruled out without Mars Sample Return.",
      whatElseCouldExplainIt: "Abiotic hydrothermal or diagenetic fluid mixing where acidic iron-rich waters encountered reduced alkaline groundwater; abiotic Fischer-Tropsch-type synthesis.",
      whatWouldChangeAssessment: "Sample return isotopic fractionation analysis (δ13C, δ34S, δ56Fe) and sub-nanometer transmission electron microscopy for cell fossilization rinds.",
      canWeGetThere: "Accessible via Neretva channel floor (T6 approach); local slope 6°–10°. Position is ~170 m from T6.",
      dataCoverageStatus: "Multi-instrument in-situ raster (PIXL + SHERLOC + WATSON + SuperCam + Mastcam-Z) completely archived."
    }
  },
  {
    id: "T8",
    num: "T8",
    name: "Inner Rim Carbonate Margin Unit",
    shortName: "T8: Margin Carbonates",
    lat: 18.4606,
    lng: 77.2647,
    elevation: -1820.0,
    isPrimaryTarget: false,
    assessments: {
      habitability: "High (Paleolake Shoreline)",
      biosignature: "Potential (Bioherm / Microfossils)",
      science: "Very High",
      accessibility: "Moderate–Difficult",
      confidence: "Moderate",
      scoreHab: 82,
      scoreBio: 55,
      scoreSci: 92,
      scoreAcc: 50
    },
    pdsProducts: {
      hirise: ["ESP_036618_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005055b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Inner crater rim carbonate-bearing unit; distinct from crater-floor Mg-Fe grain-boundary carbonates (Horgan et al., 2020).",
      whatWasObserved: "CRISM orbital reflectance exhibits strong 2.3 µm and 2.5 µm overtone absorption bands indicative of magnesite and hydrated carbonates interbedded with silica chert.",
      whatIsInterpreted: "Paleolake shoreline bathtub-ring carbonate precipitates or wave-agitated lacustrine bioherms with microfossil preservation potential (Horgan et al., 2020; Farley et al., 2020).",
      doi: "10.1016/j.icarus.2019.113526",
      doiCitation: "Horgan, B. H. N. et al. (2020), Icarus; Farley et al. (2020)",
      howConfident: "Moderate confidence: In-situ rover verification ongoing; orbital spectral mixing with pyroxene adds deconvolution uncertainty.",
      whatElseCouldExplainIt: "Regional serpentinization of basement ultramafic bedrock unrelated to Jezero lake water.",
      whatWouldChangeAssessment: "In-situ drill core displaying stromatolitic laminations or organic-walled microfossils.",
      canWeGetThere: "Steep slopes (14°–18°); requires engineered switchback paths around scarp flanks.",
      dataCoverageStatus: "CRISM orbital targeted observations available; partial HiRISE stereo coverage."
    }
  },
  {
    id: "T9",
    num: "T9",
    name: "Jezero Western Rim Uplands",
    shortName: "T9: West Rim Uplands",
    lat: 18.4220,
    lng: 77.2207,
    elevation: -1973.6,
    isPrimaryTarget: false,
    assessments: {
      habitability: "Low",
      biosignature: "Very Low",
      science: "High (Crustal Basement)",
      accessibility: "Extreme (Steep Cliff)",
      confidence: "High",
      scoreHab: 25,
      scoreBio: 10,
      scoreSci: 86,
      scoreAcc: 25
    },
    pdsProducts: {
      hirise: ["ESP_036618_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["ato00053d60_01_if125s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Pre-Noachian to Noachian highland basement crust exposed in the uplifted western crater rim.",
      whatWasObserved: "HiRISE imagery resolves massive, chaotic megabreccia blocks, fault scarps, and ancient impact excavation stratigraphy.",
      whatIsInterpreted: "Ancient crustal samples predating the Jezero impact, providing planetary crustal formation and early magnetic dynamo history.",
      doi: "10.1007/s11214-020-00762-y",
      doiCitation: "Farley, K. A. et al. (2020), Space Sci. Rev.",
      howConfident: "High confidence regarding crustal structural geology; low habitability potential.",
      whatElseCouldExplainIt: "Post-impact ballistic ejecta mantle obscuring true in-situ rim bedrock.",
      whatWouldChangeAssessment: "Deep core drilling identifying unbrecciated plutonic basement.",
      canWeGetThere: "Extreme difficulty: Rim slopes exceed 22°; impassable without rover winching.",
      dataCoverageStatus: "Orbital-only coverage (HiRISE, CTX, THEMIS, MOLA)."
    }
  }
];

// Preset Planned Marswalk Sorties
export const PRESET_SORTIES = [
  {
    id: "sortie-1",
    name: "Sortie 1: Neretva → Bright Angel Micro-EVA",
    badge: "PRIMARY SCIENCE (~170 m / 242 m)",
    targetIds: ["T6", "T7"],
    center: [18.4968, 77.3045],
    zoom: 16,
    straightLineDistanceM: 172.0,
    traverseDistanceM: 242.0,
    elevationDeltaM: 8.3,
    cumulativeAscentM: 8.3,
    meanGradePct: 3.4,
    maxSlopeDeg: 6.2,
    durationMin: 8, // at 0.5 m/s (~8 min)
    durationHours: 0.15,
    mode: "Pressurized Astronaut EVA on Foot",
    description: "High-resolution micro-EVA traverse from Neretva channel floor (T6) directly to the Cheyava Falls potential biosignature outcrop (T7). Local foot-EVA zone around Sol 1196 rover localization."
  },
  {
    id: "sortie-2",
    name: "Sortie 2: Crater Floor Igneous Transect",
    badge: "FLOOR BASELINE (~930 m / 1,140 m)",
    targetIds: ["T1", "T2"],
    center: [18.4385, 77.4458],
    zoom: 15,
    straightLineDistanceM: 930.0,
    traverseDistanceM: 1140.0,
    elevationDeltaM: -1.9,
    cumulativeAscentM: 0.0,
    meanGradePct: 0.2,
    maxSlopeDeg: 2.8,
    durationMin: 38,
    durationHours: 0.63,
    mode: "Crater Floor Staging & Science Walk",
    description: "Crater-floor igneous transect from Landing Site (T1) to Séítah cumulate unit (T2). Flat, low-risk floor traverse verifying floor stratigraphy and baseline igneous geochemistry."
  },
  {
    id: "sortie-3",
    name: "Sortie 3: Full Research Corridor (T1 → T7)",
    badge: "RESEARCH TRANSECT (37.2 km)",
    targetIds: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    center: [18.4700, 77.3750],
    zoom: 12,
    straightLineDistanceM: 17800.0,
    traverseDistanceM: 37200.0,
    elevationDeltaM: 215.4,
    cumulativeAscentM: 215.4,
    meanGradePct: 2.8,
    maxSlopeDeg: 14.5,
    durationMin: 480,
    durationHours: 8.0,
    mode: "Multi-Day Pressurized Rover Traverse",
    description: "Full research corridor traversing all primary stratigraphic formations: crater floor basalts (T1-T3), delta front foresets (T4-T5), and Neretva inflow redox outcrops (T6-T7)."
  }
];

// Continuous Multi-Point Full Traverse Track for Along-Track Elevation Profile (0 km to 48.6 km)
export const FULL_TRAVERSE_TRACK = [
  { id: "tp-1", name: "T1: Landing Site", targetId: "T1", lat: 18.4446, lng: 77.4509, elevation: -2569.9, distKm: 0.0, slopeDeg: 1.0, unit: "Floor Basalt / LZ" },
  { id: "tp-2", name: "T2: Séítah Contact", targetId: "T2", lat: 18.4325, lng: 77.4407, elevation: -2571.8, distKm: 2.8, slopeDeg: 2.2, unit: "Séítah Olivine Cumulate" },
  { id: "tp-3", name: "T3: Máaz Formation", targetId: "T3", lat: 18.4619, lng: 77.4361, elevation: -2555.2, distKm: 6.9, slopeDeg: 2.5, unit: "Máaz Basaltic Cap" },
  { id: "tp-4", name: "Delta Base Wash", targetId: null, lat: 18.4750, lng: 77.3850, elevation: -2510.0, distKm: 12.8, slopeDeg: 4.2, unit: "Distal Silt Apron" },
  { id: "tp-5", name: "T4: Delta Front (Shenandoah)", targetId: "T4", lat: 18.4827, lng: 77.3686, elevation: -2421.1, distKm: 16.5, slopeDeg: 7.8, unit: "Shenandoah Delta Mudstones" },
  { id: "tp-6", name: "T5: Upper Delta Fan", targetId: "T5", lat: 18.4954, lng: 77.3466, elevation: -2398.5, distKm: 21.2, slopeDeg: 11.2, unit: "Boulder Conglomerate" },
  { id: "tp-7", name: "T6: Neretva Channel Floor", targetId: "T6", lat: 18.4961, lng: 77.3038, elevation: -2362.8, distKm: 27.5, slopeDeg: 3.5, unit: "Neretva Fluvial Channel" },
  { id: "tp-8", name: "T7: Bright Angel (Cheyava Falls)", targetId: "T7", lat: 18.4974, lng: 77.3051, elevation: -2354.5, distKm: 27.7, slopeDeg: 4.5, unit: "Bright Angel Redox Mudstone" },
  { id: "tp-9", name: "T8: Margin Carbonates", targetId: "T8", lat: 18.4606, lng: 77.2647, elevation: -1820.0, distKm: 36.4, slopeDeg: 16.8, unit: "Marginal Carbonates" },
  { id: "tp-10", name: "T9: West Rim Uplands", targetId: "T9", lat: 18.4220, lng: 77.2207, elevation: -1973.6, distKm: 48.6, slopeDeg: 22.0, unit: "Noachian Basement Megabreccia" }
];

// Verified Standard Web Mercator (EPSG:3857) Mars Satellite Tile Layers
export const NASA_TILE_LAYERS = [
  {
    id: "mars_optical",
    name: "Mars Optical Satellite (Viking MDIM 2.1 Global)",
    shortName: "Optical Mosaic",
    description: "Standard Web Mercator colorized planetary mosaic hosted by OpenPlanetaryMap / CARTO.",
    url: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png",
    attribution: "© OpenPlanetaryMap / NASA / JPL / USGS / CARTO",
    tms: false,
    maxNativeZoom: 8,
    maxZoom: 16,
    defaultOpacity: 1.0,
    isPrimary: true
  },
  {
    id: "mola_color",
    name: "Topographic Elevation (MOLA Colorized Relief)",
    shortName: "MOLA Topo Color",
    description: "NASA Mars Global Surveyor MOLA colorized shaded relief altimetry.",
    url: "https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png",
    attribution: "NASA / GSFC / MOLA Team / WhereOnMars",
    tms: true,
    maxNativeZoom: 6,
    maxZoom: 16,
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
    maxZoom: 16,
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
    maxZoom: 16,
    defaultOpacity: 0.40
  }
];

// CRISM Spectral Mineralogy Vector Polygons
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
      [18.4200, 77.4250],
      [18.4420, 77.4280],
      [18.4500, 77.4480],
      [18.4350, 77.4600],
      [18.4180, 77.4450]
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
    targetAnchor: "T4: Delta Front",
    coords: [
      [18.4750, 77.3400],
      [18.5020, 77.3350],
      [18.5080, 77.3600],
      [18.4900, 77.3850],
      [18.4720, 77.3750]
    ]
  },
  {
    id: "crism-redox-brightangel",
    name: "Redox Front: Vivianite (Fe-PO4) & Greigite (Fe-S)",
    mineral: "Vivianite, Greigite, Calcium Sulfate & Organic Carbon",
    color: "#D97706", // Amber
    fillColor: "#D97706",
    fillOpacity: 0.45,
    weight: 2.5,
    targetAnchor: "T7: Bright Angel Outcrop",
    coords: [
      [18.4920, 77.2980],
      [18.5030, 77.2990],
      [18.5040, 77.3120],
      [18.4940, 77.3140]
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
    targetAnchor: "T8: Margin Unit",
    coords: [
      [18.4480, 77.2500],
      [18.4750, 77.2550],
      [18.4800, 77.2800],
      [18.4550, 77.2780]
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
      [18.4810, 77.3640],
      [18.4880, 77.3620],
      [18.4910, 77.3710],
      [18.4830, 77.3730]
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

// THEMIS Day/Night Infrared Thermal Inertia Polygons
export const THEMIS_THERMAL_INERTIA_ZONES = [
  {
    id: "themis-hi-delta-scarp",
    name: "High Thermal Inertia: Western Delta Scarp (T4–T5)",
    type: "HIGH_INERTIA_BEDROCK",
    inertiaValue: "420–510 J·m⁻²·K⁻¹·s⁻½",
    color: "#F97316", // Warm Amber-Orange
    fillColor: "#EA580C",
    description: "Exposed, indurated deltaic bedrock pavement and cliff-retaining scarps that retain heat after sunset.",
    coords: [
      [18.455, 77.340],
      [18.475, 77.330],
      [18.510, 77.335],
      [18.525, 77.375],
      [18.505, 77.395],
      [18.475, 77.385],
      [18.450, 77.360]
    ]
  },
  {
    id: "themis-hi-neretva-canyon",
    name: "High Thermal Inertia: Neretva Vallis Canyon Walls & Bright Angel (T6–T7)",
    type: "HIGH_INERTIA_BEDROCK",
    inertiaValue: "440–530 J·m⁻²·K⁻¹·s⁻½",
    color: "#F97316",
    fillColor: "#EA580C",
    description: "Steep incised canyon bedrock walls, fluvial boulder lags, and exposed redox mudstones.",
    coords: [
      [18.485, 77.255],
      [18.525, 77.265],
      [18.515, 77.325],
      [18.480, 77.320]
    ]
  },
  {
    id: "themis-hi-seitah-ridge",
    name: "High Thermal Inertia: Séítah Fractured Bedrock Ridge (T2)",
    type: "HIGH_INERTIA_BEDROCK",
    inertiaValue: "390–480 J·m⁻²·K⁻¹·s⁻½",
    color: "#F97316",
    fillColor: "#EA580C",
    description: "Coarse crystalline olivine cumulate bedrock with high thermal conductivity.",
    coords: [
      [18.410, 77.415],
      [18.445, 77.428],
      [18.460, 77.455],
      [18.435, 77.465],
      [18.410, 77.435]
    ]
  },
  {
    id: "themis-hi-west-rim",
    name: "High Thermal Inertia: Jezero Crater Rim & Margin Uplands (T8–T9)",
    type: "HIGH_INERTIA_BEDROCK",
    inertiaValue: "460–560 J·m⁻²·K⁻¹·s⁻½",
    color: "#F97316",
    fillColor: "#EA580C",
    description: "Noachian basement megabreccia bedrock and impact ejecta blocks along the crater rim.",
    coords: [
      [18.330, 77.180],
      [18.560, 77.195],
      [18.540, 77.265],
      [18.345, 77.250]
    ]
  },
  {
    id: "themis-hi-belva-rim",
    name: "High Thermal Inertia: Belva Crater Impact Rim Ring",
    type: "HIGH_INERTIA_BEDROCK",
    inertiaValue: "410–490 J·m⁻²·K⁻¹·s⁻½",
    color: "#F97316",
    fillColor: "#EA580C",
    description: "Uplifted impact-crater rim blocks and erosion-resistant ejecta ridges.",
    coords: [
      [18.468, 77.335],
      [18.505, 77.340],
      [18.515, 77.380],
      [18.485, 77.390],
      [18.465, 77.365]
    ]
  },
  {
    id: "themis-lo-east-floor",
    name: "Low Thermal Inertia: Eastern Crater Floor Plains (T1 Basin)",
    type: "LOW_INERTIA_DUST",
    inertiaValue: "120–185 J·m⁻²·K⁻¹·s⁻½",
    color: "#38BDF8", // Cool Thermal Blue
    fillColor: "#0284C7",
    description: "Thick fine-grained eolian dust mantles and unconsolidated sand sheets that cool rapidly at night.",
    coords: [
      [18.400, 77.455],
      [18.510, 77.495],
      [18.490, 77.615],
      [18.365, 77.565]
    ]
  },
  {
    id: "themis-lo-north-basin",
    name: "Low Thermal Inertia: North-Eastern Sedimentary Basin Wash",
    type: "LOW_INERTIA_DUST",
    inertiaValue: "135–205 J·m⁻²·K⁻¹·s⁻½",
    color: "#38BDF8",
    fillColor: "#0284C7",
    description: "Fine sediment accumulation and eolian dust deposits with high diurnal temperature swings.",
    coords: [
      [18.490, 77.405],
      [18.565, 77.435],
      [18.545, 77.550],
      [18.470, 77.500]
    ]
  },
  {
    id: "themis-lo-south-trap",
    name: "Low Thermal Inertia: Southern Eolian Sand & Dune Sheet Basin",
    type: "LOW_INERTIA_DUST",
    inertiaValue: "125–195 J·m⁻²·K⁻¹·s⁻½",
    color: "#38BDF8",
    fillColor: "#0284C7",
    description: "Unconsolidated active sand ripple traps and low-inertia dust veneer.",
    coords: [
      [18.355, 77.385],
      [18.415, 77.395],
      [18.395, 77.485],
      [18.345, 77.455]
    ]
  }
];

// MEDA Atmospheric & In-Situ Surface Station Telemetry
export const MEDA_ATMOSPHERIC_DATA = {
  station: "Perseverance Rover MEDA Instrument Suite",
  location: "Jezero Crater Floor (Octavia E. Butler Landing / Traverse)",
  lat: 18.475,
  lng: 77.445,
  pressurePa: 725,
  pressureUncertainty: "± 5 Pa",
  tempRangeC: "-62°C to -24°C",
  windSpeedMs: 12.0,
  windDirection: "NW → SE",
  windDescription: "Valley katabatic flow down Neretva Vallis into Jezero Basin",
  opticalDepthTau: "0.44 ± 0.08",
  dustDescription: "Moderate background Martian atmospheric dust optical depth",
  honestyNote: "MEDA measures local point conditions at Perseverance; shown with uncertainty — not a regional weather forecast",
  windVectors: [
    {
      id: "wv-1",
      name: "Neretva Channel Axial Inflow",
      coords: [
        [18.530, 77.240],
        [18.510, 77.285],
        [18.495, 77.335],
        [18.475, 77.390],
        [18.450, 77.450]
      ]
    },
    {
      id: "wv-2",
      name: "Delta Flank Katabatic Stream",
      coords: [
        [18.515, 77.260],
        [18.495, 77.305],
        [18.480, 77.355],
        [18.460, 77.410],
        [18.435, 77.470]
      ]
    },
    {
      id: "wv-3",
      name: "North Delta Scarp Deflection",
      coords: [
        [18.545, 77.270],
        [18.525, 77.320],
        [18.505, 77.375],
        [18.485, 77.435],
        [18.460, 77.500]
      ]
    }
  ],
  dustHazeBounds: [
    [18.32, 77.16],
    [18.62, 77.62]
  ]
};

// Exact Mars Haversine Distance Calculator (Meters)
// d = 2 * R * asin(sqrt(sin²(Δlat/2) + cos(lat1)*cos(lat2)*sin²(Δlon/2)))
// Mars Volumetric Mean Radius R = 3,389,500 m
export function calculateMarsDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = MARS_CONSTANTS.MEAN_RADIUS_METERS;
  const toRad = Math.PI / 180;
  const dLat = (lat2 - lat1) * toRad;
  const dLon = (lon2 - lon1) * toRad;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // 0.1 m precision
}

// Mars Haversine Distance (Kilometers)
export function calculateMarsDistanceKm(lat1, lon1, lat2, lon2) {
  return calculateMarsDistanceMeters(lat1, lon1, lat2, lon2) / 1000;
}

// Format meters / kilometers cleanly for UI
export function formatMarsDistance(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${Math.round(meters)} m`;
}
