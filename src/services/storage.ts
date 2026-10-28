import { supabase } from '../lib/supabase';
import { 
  LupItem, 
  LupAuditLog, 
  CharlaSession, 
  CharlaAttendee,
  PalletJackReport, 
  RfScannerReport, 
  OperatorItem, 
  AttendanceRecord,
  AppUser,
  UserRole,
  UserPermissions,
  ShiftId,
  ShiftType,
  AndenInspection,
  GruaChecklistReport,
  GruaChecklistEvaluation
} from '../types';
import { INITIAL_LUPS, INITIAL_CHARLAS, INITIAL_PALLETS, INITIAL_RFS, INITIAL_OPERATORS, INITIAL_ATTENDANCE } from '../data/seedData';
import { getHistoricalAttendanceForDate } from '../data/attendanceHistory';

const KEYS = {
  LUPS: 'cial_zv_lups_v1',
  DELETED_LUPS: 'cial_zv_deleted_lups_v1',
  AUDIT_LOGS: 'cial_zv_audit_logs_v1',
  CHARLAS: 'cial_zv_charlas_v1',
  PALLETS: 'cial_zv_pallets_v1',
  RFS: 'cial_zv_rfs_v1',
  OPERATORS: 'cial_zv_operators_v3',
  ATTENDANCE: 'cial_zv_attendance_overrides_v2',
  USERS: 'cial_zv_users_v1',
  ANDENES: 'cial_zv_andenes_v1',
  GRUA_CHECKLISTS: 'cial_zv_grua_checklists_v1'
};

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  jefatura: {
    canDeleteLup: true,
    canEditLup: true,
    canCreateLup: true,
    canManageAttendance: true,
    canManageUsers: true,
    canManageEquipment: true,
    canViewSsoPortal: true,
    canManageSsoLups: true,
    canExportSsoReports: true
  },
  supervisor: {
    canDeleteLup: true, // Supervisores y Jefaturas pueden eliminar LUPs
    canEditLup: true,
    canCreateLup: true,
    canManageAttendance: true,
    canManageUsers: false,
    canManageEquipment: true,
    canViewSsoPortal: true,
    canManageSsoLups: true,
    canExportSsoReports: true
  },
  prevencion: {
    canDeleteLup: false,
    canEditLup: true,
    canCreateLup: true,
    canManageAttendance: false,
    canManageUsers: false,
    canManageEquipment: false,
    canViewSsoPortal: true,
    canManageSsoLups: true,
    canExportSsoReports: true
  },
  operador: {
    canDeleteLup: false,
    canEditLup: false,
    canCreateLup: false,
    canManageAttendance: false,
    canManageUsers: false,
    canManageEquipment: false,
    canViewSsoPortal: false,
    canManageSsoLups: false,
    canExportSsoReports: false
  }
};

export const INITIAL_USERS: AppUser[] = [
  {
    id: 'user-ariel-mella',
    email: 'ariel.mella@cial.cl',
    name: 'Ariel Mella',
    role: 'jefatura',
    area: 'Jefatura de Operaciones & CD',
    permissions: {
      canDeleteLup: true,
      canEditLup: true,
      canCreateLup: true,
      canManageAttendance: true,
      canManageUsers: true,
      canManageEquipment: true
    },
    isSuperAdmin: true,
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-26T15:00:00Z'
  },
  {
    id: 'user-francisco-lara',
    email: 'francisco.lara@cial.cl',
    name: 'Francisco Lara',
    role: 'jefatura',
    area: 'Jefe de Turno / Operaciones',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.jefatura },
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-26T15:00:00Z'
  },
  {
    id: 'user-euro-velasquez',
    email: 'euro.velasquez@cial.cl',
    name: 'Euro Velásquez',
    role: 'jefatura',
    area: 'Jefe de Turno / Operaciones',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.jefatura },
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-26T15:00:00Z'
  },
  {
    id: 'user-walter-sanchez',
    email: 'walter.sanchez@cial.cl',
    name: 'Walter Sánchez',
    role: 'supervisor',
    area: 'Supervisor Despacho & Andenes',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.supervisor },
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-26T15:00:00Z'
  },
  {
    id: 'user-mayckell-pereira',
    email: 'mayckell.pereira@cial.cl',
    name: 'Mayckell Pereira',
    role: 'supervisor',
    area: 'Supervisor Encajado & Picking',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.supervisor },
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-26T15:00:00Z'
  },
  {
    id: 'user-claudio-sepulveda',
    email: 'claudio.sepulveda@cial.cl',
    name: 'Claudio Sepúlveda',
    role: 'supervisor',
    area: 'Supervisor Picking Frío',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.supervisor },
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-26T15:00:00Z'
  },
  {
    id: 'user-prevencion-cial',
    email: 'prevencion@cial.cl',
    name: 'Prevención de Riesgos CD',
    role: 'prevencion',
    area: 'Seguridad y Salud Ocupacional (SSO)',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.prevencion },
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-27T10:00:00Z'
  },
  {
    id: 'user-cristian-hernandez',
    email: 'cristian.hernandez@cial.cl',
    name: 'Cristian Hernández',
    role: 'supervisor',
    area: 'Supervisor Recepción & Almacenamiento',
    permissions: { ...DEFAULT_ROLE_PERMISSIONS.supervisor },
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-26T15:00:00Z'
  }
];

