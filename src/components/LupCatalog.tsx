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
  X,
  Camera,
  Image as ImageIcon,
  Eye
} from 'lucide-react';
import { LupItem, LupCategory } from '../types';
import { ARIEL_ONEDRIVE_URL } from '../data/seedData';
import { saveLup } from '../services/storage';
import { compressImageFile } from '../utils/imageCompressor';

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
  const [zoomPhoto, setZoomPhoto] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  // New LUP form state
  const [newCode, setNewCode] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<LupCategory>('Seguridad SSO');
  const [newObjective, setNewObjective] = useState<string>('');
  const [newArea, setNewArea] = useState<string>('Andenes de Despacho');
  
  // Do practice state
  const [newDoTitle, setNewDoTitle] = useState<string>('');
  const [newDoDesc, setNewDoDesc] = useState<string>('');
  const [newDoPhoto, setNewDoPhoto] = useState<string | null>(null);
  const [newDoPhotoSizeKb, setNewDoPhotoSizeKb] = useState<number | null>(null);

  // Don't practice state
  const [newDontTitle, setNewDontTitle] = useState<string>('');
  const [newDontDesc, setNewDontDesc] = useState<string>('');
  const [newDontPhoto, setNewDontPhoto] = useState<string | null>(null);
  const [newDontPhotoSizeKb, setNewDontPhotoSizeKb] = useState<number | null>(null);

  const [newSafetyWarning, setNewSafetyWarning] = useState<string>('');

  const categories: string[] = [
    'Todas',
    'Seguridad SSO',
    'Cadena de Frío',
    'Operación de Equipos',
    'Calidad & BPM',
    'Mantención Autónoma 5S'
  ];

  // Photo handlers with client-side compression
  const handleDoPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        setNewDoPhoto(dataUrl);
        setNewDoPhotoSizeKb(sizeKb);
      } catch (err) {
        console.error('Error al comprimir foto:', err);
      }
    }
  };

  const handleDontPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { dataUrl, sizeKb } = await compressImageFile(file, { maxWidth: 800, quality: 0.65 });
        setNewDontPhoto(dataUrl);
        setNewDontPhotoSizeKb(sizeKb);
      } catch (err) {
        console.error('Error al comprimir foto:', err);
      }
    }
  };

  const handleSimulateDoPhoto = () => {
    setNewDoPhoto('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60');
    setNewDoPhotoSizeKb(48);
  };

  const handleSimulateDontPhoto = () => {
    setNewDontPhoto('https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=60');
    setNewDontPhotoSizeKb(52);
  };

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
      author: 'Supervisor Operacional CIAL',
      createdAt: new Date().toISOString(),
      oneDriveUrl: ARIEL_ONEDRIVE_URL,
      doPractice: {
        title: newDoTitle.trim() || 'Procedimiento Estándar Seguro',
        description: newDoDesc.trim() || 'Seguir la instrucción de trabajo estandarizada.',
        points: ['Mantener la postura ergonómica correcta', 'Verificar entorno antes de operar'],
        photoUrl: newDoPhoto || undefined,
        photoSizeKb: newDoPhotoSizeKb || undefined
      },
      dontPractice: {
        title: newDontTitle.trim() || 'Práctica Riesgosa',
        description: newDontDesc.trim() || 'Evitar omitir los pasos de seguridad.',
        points: ['No apurarse sin verificar el entorno', 'No operar sin implementos EPP'],
        photoUrl: newDontPhoto || undefined,
        photoSizeKb: newDontPhotoSizeKb || undefined
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
    setNewDoPhoto(null);
    setNewDoPhotoSizeKb(null);
    setNewDontTitle('');
    setNewDontDesc('');
    setNewDontPhoto(null);
    setNewDontPhotoSizeKb(null);
    setNewSafetyWarning('');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Banner with OneDrive highlight */}
      <div className="bg-gradient-to-r from-emerald-800 via-[#008744] to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-100 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biblioteca Operacional de LUPs con Fotos Do / Don't</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Lecciones de Un Punto (LUP) para Charlas de 5 Minutos
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed mb-6">
            Crea y consulta lecciones visuales con <strong>fotos de Caso Correcto ✅</strong> y <strong>Caso Incorrecto ❌</strong> para capacitar a los operadores en terreno.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 fill-current text-slate-950" />
              <span>Crear Nueva LUP (con Fotos)</span>
            </button>

            <a
              href={ARIEL_ONEDRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/20 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              <FolderSync className="w-4 h-4 text-emerald-200" />
              <span>OneDrive Oficial CIAL (Ariel Mella)</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>
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
              <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-3 leading-relaxed">
                {lup.summary}
              </p>

              {/* Dual Photo Thumbnail Comparison (Do vs Don't) */}
              {(lup.doPractice.photoUrl || lup.dontPractice.photoUrl) ? (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {/* Do Photo */}
                  <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500 h-24 bg-emerald-50">
                    {lup.doPractice.photoUrl ? (
                      <img src={lup.doPractice.photoUrl} alt="Correcto" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-emerald-700 font-bold">Sin foto</div>
                    )}
                    <span className="absolute bottom-1 left-1 bg-emerald-700/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                      ✅ SÍ HACER
                    </span>
                  </div>

                  {/* Don't Photo */}
                  <div className="relative rounded-xl overflow-hidden border-2 border-rose-400 h-24 bg-rose-50">
                    {lup.dontPractice.photoUrl ? (
                      <img src={lup.dontPractice.photoUrl} alt="Incorrecto" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-rose-700 font-bold">Sin foto</div>
                    )}
                    <span className="absolute bottom-1 left-1 bg-rose-700/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                      ❌ NO HACER
                    </span>
                  </div>
                </div>
              ) : (
                /* Fallback text preview */
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
              )}
            </div>

            {/* Card Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalLup(lup)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Ver Detalle & Fotos
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

      {/* LUP DETAIL MODAL (VISUAL SHEET WITH DO/DONT PHOTOS) */}
      {activeModalLup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
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
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
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

            {/* Objective Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-1">
                Objetivo de la Lección de un Punto:
              </h4>
              <p className="text-sm font-semibold text-emerald-950">
                {activeModalLup.objective}
              </p>
            </div>

            {/* BIG SIDE-BY-SIDE COMPARISON: CASO CORRECTO VS CASO INCORRECTO WITH PHOTOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              
              {/* CASO CORRECTO (DO) ✅ */}
              <div className="bg-green-50/70 border-2 border-emerald-500 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" /> CASO CORRECTO (SÍ HACER)
                    </span>
                    {activeModalLup.doPractice.photoSizeKb && (
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">
                        {activeModalLup.doPractice.photoSizeKb} KB
                      </span>
                    )}
                  </div>

                  {/* Photo of Correct Case */}
                  {activeModalLup.doPractice.photoUrl ? (
                    <div 
                      onClick={() => setZoomPhoto({
                        url: activeModalLup.doPractice.photoUrl!,
                        title: `Caso Correcto • ${activeModalLup.code}`,
                        subtitle: activeModalLup.doPractice.title
                      })}
                      className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 mb-4 h-48 sm:h-56 bg-emerald-100/50 group cursor-pointer shadow-xs"
                    >
                      <img 
                        src={activeModalLup.doPractice.photoUrl} 
                        alt="Caso Correcto" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5">
                          <Eye className="w-4 h-4" /> Ampliar Fotografía
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-emerald-300 mb-4 h-32 flex flex-col items-center justify-center text-emerald-700/60 bg-emerald-50/50">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-xs font-bold">Sin foto de caso correcto</span>
                    </div>
                  )}

                  <h5 className="text-base font-black text-emerald-950 mb-1.5">
                    {activeModalLup.doPractice.title}
                  </h5>
                  <p className="text-xs text-emerald-900 font-medium mb-3 leading-relaxed">
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
              </div>

              {/* CASO INCORRECTO (DONT) ❌ */}
              <div className="bg-rose-50/70 border-2 border-rose-400 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-rose-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                      <AlertTriangle className="w-4 h-4" /> CASO INCORRECTO (PROHIBIDO)
                    </span>
                    {activeModalLup.dontPractice.photoSizeKb && (
                      <span className="text-[10px] text-rose-700 font-mono font-bold">
                        {activeModalLup.dontPractice.photoSizeKb} KB
                      </span>
                    )}
                  </div>

                  {/* Photo of Incorrect Case */}
                  {activeModalLup.dontPractice.photoUrl ? (
                    <div 
                      onClick={() => setZoomPhoto({
                        url: activeModalLup.dontPractice.photoUrl!,
                        title: `Caso Incorrecto • ${activeModalLup.code}`,
                        subtitle: activeModalLup.dontPractice.title
                      })}
                      className="relative rounded-2xl overflow-hidden border-2 border-rose-300 mb-4 h-48 sm:h-56 bg-rose-100/50 group cursor-pointer shadow-xs"
                    >
                      <img 
                        src={activeModalLup.dontPractice.photoUrl} 
                        alt="Caso Incorrecto" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs flex items-center gap-1.5">
                          <Eye className="w-4 h-4" /> Ampliar Fotografía
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-rose-300 mb-4 h-32 flex flex-col items-center justify-center text-rose-700/60 bg-rose-50/50">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-xs font-bold">Sin foto de caso incorrecto</span>
                    </div>
                  )}

                  <h5 className="text-base font-black text-rose-950 mb-1.5">
                    {activeModalLup.dontPractice.title}
                  </h5>
                  <p className="text-xs text-rose-900 font-medium mb-3 leading-relaxed">
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

            </div>

            {/* Safety Warning */}
            {activeModalLup.safetyWarning && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-2xl mb-5 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-amber-900">
                  <span className="font-bold">Advertencia Crítica:</span> {activeModalLup.safetyWarning}
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
                <span>Ver archivo en OneDrive Ariel Mella</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Ficha</span>
                </button>
                <button
                  onClick={() => {
                    onSelectForCharla(activeModalLup.id);
                    setActiveModalLup(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Timer className="w-4 h-4 fill-current" />
                  <span>Iniciar Charla de 5 Min con esta LUP</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CREATE NEW LUP MODAL (WITH DO & DONT PHOTO UPLOAD) */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Crear Nueva Lección de un Punto (LUP)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Define el estándar con fotos reales de Caso Correcto y Caso Incorrecto.
                </p>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLup} className="space-y-4">
              
              {/* Code & Category */}
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

              {/* Title & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    Área Operacional *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Andenes 1-8 / Cámara Frío P2"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#008744]"
                  />
                </div>
              </div>

              {/* Objective */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Objetivo ("Qué aprenderá el operador") *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ej: Detectar a tiempo fugas hidráulicas y rodamientos rotos antes de iniciar el turno de carga..."
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              {/* DUAL CONTAINER: DO (CORRECTO) VS DONT (INCORRECTO) WITH PHOTO UPLOAD */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* 1. CASO CORRECTO CONTAINER */}
                <div className="bg-emerald-50/70 p-4 rounded-3xl border-2 border-emerald-400 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>1. Caso Correcto (SÍ HACER)</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-800 mb-1">
                      Título de la práctica correcta *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Tirar de costado con vista al frente"
                      value={newDoTitle}
                      onChange={(e) => setNewDoTitle(e.target.value)}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-1.5 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-800 mb-1">
                      Explicación detallada
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Detalla cómo se debe realizar correctamente..."
                      value={newDoDesc}
                      onChange={(e) => setNewDoDesc(e.target.value)}
                      className="w-full bg-white border border-emerald-300 rounded-xl p-2 text-xs font-medium"
                    />
                  </div>

                  {/* Photo of Correct Case */}
                  <div>
                    <label className="block text-[11px] font-black text-emerald-900 uppercase mb-1">
                      📸 Foto de Caso Correcto
                    </label>

                    {newDoPhoto ? (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500 h-32 bg-white">
                        <img src={newDoPhoto} alt="Preview Correcto" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/70 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                          {newDoPhotoSizeKb ? `${newDoPhotoSizeKb} KB` : 'Optimizado'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setNewDoPhoto(null);
                            setNewDoPhotoSizeKb(null);
                          }}
                          className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-black text-white p-1 rounded-full cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <label className="flex-1 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-2 text-center cursor-pointer bg-white transition">
                          <Camera className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
                          <span className="text-[11px] font-bold text-emerald-800 block">Subir Foto Correcta</span>
                          <span className="text-[9px] text-slate-400 block">Formato liviano automático</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            capture="environment" 
                            onChange={handleDoPhotoUpload} 
                            className="hidden" 
                          />
                        </label>

                        <button
                          type="button"
                          onClick={handleSimulateDoPhoto}
                          className="px-2.5 border border-emerald-300 bg-white hover:bg-emerald-50 rounded-2xl text-[10px] font-bold text-emerald-800 transition cursor-pointer shrink-0"
                          title="Cargar foto de prueba"
                        >
                          Foto Test
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. CASO INCORRECTO CONTAINER */}
                <div className="bg-rose-50/70 p-4 rounded-3xl border-2 border-rose-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-rose-900 uppercase flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>2. Caso Incorrecto (NO HACER)</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-rose-800 mb-1">
                      Título de lo que está prohibido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Caminar de espaldas tirando de frente"
                      value={newDontTitle}
                      onChange={(e) => setNewDontTitle(e.target.value)}
                      className="w-full bg-white border border-rose-300 rounded-xl px-3 py-1.5 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-rose-800 mb-1">
                      Explicación del peligro
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Detalla por qué es peligroso o qué consecuencias tiene..."
                      value={newDontDesc}
                      onChange={(e) => setNewDontDesc(e.target.value)}
                      className="w-full bg-white border border-rose-300 rounded-xl p-2 text-xs font-medium"
                    />
                  </div>

                  {/* Photo of Incorrect Case */}
                  <div>
                    <label className="block text-[11px] font-black text-rose-900 uppercase mb-1">
                      📸 Foto de Caso Incorrecto
                    </label>

                    {newDontPhoto ? (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-rose-400 h-32 bg-white">
                        <img src={newDontPhoto} alt="Preview Incorrecto" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/70 text-rose-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                          {newDontPhotoSizeKb ? `${newDontPhotoSizeKb} KB` : 'Optimizado'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setNewDontPhoto(null);
                            setNewDontPhotoSizeKb(null);
                          }}
                          className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-black text-white p-1 rounded-full cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <label className="flex-1 border-2 border-dashed border-rose-300 hover:border-rose-400 rounded-2xl p-2 text-center cursor-pointer bg-white transition">
                          <Camera className="w-4 h-4 text-rose-600 mx-auto mb-0.5" />
                          <span className="text-[11px] font-bold text-rose-800 block">Subir Foto Incorrecta</span>
                          <span className="text-[9px] text-slate-400 block">Formato liviano automático</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            capture="environment" 
                            onChange={handleDontPhotoUpload} 
                            className="hidden" 
                          />
                        </label>

                        <button
                          type="button"
                          onClick={handleSimulateDontPhoto}
                          className="px-2.5 border border-rose-300 bg-white hover:bg-rose-50 rounded-2xl text-[10px] font-bold text-rose-800 transition cursor-pointer shrink-0"
                          title="Cargar foto de prueba"
                        >
                          Foto Test
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Safety Warning */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Advertencia Crítica de Seguridad (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: ¡Riesgo grave de atrapamiento o volcadura si no se sigue este estándar!"
                  value={newSafetyWarning}
                  onChange={(e) => setNewSafetyWarning(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#008744]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black bg-[#008744] hover:bg-emerald-700 text-white shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publicar LUP con Fotos</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* FULL PHOTO ZOOM MODAL */}
      {zoomPhoto && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-4 sm:p-6 text-white shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <h3 className="text-base font-black text-white">{zoomPhoto.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{zoomPhoto.subtitle}</p>
              </div>
              <button
                onClick={() => setZoomPhoto(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden max-h-[70vh] bg-black flex items-center justify-center">
              <img 
                src={zoomPhoto.url} 
                alt="Zoom Evidencia" 
                className="max-h-[70vh] w-auto object-contain" 
              />
            </div>

            <div className="mt-3 flex items-center justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setZoomPhoto(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
