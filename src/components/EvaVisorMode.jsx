import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Battery, 
  Wind, 
  Heart, 
  Compass, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Radio, 
  Bot, 
  User, 
  Footprints,
  Eye,
  Maximize2
} from 'lucide-react';
import { ASTRONAUT_TELEMETRY, WAYPOINTS, ENVIRONMENTAL_CONDITIONS } from '../data/marsMissionData';
import PovLandmarkViewer from './PovLandmarkViewer';

export default function EvaVisorMode({
  selectedWaypointId,
  onSelectWaypoint,
  sepAlertActive,
  tasksState,
  onToggleTask
}) {
  const [currentWaypoint, setCurrentWaypoint] = useState(
    WAYPOINTS.find(w => w.id === selectedWaypointId) || WAYPOINTS[3] // Default to Cheyava Falls
  );

  // Live heart rate micro-fluctuation simulation
  const [pulse1, setPulse1] = useState(84);
  const [pulse2, setPulse2] = useState(76);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse1(82 + Math.floor(Math.random() * 6));
      setPulse2(74 + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Update current waypoint if changed externally
  useEffect(() => {
    const wp = WAYPOINTS.find(w => w.id === selectedWaypointId);
    if (wp) setCurrentWaypoint(wp);
  }, [selectedWaypointId]);

  return (
    <div className="w-full h-full flex flex-col bg-[#040711] text-slate-100 overflow-y-auto select-none p-3 sm:p-5 space-y-4">
      {/* VISOR HUD TOP BANNER: WALK-BACK SAFETY & RADIATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Walk-Back Safety Timer */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-lg shadow-cyan-950/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                Walk-Back Safety Limit
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                01:42:18 <span className="text-xs text-emerald-400 font-normal">MARGIN OK</span>
              </div>
            </div>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            <div>DIST TO HAB: <span className="text-white font-bold">840 m</span></div>
            <div>PACE: <span className="text-cyan-400">3.2 km/h</span></div>
          </div>
        </div>

        {/* Real-Time Slope Hazard Meter */}
        <div className={`p-3.5 rounded-xl border shadow-lg flex items-center justify-between ${
          currentWaypoint.hazardLevel === 'DANGER'
            ? 'bg-red-950/80 border-red-500 text-red-200'
            : currentWaypoint.hazardLevel === 'CAUTION'
            ? 'bg-amber-950/80 border-amber-500 text-amber-200'
            : 'bg-slate-900/90 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-lg border ${
              currentWaypoint.hazardLevel === 'DANGER' ? 'bg-red-900 border-red-600 text-red-300' :
              currentWaypoint.hazardLevel === 'CAUTION' ? 'bg-amber-900 border-amber-600 text-amber-300' :
              'bg-emerald-950 border-emerald-700 text-emerald-300'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider">
                Pitch & Slope Angle
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                {currentWaypoint.slopeAngle}° <span className="text-xs font-semibold uppercase">[{currentWaypoint.hazardLevel}]</span>
              </div>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div>LIMIT: &lt;15.0°</div>
            <div className="text-[10px] opacity-80">
              {currentWaypoint.slopeAngle > 10 ? 'MULE ANCHOR ON' : 'SOLO TRAVERSE'}
            </div>
          </div>
        </div>

        {/* Space Weather Radiation Monitor */}
        <div className={`p-3.5 rounded-xl border shadow-lg flex items-center justify-between ${
          sepAlertActive
            ? 'bg-red-950/95 border-red-500 text-red-100 animate-pulse'
            : 'bg-slate-900/90 border-slate-700 text-slate-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-lg border ${
              sepAlertActive ? 'bg-red-800 border-red-400 text-white' : 'bg-slate-800 border-slate-700 text-cyan-400'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                Space Weather (RAD/MAVEN)
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                {sepAlertActive ? 'SEP STORM!' : '0.64 mSv/d'}
              </div>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className={sepAlertActive ? 'text-red-300 font-bold' : 'text-emerald-400'}>
              {sepAlertActive ? 'CRITICAL EVAC' : 'GCR BACKGROUND'}
            </div>
            <div className="text-[10px] text-slate-400">
              {sepAlertActive ? 'SHELTER: WP-02 ALCOVE' : 'SHIELDING 100%'}
            </div>
          </div>
        </div>
      </div>

      {/* CREW & ROVER TACTICAL TELEMETRY HUD TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Astronaut 1 (Lead Geologist) */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-white">EVA-1 // DR. MAYA CHEN</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
              LEAD GEOLOGIST
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>O2 RESERVE</span>
                <span className="text-cyan-400 font-bold">82%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-full w-[82%]"></div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>BATTERY</span>
                <span className="text-emerald-400 font-bold">78%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[78%]"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
            <div className="flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span>{pulse1} BPM</span>
            </div>
            <div>PRES: <span className="text-slate-200">29.6 kPa</span></div>
            <div>TEMP: <span className="text-slate-200">21.4°C</span></div>
          </div>
        </div>

        {/* Astronaut 2 (Systems & Safety) */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-white">EVA-2 // LEO VANCE</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950 border border-amber-800">
              SAFETY SPECIALIST
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>O2 RESERVE</span>
                <span className="text-cyan-400 font-bold">86%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-full w-[86%]"></div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>BATTERY</span>
                <span className="text-emerald-400 font-bold">81%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[81%]"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
            <div className="flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span>{pulse2} BPM</span>
            </div>
            <div>PRES: <span className="text-slate-200">29.7 kPa</span></div>
            <div>TEMP: <span className="text-slate-200">21.1°C</span></div>
          </div>
        </div>

        {/* Robotic Carrier Mule (MARS-CARRIER-01) */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-white">ROBOTIC MULE // MARS-01</span>
            </div>
            <span className="text-[10px] font-mono text-blue-400 px-2 py-0.5 rounded bg-blue-950 border border-blue-800">
              AUTONOMOUS CARRIER
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>MULE POWER</span>
                <span className="text-emerald-400 font-bold">94%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[94%]"></div>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <div className="text-slate-400 text-[10px] flex items-center justify-between">
                <span>SAMPLE TUBES</span>
                <span className="text-cyan-400 font-bold">3 / 10 LOADED</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-purple-500 h-full w-[30%]"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
            <div>RANGE: <span className="text-slate-200">4.8 m TETHER</span></div>
            <div>PAYLOAD: <span className="text-slate-200">42.5 / 120 kg</span></div>
            <div className="text-emerald-400 font-bold">HAZCAM OK</div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: ACTIVE TARGET POV PREVIEW & TACTICAL FIELD TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Eye-Level Ground POV Target Landmark */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                Visor Ground Recognition: {currentWaypoint.id} - {currentWaypoint.name}
              </h3>
            </div>

            {/* Quick Waypoint Switcher for Visor */}
            <div className="flex items-center space-x-1 text-xs font-mono">
              {WAYPOINTS.map(wp => (
                <button
                  key={wp.id}
                  onClick={() => {
                    setCurrentWaypoint(wp);
                    onSelectWaypoint(wp.id);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    currentWaypoint.id === wp.id
                      ? 'bg-cyan-500 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {wp.id}
                </button>
              ))}
            </div>
          </div>

          <PovLandmarkViewer waypoint={currentWaypoint} />
        </div>

        {/* Right: Quick Action Tasks & Emergency Visor Protocols */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="font-bold text-white uppercase tracking-wider">
                Active Tactical Tasks: {currentWaypoint.id}
              </span>
              <span className="text-cyan-400">
                {currentWaypoint.tasks.filter(t => tasksState[t.id]).length} / {currentWaypoint.tasks.length} DONE
              </span>
            </div>

            <div className="space-y-2">
              {currentWaypoint.tasks.map(task => {
                const isChecked = Boolean(tasksState[task.id]);

                return (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className={`p-3 rounded-lg border text-xs font-mono cursor-pointer flex items-center justify-between transition-all ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-slate-300'
                        : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 pr-2">
                      <span className={`w-2 h-2 rounded-full ${isChecked ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                      <span className={`font-sans ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.label}
                      </span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 shrink-0">
                      {task.role}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Astronaut Visor Quick Action Buttons */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 mt-3">
            <div className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
              Tactical Wrist-Pad Controls
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => alert("Sample Seal Logged: Core sample tube tagged with timestamp & GPS coordinates.")}
                className="p-2 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 font-bold transition-all text-center"
              >
                + LOG SAMPLE TUBE
              </button>
              <button
                onClick={() => alert("Carrier Mule Command: MARS-CARRIER-01 deploying stabilization tether to astronaut harness.")}
                className="p-2 rounded bg-blue-950 hover:bg-blue-900 border border-blue-700 text-blue-300 font-bold transition-all text-center"
              >
                SUMMON MULE ROVER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