const INITIAL_AUDIT_LOGS: LupAuditLog[] = [
  {
    id: 'audit-seed-1',
    lupId: 'lup-cial-01',
    lupCode: 'LUP-DES-01',
    lupTitle: 'Estándar de Filmado y Consolidación de Pallets',
    action: 'CREADO',
    performedBy: 'ariel.mella@cial.cl',
    performedAt: '2026-10-20T08:00:00Z',
    details: 'Carga inicial desde OneDrive corporativo CIAL Alimentos',
    area: 'Despacho / Outbound'
  },
  {
    id: 'audit-seed-2',
    lupId: 'lup-cial-02',
    lupCode: 'LUP-PCK-01',
    lupTitle: 'Buenas Prácticas en el Proceso de Picking (Consumo por Camadas)',
    action: 'CREADO',
    performedBy: 'ariel.mella@cial.cl',
    performedAt: '2026-10-20T08:30:00Z',
    details: 'Carga inicial desde OneDrive corporativo CIAL Alimentos',
    area: 'Picking / Outbound'
  },
  {
    id: 'audit-seed-3',
    lupId: 'lup-cial-03',
    lupCode: 'LUP-DES-02',
    lupTitle: 'Altura Máxima de Armado para Zonales (Límite 2.0 Metros)',
    action: 'CREADO',
    performedBy: 'francisco.lara@cial.cl',
    performedAt: '2026-10-20T09:00:00Z',
    details: 'Definición de altura óptima de 2.0m para zonales',
    area: 'Despacho / Andenes'
  },
  {
    id: 'audit-seed-4',
    lupId: 'lup-cial-04',
    lupCode: 'LUP-REC-01',
    lupTitle: 'Almacenamiento y Reposiciones: Observar, Revisar y Capturar Tarja',
    action: 'CREADO',
    performedBy: 'carlos.venegas@cial.cl',
    performedAt: '2026-10-20T09:30:00Z',
    details: 'Protocolo de validación física v/s sistema en racks frío',
    area: 'Recepción & Almacenamiento'
  }
];

