import { LupItem, LupAuditLog, CharlaSession, PalletJackReport, RfScannerReport } from '../types';
import { INITIAL_LUPS, INITIAL_CHARLAS, INITIAL_PALLETS, INITIAL_RFS } from '../data/seedData';

const KEYS = {
  LUPS: 'cial_zv_lups_v1',
  AUDIT_LOGS: 'cial_zv_audit_logs_v1',
  CHARLAS: 'cial_zv_charlas_v1',
  PALLETS: 'cial_zv_pallets_v1',
  RFS: 'cial_zv_rfs_v1'
};

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

// LUPs
export function getLups(): LupItem[] {
  const data = safeGet<LupItem[]>(KEYS.LUPS, []);
  if (!data || data.length === 0) {
    safeSet(KEYS.LUPS, INITIAL_LUPS);
    return INITIAL_LUPS;
  }
  
  // Sincronizar o incorporar nuevos LUPs oficiales de CIAL
  const existingIds = new Set(data.map(item => item.id));
  const hasMissingSeeds = INITIAL_LUPS.some(seed => !existingIds.has(seed.id));
  
  if (hasMissingSeeds || data.some(item => item.id.startsWith('lup-cial-') && !item.doPractice.photoUrl)) {
    // Mantener los LUPs creados por el usuario y asegurar todos los LUPs iniciales actualizados
    const userCreated = data.filter(item => !INITIAL_LUPS.some(seed => seed.id === item.id));
    const merged = [...INITIAL_LUPS, ...userCreated];
    safeSet(KEYS.LUPS, merged);
    return merged;
  }

  return data;
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

export function deleteLup(id: string, userEmail?: string, reason?: string): void {
  const current = getLups();
  const target = current.find(item => item.id === id);
  const now = new Date().toISOString();
  const actor = userEmail || 'colaborador@cial.cl';

  if (target) {
    // Registrar evento de eliminación en auditoría
    addLupAuditLog({
      id: `audit-del-${Date.now()}`,
      lupId: target.id,
      lupCode: target.code,
      lupTitle: target.title,
      action: 'ELIMINADO',
      performedBy: actor,
      performedAt: now,
      details: reason || 'Eliminado del catálogo activo',
      area: target.area
    });
  }

  safeSet(KEYS.LUPS, current.filter(item => item.id !== id));
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
  if (!data || data.length === 0) {
    safeSet(KEYS.PALLETS, INITIAL_PALLETS);
    return INITIAL_PALLETS;
  }
  return data;
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
  if (!data || data.length === 0) {
    safeSet(KEYS.RFS, INITIAL_RFS);
    return INITIAL_RFS;
  }
  return data;
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
