import React, { useState } from 'react';
import { 
  Layers, 
  Navigation, 
  Compass, 
  Sliders, 
  MapPin, 
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
  ShieldCheck,
  Truck,
  Footprints,
  Maximize2
} from 'lucide-react';
import { 
  NASA_TILE_LAYERS, 
  PRESET_SORTIES, 
  VERIFIED_TARGETS, 
  MARS_CONSTANTS,
  calculateMarsDistanceKm 
} from '../data/marsDossierData';

export default function TraversePlannerDrawer({
  activeMapMode,
  onSelectMapMode,
  layerOpacities = {},
  onOpacityChange,
  activeSortieId,
  onSelectSortie,
  activeTargetId,
  onSelectTarget,
  customWaypoints = [],
  onClearCustomWaypoints,
  isPlacingWaypoint,
  onTogglePlaceWaypoint,
  onOpenEnvHonestyModal
}) {
  const [activeTab, setActiveTab] = useState('EXPEDITIONS'); // 'EXPEDITIONS', 'LAYERS', 'CUSTOM_BUILDER'
  const [roverSpeedKmH, setRoverSpeedKmH] = useState(8.0); // km/h for pressurized rover

  const activeSortie = PRESET_SORTIES.find(s => s.id === activeSortieId) || PRESET_SORTIES[0];

  // Calculate cumulative custom waypoint distance
  let customTotalDistKm = 0;
  if (customWaypoints.length >= 2) {
    for (let i = 0; i < customWaypoints.length - 1; i++) {
      customTotalDistKm += calculateMarsDistanceKm(
        customWaypoints[i].lat,
        customWaypoints[i].lng,
        customWaypoints[i + 1].lat,
        customWaypoints[i + 1].lng
      );
    }
  }

  const customDriveHours = roverSpeedKmH > 0 ? (customTotalDistKm / roverSpeedKmH).toFixed(1) : 0;
  const customBatteryKWh = (customTotalDistKm * 0.42).toFixed(1); // ~0.42 kWh/km for pressurized rover
  const customO2Kg = ((customTotalDistKm / roverSpeedKmH) * 0.084).toFixed(2); // 84g O2 per astronaut-hour

  // Planetary Map Modes
  const MAP_MODES = [
    {
      id: 'OPTICAL',
      name: '1. Mars Optical Satellite',
      tag: 'Viking MDIM 2.1',
      desc: 'Standard global color mosaic hosted on CARTO / OpenPlanetaryMap'
    },
    {
      id: 'MOLA_ELEVATION',
      name: '2. MOLA Colorized Elevation',
      tag: 'Laser Altimeter',
      desc: 'Color-coded hypsometric elevation tinting from -2600m to -1750m'
    },
    {
      id: 'MOLA_GRAY',
      name: '3. MOLA Shaded Relief',
      tag: 'Hillshade',
      desc: 'High-contrast grayscale hillshade highlighting crater rims & scarps'
    },
    {
      id: 'CELESTIA',
      name: '4. Celestia 16k True-Color',
      tag: '16k Global',
      desc: 'Vivid Mars color balance across Greater Jezero & Nili Planum'
    }
  ];

  return (
    <aside className="w-[320px] h-full flex flex-col bg-white border-r border-slate-300 shadow-panel z-20 overflow-hidden select-none">
      {/* Drawer Header Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-mono font-bold">
        <button
          onClick={() => setActiveTab('EXPEDITIONS')}
          className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'EXPEDITIONS'
              ? 'border-terracotta-700 text-terracotta-800 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>EXPEDITIONS</span>
        </button>

        <button
          onClick={() => setActiveTab('LAYERS')}
          className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'LAYERS'
              ? 'border-terracotta-700 text-terracotta-800 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>LAYERS</span>
        </button>

        <button
          onClick={() => setActiveTab('CUSTOM_BUILDER')}
          className={`flex-1 py-2.5 px-2 flex items-center justify-center space-x-1.5 border-b-2 transition-colors ${
            activeTab === 'CUSTOM_BUILDER'
              ? 'border-terracotta-700 text-terracotta-800 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>ROUTER</span>
        </button>
      </div>

      {/* Main Drawer Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ======================================================== */}
        {/* TAB 1: PRESET KILOMETER-SCALE EXPEDITIONS                 */}
        {/* ======================================================== */}
        {activeTab === 'EXPEDITIONS' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                  <Compass className="w-4 h-4 text-terracotta-700" />
                  <span>Kilometer-Scale Expeditions</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Pressurized Rover</span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                Standard Web Mercator regional sorties across the ~45 km Greater Jezero Crater basin.
              </p>
            </div>

            {/* Expedition Selector Cards */}
            <div className="space-y-3">
              {PRESET_SORTIES.map((sortie) => {
                const isSelected = activeSortieId === sortie.id;
                return (
                  <div
                    key={sortie.id}
                    onClick={() => onSelectSortie(sortie.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'border-terracotta-700 bg-terracotta-50/50 shadow-subtle ring-1 ring-terracotta-700'
                        : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
                        {sortie.badge}
                      </span>
                      <span className="text-xs font-mono font-bold text-terracotta-700">
                        {sortie.traverseDistanceKm} km
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
                        <span className="text-slate-400 block">CLIMB GAIN:</span>
                        <strong className="text-slate-900">+{sortie.elevationGainM} m</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">DRIVE TIME:</span>
                        <strong className="text-slate-900">~{sortie.durationHours} hrs</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Expedition Target Waypoint Sequence */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-cobalt-700" />
                <span>Expedition Waypoint Sequence</span>
              </span>

              <div className="space-y-1.5">
                {activeSortie.targetIds.map((tId, idx) => {
                  const target = VERIFIED_TARGETS.find(t => t.id === tId);
                  if (!target) return null;
                  const isCurrent = activeTargetId === target.id;
                  return (
                    <div
                      key={target.id}
                      onClick={() => onSelectTarget(target.id)}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                        isCurrent
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate">{target.shortName}</span>
                      </div>
                      <span className="text-[10px] font-mono text-terracotta-700 shrink-0 ml-2">
                        {target.elevation}m
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Planetary Coordinate Disclosure Pill */}
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
              <div className="flex items-center space-x-1 text-[10px] font-mono font-bold text-blue-800">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>MARS 2000 PLANETOCENTRIC CRS</span>
              </div>
              <p className="text-[10px] text-blue-900 leading-tight">
                All coordinates align to NASA PDS & MOLA IAU Mars 2000 Sphere (R=3,389.5 km). Note that planetodetic latitude carries a ~5.8 km latitudinal offset.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: VERIFIED WEB MERCATOR TILE LAYERS & OPACITIES     */}
        {/* ======================================================== */}
        {activeTab === 'LAYERS' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-1">
                <Layers className="w-4 h-4 text-terracotta-700" />
                <span>Verified Tile Engines (EPSG:3857)</span>
              </span>
              <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                Real planetary XYZ tile services hosted by OpenPlanetaryMap / CARTO and AWS S3 WhereOnMars.
              </p>
            </div>

            {/* Quick Map Mode Selector Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-700">Quick Basemap Mode:</span>
              <div className="grid grid-cols-1 gap-1.5">
                {MAP_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => onSelectMapMode(mode.id)}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      activeMapMode === mode.id
                        ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold shadow-subtle'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-display">{mode.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-100 text-slate-600 border border-slate-300">
                        {mode.tag}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-sans mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Independent Tile Layer Opacity Sliders */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Sliders className="w-4 h-4 text-terracotta-700" />
                <span>Multi-Domain Tile Opacities</span>
              </span>

              {NASA_TILE_LAYERS.map(layer => {
                const currentVal = layerOpacities[layer.id] ?? layer.defaultOpacity;
                return (
                  <div key={layer.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-800 font-medium">{layer.shortName}</span>
                      <span className="text-terracotta-700 font-bold">{Math.round(currentVal * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={currentVal}
                      onChange={(e) => onOpacityChange(layer.id, parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-terracotta-700"
                    />
                    <div className="text-[9px] text-slate-400 font-mono">
                      {layer.tms ? 'TMS: true' : 'XYZ'} | native zoom ≤ {layer.maxNativeZoom}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CUSTOM WAYPOINT ROUTE BUILDER                     */}
        {/* ======================================================== */}
        {activeTab === 'CUSTOM_BUILDER' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-1">
                <Navigation className="w-4 h-4 text-terracotta-700" />
                <span>Interactive Route Builder</span>
              </span>
              <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                Click on the Mars map canvas to plot custom vehicular or astronaut foot traverses.
              </p>
            </div>

            {/* Toggle Placing Waypoints Button */}
            <div className="space-y-2">
              <button
                onClick={onTogglePlaceWaypoint}
                className={`w-full py-2.5 px-3 rounded-lg font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm ${
                  isPlacingWaypoint
                    ? 'bg-amber-500 text-slate-950 border border-amber-600 animate-pulse'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>{isPlacingWaypoint ? 'CLICK MAP TO PLACE WAYPOINTS' : 'START PLACING WAYPOINTS'}</span>
              </button>

              {customWaypoints.length > 0 && (
                <button
                  onClick={onClearCustomWaypoints}
                  className="w-full py-1.5 px-3 rounded-lg border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 font-mono text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>CLEAR ALL WAYPOINTS ({customWaypoints.length})</span>
                </button>
              )}
            </div>

            {/* Custom Telemetry Card */}
            {customWaypoints.length >= 2 ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-xs font-display font-bold text-slate-900">Custom Route Telemetry</span>
                  <span className="text-xs font-mono font-bold text-terracotta-700">
                    {customTotalDistKm.toFixed(2)} km
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-600">Rover Speed:</span>
                    <span className="text-slate-900 font-bold">{roverSpeedKmH} km/h</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="18"
                    step="0.5"
                    value={roverSpeedKmH}
                    onChange={(e) => setRoverSpeedKmH(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-terracotta-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">DRIVE TIME:</span>
                    <strong className="text-slate-900 font-bold">~{customDriveHours} hrs</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">BATTERY:</span>
                    <strong className="text-slate-900 font-bold">{customBatteryKWh} kWh</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">CREW O2 COST:</span>
                    <strong className="text-slate-900 font-bold">{customO2Kg} kg</strong>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-slate-400 block">STATUS:</span>
                    <strong className="text-emerald-700 font-bold">FEASIBLE</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500 font-sans">
                Plot at least 2 points on the map to compute spherical Mars distance, drive hours, and battery consumption.
              </div>
            )}

            {/* List of Placed Waypoints */}
            {customWaypoints.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Waypoints:</span>
                <div className="max-h-[140px] overflow-y-auto space-y-1">
                  {customWaypoints.map((wp, idx) => (
                    <div key={idx} className="p-1.5 rounded bg-white border border-slate-200 text-[10px] font-mono flex items-center justify-between">
                      <span className="font-bold text-slate-700">W{idx + 1}</span>
                      <span className="text-slate-500">{wp.lat}°N, {wp.lng}°E</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Drawer Footer Telemetry */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/80 text-[11px] font-mono text-slate-600 space-y-1">
        <div className="flex items-center justify-between">
          <span>Active Target:</span>
          <span className="font-bold text-terracotta-700">{activeTargetId || 'None'}</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>Regional Scale:</span>
          <span>45 km Basin Footprint</span>
        </div>
      </div>
    </aside>
  );
}
