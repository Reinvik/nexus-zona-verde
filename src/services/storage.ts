import { 
  LupItem, 
  LupAuditLog, 
  CharlaSession, 
  PalletJackReport, 
  RfScannerReport, 
  OperatorItem, 
  AttendanceRecord,
  AppUser,
  UserRole,
  UserPermissions
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
  USERS: 'cial_zv_users_v1'
};

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  jefatura: {
    canDeleteLup: true,
    canEditLup: true,
    canCreateLup: true,
    canManageAttendance: true,
    canManageUsers: true,
    canManageEquipment: true
  },
  supervisor: {
    canDeleteLup: true, // Supervisores y Jefaturas pueden eliminar LUPs
    canEditLup: true,
    canCreateLup: true,
    canManageAttendance: true,
    canManageUsers: false,
    canManageEquipment: true
  },
  operador: {
    canDeleteLup: false,
    canEditLup: false,
    canCreateLup: false,
    canManageAttendance: false,
    canManageUsers: false,
    canManageEquipment: false
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
  
  // Sincronizar únicamente si faltan semillas activas que nunca fueron eliminadas
  const existingIds = new Set(data.map(item => item.id));
  const missingSeeds = activeSeeds.filter(seed => !existingIds.has(seed.id));
  
  if (missingSeeds.length > 0) {
    const userCreated = data.filter(item => !deletedIds.has(item.id));
    const merged = [...userCreated, ...missingSeeds];
    safeSet(KEYS.LUPS, merged);
    return merged;
  }

  return data.filter(item => !deletedIds.has(item.id));
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

export function getAttendanceRecords(date?: string, shiftId?: string): AttendanceRecord[] {
  try {
    const targetDate = date || new Date().toISOString().slice(0, 10);
    
    // 1. Get historical baseline records for this targetDate
    const histRecords = getHistoricalAttendanceForDate(targetDate, shiftId);
    const map = new Map<string, AttendanceRecord>();
    for (const r of histRecords) {
      map.set(`${r.date}_${r.operatorId}`, r);
    }

    // 2. Overlay manual overrides from localStorage
    const raw = localStorage.getItem(KEYS.ATTENDANCE);
    if (raw) {
      const overrides: AttendanceRecord[] = JSON.parse(raw);
      for (const ov of overrides) {
        if (date && ov.date !== date) continue;
        if (shiftId && shiftId !== 'todos' && ov.shiftId !== shiftId) continue;
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
  } catch (e) {
    console.error('Error saving attendance record:', e);
  }
}

export function saveBulkAttendance(records: AttendanceRecord[]): void {
  try {
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
  } catch (e) {
    console.error('Error saving bulk attendance:', e);
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
