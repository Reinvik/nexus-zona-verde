import React, { useState, useEffect, useMemo } from 'react';
import { 
  UserCheck, 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Activity, 
  FileCheck, 
  Plus, 
  Search, 
  Download, 
  Calendar, 
  Filter, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  X,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { OperatorItem, AttendanceRecord, AttendanceStatus, ShiftId, ShiftType } from '../types';
import { 
  getOperators, 
  saveOperator, 
  deleteOperator, 
  getAttendanceRecords, 
  saveAttendanceRecord, 
  saveBulkAttendance, 
  exportToCsv 
} from '../services/storage';

interface AttendanceModuleProps {
  currentUserEmail?: string;
}

const SHIFT_OPTIONS: { id: ShiftId; name: ShiftType; hours: string; defaultArrival: string }[] = [
  { id: 'turno-1', name: 'Turno 1 (Mañana 07:00 - 15:00)', hours: '07:00 - 15:00', defaultArrival: '07:15' },
  { id: 'turno-2', name: 'Turno 2 (Tarde 15:00 - 23:00)', hours: '15:00 - 23:00', defaultArrival: '15:15' },
  { id: 'turno-3', name: 'Turno 3 (Noche 23:00 - 07:00)', hours: '23:00 - 07:00', defaultArrival: '23:15' }
];

const STATUS_CONFIG: Record<AttendanceStatus, {
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
  inactiveClass: string;
  badgeClass: string;
  borderClass: string;
}> = {
  presente: {
    label: 'Presente',
    shortLabel: 'Presente',
    icon: CheckCircle2,
    activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500 font-bold',
    inactiveClass: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderClass: 'border-l-4 border-l-emerald-500'
  },
  tarde: {
    label: 'Llegó tarde',
    shortLabel: 'Atraso',
    icon: Clock,
    activeClass: 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-400 font-bold',
    inactiveClass: 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    borderClass: 'border-l-4 border-l-amber-500'
  },
  ausente: {
    label: 'Ausente',
    shortLabel: 'Ausente',
    icon: XCircle,
    activeClass: 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-500 font-bold',
    inactiveClass: 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    borderClass: 'border-l-4 border-l-rose-500'
  },
  licencia: {
    label: 'Licencia Médica',
    shortLabel: 'Licencia',
    icon: Activity,
    activeClass: 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-500 font-bold',
    inactiveClass: 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    borderClass: 'border-l-4 border-l-purple-500'
  },
  justificada: {
    label: 'Ausencia Justificada',
    shortLabel: 'Justificada',
    icon: FileCheck,
    activeClass: 'bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-500 font-bold',
    inactiveClass: 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    borderClass: 'border-l-4 border-l-sky-500'
  }
};

export const AttendanceModule: React.FC<AttendanceModuleProps> = ({
  currentUserEmail = 'ariel.mella@cial.cl'
}) => {
  // Current date in YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedShiftId, setSelectedShiftId] = useState<ShiftId>('turno-1');
  const [operators, setOperators] = useState<OperatorItem[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingOperator, setEditingOperator] = useState<OperatorItem | null>(null);
  const [noteModalData, setNoteModalData] = useState<{
    operator: OperatorItem;
    record?: AttendanceRecord;
    initialStatus: AttendanceStatus;
  } | null>(null);

  // Operator Form state
  const [formName, setFormName] = useState<string>('');
  const [formRut, setFormRut] = useState<string>('');
  const [formRole, setFormRole] = useState<string>('Pickeador Cámara Frío');
  const [formArea, setFormArea] = useState<string>('Cámara Frío P2 (-18°C)');
  const [formShiftId, setFormShiftId] = useState<ShiftId>('turno-1');

  // Note Modal Form state
  const [noteStatus, setNoteStatus] = useState<AttendanceStatus>('tarde');
  const [noteArrivalTime, setNoteArrivalTime] = useState<string>('');
  const [noteText, setNoteText] = useState<string>('');

  const currentShift = useMemo(() => {
    return SHIFT_OPTIONS.find(s => s.id === selectedShiftId) || SHIFT_OPTIONS[0];
  }, [selectedShiftId]);

  // Load data
  const loadData = () => {
    const ops = getOperators();
    setOperators(ops);
    const recs = getAttendanceRecords(selectedDate, selectedShiftId);
    setRecords(recs);
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, selectedShiftId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Map of operatorId -> AttendanceRecord
  const recordMap = useMemo(() => {
    const map = new Map<string, AttendanceRecord>();
    for (const rec of records) {
      map.set(rec.operatorId, rec);
    }
    return map;
  }, [records]);

  // Available unique operational areas
  const areas = useMemo(() => {
    const set = new Set<string>();
    for (const op of operators) {
      if (op.area) set.add(op.area);
    }
    return Array.from(set).sort();
  }, [operators]);

  // Filtered operators
  const filteredOperators = useMemo(() => {
    return operators.filter(op => {
      if (!op.active) return false;
      if (selectedArea !== 'todas' && op.area !== selectedArea) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = op.name.toLowerCase().includes(q);
        const matchesRut = op.rut?.toLowerCase().includes(q) ?? false;
        const matchesRole = op.role.toLowerCase().includes(q);
        if (!matchesName && !matchesRut && !matchesRole) return false;
      }
      return true;
    });
  }, [operators, selectedArea, search]);

  // KPIs
  const kpis = useMemo(() => {
    const total = filteredOperators.length;
    let presentes = 0;
    let tarde = 0;
    let ausentes = 0;
    let licencias = 0;
    let justificadas = 0;
    let sinMarcar = 0;

    for (const op of filteredOperators) {
      const rec = recordMap.get(op.id);
      if (!rec) {
        sinMarcar++;
        continue;
      }
      switch (rec.status) {
        case 'presente':
          presentes++;
          break;
        case 'tarde':
          tarde++;
          break;
        case 'ausente':
          ausentes++;
          break;
        case 'licencia':
          licencias++;
          break;
        case 'justificada':
          justificadas++;
          break;
        default:
          sinMarcar++;
      }
    }

    const operando = presentes + tarde;
    const adherencia = total > 0 ? Math.round((operando / total) * 100) : 0;

    return {
      total,
      presentes,
      tarde,
      ausentes,
      licencias,
      justificadas,
      sinMarcar,
      adherencia
    };
  }, [filteredOperators, recordMap]);

  // 1-Click Status toggle
  const handleStatusClick = (operator: OperatorItem, status: AttendanceStatus) => {
    const existingRec = recordMap.get(operator.id);

    // If clicking "tarde" or "licencia" or "justificada" and user wants to add notes immediately:
    // We save status first, and optionally supervisor can add notes
    const newRecord: AttendanceRecord = {
      id: existingRec?.id || `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: selectedDate,
      shiftId: selectedShiftId,
      shiftName: currentShift.name,
      operatorId: operator.id,
      operatorName: operator.name,
      operatorRole: operator.role,
      operatorArea: operator.area,
      status,
      arrivalTime: status === 'tarde' ? (existingRec?.arrivalTime || currentShift.defaultArrival) : undefined,
      notes: existingRec?.notes,
      registeredBy: currentUserEmail,
      updatedAt: new Date().toISOString()
    };

    saveAttendanceRecord(newRecord);
    loadData();
    showToast(`✅ ${operator.name}: marcado como ${STATUS_CONFIG[status].label}`);
  };

  // Open note/detail modal for an operator
  const handleOpenNoteModal = (operator: OperatorItem) => {
    const rec = recordMap.get(operator.id);
    const initialStatus = rec?.status || 'tarde';
    setNoteModalData({
      operator,
      record: rec,
      initialStatus
    });
    setNoteStatus(initialStatus);
    setNoteArrivalTime(rec?.arrivalTime || (initialStatus === 'tarde' ? currentShift.defaultArrival : ''));
    setNoteText(rec?.notes || '');
  };

  const handleSaveNoteModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteModalData) return;

    const op = noteModalData.operator;
    const existingRec = noteModalData.record;

    const newRecord: AttendanceRecord = {
      id: existingRec?.id || `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: selectedDate,
      shiftId: selectedShiftId,
      shiftName: currentShift.name,
      operatorId: op.id,
      operatorName: op.name,
      operatorRole: op.role,
      operatorArea: op.area,
      status: noteStatus,
      arrivalTime: noteStatus === 'tarde' ? noteArrivalTime : undefined,
      notes: noteText.trim() || undefined,
      registeredBy: currentUserEmail,
      updatedAt: new Date().toISOString()
    };

    saveAttendanceRecord(newRecord);
    loadData();
    setNoteModalData(null);
    showToast(`Guardada observación de ${op.name}`);
  };

  // Mark all visible operators as "Presente"
  const handleMarkAllPresent = () => {
    if (filteredOperators.length === 0) return;

    const bulk: AttendanceRecord[] = filteredOperators.map(op => {
      const existing = recordMap.get(op.id);
      return {
        id: existing?.id || `att-${Date.now()}-${op.id}`,
        date: selectedDate,
        shiftId: selectedShiftId,
        shiftName: currentShift.name,
        operatorId: op.id,
        operatorName: op.name,
        operatorRole: op.role,
        operatorArea: op.area,
        status: 'presente' as AttendanceStatus,
        arrivalTime: undefined,
        notes: existing?.status === 'presente' ? existing.notes : undefined,
        registeredBy: currentUserEmail,
        updatedAt: new Date().toISOString()
      };
    });

    saveBulkAttendance(bulk);
    loadData();
    showToast(`✅ ${bulk.length} colaboradores marcados como Presentes`);
  };

  // Save new or edited operator
  const handleSaveOperator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingOperator) {
      const updated: OperatorItem = {
        ...editingOperator,
        name: formName.trim(),
        rut: formRut.trim() || undefined,
        role: formRole.trim(),
        area: formArea.trim(),
        shiftId: formShiftId
      };
      saveOperator(updated);
      showToast(`Operador ${updated.name} actualizado`);
    } else {
      const newOp: OperatorItem = {
        id: `op-${Date.now()}`,
        name: formName.trim(),
        rut: formRut.trim() || undefined,
        role: formRole.trim(),
        area: formArea.trim(),
        shiftId: formShiftId,
        active: true,
        createdAt: new Date().toISOString()
      };
      saveOperator(newOp);
      showToast(`Nuevo operador ${newOp.name} agregado`);
    }

    setEditingOperator(null);
    setShowAddModal(false);
    resetForm();
    loadData();
  };

  const handleEditOperator = (op: OperatorItem) => {
    setEditingOperator(op);
    setFormName(op.name);
    setFormRut(op.rut || '');
    setFormRole(op.role);
    setFormArea(op.area);
    setFormShiftId(op.shiftId || 'turno-1');
    setShowAddModal(true);
  };

  const handleDeleteOperator = (op: OperatorItem) => {
    if (window.confirm(`¿Seguro que deseas eliminar al operador "${op.name}" de la nómina?`)) {
      deleteOperator(op.id);
      loadData();
      showToast(`Operador ${op.name} eliminado`);
    }
  };

  const resetForm = () => {
    setFormName('');
    setFormRut('');
    setFormRole('Pickeador Cámara Frío');
    setFormArea('Cámara Frío P2 (-18°C)');
    setFormShiftId('turno-1');
  };

  // Export CSV
  const handleExportAttendanceCsv = () => {
    const rows = filteredOperators.map(op => {
      const rec = recordMap.get(op.id);
      const statusLabel = rec ? STATUS_CONFIG[rec.status].label : 'Sin Marcar';
      return {
        'Fecha': selectedDate,
        'Turno': currentShift.name,
        'Operador': op.name,
        'RUT': op.rut || 'N/A',
        'Cargo': op.role,
        'Área': op.area,
        'Estado Asistencia': statusLabel,
        'Hora Llegada': rec?.arrivalTime || '',
        'Observaciones': rec?.notes || '',
        'Registrado Por': rec?.registeredBy || '',
        'Última Modificación': rec?.updatedAt || ''
      };
    });

    exportToCsv(`asistencia_cial_${selectedDate}_${selectedShiftId}`, rows);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fade-in text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#063d25] via-[#095735] to-[#042818] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-600/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black tracking-wider uppercase mb-3 border border-emerald-400/30">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              Gestión de Dotación y Pase de Lista
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Control de Asistencia Diaria
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-2xl mt-1">
              Registro operativo rápido de asistencia por turno en Centro de Distribución Frío CIAL. Marque con un solo clic el estado de cada colaborador.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={handleMarkAllPresent}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
              title="Marcar todos los operadores visibles como Presentes"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Marcar Todos Presentes
            </button>

            <button
              onClick={() => {
                setEditingOperator(null);
                resetForm();
                setShowAddModal(true);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all active:scale-95 backdrop-blur-sm"
            >
              <UserPlus className="w-4 h-4 text-emerald-300" />
              + Agregar Operador
            </button>

            <button
              onClick={handleExportAttendanceCsv}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all active:scale-95 backdrop-blur-sm"
              title="Descargar reporte en formato Excel / CSV"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      {/* Date, Shift & Filter Controls */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Date Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              Fecha de Registro
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setSelectedDate(todayStr)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                  selectedDate === todayStr 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
              >
                Hoy
              </button>
            </div>
          </div>

          {/* Shift Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              Turno Operativo
            </label>
            <select
              value={selectedShiftId}
              onChange={(e) => setSelectedShiftId(e.target.value as ShiftId)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
            >
              {SHIFT_OPTIONS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Area Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              Filtrar por Área
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="todas">Todas las Áreas ({operators.length})</option>
              {areas.map(a => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              Buscar Colaborador
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nombre, RUT o cargo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Quick Shift summary pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Supervisor Responsable:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold">
              {currentUserEmail}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Horario Turno: <strong className="text-slate-700">{currentShift.hours}</strong></span>
            <span>•</span>
            <span>Mostrando: <strong className="text-emerald-700">{filteredOperators.length} de {operators.length}</strong> colaboradores</span>
          </div>
        </div>
      </div>

      {/* KPI Metrics Dashboard Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        
        {/* Total */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Dotación</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{kpis.total}</span>
            <span className="text-xs text-slate-500">colab.</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">
            {kpis.sinMarcar > 0 ? `${kpis.sinMarcar} sin marcar` : '100% evaluados'}
          </div>
        </div>

        {/* Presentes */}
        <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
            <span>Presentes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">{kpis.presentes}</span>
            <span className="text-xs font-bold text-emerald-600">
              {kpis.total > 0 ? `${Math.round((kpis.presentes / kpis.total) * 100)}%` : '0%'}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-semibold">
            En puesto operativo
          </div>
        </div>

        {/* Llegó Tarde */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-800 text-xs font-bold">
            <span>Llegó Tarde</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-700">{kpis.tarde}</span>
            <span className="text-xs font-bold text-amber-600">
              {kpis.total > 0 ? `${Math.round((kpis.tarde / kpis.total) * 100)}%` : '0%'}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-amber-700 font-semibold">
            Con retraso registrado
          </div>
        </div>

        {/* Ausentes */}
        <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-800 text-xs font-bold">
            <span>Ausentes</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-700">{kpis.ausentes}</span>
            <span className="text-xs font-bold text-rose-600">
              {kpis.total > 0 ? `${Math.round((kpis.ausentes / kpis.total) * 100)}%` : '0%'}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-rose-700 font-semibold">
            Sin justificación
          </div>
        </div>

        {/* Licencias */}
        <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-800 text-xs font-bold">
            <span>Licencias</span>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-700">{kpis.licencias}</span>
            <span className="text-xs font-bold text-purple-600">médica</span>
          </div>
          <div className="mt-1 text-[11px] text-purple-700 font-semibold">
            ACHS / Fonasa / Isapre
          </div>
        </div>

        {/* Justificadas */}
        <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-sky-800 text-xs font-bold">
            <span>Justificadas</span>
            <FileCheck className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-sky-700">{kpis.justificadas}</span>
            <span className="text-xs font-bold text-sky-600">permiso</span>
          </div>
          <div className="mt-1 text-[11px] text-sky-700 font-semibold">
            Permiso administrativo
          </div>
        </div>

        {/* Adherencia Operativa */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm flex flex-col justify-between border border-slate-700">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-black tracking-wide">
            <span>Adherencia</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-400">{kpis.adherencia}%</span>
            <span className="text-xs text-slate-300">efectiva</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-300 font-medium truncate">
            {kpis.presentes + kpis.tarde} operando
          </div>
        </div>

      </div>

      {/* Roster & Attendance Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Table Title Bar */}
        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              Nómina de Operadores • {currentShift.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Haga clic sobre el estado para marcarlo al instante. El sistema registra hora y supervisor automáticamente.
            </p>
          </div>
          <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            {filteredOperators.length} colaboradores listados
          </div>
        </div>

        {/* Operator Row List */}
        <div className="divide-y divide-slate-100">
          {filteredOperators.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No se encontraron colaboradores</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                No hay operadores que coincidan con la búsqueda o el filtro de área seleccionado. Puede agregar un nuevo operador con el botón superior.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedArea('todas');
                }}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filteredOperators.map((operator, index) => {
              const rec = recordMap.get(operator.id);
              const status = rec?.status;
              const hasNotes = !!rec?.notes;
              const hasTime = !!rec?.arrivalTime;

              return (
                <div 
                  key={operator.id}
                  className={`p-4 sm:p-5 transition-all hover:bg-slate-50/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                    status ? STATUS_CONFIG[status].borderClass : 'border-l-4 border-l-slate-200'
                  }`}
                >
                  
                  {/* Left: Operator Avatar + Info */}
                  <div className="flex items-start sm:items-center gap-3.5 min-w-[280px]">
                    
                    {/* Index + Avatar */}
                    <div className="relative">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-black flex items-center justify-center text-sm shadow-sm">
                        {operator.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center border border-white">
                        {index + 1}
                      </span>
                    </div>

                    {/* Name + Cargo + Area */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-black text-slate-900">
                          {operator.name}
                        </span>
                        {operator.rut && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                            {operator.rut}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-slate-500">
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          {operator.role}
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 font-medium">
                          {operator.area}
                        </span>
                      </div>

                      {/* Notes / Late time pills if present */}
                      {(hasTime || hasNotes) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {hasTime && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                              <Clock className="w-3 h-3 text-amber-700" />
                              Llegada: {rec?.arrivalTime}
                            </span>
                          )}
                          {hasNotes && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 max-w-md truncate" title={rec?.notes}>
                              <MessageSquare className="w-3 h-3 text-slate-500" />
                              {rec?.notes}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Center / Right: 1-Click Fast Attendance Button Group */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    
                    {/* 1. Presente */}
                    <button
                      type="button"
                      onClick={() => handleStatusClick(operator, 'presente')}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                        status === 'presente' 
                          ? STATUS_CONFIG.presente.activeClass 
                          : STATUS_CONFIG.presente.inactiveClass
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${status === 'presente' ? 'text-white' : 'text-emerald-600'}`} />
                      <span>Presente</span>
                    </button>

                    {/* 2. Llegó tarde */}
                    <button
                      type="button"
                      onClick={() => handleStatusClick(operator, 'tarde')}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                        status === 'tarde' 
                          ? STATUS_CONFIG.tarde.activeClass 
                          : STATUS_CONFIG.tarde.inactiveClass
                      }`}
                    >
                      <Clock className={`w-4 h-4 ${status === 'tarde' ? 'text-white' : 'text-amber-600'}`} />
                      <span>Llegó tarde</span>
                    </button>

                    {/* 3. Ausente */}
                    <button
                      type="button"
                      onClick={() => handleStatusClick(operator, 'ausente')}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                        status === 'ausente' 
                          ? STATUS_CONFIG.ausente.activeClass 
                          : STATUS_CONFIG.ausente.inactiveClass
                      }`}
                    >
                      <XCircle className={`w-4 h-4 ${status === 'ausente' ? 'text-white' : 'text-rose-600'}`} />
                      <span>Ausente</span>
                    </button>

                    {/* 4. Licencia */}
                    <button
                      type="button"
                      onClick={() => handleStatusClick(operator, 'licencia')}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                        status === 'licencia' 
                          ? STATUS_CONFIG.licencia.activeClass 
                          : STATUS_CONFIG.licencia.inactiveClass
                      }`}
                    >
                      <Activity className={`w-4 h-4 ${status === 'licencia' ? 'text-white' : 'text-purple-600'}`} />
                      <span>Licencia</span>
                    </button>

                    {/* 5. Ausencia Justificada */}
                    <button
                      type="button"
                      onClick={() => handleStatusClick(operator, 'justificada')}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                        status === 'justificada' 
                          ? STATUS_CONFIG.justificada.activeClass 
                          : STATUS_CONFIG.justificada.inactiveClass
                      }`}
                    >
                      <FileCheck className={`w-4 h-4 ${status === 'justificada' ? 'text-white' : 'text-sky-600'}`} />
                      <span className="hidden sm:inline">Ausencia justificada</span>
                      <span className="sm:hidden">Justificada</span>
                    </button>

                    {/* More actions: Note & Edit Operator */}
                    <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
                      
                      {/* Note Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenNoteModal(operator)}
                        className={`p-2 rounded-xl text-xs font-semibold transition-all ${
                          hasNotes || hasTime
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Agregar detalle de hora de llegada u observación"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      {/* Edit Operator */}
                      <button
                        type="button"
                        onClick={() => handleEditOperator(operator)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all text-xs"
                        title="Editar datos del colaborador"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Operator */}
                      <button
                        type="button"
                        onClick={() => handleDeleteOperator(operator)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all text-xs"
                        title="Eliminar de la nómina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Modal: Agregar / Editar Operador */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {editingOperator ? 'Modificar Colaborador' : 'Agregar Nuevo Operador'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Nómina activa para pase de lista diario
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingOperator(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveOperator} className="space-y-4 mt-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Castro Henríquez"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  RUT (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: 18.234.901-5"
                  value={formRut}
                  onChange={(e) => setFormRut(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cargo / Rol Operativo
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Pickeador Cámara Frío">Pickeador Cámara Frío</option>
                  <option value="Operador de Grúa Horquilla">Operador de Grúa Horquilla</option>
                  <option value="Operador Transpaleta Eléctrica">Operador Transpaleta Eléctrica</option>
                  <option value="Operador Apilador Reach">Operador Apilador Reach</option>
                  <option value="Recepcionista Inbound">Recepcionista Inbound</option>
                  <option value="Control de Calidad / Despacho">Control de Calidad / Despacho</option>
                  <option value="Chequeador Outbound">Chequeador Outbound</option>
                  <option value="Preparador de Pedidos">Preparador de Pedidos</option>
                  <option value="Enfilmador & Paletizado">Enfilmador & Paletizado</option>
                  <option value="Operador Polifuncional">Operador Polifuncional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Área Operativa Asignada
                </label>
                <select
                  value={formArea}
                  onChange={(e) => setFormArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Cámara Frío P2 (-18°C)">Cámara Frío P2 (-18°C)</option>
                  <option value="Cámara Frío P1 (-2°C a 2°C)">Cámara Frío P1 (-2°C a 2°C)</option>
                  <option value="Andenes de Despacho">Andenes de Despacho</option>
                  <option value="Patio Inbound">Patio Inbound</option>
                  <option value="Staging Despacho">Staging Despacho</option>
                  <option value="Consolidación Frío">Consolidación Frío</option>
                  <option value="Almacenamiento Racks P1/P2">Almacenamiento Racks P1/P2</option>
                  <option value="Enfilmado Automático / Manual">Enfilmado Automático / Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Turno Habitual
                </label>
                <select
                  value={formShiftId}
                  onChange={(e) => setFormShiftId(e.target.value as ShiftId)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                >
                  {SHIFT_OPTIONS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingOperator(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30"
                >
                  {editingOperator ? 'Guardar Cambios' : 'Registrar Colaborador'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal: Observación & Hora de Llegada */}
      {noteModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Detalle de Asistencia
                  </h3>
                  <p className="text-xs text-slate-500">
                    {noteModalData.operator.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNoteModalData(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNoteModal} className="space-y-4 mt-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estado de Asistencia
                </label>
                <select
                  value={noteStatus}
                  onChange={(e) => setNoteStatus(e.target.value as AttendanceStatus)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600"
                >
                  <option value="presente">Presente</option>
                  <option value="tarde">Llegó tarde</option>
                  <option value="ausente">Ausente</option>
                  <option value="licencia">Licencia Médica</option>
                  <option value="justificada">Ausencia Justificada</option>
                </select>
              </div>

              {noteStatus === 'tarde' && (
                <div>
                  <label className="block text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                    Hora de Llegada
                  </label>
                  <input
                    type="time"
                    value={noteArrivalTime}
                    onChange={(e) => setNoteArrivalTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-sm font-mono font-bold text-amber-900 focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Hora programada de inicio de turno: {currentShift.hours.split('-')[0].trim()}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Observación / Justificación (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ej: Licencia ACHS por 3 días / Permiso administrativo / Atraso por locomoción..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNoteModalData(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30"
                >
                  Guardar Detalle
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
