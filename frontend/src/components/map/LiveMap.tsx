import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type{ TelemetryPayload } from '../../types/hardware';

interface LiveMapProps {
  nodes: TelemetryPayload[];
}

export const LiveMap: React.FC<LiveMapProps> = ({ nodes }) => {
  // Center coordinates for the mine (defaulting to a generic location for now)
  const mapCenter: [number, number] = [23.7957, 86.4304]; // Dhanbad coalfield region

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CRITICAL': return '#EF4444'; // Tailwind text-critical
      case 'WARNING': return '#F59E0B';  // Tailwind text-warning
      default: return '#10B981';         // Tailwind text-safe
    }
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-elevated relative z-0">
      <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%', background: '#121212' }}>
        {/* CartoDB Dark Matter Tiles - perfect for your dark theme */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        
        {nodes.map((node, index) => {
          // Mocking slight coordinate offsets so nodes don't stack on each other
          const lat = mapCenter[0] + (index * 0.01 - 0.005);
          const lng = mapCenter[1] + (index * 0.01 - 0.005);

          return (
            <CircleMarker 
              key={node.node_id} 
              center={[lat, lng]}
              radius={8}
              pathOptions={{ 
                color: getStatusColor(node.status), 
                fillColor: getStatusColor(node.status),
                fillOpacity: 0.7 
              }}
            >
              <Popup className="bg-surface text-white border-elevated">
                <div className="font-mono">
                  <strong>Node: {node.node_id.slice(-4)}</strong><br/>
                  Status: {node.status}<br/>
                  Crack: {node.crack_mm} mm
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};