import { LupItem, CharlaSession, PalletJackReport, RfScannerReport } from '../types';
import { INITIAL_LUPS, INITIAL_CHARLAS, INITIAL_PALLETS, INITIAL_RFS } from '../data/seedData';

const KEYS = {
  LUPS: 'cial_zv_lups_v1',
  CHARLAS: 'cial_zv_charlas_v1',
  PALLETS: 'cial_zv_pallets_v1',
  RFS: 'cial_zv_rfs_v1'
};

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

// LUPs
export function getLups(): LupItem[] {
  const data = safeGet<LupItem[]>(KEYS.LUPS, []);
  if (!data || data.length === 0) {
    safeSet(KEYS.LUPS, INITIAL_LUPS);
    return INITIAL_LUPS;
  }
  // Sincronizar fotos en LUPs iniciales si no las tenían
  if (data.length > 0 && !data[0].doPractice.photoUrl) {
    const enriched = data.map(item => {
      const seed = INITIAL_LUPS.find(s => s.id === item.id);
      if (seed && seed.doPractice.photoUrl) {
        return {
          ...item,
          doPractice: { ...item.doPractice, photoUrl: seed.doPractice.photoUrl, photoSizeKb: seed.doPractice.photoSizeKb },
          dontPractice: { ...item.dontPractice, photoUrl: seed.dontPractice.photoUrl, photoSizeKb: seed.dontPractice.photoSizeKb }
        };
      }
      return item;
    });
    safeSet(KEYS.LUPS, enriched);
    return enriched;
  }
  return data;
}

export function saveLup(lup: LupItem): void {
  const current = getLups();
  const exists = current.findIndex(item => item.id === lup.id);
  let updated: LupItem[];
  if (exists >= 0) {
    updated = [...current];
    updated[exists] = lup;
  } else {
    updated = [lup, ...current];
  }
  safeSet(KEYS.LUPS, updated);
}

export function deleteLup(id: string): void {
  const current = getLups();
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
