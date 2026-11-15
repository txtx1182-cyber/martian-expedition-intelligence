import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  VERIFIED_TARGETS, 
  PRESET_SORTIES, 
  FULL_TRAVERSE_TRACK,
  CRISM_MINERAL_POLYGONS,
  SLOPE_HAZARD_ZONES,
  NASA_TILE_LAYERS,
  calculateMarsDistanceKm
} from '../data/marsDossierData';

export default function MarsTrekMap({
  activeMapMode,
  layerOpacities = {},
  activeTargetId,
  onSelectTarget,
  activeSortieId,
  onSelectSortie,
  customWaypoints = [],
  onAddCustomWaypoint,
  isPlacingWaypoint,
  sepAlertActive,
  hoveredTraversePoint
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayersRef = useRef({});
  const markersRef = useRef({});
  const customMarkersRef = useRef([]);
  const expeditionPolylineRef = useRef(null);
  const crismLayerGroupRef = useRef(null);
  const hazardLayerGroupRef = useRef(null);
  const hoverMarkerRef = useRef(null);

  // Initialize Leaflet Map (Standard Web Mercator EPSG:3857)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered at Greater Jezero Basin [18.45, 77.40] with regional zoom 11
    const map = L.map(mapContainerRef.current, {
      center: [18.45, 77.40],
      zoom: 11,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: false,
      attributionControl: true
    });

    // Metric Scale Bar (km/m)
    L.control.scale({
      metric: true,
      imperial: false,
      position: 'bottomleft',
      maxWidth: 200
    }).addTo(map);

    // Zoom Controls top-right
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // ==========================================================
    // 1. REAL VERIFIED WEB MERCATOR SATELLITE TILE LAYERS
    // ==========================================================
    // Base Optical: OpenPlanetaryMap / CARTO Mars Viking MDIM 2.1
    const opticalLayer = L.tileLayer(
      'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png',
      {
        attribution: '© OpenPlanetaryMap / NASA / JPL / USGS / CARTO',
        maxNativeZoom: 8,
        maxZoom: 14,
        zIndex: 1,
        opacity: layerOpacities.mars_optical ?? 1.0
      }
    ).addTo(map);

    // MOLA Colorized Relief (WhereOnMars AWS S3)
    const molaColorLayer = L.tileLayer(
      'https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png',
      {
        attribution: 'NASA / GSFC / MOLA Team / WhereOnMars',
        tms: true,
        maxNativeZoom: 6,
        maxZoom: 14,
        zIndex: 2,
        opacity: layerOpacities.mola_color ?? 0.65
      }
    ).addTo(map);

    // MOLA Grayscale Hillshade Relief (WhereOnMars AWS S3)
    const molaGrayLayer = L.tileLayer(
      'https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-gray/{z}/{x}/{y}.png',
      {
        attribution: 'NASA / GSFC / MOLA Team / WhereOnMars',
        tms: true,
        maxNativeZoom: 6,
        maxZoom: 14,
        zIndex: 3,
        opacity: layerOpacities.mola_gray ?? 0.50
      }
    ).addTo(map);

    // Celestia 16k Shaded Global Mosaic (WhereOnMars AWS S3)
    const celestiaLayer = L.tileLayer(
      'https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png',
      {
        attribution: 'NASA / JPL / Celestia / WhereOnMars',
        tms: true,
        maxNativeZoom: 5,
        maxZoom: 14,
        zIndex: 4,
        opacity: layerOpacities.celestia_shaded ?? 0.40
      }
    ).addTo(map);

    tileLayersRef.current = {
      mars_optical: opticalLayer,
      mola_color: molaColorLayer,
      mola_gray: molaGrayLayer,
      celestia_shaded: celestiaLayer
    };

    // ==========================================================
    // 2. CRISM SPECTRAL MINERALOGY OVERLAYS
    // ==========================================================
    const crismGroup = L.layerGroup().addTo(map);
    CRISM_MINERAL_POLYGONS.forEach(poly => {
      const polygon = L.polygon(poly.coords, {
        color: poly.color,
        fillColor: poly.fillColor,
        fillOpacity: poly.fillOpacity,
        weight: poly.weight,
        dashArray: '4 4'
      }).addTo(crismGroup);

      polygon.bindTooltip(
        `<div class="p-1 font-sans text-xs">
          <strong style="color:${poly.color}">${poly.name}</strong><br/>
          <span class="text-[11px] text-slate-600">Mineral: ${poly.mineral}</span><br/>
          <span class="text-[10px] text-slate-500 font-mono">Anchor: ${poly.targetAnchor}</span>
        </div>`,
        { sticky: true, className: 'leaflet-custom-tooltip' }
      );
    });
    crismLayerGroupRef.current = crismGroup;

    // ==========================================================
    // 3. HAZARDS & RAD SHELTER OVERLAYS
    // ==========================================================
    const hazardGroup = L.layerGroup().addTo(map);
    SLOPE_HAZARD_ZONES.forEach(zone => {
      const isShelter = zone.type === 'RAD_SHELTER';
      const polygon = L.polygon(zone.coords, {
        color: zone.color,
        fillColor: zone.fillColor,
        fillOpacity: zone.fillOpacity,
        weight: 2,
        dashArray: isShelter ? '2 3' : '6 4'
      }).addTo(hazardGroup);

      polygon.bindTooltip(
        `<div class="p-1 font-sans text-xs">
          <strong style="color:${zone.color}">${zone.name}</strong><br/>
          <span class="text-[10px] font-mono text-slate-600">Type: ${zone.type}</span>
        </div>`,
        { sticky: true, className: 'leaflet-custom-tooltip' }
      );
    });
    hazardLayerGroupRef.current = hazardGroup;

    // ==========================================================
    // 4. RESEARCH TARGET MARKERS (T1–T7)
    // ==========================================================
    VERIFIED_TARGETS.forEach(target => {
      const isPrimary = target.isPrimaryTarget;

      const markerHtml = `
        <div class="group relative flex flex-col items-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 hover:scale-110">
          <div class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight shadow-md border flex items-center space-x-1 ${
            isPrimary 
              ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400 ring-offset-1' 
              : 'bg-white text-slate-900 border-slate-300 hover:border-slate-500'
          }">
            <span class="w-1.5 h-1.5 rounded-full ${isPrimary ? 'bg-amber-950 animate-ping' : 'bg-terracotta-600'}"></span>
            <span>${target.num}</span>
          </div>
          <div class="mt-0.5 px-1 py-0.2 rounded bg-slate-900/90 text-[9px] font-mono text-slate-200 border border-slate-700 whitespace-nowrap shadow-sm backdrop-blur-xs">
            ${target.elevation}m
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'leaflet-target-marker',
        iconSize: [60, 42],
        iconAnchor: [30, 21]
      });

      const marker = L.marker([target.lat, target.lng], { icon: customIcon }).addTo(map);

      marker.bindTooltip(
        `<div class="p-1.5 font-sans">
          <div class="font-display font-bold text-xs text-slate-900">${target.name}</div>
          <div class="text-[11px] font-mono text-terracotta-700 font-bold">${target.lat}°N, ${target.lng}°E | ${target.elevation}m</div>
          <div class="text-[10px] text-slate-600 mt-0.5">${target.evidenceChain.whatIsHere.slice(0, 90)}...</div>
        </div>`,
        { offset: [0, -22], direction: 'top', className: 'leaflet-custom-tooltip' }
      );

      marker.on('click', () => {
        if (onSelectTarget) {
          onSelectTarget(target.id);
        }
      });

      markersRef.current[target.id] = marker;
    });

    // Custom Waypoint Click Handler
    map.on('click', (e) => {
      if (isPlacingWaypoint && onAddCustomWaypoint) {
        onAddCustomWaypoint({
          lat: parseFloat(e.latlng.lat.toFixed(4)),
          lng: parseFloat(e.latlng.lng.toFixed(4))
        });
      }
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer Opacities and Blend Modes
  useEffect(() => {
    if (!tileLayersRef.current) return;

    const layers = tileLayersRef.current;

    if (activeMapMode === 'OPTICAL') {
      if (layers.mars_optical) layers.mars_optical.setOpacity(layerOpacities.mars_optical ?? 1.0);
      if (layers.mola_color) layers.mola_color.setOpacity(0.0);
      if (layers.mola_gray) layers.mola_gray.setOpacity(0.0);
      if (layers.celestia_shaded) layers.celestia_shaded.setOpacity(0.0);
    } else if (activeMapMode === 'MOLA_ELEVATION') {
      if (layers.mars_optical) layers.mars_optical.setOpacity(0.25);
      if (layers.mola_color) layers.mola_color.setOpacity(layerOpacities.mola_color ?? 0.85);
      if (layers.mola_gray) layers.mola_gray.setOpacity(0.15);
      if (layers.celestia_shaded) layers.celestia_shaded.setOpacity(0.0);
    } else if (activeMapMode === 'MOLA_GRAY') {
      if (layers.mars_optical) layers.mars_optical.setOpacity(0.20);
      if (layers.mola_color) layers.mola_color.setOpacity(0.0);
      if (layers.mola_gray) layers.mola_gray.setOpacity(layerOpacities.mola_gray ?? 0.80);
      if (layers.celestia_shaded) layers.celestia_shaded.setOpacity(0.0);
    } else if (activeMapMode === 'CELESTIA') {
      if (layers.mars_optical) layers.mars_optical.setOpacity(0.20);
      if (layers.mola_color) layers.mola_color.setOpacity(0.0);
      if (layers.mola_gray) layers.mola_gray.setOpacity(0.0);
      if (layers.celestia_shaded) layers.celestia_shaded.setOpacity(layerOpacities.celestia_shaded ?? 0.85);
    } else {
      // Free Blending Mode
      if (layers.mars_optical) layers.mars_optical.setOpacity(layerOpacities.mars_optical ?? 1.0);
      if (layers.mola_color) layers.mola_color.setOpacity(layerOpacities.mola_color ?? 0.65);
      if (layers.mola_gray) layers.mola_gray.setOpacity(layerOpacities.mola_gray ?? 0.50);
      if (layers.celestia_shaded) layers.celestia_shaded.setOpacity(layerOpacities.celestia_shaded ?? 0.40);
    }
  }, [activeMapMode, layerOpacities]);

  // Update Route Polyline based on Selected Expedition or Custom Waypoints
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (expeditionPolylineRef.current) {
      map.removeLayer(expeditionPolylineRef.current);
      expeditionPolylineRef.current = null;
    }

    let latlngs = [];

    if (customWaypoints && customWaypoints.length > 1) {
      // Use Custom Waypoints
      latlngs = customWaypoints.map(wp => [wp.lat, wp.lng]);
    } else {
      // Use Active Preset
      const activeSortie = PRESET_SORTIES.find(s => s.id === activeSortieId) || PRESET_SORTIES[0];
      const targetMap = {};
      VERIFIED_TARGETS.forEach(t => { targetMap[t.id] = t; });

      latlngs = activeSortie.targetIds
        .map(id => targetMap[id])
        .filter(Boolean)
        .map(t => [t.lat, t.lng]);
    }

    if (latlngs.length >= 2) {
      const polyline = L.polyline(latlngs, {
        color: '#C2410C', // Terracotta accent
        weight: 3.5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: '6 8'
      }).addTo(map);

      expeditionPolylineRef.current = polyline;
    }
  }, [activeSortieId, customWaypoints]);

  // Handle Custom Waypoint Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean old custom markers
    customMarkersRef.current.forEach(m => map.removeLayer(m));
    customMarkersRef.current = [];

    customWaypoints.forEach((wp, idx) => {
      const markerHtml = `
        <div class="flex items-center justify-center w-5 h-5 rounded-full bg-cobalt-600 text-white font-mono text-[10px] font-bold border border-white shadow-md">
          W${idx + 1}
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: 'leaflet-custom-waypoint',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([wp.lat, wp.lng], { icon }).addTo(map);
      customMarkersRef.current.push(marker);
    });
  }, [customWaypoints]);

  // Pan to Active Target when Selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeTargetId) return;

    const target = VERIFIED_TARGETS.find(t => t.id === activeTargetId);
    if (target) {
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 11), {
        animate: true,
        duration: 0.8
      });
    }
  }, [activeTargetId]);

  // Synchronize Hover Cursor Marker from Elevation Profile Chart
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (hoverMarkerRef.current) {
      map.removeLayer(hoverMarkerRef.current);
      hoverMarkerRef.current = null;
    }

    if (hoveredTraversePoint && hoveredTraversePoint.lat && hoveredTraversePoint.lng) {
      const hoverIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center w-6 h-6">
            <span class="absolute w-6 h-6 rounded-full bg-terracotta-500 opacity-60 animate-ping"></span>
            <span class="relative w-3.5 h-3.5 rounded-full bg-terracotta-700 border-2 border-white shadow-md"></span>
          </div>
        `,
        className: 'leaflet-elevation-hover-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker([hoveredTraversePoint.lat, hoveredTraversePoint.lng], {
        icon: hoverIcon,
        zIndexOffset: 1000
      }).addTo(map);

      hoverMarkerRef.current = marker;
    }
  }, [hoveredTraversePoint]);

  return (
    <div className="w-full h-full relative select-none">
      <div 
        ref={mapContainerRef} 
        className={`w-full h-full bg-[#E2E8F0] ${isPlacingWaypoint ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
      />

      {/* Crosshair Placement Banner */}
      {isPlacingWaypoint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-mono border border-slate-700 shadow-panel z-20 flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>CLICK ANYWHERE ON MARS MAP TO PLACE CUSTOM TRAVERSE WAYPOINT</span>
        </div>
      )}

      {/* Map Legend Overlay (Bottom-Right) */}
      <div className="absolute bottom-6 right-4 bg-white/95 backdrop-blur-sm border border-slate-300 rounded-lg p-2.5 shadow-panel z-10 text-[11px] font-mono space-y-1.5 max-w-[240px]">
        <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1">
          Planetary Map Overlays
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="w-3 h-1.5 bg-[#10B981] rounded"></span>
          <span>CRISM Olivine (Séítah)</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="w-3 h-1.5 bg-[#0284C7] rounded"></span>
          <span>CRISM Smectite Clays (Delta)</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="w-3 h-1.5 bg-[#D97706] rounded"></span>
          <span>Vivianite/Greigite Redox Front</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="w-3 h-1.5 bg-[#7C3AED] rounded"></span>
          <span>Margin Carbonates</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="w-3 h-1.5 bg-[#EF4444] rounded"></span>
          <span>Cliff Scarp Hazard (&gt;20°)</span>
        </div>
        <div className="text-[9px] text-slate-400 pt-1 border-t border-slate-200">
          EPSG:3857 Web Mercator | 0.25–232 m/px
        </div>
      </div>
    </div>
  );
}
