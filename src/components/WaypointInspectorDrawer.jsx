import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Award, 
  FlaskConical, 
  Radio, 
  Compass,
  FileText,
  Sparkles,
  ChevronRight,
  User,
  Bot
} from 'lucide-react';
import PovLandmarkViewer from './PovLandmarkViewer';

export default function WaypointInspectorDrawer({
  waypoint,
  onClose,
  tasksState,
  onToggleTask
}) {
  const [activeTab, setActiveTab] = useState('OVERVIEW'); // 'OVERVIEW', 'POV', 'RIGOR', 'TASKS', 'EVIDENCE'

  if (!waypoint) return null;

  const { scores, citations, tasks, scientificRigor } = waypoint;

  // Color helper for 0-100 score gauges
  const getScoreColor = (val) => {
    if (val >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (val >= 60) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    if (val >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const getBarColor = (val) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-cyan-500';
    if (val >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <aside className="w-full lg:w-[480px] xl:w-[540px] h-full flex flex-col bg-[#0A0F1D]/95 border-l border-slate-800/90 shadow-2xl backdrop-blur-xl z-30 overflow-hidden select-none">
      {/* Drawer Top Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-400 shrink-0 mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-900/50 text-cyan-300 border border-cyan-700/50">
                {waypoint.id}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {waypoint.code}
              </span>
              {waypoint.isPrimaryTarget && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-900/80 text-purple-300 border border-purple-600 animate-pulse">
                  PRIMARY TARGET
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold font-mono text-white mt-1">
              {waypoint.name}
            </h2>
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 mt-1">
              <span>LAT: {waypoint.lat}° N</span>
              <span>LON: {waypoint.lon}° E</span>
              <span className="text-emerald-400 font-semibold">{waypoint.elevation} m</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          title="Close Inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center px-4 bg-slate-950/80 border-b border-slate-800 overflow-x-auto text-xs font-mono">
        {[
          { id: 'OVERVIEW', label: 'OVERVIEW' },
          { id: 'POV', label: 'POV LANDMARK' },
          ...(scientificRigor ? [{ id: 'RIGOR', label: 'SCIENTIFIC RIGOR' }] : []),
          { id: 'TASKS', label: `TASKS (${tasks.length})` },
          { id: 'EVIDENCE', label: 'PROVENANCE' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-3 border-b-2 font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Drawer Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW & 4 INDEPENDENT SCORE GAUGES             */}
        {/* ======================================================== */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-5">
            {/* 4 INDEPENDENT GAUGES PANEL */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>4 Independent Planetary Metrics</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Unweighted Evaluation</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 1. Habitability Potential */}
                <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreColor(scores.habitability)}`}>
                  <div className="text-[11px] font-mono font-semibold">Habitability Potential</div>
                  <div className="text-2xl font-bold font-mono my-1">{scores.habitability}<span className="text-xs text-slate-400">/100</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${getBarColor(scores.habitability)}`} style={{ width: `${scores.habitability}%` }}></div>
                  </div>
                </div>

                {/* 2. Biosignature Evidence */}
                <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreColor(scores.biosignature)}`}>
                  <div className="text-[11px] font-mono font-semibold">Biosignature Evidence</div>
                  <div className="text-2xl font-bold font-mono my-1">{scores.biosignature}<span className="text-xs text-slate-400">/100</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${getBarColor(scores.biosignature)}`} style={{ width: `${scores.biosignature}%` }}></div>
                  </div>
                </div>

                {/* 3. Scientific Value */}
                <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreColor(scores.scientificValue)}`}>
                  <div className="text-[11px] font-mono font-semibold">Scientific Value</div>
                  <div className="text-2xl font-bold font-mono my-1">{scores.scientificValue}<span className="text-xs text-slate-400">/100</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${getBarColor(scores.scientificValue)}`} style={{ width: `${scores.scientificValue}%` }}></div>
                  </div>
                </div>

                {/* 4. Suit Accessibility */}
                <div className={`p-2.5 rounded-lg border flex flex-col justify-between ${getScoreColor(scores.suitAccessibility)}`}>
                  <div className="text-[11px] font-mono font-semibold">Suit Accessibility</div>
                  <div className="text-2xl font-bold font-mono my-1">{scores.suitAccessibility}<span className="text-xs text-slate-400">/100</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${getBarColor(scores.suitAccessibility)}`} style={{ width: `${scores.suitAccessibility}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Slope Angle & Mobility Note */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Terrain Slope Angle:</span>
                <span className={`font-bold ${
                  waypoint.hazardLevel === 'DANGER' ? 'text-red-400' :
                  waypoint.hazardLevel === 'CAUTION' ? 'text-amber-400' :
                  'text-emerald-400'
                }`}>
                  {waypoint.slopeAngle}° ({waypoint.hazardLevel})
                </span>
              </div>
            </div>

            {/* Geological Unit & Description */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Stratigraphy & Lithology
              </div>
              <h4 className="text-sm font-semibold text-cyan-300">
                {waypoint.geologicalUnit}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {waypoint.description}
              </p>
              <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-sans">
                <span className="text-amber-400 font-mono font-bold mr-1">Astrobiology Context:</span>
                {waypoint.scientificContext}
              </div>
            </div>

            {/* Embedded POV Landmark Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  Astronaut Eye-Level Ground POV
                </span>
                <button
                  onClick={() => setActiveTab('POV')}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <span>Expand Detailed View</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <PovLandmarkViewer waypoint={waypoint} />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: POV LANDMARK VIEWER                               */}
        {/* ======================================================== */}
        {activeTab === 'POV' && (
          <div className="space-y-4">
            <PovLandmarkViewer waypoint={waypoint} />

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Field Identification Guidelines</span>
              </h4>
              <ul className="text-xs space-y-2 text-slate-300 font-sans">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                  <span><strong>Visual Recognition:</strong> Compare outcrop bedding strike and color variations with Mastcam-Z true-color calibration.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                  <span><strong>Scale Verification:</strong> Deploy 10 cm magnetic scale bar against freshly brushed surface prior to sampling.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                  <span><strong>Dust Clearance:</strong> Use gas-puff dust removal tool before Raman spectroscopy to minimize fluorescence noise.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SCIENTIFIC RIGOR PANEL (CHEYAVA FALLS / WP-04)    */}
        {/* ======================================================== */}
        {activeTab === 'RIGOR' && scientificRigor && (
          <div className="space-y-4">
            {/* High-Rigor Classification Banner */}
            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/60 text-purple-200">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>NASA Scientific Rigor Protocol</span>
              </div>
              <div className="text-sm font-bold font-mono text-white mt-1">
                {scientificRigor.classification}
              </div>
              <p className="text-[11px] text-purple-300 mt-1">
                In strict adherence to NASA Astrobiology standards, potential biosignature patterns must evaluate competing abiotic chemical pathways.
              </p>
            </div>

            {/* 1. Direct Observations */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1. Direct Observations (Empirical Data)</span>
              </h4>
              <ul className="text-xs space-y-2 text-slate-300 font-sans">
                {scientificRigor.directObservations.map((obs, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-slate-950/40 p-2 rounded border border-slate-800/60">
                    <span className="text-cyan-400 font-mono font-bold mt-0.5">[{idx + 1}]</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Biotic Hypothesis Interpretation */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-700/40 space-y-2">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>2. Biotic Hypothesis (Microbial Redox Model)</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {scientificRigor.interpretation}
              </p>
            </div>

            {/* 3. Competing Abiotic Explanations */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-700/40 space-y-2">
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>3. Competing Abiotic Explanations</span>
              </h4>
              <ul className="text-xs space-y-2 text-slate-300 font-sans">
                {scientificRigor.competingAbioticExplanations.map((abiotic, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-slate-950/40 p-2 rounded border border-slate-800/60">
                    <span className="text-amber-400 font-mono font-bold mt-0.5">[{String.fromCharCode(65 + idx)}]</span>
                    <span>{abiotic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conclusion */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 italic">
              <strong>Formal Assessment:</strong> {scientificRigor.conclusion}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: INTERACTIVE EVA TASK CHECKLIST                    */}
        {/* ======================================================== */}
        {activeTab === 'TASKS' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>FIELD ACTIVITIES FOR THIS WAYPOINT</span>
              <span className="text-cyan-400 font-bold">
                {tasks.filter(t => tasksState[t.id]).length} / {tasks.length} COMPLETE
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => {
                const isChecked = Boolean(tasksState[task.id]);

                return (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-600/50 text-slate-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 text-cyan-400 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold flex items-center space-x-1 ${
                          task.role === 'Rover'
                            ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
                            : task.role === 'Astro-1'
                            ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50'
                            : 'bg-amber-900/60 text-amber-300 border border-amber-700/50'
                        }`}>
                          {task.role === 'Rover' ? <Bot className="w-2.5 h-2.5 mr-0.5" /> : <User className="w-2.5 h-2.5 mr-0.5" />}
                          <span>{task.role}</span>
                        </span>
                        {isChecked && (
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">
                            ✓ LOGGED
                          </span>
                        )}
                      </div>
                      <p className={`font-sans leading-relaxed ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: EVIDENCE TRACEABILITY & CITATIONS                 */}
        {/* ======================================================== */}
        {activeTab === 'EVIDENCE' && (
          <div className="space-y-4">
            {/* NASA Instrument Provenance */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center space-x-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>Supporting NASA Science Instruments</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {waypoint.instruments.map((inst) => (
                  <span
                    key={inst}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 font-semibold"
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            {/* Peer-Reviewed Scientific Citations */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Peer-Reviewed Geosciences Literature</span>
              </h4>

              {citations.map((cite, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-200 font-sans">
                    {cite.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {cite.author} ({cite.year}). <em>{cite.journal}</em>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 flex items-center space-x-1 pt-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>DOI: {cite.doi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
