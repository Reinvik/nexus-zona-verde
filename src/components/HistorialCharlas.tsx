import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  FileSpreadsheet, 
  Users, 
  Clock, 
  Calendar, 
  Sparkles, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  Eye, 
  ShieldCheck, 
  Sun, 
  Sunset, 
  Moon,
  Image as ImageIcon
} from 'lucide-react';
import { CharlaSession, LupItem, ShiftId, ShiftType } from '../types';
import { exportToCsv, saveCharla } from '../services/storage';
import { compressImageFile } from '../utils/imageCompressor';

interface HistorialCharlasProps {
  charlas: CharlaSession[];
  lups: LupItem[];
  onCharlasUpdated: () => void;
  onNavigateToTimer?: (lupId: string) => void;
}

export const HistorialCharlas: React.FC<HistorialCharlasProps> = ({ 
  charlas, 
  lups,
  onCharlasUpdated,
  onNavigateToTimer
}) => {
  // Date selector state (defaults to today)
  const todayStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Search and filters
  const [search, setSearch] = useState<string>('');
  const [filterShift, setFilterShift] = useState<string>('todos');
  const [filterSupervisor, setFilterSupervisor] = useState<string>('todos');

  // Modal states
  const [showDirectRegisterModal, setShowDirectRegisterModal] = useState<boolean>(false);
  const [defaultShiftForModal, setDefaultShiftForModal] = useState<ShiftId>('manana');
  const [viewingPhoto, setViewingPhoto] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  // Direct Register Form State
  const [selectedLupId, setSelectedLupId] = useState<string>(lups[0]?.id || '');
  const [regSupervisor, setRegSupervisor] = useState<string>('Carlos Venegas');
  const [regFacilitator, setRegFacilitator] = useState<string>('');
  const [regShift, setRegShift] = useState<ShiftType>('Turno 1 (Mañana 07:00 - 15:00)');
  const [regArea, setRegArea] = useState<string>('Andenes de Despacho');
  const [regAttendeesCount, setRegAttendeesCount] = useState<number>(8);
  const [regAgreements, setRegAgreements] = useState<string>('');
  const [regPhoto, setRegPhoto] = useState<string | null>(null);
  const [regPhotoSizeKb, setRegPhotoSizeKb] = useState<number | null>(null);

  // Supervisors list for quick selection
  const knownSupervisors = [
    'Carlos Venegas',
    'Rodrigo Morales',
    'Cristian Castro',
    'Ariel Mella',
    'Mario Sepúlveda'
  ];

  // Handle shift talk registration with lightweight compressed photo
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        setRegPhoto(dataUrl);
        setRegPhotoSizeKb(sizeKb);
      } catch (err) {
        console.error('Error al comprimir:', err);
      }
    }
  };

  const handleSimulatePhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60'
    ];
    setRegPhoto(samplePhotos[Math.floor(Math.random() * samplePhotos.length)]);
    setRegPhotoSizeKb(46);
  };

  const handleOpenDirectRegister = (shiftId: ShiftId) => {
    setDefaultShiftForModal(shiftId);
    if (shiftId === 'manana') {
      setRegShift('Turno 1 (Mañana 07:00 - 15:00)');
      setRegSupervisor('Carlos Venegas');
      setRegArea('Andenes de Despacho');
    } else if (shiftId === 'tarde') {
      setRegShift('Turno 2 (Tarde 15:00 - 23:00)');
      setRegSupervisor('Rodrigo Morales');
      setRegArea('Cámara Frigorífica P2');
    } else {
      setRegShift('Turno 3 (Noche 23:00 - 07:00)');
      setRegSupervisor('Cristian Castro');
      setRegArea('Almacenamiento y Reposición');
    }
    setRegPhoto(null);
    setRegPhotoSizeKb(null);
    setShowDirectRegisterModal(true);
  };

  const handleSubmitDirectRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const lup = lups.find(l => l.id === selectedLupId) || lups[0];
    if (!lup) return;

    const shiftId: ShiftId = regShift.includes('Mañana') ? 'manana' : regShift.includes('Tarde') ? 'tarde' : 'noche';
    const now = new Date();

    const newSession: CharlaSession = {
      id: `charla-${Date.now()}`,
      lupId: lup.id,
      lupCode: lup.code,
      lupTitle: lup.title,
      facilitator: regFacilitator.trim() || regSupervisor,
      supervisor: regSupervisor.trim(),
      shift: regShift,
      shiftId,
      area: regArea.trim(),
      date: selectedDate,
      time: now.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: 300,
      attendeesCount: Math.max(1, regAttendeesCount),
      keyAgreements: regAgreements.trim() || undefined,
      photoUrl: regPhoto || undefined,
      photoSizeKb: regPhotoSizeKb || undefined,
      createdAt: now.toISOString()
    };

    saveCharla(newSession);
    setShowDirectRegisterModal(false);
    onCharlasUpdated();
  };

  // Day navigation
  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  // Turnos for the selected date
  const charlasForDate = charlas.filter(c => c.date === selectedDate);
  const charlaManana = charlasForDate.find(c => c.shiftId === 'manana' || c.shift.includes('Mañana'));
  const charlaTarde = charlasForDate.find(c => c.shiftId === 'tarde' || c.shift.includes('Tarde'));
  const charlaNoche = charlasForDate.find(c => c.shiftId === 'noche' || c.shift.includes('Noche'));

  const completedTurnosCount = (charlaManana ? 1 : 0) + (charlaTarde ? 1 : 0) + (charlaNoche ? 1 : 0);
  const dayCompletionPercent = Math.round((completedTurnosCount / 3) * 100);

  // Filtered list for historical table
  const filteredCharlas = charlas.filter(c => {
    const matchesSearch = 
      c.lupTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.lupCode.toLowerCase().includes(search.toLowerCase()) ||
      c.facilitator.toLowerCase().includes(search.toLowerCase()) ||
      (c.supervisor && c.supervisor.toLowerCase().includes(search.toLowerCase())) ||
      c.area.toLowerCase().includes(search.toLowerCase());
    const matchesShift = filterShift === 'todos' || c.shift.includes(filterShift);
    const matchesSupervisor = filterSupervisor === 'todos' || c.supervisor === filterSupervisor;
    return matchesSearch && matchesShift && matchesSupervisor;
  });

  const handleExportCsv = () => {
    const rows = charlas.map(c => ({
      'Fecha': c.date,
      'Hora': c.time,
      'Turno': c.shift,
      'Supervisor a Cargo': c.supervisor || 'N/A',
      'Facilitador': c.facilitator,
      'Código LUP': c.lupCode,
      'Título LUP': c.lupTitle,
      'Área': c.area,
      'Asistentes': c.attendeesCount,
      'Tiene Foto Evidencia': c.photoUrl ? 'SÍ' : 'NO',
      'Tamaño Foto (KB)': c.photoSizeKb || 'N/A',
      'Acuerdos': c.keyAgreements || ''
    }));

    exportToCsv('Historial_Charlas_3_Turnos_CIAL', rows);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Module Title Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-100 text-[#008744] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Control Diario de 3 Turnos
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Supervisión & Evidencia Fotográfica
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Historial de Charlas LUP por Turno (Mañana, Tarde y Noche)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Cada turno debe contar con su charla de 5 minutos, supervisor a cargo y foto liviana de evidencia en la Zona Verde.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Exportar Excel</span>
            </button>
          </div>
        </div>

        {/* Date Navigator Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="Día anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#008744]" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008744] cursor-pointer"
              />
              {selectedDate === todayStr && (
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  HOY
                </span>
              )}
            </div>

            <button
              onClick={handleNextDay}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="Día siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Daily Completion Progress */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right">
              <div className="text-xs font-black text-slate-800">
                Cumplimiento del Día: {completedTurnosCount} de 3 Turnos ({dayCompletionPercent}%)
              </div>
              <div className="text-[10px] text-slate-400 font-semibold">
                {completedTurnosCount === 3 ? '✅ Cobertura 100% completada' : '⏳ Faltan turnos por registrar'}
              </div>
            </div>

            <div className="w-24 bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
              <div 
                className={`h-full transition-all duration-500 ${
                  completedTurnosCount === 3 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${dayCompletionPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3 SHIFTS DAILY BOARD (MAÑANA, TARDE, NOCHE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* 1. TURNO MAÑANA */}
        <div className={`rounded-3xl p-5 border-2 transition flex flex-col justify-between shadow-xs ${
          charlaManana
            ? 'bg-white border-emerald-500/80'
            : 'bg-white/80 border-dashed border-amber-300'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    Turno Mañana
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    07:00 - 15:00
                  </span>
                </div>
              </div>

              {charlaManana ? (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Realizada
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                  Pendiente
                </span>
              )}
            </div>

            {charlaManana ? (
              <div className="space-y-3">
                {/* LUP Title */}
                <div>
                  <span className="font-mono text-[10px] font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    {charlaManana.lupCode}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 mt-1 leading-snug">
                    {charlaManana.lupTitle}
                  </h4>
                </div>

                {/* Supervisor & Facilitator */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Supervisor a Cargo:</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {charlaManana.supervisor || 'Carlos Venegas'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Facilitador:</span>
                    <span className="font-semibold text-slate-800">{charlaManana.facilitator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Asistencia:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded">
                      {charlaManana.attendeesCount} Operadores
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Hora de Charla:</span>
                    <span className="font-mono text-slate-700">{charlaManana.time} hrs</span>
                  </div>
                </div>

                {/* Photo Evidence Thumbnail */}
                {charlaManana.photoUrl ? (
                  <div 
                    onClick={() => setViewingPhoto({
                      url: charlaManana.photoUrl!,
                      title: `Turno Mañana • ${charlaManana.lupCode}`,
                      subtitle: `Supervisor a cargo: ${charlaManana.supervisor} | ${charlaManana.date} ${charlaManana.time}`
                    })}
                    className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 h-32 bg-slate-100 group cursor-pointer"
                  >
                    <img 
                      src={charlaManana.photoUrl} 
                      alt="Evidencia Mañana" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                        <Eye className="w-3.5 h-3.5" /> Ver Evidencia
                      </span>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-emerald-900/80 text-emerald-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                      📸 Liviano: {charlaManana.photoSizeKb ? `${charlaManana.photoSizeKb} KB` : '48 KB'}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-xl p-2.5 text-center text-xs text-slate-400 border border-dashed border-slate-200">
                    Sin foto adjunta
                  </div>
                )}

                {charlaManana.keyAgreements && (
                  <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200">
                    <strong>Acuerdo:</strong> {charlaManana.keyAgreements}
                  </p>
                )}
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Sun className="w-10 h-10 text-amber-400 mx-auto opacity-70" />
                <p className="text-xs text-slate-500 font-medium">
                  No se ha registrado la charla del Turno Mañana para este día.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            {!charlaManana ? (
              <button
                onClick={() => handleOpenDirectRegister('manana')}
                className="w-full bg-[#008744] hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Charla Mañana</span>
              </button>
            ) : (
              <div className="text-[11px] text-center font-bold text-emerald-700">
                ✅ Charla validada por {charlaManana.supervisor}
              </div>
            )}
          </div>
        </div>

        {/* 2. TURNO TARDE */}
        <div className={`rounded-3xl p-5 border-2 transition flex flex-col justify-between shadow-xs ${
          charlaTarde
            ? 'bg-white border-emerald-500/80'
            : 'bg-white/80 border-dashed border-amber-300'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                  <Sunset className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    Turno Tarde
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    15:00 - 23:00
                  </span>
                </div>
              </div>

              {charlaTarde ? (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Realizada
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                  Pendiente
                </span>
              )}
            </div>

            {charlaTarde ? (
              <div className="space-y-3">
                {/* LUP Title */}
                <div>
                  <span className="font-mono text-[10px] font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    {charlaTarde.lupCode}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 mt-1 leading-snug">
                    {charlaTarde.lupTitle}
                  </h4>
                </div>

                {/* Supervisor & Facilitator */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Supervisor a Cargo:</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {charlaTarde.supervisor || 'Rodrigo Morales'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Facilitador:</span>
                    <span className="font-semibold text-slate-800">{charlaTarde.facilitator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Asistencia:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded">
                      {charlaTarde.attendeesCount} Operadores
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Hora de Charla:</span>
                    <span className="font-mono text-slate-700">{charlaTarde.time} hrs</span>
                  </div>
                </div>

                {/* Photo Evidence Thumbnail */}
                {charlaTarde.photoUrl ? (
                  <div 
                    onClick={() => setViewingPhoto({
                      url: charlaTarde.photoUrl!,
                      title: `Turno Tarde • ${charlaTarde.lupCode}`,
                      subtitle: `Supervisor a cargo: ${charlaTarde.supervisor} | ${charlaTarde.date} ${charlaTarde.time}`
                    })}
                    className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 h-32 bg-slate-100 group cursor-pointer"
                  >
                    <img 
                      src={charlaTarde.photoUrl} 
                      alt="Evidencia Tarde" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                        <Eye className="w-3.5 h-3.5" /> Ver Evidencia
                      </span>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-emerald-900/80 text-emerald-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                      📸 Liviano: {charlaTarde.photoSizeKb ? `${charlaTarde.photoSizeKb} KB` : '52 KB'}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-xl p-2.5 text-center text-xs text-slate-400 border border-dashed border-slate-200">
                    Sin foto adjunta
                  </div>
                )}

                {charlaTarde.keyAgreements && (
                  <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200">
                    <strong>Acuerdo:</strong> {charlaTarde.keyAgreements}
                  </p>
                )}
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Sunset className="w-10 h-10 text-orange-400 mx-auto opacity-70" />
                <p className="text-xs text-slate-500 font-medium">
                  No se ha registrado la charla del Turno Tarde para este día.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            {!charlaTarde ? (
              <button
                onClick={() => handleOpenDirectRegister('tarde')}
                className="w-full bg-[#008744] hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Charla Tarde</span>
              </button>
            ) : (
              <div className="text-[11px] text-center font-bold text-emerald-700">
                ✅ Charla validada por {charlaTarde.supervisor}
              </div>
            )}
          </div>
        </div>

        {/* 3. TURNO NOCHE */}
        <div className={`rounded-3xl p-5 border-2 transition flex flex-col justify-between shadow-xs ${
          charlaNoche
            ? 'bg-white border-emerald-500/80'
            : 'bg-white/80 border-dashed border-indigo-300'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 leading-tight">
                    Turno Noche
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    23:00 - 07:00
                  </span>
                </div>
              </div>

              {charlaNoche ? (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Realizada
                </span>
              ) : (
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-300">
                  Pendiente
                </span>
              )}
            </div>

            {charlaNoche ? (
              <div className="space-y-3">
                {/* LUP Title */}
                <div>
                  <span className="font-mono text-[10px] font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    {charlaNoche.lupCode}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 mt-1 leading-snug">
                    {charlaNoche.lupTitle}
                  </h4>
                </div>

                {/* Supervisor & Facilitator */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Supervisor a Cargo:</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {charlaNoche.supervisor || 'Cristian Castro'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Facilitador:</span>
                    <span className="font-semibold text-slate-800">{charlaNoche.facilitator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Asistencia:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded">
                      {charlaNoche.attendeesCount} Operadores
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Hora de Charla:</span>
                    <span className="font-mono text-slate-700">{charlaNoche.time} hrs</span>
                  </div>
                </div>

                {/* Photo Evidence Thumbnail */}
                {charlaNoche.photoUrl ? (
                  <div 
                    onClick={() => setViewingPhoto({
                      url: charlaNoche.photoUrl!,
                      title: `Turno Noche • ${charlaNoche.lupCode}`,
                      subtitle: `Supervisor a cargo: ${charlaNoche.supervisor} | ${charlaNoche.date} ${charlaNoche.time}`
                    })}
                    className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 h-32 bg-slate-100 group cursor-pointer"
                  >
                    <img 
                      src={charlaNoche.photoUrl} 
                      alt="Evidencia Noche" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl backdrop-blur-xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                        <Eye className="w-3.5 h-3.5" /> Ver Evidencia
                      </span>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-emerald-900/80 text-emerald-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                      📸 Liviano: {charlaNoche.photoSizeKb ? `${charlaNoche.photoSizeKb} KB` : '44 KB'}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-xl p-2.5 text-center text-xs text-slate-400 border border-dashed border-slate-200">
                    Sin foto adjunta
                  </div>
                )}

                {charlaNoche.keyAgreements && (
                  <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200">
                    <strong>Acuerdo:</strong> {charlaNoche.keyAgreements}
                  </p>
                )}
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Moon className="w-10 h-10 text-indigo-400 mx-auto opacity-70" />
                <p className="text-xs text-slate-500 font-medium">
                  No se ha registrado la charla del Turno Noche para este día.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100">
            {!charlaNoche ? (
              <button
                onClick={() => handleOpenDirectRegister('noche')}
                className="w-full bg-[#008744] hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Charla Noche</span>
              </button>
            ) : (
              <div className="text-[11px] text-center font-bold text-emerald-700">
                ✅ Charla validada por {charlaNoche.supervisor}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* HISTORICAL LOG & SEARCHABLE FEED */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              Bitácora Histórica de Charlas CIAL
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Filtra por supervisor a cargo, turno o término de búsqueda.
            </p>
          </div>

          {/* Supervisor filter dropdown */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterSupervisor}
              onChange={(e) => setFilterSupervisor(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#008744]"
            >
              <option value="todos">Todos los Supervisores</option>
              {knownSupervisors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search bar and shift pills */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por LUP, supervisor, facilitador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { id: 'todos', label: 'Todos los Turnos' },
              { id: 'Mañana', label: '☀️ Turno Mañana' },
              { id: 'Tarde', label: '🌇 Turno Tarde' },
              { id: 'Noche', label: '🌙 Turno Noche' }
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

        {/* List of past charlas */}
        <div className="space-y-3 pt-2">
          {filteredCharlas.map(charla => (
            <div
              key={charla.id}
              className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200 hover:border-emerald-500 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1">
                {/* Photo thumbnail if exists */}
                {charla.photoUrl ? (
                  <div 
                    onClick={() => setViewingPhoto({
                      url: charla.photoUrl!,
                      title: `${charla.shift} • ${charla.lupCode}`,
                      subtitle: `Supervisor a cargo: ${charla.supervisor} | ${charla.date} ${charla.time}`
                    })}
                    className="w-16 h-16 rounded-xl overflow-hidden border border-slate-300 shrink-0 cursor-pointer relative group"
                  >
                    <img src={charla.photoUrl} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                    <Camera className="w-6 h-6" />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-black bg-white text-slate-800 border px-2 py-0.5 rounded shadow-2xs">
                      {charla.lupCode}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      📅 {charla.date} • {charla.time}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-full">
                      {charla.shift.split('(')[0].trim()}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900">
                    {charla.lupTitle}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium flex-wrap">
                    <span>
                      <strong>Supervisor:</strong> {charla.supervisor || 'N/A'}
                    </span>
                    <span>•</span>
                    <span>
                      <strong>Facilitador:</strong> {charla.facilitator}
                    </span>
                    <span>•</span>
                    <span>
                      📍 {charla.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right info */}
              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-2 md:pt-0 border-slate-200 shrink-0 gap-1.5">
                <span className="text-xs font-bold text-[#008744] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{charla.attendeesCount} Operadores</span>
                </span>
                {charla.photoSizeKb && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    📸 Foto Liviana: {charla.photoSizeKb} KB
                  </span>
                )}
              </div>
            </div>
          ))}

          {filteredCharlas.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No se encontraron charlas con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: REGISTRAR CHARLA DIRECTA PARA UN TURNO CON FOTO */}
      {showDirectRegisterModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  Registrar Charla 5 Min con Evidencia Fotográfica
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fecha operativa: {selectedDate}
                </p>
              </div>
              <button
                onClick={() => setShowDirectRegisterModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitDirectRegister} className="space-y-4">
              
              {/* Select LUP */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Lección de un Punto (LUP) Impartida *
                </label>
                <select
                  value={selectedLupId}
                  onChange={(e) => setSelectedLupId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008744]"
                >
                  {lups.map(l => (
                    <option key={l.id} value={l.id}>
                      [{l.code}] {l.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Turno & Supervisor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Turno *
                  </label>
                  <select
                    value={regShift}
                    onChange={(e) => setRegShift(e.target.value as ShiftType)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  >
                    <option value="Turno 1 (Mañana 07:00 - 15:00)">☀️ Turno 1 (Mañana)</option>
                    <option value="Turno 2 (Tarde 15:00 - 23:00)">🌇 Turno 2 (Tarde)</option>
                    <option value="Turno 3 (Noche 23:00 - 07:00)">🌙 Turno 3 (Noche)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Supervisor a Cargo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Carlos Venegas"
                    value={regSupervisor}
                    onChange={(e) => setRegSupervisor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
              </div>

              {/* Facilitator & Area */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Facilitador / Expositor
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez (Operador)"
                    value={regFacilitator}
                    onChange={(e) => setRegFacilitator(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Área Operacional *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Andén 4"
                    value={regArea}
                    onChange={(e) => setRegArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
              </div>

              {/* Attendees Count */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  N° de Asistentes al Encuentro
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRegAttendeesCount(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 text-center text-base font-black text-slate-800">
                    {regAttendeesCount} operadores
                  </div>
                  <button
                    type="button"
                    onClick={() => setRegAttendeesCount(prev => prev + 1)}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-lg flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Photo Evidence with client-side compression */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Foto de Evidencia del Equipo (Formato Liviano)
                </label>
                
                {regPhoto ? (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 h-36 bg-slate-100 mb-2">
                    <img src={regPhoto} alt="Evidencia" className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 left-1 bg-black/70 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                      📸 Evidencia Liviana: {regPhotoSizeKb ? `${regPhotoSizeKb} KB` : 'Optimizado'}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setRegPhoto(null);
                        setRegPhotoSizeKb(null);
                      }}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-3 text-center cursor-pointer bg-slate-50 hover:bg-emerald-50/50 transition">
                      <Camera className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-600 block">Tomar Foto con Cámara o Archivo</span>
                      <span className="text-[10px] text-slate-400 block">Se comprime automáticamente (&lt; 80 KB)</span>
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
                      onClick={handleSimulatePhoto}
                      className="px-3 border border-slate-200 hover:bg-slate-100 rounded-2xl text-[11px] font-bold text-slate-600 transition cursor-pointer shrink-0"
                      title="Insertar foto de muestra de prueba"
                    >
                      Foto Test
                    </button>
                  </div>
                )}
              </div>

              {/* Key Agreements */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Acuerdos o Compromisos del Turno (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Se acordó retirar de ruta la transpaleta TM-04 por fuga de aceite..."
                  value={regAgreements}
                  onChange={(e) => setRegAgreements(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDirectRegisterModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black bg-[#008744] hover:bg-emerald-700 text-white shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guardar Charla de Turno</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* PHOTO VIEWER MODAL */}
      {viewingPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-4 sm:p-6 text-white shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-black text-white">{viewingPhoto.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{viewingPhoto.subtitle}</p>
              </div>
              <button
                onClick={() => setViewingPhoto(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden max-h-[70vh] bg-black flex items-center justify-center">
              <img 
                src={viewingPhoto.url} 
                alt="Evidencia Ampliada" 
                className="max-h-[70vh] w-auto object-contain" 
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> Evidencia Operacional de Trabajo
              </span>
              <button
                onClick={() => setViewingPhoto(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
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
