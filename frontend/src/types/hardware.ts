// src/types/hardware.ts

export type NodeStatus = 'SAFE' | 'WARNING' | 'CRITICAL';

export interface TelemetryPayload {
  node_id: string;
  timestamp: string;      // ISO 8601 format
  tilt_x: number;         // MPU-6050 Pitch (degrees)
  tilt_y: number;         // MPU-6050 Roll (degrees)
  vibration: number;      // SW-420 Activity count/intensity
  crack_mm: number;       // Linear Potentiometric Transducer (mm displacement)
  battery_mv: number;     // 18650 Li-ion Voltage (millivolts)
  status: NodeStatus;     // AI/Edge computed risk level
}

export interface NodeMetadata {
  node_id: string;
  latitude: number;
  longitude: number;
  installation_date: string;
  last_active: string;
}