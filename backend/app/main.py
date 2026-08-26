from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
import random
from datetime import datetime, timezone
from app.api.websockets import manager

# --- Mock Hardware Data Generator ---
async def simulate_esp32_mesh():
    """Simulates the Edge Gateway receiving MQTT payloads from the mesh network."""
    node_ids = ['NODE_A1F4', 'NODE_B2C9', 'NODE_C3E1', 'NODE_D4B7']
    
    while True:
        await asyncio.sleep(2.0) # Gateway pushes data every 2 seconds
        
        for idx, node_id in enumerate(node_ids):
            crack_val = random.uniform(0.5, 6.0) if idx == 0 else random.uniform(0.1, 2.5)
            status = 'CRITICAL' if crack_val > 5.0 else 'WARNING' if crack_val > 3.0 else 'SAFE'
            
            payload = {
                "node_id": node_id,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "tilt_x": round(random.uniform(-5.0, 5.0), 2),
                "tilt_y": round(random.uniform(-5.0, 5.0), 2),
                "vibration": random.randint(10, 150),
                "crack_mm": round(crack_val, 2),
                "battery_mv": random.randint(3200, 4200),
                "status": status
            }
            
            # Broadcast the telemetry to the React frontend
            await manager.broadcast(payload)

# Lifespan context manages background tasks in FastAPI
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the hardware simulator when the server boots
    task = asyncio.create_task(simulate_esp32_mesh())
    yield
    # Cancel the task when the server shuts down
    task.cancel()

app = FastAPI(title="RadxaMesh API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "RadxaMesh Subsidence AI Backend is running."}

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection open and listen for client messages if needed
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Frontend dashboard disconnected")