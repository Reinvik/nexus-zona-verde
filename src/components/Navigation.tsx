import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Timer, 
  Truck, 
  ScanBarcode, 
  BarChart3, 
  ClipboardCheck,
  AlertTriangle
} from 'lucide-react';
import { MainTab } from '../types';

interface NavigationProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  pendingPalletsCount: number;
  pendingRfsCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  pendingPalletsCount,
  pendingRfsCount
}) => {
  const tabs = [
    {
      id: 'dashboard' as MainTab,
      label: 'Zona Verde',
      shortLabel: 'Inicio',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'lups' as MainTab,
      label: 'Catálogo LUPs',
      shortLabel: 'LUPs',
      icon: BookOpen,
      badge: '5 Min'
    },
    {
      id: 'charla-timer' as MainTab,
      label: 'Cronómetro 5 Min',
      shortLabel: 'Charla',
      icon: Timer,
      highlight: true
    },
    {
      id: 'transpaletas' as MainTab,
      label: 'Transpaletas Manuales',
      shortLabel: 'Transpaletas',
      icon: Truck,
      badge: pendingPalletsCount > 0 ? `${pendingPalletsCount}` : null,
      badgeColor: 'bg-rose-500 text-white'
    },
    {
      id: 'pistolas-rf' as MainTab,
      label: 'Pistolas RF',
      shortLabel: 'Pistolas RF',
      icon: ScanBarcode,
      badge: pendingRfsCount > 0 ? `${pendingRfsCount}` : null,
      badgeColor: 'bg-indigo-600 text-white'
    },
    {
      id: 'reportes-sla' as MainTab,
      label: 'Tiempos Proveedor (SLA)',
      shortLabel: 'SLA Prov.',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'historial-charlas' as MainTab,
      label: 'Historial Charlas',
      shortLabel: 'Historial',
      icon: ClipboardCheck,
      badge: null
    }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[69px] sm:top-[74px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none no-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#008744] text-white shadow-md shadow-emerald-900/15 font-bold'
                    : tab.highlight
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>

                {tab.badge && (
                  <span
                    className={`ml-1 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-white/30 text-white' 
                        : tab.badgeColor || 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
