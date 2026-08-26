import React from 'react';
import { Card } from '../core/Card';
import { AlertTriangle, Info } from 'lucide-react';

interface Alert {
  id: string;
  time: string;
  message: string;
  level: 'WARNING' | 'CRITICAL' | 'INFO';
}

// Mock alerts until the AI backend is hooked up
const mockAlerts: Alert[] = [
  { id: '1', time: '10:24 AM', message: 'High Subsidence Risk Zone 7B', level: 'CRITICAL' },
  { id: '2', time: '09:15 AM', message: 'Vibration spike detected near Panel 4', level: 'WARNING' },
  { id: '3', time: '08:00 AM', message: 'Mesh network re-routed successfully', level: 'INFO' },
];

export const AlertFeed: React.FC = () => {
  return (
    <Card title="System Alerts" className="h-full">
      <div className="flex flex-col gap-3 mt-4 h-48 overflow-y-auto pr-2">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="flex gap-3 items-start p-3 bg-base rounded-lg border border-elevated">
            <div className="mt-0.5">
              {alert.level === 'CRITICAL' && <AlertTriangle size={18} className="text-critical" />}
              {alert.level === 'WARNING' && <AlertTriangle size={18} className="text-warning" />}
              {alert.level === 'INFO' && <Info size={18} className="text-safe" />}
            </div>
            <div>
              <div className="text-xs text-muted font-mono mb-1">{alert.time}</div>
              <div className="text-sm font-medium text-gray-200">{alert.message}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};