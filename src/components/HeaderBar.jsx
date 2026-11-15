import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Clock, 
  Radio, 
  ShieldAlert, 
  Zap, 
  RotateCcw, 
  MapPin, 
  Layers, 
  Navigation,
  Activity,
  Sliders
} from 'lucide-react';
import { MISSION_METADATA, RESEARCH_TARGETS, ENVIRONMENTAL_DATA } from '../data/marsDossierData';

export default function HeaderBar({
  sepAlertActive,
  onTriggerSepAlert,
  onResetSepAlert,
  activeTargetId,
  onSelectTarget
}) {
  const [marsTime, setMarsTime] = useState({ hour: 10, min: 48, sec: 22 });

  // Ticking Martian clock simulation (Mars sol is ~24h 39m 35s)
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
      {/* Top Thin Telemetry Strip */}
      <div className="px-4 py-1 bg-slate-100/90 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-terracotta-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-terracotta-600"></span>
            <span>NASA SPACE APPS 2026 // CH. 11: MARTIAN MAP</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="hidden md:inline text-slate-700">
            JEZERO CRATER: <strong>18.444° N, 77.401° E</strong>
          </span>
          <span className="text-slate-300 hidden lg:inline">|</span>
          <span className="hidden lg:inline text-slate-600">
            ELEVATION DATUM: <strong className="text-emerald-700">-2565m to -2485m</strong>
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

          <div className="flex items-center space-x-1.5 pl-3 border-l border-slate-300 text-emerald-700 font-semibold">
            <Radio className="w-3.5 h-3.5" />
            <span className="text-[11px]">DSN UPLINK (14.2m)</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Organization Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-terracotta-700 text-white flex items-center justify-center font-display font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-display font-bold text-slate-900 tracking-tight">
                MISSION 001: MARTIAN EXPEDITION INTELLIGENCE
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
                PROD v3.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-sans">
              Swiss Cartographic & Astrobiological Traverse Workspace
            </p>
          </div>
        </div>

        {/* Target Quick Jump Pills */}
        <div className="hidden lg:flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-mono">
          <span className="px-2 text-slate-400 text-[10px] font-bold uppercase">Targets:</span>
          {RESEARCH_TARGETS.map(t => (
            <button
              key={t.id}
              onClick={() => onSelectTarget(t.id)}
              className={`px-2 py-1 rounded text-xs transition-all ${
                activeTargetId === t.id
                  ? 'bg-white text-slate-900 font-bold shadow-subtle border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.num} {t.shortName}
            </button>
          ))}
        </div>

        {/* Right Action: Simulate SEP Radiation Event */}
        <div className="flex items-center space-x-2.5">
          {!sepAlertActive ? (
            <button
              onClick={onTriggerSepAlert}
              className="px-3 py-1.5 rounded-lg bg-terracotta-50 hover:bg-terracotta-100 border border-terracotta-300 text-terracotta-800 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-subtle transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-terracotta-600" />
              <span>SIMULATE SEP ALERT</span>
            </button>
          ) : (
            <button
              onClick={onResetSepAlert}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>CLEAR SEP STORM</span>
            </button>
          )}

          {/* Radiation Status Pill */}
          <div className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center space-x-1.5 ${
            sepAlertActive
              ? 'bg-red-50 border-red-300 text-red-800 animate-pulse'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <ShieldAlert className={`w-3.5 h-3.5 ${sepAlertActive ? 'text-red-600' : 'text-emerald-600'}`} />
            <span>RAD: {sepAlertActive ? '48.5 mSv/h [CRITICAL]' : '0.64 mSv/d [NOMINAL]'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
