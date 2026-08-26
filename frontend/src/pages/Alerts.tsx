import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useAlerts } from '../hooks/useAlerts';
import { AlertTriangle, Info } from 'lucide-react';
import { Card } from '../components/core/Card';

export const Alerts: React.FC = () => {
  const alerts = useAlerts();

  return (
    <DashboardLayout>
      <header className="mb-8 border-b border-elevated pb-6">
        <h2 className="text-3xl font-bold tracking-tight">System Alerts Log</h2>
        <p className="text-muted mt-2">Comprehensive history of mesh network warnings and anomalies</p>
      </header>

      <Card title="Session History" className="min-h-[500px]">
        <div className="flex flex-col gap-4 mt-4">
          {alerts.length === 0 ? (
            <div className="text-muted text-center py-10 flex flex-col items-center gap-2">
              <Info size={32} className="text-safe opacity-50" />
              <span>No alerts recorded in this session. Network is stable.</span>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="flex gap-4 items-center p-4 bg-base rounded-lg border border-elevated animate-fade-in">
                <div className="flex-shrink-0">
                  {alert.level === 'CRITICAL' && <AlertTriangle size={24} className="text-critical" />}
                  {alert.level === 'WARNING' && <AlertTriangle size={24} className="text-warning" />}
                  {alert.level === 'INFO' && <Info size={24} className="text-safe" />}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium text-gray-200">{alert.message}</div>
                  <div className="text-xs text-muted font-mono mt-1">
                    Event ID: {alert.id}
                  </div>
                </div>
                <div className="text-sm text-muted font-mono bg-surface px-4 py-2 rounded-lg border border-elevated shadow-inner">
                  {alert.time}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
};