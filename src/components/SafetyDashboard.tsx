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
  Check,
  Trash2
} from 'lucide-react';
import { 
  LupItem, 
  LupPractice,
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
  ShiftSafetyStatus,
  getShiftTeamPhoto,
  saveShiftTeamPhoto
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
  'turno-1': { label: 'Turno 1', name: 'Turno 1', hours: 'Turno Rotativo' },
  'turno-2': { label: 'Turno 2', name: 'Turno 2', hours: 'Turno Rotativo' },
  'turno-3': { label: 'Turno 3', name: 'Turno 3', hours: 'Turno Rotativo' },
  'manana': { label: 'Turno 1', name: 'Turno 1', hours: 'Turno Rotativo' },
  'tarde': { label: 'Turno 2', name: 'Turno 2', hours: 'Turno Rotativo' },
  'noche': { label: 'Turno 3', name: 'Turno 3', hours: 'Turno Rotativo' }
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
  const [assignPhotoUrl, setAssignPhotoUrl] = useState<string | null>(null);
  const [assignPhotoSizeKb, setAssignPhotoSizeKb] = useState<number | null>(null);

  // Modal: Ver LUP Completo
  const [viewingLupModal, setViewingLupModal] = useState<LupItem | null>(null);
  const [viewingPhoto, setViewingPhoto] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  // Modal: Nuevo LUP de Seguridad
  const [showNewSafetyLupModal, setShowNewSafetyLupModal] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newArea, setNewArea] = useState<string>('Todas las Áreas CD');
  const [newCriticalRisk, setNewCriticalRisk] = useState<string>(COMMON_CRITICAL_RISKS[0]);
  const [newSummary, setNewSummary] = useState<string>('');
  const [newObjective, setNewObjective] = useState<string>('');
  const [newSelectedEpp, setNewSelectedEpp] = useState<string[]>([COMMON_EPP_LIST[0], COMMON_EPP_LIST[1]]);
  const [newSafetyWarning, setNewSafetyWarning] = useState<string>('');

  // Múltiples Qué SÍ hacer y Qué NO hacer
  const [doPracticesList, setDoPracticesList] = useState<{
    id: string;
    title: string;
    description: string;
    pointsText: string;
    photoUrl: string | null;
    photoSizeKb?: number;
  }[]>([
    { id: 'do-1', title: '', description: '', pointsText: '', photoUrl: null }
  ]);

  const [dontPracticesList, setDontPracticesList] = useState<{
    id: string;
    title: string;
    description: string;
    pointsText: string;
    photoUrl: string | null;
    photoSizeKb?: number;
  }[]>([
    { id: 'dont-1', title: '', description: '', pointsText: '', photoUrl: null }
  ]);

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

    // Load existing team photo for this shift if already taken in Asistencia
    const existingPhoto = getShiftTeamPhoto(selectedDate, shiftId);
    setAssignPhotoUrl(existingPhoto ? existingPhoto.photoUrl : null);
    setAssignPhotoSizeKb(existingPhoto ? (existingPhoto.photoSizeKb || null) : null);

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

    const existingPhoto = getShiftTeamPhoto(selectedDate, newShiftId);
    setAssignPhotoUrl(existingPhoto ? existingPhoto.photoUrl : null);
    setAssignPhotoSizeKb(existingPhoto ? (existingPhoto.photoSizeKb || null) : null);
  };

  const handleAssignPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 900, quality: 0.7 });
        setAssignPhotoUrl(dataUrl);
        setAssignPhotoSizeKb(sizeKb);
      } catch (err) {
        console.error('Error al comprimir foto:', err);
      }
    }
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
        notes: assignNotes,
        photoUrl: assignPhotoUrl || undefined,
        photoSizeKb: assignPhotoSizeKb || undefined
      });

      showToast(`✅ LUP registrado para ${shiftInfo.label} con ${session.attendeesCount} colaboradores capacitados.`);
      setShowAssignModal(false);
      setAssignNotes('');
      setAssignPhotoUrl(null);
      setAssignPhotoSizeKb(null);
      loadData();
    } catch (err: any) {
      showToast('Error al registrar la charla: ' + (err?.message || 'Error desconocido'), 'error');
    }
  };

  // Practice handlers for multiple DO
  const handleAddDoPractice = () => {
    setDoPracticesList(prev => [
      ...prev,
      { id: `do-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, title: '', description: '', pointsText: '', photoUrl: null }
    ]);
  };

  const handleRemoveDoPractice = (index: number) => {
    if (doPracticesList.length <= 1) return;
    setDoPracticesList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateDoPractice = (index: number, field: string, value: any) => {
    setDoPracticesList(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Practice handlers for multiple DONT
  const handleAddDontPractice = () => {
    setDontPracticesList(prev => [
      ...prev,
      { id: `dont-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, title: '', description: '', pointsText: '', photoUrl: null }
    ]);
  };

  const handleRemoveDontPractice = (index: number) => {
    if (dontPracticesList.length <= 1) return;
    setDontPracticesList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateDontPractice = (index: number, field: string, value: any) => {
    setDontPracticesList(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handlePhotoUploadForPractice = async (e: React.ChangeEvent<HTMLInputElement>, isDo: boolean, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        if (isDo) {
          handleUpdateDoPractice(index, 'photoUrl', dataUrl);
          handleUpdateDoPractice(index, 'photoSizeKb', sizeKb);
        } else {
          handleUpdateDontPractice(index, 'photoUrl', dataUrl);
          handleUpdateDontPractice(index, 'photoSizeKb', sizeKb);
        }
      } catch (err) {
        console.error('Error al comprimir imagen:', err);
      }
    }
  };

  // Create new Safety LUP
  const handleCreateSafetyLup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newTitle.trim()) {
      showToast('El código y el título son obligatorios.', 'error');
      return;
    }

    const formattedDoPractices: LupPractice[] = doPracticesList.map((item, idx) => ({
      title: item.title.trim() || `Práctica Segura Recomendada #${idx + 1}`,
      description: item.description.trim() || 'Seguir siempre los controles establecidos.',
      points: item.pointsText.split('\n').map(p => p.trim()).filter(Boolean).length > 0
        ? item.pointsText.split('\n').map(p => p.trim()).filter(Boolean)
        : ['Inspeccionar antes de operar', 'Usar el EPP normado', 'Reportar condición subestándar'],
      photoUrl: item.photoUrl || undefined,
      photoSizeKb: item.photoSizeKb
    }));

    const formattedDontPractices: LupPractice[] = dontPracticesList.map((item, idx) => ({
      title: item.title.trim() || `Práctica Insegura Prohibida #${idx + 1}`,
      description: item.description.trim() || 'No cometer actos subestándar que comprometan la integridad física.',
      points: item.pointsText.split('\n').map(p => p.trim()).filter(Boolean).length > 0
        ? item.pointsText.split('\n').map(p => p.trim()).filter(Boolean)
        : ['❌ Nunca omitir el EPP', '❌ No saltarse procedimientos', '❌ No operar equipos con fallas'],
      photoUrl: item.photoUrl || undefined,
      photoSizeKb: item.photoSizeKb
    }));

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
      doPractice: formattedDoPractices[0],
      dontPractice: formattedDontPractices[0],
      doPractices: formattedDoPractices,
      dontPractices: formattedDontPractices,
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
    setNewSafetyWarning('');
    setDoPracticesList([{ id: 'do-1', title: '', description: '', pointsText: '', photoUrl: null }]);
    setDontPracticesList([{ id: 'dont-1', title: '', description: '', pointsText: '', photoUrl: null }]);
    loadData();
  };

  const handleToggleEpp = (epp: string) => {
    if (newSelectedEpp.includes(epp)) {
      setNewSelectedEpp(newSelectedEpp.filter(item => item !== epp));
    } else {
      setNewSelectedEpp([...newSelectedEpp, epp]);
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
                        {charla.photoUrl && (
                          <div 
                            onClick={() => setViewingPhoto({
                              url: charla.photoUrl!,
                              title: `Evidencia Turno • ${shift.label}`,
                              subtitle: `${charla.lupCode} - ${charla.lupTitle}`
                            })}
                            className="flex items-center gap-2 p-1.5 bg-emerald-100/80 hover:bg-emerald-200 rounded-xl cursor-pointer border border-emerald-300 transition mt-2 shadow-2xs"
                          >
                            <img src={charla.photoUrl} alt="Foto equipo" className="w-8 h-8 rounded-lg object-cover" />
                            <span className="text-[11px] font-black text-emerald-900 flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Ver Foto del Equipo ({charla.attendeesCount} pers.)</span>
                            </span>
                          </div>
                        )}
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
                onClick={() => setViewingLupModal(lup)}
                className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between cursor-pointer group"
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

                  <h3 className="text-sm font-black text-slate-900 mb-1.5 line-clamp-2 group-hover:text-amber-700 transition">
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
                        📸 4 Fotos del Estándar (Click para ver LUP)
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingLupModal(lup);
                    }}
                    className="text-emerald-700 font-bold hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl border border-emerald-200 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver LUP Completo</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigateToLup) onNavigateToLup(lup.id);
                      setSelectedCoverageLupId(lup.id);
                      setActivePortalTab('cobertura');
                    }}
                    className="text-amber-700 font-black hover:text-amber-800 flex items-center gap-1 cursor-pointer py-1.5 px-2 rounded-xl hover:bg-amber-50 transition"
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
                    <option value="turno-1">Turno 1</option>
                    <option value="turno-2">Turno 2</option>
                    <option value="turno-3">Turno 3</option>
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

              {/* Foto de Evidencia del Equipo */}
              <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-950 uppercase flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-700" />
                    <span>Foto de Evidencia del Equipo en Terreno</span>
                  </span>
                  {assignPhotoSizeKb && (
                    <span className="text-[10px] text-amber-800 font-mono font-bold bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                      📸 {assignPhotoSizeKb} KB
                    </span>
                  )}
                </div>

                {assignPhotoUrl ? (
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-amber-300 shadow-2xs">
                    <img 
                      src={assignPhotoUrl} 
                      alt="Foto del equipo" 
                      className="w-16 h-16 object-cover rounded-xl border border-amber-400 cursor-pointer hover:opacity-90 transition"
                      onClick={() => setViewingPhoto({
                        url: assignPhotoUrl!,
                        title: `Evidencia Turno • ${SHIFT_MAP[assignShiftId]?.label}`,
                        subtitle: `${selectedDate} • Dotación Presente`
                      })}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-black text-slate-800 block truncate">
                        Foto grupal adjunta con éxito
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold block">
                        ✓ Quedará vinculada a la charla de seguridad
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1.5 rounded-xl cursor-pointer transition">
                        Cambiar
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleAssignPhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setAssignPhotoUrl(null);
                          setAssignPhotoSizeKb(null);
                        }}
                        className="text-rose-600 hover:text-rose-800 p-1.5 rounded-xl hover:bg-rose-50 transition cursor-pointer"
                        title="Quitar foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="border-2 border-dashed border-amber-400 hover:border-amber-600 bg-white hover:bg-amber-100/50 rounded-2xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center">
                      <Camera className="w-5 h-5 text-amber-700 mb-1" />
                      <span className="text-xs font-bold text-slate-800">Tomar Foto con Cámara</span>
                      <span className="text-[10px] text-slate-500 font-medium">Abre cámara trasera del celular</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleAssignPhotoUpload}
                        className="hidden"
                      />
                    </label>

                    <label className="border border-slate-300 hover:border-amber-500 bg-white hover:bg-slate-50 rounded-2xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-slate-500 mb-1" />
                      <span className="text-xs font-bold text-slate-800">Subir desde Galería</span>
                      <span className="text-[10px] text-slate-500 font-medium">Cargar imagen guardada</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAssignPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
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

              {/* Qué SÍ hacer vs Qué NO hacer (Múltiples prácticas) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                
                {/* LISTA QUÉ SÍ HACER */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Qué SÍ Hacer ({doPracticesList.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddDoPractice}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar otro Qué Hacer</span>
                    </button>
                  </div>

                  {doPracticesList.map((item, idx) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-300 space-y-2 relative">
                      <div className="flex items-center justify-between pb-1 border-b border-emerald-200/70">
                        <span className="text-[11px] font-black text-emerald-900">
                          #{idx + 1} Caso Seguro Recomendado
                        </span>
                        {doPracticesList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDoPractice(idx)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-100/60 transition cursor-pointer"
                            title="Eliminar este Qué Hacer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Título ej: Colocar cuña antes de abrir rampa"
                        value={item.title}
                        onChange={(e) => handleUpdateDoPractice(idx, 'title', e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Descripción detallada de la acción segura..."
                        value={item.description}
                        onChange={(e) => handleUpdateDoPractice(idx, 'description', e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Puntos clave de seguridad (uno por línea)..."
                        value={item.pointsText}
                        onChange={(e) => handleUpdateDoPractice(idx, 'pointsText', e.target.value)}
                        className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-1.5 text-[11px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <div>
                        <label className="text-[10px] font-bold text-emerald-800 block mb-1">
                          Foto Caso Correcto (Opcional):
                        </label>
                        {item.photoUrl ? (
                          <div className="flex items-center gap-2 bg-emerald-100/70 p-1.5 rounded-xl border border-emerald-300">
                            <img src={item.photoUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-emerald-400" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-emerald-900 block truncate">Foto adjunta</span>
                              {item.photoSizeKb && (
                                <span className="text-[9px] text-emerald-700 font-mono block">Tamaño: {item.photoSizeKb} KB</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                handleUpdateDoPractice(idx, 'photoUrl', null);
                                handleUpdateDoPractice(idx, 'photoSizeKb', undefined);
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-100 transition cursor-pointer"
                              title="Quitar foto"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUploadForPractice(e, true, idx)}
                            className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-emerald-600 file:text-white cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddDoPractice}
                    className="w-full py-2 border-2 border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar otro Qué SÍ Hacer</span>
                  </button>
                </div>

                {/* LISTA QUÉ NO HACER */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-800 uppercase flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Qué NO Hacer ({dontPracticesList.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAddDontPractice}
                      className="text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar otro Qué NO Hacer</span>
                    </button>
                  </div>

                  {dontPracticesList.map((item, idx) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-300 space-y-2 relative">
                      <div className="flex items-center justify-between pb-1 border-b border-rose-200/70">
                        <span className="text-[11px] font-black text-rose-900">
                          #{idx + 1} Caso Inseguro Prohibido
                        </span>
                        {dontPracticesList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDontPractice(idx)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-100/60 transition cursor-pointer"
                            title="Eliminar este Qué NO Hacer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Título ej: Ingresar transpaleta sin cuña puesta"
                        value={item.title}
                        onChange={(e) => handleUpdateDontPractice(idx, 'title', e.target.value)}
                        className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Descripción de la conducta peligrosa o desviación..."
                        value={item.description}
                        onChange={(e) => handleUpdateDontPractice(idx, 'description', e.target.value)}
                        className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />

                      <textarea
                        rows={2}
                        placeholder="Puntos clave de prohibición (uno por línea)..."
                        value={item.pointsText}
                        onChange={(e) => handleUpdateDontPractice(idx, 'pointsText', e.target.value)}
                        className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-[11px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />

                      <div>
                        <label className="text-[10px] font-bold text-rose-800 block mb-1">
                          Foto Caso Incorrecto (Opcional):
                        </label>
                        {item.photoUrl ? (
                          <div className="flex items-center gap-2 bg-rose-100/70 p-1.5 rounded-xl border border-rose-300">
                            <img src={item.photoUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-rose-400" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-rose-900 block truncate">Foto adjunta</span>
                              {item.photoSizeKb && (
                                <span className="text-[9px] text-rose-700 font-mono block">Tamaño: {item.photoSizeKb} KB</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                handleUpdateDontPractice(idx, 'photoUrl', null);
                                handleUpdateDontPractice(idx, 'photoSizeKb', undefined);
                              }}
                              className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-100 transition cursor-pointer"
                              title="Quitar foto"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUploadForPractice(e, false, idx)}
                            className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-rose-600 file:text-white cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddDontPractice}
                    className="w-full py-2 border-2 border-dashed border-rose-300 hover:border-rose-500 hover:bg-rose-50 text-rose-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar otro Qué NO Hacer</span>
                  </button>
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

      {/* MODAL: VER LUP COMPLETO */}
      {viewingLupModal && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 z-50 animate-fade-in"
          onClick={() => setViewingLupModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-amber-300 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header LUP */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full border border-amber-300 font-mono">
                    {viewingLupModal.code}
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-300">
                    {viewingLupModal.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                    Área: {viewingLupModal.area}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {viewingLupModal.durationMinutes || 5} Minutos
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {viewingLupModal.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium mt-1.5">
                  <span>
                    👤 Creado por: <strong className="text-slate-800">{viewingLupModal.author || viewingLupModal.createdBy || 'Prevención SSO'}</strong>
                  </span>
                  {viewingLupModal.createdAt && (
                    <span>
                      📅 Fecha: <strong className="text-slate-800">{new Date(viewingLupModal.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewingLupModal(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-2xl hover:bg-slate-100 transition cursor-pointer shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Riesgo Crítico y EPP Obligatorio */}
            {(viewingLupModal.criticalRisk || (viewingLupModal.mandatoryEpp && viewingLupModal.mandatoryEpp.length > 0)) && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2">
                {viewingLupModal.criticalRisk && (
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                      Riesgo Crítico Asociado:
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-lg border border-amber-300">
                      {viewingLupModal.criticalRisk}
                    </span>
                  </div>
                )}
                {viewingLupModal.mandatoryEpp && viewingLupModal.mandatoryEpp.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-600 mr-1">EPP Obligatorio:</span>
                    {viewingLupModal.mandatoryEpp.map((epp, idx) => (
                      <span key={idx} className="text-[11px] font-bold bg-white text-slate-800 px-2 py-0.5 rounded-lg border border-slate-300 shadow-2xs">
                        {epp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fotos Estándar 4 cuadrantes (si existen) */}
            {viewingLupModal.photos && viewingLupModal.photos.length > 0 && (
              <div>
                <h4 className="text-xs font-black text-slate-700 uppercase mb-2 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Estándar Fotográfico de Inspección ({viewingLupModal.photos.length} Fotos)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {viewingLupModal.photos.map((p, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setViewingPhoto({
                        url: p.url,
                        title: p.caption || `Foto #${idx + 1} del Estándar`,
                        subtitle: viewingLupModal.title
                      })}
                      className="relative rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-amber-400 h-28 sm:h-36 bg-slate-100 group cursor-pointer shadow-xs transition"
                    >
                      <img 
                        src={p.url} 
                        alt={p.caption || 'Foto estándar'} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/75 text-white text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> Ampliar
                        </span>
                      </div>
                      {p.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5">
                          <span className="text-[10px] text-white font-bold block truncate drop-shadow-xs">
                            {p.caption}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Objetivo */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <h4 className="text-xs font-black text-slate-800 uppercase mb-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Objetivo Operacional</span>
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 italic">
                "{viewingLupModal.objective}"
              </p>
            </div>

            {/* Prácticas: Qué SÍ Hacer vs Qué NO Hacer (Múltiples) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* QUÉ SÍ HACER */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-black text-sm text-emerald-950 uppercase tracking-wide">
                    CASO CORRECTO (QUÉ SÍ HACER)
                  </h4>
                </div>

                {((viewingLupModal.doPractices && viewingLupModal.doPractices.length > 0)
                  ? viewingLupModal.doPractices
                  : (viewingLupModal.doPractice ? [viewingLupModal.doPractice] : [])
                ).map((practice, pIdx) => (
                  <div key={pIdx} className="bg-emerald-50/70 border-2 border-emerald-400 rounded-2xl p-4 shadow-xs space-y-3">
                    {practice.photoUrl && (
                      <div 
                        onClick={() => setViewingPhoto({
                          url: practice.photoUrl!,
                          title: practice.title,
                          subtitle: `Caso Correcto • ${viewingLupModal.code}`
                        })}
                        className="relative rounded-xl overflow-hidden border-2 border-emerald-300 h-44 sm:h-52 bg-emerald-100/50 group cursor-pointer shadow-xs"
                      >
                        <img 
                          src={practice.photoUrl} 
                          alt="Caso Correcto" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5">
                            <Eye className="w-4 h-4" /> Ampliar Fotografía
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <h5 className="text-sm sm:text-base font-black text-emerald-950 mb-1">
                        {practice.title}
                      </h5>
                      <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                        {practice.description}
                      </p>
                    </div>

                    {practice.points && practice.points.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-emerald-900 pt-1 border-t border-emerald-200/80">
                        {practice.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* QUÉ NO HACER */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h4 className="font-black text-sm text-rose-950 uppercase tracking-wide">
                    CASO INCORRECTO (QUÉ NO HACER)
                  </h4>
                </div>

                {((viewingLupModal.dontPractices && viewingLupModal.dontPractices.length > 0)
                  ? viewingLupModal.dontPractices
                  : (viewingLupModal.dontPractice ? [viewingLupModal.dontPractice] : [])
                ).map((practice, pIdx) => (
                  <div key={pIdx} className="bg-rose-50/70 border-2 border-rose-400 rounded-2xl p-4 shadow-xs space-y-3">
                    {practice.photoUrl && (
                      <div 
                        onClick={() => setViewingPhoto({
                          url: practice.photoUrl!,
                          title: practice.title,
                          subtitle: `Caso Incorrecto • ${viewingLupModal.code}`
                        })}
                        className="relative rounded-xl overflow-hidden border-2 border-rose-300 h-44 sm:h-52 bg-rose-100/50 group cursor-pointer shadow-xs"
                      >
                        <img 
                          src={practice.photoUrl} 
                          alt="Caso Incorrecto" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5">
                            <Eye className="w-4 h-4" /> Ampliar Fotografía
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <h5 className="text-sm sm:text-base font-black text-rose-950 mb-1">
                        {practice.title}
                      </h5>
                      <p className="text-xs text-rose-900 font-medium leading-relaxed">
                        {practice.description}
                      </p>
                    </div>

                    {practice.points && practice.points.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-rose-900 pt-1 border-t border-rose-200/80">
                        {practice.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

            </div>

            {/* Advertencia de Seguridad */}
            {viewingLupModal.safetyWarning && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-2xl flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-amber-950">
                  <span className="font-black uppercase text-amber-800">Advertencia Crítica: </span>
                  {viewingLupModal.safetyWarning}
                </p>
              </div>
            )}

            {/* Puntos Clave */}
            {viewingLupModal.keyPoints && viewingLupModal.keyPoints.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                <h5 className="text-xs font-black text-slate-800 uppercase mb-2">Puntos Clave a Recordar</h5>
                <ul className="space-y-1 text-xs text-slate-700">
                  {viewingLupModal.keyPoints.map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">✔</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setViewingLupModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Cerrar
              </button>

              <button
                type="button"
                onClick={() => {
                  const id = viewingLupModal.id;
                  setViewingLupModal(null);
                  if (onNavigateToLup) onNavigateToLup(id);
                  setSelectedCoverageLupId(id);
                  setActivePortalTab('cobertura');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Ver Cobertura del LUP</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* LIGHTBOX DE FOTO */}
      {viewingPhoto && (
        <div 
          onClick={() => setViewingPhoto(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col cursor-default"
          >
            <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
              <div>
                <h4 className="text-white font-black text-sm">{viewingPhoto.title}</h4>
                {viewingPhoto.subtitle && (
                  <p className="text-slate-400 text-xs font-medium">{viewingPhoto.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setViewingPhoto(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] flex items-center justify-center bg-black/60 p-2">
              <img 
                src={viewingPhoto.url} 
                alt={viewingPhoto.title} 
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
            <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-semibold">Fotografía en alta resolución del Estándar Operacional</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
