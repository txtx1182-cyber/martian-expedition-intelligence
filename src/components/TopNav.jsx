import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Activity, 
  AlertTriangle, 
  Radio, 
  ShieldAlert, 
  Layers, 
  Cpu, 
  Clock, 
  Navigation,
  CheckCircle2,
  Zap,
  RotateCcw
} from 'lucide-react';

export default function TopNav({
  currentMode,
  setMode,
  selectedRouteId,
  setSelectedRouteId,
  sepAlertActive,
  triggerSepAlert,
  resetSepAlert,
  environmentalConditions
}) {
  const [marsTime, setMarsTime] = useState({ hour: 10, min: 48, sec: 22 });

  // Ticking Martian clock simulation
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
    }, 1027); // Mars second is ~1.027 Earth seconds

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (val) => String(val).padStart(2, '0');

  return (
    <header className="w-full bg-[#070B14]/95 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 select-none">
      {/* Top Telemetry Strip */}
      <div className="px-4 py-1.5 bg-slate-950/70 border-b border-slate-800/50 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 text-orange-400 font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>NASA SPACE APPS 2026 // CHALLENGE 11</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden md:flex items-center space-x-1.5 text-slate-300">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>JEZERO CRATER: 18.4400° N, 77.4000° E</span>
          </span>
          <span className="text-slate-600 hidden lg:inline">|</span>
          <span className="hidden lg:inline text-slate-400">
            ELEVATION: <span className="text-emerald-400">-2540m to -2505m</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>SOL 1245</span>
            <span className="text-amber-400 font-bold">
              {formatDigits(marsTime.hour)}:{formatDigits(marsTime.min)}:{formatDigits(marsTime.sec)} LMST
            </span>
          </div>

          <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-800">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">UPLINK OK</span>
            <span className="text-slate-500 text-[10px] hidden xl:inline">(14.2 min ONEWAY)</span>
          </div>
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Mission Badge */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600 to-red-800 flex items-center justify-center shadow-lg shadow-orange-500/20 border border-orange-400/40">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-bold font-mono tracking-wider text-white">
                MISSION 001: MARTIAN EXPEDITION INTELLIGENCE
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                PROD v2.6
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Hyperlocal 1.5 km² Exploration & Astrobiology Tactical System
            </p>
          </div>
        </div>

        {/* Center Control Group: Mode Selector & Route Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Tabs */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-lg border border-slate-800">
            <button
              onClick={() => setMode('HABITAT_CONSOLE')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all duration-200 ${
                currentMode === 'HABITAT_CONSOLE'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>HABITAT CONSOLE</span>
            </button>

            <button
              onClick={() => setMode('EVA_VISOR')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all duration-200 ${
                currentMode === 'EVA_VISOR'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>EVA VISOR HUD</span>
            </button>
          </div>

          {/* Route Selector Dropdown / Pills */}
          <div className="hidden md:flex items-center p-1 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="px-2 text-slate-500 text-[10px] uppercase font-bold tracking-wider">Traverse:</span>
            <button
              onClick={() => setSelectedRouteId('route_a')}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                selectedRouteId === 'route_a'
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Route A (1.65 km • 3h 40m)
            </button>
            <button
              onClick={() => setSelectedRouteId('route_b')}
              className={`px-2.5 py-1 rounded text-xs transition-all ${
                selectedRouteId === 'route_b'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Route B (1.20 km • Contingency)
            </button>
          </div>
        </div>

        {/* Right Action: Simulate SEP Solar Storm Alert */}
        <div className="flex items-center space-x-2">
          {!sepAlertActive ? (
            <button
              onClick={triggerSepAlert}
              className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-700/60 text-red-300 hover:text-red-100 text-xs font-mono font-semibold transition-all shadow-md shadow-red-950/30 hover:scale-[1.02]"
              title="Simulate high-flux Solar Energetic Particle event to test shelter routing protocols"
            >
              <Zap className="w-3.5 h-3.5 text-red-400 group-hover:animate-bounce" />
              <span>SIMULATE SEP ALERT</span>
            </button>
          ) : (
            <button
              onClick={resetSepAlert}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs font-mono font-bold animate-pulse hover:bg-emerald-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>CLEAR SEP STORM</span>
            </button>
          )}

          {/* Radiation Live Pill */}
          <div className={`hidden xl:flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
            sepAlertActive 
              ? 'bg-red-900/80 border-red-500 text-red-200 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}>
            <ShieldAlert className={`w-3.5 h-3.5 ${sepAlertActive ? 'text-red-400' : 'text-emerald-400'}`} />
            <span>RAD: {sepAlertActive ? '48.5 mSv/h [CRITICAL]' : '0.64 mSv/d [NOMINAL]'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
