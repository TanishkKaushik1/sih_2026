import React from 'react';
import { Card } from '../core/Card';
import type{ TelemetryPayload } from '../../types/hardware';
import { Vibrate, ArrowDownRight, Activity, Battery } from 'lucide-react';

interface SensorGaugeProps {
  data: TelemetryPayload;
}

export const SensorGauge: React.FC<SensorGaugeProps> = ({ data }) => {
  return (
    <Card title={`Node ${data.node_id.slice(-4)}`} status={data.status}>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Metric 
          icon={<ArrowDownRight size={16}/>} 
          label="Crack Disp." 
          value={`${data.crack_mm.toFixed(2)} mm`} 
        />
        <Metric 
          icon={<Vibrate size={16}/>} 
          label="Vibration" 
          value={data.vibration.toString()} 
        />
        <Metric 
          icon={<Activity size={16}/>} 
          label="Tilt (X/Y)" 
          value={`${data.tilt_x.toFixed(1)}° / ${data.tilt_y.toFixed(1)}°`} 
        />
        <Metric 
          icon={<Battery size={16}/>} 
          label="Power" 
          value={`${(data.battery_mv / 1000).toFixed(2)}V`} 
        />
      </div>
    </Card>
  );
};

const Metric = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex flex-col gap-1 p-3 bg-base rounded-lg border border-elevated">
    <div className="flex items-center gap-2 text-muted text-[10px] uppercase tracking-wider font-semibold">
      {icon} {label}
    </div>
    <div className="text-lg font-mono font-medium text-white">{value}</div>
  </div>
);