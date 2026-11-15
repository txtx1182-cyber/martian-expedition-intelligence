import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Clock, 
  Radio, 
  ShieldAlert, 
  Zap, 
  RotateCcw, 
  Info,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { MISSION_HEADER, VERIFIED_TARGETS, MARS_CONSTANTS } from '../data/marsDossierData';

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
    <header className="w-full bg-white border-b border-slate-300 shadow-subtle z-30 select-none">
      {/* Top Telemetry Strip */}
      <div className="px-4 py-1 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-terracotta-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-terracotta-600 animate-pulse"></span>
            <span>NASA SPACE APPS 2026 // CH. 11</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="hidden md:inline text-slate-700">
            GREATER JEZERO BASIN: <strong>18.45°N, 77.40°E</strong> (PLANETOCENTRIC)
          </span>
          <span className="text-slate-300 hidden lg:inline">|</span>
          <span className="hidden lg:inline text-slate-600">
            REGIONAL SCALE: <strong className="text-emerald-700">45 km Footprint (EPSG:3857)</strong>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>SOL 1245</span>
            <span className="text-slate-900 font-bold">
              {formatDigits(marsTime.hour)}:{formatDigits(marsTime.min)}:{formatDigits(marsTime.sec)} LMST
            </span>
          </div>

          <button
            onClick={onOpenEnvHonestyModal}
            className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 pl-3 border-l border-slate-300 underline font-semibold"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
            <span>RAD/MEDA Audit</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Mission Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-terracotta-700 text-white flex items-center justify-center font-display font-bold text-lg shadow-sm">
            M1
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-display font-bold text-slate-900 tracking-tight">
                {MISSION_HEADER.title}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
                Web Mercator
              </span>
            </div>
            <p className="text-xs text-slate-500 font-sans hidden sm:block">
              {MISSION_HEADER.subtitle}
            </p>
          </div>
        </div>

        {/* Target Quick Jumper Pills (T1 - T7) */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1">
          <span className="text-[11px] font-mono text-slate-400 mr-1.5 hidden xl:inline">TARGETS:</span>
          {VERIFIED_TARGETS.map(target => {
            const isSelected = activeTargetId === target.id;
            const isPrimary = target.isPrimaryTarget;
            return (
              <button
                key={target.id}
                onClick={() => onSelectTarget(target.id)}
                title={`${target.name} (${target.elevation}m)`}
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

        {/* Right Action: Solar Particle Alarm Simulation Button */}
        <div className="flex items-center space-x-2">
          {sepAlertActive ? (
            <button
              onClick={onResetSepAlert}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-mono font-bold text-xs flex items-center space-x-1.5 shadow-sm animate-pulse"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>SILENCE ALARM</span>
            </button>
          ) : (
            <button
              onClick={onTriggerSepAlert}
              className="px-3 py-1.5 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 font-mono font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-subtle"
            >
              <Zap className="w-3.5 h-3.5 text-red-600" />
              <span>TEST SEP ALARM</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
