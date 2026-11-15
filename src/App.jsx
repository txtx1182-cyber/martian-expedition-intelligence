import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import LayerDrawer from './components/LayerDrawer';
import MarsTrekMap from './components/MarsTrekMap';
import TargetIntelligenceDrawer from './components/TargetIntelligenceDrawer';
import SepAlertBanner from './components/SepAlertBanner';
import { RESEARCH_TARGETS, MAP_LAYERS_CONFIG } from './data/marsDossierData';

export default function App() {
  // Layer Opacities State
  const [layerOpacities, setLayerOpacities] = useState({
    optical: 1.0,
    jezero_ctx: 0.85,
    themis_ir: 0.40,
    mola_dem: 0.35,
  });

  // Active Research Target (defaults to Target 04 Cheyava Falls)
  const [activeTargetId, setActiveTargetId] = useState('target-04');

  // Corridor line toggle
  const [showCorridor, setShowCorridor] = useState(true);

  // Environmental / Space weather overlay toggle
  const [showEnvOverlay, setShowEnvOverlay] = useState(true);

  // SEP Alert State
  const [sepAlertActive, setSepAlertActive] = useState(false);

  const handleOpacityChange = (layerId, newOpacity) => {
    setLayerOpacities(prev => ({
      ...prev,
      [layerId]: newOpacity
    }));
  };

  const handleTriggerSepAlert = () => {
    setSepAlertActive(true);
    setShowEnvOverlay(true);
  };

  const handleResetSepAlert = () => {
    setSepAlertActive(false);
  };

  const activeTarget = RESEARCH_TARGETS.find(t => t.id === activeTargetId) || null;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#F8F9FA] text-[#0F172A] font-sans overflow-hidden">
      {/* Top Editorial Command & Telemetry Bar */}
      <HeaderBar
        sepAlertActive={sepAlertActive}
        onTriggerSepAlert={handleTriggerSepAlert}
        onResetSepAlert={handleResetSepAlert}
        activeTargetId={activeTargetId}
        onSelectTarget={setActiveTargetId}
      />

      {/* Emergency SEP Proton Storm Alarm Dropdown */}
      <SepAlertBanner
        isActive={sepAlertActive}
        onDismiss={() => setSepAlertActive(false)}
        onNavigateToShelter={(shelterId) => setActiveTargetId(shelterId)}
      />

      {/* Main Full-Viewport Spatial Workspace */}
      <main className="flex-1 w-full h-[calc(100vh-68px)] relative flex overflow-hidden">
        {/* Left Floating Drawer: Satellite Tile Layers & Research Corridor */}
        <LayerDrawer
          layerOpacities={layerOpacities}
          onOpacityChange={handleOpacityChange}
          showCorridor={showCorridor}
          onToggleCorridor={() => setShowCorridor(prev => !prev)}
          showEnvOverlay={showEnvOverlay}
          onToggleEnvOverlay={() => setShowEnvOverlay(prev => !prev)}
          sepAlertActive={sepAlertActive}
          onTriggerSepAlert={handleTriggerSepAlert}
          onResetSepAlert={handleResetSepAlert}
          activeTargetId={activeTargetId}
          onSelectTarget={setActiveTargetId}
        />

        {/* Center: Real NASA Mars Trek Satellite Map Engine (Leaflet) */}
        <div className="flex-1 h-full relative overflow-hidden">
          <MarsTrekMap
            layerOpacities={layerOpacities}
            activeTargetId={activeTargetId}
            onSelectTarget={setActiveTargetId}
            sepAlertActive={sepAlertActive}
            showCorridor={showCorridor}
            showEnvOverlay={showEnvOverlay}
          />
        </div>

        {/* Right Slide-over Drawer: Scientific Evidence & Astronaut EVA Intelligence */}
        {activeTarget && (
          <TargetIntelligenceDrawer
            target={activeTarget}
            onClose={() => setActiveTargetId(null)}
          />
        )}
      </main>
    </div>
  );
}
