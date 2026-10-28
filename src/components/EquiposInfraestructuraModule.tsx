import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  ScanBarcode, 
  Warehouse, 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  X, 
  ChevronRight, 
  Wrench, 
  ShieldAlert, 
  ShieldCheck, 
  Camera, 
  Printer, 
  Info,
  Layers,
  ArrowUpDown,
  Columns2,
  List
} from 'lucide-react';
import { 
  PalletJackReport, 
  RfScannerReport, 
  AndenInspection, 
  AndenDoorStatus, 
  AndenGateStatus, 
  AndenLevelerStatus, 
  GruaChecklistReport, 
  GruaChecklistEvaluation, 
  ChecklistValue, 
  AppUser 
} from '../types';
import { 
  getAndenes, 
  saveAndenInspection, 
  getGruaChecklists, 
  saveGruaChecklist, 
  DEFAULT_GRUA_CHECKLIST_ITEMS,
  exportToCsv 
} from '../services/storage';
import { PalletJackModule } from './PalletJackModule';
import { RfScannerModule } from './RfScannerModule';
import cialLogo from '../assets/cial-alimentos-logo.png';

export type EquiposSubTab = 'transpaletas' | 'pistolas-rf' | 'andenes' | 'checklist-gruas';

interface EquiposInfraestructuraModuleProps {
  pallets: PalletJackReport[];
  onPalletsUpdated: () => void;
  rfs: RfScannerReport[];
  onRfsUpdated: () => void;
  initialSubTab?: EquiposSubTab;
  currentUser?: AppUser;
}

