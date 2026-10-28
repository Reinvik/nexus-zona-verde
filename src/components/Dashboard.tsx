import React from 'react';
import { 
  Timer, 
  Truck, 
  ScanBarcode, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  FolderSync, 
  Plus, 
  Clock, 
  Users, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sun,
  Sunset,
  Moon,
  UserCheck,
  Layers,
  ClipboardCheck
} from 'lucide-react';
import { LupItem, CharlaSession, PalletJackReport, RfScannerReport, MainTab } from '../types';
import { ARIEL_ONEDRIVE_URL } from '../data/seedData';
import { calculateElapsedHours, formatDurationHuman, getSlaHealth } from '../services/storage';
import cdCialBg from '../assets/cd-cial-bg.png';

interface DashboardProps {
  lups: LupItem[];
  charlas: CharlaSession[];
  pallets: PalletJackReport[];
  rfs: RfScannerReport[];
  onNavigate: (tab: MainTab, lupId?: string) => void;
  onOpenPalletModal: () => void;
  onOpenRfModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  lups,
  charlas,
  pallets,
  rfs,
  onNavigate,
  onOpenPalletModal,
  onOpenRfModal
}) => {
  // LUP of the day (first or recommended)
  const featuredLup = lups[0];

  // Equipment stats
  const pendingPallets = pallets.filter(p => p.status === 'pendiente');
  const inRepairPallets = pallets.filter(p => p.status === 'en_taller' || p.status === 'retirada_proveedor');
  const overduePallets = pallets.filter(p => p.status !== 'reparada' && p.status !== 'de_baja' && calculateElapsedHours(p.reportedAt) > 48);

  const pendingRfs = rfs.filter(r => r.status === 'pendiente');
  const inRepairRfs = rfs.filter(r => r.status === 'en_taller' || r.status === 'retirada_proveedor');
  const overdueRfs = rfs.filter(r => r.status !== 'reparada' && r.status !== 'de_baja' && calculateElapsedHours(r.reportedAt) > 24);

  // Today's talks by shift
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCharlas = charlas.filter(c => c.date === todayStr);
  const charlaManana = todayCharlas.find(c => c.shiftId === 'manana' || c.shift.includes('Mañana'));
  const charlaTarde = todayCharlas.find(c => c.shiftId === 'tarde' || c.shift.includes('Tarde'));
  const charlaNoche = todayCharlas.find(c => c.shiftId === 'noche' || c.shift.includes('Noche'));
  const turnosDoneCount = (charlaManana ? 1 : 0) + (charlaTarde ? 1 : 0) + (charlaNoche ? 1 : 0);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Zona Verde Hero Banner with CIAL CD Background */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/40 min-h-[300px] sm:min-h-[340px] flex items-center">
        {/* Background Photo of CIAL CD */}
        <img 
          src={cdCialBg} 
          alt="Centro de Distribución CIAL Alimentos" 
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] scale-105 filter brightness-95" 
        />

        {/* Green Overlay - Balanced tint so text is ultra-readable and image is clearly perceived */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00381b]/95 via-[#005a2e]/88 to-[#004222]/82" />
        
        {/* Radial highlight for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,84,0.35),transparent_70%)]" />

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-emerald-200 mb-3.5 border border-white/20 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            <span>Área de Encuentro Operacional • Zona Verde CIAL</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3 leading-tight drop-shadow-md">
            Gestión Diaria de Seguridad, LUPs y Equipos en CD Frío
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/95 font-medium leading-relaxed mb-6 drop-shadow-xs max-w-2xl">
            Punto de partida del turno para realizar la <strong>Charla de 5 Minutos</strong>, reportar <strong>transpaletas dañadas</strong> y controlar el <strong>tiempo de respuesta del proveedor</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('asistencia')}
              className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 cursor-pointer font-sans"
            >
              <UserCheck className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>Control de Asistencia</span>
            </button>

            <button
              onClick={() => onNavigate('portal-prevencion', featuredLup?.id)}
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 cursor-pointer font-sans"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Impartir LUP de Seguridad</span>
            </button>

            <a
              href={ARIEL_ONEDRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/35 hover:bg-black/50 backdrop-blur-md border border-white/25 text-white px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer group shadow-sm"
            >
              <FolderSync className="w-4 h-4 text-emerald-300 group-hover:rotate-45 transition-transform" />
              <span>Ver OneDrive Oficial LUPs</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>

      {/* 3 Turnos Diarios Status Widget */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#008744]" />
                Estado de Charlas LUP Hoy (3 Turnos de Planta)
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                turnosDoneCount === 3 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {turnosDoneCount} de 3 Realizadas
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Supervisión activa de reuniones de 5 minutos en andenes, cámaras de frío y almacenamiento.
            </p>
          </div>

          <button
            onClick={() => onNavigate('historial-charlas')}
            className="text-xs font-bold text-[#008744] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Registro Completo y Fotos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Turno Mañana */}
          <div className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
            charlaManana ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                charlaManana ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-700'
              }`}>
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500 block">
                  Turno Mañana (07:00 - 15:00)
                </span>
                <span className="text-xs font-black text-slate-900 block truncate max-w-[170px]">
                  {charlaManana ? `[${charlaManana.lupCode}] ${charlaManana.lupTitle}` : 'Sin registro aún'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  {charlaManana ? `Sup: ${charlaManana.supervisor || 'Carlos Venegas'}` : 'Pendiente'}
                </span>
              </div>
            </div>

            {charlaManana ? (
              <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full shrink-0">
                ✅ OK
              </span>
            ) : (
              <button
                onClick={() => onNavigate('historial-charlas')}
                className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline shrink-0 cursor-pointer"
              >
                + Registrar
              </button>
            )}
          </div>

          {/* Turno Tarde */}
          <div className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
            charlaTarde ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                charlaTarde ? 'bg-emerald-600 text-white' : 'bg-orange-100 text-orange-700'
              }`}>
                <Sunset className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500 block">
                  Turno Tarde (15:00 - 23:00)
                </span>
                <span className="text-xs font-black text-slate-900 block truncate max-w-[170px]">
                  {charlaTarde ? `[${charlaTarde.lupCode}] ${charlaTarde.lupTitle}` : 'Sin registro aún'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  {charlaTarde ? `Sup: ${charlaTarde.supervisor || 'Rodrigo Morales'}` : 'Pendiente'}
                </span>
              </div>
            </div>

            {charlaTarde ? (
              <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full shrink-0">
                ✅ OK
              </span>
            ) : (
              <button
                onClick={() => onNavigate('historial-charlas')}
                className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline shrink-0 cursor-pointer"
              >
                + Registrar
              </button>
            )}
          </div>

          {/* Turno Noche */}
          <div className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
            charlaNoche ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                charlaNoche ? 'bg-emerald-600 text-white' : 'bg-indigo-100 text-indigo-700'
              }`}>
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-500 block">
                  Turno Noche (23:00 - 07:00)
                </span>
                <span className="text-xs font-black text-slate-900 block truncate max-w-[170px]">
                  {charlaNoche ? `[${charlaNoche.lupCode}] ${charlaNoche.lupTitle}` : 'Sin registro aún'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  {charlaNoche ? `Sup: ${charlaNoche.supervisor || 'Cristian Castro'}` : 'Pendiente'}
                </span>
              </div>
            </div>

            {charlaNoche ? (
              <span className="text-[10px] font-black bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full shrink-0">
                ✅ OK
              </span>
            ) : (
              <button
                onClick={() => onNavigate('historial-charlas')}
                className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline shrink-0 cursor-pointer"
              >
                + Registrar
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Critical SLA Alerts (if any) */}
      {(overduePallets.length > 0 || overdueRfs.length > 0) && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-rose-950 uppercase tracking-wide">
                  Alerta de SLA Proveedor: Equipos con Tiempo Excedido
                </h3>
                <button
                  onClick={() => onNavigate('reportes-sla')}
                  className="text-xs font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
                >
                  Ver Tablero SLA
                </button>
              </div>
              <p className="text-xs text-rose-800 mt-1 font-medium leading-relaxed">
                {overduePallets.length > 0 && (
                  <span>
                    • <strong>{overduePallets.length} transpaleta(s)</strong> superan las 48h con el proveedor ({overduePallets.map(p => p.code).join(', ')}).{' '}
                  </span>
                )}
                {overdueRfs.length > 0 && (
                  <span>
                    • <strong>{overdueRfs.length} pistola(s) RF</strong> superan las 24h en soporte ({overdueRfs.map(r => r.code).join(', ')}).
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Cards (Tactile for operators) */}
      <div>
        <h2 className="text-sm font-black text-slate-500 uppercase tracking-wider mb-3">
          Accesos Rápidos del Operador
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 0: Pase de Lista Diario */}
          <div 
            onClick={() => onNavigate('asistencia')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Turno Hoy
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                Asistencia de Turno
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Marcar presentes, atrasos, ausentes y licencias con 1 solo clic.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Gestionar Asistencia</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 1: Prevención SSO */}
          <div 
            onClick={() => onNavigate('portal-prevencion')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                SSO
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                Portal Prevención SSO
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Monitoreo diario de turnos, cruce con asistencia y seguimiento de LUPs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Ver Métricas SSO</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Equipos e Infraestructura */}
          <div 
            onClick={() => onNavigate('equipos-infraestructura')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {pendingPallets.length + pendingRfs.length} Pendientes
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 group-hover:text-[#008744] transition-colors">
                Equipos e Infraestructura
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Transpaletas manuales, pistolas RF y estado de andenes (rejas y puertas 1-34).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Gestionar Módulo</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Checklist Grúas CIAL FOR-27 */}
          <div 
            onClick={() => onNavigate('equipos-infraestructura')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-full">
                FOR-27 CIAL
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 group-hover:text-amber-700 transition-colors">
                Checklist Grúas CIAL
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Inspección pre-operacional de 16 puntos críticos (Frenos, Dirección, Batería).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Registrar / Ver Historial</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Catálogo de LUPs */}
          <div 
            onClick={() => onNavigate('lups')}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full">
                {lups.length} Disponibles
              </span>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 group-hover:text-teal-700 transition-colors">
                Catálogo de LUPs
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Seguridad SSO, Cadena de Frío, Buenas Prácticas y Procedimientos 5S.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Explorar Biblioteca</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Featured LUP of Shift + Equipment Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LUP of Shift (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                LUP Recomendada del Turno
              </span>
              <span className="font-mono text-xs font-bold text-slate-500">
                {featuredLup?.code}
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-2">
              {featuredLup?.title}
            </h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
              {featuredLup?.summary}
            </p>

            {/* Quick Do/Don't visual box */}
            {featuredLup && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-emerald-50/70 border border-emerald-300 rounded-2xl p-3">
                  <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SÍ HACER (Caso Correcto):</span>
                  </div>
                  {featuredLup.doPractice.photoUrl && (
                    <div className="relative rounded-xl overflow-hidden border border-emerald-400 mb-2 h-24 bg-emerald-100">
                      <img src={featuredLup.doPractice.photoUrl} alt="Caso Correcto" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <p className="text-xs text-emerald-950 font-bold">
                    {featuredLup.doPractice.title}
                  </p>
                </div>

                <div className="bg-rose-50/70 border border-rose-300 rounded-2xl p-3">
                  <div className="text-[11px] font-bold text-rose-800 flex items-center gap-1 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>PROHIBIDO (Caso Incorrecto):</span>
                  </div>
                  {featuredLup.dontPractice.photoUrl && (
                    <div className="relative rounded-xl overflow-hidden border border-rose-300 mb-2 h-24 bg-rose-100">
                      <img src={featuredLup.dontPractice.photoUrl} alt="Caso Incorrecto" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <p className="text-xs text-rose-950 font-bold">
                    {featuredLup.dontPractice.title}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-medium">
              Duración recomendada: <strong>5 minutos</strong>
            </span>
            <button
              onClick={() => onNavigate('portal-prevencion', featuredLup?.id)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Asignar esta LUP</span>
            </button>
          </div>
        </div>

        {/* Operational Equipment Status Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-black text-slate-800">
                Disponibilidad de Recursos Gemba
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                Estado Actual
              </span>
            </div>

            <div className="space-y-4">
              
              {/* Transpaletas bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Transpaletas Manuales</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {pallets.filter(p => p.status === 'reparada').length} de {pallets.length} Operativas
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full"
                    style={{ width: `${pallets.length > 0 ? (pallets.filter(p => p.status === 'reparada').length / pallets.length) * 100 : 0}%` }}
                    title="Operativas"
                  />
                  <div 
                    className="bg-amber-500 h-full"
                    style={{ width: `${pallets.length > 0 ? (pendingPallets.length / pallets.length) * 100 : 0}%` }}
                    title="Pendientes Retiro"
                  />
                  <div 
                    className="bg-purple-500 h-full"
                    style={{ width: `${pallets.length > 0 ? (inRepairPallets.length / pallets.length) * 100 : 0}%` }}
                    title="En Taller"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                  <span className="text-emerald-700">🟢 Operativas</span>
                  <span className="text-amber-700">🟡 {pendingPallets.length} por retirar</span>
                  <span className="text-purple-700">🟣 {inRepairPallets.length} en taller</span>
                </div>
              </div>

              {/* Pistolas RF bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <ScanBarcode className="w-4 h-4 text-indigo-600" />
                    <span>Pistolas RF (Zebra / HW)</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {rfs.filter(r => r.status === 'reparada').length} de {rfs.length} Operativas
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full"
                    style={{ width: `${rfs.length > 0 ? (rfs.filter(r => r.status === 'reparada').length / rfs.length) * 100 : 0}%` }}
                    title="Operativas"
                  />
                  <div 
                    className="bg-amber-500 h-full"
                    style={{ width: `${rfs.length > 0 ? (pendingRfs.length / rfs.length) * 100 : 0}%` }}
                    title="Pendientes"
                  />
                  <div 
                    className="bg-indigo-500 h-full"
                    style={{ width: `${rfs.length > 0 ? (inRepairRfs.length / rfs.length) * 100 : 0}%` }}
                    title="En Soporte TI"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 font-semibold">
                  <span className="text-emerald-700">🟢 Operativas</span>
                  <span className="text-amber-700">🟡 {pendingRfs.length} por retirar</span>
                  <span className="text-indigo-700">🟣 {inRepairRfs.length} en soporte TI</span>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
            <button
              onClick={() => onNavigate('transpaletas')}
              className="text-[#008744] hover:underline cursor-pointer"
            >
              Gestionar Transpaletas →
            </button>
            <button
              onClick={() => onNavigate('pistolas-rf')}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Gestionar RFs →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
