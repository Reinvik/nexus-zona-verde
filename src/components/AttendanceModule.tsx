import { supabase } from '../lib/supabase';
import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Cloud,
  CloudCheck,
  CloudAlert,
  CloudUpload,
  Layers,
  Shield,
  Truck,
  Boxes,
  RefreshCw,
  Compass,
  Tag,
  Eye,
  Camera,
  Image as ImageIcon,
  Settings,
  SlidersHorizontal
} from 'lucide-react';
import { OperatorItem, AttendanceRecord, AttendanceStatus, ShiftId, ShiftType, AppUser, OperationalSpecialty } from '../types';
import { 
  getOperators, 
  saveOperator, 
  saveOperatorsBulk,
  deleteOperator, 
  getAttendanceRecords, 
  saveAttendanceRecord, 
  saveBulkAttendance, 
  exportToCsv,
  getAllAttendanceOverrides,
  removeAttendanceOverride,
  unmarkAttendance,
  syncAttendanceFromCloud,
  getShiftTeamPhoto,
  saveShiftTeamPhoto,
  deleteShiftTeamPhoto,
  getAppUsers,
  saveAppUser,
  ShiftTeamPhoto
} from '../services/storage';
import { compressImageFile } from '../utils/imageCompressor';
import { PredictiveLeaderInput } from './PredictiveLeaderInput';
import { PredictiveTextarea } from './PredictiveTextarea';
import { 
  HISTORICAL_DATE_KEYS, 
  HISTORICAL_HEADER_DAYS, 
  HISTORICAL_ATTENDANCE_COMPACT, 
  getOperatorStats,
  exportFullAttendanceMatrixCsv 
} from '../data/attendanceHistory';

interface AttendanceModuleProps {
  currentUserEmail?: string;
  currentUser?: AppUser;
}

const SHIFT_OPTIONS: { id: ShiftId | 'todos'; name: string; hours: string; defaultArrival: string }[] = [
  { id: 'turno-1', name: 'Turno 1', hours: 'Turno Rotativo', defaultArrival: '07:15' },
  { id: 'turno-2', name: 'Turno 2', hours: 'Turno Rotativo', defaultArrival: '15:15' },
  { id: 'turno-3', name: 'Turno 3', hours: 'Turno Rotativo', defaultArrival: '23:15' },
  { id: 'todos', name: 'Todos los Turnos (Dotación 102)', hours: 'Todos los Turnos', defaultArrival: '07:00' }
];

const MONTH_NAMES_MAP = [
  { short: 'Ene', long: 'Enero' },
  { short: 'Feb', long: 'Febrero' },
  { short: 'Mar', long: 'Marzo' },
  { short: 'Abr', long: 'Abril' },
  { short: 'May', long: 'Mayo' },
  { short: 'Jun', long: 'Junio' },
  { short: 'Jul', long: 'Julio' },
  { short: 'Ago', long: 'Agosto' },
  { short: 'Sep', long: 'Septiembre' },
  { short: 'Oct', long: 'Octubre' },
  { short: 'Nov', long: 'Noviembre' },
  { short: 'Dic', long: 'Diciembre' }
];

const getDynamicMonthTabs = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
  const currentKey = `${currentYear}-${currentMonth}`;

  const tabs: { id: string; name: string }[] = [];

  MONTH_NAMES_MAP.forEach((m, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const id = `${currentYear}-${num}`;
    const isCurrent = id === currentKey;
    tabs.push({
      id,
      name: isCurrent ? `${m.long} ${currentYear} (Mes Actual)` : `${m.short} (${num})`
    });
  });

  tabs.push({
    id: 'todos',
    name: `Historial Completo (${currentYear})`
  });

  return tabs;
};