export const EquiposInfraestructuraModule: React.FC<EquiposInfraestructuraModuleProps> = ({
  pallets,
  onPalletsUpdated,
  rfs,
  onRfsUpdated,
  initialSubTab = 'transpaletas',
  currentUser
}) => {
  const [subTab, setSubTab] = useState<EquiposSubTab>(initialSubTab);

  // Data for Andenes & Gruas
  const [andenes, setAndenes] = useState<AndenInspection[]>([]);
  const [gruaChecklists, setGruaChecklists] = useState<GruaChecklistReport[]>([]);

  // Andenes Filter, Search & View State
  const [andenFilter, setAndenFilter] = useState<'todos' | 'despacho' | 'recepcion' | 'alertas'>('todos');
  const [andenSearch, setAndenSearch] = useState<string>('');
  const [andenViewMode, setAndenViewMode] = useState<'doble-columna' | 'lista-simple'>('doble-columna');
  const [selectedAnden, setSelectedAnden] = useState<AndenInspection | null>(null);
  const [showAndenModal, setShowAndenModal] = useState<boolean>(false);

  // Form State for Anden Edit
  const [andenDoorStatus, setAndenDoorStatus] = useState<AndenDoorStatus>('operativa');
  const [andenGateStatus, setAndenGateStatus] = useState<AndenGateStatus>('operativa');
  const [andenLevelerStatus, setAndenLevelerStatus] = useState<AndenLevelerStatus>('operativo');
  const [andenDoorNotes, setAndenDoorNotes] = useState<string>('');
  const [andenGateNotes, setAndenGateNotes] = useState<string>('');
  const [andenLevelerNotes, setAndenLevelerNotes] = useState<string>('');
  const [andenIsBlocked, setAndenIsBlocked] = useState<boolean>(false);
  const [andenInspectedBy, setAndenInspectedBy] = useState<string>('');
  const [andenShift, setAndenShift] = useState<string>('Turno 1');
  const [andenPhoto, setAndenPhoto] = useState<string | null>(null);

  // Grua Checklist State & Modals
  const [showChecklistModal, setShowChecklistModal] = useState<boolean>(false);
  const [selectedReportDetail, setSelectedReportDetail] = useState<GruaChecklistReport | null>(null);
  const [gruaSearch, setGruaSearch] = useState<string>('');
  const [gruaStatusFilter, setGruaStatusFilter] = useState<'todos' | 'aprobado' | 'rechazado'>('todos');

  // Form State for New Grua Checklist
  const [equipmentNumber, setEquipmentNumber] = useState<string>('7315');
  const [equipmentType, setEquipmentType] = useState<string>('Transpaleta Eléctrica Hombre a Bordo');
  const [area, setArea] = useState<string>('Despacho');
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [formShift, setFormShift] = useState<string>('Turno 1');
  const [evaluatorName, setEvaluadorName] = useState<string>(currentUser?.name || 'Bryan Mariño');
  const [supervisorName, setSupervisorName] = useState<string>('Walter Sánchez');
  const [comments, setComments] = useState<string>('');
  const [evaluations, setEvaluations] = useState<GruaChecklistEvaluation[]>(() =>
    DEFAULT_GRUA_CHECKLIST_ITEMS.map(item => ({
      ...item,
      value: 'cumple' as ChecklistValue,
      observacion: ''
    }))
  );

  // Load andenes and checklists
  const refreshAndenesAndGruas = () => {
    setAndenes(getAndenes());
    setGruaChecklists(getGruaChecklists());
  };

  useEffect(() => {
    refreshAndenesAndGruas();
  }, []);

  // Pending counters
  const pendingPallets = pallets.filter(p => p.status === 'pendiente').length;
  const pendingRfs = rfs.filter(r => r.status === 'pendiente').length;
  const blockedAndenesCount = andenes.filter(a => a.isBlocked || a.doorStatus !== 'operativa' || a.gateStatus !== 'operativa' || a.levelerStatus !== 'operativo').length;
  const rejectedGruasCount = gruaChecklists.filter(c => c.finalStatus === 'rechazado').length;

  // ---------------------------------------------
  // ANDENES HANDLERS
  // ---------------------------------------------
  const handleOpenAndenModal = (anden: AndenInspection) => {
    setSelectedAnden(anden);
    setAndenDoorStatus(anden.doorStatus);
    setAndenGateStatus(anden.gateStatus);
    setAndenLevelerStatus(anden.levelerStatus);
    setAndenDoorNotes(anden.doorNotes || '');
    setAndenGateNotes(anden.gateNotes || '');
    setAndenLevelerNotes(anden.levelerNotes || '');
    setAndenIsBlocked(anden.isBlocked);
    setAndenInspectedBy(currentUser?.name || anden.inspectedBy || 'Supervisor de Terreno');
    setAndenShift(anden.shift || 'Turno 1');
    setAndenPhoto(anden.photoUrl || null);
    setShowAndenModal(true);
  };

  const handleSaveAnden = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnden) return;

    // Check if critical blocker
    const isCritical = andenDoorStatus === 'trabada' || 
                       andenGateStatus === 'desrielada' || 
                       andenLevelerStatus === 'fuera_servicio' || 
                       andenIsBlocked;

    const updated: AndenInspection = {
      ...selectedAnden,
      doorStatus: andenDoorStatus,
      gateStatus: andenGateStatus,
      levelerStatus: andenLevelerStatus,
      doorNotes: andenDoorNotes.trim() || undefined,
      gateNotes: andenGateNotes.trim() || undefined,
      levelerNotes: andenLevelerNotes.trim() || undefined,
      isBlocked: isCritical,
      inspectedBy: andenInspectedBy.trim() || 'Walter Sánchez',
      shift: andenShift,
      lastInspectedAt: new Date().toISOString(),
      photoUrl: andenPhoto || undefined
    };

    saveAndenInspection(updated);
    refreshAndenesAndGruas();
    setShowAndenModal(false);
    setSelectedAnden(null);
  };

  const handleQuickMarkAllOk = () => {
    setAndenDoorStatus('operativa');
    setAndenGateStatus('operativa');
    setAndenLevelerStatus('operativo');
    setAndenDoorNotes('');
    setAndenGateNotes('');
    setAndenLevelerNotes('');
    setAndenIsBlocked(false);
  };

  const handleExportAndenesCsv = () => {
    const rows = andenes.map(a => ({
      Anden: a.andenCode,
      Numero: a.andenNumber,
      Area: a.area,
      Estado_Puerta: a.doorStatus,
      Nota_Puerta: a.doorNotes || '',
      Estado_Reja: a.gateStatus,
      Nota_Reja: a.gateNotes || '',
      Estado_Plancha: a.levelerStatus,
      Nota_Plancha: a.levelerNotes || '',
      Bloqueado: a.isBlocked ? 'SI' : 'NO',
      Ultima_Inspeccion: a.lastInspectedAt,
      Inspector: a.inspectedBy,
      Turno: a.shift
    }));
    exportToCsv('Inspeccion_Andenes_CIAL', rows);
  };

  // Filtered andenes
  const filteredAndenes = andenes.filter(a => {
    // Buscador por número, código, área o inspector
    if (andenSearch.trim()) {
      const q = andenSearch.toLowerCase().trim();
      const numStr = a.andenNumber.toString();
      const matchNum = numStr === q || numStr.padStart(2, '0') === q || `anden ${numStr}`.includes(q) || `andén ${numStr}`.includes(q);
      const matchCode = a.andenCode.toLowerCase().includes(q);
      const matchArea = a.area.toLowerCase().includes(q);
      const matchInspector = a.inspectedBy.toLowerCase().includes(q);
      const matchNotes = (a.doorNotes || '').toLowerCase().includes(q) || (a.gateNotes || '').toLowerCase().includes(q) || (a.levelerNotes || '').toLowerCase().includes(q);
      if (!matchNum && !matchCode && !matchArea && !matchInspector && !matchNotes) {
        return false;
      }
    }

    if (andenFilter === 'despacho') return a.andenNumber <= 20;
    if (andenFilter === 'recepcion') return a.andenNumber >= 21;
    if (andenFilter === 'alertas') {
      return a.isBlocked || a.doorStatus !== 'operativa' || a.gateStatus !== 'operativa' || a.levelerStatus !== 'operativo';
    }
    return true;
  });

  // ---------------------------------------------
  // CHECKLIST GRÚAS HANDLERS
  // ---------------------------------------------
  const handleOpenNewChecklist = () => {
    setEquipmentNumber('7315');
    setEquipmentType('Transpaleta Eléctrica Hombre a Bordo');
    setArea('Despacho');
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormShift('Turno 1');
    setEvaluadorName(currentUser?.name || 'Bryan Mariño');
    setSupervisorName('Walter Sánchez');
    setComments('');
    setEvaluations(
      DEFAULT_GRUA_CHECKLIST_ITEMS.map(item => ({
        ...item,
        value: 'cumple' as ChecklistValue,
        observacion: ''
      }))
    );
    setShowChecklistModal(true);
  };

  const handleEvaluationChange = (index: number, value: ChecklistValue) => {
    const next = [...evaluations];
    next[index].value = value;
    setEvaluations(next);
  };

  const handleObservationChange = (index: number, text: string) => {
    const next = [...evaluations];
    next[index].observacion = text;
    setEvaluations(next);
  };

  // Determine auto status based on critical items
  const hasCriticalFailure = evaluations.some(item => item.isCritical && item.value === 'no_cumple');
  const totalFails = evaluations.filter(item => item.value === 'no_cumple').length;
  const calculatedStatus: 'aprobado' | 'rechazado' = hasCriticalFailure || totalFails >= 3 ? 'rechazado' : 'aprobado';

  const handleSaveChecklistForm = (e: React.FormEvent) => {
    e.preventDefault();

    const newReport: GruaChecklistReport = {
      id: `chk-${Date.now()}`,
      code: `CHK-${equipmentNumber}-${Date.now().toString().slice(-4)}`,
      formCode: 'CIAL-PR&MA-FOR-27',
      equipmentNumber: equipmentNumber.trim() || 'S/N',
      equipmentType,
      area,
      date: formDate,
      shift: formShift,
      evaluatorName: evaluatorName.trim() || 'Operador',
      supervisorName: supervisorName.trim() || 'Supervisor',
      evaluations,
      comments: comments.trim() || undefined,
      finalStatus: calculatedStatus,
      createdAt: new Date().toISOString()
    };

    saveGruaChecklist(newReport);
    refreshAndenesAndGruas();
    setShowChecklistModal(false);
  };

  const handleExportChecklistsCsv = () => {
    const rows = gruaChecklists.map(c => ({
      Codigo_Informe: c.code,
      Formato_CIAL: c.formCode,
      N_Equipo: c.equipmentNumber,
      Tipo_Equipo: c.equipmentType,
      Area: c.area,
      Fecha: c.date,
      Turno: c.shift,
      Evaluador: c.evaluatorName,
      Supervisor: c.supervisorName,
      Estado_Final: c.finalStatus.toUpperCase(),
      Fallas_Encontradas: c.evaluations.filter(e => e.value === 'no_cumple').map(e => e.label).join(' | '),
      Comentarios: c.comments || '',
      Fecha_Creacion: c.createdAt
    }));
    exportToCsv('Checklist_Gruas_CIAL_FOR27', rows);
  };

  // Filtered grua checklists
  const filteredChecklists = gruaChecklists.filter(c => {
    const matchSearch = c.equipmentNumber.toLowerCase().includes(gruaSearch.toLowerCase()) ||
                        c.evaluatorName.toLowerCase().includes(gruaSearch.toLowerCase()) ||
                        c.code.toLowerCase().includes(gruaSearch.toLowerCase());
    if (!matchSearch) return false;
    if (gruaStatusFilter !== 'todos' && c.finalStatus !== gruaStatusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner del Módulo Consolidado */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#063d25] rounded-3xl p-6 text-white shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-400 shadow-inner">
              <Layers className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                  Control Integral de Operaciones
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  CIAL Alimentos CD Lo Boza
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">
                Equipos e Infraestructura
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Monitoreo consolidado de transpaletas manuales, pistolas RF, andenes de carga (rejas y puertas) y check list oficial de grúas <span className="font-bold text-emerald-300">CIAL-PR&MA-FOR-27</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/40 backdrop-blur-md p-2 rounded-2xl border border-slate-700/60 self-stretch md:self-auto justify-around sm:justify-start">
            <div className="text-center px-3 py-1 border-r border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">TM Falla</span>
              <span className={`text-base font-black ${pendingPallets > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {pendingPallets}
              </span>
            </div>
            <div className="text-center px-3 py-1 border-r border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">RF Falla</span>
              <span className={`text-base font-black ${pendingRfs > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {pendingRfs}
              </span>
            </div>
            <div className="text-center px-3 py-1 border-r border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Andenes Falla</span>
              <span className={`text-base font-black ${blockedAndenesCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {blockedAndenesCount}
              </span>
            </div>
            <div className="text-center px-3 py-1">
              <span className="text-xs text-slate-400 font-semibold block">Grúas Rech.</span>
              <span className={`text-base font-black ${rejectedGruasCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {rejectedGruasCount}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pestañas Sub-Navegación */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/70 overflow-x-auto scrollbar-none">
          
          <button
            onClick={() => setSubTab('transpaletas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${
              subTab === 'transpaletas'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Transpaletas Manuales</span>
            {pendingPallets > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.2 rounded-full">
                {pendingPallets}
              </span>
            )}
          </button>

          <button
            onClick={() => setSubTab('pistolas-rf')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${
              subTab === 'pistolas-rf'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ScanBarcode className="w-4 h-4" />
            <span>Pistolas RF (Soporte)</span>
            {pendingRfs > 0 && (
              <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.2 rounded-full">
                {pendingRfs}
              </span>
            )}
          </button>

          <button
            onClick={() => setSubTab('andenes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${
              subTab === 'andenes'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Andenes (Rejas & Puertas)</span>
            {blockedAndenesCount > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.2 rounded-full">
                {blockedAndenesCount} Alerta
              </span>
            )}
          </button>

          <button
            onClick={() => setSubTab('checklist-gruas')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0 ${
              subTab === 'checklist-gruas'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 ring-2 ring-emerald-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Checklist Grúas CIAL</span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.2 rounded-full">
              FOR-27
            </span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-PESTAÑA 1: TRANSPALETAS MANUALES */}
      {/* ========================================================================= */}
      {subTab === 'transpaletas' && (
        <div>
          <PalletJackModule pallets={pallets} onPalletsUpdated={onPalletsUpdated} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PESTAÑA 2: PISTOLAS RF */}
      {/* ========================================================================= */}
      {subTab === 'pistolas-rf' && (
        <div>
          <RfScannerModule rfs={rfs} onRfsUpdated={onRfsUpdated} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PESTAÑA 3: ANDENES (REJAS & PUERTAS) - FILAS HORIZONTALES COMPACTAS */}
      {/* ========================================================================= */}
      {subTab === 'andenes' && (
        <div className="space-y-4">
          
          {/* Barra de Filtros, Búsqueda y Modos de Vista */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
            
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Buscador Rápido de Andenes */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Buscar andén (ej: 15, 28) o inspector..."
                  value={andenSearch}
                  onChange={e => setAndenSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50 focus:bg-white transition"
                />
                {andenSearch && (
                  <button
                    onClick={() => setAndenSearch('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Botones de Filtro por Zona */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
                <button
                  onClick={() => setAndenFilter('todos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    andenFilter === 'todos'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todos (34)
                </button>
                <button
                  onClick={() => setAndenFilter('despacho')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    andenFilter === 'despacho'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  Despacho (1 al 20)
                </button>
                <button
                  onClick={() => setAndenFilter('recepcion')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    andenFilter === 'recepcion'
                      ? 'bg-indigo-700 text-white shadow-xs'
                      : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                  }`}
                >
                  Recepción (21 al 34)
                </button>
                <button
                  onClick={() => setAndenFilter('alertas')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    andenFilter === 'alertas'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                  }`}
                >
                  Solo Alertas ({blockedAndenesCount})
                </button>
              </div>

              {/* Controles de Vista & Exportación */}
              <div className="flex items-center justify-between lg:justify-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setAndenViewMode('doble-columna')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      andenViewMode === 'doble-columna'
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Ver en 2 columnas paralelas (Despacho / Recepción)"
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">2 Columnas</span>
                  </button>
                  <button
                    onClick={() => setAndenViewMode('lista-simple')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      andenViewMode === 'lista-simple'
                        ? 'bg-white text-slate-800 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Ver en lista única vertical"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Lista Única</span>
                  </button>
                </div>

                <button
                  onClick={handleExportAndenesCsv}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                  title="Exportar inspección completa a archivo Excel/CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Sub-barra de Resumen Rápido */}
            <div className="flex flex-wrap items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500 font-medium">
              <div className="flex items-center gap-3">
                <span>
                  Mostrando <strong className="text-slate-800">{filteredAndenes.length}</strong> de 34 andenes
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline">
                  <strong className="text-emerald-700">{andenes.filter(a => !a.isBlocked && a.doorStatus === 'operativa' && a.gateStatus === 'operativa' && a.levelerStatus === 'operativo').length}</strong> operativos
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline">
                  <strong className="text-rose-600">{blockedAndenesCount}</strong> con observación o bloqueo
                </span>
              </div>

              <div className="text-[11px] text-slate-400">
                Pasa el mouse o presiona <strong>Editar</strong> para actualizar puerta, reja o nivelador.
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* LISTA COMPACTA DE FILAS (OPCIÓN 1) */}
          {/* ========================================================================= */}
          {filteredAndenes.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
              <Warehouse className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-700">No se encontraron andenes con ese criterio</h3>
              <p className="text-xs text-slate-400 mt-1">Prueba cambiando el filtro o la búsqueda.</p>
            </div>
          ) : andenViewMode === 'doble-columna' && andenFilter === 'todos' && !andenSearch.trim() ? (
            /* Vista 2 Columnas Dividida por Zonas Oficiales: Despacho (1-20) y Recepción (21-34) */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              
              {/* Columna 1: Despacho (Andenes 1 al 20) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-900/10 rounded-xl border border-emerald-800/15">
                  <span className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                    Andenes de Despacho (1 al 20)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800">
                    {andenes.filter(a => a.andenNumber <= 20 && (a.isBlocked || a.doorStatus !== 'operativa' || a.gateStatus !== 'operativa' || a.levelerStatus !== 'operativo')).length > 0 ? (
                      <span className="text-rose-700 font-black">
                        {andenes.filter(a => a.andenNumber <= 20 && (a.isBlocked || a.doorStatus !== 'operativa' || a.gateStatus !== 'operativa' || a.levelerStatus !== 'operativo')).length} con alerta
                      </span>
                    ) : (
                      'Todos 100% OK'
                    )}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {andenes.filter(a => a.andenNumber <= 20).map(anden => {
                    const isDoorOk = anden.doorStatus === 'operativa';
                    const isGateOk = anden.gateStatus === 'operativa';
                    const isLevelerOk = anden.levelerStatus === 'operativo';
                    const isFullyOk = isDoorOk && isGateOk && isLevelerOk && !anden.isBlocked;
                    const hasNotes = anden.doorNotes || anden.gateNotes || anden.levelerNotes;

                    return (
                      <div
                        key={anden.id}
                        onClick={() => handleOpenAndenModal(anden)}
                        className={`group bg-white rounded-2xl px-3 py-2.5 sm:px-4 sm:py-2.5 border transition-all duration-150 flex items-center justify-between gap-2.5 shadow-2xs hover:shadow-sm cursor-pointer ${
                          anden.isBlocked
                            ? 'border-rose-300 bg-rose-50/40 hover:bg-rose-50/80 ring-1 ring-rose-400/30'
                            : !isFullyOk
                            ? 'border-amber-300 bg-amber-50/20 hover:bg-amber-50/50'
                            : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Lado Izquierdo: Badge Número + Código */}
                        <div className="flex items-center gap-2.5 min-w-[110px] shrink-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-2xs ${
                              anden.isBlocked
                                ? 'bg-rose-600 text-white animate-pulse'
                                : !isFullyOk
                                ? 'bg-amber-500 text-white'
                                : 'bg-[#008744] text-white'
                            }`}
                          >
                            {anden.andenNumber.toString().padStart(2, '0')}
                          </div>

                          <div className="leading-tight">
                            <span className="text-xs font-black text-slate-800 block">
                              {anden.andenCode}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-medium">
                              Despacho
                            </span>
                          </div>
                        </div>

                        {/* Centro: 3 Mini-Píldoras Compactas */}
                        <div className="flex items-center gap-1.5 flex-1 justify-start sm:justify-center overflow-hidden">
                          {/* Puerta */}
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                              isDoorOk
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : anden.doorStatus === 'trabada'
                                ? 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                                : anden.doorStatus === 'falla_sensor'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-blue-100 text-blue-800 border-blue-300'
                            }`}
                            title={`Puerta: ${anden.doorStatus}${anden.doorNotes ? ` - ${anden.doorNotes}` : ''}`}
                          >
                            <span>🚪</span>
                            <span>{isDoorOk ? 'OK' : anden.doorStatus === 'trabada' ? 'Trabada' : 'Sensor'}</span>
                          </span>

                          {/* Reja */}
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                              isGateOk
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : anden.gateStatus === 'desrielada'
                                ? 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                                : anden.gateStatus === 'traba_rota'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-orange-100 text-orange-800 border-orange-300'
                            }`}
                            title={`Reja: ${anden.gateStatus}${anden.gateNotes ? ` - ${anden.gateNotes}` : ''}`}
                          >
                            <span>🛡️</span>
                            <span>{isGateOk ? 'OK' : anden.gateStatus === 'desrielada' ? 'Desriel' : 'Traba'}</span>
                          </span>

                          {/* Rampa */}
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                              isLevelerOk
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                            }`}
                            title={`Plancha Niveladora: ${anden.levelerStatus}${anden.levelerNotes ? ` - ${anden.levelerNotes}` : ''}`}
                          >
                            <span>🚜</span>
                            <span>{isLevelerOk ? 'OK' : anden.levelerStatus === 'fuga_hidraulica' ? 'Fuga' : 'Falla'}</span>
                          </span>

                          {/* Nota breve si existe */}
                          {hasNotes && (
                            <span
                              className="hidden xl:inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-100/80 border border-amber-300 px-1.5 py-0.5 rounded truncate max-w-[130px]"
                              title={[anden.doorNotes, anden.gateNotes, anden.levelerNotes].filter(Boolean).join(' • ')}
                            >
                              <AlertTriangle className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                              <span className="truncate">{[anden.doorNotes, anden.gateNotes, anden.levelerNotes].filter(Boolean)[0]}</span>
                            </span>
                          )}
                        </div>

                        {/* Lado Derecho: Inspector y Botón Rápido */}
                        <div className="flex items-center gap-2 shrink-0">
                          {anden.isBlocked && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                              Bloqueado
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenAndenModal(anden);
                            }}
                            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100 hover:bg-[#008744] text-slate-700 hover:text-white font-bold text-[11px] transition cursor-pointer flex items-center gap-1 group-hover:bg-[#008744] group-hover:text-white"
                          >
                            <Wrench className="w-3 h-3" />
                            <span className="hidden sm:inline">Editar</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Columna 2: Recepción Inbound (Andenes 21 al 34) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-1.5 bg-indigo-900/10 rounded-xl border border-indigo-800/15">
                  <span className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
                    Andenes de Recepción Inbound (21 al 34)
                  </span>
                  <span className="text-[11px] font-bold text-indigo-800">
                    {andenes.filter(a => a.andenNumber >= 21 && (a.isBlocked || a.doorStatus !== 'operativa' || a.gateStatus !== 'operativa' || a.levelerStatus !== 'operativo')).length > 0 ? (
                      <span className="text-rose-700 font-black">
                        {andenes.filter(a => a.andenNumber >= 21 && (a.isBlocked || a.doorStatus !== 'operativa' || a.gateStatus !== 'operativa' || a.levelerStatus !== 'operativo')).length} con alerta
                      </span>
                    ) : (
                      'Todos 100% OK'
                    )}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {andenes.filter(a => a.andenNumber >= 21).map(anden => {
                    const isDoorOk = anden.doorStatus === 'operativa';
                    const isGateOk = anden.gateStatus === 'operativa';
                    const isLevelerOk = anden.levelerStatus === 'operativo';
                    const isFullyOk = isDoorOk && isGateOk && isLevelerOk && !anden.isBlocked;
                    const hasNotes = anden.doorNotes || anden.gateNotes || anden.levelerNotes;

                    return (
                      <div
                        key={anden.id}
                        onClick={() => handleOpenAndenModal(anden)}
                        className={`group bg-white rounded-2xl px-3 py-2.5 sm:px-4 sm:py-2.5 border transition-all duration-150 flex items-center justify-between gap-2.5 shadow-2xs hover:shadow-sm cursor-pointer ${
                          anden.isBlocked
                            ? 'border-rose-300 bg-rose-50/40 hover:bg-rose-50/80 ring-1 ring-rose-400/30'
                            : !isFullyOk
                            ? 'border-amber-300 bg-amber-50/20 hover:bg-amber-50/50'
                            : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Lado Izquierdo: Badge Número + Código */}
                        <div className="flex items-center gap-2.5 min-w-[110px] shrink-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-2xs ${
                              anden.isBlocked
                                ? 'bg-rose-600 text-white animate-pulse'
                                : !isFullyOk
                                ? 'bg-amber-500 text-white'
                                : 'bg-indigo-600 text-white'
                            }`}
                          >
                            {anden.andenNumber.toString().padStart(2, '0')}
                          </div>

                          <div className="leading-tight">
                            <span className="text-xs font-black text-slate-800 block">
                              {anden.andenCode}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-medium">
                              Recepción
                            </span>
                          </div>
                        </div>

                        {/* Centro: 3 Mini-Píldoras Compactas */}
                        <div className="flex items-center gap-1.5 flex-1 justify-start sm:justify-center overflow-hidden">
                          {/* Puerta */}
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                              isDoorOk
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : anden.doorStatus === 'trabada'
                                ? 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                                : anden.doorStatus === 'falla_sensor'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-blue-100 text-blue-800 border-blue-300'
                            }`}
                            title={`Puerta: ${anden.doorStatus}${anden.doorNotes ? ` - ${anden.doorNotes}` : ''}`}
                          >
                            <span>🚪</span>
                            <span>{isDoorOk ? 'OK' : anden.doorStatus === 'trabada' ? 'Trabada' : 'Sensor'}</span>
                          </span>

                          {/* Reja */}
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                              isGateOk
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : anden.gateStatus === 'desrielada'
                                ? 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                                : anden.gateStatus === 'traba_rota'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-orange-100 text-orange-800 border-orange-300'
                            }`}
                            title={`Reja: ${anden.gateStatus}${anden.gateNotes ? ` - ${anden.gateNotes}` : ''}`}
                          >
                            <span>🛡️</span>
                            <span>{isGateOk ? 'OK' : anden.gateStatus === 'desrielada' ? 'Desriel' : 'Traba'}</span>
                          </span>

                          {/* Rampa */}
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                              isLevelerOk
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                            }`}
                            title={`Plancha Niveladora: ${anden.levelerStatus}${anden.levelerNotes ? ` - ${anden.levelerNotes}` : ''}`}
                          >
                            <span>🚜</span>
                            <span>{isLevelerOk ? 'OK' : anden.levelerStatus === 'fuga_hidraulica' ? 'Fuga' : 'Falla'}</span>
                          </span>

                          {/* Nota breve si existe */}
                          {hasNotes && (
                            <span
                              className="hidden xl:inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-100/80 border border-amber-300 px-1.5 py-0.5 rounded truncate max-w-[130px]"
                              title={[anden.doorNotes, anden.gateNotes, anden.levelerNotes].filter(Boolean).join(' • ')}
                            >
                              <AlertTriangle className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                              <span className="truncate">{[anden.doorNotes, anden.gateNotes, anden.levelerNotes].filter(Boolean)[0]}</span>
                            </span>
                          )}
                        </div>

                        {/* Lado Derecho: Inspector y Botón Rápido */}
                        <div className="flex items-center gap-2 shrink-0">
                          {anden.isBlocked && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                              Bloqueado
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenAndenModal(anden);
                            }}
                            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100 hover:bg-indigo-700 text-slate-700 hover:text-white font-bold text-[11px] transition cursor-pointer flex items-center gap-1 group-hover:bg-indigo-700 group-hover:text-white"
                          >
                            <Wrench className="w-3 h-3" />
                            <span className="hidden sm:inline">Editar</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* Vista Normal en 1 Columna o Grilla Balanceada si está filtrado */
            <div className={`space-y-1.5 ${andenViewMode === 'doble-columna' ? 'grid grid-cols-1 lg:grid-cols-2 gap-2 space-y-0' : ''}`}>
              {filteredAndenes.map(anden => {
                const isDoorOk = anden.doorStatus === 'operativa';
                const isGateOk = anden.gateStatus === 'operativa';
                const isLevelerOk = anden.levelerStatus === 'operativo';
                const isFullyOk = isDoorOk && isGateOk && isLevelerOk && !anden.isBlocked;
                const hasNotes = anden.doorNotes || anden.gateNotes || anden.levelerNotes;

                return (
                  <div
                    key={anden.id}
                    onClick={() => handleOpenAndenModal(anden)}
                    className={`group bg-white rounded-2xl px-3 py-2.5 sm:px-4 sm:py-2.5 border transition-all duration-150 flex items-center justify-between gap-3 shadow-2xs hover:shadow-sm cursor-pointer ${
                      anden.isBlocked
                        ? 'border-rose-300 bg-rose-50/40 hover:bg-rose-50/80 ring-1 ring-rose-400/30'
                        : !isFullyOk
                        ? 'border-amber-300 bg-amber-50/20 hover:bg-amber-50/50'
                        : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Badge + Código */}
                    <div className="flex items-center gap-2.5 min-w-[110px] shrink-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-2xs ${
                          anden.isBlocked
                            ? 'bg-rose-600 text-white animate-pulse'
                            : !isFullyOk
                            ? 'bg-amber-500 text-white'
                            : anden.andenNumber <= 20
                            ? 'bg-[#008744] text-white'
                            : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {anden.andenNumber.toString().padStart(2, '0')}
                      </div>

                      <div className="leading-tight">
                        <span className="text-xs font-black text-slate-800 block">
                          {anden.andenCode}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-medium">
                          {anden.andenNumber <= 20 ? 'Despacho' : 'Recepción'}
                        </span>
                      </div>
                    </div>

                    {/* 3 Mini-Píldoras */}
                    <div className="flex items-center gap-1.5 flex-1 justify-start sm:justify-center overflow-hidden">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                          isDoorOk
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : anden.doorStatus === 'trabada'
                            ? 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <span>🚪</span>
                        <span>{isDoorOk ? 'OK' : anden.doorStatus === 'trabada' ? 'Trabada' : 'Sensor'}</span>
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                          isGateOk
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                        }`}
                      >
                        <span>🛡️</span>
                        <span>{isGateOk ? 'OK' : anden.gateStatus === 'desrielada' ? 'Desriel' : 'Traba'}</span>
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                          isLevelerOk
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                        }`}
                      >
                        <span>🚜</span>
                        <span>{isLevelerOk ? 'OK' : 'Falla'}</span>
                      </span>

                      {hasNotes && (
                        <span
                          className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-100/80 border border-amber-300 px-1.5 py-0.5 rounded truncate max-w-[150px]"
                          title={[anden.doorNotes, anden.gateNotes, anden.levelerNotes].filter(Boolean).join(' • ')}
                        >
                          <AlertTriangle className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                          <span className="truncate">{[anden.doorNotes, anden.gateNotes, anden.levelerNotes].filter(Boolean)[0]}</span>
                        </span>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2 shrink-0">
                      {anden.isBlocked && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                          Bloqueado
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAndenModal(anden);
                        }}
                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-slate-100 hover:bg-[#008744] text-slate-700 hover:text-white font-bold text-[11px] transition cursor-pointer flex items-center gap-1 group-hover:bg-[#008744] group-hover:text-white"
                      >
                        <Wrench className="w-3 h-3" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal para Editar Estado del Andén */}
          {showAndenModal && selectedAnden && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center font-black text-lg ${
                      selectedAnden.isBlocked
                        ? 'bg-rose-600'
                        : selectedAnden.andenNumber <= 20
                        ? 'bg-[#008744]'
                        : 'bg-indigo-600'
                    }`}>
                      {selectedAnden.andenNumber}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800">
                        Inspección {selectedAnden.andenCode}
                      </h2>
                      <span className="text-xs text-slate-500 font-medium">
                        {selectedAnden.area}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAndenModal(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveAnden} className="space-y-4 mt-5">
                  
                  {/* Botón Rápido Todo Operativo */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">
                        Andén sin observaciones operacionales
                      </span>
                      <span className="text-[11px] text-emerald-700">
                        Marcar puerta, reja y nivelador como 100% operativos
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuickMarkAllOk}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer"
                    >
                      ✓ Todo Operativo
                    </button>
                  </div>

                  {/* 1. Puerta Seccional */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                      🚪 Puerta Seccional (Cortina de Andén)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 'operativa', label: 'Operativa (Normal)' },
                        { val: 'trabada', label: 'Trabada / Trancada' },
                        { val: 'falla_sensor', label: 'Falla Sensor / Límite' },
                        { val: 'mantenimiento', label: 'Mantenimiento' }
                      ].map(opt => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setAndenDoorStatus(opt.val as AndenDoorStatus)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer text-left ${
                            andenDoorStatus === opt.val
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {andenDoorStatus !== 'operativa' && (
                      <input
                        type="text"
                        placeholder="Detalle de falla en puerta (ej: sensor descalibrado, corte piola)..."
                        value={andenDoorNotes}
                        onChange={e => setAndenDoorNotes(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    )}
                  </div>

                  {/* 2. Reja de Seguridad */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                      🛡️ Reja de Seguridad de Andén
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 'operativa', label: 'Operativa (Cierre OK)' },
                        { val: 'desrielada', label: 'Desrielada / Salida de Guía' },
                        { val: 'traba_rota', label: 'Traba Mecánica Rota' },
                        { val: 'daniada', label: 'Deformada / Golpeada' }
                      ].map(opt => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setAndenGateStatus(opt.val as AndenGateStatus)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer text-left ${
                            andenGateStatus === opt.val
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {andenGateStatus !== 'operativa' && (
                      <input
                        type="text"
                        placeholder="Detalle de falla en reja (ej: golpeada por transpaleta, seguro trabado)..."
                        value={andenGateNotes}
                        onChange={e => setAndenGateNotes(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    )}
                  </div>

                  {/* 3. Plancha Niveladora */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                      🚜 Plancha Niveladora (Rampa Hidráulica)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 'operativo', label: 'Operativa (Nivel OK)' },
                        { val: 'fuga_hidraulica', label: 'Fuga Aceite Hidráulico' },
                        { val: 'desnivel', label: 'Desnivelada / Pandeo' },
                        { val: 'fuera_servicio', label: 'Fuera de Servicio' }
                      ].map(opt => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setAndenLevelerStatus(opt.val as AndenLevelerStatus)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer text-left ${
                            andenLevelerStatus === opt.val
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {andenLevelerStatus !== 'operativo' && (
                      <input
                        type="text"
                        placeholder="Detalle de falla en niveladora (ej: cilindro no sube, pérdida de presión)..."
                        value={andenLevelerNotes}
                        onChange={e => setAndenLevelerNotes(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    )}
                  </div>

                  {/* Bloqueo Crítico */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 border border-rose-200">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                      <div>
                        <span className="text-xs font-bold text-rose-900 block">
                          Bloquear Andén para Operaciones
                        </span>
                        <span className="text-[11px] text-rose-700">
                          Impide el acople de camiones hasta reparación técnica
                        </span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={andenIsBlocked}
                        onChange={e => setAndenIsBlocked(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                    </label>
                  </div>

                  {/* Datos del Inspector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Inspector / Supervisor
                      </label>
                      <input
                        type="text"
                        value={andenInspectedBy}
                        onChange={e => setAndenInspectedBy(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Turno de Inspección
                      </label>
                      <select
                        value={andenShift}
                        onChange={e => setAndenShift(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="Turno 1">Turno 1</option>
                        <option value="Turno 2">Turno 2</option>
                        <option value="Turno 3">Turno 3</option>
                      </select>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowAndenModal(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#008744] text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer shadow-md"
                    >
                      Guardar Estado del Andén
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PESTAÑA 4: CHECKLIST GRÚAS CIAL (CIAL-PR&MA-FOR-27) */}
      {/* ========================================================================= */}
      {subTab === 'checklist-gruas' && (
        <div className="space-y-6">
          
          {/* Header & Métricas del Formulario FOR-27 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                <ClipboardCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full">
                    Formato Oficial CIAL-PR&MA-FOR-27
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Prevención de Riesgos y Medio Ambiente
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-800 mt-0.5">
                  Check List Transpaleta Eléctrica Hombre a Bordo y Grúas
                </h2>
                <p className="text-xs text-slate-500">
                  Control pre-operacional diario de 16 puntos críticos (Frenos, Dirección, EPP, Plataforma y Batería).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={handleExportChecklistsCsv}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>Exportar CSV</span>
              </button>

              <button
                onClick={handleOpenNewChecklist}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#008744] text-white font-bold text-xs hover:bg-emerald-700 transition cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nuevo Check List FOR-27</span>
              </button>
            </div>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por equipo (ej: 7315) o evaluador..."
                value={gruaSearch}
                onChange={e => setGruaSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setGruaStatusFilter('todos')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  gruaStatusFilter === 'todos'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos ({gruaChecklists.length})
              </button>
              <button
                onClick={() => setGruaStatusFilter('aprobado')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  gruaStatusFilter === 'aprobado'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                Aprobados ({gruaChecklists.filter(c => c.finalStatus === 'aprobado').length})
              </button>
              <button
                onClick={() => setGruaStatusFilter('rechazado')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  gruaStatusFilter === 'rechazado'
                    ? 'bg-rose-700 text-white'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                }`}
              >
                Rechazados ({gruaChecklists.filter(c => c.finalStatus === 'rechazado').length})
              </button>
            </div>
          </div>

          {/* Historial de Evaluaciones FOR-27 */}
          <div className="space-y-3">
            {filteredChecklists.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">No hay check lists registrados</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Utiliza el botón "+ Nuevo Check List FOR-27" para registrar la inspección pre-operacional de transpaletas eléctricas o grúas.
                </p>
              </div>
            ) : (
              filteredChecklists.map(report => {
                const failCount = report.evaluations.filter(e => e.value === 'no_cumple').length;
                const criticalFails = report.evaluations.filter(e => e.isCritical && e.value === 'no_cumple');

                return (
                  <div
                    key={report.id}
                    className={`bg-white rounded-2xl p-5 border transition shadow-xs hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      report.finalStatus === 'rechazado'
                        ? 'border-rose-200 bg-rose-50/20'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                        report.finalStatus === 'aprobado'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}>
                        {report.equipmentNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-800">
                            Equipo Nº {report.equipmentNumber}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            • {report.equipmentType}
                          </span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            report.finalStatus === 'aprobado'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {report.finalStatus === 'aprobado' ? 'Aprobado para Operar' : 'Rechazado (No Operar)'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mt-1">
                          <span>📅 {report.date}</span>
                          <span>🕒 {report.shift}</span>
                          <span>📍 {report.area}</span>
                          <span>👤 Op: {report.evaluatorName}</span>
                          <span>👔 Sup: {report.supervisorName}</span>
                        </div>

                        {failCount > 0 && (
                          <div className="mt-2 flex items-center gap-2 text-xs font-bold text-rose-700">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            <span>
                              {failCount} punto(s) no cumplen
                              {criticalFails.length > 0 && ` (${criticalFails.length} críticos: ${criticalFails.map(f => f.label).join(', ')})`}
                            </span>
                          </div>
                        )}

                        {report.comments && (
                          <p className="text-xs text-slate-600 mt-1 italic">
                            "{report.comments}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => setSelectedReportDetail(report)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Ver Ficha FOR-27</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ========================================================================= */}
          {/* MODAL: NUEVO CHECK LIST CIAL-PR&MA-FOR-27 */}
          {/* ========================================================================= */}
          {showChecklistModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 my-6">
                
                {/* Header del Formulario */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img src={cialLogo} alt="CIAL Alimentos" className="w-12 h-12 object-contain" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded-md">
                          CIAL-PR&MA-FOR-27
                        </span>
                        <span className="text-xs font-bold text-emerald-800">
                          Gerencia Prevención de Riesgos y Medio Ambiente
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                        CHECK LIST TRANSPALETA ELÉCTRICA HOMBRE A BORDO
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChecklistModal(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveChecklistForm} className="space-y-6 mt-4">
                  
                  {/* Fila 1: Datos de Cabecera */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Área</label>
                      <input
                        type="text"
                        value={area}
                        onChange={e => setArea(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                        placeholder="ej: Despacho, Picking"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Nº de Equipo</label>
                      <input
                        type="text"
                        value={equipmentNumber}
                        onChange={e => setEquipmentNumber(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-black"
                        placeholder="ej: 7315"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Fecha</label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={e => setFormDate(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Turno</label>
                      <select
                        value={formShift}
                        onChange={e => setFormShift(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
                      >
                        <option value="Turno 1">Turno 1</option>
                        <option value="Turno 2">Turno 2</option>
                        <option value="Turno 3">Turno 3</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Evaluador / Operador Responsable</label>
                      <input
                        type="text"
                        value={evaluatorName}
                        onChange={e => setEvaluadorName(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                        placeholder="Nombre completo operador"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Supervisor Directo</label>
                      <input
                        type="text"
                        value={supervisorName}
                        onChange={e => setSupervisorName(e.target.value)}
                        className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
                        placeholder="Nombre supervisor"
                        required
                      />
                    </div>
                  </div>

                  {/* Advertencia de Estado Crítico en Vivo */}
                  {hasCriticalFailure && (
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300 flex items-center gap-3 text-rose-900">
                      <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider block">
                          DICTAMEN: RECHAZADO (EQUIPO INHABILITADO PARA OPERAR)
                        </span>
                        <span className="text-[11px]">
                          Se ha marcado "No Cumple" en uno o más ítems de seguridad crítica (Frenos, Dirección, Curso de Operador o Autorización).
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tabla de los 16 Ítems del Formulario CIAL */}
                  <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-1">
                    
                    {/* SECCIÓN 1: INSPECCIÓN GENERAL */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                      <div className="bg-slate-800 text-white px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center justify-between">
                        <span>1. Inspección General</span>
                        <span className="text-[10px] text-slate-300">5 Puntos</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {evaluations.filter(e => e.section === 'general').map((item) => {
                          const realIdx = evaluations.findIndex(e => e.itemId === item.itemId);
                          return (
                            <div key={item.itemId} className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition">
                              <div className="flex-1 pr-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-800">{item.label}</span>
                                  {item.isCritical && (
                                    <span className="text-[9px] font-black bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-md uppercase tracking-wider border border-rose-200">
                                      Crítico 🚨
                                    </span>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  placeholder="Observación opcional..."
                                  value={item.observacion || ''}
                                  onChange={e => handleObservationChange(realIdx, e.target.value)}
                                  className="mt-1 w-full text-[11px] p-1.5 rounded-lg border border-slate-200 bg-white"
                                />
                              </div>

                              <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'cumple')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'cumple'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  Cumple
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'no_cumple')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'no_cumple'
                                      ? 'bg-rose-600 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  No Cumple
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'no_aplica')}
                                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'no_aplica'
                                      ? 'bg-slate-700 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                  }`}
                                >
                                  N/A
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECCIÓN 2: INSPECCIÓN VISUAL */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                      <div className="bg-slate-800 text-white px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center justify-between">
                        <span>2. Inspección Visual</span>
                        <span className="text-[10px] text-slate-300">5 Puntos</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {evaluations.filter(e => e.section === 'visual').map((item) => {
                          const realIdx = evaluations.findIndex(e => e.itemId === item.itemId);
                          return (
                            <div key={item.itemId} className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition">
                              <div className="flex-1 pr-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-800">{item.label}</span>
                                  {item.isCritical && (
                                    <span className="text-[9px] font-black bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-md uppercase tracking-wider border border-rose-200">
                                      Crítico 🚨
                                    </span>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  placeholder="Observación opcional (ej: rayadura lateral)..."
                                  value={item.observacion || ''}
                                  onChange={e => handleObservationChange(realIdx, e.target.value)}
                                  className="mt-1 w-full text-[11px] p-1.5 rounded-lg border border-slate-200 bg-white"
                                />
                              </div>

                              <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'cumple')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'cumple'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  Cumple
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'no_cumple')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'no_cumple'
                                      ? 'bg-rose-600 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  No Cumple
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'no_aplica')}
                                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'no_aplica'
                                      ? 'bg-slate-700 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                  }`}
                                >
                                  N/A
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECCIÓN 3: REVISIÓN OPERACIONAL */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden">
                      <div className="bg-slate-800 text-white px-4 py-2 text-xs font-black uppercase tracking-wider flex items-center justify-between">
                        <span>3. Revisión Operacional</span>
                        <span className="text-[10px] text-slate-300">6 Puntos</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {evaluations.filter(e => e.section === 'operacional').map((item) => {
                          const realIdx = evaluations.findIndex(e => e.itemId === item.itemId);
                          return (
                            <div key={item.itemId} className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition">
                              <div className="flex-1 pr-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-800">{item.label}</span>
                                  {item.isCritical && (
                                    <span className="text-[9px] font-black bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-md uppercase tracking-wider border border-rose-200">
                                      Crítico 🚨
                                    </span>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  placeholder="Observación opcional (ej: holgura en comando)..."
                                  value={item.observacion || ''}
                                  onChange={e => handleObservationChange(realIdx, e.target.value)}
                                  className="mt-1 w-full text-[11px] p-1.5 rounded-lg border border-slate-200 bg-white"
                                />
                              </div>

                              <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'cumple')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'cumple'
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  Cumple
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'no_cumple')}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'no_cumple'
                                      ? 'bg-rose-600 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  No Cumple
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleEvaluationChange(realIdx, 'no_aplica')}
                                  className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                                    item.value === 'no_aplica'
                                      ? 'bg-slate-700 text-white shadow-xs'
                                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                  }`}
                                >
                                  N/A
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Comentarios Adicionales */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Comentarios Generales / Observaciones
                    </label>
                    <textarea
                      rows={2}
                      value={comments}
                      onChange={e => setComments(e.target.value)}
                      placeholder="Indicar cualquier novedad adicional antes de liberar el equipo..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-300"
                    />
                  </div>

                  {/* Botones de Envío */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-semibold">Estado proyectado:</span>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full uppercase ${
                        calculatedStatus === 'aprobado'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {calculatedStatus === 'aprobado' ? '✓ Aprobado para Turno' : '✗ Rechazado (No Operar)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowChecklistModal(false)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#008744] hover:bg-emerald-700 text-white font-black text-xs transition cursor-pointer shadow-md"
                      >
                        Registrar Check List CIAL
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODAL: VER DETALLE FICHA OFICIAL CIAL FOR-27 */}
          {/* ========================================================================= */}
          {selectedReportDetail && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-6">
                
                <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img src={cialLogo} alt="CIAL Alimentos" className="w-12 h-12 object-contain" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded-md">
                        {selectedReportDetail.formCode}
                      </span>
                      <h2 className="text-lg font-black text-slate-900 mt-1">
                        Ficha de Inspección Pre-Operacional • {selectedReportDetail.code}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                      title="Imprimir Ficha"
                    >
                      <Printer className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedReportDetail(null)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  {/* Resumen Cabecera */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block font-semibold">Nº de Equipo</span>
                      <span className="font-black text-slate-800 text-sm">{selectedReportDetail.equipmentNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Tipo</span>
                      <span className="font-bold text-slate-800">{selectedReportDetail.equipmentType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Fecha y Turno</span>
                      <span className="font-bold text-slate-800">{selectedReportDetail.date} • {selectedReportDetail.shift.slice(0, 7)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Estado Final</span>
                      <span className={`inline-block font-black px-2 py-0.5 rounded-full text-[10px] uppercase ${
                        selectedReportDetail.finalStatus === 'aprobado'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {selectedReportDetail.finalStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block font-semibold">Evaluador</span>
                      <span className="font-bold text-slate-800">{selectedReportDetail.evaluatorName}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block font-semibold">Supervisor</span>
                      <span className="font-bold text-slate-800">{selectedReportDetail.supervisorName}</span>
                    </div>
                  </div>

                  {/* Tabla de Puntos */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-[45vh] overflow-y-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-800 text-white uppercase text-[10px] tracking-wider sticky top-0">
                        <tr>
                          <th className="p-2.5">Ítem de Inspección</th>
                          <th className="p-2.5 text-center">Evaluación</th>
                          <th className="p-2.5">Observación</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedReportDetail.evaluations.map((ev) => (
                          <tr key={ev.itemId} className="hover:bg-slate-50">
                            <td className="p-2.5 font-semibold text-slate-700">
                              {ev.label}
                              {ev.isCritical && (
                                <span className="ml-1.5 text-[9px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-black">
                                  CRÍTICO
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                ev.value === 'cumple'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ev.value === 'no_cumple'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}>
                                {ev.value === 'cumple' ? 'Cumple' : ev.value === 'no_cumple' ? 'No Cumple' : 'N/A'}
                              </span>
                            </td>
                            <td className="p-2.5 text-slate-500 italic">
                              {ev.observacion || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Comentarios */}
                  {selectedReportDetail.comments && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-slate-700 block mb-0.5">Comentarios del Evaluador:</span>
                      <p className="text-slate-600">{selectedReportDetail.comments}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setSelectedReportDetail(null)}
                      className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
                    >
                      Cerrar Ficha
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
