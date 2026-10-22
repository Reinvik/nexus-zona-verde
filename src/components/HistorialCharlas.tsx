import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  FileSpreadsheet, 
  Users, 
  Clock, 
  Calendar, 
  Sparkles,
  MapPin,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { CharlaSession } from '../types';
import { exportToCsv } from '../services/storage';

interface HistorialCharlasProps {
  charlas: CharlaSession[];
}

export const HistorialCharlas: React.FC<HistorialCharlasProps> = ({ charlas }) => {
  const [search, setSearch] = useState<string>('');
  const [filterShift, setFilterShift] = useState<string>('todos');

  const filteredCharlas = charlas.filter(c => {
    const matchesSearch = 
      c.lupTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.lupCode.toLowerCase().includes(search.toLowerCase()) ||
      c.facilitator.toLowerCase().includes(search.toLowerCase()) ||
      c.area.toLowerCase().includes(search.toLowerCase());
    const matchesShift = filterShift === 'todos' || c.shift.includes(filterShift);
    return matchesSearch && matchesShift;
  });

  const handleExportCsv = () => {
    const rows = charlas.map(c => ({
      'Código LUP': c.lupCode,
      'Título LUP': c.lupTitle,
      'Facilitador / Operador': c.facilitator,
      'Turno': c.shift,
      'Área': c.area,
      'Fecha': c.date,
      'Hora': c.time,
      'Duración (segundos)': c.durationSeconds,
      'N° Asistentes': c.attendeesCount,
      'Acuerdos': c.keyAgreements || 'Sin acuerdos registrados'
    }));

    exportToCsv('Historial_Charlas_5_Min_Zona_Verde', rows);
  };

  const totalAttendees = charlas.reduce((sum, c) => sum + (c.attendeesCount || 0), 0);

  return (
    <div className="space-y-6 pb-12">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
            <span>Charlas Dictadas</span>
            <ClipboardCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{charlas.length}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Encuentros de 5 minutos</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
            <span>Operadores Capacitados</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalAttendees}</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Asistencias acumuladas</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase mb-1">
            <span>Promedio Asistencia</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {charlas.length > 0 ? (totalAttendees / charlas.length).toFixed(1) : 0}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Operadores por charla</div>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-[#008744]" />
              <span>Registro de Charlas de 5 Minutos Dictadas</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Historial formal de capacitación en el Gemba para auditorías y control de gestión.
            </p>
          </div>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Exportar Historial (.csv)</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por facilitador, LUP, área..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { id: 'todos', label: 'Todos los Turnos' },
              { id: 'Mañana', label: 'Turno Mañana' },
              { id: 'Tarde', label: 'Turno Tarde' },
              { id: 'Noche', label: 'Turno Noche' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setFilterShift(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                  filterShift === t.id
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Charlas List */}
      <div className="space-y-3">
        {filteredCharlas.map(charla => (
          <div
            key={charla.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-emerald-500 transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  {charla.lupCode}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {charla.date} {charla.time}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {charla.shift.split('(')[0].trim()}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">
                {charla.lupTitle}
              </h3>

              <div className="flex items-center gap-4 text-xs text-slate-600 font-medium flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800">Facilitador:</span>
                  <span>{charla.facilitator}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{charla.area}</span>
                </div>
              </div>

              {charla.keyAgreements && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 mt-2 font-medium">
                  <strong>Acuerdo tomado:</strong> {charla.keyAgreements}
                </div>
              )}
            </div>

            {/* Right Badge: Attendees and Duration */}
            <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0 gap-1.5">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-[#008744] border border-emerald-200 px-3 py-1.5 rounded-xl font-bold text-xs">
                <Users className="w-4 h-4" />
                <span>{charla.attendeesCount} Operadores</span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{Math.round(charla.durationSeconds / 60)} min charla</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCharlas.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">No se encontraron charlas registradas</h4>
          <p className="text-xs text-slate-500 mt-1">Dicta una charla de 5 minutos desde el cronómetro para registrarla aquí.</p>
        </div>
      )}

    </div>
  );
};
