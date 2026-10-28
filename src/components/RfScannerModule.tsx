import React, { useState } from 'react';
import { 
  ScanBarcode, 
  Plus, 
  Search, 
  Clock, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  FileSpreadsheet, 
  X,
  BatteryCharging,
  WifiOff,
  Flame
} from 'lucide-react';
import { RfScannerReport, RfProblemType, EquipmentSeverity, EquipmentStatus, ShiftType } from '../types';
import { 
  saveRf, 
  calculateElapsedHours, 
  formatDurationHuman, 
  getSlaHealth, 
  exportToCsv 
} from '../services/storage';

interface RfScannerModuleProps {
  rfs: RfScannerReport[];
  onRfsUpdated: () => void;
  readOnly?: boolean;
}

export const RfScannerModule: React.FC<RfScannerModuleProps> = ({
  rfs,
  onRfsUpdated,
  readOnly = false
}) => {
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [activeRfDetail, setActiveRfDetail] = useState<RfScannerReport | null>(null);

  // Form State
  const [code, setCode] = useState<string>('RF-');
  const [model, setModel] = useState<string>('Zebra TC26 Android');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [reportedBy, setReportedBy] = useState<string>('');
  const [shift, setShift] = useState<ShiftType>('Turno 1');
  const [area, setArea] = useState<string>('Picking Frío');
  const [problemType, setProblemType] = useState<RfProblemType>('gatillo_trabado');
  const [problemTitle, setProblemTitle] = useState<string>('');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [severity, setSeverity] = useState<EquipmentSeverity>('critica');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [providerName, setProviderName] = useState<string>('Soporte Hardware TI CIAL / Partner Zebra');

  const rfProblemOptions: { type: RfProblemType; label: string; icon: string }[] = [
    { type: 'gatillo_trabado', label: '🔫 Gatillo Pistola Trabado / Hundido', icon: '🔫' },
    { type: 'pantalla_rota', label: '📱 Pantalla Táctil Rota / Sin Touch', icon: '📱' },
    { type: 'sin_wifi', label: '📶 No Conecta a Wi-Fi CIAL / Pierde Red', icon: '📶' },
    { type: 'bateria_danada', label: '🔋 Batería No Retiene Carga / Hinchada', icon: '🔋' },
    { type: 'laser_sucio', label: '🔍 Cristal Escáner Astillado o Rayado', icon: '🔍' },
    { type: 'reinicio_constante', label: '🔄 Se Reinicia Sola / Congelada', icon: '🔄' },
    { type: 'error_sap', label: '💻 Error Aplicación SAP / Bloqueo', icon: '💻' },
    { type: 'otro', label: '⚠️ Otra Falla Electrónica', icon: '⚠️' }
  ];

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
      'https://images.unsplash.com/photo-1580982327559-c1202864eb05?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=60'
    ];
    setPhotoPreview(samplePhotos[Math.floor(Math.random() * samplePhotos.length)]);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: RfScannerReport = {
      id: `rf-${Date.now()}`,
      code: code.trim().toUpperCase(),
      model,
      serialNumber: serialNumber.trim() || undefined,
      reportedAt: new Date().toISOString(),
      reportedBy: reportedBy.trim() || 'Operador de Turno',
      shift,
      area: area.trim(),
      problemType,
      problemTitle: problemTitle.trim() || rfProblemOptions.find(p => p.type === problemType)?.label || 'Falla de RF',
      problemDescription: problemDescription.trim(),
      photoUrl: photoPreview || undefined,
      severity,
      status: 'pendiente',
      providerName
    };

    saveRf(newReport);
    setShowReportModal(false);
    onRfsUpdated();

    // Reset
    setCode('RF-');
    setSerialNumber('');
    setProblemTitle('');
    setProblemDescription('');
    setPhotoPreview(null);
  };

  const handleUpdateStatus = (rf: RfScannerReport, newStatus: EquipmentStatus) => {
    if (readOnly) return;
    const now = new Date().toISOString();
    const updated: RfScannerReport = {
      ...rf,
      status: newStatus,
      sentToProviderAt: newStatus === 'retirada_proveedor' || newStatus === 'en_taller'
        ? (rf.sentToProviderAt || now)
        : rf.sentToProviderAt,
      returnedAt: newStatus === 'reparada' ? now : rf.returnedAt
    };
    saveRf(updated);
    setActiveRfDetail(updated);
    onRfsUpdated();
  };

  const filteredRfs = rfs.filter(r => {
    const matchesStatus = statusFilter === 'todos' || r.status === statusFilter;
    const matchesSearch = 
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.problemTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.model.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase()) ||
      r.reportedBy.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: EquipmentStatus) => {
    switch (status) {
      case 'pendiente':
        return { label: 'Pendiente Soporte', class: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'retirada_proveedor':
        return { label: 'Con Proveedor Zebra/TI', class: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'en_taller':
        return { label: 'En Laboratorio Técnico', class: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'reparada':
        return { label: 'Operativa en Bodega', class: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'de_baja':
        return { label: 'De Baja / Descarte', class: 'bg-slate-200 text-slate-800 border-slate-300' };
    }
  };

  const handleExportCsv = () => {
    const rows = rfs.map(r => {
      const hours = calculateElapsedHours(r.reportedAt, r.returnedAt);
      return {
        'N° Pistola RF': r.code,
        'Modelo': r.model,
        'N° Serie': r.serialNumber || 'N/A',
        'Estado': r.status,
        'Problema': r.problemTitle,
        'Severidad': r.severity,
        'Área': r.area,
        'Reportado Por': r.reportedBy,
        'Fecha Reporte': r.reportedAt.slice(0, 16).replace('T', ' '),
        'Proveedor': r.providerName,
        'Fecha Retorno': r.returnedAt ? r.returnedAt.slice(0, 16).replace('T', ' ') : 'Pendiente',
        'Horas Respuesta': hours
      };
    });
    exportToCsv('Control_Pistolas_RF_CIAL', rows);
  };

  // Metrics
  const totalCount = rfs.length;
  const pendingCount = rfs.filter(r => r.status === 'pendiente').length;
  const inRepairCount = rfs.filter(r => r.status === 'en_taller' || r.status === 'retirada_proveedor').length;
  const repairedCount = rfs.filter(r => r.status === 'reparada').length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
            <span>Total Pistolas RF</span>
            <ScanBarcode className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</div>
          <div className="text-[11px] text-slate-400 font-semibold mt-0.5">Parque Zebra / Honeywell</div>
        </div>

        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-bold uppercase mb-1">
            <span>Pendientes Soporte</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-900">{pendingCount}</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Por retirar de nave</div>
        </div>

        <div className="bg-indigo-50/80 rounded-2xl p-4 border border-indigo-200 shadow-xs">
          <div className="flex items-center justify-between text-indigo-800 text-xs font-bold uppercase mb-1">
            <span>En Servicio Técnico</span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-900">{inRepairCount}</div>
          <div className="text-[11px] text-indigo-700 font-semibold mt-0.5">En laboratorio TI</div>
        </div>

        <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-bold uppercase mb-1">
            <span>Operativas OK</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-900">{repairedCount}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">En andenes y picking</div>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <ScanBarcode className="w-6 h-6 text-indigo-600" />
              <span>Control de Pistolas RF en Mal Estado</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Reporte inmediato de gatillos, pantallas y conectividad para medir respuesta de soporte TI y proveedor.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-indigo-700" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            {!readOnly && (
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Reportar Pistola RF</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por N° RF, modelo, problema..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'pendiente', label: 'Pendientes' },
              { id: 'en_taller', label: 'En Laboratorio' },
              { id: 'reparada', label: 'Operativas' }
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

      {/* RF Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRfs.map(rf => {
          const statusInfo = getStatusBadge(rf.status);
          const elapsedHours = calculateElapsedHours(rf.reportedAt, rf.returnedAt);
          const sla = getSlaHealth(elapsedHours, 24); // Stricter 24h target for RF terminals

          return (
            <div
              key={rf.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-500 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Header: Code & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-black bg-indigo-50 text-indigo-900 border border-indigo-200 px-2.5 py-1 rounded-xl">
                      {rf.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {rf.model}
                    </span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${statusInfo.class}`}>
                    {statusInfo.label}
                  </span>
                </div>

                {/* Problem Title & Description */}
                <h3 className="text-sm font-black text-slate-900 mt-1 mb-1">
                  {rf.problemTitle}
                </h3>
                <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-3">
                  {rf.problemDescription}
                </p>

                {/* Photo Thumbnail */}
                {rf.photoUrl && (
                  <div className="mb-3 relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100">
                    <img 
                      src={rf.photoUrl} 
                      alt={rf.code} 
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
                      {rf.status === 'reparada' ? 'Tiempo de Respuesta TI:' : 'Tiempo Transcurrido:'}
                    </span>
                    <span className="font-mono font-black text-slate-900">
                      {formatDurationHuman(elapsedHours)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Estado SLA (Meta 24h):</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${sla.badgeClass}`}>
                      {sla.label}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-medium space-y-0.5 mb-3">
                  <div>📍 <strong>Ubicación:</strong> {rf.area}</div>
                  <div>👤 <strong>Reportado por:</strong> {rf.reportedBy}</div>
                  <div>🏢 <strong>Soporte Técnico:</strong> {rf.providerName}</div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveRfDetail(rf)}
                  className="text-xs font-bold text-slate-700 hover:text-indigo-700 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  Ver Ficha Técnica
                </button>

                {!readOnly && rf.status !== 'reparada' ? (
                  <button
                    onClick={() => handleUpdateStatus(rf, 'reparada')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Marcar Lista</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {rf.status === 'reparada' ? 'En Operación' : 'En Gestión'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredRfs.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <ScanBarcode className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">No hay pistolas RF reportadas con este filtro</h4>
          <p className="text-xs text-slate-500 mt-1">Presiona "Reportar Pistola RF" para registrar un nuevo equipo dañado.</p>
        </div>
      )}

      {/* New RF Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  Reportar Pistola RF en Mal Estado
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Ingresa el número y falla para gestionar el reemplazo o soporte técnico de inmediato.
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
              
              {/* RF Number and Model */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    N° Pistola RF *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: RF-04"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Modelo de Terminal
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Zebra TC26 Android">Zebra TC26 Android</option>
                    <option value="Zebra MC3300 Gun">Zebra MC3300 Gun</option>
                    <option value="Honeywell CK65">Honeywell CK65</option>
                    <option value="Datalogic Skorpio X5">Datalogic Skorpio X5</option>
                    <option value="Otro Terminal">Otro Terminal</option>
                  </select>
                </div>
              </div>

              {/* Serial number */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  N° de Serie (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: ZBR-220914-04"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Problem Quick Chips */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Tipo de Problema *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rfProblemOptions.map(p => (
                    <button
                      key={p.type}
                      type="button"
                      onClick={() => {
                        setProblemType(p.type);
                        setProblemTitle(p.label);
                      }}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
                        problemType === p.type
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600'
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
                  Descripción Detallada *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe la falla (ej: el gatillo se queda pegado al apretarlo o la pantalla táctil no responde en la parte inferior)..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Photo Evidence */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Foto de la Falla / Pantalla (Recomendado)
                </label>
                
                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-500 h-36 bg-slate-100 mb-2">
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
                    <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-3 text-center cursor-pointer bg-slate-50 hover:bg-indigo-50/50 transition">
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
                    Área Operacional *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Picking Frío P2"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
                    { id: 'critica' as EquipmentSeverity, label: '🔴 Inoperativa' },
                    { id: 'moderada' as EquipmentSeverity, label: '🟡 Intermitente' },
                    { id: 'leve' as EquipmentSeverity, label: '🟢 Estética / Batería' }
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
                  className="px-6 py-2.5 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition cursor-pointer"
                >
                  Registrar Falla de RF
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {activeRfDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="font-mono text-sm font-black bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded border border-indigo-200">
                  {activeRfDetail.code}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {activeRfDetail.problemTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveRfDetail(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              {activeRfDetail.photoUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-44 bg-slate-100">
                  <img 
                    src={activeRfDetail.photoUrl} 
                    alt={activeRfDetail.code} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <div><strong>Modelo:</strong> {activeRfDetail.model}</div>
                {activeRfDetail.serialNumber && <div><strong>N° Serie:</strong> {activeRfDetail.serialNumber}</div>}
                <div><strong>Descripción:</strong> {activeRfDetail.problemDescription}</div>
                <div><strong>Área:</strong> {activeRfDetail.area}</div>
                <div><strong>Reportado por:</strong> {activeRfDetail.reportedBy} ({activeRfDetail.shift})</div>
                <div><strong>Fecha de Reporte:</strong> {activeRfDetail.reportedAt.slice(0, 16).replace('T', ' ')}</div>
                <div><strong>Proveedor / Soporte:</strong> {activeRfDetail.providerName}</div>
              </div>

              {/* Status Update Flow */}
              {!readOnly ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Actualizar Estado de Ciclo de Vida:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleUpdateStatus(activeRfDetail, 'retirada_proveedor')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activeRfDetail.status === 'retirada_proveedor'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      1. Entregado a Soporte TI
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(activeRfDetail, 'en_taller')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activeRfDetail.status === 'en_taller'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      2. En Laboratorio Técnico
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(activeRfDetail, 'reparada')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activeRfDetail.status === 'reparada'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      3. Reparada y Operativa
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(activeRfDetail, 'de_baja')}
                      className={`p-2.5 rounded-xl font-bold border text-xs cursor-pointer transition ${
                        activeRfDetail.status === 'de_baja'
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
                    Modo solo lectura: El cambio de estado técnico está reservado para Supervisores y Soporte TI.
                  </span>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex justify-end">
              <button
                onClick={() => setActiveRfDetail(null)}
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
