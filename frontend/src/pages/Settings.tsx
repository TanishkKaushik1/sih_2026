import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/core/Card';
import { Save, Sliders, Radio, BookOpen, AlertTriangle, Cpu, Network } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <DashboardLayout>
      <header className="mb-8 border-b border-elevated pb-6">
        <h2 className="text-3xl font-bold tracking-tight">System Configuration</h2>
        <p className="text-muted mt-2">Manage edge thresholds, AI parameters, and deployment guidelines</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Side: Configurations (Takes up 2 columns) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <Card title={
              <div className="flex items-center gap-2">
                <Sliders size={20} className="text-safe" />
                <span>Hardware Alarm Thresholds</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <ThresholdInput 
                label="Critical Tilt (Degrees)" 
                description="Pitch/Roll angle to trigger structural warning"
                defaultValue="15.0" 
              />
              <ThresholdInput 
                label="Vibration Limit (Hz)" 
                description="Max baseline before seismic anomaly"
                defaultValue="850" 
              />
              <ThresholdInput 
                label="Crack Displacement (mm)" 
                description="Physical widening limit for extensometers"
                defaultValue="5.0" 
              />
              <div className="flex items-end pb-1">
                <button className="bg-safe hover:bg-emerald-500 text-black font-bold py-3 px-4 rounded-xl transition-colors w-full flex items-center justify-center gap-2">
                  <Save size={18} />
                  Save Hardware Limits
                </button>
              </div>
            </div>
          </Card>

          <Card 
            title={
              <div className="flex items-center gap-2">
                <Radio size={20} className="text-warning" />
                <span>ESP-NOW Mesh Parameters</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <ThresholdInput 
                label="Telemetry Interval (Sec)" 
                description="Frequency of data transmission"
                defaultValue="30" 
              />
              <ThresholdInput 
                label="Deep Sleep Cycle (Min)" 
                description="Battery saving mode duration"
                defaultValue="15" 
              />
            </div>
            <button className="mt-6 bg-surface hover:bg-elevated text-white font-bold py-3 px-4 rounded-xl transition-colors w-full border border-elevated flex items-center justify-center gap-2">
              <Network size={18} />
              Push Config to Gateway
            </button>
          </Card>
        </div>

        {/* Right Side: Guide (Takes up 1 column) */}
        <div className="xl:col-span-1">
          <Card 
            title={
              <div className="flex items-center gap-2 text-blue-400">
                <BookOpen size={20} />
                <span>Deployment Guide</span>
              </div>
            }
            className="h-full"
          >
            <div className="flex flex-col gap-6 mt-6">
              
              <GuideItem 
                icon={<Cpu size={20} className="text-muted" />}
                title="1. Node Placement"
                description="Attach ESP32 nodes firmly to structural pillars or tunnel walls. Ensure the MPU6050 is perfectly level during initialization to calibrate zero-tilt."
              />
              
              <GuideItem 
                icon={<Network size={20} className="text-muted" />}
                title="2. Mesh Topology"
                description="The ESP-NOW protocol handles multi-hop routing automatically. Ensure no node is placed further than 150 meters from its nearest neighbor in open air, or 50 meters in dense rock."
              />
              
              <GuideItem 
                icon={<AlertTriangle size={20} className="text-muted" />}
                title="3. AI Anomaly Engine"
                description="The Isolation Forest algorithm requires at least 24 hours of baseline telemetry data before it can accurately filter out standard mining blasts from genuine subsidence events."
              />

            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

// --- Subcomponents for cleaner code ---

const ThresholdInput = ({ label, description, defaultValue }: { label: string, description: string, defaultValue: string }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs uppercase tracking-wider text-gray-300 font-bold">{label}</label>
    <p className="text-[10px] text-muted mb-1">{description}</p>
    <input 
      type="text" 
      defaultValue={defaultValue}
      className="bg-base border border-elevated rounded-lg p-3 text-white font-mono focus:outline-none focus:border-safe focus:ring-1 focus:ring-safe transition-all"
    />
  </div>
);

const GuideItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex gap-4">
    <div className="mt-1 bg-base p-2 rounded-lg border border-elevated h-fit">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-gray-200 mb-1">{title}</h4>
      <p className="text-xs text-muted leading-relaxed">{description}</p>
    </div>
  </div>
);