// MISSION 001: MARTIAN EXPEDITION INTELLIGENCE
// Master Scientific Research Dossier & Planetary Epistemology
// NASA Space Apps Challenge 2026 - Challenge 11

export const MISSION_METADATA = {
  title: "MISSION 001: MARTIAN EXPEDITION INTELLIGENCE",
  subtitle: "Planetary Science & Astronaut EVA Planning Platform",
  challenge: "NASA Space Apps Challenge 2026 // Challenge 11: Interplanetary Survival Guide",
  region: "Jezero Crater, Mars",
  targetCenter: { lat: 18.444, lng: 77.401, zoom: 13 },
  habitatCoords: { lat: 18.435, lng: 77.435, elevation: -2550, name: "Alpha Habitat Station" },
  sol: 1245,
  lmst: "10:48:22 LMST",
  dateEarth: "2026-11-15",
  crew: [
    { callsign: "EVA-1", name: "Dr. Maya Chen", role: "Lead Field Geologist", heartRate: 82, o2BurnRate: "1.12 L/min" },
    { callsign: "EVA-2", name: "Leo Vance", role: "Mission Safety Engineer", heartRate: 74, o2BurnRate: "0.98 L/min" }
  ],
  supportRover: {
    callsign: "MULE-01",
    model: "MARS-CARRIER Autonomous Tool Carrier",
    status: "STANDBY // TETHER READY",
    payloadKg: 42.5,
    maxPayloadKg: 120.0,
    tubesRemaining: 7
  }
};

export const ENVIRONMENTAL_DATA = {
  gcrDoseRate: "0.64 mSv/day",
  atmosphericPressure: "725 Pa",
  windVector: "12 m/s NW (315°)",
  opticalDustOpacity: "τ = 0.44",
  ambientTemp: "-48.2°C",
  groundTemp: "-24.0°C",
  relativeHumidity: "0.08%",
  uvFlux: "High (Ozone Column Absent)"
};

