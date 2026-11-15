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
  ArrowRight,
  Sun,
  Eye,
  Flame,
  Mountain
} from 'lucide-react';
import { 
  NASA_TILE_LAYERS, 
  PRESET_SORTIES, 
  VERIFIED_TARGETS, 
  MARS_CONSTANTS,
  calculateMarsDistanceMeters 
} from '../data/marsDossierData';

export default function TraversePlannerDrawer({
  activeMapMode,
  onSelectMapMode,
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
  const [astronautSpeed, setAstronautSpeed] = useState(0.85); // m/s (~3.06 km/h)

  const activeSortie = PRESET_SORTIES.find(s => s.id === activeSortieId) || PRESET_SORTIES[0];

  // Calculate cumulative custom waypoint distance
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

  // 5 Multi-Domain Planetary Map Modes
  const MAP_MODES = [
    {
      id: 'OPTICAL',
      name: '1. HiRISE / CTX Optical',
      tag: 'Visible 0.25m',
      desc: 'Ochre bedrock, dark basalt floor, & Bright Angel tan mudstone outcrops'
    },
    {
      id: 'THEMIS_IR',
      name: '2. THEMIS Thermal Infrared',
      tag: 'Thermal Inertia',
      desc: 'False-color heatmap: cold eolian dust vs warm high-thermal-inertia bedrock'
    },
    {
      id: 'MOLA_ELEVATION',
      name: '3. MOLA Hypsometric Elevation',
      tag: '-2586m to -1820m',
      desc: 'Figure 1 color ramp: Deep Cobalt Blue (floor) to Crimson (rim peaks)'
    },
    {
      id: 'CRISM_SPECTRAL',
      name: '4. CRISM Spectral Mineralogy',
      tag: 'Mineral Facies',
      desc: 'Translucent polygons: Olivine, Smectite Clays, Vivianite/Greigite, & Carbonates'
    },
    {
      id: 'HAZARDS',
      name: '5. Slope & Radiation Hazards',
      tag: '>15° Scarp Alert',
      desc: 'Red hatched impassable cliff faces & emerald terrain-shielded low-dose alcoves'
    }
  ];

  return (
    <aside className="w-[320px] h-full flex flex-col bg-white border-r border-slate-300 shadow-panel z-20 overflow-hidden select-none">
      {/* Sleek Sub-Header (No duplicate header text) */}
      <div className="p-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800 uppercase tracking-wider mb-2">
          <span className="flex items-center space-x-1.5">
            <Compass className="w-4 h-4 text-terracotta-700" />
            <span>TRAVERSE & PLANETARY LAYERS</span>
          </span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            ONLINE
          </span>
        </div>

        {/* 3 Workspace Tabs */}
        <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-200/80 rounded-lg text-xs font-mono">
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

                    {sortie.warning && (
                      <div className="mt-2 p-1.5 rounded bg-amber-50 border border-amber-300 text-amber-900 text-[9.5px] font-mono leading-tight">
                        <strong>NOTICE:</strong> {sortie.warning}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick 9 Targets Jumper */}
            <div className="pt-2 border-t border-slate-200 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block">
                Jump to Target (T1–T9)
              </span>
              <div className="grid grid-cols-3 gap-1 text-[11px] font-mono">
                {VERIFIED_TARGETS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTarget(t.id)}
                    className={`p-1 rounded text-center truncate border transition-all ${
                      activeTargetId === t.id
                        ? 'bg-slate-900 text-white font-bold border-slate-900'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {t.num} {t.shortName.split(' ')[0]}
                  </button>
                ))}
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
                <span>Meter-Scale EVA Builder</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">Custom Path</span>
            </div>

            <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
              Tap the button below and click anywhere on the <strong>HiRISE 0.25 m/px</strong> map to drop custom field waypoints.
            </p>

            <div className="flex items-center space-x-2">
              <button
                onClick={onTogglePlaceWaypoint}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all shadow-subtle ${
                  isPlacingWaypoint
                    ? 'bg-cobalt-700 text-white animate-pulse'
                    : 'bg-cobalt-50 text-cobalt-800 border border-cobalt-300 hover:bg-cobalt-100'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isPlacingWaypoint ? 'CLICK MAP TO DROP POINT' : '+ ADD WAYPOINTS ON MAP'}</span>
              </button>

              {customWaypoints.length > 0 && (
                <button
                  onClick={onClearCustomWaypoints}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-700 border border-slate-300 transition-colors"
                  title="Clear Waypoints"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {customWaypoints.length > 0 ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">POINTS PLACED:</span>
                  <span className="font-bold text-slate-900">{customWaypoints.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">TOTAL TRAVERSE:</span>
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
                No custom waypoints placed yet. Tap "+ ADD WAYPOINTS ON MAP" to plot.
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: 5 MULTI-DOMAIN PLANETARY MAP MODES & OPACITIES    */}
        {/* ======================================================== */}
        {activeTab === 'LAYERS' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-cobalt-700" />
                <span>5 Planetary Map Modes</span>
              </span>
              <p className="text-[10px] text-slate-500">
                Switch rendering mode on the live procedural canvas & satellite shader:
              </p>

              <div className="space-y-1.5">
                {MAP_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => onSelectMapMode(mode.id)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex flex-col space-y-0.5 ${
                      activeMapMode === mode.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-1 ring-terracotta-600'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="font-display font-bold">{mode.name}</strong>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                        activeMapMode === mode.id ? 'bg-terracotta-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {mode.tag}
                      </span>
                    </div>
                    <p className={`text-[10px] leading-tight font-sans ${activeMapMode === mode.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {mode.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Tile Opacity Sliders */}
            <div className="pt-2 border-t border-slate-200 space-y-2.5">
              <span className="text-[11px] font-mono font-bold text-slate-700 uppercase block">
                NASA Mars Trek Overlay Blending
              </span>

              {NASA_TILE_LAYERS.map(layer => {
                const opacity = layerOpacities[layer.id] ?? layer.defaultOpacity;
                const pct = Math.round(opacity * 100);

                return (
                  <div key={layer.id} className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-slate-800">{layer.shortName}</span>
                      <span className="text-terracotta-700 font-bold">{pct}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={opacity}
                      onChange={(e) => onOpacityChange(layer.id, parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded appearance-none cursor-pointer"
                    />
                    <div className="text-[9px] font-mono text-slate-400">
                      Res: {layer.nativeResolution}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Environmental Disclosure Button */}
        <div className="pt-2 border-t border-slate-200">
          <button
            onClick={onOpenEnvHonestyModal}
            className="w-full p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold flex items-center justify-between border border-slate-300 transition-colors"
          >
            <div className="flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>RAD / MEDA Honesty Audit</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </aside>
  );
}
