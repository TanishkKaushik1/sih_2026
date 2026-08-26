import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Card } from '../components/core/Card';

export const Settings: React.FC = () => {
  return (
    <DashboardLayout>
      <header className="mb-8 border-b border-elevated pb-6">
        <h2 className="text-3xl font-bold tracking-tight">System Configuration</h2>
        <p className="text-muted mt-2">Manage edge thresholds and AI parameters</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Hardware Alarm Thresholds">
          <div className="flex flex-col gap-5 mt-4">
            <ThresholdInput label="Critical Tilt Pitch/Roll (Degrees)" defaultValue="15.0" />
            <ThresholdInput label="Vibration Intensity Limit" defaultValue="850" />
            <ThresholdInput label="Crack Displacement (mm)" defaultValue="5.0" />
            <button className="mt-4 bg-safe hover:bg-emerald-500 text-black font-bold py-2 px-4 rounded transition-colors w-full">
              Save Hardware Limits
            </button>
          </div>
        </Card>

        <Card title="LoRa Mesh Configuration">
          <div className="flex flex-col gap-5 mt-4">
            <ThresholdInput label="Telemetry Interval (Seconds)" defaultValue="30" />
            <ThresholdInput label="Deep Sleep Cycle (Minutes)" defaultValue="15" />
            <button className="mt-4 bg-elevated hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors w-full border border-gray-600">
              Push Config to Gateway
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const ThresholdInput = ({ label, defaultValue }: { label: string, defaultValue: string }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs uppercase tracking-wider text-muted font-bold">{label}</label>
    <input 
      type="text" 
      defaultValue={defaultValue}
      className="bg-base border border-elevated rounded-lg p-3 text-white font-mono focus:outline-none focus:border-safe transition-colors"
    />
  </div>
);