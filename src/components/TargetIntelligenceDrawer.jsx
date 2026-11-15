import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ExternalLink, 
  AlertTriangle, 
  Award, 
  FlaskConical, 
  Compass, 
  FileText, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Footprints, 
  Bot, 
  User, 
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { MISSION_METADATA } from '../data/marsDossierData';

export default function TargetIntelligenceDrawer({ target, onClose }) {
  const [panelMode, setPanelMode] = useState('SCIENCE'); // 'SCIENCE' or 'EVA'

  if (!target) return null;

  const { scores, literature, epistemology } = target;

  const getScoreBadge = (val) => {
    if (val >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (val >= 60) return 'text-cobalt-700 bg-cobalt-50 border-cobalt-200';
    if (val >= 40) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getBarColor = (val) => {
    if (val >= 80) return 'bg-emerald-600';
    if (val >= 60) return 'bg-cobalt-600';
    if (val >= 40) return 'bg-amber-600';
    return 'bg-red-600';
  };

  return (
    <aside className="w-full md:w-[420px] h-full flex flex-col bg-white border-l border-slate-300 shadow-panel z-20 overflow-hidden select-none">
      {/* Drawer Top Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
              TARGET {target.num}
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {target.zone}
            </span>
            {target.isPrimaryTarget && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-terracotta-100 text-terracotta-800 border border-terracotta-300">
                PRIMARY TARGET
              </span>
            )}
          </div>
          <h2 className="text-base font-display font-bold text-slate-900 leading-snug">
            {target.name}
          </h2>
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 mt-1">
            <span>{target.lat}° N, {target.lng}° E</span>
            <span>•</span>
            <span className="text-terracotta-700 font-bold">{target.elevation} m</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          title="Close Drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mode Switcher: Habitat Science vs Astronaut EVA Wrist-Pad */}
      <div className="flex items-center px-4 bg-slate-100/70 border-b border-slate-200 text-xs font-mono">
        <button
          onClick={() => setPanelMode('SCIENCE')}
          className={`py-2 px-3 border-b-2 font-bold transition-all ${
            panelMode === 'SCIENCE'
              ? 'border-cobalt-700 text-cobalt-800 bg-white shadow-subtle'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          HABITAT SCIENCE MODE
        </button>
        <button
          onClick={() => setPanelMode('EVA')}
          className={`py-2 px-3 border-b-2 font-bold transition-all ${
            panelMode === 'EVA'
              ? 'border-terracotta-700 text-terracotta-800 bg-white shadow-subtle'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          EVA WRIST-PAD MODE
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* ======================================================== */}
        {/* CRITICAL BANNER FOR TARGET 04 (CHEYAVA FALLS)            */}
        {/* ======================================================== */}
        {epistemology.isPotentialBiosignature && (
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 shadow-subtle space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>NASA Astrobiology Standard Notice</span>
            </div>
            <div className="text-xs font-display font-bold text-amber-950">
              {epistemology.bannerNotice}
            </div>
            <p className="text-[11px] text-amber-800 font-sans leading-relaxed">
              Co-occurring organic carbon, vivianite (Fe-PO₄), and greigite (Fe-S) resemble terrestrial microbial redox fronts, but abiotic diagenetic fluid mixing mechanisms must be rigorously evaluated.
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4 SEPARATED SCORES PANEL                                 */}
        {/* ======================================================== */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-cobalt-700" />
              <span>4 Separated Evaluation Scores</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Unweighted (0-100)</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Habitability */}
            <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreBadge(scores.habitability)}`}>
              <span className="text-[11px] font-sans font-semibold">Habitability Potential</span>
              <div className="text-xl font-mono font-bold my-1">
                {scores.habitability}<span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${getBarColor(scores.habitability)}`} style={{ width: `${scores.habitability}%` }}></div>
              </div>
            </div>

            {/* Biosignature Evidence */}
            <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreBadge(scores.biosignature)}`}>
              <span className="text-[11px] font-sans font-semibold">Biosignature Evidence</span>
              <div className="text-xl font-mono font-bold my-1">
                {scores.biosignature}<span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${getBarColor(scores.biosignature)}`} style={{ width: `${scores.biosignature}%` }}></div>
              </div>
            </div>

            {/* Scientific Value */}
            <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreBadge(scores.scientificValue)}`}>
              <span className="text-[11px] font-sans font-semibold">Scientific Value</span>
              <div className="text-xl font-mono font-bold my-1">
                {scores.scientificValue}<span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${getBarColor(scores.scientificValue)}`} style={{ width: `${scores.scientificValue}%` }}></div>
              </div>
            </div>

            {/* Suit Accessibility */}
            <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreBadge(scores.suitAccessibility)}`}>
              <span className="text-[11px] font-sans font-semibold">Suit Accessibility</span>
              <div className="text-xl font-mono font-bold my-1">
                {scores.suitAccessibility}<span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${getBarColor(scores.suitAccessibility)}`} style={{ width: `${scores.suitAccessibility}%` }}></div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[11px] font-mono text-slate-600 flex items-start space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <span><strong>Slope:</strong> {target.slopeAngle}° ({target.slopeRisk}) — {target.slopeNote}</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODE 1: HABITAT SCIENCE MODE (EPISTEMOLOGICAL TRACEABILITY)*/}
        {/* ======================================================== */}
        {panelMode === 'SCIENCE' && (
          <div className="space-y-4">
            {/* Master Research Dossier Evidence Summary */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-subtle">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Geological Stratigraphy & Lithology
              </span>
              <h4 className="text-xs font-bold text-slate-900 font-sans">
                {target.geologicalUnit}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {target.evidenceSummary}
              </p>
            </div>

            {/* Epistemological Badges & Traceability Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <FlaskConical className="w-4 h-4 text-cobalt-700" />
                <span>Epistemological Traceability Breakdown</span>
              </span>

              {/* 1. DIRECT OBSERVATION */}
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-700 text-white uppercase tracking-wider">
                  1. DIRECT OBSERVATION
                </span>
                <ul className="text-xs text-slate-800 space-y-1 font-sans">
                  {epistemology.directObservations.map((obs, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-blue-700 font-bold">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. PUBLISHED INTERPRETATION */}
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-700 text-white uppercase tracking-wider">
                  2. PUBLISHED INTERPRETATION
                </span>
                <p className="text-xs text-slate-800 font-sans leading-relaxed">
                  {epistemology.publishedInterpretation}
                </p>
                <div className="pt-1">
                  <a
                    href={literature.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-emerald-800 hover:text-emerald-950 underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{literature.citation} (DOI: {literature.doi})</span>
                  </a>
                </div>
              </div>

              {/* 3. RESEARCH HYPOTHESIS */}
              <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-200 space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-700 text-white uppercase tracking-wider">
                  3. RESEARCH HYPOTHESIS
                </span>
                <p className="text-xs text-slate-800 font-sans leading-relaxed">
                  {epistemology.researchHypothesis}
                </p>
              </div>

              {/* 4. COMPETING ABIOTIC EXPLANATION */}
              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 space-y-1.5">
                <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-700 text-white uppercase tracking-wider">
                  4. COMPETING ABIOTIC EXPLANATION
                </span>
                <p className="text-xs text-slate-800 font-sans leading-relaxed">
                  {epistemology.competingAbioticExplanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: ASTRONAUT MARSWALK (EVA) OPERATIONAL PANEL       */}
        {/* ======================================================== */}
        {panelMode === 'EVA' && (
          <div className="space-y-4">
            {/* Life Support & Consumables Burn Projections */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-subtle">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Footprints className="w-4 h-4 text-terracotta-700" />
                <span>Spacesuit EVA Consumables Budget</span>
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">HAB DISTANCE</span>
                  <span className="text-sm font-bold text-slate-900">{target.distanceFromHabKm} km</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">WALK-BACK TIME</span>
                  <span className="text-sm font-bold text-terracotta-700">{target.estWalkbackMin} min</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">EST. O2 BURN</span>
                  <span className="text-sm font-bold text-cobalt-700">{target.o2CostPct}% Reserve</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">BATTERY DRAIN</span>
                  <span className="text-sm font-bold text-emerald-700">{target.batteryCostPct}% Reserve</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 flex items-center justify-between">
                <span>GCR Terrain Shielding:</span>
                <span className="font-bold text-emerald-700">{target.terrainShieldingPct}% Attenuation</span>
              </div>
            </div>

            {/* Surface Context & Mastcam-Z Visual Identification */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
                <Camera className="w-4 h-4 text-slate-700" />
                <span>Mastcam-Z & Navcam Ground Recognition</span>
              </span>
              <p className="text-xs text-slate-700 font-sans leading-relaxed">
                {target.mastcamContext}
              </p>
            </div>

            {/* Field Protocol Actions for Astronaut Pair & MULE Rover */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-subtle">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800">
                Astronaut Field Procedures (Target {target.num})
              </span>
              <div className="space-y-2 text-xs font-sans">
                <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start space-x-2">
                  <User className="w-3.5 h-3.5 text-cobalt-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 font-mono text-[11px] block">EVA-1 (Dr. Chen):</strong>
                    <span>Extract 10 mm core sample into hermetic titanium tube; record Raman fluorescence scan.</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start space-x-2">
                  <User className="w-3.5 h-3.5 text-terracotta-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 font-mono text-[11px] block">EVA-2 (Leo Vance):</strong>
                    <span>Deploy 10 cm reference scale bar; maintain safety tether on slope; monitor suit pressure.</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start space-x-2">
                  <Bot className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-slate-900 font-mono text-[11px] block">MULE-01 Carrier:</strong>
                    <span>Stow sealed core tube in primary science vault ({MISSION_METADATA.supportRover.tubesRemaining} slots open); illuminate target with LED array.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function Camera(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}
