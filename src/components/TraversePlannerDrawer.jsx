import React from 'react';
import { 
  Layers, 
  Compass, 
  Sliders, 
  MapPin, 
  Plus, 
  Trash2, 
  RotateCcw, 
  TrendingUp, 
  Info, 
  Footprints, 
  Navigation,
  ArrowRight,
  Maximize2,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  NASA_TILE_LAYERS, 
  PRESET_SORTIES, 
  VERIFIED_TARGETS, 
  MARS_CONSTANTS,
  calculateMarsDistanceMeters,
  formatMarsDistance 
} from '../data/marsDossierData';

export default function TraversePlannerDrawer({
  activeTab = 'SORTIES', // 'SORTIES', 'BUILD_EVA', 'LAYERS'
  onSelectTab,
  activeSortieId,
  onSelectSortie,
  customRouteWaypoints = [],
  onAddTargetToRoute,
  onRemoveWaypoint,
  onUndoLastWaypoint,
  onClearCustomRoute,
  isMapClickWaypointMode,
  onToggleMapClickMode,
  astronautSpeedMs = 0.5,
  onChangeAstronautSpeed,
  onFlyToRoute,
  activeRoutePoints = [],
  activeMapMode,
  onSelectMapMode,
  layerOpacities = {},
  onOpacityChange,
  activeTargetId,
  onSelectTarget
}) {
  const activeSortie = PRESET_SORTIES.find(s => s.id === activeSortieId) || PRESET_SORTIES[0];

  const LAYER_CARDS = [
    {
      id: 'mars_optical',
      modeKey: 'OPTICAL',
      title: '1. Mars Optical Satellite',
      specs: 'Viking MDIM 2.1 | XYZ | native zoom ≤ 8',
      tag: 'Natural Color',
      defaultVal: 1.0
    },
    {
      id: 'mola_color',
      modeKey: 'MOLA_ELEVATION',
      title: '2. MOLA Colorized Elevation',
      specs: 'Laser Altimeter | TMS: true | native zoom ≤ 6',
      tag: 'Hypsometric',
      defaultVal: 0.85
    },
    {
      id: 'mola_gray',
      modeKey: 'MOLA_GRAY',
      title: '3. MOLA Shaded Relief',
      specs: 'Hillshade | TMS: true | native zoom ≤ 6',
      tag: 'Hillshade',
      defaultVal: 0.80
    },
    {
      id: 'celestia_shaded',
      modeKey: 'CELESTIA',
      title: '4. Celestia 16k True-Color + HiRISE Zoom Overlays',
      specs: '16k Global + HiRISE | TMS: true | native zoom ≤ 5',
      tag: 'HiRISE Zoom Ready',
      defaultVal: 1.0
    }
  ];

  const handleSoloLayer = (layerId) => {
    LAYER_CARDS.forEach(layer => {
      onOpacityChange(layer.id, layer.id === layerId ? 1.0 : 0.0);
    });
    if (onSelectMapMode) {
      onSelectMapMode('FREE_BLEND');
    }
  };

  const handleToggleVisibility = (layerId) => {
    const currentVal = layerOpacities[layerId] ?? 0;
    if (currentVal > 0) {
      onOpacityChange(layerId, 0.0);
    } else {
      const def = LAYER_CARDS.find(l => l.id === layerId)?.defaultVal || 1.0;
      onOpacityChange(layerId, def);
    }
    if (onSelectMapMode) {
      onSelectMapMode('FREE_BLEND');
    }
  };

  const handleSliderChange = (layerId, percent) => {
    onOpacityChange(layerId, Math.max(0, Math.min(100, percent)) / 100);
    if (onSelectMapMode) {
      onSelectMapMode('FREE_BLEND');
    }
  };

  const isSoloLayer = (layerId) => {
    const thisVal = Math.round((layerOpacities[layerId] ?? 0) * 100);
    if (thisVal < 95) return false;
    return LAYER_CARDS.every(l => {
      if (l.id === layerId) return true;
      const otherVal = Math.round((layerOpacities[l.id] ?? 0) * 100);
      return otherVal === 0;
    });
  };

  // Calculate live route metrics from activeRoutePoints
  let totalDistMeters = 0;
  let cumulativeAscentM = 0;
  const segments = [];

  if (activeRoutePoints.length >= 2) {
    for (let i = 0; i < activeRoutePoints.length - 1; i++) {
      const p1 = activeRoutePoints[i];
      const p2 = activeRoutePoints[i + 1];
      const segDist = calculateMarsDistanceMeters(p1.lat, p1.lng, p2.lat, p2.lng);
      const elevDelta = Math.round((p2.elevation - p1.elevation) * 10) / 10;
      const grade = segDist > 0 ? Math.round((Math.abs(elevDelta) / segDist) * 1000) / 10 : 0;
      const ascent = elevDelta > 0 ? elevDelta : 0;

      totalDistMeters += segDist;
      cumulativeAscentM += ascent;

      segments.push({
        id: `seg-${i}`,
        from: p1.name || p1.id,
        to: p2.name || p2.id,
        distM: segDist,
        elevDelta,
        grade
      });
    }
  }

  const netElevDeltaM = activeRoutePoints.length >= 2
    ? Math.round((activeRoutePoints[activeRoutePoints.length - 1].elevation - activeRoutePoints[0].elevation) * 10) / 10
    : 0;

  const meanGradePct = totalDistMeters > 0
    ? Math.round((cumulativeAscentM / totalDistMeters) * 1000) / 10
    : 0;

  const durationSec = astronautSpeedMs > 0 ? totalDistMeters / astronautSpeedMs : 0;
  const durationFormatted = durationSec < 3600
    ? `${Math.max(1, Math.round(durationSec / 60))} min`
    : `${Math.floor(durationSec / 3600)}h ${Math.round((durationSec % 3600) / 60)}m`;

  const oxygenCostKg = ((durationSec / 3600) * 0.084).toFixed(2);
  const batteryKWh = ((totalDistMeters / 1000) * 0.42).toFixed(2);

  return (
    <aside className="w-[330px] h-full flex flex-col bg-white border-r border-slate-300 shadow-panel z-20 overflow-hidden select-none">
      {/* Drawer Header Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-mono font-bold">
        <button
          onClick={() => onSelectTab('SORTIES')}
          className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'SORTIES'
              ? 'border-terracotta-700 text-terracotta-800 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>SORTIES</span>
        </button>

        <button
          onClick={() => onSelectTab('BUILD_EVA')}
          className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'BUILD_EVA'
              ? 'border-terracotta-700 text-terracotta-800 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Footprints className="w-3.5 h-3.5" />
          <span>BUILD EVA</span>
        </button>

        <button
          onClick={() => onSelectTab('LAYERS')}
          className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'LAYERS'
              ? 'border-terracotta-700 text-terracotta-800 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>LAYERS</span>
        </button>
      </div>

      {/* Main Drawer Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* ======================================================== */}
        {/* TAB 1: PRESET MARSWALK SORTIES                           */}
        {/* ======================================================== */}
        {activeTab === 'SORTIES' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                  <Compass className="w-4 h-4 text-terracotta-700" />
                  <span>Verified Preset Sorties</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Mars 2020 Context</span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                Click any sortie to frame the route, draw the high-contrast polyline, and view segment calculations.
              </p>
            </div>

            {/* Sortie Selector Cards */}
            <div className="space-y-2.5">
              {PRESET_SORTIES.map((sortie) => {
                const isSelected = activeSortieId === sortie.id;
                return (
                  <div
                    key={sortie.id}
                    onClick={() => onSelectSortie(sortie.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-terracotta-700 bg-terracotta-50/60 shadow-subtle ring-1 ring-terracotta-700'
                        : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
                        {sortie.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-terracotta-700">
                        {formatMarsDistance(sortie.traverseDistanceM)}
                      </span>
                    </div>

                    <h4 className="text-xs font-display font-bold text-slate-900 leading-snug">
                      {sortie.name}
                    </h4>

                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {sortie.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/80 text-[10px] font-mono">
                      <div>
                        <span className="text-slate-400 block">ASCENT GAIN:</span>
                        <strong className="text-slate-900">+{sortie.cumulativeAscentM} m</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">EST. DURATION:</span>
                        <strong className="text-slate-900">~{sortie.durationMin} min</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Mobility Readouts Card */}
            {activeRoutePoints.length >= 2 && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-terracotta-700" />
                    <span className="text-xs font-display font-bold text-slate-900">Live Route Metrics</span>
                  </div>
                  <button
                    onClick={onFlyToRoute}
                    className="flex items-center space-x-1 px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-[10px] font-mono font-bold text-slate-700 transition-colors shadow-2xs"
                    title="Fit route in map viewport"
                  >
                    <Maximize2 className="w-3 h-3 text-terracotta-700" />
                    <span>Fly to Route</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">TOTAL DISTANCE:</span>
                    <strong className="text-terracotta-700 text-xs font-bold">{formatMarsDistance(totalDistMeters)}</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">NET ELEV (Δz):</span>
                    <strong className="text-slate-900 text-xs font-bold">{netElevDeltaM > 0 ? `+${netElevDeltaM} m` : `${netElevDeltaM} m`}</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">CUMULATIVE ASCENT:</span>
                    <strong className="text-slate-900 font-bold">+{cumulativeAscentM} m</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">MEAN GRADE:</span>
                    <strong className="text-slate-900 font-bold">{meanGradePct}%</strong>
                  </div>
                </div>

                {/* Segment Breakdown */}
                <div className="space-y-1 pt-1 border-t border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Segment Sequence:</span>
                  <div className="max-h-[140px] overflow-y-auto space-y-1">
                    {segments.map((seg, idx) => (
                      <div key={seg.id} className="p-1.5 rounded bg-white border border-slate-200 text-[10px] font-mono flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 truncate">
                          <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate">{seg.from} → {seg.to}</span>
                        </div>
                        <div className="text-right shrink-0 ml-1">
                          <span className="font-bold text-slate-800">{formatMarsDistance(seg.distM)}</span>
                          <span className="text-slate-400 block text-[9px]">{seg.elevDelta > 0 ? `+${seg.elevDelta}m` : `${seg.elevDelta}m`} ({seg.grade}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NASA Route Disclaimer Badge */}
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-900 leading-tight">
                  <span className="font-bold block">⚠️ DESIGN ASSUMPTION:</span>
                  {MARS_CONSTANTS.EVA_DISCLAIMER}. All paths require real-time robotic scout verification.
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: BUILD EVA (CUSTOM ROUTE PLANNER)                  */}
        {/* ======================================================== */}
        {activeTab === 'BUILD_EVA' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-1">
                <Footprints className="w-4 h-4 text-terracotta-700" />
                <span>Build Custom EVA Traverse</span>
              </span>
              <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                Add research targets or toggle Map Click Mode to plot custom waypoints around steep scarps and boulder hazards.
              </p>
            </div>

            {/* Quick Target Add Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                Add Research Target to Route:
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    onAddTargetToRoute(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs font-mono font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              >
                <option value="">-- Select Target (T1–T9) --</option>
                {VERIFIED_TARGETS.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.num}: {t.name} ({t.elevation} m)
                  </option>
                ))}
              </select>
            </div>

            {/* Map Click Waypoint Mode Toggle */}
            <div className="space-y-2">
              <button
                onClick={onToggleMapClickMode}
                className={`w-full py-2 px-3 rounded-lg font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm ${
                  isMapClickWaypointMode
                    ? 'bg-amber-500 text-slate-950 border border-amber-600 ring-2 ring-amber-300 animate-pulse'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{isMapClickWaypointMode ? 'MAP CLICK MODE: ON (CLICK MAP)' : 'TOGGLE MAP CLICK WAYPOINT MODE'}</span>
              </button>

              {/* Action buttons row */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={onFlyToRoute}
                  disabled={customRouteWaypoints.length < 2}
                  className="flex-1 py-1.5 px-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-[11px] font-mono font-bold text-slate-700 flex items-center justify-center space-x-1 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-terracotta-700" />
                  <span>Fly to Route</span>
                </button>

                <button
                  onClick={onUndoLastWaypoint}
                  disabled={customRouteWaypoints.length === 0}
                  className="py-1.5 px-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-[11px] font-mono font-bold text-slate-700 flex items-center space-x-1 transition-colors"
                  title="Undo last point"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Undo</span>
                </button>

                <button
                  onClick={onClearCustomRoute}
                  disabled={customRouteWaypoints.length === 0}
                  className="py-1.5 px-2.5 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:pointer-events-none text-[11px] font-mono font-bold text-red-700 flex items-center space-x-1 transition-colors"
                  title="Clear all waypoints"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Astronaut Walking Speed Slider */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-600">Astronaut EVA Speed:</span>
                <span className="text-slate-900 font-bold">{astronautSpeedMs} m/s ({(astronautSpeedMs * 3.6).toFixed(1)} km/h)</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.5"
                step="0.05"
                value={astronautSpeedMs}
                onChange={(e) => onChangeAstronautSpeed(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-terracotta-700"
              />
              <span className="text-[9px] text-slate-400 font-mono block">
                NASA EVA standard: 0.5 m/s (~1.8 km/h) in pressurized exploration suit
              </span>
            </div>

            {/* Custom Telemetry Card */}
            {customRouteWaypoints.length >= 2 ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-xs font-display font-bold text-slate-900">Custom EVA Telemetry</span>
                  <span className="text-xs font-mono font-bold text-terracotta-700">
                    {formatMarsDistance(totalDistMeters)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">EST. DURATION:</span>
                    <strong className="text-slate-900 text-xs font-bold">{durationFormatted}</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">NET ELEV (Δz):</span>
                    <strong className="text-slate-900 text-xs font-bold">{netElevDeltaM > 0 ? `+${netElevDeltaM} m` : `${netElevDeltaM} m`}</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">ASCENT GAIN:</span>
                    <strong className="text-slate-900 font-bold">+{cumulativeAscentM} m</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">MEAN GRADE:</span>
                    <strong className="text-slate-900 font-bold">{meanGradePct}%</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">CREW O₂ COST:</span>
                    <strong className="text-slate-900 font-bold">{oxygenCostKg} kg</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">BATTERY DRAIN:</span>
                    <strong className="text-slate-900 font-bold">{batteryKWh} kWh</strong>
                  </div>
                </div>

                {/* Segment Table */}
                <div className="space-y-1 pt-1 border-t border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Segment Breakdown:</span>
                  <div className="max-h-[140px] overflow-y-auto space-y-1">
                    {segments.map((seg, idx) => (
                      <div key={seg.id} className="p-1.5 rounded bg-white border border-slate-200 text-[10px] font-mono flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 truncate">
                          <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate">{seg.from} → {seg.to}</span>
                        </div>
                        <div className="text-right shrink-0 ml-1">
                          <span className="font-bold text-slate-800">{formatMarsDistance(seg.distM)}</span>
                          <span className="text-slate-400 block text-[9px]">{seg.elevDelta > 0 ? `+${seg.elevDelta}m` : `${seg.elevDelta}m`} ({seg.grade}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NASA Route Disclaimer Badge */}
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-900 leading-tight">
                  <span className="font-bold block">⚠️ DESIGN ASSUMPTION:</span>
                  {MARS_CONSTANTS.EVA_DISCLAIMER}. Slopes exceeding 15% require safety winch tethers.
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500 font-sans">
                Select targets from dropdown or click directly on the map to plot a custom EVA traverse (minimum 2 points).
              </div>
            )}

            {/* List of Custom Waypoints */}
            {customRouteWaypoints.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Plotted Waypoints ({customRouteWaypoints.length}):
                </span>
                <div className="max-h-[150px] overflow-y-auto space-y-1">
                  {customRouteWaypoints.map((wp, idx) => (
                    <div key={wp.id || idx} className="p-1.5 rounded bg-white border border-slate-200 text-[10px] font-mono flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 truncate">
                        <span className="font-bold text-terracotta-700">W{idx + 1}</span>
                        <span className="text-slate-800 font-medium truncate">{wp.name}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 shrink-0 ml-1">
                        <span className="text-slate-500">{wp.elevation}m</span>
                        <button
                          onClick={() => onRemoveWaypoint(idx)}
                          className="text-slate-400 hover:text-red-600 p-0.5 rounded"
                          title="Remove waypoint"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: UNIFIED MULTI-LAYER CARD STACK                    */}
        {/* ======================================================== */}
        {activeTab === 'LAYERS' && (
          <div className="space-y-3">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-1">
                <Layers className="w-4 h-4 text-terracotta-700" />
                <span>Planetary Basemaps & Blending</span>
              </span>
              <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                Click <strong>Solo</strong> (or card title) for instant 1-click basemap switching, or drag inline sliders to blend multi-spectral orbital datasets simultaneously.
              </p>
            </div>

            {/* Unified 4-Layer Card Stack */}
            <div className="space-y-2">
              {LAYER_CARDS.map(layer => {
                const currentVal = layerOpacities[layer.id] ?? 0;
                const opacityPct = Math.round(currentVal * 100);
                const isActive = opacityPct > 0;
                const isSolo = isSoloLayer(layer.id);

                return (
                  <div
                    key={layer.id}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      isActive
                        ? 'border-terracotta-500 bg-[#FFF7ED]/70 shadow-xs ring-1 ring-terracotta-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Top Row: Eye toggle, Name, Specs, Solo button, and Live Percentage Badge */}
                    <div className="flex items-start justify-between gap-1.5 mb-2">
                      <div className="flex items-start space-x-2 min-w-0">
                        {/* Eye Visibility Toggle */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleVisibility(layer.id);
                          }}
                          className={`mt-0.5 p-1 rounded-md transition-colors shrink-0 ${
                            isActive
                              ? 'text-terracotta-700 bg-terracotta-100 hover:bg-terracotta-200'
                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                          }`}
                          title={isActive ? 'Hide Layer (0%)' : 'Show Layer (100%)'}
                        >
                          {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        {/* Title & Technical Specs (Clicking header also solos layer) */}
                        <div
                          onClick={() => handleSoloLayer(layer.id)}
                          className="cursor-pointer group select-none min-w-0"
                          title="Click to Solo / Focus this layer"
                        >
                          <h4 className="text-xs font-display font-bold text-slate-900 group-hover:text-terracotta-700 transition-colors truncate">
                            {layer.title}
                          </h4>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                            {layer.specs}
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Percentage & Solo Button */}
                      <div className="flex items-center space-x-1.5 shrink-0 ml-1">
                        <span
                          className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                            isActive
                              ? 'bg-terracotta-100 text-terracotta-800 border-terracotta-300'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}
                        >
                          {opacityPct}%
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSoloLayer(layer.id);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all border ${
                            isSolo
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-300 hover:border-terracotta-600 hover:text-terracotta-700'
                          }`}
                          title={`Solo ${layer.title} (sets to 100% and turns off others)`}
                        >
                          {isSolo ? 'Soloed' : 'Solo'}
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Inline Terracotta Opacity Slider */}
                    <div className="pt-2 border-t border-slate-200/80">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                        <span className="font-semibold text-slate-600">BLEND OPACITY</span>
                        <span className={`font-bold ${isActive ? 'text-terracotta-700' : 'text-slate-400'}`}>
                          {opacityPct}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono text-slate-400 select-none">0%</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={opacityPct}
                          onChange={(e) => handleSliderChange(layer.id, parseInt(e.target.value, 10))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C2410C]"
                        />
                        <span className="text-[9px] font-mono text-slate-400 select-none">100%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scientific Guidance Badge */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800 block mb-0.5">💡 MULTI-SPECTRAL BLEND:</span>
              Stack <strong>MOLA Color</strong> (40%–60%) over <strong>Mars Optical</strong> (100%) for colored hypsometric topography, or use <strong>Celestia</strong> (100%) for auto-fading HiRISE zoom photography.
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer Status */}
      <div className="p-2.5 border-t border-slate-200 bg-slate-50/80 text-[10px] font-mono text-slate-600 flex items-center justify-between">
        <span>Mars Mean R: 3,389.5 km</span>
        <span className="text-emerald-700 font-bold">Haversine Exact</span>
      </div>
    </aside>
  );
}
