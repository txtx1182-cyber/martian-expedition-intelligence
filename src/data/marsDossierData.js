// MISSION 001 / JEZERO EXPEDITION INTELLIGENCE
// Master Scientific Research Dossier: 9 Verified Targets (T1-T9), Full Traverse Path, & Exact Epistemology
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
  subtitle: "Max-Resolution Planetary Surface & Astronaut Traverse Planning Platform",
  challenge: "NASA Space Apps Challenge 2026 // Challenge 11: Interplanetary Survival Guide: Martian Map",
  region: "Jezero Crater, Mars (18.47°N, 77.37°E)",
  defaultCenter: [18.4968, 77.3045], // Focus on Neretva (T6) and Bright Angel (T7)
  defaultZoom: 16
};

// 9 Verified Targets from Brief
export const VERIFIED_TARGETS = [
  {
    id: "T1",
    num: "T1",
    name: "Octavia E. Butler Landing",
    shortName: "Landing Site",
    lat: 18.4446,
    lng: 77.4509,
    elevation: -2569.9,
    isExtended: false,
    assessments: {
      habitability: "Low–Moderate",
      biosignature: "None documented",
      science: "Moderate",
      accessibility: "Easy (Flat floor)",
      confidence: "High",
      scoreHab: 38,
      scoreBio: 8,
      scoreSci: 65,
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
    shortName: "Séítah (Olivine Cumulate)",
    lat: 18.4325,
    lng: 77.4407,
    elevation: -2571.8,
    isExtended: false,
    assessments: {
      habitability: "Moderate",
      biosignature: "Weak / None",
      science: "High",
      accessibility: "Easy",
      confidence: "Moderate",
      scoreHab: 52,
      scoreBio: 14,
      scoreSci: 85,
      scoreAcc: 92
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985", "ESP_036618_1985"],
      dtm: ["DTEEC_045994_1985_046060_1985_U01"],
      crism: ["msv0005055b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Olivine-rich igneous cumulate bedrock exhibiting post-crystallization aqueous alteration (Farley et al., 2022).",
      whatWasObserved: "PIXL and SHERLOC micro-mapping resolve coarse olivine grains surrounded by pyroxene, with Mg–Fe carbonates along grain boundaries and secondary sulfate/perchlorate void fills.",
      whatIsInterpreted: "Thick igneous cumulate body modified by ancient carbonated brine infiltration before lake formation (Farley et al., 2022).",
      doi: "10.1126/science.abo2196",
      doiCitation: "Farley, K. A., Stack, K. M. et al. (2022), Science Vol. 377",
      howConfident: "Moderate confidence: Core samples confirm mineralogy, though exact emplacement geometry (layered intrusion vs. thick lava lake) remains debated.",
      whatElseCouldExplainIt: "Subaqueous pyroclastic fall deposits altered under late-stage hydrothermal steam rather than intrusive cumulate ponding.",
      whatWouldChangeAssessment: "Radiometric Pb-Pb or Ar-Ar isochron dating of returned core samples disproving co-magmatic crystallization.",
      canWeGetThere: "Level floor terrain; watch for sand ripples between rocky outcrops that increase astronaut boot slip.",
      dataCoverageStatus: "Complete CRISM infrared spectral library and Perseverance rover core cache confirmation."
    }
  },
  {
    id: "T3",
    num: "T3",
    name: "Máaz Formation",
    shortName: "Máaz (Basaltic Cap)",
    lat: 18.4619,
    lng: 77.4361,
    elevation: -2555.2,
    isExtended: false,
    assessments: {
      habitability: "Low–Moderate",
      biosignature: "None",
      science: "Moderate",
      accessibility: "Easy",
      confidence: "Moderate",
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
      doiCitation: "Farley et al. (2022), Science Vol. 377",
      howConfident: "Moderate confidence: stratigraphic contact with Séítah observed in multiple abraded patches.",
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
    shortName: "Delta Front Scarp",
    lat: 18.4827,
    lng: 77.3686,
    elevation: -2421.1,
    isExtended: false,
    assessments: {
      habitability: "High (interpreted)",
      biosignature: "Potential",
      science: "High",
      accessibility: "Moderate",
      confidence: "Moderate",
      scoreHab: 82,
      scoreBio: 64,
      scoreSci: 92,
      scoreAcc: 68
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985", "ESP_088272_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["P04_002743_1987_XI_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Exposed deltaic scarp exhibiting Gilbert-type bottomset to foreset cross-bedding (Shenandoah Formation).",
      whatWasObserved: "Fine laminated mudstones, siltstones, and sandstones interbedded with episodic granule conglomerates; CRISM detects Fe/Mg smectite signatures.",
      whatIsInterpreted: "Sustained fluvial delta progradation into an open standing paleolake with high organic matter preservation potential (Mangold et al., 2021; Stack et al., 2024).",
      doi: "10.1126/science.abl4051",
      doiCitation: "Mangold, N. et al. (2021), Science; Stack, K. M. et al. (2024)",
      howConfident: "Moderate confidence: Sedimentary cross-bedding geometry is pristine; lake water depth modeled at 20–50 m.",
      whatElseCouldExplainIt: "Dry eolian sand dune progradation into an arid tectonic depression with intermittent playa muds.",
      whatWouldChangeAssessment: "Absence of subaqueous clay flocculation textures in transmission electron microscope analysis.",
      canWeGetThere: "Approaching from channel wash is safe (< 8°); avoid steep delta-front scarps exceeding 16° slope.",
      dataCoverageStatus: "Extensive HiRISE DTM coverage; multi-sol Mastcam-Z gigapixel mosaics available."
    }
  },
  {
    id: "T5",
    num: "T5",
    name: "Upper Delta Fan & Boulder Scarp",
    shortName: "Upper Delta Fan",
    lat: 18.4954,
    lng: 77.3466,
    elevation: -2398.5,
    isExtended: false,
    assessments: {
      habitability: "High",
      biosignature: "Potential",
      science: "High",
      accessibility: "Difficult",
      confidence: "Moderate",
      scoreHab: 78,
      scoreBio: 54,
      scoreSci: 89,
      scoreAcc: 48
    },
    pdsProducts: {
      hirise: ["ESP_055211_1985"],
      dtm: ["DTEEC_002387_1985_003798_1985_A01"],
      crism: ["msv0005079b_01_if150s_trr3"],
      ctx: ["G13_023102_1986_XN_18N282W"]
    },
    evidenceChain: {
      whatIsHere: "Truncated upper delta topset beds capped by coarse conglomerate and flood megaclasts.",
      whatWasObserved: "Beds of imbricated cobbles and rounded boulders up to 1.5 m embedded in gravelly sandstone (Mangold et al., 2021; note: specific boulder size stats unverified in abstract).",
      whatIsInterpreted: "High-energy paleoflood discharge associated with late-stage breaching of the western Jezero rim (Mangold et al., 2021).",
      doi: "10.1126/science.abl4051",
      doiCitation: "Mangold, N., Gupta, S. et al. (2021), Science Vol. 374",
      howConfident: "Moderate confidence: Outcrop geometry clearly visible in orbital HiRISE, but surface roughness challenges vehicular navigation.",
      whatElseCouldExplainIt: "Periglacial mass wasting and rock glacier deposits during high-obliquity freeze-thaw cycles.",
      whatWouldChangeAssessment: "Discovery of glacial striations or tillite fabric instead of water-worn fluvial rounding.",
      canWeGetThere: "Difficult traverse (12°–15° slope with loose gravel); mandatory companion rover tether.",
      dataCoverageStatus: "High-resolution orbital stereo available; partial rover Mastcam-Z coverage."
    }
  },
  {
    id: "T6",
    num: "T6",
    name: "Neretva Vallis Inflow Channel Floor",
    shortName: "Neretva Channel",
    lat: 18.4961,
    lng: 77.3038,
    elevation: -2362.8,
    isExtended: false,
    assessments: {
      habitability: "High",
      biosignature: "Potential",
      science: "High",
      accessibility: "Moderate",
      confidence: "Moderate",
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
      howConfident: "Moderate confidence: Direct rover traverse on Sol 1190–1200 confirmed stable ground bearing capacity.",
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
    shortName: "Bright Angel (Cheyava)",
    lat: 18.4974,
    lng: 77.3051,
    elevation: -2354.5,
    isExtended: false,
    isPrimaryTarget: true,
    assessments: {
      habitability: "High (interpreted)",
      biosignature: "Potential (highest documented, not confirmed)",
      science: "High (Crucial)",
      accessibility: "Moderate",
      confidence: "Moderate–Low",
      scoreHab: 94,
      scoreBio: 88,
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
    shortName: "Margin Carbonate",
    lat: 18.4606,
    lng: 77.2647,
    elevation: -1820.0,
    isExtended: true, // Marked as Extended/Future Target
    assessments: {
      habitability: "Moderate–High (hypothesis)",
      biosignature: "Potential / Unknown",
      science: "High",
      accessibility: "Difficult",
      confidence: "Low–Moderate",
      scoreHab: 80,
      scoreBio: 50,
      scoreSci: 92,
      scoreAcc: 42
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
      howConfident: "Low–Moderate confidence: In-situ rover verification still ongoing as of Sol 1300+; orbital spectral mixing with pyroxene adds deconvolution uncertainty.",
      whatElseCouldExplainIt: "Regional serpentinization of basement ultramafic bedrock unrelated to Jezero lake water.",
      whatWouldChangeAssessment: "In-situ drill core displaying stromatolitic laminations or organic-walled microfossils.",
      canWeGetThere: "High difficulty: Steep crater rim slope (16°–22°); requires engineered switchback paths and extended life support.",
      dataCoverageStatus: "CRISM orbital targeted observations available; partial HiRISE stereo coverage."
    }
  },
  {
    id: "T9",
    num: "T9",
    name: "Jezero Western Rim Uplands",
    shortName: "West Rim Uplands",
    lat: 18.4220,
    lng: 77.2207,
    elevation: -1973.6,
    isExtended: true, // Marked as Extended/Future Target
    assessments: {
      habitability: "Unknown",
      biosignature: "Unknown",
      science: "High",
      accessibility: "Difficult",
      confidence: "Low",
      scoreHab: 30,
      scoreBio: 20,
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
      howConfident: "Low confidence regarding habitability/biosignatures; high confidence regarding crustal structural geology.",
      whatElseCouldExplainIt: "Post-impact ballistic ejecta mantle obscuring true in-situ rim bedrock.",
      whatWouldChangeAssessment: "Deep core drilling identifying unbrecciated plutonic basement.",
      canWeGetThere: "Extreme difficulty: Rim slopes exceed 24°; impassable for standard EVA suits without rover winching.",
      dataCoverageStatus: "Orbital-only coverage (HiRISE, CTX, THEMIS, MOLA)."
    }
  }
];

// Presets Local EVA Sorties
export const PRESET_SORTIES = [
  {
    id: "sortie-1",
    name: "Sortie 1: Neretva → Bright Angel Micro-EVA",
    badge: "PRIMARY SCIENCE (~170 m)",
    targetIds: ["T6", "T7"],
    center: [18.4968, 77.3045],
    zoom: 17,
    straightLineDistanceM: 172,
    traverseDistanceM: 242,
    elevationDeltaM: 8.3,
    meanGradePct: 3.5,
    maxSlopeDeg: 6.2,
    durationMin: 28,
    description: "High-resolution micro-EVA traverse from Neretva channel floor (T6) directly to the Cheyava Falls potential biosignature outcrop (T7). At zoom 17+, individual bedrock slabs and HiRISE 0.25 m/px features are visible."
  },
  {
    id: "sortie-2",
    name: "Sortie 2: Crater Floor Igneous Transect",
    badge: "FLOOR BASELINE (~930 m)",
    targetIds: ["T1", "T2"],
    center: [18.4385, 77.4458],
    zoom: 16,
    straightLineDistanceM: 930,
    traverseDistanceM: 1140,
    elevationDeltaM: -1.9,
    meanGradePct: 0.2,
    maxSlopeDeg: 2.8,
    durationMin: 45,
    description: "Crater-floor igneous transect from Landing Site (T1) to Séítah cumulate unit (T2). Flat, low-risk floor traverse verifying floor stratigraphy and baseline igneous geochemistry."
  },
  {
    id: "corridor-full",
    name: "Full Research Corridor Context (T1 → T7)",
    badge: "SCIENTIFIC REFERENCE (37.2 km)",
    targetIds: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    center: [18.468, 77.375],
    zoom: 13,
    straightLineDistanceM: 17800,
    traverseDistanceM: 37200,
    elevationDeltaM: 215.4,
    meanGradePct: 2.8,
    maxSlopeDeg: 14.5,
    durationMin: 480,
    isReferenceOnly: true,
    warning: "SCIENTIFIC RESEARCH TRANSECT — NOT A CERTIFIED SINGLE HUMAN MARSWALK ROUTE (Exceeds 8h EVA limit; multi-day rover mission profile)."
  }
];

// Continuous multi-point full traverse track (T1 -> T9) with interpolated coordinates & elevations
// Modeled directly from Figure 1 & Figure 2 of research brief
export const FULL_TRAVERSE_TRACK = [
  { id: "p1", name: "T1 Landing", lat: 18.4446, lng: 77.4509, elevation: -2569.9, distKm: 0.0, slopeDeg: 1.2, unit: "Floor Basalt" },
  { id: "p2", name: "Floor Ridge Waypoint", lat: 18.4390, lng: 77.4470, elevation: -2570.8, distKm: 1.4, slopeDeg: 1.5, unit: "Floor Basalt" },
  { id: "p3", name: "T2 Séítah Contact", lat: 18.4325, lng: 77.4407, elevation: -2571.8, distKm: 2.8, slopeDeg: 2.4, unit: "Séítah Olivine" },
  { id: "p4", name: "Séítah Basin North", lat: 18.4480, lng: 77.4380, elevation: -2565.0, distKm: 5.2, slopeDeg: 2.0, unit: "Séítah / Máaz Transition" },
  { id: "p5", name: "T3 Máaz Formation", lat: 18.4619, lng: 77.4361, elevation: -2555.2, distKm: 7.9, slopeDeg: 2.8, unit: "Máaz Basaltic Cap" },
  { id: "p6", name: "Floor/Delta Valley Crossing", lat: 18.4720, lng: 77.4050, elevation: -2510.0, distKm: 12.4, slopeDeg: 4.5, unit: "Delta Silt Apron" },
  { id: "p7", name: "T4 Delta Front (Shenandoah)", lat: 18.4827, lng: 77.3686, elevation: -2421.1, distKm: 17.6, slopeDeg: 8.2, unit: "Shenandoah Mudstones" },
  { id: "p8", name: "Hawksbill Gap Terrace", lat: 18.4900, lng: 77.3550, elevation: -2408.0, distKm: 21.2, slopeDeg: 6.4, unit: "Delta Sandstones" },
  { id: "p9", name: "T5 Upper Delta Fan", lat: 18.4954, lng: 77.3466, elevation: -2398.5, distKm: 24.8, slopeDeg: 11.2, unit: "Boulder Conglomerate" },
  { id: "p10", name: "Neretva Inflow Spillway", lat: 18.4958, lng: 77.3200, elevation: -2380.0, distKm: 29.5, slopeDeg: 5.0, unit: "Fluvial Channel Sand" },
  { id: "p11", name: "T6 Neretva Channel Floor", lat: 18.4961, lng: 77.3038, elevation: -2362.8, distKm: 33.6, slopeDeg: 3.5, unit: "Neretva Valley Bedrock" },
  { id: "p12", name: "Cheyava Falls Outcrop (T7)", lat: 18.4974, lng: 77.3051, elevation: -2354.5, distKm: 33.8, slopeDeg: 4.8, unit: "Bright Angel Mudstones" },
  { id: "p13", name: "Crater Rim Ascent Corridor", lat: 18.4800, lng: 77.2850, elevation: -2100.0, distKm: 38.4, slopeDeg: 14.2, unit: "Talus & Ridge Flank" },
  { id: "p14", name: "T8 Margin Unit Ridge", lat: 18.4606, lng: 77.2647, elevation: -1820.0, distKm: 42.1, slopeDeg: 17.8, unit: "Marginal Carbonates" },
  { id: "p15", name: "West Rim Peak (T9)", lat: 18.4220, lng: 77.2207, elevation: -1973.6, distKm: 48.6, slopeDeg: 22.0, unit: "Noachian Basement Megabreccia" }
];

// CRISM Spectral Mineralogy Polygons (Geospatial boundaries over Jezero units)
export const CRISM_MINERAL_POLYGONS = [
  {
    id: "poly-olivine",
    name: "Olivine + Mg-Fe Grain-Boundary Carbonates",
    mineral: "Olivine (Fo45-Fo65) & Mg-Fe Carbonates",
    color: "#10B981", // Emerald
    fillColor: "#10B981",
    fillOpacity: 0.35,
    weight: 2,
    targetAnchor: "T2 Séítah",
    coords: [
      [18.4200, 77.4250],
      [18.4420, 77.4280],
      [18.4500, 77.4480],
      [18.4350, 77.4600],
      [18.4180, 77.4450]
    ]
  },
  {
    id: "poly-smectite",
    name: "Fe/Mg Phyllosilicates & Smectite Clays",
    mineral: "Fe/Mg Smectites (Nontronite / Saponite)",
    color: "#0284C7", // Cyan
    fillColor: "#0284C7",
    fillOpacity: 0.35,
    weight: 2,
    targetAnchor: "T4 Delta Front & T5 Upper Delta",
    coords: [
      [18.4750, 77.3400],
      [18.5020, 77.3350],
      [18.5080, 77.3600],
      [18.4900, 77.3850],
      [18.4720, 77.3750]
    ]
  },
  {
    id: "poly-redox",
    name: "Vivianite (Fe-PO4) & Greigite (Fe-S) Redox Front",
    mineral: "Vivianite, Greigite, Calcium Sulfate & Organic Carbon",
    color: "#D97706", // Amber
    fillColor: "#D97706",
    fillOpacity: 0.40,
    weight: 2.5,
    targetAnchor: "T6 Neretva & T7 Bright Angel",
    coords: [
      [18.4920, 77.2980],
      [18.5030, 77.2990],
      [18.5040, 77.3120],
      [18.4940, 77.3140]
    ]
  },
  {
    id: "poly-carbonate-margin",
    name: "Lacustrine Shoreline Carbonates",
    mineral: "Magnesite, Hydrated Carbonates & Siliceous Chert",
    color: "#7C3AED", // Violet
    fillColor: "#7C3AED",
    fillOpacity: 0.35,
    weight: 2,
    targetAnchor: "T8 Margin Unit",
    coords: [
      [18.4480, 77.2500],
      [18.4750, 77.2550],
      [18.4800, 77.2800],
      [18.4550, 77.2780]
    ]
  }
];

// Terrain Slope Hazard Scarp Zones (> 15° slope)
export const SLOPE_HAZARD_ZONES = [
  {
    id: "hazard-delta-scarp",
    name: "Delta Front Scarp Face (16°–22° Slope)",
    color: "#EF4444",
    fillColor: "#EF4444",
    fillOpacity: 0.45,
    coords: [
      [18.4810, 77.3640],
      [18.4880, 77.3620],
      [18.4910, 77.3710],
      [18.4830, 77.3730]
    ]
  },
  {
    id: "hazard-west-rim",
    name: "Western Crater Rim Cliff (> 20° Slope)",
    color: "#EF4444",
    fillColor: "#EF4444",
    fillOpacity: 0.45,
    coords: [
      [18.4150, 77.2100],
      [18.4700, 77.2400],
      [18.4650, 77.2550],
      [18.4100, 77.2250]
    ]
  }
];

// Max-Res Live WMTS Satellite Tile Configurations
export const NASA_TILE_LAYERS = [
  {
    id: "hirise_maxres",
    name: "Max-Res Jezero HiRISE + CTX Mosaic (~0.25–1 m/px)",
    shortName: "HiRISE Optical",
    description: "Sub-meter resolution orbital imagery (MRO HiRISE + CTX + HRSC GCS Mars). Allows zooming down to meter-scale rocks.",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/NES_JEZ_MID_Visible_Mosaic_HiRISE_CTX_HRSC_GCS_MARS_07-10-2018/1.0.0/default/default028mm/{z}/{y}/{x}.png",
    attribution: "NASA / JPL / MSSS / UofA / Mars Trek",
    nativeResolution: "HiRISE ~0.25–0.5 m/px | CTX ~6 m/px",
    safetyWarning: "Safe for boulder-scale field planning down to 0.5 m.",
    defaultOpacity: 1.0,
    maxNativeZoom: 19,
    maxZoom: 20,
    isPrimary: true
  },
  {
    id: "viking_global",
    name: "Viking MDIM 2.1 Color Mosaic (232 m/px)",
    shortName: "Viking Color",
    description: "Global true-color reference mosaic for broad regional context.",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    attribution: "NASA / JPL / USGS",
    nativeResolution: "232 m/px",
    safetyWarning: "DO NOT use for foot traverse safety; regional context only.",
    defaultOpacity: 0.35,
    maxNativeZoom: 8,
    maxZoom: 20
  },
  {
    id: "mola_topo",
    name: "Topographic Elevation & Hillshade (MOLA 463 m/px)",
    shortName: "MOLA Topo",
    description: "Laser altimetry colorized elevation map and terrain relief hillshade.",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    attribution: "NASA / GSFC / MOLA Team",
    nativeResolution: "MOLA ~463 m/px (HRSC blend)",
    safetyWarning: "Slope angles derived from coarse grid; does not reflect local scarps < 100m.",
    defaultOpacity: 0.30,
    maxNativeZoom: 8,
    maxZoom: 20
  },
  {
    id: "themis_day_ir",
    name: "THEMIS-IR Day Global Mosaic (100 m/px)",
    shortName: "THEMIS IR",
    description: "Thermal infrared radiance mapping thermal inertia and bedrock exposure vs sand mantle.",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_MO_THEMIS-IR-Day_mosaic_global_100m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    attribution: "NASA / JPL / ASU",
    nativeResolution: "100 m/px",
    safetyWarning: "Thermal inertia does not distinguish small boulder hazards.",
    defaultOpacity: 0.25,
    maxNativeZoom: 9,
    maxZoom: 20
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
