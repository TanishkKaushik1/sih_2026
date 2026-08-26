import React from 'react';
import { Card } from '../core/Card';
import { AlertTriangle, Info } from 'lucide-react';
import { useAlerts } from '../../hooks/useAlerts';

export const AlertFeed: React.FC = () => {
  const alerts = useAlerts();

  return (
    <Card title="System Alerts" className="h-full">
      <div className="flex flex-col gap-3 mt-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="text-muted text-sm flex items-center justify-center h-full">
            No anomalous activity detected.
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="flex gap-3 items-start p-3 bg-base rounded-lg border border-elevated animate-fade-in">
              <div className="mt-0.5">
                {alert.level === 'CRITICAL' && <AlertTriangle size={18} className="text-critical" />}
                {alert.level === 'WARNING' && <AlertTriangle size={18} className="text-warning" />}
                {alert.level === 'INFO' && <Info size={18} className="text-safe" />}
              </div>
              <div>
                <div className="text-[10px] text-muted font-mono mb-1">{alert.time}</div>
                <div className="text-sm font-medium text-gray-200">{alert.message}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};