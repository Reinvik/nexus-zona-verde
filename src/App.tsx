import React, { useState, useEffect } from 'react';
import { 
  MainTab, 
  LupItem, 
  CharlaSession, 
  PalletJackReport, 
  RfScannerReport,
  AppUser
} from './types';
import { 
  getLups, 
  getCharlas, 
  getPallets, 
  getRfs,
  getAppUserByEmail 
} from './services/storage';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { AttendanceModule } from './components/AttendanceModule';
import { LupCatalog } from './components/LupCatalog';
import { CharlaTimer } from './components/CharlaTimer';
import { PalletJackModule } from './components/PalletJackModule';
import { RfScannerModule } from './components/RfScannerModule';
import { SlaDashboard } from './components/SlaDashboard';
import { HistorialCharlas } from './components/HistorialCharlas';
import { UserManagementModule } from './components/UserManagementModule';
import { LoginPage } from './components/LoginPage';
import { supabase } from './lib/supabase';
import { ARIEL_ONEDRIVE_URL } from './data/seedData';
import cialLogo from './assets/cial-alimentos-logo.png';
import { FolderSync, ExternalLink, ShieldCheck, Heart, Sparkles, RotateCcw } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  const [lups, setLups] = useState<LupItem[]>([]);
  const [charlas, setCharlas] = useState<CharlaSession[]>([]);
  const [pallets, setPallets] = useState<PalletJackReport[]>([]);
  const [rfs, setRfs] = useState<RfScannerReport[]>([]);
  const [selectedLupId, setSelectedLupId] = useState<string | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<AppUser | null>(null);

  // Authentication lifecycle with Nexus Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('[ZonaVerde] Aviso al validar sesión Supabase:', error.message);
        const isInvalidGrant =
          error.message?.includes('Refresh Token Not Found') ||
          (error as any)?.status === 400 ||
          error.message?.includes('invalid_grant');

        if (isInvalidGrant) {
          console.warn('[ZonaVerde] Token revocado/inválido. Limpiando sesión corrupta de localStorage...');
          supabase.auth.signOut().catch(() => {});
          try {
            Object.keys(localStorage).forEach((k) => {
              if (k.startsWith('sb-') && k.endsWith('-auth-token')) {
                localStorage.removeItem(k);
              }
            });
          } catch {}
          setUser(null);
          setUserProfile(null);
          setAuthLoading(false);
          return;
        }
      }

      setUser(session?.user ?? null);
      if (session?.user?.email) {
        setUserProfile(getAppUserByEmail(session.user.email));
      } else {
        setUserProfile(getAppUserByEmail('ariel.mella@cial.cl'));
      }
      setAuthLoading(false);
    }).catch((err) => {
      console.warn('[ZonaVerde] Error no crítico en getSession:', err);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setUserProfile(null);
      } else if (session?.user) {
        setUser(session.user);
        setUserProfile(getAppUserByEmail(session.user.email));
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load data from persistent storage
  const loadData = () => {
    setLups(getLups());
    setCharlas(getCharlas());
    setPallets(getPallets());
    setRfs(getRfs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartCharlaWithLup = (lupId: string) => {
    setSelectedLupId(lupId);
    setActiveTab('charla-timer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCharlaQuick = () => {
    setActiveTab('charla-timer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPalletReport = () => {
    setActiveTab('transpaletas');
  };

  const handleOpenRfReport = () => {
    setActiveTab('pistolas-rf');
  };

  const pendingPalletsCount = pallets.filter(p => p.status === 'pendiente').length;
  const pendingRfsCount = rfs.filter(r => r.status === 'pendiente').length;

  // 1. Pantalla de carga mientras se valida sesión con Supabase
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#063d25] flex flex-col items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex flex-col items-center gap-4 text-white shadow-2xl">
          <div className="bg-white p-3 rounded-2xl shadow-md border border-emerald-100 flex items-center justify-center">
            <img src={cialLogo} alt="CIAL Alimentos" className="w-14 h-14 object-contain" />
          </div>
          <div className="flex items-center gap-2 text-emerald-200 font-extrabold text-sm">
            <RotateCcw className="w-4 h-4 animate-spin text-emerald-300" />
            <span>Validando credenciales corporativas CIAL...</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Si no hay sesión iniciada, mostrar Login idéntico a Nexus Outbound
  if (!user) {
    return <LoginPage onSuccess={() => loadData()} />;
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 flex flex-col font-sans selection:bg-[#008744] selection:text-white">
      
      {/* CIAL Corporate Header */}
      <Header
        onStartCharlaQuick={handleStartCharlaQuick}
        onOpenReportModal={handleOpenPalletReport}
        activeTab={activeTab}
        user={user}
        userProfile={userProfile || undefined}
        onLogout={() => supabase.auth.signOut()}
        onNavigateToUsers={() => setActiveTab('usuarios')}
      />

      {/* Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pendingPalletsCount={pendingPalletsCount}
        pendingRfsCount={pendingRfsCount}
        currentUser={userProfile || undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-7">
        
        {activeTab === 'dashboard' && (
          <Dashboard
            lups={lups}
            charlas={charlas}
            pallets={pallets}
            rfs={rfs}
            onNavigate={(tab, lupId) => {
              if (lupId) setSelectedLupId(lupId);
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPalletModal={handleOpenPalletReport}
            onOpenRfModal={handleOpenRfReport}
          />
        )}

        {activeTab === 'asistencia' && (
          <AttendanceModule
            currentUserEmail={user?.email || 'ariel.mella@cial.cl'}
          />
        )}

        {activeTab === 'lups' && (
          <LupCatalog
            lups={lups}
            onSelectForCharla={handleStartCharlaWithLup}
            onLupsUpdated={loadData}
            currentUserEmail={user?.email || 'colaborador@cial.cl'}
            canDeleteLup={userProfile?.permissions?.canDeleteLup ?? (userProfile?.role === 'jefatura')}
            canEditLup={userProfile?.permissions?.canEditLup ?? true}
            canCreateLup={userProfile?.permissions?.canCreateLup ?? true}
            userRole={userProfile?.role}
          />
        )}

        {activeTab === 'charla-timer' && (
          <CharlaTimer
            lups={lups}
            selectedLupId={selectedLupId}
            onCharlaSaved={() => {
              loadData();
              setActiveTab('historial-charlas');
            }}
            onSelectLup={(id) => setSelectedLupId(id)}
          />
        )}

        {activeTab === 'transpaletas' && (
          <PalletJackModule
            pallets={pallets}
            onPalletsUpdated={loadData}
          />
        )}

        {activeTab === 'pistolas-rf' && (
          <RfScannerModule
            rfs={rfs}
            onRfsUpdated={loadData}
          />
        )}

        {activeTab === 'reportes-sla' && (
          <SlaDashboard
            pallets={pallets}
            rfs={rfs}
          />
        )}

        {activeTab === 'historial-charlas' && (
          <HistorialCharlas
            charlas={charlas}
            lups={lups}
            onCharlasUpdated={loadData}
            onNavigateToTimer={handleStartCharlaWithLup}
          />
        )}

        {activeTab === 'usuarios' && (
          <UserManagementModule
            currentUser={userProfile || undefined}
          />
        )}

      </main>

      {/* Corporate Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
                ZV
              </div>
              <div>
                <span className="font-black text-white tracking-wide">
                  ZONA VERDE • CIAL ALIMENTOS
                </span>
                <span className="block text-[11px] text-slate-500">
                  zonaverde.nexusnetwork.cl • Centro de Distribución y Cadena de Frío
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <a
                href={ARIEL_ONEDRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 flex items-center gap-1.5 transition"
              >
                <FolderSync className="w-3.5 h-3.5" />
                <span>OneDrive LUPs Ariel Mella</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <span className="text-slate-700">•</span>

              <span className="text-slate-500">
                Ecosistema CIAL Hub Nexus
              </span>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-600">
            Diseñado para operadores de terreno en andenes, cámaras de frío y picking • Lean Daily Management
          </div>
        </div>
      </footer>

    </div>
  );
}
