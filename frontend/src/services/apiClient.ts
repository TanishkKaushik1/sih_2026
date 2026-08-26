import axios from 'axios';
import type{ TelemetryPayload } from '../types/hardware';

// Grabs the URL from the .env file we created earlier
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const fetchNodeHistory = async (nodeId: string, limit: number = 50): Promise<TelemetryPayload[]> => {
  try {
    const response = await axios.get(`${API_URL}/telemetry/${nodeId}?limit=${limit}`);
    // The database returns newest first. We reverse it so the chart plots left-to-right (time progression).
    return response.data.reverse();
  } catch (error) {
    console.error(`Failed to fetch history for ${nodeId}`, error);
    return [];
  }
};