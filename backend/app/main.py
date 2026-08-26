from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
import random
from datetime import datetime, timezone
from app.api.websockets import manager
from app.db.database import engine, Base, AsyncSessionLocal
from app.db.models import TelemetryRecord
from app.api.routes import router as telemetry_router # <-- Add this line
from app.api.websockets import manager
from app.db.database import engine, Base, AsyncSessionLocal
from app.db.models import TelemetryRecord

async def simulate_esp32_mesh():
    """Simulates the Edge Gateway receiving MQTT payloads and saving them to Supabase."""
    node_ids = ['NODE_A1F4', 'NODE_B2C9', 'NODE_C3E1', 'NODE_D4B7']
    
    while True:
        await asyncio.sleep(2.0) 
        
        # Open a database session
        async with AsyncSessionLocal() as db:
            for idx, node_id in enumerate(node_ids):
                crack_val = random.uniform(0.5, 6.0) if idx == 0 else random.uniform(0.1, 2.5)
                status = 'CRITICAL' if crack_val > 5.0 else 'WARNING' if crack_val > 3.0 else 'SAFE'
                
                # 1. Create the Database Record
                db_record = TelemetryRecord(
                    node_id=node_id,
                    timestamp=datetime.now(timezone.utc),
                    tilt_x=round(random.uniform(-5.0, 5.0), 2),
                    tilt_y=round(random.uniform(-5.0, 5.0), 2),
                    vibration=random.randint(10, 150),
                    crack_mm=round(crack_val, 2),
                    battery_mv=random.randint(3200, 4200),
                    status=status
                )
                db.add(db_record)
                
                # 2. Broadcast to the Frontend
                payload = {
                    "node_id": db_record.node_id,
                    "timestamp": db_record.timestamp.isoformat(),
                    "tilt_x": db_record.tilt_x,
                    "tilt_y": db_record.tilt_y,
                    "vibration": db_record.vibration,
                    "crack_mm": db_record.crack_mm,
                    "battery_mv": db_record.battery_mv,
                    "status": db_record.status
                }
                await manager.broadcast(payload)
            
            # Commit all new records to Supabase
            await db.commit()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables in Supabase if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    task = asyncio.create_task(simulate_esp32_mesh())
    yield
    task.cancel()
    await engine.dispose()

app = FastAPI(title="RadxaMesh API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Register the REST API routes
app.include_router(telemetry_router)

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)