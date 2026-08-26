import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useMockStream } from '../hooks/useMockStream';
import { SensorGauge } from '../components/telemetry/SensorGauge';
import { LiveMap } from '../components/map/LiveMap';
import { AlertFeed } from '../components/telemetry/AlertFeed';

export const Overview: React.FC = () => {
  // Swapped useMeshStream to useMockStream to match the import and test the UI
  const { nodeList, activeNodeCount } = useMockStream();

  return (
    <DashboardLayout>
      <header className="mb-8 flex justify-between items-end border-b border-elevated pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subsidence Monitor</h2>
          <p className="text-muted mt-2">Real-time ESP-NOW multi-hop mesh network</p>
        </div>
        <div className="text-right bg-surface px-6 py-3 rounded-xl border border-elevated">
          <div className="text-4xl font-mono font-bold text-safe">{activeNodeCount}</div>
          <div className="text-muted text-xs uppercase tracking-widest font-bold mt-1">Active Nodes</div>
        </div>
      </header>

      {/* Top Grid: Map & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 h-[400px]">
        <div className="lg:col-span-2">
          <LiveMap nodes={nodeList} />
        </div>
        <div className="lg:col-span-1">
          <AlertFeed />
        </div>
      </div>

      <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Live Telemetry Feeds</h3>
      
      {nodeList.length === 0 ? (
        <div className="p-10 border border-elevated border-dashed rounded-2xl text-center text-muted bg-surface flex flex-col items-center justify-center h-48">
          <span className="animate-pulse">Waiting for gateway data stream...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {nodeList.map((node) => (
            <SensorGauge key={node.node_id} data={node} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};