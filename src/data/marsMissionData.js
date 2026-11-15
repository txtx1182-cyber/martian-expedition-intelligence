// MISSION 001: MARTIAN EXPEDITION INTELLIGENCE
// Primary Scientific Mission Data & Provenance Library
// NASA Space Apps Challenge 2026 - Challenge 11: Interplanetary Survival Guide

export const MISSION_METADATA = {
  title: "MISSION 001: MARTIAN EXPEDITION INTELLIGENCE",
  subtitle: "Astronaut Surface Exploration & Biosignature Intelligence System",
  location: "Bright Angel & Neretva Vallis, Jezero Crater, Mars",
  targetCoords: "18.44° N, 77.40° E",
  sol: 1245,
  lmst: "10:48:22 LMST",
  dateEarth: "2026-11-15",
  evaDuration: "04:15:00",
  primaryObjective: "Evaluate candidate biosignature lithologies & micro-redox reaction fronts at Cheyava Falls mudstones.",
};

export const ENVIRONMENTAL_CONDITIONS = {
  temperature: -48.2, // Celsius
  pressure: 725, // Pascals (MEDA)
  windSpeed: 12.4, // m/s (MEDA)
  windDirection: "NW", // 315 deg
  windGust: 18.2, // m/s
  opticalDepthTau: 0.44, // Dust opacity
  humidity: 0.08, // %
  radiationGcrDose: 0.64, // mSv/day (RAD baseline)
  radiationSepStatus: "NOMINAL", // NOMINAL or WARNING/EMERGENCY
  uvIndex: 11.4,
  atmosphericDensity: 0.0152, // kg/m^3
};

