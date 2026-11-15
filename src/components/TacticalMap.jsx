import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Layers, 
  AlertOctagon, 
  ShieldAlert, 
  Wind, 
  Eye, 
  Navigation2, 
  MapPin, 
  Radio, 
  Info,
  CheckCircle2,
  Footprints,
  Crosshair
} from 'lucide-react';
import { WAYPOINTS, EVA_ROUTES, ENVIRONMENTAL_CONDITIONS } from '../data/marsMissionData';

// Map Coordinate conversion
// Lon: 77.3850 to 77.4150 (Span: 0.0300)
// Lat: 18.4320 to 18.4520 (Span: 0.0200)
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 750;

export const lonToX = (lon) => ((lon - 77.3850) / 0.0300) * SVG_WIDTH;
export const latToY = (lat) => SVG_HEIGHT - ((lat - 18.4320) / 0.0200) * SVG_HEIGHT;

export default function TacticalMap({
  activeLayers,
  selectedRouteId,
  selectedWaypointId,
  onSelectWaypoint,
  sepAlertActive,
  currentMode,
  onOpenTradeoffModal
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredWaypoint, setHoveredWaypoint] = useState(null);
  const [windOffset, setWindOffset] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, lat: 18.4400, lon: 77.4000 });

  const containerRef = useRef(null);

  // Animated wind vectors offset
  useEffect(() => {
    let animFrame;
    const animateWind = () => {
      setWindOffset(prev => (prev + 0.8) % 100);
      animFrame = requestAnimationFrame(animateWind);
    };
    animFrame = requestAnimationFrame(animateWind);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.25, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.25, 0.75));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only primary click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left - pan.x) / zoom;
      const relativeY = (e.clientY - rect.top - pan.y) / zoom;
      
      const calcLon = 77.3850 + (relativeX / SVG_WIDTH) * 0.0300;
      const calcLat = 18.4320 + ((SVG_HEIGHT - relativeY) / SVG_HEIGHT) * 0.0200;

      setCursorPos({
        x: relativeX,
        y: relativeY,
        lat: Number(calcLat.toFixed(4)),
        lon: Number(calcLon.toFixed(4))
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * factor, 0.75), 4));
  };

  // Waypoints mapped to SVG coordinates
  const mappedWaypoints = useMemo(() => {
    return WAYPOINTS.map(wp => ({
      ...wp,
      x: lonToX(wp.lon),
      y: latToY(wp.lat)
    }));
  }, []);

  // Route Paths
  const routeAPath = useMemo(() => {
    // Smooth bezier or multi-segment polyline visiting WP-01 to WP-05 skirting scarps
    const wp = mappedWaypoints;
    return `M ${wp[0].x} ${wp[0].y} 
            Q ${wp[0].x + 60} ${wp[0].y - 30}, ${wp[1].x} ${wp[1].y} 
            Q ${wp[1].x + 70} ${wp[1].y - 45}, ${wp[2].x} ${wp[2].y} 
            Q ${wp[2].x + 50} ${wp[2].y - 35}, ${wp[3].x} ${wp[3].y} 
            Q ${wp[3].x + 60} ${wp[3].y - 50}, ${wp[4].x} ${wp[4].y}`;
  }, [mappedWaypoints]);

  const routeBPath = useMemo(() => {
    // Safe low-slope contingency path on channel floor
    const wp = mappedWaypoints;
    return `M ${wp[0].x} ${wp[0].y} 
            L ${wp[1].x} ${wp[1].y} 
            L ${wp[2].x} ${wp[2].y} 
            Q ${wp[2].x - 40} ${wp[2].y + 50}, ${wp[1].x - 30} ${wp[1].y + 60} 
            Z`;
  }, [mappedWaypoints]);

  // Scaled 0-500m scale bar (At this latitude, 0.03° lon is ~1770m, so 500m is ~282px at zoom 1)
  const scaleBarWidthPx = (282 * zoom);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050811] overflow-hidden select-none">
      {/* Map Header Status & Active Layer Badges */}
      <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-mono text-slate-200 shadow-lg">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span>CURSOR: {cursorPos.lat}° N, {cursorPos.lon}° E</span>
        </div>

        <div className="pointer-events-auto flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-mono text-slate-300">
          <Footprints className="w-3.5 h-3.5 text-amber-400" />
          <span>ACTIVE TRAVERSE:</span>
          <span className={`font-bold ${selectedRouteId === 'route_a' ? 'text-cyan-400' : 'text-emerald-400'}`}>
            {selectedRouteId === 'route_a' ? 'ROUTE A (1.65 km / 3h 40m)' : 'ROUTE B (1.20 km / Low Slope)'}
          </span>
        </div>

        {/* Active Layer Count Pill */}
        <div className="pointer-events-auto hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-mono text-slate-400">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>LAYERS ACTIVE:</span>
          <span className="text-white font-bold">
            {Object.values(activeLayers).filter(Boolean).length} / 5
          </span>
        </div>
      </div>

      {/* Floating Zoom & Control Bar */}
      <div className="absolute top-3 right-3 z-30 flex flex-col space-y-1.5 pointer-events-auto">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white transition-all shadow-md active:scale-95"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white transition-all shadow-md active:scale-95"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white transition-all shadow-md active:scale-95"
          title="Reset View & Scale"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onOpenTradeoffModal}
          className="p-2 rounded-lg bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-300 hover:text-white transition-all shadow-md active:scale-95"
          title="Compare Route Trade-Offs"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Main Interactive Map Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden ${
          sepAlertActive ? 'ring-2 ring-red-500/80' : ''
        }`}
      >
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full object-cover transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="tacGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(6, 182, 212, 0.3)" />
            </pattern>

            {/* HiRISE Morphological Terrain Shading Gradient */}
            <radialGradient id="jezeroFloor" cx="45%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#1E1611" />
              <stop offset="50%" stopColor="#130E0C" />
              <stop offset="100%" stopColor="#0A0605" />
            </radialGradient>

            {/* Mineral Shimmer Filters & Gradients */}
            <linearGradient id="smectiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.35)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.15)" />
            </linearGradient>

            <linearGradient id="carbonateGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.35)" />
              <stop offset="100%" stopColor="rgba(217, 119, 6, 0.15)" />
            </linearGradient>

            <radialGradient id="cheyavaRedoxGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.65)" />
              <stop offset="40%" stopColor="rgba(239, 68, 68, 0.35)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
            </radialGradient>

            {/* Route A Line Glow Filter */}
            <filter id="routeGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#06B6D4" floodOpacity="0.8" />
            </filter>

            {/* Route B Line Glow Filter */}
            <filter id="routeGlowEmerald" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.8" />
            </filter>

            {/* Wind Vector Arrow Marker */}
            <marker id="windArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="rgba(245, 158, 11, 0.6)" />
            </marker>
          </defs>

          {/* Base Tactical Grid Background */}
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#jezeroFloor)" />
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#tacGrid)" />

          {/* ======================================================== */}
          {/* LAYER 1: OPTICAL & MORPHOLOGICAL (HiRISE)                */}
          {/* ======================================================== */}
          {activeLayers.optical && (
            <g id="layer-optical" opacity="0.95">
              {/* Neretva Vallis Paleo-River Channel Meander Canyon */}
              <path
                d="M -50 480 
                   C 180 440, 260 520, 390 410 
                   C 480 340, 560 380, 680 260 
                   C 760 180, 880 210, 1050 120
                   L 1050 220 
                   C 860 310, 750 280, 640 400 
                   C 520 510, 380 580, 240 560 
                   L -50 620 Z"
                fill="#241B15"
                stroke="#3E2E23"
                strokeWidth="2"
              />

              {/* Terraced Bedrock Scarps & Outcrop Formations */}
              <path
                d="M 120 750 C 200 680, 280 620, 420 640 C 580 660, 720 590, 880 620 L 1000 650 L 1000 750 Z"
                fill="#181310"
                stroke="#35261C"
                strokeWidth="1.5"
              />

              {/* Bright Angel Light-Toned Sediment Fan */}
              <path
                d="M 460 390 
                   C 540 330, 620 310, 720 280 
                   C 700 210, 620 200, 540 230 
                   C 480 260, 460 320, 460 390 Z"
                fill="#322720"
                stroke="#544336"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              {/* Bedrock Fractures & Structural Lineaments */}
              <path d="M 280 470 L 340 520 M 360 490 L 410 530" stroke="#4A3B2C" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 590 280 L 640 320 M 660 250 L 710 290" stroke="#4A3B2C" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 680 190 L 760 170 M 740 220 L 820 180" stroke="#4A3B2C" strokeWidth="1" strokeDasharray="3 3" />

              {/* HiRISE Ripple & Dune Fields */}
              <g stroke="rgba(211, 84, 0, 0.25)" strokeWidth="1" fill="none">
                <path d="M 210 540 Q 230 535, 250 540" />
                <path d="M 215 550 Q 235 545, 255 550" />
                <path d="M 220 560 Q 240 555, 260 560" />
                <path d="M 510 320 Q 530 315, 550 320" />
                <path d="M 515 330 Q 535 325, 555 330" />
                <path d="M 520 340 Q 540 335, 560 340" />
              </g>
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 3: SPECTRAL & MINERALOGICAL (CRISM + PIXL)         */}
          {/* ======================================================== */}
          {activeLayers.spectral && (
            <g id="layer-spectral" opacity="0.85">
              {/* 1. Séítah / Máaz Floor Olivine-rich igneous basement */}
              <path
                d="M 50 680 C 180 580, 320 620, 450 680 L 400 750 L 50 750 Z"
                fill="rgba(16, 185, 129, 0.22)"
                stroke="rgba(16, 185, 129, 0.6)"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              <text x="180" y="700" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                OLIVINE / AUGITE (Séítah Contact)
              </text>

              {/* 2. Smectite-rich clay deposits (Bright Angel Lacustrine Silts) */}
              <path
                d="M 440 360 C 520 280, 640 260, 720 320 C 660 410, 520 440, 440 360 Z"
                fill="url(#smectiteGradient)"
                stroke="#06B6D4"
                strokeWidth="1.5"
              />
              <text x="490" y="360" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                SMECTITE CLAYS (Fe/Mg phyllosilicates)
              </text>

              {/* 3. Carbonate Margin Shoreline Units */}
              <path
                d="M 660 170 C 740 120, 850 140, 930 90 L 980 180 C 890 220, 780 220, 660 170 Z"
                fill="url(#carbonateGradient)"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
              <text x="760" y="140" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold">
                MARGIN CARBONATES (Magnesite / Chert)
              </text>

              {/* 4. Cheyava Falls Iron-Phosphate & Iron-Sulfide Redox Zone */}
              <circle cx={mappedWaypoints[3].x} cy={mappedWaypoints[3].y} r="65" fill="url(#cheyavaRedoxGlow)" />
              <circle cx={mappedWaypoints[3].x} cy={mappedWaypoints[3].y} r="32" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 2" />
              <text x={mappedWaypoints[3].x + 35} y={mappedWaypoints[3].y - 15} fill="#C084FC" fontSize="10" fontFamily="monospace" fontWeight="bold">
                REDOX FRONT: Fe-PO4 / FeS2 (Vivianite / Greigite)
              </text>
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 2: TOPOGRAPHY & SPACESUIT MOBILITY (HiRISE DEM)     */}
          {/* ======================================================== */}
          {activeLayers.topography && (
            <g id="layer-topography">
              {/* DEM Elevation Contours (-2540m to -2505m) */}
              <g stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1" fill="none">
                {/* Contour -2540m */}
                <path d="M 0 540 C 200 520, 320 560, 480 500 C 640 440, 800 480, 1000 420" />
                <text x="50" y="534" fill="#94A3B8" fontSize="9" fontFamily="monospace">-2540 m</text>

                {/* Contour -2530m */}
                <path d="M 0 440 C 220 400, 360 450, 520 380 C 680 310, 820 340, 1000 290" />
                <text x="50" y="434" fill="#94A3B8" fontSize="9" fontFamily="monospace">-2530 m</text>

                {/* Contour -2520m */}
                <path d="M 0 340 C 250 280, 400 320, 580 260 C 720 200, 860 220, 1000 170" />
                <text x="50" y="334" fill="#94A3B8" fontSize="9" fontFamily="monospace">-2520 m</text>

                {/* Contour -2510m */}
                <path d="M 0 240 C 280 180, 440 210, 630 150 C 780 100, 900 120, 1000 70" />
                <text x="50" y="234" fill="#94A3B8" fontSize="9" fontFamily="monospace">-2510 m</text>
              </g>

              {/* SLOPE HAZARD ZONES */}
              {/* 1. Safe Zones (<10° Emerald) */}
              <rect x="180" y="470" width="130" height="70" rx="15" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.4)" strokeDasharray="3 3" />
              <rect x="490" y="270" width="100" height="60" rx="15" fill="rgba(16, 185, 129, 0.12)" stroke="rgba(16, 185, 129, 0.4)" strokeDasharray="3 3" />

              {/* 2. Caution Zones (10°-15° Amber) */}
              <polygon
                points="580,240 670,180 690,240 600,280"
                fill="rgba(245, 158, 11, 0.18)"
                stroke="rgba(245, 158, 11, 0.7)"
                strokeWidth="1.5"
              />
              <text x="610" y="260" fill="#FBBF24" fontSize="9" fontFamily="monospace" fontWeight="bold">
                CAUTION: 11.2°
              </text>

              {/* 3. NO-GO SCARP / CLIFF FACES (>15° Crimson) */}
              {/* Western Neretva Scarp */}
              <path
                d="M 320 360 C 350 330, 370 300, 390 260 L 420 270 C 390 320, 370 350, 340 380 Z"
                fill="rgba(239, 68, 68, 0.35)"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <text x="320" y="320" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
                NO-GO SCARP (18°)
              </text>

              {/* Eastern Carbonate Dropoff */}
              <path
                d="M 760 180 C 810 140, 850 110, 900 80 L 920 95 C 870 130, 830 160, 780 200 Z"
                fill="rgba(239, 68, 68, 0.4)"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <text x="820" y="115" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
                NO-GO CLIFF (18.5°)
              </text>
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 4: ATMOSPHERIC & DUST DYNAMICS (MEDA)              */}
          {/* ======================================================== */}
          {activeLayers.atmospheric && (
            <g id="layer-atmospheric">
              {/* Animated Wind Particle Streamlines (blowing NW ~315°) */}
              {[...Array(16)].map((_, i) => {
                const startX = ((i * 70 + windOffset * 4) % (SVG_WIDTH + 200)) - 100;
                const startY = ((i * 50 + windOffset * 3) % (SVG_HEIGHT + 200)) - 50;
                const endX = startX - 90;
                const endY = startY - 70;
                return (
                  <line
                    key={i}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="rgba(245, 158, 11, 0.45)"
                    strokeWidth="1.5"
                    strokeDasharray="10 20"
                    markerEnd="url(#windArrow)"
                  />
                );
              })}

              {/* Dust Opacity Overlay Wash */}
              <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="rgba(217, 119, 6, 0.08)" />

              {/* MEDA In-Situ Sensor Readout Badge on Map */}
              <g transform="translate(40, 60)">
                <rect width="180" height="75" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="1" />
                <text x="12" y="22" fill="#F59E0B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  MEDA ATMOSPHERIC SENSORS
                </text>
                <text x="12" y="38" fill="#CBD5E1" fontSize="10" fontFamily="monospace">
                  WIND: 12.4 m/s (NW • 315°)
                </text>
                <text x="12" y="52" fill="#CBD5E1" fontSize="10" fontFamily="monospace">
                  TEMP: -48.2°C | PRES: 725 Pa
                </text>
                <text x="12" y="66" fill="#F59E0B" fontSize="10" fontFamily="monospace">
                  DUST OPACITY: τ = 0.44
                </text>
              </g>
            </g>
          )}

          {/* ======================================================== */}
          {/* LAYER 5: SPACE WEATHER & RADIATION (RAD / MAVEN)         */}
          {/* ======================================================== */}
          {activeLayers.radiation && (
            <g id="layer-radiation">
              {/* Baseline GCR Ambient Heatmap */}
              <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="rgba(239, 68, 68, 0.06)" />

              {/* If SEP Alert Active: Emergency Solar Energetic Particle Overlay */}
              {sepAlertActive && (
                <g>
                  {/* High Dose Storm Flashes */}
                  <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="rgba(239, 68, 68, 0.18)" className="animate-pulse" />

                  {/* Pulsing Emergency Warning Grid over Unshielded Plains */}
                  <circle cx="500" cy="375" r="450" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="12 8" className="animate-pulse-ring" />

                  {/* Emergency Evacuation Vector to WP-02 Terrain Overhang Shelter */}
                  <line
                    x1={mappedWaypoints[3].x}
                    y1={mappedWaypoints[3].y}
                    x2={mappedWaypoints[1].x}
                    y2={mappedWaypoints[1].y}
                    stroke="#EF4444"
                    strokeWidth="3.5"
                    strokeDasharray="8 4"
                  />
                  <polygon
                    points={`${mappedWaypoints[1].x},${mappedWaypoints[1].y} ${mappedWaypoints[1].x + 15},${mappedWaypoints[1].y - 8} ${mappedWaypoints[1].x + 15},${mappedWaypoints[1].y + 8}`}
                    fill="#EF4444"
                  />

                  {/* Highlight Shelter Safe Haven Zone */}
                  <circle
                    cx={mappedWaypoints[1].x}
                    cy={mappedWaypoints[1].y}
                    r="45"
                    fill="rgba(16, 185, 129, 0.3)"
                    stroke="#10B981"
                    strokeWidth="3"
                  />
                  <text
                    x={mappedWaypoints[1].x - 85}
                    y={mappedWaypoints[1].y + 60}
                    fill="#10B981"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ★ PRIMARY SEP SHELTER (68% GCR SHIELD)
                  </text>
                </g>
              )}

              {/* RAD Dosimeter HUD Overlay */}
              <g transform="translate(40, 150)">
                <rect
                  width="180"
                  height="65"
                  rx="8"
                  fill="rgba(15, 23, 42, 0.9)"
                  stroke={sepAlertActive ? '#EF4444' : 'rgba(239, 68, 68, 0.6)'}
                  strokeWidth="1.5"
                />
                <text x="12" y="20" fill="#EF4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  RAD / MAVEN DOSIMETER
                </text>
                <text x="12" y="36" fill={sepAlertActive ? '#FCA5A5' : '#CBD5E1'} fontSize="10" fontFamily="monospace">
                  STATUS: {sepAlertActive ? 'SEP STORM EVENT!' : 'GCR BACKGROUND'}
                </text>
                <text x="12" y="52" fill={sepAlertActive ? '#EF4444' : '#10B981'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                  DOSE: {sepAlertActive ? '48.5 mSv/hr [LETHAL]' : '0.64 mSv/day [NORMAL]'}
                </text>
              </g>
            </g>
          )}

          {/* ======================================================== */}
          {/* TRAVERSE ROUTES: ROUTE A & ROUTE B                       */}
          {/* ======================================================== */}
          {/* Route B (Safe Low-Slope Contingency) */}
          <path
            d={routeBPath}
            fill="none"
            stroke={selectedRouteId === 'route_b' ? '#10B981' : 'rgba(16, 185, 129, 0.3)'}
            strokeWidth={selectedRouteId === 'route_b' ? '4' : '2'}
            strokeDasharray={selectedRouteId === 'route_b' ? '8 4' : '4 4'}
            filter={selectedRouteId === 'route_b' ? 'url(#routeGlowEmerald)' : undefined}
          />

          {/* Route A (Primary Science Traverse) */}
          <path
            d={routeAPath}
            fill="none"
            stroke={selectedRouteId === 'route_a' ? '#06B6D4' : 'rgba(6, 182, 212, 0.3)'}
            strokeWidth={selectedRouteId === 'route_a' ? '4' : '2'}
            strokeDasharray={selectedRouteId === 'route_a' ? 'none' : '4 4'}
            filter={selectedRouteId === 'route_a' ? 'url(#routeGlowCyan)' : undefined}
          />

          {/* Route Distance Markers & Labels */}
          {selectedRouteId === 'route_a' && (
            <g fontFamily="monospace" fontSize="9" fill="#06B6D4" fontWeight="bold">
              <rect x="290" y="445" width="48" height="16" rx="4" fill="#0B1120" stroke="#06B6D4" strokeWidth="0.8" />
              <text x="296" y="456">0.4 km</text>

              <rect x="440" y="335" width="48" height="16" rx="4" fill="#0B1120" stroke="#06B6D4" strokeWidth="0.8" />
              <text x="446" y="346">0.9 km</text>

              <rect x="575" y="245" width="48" height="16" rx="4" fill="#0B1120" stroke="#06B6D4" strokeWidth="0.8" />
              <text x="581" y="256">1.3 km</text>

              <rect x="685" y="145" width="48" height="16" rx="4" fill="#0B1120" stroke="#06B6D4" strokeWidth="0.8" />
              <text x="691" y="156">1.65 km</text>
            </g>
          )}

          {/* ======================================================== */}
          {/* SIMULATED CREW & ROVER TACTICAL TOKENS                   */}
          {/* ======================================================== */}
          {/* Crew positioned near active waypoint or between WP-03 & WP-04 */}
          <g transform={`translate(${mappedWaypoints[3].x - 40}, ${mappedWaypoints[3].y + 20})`}>
            {/* Lead Astronaut EVA-1 */}
            <circle cx="0" cy="0" r="7" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="2" />
            <text x="-4" y="3" fill="#000000" fontSize="8" fontWeight="bold">1</text>
            <text x="-16" y="-10" fill="#06B6D4" fontSize="8" fontFamily="monospace" fontWeight="bold">EVA-1</text>

            {/* Safety Specialist EVA-2 */}
            <circle cx="16" cy="6" r="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
            <text x="12" y="9" fill="#000000" fontSize="8" fontWeight="bold">2</text>
            <text x="8" y="22" fill="#F59E0B" fontSize="8" fontFamily="monospace" fontWeight="bold">EVA-2</text>

            {/* Autonomous Carrier Mule */}
            <rect x="-18" y="12" width="12" height="12" rx="2" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="-14" y="21" fill="#000000" fontSize="7" fontWeight="bold">M</text>
            <text x="-38" y="33" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="bold">MULE-01</text>
          </g>

          {/* ======================================================== */}
          {/* 5 VERIFIED CLICKABLE WAYPOINTS                           */}
          {/* ======================================================== */}
          {mappedWaypoints.map((wp) => {
            const isSelected = selectedWaypointId === wp.id;
            const isHovered = hoveredWaypoint === wp.id;
            const isPrimary = wp.isPrimaryTarget;

            return (
              <g
                key={wp.id}
                transform={`translate(${wp.x}, ${wp.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectWaypoint(wp.id);
                }}
                onMouseEnter={() => setHoveredWaypoint(wp.id)}
                onMouseLeave={() => setHoveredWaypoint(null)}
                className="cursor-pointer group"
              >
                {/* Target Pulsing Halo for Primary Site (Cheyava Falls) */}
                {isPrimary && (
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#C084FC" strokeWidth="1.5" className="animate-ping" opacity="0.7" />
                )}

                {/* Selection Halo */}
                {isSelected && (
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 2" />
                )}

                {/* Outer Marker Pin */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? '15' : '12'}
                  fill={isPrimary ? '#9333EA' : isSelected ? '#0891B2' : '#0F172A'}
                  stroke={
                    wp.hazardLevel === 'DANGER' ? '#EF4444' :
                    wp.hazardLevel === 'CAUTION' ? '#F59E0B' :
                    '#10B981'
                  }
                  strokeWidth={isSelected ? '3' : '2'}
                  className="transition-all duration-200"
                />

                {/* Waypoint ID text inside pin */}
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize={isSelected ? '10' : '9'}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {wp.id.replace('WP-', '')}
                </text>

                {/* Waypoint Name Label Tag */}
                <g transform="translate(0, -22)">
                  <rect
                    x="-60"
                    y="-12"
                    width="120"
                    height="20"
                    rx="4"
                    fill="rgba(15, 23, 42, 0.92)"
                    stroke={isSelected ? '#06B6D4' : 'rgba(255, 255, 255, 0.2)'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="2"
                    textAnchor="middle"
                    fill={isSelected ? '#38BDF8' : '#F8FAFC'}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {wp.id}: {wp.name.split(' ')[0]}
                  </text>
                </g>

                {/* Elevation & Slope Tag */}
                <g transform="translate(0, 24)">
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {wp.elevation}m • {wp.slopeAngle}°
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Scale Bar Overlay (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-slate-950/85 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur-md font-mono text-[11px] text-slate-300">
          <div className="flex items-center justify-between mb-1 text-[10px] text-slate-400">
            <span>0 m</span>
            <span>250 m</span>
            <span>500 m</span>
          </div>
          <div
            className="h-2 bg-gradient-to-r from-cyan-500 via-slate-400 to-amber-500 border border-slate-700 rounded-sm relative"
            style={{ width: `${Math.min(scaleBarWidthPx, 260)}px` }}
          >
            <div className="absolute -top-1 left-0 w-0.5 h-4 bg-white"></div>
            <div className="absolute -top-1 left-1/2 w-0.5 h-4 bg-white"></div>
            <div className="absolute -top-1 right-0 w-0.5 h-4 bg-white"></div>
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>SCALE: 1:5,000</span>
            <span className="text-cyan-400">ZOOM: {Math.round(zoom * 100)}%</span>
          </div>
        </div>

        {/* Slope Hazard Legend (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none bg-slate-950/85 border border-slate-800/90 rounded-lg p-2.5 backdrop-blur-md font-mono text-[11px] text-slate-300 hidden md:block">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <AlertOctagon className="w-3 h-3 text-amber-400" />
            <span>Suit Mobility Slope Thresholds</span>
          </div>
          <div className="flex items-center space-x-3 text-[10px]">
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>&lt;10° SAFE</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>10°–15° CAUTION (ROVER)</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>&gt;15° NO-GO SCARP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
