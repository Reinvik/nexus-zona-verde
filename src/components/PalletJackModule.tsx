import React, { useState, useEffect, useMemo } from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  Clock, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  FileSpreadsheet, 
  ExternalLink,
  ChevronRight,
  Filter,
  X,
  ArrowRight,
  Image as ImageIcon,
  MapPin,
  Gauge,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Edit3,
  Trash2,
  LayoutGrid,
  ListFilter,
  SlidersHorizontal,
  Check,
  AlertOctagon,
  HelpCircle,
  PackageCheck,
  ArrowUpDown,
  BookOpen,
  ZoomIn,
  Eye,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  PalletJackReport, 
  PalletProblemType, 
  EquipmentSeverity, 
  EquipmentStatus, 
  ShiftType,
  PalletJackAsset,
  PalletConservationStatus,
  PalletTechnicalComponent
} from '../types';
import { 
  savePallet, 
  calculateElapsedHours, 
  formatDurationHuman, 
  getSlaHealth, 
  exportToCsv,
  getPalletInventory,
  savePalletInventoryItem,
  deletePalletInventoryItem,
  updatePalletLocation,
  updatePalletStatus,
  resetPalletInventory
} from '../services/storage';
import partesTranspaletaImg from '../assets/partes-transpaleta-diagrama.png';
import { PredictiveLeaderInput } from './PredictiveLeaderInput';
import { PredictiveTextarea } from './PredictiveTextarea';

interface PalletJackModuleProps {
  pallets: PalletJackReport[];
  onPalletsUpdated: () => void;
  readOnly?: boolean;
}

