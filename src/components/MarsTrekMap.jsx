import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  VERIFIED_TARGETS, 
  NASA_TILE_LAYERS, 
  MARS_CONSTANTS,
  calculateMarsDistanceMeters 
} from '../data/marsDossierData';

export default function MarsTrekMap({
  layerOpacities,
  activeTargetId,
  onSelectTarget,
  activeSortie,
  customWaypoints,
  onAddCustomWaypoint,
  isPlacingWaypoint,
  sepAlertActive
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayersRef = useRef({});
  const markersRef = useRef({});
  const customMarkersRef = useRef([]);
  const traverseLineRef = useRef(null);
  const shelterLayerRef = useRef(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Neretva & Bright Angel micro-area (18.4968, 77.3045) at high zoom 16
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

    // 1. Max-Res HiRISE + CTX Mosaic (~0.25–1 m/px native)
    const hiriseLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/NES_JEZ_MID_Visible_Mosaic_HiRISE_CTX_HRSC_GCS_MARS_07-10-2018/1.0.0/default/default028mm/{z}/{y}/{x}.png',
      {
        attribution: 'NASA / JPL / MSSS / UofA / Mars Trek',
        opacity: layerOpacities.hirise_maxres ?? 1.0,
        maxNativeZoom: 19,
        maxZoom: 20,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="transparent"></svg>'
      }
    ).addTo(map);

    // 2. Viking MDIM 2.1 Color Mosaic (232 m/px)
    const vikingLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      {
        attribution: 'NASA / JPL / USGS',
        opacity: layerOpacities.viking_global ?? 0.35,
        maxNativeZoom: 8,
        maxZoom: 20,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="%23E2E8F0"></svg>'
      }
    ).addTo(map);

    // 3. MOLA Topographic DEM & Colorized Hillshade (463 m/px)
    const molaLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      {
        attribution: 'NASA / GSFC / MOLA Team',
        opacity: layerOpacities.mola_topo ?? 0.30,
        maxNativeZoom: 8,
        maxZoom: 20,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="transparent"></svg>'
      }
    ).addTo(map);

    // 4. THEMIS-IR Day Global Mosaic (100 m/px)
    const themisLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MO_THEMIS-IR-Day_mosaic_global_100m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      {
        attribution: 'NASA / JPL / ASU',
        opacity: layerOpacities.themis_day_ir ?? 0.25,
        maxNativeZoom: 9,
        maxZoom: 20,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="transparent"></svg>'
      }
    ).addTo(map);

    tileLayersRef.current = {
      hirise_maxres: hiriseLayer,
      viking_global: vikingLayer,
      mola_topo: molaLayer,
      themis_day_ir: themisLayer
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

  // Update Tile Layer Opacities
  useEffect(() => {
    if (!tileLayersRef.current) return;
    Object.keys(layerOpacities).forEach((layerKey) => {
      const layer = tileLayersRef.current[layerKey];
      if (layer) {
        layer.setOpacity(layerOpacities[layerKey]);
      }
    });
  }, [layerOpacities]);

  // Update 9 Verified Target Markers (T1-T9)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old target markers
    Object.values(markersRef.current).forEach(marker => map.removeLayer(marker));
    markersRef.current = {};

    VERIFIED_TARGETS.forEach((target) => {
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

  // Update Custom Placed Waypoints
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old custom markers
    customMarkersRef.current.forEach(m => map.removeLayer(m));
    customMarkersRef.current = [];

    customWaypoints.forEach((wp, index) => {
      const customIcon = L.divIcon({
        className: 'custom-wp-pin',
        html: `
          <div style="display:flex; align-items:center; justify-content:center; width:22px; height:22px; background:#1D4ED8; color:#FFFFFF; border:2px solid #FFFFFF; border-radius:50%; font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; box-shadow:0 2px 6px rgba(0,0,0,0.3);">
            ${index + 1}
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const m = L.marker([wp.lat, wp.lng], { icon: customIcon, zIndexOffset: 450 }).addTo(map);
      customMarkersRef.current.push(m);
    });
  }, [customWaypoints]);

  // Render Active Sortie Traverse Polyline & Elevation Line
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (traverseLineRef.current) {
      map.removeLayer(traverseLineRef.current);
      traverseLineRef.current = null;
    }

    // Determine coordinates based on activeSortie or customWaypoints
    let routeCoords = [];
    let isReference = false;

    if (customWaypoints && customWaypoints.length > 0) {
      // Connect custom waypoints
      routeCoords = customWaypoints.map(wp => [wp.lat, wp.lng]);
    } else if (activeSortie) {
      isReference = Boolean(activeSortie.isReferenceOnly);
      routeCoords = activeSortie.targetIds.map(tId => {
        const t = VERIFIED_TARGETS.find(target => target.id === tId);
        return t ? [t.lat, t.lng] : null;
      }).filter(Boolean);
    }

    if (routeCoords.length >= 2) {
      const polyline = L.polyline(routeCoords, {
        color: isReference ? '#64748B' : '#C2410C',
        weight: isReference ? 2.5 : 4,
        dashArray: isReference ? '6, 6' : '8, 4',
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      traverseLineRef.current = polyline;
    }
  }, [activeSortie, customWaypoints]);

  // Handle Sortie Zoom / Center changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeSortie) return;

    map.flyTo(activeSortie.center, activeSortie.zoom, {
      duration: 1.2
    });
  }, [activeSortie]);

  // Handle Target Selection FlyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeTargetId) return;

    const target = VERIFIED_TARGETS.find(t => t.id === activeTargetId);
    if (target) {
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 16), {
        duration: 1.0
      });
    }
  }, [activeTargetId]);

  // SEP Alert Safe Shelters (T6 Neretva Overhang & T7 Bright Angel)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (shelterLayerRef.current) {
      map.removeLayer(shelterLayerRef.current);
      shelterLayerRef.current = null;
    }

    if (sepAlertActive) {
      const group = L.layerGroup();

      // Highlight T6 and T7 as nearest terrain shielding
      const shelterTargets = [VERIFIED_TARGETS[5], VERIFIED_TARGETS[6]];
      shelterTargets.forEach(t => {
        const circle = L.circle([t.lat, t.lng], {
          radius: 120,
          color: '#047857',
          fillColor: '#10B981',
          fillOpacity: 0.35,
          weight: 2,
          dashArray: '4, 4'
        });

        const label = L.marker([t.lat, t.lng], {
          icon: L.divIcon({
            className: 'shelter-pin',
            html: `<div style="background:#047857; color:#FFFFFF; padding:2px 6px; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:700; white-space:nowrap; box-shadow:0 2px 5px rgba(0,0,0,0.2);">★ PRIMARY SHELTER ALCOVE</div>`,
            iconAnchor: [60, -22]
          })
        });

        group.addLayer(circle);
        group.addLayer(label);
      });

      group.addTo(map);
      shelterLayerRef.current = group;
    }
  }, [sepAlertActive]);

  return (
    <div className="relative w-full h-full bg-[#E2E8F0] overflow-hidden select-none">
      <div 
        ref={mapContainerRef} 
        className={`w-full h-full z-0 ${isPlacingWaypoint ? 'cursor-crosshair' : ''}`} 
      />

      {/* Crosshair Overlay Notice if Placing Custom Waypoints */}
      {isPlacingWaypoint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-blue-700 text-white px-3.5 py-1.5 rounded-full shadow-lg font-mono text-xs flex items-center space-x-2 animate-bounce-short">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>CLICK ANYWHERE ON HiRISE SATELLITE TILES TO DROP EVA WAYPOINT</span>
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