// Safe JSON parser
function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// AUDIT LOGS (Trazabilidad de creación, edición y eliminación)
export function getLupAuditLogs(): LupAuditLog[] {
  const data = safeGet<LupAuditLog[]>(KEYS.AUDIT_LOGS, []);
  if (!data || data.length === 0) {
    safeSet(KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    return INITIAL_AUDIT_LOGS;
  }
  return data;
}

export function addLupAuditLog(log: LupAuditLog): void {
  const current = getLupAuditLogs();
  safeSet(KEYS.AUDIT_LOGS, [log, ...current]);
}

// DELETED LUPS REGISTRY (Evita resurrección de semillas eliminadas)
export function getDeletedLupIds(): string[] {
  return safeGet<string[]>(KEYS.DELETED_LUPS, []);
}

export function addDeletedLupId(id: string): void {
  const current = getDeletedLupIds();
  if (!current.includes(id)) {
    safeSet(KEYS.DELETED_LUPS, [...current, id]);
  }
}

// LUPs
export function getLups(): LupItem[] {
  const data = safeGet<LupItem[]>(KEYS.LUPS, []);
  const deletedIds = new Set(getDeletedLupIds());
  const activeSeeds = INITIAL_LUPS.filter(seed => !deletedIds.has(seed.id));

  if (!data || data.length === 0) {
    safeSet(KEYS.LUPS, activeSeeds);
    return activeSeeds;
  }
  
  // Sincronizar únicamente si faltan semillas activas o tienen nuevas fotos/campos
  const existingMap = new Map<string, LupItem>(data.map(item => [item.id, item]));
  let hasUpdates = false;

  const mergedList: LupItem[] = activeSeeds.map(seed => {
    const existing = existingMap.get(seed.id);
    if (!existing) {
      hasUpdates = true;
      return seed;
    }
    // Si la semilla tiene fotos y el existente no las tiene o difieren
    if (seed.photos && (!existing.photos || existing.photos.length !== seed.photos.length)) {
      hasUpdates = true;
      return { 
        ...existing, 
        photos: seed.photos, 
        isSafety: seed.isSafety ?? existing.isSafety,
        criticalRisk: seed.criticalRisk ?? existing.criticalRisk,
        mandatoryEpp: seed.mandatoryEpp ?? existing.mandatoryEpp
      };
    }
    return existing;
  });

  // Agregar los creados por usuarios que no sean semillas
  const seedIds = new Set(activeSeeds.map(s => s.id));
  const userCreated = data.filter(item => !seedIds.has(item.id) && !deletedIds.has(item.id));
  const finalActiveList = [...mergedList, ...userCreated];

  if (hasUpdates || finalActiveList.length !== data.length) {
    safeSet(KEYS.LUPS, finalActiveList);
    return finalActiveList;
  }

  return finalActiveList;
}

export function saveLup(lup: LupItem, userEmail?: string, changeReason?: string): void {
  const current = getLups();
  const existsIndex = current.findIndex(item => item.id === lup.id);
  const now = new Date().toISOString();
  const actor = userEmail || 'colaborador@cial.cl';

  let updatedLup: LupItem;
  let updatedList: LupItem[];

  if (existsIndex >= 0) {
    const previous = current[existsIndex];
    updatedLup = {
      ...lup,
      lastModifiedBy: actor,
      lastModifiedAt: now,
      modificationCount: (previous.modificationCount || 0) + 1,
      createdBy: previous.createdBy || lup.createdBy || lup.author
    };
    updatedList = [...current];
    updatedList[existsIndex] = updatedLup;

    // Registrar en auditoría
    addLupAuditLog({
      id: `audit-${Date.now()}`,
      lupId: updatedLup.id,
      lupCode: updatedLup.code,
      lupTitle: updatedLup.title,
      action: 'MODIFICADO',
      performedBy: actor,
      performedAt: now,
      details: changeReason || `Modificación de contenido (edición #${updatedLup.modificationCount})`,
      area: updatedLup.area
    });
  } else {
    updatedLup = {
      ...lup,
      createdBy: actor,
      createdAt: now,
      modificationCount: 0
    };
    updatedList = [updatedLup, ...current];

    // Registrar en auditoría
    addLupAuditLog({
      id: `audit-${Date.now()}`,
      lupId: updatedLup.id,
      lupCode: updatedLup.code,
      lupTitle: updatedLup.title,
      action: 'CREADO',
      performedBy: actor,
      performedAt: now,
      details: changeReason || 'Nuevo LUP ingresado al catálogo de Zona Verde',
      area: updatedLup.area
    });
  }

  safeSet(KEYS.LUPS, updatedList);
}

export function deleteLup(id: string, userEmail?: string, reason?: string): { success: boolean; message?: string } {
  const current = getLups();
  const target = current.find(item => item.id === id);
  const now = new Date().toISOString();
  const actor = userEmail || 'ariel.mella@cial.cl';

  // Validar permiso de Jefatura y Supervisión para eliminar LUPs
  const currentUser = getAppUserByEmail(actor);
  if (!currentUser.permissions.canDeleteLup && !currentUser.isSuperAdmin && currentUser.role === 'operador') {
    console.warn(`[SEGURIDAD] Intento denegado de eliminación de LUP por ${actor} (Rol: ${currentUser.role})`);
    return {
      success: false,
      message: 'Acceso Denegado: Solo supervisores y jefaturas pueden eliminar LUPs del sistema.'
    };
  }

  // Registrar ID en la lista permanente de eliminados
  addDeletedLupId(id);

  if (target) {
    // Registrar evento de eliminación en auditoría con acreditación
    addLupAuditLog({
      id: `audit-del-${Date.now()}`,
      lupId: target.id,
      lupCode: target.code,
      lupTitle: target.title,
      action: 'ELIMINADO',
      performedBy: `${actor} [${currentUser.role.toUpperCase()}]`,
      performedAt: now,
      details: reason || 'Eliminado formalmente del catálogo activo',
      area: target.area
    });
  }

  const updatedList = current.filter(item => item.id !== id);
  safeSet(KEYS.LUPS, updatedList);
  return { success: true };
}

// Charlas 5 Min
export function getCharlas(): CharlaSession[] {
  const data = safeGet<CharlaSession[]>(KEYS.CHARLAS, []);
  if (!data || data.length === 0) {
    safeSet(KEYS.CHARLAS, INITIAL_CHARLAS);
    return INITIAL_CHARLAS;
  }
  return data;
}

export function saveCharla(charla: CharlaSession): void {
  const current = getCharlas();
  safeSet(KEYS.CHARLAS, [charla, ...current]);
}

// Transpaletas Manuales
export function getPallets(): PalletJackReport[] {
  const data = safeGet<PalletJackReport[]>(KEYS.PALLETS, []);
  // Limpiar reportes demo de prueba (pal-1, pal-2, pal-3, pal-4)
  const testIds = new Set(['pal-1', 'pal-2', 'pal-3', 'pal-4']);
  const cleaned = data.filter(p => !testIds.has(p.id));
  if (cleaned.length !== data.length) {
    safeSet(KEYS.PALLETS, cleaned);
  }
  return cleaned;
}

export function savePallet(pallet: PalletJackReport): void {
  const current = getPallets();
  const index = current.findIndex(p => p.id === pallet.id);
  let updated: PalletJackReport[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = pallet;
  } else {
    updated = [pallet, ...current];
  }
  safeSet(KEYS.PALLETS, updated);
}

export function deletePallet(id: string): void {
  const current = getPallets();
  safeSet(KEYS.PALLETS, current.filter(p => p.id !== id));
}

// Pistolas RF
export function getRfs(): RfScannerReport[] {
  const data = safeGet<RfScannerReport[]>(KEYS.RFS, []);
  // Limpiar reportes demo de prueba (rf-1, rf-2, rf-3)
  const testIds = new Set(['rf-1', 'rf-2', 'rf-3']);
  const cleaned = data.filter(r => !testIds.has(r.id));
  if (cleaned.length !== data.length) {
    safeSet(KEYS.RFS, cleaned);
  }
  return cleaned;
}

export function saveRf(rf: RfScannerReport): void {
  const current = getRfs();
  const index = current.findIndex(r => r.id === rf.id);
  let updated: RfScannerReport[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = rf;
  } else {
    updated = [rf, ...current];
  }
  safeSet(KEYS.RFS, updated);
}

export function deleteRf(id: string): void {
  const current = getRfs();
  safeSet(KEYS.RFS, current.filter(r => r.id !== id));
}

// SLA & Response Time Calculations
export function calculateElapsedHours(startDateStr: string, endDateStr?: string): number {
  const start = new Date(startDateStr).getTime();
  const end = endDateStr ? new Date(endDateStr).getTime() : Date.now();
  const diffMs = Math.max(0, end - start);
  return Number((diffMs / (1000 * 60 * 60)).toFixed(1));
}

export function formatDurationHuman(hours: number): string {
  if (hours < 1) {
    const mins = Math.round(hours * 60);
    return `${mins} min`;
  }
  if (hours < 24) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m > 0 ? `${m}m` : ''}`;
  }
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours % 24);
  return `${days}d ${remainingHours > 0 ? `${remainingHours}h` : ''}`;
}

export type SlaHealth = 'excelente' | 'alerta' | 'vencido';

export function getSlaHealth(hours: number, targetHours = 48): {
  health: SlaHealth;
  label: string;
  badgeClass: string;
} {
  if (hours <= targetHours) {
    return {
      health: 'excelente',
      label: 'Dentro de SLA (<48h)',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
  }
  if (hours <= targetHours * 1.5) {
    return {
      health: 'alerta',
      label: 'Por vencer (>48h)',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300'
    };
  }
  return {
    health: 'vencido',
    label: 'SLA Excedido (>72h)',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300'
  };
}

// Export to CSV helper
export function exportToCsv(filename: string, rows: Record<string, any>[]): void {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(';'),
    ...rows.map(row => 
      headers.map(h => {
        const val = row[h] === undefined || row[h] === null ? '' : String(row[h]);
        return `"${val.replace(/"/g, '""')}"`;
      }).join(';')
    )
  ].join('\r\n');

  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ====================