export const RESEARCH_TARGETS = [
  {
    id: "target-01",
    num: "01",
    name: "Crater-Floor Igneous Formations (Séítah & Máaz)",
    shortName: "Séítah & Máaz Floor",
    lat: 18.428,
    lng: 77.451,
    elevation: -2565,
    zone: "Floor Igneous Basement",
    geologicalUnit: "Séítah / Máaz Igneous Formation (Crater-Floor Basal Contact)",
    literature: {
      citation: "Farley et al. (2022), Science Vol. 377",
      title: "Aqueously altered igneous rocks on the floor of Jezero crater, Mars",
      journal: "Science",
      doi: "10.1126/science.abo2196",
      doiUrl: "https://doi.org/10.1126/science.abo2196"
    },
    evidenceSummary: "Olivine-rich cumulate and basaltic igneous rocks showing aqueous alteration (sulfates, carbonates, and perchlorates). Establishes igneous baseline prior to lacustrine deposition.",
    scores: {
      habitability: 48,
      biosignature: 18,
      scientificValue: 82,
      suitAccessibility: 92
    },
    slopeAngle: 3.2,
    slopeRisk: "SAFE",
    slopeNote: "Flat crater floor, < 5° slope. Unrestricted bipedal traverse.",
    terrainShieldingPct: 35,
    mastcamContext: "Low bedrock pavement with polygonal cooling joints, olivine phenocryst grains (1-3 mm), and dark aeolian sand ripples.",
    distanceFromHabKm: 1.85,
    estWalkbackMin: 32,
    o2CostPct: 22,
    batteryCostPct: 19,
    epistemology: {
      directObservations: [
        "SuperCam and PIXL micro-rasters identify cumulate olivine-pyroxene framework with intercumulate plagioclase.",
        "Aqueous salt veins (sulfates and perchlorates) fill microscopic rock fractures.",
        "RIMFAX ground-penetrating radar traces eastward-dipping layering beneath the Máaz unit."
      ],
      publishedInterpretation: "Farley et al. (2022) established that Jezero floor formations are igneous cumulate units altered by low-temperature aqueous fluids, disproving pre-landing hypotheses of purely lacustrine floor sediments.",
      researchHypothesis: "Serpentinization and olivine carbonation during early brine circulation released molecular hydrogen, creating transient localized chemoautotrophic niches.",
      competingAbioticExplanation: "Pure magmatic fractionation within a ponded lava lake, followed by deuteric auto-alteration during cooling without surface water involvement."
    }
  },
  {
    id: "target-02",
    num: "02",
    name: "Western Delta & Delta-Front Deposits",
    shortName: "Western Delta Front",
    lat: 18.452,
    lng: 77.422,
    elevation: -2528,
    zone: "Fluvial Delta Scarp",
    geologicalUnit: "Kodiak-Equivalent Deltaic Bottomset & Foreset Megaclasts",
    literature: {
      citation: "Mangold et al. (2021), Science Vol. 374",
      title: "Perseverance rover reveals an ancient delta-lake system and flood deposits at Jezero crater, Mars",
      journal: "Science",
      doi: "10.1126/science.abl4051",
      doiUrl: "https://doi.org/10.1126/science.abl4051"
    },
    evidenceSummary: "Layered sedimentary strata transitioning into boulder-rich conglomerate beds indicating episodic high-energy flooding that breached the crater rim.",
    scores: {
      habitability: 76,
      biosignature: 35,
      scientificValue: 88,
      suitAccessibility: 64
    },
    slopeAngle: 12.8,
    slopeRisk: "CAUTION",
    slopeNote: "Caution: dense flood boulder fields & 13° delta-front scarp. Center-of-gravity strain; tether rover.",
    terrainShieldingPct: 68,
    mastcamContext: "Steep truncated delta scarp with cross-bedded sandstone foresets capped by 1.5 m rounded quartzite and basalt flood boulders.",
    distanceFromHabKm: 2.34,
    estWalkbackMin: 46,
    o2CostPct: 36,
    batteryCostPct: 32,
    epistemology: {
      directObservations: [
        "Mastcam-Z and SuperCam RMI resolve distinct Gilbert-type delta architecture (bottomset, foreset, topset).",
        "Topset units host imbricated rounded boulders up to 1.5 meters across suspended in coarse gravelly sandstone.",
        "Pronounced erosional truncation separates fine lower foresets from coarse upper conglomerates."
      ],
      publishedInterpretation: "Mangold et al. (2021) showed Jezero underwent a major hydrologic regime shift: an initial quiescent standing lake gave way to catastrophic torrential floods capable of transporting highland boulders.",
      researchHypothesis: "Sudden regional climate spikes or volcano-ice interactions in the western watershed triggered catastrophic glacial outburst floods (jökulhlaups).",
      competingAbioticExplanation: "Subaqueous slope failure and gravity debris flows along steep subaqueous delta fronts triggered by crater rim seismic settling."
    }
  },
  {
    id: "target-03",
    num: "03",
    name: "Delta Fine-Grained Sedimentary Layers",
    shortName: "Delta Lacustrine Mudstones",
    lat: 18.458,
    lng: 77.409,
    elevation: -2510,
    zone: "Quiescent Lacustrine Basin",
    geologicalUnit: "Tenby & Hawksbill Gap Fine Laminated Mudstones",
    literature: {
      citation: "Mangold et al. (2021) & Farley et al. (2020), Space Sci. Rev.",
      title: "Mars 2020 Mission Overview: Astrobiology and Sample Caching at Jezero",
      journal: "Space Science Reviews",
      doi: "10.1007/s11214-020-00762-y",
      doiUrl: "https://doi.org/10.1007/s11214-020-00762-y"
    },
    evidenceSummary: "Fine-grained lacustrine mudstones and siltstones with high clay (smectite) adsorption capacity, offering prime biosignature preservation potential.",
    scores: {
      habitability: 86,
      biosignature: 58,
      scientificValue: 90,
      suitAccessibility: 76
    },
    slopeAngle: 7.4,
    slopeRisk: "SAFE",
    slopeNote: "Moderate low-angle slope (7°). Smooth siltstone terraces easily traversed by suit.",
    terrainShieldingPct: 52,
    mastcamContext: "Thin, paper-like sub-millimeter laminations in buff-toned mudstones with cross-cutting white gypsum fracture fills.",
    distanceFromHabKm: 3.10,
    estWalkbackMin: 58,
    o2CostPct: 42,
    batteryCostPct: 38,
    epistemology: {
      directObservations: [
        "Planar millimeter-scale varve laminations with grain sizes < 50 micrometers.",
        "SHERLOC and CRISM spectra confirm abundant Fe/Mg smectite phyllosilicates.",
        "Localized sulfate mineral fills form delicate branching networks across bedding planes."
      ],
      publishedInterpretation: "Farley et al. (2020) and Mangold et al. (2021) identified these fine mudstones as optimal taphonomic windows for microfossil and organic biomarker encapsulation.",
      researchHypothesis: "Slow flocculation of charged clay particles in calm lake water adsorbed dissolved organic macromolecules from the water column.",
      competingAbioticExplanation: "Eolian airfall deposition of atmospheric volcanic dust into a desiccating playa, followed by shallow, sterile groundwater diageneis."
    }
  },
  {
    id: "target-04",
    num: "04",
    name: "Neretva Vallis & Bright Angel Formation (Cheyava Falls)",
    shortName: "Bright Angel (Cheyava Falls)",
    lat: 18.444,
    lng: 77.401,
    elevation: -2521,
    zone: "High-Priority Astrobiological Target",
    geologicalUnit: "Bright Angel Member (Veined Ferruginous Mudstones & Vivianite Facies)",
    isPrimaryTarget: true,
    literature: {
      citation: "Hurowitz et al. (2025), Nature Vol. 645, p. 332",
      title: "Aqueous alteration, redox chemistry, and potential biosignatures at Bright Angel, Jezero Crater",
      journal: "Nature",
      doi: "10.1038/s41586-025-09413-0",
      doiUrl: "https://doi.org/10.1038/s41586-025-09413-0"
    },
    evidenceSummary: "Mudstone outcrops riddled with PIXL iron-phosphate nodules (vivianite), iron-sulfide reaction fronts (greigite), and SHERLOC organic-carbon spectral detections.",
    scores: {
      habitability: 92,
      biosignature: 86,
      scientificValue: 98,
      suitAccessibility: 84
    },
    slopeAngle: 11.2,
    slopeRisk: "CAUTION",
    slopeNote: "Channel floor accessible with companion rover. 11° local slope; deploy rover lighting & stabilizer.",
    terrainShieldingPct: 62,
    mastcamContext: "Distinctive 'leopard spot' millimetric bleach rings: white vivianite cores surrounded by black greigite reaction rims embedded in reddish mudstone.",
    distanceFromHabKm: 2.80,
    estWalkbackMin: 52,
    o2CostPct: 39,
    batteryCostPct: 35,
    epistemology: {
      isPotentialBiosignature: true,
      bannerNotice: "POTENTIAL BIOSIGNATURE — NOT CONFIRMED EVIDENCE OF LIFE",
      directObservations: [
        "SHERLOC deep-UV Raman spectroscopy identified aromatic organic carbon (prominent G-band at ~1600 cm⁻¹ and D-band at ~1350 cm⁻¹).",
        "PIXL micro-XRF elemental mapping resolved millimeter-scale halos: cores depleted in Fe and enriched in P (vivianite-type), ringed by S and divalent Fe (greigite-type).",
        "Cross-cutting calcium sulfate (anhydrite/gypsum) veins demonstrate multi-phase aqueous fluid flow under sub-boiling temperatures (<100°C)."
      ],
      publishedInterpretation: "Hurowitz et al. (2025) report that the millimeter-scale halo morphology and Fe/P/S redox reaction fronts closely resemble terrestrial microbial iron- and sulfate-reducing communities using organic carbon as an electron donor.",
      researchHypothesis: "Ancient Martian anaerobic microorganisms extracted metabolic energy from redox disequilibrium between ferric iron in sediment and organic-bearing groundwater.",
      competingAbioticExplanation: "Low-temperature abiotic hydrothermal or diagenetic fluid mixing where acidic iron-bearing fluids encountered alkaline pore waters, precipitating vivianite and greigite halos without biology; abiotic Fischer-Tropsch-type (FTT) organic synthesis."
    }
  },
  {
    id: "target-05",
    num: "05",
    name: "Carbonate-Bearing Margin Unit",
    shortName: "Marginal Carbonate Ridge",
    lat: 18.465,
    lng: 77.388,
    elevation: -2485,
    zone: "Paleolake Shoreline Margin",
    geologicalUnit: "Marginal Carbonate (Magnesite / Siliceous Chert)",
    literature: {
      citation: "Farley et al. (2020), Space Sci. Rev. Vol. 216",
      title: "Mars 2020 Mission Overview: Astrobiology, Sample Caching, and Jezero Crater Landing Site",
      journal: "Space Science Reviews",
      doi: "10.1007/s11214-020-00762-y",
      doiUrl: "https://doi.org/10.1007/s11214-020-00762-y"
    },
    evidenceSummary: "Orbital CRISM and rover-confirmed hydrated carbonate deposits along the ancient paleolake shoreline with potential micro-stromatolitic wavy bio-calcification textures.",
    scores: {
      habitability: 85,
      biosignature: 54,
      scientificValue: 94,
      suitAccessibility: 51
    },
    slopeAngle: 18.2,
    slopeRisk: "WARNING",
    slopeNote: "Warning: 18° crater rim slope — requires switchback traverse and 15m standoff from western cliff edge.",
    terrainShieldingPct: 40,
    mastcamContext: "Craggy light-buff step-terraced ridge exhibiting wavy laminations, dark chert silica nodules, and sharp erosional deflation ledges.",
    distanceFromHabKm: 4.25,
    estWalkbackMin: 82,
    o2CostPct: 62,
    batteryCostPct: 58,
    epistemology: {
      directObservations: [
        "CRISM orbital hyperspectral data show diagnostic 2.3 µm and 2.5 µm absorption doublet matching Mg-carbonates (magnesite).",
        "In-situ SuperCam analysis confirms siliceous chert nodules interbedded with carbonate benches.",
        "High-angle fracture lineaments show structural tilting towards the crater interior."
      ],
      publishedInterpretation: "Farley et al. (2020) demonstrated that marginal carbonates formed either in a shallow alkaline lacustrine shoreline or via hydrothermal precipitation, both offering high potential for fossilized bio-calcification.",
      researchHypothesis: "Photosynthetic or chemoautotrophic microbial mats formed bioherms or stromatolites along the sunlit, wave-agitated paleolake margin.",
      competingAbioticExplanation: "Abiotic evaporative precipitation in high-pH playa brines, or serpentinization-derived hyperalkaline spring water contacting atmospheric CO2 to form inorganic travertine."
    }
  }
];