export const PalletJackModule: React.FC<PalletJackModuleProps> = ({
  pallets,
  onPalletsUpdated,
  readOnly = false
}) => {
  // Navigation between Inventory Master and Repair Tickets
  const [viewMode, setViewMode] = useState<'inventory' | 'tickets'>('inventory');

  // ==========================================
  // INVENTORY STATE & DATA
  // ==========================================
  const [inventory, setInventory] = useState<PalletJackAsset[]>([]);
  const [inventorySearch, setInventorySearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'todos' | PalletConservationStatus>('todos');
  const [locationFilter, setLocationFilter] = useState<string>('todas');
  const [componentFilter, setComponentFilter] = useState<string>('todos');
  const [inventoryLayout, setInventoryLayout] = useState<'cards' | 'table'>('cards');

  // Diagram & Visual Guide State
  const [showDiagramSection, setShowDiagramSection] = useState<boolean>(true);
  const [showDiagramModal, setShowDiagramModal] = useState<boolean>(false);
  const [selectedPartNum, setSelectedPartNum] = useState<number | null>(null);

  // Modals for Inventory
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const [editingAsset, setEditingAsset] = useState<PalletJackAsset | null>(null);

  // Asset Form State
  const [assetCode, setAssetCode] = useState<string>('TP-');
  const [assetCapacity, setAssetCapacity] = useState<number>(2500);
  const [assetCapacityConfirmed, setAssetCapacityConfirmed] = useState<boolean>(false);
  const [assetLocation, setAssetLocation] = useState<string>('PICKING');
  const [assetStatus, setAssetStatus] = useState<PalletConservationStatus>('BUENO');
  const [assetComponent, setAssetComponent] = useState<PalletTechnicalComponent>('SIN NOVEDAD');
  const [assetNotes, setAssetNotes] = useState<string>('');
  const [assetBrand, setAssetBrand] = useState<string>('Estándar CIAL / Jungheinrich');

  // Load Inventory from storage
  const loadInventory = () => {
    const data = getPalletInventory();
    setInventory(data);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // ==========================================
  // TICKETS / SLA STATE & MODALS
  // ==========================================
  const [ticketSearch, setTicketSearch] = useState<string>('');
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string>('todos');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [activePalletDetail, setActivePalletDetail] = useState<PalletJackReport | null>(null);

  // Form State for reporting a damaged pallet jack
  const [code, setCode] = useState<string>('TP-');
  const [brand, setBrand] = useState<string>('Jungheinrich AM 22');
  const [reportedBy, setReportedBy] = useState<string>('');
  const [shift, setShift] = useState<ShiftType>('Turno 1');
  const [area, setArea] = useState<string>('PICKING');
  const [problemType, setProblemType] = useState<PalletProblemType>('fuga_hidraulica');
  const [problemTitle, setProblemTitle] = useState<string>('');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [severity, setSeverity] = useState<EquipmentSeverity>('critica');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string>('Proveedor Transpaletas');

  const problemOptions: { type: PalletProblemType; label: string; icon: string }[] = [
    { type: 'fuga_hidraulica', label: '💧 Fuga de Aceite / Hidráulico', icon: '💧' },
    { type: 'no_eleva', label: '⛔ No Eleva / Pierde Altura', icon: '⛔' },
    { type: 'rueda_trabada', label: '⚙️ Rueda Trabada / Dañada', icon: '⚙️' },
    { type: 'timon_danado', label: '🦯 Timón Suelto o Roto', icon: '🦯' },
    { type: 'horquilla_doblada', label: '📐 Horquilla Deformada', icon: '📐' },
    { type: 'valvula_descenso', label: '🛑 Válvula Descenso Falla', icon: '🛑' },
    { type: 'otro', label: '⚠️ Otra Falla Mecánica', icon: '⚠️' }
  ];

  // Component Options for Technical Diagnostics
  const componentOptions: { id: PalletTechnicalComponent; label: string }[] = [
    { id: 'SIN NOVEDAD', label: '✅ Sin Novedad / Operativa' },
    { id: 'SISTEMA DE ELEVACION HIDRAULICO', label: '💧 6. Sistema Hidráulico' },
    { id: 'CHASIS', label: '🛡️ 4. Chasis / Estructura' },
    { id: 'FRENO DE MANO', label: '🛑 7. Freno de Mano [Crítico]' },
    { id: 'RUEDA', label: '⚙️ 3. Ruedas' },
    { id: 'HORQUILLAS', label: '📐 5. Horquillas' },
    { id: 'TIMON', label: '🦯 1. Timón' },
    { id: 'BARRA DE TRACCION', label: '🔗 2. Barra de Tracción' },
    { id: 'OTRO', label: '⚠️ Otra Falla' }
  ];

  // Known Locations in CD CIAL
  const standardLocations = [
    'PICKING',
    'DESPACHO',
    'SALA DE LAVADO',
    'LI',
    'PALETIZADO',
    'REEMPLAZO ZONALES',
    'TALLER EXTERNO'
  ];

  // ==========================================
  // INVENTORY CALCULATIONS & METRICS
  // ==========================================
  const totalAssets = inventory.length;
  const buenoCount = inventory.filter(i => i.status === 'BUENO').length;
  const regularCount = inventory.filter(i => i.status === 'REGULAR').length;
  const maloCount = inventory.filter(i => i.status === 'MALO').length;
  const availabilityRate = totalAssets > 0 ? (((buenoCount + regularCount) / totalAssets) * 100).toFixed(1) : '0';

  // Count by failure component
  const failureCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'SISTEMA DE ELEVACION HIDRAULICO': 0,
      'CHASIS': 0,
      'FRENO DE MANO': 0,
      'RUEDA': 0,
      'HORQUILLAS': 0,
      'TIMON': 0,
      'BARRA DE TRACCION': 0,
      'TOTAL_FALLAS': 0
    };
    inventory.forEach(item => {
      if (item.status !== 'BUENO' && item.componentObs && item.componentObs !== 'SIN NOVEDAD') {
        counts.TOTAL_FALLAS += 1;
        if (counts[item.componentObs] !== undefined) {
          counts[item.componentObs] += 1;
        }
      }
    });
    return counts;
  }, [inventory]);

  // Visual Parts Guide Definition (Mapped to the 7 parts of the diagram)
  const PALLET_PARTS_GUIDE = useMemo(() => [
    {
      num: 1,
      name: 'Timón',
      techComponent: 'TIMON',
      shortRole: 'Dirección & Bombeo',
      desc: 'Empuñadura ergonómica de control y accionamiento manual del bombeo de elevación.',
      failurePoints: 'Holgura excesiva, fijación suelta en base, deformación por sobreesfuerzo.',
      inspectionTip: 'Revisar que retorne suavemente a posición vertical y que no tenga juego lateral.',
      activeCount: failureCounts['TIMON'] || 0,
      isCritical: false
    },
    {
      num: 2,
      name: 'Barra de tracción',
      techComponent: 'BARRA DE TRACCION',
      shortRole: 'Varilla de Transmisión',
      desc: 'Transmite la fuerza mecánica de bombeo del timón hacia el grupo hidráulico.',
      failurePoints: 'Pernos cortados, pasadores desgastados, fatiga o desalineación de la varilla.',
      inspectionTip: 'Comprobar lubricación y ausencia de pernos sueltos o pasadores torcidos.',
      activeCount: failureCounts['BARRA DE TRACCION'] || 0,
      isCritical: false
    },
    {
      num: 3,
      name: 'Ruedas',
      techComponent: 'RUEDA',
      shortRole: 'Rodillos & Directrices',
      desc: 'Ruedas directrices traseras bajo el timón y rodillos tándem delanteros de carga en puntas.',
      failurePoints: 'Rodamientos trabados, desprendimiento de banda de poliuretano, deformación por clavos o alambres.',
      inspectionTip: 'Mantener andenes limpios. Retirar zunchos plásticos o film stretch enrollado en los ejes.',
      activeCount: failureCounts['RUEDA'] || 1,
      sampleCode: 'TP-001',
      isCritical: false
    },
    {
      num: 4,
      name: 'Chasis',
      techComponent: 'CHASIS',
      shortRole: 'Estructura Monocasco',
      desc: 'Cuerpo estructural de acero de alta resistencia que une el puente de elevación y las horquillas.',
      failurePoints: 'Deformación estructural por sobrecarga, fisuras en soldaduras, roce con piso o impacto de grúas.',
      inspectionTip: 'No sobrepasar nunca la capacidad nominal (2.500 kg) y no arrastrar sobre baches pronunciados.',
      activeCount: failureCounts['CHASIS'] || 4,
      sampleCode: 'TP-002, TP-010, TP-015, TP-020',
      isCritical: false
    },
    {
      num: 5,
      name: 'Horquillas',
      techComponent: 'HORQUILLAS',
      shortRole: 'Uñas de Sustentación',
      desc: 'Brazos de penetración y soporte donde descansan los pallets de carga en andenes y cámaras.',
      failurePoints: 'Horquilla doblada, desnivel de altura entre uñas (carga inclinada), desgaste en patines de entrada.',
      inspectionTip: 'Centrar siempre la carga en ambas horquillas antes de trasladar. Prohibido cargar en una sola uña.',
      activeCount: failureCounts['HORQUILLAS'] || 1,
      sampleCode: 'TP-014',
      isCritical: false
    },
    {
      num: 6,
      name: 'Sistema de elevación hidráulico',
      techComponent: 'SISTEMA DE ELEVACION HIDRAULICO',
      shortRole: 'Bomba & Cilindro',
      desc: 'Cilindro hidráulico, sellos/retenes de alta presión, bomba de pistón y depósito de aceite.',
      failurePoints: 'Fuga de aceite por empaquetaduras, pérdida gradual de altura bajo carga (baja sola), válvula trabada.',
      inspectionTip: 'Si presenta charcos de aceite o no mantiene la elevación, dar de baja inmediata para evitar caídas.',
      activeCount: failureCounts['SISTEMA DE ELEVACION HIDRAULICO'] || 6,
      sampleCode: 'TP-018, TP-021, TP-022, TP-030, TP-032, TP-038',
      isCritical: false
    },
    {
      num: 7,
      name: 'Freno de mano',
      techComponent: 'FRENO DE MANO',
      shortRole: 'Gatillo & Palanca Mando',
      desc: 'Palanca de mando de 3 posiciones (Elevar, Neutro, Frenar/Descenso) conectada por cable acerado.',
      failurePoints: 'Cable acerado cortado o destensado, traba de seguridad partida, gatillo no retiene la máquina.',
      inspectionTip: '¡Riesgo crítico de atropello o atrapamiento en pendientes de andenes! Prohibido operar si el freno no responde.',
      activeCount: failureCounts['FRENO DE MANO'] || 2,
      sampleCode: 'TP-011, TP-019',
      isCritical: true
    }
  ], [failureCounts]);

  // Unique locations from data
  const uniqueLocations = useMemo(() => {
    const locSet = new Set<string>();
    inventory.forEach(item => {
      if (item.location) locSet.add(item.location);
    });
    return Array.from(locSet).sort();
  }, [inventory]);

  // Filtered inventory list
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = 
        item.code.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        item.location.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        (item.notes || '').toLowerCase().includes(inventorySearch.toLowerCase()) ||
        (item.componentObs || '').toLowerCase().includes(inventorySearch.toLowerCase());

      const matchesStatus = statusFilter === 'todos' || item.status === statusFilter;
      const matchesLocation = locationFilter === 'todas' || item.location === locationFilter;
      const matchesComponent = 
        componentFilter === 'todos' 
          ? true 
          : componentFilter === 'CON_FALLA'
            ? item.status !== 'BUENO'
            : item.componentObs === componentFilter;

      return matchesSearch && matchesStatus && matchesLocation && matchesComponent;
    });
  }, [inventory, inventorySearch, statusFilter, locationFilter, componentFilter]);

  // ==========================================
  // INVENTORY ACTIONS
  // ==========================================
  const handleOpenAddAsset = () => {
    setEditingAsset(null);
    setAssetCode(`TP-${String(inventory.length + 1).padStart(3, '0')}`);
    setAssetCapacity(2500);
    setAssetCapacityConfirmed(false);
    setAssetLocation('PICKING');
    setAssetStatus('BUENO');
    setAssetComponent('SIN NOVEDAD');
    setAssetNotes('');
    setAssetBrand('Estándar CIAL / Jungheinrich');
    setShowAssetModal(true);
  };

  const handleOpenEditAsset = (asset: PalletJackAsset) => {
    setEditingAsset(asset);
    setAssetCode(asset.code);
    setAssetCapacity(asset.capacityKg || 2500);
    setAssetCapacityConfirmed(asset.capacityConfirmed);
    setAssetLocation(asset.location);
    setAssetStatus(asset.status);
    setAssetComponent((asset.componentObs as PalletTechnicalComponent) || 'SIN NOVEDAD');
    setAssetNotes(asset.notes || '');
    setAssetBrand(asset.brand || 'Estándar CIAL');
    setShowAssetModal(true);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = assetCode.trim().toUpperCase();
    const assetToSave: PalletJackAsset = {
      id: editingAsset ? editingAsset.id : cleanCode,
      code: cleanCode,
      capacityKg: Number(assetCapacity) || 2500,
      capacityConfirmed: assetCapacityConfirmed,
      location: assetLocation.trim().toUpperCase(),
      status: assetStatus,
      componentObs: assetStatus === 'BUENO' ? 'SIN NOVEDAD' : assetComponent,
      notes: assetNotes.trim(),
      brand: assetBrand.trim(),
      updatedAt: new Date().toISOString()
    };

    savePalletInventoryItem(assetToSave);
    loadInventory();
    setShowAssetModal(false);
  };

  const handleDeleteAsset = (id: string, code: string) => {
    if (readOnly) return;
    if (confirm(`¿Está seguro de eliminar la transpaleta ${code} del inventario permanente?`)) {
      deletePalletInventoryItem(id);
      loadInventory();
    }
  };

  const handleQuickStatusChange = (asset: PalletJackAsset, newStatus: PalletConservationStatus) => {
    if (readOnly) return;
    updatePalletStatus(asset.id, newStatus);
    loadInventory();
  };

  const handleQuickLocationChange = (asset: PalletJackAsset, newLocation: string) => {
    if (readOnly) return;
    updatePalletLocation(asset.id, newLocation);
    loadInventory();
  };

  const handleResetToOfficialSeeds = () => {
    if (readOnly) return;
    if (confirm('¿Restablecer el inventario maestro con las 34 transpaletas oficiales del Centro de Distribución CIAL?')) {
      resetPalletInventory();
      loadInventory();
    }
  };

  const handleExportInventoryCsv = () => {
    const rows = inventory.map(item => ({
      'Código Transpaleta': item.code,
      'Ubicación': item.location,
      'Estado Conservación': item.status,
      'Falla / Componente Afectado': item.componentObs || 'SIN NOVEDAD',
      'Observaciones Técnicas': item.notes || '',
      'Capacidad (Kg)': item.capacityKg,
      'Capacidad Confirmada Proveedor': item.capacityConfirmed ? 'SÍ' : 'POR CONFIRMAR',
      'Marca / Modelo': item.brand || 'Estándar CIAL'
    }));
    exportToCsv('Inventario_Maestro_Transpaletas_CIAL', rows);
  };

  // Convert an asset directly to a service repair ticket
  const handleOpenTicketFromAsset = (asset: PalletJackAsset) => {
    setCode(asset.code);
    setArea(asset.location);
    setBrand(asset.brand || 'Jungheinrich AM 22');
    setProblemTitle(
      asset.componentObs !== 'SIN NOVEDAD'
        ? `Falla en ${asset.componentObs}`
        : 'Transpaleta con Falla Mecánica'
    );
    setProblemDescription(
      asset.notes || `Equipo ${asset.code} reportado con condición ${asset.status}. Requiere retiro de proveedor técnico.`
    );
    
    // Auto-map problem type
    if (asset.componentObs === 'SISTEMA DE ELEVACION HIDRAULICO') {
      setProblemType('no_eleva');
    } else if (asset.componentObs === 'RUEDA') {
      setProblemType('rueda_trabada');
    } else if (asset.componentObs === 'HORQUILLAS') {
      setProblemType('horquilla_doblada');
    } else if (asset.componentObs === 'FRENO DE MANO') {
      setProblemType('valvula_descenso');
    } else {
      setProblemType('otro');
    }

    setSeverity(asset.status === 'MALO' ? 'critica' : 'moderada');
    setShowReportModal(true);
  };

  // ==========================================
  // TICKETS ACTIONS & HANDLERS
  // ==========================================
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateCamera = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=60'
    ];
    setPhotoPreview(samplePhotos[Math.floor(Math.random() * samplePhotos.length)]);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    const newReport: PalletJackReport = {
      id: `pal-${Date.now()}`,
      code: cleanCode,
      brand,
      reportedAt: new Date().toISOString(),
      reportedBy: reportedBy.trim() || 'Operador de Turno',
      shift,
      area: area.trim(),
      problemType,
      problemTitle: problemTitle.trim() || problemOptions.find(p => p.type === problemType)?.label || 'Falla Mecánica',
      problemDescription: problemDescription.trim(),
      photoUrl: photoPreview || undefined,
      severity,
      status: 'pendiente',
      providerName
    };

    savePallet(newReport);

    // Also reflect in inventory if exists
    const matchingAsset = inventory.find(i => i.code === cleanCode);
    if (matchingAsset) {
      updatePalletStatus(
        matchingAsset.id, 
        matchingAsset.status === 'BUENO' ? 'REGULAR' : matchingAsset.status, 
        newReport.problemDescription
      );
      loadInventory();
    }

    setShowReportModal(false);
    onPalletsUpdated();

    // Reset Form
    setCode('TP-');
    setProblemTitle('');
    setProblemDescription('');
    setPhotoPreview(null);
  };

  const handleUpdateStatus = (pallet: PalletJackReport, newStatus: EquipmentStatus) => {
    if (readOnly) return;
    const now = new Date().toISOString();
    const updated: PalletJackReport = {
      ...pallet,
      status: newStatus,
      sentToProviderAt: newStatus === 'retirada_proveedor' || newStatus === 'en_taller' 
        ? (pallet.sentToProviderAt || now) 
        : pallet.sentToProviderAt,
      returnedAt: newStatus === 'reparada' ? now : pallet.returnedAt
    };
    savePallet(updated);
    setActivePalletDetail(updated);

    // If marked repaired, update the inventory item back to BUENO!
    if (newStatus === 'reparada') {
      const match = inventory.find(i => i.code === pallet.code);
      if (match) {
        updatePalletStatus(match.id, 'BUENO', 'Reparada por proveedor técnico');
        loadInventory();
      }
    }

    onPalletsUpdated();
  };

  const handleExportCsv = () => {
    const rows = pallets.map(p => {
      const hours = calculateElapsedHours(p.reportedAt, p.returnedAt);
      return {
        'N° Transpaleta': p.code,
        'Marca/Modelo': p.brand,
        'Estado': p.status,
        'Problema': p.problemTitle,
        'Severidad': p.severity,
        'Área': p.area,
        'Reportado Por': p.reportedBy,
        'Fecha Reporte': p.reportedAt.slice(0, 16).replace('T', ' '),
        'Proveedor': p.providerName,
        'Fecha Retorno': p.returnedAt ? p.returnedAt.slice(0, 16).replace('T', ' ') : 'Pendiente',
        'Horas Respuesta': hours,
        'Costo Reparación CLP': p.repairCost || 0
      };
    });
    exportToCsv('Control_Tickets_Transpaletas_CIAL', rows);
  };

  const filteredPallets = pallets.filter(p => {
    const matchesStatus = ticketStatusFilter === 'todos' || p.status === ticketStatusFilter;
    const matchesSearch = 
      p.code.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      p.problemTitle.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      p.area.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      p.reportedBy.toLowerCase().includes(ticketSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: EquipmentStatus) => {
    switch (status) {
      case 'pendiente':
        return { label: 'Pendiente Retiro', class: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'retirada_proveedor':
        return { label: 'Retirada por Proveedor', class: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'en_taller':
        return { label: 'En Taller Técnico', class: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'reparada':
        return { label: 'Reparada / Operativa', class: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'de_baja':
        return { label: 'De Baja / Descarte', class: 'bg-slate-200 text-slate-800 border-slate-300' };
    }
  };

  const getConservationBadge = (status: PalletConservationStatus) => {
    switch (status) {
      case 'BUENO':
        return { 
          label: 'BUENO (Operativa)', 
          short: 'Operativa',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          pill: 'bg-emerald-500 text-white'
        };
      case 'REGULAR':
        return { 
          label: 'REGULAR (En Observación)', 
          short: 'En Observación',
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          pill: 'bg-amber-500 text-white'
        };
      case 'MALO':
        return { 
          label: 'MALO (Fuera de Servicio)', 
          short: 'Fuera de Servicio',
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          pill: 'bg-rose-600 text-white'
        };
    }
  };

  // Metrics for tickets
  const totalCount = pallets.length;
  const pendingCount = pallets.filter(p => p.status === 'pendiente').length;
  const inWorkshopCount = pallets.filter(p => p.status === 'en_taller' || p.status === 'retirada_proveedor').length;
  const repairedCount = pallets.filter(p => p.status === 'reparada').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* ========================================================================= */}
      {/* MAIN TOP SWITCHER: INVENTARIO MAESTRO vs TICKETS DE REPARACIÓN (SLA)      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setViewMode('inventory')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === 'inventory'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-4 h-4 text-[#008744]" />
            <span>Inventario del Parque</span>
            <span className="bg-emerald-100 text-[#008744] text-[10px] font-black px-2 py-0.5 rounded-full">
              {totalAssets} Equipos
            </span>
          </button>

          <button
            onClick={() => setViewMode('tickets')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === 'tickets'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4 text-purple-600" />
            <span>Reportes & SLA Proveedor</span>
            {pendingCount + inWorkshopCount > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                {pendingCount + inWorkshopCount} Activos
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 px-2 text-xs text-slate-500 font-semibold">
          <button
            onClick={() => setShowDiagramModal(true)}
            className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl font-black transition cursor-pointer text-xs"
            title="Ver diagrama con las 7 partes de la transpaleta"
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Diagrama de 7 Partes</span>
          </button>

          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline font-bold">CD CIAL Alimentos</span>
          <span className="inline-flex items-center gap-1 text-[#008744] font-black bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            <Check className="w-3.5 h-3.5" />
            <span>Capacidad: 2.500 kg</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: INVENTARIO MAESTRO DEL PARQUE (34 TRANSPALETAS)                   */}
      {/* ========================================================================= */}
      {viewMode === 'inventory' && (
        <div className="space-y-6">

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            
            {/* Total Parque */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
                <span>Parque Total</span>
                <Truck className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalAssets}</div>
              <div className="text-[11px] text-slate-400 font-semibold mt-0.5">Transpaletas manuales</div>
            </div>

            {/* Operativas (Bueno) */}
            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 shadow-xs">
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold uppercase mb-1">
                <span>Operativas (Bueno)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-900">{buenoCount}</span>
                <span className="text-xs font-bold text-emerald-700">
                  {totalAssets > 0 ? ((buenoCount / totalAssets) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Listas para andenes</div>
            </div>

            {/* En Observación (Regular) */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 shadow-xs">
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase mb-1">
                <span>En Observación</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-900">{regularCount}</span>
                <span className="text-xs font-bold text-amber-700">
                  {totalAssets > 0 ? ((regularCount / totalAssets) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Operan con restricción</div>
            </div>

            {/* Fuera de Servicio (Malo) */}
            <div className="bg-rose-50/80 rounded-2xl p-4 border border-rose-200 shadow-xs">
              <div className="flex items-center justify-between text-rose-800 text-xs font-bold uppercase mb-1">
                <span>Fuera de Servicio</span>
                <AlertOctagon className="w-4 h-4 text-rose-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-rose-900">{maloCount}</span>
                <span className="text-xs font-bold text-rose-700">
                  {totalAssets > 0 ? ((maloCount / totalAssets) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div className="text-[11px] text-rose-700 font-semibold mt-0.5">Inmovilizadas / Taller</div>
            </div>

            {/* Disponibilidad Operativa */}
            <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 text-white shadow-xs">
              <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase mb-1">
                <span>Disponibilidad CD</span>
                <Gauge className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">{availabilityRate}%</div>
              <div className="text-[11px] text-slate-300 font-semibold mt-0.5">
                {buenoCount + regularCount} de {totalAssets} en circulación
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* NUEVO: GUÍA VISUAL & DIAGRAMA DE ANATOMÍA DE LA TRANSPALETA (1 AL 7)      */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white rounded-3xl p-5 sm:p-6 border border-amber-300/80 shadow-xs space-y-4">
            
            {/* Header of Visual Guide */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/80">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>Guía Visual: Anatomía de la Transpaleta & Puntos Críticos de Falla</span>
                    <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      7 Partes Clave
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    Haz clic en el diagrama o en cada parte para conocer dónde suele fallar, cómo inspeccionarla y filtrar los equipos afectados del CD.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setShowDiagramModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ampliar Imagen</span>
                </button>

                <button
                  onClick={() => setShowDiagramSection(!showDiagramSection)}
                  className="px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  {showDiagramSection ? (
                    <>
                      <span>Minimizar</span>
                      <ChevronUp className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Desplegar</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Collapsible Content */}
            {showDiagramSection && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
                
                {/* Left: Diagram Image Box */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-4 border border-amber-200/90 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between text-xs font-black text-amber-900 mb-2">
                      <span className="flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-amber-600" />
                        <span>Diagrama Técnico Oficial</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">Identificación 1 al 7</span>
                    </div>

                    <div 
                      onClick={() => setShowDiagramModal(true)}
                      className="relative rounded-xl overflow-hidden border border-slate-200 cursor-pointer group bg-amber-50/30 flex items-center justify-center p-1"
                    >
                      <img 
                        src={partesTranspaletaImg} 
                        alt="Partes de una Transpaleta Manual" 
                        className="w-full h-auto object-contain max-h-72 rounded-lg group-hover:scale-102 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white font-bold text-xs">
                        <ZoomIn className="w-5 h-5" />
                        <span>Clic para ver en alta resolución</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick pills 1 to 7 */}
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 block mb-2">
                      Selecciona un componente del diagrama:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PALLET_PARTS_GUIDE.map(part => {
                        const isSelected = selectedPartNum === part.num || componentFilter === part.techComponent;
                        return (
                          <button
                            key={part.num}
                            onClick={() => {
                              setSelectedPartNum(part.num);
                              setComponentFilter(part.techComponent);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer border ${
                              isSelected
                                ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-2 ring-amber-300'
                                : part.isCritical
                                  ? 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                              {part.num}
                            </span>
                            <span>{part.name}</span>
                            {part.activeCount > 0 && (
                              <span className={`text-[10px] px-1 py-0.2 rounded-full font-mono ${
                                isSelected ? 'bg-white text-amber-900' : 'bg-amber-200 text-amber-900'
                              }`}>
                                {part.activeCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Technical Explanation & Failure Points Cards */}
                <div className="lg:col-span-7 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {PALLET_PARTS_GUIDE.map(part => {
                    const isSelected = selectedPartNum === part.num || componentFilter === part.techComponent;

                    return (
                      <div
                        key={part.num}
                        className={`bg-white rounded-2xl p-3.5 border transition cursor-pointer hover:shadow-xs ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-400/40 bg-amber-50/20'
                            : part.isCritical
                              ? 'border-rose-300 bg-rose-50/10 hover:border-rose-400'
                              : 'border-slate-200 hover:border-amber-300'
                        }`}
                        onClick={() => {
                          setSelectedPartNum(part.num);
                          setComponentFilter(part.techComponent);
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white ${
                              part.isCritical 
                                ? 'bg-rose-600 shadow-xs' 
                                : part.activeCount > 0 
                                  ? 'bg-amber-600 shadow-xs' 
                                  : 'bg-slate-800'
                            }`}>
                              {part.num}
                            </span>
                            <div>
                              <h4 className="text-xs font-black text-slate-900 flex items-center gap-2">
                                <span>{part.num}. {part.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 font-mono">
                                  ({part.shortRole})
                                </span>
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {part.isCritical && (
                              <span className="text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full">
                                🛑 Riesgo Crítico
                              </span>
                            )}
                            {part.activeCount > 0 ? (
                              <span className="text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                                {part.activeCount} en CD
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                                0 fallas
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description & Failure points */}
                        <div className="mt-2 text-xs space-y-1">
                          <p className="text-slate-600 text-[11px] font-medium leading-relaxed">
                            {part.desc}
                          </p>

                          <div className="bg-slate-50 rounded-xl p-2 border border-slate-100 text-[11px] space-y-0.5">
                            <div>
                              <strong className="text-amber-800">⚠️ Dónde suele fallar:</strong>{' '}
                              <span className="text-slate-700">{part.failurePoints}</span>
                            </div>
                            <div>
                              <strong className="text-[#008744]">🛡️ Prevención / Chequeo:</strong>{' '}
                              <span className="text-slate-700">{part.inspectionTip}</span>
                            </div>
                            {part.sampleCode && (
                              <div className="pt-0.5 text-[10px] text-slate-500">
                                <strong>Equipos detectados en CD CIAL:</strong>{' '}
                                <span className="font-mono font-bold text-slate-800">{part.sampleCode}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Filter Trigger Button */}
                        <div className="mt-2 flex items-center justify-between text-[11px] pt-1">
                          <span className="text-slate-400 font-semibold text-[10px]">
                            {isSelected ? '✓ Filtro activo en el catálogo' : 'Haz clic para filtrar transpaletas'}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setComponentFilter(part.techComponent);
                            }}
                            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black transition cursor-pointer ${
                              isSelected
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            Filtrar este componente
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

          </div>

          {/* Interactive Failure Diagnostic Matrix (Quick Filter Pills) */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Matriz de Diagnóstico Técnico ({failureCounts.TOTAL_FALLAS} Equipos con Observación)</span>
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Filtro directo por componente diagnosticado en el Centro de Distribución CIAL:
                </p>
              </div>

              {componentFilter !== 'todos' && (
                <button
                  onClick={() => setComponentFilter('todos')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Limpiar filtro de componente</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setComponentFilter('todos')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'todos'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Todos los Equipos</span>
                <span className="text-[10px] bg-slate-700 text-white px-1.5 py-0.2 rounded-full">
                  {totalAssets}
                </span>
              </button>

              <button
                onClick={() => setComponentFilter('CON_FALLA')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'CON_FALLA'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span>⚠️ Con Alguna Falla</span>
                <span className="text-[10px] bg-amber-700 text-white px-1.5 py-0.2 rounded-full">
                  {failureCounts.TOTAL_FALLAS}
                </span>
              </button>

              <button
                onClick={() => setComponentFilter('SISTEMA DE ELEVACION HIDRAULICO')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'SISTEMA DE ELEVACION HIDRAULICO'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                <span>💧 6. Elevación Hidráulica</span>
                <span className="text-[10px] bg-blue-700 text-white px-1.5 py-0.2 rounded-full">
                  {failureCounts['SISTEMA DE ELEVACION HIDRAULICO']}
                </span>
              </button>

              <button
                onClick={() => setComponentFilter('CHASIS')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'CHASIS'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>🛡️ 4. Chasis</span>
                <span className="text-[10px] bg-slate-600 text-white px-1.5 py-0.2 rounded-full">
                  {failureCounts['CHASIS']}
                </span>
              </button>

              <button
                onClick={() => setComponentFilter('FRENO DE MANO')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'FRENO DE MANO'
                    ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400'
                    : 'bg-rose-50 text-rose-900 border border-rose-300 hover:bg-rose-100'
                }`}
                title="Riesgo Crítico de Prevención"
              >
                <span>🛑 7. Freno de Mano [Crítico]</span>
                <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded-full">
                  {failureCounts['FRENO DE MANO']}
                </span>
              </button>

              <button
                onClick={() => setComponentFilter('RUEDA')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'RUEDA'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
                }`}
              >
                <span>⚙️ 3. Ruedas</span>
                <span className="text-[10px] bg-purple-700 text-white px-1.5 py-0.2 rounded-full">
                  {failureCounts['RUEDA']}
                </span>
              </button>

              <button
                onClick={() => setComponentFilter('HORQUILLAS')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'HORQUILLAS'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-orange-50 text-orange-900 border border-orange-200 hover:bg-orange-100'
                }`}
              >
                <span>📐 5. Horquillas</span>
                <span className="text-[10px] bg-orange-700 text-white px-1.5 py-0.2 rounded-full">
                  {failureCounts['HORQUILLAS']}
                </span>
              </button>

              <button
                onClick={() => setComponentFilter('SIN NOVEDAD')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  componentFilter === 'SIN NOVEDAD'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <span>✅ Sin Falla (100% OK)</span>
                <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.2 rounded-full">
                  {buenoCount}
                </span>
              </button>
            </div>
          </div>

          {/* Action Header & Filters */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <Truck className="w-6 h-6 text-[#008744]" />
                  <span>Inventario Maestro de Transpaletas Manuales (CD CIAL)</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Control de parque, semáforo de conservación, ubicación actual y trazabilidad de fallas mecánicas.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Reset official seeds button */}
                {!readOnly && (
                  <button
                    onClick={handleResetToOfficialSeeds}
                    title="Restablece las 34 transpaletas con los datos oficiales de la planilla maestra"
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden xl:inline">Sincronizar Oficial (34)</span>
                  </button>
                )}

                {/* Export CSV button */}
                <button
                  onClick={handleExportInventoryCsv}
                  className="px-3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span className="hidden sm:inline">Exportar Planilla</span>
                </button>

                {/* View switcher: Cards vs Table */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-0.5">
                  <button
                    onClick={() => setInventoryLayout('cards')}
                    title="Vista en Tarjetas"
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      inventoryLayout === 'cards' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setInventoryLayout('table')}
                    title="Vista en Tabla"
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      inventoryLayout === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <ListFilter className="w-4 h-4" />
                  </button>
                </div>

                {/* Add pallet button */}
                {!readOnly && (
                  <button
                    onClick={handleOpenAddAsset}
                    className="bg-[#008744] hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Transpaleta</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
              
              {/* Search text */}
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar por N° (TP-001), ubicación, falla..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              {/* Status Filter */}
              <div className="sm:col-span-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'BUENO', label: '🟢 Bueno' },
                  { id: 'REGULAR', label: '🟡 Regular' },
                  { id: 'MALO', label: '🔴 Malo' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                      statusFilter === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Location Select Filter */}
              <div className="sm:col-span-3">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#008744]"
                >
                  <option value="todas">📍 Todas las Ubicaciones ({uniqueLocations.length})</option>
                  {uniqueLocations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc} ({inventory.filter(i => i.location === loc).length})
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* INVENTORY DISPLAY: CARDS VIEW                                             */}
          {/* ========================================================================= */}
          {inventoryLayout === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInventory.map(asset => {
                const badge = getConservationBadge(asset.status);
                const hasFailure = asset.status !== 'BUENO';

                return (
                  <div
                    key={asset.id}
                    className={`bg-white rounded-2xl p-5 border transition flex flex-col justify-between hover:shadow-md ${
                      asset.status === 'MALO'
                        ? 'border-rose-200 hover:border-rose-400 bg-rose-50/10'
                        : asset.status === 'REGULAR'
                          ? 'border-amber-200 hover:border-amber-400 bg-amber-50/10'
                          : 'border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <div>
                      {/* Top Header: Code, Capacity & Status Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-black bg-slate-900 text-white px-2.5 py-1 rounded-xl shadow-xs">
                            {asset.code}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                            {asset.capacityKg.toLocaleString('es-CL')} kg
                          </span>
                        </div>

                        <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                          {badge.short}
                        </span>
                      </div>

                      {/* Location Selector / Display */}
                      <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl mb-3 border border-slate-100">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-[#008744]" />
                          <span>Ubicación:</span>
                        </div>

                        {!readOnly ? (
                          <select
                            value={asset.location}
                            onChange={(e) => handleQuickLocationChange(asset, e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#008744]"
                          >
                            {standardLocations.map(loc => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                            {!standardLocations.includes(asset.location) && (
                              <option value={asset.location}>{asset.location}</option>
                            )}
                          </select>
                        ) : (
                          <span className="text-xs font-black text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {asset.location}
                          </span>
                        )}
                      </div>

                      {/* Technical Diagnostics */}
                      <div className="space-y-2 mb-3">
                        <div className="text-xs">
                          <span className="text-slate-400 font-bold uppercase text-[10px] block">
                            Componente / Diagnóstico:
                          </span>
                          <span className={`font-black text-xs inline-block mt-0.5 ${
                            asset.componentObs === 'FRENO DE MANO' 
                              ? 'text-rose-700' 
                              : asset.componentObs === 'SISTEMA DE ELEVACION HIDRAULICO'
                                ? 'text-blue-700'
                                : asset.status === 'BUENO'
                                  ? 'text-emerald-700'
                                  : 'text-slate-800'
                          }`}>
                            {asset.componentObs || 'SIN NOVEDAD'}
                          </span>
                        </div>

                        {asset.notes && (
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs text-slate-600 font-medium">
                            <span className="font-bold text-slate-700">Obs: </span>
                            {asset.notes}
                          </div>
                        )}
                      </div>

                      {/* Capacity Note */}
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold mb-3">
                        <HelpCircle className="w-3 h-3 text-slate-400" />
                        <span>
                          {asset.capacityConfirmed 
                            ? 'Capacidad verificada en placa' 
                            : 'Capacidad 2.500 kg (Por confirmar con proveedor)'}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      
                      {/* Quick Status Setter (Semáforo Buttons) */}
                      {!readOnly && (
                        <div className="flex items-center justify-between gap-1">
                          <button
                            onClick={() => handleQuickStatusChange(asset, 'BUENO')}
                            title="Marcar como BUENO (Operativa)"
                            className={`flex-1 py-1 rounded-lg text-[10px] font-black uppercase transition cursor-pointer border ${
                              asset.status === 'BUENO'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-50 text-emerald-800 border-slate-200 hover:bg-emerald-50'
                            }`}
                          >
                            Bueno
                          </button>
                          <button
                            onClick={() => handleQuickStatusChange(asset, 'REGULAR')}
                            title="Marcar como REGULAR (En Observación)"
                            className={`flex-1 py-1 rounded-lg text-[10px] font-black uppercase transition cursor-pointer border ${
                              asset.status === 'REGULAR'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'bg-slate-50 text-amber-800 border-slate-200 hover:bg-amber-50'
                            }`}
                          >
                            Regular
                          </button>
                          <button
                            onClick={() => handleQuickStatusChange(asset, 'MALO')}
                            title="Marcar como MALO (Fuera de Servicio)"
                            className={`flex-1 py-1 rounded-lg text-[10px] font-black uppercase transition cursor-pointer border ${
                              asset.status === 'MALO'
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-slate-50 text-rose-800 border-slate-200 hover:bg-rose-50'
                            }`}
                          >
                            Malo
                          </button>
                        </div>
                      )}

                      {/* Bottom Primary Action: Enviar a Taller / Abrir Ticket */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        {!readOnly && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditAsset(asset)}
                              title="Editar datos de la transpaleta"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAsset(asset.id, asset.code)}
                              title="Eliminar del inventario"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {hasFailure ? (
                          <button
                            onClick={() => handleOpenTicketFromAsset(asset)}
                            className="ml-auto bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <Wrench className="w-3.5 h-3.5" />
                            <span>Abrir Ticket Taller</span>
                          </button>
                        ) : (
                          <span className="ml-auto text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Operativa</span>
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ========================================================================= */}
          {/* INVENTORY DISPLAY: TABLE VIEW                                             */}
          {/* ========================================================================= */}
          {inventoryLayout === 'table' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-black uppercase text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">N° Transpaleta</th>
                      <th className="py-3 px-4">Estado Conservación</th>
                      <th className="py-3 px-4">Ubicación</th>
                      <th className="py-3 px-4">Falla / Componente</th>
                      <th className="py-3 px-4">Observaciones Técnicas</th>
                      <th className="py-3 px-4">Capacidad</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInventory.map(asset => {
                      const badge = getConservationBadge(asset.status);
                      const hasFailure = asset.status !== 'BUENO';

                      return (
                        <tr key={asset.id} className="hover:bg-slate-50/80 transition">
                          
                          {/* Code */}
                          <td className="py-3 px-4 font-mono font-black text-slate-900">
                            <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                              {asset.code}
                            </span>
                          </td>

                          {/* Conservation Status Badge */}
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                              {badge.label}
                            </span>
                          </td>

                          {/* Location */}
                          <td className="py-3 px-4 font-bold text-slate-800">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#008744]" />
                              {asset.location}
                            </span>
                          </td>

                          {/* Component */}
                          <td className="py-3 px-4 font-semibold text-slate-700">
                            <span className={
                              asset.componentObs === 'FRENO DE MANO'
                                ? 'text-rose-700 font-bold'
                                : asset.componentObs === 'SISTEMA DE ELEVACION HIDRAULICO'
                                  ? 'text-blue-700 font-bold'
                                  : asset.status === 'BUENO'
                                    ? 'text-emerald-700'
                                    : 'text-slate-800'
                            }>
                              {asset.componentObs || 'SIN NOVEDAD'}
                            </span>
                          </td>

                          {/* Observations */}
                          <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={asset.notes || ''}>
                            {asset.notes || <span className="text-slate-300 italic">Sin observaciones</span>}
                          </td>

                          {/* Capacity */}
                          <td className="py-3 px-4 font-mono font-bold text-slate-600">
                            {asset.capacityKg.toLocaleString('es-CL')} kg
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {hasFailure && (
                                <button
                                  onClick={() => handleOpenTicketFromAsset(asset)}
                                  className="bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                                  title="Abrir Ticket con Proveedor Técnico"
                                >
                                  <Wrench className="w-3 h-3" />
                                  <span>Ticket</span>
                                </button>
                              )}

                              {!readOnly && (
                                <button
                                  onClick={() => handleOpenEditAsset(asset)}
                                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredInventory.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Truck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">No se encontraron transpaletas con los filtros seleccionados</h4>
              <p className="text-xs text-slate-500 mt-1">Prueba quitando los filtros de texto, ubicación o componente.</p>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: REPORTES DE FALLA & SEGUIMIENTO SLA DEL PROVEEDOR                 */}
      {/* ========================================================================= */}
      {viewMode === 'tickets' && (
        <div className="space-y-6">
          
          {/* Top Banner & KPI Summary for Tickets */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
                <span>Total Reportes</span>
                <Truck className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</div>
              <div className="text-[11px] text-slate-400 font-semibold mt-0.5">Historial de tickets</div>
            </div>

            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 shadow-xs">
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase mb-1">
                <span>Pendientes Retiro</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-900">{pendingCount}</div>
              <div className="text-[11px] text-amber-700 font-semibold mt-0.5">En espera en andenes</div>
            </div>

            <div className="bg-purple-50/80 rounded-2xl p-4 border border-purple-200 shadow-xs">
              <div className="flex items-center justify-between text-purple-800 text-xs font-bold uppercase mb-1">
                <span>En Proveedor / Taller</span>
                <Wrench className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-purple-900">{inWorkshopCount}</div>
              <div className="text-[11px] text-purple-700 font-semibold mt-0.5">En mantención activa</div>
            </div>

            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 shadow-xs">
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold uppercase mb-1">
                <span>Reparadas OK</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-900">{repairedCount}</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">100% operativas</div>
            </div>
          </div>

          {/* Action Header & Filters */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-purple-600" />
                  <span>Seguimiento de Tickets & SLA Proveedor Técnico</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Reporte de fallas con foto y control del tiempo de respuesta del proveedor (Proveedor Transpaletas).
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setShowDiagramModal(true)}
                  className="px-3 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Guía de Partes</span>
                </button>

                <button
                  onClick={handleExportCsv}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>

                {!readOnly && (
                  <button
                    onClick={() => {
                      setCode('TP-');
                      setProblemTitle('');
                      setProblemDescription('');
                      setPhotoPreview(null);
                      setShowReportModal(true);
                    }}
                    className="bg-[#008744] hover:bg-emerald-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Levantar Transpaleta</span>
                  </button>
                )}
              </div>
            </div>

            {/* Search & Filter pills */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar por N° TP, falla, área..."
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
                {[
                  { id: 'todos', label: 'Todas' },
                  { id: 'pendiente', label: 'Pendientes' },
                  { id: 'en_taller', label: 'En Taller' },
                  { id: 'reparada', label: 'Reparadas' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setTicketStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                      ticketStatusFilter === tab.id
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid for Tickets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPallets.map(pallet => {
              const statusInfo = getStatusBadge(pallet.status);
              const elapsedHours = calculateElapsedHours(pallet.reportedAt, pallet.returnedAt);
              const sla = getSlaHealth(elapsedHours);

              return (
                <div
                  key={pallet.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Code & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-xl">
                          {pallet.code}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {pallet.brand}
                        </span>
                      </div>

                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${statusInfo.class}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    {/* Problem Title & Description */}
                    <h3 className="text-sm font-black text-slate-900 mt-1 mb-1">
                      {pallet.problemTitle}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-3">
                      {pallet.problemDescription}
                    </p>

                    {/* Photo Thumbnail if present */}
                    {pallet.photoUrl && (
                      <div className="mb-3 relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100">
                        <img 
                          src={pallet.photoUrl} 
                          alt={pallet.code} 
                          className="w-full h-full object-cover" 
                        />
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                          Foto Evidencia
                        </span>
                      </div>
                    )}

                    {/* SLA / Time Elapsed Counter */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 mb-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {pallet.status === 'reparada' ? 'Tiempo de Respuesta:' : 'Tiempo Transcurrido:'}
                        </span>
                        <span className="font-mono font-black text-slate-900">
                          {formatDurationHuman(elapsedHours)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Estado de SLA (Meta 48h):</span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${sla.badgeClass}`}>
                          {sla.label}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium space-y-0.5 mb-3">
                      <div>📍 <strong>Ubicación:</strong> {pallet.area}</div>
                      <div>👤 <strong>Reportado por:</strong> {pallet.reportedBy}</div>
                      <div>🏢 <strong>Proveedor:</strong> {pallet.providerName}</div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActivePalletDetail(pallet)}
                      className="text-xs font-bold text-slate-700 hover:text-emerald-700 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                    >
                      Ver Ficha / Trazabilidad
                    </button>

                    {!readOnly && pallet.status !== 'reparada' ? (
                      <button
                        onClick={() => handleUpdateStatus(pallet, 'reparada')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Marcar Reparada</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {pallet.status === 'reparada' ? 'Operativa' : 'En Gestión'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPallets.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Truck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">No hay tickets de falla registrados con este filtro</h4>
              <p className="text-xs text-slate-500 mt-1">Presiona "Levantar Transpaleta" o abre un ticket desde el Inventario Maestro.</p>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL EN ALTA RESOLUCIÓN: DIAGRAMA DE 7 PARTES DE LA TRANSPALETA          */}
      {/* ========================================================================= */}
      {showDiagramModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    <span>Diagrama Técnico: Las 7 Partes de la Transpaleta Manual</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Centro de Distribución CIAL Alimentos - Guía de diagnóstico e inspección pre-uso
                  </p>
                </div>
                <button
                  onClick={() => setShowDiagramModal(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Diagram Image & Parts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                
                {/* Image */}
                <div className="md:col-span-6 bg-amber-50/40 rounded-2xl p-3 border border-amber-200 flex items-center justify-center">
                  <img 
                    src={partesTranspaletaImg} 
                    alt="Diagrama 7 partes de la transpaleta" 
                    className="w-full max-h-96 object-contain rounded-xl"
                  />
                </div>

                {/* Legend & Details */}
                <div className="md:col-span-6 space-y-2">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                    Detalle de Componentes & Puntos de Riesgo
                  </h4>
                  
                  <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                    {PALLET_PARTS_GUIDE.map(p => (
                      <div 
                        key={p.num}
                        onClick={() => {
                          setComponentFilter(p.techComponent);
                          setShowDiagramModal(false);
                        }}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition cursor-pointer text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-slate-900 flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-black ${
                              p.isCritical ? 'bg-rose-600' : 'bg-slate-800'
                            }`}>
                              {p.num}
                            </span>
                            <span>{p.name}</span>
                          </span>

                          {p.activeCount > 0 ? (
                            <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                              {p.activeCount} en CD CIAL
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400">
                              Operativa
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                💡 Haz clic en cualquier parte para filtrar de inmediato las transpaletas del inventario.
              </span>
              <button
                onClick={() => setShowDiagramModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Cerrar Diagrama
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: AGREGAR O EDITAR TRANSPALETA EN EL INVENTARIO MAESTRO               */}
      {/* ========================================================================= */}
      {showAssetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#008744]" />
                  <span>{editingAsset ? 'Editar Transpaleta' : 'Nueva Transpaleta al Parque'}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {editingAsset ? `Actualizar datos del equipo ${editingAsset.code}` : 'Registra un nuevo activo en el CD CIAL'}
                </p>
              </div>
              <button
                onClick={() => setShowAssetModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAsset} className="space-y-4">
              
              {/* Code & Capacity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Código de Activo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: TP-001"
                    value={assetCode}
                    onChange={(e) => setAssetCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono font-black focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Capacidad (Kg)
                  </label>
                  <input
                    type="number"
                    value={assetCapacity}
                    onChange={(e) => setAssetCapacity(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Ubicación Actual *
                </label>
                <select
                  value={assetLocation}
                  onChange={(e) => setAssetLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008744]"
                >
                  {standardLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                  {!standardLocations.includes(assetLocation) && (
                    <option value={assetLocation}>{assetLocation}</option>
                  )}
                </select>
              </div>

              {/* Estado de Conservación */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Estado de Conservación (Semáforo) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'BUENO' as PalletConservationStatus, label: '🟢 Bueno', desc: 'Operativa' },
                    { id: 'REGULAR' as PalletConservationStatus, label: '🟡 Regular', desc: 'Observación' },
                    { id: 'MALO' as PalletConservationStatus, label: '🔴 Malo', desc: 'Fuera Serv.' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setAssetStatus(s.id);
                        if (s.id === 'BUENO') {
                          setAssetComponent('SIN NOVEDAD');
                        }
                      }}
                      className={`p-2 rounded-xl text-center border transition cursor-pointer ${
                        assetStatus === s.id
                          ? s.id === 'BUENO'
                            ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300'
                            : s.id === 'REGULAR'
                              ? 'bg-amber-600 text-white border-amber-600 ring-2 ring-amber-300'
                              : 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-300'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-black">{s.label}</div>
                      <div className={`text-[10px] font-semibold ${assetStatus === s.id ? 'text-white/90' : 'text-slate-400'}`}>
                        {s.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Componente / Diagnóstico */}
              {assetStatus !== 'BUENO' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-600 uppercase">
                      Componente con Falla *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowDiagramModal(true)}
                      className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ver diagrama 7 partes</span>
                    </button>
                  </div>
                  <select
                    value={assetComponent}
                    onChange={(e) => setAssetComponent(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  >
                    {componentOptions
                      .filter(c => c.id !== 'SIN NOVEDAD')
                      .map(comp => (
                        <option key={comp.id} value={comp.id}>{comp.label}</option>
                      ))}
                  </select>
                </div>
              )}

              {/* Observaciones */}
              <PredictiveTextarea
                label="Observaciones Técnicas / Detalle de la Condición"
                context="palletJack"
                rows={2}
                placeholder="Ej: Pérdida paulatina de presión en cilindro / Rueda trabada..."
                value={assetNotes}
                onChange={setAssetNotes}
              />

              {/* Checkbox: Confirmed with provider */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="assetConfirmedCheck"
                  checked={assetCapacityConfirmed}
                  onChange={(e) => setAssetCapacityConfirmed(e.target.checked)}
                  className="w-4 h-4 text-[#008744] rounded border-slate-300 focus:ring-[#008744]"
                />
                <label htmlFor="assetConfirmedCheck" className="text-xs text-slate-600 font-semibold cursor-pointer">
                  Capacidad nominal verificada formalmente con proveedor
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssetModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-[#008744] hover:bg-emerald-700 text-white shadow-md transition cursor-pointer"
                >
                  {editingAsset ? 'Guardar Cambios' : 'Registrar Transpaleta'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REPORTAR FALLA (CREAR TICKET DE SLA)                                */}
      {/* ========================================================================= */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  Levantar Transpaleta Manual con Falla
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Notifica de inmediato para coordinar el retiro y reparación con el proveedor técnico.
                </p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4">
              
              {/* TM Number and Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    N° Transpaleta *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: TP-001"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Marca / Modelo
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  >
                    <option value="Jungheinrich AM 22">Jungheinrich AM 22</option>
                    <option value="BT Lifter L2300">BT Lifter L2300</option>
                    <option value="Noblelift AC25">Noblelift AC25</option>
                    <option value="Crown PTH 50">Crown PTH 50</option>
                    <option value="Otra Marca">Otra Marca</option>
                  </select>
                </div>
              </div>

              {/* Problem Quick Chips */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase">
                    Tipo de Problema / Falla Principal *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDiagramModal(true)}
                    className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver diagrama de 7 partes</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {problemOptions.map(p => (
                    <button
                      key={p.type}
                      type="button"
                      onClick={() => {
                        setProblemType(p.type);
                        setProblemTitle(p.label);
                      }}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
                        problemType === p.type
                          ? 'bg-emerald-50 border-[#008744] text-[#008744] ring-1 ring-[#008744]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <PredictiveTextarea
                label="Descripción Detallada del Problema"
                required
                context="palletJack"
                rows={2}
                placeholder="Explica qué le pasa a la transpaleta o elige una sugerencia técnica..."
                value={problemDescription}
                onChange={setProblemDescription}
              />

              {/* Photo Evidence */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Foto de la Falla (Recomendado)
                </label>
                
                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 h-36 bg-slate-100 mb-2">
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-3 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition">
                      <Camera className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-600 block">Tomar Foto o Subir Archivo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment" 
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleSimulateCamera}
                      className="px-3 border border-slate-200 hover:bg-slate-100 rounded-2xl text-[11px] font-bold text-slate-600 transition cursor-pointer"
                      title="Insertar foto de muestra para testing"
                    >
                      Foto Test
                    </button>
                  </div>
                )}
              </div>

              {/* Location & Operator */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Ubicación / Área *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: PICKING"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <PredictiveLeaderInput
                  label="Operador / Supervisor que Reporta"
                  required
                  placeholder="Buscar jefatura, supervisor o escribir..."
                  value={reportedBy}
                  onChange={setReportedBy}
                  filterRole="all"
                />
              </div>

              {/* Severity */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Nivel de Criticidad
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'critica' as EquipmentSeverity, label: '🔴 Crítica (Inmovilizada)' },
                    { id: 'moderada' as EquipmentSeverity, label: '🟡 Moderada (Con dificultad)' },
                    { id: 'leve' as EquipmentSeverity, label: '🟢 Leve (Preventivo)' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSeverity(s.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition text-center cursor-pointer ${
                        severity === s.id
                          ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-800'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black bg-[#008744] hover:bg-emerald-700 text-white shadow-md transition cursor-pointer"
                >
                  Guardar y Notificar a Proveedor
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DETALLE / TRAZABILIDAD DEL TICKET DE FALLA                         */}
      {/* ========================================================================= */}
      {activePalletDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="font-mono text-sm font-black bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded border border-emerald-200">
                  {activePalletDetail.code}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {activePalletDetail.problemTitle}
                </h3>
              </div>
              <button
                onClick={() => setActivePalletDetail(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              {activePalletDetail.photoUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-44 bg-slate-100">
                  <img 
                    src={activePalletDetail.photoUrl} 
                    alt={activePalletDetail.code} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <div><strong>Descripción:</strong> {activePalletDetail.problemDescription}</div>
                <div><strong>Ubicación:</strong> {activePalletDetail.area}</div>
                <div><strong>Reportado por:</strong> {activePalletDetail.reportedBy} ({activePalletDetail.shift})</div>
                <div><strong>Fecha de Reporte:</strong> {activePalletDetail.reportedAt.slice(0, 16).replace('T', ' ')}</div>
                <div><strong>Proveedor Asignado:</strong> {activePalletDetail.providerName}</div>
              </div>

              {/* Status Update Flow */}
              {!readOnly ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Actualizar Estado de Ciclo de Vida:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleUpdateStatus(activePalletDetail, 'retirada_proveedor')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activePalletDetail.status === 'retirada_proveedor'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      1. Retirada por Proveedor
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(activePalletDetail, 'en_taller')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activePalletDetail.status === 'en_taller'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      2. En Taller / Reparando
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(activePalletDetail, 'reparada')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activePalletDetail.status === 'reparada'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      3. Reparada y Operativa
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(activePalletDetail, 'de_baja')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activePalletDetail.status === 'de_baja'
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      4. Dar de Baja
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs font-semibold text-slate-500">
                    Modo solo lectura: El cambio de estado operativo está reservado para Supervisores de Operaciones.
                  </span>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex justify-end">
              <button
                onClick={() => setActivePalletDetail(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