// OPERADORES & ASISTENCIA DIARIA
// ====================

export function getOperators(): OperatorItem[] {
  try {
    // Migration: clean legacy demo rosters v1 and v2
    if (localStorage.getItem('cial_zv_operators_v1')) {
      localStorage.removeItem('cial_zv_operators_v1');
    }
    if (localStorage.getItem('cial_zv_operators_v2')) {
      localStorage.removeItem('cial_zv_operators_v2');
    }
    if (localStorage.getItem('cial_zv_attendance_v1')) {
      localStorage.removeItem('cial_zv_attendance_v1');
    }

    const raw = localStorage.getItem(KEYS.OPERATORS);
    if (!raw) {
      localStorage.setItem(KEYS.OPERATORS, JSON.stringify(INITIAL_OPERATORS));
      return INITIAL_OPERATORS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length < INITIAL_OPERATORS.length) {
      const userAdded = parsed.filter((o: OperatorItem) => !INITIAL_OPERATORS.some(init => init.id === o.id || (init.rut && init.rut.toLowerCase().trim() === o.rut?.toLowerCase().trim())));
      const merged = [...INITIAL_OPERATORS, ...userAdded];
      localStorage.setItem(KEYS.OPERATORS, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch (e) {
    console.error('Error reading operators from localStorage:', e);
    return INITIAL_OPERATORS;
  }
}

export function saveOperator(operator: OperatorItem): void {
  try {
    const current = getOperators();
    const existingIndex = current.findIndex(o => o.id === operator.id);
    let updated: OperatorItem[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = operator;
    } else {
      updated = [operator, ...current];
    }
    localStorage.setItem(KEYS.OPERATORS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving operator:', e);
  }
}

export function deleteOperator(operatorId: string): void {
  try {
    const current = getOperators();
    const updated = current.filter(o => o.id !== operatorId);
    localStorage.setItem(KEYS.OPERATORS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting operator:', e);
  }
}

// Database row interface for Supabase public.zona_verde_attendance
interface DbAttendanceRow {
  id: string;
  date: string;
  shift_id: string;
  shift_name: string | null;
  operator_id: string;
  operator_name: string;
  operator_role: string | null;
  operator_area: string | null;
  status: string;
  arrival_time: string | null;
  notes: string | null;
  registered_by: string | null;
  updated_at: string;
}

function toDbRow(rec: AttendanceRecord): DbAttendanceRow {
  return {
    id: `${rec.operatorId}_${rec.date}`,
    date: rec.date,
    shift_id: rec.shiftId || 'turno-1',
    shift_name: rec.shiftName || 'Turno 1',
    operator_id: rec.operatorId,
    operator_name: rec.operatorName,
    operator_role: rec.operatorRole || null,
    operator_area: rec.operatorArea || null,
    status: rec.status,
    arrival_time: rec.arrivalTime || null,
    notes: rec.notes || null,
    registered_by: rec.registeredBy || 'Usuario',
    updated_at: rec.updatedAt || new Date().toISOString()
  };
}

function fromDbRow(row: DbAttendanceRow): AttendanceRecord {
  return {
    id: row.id,
    date: row.date,
    shiftId: (row.shift_id || 'turno-1') as any,
    shiftName: (row.shift_name || 'Turno 1 (Mañana 07:00 - 15:00)') as any,
    operatorId: row.operator_id,
    operatorName: row.operator_name,
    operatorRole: row.operator_role || undefined,
    operatorArea: row.operator_area || undefined,
    status: row.status as any,
    arrivalTime: row.arrival_time || undefined,
    notes: row.notes || undefined,
    registeredBy: row.registered_by || 'Supabase Cloud',
    updatedAt: row.updated_at
  };
}

export function getAttendanceRecords(date?: string, shiftId?: string): AttendanceRecord[] {
  try {
    const targetDate = date || new Date().toISOString().slice(0, 10);
    
    // 1. Get historical baseline records for this targetDate
    const histRecords = getHistoricalAttendanceForDate(targetDate, shiftId);
    const map = new Map<string, AttendanceRecord>();
    for (const r of histRecords) {
      map.set(`${r.date}_${r.operatorId}`, r);
    }

    // 2. Overlay manual overrides from localStorage (hybrid cache)
    const raw = localStorage.getItem(KEYS.ATTENDANCE);
    if (raw) {
      const overrides: AttendanceRecord[] = JSON.parse(raw);
      for (const ov of overrides) {
        if (date && ov.date !== date) continue;
        // Map by operator for the target date regardless of shift filter mismatch
        map.set(`${ov.date}_${ov.operatorId}`, ov);
      }
    }

    return Array.from(map.values());
  } catch (e) {
    console.error('Error reading attendance records:', e);
    return getHistoricalAttendanceForDate(date || '2026-10-26', shiftId);
  }
}

export function saveAttendanceRecord(record: AttendanceRecord): void {
  try {
    // 1. Guardado inmediato en LocalStorage (cero latencia de UI)
    const raw = localStorage.getItem(KEYS.ATTENDANCE);
    const overrides: AttendanceRecord[] = raw ? JSON.parse(raw) : [];
    
    const existingIndex = overrides.findIndex(
      r => r.date === record.date && r.operatorId === record.operatorId
    );
    
    if (existingIndex >= 0) {
      overrides[existingIndex] = record;
    } else {
      overrides.push(record);
    }
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(overrides));

    // 2. Persistencia en la nube (Supabase Cloud)
    void (async () => {
      try {
        const { error } = await supabase
          .from('zona_verde_attendance')
          .upsert(toDbRow(record), { onConflict: 'id' });
        if (error) {
          console.warn('[ZonaVerde] Error al sincronizar asistencia con Supabase:', error.message);
        } else {
          console.log('[ZonaVerde] ✅ Asistencia sincronizada en Supabase Cloud para:', record.operatorName);
        }
      } catch (e) {
        console.warn('[ZonaVerde] Excepción al sincronizar asistencia con Supabase:', e);
      }
    })();
  } catch (e) {
    console.error('Error saving attendance record:', e);
  }
}

export function saveBulkAttendance(records: AttendanceRecord[]): void {
  try {
    // 1. Guardado inmediato en LocalStorage
    const raw = localStorage.getItem(KEYS.ATTENDANCE);
    const overrides: AttendanceRecord[] = raw ? JSON.parse(raw) : [];
    
    for (const rec of records) {
      const idx = overrides.findIndex(
        r => r.date === rec.date && r.operatorId === rec.operatorId
      );
      if (idx >= 0) {
        overrides[idx] = rec;
      } else {
        overrides.push(rec);
      }
    }
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(overrides));

    // 2. Persistencia en la nube (Supabase Cloud) en batch
    if (records.length > 0) {
      const rows = records.map(toDbRow);
      void (async () => {
        try {
          const { error } = await supabase
            .from('zona_verde_attendance')
            .upsert(rows, { onConflict: 'id' });
          if (error) {
            console.warn('[ZonaVerde] Error al sincronizar lote en Supabase:', error.message);
          } else {
            console.log(`[ZonaVerde] ✅ ${records.length} registros guardados permanentemente en Supabase Cloud`);
          }
        } catch (e) {
          console.warn('[ZonaVerde] Excepción al sincronizar lote en Supabase:', e);
        }
      })();
    }
  } catch (e) {
    console.error('Error saving bulk attendance:', e);
  }
}

export function getAllAttendanceOverrides(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(KEYS.ATTENDANCE);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading all attendance overrides:', e);
    return [];
  }
}

export function removeAttendanceOverride(operatorId: string, date: string): void {
  try {
    // 1. LocalStorage
    const raw = localStorage.getItem(KEYS.ATTENDANCE);
    if (raw) {
      const overrides: AttendanceRecord[] = JSON.parse(raw);
      const updated = overrides.filter(r => !(r.operatorId === operatorId && r.date === date));
      localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(updated));
    }

    // 2. Supabase Cloud delete
    void (async () => {
      try {
        const { error } = await supabase
          .from('zona_verde_attendance')
          .delete()
          .eq('id', `${operatorId}_${date}`);
        if (error) {
          console.warn('[ZonaVerde] Error al eliminar registro en Supabase:', error.message);
        } else {
          console.log(`[ZonaVerde] ✅ Registro eliminado de Supabase: ${operatorId}_${date}`);
        }
      } catch (e) {
        console.warn('[ZonaVerde] Excepción al eliminar de Supabase:', e);
      }
    })();
  } catch (e) {
    console.error('Error removing attendance override:', e);
  }
}

export async function syncAttendanceFromCloud(): Promise<AttendanceRecord[]> {
  try {
    const { data, error } = await supabase
      .from('zona_verde_attendance')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.warn('[ZonaVerde] Error al consultar Supabase:', error.message);
      return getAllAttendanceOverrides();
    }

    if (data && Array.isArray(data)) {
      const cloudRecords = data.map(fromDbRow);
      
      const raw = localStorage.getItem(KEYS.ATTENDANCE);
      const localOverrides: AttendanceRecord[] = raw ? JSON.parse(raw) : [];
      
      const mergedMap = new Map<string, AttendanceRecord>();
      
      // Local first
      for (const loc of localOverrides) {
        mergedMap.set(`${loc.operatorId}_${loc.date}`, loc);
      }
      
      // Cloud overrides
      for (const cld of cloudRecords) {
        mergedMap.set(`${cld.operatorId}_${cld.date}`, cld);
      }

      // Check if any local overrides need to be synced to cloud
      const unSynced = localOverrides.filter(loc => !cloudRecords.some(c => c.operatorId === loc.operatorId && c.date === loc.date));
      if (unSynced.length > 0) {
        void (async () => {
          try {
            await supabase
              .from('zona_verde_attendance')
              .upsert(unSynced.map(toDbRow), { onConflict: 'id' });
          } catch (e) {
            console.warn('[ZonaVerde] Error al sincronizar registros locales pendientes:', e);
          }
        })();
      }

      const merged = Array.from(mergedMap.values());
      localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(merged));
      return merged;
    }

    return getAllAttendanceOverrides();
  } catch (e) {
    console.error('[ZonaVerde] Excepción en syncAttendanceFromCloud:', e);
    return getAllAttendanceOverrides();
  }
}

