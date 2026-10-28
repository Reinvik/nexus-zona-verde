import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck,
  BookOpen, 
  Timer, 
  Truck, 
  ScanBarcode, 
  BarChart3, 
  ClipboardCheck,
  AlertTriangle,
  KeyRound,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { MainTab, AppUser } from '../types';

interface NavTabItem {
  id: MainTab;
  label: string;
  shortLabel: string;
  icon: any;
  badge?: string | null;
  badgeColor?: string;
  highlight?: boolean;
}

interface NavigationProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  pendingPalletsCount: number;
  pendingRfsCount: number;
  currentUser?: AppUser;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  pendingPalletsCount,
  pendingRfsCount,
  currentUser
}) => {
  const canManageUsers = currentUser?.permissions?.canManageUsers ?? (currentUser ? currentUser.role === 'jefatura' : true);

  const tabs: NavTabItem[] = [
    {
      id: 'dashboard' as MainTab,
      label: 'Zona Verde',
      shortLabel: 'Inicio',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'asistencia' as MainTab,
      label: 'Asistencia',
      shortLabel: 'Asistencia',
      icon: UserCheck,
      badge: 'Turno',
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'lups' as MainTab,
      label: 'Catálogo LUPs',
      shortLabel: 'LUPs',
      icon: BookOpen,
      badge: 'SSO'
    },
    {
      id: 'equipos-infraestructura' as MainTab,
      label: 'Equipos e Infraestructura',
      shortLabel: 'Equipos e Infra.',
      icon: Layers,
      badge: (pendingPalletsCount + pendingRfsCount) > 0 ? `${pendingPalletsCount + pendingRfsCount}` : null,
      badgeColor: 'bg-rose-500 text-white'
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
    },
    {
      id: 'portal-prevencion' as MainTab,
      label: 'Portal Prevención SSO',
      shortLabel: 'Prevención SSO',
      icon: ShieldCheck,
      badge: 'SSO',
      badgeColor: 'bg-amber-400 text-slate-950 font-black'
    },
    ...(canManageUsers ? [{
      id: 'usuarios' as MainTab,
      label: 'Usuarios & Permisos',
      shortLabel: 'Usuarios',
      icon: KeyRound,
      badge: 'Jefatura',
      badgeColor: 'bg-amber-400 text-slate-950 font-black'
    }] : [])
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