export const WAYPOINTS = [
  {
    id: "WP-01",
    name: "Habitat Airlock & Rover Staging",
    code: "HAB-AIRLOCK-01",
    lat: 18.4380,
    lon: 77.3920,
    elevation: -2540,
    zone: "Floor Igneous Basement",
    geologicalUnit: "Séítah / Máaz Igneous Formation (Crater-Floor Basal Contact)",
    description: "Primary egress portal and pressurized habitat airlock. Flat volcanic basalt/olivine floor with minimal dust mantle, optimal for vehicular staging and instrument calibration.",
    scientificContext: "Basement olivine-pyroxene cumulate and basaltic flow units deposited prior to Jezero paleolake formation. Provides geochemical baseline for igneous crust before aqueous alteration (Farley et al., 2022).",
    scores: {
      habitability: 45,
      biosignature: 15,
      scientificValue: 75,
      suitAccessibility: 98,
    },
    slopeAngle: 2.1,
    hazardLevel: "SAFE", // SAFE (<10°), CAUTION (10-15°), DANGER (>15°)
    instruments: ["MEDA", "RAD", "RIMFAX", "Mastcam-Z"],
    citations: [
      {
        author: "Farley, K. A., Stack, K. M., Shuster, D. L., et al.",
        year: 2022,
        title: "Aqueously altered igneous rocks on the floor of Jezero crater, Mars",
        journal: "Science",
        doi: "10.1126/science.abo2196"
      }
    ],
    tasks: [
      { id: "t1", label: "Perform spacesuit pressure & seal diagnostic (29.6 kPa)", role: "Astro-1", done: true },
      { id: "t2", label: "Uncouple MARS-CARRIER-01 robotic tool mule from hab recharge umbilical", role: "Astro-2", done: true },
      { id: "t3", label: "Log MEDA atmospheric baseline & zero spectrometer drift", role: "Astro-1", done: false },
      { id: "t4", label: "Verify rover RTG battery level (>96%) and tool caddy payload lock", role: "Rover", done: true },
    ],
    pov: {
      title: "Habitat Porch & Basaltic Pavement",
      outcropType: "Crater-Floor Basalt / Regolith Pavement",
      scale: "10 cm Reference Scale Bar",
      features: [
        { label: "Olivine Phenocrysts (1-3 mm)", color: "#10B981", pos: { x: 30, y: 70 } },
        { label: "Aeolian Ventifact Ridge", color: "#F59E0B", pos: { x: 65, y: 45 } },
        { label: "Autonomous Rover Track Stamp", color: "#06B6D4", pos: { x: 80, y: 80 } },
      ],
      description: "Low-relief basaltic bedrock surface with polygonal thermal-contraction fractures and sand-filled ripples."
    }
  },
  {
    id: "WP-02",
    name: "Neretva Vallis Channel Rim",
    code: "NERETVA-RIM-02",
    lat: 18.4410,
    lon: 77.3960,
    elevation: -2532,
    zone: "Fluvial Inflow Scarp",
    geologicalUnit: "Neretva Fluvial Spillway Boulder Conglomerate & Delta Scarp",
    description: "Erosional scarp carved by catastrophic paleofloods entering Jezero crater from Neretva Vallis. Massive rounded quartzite and basalt boulders up to 1.5 m embedded in coarse lithified gravels.",
    scientificContext: "Represents high-energy fluvial transport from the western highlands. Sediment sorting records multi-stage breach of Jezero crater rim (Mangold et al., 2021).",
    scores: {
      habitability: 72,
      biosignature: 30,
      scientificValue: 84,
      suitAccessibility: 78,
    },
    slopeAngle: 8.4,
    hazardLevel: "SAFE",
    instruments: ["Mastcam-Z", "SuperCam", "HiRISE DEM"],
    emergencyShelterAvailable: true,
    shelterDetails: "Overhanging boulder shelf provides up to 68% terrain shielding against solar energetic particles (SEP).",
    citations: [
      {
        author: "Mangold, N., Gupta, S., Armstrong, O., et al.",
        year: 2021,
        title: "Perseverance rover reveals an ancient delta-lake system and flood deposits at Jezero crater, Mars",
        journal: "Science",
        doi: "10.1126/science.abl4051"
      }
    ],
    tasks: [
      { id: "t5", label: "Document clast imbrication with stereo Mastcam-Z to determine paleo-flow velocity", role: "Astro-1", done: false },
      { id: "t6", label: "Inspect boulder overhang for emergency radiation shelter clearance", role: "Astro-2", done: false },
      { id: "t7", label: "Anchor rover stabilization winch for slope ascent staging", role: "Rover", done: false },
    ],
    pov: {
      title: "High-Energy Conglomerate Scarp",
      outcropType: "Imbricated Flood Boulder Deposit",
      scale: "10 cm Reference Scale Bar",
      features: [
        { label: "Rounded Granitic/Basaltic Clast (45 cm)", color: "#F59E0B", pos: { x: 40, y: 55 } },
        { label: "Pebble Matrix Cross-Bedding", color: "#06B6D4", pos: { x: 75, y: 65 } },
        { label: "SEP Shielding Alcove Overhang", color: "#10B981", pos: { x: 25, y: 25 } },
      ],
      description: "Steep channel terrace cut into bedrock with rounded river-transported cobbles suspended in a gritty sand matrix."
    }
  },
  {
    id: "WP-03",
    name: "Bright Angel Mudstone Outcrop",
    code: "BRIGHT-ANGEL-03",
    lat: 18.4440,
    lon: 77.4010,
    elevation: -2525,
    zone: "Lacustrine Margin",
    geologicalUnit: "Bright Angel Member (Fine-Grained Lacustrine Silts & Mudstones)",
    description: "Light-toned layered sedimentary outcrop with rhythmic millimeter-scale laminations. Exceptionally fine grain size capable of preserving delicate organic molecules and microbial mat structures.",
    scientificContext: "Formed in low-energy, quiescent standing water within the Jezero paleolake. High clay content (smectite) provides strong molecular adsorption capacity for biosignatures (Hurowitz et al., 2025).",
    scores: {
      habitability: 88,
      biosignature: 62,
      scientificValue: 91,
      suitAccessibility: 85,
    },
    slopeAngle: 6.8,
    hazardLevel: "SAFE",
    instruments: ["PIXL", "SHERLOC", "SuperCam", "CRISM"],
    citations: [
      {
        author: "Hurowitz, J. A., Tice, M. M., Allwood, A. C., et al.",
        year: 2025,
        title: "Aqueous alteration, redox chemistry, and potential biosignatures at Bright Angel, Jezero Crater",
        journal: "Nature Geoscience",
        doi: "10.1038/s41561-025-01640-x"
      }
    ],
    tasks: [
      { id: "t8", label: "Perform handheld multi-spectral laser sweep on clean bed surfaces", role: "Astro-1", done: false },
      { id: "t9", label: "Core test hole BA-01 using rotary-percussive sample drill", role: "Astro-2", done: false },
      { id: "t10", label: "Seal drilled specimen in hermetic gold-lined canister", role: "Astro-1", done: false },
      { id: "t11", label: "Scan ambient methane / VOC outgassing with micro-sensor array", role: "Rover", done: false },
    ],
    pov: {
      title: "Bright Angel Laminated Mudstones",
      outcropType: "Lacustrine Rhythmite Mudstone",
      scale: "10 cm Reference Scale Bar",
      features: [
        { label: "Sub-millimeter Varve Laminations", color: "#06B6D4", pos: { x: 50, y: 50 } },
        { label: "Cross-Cutting Sulfate Veinlets (CaSO4)", color: "#F43F5E", pos: { x: 70, y: 35 } },
        { label: "Smectite-Enriched Clay Horizon", color: "#10B981", pos: { x: 30, y: 75 } },
      ],
      description: "Delicate paper-thin light-toned rock sheets interspersed with brittle gypsum fracture fillings."
    }
  },
  {
    id: "WP-04",
    name: "Cheyava Falls — Primary Target",
    code: "CHEYAVA-FALLS-04",
    lat: 18.4460,
    lon: 77.4040,
    elevation: -2521,
    zone: "High-Priority Astrobiological Target",
    geologicalUnit: "Veined Ferruginous Mudstone with Redox Reaction Halos",
    description: "World-class candidate biosignature site. Reddish-purple mudstone riddled with white calcium sulfate veins, displaying millimetric 'leopard spot' reaction halos with iron-phosphate and iron-sulfide chemistry.",
    scientificContext: "PIXL X-ray fluorescence mapping reveals iron-phosphate (vivianite-like) cores surrounded by iron-sulfide (greigite) rims, correlated with SHERLOC organic-carbon Raman detections (Hurowitz et al., 2025).",
    scores: {
      habitability: 92,
      biosignature: 86,
      scientificValue: 98,
      suitAccessibility: 74,
    },
    slopeAngle: 11.2,
    hazardLevel: "CAUTION", // Center of gravity strain, deploy rover assistance
    instruments: ["PIXL", "SHERLOC", "SuperCam", "WATSON", "Mastcam-Z"],
    isPrimaryTarget: true,
    scientificRigor: {
      classification: "POTENTIAL BIOSIGNATURE — NOT CONFIRMED LIFE",
      directObservations: [
        "SHERLOC deep-UV Raman spectroscopy identified aromatic organic carbon signatures (prominent G-band at ~1600 cm⁻¹ and disordered D-band at ~1350 cm⁻¹).",
        "PIXL micro-XRF elemental scanning mapped millimeter-scale halos: cores depleted in iron and enriched in phosphorus (vivianite-type), ringed by sulfur and divalent iron (greigite-type iron sulfides).",
        "Cross-cutting calcium sulfate (anhydrite/gypsum) veins demonstrate multi-phase fluid infiltration under sub-boiling aqueous temperatures (<100°C)."
      ],
      interpretation: "On early Earth, similar spatial co-occurrences of organic carbon, iron phosphate, and iron sulfides in sedimentary rocks represent microbial iron- and sulfate-reducing metabolisms where microbes extracted chemical energy from redox disequilibrium (organic matter acting as electron donor).",
      competingAbioticExplanations: [
        "Low-temperature abiotic hydrothermal/diagenetic fluid mixing where acidic iron-bearing groundwater encountered alkaline pore waters, precipitating iron-phosphates and sulfides without biological intervention.",
        "Fischer-Tropsch-type (FTT) abiotic organic synthesis catalyzed by iron-nickel-bearing minerals in volcanic basement rocks, subsequently mobilized by groundwater.",
        "Auto-catalytic radiolytic reduction of sulfates and organic molecules driven by trace radioactive decay (U, Th, K) in detrital zircon or monazite grains."
      ],
      conclusion: "While the geochemical pattern matches known terrestrial microbial biosignatures, abiotic mechanisms cannot yet be ruled out without sample return to Earth for sub-nanometer isotopic ratio mass spectrometry."
    },
    citations: [
      {
        author: "Hurowitz, J. A., Tice, M. M., Allwood, A. C., et al.",
        year: 2025,
        title: "Aqueous alteration, redox chemistry, and potential biosignatures at Bright Angel, Jezero Crater",
        journal: "Nature Geoscience",
        doi: "10.1038/s41561-025-01640-x"
      },
      {
        author: "Farley, K. A., Stack, K. M., et al.",
        year: 2020,
        title: "Mars 2020 Mission Overview: Exploring Jezero Crater with Perseverance",
        journal: "Space Science Reviews",
        doi: "10.1007/s11214-020-00762-8"
      }
    ],
    tasks: [
      { id: "t12", label: "Perform ultra-high-resolution PIXL 4-hour micro-XRF raster grid over reaction halo #3", role: "Astro-1", done: false },
      { id: "t13", label: "Extract duplicate core sample CF-04A into titanium hermetic sleeve", role: "Astro-1", done: false },
      { id: "t14", label: "Position rover robotic tool carrier as physical downhill anchor and lighting reflector", role: "Rover", done: false },
      { id: "t15", label: "Record Raman fluorescence spectrum with handheld spectrometer at 248 nm", role: "Astro-2", done: false },
      { id: "t16", label: "Cryo-package sample tube into Rover Primary Science Vault", role: "Astro-2", done: false },
    ],
    pov: {
      title: "Cheyava Falls 'Leopard Spot' Redox Halo",
      outcropType: "Veined Ferruginous Mudstone",
      scale: "10 cm Reference Scale Bar (Millimeter Reaction Halos)",
      features: [
        { label: "Vivianite / Iron-Phosphate Core (White Halo)", color: "#38BDF8", pos: { x: 48, y: 52 } },
        { label: "Greigite / Iron-Sulfide Rim (Dark Ring)", color: "#A855F7", pos: { x: 55, y: 58 } },
        { label: "Fibrous Calcium Sulfate (Gypsum) Vein", color: "#F43F5E", pos: { x: 30, y: 30 } },
        { label: "Reddish Ferric Iron Mudstone Host Rock", color: "#EA580C", pos: { x: 75, y: 70 } },
        { label: "10 mm Precision Drill Abrasion Target", color: "#10B981", pos: { x: 50, y: 50 } },
      ],
      description: "Dramatic crimson and charcoal rock surface laced with intricate white veins and distinct circular redox bleach halos."
    }
  },
  {
    id: "WP-05",
    name: "Carbonate Margin Ridge",
    code: "CARBONATE-RIDGE-05",
    lat: 18.4490,
    lon: 77.4070,
    elevation: -2508,
    zone: "Paleolake Shoreline",
    geologicalUnit: "Marginal Carbonate Unit (Magnesium/Iron Carbonates & Siliceous Crust)",
    description: "Prominent paleolake shore margin ridge composed of magnesium-rich carbonates (magnesite) and chert silica nodules. High potential for stromatolitic macro-structures and fossilized bio-calcification.",
    scientificContext: "Carbonates precipitating from alkaline paleolake water act as exceptional preservation taphonomic windows for microfossils, preventing diagenetic leaching (Farley et al., 2020).",
    scores: {
      habitability: 85,
      biosignature: 55,
      scientificValue: 93,
      suitAccessibility: 52, // Steep scarp nearby
    },
    slopeAngle: 14.8,
    hazardLevel: "CAUTION",
    scarpWarningNearby: true,
    scarpAngle: 18.5, // >15° No-Go cliff face within 35 meters
    instruments: ["CRISM", "SuperCam", "SHERLOC"],
    citations: [
      {
        author: "Farley, K. A., Williford, K. H., Stack, K. M., et al.",
        year: 2020,
        title: "Mars 2020 Mission Overview: Astrobiology, Sample Caching, and Jezero Crater Landing Site",
        journal: "Space Science Reviews",
        doi: "10.1007/s11214-020-00762-8"
      }
    ],
    tasks: [
      { id: "t17", label: "Survey wavy laminations for potential micro-stromatolite morphology", role: "Astro-1", done: false },
      { id: "t18", label: "Enforce safety boundary: Maintain 15 m standoff from western scarp drop-off (>18°)", role: "Astro-2", done: false },
      { id: "t19", label: "Collect chert nodule chip sample with micro-hammer chisel", role: "Astro-2", done: false },
      { id: "t20", label: "Rover lidar scan of fault scarp offset to map local tectonic displacement", role: "Rover", done: false },
    ],
    pov: {
      title: "Carbonate Margin Shoreline Terraces",
      outcropType: "Silicified Magnesite-Carbonate Ridge",
      scale: "10 cm Reference Scale Bar",
      features: [
        { label: "Wavy Carbonate Lamination (Bio-calcification?)", color: "#F59E0B", pos: { x: 45, y: 40 } },
        { label: "Dark Gray Siliceous Chert Nodule", color: "#64748B", pos: { x: 70, y: 60 } },
        { label: "Steep 18° Scarp Edge (NO-GO ZONE)", color: "#EF4444", pos: { x: 85, y: 20 } },
      ],
      description: "Light buff-colored craggy ledge stepping up to the crater rim, pitted by aeolian deflation and chemical etching."
    }
  }
];