// ========================
// GESTIÓN DE USUARIOS Y PERMISOS (ARIEL MELLA / JEFATURAS)
// ========================

export function getAppUsers(): AppUser[] {
  let users = safeGet<AppUser[]>(KEYS.USERS, []);
  if (!users || users.length === 0) {
    safeSet(KEYS.USERS, INITIAL_USERS);
    return INITIAL_USERS;
  }

  // Garantizar que Ariel Mella siempre exista y mantenga privilegios de Super Administrador
  const arielIdx = users.findIndex(u => u.email.toLowerCase() === 'ariel.mella@cial.cl');
  if (arielIdx === -1) {
    users.unshift(INITIAL_USERS[0]);
    safeSet(KEYS.USERS, users);
  } else {
    // Asegurar permisos clave intactos para Ariel Mella
    if (!users[arielIdx].permissions.canDeleteLup || !users[arielIdx].permissions.canManageUsers || !users[arielIdx].isSuperAdmin) {
      users[arielIdx] = {
        ...users[arielIdx],
        role: 'jefatura',
        isSuperAdmin: true,
        permissions: {
          ...users[arielIdx].permissions,
          canDeleteLup: true,
          canManageUsers: true,
          canEditLup: true,
          canCreateLup: true,
          canManageAttendance: true,
          canManageEquipment: true
        }
      };
      safeSet(KEYS.USERS, users);
    }
  }

  return users;
}

