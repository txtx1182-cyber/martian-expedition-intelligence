import React from 'react';
import { MapPin } from 'lucide-react';
import { MISSION_HEADER, VERIFIED_TARGETS } from '../data/marsDossierData';

export default function HeaderBar({
  activeTargetId,
  onSelectTarget
}) {
  return (
    <header className="h-14 w-full bg-white border-b border-slate-300 shadow-subtle z-30 select-none flex items-center justify-between px-4 shrink-0">
      {/* Left: Brand Identity & Coordinates */}
      <div className="flex items-center space-x-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-terracotta-700 text-white flex items-center justify-center font-display font-bold text-sm shadow-sm shrink-0">
          M1
        </div>
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-display font-bold text-slate-900 tracking-tight whitespace-nowrap">
            {MISSION_HEADER.title}
          </h1>
          <span className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <MapPin className="w-2.5 h-2.5 text-terracotta-600" />
            <span>18.45°N, 77.40°E</span>
          </span>
        </div>
      </div>

      {/* Center: Target Quick Selector (T1 - T9) */}
      <div className="hidden lg:flex items-center space-x-1">
        <span className="text-[10px] font-mono text-slate-400 mr-1.5 uppercase font-semibold">TARGETS:</span>
        {VERIFIED_TARGETS.map(target => {
          const isSelected = activeTargetId === target.id;
          const isPrimary = target.isPrimaryTarget;
          return (
            <button
              key={target.id}
              onClick={() => onSelectTarget(target.id)}
              title={`${target.name} (${target.elevation} m)`}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all duration-150 flex items-center space-x-1 shrink-0 ${
                isSelected
                  ? (isPrimary 
                      ? 'bg-amber-500 text-slate-950 border border-amber-600 shadow-sm' 
                      : 'bg-slate-900 text-white border border-slate-900 shadow-sm')
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
              }`}
            >
              <span>{target.num}</span>
              {isPrimary && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-950 animate-ping"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Clean aligned spacer */}
      <div className="shrink-0" />
    </header>
  );
}
