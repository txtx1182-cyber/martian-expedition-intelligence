import React from 'react';
import { 
  X, 
  MapPin, 
  ExternalLink, 
  AlertTriangle, 
  Award, 
  Compass, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Database, 
  FlaskConical, 
  Eye, 
  Info,
  Plus
} from 'lucide-react';

export default function TargetEvidenceCard({ target, onClose, onAddTargetToRoute }) {
  if (!target) return null;

  const { assessments, pdsProducts, evidenceChain, isPrimaryTarget, isExtended } = target;

  return (
    <aside className="w-full md:w-[420px] h-full flex flex-col bg-white border-l border-slate-300 shadow-panel z-20 overflow-hidden select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center space-x-1.5 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
              {target.num}
            </span>
            {isPrimaryTarget && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-terracotta-100 text-terracotta-800 border border-terracotta-300">
                PRIMARY BIOSIGNATURE TARGET
              </span>
            )}
            {isExtended && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-700">
                EXTENDED TARGET
              </span>
            )}
          </div>
          <h2 className="text-sm sm:text-base font-display font-bold text-slate-900 leading-snug">
            {target.name}
          </h2>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mt-0.5">
            <span>{target.lat}°N, {target.lng}°E</span>
            <span>•</span>
            <span className="text-terracotta-700 font-bold">{target.elevation} m</span>
          </div>

          {/* Add to Route Planner Button */}
          {onAddTargetToRoute && (
            <div className="mt-2">
              <button
                onClick={() => onAddTargetToRoute(target.id)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-terracotta-700 hover:bg-terracotta-800 text-white font-mono text-[11px] font-bold transition-colors shadow-subtle"
                title="Add this target to Route Planner"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Route</span>
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          title="Close Card"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Evidence Chain Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ======================================================== */}
        {/* TARGET 07 SPECIFIC BANNER: POTENTIAL BIOSIGNATURE        */}
        {/* ======================================================== */}
        {isPrimaryTarget && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 space-y-1 shadow-subtle">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>NASA Astrobiology Standard Notice</span>
            </div>
            <div className="text-xs font-display font-bold text-amber-950">
              POTENTIAL BIOSIGNATURE — NOT CONFIRMED EVIDENCE OF LIFE
            </div>
            <p className="text-[11px] text-amber-900 font-sans leading-relaxed">
              Co-occurring aromatic organic carbon, vivianite (Fe-PO₄), and greigite (Fe-S) reaction halos resemble terrestrial microbial redox fronts, but abiotic diagenetic fluid mixing mechanisms must be rigorously evaluated.
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* QUALITATIVE SCIENTIFIC ASSESSMENTS                       */}
        {/* ======================================================== */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-cobalt-700" />
            <span>Target Qualitative Assessments</span>
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">HABITABILITY</span>
              <strong className="text-slate-900">{assessments.habitability}</strong>
            </div>
            <div className="p-2 rounded bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">BIOSIGNATURE POTENTIAL</span>
              <strong className={isPrimaryTarget ? 'text-terracotta-700 font-bold' : 'text-slate-900'}>
                {assessments.biosignature}
              </strong>
            </div>
            <div className="p-2 rounded bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">SCIENTIFIC PRIORITY</span>
              <strong className="text-cobalt-700 font-bold">{assessments.science}</strong>
            </div>
            <div className="p-2 rounded bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">CONFIDENCE LEVEL</span>
              <strong className="text-emerald-700">{assessments.confidence}</strong>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* EXACT 8-PART EVIDENCE CHAIN TEMPLATE                     */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
            <FileText className="w-4 h-4 text-terracotta-700" />
            <span>8-Part Scientific Evidence Chain</span>
          </span>

          {/* 1. What is here? */}
          <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 shadow-subtle">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              1. What is here?
            </span>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {evidenceChain.whatIsHere}
            </p>
          </div>

          {/* 2. What was observed? (With exact PDS product IDs) */}
          <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 space-y-2">
            <span className="text-[10px] font-mono font-bold text-blue-900 uppercase tracking-wider block">
              2. What was observed? (PDS Products & Instruments)
            </span>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {evidenceChain.whatWasObserved}
            </p>

            {/* PDS IDs Pill List */}
            <div className="space-y-1 pt-1 border-t border-blue-200/80 text-[10px] font-mono">
              <div className="text-blue-900 font-bold">Associated PDS Archives:</div>
              <div className="flex flex-wrap gap-1">
                {pdsProducts.hirise.map(id => (
                  <span key={id} className="px-1.5 py-0.5 rounded bg-white border border-blue-300 text-blue-800">
                    HiRISE: {id}
                  </span>
                ))}
                {pdsProducts.dtm.map(id => (
                  <span key={id} className="px-1.5 py-0.5 rounded bg-white border border-blue-300 text-blue-800">
                    DTM: {id}
                  </span>
                ))}
                {pdsProducts.crism.map(id => (
                  <span key={id} className="px-1.5 py-0.5 rounded bg-white border border-blue-300 text-blue-800">
                    CRISM: {id}
                  </span>
                ))}
                {pdsProducts.ctx.map(id => (
                  <span key={id} className="px-1.5 py-0.5 rounded bg-white border border-blue-300 text-blue-800">
                    CTX: {id}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3. What is interpreted? */}
          <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-emerald-900 uppercase tracking-wider block">
              3. What is interpreted? (Published Literature)
            </span>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {evidenceChain.whatIsInterpreted}
            </p>
            <div className="pt-1">
              <a
                href={`https://doi.org/${evidenceChain.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-emerald-800 hover:text-emerald-950 underline"
              >
                <ExternalLink className="w-3 h-3" />
                <span>{evidenceChain.doiCitation} (DOI: {evidenceChain.doi})</span>
              </a>
            </div>
          </div>

          {/* 4. How confident? */}
          <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 shadow-subtle">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              4. How confident?
            </span>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {evidenceChain.howConfident}
            </p>
          </div>

          {/* 5. What else could explain it? (Counter-evidence) */}
          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider block">
              5. What else could explain it? (Mandatory Counter-Evidence)
            </span>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {evidenceChain.whatElseCouldExplainIt}
            </p>
          </div>

          {/* 6. What would change the assessment? */}
          <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-purple-900 uppercase tracking-wider block">
              6. What would change the assessment? (Falsification Criteria)
            </span>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {evidenceChain.whatWouldChangeAssessment}
            </p>
          </div>

          {/* 7. Can we get there? (Accessibility) */}
          <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1 shadow-subtle">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              7. Can we get there? (Astronaut Traverse Feasibility)
            </span>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {evidenceChain.canWeGetThere}
            </p>
          </div>

          {/* 8. Source & Data Availability Indicator */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs font-mono">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              8. Source & Data Availability Indicator
            </span>
            <div className="text-slate-800 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{evidenceChain.dataCoverageStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