export function getAppUserByEmail(email?: string): AppUser {
  if (!email) {
    // Si no hay email, retornar perfil por defecto de Ariel Mella para pruebas locales
    const users = getAppUsers();
    return users.find(u => u.email.toLowerCase() === 'ariel.mella@cial.cl') || INITIAL_USERS[0];
  }

  const normalized = email.toLowerCase().trim();
  const users = getAppUsers();
  const found = users.find(u => u.email.toLowerCase() === normalized);

  if (found) {
    return found;
  }

  // Si no está registrado en el sistema, creamos un registro inicial para el colaborador
  const isJefaturaEmail = normalized === 'ariel.mella@cial.cl' ||
    normalized.includes('francisco.lara') || 
    normalized.includes('euro.velasquez') ||
    normalized.includes('supervisorcd') ||
    normalized.includes('jefe');
    
  const isSupervisorEmail = isJefaturaEmail ||
    normalized.includes('walter.sanchez') || 
    normalized.includes('mayckell') || 
    normalized.includes('claudio.sepulveda') || 
    normalized.includes('cristian.hernandez') ||
    normalized.includes('supervisor') ||
    normalized.includes('cial');

  const role: UserRole = isJefaturaEmail ? 'jefatura' : (isSupervisorEmail ? 'supervisor' : 'operador');

  const displayName = normalized.split('@')[0].split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  const newUser: AppUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    email: normalized,
    name: displayName,
    role,
    area: role === 'jefatura' ? 'Jefatura de Operaciones' : (role === 'supervisor' ? 'Supervisión de Turno' : 'Operaciones CD'),
    permissions: { ...DEFAULT_ROLE_PERMISSIONS[role] },
    isSuperAdmin: normalized === 'ariel.mella@cial.cl',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  saveAppUser(newUser);
  return newUser;
}

export function saveAppUser(user: AppUser): void {
  const users = getAppUsers();
  const now = new Date().toISOString();
  const normalizedEmail = user.email.toLowerCase().trim();
  const existsIndex = users.findIndex(u => u.id === user.id || u.email.toLowerCase() === normalizedEmail);

  // Regla de oro: Si es Ariel Mella, blindar el rol y los permisos de gestión
  let userToSave = { ...user, updatedAt: now };
  if (normalizedEmail === 'ariel.mella@cial.cl') {
    userToSave = {
      ...userToSave,
      isSuperAdmin: true,
      role: 'jefatura',
      permissions: {
        ...userToSave.permissions,
        canDeleteLup: true,
        canManageUsers: true
      }
    };
  }

  let updatedList: AppUser[];
  if (existsIndex >= 0) {
    updatedList = [...users];
    updatedList[existsIndex] = userToSave;
  } else {
    updatedList = [...users, userToSave];
  }

  safeSet(KEYS.USERS, updatedList);
}

export function deleteAppUser(userId: string): { success: boolean; message?: string } {
  const users = getAppUsers();
  const target = users.find(u => u.id === userId);

  if (!target) {
    return { success: false, message: 'Usuario no encontrado.' };
  }

  if (target.isSuperAdmin || target.email.toLowerCase() === 'ariel.mella@cial.cl') {
    return { 
      success: false, 
      message: 'Operación prohibida: No es posible eliminar al Administrador Principal (ariel.mella@cial.cl).' 
    };
  }

  const updatedList = users.filter(u => u.id !== userId);
  safeSet(KEYS.USERS, updatedList);
  return { success: true };
}

// ==========================================
// PREVENCIÓN DE RIESGOS (SSO) & ASISTENCIA ⇄ LUP
// ==========================================

export function getSafetyLups(): LupItem[] {
  const allLups = getLups();
  return allLups.filter(l => l.isSafety === true || l.category === 'Seguridad SSO');
}

export function getShiftAttendancePresent(date: string, shiftId: ShiftId): AttendanceRecord[] {
  const records = getAttendanceRecords(date, shiftId);
  return records.filter(r => r.status === 'presente' || r.status === 'tarde');
}

export interface RegisterShiftLupParams {
  date: string;
  shiftId: ShiftId;
  shiftName: ShiftType;
  lupId: string;
  supervisor: string;
  facilitator?: string;
  selectedOperatorIds?: string[]; // Si no se envía o está vacío, se incluyen todos los presentes
  notes?: string;
  keyAgreements?: string;
  photoUrl?: string;
}

