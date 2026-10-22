import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Timer, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  FolderSync,
  Clock,
  Printer,
  X
} from 'lucide-react';
import { LupItem, LupCategory } from '../types';
import { ARIEL_ONEDRIVE_URL } from '../data/seedData';
import { saveLup } from '../services/storage';

interface LupCatalogProps {
  lups: LupItem[];
  onSelectForCharla: (lupId: string) => void;
  onLupsUpdated: () => void;
}

export const LupCatalog: React.FC<LupCatalogProps> = ({
  lups,
  onSelectForCharla,
  onLupsUpdated
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [activeModalLup, setActiveModalLup] = useState<LupItem | null>(null);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);

  // New LUP form state
  const [newCode, setNewCode] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<LupCategory>('Seguridad SSO');
  const [newObjective, setNewObjective] = useState<string>('');
  const [newArea, setNewArea] = useState<string>('Andenes de Despacho');
  const [newDoTitle, setNewDoTitle] = useState<string>('');
  const [newDoDesc, setNewDoDesc] = useState<string>('');
  const [newDontTitle, setNewDontTitle] = useState<string>('');
  const [newDontDesc, setNewDontDesc] = useState<string>('');
  const [newSafetyWarning, setNewSafetyWarning] = useState<string>('');

  const categories: string[] = [
    'Todas',
    'Seguridad SSO',
    'Cadena de Frío',
    'Operación de Equipos',
    'Calidad & BPM',
    'Mantención Autónoma 5S'
  ];

  const filteredLups = lups.filter(lup => {
    const matchesCategory = selectedCategory === 'Todas' || lup.category === selectedCategory;
    const matchesSearch = 
      lup.title.toLowerCase().includes(search.toLowerCase()) ||
      lup.code.toLowerCase().includes(search.toLowerCase()) ||
      lup.summary.toLowerCase().includes(search.toLowerCase()) ||
      lup.objective.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: LupCategory) => {
    switch (cat) {
      case 'Seguridad SSO':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Cadena de Frío':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Operación de Equipos':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Calidad & BPM':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Mantención Autónoma 5S':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const handleCreateLup = (e: React.FormEvent) => {
    e.preventDefault();
    const item: LupItem = {
      id: `lup-${Date.now()}`,
      code: newCode.trim() || `LUP-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      category: newCategory,
      summary: newObjective.trim().slice(0, 120),
      objective: newObjective.trim(),
      durationMinutes: 5,
      area: newArea.trim(),
      author: 'Líder Operacional CIAL',
      createdAt: new Date().toISOString(),
      oneDriveUrl: ARIEL_ONEDRIVE_URL,
      doPractice: {
        title: newDoTitle.trim() || 'Procedimiento Estándar Seguro',
        description: newDoDesc.trim() || 'Seguir la instrucción de trabajo estandarizada.',
        points: ['Mantener la postura correcta', 'Verificar entorno antes de operar']
      },
      dontPractice: {
        title: newDontTitle.trim() || 'Práctica Riesgosa',
        description: newDontDesc.trim() || 'Evitar omitir los pasos de seguridad.',
        points: ['No apurarse sin verificar el entorno', 'No operar sin implementos EPP']
      },
      keyPoints: [
        'Estandarizar el método entre todos los turnos.',
        'Reportar desviaciones en la Zona Verde.'
      ],
      safetyWarning: newSafetyWarning.trim() || undefined
    };

    saveLup(item);
    setShowNewModal(false);
    onLupsUpdated();

    // Reset form
    setNewCode('');
    setNewTitle('');
    setNewObjective('');
    setNewDoTitle('');
    setNewDoDesc('');
    setNewDontTitle('');
    setNewDontDesc('');
    setNewSafetyWarning('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Banner with OneDrive highlight */}
      <div className="bg-gradient-to-r from-emerald-800 via-[#008744] to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-100 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biblioteca Operacional de LUPs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Lecciones de Un Punto (LUP) para Charlas de 5 Minutos
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed mb-6">
            Herramienta visual para que el operador o supervisor dicte micro-capacitaciones diarias de seguridad, calidad, cadena de frío y cuidado de transpaletas en el Gemba.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={ARIEL_ONEDRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#008744] hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition transform active:scale-95 cursor-pointer"
            >
              <FolderSync className="w-4 h-4 text-[#008744]" />
              <span>Abrir OneDrive Oficial CIAL (Ariel Mella)</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>

            <button
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-2 bg-emerald-900/60 hover:bg-emerald-900 text-white border border-emerald-400/40 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Nueva LUP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por código, título o tema (ej: transpaleta, frío)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
            />
          </div>

          <div className="text-xs text-slate-500 font-bold self-end sm:self-center">
            Mostrando {filteredLups.length} de {lups.length} LUPs
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#008744] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* LUP Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLups.map((lup) => (
          <div
            key={lup.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {lup.code}
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getCategoryColor(lup.category)}`}>
                  {lup.category}
                </span>
              </div>

              {/* Title & Summary */}
              <h3 className="text-base font-black text-slate-900 group-hover:text-[#008744] transition-colors leading-snug mb-2">
                {lup.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium line-clamp-3 mb-4 leading-relaxed">
                {lup.summary}
              </p>

              {/* Quick Do/Don't Pill Preview */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">SÍ: {lup.doPractice.title}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span className="truncate">NO: {lup.dontPractice.title}</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalLup(lup)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Ver Detalle
              </button>

              <button
                onClick={() => onSelectForCharla(lup.id)}
                className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
              >
                <Timer className="w-3.5 h-3.5 fill-current" />
                <span>Dar Charla 5m</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLups.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700">No se encontraron Lecciones de un Punto</h4>
          <p className="text-xs text-slate-500 mt-1">Prueba cambiando los filtros o la búsqueda.</p>
        </div>
      )}

      {/* LUP Detail Modal (Visual Sheet) */}
      {activeModalLup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {activeModalLup.code}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getCategoryColor(activeModalLup.category)}`}>
                    {activeModalLup.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Área: {activeModalLup.area}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {activeModalLup.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalLup(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Objective */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-1">
                Objetivo de la Lección de un Punto:
              </h4>
              <p className="text-sm font-semibold text-emerald-950">
                {activeModalLup.objective}
              </p>
            </div>

            {/* Do vs Don't side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              
              {/* DO ✅ */}
              <div className="bg-green-50/70 border-2 border-emerald-500 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Práctica Correcta ✅</span>
                </div>
                <h5 className="text-sm font-bold text-emerald-950 mb-1">
                  {activeModalLup.doPractice.title}
                </h5>
                <p className="text-xs text-emerald-900 font-medium mb-3">
                  {activeModalLup.doPractice.description}
                </p>
                <ul className="space-y-1.5 text-xs text-emerald-900">
                  {activeModalLup.doPractice.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DONT ❌ */}
              <div className="bg-rose-50/70 border-2 border-rose-400 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Práctica Incorrecta ❌</span>
                </div>
                <h5 className="text-sm font-bold text-rose-950 mb-1">
                  {activeModalLup.dontPractice.title}
                </h5>
                <p className="text-xs text-rose-900 font-medium mb-3">
                  {activeModalLup.dontPractice.description}
                </p>
                <ul className="space-y-1.5 text-xs text-rose-900">
                  {activeModalLup.dontPractice.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Safety Warning */}
            {activeModalLup.safetyWarning && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl mb-5 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-amber-900">
                  <span className="font-bold">Advertencia:</span> {activeModalLup.safetyWarning}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 flex-wrap">
              <a
                href={activeModalLup.oneDriveUrl || ARIEL_ONEDRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver archivo en OneDrive</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Ficha</span>
                </button>
                <button
                  onClick={() => {
                    onSelectForCharla(activeModalLup.id);
                    setActiveModalLup(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Timer className="w-4 h-4 fill-current" />
                  <span>Iniciar Charla de 5 Min</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* New LUP Creation Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-800">
                Crear Nueva Lección de un Punto (LUP)
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLup} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Código LUP *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: LUP-LOG-006"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Categoría *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as LupCategory)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  >
                    <option value="Seguridad SSO">Seguridad SSO</option>
                    <option value="Cadena de Frío">Cadena de Frío</option>
                    <option value="Operación de Equipos">Operación de Equipos</option>
                    <option value="Calidad & BPM">Calidad & BPM</option>
                    <option value="Mantención Autónoma 5S">Mantención Autónoma 5S</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Título de la LUP *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Inspección pre-uso de transpaleta manual"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Objetivo ("Qué aprenderá el operador") *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ej: Detectar a tiempo fugas hidráulicas y rodamientos rotos antes de iniciar el turno."
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              {/* Do vs Don't inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
                  <label className="block text-[11px] font-black text-emerald-800 uppercase mb-1">
                    ✅ Práctica Correcta (SÍ)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Título (ej: Revisar fuga de aceite)"
                    value={newDoTitle}
                    onChange={(e) => setNewDoTitle(e.target.value)}
                    className="w-full bg-white border border-emerald-300 rounded-xl px-2.5 py-1.5 text-xs mb-2 font-medium"
                  />
                  <textarea
                    rows={2}
                    placeholder="Descripción detallada..."
                    value={newDoDesc}
                    onChange={(e) => setNewDoDesc(e.target.value)}
                    className="w-full bg-white border border-emerald-300 rounded-xl p-2 text-xs font-medium"
                  />
                </div>

                <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-200">
                  <label className="block text-[11px] font-black text-rose-800 uppercase mb-1">
                    ❌ Práctica Incorrecta (NO)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Título (ej: Operar con rueda trabada)"
                    value={newDontTitle}
                    onChange={(e) => setNewDontTitle(e.target.value)}
                    className="w-full bg-white border border-rose-300 rounded-xl px-2.5 py-1.5 text-xs mb-2 font-medium"
                  />
                  <textarea
                    rows={2}
                    placeholder="Descripción detallada..."
                    value={newDontDesc}
                    onChange={(e) => setNewDontDesc(e.target.value)}
                    className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Advertencia de Seguridad (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Si detecta fuga de aceite, segregue el equipo de inmediato."
                  value={newSafetyWarning}
                  onChange={(e) => setNewSafetyWarning(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#008744] hover:bg-emerald-700 text-white shadow-md transition cursor-pointer"
                >
                  Guardar en Catálogo LUP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
