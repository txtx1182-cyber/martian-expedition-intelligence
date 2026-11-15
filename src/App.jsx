import React, { useState } from 'react';
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
  const [activeMapMode, setActiveMapMode] = useState('OPTICAL');

  // Tile Layer Opacities
  const [layerOpacities, setLayerOpacities] = useState({
    mars_optical: 1.0,
    mola_color: 0.65,
    mola_gray: 0.50,
    celestia_shaded: 0.40
  });

  // Active Target ID (Default to T4 Bright Angel / Cheyava Falls)
  const [activeTargetId, setActiveTargetId] = useState('T4');

  // Active Sortie / Expedition ID (Default to Preset 1: Full Basin Transect ~55.6 km)
  const [activeSortieId, setActiveSortieId] = useState('preset-1');

  // Custom User Placed Waypoints
  const [customWaypoints, setCustomWaypoints] = useState([]);
  const [isPlacingWaypoint, setIsPlacingWaypoint] = useState(false);

  // Environmental Honesty Modal State
  const [isEnvHonestyOpen, setIsEnvHonestyOpen] = useState(false);

  // SEP Alert State
  const [sepAlertActive, setSepAlertActive] = useState(false);

  // Hovered Traverse Point along Elevation Profile
  const [hoveredTraversePoint, setHoveredTraversePoint] = useState(null);

  const handleOpacityChange = (layerId, newOpacity) => {
    setLayerOpacities(prev => ({
      ...prev,
      [layerId]: newOpacity
    }));
  };

  const handleAddCustomWaypoint = (latlng) => {
    if (!isPlacingWaypoint) return;
    setCustomWaypoints(prev => [...prev, latlng]);
  };

  const handleClearCustomWaypoints = () => {
    setCustomWaypoints([]);
    setIsPlacingWaypoint(false);
  };

  const handleSelectSortie = (sortieId) => {
    setActiveSortieId(sortieId);
    setCustomWaypoints([]);
    setIsPlacingWaypoint(false);

    if (sortieId === 'preset-1') {
      setActiveTargetId('T4');
    } else if (sortieId === 'preset-2') {
      setActiveTargetId('T3');
    }
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
      <main className="flex-1 w-full h-[calc(100vh-68px)] relative flex overflow-hidden">
        {/* Left Floating Drawer: Traverse Planner & 4 Planetary Map Modes */}
        <TraversePlannerDrawer
          activeMapMode={activeMapMode}
          onSelectMapMode={setActiveMapMode}
          layerOpacities={layerOpacities}
          onOpacityChange={handleOpacityChange}
          activeSortieId={activeSortieId}
          onSelectSortie={handleSelectSortie}
          activeTargetId={activeTargetId}
          onSelectTarget={setActiveTargetId}
          customWaypoints={customWaypoints}
          onClearCustomWaypoints={handleClearCustomWaypoints}
          isPlacingWaypoint={isPlacingWaypoint}
          onTogglePlaceWaypoint={() => setIsPlacingWaypoint(prev => !prev)}
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
              activeSortieId={activeSortieId}
              onSelectSortie={handleSelectSortie}
              customWaypoints={customWaypoints}
              onAddCustomWaypoint={handleAddCustomWaypoint}
              isPlacingWaypoint={isPlacingWaypoint}
              sepAlertActive={sepAlertActive}
              hoveredTraversePoint={hoveredTraversePoint}
            />
          </div>

          {/* Collapsible Bottom Drawer: Along-Track Elevation Profile */}
          <ElevationProfileDrawer
            onHoverPoint={setHoveredTraversePoint}
            hoveredPoint={hoveredTraversePoint}
            onSelectTarget={setActiveTargetId}
          />
        </div>

        {/* Right Slide-over Drawer: 8-Part Evidence Chain Card */}
        {activeTarget && (
          <TargetEvidenceCard
            target={activeTarget}
            onClose={() => setActiveTargetId(null)}
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
