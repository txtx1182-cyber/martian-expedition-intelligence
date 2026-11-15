import React, { useState } from 'react';
import { ChevronUp, ChevronDown, TrendingUp, Compass, MapPin } from 'lucide-react';
import { FULL_TRAVERSE_TRACK } from '../data/marsDossierData';

export default function ElevationProfileDrawer({
  onHoverPoint,
  hoveredPoint,
  onSelectTarget
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Chart coordinates calculation
  // Total Distance: ~48.6 km
  // Elevation Range: -2600 m (bottom) to -1800 m (top), range = 800 m
  const chartWidth = 900;
  const chartHeight = 120;
  const paddingX = 40;
  const paddingY = 20;

  const maxDist = 48.6;
  const minElev = -2620;
  const maxElev = -1800;

  const getX = (dist) => paddingX + (dist / maxDist) * (chartWidth - paddingX * 2);
  const getY = (elev) => chartHeight - paddingY - ((elev - minElev) / (maxElev - minElev)) * (chartHeight - paddingY * 2);

  // Build SVG polygon points
  const points = FULL_TRAVERSE_TRACK.map(p => `${getX(p.distKm)},${getY(p.elevation)}`).join(' ');
  const areaPoints = `${getX(0)},${chartHeight - paddingY} ${points} ${getX(maxDist)},${chartHeight - paddingY}`;

  return (
    <div className="w-full bg-white border-t border-slate-300 shadow-panel z-20 select-none transition-all duration-300 flex flex-col">
      {/* Drawer Bar Toggle Strip */}
      <div 
        onClick={() => setIsCollapsed(prev => !prev)}
        className="px-4 py-1.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors text-xs font-mono"
      >
        <div className="flex items-center space-x-2 text-slate-700">
          <TrendingUp className="w-4 h-4 text-terracotta-700" />
          <strong className="font-display text-slate-900">ALONG-TRACK ELEVATION PROFILE</strong>
          <span className="text-slate-400">|</span>
          <span className="text-[11px] text-slate-500">Figure 2 Profile (T1 Landing -2570m → T9 West Rim -1974m)</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-slate-600">
          {hoveredPoint && (
            <span className="text-terracotta-700 font-bold">
              CURSOR: {hoveredPoint.name} ({hoveredPoint.elevation}m @ {hoveredPoint.distKm} km)
            </span>
          )}
          <div className="flex items-center space-x-1 font-bold text-slate-500">
            <span>{isCollapsed ? 'EXPAND PROFILE' : 'COLLAPSE'}</span>
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      {!isCollapsed && (
        <div className="p-3 bg-white overflow-x-auto">
          <div className="min-w-[750px] max-w-5xl mx-auto h-[130px] relative">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="profileGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C2410C" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.08" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[-2600, -2400, -2200, -2000, -1800].map(elev => {
                const y = getY(elev);
                return (
                  <g key={elev}>
                    <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={paddingX - 6} y={y + 3} textAnchor="end" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono">{elev}m</text>
                  </g>
                );
              })}

              {/* Shaded Area Under Curve */}
              <polygon points={areaPoints} fill="url(#profileGradient)" />

              {/* Main Profile Elevation Polyline */}
              <polyline
                points={points}
                fill="none"
                stroke="#C2410C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Target Data Points on Chart */}
              {FULL_TRAVERSE_TRACK.map((p, idx) => {
                const cx = getX(p.distKm);
                const cy = getY(p.elevation);
                const isHovered = hoveredPoint?.id === p.id;
                const isMajorTarget = p.name.startsWith('T');

                return (
                  <g 
                    key={p.id}
                    onMouseEnter={() => onHoverPoint(p)}
                    onMouseLeave={() => onHoverPoint(null)}
                    onClick={() => {
                      const match = p.name.match(/T\d/);
                      if (match && onSelectTarget) {
                        onSelectTarget(match[0]);
                      }
                    }}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 6 : isMajorTarget ? 4.5 : 2.5}
                      fill={isMajorTarget ? '#0F172A' : '#64748B'}
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      className="transition-transform group-hover:scale-150"
                    />

                    {/* Target labels on chart for key waypoints */}
                    {isMajorTarget && (
                      <g transform={`translate(${cx}, ${cy - 10})`}>
                        <text
                          textAnchor="middle"
                          fill="#0F172A"
                          fontSize="8"
                          fontFamily="Space Grotesk"
                          fontWeight="bold"
                        >
                          {p.name.split(' ')[0]}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Hover Indicator Vertical Line */}
              {hoveredPoint && (
                <line
                  x1={getX(hoveredPoint.distKm)}
                  y1={paddingY}
                  x2={getX(hoveredPoint.distKm)}
                  y2={chartHeight - paddingY}
                  stroke="#C2410C"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
              )}
            </svg>

            {/* X-Axis Distance Labels */}
            <div className="flex justify-between px-10 text-[9px] font-mono text-slate-400 mt-0.5">
              <span>0 km (Landing)</span>
              <span>12 km (Delta Base)</span>
              <span>24 km (Upper Fan)</span>
              <span>33 km (Bright Angel)</span>
              <span>42 km (Margin Unit)</span>
              <span>48.6 km (West Rim)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
