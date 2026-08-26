import { useState, useEffect, useRef } from 'react';
import { wsClient } from '../services/wsClient';
import type{ TelemetryPayload } from '../types/hardware';

export interface Alert {
  id: string;
  time: string;
  message: string;
  level: 'WARNING' | 'CRITICAL' | 'INFO';
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  // We use a ref to track the last known state of each node without causing re-renders
  const nodeStates = useRef<Record<string, string>>({});

  useEffect(() => {
    const handleData = (data: TelemetryPayload) => {
      const prevState = nodeStates.current[data.node_id] || 'SAFE';
      const currentState = data.status;

      // Only trigger an alert if the status has CHANGED
      if (prevState !== currentState) {
        const timeStr = new Date(data.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        });

        let newAlert: Alert | null = null;

        if (currentState === 'CRITICAL') {
          newAlert = {
            id: `${data.node_id}-${Date.now()}`,
            time: timeStr,
            message: `CRITICAL: ${data.node_id} crack widened to ${data.crack_mm}mm!`,
            level: 'CRITICAL',
          };
        } else if (currentState === 'WARNING') {
          newAlert = {
            id: `${data.node_id}-${Date.now()}`,
            time: timeStr,
            message: `Warning: Anomalous movement at ${data.node_id}.`,
            level: 'WARNING',
          };
        } else if (currentState === 'SAFE' && (prevState === 'CRITICAL' || prevState === 'WARNING')) {
          newAlert = {
            id: `${data.node_id}-${Date.now()}`,
            time: timeStr,
            message: `${data.node_id} has stabilized.`,
            level: 'INFO',
          };
        }

        if (newAlert) {
          // Add new alert to the top of the feed, keeping a maximum of 50 history items
          setAlerts(prev => [newAlert!, ...prev].slice(0, 50));
        }
        
        // Update the tracked state
        nodeStates.current[data.node_id] = currentState;
      }
    };

    const unsubscribe = wsClient.subscribe(handleData);
    return () => { 
      unsubscribe(); 
    };
  }, []);

  return alerts;
}