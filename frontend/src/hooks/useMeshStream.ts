import { useEffect, useState } from 'react';
import { wsClient } from '../services/wsClient';
import type{ TelemetryPayload } from '../types/hardware';

export function useMeshStream() {
  // Store nodes in a dictionary for instant O(1) updates
  const [nodes, setNodes] = useState<Record<string, TelemetryPayload>>({});

  useEffect(() => {
    wsClient.connect();

    const unsubscribe = wsClient.subscribe((data) => {
      setNodes((prev) => ({
        ...prev,
        [data.node_id]: data,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { 
    nodes, 
    activeNodeCount: Object.keys(nodes).length,
    nodeList: Object.values(nodes) 
  };
}