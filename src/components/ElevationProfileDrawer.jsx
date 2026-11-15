import React, { useState } from 'react';
import { ChevronUp, ChevronDown, TrendingUp, Compass, MapPin } from 'lucide-react';
import { FULL_TRAVERSE_TRACK, calculateMarsDistanceMeters } from '../data/marsDossierData';

export default function ElevationProfileDrawer({
  onHoverPoint,
  hoveredPoint,
  onSelectTarget,
  activeRoutePoints = []
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Compute track points: use activeRoutePoints if >= 2 points exist, else fallback to FULL_TRAVERSE_TRACK
  let track = FULL_TRAVERSE_TRACK;
  let isDynamicRoute = false;

  if (activeRoutePoints && activeRoutePoints.length >= 2) {
    isDynamicRoute = true;
    let cumDistKm = 0;
    track = activeRoutePoints.map((pt, idx) => {
      if (idx > 0) {
        const prev = activeRoutePoints[idx - 1];
        const segDistM = calculateMarsDistanceMeters(prev.lat, prev.lng, pt.lat, pt.lng);
        cumDistKm += segDistM / 1000;
      }
      return {
        id: pt.id || `pt-${idx}`,
        name: pt.name || pt.id || `Stop ${idx + 1}`,
        targetId: pt.targetId || (pt.id && pt.id.startsWith('T') ? pt.id : null),
        lat: pt.lat,
        lng: pt.lng,
        elevation: pt.elevation,
        distKm: Math.round(cumDistKm * 100) / 100
      };
    });
  }

  const chartWidth = 960;
  const chartHeight = 125;
  const paddingX = 50;
  const paddingY = 20;

  const totalDist = track[track.length - 1].distKm;
  const maxDist = Math.max(0.1, totalDist);
  
  // Elevation bounds
  const elevations = track.map(p => p.elevation);
  const minElevObserved = Math.min(...elevations);
  const maxElevObserved = Math.max(...elevations);
  const minElev = Math.floor((minElevObserved - 30) / 50) * 50;
  const maxElev = Math.ceil((maxElevObserved + 30) / 50) * 50;
  const elevRange = Math.max(50, maxElev - minElev);

  const getX = (dist) => paddingX + (dist / maxDist) * (chartWidth - paddingX * 2);
  const getY = (elev) => chartHeight - paddingY - ((elev - minElev) / elevRange) * (chartHeight - paddingY * 2);

  // Build SVG polygon points
  const points = track.map(p => `${getX(p.distKm)},${getY(p.elevation)}`).join(' ');
  const areaPoints = `${getX(0)},${chartHeight - paddingY} ${points} ${getX(maxDist)},${chartHeight - paddingY}`;

  // Elevation grid ticks
  const tickStep = elevRange > 600 ? 200 : (elevRange > 250 ? 100 : 50);
  const elevTicks = [];
  for (let e = minElev; e <= maxElev; e += tickStep) {
    elevTicks.push(e);
  }

  // Distance grid ticks
  const distTicks = [0];
  if (maxDist >= 1) {
    const dStep = maxDist > 30 ? 10 : (maxDist > 10 ? 5 : (maxDist > 3 ? 1 : 0.5));
    for (let d = dStep; d < maxDist; d += dStep) {
      distTicks.push(Math.round(d * 10) / 10);
    }
  }
  distTicks.push(Math.round(maxDist * 100) / 100);

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
          <span className="text-[11px] text-slate-500">
            {isDynamicRoute 
              ? `Active Route: ${track[0].name} (${track[0].elevation}m) → ${track[track.length - 1].name} (${track[track.length - 1].elevation}m) [${totalDist >= 1 ? `${totalDist.toFixed(2)} km` : `${Math.round(totalDist * 1000)} m`}]`
              : 'Greater Jezero Basin Transect: T1 Landing (-2575m) → T6 West Rim (-1790m) [55.6 km]'}
          </span>
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
          <div className="min-w-[800px] max-w-5xl mx-auto h-[130px] relative">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="profileGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C2410C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {elevTicks.map(elev => {
                const y = getY(elev);
                return (
                  <g key={elev}>
                    <line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={paddingX - 6} y={y + 3} textAnchor="end" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono">{elev}m</text>
                  </g>
                );
              })}

              {/* Distance X-axis markers */}
              {distTicks.map(dist => {
                const x = getX(dist);
                const label = maxDist < 1 ? `${Math.round(dist * 1000)}m` : `${dist}km`;
                return (
                  <g key={dist}>
                    <line x1={x} y1={chartHeight - paddingY} x2={x} y2={chartHeight - paddingY + 4} stroke="#CBD5E1" strokeWidth="1" />
                    <text x={x} y={chartHeight - paddingY + 12} textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">{label}</text>
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
              {track.map((p, idx) => {
                const cx = getX(p.distKm);
                const cy = getY(p.elevation);
                const isHovered = hoveredPoint && hoveredPoint.id === p.id;
                const isKeyTarget = Boolean(p.targetId);

                return (
                  <g 
                    key={p.id || idx}
                    className="cursor-pointer group"
                    onMouseEnter={() => onHoverPoint(p)}
                    onMouseLeave={() => onHoverPoint(null)}
                    onClick={() => {
                      if (p.targetId && onSelectTarget) {
                        onSelectTarget(p.targetId);
                      }
                    }}
                  >
                    {/* Vertical guideline */}
                    <line
                      x1={cx}
                      y1={cy}
                      x2={cx}
                      y2={chartHeight - paddingY}
                      stroke={isHovered ? "#C2410C" : "#E2E8F0"}
                      strokeWidth={isHovered ? "1.5" : "0.75"}
                      strokeDasharray={isHovered ? "none" : "2 2"}
                    />

                    {/* Point Circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 5.5 : (isKeyTarget ? 4 : 3)}
                      fill={isKeyTarget ? (p.targetId === 'T7' || p.targetId === 'T4' ? '#D97706' : '#C2410C') : '#0F172A'}
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="transition-transform duration-150"
                    />

                    {/* Target / Point Label above point */}
                    <text
                      x={cx}
                      y={cy - 8}
                      textAnchor="middle"
                      fill="#0F172A"
                      fontSize="8.5"
                      fontWeight="bold"
                      fontFamily="JetBrains Mono"
                    >
                      {p.targetId || `WP-${idx + 1}`}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
