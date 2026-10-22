import React from 'react';
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  ScanBarcode, 
  FileSpreadsheet, 
  ShieldAlert,
  ArrowUpRight,
  TrendingDown,
  Building2
} from 'lucide-react';
import { PalletJackReport, RfScannerReport } from '../types';
import { calculateElapsedHours, formatDurationHuman, getSlaHealth, exportToCsv } from '../services/storage';

interface SlaDashboardProps {
  pallets: PalletJackReport[];
  rfs: RfScannerReport[];
}

export const SlaDashboard: React.FC<SlaDashboardProps> = ({ pallets, rfs }) => {

  // Transpaletas metrics
  const palletRepaired = pallets.filter(p => p.status === 'reparada');
  const palletAvgHours = palletRepaired.length > 0 
    ? palletRepaired.reduce((acc, p) => acc + calculateElapsedHours(p.reportedAt, p.returnedAt), 0) / palletRepaired.length
    : 0;

  const palletWithinSla = palletRepaired.filter(p => calculateElapsedHours(p.reportedAt, p.returnedAt) <= 48).length;
  const palletSlaCompliance = palletRepaired.length > 0
    ? Math.round((palletWithinSla / palletRepaired.length) * 100)
    : 100;

  const palletPending = pallets.filter(p => p.status !== 'reparada' && p.status !== 'de_baja');
  const palletOverdue = palletPending.filter(p => calculateElapsedHours(p.reportedAt) > 48);

  // RF metrics
  const rfRepaired = rfs.filter(r => r.status === 'reparada');
  const rfAvgHours = rfRepaired.length > 0
    ? rfRepaired.reduce((acc, r) => acc + calculateElapsedHours(r.reportedAt, r.returnedAt), 0) / rfRepaired.length
    : 0;

  const rfWithinSla = rfRepaired.filter(r => calculateElapsedHours(r.reportedAt, r.returnedAt) <= 24).length;
  const rfSlaCompliance = rfRepaired.length > 0
    ? Math.round((rfWithinSla / rfRepaired.length) * 100)
    : 100;

  const rfPending = rfs.filter(r => r.status !== 'reparada' && r.status !== 'de_baja');
  const rfOverdue = rfPending.filter(r => calculateElapsedHours(r.reportedAt) > 24);

  const handleExportFullReport = () => {
    const combinedRows = [
      ...pallets.map(p => ({
        'Tipo Equipo': 'Transpaleta Manual',
        'Código': p.code,
        'Detalle': p.problemTitle,
        'Estado': p.status,
        'Proveedor': p.providerName,
        'Fecha Reporte': p.reportedAt,
        'Horas Transcurridas': calculateElapsedHours(p.reportedAt, p.returnedAt),
        'Cumple SLA': calculateElapsedHours(p.reportedAt, p.returnedAt) <= 48 ? 'SÍ' : 'NO'
      })),
      ...rfs.map(r => ({
        'Tipo Equipo': 'Pistola RF',
        'Código': r.code,
        'Detalle': r.problemTitle,
        'Estado': r.status,
        'Proveedor': r.providerName,
        'Fecha Reporte': r.reportedAt,
        'Horas Transcurridas': calculateElapsedHours(r.reportedAt, r.returnedAt),
        'Cumple SLA': calculateElapsedHours(r.reportedAt, r.returnedAt) <= 24 ? 'SÍ' : 'NO'
      }))
    ];

    exportToCsv('Consolidado_SLA_Proveedores_CIAL', combinedRows);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
              Control de Proveedores & SLAs
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Centro de Distribución Frío CIAL
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-1">
            Tablero de Tiempos de Respuesta y Cumplimiento de Servicio
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Supervisión continua del tiempo que tarda cada proveedor externo en reparar transpaletas y equipos de radiofrecuencia.
          </p>
        </div>

        <button
          onClick={handleExportFullReport}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Descargar Informe SLA (.csv)</span>
        </button>
      </div>

      {/* Provider Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Proveedor 1: Transpaletas */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Servicio Hidráulico Valparaíso SpA
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Mantención y reparación de transpaletas manuales
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-black bg-slate-100 px-2.5 py-1 rounded-xl text-slate-700">
                Meta SLA: 48h
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Tiempo Medio Respuesta (MTTR)
                </span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {formatDurationHuman(palletAvgHours)}
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Promedio en equipos devueltos
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Cumplimiento de SLA
                </span>
                <div className="text-2xl font-black text-[#008744] font-mono">
                  {palletSlaCompliance}%
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {palletWithinSla} de {palletRepaired.length} a tiempo
                </span>
              </div>
            </div>

            {/* Overdue alerts */}
            {palletOverdue.length > 0 ? (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mb-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-rose-900">
                    ¡{palletOverdue.length} transpaleta(s) con SLA vencido (&gt;48h)!
                  </h4>
                  <p className="text-[11px] text-rose-800 mt-0.5">
                    Equipos en espera: {palletOverdue.map(p => p.code).join(', ')}. Notificar al proveedor para retiro/entrega inmediata.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-4 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No hay transpaletas fuera de plazo con el proveedor.</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Total parque gestionado: {pallets.length} unidades</span>
            <span>Pendientes activos: {palletPending.length}</span>
          </div>
        </div>

        {/* Proveedor 2: Pistolas RF */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <ScanBarcode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Soporte Hardware TI CIAL / Zebra
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Servicio técnico de radiofrecuencia, baterías y gatillos
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-black bg-slate-100 px-2.5 py-1 rounded-xl text-slate-700">
                Meta SLA: 24h
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Tiempo Medio Respuesta (MTTR)
                </span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {formatDurationHuman(rfAvgHours)}
                </div>
                <span className="text-[10px] text-indigo-700 font-semibold">
                  Promedio en equipos devueltos
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Cumplimiento de SLA
                </span>
                <div className="text-2xl font-black text-indigo-700 font-mono">
                  {rfSlaCompliance}%
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {rfWithinSla} de {rfRepaired.length} a tiempo
                </span>
              </div>
            </div>

            {/* Overdue alerts */}
            {rfOverdue.length > 0 ? (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mb-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-rose-900">
                    ¡{rfOverdue.length} pistola(s) RF con SLA vencido (&gt;24h)!
                  </h4>
                  <p className="text-[11px] text-rose-800 mt-0.5">
                    Equipos retrasados: {rfOverdue.map(r => r.code).join(', ')}. Contactar a soporte TI para reposición de contingencia.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-4 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Soporte de pistolas RF operando dentro del plazo acordado.</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Total pistolas gestionadas: {rfs.length} unidades</span>
            <span>En soporte activo: {rfPending.length}</span>
          </div>
        </div>

      </div>

      {/* Lean Recommendation Box */}
      <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6">
        <h4 className="text-sm font-black text-amber-950 flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>Recomendación Operacional para el Gemba CIAL:</span>
        </h4>
        <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside font-medium leading-relaxed">
          <li>
            <strong>Reunión de Zona Verde (07:10 AM):</strong> El líder de turno debe revisar las transpaletas y pistolas en estado "Pendiente" y asignarlas al coordinador de patio para entrega al furgón del proveedor.
          </li>
          <li>
            <strong>Escalamiento por demoras:</strong> Si una transpaleta supera las 48 horas sin entrega, la app marca el estado automáticamente en <span className="font-bold text-rose-700">Rojo</span> para alertar a la Jefatura de Mantención CIAL.
          </li>
          <li>
            <strong>Rotación de Pistolas RF:</strong> Evitar operar con menos del 85% de la dotación nominal de terminales para no retrasar el picking de cámara fría.
          </li>
        </ul>
      </div>

    </div>
  );
};
