import React, { useState } from 'react';
import TopNav from './components/TopNav';
import TacticalMap from './components/TacticalMap';
import HabitatPlanningConsole from './components/HabitatPlanningConsole';
import EvaVisorMode from './components/EvaVisorMode';
import WaypointInspectorDrawer from './components/WaypointInspectorDrawer';
import RouteTradeoffModal from './components/RouteTradeoffModal';
import SepAlertModal from './components/SepAlertModal';
import { WAYPOINTS, DATA_LAYERS_CONFIG, ENVIRONMENTAL_CONDITIONS } from './data/marsMissionData';

export default function App() {
  // Mode: 'HABITAT_CONSOLE' or 'EVA_VISOR'
  const [currentMode, setCurrentMode] = useState('HABITAT_CONSOLE');

  // Selected Route: 'route_a' or 'route_b'
  const [selectedRouteId, setSelectedRouteId] = useState('route_a');

  // Selected Waypoint ID (Defaults to WP-04 Cheyava Falls primary site)
  const [selectedWaypointId, setSelectedWaypointId] = useState('WP-04');

  // Active Layers Map
  const [activeLayers, setActiveLayers] = useState({
    optical: true,
    topography: true,
    spectral: true,
    atmospheric: false,
    radiation: false,
  });

  // SEP Alert State
  const [sepAlertActive, setSepAlertActive] = useState(false);

  // Tradeoff Modal State
  const [isTradeoffModalOpen, setIsTradeoffModalOpen] = useState(false);

  // Field Tasks State
  const [tasksState, setTasksState] = useState(() => {
    const initial = {};
    WAYPOINTS.forEach(wp => {
      wp.tasks.forEach(t => {
        initial[t.id] = t.done || false;
      });
    });
    return initial;
  });

  const toggleTask = (taskId) => {
    setTasksState(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleLayer = (layerId) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const triggerSepAlert = () => {
    setSepAlertActive(true);
    // Auto-enable radiation layer to show the emergency heatmap & shelter vector
    setActiveLayers(prev => ({
      ...prev,
      radiation: true
    }));
  };

  const resetSepAlert = () => {
    setSepAlertActive(false);
  };

  const handleNavigateToShelter = () => {
    // Select WP-02 (the boulder alcove with 68% terrain shielding)
    setSelectedWaypointId('WP-02');
  };

  const activeWaypoint = WAYPOINTS.find(w => w.id === selectedWaypointId) || null;

  return (
    <div className="w-screen h-screen flex flex-col bg-[#070B14] text-slate-100 overflow-hidden font-sans">
      {/* Top Mission Navigation & Telemetry Command Bar */}
      <TopNav
        currentMode={currentMode}
        setMode={setCurrentMode}
        selectedRouteId={selectedRouteId}
        setSelectedRouteId={setSelectedRouteId}
        sepAlertActive={sepAlertActive}
        triggerSepAlert={triggerSepAlert}
        resetSepAlert={resetSepAlert}
        environmentalConditions={ENVIRONMENTAL_CONDITIONS}
      />

      {/* Emergency Solar Energetic Particle (SEP) Warning Banner */}
      <SepAlertModal
        isActive={sepAlertActive}
        onDismiss={() => setSepAlertActive(false)}
        onNavigateToShelter={handleNavigateToShelter}
      />

      {/* Main Mode Viewport */}
      <main className="flex-1 w-full h-[calc(100vh-68px)] relative flex overflow-hidden">
        {currentMode === 'HABITAT_CONSOLE' ? (
          <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
            {/* Left & Center: Tactical Interactive Topographic Map & Planning Workspace */}
            <div className="flex-1 h-full flex flex-col overflow-hidden relative">
              {/* Tactical Topographic Map */}
              <div className="flex-1 h-full min-h-[350px] relative">
                <TacticalMap
                  activeLayers={activeLayers}
                  selectedRouteId={selectedRouteId}
                  selectedWaypointId={selectedWaypointId}
                  onSelectWaypoint={setSelectedWaypointId}
                  sepAlertActive={sepAlertActive}
                  currentMode={currentMode}
                  onOpenTradeoffModal={() => setIsTradeoffModalOpen(true)}
                />
              </div>

              {/* Bottom Drawer: Multi-Layer Planning Console */}
              <div className="h-60 sm:h-72 border-t border-slate-800 bg-[#070B14] z-20">
                <HabitatPlanningConsole
                  activeLayers={activeLayers}
                  toggleLayer={toggleLayer}
                  selectedRouteId={selectedRouteId}
                  setSelectedRouteId={setSelectedRouteId}
                  onSelectWaypoint={setSelectedWaypointId}
                  onOpenTradeoffModal={() => setIsTradeoffModalOpen(true)}
                />
              </div>
            </div>

            {/* Right Drawer: Waypoint Intelligence & POV Inspector */}
            {activeWaypoint && (
              <WaypointInspectorDrawer
                waypoint={activeWaypoint}
                onClose={() => setSelectedWaypointId(null)}
                tasksState={tasksState}
                onToggleTask={toggleTask}
              />
            )}
          </div>
        ) : (
          /* EVA VISOR / WRIST-PAD TACTICAL HUD MODE */
          <div className="w-full h-full flex overflow-hidden">
            <EvaVisorMode
              selectedWaypointId={selectedWaypointId}
              onSelectWaypoint={setSelectedWaypointId}
              sepAlertActive={sepAlertActive}
              tasksState={tasksState}
              onToggleTask={toggleTask}
            />
          </div>
        )}
      </main>

      {/* Route Trade-Off Analytical Modal */}
      <RouteTradeoffModal
        isOpen={isTradeoffModalOpen}
        onClose={() => setIsTradeoffModalOpen(false)}
        selectedRouteId={selectedRouteId}
        onSelectRoute={setSelectedRouteId}
      />
    </div>
  );
}
