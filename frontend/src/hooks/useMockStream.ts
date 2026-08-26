import { useState, useEffect } from 'react';
import type{ TelemetryPayload } from '../types/hardware';

export function useMockStream() {
  const [nodes, setNodes] = useState<Record<string, TelemetryPayload>>({});

  useEffect(() => {
    // Generate 4 mock nodes
    const mockNodeIds = ['NODE_A1F4', 'NODE_B2C9', 'NODE_C3E1', 'NODE_D4B7'];
    
    const interval = setInterval(() => {
      const now = new Date().toISOString();
      const newNodes: Record<string, TelemetryPayload> = {};

      mockNodeIds.forEach((id, index) => {
        // Randomize some slight variations to simulate live data
        const crack = Math.random() * (index === 0 ? 6 : 2); // Make Node A critical
        const status = crack > 5 ? 'CRITICAL' : crack > 3 ? 'WARNING' : 'SAFE';

        newNodes[id] = {
          node_id: id,
          timestamp: now,
          tilt_x: (Math.random() * 5) - 2.5,
          tilt_y: (Math.random() * 5) - 2.5,
          vibration: Math.floor(Math.random() * 100),
          crack_mm: parseFloat(crack.toFixed(2)),
          battery_mv: 3700 - (Math.random() * 100),
          status: status as 'SAFE' | 'WARNING' | 'CRITICAL'
        };
      });

      setNodes(newNodes);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return { 
    nodes, 
    activeNodeCount: Object.keys(nodes).length,
    nodeList: Object.values(nodes) 
  };
}