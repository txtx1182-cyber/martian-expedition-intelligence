import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  VERIFIED_TARGETS, 
  PRESET_SORTIES, 
  FULL_TRAVERSE_TRACK,
  CRISM_MINERAL_POLYGONS,
  SLOPE_HAZARD_ZONES,
  NASA_TILE_LAYERS, 
  MARS_CONSTANTS,
  calculateMarsDistanceMeters 
} from '../data/marsDossierData';

export default function MarsTrekMap({
  activeMapMode, // 'OPTICAL', 'THEMIS_IR', 'MOLA_ELEVATION', 'CRISM_SPECTRAL', 'HAZARDS'
  layerOpacities,
  activeTargetId,
  onSelectTarget,
  activeSortieId,
  onSelectSortie,
  customWaypoints,
  onAddCustomWaypoint,
  isPlacingWaypoint,
  sepAlertActive,
  onHoverElevationPoint,
  hoveredTraversePoint
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const canvasLayerRef = useRef(null);
  const tileLayersRef = useRef({});
  const markersRef = useRef({});
  const customMarkersRef = useRef([]);
  const fullTraversePolylineRef = useRef(null);
  const sortiePolylineRef = useRef(null);
  const sortieDetailLayerRef = useRef(null);
  const crismPolygonsRef = useRef(null);
  const hazardPolygonsRef = useRef(null);
  const hoverMarkerRef = useRef(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default focus: Neretva & Bright Angel (18.4968°N, 77.3045°E) at zoom 16
    const initialCenter = [18.4968, 77.3045];
    const initialZoom = 16;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 5,
      maxZoom: 20,
      zoomControl: false,
      attributionControl: true
    });

    // Custom Scale bar in meters
    L.control.scale({
      metric: true,
      imperial: false,
      position: 'bottomleft',
      maxWidth: 180
    }).addTo(map);

    // Zoom control in top right
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // ========================================================
    // OPTION B: CUSTOM PROCEDURAL SATELLITE & TERRAIN CANVAS SHADER
    // GUARANTEES ZERO BLANK WHITE/GRAY TILES AT ANY ZOOM LEVEL
    // ========================================================
    const TerrainCanvasLayer = L.GridLayer.extend({
      createTile: function (coords, done) {
        const tile = document.createElement('canvas');
        tile.width = 256;
        tile.height = 256;
        const ctx = tile.getContext('2d');

        // Calculate tile geographic bounds
        const nwPoint = coords.scaleBy(new L.Point(256, 256));
        const sePoint = nwPoint.add(new L.Point(256, 256));
        const nw = map.unproject(nwPoint, coords.z);
        const se = map.unproject(sePoint, coords.z);

        const currentMode = this.options.mapMode || 'OPTICAL';

        // Render base color & Martian relief texture
        renderProceduralMarsTile(ctx, nw, se, coords.z, currentMode);

        setTimeout(() => done(null, tile), 0);
        return tile;
      }
    });

    const canvasTerrainLayer = new TerrainCanvasLayer({
      mapMode: activeMapMode,
      zIndex: 1
    }).addTo(map);

    canvasLayerRef.current = canvasTerrainLayer;

    // Optional online NASA Mars Trek satellite layers on top with opacity
    const hiriseLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/NES_JEZ_MID_Visible_Mosaic_HiRISE_CTX_HRSC_GCS_MARS_07-10-2018/1.0.0/default/default028mm/{z}/{y}/{x}.png',
      {
        attribution: 'NASA / JPL / MSSS / UofA / Mars Trek',
        opacity: layerOpacities.hirise_maxres ?? 0.85,
        maxNativeZoom: 19,
        maxZoom: 20,
        zIndex: 2,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="transparent"></svg>'
      }
    ).addTo(map);

    tileLayersRef.current = {
      hirise_maxres: hiriseLayer
    };

    // Click handler for dropping custom meter-scale waypoints
    map.on('click', (e) => {
      if (onAddCustomWaypoint) {
        onAddCustomWaypoint({
          lat: Number(e.latlng.lat.toFixed(5)),
          lng: Number(e.latlng.lng.toFixed(5))
        });
      }
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Active Map Mode to Canvas Shader
  useEffect(() => {
    if (!canvasLayerRef.current) return;
    canvasLayerRef.current.options.mapMode = activeMapMode;
    canvasLayerRef.current.redraw();
  }, [activeMapMode]);

  // Sync Opacities
  useEffect(() => {
    if (!tileLayersRef.current) return;
    Object.keys(layerOpacities).forEach((key) => {
      if (tileLayersRef.current[key]) {
        tileLayersRef.current[key].setOpacity(layerOpacities[key]);
      }
    });
  }, [layerOpacities]);

  // ========================================================
  // RENDER FULL PERSEVERANCE TRAVERSE TRACK (T1 -> T9)
  // Colored by elevation: -2586m (Blue) -> -1820m (Orange/Red)
  // ========================================================
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (fullTraversePolylineRef.current) {
      map.removeLayer(fullTraversePolylineRef.current);
      fullTraversePolylineRef.current = null;
    }

    const group = L.layerGroup();

    // Create segments with elevation gradient coloring
    for (let i = 0; i < FULL_TRAVERSE_TRACK.length - 1; i++) {
      const p1 = FULL_TRAVERSE_TRACK[i];
      const p2 = FULL_TRAVERSE_TRACK[i + 1];

      // Elevation to color: -2600 (deep blue) -> -1800 (crimson)
      const avgElev = (p1.elevation + p2.elevation) / 2;
      const t = Math.max(0, Math.min(1, (avgElev - (-2600)) / 800));
      const segmentColor = getElevationColor(t);

      const segment = L.polyline([[p1.lat, p1.lng], [p2.lat, p2.lng]], {
        color: segmentColor,
        weight: 3.5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round'
      });

      // Segment tooltip on hover
      segment.bindTooltip(`
        <div style="font-family:'JetBrains Mono',monospace; font-size:10px;">
          <strong>${p1.name} → ${p2.name}</strong><br/>
          Elev: ${avgElev.toFixed(1)}m | Dist: ${p2.distKm} km
        </div>
      `);

      group.addLayer(segment);
    }

    // Add distance tick markers at major milestones (e.g. 5km, 10km, 20km, 30km, 40km)
    FULL_TRAVERSE_TRACK.forEach((p) => {
      if (p.distKm === 0 || p.distKm === 12.4 || p.distKm === 24.8 || p.distKm === 33.6 || p.distKm === 42.1) {
        const tickIcon = L.divIcon({
          className: 'dist-tick',
          html: `<div style="background:#0F172A; color:#FFFFFF; padding:1px 4px; border-radius:3px; font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700; white-space:nowrap; border:1px solid #CBD5E1;">${p.distKm}km</div>`,
          iconAnchor: [16, -10]
        });
        const m = L.marker([p.lat, p.lng], { icon: tickIcon, zIndexOffset: 150 });
        group.addLayer(m);
      }
    });

    group.addTo(map);
    fullTraversePolylineRef.current = group;
  }, []);

  // ========================================================
  // ACTIVE SORTIE 1 MICRO-EVA (T6 NERETVA -> T7 BRIGHT ANGEL)
  // High-visibility glowing astronaut path, 50m ticks, 100m rover offset
  // ========================================================
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (sortiePolylineRef.current) {
      map.removeLayer(sortiePolylineRef.current);
      sortiePolylineRef.current = null;
    }
    if (sortieDetailLayerRef.current) {
      map.removeLayer(sortieDetailLayerRef.current);
      sortieDetailLayerRef.current = null;
    }

    if (activeSortieId === 'sortie-1') {
      const group = L.layerGroup();

      const t6 = VERIFIED_TARGETS[5]; // Neretva
      const t7 = VERIFIED_TARGETS[6]; // Bright Angel / Cheyava Falls

      // Micro-EVA path with intermediate terrain waypoints
      const sortie1Path = [
        [t6.lat, t6.lng],
        [18.4965, 77.3042],
        [18.4969, 77.3047],
        [t7.lat, t7.lng]
      ];

      // Outer glow polyline
      const glowLine = L.polyline(sortie1Path, {
        color: '#10B981',
        weight: 8,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      });

      // Core crisp path
      const coreLine = L.polyline(sortie1Path, {
        color: '#047857',
        weight: 3.5,
        dashArray: '6, 4',
        opacity: 0.95
      });

      group.addLayer(glowLine);
      group.addLayer(coreLine);

      // 50m Distance tick markers
      const ticks = [
        { lat: 18.4963, lng: 77.3040, label: "50m" },
        { lat: 18.4967, lng: 77.3044, label: "100m" },
        { lat: 18.4971, lng: 77.3048, label: "150m" },
        { lat: 18.4973, lng: 77.3050, label: "200m" }
      ];

      ticks.forEach(tick => {
        const tickMarker = L.marker([tick.lat, tick.lng], {
          icon: L.divIcon({
            className: 'meter-tick',
            html: `<div style="background:#047857; color:#FFFFFF; padding:1px 3px; border-radius:2px; font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700;">${tick.label}</div>`,
            iconAnchor: [12, 6]
          }),
          zIndexOffset: 300
        });
        group.addLayer(tickMarker);
      });

      // 100m Offset Circle around Sol 1196 Rover Localization for Cheyava Falls
      const roverOffsetCircle = L.circle([t7.lat, t7.lng], {
        radius: 100,
        color: '#D97706',
        fillColor: '#F59E0B',
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: '5, 5'
      });

      const offsetLabel = L.marker([t7.lat + 0.0006, t7.lng], {
        icon: L.divIcon({
          className: 'rover-offset-label',
          html: `<div style="background:#FFFFFF; color:#B45309; border:1px solid #D97706; padding:2px 6px; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:8.5px; font-weight:700; white-space:nowrap; box-shadow:0 1px 4px rgba(0,0,0,0.1);">~100m Sol 1196 Rover Offset Boundary</div>`,
          iconAnchor: [90, 10]
        })
      });

      group.addLayer(roverOffsetCircle);
      group.addLayer(offsetLabel);

      group.addTo(map);
      sortieDetailLayerRef.current = group;
    }
  }, [activeSortieId]);

  // ========================================================
  // CRISM MINERALOGY & SLOPE HAZARD POLYGONS
  // ========================================================
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // CRISM Spectral Layer
    if (crismPolygonsRef.current) {
      map.removeLayer(crismPolygonsRef.current);
      crismPolygonsRef.current = null;
    }

    if (activeMapMode === 'CRISM_SPECTRAL') {
      const crismGroup = L.layerGroup();
      CRISM_MINERAL_POLYGONS.forEach(poly => {
        const polygon = L.polygon(poly.coords, {
          color: poly.color,
          fillColor: poly.fillColor,
          fillOpacity: poly.fillOpacity,
          weight: poly.weight
        });

        polygon.bindTooltip(`
          <div style="font-family:'Space Grotesk',sans-serif; font-size:11px;">
            <strong style="color:${poly.color}">${poly.name}</strong><br/>
            <span style="font-family:'JetBrains Mono',monospace; font-size:9.5px; color:#475569;">${poly.mineral}</span>
          </div>
        `);

        crismGroup.addLayer(polygon);
      });
      crismGroup.addTo(map);
      crismPolygonsRef.current = crismGroup;
    }

    // Slope Hazard Layer
    if (hazardPolygonsRef.current) {
      map.removeLayer(hazardPolygonsRef.current);
      hazardPolygonsRef.current = null;
    }

    if (activeMapMode === 'HAZARDS') {
      const hazardGroup = L.layerGroup();
      SLOPE_HAZARD_ZONES.forEach(hz => {
        const poly = L.polygon(hz.coords, {
          color: hz.color,
          fillColor: hz.fillColor,
          fillOpacity: hz.fillOpacity,
          weight: 2,
          dashArray: '4, 4'
        });
        poly.bindTooltip(`
          <div style="font-family:'Space Grotesk',sans-serif; font-size:11px; color:#DC2626;">
            <strong>⚠ ${hz.name}</strong><br/>
            <span style="font-family:'JetBrains Mono',monospace; font-size:9px;">No-go for bipedal spacesuits</span>
          </div>
        `);
        hazardGroup.addLayer(poly);
      });
      hazardGroup.addTo(map);
      hazardPolygonsRef.current = hazardGroup;
    }
  }, [activeMapMode]);

  // ========================================================
  // RENDER 9 VERIFIED TARGET MARKERS (T1–T9)
  // ========================================================
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    VERIFIED_TARGETS.forEach(target => {
      const isSelected = activeTargetId === target.id;
      const isBrightAngel = target.id === 'T7';
      const isExtended = target.isExtended;

      const markerHtml = `
        <div style="display:flex; flex-direction:column; align-items:center; cursor:pointer;" class="group">
          ${isBrightAngel ? `
            <div style="position:absolute; top:-6px; width:46px; height:46px; border:2px dashed #C2410C; border-radius:50%; animation:spin 12s linear infinite; pointer-events:none;"></div>
          ` : ''}
          <div style="
            display:flex; align-items:center; gap:6px;
            background:${isSelected ? '#0F172A' : '#FFFFFF'};
            color:${isSelected ? '#FFFFFF' : '#0F172A'};
            padding:3.5px 8px;
            border-radius:20px;
            border:1.5px solid ${isSelected ? '#C2410C' : isBrightAngel ? '#C2410C' : isExtended ? '#94A3B8' : '#CBD5E1'};
            box-shadow:0 3px 10px rgba(15,23,42,0.12);
            font-family:'Space Grotesk',sans-serif;
            font-size:11px;
            font-weight:700;
            white-space:nowrap;
            transition:all 0.15s;
          ">
            <span style="
              display:inline-flex; align-items:center; justify-content:center;
              width:18px; height:18px; border-radius:50%;
              background:${isSelected ? '#C2410C' : isBrightAngel ? '#C2410C' : isExtended ? '#E2E8F0' : '#0F172A'};
              color:${isSelected || isBrightAngel ? '#FFFFFF' : isExtended ? '#475569' : '#FFFFFF'};
              font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:700;
            ">${target.num}</span>
            <span>${target.shortName}</span>
          </div>
          <div style="
            background:${isSelected ? '#C2410C' : '#475569'};
            color:#FFFFFF;
            font-family:'JetBrains Mono',monospace;
            font-size:9px;
            font-weight:600;
            padding:1px 5px;
            border-radius:3px;
            margin-top:2px;
            box-shadow:0 1px 3px rgba(0,0,0,0.2);
          ">${target.elevation}m</div>
        </div>
      `;

      const icon = L.divIcon({
        className: `target-marker-${target.id}`,
        html: markerHtml,
        iconSize: [170, 50],
        iconAnchor: [85, 25]
      });

      const marker = L.marker([target.lat, target.lng], {
        icon,
        zIndexOffset: isSelected ? 600 : isBrightAngel ? 500 : 200
      }).addTo(map);

      marker.on('click', () => {
        onSelectTarget(target.id);
      });

      markersRef.current[target.id] = marker;
    });
  }, [activeTargetId, onSelectTarget]);

  // Live Hover Cursor from Elevation Profile Drawer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (hoverMarkerRef.current) {
      map.removeLayer(hoverMarkerRef.current);
      hoverMarkerRef.current = null;
    }

    if (hoveredTraversePoint) {
      const hoverIcon = L.divIcon({
        className: 'hover-pos-marker',
        html: `
          <div style="display:flex; align-items:center; justify-content:center; width:16px; height:16px; background:#C2410C; border:2.5px solid #FFFFFF; border-radius:50%; box-shadow:0 0 10px #C2410C; animation:ping 1s cubic-bezier(0,0,0.2,1) infinite;"></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const m = L.marker([hoveredTraversePoint.lat, hoveredTraversePoint.lng], {
        icon: hoverIcon,
        zIndexOffset: 1000
      }).addTo(map);

      hoverMarkerRef.current = m;
    }
  }, [hoveredTraversePoint]);

  // Handle Sortie FlyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeSortieId) return;

    const sortie = PRESET_SORTIES.find(s => s.id === activeSortieId);
    if (sortie) {
      map.flyTo(sortie.center, sortie.zoom, { duration: 1.2 });
    }
  }, [activeSortieId]);

  // Handle Target Selection FlyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeTargetId) return;

    const target = VERIFIED_TARGETS.find(t => t.id === activeTargetId);
    if (target) {
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 16), { duration: 1.0 });
    }
  }, [activeTargetId]);

  return (
    <div className="relative w-full h-full bg-[#E2E8F0] overflow-hidden select-none">
      <div 
        ref={mapContainerRef} 
        className={`w-full h-full z-0 ${isPlacingWaypoint ? 'cursor-crosshair' : ''}`} 
      />

      {/* Crosshair Banner when placing custom waypoints */}
      {isPlacingWaypoint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-cobalt-700 text-white px-3.5 py-1.5 rounded-full shadow-lg font-mono text-xs flex items-center space-x-2 animate-bounce-short">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>CLICK ANYWHERE ON HiRISE SATELLITE TILES TO DROP CUSTOM WAYPOINT</span>
        </div>
      )}

      {/* Coordinate Reference System (CRS) Guardrail Badge in Map Footer */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-white/95 border border-slate-300 px-3 py-1 rounded shadow-subtle backdrop-blur-md text-slate-700 font-mono text-[10px] flex items-center space-x-2 text-center max-w-[95vw] truncate">
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta-600 shrink-0"></span>
        <span className="truncate">{MARS_CONSTANTS.CRS_GUARDRAIL_NOTE}</span>
      </div>
    </div>
  );
}

// ========================================================
// PROCEDURAL MARS CANVAS SHADER
// Renders rich terrain relief so map NEVER shows blank white/gray
// ========================================================
function renderProceduralMarsTile(ctx, nw, se, zoom, mode) {
  const width = 256;
  const height = 256;

  // Center of Jezero Crater is roughly (18.45°N, 77.40°E)
  const jezeroLat = 18.45;
  const jezeroLng = 77.40;
  const tileMidLat = (nw.lat + se.lat) / 2;
  const tileMidLng = (nw.lng + se.lng) / 2;

  // Approximate distance from crater center
  const dLat = (tileMidLat - jezeroLat);
  const dLng = (tileMidLng - jezeroLng);
  const distFromCenter = Math.sqrt(dLat * dLat + dLng * dLng);

  // Elevation estimation: Crater floor (-2560m) inside < 0.25 deg, rising to rim (-1800m) at > 0.35 deg
  let elev = -2570 + Math.min(800, Math.pow(distFromCenter / 0.35, 2) * 750);
  // Add localized relief variation
  elev += Math.sin(tileMidLat * 400) * 8 + Math.cos(tileMidLng * 400) * 8;

  // 1. OPTICAL MODE: Martian Ochre & Basaltic Floor
  if (mode === 'OPTICAL') {
    // Base ochre background
    ctx.fillStyle = '#C87D55';
    ctx.fillRect(0, 0, width, height);

    // Bedrock relief gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(180, 95, 60, 0.4)');
    grad.addColorStop(0.5, 'rgba(140, 70, 40, 0.2)');
    grad.addColorStop(1, 'rgba(90, 45, 25, 0.5)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Dark basalt patches on crater floor
    if (distFromCenter < 0.25) {
      ctx.fillStyle = 'rgba(40, 30, 25, 0.35)';
      ctx.beginPath();
      ctx.arc(width * 0.4, height * 0.6, 90, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bright Angel tan sediment highlight if near (18.497°N, 77.305°E)
    const distToBrightAngel = Math.hypot(tileMidLat - 18.4974, tileMidLng - 77.3051);
    if (distToBrightAngel < 0.05) {
      ctx.fillStyle = 'rgba(235, 205, 160, 0.55)';
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.5, 75, 0, Math.PI * 2);
      ctx.fill();
    }

    // Contours
    renderTileContours(ctx, elev, width, height, 'rgba(255,255,255,0.18)');
  }

  // 2. THEMIS THERMAL INFRARED: False-color thermal inertia
  else if (mode === 'THEMIS_IR') {
    // Low thermal inertia = purple/blue, high thermal inertia = gold/yellow
    const inertia = Math.sin(tileMidLat * 80) * 0.5 + 0.5;
    const r = Math.round(50 + inertia * 190);
    const g = Math.round(20 + inertia * 160);
    const b = Math.round(140 - inertia * 100);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, width, height);
    renderTileContours(ctx, elev, width, height, 'rgba(255,255,255,0.25)');
  }

  // 3. MOLA HYPSOMETRIC ELEVATION: Deep blue (-2586m) to crimson (-1820m)
  else if (mode === 'MOLA_ELEVATION') {
    const t = Math.max(0, Math.min(1, (elev - (-2600)) / 800));
    ctx.fillStyle = getElevationColor(t);
    ctx.fillRect(0, 0, width, height);
    renderTileContours(ctx, elev, width, height, 'rgba(0,0,0,0.25)');
  }

  // 4. CRISM SPECTRAL MINERALOGY
  else if (mode === 'CRISM_SPECTRAL') {
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(0, 0, width, height);
    renderTileContours(ctx, elev, width, height, 'rgba(0,0,0,0.15)');
  }

  // 5. TERRAIN SLOPE HAZARDS
  else if (mode === 'HAZARDS') {
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, width, height);
    // Draw hatched scarp lines if near steep rim
    if (distFromCenter > 0.32) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.fillRect(0, 0, width, height);
    }
  }

  // Add subtle grid mark for high-tech cartographic look
  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
}

// Elevation to Hex Color Ramp (-2600m to -1800m)
function getElevationColor(t) {
  // 0.0 (Deep Blue) -> 0.3 (Cyan/Teal) -> 0.6 (Emerald/Yellow) -> 1.0 (Orange/Crimson)
  if (t < 0.25) {
    return '#1E3A8A'; // Deep Cobalt Blue (-2586m floor)
  } else if (t < 0.50) {
    return '#0284C7'; // Cyan (-2420m Delta Front)
  } else if (t < 0.75) {
    return '#059669'; // Emerald / Olive (-2350m Neretva / Bright Angel)
  } else if (t < 0.90) {
    return '#D97706'; // Gold / Terracotta (-2100m Rim flank)
  } else {
    return '#DC2626'; // Crimson (-1820m Margin Unit & West Rim peak)
  }
}

// Draw subtle 20m contour lines
function renderTileContours(ctx, elev, width, height, strokeColor) {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  const y = (Math.abs(elev) % 20) * (height / 20);
  ctx.moveTo(0, y);
  ctx.bezierCurveTo(width * 0.3, y - 8, width * 0.7, y + 8, width, y);
  ctx.stroke();
}
