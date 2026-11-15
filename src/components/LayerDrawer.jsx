import React from 'react';
import { 
  Layers, 
  Eye, 
  Navigation, 
  ShieldAlert, 
  Wind, 
  Thermometer, 
  Compass, 
  MapPin, 
  Zap, 
  RotateCcw,
  Sliders,
  CheckSquare,
  Square,
  Radio,
  Clock
} from 'lucide-react';
import { MAP_LAYERS_CONFIG, RESEARCH_TARGETS, ENVIRONMENTAL_DATA, MISSION_METADATA } from '../data/marsDossierData';

export default function LayerDrawer({
  layerOpacities,
  onOpacityChange,
  showCorridor,
  onToggleCorridor,
  showEnvOverlay,
  onToggleEnvOverlay,
  sepAlertActive,
  onTriggerSepAlert,
  onResetSepAlert,
  activeTargetId,
  onSelectTarget
}) {
  return (
    <aside className="w-[320px] h-full flex flex-col bg-white border-r border-slate-300 shadow-panel z-20 overflow-y-auto select-none">
      {/* Header Banner */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center space-x-2 text-[11px] font-mono font-bold text-terracotta-700 uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-terracotta-600 animate-pulse"></span>
          <span>NASA SPACE APPS 2026 // CH. 11</span>
        </div>
        <h1 className="text-sm font-display font-bold text-slate-900 leading-tight">
          MISSION 001: MARTIAN EXPEDITION INTELLIGENCE
        </h1>
        <p className="text-[11px] text-slate-500 font-sans mt-0.5">
          Editorial-Grade Jezero Crater Astrobiology & EVA Map
        </p>

        {/* Live Mission Clock Strip */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono text-slate-600">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>SOL 1245</span>
          </div>
          <span className="font-bold text-slate-900">{MISSION_METADATA.lmst}</span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* ======================================================== */}
        {/* SECTION 1: NASA MARS TREK SATELLITE TILE LAYERS          */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-cobalt-700" />
              <span>NASA Mars Trek Satellite Layers</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-400">WMTS Live</span>
          </div>

          <div className="space-y-3">
            {MAP_LAYERS_CONFIG.map((layer) => {
              const opacity = layerOpacities[layer.id] ?? layer.defaultOpacity;
              const pct = Math.round(opacity * 100);

              return (
                <div key={layer.id} className="p-2.5 rounded-lg bg-slate-50/80 border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-sans font-bold text-slate-800">{layer.name}</span>
                    <span className="font-mono text-[11px] text-terracotta-700 font-semibold">{pct}%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-snug">
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
                  <div className="text-[9px] font-mono text-slate-400 text-right">
                    Source: {layer.attribution}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 2: RESEARCH CORRIDOR TRAVERSE                     */}
        {/* ======================================================== */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
              <Navigation className="w-4 h-4 text-terracotta-700" />
              <span>Research Corridor (5 Targets)</span>
            </h2>
            <button
              onClick={onToggleCorridor}
              className="text-[11px] font-mono font-bold text-terracotta-700 hover:text-terracotta-800 flex items-center space-x-1"
            >
              <span>{showCorridor ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
            Multi-stop astrobiological sampling traverse across Séítah floor, the western delta scarp, Bright Angel mudstones, and the carbonate margin.
          </p>

          {/* Target List Jump Links */}
          <div className="space-y-1 mt-2">
            {RESEARCH_TARGETS.map((target) => {
              const isSelected = activeTargetId === target.id;
              return (
                <button
                  key={target.id}
                  onClick={() => onSelectTarget(target.id)}
                  className={`w-full text-left p-2 rounded-md transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-slate-900 text-white font-bold shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`w-4 h-4 rounded text-[9px] font-mono font-bold flex items-center justify-center ${
                      isSelected ? 'bg-terracotta-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {target.num}
                    </span>
                    <span className="truncate max-w-[190px]">{target.shortName}</span>
                  </div>
                  <span className={`font-mono text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {target.elevation}m
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 3: RAD / MEDA ENVIRONMENTAL TELEMETRY & SEP ALERT*/}
        {/* ======================================================== */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>RAD & MEDA In-Situ Telemetry</span>
            </h2>
            <button
              onClick={onToggleEnvOverlay}
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                showEnvOverlay ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}
            >
              {showEnvOverlay ? 'Overlay ON' : 'Overlay OFF'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">GCR DOSE (RAD)</span>
              <span className="font-bold text-slate-900">{ENVIRONMENTAL_DATA.gcrDoseRate}</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">PRESSURE (MEDA)</span>
              <span className="font-bold text-slate-900">{ENVIRONMENTAL_DATA.atmosphericPressure}</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">WIND VECTOR</span>
              <span className="font-bold text-slate-900 truncate block">{ENVIRONMENTAL_DATA.windVector}</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">DUST OPACITY</span>
              <span className="font-bold text-terracotta-700">{ENVIRONMENTAL_DATA.opticalDustOpacity}</span>
            </div>
          </div>

          {/* Interactive SEP Solar Energetic Particle Simulation Button */}
          <div className="pt-1">
            {!sepAlertActive ? (
              <button
                onClick={onTriggerSepAlert}
                className="w-full py-2 px-3 rounded-lg bg-terracotta-50 hover:bg-terracotta-100 border border-terracotta-300 text-terracotta-800 text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all shadow-subtle hover:shadow"
              >
                <Zap className="w-3.5 h-3.5 text-terracotta-600" />
                <span>SIMULATE SEP PROTON STORM</span>
              </button>
            ) : (
              <button
                onClick={onResetSepAlert}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR SEP RADIATION ALARM</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
