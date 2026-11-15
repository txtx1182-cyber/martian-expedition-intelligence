import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, X, Radio, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function SepAlertModal({
  isActive,
  onDismiss,
  onNavigateToShelter
}) {
  const [secondsRemaining, setSecondsRemaining] = useState(720); // 12 minutes to peak flux

  useEffect(() => {
    if (!isActive) {
      setSecondsRemaining(720);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  if (!isActive) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 px-4 py-2 flex justify-center pointer-events-none select-none">
      <div className="pointer-events-auto w-full max-w-4xl bg-red-950/95 border-2 border-red-500 rounded-2xl shadow-2xl shadow-red-950/80 p-4 text-white backdrop-blur-xl animate-bounce-short">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Warning Icon & Telemetry Alert */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-800 border-2 border-red-400 flex items-center justify-center shrink-0 animate-pulse">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-900 border border-red-400 text-red-200">
                  CRITICAL SPACE WEATHER
                </span>
                <span className="text-xs font-mono text-red-300">
                  MAVEN ORBITER UPLINK // SEP EVENT DETECTED
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-mono font-bold text-white mt-0.5">
                SOLAR ENERGETIC PARTICLE (SEP) PROTON STORM
              </h2>
              <div className="flex items-center space-x-3 text-xs font-mono text-red-200 mt-1">
                <span>DOSE RATE: <strong className="text-white">48.5 mSv/hr</strong></span>
                <span>•</span>
                <span>PEAK FLUX ARRIVAL IN: <strong className="text-yellow-300 font-bold">{formattedTime}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Navigate to Shelter & Dismiss */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onNavigateToShelter}
              className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-yellow-500/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>NAV TO WP-02 SHELTER</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onDismiss}
              className="p-2 rounded-xl bg-red-900/80 hover:bg-red-800 border border-red-600 text-red-200 hover:text-white transition-all"
              title="Acknowledge Alert"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Shelter Navigation Directive Strip */}
        <div className="mt-3 pt-2.5 border-t border-red-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-red-200 gap-2">
          <span>
            ★ NEAREST TERRAIN OVERHANG: <strong>WP-02 (Neretva Vallis Boulder Scarp)</strong> — 380m Away (Est 6 min march)
          </span>
          <span className="text-emerald-300 font-bold">
            TERRAIN SHIELDING: 68% GCR/SEP ATTENUATION
          </span>
        </div>
      </div>
    </div>
  );
}