const MONTH_TABS = getDynamicMonthTabs();

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
  },
  sin_marcar: {
    label: 'Sin Marcar',
    shortLabel: 'Pendiente',
    code: '—',
    icon: Clock,
    activeClass: 'bg-slate-200 text-slate-700',
    inactiveClass: 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200',
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
    borderClass: 'border-l-4 border-l-slate-300',
    matrixClass: 'bg-slate-100 text-slate-400 font-bold'
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
  currentUserEmail = 'ariel.mella@cial.cl',
  currentUser
}) => {
  const canManageAttendance = currentUser?.permissions?.canManageAttendance ?? (currentUser?.role !== 'prevencion');
  // Current date in YYYY-MM-DD (Chile / local timezone)
  const todayStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const todayHeaderLabel = useMemo(() => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const monthNamesShort = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const m = monthNamesShort[now.getMonth()] || 'nov';
    return `${d}-${m}`;
  }, []);

  const [viewMode, setViewMode] = useState<'diario' | 'matriz'>('matriz');
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedShiftId, setSelectedShiftId] = useState<ShiftId | 'todos'>(() => {
    if (currentUser?.assignedSupervisorName && currentUser.assignedSupervisorName !== 'todos') {
      return 'todos'; // Al entrar con un supervisor preasignado, mostrar su grupo oficial completo sin ocultar por turno
    }
    if (currentUser?.role === 'supervisor') {
      return 'todos';
    }
    return currentUser?.shiftId || 'todos';
  });
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  });
  const [operators, setOperators] = useState<OperatorItem[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>(() => {
    if (currentUser?.assignedSupervisorName && currentUser.assignedSupervisorName !== 'todos') {
      return currentUser.assignedSupervisorName;
    }
    if (currentUser?.role === 'supervisor') {
      return currentUser.name;
    }
    return 'todos';
  });
  const [selectedGroup, setSelectedGroup] = useState<string>('todos');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados del Configurador Visual de Grupos Oficiales y Turnos (T1, T2, T3)
  const [showGroupBuilderModal, setShowGroupBuilderModal] = useState<boolean>(false);
  const [builderTab, setBuilderTab] = useState<'supervisor' | 'turnos'>('supervisor');
  const [builderSupervisor, setBuilderSupervisor] = useState<string>(() => {
    if (currentUser?.assignedSupervisorName && currentUser.assignedSupervisorName !== 'todos') {
      return currentUser.assignedSupervisorName;
    }
    if (currentUser?.role === 'supervisor') {
      return currentUser.name;
    }
    return 'Walter Sánchez';
  });
  const [builderShift, setBuilderShift] = useState<ShiftId>(() => currentUser?.shiftId || 'turno-1');
  const [builderSpecialtyFilter, setBuilderSpecialtyFilter] = useState<string>('auto');
  const [builderSearch, setBuilderSearch] = useState<string>('');
  const [builderOnlySelected, setBuilderOnlySelected] = useState<boolean>(false);

  // Cloud sync status with Supabase
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');
  const [lastSyncTime, setLastSyncTime] = useState<string>('');

  // Overrides across all dates from storage / Supabase Cloud
  const [attendanceOverrides, setAttendanceOverrides] = useState<AttendanceRecord[]>([]);

  // DOM Refs for auto-scroll to today
  const matrixTableContainerRef = useRef<HTMLDivElement>(null);
  const todayHeaderRef = useRef<HTMLTableHeaderCellElement>(null);

  // Matrix Interactive Cell Edit Modal
  const [matrixEditModal, setMatrixEditModal] = useState<{
    operator: OperatorItem;
    dateKey: string;
    currentStatus: AttendanceStatus | null;
    currentNotes?: string;
    isOverride: boolean;
  } | null>(null);

  const [modalStatus, setModalStatus] = useState<AttendanceStatus>('vacaciones');
  const [modalStartDate, setModalStartDate] = useState<string>(todayStr);
  const [modalDaysCount, setModalDaysCount] = useState<number>(7);
  const [modalEndDate, setModalEndDate] = useState<string>(todayStr);
  const [modalIsRange, setModalIsRange] = useState<boolean>(true);
  const [modalNotes, setModalNotes] = useState<string>('');
  const [modalArrivalTime, setModalArrivalTime] = useState<string>('');

  // Modals
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showTeamPhotoModal, setShowTeamPhotoModal] = useState<boolean>(false);
  const [shiftTeamPhoto, setShiftTeamPhoto] = useState<ShiftTeamPhoto | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState<boolean>(false);
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
    const allOverrides = getAllAttendanceOverrides();
    setAttendanceOverrides(allOverrides);
  };

  useEffect(() => {
    loadData();

    // Sincronización bidireccional inicial con Supabase Cloud
    let isMounted = true;
    setSyncStatus('syncing');

    syncAttendanceFromCloud()
      .then((cloudRecords) => {
        if (!isMounted) return;
        setAttendanceOverrides(cloudRecords);
        const recs = getAttendanceRecords(selectedDate, selectedShiftId === 'todos' ? undefined : selectedShiftId);
        setRecords(recs);
        setSyncStatus('synced');
        setLastSyncTime(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }));
      })
      .catch((err) => {
        console.warn('[ZonaVerde] Error inicial conectando a Supabase:', err);
        if (isMounted) setSyncStatus('offline');
      });

    // Suscripción en Tiempo Real (Realtime) a cambios en Supabase Cloud
    const channel = supabase
      .channel('public_zona_verde_attendance_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'zona_verde_attendance' }, () => {
        syncAttendanceFromCloud().then((cloudRecords) => {
          if (!isMounted) return;
          setAttendanceOverrides(cloudRecords);
          const recs = getAttendanceRecords(selectedDate, selectedShiftId === 'todos' ? undefined : selectedShiftId);
          setRecords(recs);
          setSyncStatus('synced');
          setLastSyncTime(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }));
        });
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [selectedDate, selectedShiftId]);

  // Load team photo for current date and shift
  useEffect(() => {
    const shiftKey: ShiftId = selectedShiftId === 'todos' ? 'turno-1' : selectedShiftId;
    setShiftTeamPhoto(getShiftTeamPhoto(selectedDate, shiftKey));
  }, [selectedDate, selectedShiftId]);

  const handleTeamPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 900, quality: 0.7 });
      const shiftKey: ShiftId = selectedShiftId === 'todos' ? 'turno-1' : selectedShiftId;
      const presentCount = getAttendanceRecords(selectedDate, shiftKey).filter(r => r.status === 'presente' || r.status === 'tarde').length;
      const photoData: ShiftTeamPhoto = {
        date: selectedDate,
        shiftId: shiftKey,
        photoUrl: dataUrl,
        photoSizeKb: sizeKb,
        takenAt: new Date().toISOString(),
        takenBy: currentUser?.name || currentUserEmail || 'Supervisor de Turno',
        attendeesCount: presentCount
      };

      saveShiftTeamPhoto(photoData);
      setShiftTeamPhoto(photoData);
      showToast('📸 Foto del equipo guardada y vinculada a la charla de seguridad');
    } catch (err) {
      console.error('Error al subir foto:', err);
      showToast('Error al procesar la foto');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleDeleteTeamPhoto = () => {
    const shiftKey: ShiftId = selectedShiftId === 'todos' ? 'turno-1' : selectedShiftId;
    deleteShiftTeamPhoto(selectedDate, shiftKey);
    setShiftTeamPhoto(null);
    showToast('Foto del equipo eliminada');
  };

  // Handler for manual cloud sync button
  const handleManualSync = async () => {
    setSyncStatus('syncing');
    try {
      const cloudRecords = await syncAttendanceFromCloud();
      setAttendanceOverrides(cloudRecords);
      const recs = getAttendanceRecords(selectedDate, selectedShiftId === 'todos' ? undefined : selectedShiftId);
      setRecords(recs);
      setSyncStatus('synced');
      setLastSyncTime(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }));
      showToast('☁️ Asistencia 100% sincronizada con Supabase Cloud');
    } catch {
      setSyncStatus('offline');
      showToast('⚠️ Modo local: los datos se guardaron en caché offline');
    }
  };

  // Auto-scroll to Today's date column when Matrix view is active
  useEffect(() => {
    if (viewMode === 'matriz') {
      const timer = setTimeout(() => {
        if (todayHeaderRef.current && matrixTableContainerRef.current) {
          todayHeaderRef.current.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [viewMode, selectedMonth]);

  // Helper to open Matrix Edit Modal
  const handleOpenMatrixEditModal = (operator: OperatorItem, dateKey: string) => {
    if (!canManageAttendance) {
      showToast('⚠️ Permisos de solo lectura: Prevención no puede modificar asistencia');
      return;
    }

    const key = `${operator.id}_${dateKey}`;
    const override = overridesMap.get(key);
    const tuple = HISTORICAL_ATTENDANCE_COMPACT[operator.id]?.[dateKey];
    const currentSt = override ? (override.status === 'sin_marcar' ? null : override.status) : (tuple ? tuple[0] : null);
    const currentNt = override ? override.notes : (tuple && tuple.length > 1 ? tuple[1] : '');

    setMatrixEditModal({
      operator,
      dateKey,
      currentStatus: currentSt,
      currentNotes: currentNt,
      isOverride: !!override
    });

    const defaultSt: AttendanceStatus = currentSt || 'vacaciones';
    setModalStatus(defaultSt);
    setModalStartDate(dateKey);

    const isRange = defaultSt === 'vacaciones' || defaultSt === 'licencia';
    setModalIsRange(isRange);
    const days = isRange ? 7 : 1;
    setModalDaysCount(days);

    const d = new Date(dateKey + 'T12:00:00');
    d.setDate(d.getDate() + (days - 1));
    setModalEndDate(d.toISOString().slice(0, 10));

    setModalNotes(currentNt || '');
    setModalArrivalTime(override?.arrivalTime || (defaultSt === 'tarde' ? '07:15' : ''));
  };

  const handleQuickDaysSelect = (days: number) => {
    setModalDaysCount(days);
    setModalIsRange(days > 1);
    const d = new Date(modalStartDate + 'T12:00:00');
    d.setDate(d.getDate() + (days - 1));
    setModalEndDate(d.toISOString().slice(0, 10));
  };

  const handleStartDateChange = (newStart: string) => {
    setModalStartDate(newStart);
    const d = new Date(newStart + 'T12:00:00');
    d.setDate(d.getDate() + (modalDaysCount - 1));
    setModalEndDate(d.toISOString().slice(0, 10));
  };

  const handleEndDateChange = (newEnd: string) => {
    setModalEndDate(newEnd);
    const s = new Date(modalStartDate + 'T12:00:00');
    const e = new Date(newEnd + 'T12:00:00');
    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1);
    setModalDaysCount(diffDays);
    setModalIsRange(diffDays > 1);
  };

  const handleSaveMatrixEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matrixEditModal) return;
    const op = matrixEditModal.operator;

    const recordsToSave: AttendanceRecord[] = [];
    const start = new Date(modalStartDate + 'T12:00:00');
    const end = modalIsRange ? new Date(modalEndDate + 'T12:00:00') : new Date(modalStartDate + 'T12:00:00');

    const cur = new Date(start);
    while (cur <= end) {
      const dateStr = cur.toISOString().slice(0, 10);
      recordsToSave.push({
        id: `att-${dateStr}-${op.id}`,
        date: dateStr,
        shiftId: op.shiftId || 'turno-1',
        shiftName: 'Turno 1',
        operatorId: op.id,
        operatorName: op.name,
        operatorRole: op.role,
        operatorArea: op.area,
        status: modalStatus,
        arrivalTime: modalStatus === 'tarde' ? modalArrivalTime : undefined,
        notes: modalNotes.trim() || undefined,
        registeredBy: currentUserEmail,
        updatedAt: new Date().toISOString()
      });
      cur.setDate(cur.getDate() + 1);
    }

    saveBulkAttendance(recordsToSave);
    loadData();
    setMatrixEditModal(null);
    showToast(`✅ ${recordsToSave.length} días de ${STATUS_CONFIG[modalStatus].label} asignados a ${op.name}`);
  };

  const handleRemoveMatrixOverride = () => {
    if (!matrixEditModal) return;
    unmarkAttendance(matrixEditModal.operator.id, matrixEditModal.dateKey);
    loadData();
    setMatrixEditModal(null);
    showToast(`Restablecido día ${matrixEditModal.dateKey} para ${matrixEditModal.operator.name}`);
  };

  const scrollToToday = () => {
    const currentMonthKey = todayStr.slice(0, 7);
    if (selectedMonth !== currentMonthKey && selectedMonth !== 'todos') {
      setSelectedMonth(currentMonthKey);
    }
    setTimeout(() => {
      todayHeaderRef.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }, 150);
  };

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

  // Map of operatorId_date -> AttendanceRecord for fast matrix lookups
  const overridesMap = useMemo(() => {
    const map = new Map<string, AttendanceRecord>();
    for (const ov of attendanceOverrides) {
      map.set(`${ov.operatorId}_${ov.date}`, ov);
    }
    return map;
  }, [attendanceOverrides]);

  // Available unique operational areas
  const areas = useMemo(() => {
    const set = new Set<string>();
    for (const op of operators) {
      if (op.area) set.add(op.area);
    }
    return Array.from(set).sort();
  }, [operators]);

  // Normalizador sin tildes para empatar nombres de supervisores sin errores ("Claudio Sepúlveda" === "Claudio Sepulveda")
  const normalizeSupName = (s?: string): string =>
    (s || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const SPECIALTY_META: Record<string, { label: string; shortLabel: string; emoji: string; badgeClass: string }> = {
    despacho: { label: 'Despacho', shortLabel: 'Despacho', emoji: '🚛', badgeClass: 'bg-blue-100 text-blue-800 border-blue-300' },
    picking: { label: 'Picking', shortLabel: 'Picking', emoji: '📦', badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    gruas: { label: 'Grúas', shortLabel: 'Grúas', emoji: '🏗️', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300' },
    encajado: { label: 'Encajado', shortLabel: 'Encajado', emoji: '🧊', badgeClass: 'bg-teal-100 text-teal-800 border-teal-300' },
    transpaletas: { label: 'Transpaletas', shortLabel: 'Transpaletas', emoji: '🛞', badgeClass: 'bg-orange-100 text-orange-900 border-orange-300' },
    repaletizado: { label: 'Repaletizado', shortLabel: 'Repaletizado', emoji: '🔄', badgeClass: 'bg-purple-100 text-purple-800 border-purple-300' },
    patio: { label: 'Patio Inbound', shortLabel: 'Patio', emoji: '🚧', badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
    todos: { label: 'Todas las Áreas', shortLabel: 'General', emoji: '🌐', badgeClass: 'bg-slate-100 text-slate-700 border-slate-300' }
  };

  // Determina si un operador pertenece al grupo oficial de un supervisor
  const isOperatorInSupervisorGroup = (op: OperatorItem, supervisorName: string): boolean => {
    if (!supervisorName || supervisorName === 'todos') return true;
    return normalizeSupName(op.supervisor) === normalizeSupName(supervisorName);
  };

  // Obtiene la especialidad principal de un supervisor (ej: Despacho para Walter/Nelson, Picking para Claudio/Cristian)
  const getSupervisorSpecialty = (supervisorName: string): OperationalSpecialty => {
    const appUsers = getAppUsers();
    const norm = normalizeSupName(supervisorName);
    const matchedUser = appUsers.find(
      u => normalizeSupName(u.name) === norm ||
           norm.includes(normalizeSupName(u.name)) ||
           normalizeSupName(u.name).includes(norm)
    );

    if (matchedUser?.specialtyGroup && matchedUser.specialtyGroup !== 'todos') {
      return matchedUser.specialtyGroup;
    }

    if (norm.includes('walter') || norm.includes('nelson') || norm.includes('bryan')) return 'despacho';
    if (norm.includes('claudio') || norm.includes('cristian')) return 'picking';
    if (norm.includes('mayckell')) return 'encajado';

    // Inferir por mayoría de sus operadores asignados
    const supOps = operators.filter(o => isOperatorInSupervisorGroup(o, supervisorName));
    if (supOps.length > 0) {
      const grpCounts: Record<string, number> = {};
      for (const o of supOps) {
        const gId = getOperatorGroup(o).id;
        if (gId !== 'general' && gId !== 'jefatura') {
          grpCounts[gId] = (grpCounts[gId] || 0) + 1;
        }
      }
      const topGrp = Object.keys(grpCounts).sort((a, b) => grpCounts[b] - grpCounts[a])[0];
      if (topGrp) return topGrp as OperationalSpecialty;
    }

    return 'todos';
  };

  // Obtener el badge de turno preasignado de un supervisor o jefatura
  const getSupervisorShiftBadge = (supervisorName: string): string | null => {
    const appUsers = getAppUsers();
    const cleanSup = normalizeSupName(supervisorName);
    const matchedUser = appUsers.find(
      u => normalizeSupName(u.name) === cleanSup ||
           cleanSup.includes(normalizeSupName(u.name)) ||
           normalizeSupName(u.name).includes(cleanSup)
    );
    if (matchedUser?.shiftId) {
      return matchedUser.shiftId === 'turno-1' ? 'T1' : matchedUser.shiftId === 'turno-2' ? 'T2' : 'T3';
    }
    return null;
  };

  // Lista consolidada de Supervisores (unificando nombres con/sin tilde y sumando usuarios con rol supervisor)
  const supervisorOptions = useMemo(() => {
    const map = new Map<string, { name: string; count: number }>();

    // Primero agregar supervisores registrados en AppUsers
    const appUsers = getAppUsers();
    for (const u of appUsers) {
      if (u.role === 'supervisor') {
        const key = normalizeSupName(u.name);
        if (!map.has(key)) {
          map.set(key, { name: u.name.trim(), count: 0 });
        }
      }
    }

    // Luego contar operadores asignados a cada supervisor
    for (const op of operators) {
      if (!op.active) continue;
      if (op.supervisor && op.supervisor.trim() && op.supervisor.trim() !== 'Sin Asignar') {
        const rawName = op.supervisor.trim();
        const key = normalizeSupName(rawName);
        const existing = map.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          map.set(key, { name: rawName, count: 1 });
        }
      }
    }

    return Array.from(map.values())
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .map(item => {
        const specialty = getSupervisorSpecialty(item.name);
        const specMeta = SPECIALTY_META[specialty] || SPECIALTY_META.todos;
        const shiftBadge = getSupervisorShiftBadge(item.name);
        return {
          ...item,
          specialty,
          specialtyLabel: specMeta.shortLabel,
          specialtyEmoji: specMeta.emoji,
          specialtyBadgeClass: specMeta.badgeClass,
          shiftBadge
        };
      });
  }, [operators]);

  // Manejador al elegir un supervisor: muestra su Grupo Oficial completo sin que el filtro de turno o área le esconda operadores
  const handleSelectSupervisor = (supervisorName: string) => {
    if (supervisorName === 'todos' || normalizeSupName(selectedSupervisor) === normalizeSupName(supervisorName)) {
      setSelectedSupervisor('todos');
      return;
    }

    const supOps = operators.filter(o => o.active && isOperatorInSupervisorGroup(o, supervisorName));
    const specialty = getSupervisorSpecialty(supervisorName);
    const specMeta = SPECIALTY_META[specialty] || SPECIALTY_META.todos;

    if (supOps.length > 0) {
      // Tiene grupo oficial asignado: mostrar el 100% de su grupo oficial limpiando filtros que bloqueen
      setSelectedSupervisor(supervisorName);
      setSelectedShiftId('todos');
      setSelectedGroup('todos');
      setSelectedArea('todas');
      showToast(`👤 Grupo Oficial de ${supervisorName}: ${supOps.length} operadores (${specMeta.emoji} ${specMeta.label})`);
    } else {
      // Si aún no tiene operadores asignados directamente a su nombre, mostrar su área de especialidad (ej: Despacho o Picking)
      setSelectedSupervisor(supervisorName);
      setSelectedShiftId('todos');
      if (specialty !== 'todos') {
        setSelectedGroup(specialty);
        showToast(`${specMeta.emoji} ${supervisorName}: mostrando área ${specMeta.label}. Usa "⚙️ Armar Grupo" para elegir tu nómina oficial.`);
      } else {
        setSelectedGroup('todos');
        showToast(`👤 ${supervisorName}: usa "⚙️ Armar Grupo" para marcar tus operadores oficiales.`);
      }
    }
  };

  // Manejador para elegir un Turno (T1, T2, T3) sin que un filtro de supervisor anterior deje la lista vacía
  const handleSelectShiftFilter = (shiftId: ShiftId | 'todos') => {
    setSelectedShiftId(shiftId);
    if (shiftId !== 'todos' && selectedSupervisor !== 'todos') {
      // Verificar si el supervisor actual tiene operadores en ese turno; si no, limpiar supervisor para ver todo el turno
      const hasOpsInShift = operators.some(
        o => o.active && isOperatorInSupervisorGroup(o, selectedSupervisor) && o.shiftId === shiftId
      );
      if (!hasOpsInShift) {
        setSelectedSupervisor('todos');
      }
    }
  };

  // Manejador para elegir un Área/Especialidad (Despacho, Picking, Grúas, Encajado...)
  const handleSelectSpecialtyFilter = (groupId: string) => {
    const nextGroup = selectedGroup === groupId ? 'todos' : groupId;
    setSelectedGroup(nextGroup);
    if (nextGroup !== 'todos' && selectedSupervisor !== 'todos') {
      // Limpiar filtro de supervisor individual para mostrar toda el área (ej. Todo Despacho o Todo Picking)
      setSelectedSupervisor('todos');
      const specMeta = SPECIALTY_META[nextGroup] || SPECIALTY_META.todos;
      showToast(`${specMeta.emoji} Mostrando dotación de ${specMeta.label}`);
    }
  };

  // ============================================================================
  // FUNCIONES DEL CONFIGURADOR VISUAL DE GRUPOS OFICIALES Y TURNOS (T1, T2, T3)
  // ============================================================================

  const openGroupBuilderForSupervisor = (supName?: string) => {
    const target = supName && supName !== 'todos'
      ? supName
      : (selectedSupervisor !== 'todos' ? selectedSupervisor : builderSupervisor);
    setBuilderSupervisor(target);
    setBuilderTab('supervisor');
    setBuilderSpecialtyFilter('auto');
    setBuilderOnlySelected(false);
    setBuilderSearch('');
    setShowGroupBuilderModal(true);
  };

  const openGroupBuilderForShift = (shiftId?: ShiftId) => {
    const target = shiftId || (selectedShiftId !== 'todos' ? selectedShiftId : builderShift);
    setBuilderShift(target);
    setBuilderTab('turnos');
    setBuilderSpecialtyFilter('todos');
    setBuilderOnlySelected(false);
    setBuilderSearch('');
    setShowGroupBuilderModal(true);
  };

  // Marcar / Desmarcar un operador como parte del Grupo Oficial del Supervisor
  const handleToggleOperatorInSupervisorGroup = (operator: OperatorItem, targetSupervisor: string) => {
    const currentlyInGroup = isOperatorInSupervisorGroup(operator, targetSupervisor);
    const updatedList = operators.map(op => {
      if (op.id !== operator.id) return op;
      return {
        ...op,
        supervisor: currentlyInGroup ? 'Sin Asignar' : targetSupervisor
      };
    });
    saveOperatorsBulk(updatedList);
    setOperators(updatedList);
  };

  // Asignar o quitar masivamente los operadores filtrados al Grupo Oficial del Supervisor
  const handleBulkToggleSupervisorGroup = (targetOps: OperatorItem[], targetSupervisor: string, include: boolean) => {
    const targetIds = new Set(targetOps.map(o => o.id));
    const updatedList = operators.map(op => {
      if (!targetIds.has(op.id)) return op;
      return {
        ...op,
        supervisor: include ? targetSupervisor : (isOperatorInSupervisorGroup(op, targetSupervisor) ? 'Sin Asignar' : op.supervisor)
      };
    });
    saveOperatorsBulk(updatedList);
    setOperators(updatedList);
    showToast(
      include
        ? `✅ ${targetOps.length} operadores integrados al grupo oficial de ${targetSupervisor}`
        : `⬜ Operadores removidos del grupo de ${targetSupervisor}`
    );
  };

  // Cambiar la especialidad oficial de un supervisor (ej. Despacho o Picking)
  const handleUpdateSupervisorSpecialty = (supervisorName: string, specialty: OperationalSpecialty) => {
    const appUsers = getAppUsers();
    const norm = normalizeSupName(supervisorName);
    const matchedUser = appUsers.find(
      u => normalizeSupName(u.name) === norm ||
           norm.includes(normalizeSupName(u.name)) ||
           normalizeSupName(u.name).includes(norm)
    );
    if (matchedUser) {
      saveAppUser({
        ...matchedUser,
        specialtyGroup: specialty,
        updatedAt: new Date().toISOString()
      });
    }
    setBuilderSpecialtyFilter(specialty);
    const specMeta = SPECIALTY_META[specialty] || SPECIALTY_META.todos;
    showToast(`${specMeta.emoji} Especialidad ${specMeta.label} asignada a ${supervisorName}`);
  };

  // Sincronizar todos los operadores del grupo oficial de un supervisor a un Turno (T1, T2 o T3)
  const handleSyncSupervisorGroupShift = (supervisorName: string, targetShift: ShiftId) => {
    let count = 0;
    const updatedList = operators.map(op => {
      if (isOperatorInSupervisorGroup(op, supervisorName)) {
        count++;
        return { ...op, shiftId: targetShift };
      }
      return op;
    });
    saveOperatorsBulk(updatedList);
    setOperators(updatedList);

    // También actualizar el turno preasignado del supervisor en AppUsers
    const appUsers = getAppUsers();
    const norm = normalizeSupName(supervisorName);
    const matchedUser = appUsers.find(
      u => normalizeSupName(u.name) === norm ||
           norm.includes(normalizeSupName(u.name)) ||
           normalizeSupName(u.name).includes(norm)
    );
    if (matchedUser) {
      saveAppUser({
        ...matchedUser,
        shiftId: targetShift,
        updatedAt: new Date().toISOString()
      });
    }

    const shiftLabel = targetShift === 'turno-1' ? 'Turno 1' : targetShift === 'turno-2' ? 'Turno 2' : 'Turno 3';
    showToast(`🕒 Grupo de ${supervisorName} (${count} op.) asignado oficialmente a ${shiftLabel}`);
  };

  // Cambiar el turno (T1, T2, T3) de un operador individual
  const handleAssignOperatorShift = (operatorId: string, targetShift: ShiftId) => {
    const updatedList = operators.map(op =>
      op.id === operatorId ? { ...op, shiftId: targetShift } : op
    );
    saveOperatorsBulk(updatedList);
    setOperators(updatedList);
  };

  // Asignar masivamente un grupo de operadores a un Turno (T1, T2 o T3)
  const handleBulkAssignShift = (targetOps: OperatorItem[], targetShift: ShiftId) => {
    const targetIds = new Set(targetOps.map(o => o.id));
    const updatedList = operators.map(op =>
      targetIds.has(op.id) ? { ...op, shiftId: targetShift } : op
    );
    saveOperatorsBulk(updatedList);
    setOperators(updatedList);
    const shiftLabel = targetShift === 'turno-1' ? 'Turno 1' : targetShift === 'turno-2' ? 'Turno 2' : 'Turno 3';
    showToast(`🕒 ${targetOps.length} operadores asignados a ${shiftLabel}`);
  };

  // Operational Groups list with counts
  const groupOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const op of operators) {
      if (!op.active) continue;
      const grp = getOperatorGroup(op);
      counts[grp.id] = (counts[grp.id] || 0) + 1;
    }
    const order = ['despacho', 'picking', 'gruas', 'encajado', 'transpaletas', 'repaletizado', 'patio', 'jefatura'];
    return order
      .filter(id => (counts[id] || 0) > 0)
      .map(id => ({
        ...OPERATIONAL_GROUPS[id],
        count: counts[id] || 0
      }));
  }, [operators]);

  // Conteo de operadores por Turno (T1, T2, T3)
  const shiftCounts = useMemo(() => {
    const counts: Record<string, number> = { 'turno-1': 0, 'turno-2': 0, 'turno-3': 0, todos: 0 };
    for (const op of operators) {
      if (!op.active) continue;
      counts.todos++;
      const s = op.shiftId || 'turno-1';
      counts[s] = (counts[s] || 0) + 1;
    }
    return counts;
  }, [operators]);

  // Filtered operators (sin choques entre Supervisor, Especialidad y Turno)
  const filteredOperators = useMemo(() => {
    return operators.filter(op => {
      if (!op.active) return false;

      // 1. Si hay un supervisor seleccionado:
      if (selectedSupervisor !== 'todos') {
        const supHasDirectMembers = operators.some(o => o.active && isOperatorInSupervisorGroup(o, selectedSupervisor));
        if (supHasDirectMembers) {
          if (!isOperatorInSupervisorGroup(op, selectedSupervisor)) return false;
        } else {
          // Si aún no tiene miembros directos, filtrar por su especialidad
          const spec = getSupervisorSpecialty(selectedSupervisor);
          if (spec !== 'todos' && getOperatorGroup(op).id !== spec) return false;
        }
      }

      // 2. Filtro de Turno (T1, T2, T3)
      if (selectedShiftId !== 'todos' && op.shiftId !== selectedShiftId) return false;

      // 3. Filtro de Grupo / Especialidad (Despacho, Picking, Grúas, Encajado...)
      if (selectedGroup !== 'todos') {
        const grp = getOperatorGroup(op);
        if (grp.id !== selectedGroup) return false;
      }

      // 4. Filtro de Área específica (opcional)
      if (selectedArea !== 'todas' && op.area !== selectedArea) return false;

      // 5. Búsqueda por texto
      if (search.trim()) {
        const q = normalizeSupName(search);
        const grp = getOperatorGroup(op);
        const matchesName = normalizeSupName(op.name).includes(q);
        const matchesRut = normalizeSupName(op.rut).includes(q);
        const matchesRole = normalizeSupName(op.role).includes(q);
        const matchesSupervisor = normalizeSupName(op.supervisor).includes(q);
        const matchesJefe = normalizeSupName(op.jefeTurno).includes(q);
        const matchesArea = normalizeSupName(op.area).includes(q);
        const matchesGroup = normalizeSupName(grp.name).includes(q) || normalizeSupName(grp.shortName).includes(q);
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

  // Global matrix stats (fully reactive to Supabase Cloud overrides)
  const matrixStats = useMemo(() => {
    let totalMarks = 0;
    let presentes = 0;
    let ausentes = 0;
    let vacaciones = 0;
    let licencias = 0;
    let permisos = 0;
    const monthPrefix = selectedMonth === 'todos' ? undefined : selectedMonth;

    for (const op of filteredOperators) {
      const opHist = HISTORICAL_ATTENDANCE_COMPACT[op.id] || {};
      const opOverrides = attendanceOverrides.filter(
        r => r.operatorId === op.id && (!monthPrefix || r.date.startsWith(monthPrefix))
      );

      const evaluatedDates = new Set<string>();
      for (const date of Object.keys(opHist)) {
        if (!monthPrefix || date.startsWith(monthPrefix)) evaluatedDates.add(date);
      }
      for (const ov of opOverrides) evaluatedDates.add(ov.date);

      for (const dt of evaluatedDates) {
        const ov = overridesMap.get(`${op.id}_${dt}`);
        const statusVal = ov ? (ov.status === 'sin_marcar' ? null : ov.status) : opHist[dt]?.[0];
        if (!statusVal) continue;
        totalMarks++;
        if (statusVal === 'presente') presentes++;
        else if (statusVal === 'ausente') ausentes++;
        else if (statusVal === 'vacaciones') vacaciones++;
        else if (statusVal === 'licencia') licencias++;
        else if (statusVal === 'justificada') permisos++;
      }
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
  }, [filteredOperators, selectedMonth, attendanceOverrides, overridesMap]);

  // Matrix dates to display based on selectedMonth
  const matrixDates = useMemo(() => {
    if (selectedMonth === 'todos') {
      // In "todos", show all dates
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

    // Dynamic fallback if month is not in static keys
    if (result.length === 0 && /^\d{4}-\d{2}$/.test(selectedMonth)) {
      const [yearStr, monthStr] = selectedMonth.split('-');
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      const daysInMonth = new Date(year, month, 0).getDate();
      const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      const mName = monthNames[month - 1] || 'mes';
      for (let d = 1; d <= daysInMonth; d++) {
        const dayPadded = String(d).padStart(2, '0');
        result.push({
          key: `${selectedMonth}-${dayPadded}`,
          header: `${dayPadded}-${mName}`
        });
      }
    }

    return result;
  }, [selectedMonth]);

  // 1-Click Status toggle in Daily View (click to select, click again to uncheck / desclickear)
  const handleStatusClick = (operator: OperatorItem, status: AttendanceStatus) => {
    if (!canManageAttendance) {
      showToast('⚠️ Permisos de solo lectura: Prevención no puede modificar asistencia');
      return;
    }

    const existingRec = recordMap.get(operator.id);
    const opShift = operator.shiftId || (selectedShiftId === 'todos' ? 'turno-1' : selectedShiftId);
    const shiftObj = SHIFT_OPTIONS.find(s => s.id === opShift) || SHIFT_OPTIONS[0];

    // Si ya está marcado con este mismo estado -> DESCLICKEAR / DESMARCAR (TOGGLE OFF)
    if (existingRec && existingRec.status === status) {
      unmarkAttendance(operator.id, selectedDate);
      loadData();
      showToast(`↩️ ${operator.name}: desmarcado (vuelto a pendiente)`);
      return;
    }

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
    if (!canManageAttendance) {
      showToast('⚠️ Permisos de solo lectura: Prevención no puede editar observaciones');
      return;
    }
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
    if (!canManageAttendance) {
      showToast('⚠️ Permisos de solo lectura: Prevención no puede modificar asistencia');
      return;
    }
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
    if (!canManageAttendance) {
      showToast('⚠️ Permisos de solo lectura: Prevención no puede editar colaboradores');
      return;
    }
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
    if (!canManageAttendance) {
      showToast('⚠️ Permisos de solo lectura: Prevención no puede eliminar colaboradores');
      return;
    }
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

      {/* Read-Only Notice for Prevención SSO */}
      {!canManageAttendance && (
        <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-950 shadow-xs mb-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-xs">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-amber-950 flex items-center gap-2">
                <span>Modo de Consulta • Prevención de Riesgos SSO</span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                  Solo Lectura
                </span>
              </p>
              <p className="text-xs text-amber-900/90 font-medium mt-0.5">
                Tienes permisos para auditar la dotación y reportes históricos de asistencia. Las modificaciones al pase de lista y dotación están reservadas para Jefatura y Supervisores.
              </p>
            </div>
          </div>
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
                Asistencia
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
                Historial
              </button>
            </div>

            {viewMode === 'diario' ? (
              <>
                {canManageAttendance && (
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
                      onClick={handleManualSync}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm border border-emerald-400 shadow-md shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer"
                      title="Guardar y asegurar persistencia en Supabase Cloud"
                    >
                      <CloudUpload className="w-4 h-4 text-white" />
                      Guardar en Cloud
                    </button>

                    {/* Botón Foto Evidencia del Equipo de Turno */}
                    <button
                      type="button"
                      onClick={() => setShowTeamPhotoModal(true)}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm border transition-all active:scale-95 cursor-pointer shadow-md ${
                        shiftTeamPhoto
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20'
                          : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm'
                      }`}
                      title="Tomar o ver la foto de evidencia del equipo para este turno"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{shiftTeamPhoto ? '📸 Foto Equipo (1)' : '📸 Foto Equipo'}</span>
                    </button>
                  </>
                )}

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

      {/* =====================================================================
          PANEL SIMPLIFICADO DE TOMA DE LISTA: GRUPOS OFICIALES, ÁREAS Y TURNOS
         ===================================================================== */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-4">
        
        {/* FILA 1: FECHA/MES + BUSCADOR RÁPIDO + BOTÓN "ARMAR GRUPOS Y TURNOS" */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3.5">
          
          {/* Selector de Fecha o Mes */}
          <div className="w-full lg:w-64 shrink-0">
            {viewMode === 'diario' ? (
              <div>
                <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Fecha de Toma de Lista
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedDate(todayStr)}
                    className={`px-3 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                      selectedDate === todayStr 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                    }`}
                  >
                    Hoy
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CalendarRange className="w-3.5 h-3.5 text-emerald-600" />
                  Mes en Matriz
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                >
                  {MONTH_TABS.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Buscador Instantáneo */}
          <div className="flex-1">
            <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              Buscar Operador (Nombre, RUT o Cargo)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Escribe nombre, apellido, RUT, Despacho, Picking..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Botones de Configuración de Grupos Oficiales y Turnos */}
          {canManageAttendance && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => openGroupBuilderForSupervisor()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md shadow-indigo-600/20 transition-all active:scale-95 cursor-pointer"
                title="Elegir qué operadores son parte del Grupo Oficial de cada Supervisor o de Turno 1, 2 y 3"
              >
                <Settings className="w-4 h-4" />
                <span>⚙️ Armar Mi Grupo / Turnos</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  showAdvancedFilters
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Mostrar u ocultar selectores adicionales"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showAdvancedFilters ? 'Ocultar filtros' : 'Más filtros'}</span>
              </button>
            </div>
          )}
        </div>

        {/* FILA 2: SELECCIÓN DE SUPERVISOR (GRUPO OFICIAL + ESPECIALIDAD DESPACHO / PICKING) */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>1. Elegir Supervisor (Muestra su Grupo Oficial directo):</span>
            </span>
            {currentUser && (currentUser.assignedSupervisorName || currentUser.role === 'supervisor') && (
              <button
                type="button"
                onClick={() => {
                  const targetSup = currentUser.assignedSupervisorName && currentUser.assignedSupervisorName !== 'todos'
                    ? currentUser.assignedSupervisorName
                    : currentUser.name;
                  handleSelectSupervisor(targetSup);
                }}
                className="text-[11px] font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-2.5 py-0.5 rounded-lg transition cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Ir a Mi Grupo ({currentUser.name.split(' ')[0]})</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            <button
              type="button"
              onClick={() => {
                setSelectedSupervisor('todos');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer border ${
                selectedSupervisor === 'todos'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              Todos ({operators.filter(o => o.active).length})
            </button>

            {supervisorOptions.map(s => {
              const isSelected = normalizeSupName(selectedSupervisor) === normalizeSupName(s.name);
              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => handleSelectSupervisor(s.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300 font-black'
                      : 'bg-indigo-50/60 text-indigo-950 hover:bg-indigo-100 border-indigo-200'
                  }`}
                  title={`Ver Grupo Oficial de ${s.name} (${s.specialtyEmoji} ${s.specialtyLabel})`}
                >
                  <span>{s.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : s.specialtyBadgeClass
                  }`}>
                    {s.specialtyEmoji} {s.specialtyLabel}
                  </span>
                  {s.shiftBadge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {s.shiftBadge}
                    </span>
                  )}
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                    isSelected ? 'bg-indigo-900 text-white' : 'bg-indigo-200/80 text-indigo-900'
                  }`}>
                    {s.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* BARRA CONTEXTUAL CUANDO HAY UN SUPERVISOR SELECCIONADO (EJ: DESPACHO PARA WALTER, PICKING PARA CLAUDIO) */}
          {selectedSupervisor !== 'todos' && (() => {
            const supSpec = getSupervisorSpecialty(selectedSupervisor);
            const specMeta = SPECIALTY_META[supSpec] || SPECIALTY_META.todos;
            const supGroupCount = operators.filter(o => o.active && isOperatorInSupervisorGroup(o, selectedSupervisor)).length;
            const totalSpecCount = supSpec !== 'todos'
              ? operators.filter(o => o.active && getOperatorGroup(o).id === supSpec).length
              : operators.filter(o => o.active).length;

            return (
              <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-r from-indigo-50 via-slate-50 to-emerald-50 border border-indigo-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-black text-indigo-950">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    <span>Grupo Oficial de {selectedSupervisor}:</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-mono">
                      {supGroupCount} operadores
                    </span>
                  </span>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border font-bold ${specMeta.badgeClass}`}>
                    <span>Especialidad: {specMeta.emoji} {specMeta.label}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {supSpec !== 'todos' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSupervisor('todos');
                        setSelectedGroup(supSpec);
                        setSelectedShiftId('todos');
                        showToast(`${specMeta.emoji} Mostrando los ${totalSpecCount} operadores del área ${specMeta.label}`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold transition cursor-pointer shadow-2xs"
                      title={`Ver todos los operadores de ${specMeta.label} del CD`}
                    >
                      {specMeta.emoji} Ver Todo {specMeta.label} ({totalSpecCount})
                    </button>
                  )}

                  {canManageAttendance && (
                    <button
                      type="button"
                      onClick={() => openGroupBuilderForSupervisor(selectedSupervisor)}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-black transition cursor-pointer shadow-xs flex items-center gap-1"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Elegir quién es parte del grupo de {selectedSupervisor.split(' ')[0]}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* FILA 3: FILTRO RÁPIDO POR TURNO (T1, T2, T3) Y POR ÁREA DE INTERÉS (DESPACHO, PICKING, GRÚAS...) */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-3">
          
          {/* Bloque A: Turno 1, Turno 2, Turno 3 */}
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Turno:</span>
              </span>

              {[
                { id: 'todos', label: `Todos (${shiftCounts.todos})` },
                { id: 'turno-1', label: `Turno 1 (${shiftCounts['turno-1']})` },
                { id: 'turno-2', label: `Turno 2 (${shiftCounts['turno-2']})` },
                { id: 'turno-3', label: `Turno 3 (${shiftCounts['turno-3']})` }
              ].map(t => {
                const isActive = selectedShiftId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectShiftFilter(t.id as ShiftId | 'todos')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs font-black'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {canManageAttendance && (
              <button
                type="button"
                onClick={() => openGroupBuilderForShift(selectedShiftId !== 'todos' ? selectedShiftId : 'turno-1')}
                className="text-[11px] font-black text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 hover:bg-emerald-200 px-2.5 py-1 rounded-lg border border-emerald-300 transition cursor-pointer shrink-0"
                title="Elegir qué operador es parte del Turno 1, Turno 2 o Turno 3"
              >
                ✏️ Asignar Turnos
              </button>
            )}
          </div>

          {/* Bloque B: Especialidad / Área Operativa (Despacho, Picking, Grúas, Encajado) */}
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
            <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>3. Área:</span>
            </span>

            <button
              type="button"
              onClick={() => setSelectedGroup('todos')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                selectedGroup === 'todos'
                  ? 'bg-slate-800 text-white border-slate-800 shadow-xs font-black'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Todas
            </button>

            {groupOptions.map(g => {
              const specMeta = SPECIALTY_META[g.id] || SPECIALTY_META.todos;
              const isSelected = selectedGroup === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleSelectSpecialtyFilter(g.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer border ${
                    isSelected
                      ? `${g.pillActiveClass} ring-2 ring-emerald-300 font-black`
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <span>{specMeta.emoji} {g.shortName}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    isSelected ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {g.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* FILTROS AVANZADOS COLAPSABLES (SOLO SI EL USUARIO PULSA "MÁS FILTROS") */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Filtrar Sub-Área</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="todas">Todas las Sub-Áreas</option>
                {areas.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Supervisor (Lista)</label>
              <select
                value={selectedSupervisor}
                onChange={(e) => handleSelectSupervisor(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="todos">Todos los Supervisores</option>
                {supervisorOptions.map(s => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.specialtyEmoji} {s.specialtyLabel} • {s.count})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Grupo Operativo</label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="todos">Todos los Grupos</option>
                {groupOptions.map(g => (
                  <option key={g.id} value={g.id}>{g.name} ({g.count})</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* RESUMEN DE FILTROS ACTIVOS Y BOTÓN DE LIMPIEZA RÁPIDA */}
        {(selectedSupervisor !== 'todos' || selectedGroup !== 'todos' || selectedShiftId !== 'todos' || selectedArea !== 'todas' || search.trim() !== '') && (
          <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-500">Viendo ahora ({filteredOperators.length} operadores):</span>
              {selectedSupervisor !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-900 font-bold border border-indigo-200">
                  👤 Grupo de {selectedSupervisor}
                  <button onClick={() => setSelectedSupervisor('todos')} className="hover:text-indigo-950 font-black ml-1 cursor-pointer">✕</button>
                </span>
              )}
              {selectedGroup !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold border border-emerald-200">
                  {SPECIALTY_META[selectedGroup]?.emoji || '📦'} Área: {OPERATIONAL_GROUPS[selectedGroup]?.shortName || selectedGroup}
                  <button onClick={() => setSelectedGroup('todos')} className="hover:text-emerald-950 font-black ml-1 cursor-pointer">✕</button>
                </span>
              )}
              {selectedShiftId !== 'todos' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold border border-amber-200">
                  🕒 {SHIFT_OPTIONS.find(s => s.id === selectedShiftId)?.name.split(' (')[0]}
                  <button onClick={() => setSelectedShiftId('todos')} className="hover:text-amber-950 font-black ml-1 cursor-pointer">✕</button>
                </span>
              )}
              {selectedArea !== 'todas' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800 font-bold border border-slate-300">
                  📍 {selectedArea}
                  <button onClick={() => setSelectedArea('todas')} className="hover:text-slate-950 font-black ml-1 cursor-pointer">✕</button>
                </span>
              )}
              {search.trim() && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800 font-bold">
                  🔍 "{search}"
                  <button onClick={() => setSearch('')} className="hover:text-slate-950 font-black ml-1 cursor-pointer">✕</button>
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
              Ver todos los operadores (102)
            </button>
          </div>
        )}

        {/* Quick Shift summary pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">Responsable:</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono font-bold">
                {currentUserEmail}
              </span>
            </div>

            {/* Cloud Persistence Badge & Manual Sync Button */}
            <button
              type="button"
              onClick={handleManualSync}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                syncStatus === 'synced'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : syncStatus === 'syncing'
                  ? 'bg-amber-50 text-amber-800 border border-amber-300'
                  : 'bg-rose-50 text-rose-800 border border-rose-300'
              }`}
              title="Persistencia en Supabase Cloud. Clic para forzar sincronización manual."
            >
              {syncStatus === 'synced' ? (
                <>
                  <CloudCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cloud Conectado</span>
                  {lastSyncTime && <span className="text-[10px] text-emerald-600 font-normal">({lastSyncTime})</span>}
                </>
              ) : syncStatus === 'syncing' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span>Sincronizando Nube...</span>
                </>
              ) : (
                <>
                  <CloudAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Caché Local (Offline)</span>
                </>
              )}
            </button>
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

                          {/* Edit & Delete Operator (Hidden for Prevención SSO) */}
                          {canManageAttendance && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleEditOperator(operator)}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all text-xs"
                                title="Editar datos del colaborador"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteOperator(operator)}
                                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all text-xs"
                                title="Eliminar de la nómina"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}

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

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollToToday}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs transition-all text-xs cursor-pointer active:scale-95"
                title={`Desplazarse a la columna de hoy (${todayHeaderLabel})`}
              >
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>📍 Ir a Hoy ({todayHeaderLabel})</span>
              </button>

              <button
                onClick={exportFullAttendanceMatrixCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-300 shadow-xs transition-all text-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                Descargar Matriz CSV
              </button>
            </div>
          </div>

          {/* Matrix Scrollable Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div ref={matrixTableContainerRef} className="overflow-x-auto max-h-[700px] overflow-y-auto scrollbar-thin">
              <table className="w-full text-left border-collapse text-xs">
                
                {/* Header */}
                <thead className="bg-slate-100 sticky top-0 z-30 border-b border-slate-200 shadow-xs">
                  <tr>
                    {/* Fixed Col 1: # */}
                    <th className="w-[52px] min-w-[52px] max-w-[52px] px-2 py-3 font-black text-slate-700 text-center sticky left-0 bg-slate-100 z-40 border-r border-slate-200">
                      #
                    </th>

                    {/* Fixed Col 2: Colaborador / RUT */}
                    <th className="w-[280px] min-w-[280px] max-w-[280px] px-3.5 py-3 font-black text-slate-800 text-left sticky left-[52px] bg-slate-100 z-40 border-r-2 border-slate-300 shadow-[4px_0_12px_-2px_rgba(0,0,0,0.12)]">
                      Colaborador / Identificación
                    </th>

                    <th className="p-3 font-black text-indigo-900 min-w-[160px] bg-indigo-50/70 border-r border-indigo-100">
                      Supervisor a Cargo
                    </th>
                    <th className="p-3 font-black text-slate-700 min-w-[180px]">
                      Grupo Operativo & Cargo
                    </th>
                    <th className="p-3 font-black text-emerald-800 text-center min-w-[85px] bg-emerald-50/80">
                      % Adh.
                    </th>
                    <th className="p-2 font-bold text-slate-600 text-center w-10 bg-slate-50" title="Días Presente">
                      P
                    </th>
                    <th className="p-2 font-bold text-teal-700 text-center w-10 bg-teal-50/50" title="Días Vacaciones">
                      V
                    </th>
                    <th className="p-2 font-bold text-purple-700 text-center w-10 bg-purple-50/50" title="Días Licencia">
                      L
                    </th>
                    <th className="p-2 font-bold text-rose-700 text-center w-10 bg-rose-50/50 border-r border-slate-200" title="Días Ausente">
                      A
                    </th>
                    
                    {/* Dynamic Date Headers - Two-line Stacked Design (No cutoffs) */}
                    {matrixDates.map(d => {
                      const isToday = d.key === todayStr;
                      const parts = d.header.split('-');
                      const dayNum = parts[0] || d.header;
                      const monthName = parts[1] || (d.key ? d.key.slice(5, 7) : 'MES');

                      return (
                        <th 
                          key={d.key} 
                          ref={isToday ? todayHeaderRef : undefined}
                          className={`p-1 text-center min-w-[46px] max-w-[46px] border-l transition-all whitespace-nowrap ${
                            isToday 
                              ? 'bg-emerald-600 text-white font-black border-emerald-500 shadow-md ring-2 ring-emerald-400 z-10' 
                              : 'font-bold text-slate-600 border-slate-200/60 hover:bg-slate-200/70'
                          }`}
                          title={`${d.key}${isToday ? ' (HOY - Fecha Actual)' : ''}`}
                        >
                          {isToday && (
                            <span className="inline-block text-[8px] uppercase tracking-wider bg-white text-emerald-800 rounded px-1 font-black mb-0.5 leading-tight">
                              HOY
                            </span>
                          )}
                          <div className="flex flex-col items-center justify-center leading-none py-0.5">
                            <span className={`text-xs ${isToday ? 'font-black text-white' : 'font-extrabold text-slate-800'}`}>
                              {dayNum}
                            </span>
                            <span className={`text-[9px] uppercase tracking-wider font-semibold mt-0.5 ${isToday ? 'text-emerald-100' : 'text-slate-400'}`}>
                              {monthName}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-slate-100">
                  {filteredOperators.map((operator, opIdx) => {
                    const opHist = HISTORICAL_ATTENDANCE_COMPACT[operator.id] || {};
                    // Calculate stats combining historical base + active localStorage overrides
                    const st = (() => {
                      const base = getOperatorStats(operator.id, selectedMonth === 'todos' ? undefined : selectedMonth);
                      const monthPrefix = selectedMonth === 'todos' ? undefined : selectedMonth;
                      const opOverrides = attendanceOverrides.filter(
                        r => r.operatorId === operator.id && (!monthPrefix || r.date.startsWith(monthPrefix))
                      );
                      if (opOverrides.length === 0) return base;

                      const evaluatedDates = new Set<string>();
                      for (const date of Object.keys(opHist)) {
                        if (!monthPrefix || date.startsWith(monthPrefix)) evaluatedDates.add(date);
                      }
                      for (const ov of opOverrides) evaluatedDates.add(ov.date);

                      let totalEvaluated = 0;
                      let presentes = 0;
                      let ausencias = 0;
                      let vacaciones = 0;
                      let licencias = 0;
                      let permisos = 0;

                      for (const dt of evaluatedDates) {
                        const ov = overridesMap.get(`${operator.id}_${dt}`);
                        const statusVal = ov ? ov.status : opHist[dt]?.[0];
                        if (!statusVal) continue;
                        totalEvaluated++;
                        if (statusVal === 'presente') presentes++;
                        else if (statusVal === 'ausente') ausencias++;
                        else if (statusVal === 'vacaciones') vacaciones++;
                        else if (statusVal === 'licencia') licencias++;
                        else if (statusVal === 'justificada') permisos++;
                      }
                      const adherencia = totalEvaluated > 0 ? Math.round((presentes / totalEvaluated) * 100) : 0;
                      return { totalEvaluated, presentes, ausencias, vacaciones, licencias, permisos, adherencia };
                    })();

                    const grp = getOperatorGroup(operator);

                    return (
                      <tr key={operator.id} className="hover:bg-slate-50/80 transition-all group">
                        
                        {/* Fixed Col 1: Index (#) */}
                        <td className="w-[52px] min-w-[52px] max-w-[52px] px-2 py-3 font-bold text-slate-400 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-20 border-r border-slate-200">
                          {opIdx + 1}
                        </td>

                        {/* Fixed Col 2: Colaborador / RUT / Supervisor Badge (No overlap, solid white, beautiful card layout) */}
                        <td className="w-[280px] min-w-[280px] max-w-[280px] px-3.5 py-2.5 sticky left-[52px] bg-white group-hover:bg-slate-50 z-20 border-r-2 border-slate-300 shadow-[4px_0_12px_-2px_rgba(0,0,0,0.12)]">
                          <div className="flex items-center gap-2.5">
                            {/* Avatar with initials */}
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                              {operator.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>

                            <div className="min-w-0 flex-1">
                              {/* Full Name: Crisp, bold, no awkward line-breaks */}
                              <div className="font-bold text-slate-900 text-xs leading-snug truncate" title={operator.name}>
                                {operator.name}
                              </div>

                              {/* Badges row: RUT + Supervisor pill */}
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {operator.rut && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                                    {operator.rut}
                                  </span>
                                )}
                                {operator.supervisor && (
                                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200/80 truncate max-w-[125px]" title={`Supervisor: ${operator.supervisor}`}>
                                    👤 {operator.supervisor.split(' ')[0]} {operator.supervisor.split(' ')[1] || ''}
                                  </span>
                                )}
                              </div>
                            </div>
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

                        {/* Daily Cells (Interactive & Editable) */}
                        {matrixDates.map(d => {
                          const override = overridesMap.get(`${operator.id}_${d.key}`);
                          const tuple = opHist[d.key];
                          const status = override ? (override.status === 'sin_marcar' ? null : override.status) : (tuple ? tuple[0] : null);
                          const notes = override ? override.notes : (tuple && tuple.length > 1 ? tuple[1] : undefined);
                          const cfg = status ? STATUS_CONFIG[status] : null;
                          const isToday = d.key === todayStr;
                          const tooltip = `${operator.name} • ${d.key}${isToday ? ' (HOY)' : ''}: ${cfg?.label || 'Día Libre / Sin marcar'}${notes ? ` (${notes})` : ''} - Clic para modificar o asignar vacaciones/licencia`;

                          return (
                            <td 
                              key={d.key} 
                              onClick={() => handleOpenMatrixEditModal(operator, d.key)}
                              className={`p-1 text-center border-l border-slate-100 transition-all cursor-pointer hover:bg-emerald-100/70 ${
                                isToday ? 'bg-emerald-50/80 font-black border-x-2 border-emerald-400' : ''
                              }`} 
                              title={tooltip}
                            >
                              <button
                                type="button"
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[10px] font-black transition-all hover:scale-115 hover:shadow-md cursor-pointer ${
                                  cfg 
                                    ? `${cfg.matrixClass} ${override ? 'ring-2 ring-indigo-500 shadow-xs' : ''}` 
                                    : 'bg-slate-100/70 text-slate-400 hover:bg-slate-200 hover:text-slate-800 border border-slate-200'
                                }`}
                              >
                                {cfg ? cfg.code : '—'}
                              </button>
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
                    <option value="turno-1">Turno 1</option>
                    <option value="turno-2">Turno 2</option>
                    <option value="turno-3">Turno 3</option>
                  </select>
                </div>

                <PredictiveLeaderInput
                  label="Supervisor a Cargo"
                  placeholder="Ej: Cristian Hernandez / Walter Sánchez"
                  value={formSupervisor}
                  onChange={setFormSupervisor}
                  filterRole="all"
                />

                <PredictiveLeaderInput
                  label="Jefe Turno"
                  placeholder="Ej: Euro Velásquez / Carlos Venegas"
                  value={formJefeTurno}
                  onChange={setFormJefeTurno}
                  filterRole="all"
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

      {/* Modal: Asignar Asistencia / Vacaciones / Licencias por N Días */}
      {matrixEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white font-black flex items-center justify-center text-sm shadow-sm">
                  {matrixEditModal.operator.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Asignar Novedad de Asistencia
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <strong className="text-slate-800">{matrixEditModal.operator.name}</strong>
                    {matrixEditModal.operator.rut && (
                      <span className="font-mono bg-slate-100 px-1.5 py-0.2 rounded text-[11px]">
                        {matrixEditModal.operator.rut}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-indigo-700 font-semibold mt-0.5 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-indigo-600" />
                    Sup: {matrixEditModal.operator.supervisor || 'N/A'} • {matrixEditModal.operator.role}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMatrixEditModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMatrixEdit} className="space-y-4 mt-4">
              
              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Seleccionar Estado / Novedad:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  
                  {/* Vacaciones */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalStatus('vacaciones');
                      if (!modalIsRange) handleQuickDaysSelect(7);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      modalStatus === 'vacaciones'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-400'
                        : 'bg-teal-50/70 text-teal-800 border-teal-200 hover:bg-teal-100'
                    }`}
                  >
                    <Palmtree className="w-4 h-4" />
                    <span>Vacaciones (V)</span>
                  </button>

                  {/* Licencia */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalStatus('licencia');
                      if (!modalIsRange) handleQuickDaysSelect(7);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      modalStatus === 'licencia'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-400'
                        : 'bg-purple-50/70 text-purple-800 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Licencia (L)</span>
                  </button>

                  {/* Presente */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalStatus('presente');
                      setModalIsRange(false);
                      setModalDaysCount(1);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      modalStatus === 'presente'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                        : 'bg-emerald-50/70 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Presente (P)</span>
                  </button>

                  {/* Tarde */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalStatus('tarde');
                      setModalIsRange(false);
                      setModalDaysCount(1);
                      if (!modalArrivalTime) setModalArrivalTime('07:15');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      modalStatus === 'tarde'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-300'
                        : 'bg-amber-50/70 text-amber-800 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Atraso (T)</span>
                  </button>

                  {/* Ausente */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalStatus('ausente');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      modalStatus === 'ausente'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-400'
                        : 'bg-rose-50/70 text-rose-800 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Ausente (A)</span>
                  </button>

                  {/* Permiso */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalStatus('justificada');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                      modalStatus === 'justificada'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-400'
                        : 'bg-sky-50/70 text-sky-800 border-sky-200 hover:bg-sky-100'
                    }`}
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Permiso (J)</span>
                  </button>

                </div>
              </div>

              {/* Time of Arrival (if Tarde) */}
              {modalStatus === 'tarde' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hora de Llegada Efectiva
                  </label>
                  <input
                    type="time"
                    required
                    value={modalArrivalTime}
                    onChange={(e) => setModalArrivalTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              )}

              {/* Period / Days Duration Selector */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Período / Duración de Días
                  </label>
                  <div className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {modalDaysCount} {modalDaysCount === 1 ? 'Día' : 'Días consecutivos'}
                  </div>
                </div>

                {/* Quick Days Pill Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Rápido:</span>
                  {[1, 3, 5, 7, 10, 15, 30].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleQuickDaysSelect(d)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        modalDaysCount === d
                          ? 'bg-slate-900 text-white shadow-xs font-black ring-2 ring-slate-600'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {d === 1 ? '1 día' : d === 7 ? '1 sem (7d)' : d === 15 ? '15d (quincena)' : d === 30 ? '30d (mes)' : `${d} días`}
                    </button>
                  ))}
                </div>

                {/* Date Inputs */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Fecha Desde
                    </label>
                    <input
                      type="date"
                      value={modalStartDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Fecha Hasta
                    </label>
                    <input
                      type="date"
                      value={modalEndDate}
                      onChange={(e) => handleEndDateChange(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span>
                    Asignando <strong>{modalDaysCount} día(s)</strong> de <strong className="text-emerald-700">{STATUS_CONFIG[modalStatus].label}</strong>
                  </span>
                  <span className="font-mono text-slate-500">
                    {modalStartDate} → {modalEndDate}
                  </span>
                </div>
              </div>

              {/* Notes / Reason */}
              <PredictiveTextarea
                label="Observaciones / N° Folio Licencia (Opcional)"
                context="attendanceNotes"
                rows={2}
                placeholder="Ej: Feriado legal anual aprobado / Licencia médica FONASA..."
                value={modalNotes}
                onChange={setModalNotes}
              />

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                <div>
                  {matrixEditModal.isOverride && (
                    <button
                      type="button"
                      onClick={handleRemoveMatrixOverride}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                    >
                      Restablecer día original
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMatrixEditModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30 cursor-pointer transition-all active:scale-95"
                  >
                    Guardar en Nómina
                  </button>
                </div>
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

              <PredictiveTextarea
                label="Observación / Justificación (Opcional)"
                context="attendanceNotes"
                rows={2}
                placeholder="Ej: Licencia médica extendida / Permiso administrativo / Vacaciones autorizadas..."
                value={noteText}
                onChange={setNoteText}
              />

              <datalist id="supervisor-datalist-opts">
                {supervisorOptions.map(s => (
                  <option key={s.name} value={s.name} />
                ))}
              </datalist>

              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                {noteModalData?.record ? (
                  <button
                    type="button"
                    onClick={() => {
                      unmarkAttendance(noteModalData.operator.id, selectedDate);
                      loadData();
                      setNoteModalData(null);
                      showToast(`↩️ ${noteModalData.operator.name}: asistencia desmarcada`);
                    }}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer"
                  >
                    Desmarcar Asistencia
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setNoteModalData(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30 cursor-pointer"
                  >
                    Guardar Detalle
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRO FOTOGRÁFICO DEL EQUIPO DE TURNO */}
      {showTeamPhotoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowTeamPhotoModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-base font-black">Evidencia Fotográfica del Equipo</h3>
                  <p className="text-xs text-emerald-200">
                    {selectedDate} • {currentShift.name.split(' (')[0]}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowTeamPhotoModal(false)}
                className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Resumen del Turno */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Dotación Presente Registrada:</span>
                  <span className="font-black text-slate-900 text-sm">{kpis.presentes} Colaboradores</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-semibold block">Turno:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg">
                    {currentShift.name.split(' (')[0]}
                  </span>
                </div>
              </div>

              {/* Foto si ya existe */}
              {shiftTeamPhoto ? (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 bg-slate-900 shadow-md">
                    <img 
                      src={shiftTeamPhoto.photoUrl} 
                      alt="Foto del equipo" 
                      className="w-full max-h-72 object-contain mx-auto"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[11px] p-2 rounded-xl flex items-center justify-between">
                      <span>📸 Tomada: {new Date(shiftTeamPhoto.takenAt).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })} hrs</span>
                      {shiftTeamPhoto.photoSizeKb && (
                        <span className="font-mono text-emerald-300 font-bold">{shiftTeamPhoto.photoSizeKb} KB</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Esta fotografía ya está vinculada a la asistencia y a la charla de seguridad SSO de este turno.</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleDeleteTeamPhoto}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar Foto</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <label className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-slate-600" />
                        <span>Tomar Otra</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleTeamPhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowTeamPhotoModal(false)}
                        className="px-5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
                      >
                        Listo
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-emerald-300 rounded-3xl p-6 text-center bg-emerald-50/40 space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                      <Camera className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">
                        Tomar Foto a la Dotación del Turno
                      </h4>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1 leading-relaxed">
                        Reúne al equipo frente a Zona Verde y captura la evidencia del inicio de turno. Quedará vinculada a la asistencia y a la charla de seguridad.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/20 cursor-pointer transition active:scale-95">
                        <Camera className="w-4 h-4" />
                        <span>{uploadingPhoto ? 'Procesando...' : 'Abrir Cámara del Celular'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleTeamPhotoUpload}
                          disabled={uploadingPhoto}
                          className="hidden"
                        />
                      </label>

                      <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs cursor-pointer transition active:scale-95">
                        <ImageIcon className="w-4 h-4 text-slate-500" />
                        <span>Subir desde Galería</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleTeamPhotoUpload}
                          disabled={uploadingPhoto}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center font-medium">
                    ⚡ La foto se comprime automáticamente (&lt;80 KB) para máxima rapidez y bajo consumo de datos móviles.
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowTeamPhotoModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL CONFIGURADOR VISUAL: ARMAR GRUPOS OFICIALES Y TURNOS (T1, T2, T3)
         ===================================================================== */}
      {showGroupBuilderModal && (() => {
        const currentSupSpec = getSupervisorSpecialty(builderSupervisor);
        const effectiveSpecFilter = builderSpecialtyFilter === 'auto' ? currentSupSpec : builderSpecialtyFilter;
        const supSpecMeta = SPECIALTY_META[currentSupSpec] || SPECIALTY_META.todos;

        // Operadores filtrados para el checklist del modal
        const builderFilteredOperators = operators
          .filter(op => {
            if (!op.active) return false;

            if (builderTab === 'supervisor') {
              const inSupGroup = isOperatorInSupervisorGroup(op, builderSupervisor);
              if (builderOnlySelected && !inSupGroup) return false;
              if (!builderOnlySelected && effectiveSpecFilter !== 'todos') {
                const grpId = getOperatorGroup(op).id;
                // Mostrar si es de la especialidad o si ya pertenece al grupo del supervisor
                if (grpId !== effectiveSpecFilter && !inSupGroup) return false;
              }
            } else {
              const inShift = (op.shiftId || 'turno-1') === builderShift;
              if (builderOnlySelected && !inShift) return false;
              if (effectiveSpecFilter !== 'todos') {
                const grpId = getOperatorGroup(op).id;
                if (grpId !== effectiveSpecFilter) return false;
              }
            }

            if (builderSearch.trim()) {
              const q = normalizeSupName(builderSearch);
              const grp = getOperatorGroup(op);
              const matches =
                normalizeSupName(op.name).includes(q) ||
                normalizeSupName(op.rut).includes(q) ||
                normalizeSupName(op.role).includes(q) ||
                normalizeSupName(op.supervisor).includes(q) ||
                normalizeSupName(grp.shortName).includes(q);
              if (!matches) return false;
            }

            return true;
          })
          .sort((a, b) => {
            if (builderTab === 'supervisor') {
              const aIn = isOperatorInSupervisorGroup(a, builderSupervisor) ? 1 : 0;
              const bIn = isOperatorInSupervisorGroup(b, builderSupervisor) ? 1 : 0;
              if (aIn !== bIn) return bIn - aIn;
            } else {
              const aIn = (a.shiftId || 'turno-1') === builderShift ? 1 : 0;
              const bIn = (b.shiftId || 'turno-1') === builderShift ? 1 : 0;
              if (aIn !== bIn) return bIn - aIn;
            }
            return a.name.localeCompare(b.name);
          });

        const supOfficialCount = operators.filter(o => o.active && isOperatorInSupervisorGroup(o, builderSupervisor)).length;
        const shiftOfficialCount = operators.filter(o => o.active && (o.shiftId || 'turno-1') === builderShift).length;

        return (
          <div
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
            onClick={() => setShowGroupBuilderModal(false)}
          >
            <div
              className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 text-white p-5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black">
                      Configurar Grupos Oficiales y Turnos (T1, T2, T3)
                    </h3>
                    <p className="text-xs text-slate-300">
                      Elige qué operador es parte del Grupo Oficial de cada Supervisor (Despacho, Picking, etc.) y de cada Turno
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGroupBuilderModal(false)}
                  className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pestañas Superiores del Configurador */}
              <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setBuilderTab('supervisor');
                    setBuilderSpecialtyFilter('auto');
                    setBuilderOnlySelected(false);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    builderTab === 'supervisor'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>1. Armar Grupo Oficial de Supervisor</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setBuilderTab('turnos');
                    setBuilderSpecialtyFilter('todos');
                    setBuilderOnlySelected(false);
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    builderTab === 'turnos'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>2. Elegir Operadores de Turno 1, 2 y 3</span>
                </button>
              </div>

              {/* Controles de Selección según Pestaña Activa */}
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-3.5 shrink-0">
                {builderTab === 'supervisor' ? (
                  <>
                    {/* Selector de Supervisor a Configurar */}
                    <div>
                      <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                        A. Selecciona el Supervisor para armar su Grupo Oficial:
                      </label>
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                        {supervisorOptions.map(s => {
                          const isSelected = normalizeSupName(builderSupervisor) === normalizeSupName(s.name);
                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => {
                                setBuilderSupervisor(s.name);
                                setBuilderSpecialtyFilter('auto');
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer border ${
                                isSelected
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-300 font-black'
                                  : 'bg-white text-slate-800 hover:bg-indigo-50 border-slate-200'
                              }`}
                            >
                              <span>{s.name}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                                isSelected ? 'bg-white/20 text-white' : s.specialtyBadgeClass
                              }`}>
                                {s.specialtyEmoji} {s.specialtyLabel}
                              </span>
                              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                                isSelected ? 'bg-indigo-900 text-white' : 'bg-slate-200 text-slate-800'
                              }`}>
                                {s.count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Especialidad del Supervisor (Despacho, Picking, etc.) + Sincronizar Turno del Grupo */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs">
                          <span className="font-black text-slate-700 block">
                            B. Área / Especialidad que le interesa a {builderSupervisor.split(' ')[0]}:
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Si es de Despacho ve Despacho primero; si es de Picking ve Picking primero
                          </span>
                        </div>
                        <select
                          value={currentSupSpec}
                          onChange={(e) => handleUpdateSupervisorSpecialty(builderSupervisor, e.target.value as OperationalSpecialty)}
                          className="px-3 py-1.5 rounded-xl border border-indigo-300 bg-indigo-50/60 text-indigo-950 text-xs font-black cursor-pointer"
                        >
                          <option value="despacho">🚛 Despacho</option>
                          <option value="picking">📦 Picking</option>
                          <option value="gruas">🏗️ Grúas</option>
                          <option value="encajado">🧊 Encajado</option>
                          <option value="transpaletas">🛞 Transpaletas</option>
                          <option value="repaletizado">🔄 Repaletizado</option>
                          <option value="patio">🚧 Patio Inbound</option>
                          <option value="todos">🌐 Todas las Áreas</option>
                        </select>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs">
                          <span className="font-black text-slate-700 block">
                            C. Asignar Turno a todo el grupo de {builderSupervisor.split(' ')[0]} ({supOfficialCount}):
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Pasa con 1 clic a todos sus operadores al turno elegido
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {(['turno-1', 'turno-2', 'turno-3'] as ShiftId[]).map((sh, idx) => (
                            <button
                              key={sh}
                              type="button"
                              onClick={() => handleSyncSupervisorGroupShift(builderSupervisor, sh)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-900 hover:text-white border border-emerald-300 text-xs font-black transition cursor-pointer"
                              title={`Asignar a los ${supOfficialCount} operadores de ${builderSupervisor} al Turno ${idx + 1}`}
                            >
                              Pasar a T{idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* CONTROLES DE PESTAÑA 2: TURNO 1, TURNO 2, TURNO 3 */
                  <div>
                    <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Selecciona el Turno para elegir qué operadores son parte de él:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {([
                        { id: 'turno-1', name: '🌅 Turno 1 (Mañana)', count: shiftCounts['turno-1'] },
                        { id: 'turno-2', name: '☀️ Turno 2 (Tarde)', count: shiftCounts['turno-2'] },
                        { id: 'turno-3', name: '🌙 Turno 3 (Noche)', count: shiftCounts['turno-3'] }
                      ] as { id: ShiftId; name: string; count: number }[]).map(t => {
                        const isSelected = builderShift === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setBuilderShift(t.id)}
                            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 font-black'
                                : 'bg-white text-slate-800 hover:bg-emerald-50/60 border-slate-200 font-bold'
                            }`}
                          >
                            <span className="text-xs sm:text-sm">{t.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-black ${
                              isSelected ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-800'
                            }`}>
                              {t.count} op.
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Barra de Filtro por Especialidad + Buscador + Acciones Masivas dentro del Checklist */}
                <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    {builderTab === 'supervisor' && currentSupSpec !== 'todos' && (
                      <button
                        type="button"
                        onClick={() => {
                          setBuilderSpecialtyFilter('auto');
                          setBuilderOnlySelected(false);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black whitespace-nowrap cursor-pointer border ${
                          effectiveSpecFilter === currentSupSpec && !builderOnlySelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50'
                        }`}
                      >
                        {supSpecMeta.emoji} Su Área: {supSpecMeta.shortLabel}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setBuilderSpecialtyFilter('todos');
                        setBuilderOnlySelected(false);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer border ${
                        effectiveSpecFilter === 'todos' && !builderOnlySelected
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      🌐 Ver Todos (102)
                    </button>

                    {['despacho', 'picking', 'gruas', 'encajado', 'repaletizado'].map(specId => {
                      if (builderTab === 'supervisor' && specId === currentSupSpec) return null;
                      const meta = SPECIALTY_META[specId];
                      const active = effectiveSpecFilter === specId && !builderOnlySelected;
                      return (
                        <button
                          key={specId}
                          type="button"
                          onClick={() => {
                            setBuilderSpecialtyFilter(specId);
                            setBuilderOnlySelected(false);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer border ${
                            active
                              ? 'bg-slate-800 text-white border-slate-800'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {meta.emoji} {meta.shortLabel}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setBuilderOnlySelected(!builderOnlySelected)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black whitespace-nowrap cursor-pointer border ${
                        builderOnlySelected
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      ✅ Solo Incluidos ({builderTab === 'supervisor' ? supOfficialCount : shiftOfficialCount})
                    </button>
                  </div>

                  {/* Buscador en el modal */}
                  <div className="relative w-full sm:w-64 shrink-0">
                    <input
                      type="text"
                      placeholder="Buscar operador por nombre o RUT..."
                      value={builderSearch}
                      onChange={(e) => setBuilderSearch(e.target.value)}
                      className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-indigo-600"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                    {builderSearch && (
                      <button
                        type="button"
                        onClick={() => setBuilderSearch('')}
                        className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-barra de Acciones Rápidas Masivas */}
              <div className="px-5 py-2.5 bg-indigo-50/70 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
                <span className="font-bold text-slate-700">
                  Mostrando <strong>{builderFilteredOperators.length}</strong> operadores • Haz clic en cada operador para incluirlo o quitarlo:
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {builderTab === 'supervisor' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleBulkToggleSupervisorGroup(builderFilteredOperators, builderSupervisor, true)}
                        className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-black transition cursor-pointer shadow-2xs"
                      >
                        ✅ Incluir los {builderFilteredOperators.length} mostrados en {builderSupervisor.split(' ')[0]}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBulkToggleSupervisorGroup(builderFilteredOperators, builderSupervisor, false)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-bold transition cursor-pointer"
                      >
                        ⬜ Quitar mostrados
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleBulkAssignShift(builderFilteredOperators, builderShift)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black transition cursor-pointer shadow-2xs"
                    >
                      ⚡ Asignar los {builderFilteredOperators.length} mostrados al {builderShift === 'turno-1' ? 'Turno 1' : builderShift === 'turno-2' ? 'Turno 2' : 'Turno 3'}
                    </button>
                  )}
                </div>
              </div>

              {/* Lista Scrolleable de Operadores (Checklist de 1 Clic) */}
              <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
                {builderFilteredOperators.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm font-medium">
                    No hay operadores que coincidan con este filtro. Prueba pulsando "🌐 Ver Todos (102)".
                  </div>
                ) : (
                  builderFilteredOperators.map(op => {
                    const grp = getOperatorGroup(op);
                    const specMeta = SPECIALTY_META[grp.id] || SPECIALTY_META.todos;
                    const isMember = builderTab === 'supervisor'
                      ? isOperatorInSupervisorGroup(op, builderSupervisor)
                      : (op.shiftId || 'turno-1') === builderShift;

                    return (
                      <div
                        key={op.id}
                        className={`py-2.5 px-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all ${
                          isMember
                            ? 'bg-emerald-50/70 border border-emerald-200 my-1'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Izquierda: Checkbox Principal + Datos del Operador */}
                        <div
                          onClick={() => {
                            if (builderTab === 'supervisor') {
                              handleToggleOperatorInSupervisorGroup(op, builderSupervisor);
                            } else {
                              handleAssignOperatorShift(op.id, builderShift);
                            }
                          }}
                          className="flex items-center gap-3 flex-1 cursor-pointer select-none"
                        >
                          <button
                            type="button"
                            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition shrink-0 cursor-pointer border ${
                              isMember
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-300'
                            }`}
                          >
                            {isMember ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Parte del Grupo</span>
                              </>
                            ) : (
                              <span>+ Incluir</span>
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="font-black text-slate-900 text-xs sm:text-sm truncate">
                                {op.name}
                              </span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${specMeta.badgeClass}`}>
                                {specMeta.emoji} {grp.shortName}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 mt-0.5">
                              <span>{op.role}</span>
                              {op.rut && <span className="font-mono">• {op.rut}</span>}
                              <span>• Sup. actual: <strong className="text-slate-700">{op.supervisor || 'Sin asignar'}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Derecha: Selector Rápido de Turno [T1] [T2] [T3] por Operador */}
                        <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                          <span className="text-[10px] font-bold text-slate-400 mr-1">Turno:</span>
                          {(['turno-1', 'turno-2', 'turno-3'] as ShiftId[]).map((sh, idx) => {
                            const activeShift = (op.shiftId || 'turno-1') === sh;
                            return (
                              <button
                                key={sh}
                                type="button"
                                onClick={() => handleAssignOperatorShift(op.id, sh)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition cursor-pointer border ${
                                  activeShift
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                                }`}
                                title={`Asignar a ${op.name} al Turno ${idx + 1}`}
                              >
                                T{idx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer con botón de aplicación inmediata */}
              <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="text-xs text-slate-600 font-semibold">
                  {builderTab === 'supervisor' ? (
                    <span>
                      👤 Grupo Oficial de <strong className="text-indigo-950">{builderSupervisor}</strong>: <strong>{supOfficialCount} operadores</strong>
                    </span>
                  ) : (
                    <span>
                      🕒 Dotación de <strong className="text-emerald-950">{builderShift === 'turno-1' ? 'Turno 1' : builderShift === 'turno-2' ? 'Turno 2' : 'Turno 3'}</strong>: <strong>{shiftOfficialCount} operadores</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (builderTab === 'supervisor') {
                        handleSelectSupervisor(builderSupervisor);
                      } else {
                        setSelectedSupervisor('todos');
                        setSelectedShiftId(builderShift);
                      }
                      setShowGroupBuilderModal(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {builderTab === 'supervisor'
                        ? `Listo • Pasar Lista a ${builderSupervisor.split(' ')[0]} (${supOfficialCount})`
                        : `Listo • Pasar Lista a ${builderShift === 'turno-1' ? 'Turno 1' : builderShift === 'turno-2' ? 'Turno 2' : 'Turno 3'} (${shiftOfficialCount})`}
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};
