import type { TelemetryPayload } from '../types/hardware';

type MessageCallback = (data: TelemetryPayload) => void;

class MeshWebSocket {
  private socket: WebSocket | null = null;
  private callbacks: Set<MessageCallback> = new Set();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly url: string;

  constructor() {
    const baseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws';
    // Guarantee we hit the exact FastAPI route, regardless of trailing slashes in the env file
    this.url = baseUrl.endsWith('/telemetry') ? baseUrl : `${baseUrl}/telemetry`;
  }

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket(this.url);

    this.socket.onmessage = (event) => {
      try {
        const payload: TelemetryPayload = JSON.parse(event.data);
        this.callbacks.forEach((cb) => cb(payload));
      } catch (err) {
        console.error('Failed to parse ESP32 telemetry packet:', err);
      }
    };

    this.socket.onclose = () => {
      // Auto-reconnect every 3 seconds if the backend goes down
      this.reconnectTimer = setTimeout(() => this.connect(), 3000);
    };
  }

  subscribe(callback: MessageCallback) {
    this.callbacks.add(callback);
    // Return an unsubscribe function for React's cleanup phase
    return () => this.callbacks.delete(callback);
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.socket?.close();
  }
}

export const wsClient = new MeshWebSocket();