export const EVA_ROUTES = {
  route_a: {
    id: "route_a",
    name: "Route A — Primary Science Traverse",
    type: "PRIMARY_SCIENCE",
    distanceKm: 1.65,
    distanceM: 1650,
    estimatedDuration: "3h 40m",
    durationMinutes: 220,
    maxSlopeDeg: 12.0,
    avgSlopeDeg: 6.4,
    elevationGainM: 32,
    consumablesCostO2: "48%",
    consumablesCostPower: "42%",
    scienceReturnIndex: 96,
    emergencyWalkbackMinutes: 45,
    waypoints: ["WP-01", "WP-02", "WP-03", "WP-04", "WP-05"],
    description: "Visits all 5 high-priority scientific targets including Cheyava Falls redox halos and Carbonate Ridge. Carefully routes through gentle drainage gaps while maintaining a safe standoff (>20 m) from all steep >15° cliff scarps.",
    color: "#06B6D4",
    accentGlow: "rgba(6, 182, 212, 0.4)",
    suitRisk: "MODERATE",
    recommendedCrew: "2 Astronauts (Lead Geologist + Safety Specialist) + Autonomous Carrier Mule"
  },
  route_b: {
    id: "route_b",
    name: "Route B — Safe Low-Slope Contingency Route",
    type: "SAFE_CONTINGENCY",
    distanceKm: 1.20,
    distanceM: 1200,
    estimatedDuration: "2h 30m",
    durationMinutes: 150,
    maxSlopeDeg: 7.2,
    avgSlopeDeg: 3.5,
    elevationGainM: 15,
    consumablesCostO2: "31%",
    consumablesCostPower: "28%",
    scienceReturnIndex: 68,
    emergencyWalkbackMinutes: 28,
    waypoints: ["WP-01", "WP-02", "WP-03"],
    description: "Prioritizes immediate astronaut walk-back safety and level terrain mobility. Stays strictly on smooth channel-floor alluvium and lower Bright Angel mudstones, completely avoiding scarp ascents.",
    color: "#10B981",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    suitRisk: "LOW",
    recommendedCrew: "Rapid return or limited consumables profile (dust storm approach, telemetry glitch, or minor suit leak)"
  }
};

