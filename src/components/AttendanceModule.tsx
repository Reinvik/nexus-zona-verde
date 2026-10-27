import React, { useState, useEffect, useMemo } from 'react';
import { 
  UserCheck, 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Activity, 
  FileCheck, 
  Search, 
  Download, 
  Calendar, 
  Filter, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  X,
  UserPlus,
  Palmtree,
  TableProperties,
  CalendarRange,
  FileSpreadsheet,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  Shield,
  Truck,
  Boxes,
  RefreshCw,
  Compass,
  Tag
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
import { 
  HISTORICAL_DATE_KEYS, 
  HISTORICAL_HEADER_DAYS, 
  HISTORICAL_ATTENDANCE_COMPACT, 
  getOperatorStats,
  exportFullAttendanceMatrixCsv 
} from '../data/attendanceHistory';

interface AttendanceModuleProps {
  currentUserEmail?: string;
}

const SHIFT_OPTIONS: { id: ShiftId | 'todos'; name: string; hours: string; defaultArrival: string }[] = [
  { id: 'turno-1', name: 'Turno 1 (Mañana 07:00 - 15:00)', hours: '07:00 - 15:00', defaultArrival: '07:15' },
  { id: 'turno-2', name: 'Turno 2 (Tarde 15:00 - 23:00)', hours: '15:00 - 23:00', defaultArrival: '15:15' },
  { id: 'turno-3', name: 'Turno 3 (Noche 23:00 - 07:00)', hours: '23:00 - 07:00', defaultArrival: '23:15' },
  { id: 'todos', name: 'Todos los Turnos (Dotación 102)', hours: '24 Horas / Todos los Turnos', defaultArrival: '07:00' }
];

const MONTH_TABS = [
  { id: 'todos', name: 'Historial Completo (Ene - Oct)' },
  { id: '2026-01', name: 'Ene (01)' },
  { id: '2026-02', name: 'Feb (02)' },
  { id: '2026-03', name: 'Mar (03)' },
  { id: '2026-04', name: 'Abr (04)' },
  { id: '2026-05', name: 'May (05)' },
  { id: '2026-06', name: 'Jun (06)' },
  { id: '2026-07', name: 'Jul (07)' },
  { id: '2026-08', name: 'Ago (08)' },
  { id: '2026-09', name: 'Sep (09)' },
  { id: '2026-10', name: 'Oct (10)' }
];

const STATUS_CONFIG: Record<AttendanceStatus, {
  label: string;
  shortLabel: string;
  code: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
  inactiveClass: string;
  badgeClass: string;
  borderClass: string;
  matrixClass: string;
}> = {
  presente: {
    label: 'Presente',
    shortLabel: 'Presente',
    code: 'P',
    icon: CheckCircle2,
    activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500 font-bold',
    inactiveClass: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderClass: 'border-l-4 border-l-emerald-500',
    matrixClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-black'
  },
  tarde: {
    label: 'Llegó tarde',
    shortLabel: 'Atraso',
    code: 'T',
    icon: Clock,
    activeClass: 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-400 font-bold',
    inactiveClass: 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    borderClass: 'border-l-4 border-l-amber-500',
    matrixClass: 'bg-amber-100 text-amber-800 border border-amber-300 font-black'
  },
  ausente: {
    label: 'Ausente',
    shortLabel: 'Ausente',
    code: 'A',
    icon: XCircle,
    activeClass: 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-500 font-bold',
    inactiveClass: 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    borderClass: 'border-l-4 border-l-rose-500',
    matrixClass: 'bg-rose-100 text-rose-800 border border-rose-300 font-black'
  },
  licencia: {
    label: 'Licencia Médica',
    shortLabel: 'Licencia',
    code: 'L',
    icon: Activity,
    activeClass: 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-500 font-bold',
    inactiveClass: 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    borderClass: 'border-l-4 border-l-purple-500',
    matrixClass: 'bg-purple-100 text-purple-800 border border-purple-300 font-black'
  },
  justificada: {
    label: 'Ausencia Justificada / Permiso',
    shortLabel: 'Permiso',
    code: 'J',
    icon: FileCheck,
    activeClass: 'bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-2 ring-sky-500 font-bold',
    inactiveClass: 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    borderClass: 'border-l-4 border-l-sky-500',
    matrixClass: 'bg-sky-100 text-sky-800 border border-sky-300 font-black'
  },
  vacaciones: {
    label: 'Vacaciones',
    shortLabel: 'Vacaciones',
    code: 'V',
    icon: Palmtree,
    activeClass: 'bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-2 ring-teal-500 font-bold',
    inactiveClass: 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
    borderClass: 'border-l-4 border-l-teal-500',
    matrixClass: 'bg-teal-100 text-teal-800 border border-teal-300 font-black'
  }
};

export interface OperationalGroupInfo {
  id: string;
  name: string;
  shortName: string;
  badgeClass: string;
  pillActiveClass: string;
  pillInactiveClass: string;
  borderClass: string;
}

export const OPERATIONAL_GROUPS: Record<string, OperationalGroupInfo> = {
  picking: {
    id: 'picking',
    name: 'Grupo Picking',
    shortName: 'Picking',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    pillActiveClass: 'bg-emerald-600 text-white shadow-xs',
    pillInactiveClass: 'bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100 border border-emerald-200',
    borderClass: 'border-l-emerald-500'
  },
  despacho: {
    id: 'despacho',
    name: 'Grupo Despacho',
    shortName: 'Despacho',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-300',
    pillActiveClass: 'bg-blue-600 text-white shadow-xs',
    pillInactiveClass: 'bg-blue-50/70 text-blue-800 hover:bg-blue-100 border border-blue-200',
    borderClass: 'border-l-blue-500'
  },
  gruas: {
    id: 'gruas',
    name: 'Grupo Grúas',
    shortName: 'Grúas',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
    pillActiveClass: 'bg-amber-600 text-white shadow-xs',
    pillInactiveClass: 'bg-amber-50/70 text-amber-900 hover:bg-amber-100 border border-amber-200',
    borderClass: 'border-l-amber-500'
  },
  encajado: {
    id: 'encajado',
    name: 'Grupo Encajado',
    shortName: 'Encajado',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-300',
    pillActiveClass: 'bg-teal-600 text-white shadow-xs',
    pillInactiveClass: 'bg-teal-50/70 text-teal-800 hover:bg-teal-100 border border-teal-200',
    borderClass: 'border-l-teal-500'
  },
  transpaletas: {
    id: 'transpaletas',
    name: 'Grupo Transpaletas',
    shortName: 'Transpaletas',
    badgeClass: 'bg-orange-50 text-orange-900 border-orange-300',
    pillActiveClass: 'bg-orange-600 text-white shadow-xs',
    pillInactiveClass: 'bg-orange-50/70 text-orange-900 hover:bg-orange-100 border border-orange-200',
    borderClass: 'border-l-orange-500'
  },
  repaletizado: {
    id: 'repaletizado',
    name: 'Grupo Repaletizado',
    shortName: 'Repaletizado',
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-300',
    pillActiveClass: 'bg-purple-600 text-white shadow-xs',
    pillInactiveClass: 'bg-purple-50/70 text-purple-800 hover:bg-purple-100 border border-purple-200',
    borderClass: 'border-l-purple-500'
  },
  patio: {
    id: 'patio',
    name: 'Grupo Patio Inbound',
    shortName: 'Patio',
    badgeClass: 'bg-cyan-50 text-cyan-800 border-cyan-300',
    pillActiveClass: 'bg-cyan-600 text-white shadow-xs',
    pillInactiveClass: 'bg-cyan-50/70 text-cyan-800 hover:bg-cyan-100 border border-cyan-200',
    borderClass: 'border-l-cyan-500'
  },
  jefatura: {
    id: 'jefatura',
    name: 'Jefatura de Turno',
    shortName: 'Jefatura',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    pillActiveClass: 'bg-slate-800 text-white shadow-xs',
    pillInactiveClass: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
    borderClass: 'border-l-slate-600'
  }
};

export const getOperatorGroup = (op: OperatorItem): OperationalGroupInfo => {
  const r = (op.role || '').toUpperCase();
  const a = (op.area || '').toUpperCase();

  if (r.includes('JEFE DE TURNO') || a.includes('JEFATURA')) return OPERATIONAL_GROUPS.jefatura;
  if (r.includes('PICKING') || a.includes('PICKING')) return OPERATIONAL_GROUPS.picking;
  if (r.includes('DESPACHO') || a.includes('DESPACHO')) return OPERATIONAL_GROUPS.despacho;
  if (r.includes('GRUERO') || r.includes('GRÚA') || a.includes('GRÚAS')) return OPERATIONAL_GROUPS.gruas;
  if (r.includes('ENCAJADO') || a.includes('ENCAJADO')) return OPERATIONAL_GROUPS.encajado;
  if (r.includes('TRANSPALETERO') || r.includes('TRANSPALETA') || a.includes('TRANSPALETAS')) return OPERATIONAL_GROUPS.transpaletas;
  if (r.includes('REPALETIZADO') || a.includes('REPALETIZADO')) return OPERATIONAL_GROUPS.repaletizado;
  if (r.includes('PATIO') || a.includes('PATIO')) return OPERATIONAL_GROUPS.patio;

  return {
    id: 'general',
    name: 'Dotación General',
    shortName: 'General',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    pillActiveClass: 'bg-slate-700 text-white shadow-xs',
    pillInactiveClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    borderClass: 'border-l-slate-300'
  };
};

export const AttendanceModule: React.FC<AttendanceModuleProps> = ({
  currentUserEmail = 'ariel.mella@cial.cl'
}) => {
  // Current date in YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  }, []);

  const [viewMode, setViewMode] = useState<'diario' | 'matriz'>('diario');
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedShiftId, setSelectedShiftId] = useState<ShiftId | 'todos'>('turno-1');
  const [selectedMonth, setSelectedMonth] = useState<string>('todos');
  const [operators, setOperators] = useState<OperatorItem[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('todos');
  const [selectedGroup, setSelectedGroup] = useState<string>('todos');
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
  const [formRole, setFormRole] = useState<string>('ASISTENTE DE PICKING 1');
  const [formArea, setFormArea] = useState<string>('Picking / Cámara Frío');
  const [formShiftId, setFormShiftId] = useState<ShiftId>('turno-1');
  const [formSupervisor, setFormSupervisor] = useState<string>('Cristian Hernandez');
  const [formJefeTurno, setFormJefeTurno] = useState<string>('Euro Velasquez');
  const [formCompany, setFormCompany] = useState<string>('Cial Alimentos');

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
    const recs = getAttendanceRecords(selectedDate, selectedShiftId === 'todos' ? undefined : selectedShiftId);
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

  // Map of operatorId -> AttendanceRecord for the active date
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

  // Supervisors list with counts
  const supervisorOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const op of operators) {
      if (op.supervisor && op.supervisor.trim()) {
        const s = op.supervisor.trim();
        counts[s] = (counts[s] || 0) + 1;
      }
    }
    const names = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
    return names.map(name => ({ name, count: counts[name] }));
  }, [operators]);

  // Operational Groups list with counts
  const groupOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const op of operators) {
      const grp = getOperatorGroup(op);
      counts[grp.id] = (counts[grp.id] || 0) + 1;
    }
    const order = ['picking', 'despacho', 'gruas', 'encajado', 'transpaletas', 'repaletizado', 'patio', 'jefatura'];
    return order
      .filter(id => (counts[id] || 0) > 0)
      .map(id => ({
        ...OPERATIONAL_GROUPS[id],
        count: counts[id] || 0
      }));
  }, [operators]);

  // Filtered operators (by shift, area, supervisor, group, search)
  const filteredOperators = useMemo(() => {
    return operators.filter(op => {
      if (!op.active) return false;
      if (selectedShiftId !== 'todos' && op.shiftId !== selectedShiftId) return false;
      if (selectedArea !== 'todas' && op.area !== selectedArea) return false;
      if (selectedSupervisor !== 'todos' && (op.supervisor || '').trim() !== selectedSupervisor) return false;
      if (selectedGroup !== 'todos') {
        const grp = getOperatorGroup(op);
        if (grp.id !== selectedGroup) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const grp = getOperatorGroup(op);
        const matchesName = op.name.toLowerCase().includes(q);
        const matchesRut = op.rut?.toLowerCase().includes(q) ?? false;
        const matchesRole = op.role.toLowerCase().includes(q);
        const matchesSupervisor = op.supervisor?.toLowerCase().includes(q) ?? false;
        const matchesJefe = op.jefeTurno?.toLowerCase().includes(q) ?? false;
        const matchesArea = op.area.toLowerCase().includes(q);
        const matchesGroup = grp.name.toLowerCase().includes(q) || grp.shortName.toLowerCase().includes(q);
        if (!matchesName && !matchesRut && !matchesRole && !matchesSupervisor && !matchesJefe && !matchesArea && !matchesGroup) {
          return false;
        }
      }
      return true;
    });
  }, [operators, selectedShiftId, selectedArea, selectedSupervisor, selectedGroup, search]);

  // KPIs for the active date & shift
  const kpis = useMemo(() => {
    const total = filteredOperators.length;
    let presentes = 0;
    let tarde = 0;
    let ausentes = 0;
    let licencias = 0;
    let justificadas = 0;
    let vacaciones = 0;
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
        case 'vacaciones':
          vacaciones++;
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
      vacaciones,
      sinMarcar,
      adherencia
    };
  }, [filteredOperators, recordMap]);

  // Global matrix stats (totals across 80 operators & 304 days)
  const matrixStats = useMemo(() => {
    let totalMarks = 0;
    let presentes = 0;
    let ausentes = 0;
    let vacaciones = 0;
    let licencias = 0;
    let permisos = 0;

    for (const op of filteredOperators) {
      const st = getOperatorStats(op.id, selectedMonth === 'todos' ? undefined : selectedMonth);
      totalMarks += st.totalEvaluated;
      presentes += st.presentes;
      ausentes += st.ausencias;
      vacaciones += st.vacaciones;
      licencias += st.licencias;
      permisos += st.permisos;
    }

    const adherencia = totalMarks > 0 ? Math.round((presentes / totalMarks) * 100) : 0;

    return {
      totalColabs: filteredOperators.length,
      totalMarks,
      presentes,
      ausentes,
      vacaciones,
      licencias,
      permisos,
      adherencia
    };
  }, [filteredOperators, selectedMonth]);

  // Matrix dates to display based on selectedMonth
  const matrixDates = useMemo(() => {
    if (selectedMonth === 'todos') {
      // In "todos", show all 304 dates
      return HISTORICAL_DATE_KEYS.map((key, i) => ({
        key,
        header: HISTORICAL_HEADER_DAYS[i] || key.slice(5)
      }));
    }
    // Filter to selected month
    const result: { key: string; header: string }[] = [];
    HISTORICAL_DATE_KEYS.forEach((key, i) => {
      if (key.startsWith(selectedMonth)) {
        result.push({
          key,
          header: HISTORICAL_HEADER_DAYS[i] || key.slice(8)
        });
      }
    });
    return result;
  }, [selectedMonth]);

  // 1-Click Status toggle in Daily View
  const handleStatusClick = (operator: OperatorItem, status: AttendanceStatus) => {
    const existingRec = recordMap.get(operator.id);
    const opShift = operator.shiftId || (selectedShiftId === 'todos' ? 'turno-1' : selectedShiftId);
    const shiftObj = SHIFT_OPTIONS.find(s => s.id === opShift) || SHIFT_OPTIONS[0];

    const newRecord: AttendanceRecord = {
      id: existingRec?.id || `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: selectedDate,
      shiftId: opShift,
      shiftName: shiftObj.name as ShiftType,
      operatorId: operator.id,
      operatorName: operator.name,
      operatorRole: operator.role,
      operatorArea: operator.area,
      status,
      arrivalTime: status === 'tarde' ? (existingRec?.arrivalTime || shiftObj.defaultArrival) : undefined,
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
    const opShift = op.shiftId || (selectedShiftId === 'todos' ? 'turno-1' : selectedShiftId);
    const shiftObj = SHIFT_OPTIONS.find(s => s.id === opShift) || SHIFT_OPTIONS[0];

    const newRecord: AttendanceRecord = {
      id: existingRec?.id || `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: selectedDate,
      shiftId: opShift,
      shiftName: shiftObj.name as ShiftType,
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
      const opShift = op.shiftId || (selectedShiftId === 'todos' ? 'turno-1' : selectedShiftId);
      const shiftObj = SHIFT_OPTIONS.find(s => s.id === opShift) || SHIFT_OPTIONS[0];

      return {
        id: existing?.id || `att-${Date.now()}-${op.id}`,
        date: selectedDate,
        shiftId: opShift,
        shiftName: shiftObj.name as ShiftType,
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
        shiftId: formShiftId,
        supervisor: formSupervisor.trim(),
        jefeTurno: formJefeTurno.trim(),
        company: formCompany.trim()
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
        createdAt: new Date().toISOString(),
        supervisor: formSupervisor.trim(),
        jefeTurno: formJefeTurno.trim(),
        company: formCompany.trim()
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
    setFormSupervisor(op.supervisor || 'Cristian Hernandez');
    setFormJefeTurno(op.jefeTurno || 'Euro Velasquez');
    setFormCompany(op.company || 'Cial Alimentos');
    setShowAddModal(true);
  };

  const handleDeleteOperator = (op: OperatorItem) => {
    if (window.confirm(`¿Seguro que deseas eliminar al colaborador "${op.name}" de la nómina?`)) {
      deleteOperator(op.id);
      loadData();
      showToast(`Colaborador ${op.name} eliminado`);
    }
  };

  const resetForm = () => {
    setFormName('');
    setFormRut('');
    setFormRole('ASISTENTE DE PICKING 1');
    setFormArea('Picking / Cámara Frío');
    setFormShiftId('turno-1');
    setFormSupervisor('Cristian Hernandez');
    setFormJefeTurno('Euro Velasquez');
    setFormCompany('Cial Alimentos');
  };

  // Export CSV of the day
  const handleExportAttendanceCsv = () => {
    const rows = filteredOperators.map(op => {
      const rec = recordMap.get(op.id);
      const statusLabel = rec ? STATUS_CONFIG[rec.status].label : 'Sin Marcar';
      return {
        'Fecha': selectedDate,
        'Turno': op.shiftId || currentShift.name,
        'Operador': op.name,
        'RUT': op.rut || 'N/A',
        'Cargo': op.role,
        'Área': op.area,
        'Jefe de Turno': op.jefeTurno || '',
        'Supervisor': op.supervisor || '',
        'Empresa': op.company || 'Cial Alimentos',
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
              Gestión de Dotación y Pase de Lista • CIAL Alimentos
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Control de Asistencia & Historial Operativo
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-2xl mt-1">
              Nómina activa de {operators.length} colaboradores y registro histórico consolidado de asistencia (01-Ene a 31-Oct). Pase de lista rápido por turno con un solo clic.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            
            {/* View Mode Switcher Pills */}
            <div className="p-1 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode('diario')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'diario'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Pase Diario
              </button>
              <button
                type="button"
                onClick={() => setViewMode('matriz')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'matriz'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <TableProperties className="w-4 h-4" />
                Matriz Historial (Ene-Oct)
              </button>
            </div>

            {viewMode === 'diario' ? (
              <>
                <button
                  onClick={handleMarkAllPresent}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
                  title="Marcar todos los operadores visibles como Presentes"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  Marcar Presentes
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
                  + Colaborador
                </button>

                <button
                  onClick={handleExportAttendanceCsv}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all active:scale-95 backdrop-blur-sm"
                  title="Descargar asistencia del día en CSV"
                >
                  <Download className="w-4 h-4 text-emerald-300" />
                  CSV Día
                </button>
              </>
            ) : (
              <button
                onClick={exportFullAttendanceMatrixCsv}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
                title="Descargar matriz completa en formato original CSV (304 días)"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Exportar Matriz Completa (CSV)
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Date, Shift & Filter Controls */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          
          {/* Date Selector (Only active in Daily view) */}
          {viewMode === 'diario' ? (
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
                  className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    selectedDate === todayStr 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  Hoy
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CalendarRange className="w-3.5 h-3.5 text-emerald-600" />
                Filtrar Mes Histórico
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
              >
                {MONTH_TABS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Shift Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              Turno Operativo
            </label>
            <select
              value={selectedShiftId}
              onChange={(e) => setSelectedShiftId(e.target.value as ShiftId | 'todos')}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
            >
              {SHIFT_OPTIONS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Supervisor Filter Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              Supervisor a Cargo
            </label>
            <select
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
              className="w-full px-3 py-2 bg-indigo-50/50 border border-indigo-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-indigo-600 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="todos">Todos los Supervisores ({operators.length})</option>
              {supervisorOptions.map(s => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.count} colab.)
                </option>
              ))}
            </select>
          </div>

          {/* Operational Group Filter Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Grupo Operativo
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="todos">Todos los Grupos ({operators.length})</option>
              {groupOptions.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.count})
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
                placeholder="Nombre, RUT, rol, supervisor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-400"
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

        {/* Quick Filter Pill Rows: Supervisors & Groups */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          
          {/* Quick Pill Row 1: Supervisors */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <span className="font-bold text-slate-600 shrink-0 text-[11px] uppercase tracking-wider flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              Supervisores:
            </span>
            <button
              onClick={() => setSelectedSupervisor('todos')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedSupervisor === 'todos'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Todos ({operators.length})
            </button>
            {supervisorOptions.map(s => (
              <button
                key={s.name}
                onClick={() => setSelectedSupervisor(selectedSupervisor === s.name ? 'todos' : s.name)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  selectedSupervisor === s.name
                    ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400'
                    : 'bg-indigo-50/70 text-indigo-800 hover:bg-indigo-100 border border-indigo-200'
                }`}
              >
                <span>{s.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                  selectedSupervisor === s.name ? 'bg-indigo-700 text-white' : 'bg-indigo-200/80 text-indigo-900'
                }`}>
                  {s.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Pill Row 2: Operational Groups */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <span className="font-bold text-slate-600 shrink-0 text-[11px] uppercase tracking-wider flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Grupos:
            </span>
            <button
              onClick={() => setSelectedGroup('todos')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedGroup === 'todos'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Todos ({operators.length})
            </button>
            {groupOptions.map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGroup(selectedGroup === g.id ? 'todos' : g.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  selectedGroup === g.id
                    ? `${g.pillActiveClass} ring-2 ring-emerald-400`
                    : g.pillInactiveClass
                }`}
              >
                <span>{g.shortName}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                  selectedGroup === g.id ? 'bg-black/20 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {g.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Applied Filters indicator bar */}
        {(selectedSupervisor !== 'todos' || selectedGroup !== 'todos' || selectedShiftId !== 'todos' || selectedArea !== 'todas' || search.trim() !== '') && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-50/80 p-2.5 rounded-xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-600">Filtros activos:</span>
              {selectedSupervisor !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold border border-indigo-200">
                  <UserCheck className="w-3 h-3 text-indigo-600" />
                  Supervisor: {selectedSupervisor}
                  <button onClick={() => setSelectedSupervisor('todos')} className="hover:text-indigo-950 font-black ml-1">✕</button>
                </span>
              )}
              {selectedGroup !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  <Layers className="w-3 h-3 text-emerald-600" />
                  Grupo: {OPERATIONAL_GROUPS[selectedGroup]?.name || selectedGroup}
                  <button onClick={() => setSelectedGroup('todos')} className="hover:text-emerald-950 font-black ml-1">✕</button>
                </span>
              )}
              {selectedShiftId !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800 font-bold border border-slate-300">
                  <Clock className="w-3 h-3 text-slate-600" />
                  {SHIFT_OPTIONS.find(s => s.id === selectedShiftId)?.name.split(' (')[0]}
                  <button onClick={() => setSelectedShiftId('todos')} className="hover:text-slate-950 font-black ml-1">✕</button>
                </span>
              )}
              {selectedArea !== 'todas' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800 font-bold border border-slate-300">
                  <Filter className="w-3 h-3 text-slate-600" />
                  {selectedArea}
                  <button onClick={() => setSelectedArea('todas')} className="hover:text-slate-950 font-black ml-1">✕</button>
                </span>
              )}
              {search.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold border border-amber-200">
                  <Search className="w-3 h-3 text-amber-700" />
                  "{search}"
                  <button onClick={() => setSearch('')} className="hover:text-amber-950 font-black ml-1">✕</button>
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedSupervisor('todos');
                setSelectedGroup('todos');
                setSelectedShiftId('todos');
                setSelectedArea('todas');
                setSearch('');
              }}
              className="text-xs font-black text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}

        {/* Quick Shift summary pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Responsable de Nómina:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold">
              {currentUserEmail}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Horario: <strong className="text-slate-700">{currentShift.hours}</strong></span>
            <span>•</span>
            <span>Mostrando: <strong className="text-emerald-700">{filteredOperators.length} de {operators.length}</strong> colaboradores</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VISTA 1: PASE DE LISTA DIARIO                                  */}
      {/* ============================================================== */}
      {viewMode === 'diario' && (
        <>
          {/* KPI Metrics Dashboard Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            
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
                Con retraso
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

            {/* Justificadas / Permiso */}
            <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-sky-800 text-xs font-bold">
                <span>Permisos</span>
                <FileCheck className="w-4 h-4 text-sky-600" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-sky-700">{kpis.justificadas}</span>
                <span className="text-xs font-bold text-sky-600">permiso</span>
              </div>
              <div className="mt-1 text-[11px] text-sky-700 font-semibold">
                Permiso admin.
              </div>
            </div>

            {/* Vacaciones */}
            <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-teal-800 text-xs font-bold">
                <span>Vacaciones</span>
                <Palmtree className="w-4 h-4 text-teal-600" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-teal-700">{kpis.vacaciones}</span>
                <span className="text-xs font-bold text-teal-600">feriado</span>
              </div>
              <div className="mt-1 text-[11px] text-teal-700 font-semibold">
                Feriado legal
              </div>
            </div>

            {/* Adherencia Operativa */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm flex flex-col justify-between border border-slate-700">
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
                  Nómina de Colaboradores • {currentShift.name} ({filteredOperators.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fecha activa: <strong>{selectedDate}</strong>. Haga clic sobre el estado para registrar o modificar en 1 clic.
                </p>
              </div>
              <div className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                {filteredOperators.length} colaboradores
              </div>
            </div>

            {/* Operator Row List */}
            <div className="divide-y divide-slate-100">
              {filteredOperators.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-700">No se encontraron colaboradores</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    No hay operadores que coincidan con la búsqueda o el filtro de turno/área seleccionado.
                  </p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setSelectedArea('todas');
                      setSelectedShiftId('todos');
                      setSelectedSupervisor('todos');
                      setSelectedGroup('todos');
                    }}
                    className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Restablecer filtros
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
                      <div className="flex items-start sm:items-center gap-3.5 min-w-[320px] flex-1">
                        
                        {/* Index + Avatar */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-black flex items-center justify-center text-sm shadow-sm">
                            {operator.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center border border-white">
                            {index + 1}
                          </span>
                        </div>

                        {/* Name + Badges + Supervisor + Cargo + Grupo */}
                        <div className="flex-1">
                          
                          {/* Row 1: Name + RUT + Company */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-black text-slate-900">
                              {operator.name}
                            </span>
                            {operator.rut && (
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                                {operator.rut}
                              </span>
                            )}
                            {operator.company && operator.company !== 'Cial Alimentos' && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                {operator.company}
                              </span>
                            )}
                          </div>

                          {/* Row 2: Badges Destacados de Clasificación (Supervisor + Grupo + Cargo) */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs">
                            
                            {/* 1. Supervisor Destacado */}
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-black bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs">
                              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Sup:</span>
                              <strong className="text-indigo-950 font-black">{operator.supervisor || 'Sin asignar'}</strong>
                            </span>

                            {/* 2. Grupo Operativo */}
                            {(() => {
                              const grp = getOperatorGroup(operator);
                              return (
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold border shadow-2xs ${grp.badgeClass}`}>
                                  <Layers className="w-3.5 h-3.5" />
                                  <span>{grp.name}</span>
                                </span>
                              );
                            })()}

                            {/* 3. Cargo */}
                            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                              {operator.role}
                            </span>

                            {/* 4. Jefe Turno */}
                            {operator.jefeTurno && (
                              <span className="text-slate-500 font-medium text-[11px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                                Jefe: {operator.jefeTurno}
                              </span>
                            )}
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
                          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                            status === 'presente' 
                              ? STATUS_CONFIG.presente.activeClass 
                              : STATUS_CONFIG.presente.inactiveClass
                          }`}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${status === 'presente' ? 'text-white' : 'text-emerald-600'}`} />
                          <span>Presente</span>
                        </button>

                        {/* 2. Llegó tarde */}
                        <button
                          type="button"
                          onClick={() => handleStatusClick(operator, 'tarde')}
                          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                            status === 'tarde' 
                              ? STATUS_CONFIG.tarde.activeClass 
                              : STATUS_CONFIG.tarde.inactiveClass
                          }`}
                        >
                          <Clock className={`w-3.5 h-3.5 ${status === 'tarde' ? 'text-white' : 'text-amber-600'}`} />
                          <span>Tarde</span>
                        </button>

                        {/* 3. Ausente */}
                        <button
                          type="button"
                          onClick={() => handleStatusClick(operator, 'ausente')}
                          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                            status === 'ausente' 
                              ? STATUS_CONFIG.ausente.activeClass 
                              : STATUS_CONFIG.ausente.inactiveClass
                          }`}
                        >
                          <XCircle className={`w-3.5 h-3.5 ${status === 'ausente' ? 'text-white' : 'text-rose-600'}`} />
                          <span>Ausente</span>
                        </button>

                        {/* 4. Licencia */}
                        <button
                          type="button"
                          onClick={() => handleStatusClick(operator, 'licencia')}
                          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                            status === 'licencia' 
                              ? STATUS_CONFIG.licencia.activeClass 
                              : STATUS_CONFIG.licencia.inactiveClass
                          }`}
                        >
                          <Activity className={`w-3.5 h-3.5 ${status === 'licencia' ? 'text-white' : 'text-purple-600'}`} />
                          <span>Licencia</span>
                        </button>

                        {/* 5. Ausencia Justificada / Permiso */}
                        <button
                          type="button"
                          onClick={() => handleStatusClick(operator, 'justificada')}
                          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                            status === 'justificada' 
                              ? STATUS_CONFIG.justificada.activeClass 
                              : STATUS_CONFIG.justificada.inactiveClass
                          }`}
                        >
                          <FileCheck className={`w-3.5 h-3.5 ${status === 'justificada' ? 'text-white' : 'text-sky-600'}`} />
                          <span>Permiso</span>
                        </button>

                        {/* 6. Vacaciones */}
                        <button
                          type="button"
                          onClick={() => handleStatusClick(operator, 'vacaciones')}
                          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer ${
                            status === 'vacaciones' 
                              ? STATUS_CONFIG.vacaciones.activeClass 
                              : STATUS_CONFIG.vacaciones.inactiveClass
                          }`}
                        >
                          <Palmtree className={`w-3.5 h-3.5 ${status === 'vacaciones' ? 'text-white' : 'text-teal-600'}`} />
                          <span>Vacaciones</span>
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
                            title="Agregar hora de llegada u observación"
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
        </>
      )}

      {/* ============================================================== */}
      {/* VISTA 2: MATRIZ HISTORIAL CONSOLIDADA (01-ENE A 31-OCT)       */}
      {/* ============================================================== */}
      {viewMode === 'matriz' && (
        <div className="space-y-5">
          
          {/* Matriz Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>Colaboradores</span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">{matrixStats.totalColabs}</div>
              <div className="mt-1 text-[11px] text-slate-400">Total nómina evaluada</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>Total Registros</span>
                <CalendarRange className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">{matrixStats.totalMarks.toLocaleString()}</div>
              <div className="mt-1 text-[11px] text-slate-400">01-Ene a 31-Oct 2026</div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-xs">
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
                <span>Presentes (P)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-700">{matrixStats.presentes.toLocaleString()}</div>
              <div className="mt-1 text-[11px] text-emerald-600 font-bold">
                {matrixStats.totalMarks > 0 ? `${Math.round((matrixStats.presentes / matrixStats.totalMarks) * 100)}% asistencia` : '0%'}
              </div>
            </div>

            <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200 shadow-xs">
              <div className="flex items-center justify-between text-teal-800 text-xs font-bold">
                <span>Vacaciones (V)</span>
                <Palmtree className="w-4 h-4 text-teal-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-teal-700">{matrixStats.vacaciones.toLocaleString()}</div>
              <div className="mt-1 text-[11px] text-teal-600 font-bold">
                {matrixStats.totalMarks > 0 ? `${((matrixStats.vacaciones / matrixStats.totalMarks) * 100).toFixed(1)}% del total` : '0%'}
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 shadow-xs">
              <div className="flex items-center justify-between text-purple-800 text-xs font-bold">
                <span>Licencias (L)</span>
                <Activity className="w-4 h-4 text-purple-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-purple-700">{matrixStats.licencias.toLocaleString()}</div>
              <div className="mt-1 text-[11px] text-purple-600 font-bold">
                {matrixStats.totalMarks > 0 ? `${((matrixStats.licencias / matrixStats.totalMarks) * 100).toFixed(1)}% del total` : '0%'}
              </div>
            </div>

            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 shadow-xs">
              <div className="flex items-center justify-between text-rose-800 text-xs font-bold">
                <span>Ausencias (A)</span>
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-rose-700">{matrixStats.ausentes.toLocaleString()}</div>
              <div className="mt-1 text-[11px] text-rose-600 font-bold">
                {matrixStats.totalMarks > 0 ? `${((matrixStats.ausentes / matrixStats.totalMarks) * 100).toFixed(1)}% tasa ausentismo` : '0%'}
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm border border-slate-700 flex flex-col justify-between">
              <div className="flex items-center justify-between text-emerald-400 text-xs font-black">
                <span>Adherencia</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-400">{matrixStats.adherencia}%</div>
              <div className="mt-1 text-[11px] text-slate-300">Tasa efectiva CIAL</div>
            </div>

          </div>

          {/* Legend Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-slate-700">Convenciones:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-600" /> P: Presente
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 font-bold border border-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-600" /> V: Vacaciones
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 font-bold border border-purple-300">
                <span className="w-2 h-2 rounded-full bg-purple-600" /> L: Licencia Médica
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 font-bold border border-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-600" /> A: Ausencia
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 font-bold border border-sky-300">
                <span className="w-2 h-2 rounded-full bg-sky-600" /> J: Permiso
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-200 text-slate-600 font-medium">
                — : Día libre / Descanso
              </span>
            </div>

            <button
              onClick={exportFullAttendanceMatrixCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-300 shadow-xs transition-all text-xs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              Descargar Matriz CSV (304 Días)
            </button>
          </div>

          {/* Matrix Scrollable Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
                
                {/* Header */}
                <thead className="bg-slate-100/95 sticky top-0 z-20 border-b border-slate-200 backdrop-blur-xs">
                  <tr>
                    <th className="p-3 font-black text-slate-700 w-12 text-center sticky left-0 bg-slate-100 z-30 shadow-xs">
                      #
                    </th>
                    <th className="p-3 font-black text-slate-800 min-w-[200px] sticky left-12 bg-slate-100 z-30 shadow-xs">
                      Colaborador / RUT
                    </th>
                    <th className="p-3 font-black text-indigo-900 min-w-[170px] bg-indigo-50/60 border-r border-indigo-100">
                      Supervisor a Cargo
                    </th>
                    <th className="p-3 font-black text-slate-700 min-w-[190px]">
                      Grupo Operativo & Cargo
                    </th>
                    <th className="p-3 font-black text-emerald-800 text-center min-w-[90px] bg-emerald-50/80">
                      % Adh.
                    </th>
                    <th className="p-3 font-bold text-slate-600 text-center w-12 bg-slate-50" title="Días Presente">
                      P
                    </th>
                    <th className="p-3 font-bold text-teal-700 text-center w-12 bg-teal-50/50" title="Días Vacaciones">
                      V
                    </th>
                    <th className="p-3 font-bold text-purple-700 text-center w-12 bg-purple-50/50" title="Días Licencia">
                      L
                    </th>
                    <th className="p-3 font-bold text-rose-700 text-center w-12 bg-rose-50/50" title="Días Ausente">
                      A
                    </th>
                    
                    {/* Dynamic Date Headers */}
                    {matrixDates.map(d => (
                      <th 
                        key={d.key} 
                        className="p-2 font-bold text-slate-600 text-center min-w-[42px] border-l border-slate-200/60"
                        title={d.key}
                      >
                        {d.header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-slate-100">
                  {filteredOperators.map((operator, opIdx) => {
                    const st = getOperatorStats(operator.id, selectedMonth === 'todos' ? undefined : selectedMonth);
                    const opHist = HISTORICAL_ATTENDANCE_COMPACT[operator.id] || {};

                    return (
                      <tr key={operator.id} className="hover:bg-slate-50/80 transition-all">
                        
                        {/* Index */}
                        <td className="p-3 font-bold text-slate-400 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">
                          {opIdx + 1}
                        </td>

                        {/* Name + RUT */}
                        <td className="p-3 sticky left-12 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-200">
                          <div className="font-black text-slate-900 leading-tight">
                            {operator.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                            {operator.rut || 'N/A'}
                          </div>
                        </td>

                        {/* Supervisor a Cargo */}
                        <td className="p-3 border-r border-slate-100 bg-indigo-50/20">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 font-bold border border-indigo-200 text-xs">
                            <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                            {operator.supervisor || 'N/A'}
                          </span>
                        </td>

                        {/* Grupo & Cargo */}
                        <td className="p-3 border-r border-slate-100">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${getOperatorGroup(operator).badgeClass}`}>
                              <Layers className="w-2.5 h-2.5" />
                              {getOperatorGroup(operator).name}
                            </span>
                          </div>
                          <div className="font-semibold text-slate-700 leading-tight text-xs">
                            {operator.role}
                          </div>
                        </td>

                        {/* Adherencia */}
                        <td className="p-3 text-center bg-emerald-50/30 border-r border-slate-100 font-black">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] ${
                            st.adherencia >= 85 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : st.adherencia >= 70 
                              ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {st.adherencia}%
                          </span>
                        </td>

                        {/* P */}
                        <td className="p-2 text-center font-bold text-emerald-700 bg-slate-50/50">
                          {st.presentes}
                        </td>

                        {/* V */}
                        <td className="p-2 text-center font-bold text-teal-700 bg-teal-50/20">
                          {st.vacaciones}
                        </td>

                        {/* L */}
                        <td className="p-2 text-center font-bold text-purple-700 bg-purple-50/20">
                          {st.licencias}
                        </td>

                        {/* A */}
                        <td className="p-2 text-center font-bold text-rose-700 bg-rose-50/20 border-r border-slate-200">
                          {st.ausencias}
                        </td>

                        {/* Daily Cells */}
                        {matrixDates.map(d => {
                          const tuple = opHist[d.key];
                          if (!tuple) {
                            return (
                              <td key={d.key} className="p-1 text-center border-l border-slate-100 text-slate-300">
                                —
                              </td>
                            );
                          }

                          const status = tuple[0];
                          const notes = tuple.length > 1 ? tuple[1] : undefined;
                          const cfg = STATUS_CONFIG[status];
                          const tooltip = `${d.key}: ${cfg?.label || status}${notes ? ` (${notes})` : ''}`;

                          return (
                            <td key={d.key} className="p-1 text-center border-l border-slate-100" title={tooltip}>
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] ${
                                cfg?.matrixClass || 'bg-slate-100 text-slate-700'
                              }`}>
                                {cfg?.code || status[0].toUpperCase()}
                              </span>
                            </td>
                          );
                        })}

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>

        </div>
      )}

      {/* Modal: Agregar / Editar Operador */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {editingOperator ? 'Modificar Colaborador' : 'Agregar Nuevo Colaborador'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Nómina oficial CD CIAL Alimentos
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    RUT *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 18.234.901-5"
                    value={formRut}
                    onChange={(e) => setFormRut(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cargo / Rol Operativo
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="ASISTENTE DE PICKING 1">ASISTENTE DE PICKING 1</option>
                    <option value="ASISTENTE DE PICKING 2">ASISTENTE DE PICKING 2</option>
                    <option value="SUPERVISOR DE PICKING 1">SUPERVISOR DE PICKING 1</option>
                    <option value="SUPERVISOR DE PICKING 2">SUPERVISOR DE PICKING 2</option>
                    <option value="ASISTENTE DE DESPACHO 1">ASISTENTE DE DESPACHO 1</option>
                    <option value="ASISTENTE DE DESPACHO 2">ASISTENTE DE DESPACHO 2</option>
                    <option value="ASISTENTE DE DESPACHO 3">ASISTENTE DE DESPACHO 3</option>
                    <option value="SUPERVISOR DE DESPACHO 3">SUPERVISOR DE DESPACHO 3</option>
                    <option value="COORDINADOR DE PATIO 3">COORDINADOR DE PATIO 3</option>
                    <option value="ENCAJADO">ENCAJADO</option>
                    <option value="GRUERO 1">GRUERO 1</option>
                    <option value="GRUERO 2">GRUERO 2</option>
                    <option value="TRANSPALETERO 1">TRANSPALETERO 1</option>
                    <option value="TRANSPALETERO 2">TRANSPALETERO 2</option>
                    <option value="JEFE DE TURNO 2">JEFE DE TURNO 2</option>
                    <option value="JEFE DE TURNO 3">JEFE DE TURNO 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Área Operativa
                  </label>
                  <select
                    value={formArea}
                    onChange={(e) => setFormArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Picking / Cámara Frío">Picking / Cámara Frío</option>
                    <option value="Andenes de Despacho">Andenes de Despacho</option>
                    <option value="Encajado Frío">Encajado Frío</option>
                    <option value="Grúas / Almacenamiento">Grúas / Almacenamiento</option>
                    <option value="Staging / Transpaletas">Staging / Transpaletas</option>
                    <option value="Patio Inbound / Recepción">Patio Inbound / Recepción</option>
                    <option value="Repaletizado / Reacondicionamiento">Repaletizado / Reacondicionamiento</option>
                    <option value="Jefatura de Turno">Jefatura de Turno</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Turno
                  </label>
                  <select
                    value={formShiftId}
                    onChange={(e) => setFormShiftId(e.target.value as ShiftId)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="turno-1">Turno 1 (Mañana)</option>
                    <option value="turno-2">Turno 2 (Tarde)</option>
                    <option value="turno-3">Turno 3 (Noche)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Supervisor
                  </label>
                  <input
                    type="text"
                    list="supervisor-datalist-opts"
                    placeholder="Ej: Cristian Hernandez"
                    value={formSupervisor}
                    onChange={(e) => setFormSupervisor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Jefe Turno
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Euro Velasquez"
                    value={formJefeTurno}
                    onChange={(e) => setFormJefeTurno(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <datalist id="supervisor-datalist-opts">
                {supervisorOptions.map(s => (
                  <option key={s.name} value={s.name} />
                ))}
              </datalist>

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
                  <option value="justificada">Ausencia Justificada / Permiso</option>
                  <option value="vacaciones">Vacaciones (Feriado legal)</option>
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
                  placeholder="Ej: Licencia médica extendida / Permiso administrativo / Vacaciones autorizadas..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-400"
                />
              </div>

              <datalist id="supervisor-datalist-opts">
                {supervisorOptions.map(s => (
                  <option key={s.name} value={s.name} />
                ))}
              </datalist>

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