export function registerShiftLupTraining(params: RegisterShiftLupParams): CharlaSession {
  const allLups = getLups();
  const lup = allLups.find(l => l.id === params.lupId) || allLups[0];
  const allOperators = getOperators();
  const opMap = new Map<string, OperatorItem>(allOperators.map(o => [o.id, o]));

  // Obtener presentes de la asistencia del turno
  const presentRecords = getShiftAttendancePresent(params.date, params.shiftId);

  // Filtrar si el supervisor desmarcó a alguien
  const eligibleRecords = params.selectedOperatorIds && params.selectedOperatorIds.length > 0
    ? presentRecords.filter(r => params.selectedOperatorIds!.includes(r.operatorId))
    : presentRecords;

  const attendeesList: CharlaAttendee[] = eligibleRecords.map(r => {
    const op = opMap.get(r.operatorId);
    return {
      operatorId: r.operatorId,
      operatorName: r.operatorName,
      rut: op?.rut,
      role: r.operatorRole || op?.role,
      area: r.operatorArea || op?.area
    };
  });

  const now = new Date();
  const timeStr = now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

  const isSafety = lup.isSafety ?? (lup.category === 'Seguridad SSO');

  const newSession: CharlaSession = {
    id: `charla-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    lupId: lup.id,
    lupCode: lup.code,
    lupTitle: lup.title,
    facilitator: params.facilitator || params.supervisor,
    supervisor: params.supervisor,
    shift: params.shiftName,
    shiftId: params.shiftId,
    area: lup.area || 'Todas las áreas',
    date: params.date,
    time: timeStr,
    durationSeconds: 300,
    attendeesCount: attendeesList.length,
    attendeesList: attendeesList,
    attendeesNotes: params.notes,
    keyAgreements: params.keyAgreements,
    photoUrl: params.photoUrl,
    isSafetyLup: isSafety,
    createdAt: now.toISOString()
  };

  saveCharla(newSession);
  return newSession;
}

export interface OperatorSafetyRecord {
  charla: CharlaSession;
  lup?: LupItem;
  date: string;
  shift: string;
  supervisor: string;
}

export function getOperatorSafetyHistory(operatorId: string): OperatorSafetyRecord[] {
  const charlas = getCharlas();
  const lups = getLups();
  const lupMap = new Map<string, LupItem>(lups.map(l => [l.id, l]));

  const history: OperatorSafetyRecord[] = [];

  for (const c of charlas) {
    let wasPresent = false;
    if (c.attendeesList && c.attendeesList.length > 0) {
      wasPresent = c.attendeesList.some(a => a.operatorId === operatorId);
    } else {
      // Fallback para charlas históricas sin attendeesList explícito: verificar si estaba presente en ese turno y fecha
      const shiftRecords = getAttendanceRecords(c.date, c.shiftId);
      const rec = shiftRecords.find(r => r.operatorId === operatorId);
      if (rec && (rec.status === 'presente' || rec.status === 'tarde')) {
        wasPresent = true;
      }
    }

    if (wasPresent) {
      history.push({
        charla: c,
        lup: lupMap.get(c.lupId),
        date: c.date,
        shift: c.shift,
        supervisor: c.supervisor
      });
    }
  }

  return history.sort((a, b) => b.date.localeCompare(a.date));
}

export interface LupCoverageResult {
  lup: LupItem;
  totalOperators: number;
  trainedCount: number;
  percentage: number;
  trainedOperators: OperatorItem[];
  pendingOperators: OperatorItem[];
}

export function getLupTrainingCoverage(lupId: string): LupCoverageResult {
  const allLups = getLups();
  const lup = allLups.find(l => l.id === lupId) || allLups[0];
  const allOperators = getOperators().filter(o => o.active !== false);
  const charlas = getCharlas().filter(c => c.lupId === lupId);

  const trainedIds = new Set<string>();

  for (const c of charlas) {
    if (c.attendeesList && c.attendeesList.length > 0) {
      c.attendeesList.forEach(a => trainedIds.add(a.operatorId));
    } else {
      const records = getAttendanceRecords(c.date, c.shiftId);
      records.filter(r => r.status === 'presente' || r.status === 'tarde').forEach(r => trainedIds.add(r.operatorId));
    }
  }

  const trainedOperators: OperatorItem[] = [];
  const pendingOperators: OperatorItem[] = [];

  for (const op of allOperators) {
    if (trainedIds.has(op.id)) {
      trainedOperators.push(op);
    } else {
      pendingOperators.push(op);
    }
  }

  const total = allOperators.length;
  const trained = trainedOperators.length;
  const percentage = total > 0 ? Math.round((trained / total) * 100) : 0;

  return {
    lup,
    totalOperators: total,
    trainedCount: trained,
    percentage,
    trainedOperators,
    pendingOperators
  };
}

export interface ShiftSafetyStatus {
  shiftId: ShiftId;
  shiftName: ShiftType;
  label: string;
  completed: boolean;
  charla?: CharlaSession;
  presentCount: number;
  trainedCount: number;
}

export function getDailyShiftsSafetyStatus(date: string): ShiftSafetyStatus[] {
  const SHIFTS: { id: ShiftId; name: ShiftType; label: string }[] = [
    { id: 'turno-1', name: 'Turno 1 (Mañana 07:00 - 15:00)', label: 'Turno 1' },
    { id: 'turno-2', name: 'Turno 2 (Tarde 15:00 - 23:00)', label: 'Turno 2' },
    { id: 'turno-3', name: 'Turno 3 (Noche 23:00 - 07:00)', label: 'Turno 3' }
  ];

  const charlas = getCharlas().filter(c => c.date === date);

  return SHIFTS.map(s => {
    // Buscar si hay charla registrada para este turno y fecha
    const session = charlas.find(c => c.shiftId === s.id || (s.id === 'turno-1' && c.shiftId === 'manana') || (s.id === 'turno-2' && c.shiftId === 'tarde') || (s.id === 'turno-3' && c.shiftId === 'noche'));
    
    // Obtener cantidad de operadores presentes en la asistencia
    const presentRecords = getShiftAttendancePresent(date, s.id);
    const presentCount = presentRecords.length;

    const trainedCount = session 
      ? (session.attendeesList ? session.attendeesList.length : session.attendeesCount || presentCount)
      : 0;

    return {
      shiftId: s.id,
      shiftName: s.name,
      label: s.label,
      completed: !!session,
      charla: session,
      presentCount,
      trainedCount
    };
  });
}

// ==========================================
// ANDENES (REJAS & PUERTAS SECCIONALES)
// ==========================================

export const INITIAL_ANDENES: AndenInspection[] = Array.from({ length: 34 }, (_, i) => {
  const num = i + 1;
  const isAnden3 = num === 3;
  const isAnden5 = num === 5;
  const isAnden19 = num === 19;
  const isAnden28 = num === 28;
  return {
    id: `anden-${num}`,
    andenNumber: num,
    andenCode: `ANDÉN-${num.toString().padStart(2, '0')}`,
    area: num <= 20 ? 'Andenes de Despacho (1 al 20)' : 'Andenes de Recepción Inbound (21 al 34)',
    doorStatus: isAnden5 ? 'falla_sensor' : isAnden28 ? 'trabada' : 'operativa',
    gateStatus: isAnden3 ? 'traba_rota' : 'operativa',
    levelerStatus: isAnden5 ? 'fuera_servicio' : isAnden19 ? 'fuga_hidraulica' : 'operativo',
    doorNotes: isAnden5 ? 'Sensor fotoeléctrico inferior descalibrado, cortina no desciende' : isAnden28 ? 'Cortina trabada a media altura' : undefined,
    gateNotes: isAnden3 ? 'Traba mecánica lateral trabada con desgaste' : undefined,
    levelerNotes: isAnden19 ? 'Fuga de aceite en cilindro hidráulico principal' : undefined,
    lastInspectedAt: '2026-10-28T07:30:00Z',
    inspectedBy: 'Walter Sánchez (Supervisor)',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    isBlocked: isAnden5 || isAnden28
  };
});

export function getAndenes(): AndenInspection[] {
  const data = safeGet<AndenInspection[]>(KEYS.ANDENES, []);
  if (!data || data.length === 0) {
    safeSet(KEYS.ANDENES, INITIAL_ANDENES);
    return INITIAL_ANDENES;
  }
  // Si en localStorage había menos de 34 andenes (ej: versión anterior con 12), completar hasta 34
  if (data.length < 34) {
    const existingMap = new Map<number, AndenInspection>(data.map(a => [a.andenNumber, a]));
    const mergedList: AndenInspection[] = INITIAL_ANDENES.map(seed => {
      const existing = existingMap.get(seed.andenNumber);
      return existing || seed;
    });
    safeSet(KEYS.ANDENES, mergedList);
    return mergedList;
  }
  return data;
}

export function saveAndenInspection(anden: AndenInspection): void {
  const current = getAndenes();
  const existsIdx = current.findIndex(a => a.id === anden.id || a.andenNumber === anden.andenNumber);
  let updatedList: AndenInspection[];
  if (existsIdx >= 0) {
    updatedList = [...current];
    updatedList[existsIdx] = anden;
  } else {
    updatedList = [...current, anden];
  }
  safeSet(KEYS.ANDENES, updatedList);
}

// ==========================================
// CHECKLIST GRÚAS & TRANSPALETAS ELÉCTRICAS
// Formato Oficial CIAL: CIAL-PR&MA-FOR-27
// ==========================================

export const DEFAULT_GRUA_CHECKLIST_ITEMS: {
  itemId: string;
  label: string;
  section: 'general' | 'visual' | 'operacional';
  isCritical?: boolean;
}[] = [
  // 1. INSPECCION GENERAL
  { itemId: 'curso_operador', section: 'general', label: 'Operador tiene curso de operador de equipos móviles', isCritical: true },
  { itemId: 'autorizacion_manejo', section: 'general', label: 'Operador tiene autorización para manejo (nombre de quien autoriza)', isCritical: true },
  { itemId: 'bocina', section: 'general', label: 'Bocina funciona correctamente' },
  { itemId: 'clave_unica', section: 'general', label: 'Operador posee clave única de operación' },
  { itemId: 'bateria_estado', section: 'general', label: 'Batería en buen estado' },

  // 2. INSPECCION VISUAL
  { itemId: 'plataforma', section: 'visual', label: 'Plataforma en correcto estado' },
  { itemId: 'brazos_apoyo', section: 'visual', label: 'Brazos de apoyo en buen estado' },
  { itemId: 'pernos_tuercas', section: 'visual', label: 'Pernos y tuercas en buen estado' },
  { itemId: 'chasis_golpes', section: 'visual', label: 'Chasis sin golpes considerables' },
  { itemId: 'limpieza', section: 'visual', label: 'Cuidado y limpieza' },

  // 3. REVISION OPERACIONAL
  { itemId: 'frenos', section: 'operacional', label: 'Sistema de frenos funciona correctamente', isCritical: true },
  { itemId: 'direccion', section: 'operacional', label: 'Sistema de dirección operativo y en buen estado (comando)', isCritical: true },
  { itemId: 'ruedas', section: 'operacional', label: 'Ruedas en buen estado' },
  { itemId: 'elevacion_horquillas', section: 'operacional', label: 'Elevación de las horquillas operativa' },
  { itemId: 'seguro_horquillas', section: 'operacional', label: 'Seguro de horquillas operativas' },
  { itemId: 'indicador_bateria', section: 'operacional', label: 'Indicador carga de batería operativo' }
];

export const INITIAL_GRUA_CHECKLISTS: GruaChecklistReport[] = [
  {
    id: 'chk-7315-seed',
    code: 'CHK-7315-01',
    formCode: 'CIAL-PR&MA-FOR-27',
    equipmentNumber: '7315',
    equipmentType: 'Transpaleta Eléctrica Hombre a Bordo',
    area: 'Despacho',
    date: '2026-10-27',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    evaluatorName: 'Bryan Mariño',
    supervisorName: 'Walter Sánchez',
    evaluations: DEFAULT_GRUA_CHECKLIST_ITEMS.map(item => ({
      ...item,
      value: 'cumple' as const,
      observacion: item.itemId === 'chasis_golpes' ? 'Rayadura sección' : undefined
    })),
    comments: 'Equipo operativo y liberado para operaciones de despacho turno mañana.',
    finalStatus: 'aprobado',
    createdAt: '2026-10-27T07:15:00Z'
  }
];

export function getGruaChecklists(): GruaChecklistReport[] {
  const data = safeGet<GruaChecklistReport[]>(KEYS.GRUA_CHECKLISTS, []);
  if (!data || data.length === 0) {
    safeSet(KEYS.GRUA_CHECKLISTS, INITIAL_GRUA_CHECKLISTS);
    return INITIAL_GRUA_CHECKLISTS;
  }
  return data;
}

export function saveGruaChecklist(report: GruaChecklistReport): void {
  const current = getGruaChecklists();
  safeSet(KEYS.GRUA_CHECKLISTS, [report, ...current]);
}
