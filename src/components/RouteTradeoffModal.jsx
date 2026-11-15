import React from 'react';
import { X, Check, AlertTriangle, ArrowRight, ShieldCheck, Zap, Activity, Award } from 'lucide-react';
import { EVA_ROUTES, WAYPOINTS } from '../data/marsMissionData';

export default function RouteTradeoffModal({ isOpen, onClose, selectedRouteId, onSelectRoute }) {
  if (!isOpen) return null;

  const routeA = EVA_ROUTES.route_a;
  const routeB = EVA_ROUTES.route_b;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-4xl bg-[#090D1A] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-mono font-bold text-white tracking-wider">
                TRAVERSE TRADE-OFF & RISK-RETURN MATRIX
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Comparative analysis between Primary Astrobiology Traverse vs Contingency Safety Path
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Route A Card */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              selectedRouteId === 'route_a'
                ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700">
                    ROUTE A (PRIMARY SCIENCE)
                  </span>
                  {selectedRouteId === 'route_a' && (
                    <span className="text-xs font-mono text-cyan-400 font-bold flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>SELECTED</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Visits all 5 verified astrobiology sites including Cheyava Falls veined mudstone and Carbonate Margin. Skirts western scarps.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Total Distance:</span>
                    <span className="text-white font-bold">{routeA.distanceKm} km (1,650 m)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Estimated Duration:</span>
                    <span className="text-white font-bold">{routeA.estimatedDuration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Peak Slope Encountered:</span>
                    <span className="text-amber-400 font-bold">{routeA.maxSlopeDeg}° (Caution at WP-04)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Consumables Burn:</span>
                    <span className="text-cyan-400 font-bold">O2: 48% | Power: 42%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Science Return Index:</span>
                    <span className="text-emerald-400 font-bold">96 / 100 [MAXIMUM]</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Emergency Walk-back:</span>
                    <span className="text-slate-200 font-bold">45 min to Hab</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectRoute('route_a');
                  onClose();
                }}
                className={`mt-4 w-full py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedRouteId === 'route_a'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {selectedRouteId === 'route_a' ? 'Active Route' : 'Switch to Route A'}
              </button>
            </div>

            {/* Route B Card */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              selectedRouteId === 'route_b'
                ? 'bg-slate-900 border-emerald-400 ring-2 ring-emerald-500/30'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                    ROUTE B (SAFE CONTINGENCY)
                  </span>
                  {selectedRouteId === 'route_b' && (
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>SELECTED</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Stays strictly on smooth channel-floor alluvium and lower Bright Angel mudstone. Complete bypass of high-slope scarps.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Total Distance:</span>
                    <span className="text-white font-bold">{routeB.distanceKm} km (1,200 m)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Estimated Duration:</span>
                    <span className="text-white font-bold">{routeB.estimatedDuration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Peak Slope Encountered:</span>
                    <span className="text-emerald-400 font-bold">{routeB.maxSlopeDeg}° (Safe Traverse)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Consumables Burn:</span>
                    <span className="text-cyan-400 font-bold">O2: 31% | Power: 28%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Science Return Index:</span>
                    <span className="text-amber-400 font-bold">68 / 100 [INTERMEDIATE]</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Emergency Walk-back:</span>
                    <span className="text-emerald-400 font-bold">28 min to Hab [RAPID]</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectRoute('route_b');
                  onClose();
                }}
                className={`mt-4 w-full py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedRouteId === 'route_b'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {selectedRouteId === 'route_b' ? 'Active Route' : 'Switch to Route B'}
              </button>
            </div>
          </div>

          {/* Operational Recommendation Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1.5">
            <div className="text-cyan-400 font-bold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>FLIGHT CONTROLLER OPERATIONAL DIRECTIVE</span>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed">
              Begin traverse on <strong>Route A</strong> to prioritize Cheyava Falls primary science objectives. In the event of a spacesuit pressure alarm, battery drain rate &gt;1.5x nominal, or SEP storm notification, execute an immediate tactical abort onto <strong>Route B</strong> for rapid return via the flat alluvial corridor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
