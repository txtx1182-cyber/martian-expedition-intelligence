import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ShieldAlert, 
  Zap, 
  RotateCcw, 
  MapPin 
} from 'lucide-react';
import { MISSION_HEADER, VERIFIED_TARGETS } from '../data/marsDossierData';

export default function HeaderBar({
  sepAlertActive,
  onTriggerSepAlert,
  onResetSepAlert,
  activeTargetId,
  onSelectTarget,
  onOpenEnvHonestyModal
}) {
  const [marsTime, setMarsTime] = useState({ hour: 10, min: 48, sec: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setMarsTime(prev => {
        let s = prev.sec + 1;
        let m = prev.min;
        let h = prev.hour;
        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h = (h + 1) % 24;
        }
        return { hour: h, min: m, sec: s };
      });
    }, 1027);

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (val) => String(val).padStart(2, '0');

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

      {/* Center: Target Quick Selector (T1 - T7) */}
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

      {/* Right: Sol Clock, Telemetry Audit & Alarm Controls */}
      <div className="flex items-center space-x-3 shrink-0">
        {/* Sol Clock */}
        <div className="hidden sm:flex items-center space-x-1.5 text-xs font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-medium">SOL 1245</span>
          <span className="text-slate-900 font-bold">
            {formatDigits(marsTime.hour)}:{formatDigits(marsTime.min)}:{formatDigits(marsTime.sec)} LMST
          </span>
        </div>

        {/* RAD / MEDA Audit Button */}
        <button
          onClick={onOpenEnvHonestyModal}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
          title="Open Radiation & Atmospheric Sensor Disclaimers"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
          <span className="hidden md:inline">RAD/MEDA</span>
          <span>Audit</span>
        </button>

        {/* SEP Solar Particle Alarm Trigger */}
        {sepAlertActive ? (
          <button
            onClick={onResetSepAlert}
            className="px-2.5 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 font-mono font-bold text-xs flex items-center space-x-1.5 shadow-sm animate-pulse"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>SILENCE ALARM</span>
          </button>
        ) : (
          <button
            onClick={onTriggerSepAlert}
            className="px-2.5 py-1 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 font-mono font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-subtle"
          >
            <Zap className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">TEST</span>
            <span>SEP ALARM</span>
          </button>
        )}
      </div>
    </header>
  );
}
