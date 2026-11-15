import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RESEARCH_TARGETS, MISSION_METADATA } from '../data/marsDossierData';

export default function MarsTrekMap({
  layerOpacities,
  activeTargetId,
  onSelectTarget,
  sepAlertActive,
  showCorridor,
  showEnvOverlay
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayersRef = useRef({});
  const markersRef = useRef({});
  const corridorLayerRef = useRef(null);
  const envLayerRef = useRef(null);

  // Initialize Map Once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Mars custom coordinates setup
    // Center: Jezero Crater (18.444 N, 77.401 E)
    const initialCenter = [MISSION_METADATA.targetCenter.lat, MISSION_METADATA.targetCenter.lng];
    const initialZoom = MISSION_METADATA.targetCenter.zoom;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 5,
      maxZoom: 17,
      zoomControl: false,
      attributionControl: true
    });

    // Add scale bar
    L.control.scale({
      metric: true,
      imperial: false,
      position: 'bottomleft',
      maxWidth: 150
    }).addTo(map);

    // Zoom control in top right
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // 1. Base Optical Tile Layer (Viking Color Mosaic)
    const opticalLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
      {
        attribution: 'NASA / JPL / USGS',
        opacity: layerOpacities.optical,
        maxNativeZoom: 8,
        maxZoom: 18,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="%23e2e8f0"></svg>'
      }
    ).addTo(map);

    // 2. High-Res Jezero Crater CTX Mosaic
    const jezeroLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/Jezerocrater_CTX_Mosaic_6m/1.0.0//default/default028mm/{z}/{y}/{x}.png',
      {
        attribution: 'NASA / JPL / MSSS / Mars Trek',
        opacity: layerOpacities.jezero_ctx,
        maxNativeZoom: 15,
        maxZoom: 18,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="transparent"></svg>'
      }
    ).addTo(map);

    // 3. THEMIS Day IR (Thermal Inertia)
    const themisLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_THEMIS_IR_Day_Mosaic_global_100m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
      {
        attribution: 'NASA / JPL / ASU',
        opacity: layerOpacities.themis_ir,
        maxNativeZoom: 9,
        maxZoom: 18,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="transparent"></svg>'
      }
    ).addTo(map);

    // 4. MOLA Topographic DEM (Colorized Hillshade)
    const molaLayer = L.tileLayer(
      'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_Shade_clon0dd_200mpp_lzw/1.0.0//default/default028mm/{z}/{y}/{x}.jpg',
      {
        attribution: 'NASA / GSFC / MOLA Team',
        opacity: layerOpacities.mola_dem,
        maxNativeZoom: 8,
        maxZoom: 18,
        errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="transparent"></svg>'
      }
    ).addTo(map);

    tileLayersRef.current = {
      optical: opticalLayer,
      jezero_ctx: jezeroLayer,
      themis_ir: themisLayer,
      mola_dem: molaLayer
    };

    // Add Alpha Habitat Station Marker
    const habIcon = L.divIcon({
      className: 'custom-hab-marker',
      html: `
        <div style="display:flex; align-items:center; background:#0F172A; color:#FFFFFF; padding:3px 8px; border-radius:6px; border:1px solid #334155; font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; box-shadow:0 4px 10px rgba(0,0,0,0.15); white-space:nowrap;">
          <span style="display:inline-block; width:6px; height:6px; background:#10B981; border-radius:50%; margin-right:5px;"></span>
          HABITAT ALPHA
        </div>
      `,
      iconSize: [120, 24],
      iconAnchor: [60, 12]
    });

    L.marker([MISSION_METADATA.habitatCoords.lat, MISSION_METADATA.habitatCoords.lng], {
      icon: habIcon,
      zIndexOffset: 100
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync layer opacities dynamically
  useEffect(() => {
    if (!tileLayersRef.current) return;
    Object.keys(layerOpacities).forEach((layerKey) => {
      const tileLayer = tileLayersRef.current[layerKey];
      if (tileLayer) {
        tileLayer.setOpacity(layerOpacities[layerKey]);
      }
    });
  }, [layerOpacities]);

  // Update Markers & Research Corridor
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old target markers
    Object.values(markersRef.current).forEach(marker => map.removeLayer(marker));
    markersRef.current = {};

    // Render 5 Research Targets
    RESEARCH_TARGETS.forEach((target) => {
      const isSelected = activeTargetId === target.id;
      const isCheyava = target.isPrimaryTarget;

      const markerHtml = `
        <div class="relative group cursor-pointer" style="display:flex; flex-direction:column; align-items:center;">
          ${isCheyava ? `
            <div style="position:absolute; top:-6px; width:44px; height:44px; border:2px dashed #C2410C; border-radius:50%; animation:spin 12s linear infinite; pointer-events:none;"></div>
          ` : ''}
          <div style="
            display:flex; align-items:center; gap:6px;
            background:${isSelected ? '#0F172A' : '#FFFFFF'};
            color:${isSelected ? '#FFFFFF' : '#0F172A'};
            padding:4px 8px;
            border-radius:20px;
            border:1.5px solid ${isSelected ? '#C2410C' : isCheyava ? '#C2410C' : '#CBD5E1'};
            box-shadow:0 4px 12px rgba(15,23,42,0.12);
            font-family:'Space Grotesk',sans-serif;
            font-size:11px;
            font-weight:700;
            white-space:nowrap;
            transition:all 0.2s;
          ">
            <span style="
              display:flex; align-items:center; justify-content:center;
              width:16px; height:16px; border-radius:50%;
              background:${isSelected ? '#C2410C' : isCheyava ? '#C2410C' : '#E2E8F0'};
              color:${isSelected || isCheyava ? '#FFFFFF' : '#475569'};
              font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:700;
            ">${target.num}</span>
            <span>${target.shortName}</span>
          </div>
          <div style="
            background:${isSelected ? '#C2410C' : '#64748B'};
            color:#FFFFFF;
            font-family:'JetBrains Mono',monospace;
            font-size:9px;
            font-weight:600;
            padding:1px 5px;
            border-radius:3px;
            margin-top:2px;
          ">${target.elevation}m</div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: `target-marker-${target.id}`,
        html: markerHtml,
        iconSize: [160, 48],
        iconAnchor: [80, 24]
      });

      const marker = L.marker([target.lat, target.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 500 : isCheyava ? 400 : 200
      }).addTo(map);

      marker.on('click', () => {
        onSelectTarget(target.id);
      });

      markersRef.current[target.id] = marker;
    });

    // Render Research Corridor Polyline
    if (corridorLayerRef.current) {
      map.removeLayer(corridorLayerRef.current);
      corridorLayerRef.current = null;
    }

    if (showCorridor) {
      const corridorCoords = [
        [MISSION_METADATA.habitatCoords.lat, MISSION_METADATA.habitatCoords.lng],
        [RESEARCH_TARGETS[0].lat, RESEARCH_TARGETS[0].lng],
        [RESEARCH_TARGETS[1].lat, RESEARCH_TARGETS[1].lng],
        [RESEARCH_TARGETS[2].lat, RESEARCH_TARGETS[2].lng],
        [RESEARCH_TARGETS[3].lat, RESEARCH_TARGETS[3].lng],
        [RESEARCH_TARGETS[4].lat, RESEARCH_TARGETS[4].lng],
      ];

      const polyline = L.polyline(corridorCoords, {
        color: '#C2410C',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 6',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      corridorLayerRef.current = polyline;
    }
  }, [activeTargetId, showCorridor, onSelectTarget]);

  // Center on active target when selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !activeTargetId) return;

    const target = RESEARCH_TARGETS.find(t => t.id === activeTargetId);
    if (target) {
      map.flyTo([target.lat, target.lng], 14, {
        duration: 1.2
      });
    }
  }, [activeTargetId]);

  // Environmental / Space Weather Layer & SEP Alert Highlights
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (envLayerRef.current) {
      map.removeLayer(envLayerRef.current);
      envLayerRef.current = null;
    }

    if (showEnvOverlay || sepAlertActive) {
      const group = L.layerGroup();

      if (sepAlertActive) {
        // Highlight terrain-shielded sites: Target 02 (68%) and Target 04 (62%)
        const shelterSites = [RESEARCH_TARGETS[1], RESEARCH_TARGETS[3]];
        shelterSites.forEach((site) => {
          const circle = L.circle([site.lat, site.lng], {
            radius: 450,
            color: '#047857',
            fillColor: '#10B981',
            fillOpacity: 0.25,
            weight: 2,
            dashArray: '4, 4'
          });

          const label = L.marker([site.lat, site.lng], {
            icon: L.divIcon({
              className: 'shelter-label',
              html: `<div style="background:#047857; color:#FFFFFF; padding:2px 6px; border-radius:4px; font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:700;">★ TERRAIN SHELTER (${site.terrainShieldingPct}% SHIELD)</div>`,
              iconAnchor: [60, -20]
            })
          });

          group.addLayer(circle);
          group.addLayer(label);
        });

        // Unshielded hazardous plains warning ring
        const hazardRing = L.circle([MISSION_METADATA.targetCenter.lat, MISSION_METADATA.targetCenter.lng], {
          radius: 4000,
          color: '#DC2626',
          fillColor: '#EF4444',
          fillOpacity: 0.08,
          weight: 2
        });
        group.addLayer(hazardRing);
      }

      group.addTo(map);
      envLayerRef.current = group;
    }
  }, [showEnvOverlay, sepAlertActive]);

  return (
    <div className="relative w-full h-full bg-[#E2E8F0] overflow-hidden select-none">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Coordinate & Crosshair Telemetry Stamp (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-white/90 border border-slate-300 px-3 py-1 rounded-md shadow-subtle backdrop-blur-sm text-slate-700 font-mono text-[11px] flex items-center space-x-3">
        <span>JEZERO CRATER: <strong className="text-slate-900">18.444° N, 77.401° E</strong></span>
        <span className="text-slate-300">|</span>
        <span>DATUM: <strong className="text-terracotta-700">MARS 2000 SPHERE</strong></span>
        <span className="text-slate-300">|</span>
        <span className="text-emerald-700 font-semibold">NASA JPL MARS TREK LIVE WMTS</span>
      </div>
    </div>
  );
}
