import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type{ TelemetryPayload } from '../../types/hardware';
import { Card } from '../core/Card';

interface TrendChartProps {
  title: string;
  data: TelemetryPayload[];
  dataKey: keyof TelemetryPayload;
  color: string;
  unit: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ title, data, dataKey, color, unit }) => {
  // Format the ISO timestamp into a readable HH:MM:SS format for the X-axis
  const formattedData = data.map(item => {
    const date = new Date(item.timestamp);
    return {
      ...item,
      timeLabel: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  });

  return (
    <Card title={title} className="h-80 w-full">
      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
            <XAxis 
              dataKey="timeLabel" 
              stroke="#A1A1AA" 
              fontSize={10} 
              tickMargin={10}
            />
            <YAxis 
              stroke="#A1A1AA" 
              fontSize={10} 
              tickFormatter={(val) => `${val}${unit}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333333', color: '#fff', borderRadius: '8px' }}
              itemStyle={{ color: color, fontWeight: 'bold' }}
              labelStyle={{ color: '#A1A1AA', marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: color, stroke: '#000', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};