export const ASTRONAUT_TELEMETRY = {
  astro1: {
    name: "Dr. Maya Chen",
    role: "EVA-1 (Lead Field Geologist)",
    callsign: "VANGUARD-1",
    heartRateBpm: 84,
    oxygenReservePercent: 82,
    batteryReservePercent: 78,
    suitPressureKpa: 29.6, // Nom 29.6 kPa (4.3 psi 100% O2)
    internalTempC: 21.4,
    metabolicRateW: 245,
    accumulatedDoseMSv: 0.11,
    walkBackDistanceM: 840,
    timeToDepletionMin: 195,
    status: "NOMINAL",
    suitStatus: "SEAL INTEGRITY 100%"
  },
  astro2: {
    name: "Leo Vance",
    role: "EVA-2 (Mission Systems & Safety)",
    callsign: "GUARDIAN-2",
    heartRateBpm: 76,
    oxygenReservePercent: 86,
    batteryReservePercent: 81,
    suitPressureKpa: 29.7,
    internalTempC: 21.1,
    metabolicRateW: 210,
    accumulatedDoseMSv: 0.10,
    walkBackDistanceM: 840,
    timeToDepletionMin: 210,
    status: "NOMINAL",
    suitStatus: "SEAL INTEGRITY 100%"
  },
  rover: {
    name: "MARS-CARRIER-01",
    role: "Robotic Tool Carrier & Safety Mule",
    callsign: "MULE-ALPHA",
    batteryReservePercent: 94,
    distanceToCrewM: 4.8,
    payloadLoadKg: 42.5,
    payloadCapacityKg: 120.0,
    cachedSampleTubes: 3,
    sampleCapacity: 10,
    autonomousTracking: "ACTIVE (LIDAR TETHER 5M)",
    emergencyTowRatingKg: 350,
    cameraStream: "4K STEREO HAZCAM ACTIVE",
    status: "OPERATIONAL"
  }
};

