import React from 'react';
import { Activity, Map, Settings, AlertTriangle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-base text-white overflow-hidden">
      <aside className="w-20 lg:w-64 bg-surface border-r border-elevated flex flex-col justify-between py-6 transition-all">
        <div>
          <div className="px-4 lg:px-8 mb-10 flex items-center gap-3">
            <Activity className="text-safe" size={28} />
            <h1 className="hidden lg:block text-xl font-bold tracking-widest uppercase">RadxaMesh</h1>
          </div>
          <nav className="flex flex-col gap-3 px-3">
            <NavItem to="/" icon={<Map />} label="Live Map" />
            <NavItem to="/alerts" icon={<AlertTriangle />} label="Alerts" />
            <NavItem to="/settings" icon={<Settings />} label="Settings" />
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, to }: { icon: React.ReactNode, label: string, to: string }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `flex items-center gap-4 p-3 rounded-lg transition-colors w-full ${
      isActive ? 'bg-elevated text-white' : 'text-muted hover:bg-elevated hover:text-white'
    }`}
  >
    {icon}
    <span className="hidden lg:block font-medium">{label}</span>
  </NavLink>
);