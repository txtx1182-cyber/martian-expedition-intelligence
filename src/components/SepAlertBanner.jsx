import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, X, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SepAlertBanner({ isActive, onDismiss, onNavigateToShelter }) {
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
    <div className="absolute top-16 left-0 right-0 z-40 px-4 py-2 flex justify-center pointer-events-none select-none">
      <div className="pointer-events-auto w-full max-w-4xl bg-red-600 text-white rounded-xl shadow-2xl p-3.5 border border-red-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white text-red-600 flex items-center justify-center shrink-0 font-bold shadow-sm">
              <ShieldAlert className="w-6 h-6 text-red-600 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-800 text-white">
                  SPACE WEATHER EMERGENCY
                </span>
                <span className="text-xs font-mono text-red-100">
                  MAVEN / RAD DETECTED SOLAR ENERGETIC PARTICLE (SEP) EVENT
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-white mt-0.5">
                SOLAR ENERGETIC PARTICLE (SEP) PROTON STORM ALERT
              </h3>
              <div className="flex items-center space-x-3 text-xs font-mono text-red-100 mt-0.5">
                <span>DOSE RATE: <strong className="text-white">48.5 mSv/hr</strong></span>
                <span>•</span>
                <span>PEAK PROTON FLUX ARRIVAL IN: <strong className="text-yellow-300 font-bold">{formattedTime}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onNavigateToShelter('target-02')}
              className="px-3.5 py-2 rounded-lg bg-white text-red-700 hover:bg-red-50 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-red-600" />
              <span>NAV TO TARGET 02 SHELTER (68%)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onDismiss}
              className="p-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