export const DATA_LAYERS_CONFIG = [
  {
    id: "optical",
    name: "Optical & Morphological Relief",
    source: "NASA HiRISE Camera (MRO)",
    resolution: "25 cm/pixel",
    category: "Geomorphology",
    description: "High-resolution visible surface textures, paleo-channel banks, boulder fields, and bedrock fractures.",
    defaultActive: true,
    color: "#CBD5E1"
  },
  {
    id: "topography",
    name: "Topography & Spacesuit Mobility DEM",
    source: "HiRISE Digital Elevation Model",
    resolution: "1.0 m grid / 0.1 m vertical",
    category: "Hazards & Mobility",
    description: "Elevation contours (-2540 m to -2505 m) with astronaut slope color-coding: Safe (<10°), Caution (10-15°), No-Go (>15°).",
    defaultActive: true,
    color: "#10B981"
  },
  {
    id: "spectral",
    name: "Spectral & Mineralogical Mapping",
    source: "CRISM (MRO) + PIXL / SuperCam",
    resolution: "Spectro-radiometric correlation",
    category: "Composition",
    description: "Spatial distribution of Séítah olivine, Bright Angel smectites, sulfates, and Fe-phosphate/sulfide redox facies.",
    defaultActive: true,
    color: "#A855F7"
  },
  {
    id: "atmospheric",
    name: "Atmospheric & Dust Dynamics",
    source: "MEDA (Mars 2020 Environmental Dynamics)",
    resolution: "Real-time in-situ station",
    category: "Atmosphere",
    description: "Animated wind vectors (12 m/s NW), optical dust opacity (τ=0.44), surface pressure & boundary layer turbulence.",
    defaultActive: false,
    color: "#F59E0B"
  },
  {
    id: "radiation",
    name: "Space Weather & Radiation Exposure",
    source: "RAD (MSL/Perseverance) + MAVEN",
    resolution: "Continuous ionising dosimeter",
    category: "Safety & Space Weather",
    description: "Galactic Cosmic Ray (0.64 mSv/day) & Solar Energetic Particle (SEP) storm alert simulation with terrain shielding routing.",
    defaultActive: false,
    color: "#EF4444"
  }
];

