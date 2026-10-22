export type LupCategory = 
  | 'Seguridad SSO'
  | 'Cadena de Frío'
  | 'Operación de Equipos'
  | 'Calidad & BPM'
  | 'Mantención Autónoma 5S'
  | 'Calidad / Inocuidad'
  | 'Despacho & Zonales'
  | 'Eficiencia Operacional';

export interface LupPractice {
  title: string;
  description: string;
  points: string[];
  photoUrl?: string; // Foto liviana del caso (correcto o incorrecto)
  photoSizeKb?: number;
}

export interface LupItem {
  id: string;
  code: string; // e.g. "LUP-SSO-001"
  title: string;
  category: LupCategory;
  summary: string;
  objective: string;
  durationMinutes: number; // typically 5
  doPractice: LupPractice; // ✅ Qué SÍ hacer
  dontPractice: LupPractice; // ❌ Qué NO hacer
  keyPoints: string[];
  safetyWarning?: string;
  imageUrl?: string;
  oneDriveUrl?: string; // Link to Ariel Mella's OneDrive / SharePoint
  author: string;
  createdAt: string;
  area: string;
}

export type ShiftId = 'manana' | 'tarde' | 'noche';

export type ShiftType = 'Turno 1 (Mañana 07:00 - 15:00)' | 'Turno 2 (Tarde 15:00 - 23:00)' | 'Turno 3 (Noche 23:00 - 07:00)';

export interface CharlaSession {
  id: string;
  lupId: string;
  lupCode: string;
  lupTitle: string;
  facilitator: string; // Operador o Líder que dictó la charla
  supervisor: string; // Supervisor formal a cargo del registro del turno
  shift: ShiftType;
  shiftId: ShiftId;
  area: string; // e.g. "Andenes de Despacho", "Cámara Frigorífica P2"
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationSeconds: number; // e.g. 300 (5 min)
  attendeesCount: number;
  attendeesNotes?: string;
  keyAgreements?: string; // Acuerdos tomados en la charla
  photoUrl?: string; // Foto liviana de evidencia de la charla
  photoSizeKb?: number; // Tamaño en KB (< 80 KB)
  createdAt: string;
}

export type EquipmentSeverity = 'critica' | 'moderada' | 'leve';

export type PalletProblemType = 
  | 'fuga_hidraulica'
  | 'no_eleva'
  | 'rueda_trabada'
  | 'timon_danado'
  | 'horquilla_doblada'
  | 'valvula_descenso'
  | 'otro';

export type EquipmentStatus = 
  | 'pendiente'          // Reportado por operador, esperando retiro/evaluación
  | 'retirada_proveedor' // Retirada por proveedor / trasladada a taller externo
  | 'en_taller'          // En proceso de reparación activa
  | 'reparada'           // Reparada y devuelta a operación
  | 'de_baja';          // Dada de baja por daño irreparable

export interface PalletJackReport {
  id: string;
  code: string; // e.g. "TM-04", "TM-12"
  brand: string; // e.g. "Jungheinrich AM 22", "Noblelift", "BT Lifter", "Crown"
  reportedAt: string; // ISO string
  reportedBy: string; // Nombre del operador
  shift: ShiftType;
  area: string; // e.g. "Andén 4", "Cámara Frío 1", "Patio Carga"
  problemType: PalletProblemType;
  problemTitle: string;
  problemDescription: string;
  photoUrl?: string;
  severity: EquipmentSeverity;
  status: EquipmentStatus;
  providerName: string; // e.g. "Servicio Técnico Hidráulico Valparaíso / CIAL"
  sentToProviderAt?: string;
  estimatedReturnAt?: string;
  returnedAt?: string;
  repairCost?: number;
  technicianNotes?: string;
}

export type RfProblemType = 
  | 'gatillo_trabado'
  | 'pantalla_rota'
  | 'sin_wifi'
  | 'bateria_danada'
  | 'laser_sucio'
  | 'reinicio_constante'
  | 'error_sap'
  | 'otro';

export interface RfScannerReport {
  id: string;
  code: string; // e.g. "RF-08", "RF-15"
  model: string; // e.g. "Zebra TC26", "Zebra MC3300", "Honeywell CK65"
  serialNumber?: string;
  reportedAt: string; // ISO string
  reportedBy: string;
  shift: ShiftType;
  area: string;
  problemType: RfProblemType;
  problemTitle: string;
  problemDescription: string;
  photoUrl?: string;
  severity: EquipmentSeverity;
  status: EquipmentStatus;
  providerName: string; // e.g. "Soporte TI CIAL / Partner Zebra"
  sentToProviderAt?: string;
  estimatedReturnAt?: string;
  returnedAt?: string;
  technicianNotes?: string;
}

export type MainTab = 
  | 'dashboard' 
  | 'lups' 
  | 'charla-timer' 
  | 'transpaletas' 
  | 'pistolas-rf' 
  | 'historial-charlas' 
  | 'reportes-sla';
