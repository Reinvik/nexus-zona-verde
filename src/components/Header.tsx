import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Flame, 
  Zap, 
  FolderSync, 
  Sparkles,
  ChevronRight,
  HelpCircle,
  User,
  LogOut
} from 'lucide-react';
import cialLogo from '../assets/cial-alimentos-logo.png';
import { ARIEL_ONEDRIVE_URL } from '../data/seedData';
import { ShiftType, AppUser } from '../types';

interface HeaderProps {
  onStartCharlaQuick: () => void;
  onOpenReportModal: () => void;
  activeTab: string;
  user?: any;
  userProfile?: AppUser;
  onLogout?: () => void;
  onNavigateToUsers?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onStartCharlaQuick, 
  onOpenReportModal,
  activeTab,
  user,
  userProfile,
  onLogout,
  onNavigateToUsers
}) => {
  const [santiagoTime, setSantiagoTime] = useState<string>('');
  const [currentShift, setCurrentShift] = useState<{ name: ShiftType; label: string; badgeColor: string }>({
    name: 'Turno 1',
    label: 'Turno 1',
    badgeColor: 'bg-emerald-500 text-white'
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('es-CL', {
        timeZone: 'America/Santiago',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: 'short'
      }).format(now);
      setSantiagoTime(formatted);

      // Determine shift by hour
      const hour = now.getHours();
      if (hour >= 7 && hour < 15) {
        setCurrentShift({
          name: 'Turno 1',
          label: 'Turno 1',
          badgeColor: 'bg-emerald-600 text-emerald-50 border-emerald-400'
        });
      } else if (hour >= 15 && hour < 23) {
        setCurrentShift({
          name: 'Turno 2',
          label: 'Turno 2',
          badgeColor: 'bg-amber-600 text-amber-50 border-amber-400'
        });
      } else {
        setCurrentShift({
          name: 'Turno 3',
          label: 'Turno 3',
          badgeColor: 'bg-indigo-600 text-indigo-50 border-indigo-400'
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#005a2e] via-[#008744] to-[#006e37] text-white shadow-lg sticky top-0 z-40 border-b-2 border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-2xl shadow-md border border-emerald-100 flex items-center justify-center shrink-0">
                <img 
                  src={cialLogo} 
                  alt="CIAL Alimentos" 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-sm flex items-center gap-1.5">
                    ZONA VERDE
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse inline-block" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/20 text-emerald-100 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    CD Frío CIAL
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 font-medium tracking-wide">
                  Charlas 5 Min LUP • Equipos e Infraestructura • Prevención SSO
                </p>
              </div>
            </div>

            {/* Shift Badge on Mobile */}
            <div className="md:hidden flex flex-col items-end">
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border shadow-xs ${currentShift.badgeColor}`}>
                {currentShift.label}
              </span>
              <span className="text-[11px] text-emerald-200 font-mono mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {santiagoTime.slice(-8)}
              </span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap justify-between md:justify-end">
            {/* Santiago Clock & Shift (Desktop) */}
            <div className="hidden md:flex items-center gap-3 bg-black/20 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-100">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-mono">{santiagoTime || 'Santiago, CL'}</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-xs ${currentShift.badgeColor}`}>
                {currentShift.label}
              </span>
            </div>

            {/* Direct OneDrive Link Button */}
            <a
              href={ARIEL_ONEDRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/15 hover:bg-white/25 active:bg-white/30 text-emerald-50 px-3 py-2 rounded-xl transition border border-white/15 shadow-xs hover:border-white/30 group"
              title="Abrir carpeta de LUPs en OneDrive corporativo de Ariel Mella"
            >
              <FolderSync className="w-3.5 h-3.5 text-emerald-200 group-hover:rotate-45 transition-transform" />
              <span className="hidden sm:inline">OneDrive</span>
              <span>LUPs</span>
              <ExternalLink className="w-3 h-3 text-emerald-200 opacity-70 group-hover:opacity-100" />
            </a>

            {/* Quick Action: Start 5 min talk */}
            <button
              onClick={onStartCharlaQuick}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 px-3.5 py-2 rounded-xl shadow-md transition transform active:scale-95 cursor-pointer font-sans"
            >
              <Zap className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>Charla 5 Min</span>
            </button>

            {/* User Profile, Role Badge & Logout */}
            {user && (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-white/20">
                <div 
                  onClick={userProfile?.permissions?.canManageUsers ? onNavigateToUsers : undefined}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs max-w-[210px] truncate transition ${
                    userProfile?.permissions?.canManageUsers && onNavigateToUsers ? 'cursor-pointer hover:bg-black/35' : ''
                  } ${
                    userProfile?.role === 'jefatura'
                      ? 'bg-emerald-950/70 border-emerald-400/40 text-emerald-100'
                      : userProfile?.role === 'supervisor'
                        ? 'bg-indigo-950/70 border-indigo-400/40 text-indigo-100'
                        : userProfile?.role === 'prevencion'
                          ? 'bg-amber-950/70 border-amber-400/40 text-amber-100'
                          : 'bg-black/25 border-white/10 text-emerald-100'
                  }`}
                  title={`${user.email} (${userProfile?.role === 'prevencion' ? 'Prevención SSO' : userProfile?.role?.toUpperCase() || 'Colaborador'})`}
                >
                  <User className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span className="truncate font-semibold">{user.email?.split('@')[0]}</span>
                  
                  {userProfile && (
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shrink-0 ${
                      userProfile.isSuperAdmin
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : userProfile.role === 'jefatura'
                          ? 'bg-emerald-400 text-slate-950'
                          : userProfile.role === 'supervisor'
                            ? 'bg-indigo-300 text-slate-950'
                            : userProfile.role === 'prevencion'
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : 'bg-slate-300 text-slate-900'
                    }`}>
                      {userProfile.isSuperAdmin ? 'Admin' : userProfile.role === 'prevencion' ? 'SSO' : userProfile.role}
                    </span>
                  )}
                </div>

                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-white/15 hover:bg-red-500/80 active:bg-red-600 text-white px-2.5 py-2 rounded-xl transition border border-white/15 cursor-pointer shadow-xs"
                  title="Cerrar Sesión Corporativa"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
