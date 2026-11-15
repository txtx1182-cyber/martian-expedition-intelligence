import React, { useState, useMemo } from 'react';
import HeaderBar from './components/HeaderBar';
import TraversePlannerDrawer from './components/TraversePlannerDrawer';
import MarsTrekMap from './components/MarsTrekMap';
import TargetEvidenceCard from './components/TargetEvidenceCard';
import ElevationProfileDrawer from './components/ElevationProfileDrawer';
import SepAlertBanner from './components/SepAlertBanner';
import EnvHonestyModal from './components/EnvHonestyModal';
import { VERIFIED_TARGETS, PRESET_SORTIES } from './data/marsDossierData';

export default function App() {
  // Planetary Map Modes:
  // 'OPTICAL', 'MOLA_ELEVATION', 'MOLA_GRAY', 'CELESTIA', 'FREE_BLEND'
  const [activeMapMode, setActiveMapMode] = useState('FREE_BLEND');

  // Tile Layer Opacities
  const [layerOpacities, setLayerOpacities] = useState({
    mars_optical: 1.0,
    mola_color: 0.0,
    mola_gray: 0.0,
    celestia_shaded: 0.0,
    themis_ir: 0.0,
    meda_atmos: 0.0
  });

  // Active Target ID (Default to T7 Bright Angel / Cheyava Falls)
  const [activeTargetId, setActiveTargetId] = useState('T7');

  // Route Planner Tabs: 'SORTIES' | 'BUILD_EVA' | 'LAYERS'
  const [routeTab, setRouteTab] = useState('SORTIES');

  // Active Sortie ID (Default to sortie-1: Neretva -> Bright Angel Micro-EVA)
  const [activeSortieId, setActiveSortieId] = useState('sortie-1');

  // Custom User Placed / Built Route Waypoints
  const [customRouteWaypoints, setCustomRouteWaypoints] = useState([]);

  // Map Click Waypoint Mode toggle
  const [isMapClickWaypointMode, setIsMapClickWaypointMode] = useState(false);

  // Astronaut walking speed in m/s (default 0.5 m/s)
  const [astronautSpeedMs, setAstronautSpeedMs] = useState(0.5);

  // Auto-fit "Fly to Route" trigger counter
  const [flyToRouteTrigger, setFlyToRouteTrigger] = useState(0);

  // Environmental Honesty Modal State
  const [isEnvHonestyOpen, setIsEnvHonestyOpen] = useState(false);

  // SEP Alert State
  const [sepAlertActive, setSepAlertActive] = useState(false);

  // Hovered Traverse Point along Elevation Profile
  const [hoveredTraversePoint, setHoveredTraversePoint] = useState(null);

  const handleOpacityChange = (layerId, newOpacity) => {
    setLayerOpacities(prev => {
      const updated = { ...prev, [layerId]: newOpacity };
      if (layerId === 'themis_ir') updated.thermal = newOpacity;
      if (layerId === 'thermal') updated.themis_ir = newOpacity;
      return updated;
    });
  };

  // Compute active route points based on active tab
  const activeRoutePoints = useMemo(() => {
    if (routeTab === 'BUILD_EVA') {
      return customRouteWaypoints;
    }
    // Default to active sortie
    const sortie = PRESET_SORTIES.find(s => s.id === activeSortieId) || PRESET_SORTIES[0];
    return sortie.targetIds.map(tid => {
      const t = VERIFIED_TARGETS.find(vt => vt.id === tid);
      if (!t) return null;
      return {
        id: t.id,
        name: t.name,
        targetId: t.id,
        lat: t.lat,
        lng: t.lng,
        elevation: t.elevation
      };
    }).filter(Boolean);
  }, [routeTab, activeSortieId, customRouteWaypoints]);

  const handleSelectSortie = (sortieId) => {
    setActiveSortieId(sortieId);
    setRouteTab('SORTIES');
    setIsMapClickWaypointMode(false);
    setFlyToRouteTrigger(prev => prev + 1);

    const sortie = PRESET_SORTIES.find(s => s.id === sortieId);
    if (sortie && sortie.targetIds && sortie.targetIds.length > 0) {
      setActiveTargetId(sortie.targetIds[0]);
    }
  };

  const handleAddTargetToRoute = (targetId) => {
    const target = VERIFIED_TARGETS.find(t => t.id === targetId);
    if (!target) return;
    const newPoint = {
      id: target.id,
      name: target.name,
      targetId: target.id,
      lat: target.lat,
      lng: target.lng,
      elevation: target.elevation
    };
    setCustomRouteWaypoints(prev => [...prev, newPoint]);
    setRouteTab('BUILD_EVA');
    setFlyToRouteTrigger(prev => prev + 1);
  };

  const handleRemoveWaypoint = (index) => {
    setCustomRouteWaypoints(prev => prev.filter((_, i) => i !== index));
  };

  const handleUndoLastWaypoint = () => {
    setCustomRouteWaypoints(prev => prev.slice(0, -1));
  };

  const handleClearCustomRoute = () => {
    setCustomRouteWaypoints([]);
    setIsMapClickWaypointMode(false);
  };

  const handleMapClickAddWaypoint = ({ lat, lng, elevation }) => {
    const wpNum = customRouteWaypoints.length + 1;
    const newWp = {
      id: `WP-${wpNum}`,
      name: `Waypoint ${wpNum}`,
      lat,
      lng,
      elevation
    };
    setCustomRouteWaypoints(prev => [...prev, newWp]);
    setRouteTab('BUILD_EVA');
  };

  const handleFlyToRoute = () => {
    setFlyToRouteTrigger(prev => prev + 1);
  };

  const activeTarget = VERIFIED_TARGETS.find(t => t.id === activeTargetId) || null;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#F8F9FA] text-[#0F172A] font-sans overflow-hidden">
      {/* Top Editorial Command & Telemetry Bar */}
      <HeaderBar
        sepAlertActive={sepAlertActive}
        onTriggerSepAlert={() => setSepAlertActive(true)}
        onResetSepAlert={() => setSepAlertActive(false)}
        activeTargetId={activeTargetId}
        onSelectTarget={setActiveTargetId}
        onOpenEnvHonestyModal={() => setIsEnvHonestyOpen(true)}
      />

      {/* Emergency SEP Proton Storm Alarm Dropdown */}
      <SepAlertBanner
        isActive={sepAlertActive}
        onDismiss={() => setSepAlertActive(false)}
        onNavigateToShelter={(shelterId) => setActiveTargetId(shelterId)}
      />

      {/* Main Full-Viewport Spatial Workspace */}
      <main className="flex-1 w-full h-[calc(100vh-56px)] relative flex overflow-hidden">
        {/* Left Floating Drawer: Traverse Planner & 4 Planetary Map Modes */}
        <TraversePlannerDrawer
          activeTab={routeTab}
          onSelectTab={setRouteTab}
          activeSortieId={activeSortieId}
          onSelectSortie={handleSelectSortie}
          customRouteWaypoints={customRouteWaypoints}
          onAddTargetToRoute={handleAddTargetToRoute}
          onRemoveWaypoint={handleRemoveWaypoint}
          onUndoLastWaypoint={handleUndoLastWaypoint}
          onClearCustomRoute={handleClearCustomRoute}
          isMapClickWaypointMode={isMapClickWaypointMode}
          onToggleMapClickMode={() => setIsMapClickWaypointMode(prev => !prev)}
          astronautSpeedMs={astronautSpeedMs}
          onChangeAstronautSpeed={setAstronautSpeedMs}
          onFlyToRoute={handleFlyToRoute}
          activeRoutePoints={activeRoutePoints}
          activeMapMode={activeMapMode}
          onSelectMapMode={setActiveMapMode}
          layerOpacities={layerOpacities}
          onOpacityChange={handleOpacityChange}
          activeTargetId={activeTargetId}
          onSelectTarget={setActiveTargetId}
          onOpenEnvHonestyModal={() => setIsEnvHonestyOpen(true)}
        />

        {/* Center: Real Web Mercator Planetary Satellite Map (Leaflet) */}
        <div className="flex-1 h-full relative flex flex-col overflow-hidden">
          <div className="flex-1 w-full h-full relative overflow-hidden">
            <MarsTrekMap
              activeMapMode={activeMapMode}
              layerOpacities={layerOpacities}
              activeTargetId={activeTargetId}
              onSelectTarget={setActiveTargetId}
              activeRoutePoints={activeRoutePoints}
              flyToRouteTrigger={flyToRouteTrigger}
              isMapClickWaypointMode={isMapClickWaypointMode}
              onMapClickAddWaypoint={handleMapClickAddWaypoint}
              hoveredTraversePoint={hoveredTraversePoint}
            />
          </div>

          {/* Collapsible Bottom Drawer: Along-Track Elevation Profile */}
          <ElevationProfileDrawer
            onHoverPoint={setHoveredTraversePoint}
            hoveredPoint={hoveredTraversePoint}
            onSelectTarget={setActiveTargetId}
            activeRoutePoints={activeRoutePoints}
          />
        </div>

        {/* Right Slide-over Drawer: 8-Part Evidence Chain Card */}
        {activeTarget && (
          <TargetEvidenceCard
            target={activeTarget}
            onClose={() => setActiveTargetId(null)}
            onAddTargetToRoute={handleAddTargetToRoute}
          />
        )}
      </main>

      {/* Environmental & Radiation Honesty Modal */}
      <EnvHonestyModal
        isOpen={isEnvHonestyOpen}
        onClose={() => setIsEnvHonestyOpen(false)}
        sepAlertActive={sepAlertActive}
        onTriggerSepAlert={() => setSepAlertActive(true)}
        onResetSepAlert={() => setSepAlertActive(false)}
      />
    </div>
  );
}
