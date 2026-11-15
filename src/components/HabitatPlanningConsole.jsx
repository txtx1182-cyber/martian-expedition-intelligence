import React, { useState } from 'react';
import { 
  Layers, 
  Map, 
  Compass, 
  Activity, 
  Footprints, 
  ShieldAlert, 
  Radio, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  Clock, 
  Database,
  ArrowRight
} from 'lucide-react';
import { DATA_LAYERS_CONFIG, EVA_ROUTES, WAYPOINTS, SCIENTIFIC_CITATIONS } from '../data/marsMissionData';

export default function HabitatPlanningConsole({
  activeLayers,
  toggleLayer,
  selectedRouteId,
  setSelectedRouteId,
  onSelectWaypoint,
  onOpenTradeoffModal
}) {
  const [activeConsoleTab, setActiveConsoleTab] = useState('LAYERS'); // 'LAYERS', 'ROUTES', 'SCIENCE'

  const currentRoute = EVA_ROUTES[selectedRouteId];

  return (
    <div className="w-full h-full flex flex-col bg-[#070B14] overflow-y-auto p-4 space-y-4 select-none">
      {/* Console Sub-Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-mono font-bold text-white tracking-wider">
              HABITAT SCIENCE & TRAVERSE PLANNING CONSOLE
            </h2>
            <p className="text-[11px] text-slate-400">
              NASA Science Operations Center // Multi-Layer Cartographic Synthesis
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveConsoleTab('LAYERS')}
            className={`px-3 py-1 rounded transition-all ${
              activeConsoleTab === 'LAYERS'
                ? 'bg-cyan-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5 DATA LAYERS
          </button>
          <button
            onClick={() => setActiveConsoleTab('ROUTES')}
            className={`px-3 py-1 rounded transition-all ${
              activeConsoleTab === 'ROUTES'
                ? 'bg-cyan-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ROUTE MATRIX
          </button>
          <button
            onClick={() => setActiveConsoleTab('SCIENCE')}
            className={`px-3 py-1 rounded transition-all ${
              activeConsoleTab === 'SCIENCE'
                ? 'bg-cyan-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            PROVENANCE & DOIs
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: 5 TOGGLEABLE NASA DATA LAYERS                     */}
      {/* ======================================================== */}
      {activeConsoleTab === 'LAYERS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>NASA INSTRUMENT OVERLAYS</span>
            <span>Click switches to enable/disable on tactical map</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DATA_LAYERS_CONFIG.map((layer) => {
              const isActive = Boolean(activeLayers[layer.id]);

              return (
                <div
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-500/50 shadow-md shadow-cyan-950/30'
                      : 'bg-slate-950/60 border-slate-800/80 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {layer.category}
                      </span>
                      {/* Custom Toggle Switch */}
                      <div className={`w-8 h-4 rounded-full transition-colors relative ${isActive ? 'bg-cyan-500' : 'bg-slate-700'}`}>
                        <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.25 ${isActive ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                      </div>
                    </div>

                    <h3 className="text-xs font-mono font-bold text-white mb-1">
                      {layer.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-2">
                      {layer.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>SOURCE: {layer.source}</span>
                    <span className="text-cyan-400 font-semibold">{layer.resolution}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Layer Legend & Mission Rules */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
            <div className="font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Spacesuit Mobility & Traverse Thresholds</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-950 border border-emerald-500/30 text-emerald-300">
                <strong>SAFE (&lt;10°):</strong> Unrestricted astronaut foot traverse. Bipedal locomotion energy optimal.
              </div>
              <div className="p-2 rounded bg-slate-950 border border-amber-500/30 text-amber-300">
                <strong>CAUTION (10°–15°):</strong> Heavy center-of-mass strain. Deploy MARS-CARRIER-01 mule as stabilizer.
              </div>
              <div className="p-2 rounded bg-slate-950 border border-red-500/30 text-red-300">
                <strong>NO-GO (&gt;15°):</strong> Impassable scarp cliff face. High tumble risk; strict 15 m standoff enforced.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: ROUTE TRADE-OFF COMPARISON MATRIX                 */}
      {/* ======================================================== */}
      {activeConsoleTab === 'ROUTES' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              TRAVERSE SAFETY & SCIENCE RETURN COMPARISON
            </div>
            <button
              onClick={onOpenTradeoffModal}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline flex items-center space-x-1"
            >
              <span>View Fullscreen Trade-off Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(EVA_ROUTES).map((route) => {
              const isSelected = selectedRouteId === route.id;

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900/95 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        route.id === 'route_a'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      }`}>
                        {route.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {isSelected ? '★ ACTIVE ROUTE' : 'CLICK TO SELECT'}
                      </span>
                    </div>

                    <h3 className="text-sm font-mono font-bold text-white">
                      {route.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {route.description}
                    </p>

                    {/* Route Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-mono">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">TOTAL DIST</div>
                        <div className="text-white font-bold text-sm">{route.distanceKm} km</div>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">EST DURATION</div>
                        <div className="text-white font-bold text-sm">{route.estimatedDuration}</div>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">MAX SLOPE</div>
                        <div className={`font-bold text-sm ${route.maxSlopeDeg > 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {route.maxSlopeDeg}°
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">O2 BUDGET</div>
                        <div className="text-cyan-400 font-bold text-sm">{route.consumablesCostO2}</div>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">POWER BURN</div>
                        <div className="text-emerald-400 font-bold text-sm">{route.consumablesCostPower}</div>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <div className="text-[10px] text-slate-500">SCIENCE RETURN</div>
                        <div className="text-purple-400 font-bold text-sm">{route.scienceReturnIndex} / 100</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Emergency Walk-back:</span>
                    <span className="text-emerald-400 font-bold">{route.emergencyWalkbackMinutes} min to Hab</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: SCIENTIFIC PROVENANCE & PEER-REVIEWED DOIs        */}
      {/* ======================================================== */}
      {activeConsoleTab === 'SCIENCE' && (
        <div className="space-y-4">
          <div className="text-xs font-mono text-slate-400">
            PEER-REVIEWED SCIENTIFIC LITERATURE GROUNDING & INSTRUMENT PROVENANCE
          </div>

          <div className="space-y-3">
            {SCIENTIFIC_CITATIONS.map((cite) => (
              <div key={cite.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-sans">
                    {cite.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 border border-cyan-800 text-cyan-300 shrink-0">
                    {cite.year}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  {cite.author} — <em>{cite.journal}</em>
                </div>

                <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 font-sans">
                  <span className="text-amber-400 font-mono font-bold mr-1">Key Scientific Finding:</span>
                  {cite.keyFinding}
                </div>

                <div className="text-xs font-mono text-cyan-400 flex items-center space-x-1 pt-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Permanent DOI Identifier: {cite.doi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
