import React, { useState } from 'react';
import { 
  Layers, 
  Navigation, 
  Compass, 
  Sliders, 
  MapPin, 
  Footprints, 
  ShieldAlert, 
  Clock, 
  Plus, 
  Trash2, 
  TrendingUp, 
  AlertTriangle,
  Info,
  CheckCircle2,
  Activity,
  ArrowRight
} from 'lucide-react';
import { 
  NASA_TILE_LAYERS, 
  PRESET_SORTIES, 
  VERIFIED_TARGETS, 
  MARS_CONSTANTS,
  calculateMarsDistanceMeters 
} from '../data/marsDossierData';

export default function TraversePlannerDrawer({
  layerOpacities,
  onOpacityChange,
  activeSortieId,
  onSelectSortie,
  activeTargetId,
  onSelectTarget,
  customWaypoints,
  onClearCustomWaypoints,
  isPlacingWaypoint,
  onTogglePlaceWaypoint,
  onOpenEnvHonestyModal
}) {
  const [activeTab, setActiveTab] = useState('SORTIES'); // 'SORTIES', 'LAYERS', 'CUSTOM_BUILDER'
  const [astronautSpeed, setAstronautSpeed] = useState(0.85); // m/s (~3.06 km/h nominal suit pace)

  const activeSortie = PRESET_SORTIES.find(s => s.id === activeSortieId) || PRESET_SORTIES[0];

  // Calculate stats for custom waypoints if active
  let customTotalDistMeters = 0;
  if (customWaypoints.length >= 2) {
    for (let i = 0; i < customWaypoints.length - 1; i++) {
      customTotalDistMeters += calculateMarsDistanceMeters(
        customWaypoints[i].lat,
        customWaypoints[i].lng,
        customWaypoints[i + 1].lat,
        customWaypoints[i + 1].lng
      );
    }
  }

  return (
    <aside className="w-[320px] h-full flex flex-col bg-white border-r border-slate-300 shadow-panel z-20 overflow-hidden select-none">
      {/* Drawer Header */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/80">
        <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold text-terracotta-700 uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-terracotta-600 animate-pulse"></span>
          <span>NASA SPACE APPS 2026 // CH. 11</span>
        </div>
        <h1 className="text-sm font-display font-bold text-slate-900 leading-tight">
          MISSION 001 / JEZERO EXPEDITION INTELLIGENCE
        </h1>
        <p className="text-[11px] text-slate-500 font-sans mt-0.5">
          Planetary Surface & Meter-Scale EVA Traverse Planning
        </p>

        {/* 3 Sub-Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 mt-3 p-1 bg-slate-200/70 rounded-lg text-xs font-mono">
          <button
            onClick={() => setActiveTab('SORTIES')}
            className={`py-1 rounded text-center font-bold transition-all ${
              activeTab === 'SORTIES' ? 'bg-white text-slate-900 shadow-subtle' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SORTIES
          </button>
          <button
            onClick={() => setActiveTab('CUSTOM_BUILDER')}
            className={`py-1 rounded text-center font-bold transition-all ${
              activeTab === 'CUSTOM_BUILDER' ? 'bg-white text-slate-900 shadow-subtle' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            BUILD EVA
          </button>
          <button
            onClick={() => setActiveTab('LAYERS')}
            className={`py-1 rounded text-center font-bold transition-all ${
              activeTab === 'LAYERS' ? 'bg-white text-slate-900 shadow-subtle' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            LAYERS
          </button>
        </div>
      </div>

      {/* Main Drawer Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* ======================================================== */}
        {/* TAB 1: PRESET LOCAL EVA SORTIES (METER-SCALE FOCUS)       */}
        {/* ======================================================== */}
        {activeTab === 'SORTIES' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Footprints className="w-4 h-4 text-terracotta-700" />
                <span>Preset Local EVA Sorties</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">HiRISE Focus</span>
            </div>

            <div className="space-y-2.5">
              {PRESET_SORTIES.map((sortie) => {
                const isSelected = activeSortieId === sortie.id && customWaypoints.length === 0;

                return (
                  <div
                    key={sortie.id}
                    onClick={() => onSelectSortie(sortie.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-1 ring-terracotta-600'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                          sortie.isReferenceOnly
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : isSelected
                            ? 'bg-terracotta-700 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {sortie.badge}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            ✓ ACTIVE
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-display font-bold mt-1">
                        {sortie.name}
                      </h3>
                      <p className={`text-[11px] font-sans leading-relaxed mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                        {sortie.description}
                      </p>
                    </div>

                    {/* Sortie Telemetry Grid */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 mt-2 border-t border-slate-200/30 text-[10px] font-mono">
                      <div className={`p-1.5 rounded ${isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        <span className="block text-[8.5px] opacity-70">DISTANCE</span>
                        <strong className="text-xs">
                          {sortie.traverseDistanceM >= 1000 
                            ? `${(sortie.traverseDistanceM / 1000).toFixed(1)} km` 
                            : `${sortie.traverseDistanceM} m`}
                        </strong>
                      </div>
                      <div className={`p-1.5 rounded ${isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        <span className="block text-[8.5px] opacity-70">ELEV. Δz</span>
                        <strong className="text-xs text-terracotta-500">
                          {sortie.elevationDeltaM > 0 ? `+${sortie.elevationDeltaM}` : sortie.elevationDeltaM} m
                        </strong>
                      </div>
                      <div className={`p-1.5 rounded ${isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        <span className="block text-[8.5px] opacity-70">EST. DURATION</span>
                        <strong className="text-xs text-emerald-400">
                          {sortie.durationMin} min
                        </strong>
                      </div>
                    </div>

                    {/* Warning if reference only */}
                    {sortie.warning && (
                      <div className="mt-2 p-1.5 rounded bg-amber-50 border border-amber-300 text-amber-900 text-[9.5px] font-mono leading-tight">
                        <strong>NOTICE:</strong> {sortie.warning}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Micro-Elevation Profile Along Active Sortie */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-display font-bold text-slate-800 flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cobalt-700" />
                  <span>Traverse Elevation Profile</span>
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  Grade: {activeSortie.meanGradePct}% (Max: {activeSortie.maxSlopeDeg}°)
                </span>
              </div>

              {/* Simplified SVG Elevation Profile Line */}
              <div className="h-16 w-full bg-white rounded border border-slate-200 p-1 relative flex items-end">
                <svg viewBox="0 0 280 60" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C2410C" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#C2410C" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  {/* Elevation Polyline */}
                  <polygon
                    points="10,48 50,42 120,38 190,28 270,18 270,55 10,55"
                    fill="url(#elevationGrad)"
                  />
                  <polyline
                    points="10,48 50,42 120,38 190,28 270,18"
                    fill="none"
                    stroke="#C2410C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Waypoint Dots */}
                  <circle cx="10" cy="48" r="3.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="270" cy="18" r="3.5" fill="#C2410C" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
                <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-500">
                  Start: {VERIFIED_TARGETS.find(t => t.id === activeSortie.targetIds[0])?.elevation ?? -2362}m
                </div>
                <div className="absolute top-1 right-2 text-[9px] font-mono text-terracotta-700 font-bold">
                  End: {VERIFIED_TARGETS.find(t => t.id === activeSortie.targetIds[activeSortie.targetIds.length - 1])?.elevation ?? -2354}m
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CUSTOM WAYPOINT-TO-WAYPOINT EVA BUILDER           */}
        {/* ======================================================== */}
        {activeTab === 'CUSTOM_BUILDER' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-cobalt-700" />
                <span>Custom EVA Waypoint Builder</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">Meter-Precision</span>
            </div>

            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Click the button below and tap anywhere on the <strong>HiRISE 0.25 m/px</strong> satellite map to plot custom field points and calculate Mars spherical distances.
            </p>

            {/* Toggle Click-to-Place Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onTogglePlaceWaypoint}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all shadow-subtle ${
                  isPlacingWaypoint
                    ? 'bg-blue-600 text-white animate-pulse'
                    : 'bg-cobalt-50 text-cobalt-800 border border-cobalt-300 hover:bg-cobalt-100'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isPlacingWaypoint ? 'TAP MAP TO DROP WAYPOINTS' : 'CLICK TO ADD WAYPOINTS'}</span>
              </button>

              {customWaypoints.length > 0 && (
                <button
                  onClick={onClearCustomWaypoints}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-700 border border-slate-300 transition-colors"
                  title="Clear Custom Waypoints"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Custom Traverse Computed Telemetry */}
            {customWaypoints.length > 0 ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">CUSTOM WAYPOINTS:</span>
                  <span className="font-bold text-slate-900">{customWaypoints.length} Staged</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">CUMULATIVE DISTANCE:</span>
                  <span className="font-bold text-terracotta-700 text-sm">{customTotalDistMeters} m</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">EST. TIME (@ 0.85 m/s):</span>
                  <span className="font-bold text-emerald-700">
                    {Math.round(customTotalDistMeters / astronautSpeed / 60)} min
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 space-y-1 max-h-36 overflow-y-auto">
                  {customWaypoints.map((wp, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] font-mono p-1 rounded bg-white border border-slate-200">
                      <span>WP-{i + 1}: {wp.lat.toFixed(4)}°N, {wp.lng.toFixed(4)}°E</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs font-mono text-slate-500">
                No custom waypoints placed yet. Tap the button above to begin plotting.
              </div>
            )}

            {/* Configurable Astronaut Mobility Assumptions */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-display font-bold text-slate-800 block">
                Mobility Parameters (Mars Gravity 0.38g)
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Suit Walk Speed:</span>
                  <span className="font-bold text-slate-800">{astronautSpeed} m/s (3.1 km/h)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Max Solo EVA Limit:</span>
                  <span className="font-bold text-slate-800">240 min (4h 00m)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">O₂ Burn Rate:</span>
                  <span className="font-bold text-cobalt-700">1.05 L/min @ 29.6 kPa</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: NASA SATELLITE LAYERS & OPACITY CONTROLS          */}
        {/* ======================================================== */}
        {activeTab === 'LAYERS' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-cobalt-700" />
                <span>NASA Mars Trek Satellite Layers</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">WMTS Tiles</span>
            </div>

            <div className="space-y-3">
              {NASA_TILE_LAYERS.map((layer) => {
                const opacity = layerOpacities[layer.id] ?? layer.defaultOpacity;
                const pct = Math.round(opacity * 100);

                return (
                  <div key={layer.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-display font-bold text-slate-900">{layer.shortName}</span>
                      <span className="font-mono text-terracotta-700 font-bold">{pct}%</span>
                    </div>

                    <p className="text-[10px] text-slate-500 leading-snug font-sans">
                      {layer.description}
                    </p>

                    <div className="flex items-center space-x-2 pt-1">
                      <Sliders className="w-3 h-3 text-slate-400 shrink-0" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => onOpacityChange(layer.id, parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Native Resolution & Coverage Audit Badge */}
                    <div className="pt-1.5 border-t border-slate-200 text-[9.5px] font-mono space-y-0.5">
                      <div className="text-slate-600 font-bold">
                        Native Res: <span className="text-slate-900">{layer.nativeResolution}</span>
                      </div>
                      <div className="text-terracotta-700 font-semibold leading-tight">
                        ⚠ {layer.safetyWarning}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BOTTOM TRIGGER: ENVIRONMENTAL & RADIATION HONESTY PANEL  */}
        {/* ======================================================== */}
        <div className="pt-2 border-t border-slate-200">
          <button
            onClick={onOpenEnvHonestyModal}
            className="w-full p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold flex items-center justify-between border border-slate-300 transition-colors"
          >
            <div className="flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>RAD / MEDA Honesty Panel</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </aside>
  );
}
