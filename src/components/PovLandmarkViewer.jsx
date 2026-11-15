import React, { useState } from 'react';
import { Eye, ZoomIn, Target, Info, Sparkles, Compass, ShieldAlert, Award } from 'lucide-react';

export default function PovLandmarkViewer({ waypoint }) {
  const [activePin, setActivePin] = useState(null);
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL', 'MINERALS', 'SAMPLING'

  if (!waypoint || !waypoint.pov) {
    return (
      <div className="p-6 text-center text-slate-500 font-mono text-xs">
        No eye-level POV optical data available for this sector.
      </div>
    );
  }

  const { pov } = waypoint;

  return (
    <div className="w-full bg-slate-950/90 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      {/* POV Header */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-700 flex items-center justify-center text-cyan-400">
            <Eye className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {pov.title}
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">
              Simulated Mastcam-Z / Navcam Eye-Level Ground Perspective
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center space-x-1 text-[10px] font-mono">
          <span className="text-slate-500 mr-1">Highlight:</span>
          {['ALL', 'MINERALS', 'SAMPLING'].map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-2 py-0.5 rounded transition-all ${
                filterMode === mode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Eye-Level Outcrop SVG Visualizer */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] bg-[#140E0A] overflow-hidden group">
        <svg
          viewBox="0 0 600 320"
          className="w-full h-full object-cover"
        >
          <defs>
            {/* Martian Sky & Atmosphere Gradient */}
            <linearGradient id="marsAtmosphere" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8C4328" />
              <stop offset="40%" stopColor="#C86A46" />
              <stop offset="70%" stopColor="#E28B65" />
              <stop offset="100%" stopColor="#D9825F" />
            </linearGradient>

            {/* Mudstone rock face pattern */}
            <pattern id="mudstoneStrata" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 Q 50 12, 100 10 M 0 20 Q 50 18, 100 20 M 0 30 Q 50 32, 100 30" stroke="#3D291D" strokeWidth="1" fill="none" />
              <circle cx="20" cy="15" r="1.5" fill="#5A3F2E" />
              <circle cx="70" cy="25" r="1.5" fill="#5A3F2E" />
            </pattern>

            {/* Conglomerate texture */}
            <pattern id="conglomeratePebbles" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="6" fill="#4B3A2F" stroke="#2D2119" />
              <circle cx="45" cy="25" r="9" fill="#5C4537" stroke="#2D2119" />
              <circle cx="25" cy="45" r="7" fill="#3D2E24" stroke="#2D2119" />
            </pattern>

            {/* Glowing pin pulse */}
            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </radialGradient>
          </defs>

          {/* Horizon & Distant Jezero Rim Hills */}
          <rect width="600" height="120" fill="url(#marsAtmosphere)" />
          <path
            d="M 0 110 Q 150 90, 300 105 T 600 95 L 600 140 L 0 140 Z"
            fill="#5E3827"
            opacity="0.85"
          />

          {/* Outcrop Foreground Terrain Rendering based on Waypoint */}
          {waypoint.id === 'WP-01' && (
            <g id="wp1-terrain">
              {/* Basalt Pavement with polygonal cooling fractures */}
              <polygon points="0,120 600,120 600,320 0,320" fill="#2C211B" />
              {/* Joint fractures */}
              <path d="M 50 140 L 140 220 L 260 210 L 320 300" stroke="#17120F" strokeWidth="2" fill="none" />
              <path d="M 260 210 L 380 180 L 490 240 L 580 200" stroke="#17120F" strokeWidth="2" fill="none" />
              <path d="M 140 220 L 80 320" stroke="#17120F" strokeWidth="2" fill="none" />
              {/* Olivine phenocryst grains */}
              <circle cx="180" cy="225" r="4" fill="#10B981" />
              <circle cx="195" cy="220" r="3" fill="#10B981" />
              <circle cx="210" cy="235" r="5" fill="#10B981" />
              <circle cx="390" cy="145" r="4" fill="#10B981" />
              {/* Rover Wheel Tread Impression */}
              <g stroke="#1A130E" strokeWidth="3" opacity="0.7">
                <line x1="450" y1="230" x2="520" y2="280" />
                <line x1="460" y1="220" x2="475" y2="240" />
                <line x1="480" y1="235" x2="495" y2="255" />
                <line x1="500" y1="250" x2="515" y2="270" />
              </g>
            </g>
          )}

          {waypoint.id === 'WP-02' && (
            <g id="wp2-terrain">
              {/* Steep Conglomerate Flood Scarp & Overhang */}
              <path
                d="M 0 110 L 220 90 C 260 130, 280 150, 310 180 L 320 220 C 280 230, 220 240, 180 280 L 140 320 L 0 320 Z"
                fill="#251C16"
              />
              {/* High-energy Flood Boulders (Mangold et al., 2021) */}
              <circle cx="240" cy="175" r="32" fill="#544337" stroke="#1C140F" strokeWidth="2" />
              <circle cx="190" cy="230" r="22" fill="#6B5647" stroke="#1C140F" strokeWidth="2" />
              <circle cx="280" cy="220" r="18" fill="#48382E" stroke="#1C140F" strokeWidth="2" />
              <rect x="0" y="110" width="600" height="210" fill="url(#conglomeratePebbles)" opacity="0.35" />
              {/* Overhanging Alcove Shadow (Radiation Shield) */}
              <path
                d="M 150 80 Q 220 120, 200 160 Q 140 140, 150 80 Z"
                fill="rgba(0, 0, 0, 0.65)"
              />
            </g>
          )}

          {waypoint.id === 'WP-03' && (
            <g id="wp3-terrain">
              {/* Rhythmic Lacustrine Mudstone Beds */}
              <polygon points="0,110 600,110 600,320 0,320" fill="#3D2D24" />
              <rect width="600" height="210" y="110" fill="url(#mudstoneStrata)" opacity="0.6" />
              {/* White Calcium Sulfate Fracture-filling Veinlets */}
              <path d="M 120 130 Q 180 190, 240 220 T 360 260" stroke="#F8FAFC" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M 280 150 Q 340 180, 420 240" stroke="#F8FAFC" strokeWidth="1.5" fill="none" opacity="0.8" />
              <path d="M 400 170 Q 430 220, 490 280" stroke="#F8FAFC" strokeWidth="2.5" fill="none" opacity="0.8" />
              {/* Clay-enriched lamina */}
              <rect x="0" y="240" width="600" height="25" fill="rgba(6, 182, 212, 0.15)" />
            </g>
          )}

          {waypoint.id === 'WP-04' && (
            <g id="wp4-terrain">
              {/* Cheyava Falls Ferruginous Mudstone Host Rock */}
              <polygon points="0,110 600,110 600,320 0,320" fill="#451A14" />
              {/* Fine layered bedding */}
              <path d="M 0 160 Q 300 155, 600 162" stroke="#2A0F0C" strokeWidth="2" fill="none" />
              <path d="M 0 210 Q 300 205, 600 212" stroke="#2A0F0C" strokeWidth="2" fill="none" />
              <path d="M 0 260 Q 300 258, 600 264" stroke="#2A0F0C" strokeWidth="2" fill="none" />

              {/* Cross-cutting Calcium Sulfate (Gypsum) Veins */}
              <path d="M 140 120 C 180 180, 160 230, 220 310" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
              <path d="M 380 115 C 340 175, 410 240, 390 315" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
              <path d="M 180 200 L 360 210" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.9" />

              {/* Millimetric "Leopard Spots" (Vivianite core + Greigite rim) */}
              {/* Center Leopard Spot #1 (Primary Observation) */}
              <g transform="translate(290, 175)">
                {/* Dark Greigite FeS2 Rim */}
                <circle cx="0" cy="0" r="26" fill="#18181B" stroke="#A855F7" strokeWidth="2" />
                {/* White Bleached Iron-Phosphate Core */}
                <circle cx="0" cy="0" r="16" fill="#E2E8F0" stroke="#38BDF8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="6" fill="#0284C7" />
              </g>

              {/* Leopard Spot #2 */}
              <g transform="translate(230, 235)">
                <circle cx="0" cy="0" r="20" fill="#18181B" stroke="#A855F7" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="12" fill="#E2E8F0" stroke="#38BDF8" strokeWidth="1" />
              </g>

              {/* Leopard Spot #3 */}
              <g transform="translate(360, 245)">
                <circle cx="0" cy="0" r="22" fill="#18181B" stroke="#A855F7" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="13" fill="#E2E8F0" stroke="#38BDF8" strokeWidth="1" />
              </g>

              {/* Precision 10mm Drill Target Circle */}
              <circle cx="290" cy="175" r="36" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5 3" />
            </g>
          )}

          {waypoint.id === 'WP-05' && (
            <g id="wp5-terrain">
              {/* Step-Terraced Carbonate Ridge */}
              <polygon points="0,110 600,110 600,320 0,320" fill="#3D3528" />
              {/* Ridge Terraces */}
              <path d="M 0 140 L 250 135 L 280 180 L 480 175 L 510 230 L 600 225" stroke="#1C1812" strokeWidth="3" fill="none" />
              {/* Wavy Carbonate / Stromatolitic Crusts */}
              <path d="M 40 180 Q 90 170, 140 185 T 240 180" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
              <path d="M 310 220 Q 360 210, 410 225 T 500 220" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
              {/* Dark Chert Nodules */}
              <ellipse cx="270" cy="195" rx="18" ry="12" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
              <ellipse cx="440" cy="240" rx="14" ry="9" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
              {/* 18° Scarp Drop-Off Warning Line */}
              <line x1="520" y1="120" x2="520" y2="320" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 4" />
              <text x="530" y="140" fill="#EF4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                18° SCARP EDGE
              </text>
            </g>
          )}

          {/* Callout Mineral and Sampling Pins */}
          {pov.features.map((feat, idx) => {
            const svgX = (feat.pos.x / 100) * 600;
            const svgY = 110 + (feat.pos.y / 100) * 200;
            const isPinActive = activePin === idx;

            return (
              <g
                key={idx}
                transform={`translate(${svgX}, ${svgY})`}
                onClick={() => setActivePin(isPinActive ? null : idx)}
                className="cursor-pointer group"
              >
                {/* Glow ring */}
                <circle cx="0" cy="0" r="16" fill="url(#pinGlow)" opacity="0.6" />
                {/* Pin core */}
                <circle
                  cx="0"
                  cy="0"
                  r={isPinActive ? '8' : '6'}
                  fill={feat.color || '#06B6D4'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-125"
                />

                {/* Callout Tag */}
                <g transform="translate(12, -10)">
                  <rect
                    x="0"
                    y="0"
                    width={feat.label.length * 6.5 + 16}
                    height="18"
                    rx="4"
                    fill="rgba(15, 23, 42, 0.95)"
                    stroke={feat.color || '#06B6D4'}
                    strokeWidth="1"
                  />
                  <text
                    x="8"
                    y="12"
                    fill="#F8FAFC"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {feat.label}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 10 cm Ground Scale Bar (bottom left) */}
          <g transform="translate(20, 280)">
            <rect width="130" height="28" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <line x1="12" y1="12" x2="112" y2="12" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="12" y1="6" x2="12" y2="18" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="62" y1="8" x2="62" y2="16" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="112" y1="6" x2="112" y2="18" stroke="#FFFFFF" strokeWidth="2" />
            <text x="62" y="24" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="monospace" fontWeight="bold">
              10 cm SCALE BAR
            </text>
          </g>

          {/* Mastcam-Z Reticle Overlay */}
          <circle cx="300" cy="180" r="40" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="290" y1="180" x2="310" y2="180" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
          <line x1="300" y1="170" x2="300" y2="190" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
        </svg>

        {/* Optical Telemetry Overlay Banner */}
        <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700/60 font-mono text-[10px] text-slate-300">
          <span>FOV: 34° STEREO</span> | <span className="text-cyan-400">RES: 0.15 mm/px</span>
        </div>
      </div>

      {/* Description & Astronaut Field Guidance */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-xs">
        <div className="flex items-start space-x-2">
          <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <p className="text-slate-300 leading-relaxed font-sans">
            {pov.description}
          </p>
        </div>
      </div>
    </div>
  );
}
