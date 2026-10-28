import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Download, 
  Filter, 
  Eye, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  Camera, 
  Image as ImageIcon, 
  ArrowRight, 
  RefreshCw, 
  Award,
  Layers,
  ChevronRight,
  FileSpreadsheet,
  X,
  FileCheck2,
  Check
} from 'lucide-react';
import { 
  LupItem, 
  CharlaSession, 
  OperatorItem, 
  ShiftId, 
  ShiftType, 
  AppUser,
  LupCategory
} from '../types';
import { 
  getLups, 
  saveLup,
  getCharlas, 
  getOperators, 
  getAttendanceRecords,
  getSafetyLups, 
  getShiftAttendancePresent, 
  registerShiftLupTraining, 
  getOperatorSafetyHistory, 
  getLupTrainingCoverage, 
  getDailyShiftsSafetyStatus,
  exportToCsv,
  ShiftSafetyStatus
} from '../services/storage';
import { compressImageFile } from '../utils/imageCompressor';

interface SafetyDashboardProps {
  currentUser?: AppUser | null;
  onNavigateToLup?: (lupId: string) => void;
}

const COMMON_CRITICAL_RISKS = [
  'Atropello y Colisión de Peatones con Grúa Horquilla',
  'Atrapamiento Podálico / Mecánico en Transpaleta',
  'Hipotermia y Congelamiento en Cámara Frigorífica (-18°C)',
  'Caída a Distinto Nivel en Andén o Escala',
  'Desplome y Derrumbe de Carga Mal Estibada',
  'Sobreesfuerzo y Lesión Músculo-Esquelética',
  'Contacto Eléctrico en Cargadores de Batería'
];

const COMMON_EPP_LIST = [
  'Chaleco Reflectante Alta Visibilidad',
  'Zapatos de Seguridad Dieléctricos',
  'Casco de Seguridad con Barboquejo',
  'Guantes de Cabritilla / Anticorte',
  'Parka Térmica Frigorífica (-18°C)',
  'Pantalón Térmico Frigorífico',
  'Pasamontañas Térmico',
  'Botas Térmicas con Puntera',
  'Lentes de Seguridad / Antiparras'
];

const SHIFT_MAP: Record<ShiftId, { label: string; name: ShiftType; hours: string }> = {
  'turno-1': { label: 'Turno 1', name: 'Turno 1 (Mañana 07:00 - 15:00)', hours: 'Ciclo Operativo 1' },
  'turno-2': { label: 'Turno 2', name: 'Turno 2 (Tarde 15:00 - 23:00)', hours: 'Ciclo Operativo 2' },
  'turno-3': { label: 'Turno 3', name: 'Turno 3 (Noche 23:00 - 07:00)', hours: 'Ciclo Operativo 3' },
  'manana': { label: 'Turno 1', name: 'Turno 1 (Mañana 07:00 - 15:00)', hours: 'Ciclo Operativo 1' },
  'tarde': { label: 'Turno 2', name: 'Turno 2 (Tarde 15:00 - 23:00)', hours: 'Ciclo Operativo 2' },
  'noche': { label: 'Turno 3', name: 'Turno 3 (Noche 23:00 - 07:00)', hours: 'Ciclo Operativo 3' }
};

