import React from 'react';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  Wind, 
  Thermometer, 
  Droplet, 
  CheckCircle2, 
  Zap, 
  RotateCcw,
  Info
} from 'lucide-react';
import { MARS_CONSTANTS } from '../data/marsDossierData';

export default function EnvHonestyModal({
  isOpen,
  onClose,
  sepAlertActive,
  onTriggerSepAlert,
  onResetSepAlert
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-2xl bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-slate-900">
                ENVIRONMENTAL & RADIATION HONESTY AUDIT
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Scientific Guardrails & Explicit Uncertainty Disclaimers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* 1. RADIATION HONESTY CARD */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-900 uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Radiation Instrumentation Disclosure</span>
            </div>
            <p className="text-xs text-amber-950 font-sans leading-relaxed">
              <strong>MANDATORY SCIENTIFIC GUARDRAIL:</strong> There is <strong>NO surface RAD sensor operating at Jezero Crater</strong> on Perseverance. The values displayed (GCR baseline ~0.64 mSv/day) are <strong>Gale Crater MSL Curiosity RAD analogues and orbital MAVEN model estimates</strong>. Do not cite these as in-situ Jezero ground-truth telemetry.
            </p>

            <div className="pt-2 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div>GCR Baseline: <strong className="text-slate-900">0.64 mSv/day</strong></div>
              <div>Simulated SEP Event: <strong className="text-red-700">48.5 mSv/hr</strong></div>
              <div>
                {!sepAlertActive ? (
                  <button
                    onClick={onTriggerSepAlert}
                    className="px-2.5 py-1 rounded bg-terracotta-700 text-white font-bold hover:bg-terracotta-800 transition-colors"
                  >
                    Simulate SEP Storm
                  </button>
                ) : (
                  <button
                    onClick={onResetSepAlert}
                    className="px-2.5 py-1 rounded bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-colors"
                  >
                    Clear SEP Storm
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 2. ATMOSPHERE (MEDA) HONESTY CARD */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-blue-900 uppercase">
              <Wind className="w-4 h-4 text-blue-700 shrink-0" />
              <span>MEDA Atmospheric Telemetry (Point In-Situ)</span>
            </div>
            <p className="text-xs text-blue-950 font-sans leading-relaxed">
              Atmospheric pressure (725 ± 12 Pa), temperature (-48.2 ± 3°C), wind velocity (12.4 ± 2.1 m/s NW), and optical dust opacity (τ = 0.44 ± 0.05) represent <strong>localized point measurements at the rover's position</strong>. They are <strong>NEVER to be interpreted as a Jezero regional synoptic forecast</strong>.
            </p>
          </div>

          {/* 3. WATER ICE RESOURCE HONESTY CARD */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-700 uppercase">
              <Droplet className="w-4 h-4 text-cobalt-600 shrink-0" />
              <span>Subsurface Water Ice Resource Audit</span>
            </div>
            <div className="p-2.5 rounded bg-white border border-slate-200 text-xs font-mono text-slate-800">
              <strong className="text-red-700 block mb-1">HYPOTHESIS ONLY — ZERO VERIFIED SHALLOW ICE AT JEZERO:</strong>
              Radar (RIMFAX) and thermal inertia (THEMIS) surveys confirm the upper 3 meters of Jezero crater floor and delta deposits are hyper-arid desiccated regolith. Potential deep hydrated minerals exist as bound clay/sulfate crystal lattices, NOT extractable ground ice.
            </div>
          </div>

          {/* 4. PLANETARY CARTOGRAPHY CRS AUDIT */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-2 text-xs font-mono text-slate-700">
            <div className="font-bold text-slate-900 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-slate-600" />
              <span>Planetocentric vs. Planetodetic CRS Offset</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              All coordinates in this platform are strictly projected in <strong>Mars 2000 Planetocentric</strong> coordinates. Converting to planetodetic coordinates (e.g. 18.4446°N vs 18.3462°N) produces an approximate <strong>5.8 km spatial shift</strong>. USGS SIM 3464 geologic mapping carries an inherent 100–200 m co-registration offset.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Acknowledge Disclaimers
          </button>
        </div>
      </div>
    </div>
  );
}