export const MAP_LAYERS_CONFIG = [
  {
    id: "optical",
    name: "Optical CTX / Viking Mosaic",
    description: "NASA JPL Global Mars Viking MDIM2.1 Color Mosaic (232m)",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
    attribution: "NASA / JPL-Caltech / USGS",
    defaultOpacity: 1.0,
    minZoom: 4,
    maxZoom: 18
  },
  {
    id: "jezero_ctx",
    name: "High-Res Jezero CTX / HiRISE",
    description: "Sub-meter orbital context mosaic of Jezero crater delta & canyon",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Jezerocrater_CTX_Mosaic_6m/1.0.0//default/default028mm/{z}/{y}/{x}.png",
    attribution: "NASA / JPL / MSSS / Mars Trek",
    defaultOpacity: 0.85,
    minZoom: 8,
    maxZoom: 18
  },
  {
    id: "themis_ir",
    name: "Thermal Infrared (THEMIS Day IR)",
    description: "Thermal inertia mapping bedrock exposed vs sand/dust mantles",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_THEMIS_IR_Day_Mosaic_global_100m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
    attribution: "NASA / JPL / ASU",
    defaultOpacity: 0.40,
    minZoom: 4,
    maxZoom: 18
  },
  {
    id: "mola_dem",
    name: "Topographic DEM (MOLA Colorized)",
    description: "Laser altimetry elevation hillshade (-2565m to -2485m)",
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_Shade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
    attribution: "NASA / GSFC / MOLA Team / DLR",
    defaultOpacity: 0.35,
    minZoom: 4,
    maxZoom: 18
  }
];
