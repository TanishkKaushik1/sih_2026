from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.database import get_db
from app.db.models import TelemetryRecord

router = APIRouter(prefix="/api/telemetry", tags=["telemetry"])

@router.get("/{node_id}")
async def get_node_history(node_id: str, limit: int = 50, db: AsyncSession = Depends(get_db)):
    """
    Fetch the historical telemetry data for a specific node.
    Results are ordered by the most recent timestamp first.
    """
    query = select(TelemetryRecord).where(
        TelemetryRecord.node_id == node_id
    ).order_by(
        TelemetryRecord.timestamp.desc()
    ).limit(limit)
    
    result = await db.execute(query)
    records = result.scalars().all()
    
    if not records:
        raise HTTPException(status_code=404, detail=f"No data found for node {node_id}")
        
    return records