export const SCIENTIFIC_CITATIONS = [
  {
    id: "hurowitz2025",
    author: "Hurowitz, J. A., Tice, M. M., Allwood, A. C., et al.",
    year: 2025,
    title: "Aqueous alteration, redox chemistry, and potential biosignatures at Bright Angel, Jezero Crater",
    journal: "Nature Geoscience",
    doi: "10.1038/s41561-025-01640-x",
    keyFinding: "Discovery of millimeter-scale vivianite and greigite reaction halos ('leopard spots') co-located with organic carbon signatures in Bright Angel mudstones."
  },
  {
    id: "farley2022",
    author: "Farley, K. A., Stack, K. M., Shuster, D. L., et al.",
    year: 2022,
    title: "Aqueously altered igneous rocks on the floor of Jezero crater, Mars",
    journal: "Science",
    doi: "10.1126/science.abo2196",
    keyFinding: "Determined that the Séítah and Máaz formations are igneous cumulate rocks subsequently modified by ancient carbonated brine fluids."
  },
  {
    id: "mangold2021",
    author: "Mangold, N., Gupta, S., Armstrong, O., et al.",
    year: 2021,
    title: "Perseverance rover reveals an ancient delta-lake system and flood deposits at Jezero crater, Mars",
    journal: "Science",
    doi: "10.1126/science.abl4051",
    keyFinding: "Stratigraphy of delta scarps proves Jezero transitioned from a stable closed-basin lake to violent, high-energy flooding capable of transporting multi-meter boulders."
  },
  {
    id: "farley2020",
    author: "Farley, K. A., Williford, K. H., Stack, K. M., et al.",
    year: 2020,
    title: "Mars 2020 Mission Overview: Astrobiology, Sample Caching, and Jezero Crater Landing Site",
    journal: "Space Science Reviews",
    doi: "10.1007/s11214-020-00762-8",
    keyFinding: "Outlined the primary astrobiology framework for identifying candidate biosignatures within fine-grained clay-rich and carbonate lacustrine sediments."
  }
];
