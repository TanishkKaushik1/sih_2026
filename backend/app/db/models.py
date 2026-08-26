from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timezone
from app.db.database import Base

class TelemetryRecord(Base):
    __tablename__ = "telemetry_data"

    id = Column(Integer, primary_key=True, index=True)
    node_id = Column(String, index=True, nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)
    
    # Sensor Data
    tilt_x = Column(Float, nullable=False)
    tilt_y = Column(Float, nullable=False)
    vibration = Column(Integer, nullable=False)
    crack_mm = Column(Float, nullable=False)
    battery_mv = Column(Integer, nullable=False)
    
    # Edge-computed status (SAFE, WARNING, CRITICAL)
    status = Column(String, nullable=False)