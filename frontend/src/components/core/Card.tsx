import React from 'react';
import type{ NodeStatus } from '../../types/hardware';

interface CardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  status?: NodeStatus;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', status }) => {
  // Dynamically map hardware status to our custom Tailwind v4 theme colors
  const statusBorders = {
    SAFE: 'border-safe',
    WARNING: 'border-warning',
    CRITICAL: 'border-critical',
  };

  const statusBg = {
    SAFE: 'bg-safe',
    WARNING: 'bg-warning',
    CRITICAL: 'bg-critical',
  };

  const borderClass = status ? statusBorders[status] : 'border-elevated';

  return (
    <div className={`bg-surface border ${borderClass} rounded-xl p-5 shadow-lg transition-colors duration-300 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white tracking-wide uppercase text-sm">{title}</h3>
        
        {/* Animated radar blip for active sensor nodes */}
        {status && (
          <span className="flex h-3 w-3 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusBg[status]}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${statusBg[status]}`}></span>
          </span>
        )}
      </div>
      
      <div className="text-muted">
        {children}
      </div>
    </div>
  );
};