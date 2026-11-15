import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  VERIFIED_TARGETS, 
  CRISM_MINERAL_POLYGONS, 
  SLOPE_HAZARD_ZONES,
  THEMIS_THERMAL_INERTIA_ZONES,
  MEDA_ATMOSPHERIC_DATA
} from '../data/marsDossierData';

export default function MarsTrekMap({
  activeMapMode,
  layerOpacities = {},
  activeTargetId,
  onSelectTarget,
  activeRoutePoints = [],
  flyToRouteTrigger = 0,
  isMapClickWaypointMode = false,
  onMapClickAddWaypoint,
  hoveredTraversePoint
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayersRef = useRef({});
  const markersRef = useRef({});
  const routePolylineRef = useRef(null);
  const routeBadgeMarkersRef = useRef([]);
  const crismLayerGroupRef = useRef(null);
  const hazardLayerGroupRef = useRef(null);
  const themisLayerGroupRef = useRef(null);
  const medaLayerGroupRef = useRef(null);
  const hoverMarkerRef = useRef(null);

  // High-Res Zoom-Triggered Image Overlays Refs
  const tier1OverlayRef = useRef(null);
  const tier2OverlayRef = useRef(null);

  // Map Zoom State
  const [currentZoom, setCurrentZoom] = useState(11);

  // Computed Thermal Opacity (0.0 to 1.0)
  const rawThermal = layerOpacities.thermal ?? layerOpacities.themis_ir ?? 0;
  const thermalOpacity = rawThermal > 1 ? rawThermal / 100 : rawThermal;

  // Estimate elevation in Jezero from planetocentric lat/lng
  const estimateElevation = (lat, lng) => {
    // Basin floor is ~-2570m in the east, delta is ~-2400m, Neretva is ~-2350m, western rim is ~-1800m
    const westDist = Math.max(0, 77.45 - lng);
    const northDist = Math.abs(lat - 18.48);
    const elev = -2570 + (westDist * 3200) + (northDist * 1200);
    return Math.round(Math.min(-1600, Math.max(-2650, elev)));
  };

  // Initialize Leaflet Map (Standard Web Mercator EPSG:3857)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [18.45, 77.40],
      zoom: 11,
      minZoom: 4,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: true
    });

    // Custom Layer Panes for Strict Z-Index Isolation
    if (!map.getPane('highResOverlayPane')) {
      const overlayPane = map.createPane('highResOverlayPane');
      overlayPane.style.zIndex = 450;
      overlayPane.style.pointerEvents = 'none';
    }

    if (!map.getPane('scientificOverlaysPane')) {
      const scientificPane = map.createPane('scientificOverlaysPane');
      scientificPane.style.zIndex = 550;
    }

    if (!map.getPane('routePane')) {
      const routePane = map.createPane('routePane');
      routePane.style.zIndex = 650;
    }

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

    // Track Zoom Changes
    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    // ==========================================================
    // 1. REAL VERIFIED WEB MERCATOR SATELLITE TILE LAYERS
    // ==========================================================
    const opticalLayer = L.tileLayer(
      'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png',
      {
        attribution: '© OpenPlanetaryMap / NASA / JPL / USGS / CARTO',
        maxNativeZoom: 8,
        maxZoom: 16,
        zIndex: 1,
        opacity: layerOpacities.mars_optical ?? 1.0
      }
    ).addTo(map);

    const molaColorLayer = L.tileLayer(
      'https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png',
      {
        attribution: 'NASA / GSFC / MOLA Team / WhereOnMars',
        tms: true,
        maxNativeZoom: 6,
        maxZoom: 16,
        zIndex: 2,
        opacity: layerOpacities.mola_color ?? 0.65
      }
    ).addTo(map);

    const molaGrayLayer = L.tileLayer(
      'https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-gray/{z}/{x}/{y}.png',
      {
        attribution: 'NASA / GSFC / MOLA Team / WhereOnMars',
        tms: true,
        maxNativeZoom: 6,
        maxZoom: 16,
        zIndex: 3,
        opacity: layerOpacities.mola_gray ?? 0.50
      }
    ).addTo(map);

    const celestiaLayer = L.tileLayer(
      'https://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png',
      {
        attribution: 'NASA / JPL / Celestia / WhereOnMars',
        tms: true,
        maxNativeZoom: 5,
        maxZoom: 16,
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
    // 2. ZOOM-TRIGGERED GEOREFERENCED HIGH-RES NASA HiRISE OVERLAYS
    // ==========================================================
    const tier1Overlay = L.imageOverlay(
      '/maps/Layered Martian Delta and Cratered Plains.png',
      [[18.425, 77.275], [18.525, 77.455]],
      {
        pane: 'highResOverlayPane',
        opacity: 0,
        className: 'transition-opacity duration-300'
      }
    ).addTo(map);
    tier1OverlayRef.current = tier1Overlay;

    const tier2Overlay = L.imageOverlay(
      '/maps/Martian Cratered Sediment Landscape.png',
      [[18.458, 77.272], [18.515, 77.375]],
      {
        pane: 'highResOverlayPane',
        opacity: 0,
        className: 'transition-opacity duration-300'
      }
    ).addTo(map);
    tier2OverlayRef.current = tier2Overlay;

    // ==========================================================
    // 3. CRISM SPECTRAL MINERALOGY OVERLAYS
    // Authentic USGS Contact Lines & Permanent Geological Unit Labels
    // ==========================================================
    const crismGroup = L.layerGroup().addTo(map);
    CRISM_MINERAL_POLYGONS.forEach(poly => {
      const polygon = L.polygon(poly.coords, {
        pane: 'scientificOverlaysPane',
        color: '#1E293B',
        weight: 1.4,
        opacity: 0.75,
        dashArray: null,
        fillColor: poly.fillColor,
        fillOpacity: poly.fillOpacity || 0.36,
        smoothFactor: 2.0
      }).addTo(crismGroup);

      if (poly.labelAnchor && poly.shortLabel) {
        L.marker(poly.labelAnchor, {
          icon: L.divIcon({
            html: `<span class="geologic-unit-label">${poly.shortLabel}</span>`,
            className: 'geologic-unit-label-wrapper',
            iconSize: [80, 20],
            iconAnchor: [40, 10]
          }),
          pane: 'scientificOverlaysPane',
          interactive: false
        }).addTo(crismGroup);
      }

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
    // 4. HAZARDS & RAD SHELTER OVERLAYS
    // ==========================================================
    const hazardGroup = L.layerGroup().addTo(map);
    SLOPE_HAZARD_ZONES.forEach(zone => {
      const isShelter = zone.type === 'RAD_SHELTER';
      const polygon = L.polygon(zone.coords, {
        pane: 'scientificOverlaysPane',
        color: zone.color,
        fillColor: zone.fillColor,
        fillOpacity: zone.fillOpacity,
        weight: isShelter ? 1.4 : 1.8,
        dashArray: isShelter ? '3 3' : '6 4',
        smoothFactor: 2.0
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

    // THEMIS Thermal Inertia Layer Group
    const themisGroup = L.layerGroup().addTo(map);
    themisLayerGroupRef.current = themisGroup;

    // MEDA Atmospheric & Weather Vector Layer Group
    const medaGroup = L.layerGroup().addTo(map);
    medaLayerGroupRef.current = medaGroup;

    // ==========================================================
    // 5. RESEARCH TARGET MARKERS (T1–T9)
    // Strictly in markerPane above all image overlays
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

      const marker = L.marker([target.lat, target.lng], { 
        icon: customIcon,
        zIndexOffset: 650 
      }).addTo(map);

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

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Map Click Listener for Waypoint Placement
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const handleClick = (e) => {
      if (isMapClickWaypointMode && onMapClickAddWaypoint) {
        const lat = parseFloat(e.latlng.lat.toFixed(6));
        const lng = parseFloat(e.latlng.lng.toFixed(6));
        const elevation = estimateElevation(lat, lng);
        onMapClickAddWaypoint({ lat, lng, elevation });
      }
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [isMapClickWaypointMode, onMapClickAddWaypoint]);

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
      if (layers.mars_optical) layers.mars_optical.setOpacity(0.10);
      if (layers.mola_color) layers.mola_color.setOpacity(0.0);
      if (layers.mola_gray) layers.mola_gray.setOpacity(0.0);
      if (layers.celestia_shaded) layers.celestia_shaded.setOpacity(layerOpacities.celestia_shaded ?? 0.85);
    } else {
      if (layers.mars_optical) layers.mars_optical.setOpacity(layerOpacities.mars_optical ?? 1.0);
      if (layers.mola_color) layers.mola_color.setOpacity(layerOpacities.mola_color ?? 0.65);
      if (layers.mola_gray) layers.mola_gray.setOpacity(layerOpacities.mola_gray ?? 0.50);
      if (layers.celestia_shaded) layers.celestia_shaded.setOpacity(layerOpacities.celestia_shaded ?? 0.40);
    }
  }, [activeMapMode, layerOpacities]);

  // Manage Zoom-Triggered HiRISE Overlay Fades
  useEffect(() => {
    const isCelestiaActive = activeMapMode === 'CELESTIA' || (layerOpacities && layerOpacities.celestia_shaded > 0.05);
    const tier1 = tier1OverlayRef.current;
    const tier2 = tier2OverlayRef.current;

    if (!tier1 || !tier2) return;

    if (!isCelestiaActive || currentZoom < 11) {
      tier1.setOpacity(0);
      tier2.setOpacity(0);
    } else if (currentZoom >= 11 && currentZoom < 13) {
      tier1.setOpacity(0.96);
      tier2.setOpacity(0);
    } else if (currentZoom >= 13) {
      tier1.setOpacity(0.20);
      tier2.setOpacity(0.98);
    }
  }, [activeMapMode, layerOpacities, currentZoom]);

  // Manage THEMIS Thermal Inertia Overlay Updates (Strictly in thermalPane zIndex: 480)
  useEffect(() => {
    const themisGroup = themisLayerGroupRef.current;
    if (!themisGroup) return;

    themisGroup.clearLayers();
    const rawOpacity = layerOpacities.thermal ?? layerOpacities.themis_ir ?? 0;
    const opacity = rawOpacity > 1 ? rawOpacity / 100 : rawOpacity;
    if (opacity <= 0.005) return;

    THEMIS_THERMAL_INERTIA_ZONES.forEach(zone => {
      const polygon = L.polygon(zone.coords, {
        pane: 'scientificOverlaysPane',
        color: '#1E293B',
        fillColor: zone.fillColor,
        fillOpacity: opacity * 0.36,
        opacity: opacity * 0.75,
        weight: 1.4,
        dashArray: null,
        smoothFactor: 2.0
      }).addTo(themisGroup);

      polygon.bindTooltip(
        `<div class="p-1.5 font-sans text-xs max-w-xs">
          <div class="font-bold font-display" style="color: ${zone.color}">
            ${zone.name}
          </div>
          <div class="text-[10px] font-mono text-slate-700 mt-0.5">
            <strong>Thermal Inertia:</strong> ${zone.inertiaValue}
          </div>
          <div class="text-[10px] text-slate-500 mt-0.5 leading-snug">
            ${zone.description}
          </div>
        </div>`,
        { sticky: true, className: 'leaflet-custom-tooltip' }
      );
    });
  }, [layerOpacities.thermal, layerOpacities.themis_ir]);

  // Manage MEDA Atmospheric & Weather Vector Overlay Updates
  useEffect(() => {
    const medaGroup = medaLayerGroupRef.current;
    if (!medaGroup) return;

    medaGroup.clearLayers();
    const opacity = layerOpacities.meda_atmos ?? 0;
    if (opacity <= 0.01) return;

    // 1. Regional Dust Opacity Tint
    const dustHaze = L.rectangle(MEDA_ATMOSPHERIC_DATA.dustHazeBounds, {
      pane: 'scientificOverlaysPane',
      color: '#D97706',
      fillColor: '#D97706',
      fillOpacity: opacity * 0.14,
      weight: 1,
      dashArray: '3 3',
      opacity: opacity * 0.4
    }).addTo(medaGroup);

    dustHaze.bindTooltip(
      `<div class="p-1 font-mono text-xs">
        <strong class="text-amber-700">MEDA Atmospheric Optical Depth:</strong> τ = 0.44 ± 0.08<br/>
        <span class="text-slate-500 text-[10px]">${MEDA_ATMOSPHERIC_DATA.dustDescription}</span>
      </div>`,
      { sticky: true }
    );

    // 2. Wind Flow Direction Vectors (NW -> SE down Neretva Vallis)
    MEDA_ATMOSPHERIC_DATA.windVectors.forEach(vec => {
      const line = L.polyline(vec.coords, {
        pane: 'scientificOverlaysPane',
        color: '#0284C7',
        weight: 3,
        dashArray: '8 6',
        opacity: opacity * 0.95
      }).addTo(medaGroup);

      line.bindTooltip(
        `<div class="p-1 font-mono text-xs">
          <strong class="text-sky-600">Prevailing Wind:</strong> NW → SE (~12 m/s)<br/>
          <span class="text-slate-500 text-[10px]">${vec.name} (Katabatic flow down Neretva Vallis)</span>
        </div>`,
        { sticky: true }
      );
    });

    // 3. Floating MEDA Telemetry Pill Marker on Map Canvas
    const telemetryHtml = `
      <div class="px-3 py-2 rounded-xl bg-slate-900/95 text-white border border-sky-400 shadow-xl font-mono text-[10px] backdrop-blur-md pointer-events-auto transform -translate-x-1/2 -translate-y-full transition-opacity duration-200" style="opacity: ${Math.min(1, opacity + 0.15)}">
        <div class="flex items-center space-x-1.5 text-sky-300 font-bold border-b border-slate-700/80 pb-1 mb-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="tracking-wider">MEDA IN-SITU METEOROLOGY</span>
        </div>
        <div class="grid grid-cols-2 gap-x-3 gap-y-1 text-[9.5px]">
          <div>PRESSURE: <span class="text-amber-300 font-bold">725 Pa</span></div>
          <div>WIND: <span class="text-sky-300 font-bold">12 m/s NW→SE</span></div>
          <div>SURFACE TEMP: <span class="text-emerald-300 font-bold">-62° to -24°C</span></div>
          <div>DUST OPACITY: <span class="text-amber-200 font-bold">τ = 0.44 ± 0.08</span></div>
        </div>
        <div class="mt-1.5 pt-1 border-t border-slate-800 text-[8.5px] text-slate-400 leading-tight">
          Local point sensor telemetry @ Perseverance Station
        </div>
      </div>
    `;

    const medaMarkerIcon = L.divIcon({
      html: telemetryHtml,
      className: 'leaflet-meda-telemetry-badge',
      iconSize: [260, 90],
      iconAnchor: [130, 20]
    });

    L.marker([MEDA_ATMOSPHERIC_DATA.lat, MEDA_ATMOSPHERIC_DATA.lng], {
      icon: medaMarkerIcon,
      pane: 'routePane',
      zIndexOffset: 800
    }).addTo(medaGroup);

  }, [layerOpacities.meda_atmos]);

  // Render Live Route Polyline and Directional Sequence Badges (1, 2, 3...)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean old polyline
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }

    // Clean old waypoint badges
    routeBadgeMarkersRef.current.forEach(m => map.removeLayer(m));
    routeBadgeMarkersRef.current = [];

    if (activeRoutePoints && activeRoutePoints.length >= 2) {
      const latlngs = activeRoutePoints.map(p => [p.lat, p.lng]);

      // High-contrast Terracotta Route Polyline strictly in routePane
      const polyline = L.polyline(latlngs, {
        pane: 'routePane',
        color: '#C2410C', // Mars Terracotta
        weight: 4,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: 'none'
      }).addTo(map);

      routePolylineRef.current = polyline;

      // Add directional waypoint sequence badges (1, 2, 3...)
      activeRoutePoints.forEach((pt, idx) => {
        const isStart = idx === 0;
        const isEnd = idx === activeRoutePoints.length - 1;

        const badgeHtml = `
          <div class="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow-md font-mono text-[11px] font-bold transform -translate-x-1/2 -translate-y-1/2 ${
            isStart ? 'bg-emerald-600 text-white ring-2 ring-emerald-300' : (isEnd ? 'bg-amber-600 text-white ring-2 ring-amber-300' : 'bg-slate-900 text-white')
          }">
            ${idx + 1}
          </div>
        `;

        const badgeIcon = L.divIcon({
          html: badgeHtml,
          className: 'leaflet-route-sequence-badge',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const badgeMarker = L.marker([pt.lat, pt.lng], {
          icon: badgeIcon,
          pane: 'routePane',
          zIndexOffset: 750
        }).addTo(map);

        badgeMarker.bindTooltip(
          `<div class="p-1 font-mono text-xs">
            <strong>Stop ${idx + 1}: ${pt.name || pt.id}</strong><br/>
            <span class="text-slate-600">${pt.lat.toFixed(4)}°N, ${pt.lng.toFixed(4)}°E | ${pt.elevation} m</span>
          </div>`,
          { offset: [0, -12], direction: 'top' }
        );

        routeBadgeMarkersRef.current.push(badgeMarker);
      });
    }
  }, [activeRoutePoints]);

  // Handle Fly-To Route Trigger
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !routePolylineRef.current) return;

    if (activeRoutePoints && activeRoutePoints.length >= 2) {
      map.fitBounds(routePolylineRef.current.getBounds(), {
        padding: [60, 60],
        maxZoom: 16,
        animate: true,
        duration: 0.9
      });
    }
  }, [flyToRouteTrigger]);

  // Pan to Active Target when Selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeTargetId) return;

    const target = VERIFIED_TARGETS.find(t => t.id === activeTargetId);
    if (target) {
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 12), {
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
        pane: 'routePane',
        zIndexOffset: 1000
      }).addTo(map);

      hoverMarkerRef.current = marker;
    }
  }, [hoveredTraversePoint]);

  return (
    <div className="w-full h-full relative select-none">
      <div 
        ref={mapContainerRef} 
        className={`w-full h-full bg-[#E2E8F0] ${isMapClickWaypointMode ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
      />

      {/* Crosshair Placement Banner */}
      {isMapClickWaypointMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-mono border border-amber-500 shadow-panel z-20 flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>MAP CLICK MODE: ON — CLICK ANYWHERE ON MAP TO DROP WAYPOINTS</span>
        </div>
      )}

      {/* High-Res HiRISE Zoom Indicator Pill */}
      {activeMapMode === 'CELESTIA' && currentZoom >= 11 && (
        <div 
          className="absolute top-4 left-4 z-[1000] pointer-events-auto bg-slate-950/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-slate-700 shadow-panel text-[11px] font-mono flex items-center space-x-2"
          style={{ zIndex: 1000 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            {currentZoom >= 13 ? 'NASA HiRISE Tier 2: Outcrop Sub-Meter (~0.25 m/px)' : 'NASA HiRISE Tier 1: Western Delta (~0.5 m/px)'}
          </span>
        </div>
      )}

      {/* THEMIS Thermal Inertia Floating Legend Pill (Appears only while thermal layer opacity > 0%) */}
      {thermalOpacity > 0.005 && (
        <div 
          className="absolute bottom-[270px] right-[16px] z-[1000] pointer-events-auto bg-white/95 backdrop-blur-sm border border-terracotta-400 rounded-xl p-2.5 shadow-lg text-[10px] font-mono space-y-1.5 max-w-[270px] transition-all duration-200"
          style={{ zIndex: 1000, opacity: Math.min(1, thermalOpacity + 0.25) }}
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-1">
            <span className="font-bold text-slate-900 flex items-center space-x-1.5 font-display text-xs">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse"></span>
              <span>THEMIS Thermal Inertia</span>
            </span>
            <span className="font-mono text-[9px] font-bold text-terracotta-800 bg-terracotta-100 px-1.5 py-0.5 rounded border border-terracotta-300">
              {Math.round(thermalOpacity * 100)}%
            </span>
          </div>

          <div className="space-y-1 text-slate-700">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-2.5 bg-[#EA580C] border border-[#F97316] rounded-xs shrink-0 shadow-xs"></span>
              <div className="leading-tight">
                <strong className="text-slate-900 block font-semibold text-[10px]">High Inertia Bedrock / Boulders</strong>
                <span className="text-slate-500 text-[9px]">390–560 J • Delta Scarp, Séítah, Rim</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-2.5 bg-[#0284C7] border border-[#38BDF8] rounded-xs shrink-0 shadow-xs"></span>
              <div className="leading-tight">
                <strong className="text-slate-900 block font-semibold text-[10px]">Low Inertia Fine Dust</strong>
                <span className="text-slate-500 text-[9px]">120–205 J • Basin Plains (T1)</span>
              </div>
            </div>
          </div>

          <div className="text-[8.5px] font-mono text-slate-500 pt-1 border-t border-slate-200 leading-tight">
            ~100 m/px regional context only • Do not infer boulder-scale safety
          </div>
        </div>
      )}

      {/* Map Legend Overlay (Bottom-Right, strictly positioned at bottom: 44px; right: 16px; with zIndex: 1000) */}
      <div 
        className="absolute bottom-[44px] right-[16px] z-[1000] pointer-events-auto bg-white/95 backdrop-blur-sm border border-slate-300 rounded-lg p-2.5 shadow-panel text-[11px] font-mono space-y-1.5 max-w-[240px]"
        style={{ zIndex: 1000 }}
      >
        <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1">
          Planetary Map Overlays
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="w-3 h-1.5 bg-[#C2410C] rounded"></span>
          <span>Active EVA Route Track</span>
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
