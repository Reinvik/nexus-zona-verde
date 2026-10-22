import React, { useState } from 'react';
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
  Image as ImageIcon
} from 'lucide-react';
import { PalletJackReport, PalletProblemType, EquipmentSeverity, EquipmentStatus, ShiftType } from '../types';
import { 
  savePallet, 
  calculateElapsedHours, 
  formatDurationHuman, 
  getSlaHealth, 
  exportToCsv 
} from '../services/storage';

interface PalletJackModuleProps {
  pallets: PalletJackReport[];
  onPalletsUpdated: () => void;
}

export const PalletJackModule: React.FC<PalletJackModuleProps> = ({
  pallets,
  onPalletsUpdated
}) => {
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [activePalletDetail, setActivePalletDetail] = useState<PalletJackReport | null>(null);

  // Form State for reporting a damaged pallet jack
  const [code, setCode] = useState<string>('TM-');
  const [brand, setBrand] = useState<string>('Jungheinrich AM 22');
  const [reportedBy, setReportedBy] = useState<string>('');
  const [shift, setShift] = useState<ShiftType>('Turno 1 (Mañana 07:00 - 15:00)');
  const [area, setArea] = useState<string>('Andén 3');
  const [problemType, setProblemType] = useState<PalletProblemType>('fuga_hidraulica');
  const [problemTitle, setProblemTitle] = useState<string>('');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [severity, setSeverity] = useState<EquipmentSeverity>('critica');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string>('Servicio Hidráulico Valparaíso SpA');

  const problemOptions: { type: PalletProblemType; label: string; icon: string }[] = [
    { type: 'fuga_hidraulica', label: '💧 Fuga de Aceite / Hidráulico', icon: '💧' },
    { type: 'no_eleva', label: '⛔ No Eleva / Pierde Altura', icon: '⛔' },
    { type: 'rueda_trabada', label: '⚙️ Rueda Trabada / Dañada', icon: '⚙️' },
    { type: 'timon_danado', label: '🦯 Timón Suelto o Roto', icon: '🦯' },
    { type: 'horquilla_doblada', label: '📐 Horquilla Deformada', icon: '📐' },
    { type: 'valvula_descenso', label: '🛑 Válvula Descenso Falla', icon: '🛑' },
    { type: 'otro', label: '⚠️ Otra Falla Mecánica', icon: '⚠️' }
  ];

  // Handle Photo selection or simulated camera capture
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
    // Generate an illustrative placeholder photo for the failure
    const samplePhotos = [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=60'
    ];
    setPhotoPreview(samplePhotos[Math.floor(Math.random() * samplePhotos.length)]);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: PalletJackReport = {
      id: `pal-${Date.now()}`,
      code: code.trim().toUpperCase(),
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
    setShowReportModal(false);
    onPalletsUpdated();

    // Reset Form
    setCode('TM-');
    setProblemTitle('');
    setProblemDescription('');
    setPhotoPreview(null);
  };

  const handleUpdateStatus = (pallet: PalletJackReport, newStatus: EquipmentStatus) => {
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
    onPalletsUpdated();
  };

  const filteredPallets = pallets.filter(p => {
    const matchesStatus = statusFilter === 'todos' || p.status === statusFilter;
    const matchesSearch = 
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.problemTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.area.toLowerCase().includes(search.toLowerCase()) ||
      p.reportedBy.toLowerCase().includes(search.toLowerCase());
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
    exportToCsv('Control_Transpaletas_CIAL', rows);
  };

  // Metrics
  const totalCount = pallets.length;
  const pendingCount = pallets.filter(p => p.status === 'pendiente').length;
  const inWorkshopCount = pallets.filter(p => p.status === 'en_taller' || p.status === 'retirada_proveedor').length;
  const repairedCount = pallets.filter(p => p.status === 'reparada').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
            <span>Total Reportes</span>
            <Truck className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-0.5">Parque de Transpaletas CD</div>
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
              <Truck className="w-6 h-6 text-[#008744]" />
              <span>Control de Transpaletas Manuales en Mal Estado</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Reporte de fallas con foto y seguimiento del SLA de respuesta del proveedor técnico.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="bg-[#008744] hover:bg-emerald-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Levantar Transpaleta</span>
            </button>
          </div>
        </div>

        {/* Search & Filter pills */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por N° TM, falla, área..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                  statusFilter === tab.id
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

      {/* Cards Grid */}
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

                {pallet.status !== 'reparada' ? (
                  <button
                    onClick={() => handleUpdateStatus(pallet, 'reparada')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Marcar Reparada</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Operativa
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
          <h4 className="text-base font-bold text-slate-700">No hay transpaletas registradas con este filtro</h4>
          <p className="text-xs text-slate-500 mt-1">Presiona "Levantar Transpaleta" para ingresar una nueva falla.</p>
        </div>
      )}

      {/* New Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  Levantar Transpaleta Manual con Falla
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Notifica de inmediato para coordinar el retiro y reparación con el proveedor.
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
                    placeholder="Ej: TM-04"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
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
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Tipo de Problema / Falla Principal *
                </label>
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
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Descripción Detallada del Problema *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explica qué le pasa a la transpaleta (ej: pierde aceite por el pistón al subir pallets pesados)..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

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
                    Ubicación / Andén *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Andén 4 Despacho"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Operador que Reporta *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre y apellido"
                    value={reportedBy}
                    onChange={(e) => setReportedBy(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
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

      {/* Detail / Timeline Modal */}
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
