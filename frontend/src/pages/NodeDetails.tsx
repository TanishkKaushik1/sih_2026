import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { TrendChart } from '../components/telemetry/TrendChart';
import { fetchNodeHistory } from '../services/apiClient';
import type{ TelemetryPayload } from '../types/hardware';

export const NodeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [history, setHistory] = useState<TelemetryPayload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchNodeHistory(id, 50).then(data => {
        setHistory(data);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <DashboardLayout>
      <header className="mb-8 border-b border-elevated pb-6 flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="p-2 bg-surface border border-elevated rounded-lg hover:bg-elevated transition-colors text-muted hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-mono">{id}</h2>
          <p className="text-muted mt-1 uppercase tracking-widest text-xs">Historical Telemetry Analysis</p>
        </div>
      </header>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-muted animate-pulse">
          Fetching historical data from Supabase...
        </div>
      ) : history.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-muted">
          No historical records found for this node.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart 
            title="Crack Displacement (mm)" 
            data={history} 
            dataKey="crack_mm" 
            color="#EF4444" 
            unit=" mm"
          />
          <TrendChart 
            title="Vibration Intensity" 
            data={history} 
            dataKey="vibration" 
            color="#F59E0B" 
            unit=""
          />
          <TrendChart 
            title="Tilt X (Pitch)" 
            data={history} 
            dataKey="tilt_x" 
            color="#10B981" 
            unit="°"
          />
          <TrendChart 
            title="Battery Voltage" 
            data={history} 
            dataKey="battery_mv" 
            color="#3B82F6" 
            unit=" mV"
          />
        </div>
      )}
    </DashboardLayout>
  );
};