export const SafetyDashboard: React.FC<SafetyDashboardProps> = ({ currentUser, onNavigateToLup }) => {
  // Current Date filter
  const todayStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Sub-navigation tabs inside SSO Portal
  const [activePortalTab, setActivePortalTab] = useState<'turnos' | 'cobertura' | 'colaboradores' | 'catalogo-sso'>('turnos');

  // Data states
  const [safetyLups, setSafetyLups] = useState<LupItem[]>([]);
  const [shiftsStatus, setShiftsStatus] = useState<ShiftSafetyStatus[]>([]);
  const [operators, setOperators] = useState<OperatorItem[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal: Asignar LUP del Turno (Sin Cronómetro)
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [assignShiftId, setAssignShiftId] = useState<ShiftId>('turno-1');
  const [assignLupId, setAssignLupId] = useState<string>('');
  const [assignSupervisor, setAssignSupervisor] = useState<string>('Carlos Venegas');
  const [assignFacilitator, setAssignFacilitator] = useState<string>('');
  const [assignNotes, setAssignNotes] = useState<string>('');
  const [selectedOperatorIds, setSelectedOperatorIds] = useState<string[]>([]);
  const [presentOperatorsInShift, setPresentOperatorsInShift] = useState<{ operatorId: string; operatorName: string; role?: string; area?: string }[]>([]);

  // Modal: Nuevo LUP de Seguridad
  const [showNewSafetyLupModal, setShowNewSafetyLupModal] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newArea, setNewArea] = useState<string>('Todas las Áreas CD');
  const [newCriticalRisk, setNewCriticalRisk] = useState<string>(COMMON_CRITICAL_RISKS[0]);
  const [newSummary, setNewSummary] = useState<string>('');
  const [newObjective, setNewObjective] = useState<string>('');
  const [newSelectedEpp, setNewSelectedEpp] = useState<string[]>([COMMON_EPP_LIST[0], COMMON_EPP_LIST[1]]);
  const [newDoTitle, setNewDoTitle] = useState<string>('');
  const [newDoDesc, setNewDoDesc] = useState<string>('');
  const [newDoPhoto, setNewDoPhoto] = useState<string | null>(null);
  const [newDontTitle, setNewDontTitle] = useState<string>('');
  const [newDontDesc, setNewDontDesc] = useState<string>('');
  const [newDontPhoto, setNewDontPhoto] = useState<string | null>(null);
  const [newSafetyWarning, setNewSafetyWarning] = useState<string>('');

  // Operator Search in Kardex
  const [operatorSearch, setOperatorSearch] = useState<string>('');
  const [selectedOperatorForKardex, setSelectedOperatorForKardex] = useState<OperatorItem | null>(null);

  // Selected LUP for Coverage analysis
  const [selectedCoverageLupId, setSelectedCoverageLupId] = useState<string>('');

  // Load / Refresh Data
  const loadData = () => {
    const lups = getSafetyLups();
    setSafetyLups(lups);
    if (!assignLupId && lups.length > 0) {
      setAssignLupId(lups[0].id);
    }
    if (!selectedCoverageLupId && lups.length > 0) {
      setSelectedCoverageLupId(lups[0].id);
    }

    const ops = getOperators().filter(o => o.active !== false);
    setOperators(ops);

    const statuses = getDailyShiftsSafetyStatus(selectedDate);
    setShiftsStatus(statuses);
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  // Open Assign Modal for a specific shift
  const handleOpenAssignModal = (shiftId: ShiftId) => {
    setAssignShiftId(shiftId);
    // Load present operators from attendance for that shift and date
    const presentRecords = getShiftAttendancePresent(selectedDate, shiftId);
    const presentList = presentRecords.map(r => ({
      operatorId: r.operatorId,
      operatorName: r.operatorName,
      role: r.operatorRole,
      area: r.operatorArea
    }));

    setPresentOperatorsInShift(presentList);
    // Default to all selected
    setSelectedOperatorIds(presentList.map(p => p.operatorId));
    setShowAssignModal(true);
  };

  // When shift selector changes inside assign modal
  const handleAssignShiftChange = (newShiftId: ShiftId) => {
    setAssignShiftId(newShiftId);
    const presentRecords = getShiftAttendancePresent(selectedDate, newShiftId);
    const presentList = presentRecords.map(r => ({
      operatorId: r.operatorId,
      operatorName: r.operatorName,
      role: r.operatorRole,
      area: r.operatorArea
    }));
    setPresentOperatorsInShift(presentList);
    setSelectedOperatorIds(presentList.map(p => p.operatorId));
  };

  const handleToggleSelectAllOperators = () => {
    if (selectedOperatorIds.length === presentOperatorsInShift.length) {
      setSelectedOperatorIds([]);
    } else {
      setSelectedOperatorIds(presentOperatorsInShift.map(p => p.operatorId));
    }
  };

  const handleToggleOperator = (opId: string) => {
    if (selectedOperatorIds.includes(opId)) {
      setSelectedOperatorIds(selectedOperatorIds.filter(id => id !== opId));
    } else {
      setSelectedOperatorIds([...selectedOperatorIds, opId]);
    }
  };

  // Submit LUP assignment to Shift
  const handleConfirmAssignLup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignLupId) {
      showToast('Debes seleccionar un LUP de Seguridad.', 'error');
      return;
    }

    const shiftInfo = SHIFT_MAP[assignShiftId] || SHIFT_MAP['turno-1'];

    try {
      const session = registerShiftLupTraining({
        date: selectedDate,
        shiftId: assignShiftId,
        shiftName: shiftInfo.name,
        lupId: assignLupId,
        supervisor: assignSupervisor || currentUser?.name || 'Supervisor de Turno',
        facilitator: assignFacilitator || assignSupervisor,
        selectedOperatorIds: selectedOperatorIds,
        notes: assignNotes
      });

      showToast(`✅ LUP registrado para ${shiftInfo.label} con ${session.attendeesCount} colaboradores capacitados.`);
      setShowAssignModal(false);
      setAssignNotes('');
      loadData();
    } catch (err: any) {
      showToast('Error al registrar la charla: ' + (err?.message || 'Error desconocido'), 'error');
    }
  };

  // Create new Safety LUP
  const handleCreateSafetyLup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newTitle.trim()) {
      showToast('El código y el título son obligatorios.', 'error');
      return;
    }

    const newLup: LupItem = {
      id: `lup-sso-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      title: newTitle.trim(),
      category: 'Seguridad SSO',
      summary: newSummary.trim() || 'Estándar y buenas prácticas de Prevención de Riesgos SSO.',
      objective: newObjective.trim() || 'Prevenir incidentes y mitigar riesgos operacionales críticos.',
      durationMinutes: 5,
      area: newArea.trim(),
      author: currentUser?.name ? `${currentUser.name} (Prevención)` : 'Prevención de Riesgos CIAL',
      createdBy: currentUser?.email || 'prevencion@cial.cl',
      createdAt: new Date().toISOString(),
      isSafety: true,
      criticalRisk: newCriticalRisk,
      mandatoryEpp: newSelectedEpp,
      safetyWarning: newSafetyWarning.trim() || '¡Incumplir este estándar eleva el potencial de incidentes graves!',
      doPractice: {
        title: newDoTitle.trim() || 'Práctica Segura Recomendada',
        description: newDoDesc.trim() || 'Seguir siempre los controles establecidos.',
        points: ['Inspeccionar antes de operar', 'Usar el EPP normado', 'Reportar cualquier condición subestándar'],
        photoUrl: newDoPhoto || undefined
      },
      dontPractice: {
        title: newDontTitle.trim() || 'Práctica Insegura Prohibida',
        description: newDontDesc.trim() || 'No cometer actos subestándar que comprometan la integridad física.',
        points: ['❌ Nunca omitir el EPP', '❌ No saltarse los procedimientos de seguridad', '❌ No operar equipos con fallas'],
        photoUrl: newDontPhoto || undefined
      },
      keyPoints: [
        'Respetar siempre las vías y demarcaciones de seguridad.',
        'Contacto visual previo obligatorio.',
        'Notificar de inmediato a Prevención ante cualquier desviación.'
      ]
    };

    saveLup(newLup, currentUser?.email || 'prevencion@cial.cl', 'Creado desde el Portal de Prevención SSO');
    showToast(`✅ LUP de Seguridad "${newLup.code} - ${newLup.title}" creado con éxito.`);
    setShowNewSafetyLupModal(false);
    // Reset form
    setNewCode('');
    setNewTitle('');
    setNewSummary('');
    setNewObjective('');
    setNewDoTitle('');
    setNewDoDesc('');
    setNewDoPhoto(null);
    setNewDontTitle('');
    setNewDontDesc('');
    setNewDontPhoto(null);
    setNewSafetyWarning('');
    loadData();
  };

  const handleToggleEpp = (epp: string) => {
    if (newSelectedEpp.includes(epp)) {
      setNewSelectedEpp(newSelectedEpp.filter(item => item !== epp));
    } else {
      setNewSelectedEpp([...newSelectedEpp, epp]);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, isDo: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        if (isDo) setNewDoPhoto(dataUrl);
        else setNewDontPhoto(dataUrl);
      } catch (err) {
        console.error('Error al comprimir imagen:', err);
      }
    }
  };

  // Coverage statistics for selected LUP
  const coverageData = useMemo(() => {
    if (!selectedCoverageLupId) return null;
    return getLupTrainingCoverage(selectedCoverageLupId);
  }, [selectedCoverageLupId, safetyLups]);

  // Kardex history for selected operator
  const operatorKardexHistory = useMemo(() => {
    if (!selectedOperatorForKardex) return [];
    return getOperatorSafetyHistory(selectedOperatorForKardex.id);
  }, [selectedOperatorForKardex]);

  // Filtered operators for Kardex search
  const filteredOperatorsForKardex = useMemo(() => {
    if (!operatorSearch.trim()) return operators.slice(0, 8);
    const q = operatorSearch.toLowerCase().trim();
    return operators.filter(o => 
      o.name.toLowerCase().includes(q) || 
      (o.rut && o.rut.toLowerCase().includes(q)) ||
      (o.role && o.role.toLowerCase().includes(q))
    ).slice(0, 15);
  }, [operators, operatorSearch]);

  // Export full SSO Training Act for current date
  const handleExportDailySsoAct = () => {
    const charlas = getCharlas().filter(c => c.date === selectedDate);
    if (charlas.length === 0) {
      showToast('No hay registros de LUPs en la fecha seleccionada.', 'error');
      return;
    }

    const rows: Record<string, any>[] = [];
    for (const c of charlas) {
      if (c.attendeesList && c.attendeesList.length > 0) {
        for (const a of c.attendeesList) {
          rows.push({
            'Fecha': c.date,
            'Hora': c.time,
            'Turno': c.shift,
            'Código LUP': c.lupCode,
            'Título LUP': c.lupTitle,
            'Es Seguridad': c.isSafetyLup ? 'SÍ' : 'NO',
            'Supervisor': c.supervisor,
            'Facilitador': c.facilitator,
            'RUT Colaborador': a.rut || 'S/R',
            'Nombre Colaborador': a.operatorName,
            'Cargo': a.role || 'Operador',
            'Área': a.area || c.area
          });
        }
      } else {
        rows.push({
          'Fecha': c.date,
          'Hora': c.time,
          'Turno': c.shift,
          'Código LUP': c.lupCode,
          'Título LUP': c.lupTitle,
          'Es Seguridad': c.isSafetyLup ? 'SÍ' : 'NO',
          'Supervisor': c.supervisor,
          'Facilitador': c.facilitator,
          'RUT Colaborador': 'Nómina Global',
          'Nombre Colaborador': `Dotación Turno (${c.attendeesCount} presentes)`,
          'Cargo': 'Asistentes Turno',
          'Área': c.area
        });
      }
    }

    exportToCsv(`Acta_SSO_LUPs_${selectedDate}`, rows);
    showToast(`📄 Acta formal de Prevención exportada (${rows.length} registros individuales).`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border text-sm font-bold animate-slide-up ${
          notification.type === 'success' 
            ? 'bg-emerald-950 text-emerald-100 border-emerald-700 shadow-emerald-950/40' 
            : 'bg-rose-950 text-rose-100 border-rose-700 shadow-rose-950/40'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Hero Banner: Portal de Prevención de Riesgos */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 p-6 sm:p-8 text-white shadow-lg">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Prevención de Riesgos & SSO • CD CIAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Portal Profesional de Prevención de Riesgos
            </h1>
            <p className="text-sm text-amber-100 max-w-2xl leading-relaxed">
              Monitorea el cumplimiento de LUPs de seguridad en turnos rotativos, cruza la asistencia diaria con la dotación capacitada y gestiona la trazabilidad individual de los <strong>{operators.length} colaboradores</strong> del centro.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => setShowNewSafetyLupModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 shadow-md cursor-pointer hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nuevo LUP de Seguridad</span>
            </button>

            <button
              onClick={handleExportDailySsoAct}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 border border-white/20 cursor-pointer backdrop-blur-md"
              title="Descargar acta con lista nominal para ACHS / Inspección"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Exportar Acta SSO</span>
            </button>
          </div>
        </div>

        {/* Date Selector and Fast Context */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">Fecha de Monitoreo:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-black/30 text-white font-bold text-xs rounded-xl px-3 py-1.5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            />
            {selectedDate === todayStr && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                Hoy
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-100">
            <span className="font-medium">Sesión activa:</span>
            <span className="font-bold bg-black/25 px-2.5 py-1 rounded-lg border border-white/10">
              {currentUser?.name || 'Profesional SSO'} ({currentUser?.role || 'prevencion'})
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs inside Prevention Portal */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        <button
          onClick={() => setActivePortalTab('turnos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activePortalTab === 'turnos'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Semáforo Diario de Turnos</span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-black/10">
            {shiftsStatus.filter(s => s.completed).length}/3
          </span>
        </button>

        <button
          onClick={() => setActivePortalTab('cobertura')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activePortalTab === 'cobertura'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Cobertura por LUP Crítico</span>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-black/10">
            {safetyLups.length} LUPs
          </span>
        </button>

        <button
          onClick={() => setActivePortalTab('colaboradores')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activePortalTab === 'colaboradores'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Kardex por Colaborador</span>
        </button>

        <button
          onClick={() => setActivePortalTab('catalogo-sso')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activePortalTab === 'catalogo-sso'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Catálogo Exclusivo SSO</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: SEMÁFORO DIARIO DE TURNOS (CRUCE ASISTENCIA ⇄ LUP DEL DÍA) */}
      {/* ============================================================== */}
      {activePortalTab === 'turnos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <span>Estado de LUPs por Turno</span>
                <span className="text-xs font-semibold text-slate-500">({selectedDate})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Los turnos rotan periódicamente. El sistema cruza a los operadores <strong>presentes en el Pase de Lista</strong> con la lección dictada.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {shiftsStatus.filter(s => s.completed).length} Realizados
              </span>
              <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                {shiftsStatus.filter(s => !s.completed).length} Pendientes
              </span>
            </div>
          </div>

          {/* Cards for Turno 1, Turno 2, Turno 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {shiftsStatus.map((shift) => {
              const isDone = shift.completed;
              const charla = shift.charla;

              return (
                <div 
                  key={shift.shiftId}
                  className={`rounded-3xl p-5 border transition flex flex-col justify-between ${
                    isDone 
                      ? 'bg-white border-emerald-300 shadow-xs hover:border-emerald-400' 
                      : 'bg-white border-rose-200 shadow-xs hover:border-rose-300'
                  }`}
                >
                  <div>
                    {/* Header Card */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                        {shift.label}
                      </span>

                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                        isDone 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}>
                        {isDone ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Completado</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            <span>Pendiente</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 mb-1">
                      {shift.shiftName}
                    </h3>

                    {/* Attendance stats for this shift */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 my-3 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-semibold">Presentes en Asistencia:</span>
                        <span className="font-black text-slate-900">{shift.presentCount} operadores</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-semibold">Capacitados en LUP:</span>
                        <span className={`font-black ${isDone ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {shift.trainedCount} operadores
                        </span>
                      </div>
                    </div>

                    {/* If completed, show LUP details */}
                    {isDone && charla ? (
                      <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-emerald-900">{charla.lupCode}</span>
                          <span className="text-[10px] text-emerald-700 font-bold">{charla.time} hrs</span>
                        </div>
                        <p className="font-bold text-slate-800 line-clamp-2">
                          {charla.lupTitle}
                        </p>
                        <p className="text-[11px] text-slate-600 pt-1 border-t border-emerald-200/60">
                          Supervisor: <strong className="text-slate-800">{charla.supervisor}</strong>
                        </p>
                      </div>
                    ) : (
                      <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/70 text-xs text-amber-900">
                        <p className="font-bold">⚠️ Sin registro de LUP hoy en este turno</p>
                        <p className="text-[11px] text-amber-800 mt-1">
                          Los {shift.presentCount} operadores marcados presentes aún no tienen lección de seguridad anclada.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenAssignModal(shift.shiftId)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDone
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Registrar Otra Charla' : '⚡ Asignar LUP a Presentes'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: COBERTURA POR LUP CRÍTICO (% DE LA DOTACIÓN TOTAL 102) */}
      {/* ============================================================== */}
      {activePortalTab === 'cobertura' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Matriz de Cobertura de Dotación por LUP de Seguridad
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dado que los colaboradores rotan de turno, aquí puedes ver qué porcentaje del personal activo ya recibió cada lección y quiénes faltan.
                </p>
              </div>

              {/* Selector of Safety LUP */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">LUP:</span>
                <select
                  value={selectedCoverageLupId}
                  onChange={(e) => setSelectedCoverageLupId(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {safetyLups.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.code} - {l.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {coverageData && (
              <div className="space-y-4 pt-3 border-t border-slate-100">
                {/* LUP Meta Card */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                        {coverageData.lup.code}
                      </span>
                      <span className="text-xs font-bold text-amber-800">
                        Riesgo: {coverageData.lup.criticalRisk || 'Seguridad Operacional'}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900">
                      {coverageData.lup.title}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-2xl">
                      {coverageData.lup.summary}
                    </p>
                  </div>

                  {/* Percentage Metric */}
                  <div className="bg-white p-4 rounded-2xl border border-amber-200 text-center shrink-0 min-w-[160px]">
                    <p className="text-3xl font-black text-amber-600">
                      {coverageData.percentage}%
                    </p>
                    <p className="text-[11px] font-bold text-slate-600 mt-0.5">
                      {coverageData.trainedCount} de {coverageData.totalOperators} capacitados
                    </p>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                      <div 
                        className="bg-amber-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${coverageData.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4 Photos of the LUP if available */}
                {coverageData.lup.photos && coverageData.lup.photos.length >= 4 && (
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-white shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" />
                        4 Puntos Clave del Estándar en Fotografías
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Fotografías del Robot y Procedimiento
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {coverageData.lup.photos.map((p, idx) => (
                        <div key={idx} className="bg-slate-800/90 rounded-xl overflow-hidden border border-slate-700 flex flex-col justify-between">
                          <div className="relative h-32 bg-slate-950">
                            <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                            <span className={`absolute top-1.5 left-1.5 text-[9px] font-black px-1.5 py-0.5 rounded ${
                              p.type === 'do' ? 'bg-emerald-600 text-white' : (p.type === 'dont' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950')
                            }`}>
                              {p.type === 'do' ? '✅ SÍ' : (p.type === 'dont' ? '❌ NO' : '⚠️')}
                            </span>
                          </div>
                          <div className="p-2.5 text-xs space-y-0.5">
                            <p className="font-black text-slate-200 line-clamp-1">{p.title}</p>
                            {p.caption && (
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{p.caption}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid: Trained vs Pending */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  
                  {/* Column 1: Trained Operators */}
                  <div className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-100">
                      <span className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Colaboradores Capacitados ({coverageData.trainedCount})</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Al día
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                      {coverageData.trainedOperators.map(op => (
                        <div 
                          key={op.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-100 transition"
                        >
                          <div>
                            <p className="font-bold text-slate-800">{op.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{op.rut || 'Sin RUT'}</p>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {op.area || 'CD CIAL'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Pending Operators (Rezagados) */}
                  <div className="bg-white rounded-2xl border border-rose-200 p-4 shadow-xs">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-100">
                      <span className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Pendientes de Nivelación ({coverageData.pendingOperators.length})</span>
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                        Requiere Charla
                      </span>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                      {coverageData.pendingOperators.length === 0 ? (
                        <div className="text-center py-8 text-xs text-slate-400 font-bold">
                          🎉 ¡Toda la dotación activa está 100% capacitada en este LUP!
                        </div>
                      ) : (
                        coverageData.pendingOperators.map(op => (
                          <div 
                            key={op.id}
                            className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-200/60 flex items-center justify-between text-xs hover:bg-rose-50 transition"
                          >
                            <div>
                              <p className="font-bold text-slate-800">{op.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{op.rut || 'Sin RUT'}</p>
                            </div>
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                              {op.role || 'Operador'}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: KARDEX NOMINAL POR COLABORADOR (HOJA DE VIDA DE SEGURIDAD) */}
      {/* ============================================================== */}
      {activePortalTab === 'colaboradores' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-black text-slate-900 mb-1">
              Buscador y Ficha de Seguridad del Colaborador
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Busca por nombre o RUT para ver todas las lecciones de seguridad impartidas a un trabajador a lo largo de sus rotaciones.
            </p>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Escribe el nombre o RUT del operador (ej: Fuentes, Matias, 21.660...)"
                value={operatorSearch}
                onChange={(e) => setOperatorSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Operator Quick Results */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filteredOperatorsForKardex.map(op => {
                const isSelected = selectedOperatorForKardex?.id === op.id;
                return (
                  <button
                    key={op.id}
                    onClick={() => setSelectedOperatorForKardex(op)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{op.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({op.rut ? op.rut.slice(-5) : 'S/R'})</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Operator Kardex View */}
            {selectedOperatorForKardex ? (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      Ficha Individual de Seguridad
                    </span>
                    <h3 className="text-lg font-black text-white mt-1">
                      {selectedOperatorForKardex.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono mt-0.5">
                      RUT: {selectedOperatorForKardex.rut || 'No informado'} • Cargo: {selectedOperatorForKardex.role} • Área: {selectedOperatorForKardex.area}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-2xl font-black text-amber-400">
                      {operatorKardexHistory.length}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-300">
                      LUPs de Seguridad Recibidos
                    </p>
                  </div>
                </div>

                {/* History Timeline of LUPs */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Historial Cronológico de Lecciones Recibidas
                  </h4>

                  {operatorKardexHistory.length === 0 ? (
                    <div className="bg-slate-50 p-8 rounded-2xl text-center text-xs text-slate-400 border border-slate-200">
                      Sin registros de LUPs asociados formalmente a este colaborador aún.
                    </div>
                  ) : (
                    operatorKardexHistory.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
                              {item.charla.lupCode}
                            </span>
                            <span className="text-slate-400 text-[10px]">
                              {item.date} • {item.charla.time} hrs
                            </span>
                            <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
                              {item.shift}
                            </span>
                          </div>
                          <p className="font-bold text-slate-900 text-sm">
                            {item.charla.lupTitle}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Impartido por: <strong className="text-slate-700">{item.supervisor}</strong>
                          </p>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0 self-start sm:self-center">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Asistencia Acreditada</span>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-2xl text-center text-xs text-slate-400 border border-slate-200 font-bold">
                👆 Selecciona un colaborador arriba para desplegar su ficha de seguridad completa.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: CATÁLOGO EXCLUSIVO DE LUPS DE SEGURIDAD SSO */}
      {/* ============================================================== */}
      {activePortalTab === 'catalogo-sso' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>Estándares y LUPs de Seguridad SSO Activos ({safetyLups.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Lecciones de Un Punto con foco normativo, matriz de peligros críticos y elementos de protección obligatorios.
              </p>
            </div>

            <button
              onClick={() => setShowNewSafetyLupModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>+ Crear Nuevo LUP SSO</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {safetyLups.map(lup => (
              <div 
                key={lup.id}
                className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-xs hover:border-amber-400 transition flex flex-col justify-between"
              >
                <div>
                  {/* Badge SSO Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-amber-600" />
                      <span>SEGURIDAD CRÍTICA</span>
                    </span>
                    <span className="text-xs font-black text-slate-500">{lup.code}</span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 mb-1.5 line-clamp-2">
                    {lup.title}
                  </h3>

                  {lup.criticalRisk && (
                    <div className="mb-3">
                      <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        Peligro: {lup.criticalRisk}
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                    {lup.summary}
                  </p>

                  {/* EPP required preview */}
                  {lup.mandatoryEpp && lup.mandatoryEpp.length > 0 && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-4 text-[11px]">
                      <span className="font-bold text-slate-700 block mb-1">EPP Obligatorio:</span>
                      <div className="flex flex-wrap gap-1">
                        {lup.mandatoryEpp.map((epp, i) => (
                          <span key={i} className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[10px] font-semibold text-slate-700">
                            🛡️ {epp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4 Photos Preview */}
                  {lup.photos && lup.photos.length >= 4 && (
                    <div className="mb-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                      <div className="grid grid-cols-4 gap-1.5 h-16">
                        {lup.photos.slice(0, 4).map((p, pIdx) => (
                          <div 
                            key={pIdx} 
                            className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-200 h-full"
                            title={p.title}
                          >
                            <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                            <span className={`absolute bottom-0.5 left-0.5 text-[8px] font-black px-1 rounded ${
                              p.type === 'do' ? 'bg-emerald-600 text-white' : (p.type === 'dont' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-slate-950')
                            }`}>
                              {pIdx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-amber-800 font-bold block text-center mt-1">
                        📸 4 Fotos del Estándar
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-semibold">{lup.area}</span>
                  <button
                    onClick={() => {
                      if (onNavigateToLup) onNavigateToLup(lup.id);
                      setSelectedCoverageLupId(lup.id);
                      setActivePortalTab('cobertura');
                    }}
                    className="text-amber-700 font-black hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver Cobertura</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ASIGNAR LUP AL TURNO (SIN CRONÓMETRO - 1 CLIC) */}
      {/* ============================================================== */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    ⚡ Asignación Rápida de LUP al Turno
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cruce directo con la asistencia del día sin pasar por cronómetro.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssignLup} className="p-5 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Turno *
                  </label>
                  <select
                    value={assignShiftId}
                    onChange={(e) => handleAssignShiftChange(e.target.value as ShiftId)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="turno-1">Turno 1 (Ciclo Operativo 1)</option>
                    <option value="turno-2">Turno 2 (Ciclo Operativo 2)</option>
                    <option value="turno-3">Turno 3 (Ciclo Operativo 3)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Fecha de la Lección *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  LUP de Seguridad a Impartir *
                </label>
                <select
                  value={assignLupId}
                  onChange={(e) => setAssignLupId(e.target.value)}
                  className="w-full bg-amber-50/60 border border-amber-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {safetyLups.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.code} - {l.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Supervisor Responsable *
                  </label>
                  <input
                    type="text"
                    value={assignSupervisor}
                    onChange={(e) => setAssignSupervisor(e.target.value)}
                    placeholder="Ej: Carlos Venegas"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Facilitador / Líder Charla
                  </label>
                  <input
                    type="text"
                    value={assignFacilitator}
                    onChange={(e) => setAssignFacilitator(e.target.value)}
                    placeholder="Ej: Juan Pérez (Operador Líder)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Attendance Checklist for Shift */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Operadores Presentes en este Turno ({selectedOperatorIds.length} de {presentOperatorsInShift.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleToggleSelectAllOperators}
                    className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
                  >
                    {selectedOperatorIds.length === presentOperatorsInShift.length ? 'Desmarcar Todos' : 'Marcar Todos'}
                  </button>
                </div>

                {presentOperatorsInShift.length === 0 ? (
                  <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs text-rose-700">
                    ⚠️ No hay operadores marcados como <strong>Presente</strong> en el Pase de Lista para este turno y fecha. Si dictaste la charla a una dotación, puedes marcar su asistencia en el módulo de Asistencia.
                  </div>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-2xl border border-slate-200 scrollbar-thin">
                    {presentOperatorsInShift.map(op => {
                      const isChecked = selectedOperatorIds.includes(op.operatorId);
                      return (
                        <label 
                          key={op.operatorId}
                          className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 transition cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleOperator(op.operatorId)}
                              className="rounded-md text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                            />
                            <span className="font-bold text-slate-800">{op.operatorName}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{op.role || 'Operador'}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Observaciones / Acuerdos de la Lección
                </label>
                <textarea
                  rows={2}
                  value={assignNotes}
                  onChange={(e) => setAssignNotes(e.target.value)}
                  placeholder="Ej: Se reforzó el uso de silbato en cruces de andén y contacto visual con grueros..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={selectedOperatorIds.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs transition shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirmar y Guardar ({selectedOperatorIds.length} Colaboradores)</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: NUEVO LUP DE SEGURIDAD (SSO CRÍTICO) */}
      {/* ============================================================== */}
      {showNewSafetyLupModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scale-up">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-slate-950" />
                <div>
                  <h3 className="text-base font-black">
                    Nuevo LUP de Seguridad SSO
                  </h3>
                  <p className="text-xs text-amber-950/80 font-medium">
                    Diseñado para el equipo de Prevención de Riesgos de CIAL Alimentos.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNewSafetyLupModal(false)}
                className="text-slate-950 hover:bg-black/10 p-1.5 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSafetyLup} className="p-5 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Código LUP *
                  </label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="LUP-SSO-004"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-black uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Título de la Lección *
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej: Bloqueo de Ruedas y Cuñas de Seguridad en Andenes"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Peligro Crítico Asociado *
                  </label>
                  <select
                    value={newCriticalRisk}
                    onChange={(e) => setNewCriticalRisk(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {COMMON_CRITICAL_RISKS.map((risk, i) => (
                      <option key={i} value={risk}>{risk}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Área Operativa
                  </label>
                  <input
                    type="text"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    placeholder="Ej: Andenes de Despacho"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Resumen de la Lección
                </label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Explica brevemente qué riesgo se mitiga y cuál es la regla de oro..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* EPP Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Elementos de Protección Personal (EPP) Obligatorios
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  {COMMON_EPP_LIST.map((epp, i) => {
                    const isChecked = newSelectedEpp.includes(epp);
                    return (
                      <label key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleEpp(epp)}
                          className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                        />
                        <span>{epp}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Qué SÍ hacer vs Qué NO hacer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* DO */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <span className="text-xs font-black text-emerald-800 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Qué SÍ Hacer (Estándar)</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Título ej: Colocar cuña antes de abrir rampa"
                    value={newDoTitle}
                    onChange={(e) => setNewDoTitle(e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Descripción de la acción segura..."
                    value={newDoDesc}
                    onChange={(e) => setNewDoDesc(e.target.value)}
                    className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-xs"
                  />
                  <div>
                    <label className="text-[10px] font-bold text-emerald-800 block mb-1">Foto Caso Correcto (Opcional):</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, true)}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-emerald-600 file:text-white"
                    />
                  </div>
                </div>

                {/* DONT */}
                <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                  <span className="text-xs font-black text-rose-800 uppercase flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Qué NO Hacer (Peligro)</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Título ej: Ingresar transpaleta sin cuña puesta"
                    value={newDontTitle}
                    onChange={(e) => setNewDontTitle(e.target.value)}
                    className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Descripción de la conducta peligrosa..."
                    value={newDontDesc}
                    onChange={(e) => setNewDontDesc(e.target.value)}
                    className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs"
                  />
                  <div>
                    <label className="text-[10px] font-bold text-rose-800 block mb-1">Foto Caso Incorrecto (Opcional):</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, false)}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-rose-600 file:text-white"
                    />
                  </div>
                </div>

              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Advertencia de Seguridad
                </label>
                <input
                  type="text"
                  value={newSafetyWarning}
                  onChange={(e) => setNewSafetyWarning(e.target.value)}
                  placeholder="¡Riesgo crítico de caída de rampla o aplastamiento!"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewSafetyLupModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Publicar LUP de Seguridad</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
